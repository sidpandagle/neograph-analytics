"""Independent re-derivation of a report draft's arithmetic.

Deliberately does NOT import or reuse anything from scripts/report-db.mjs. The
point is to reproduce the figures from the file's own contents with separate
code, so that agreement means two independent computations agree rather than one
computation run twice. A passing `check` proves the checker's rules were met; it
does not prove the series says what the headline says.

Usage:  python -I verify_drafts.py <slug> [<slug> ...]
        python -I verify_drafts.py --all
        python -I verify_drafts.py --pair <slug> [...]    # or --pair --all

--pair is the other half: it reads the figures out of the JSON and counts them
in the evidence file the report cites. See the note above `pair()` for why.
"""

import io, json, os, re, sys, glob

REPORTS = 'content/reports'


def cagr(a, b, years):
    return ((b / a) ** (1.0 / years) - 1.0) * 100.0


def check(path):
    d = json.load(io.open(path, encoding='utf-8'))
    name = os.path.basename(path)
    out = []
    ok = True

    ms = d.get('market_size') or {}
    cur = ms.get('current_value', d.get('current_value'))
    fc = ms.get('forecast_value', d.get('forecast_value'))
    stated = ms.get('cagr', d.get('cagr'))
    unit = d.get('unit')
    if stated is None:
        out.append('%s' % name)
        out.append('  !! no cagr in market_size')
        return False, out
    series = d.get('market_forecast') or []

    out.append('%s' % name)
    out.append('  headline     : %s -> %s %s at %s%%' % (cur, fc, unit, stated))

    # 1. the series itself
    if not series:
        out.append('  !! no market_forecast series')
        return False, out
    years = [p.get('year') for p in series]
    vals = [p.get('value') for p in series]
    out.append('  series       : %d points, %s-%s' % (len(series), years[0], years[-1]))
    if len(series) < 7 or len(series) > 9:
        out.append('  !! series length %d outside 7-9' % len(series))
        ok = False
    if years != sorted(years) or len(set(years)) != len(years):
        out.append('  !! years not strictly increasing')
        ok = False

    # 2. endpoints must be the headline, not merely near it
    if cur is not None and abs(vals[0] - cur) > 1e-9:
        out.append('  !! first point %s != current_value %s' % (vals[0], cur))
        ok = False
    if fc is not None and abs(vals[-1] - fc) > 0.05:
        out.append('  !! last point %s != forecast_value %s' % (vals[-1], fc))
        ok = False

    # 3. the stated CAGR, recomputed from the endpoints of the series
    span = years[-1] - years[0]
    derived = cagr(vals[0], vals[-1], span)
    delta = abs(derived - float(stated))
    out.append('  CAGR series  : %.4f%% over %d yrs  (stated %.4f%%, delta %.4f pt)'
               % (derived, span, float(stated), delta))
    if delta > 0.6:
        out.append('  !! CAGR does not reconcile within 0.6 points')
        ok = False
    elif delta > 0.05:
        out.append('  ~  reconciles but loosely (>0.05 pt)')

    # 4. the headline pair on its own, independent of the series
    if cur and fc:
        hd = cagr(cur, fc, span)
        out.append('  CAGR headline: %.4f%% from current/forecast alone (delta %.4f pt)'
                   % (hd, abs(hd - float(stated))))

    # 5. monotonicity and step sanity - a series that jumps is a transcription error
    steps = []
    for i in range(1, len(vals)):
        steps.append(cagr(vals[i - 1], vals[i], years[i] - years[i - 1]))
    out.append('  yr/yr growth : min %.2f%%  max %.2f%%  spread %.2f pt'
               % (min(steps), max(steps), max(steps) - min(steps)))
    if max(steps) - min(steps) > 2.0:
        out.append('  ~  year-on-year rates vary by more than 2 points - check intent')

    # 6. things the house rules forbid outright
    for c in d.get('competitive_landscape') or []:
        if 'market_share' in c:
            out.append('  !! market_share on %s' % c.get('company'))
            ok = False
    for key in ('regional_analysis', 'country_analysis'):
        v = d.get(key)
        if v:
            out.append('  ~  %s is non-empty (%d entries) - must be source-named splits'
                       % (key, len(v)))
    for r in d.get('recent_developments') or []:
        if not isinstance(r, dict) or not r.get('event') or not isinstance(r.get('year'), int):
            out.append('  !! malformed recent_developments entry: %r' % (r,))
            ok = False

    raw = io.open(path, encoding='utf-8').read()
    if '�' in raw:
        out.append('  !! contains U+FFFD')
        ok = False

    out.append('  verdict      : %s' % ('reproduces' if ok else 'DOES NOT REPRODUCE'))
    return ok, out


# ── pairing: does the evidence file actually contain the report's figures? ────
# The arithmetic above reconciles a report against itself, which a mismatched
# notes/JSON pair passes every time. On 2026-10-18 two drafts did, and one was
# restored as "verified" while the notes on disk belonged to a different report.
# So this reads the figures OUT of the JSON and counts them in the notes the
# report cites. A report can share a headline with the wrong notes by a
# coincidence of rounding; it cannot share "$147,990 per lab" by accident,
# which is why the long figures carry the signal.

FIGURE = re.compile(r'\d[\d,]*\.\d+|\d[\d,]{3,}')


def figures_in(obj, into):
    """Every numeric-looking token in the report's own prose and metrics."""
    if isinstance(obj, dict):
        for v in obj.values():
            figures_in(v, into)
    elif isinstance(obj, list):
        for v in obj:
            figures_in(v, into)
    elif isinstance(obj, str):
        for m in FIGURE.findall(obj):
            into.add(m.strip(',.'))
    elif isinstance(obj, (int, float)) and not isinstance(obj, bool):
        t = ('%f' % obj).rstrip('0').rstrip('.')
        if len(t.replace('.', '').replace('-', '')) >= 3:
            into.add(t)


def variants(tok):
    """The same number as a notes file might spell it: with or without commas,
    and with a trailing zero dropped, so 9.90 still matches 9.9."""
    v = {tok, tok.replace(',', '')}
    if ',' not in tok and '.' in tok:
        whole, frac = tok.split('.', 1)
        if len(whole) > 3:
            v.add('{:,}'.format(int(whole)) + '.' + frac)
    if '.' in tok:
        v.add(tok.rstrip('0').rstrip('.'))
    return {x for x in v if x}


def pair(slug):
    """Count the report's own figures in the evidence file it cites."""
    jpath = os.path.join(REPORTS, slug + '.json')
    npath = os.path.join('research', slug + '-notes.md')
    out = ['%s.json  <->  %s-notes.md' % (slug, slug)]
    if not os.path.exists(jpath):
        out.append('  !! no report at %s' % jpath)
        return False, out
    if not os.path.exists(npath):
        out.append('  !! no evidence file at %s' % npath)
        return False, out

    d = json.load(io.open(jpath, encoding='utf-8'))
    notes = io.open(npath, encoding='utf-8').read()

    ms = d.get('market_size') or {}
    head = [ms.get('current_value', d.get('current_value')),
            ms.get('forecast_value', d.get('forecast_value')),
            ms.get('cagr', d.get('cagr'))]
    head = [('%f' % h).rstrip('0').rstrip('.') for h in head if h is not None]

    missing_head = []
    for h in head:
        hit = any(v in notes for v in variants(h))
        if not hit:
            missing_head.append(h)
        out.append('  headline %-12s %s' % (h, 'found' if hit else '** ABSENT **'))

    # market_forecast is interpolated from the headline pair, not cited, so its
    # intermediate points are not expected in an evidence file and counting them
    # as unsourced penalised every report with a long series.
    figs = set()
    figures_in({k: v for k, v in d.items()
                if k not in ('slug', 'title', 'seo', 'market_forecast')}, figs)
    def is_year(f):
        """A bare 4-digit year is not a grounding figure; it inflated the
        absent list with 2016/2027/2028 before this."""
        return f.isdigit() and len(f) == 4 and 1900 <= int(f) <= 2100

    long_figs = sorted((f for f in figs
                        if len(f.replace(',', '').replace('.', '')) >= 4
                        and not is_year(f)),
                       key=lambda x: -len(x))[:40]
    absent = [f for f in long_figs if not any(v in notes for v in variants(f))]
    found = len(long_figs) - len(absent)

    out.append("  grounding    : %d/%d of the report's long figures appear in the notes"
               % (found, len(long_figs)))
    if absent:
        out.append('  not in notes : %s' % ', '.join(absent[:12]))

    ok = (not missing_head) and (not long_figs or found * 2 >= len(long_figs))
    out.append('  verdict      : %s'
               % ('paired' if ok else 'NOT PAIRED -- unsourced against its own notes'))
    return ok, out


def main():
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        return 2

    if '--pair' in args:
        slugs = [a for a in args if a != '--pair']
        if slugs == ['--all']:
            slugs = sorted(os.path.basename(q)[:-5]
                           for q in glob.glob(os.path.join(REPORTS, '*.json'))
                           if not os.path.basename(q).startswith('_'))
        bad = 0
        for slug in slugs:
            ok, out = pair(slug[:-5] if slug.endswith('.json') else slug)
            print(chr(10).join(out))
            print('')
            if not ok:
                bad += 1
        print('%d paired-checked, %d not paired' % (len(slugs), bad))
        return 1 if bad else 0

    if args == ['--all']:
        paths = sorted(p for p in glob.glob(os.path.join(REPORTS, '*.json'))
                       if not os.path.basename(p).startswith('_'))
    else:
        paths = [os.path.join(REPORTS, a if a.endswith('.json') else a + '.json')
                 for a in args]

    bad = 0
    for p in paths:
        if not os.path.exists(p):
            print('%s  MISSING' % p)
            bad += 1
            continue
        ok, out = check(p)
        print('\n'.join(out))
        print('')
        if not ok:
            bad += 1
    print('%d checked, %d did not reproduce' % (len(paths), bad))
    return 1 if bad else 0


if __name__ == '__main__':
    sys.exit(main())

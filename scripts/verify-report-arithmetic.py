"""Independent re-derivation of a report draft's arithmetic.

Deliberately does NOT import or reuse anything from scripts/report-db.mjs. The
point is to reproduce the figures from the file's own contents with separate
code, so that agreement means two independent computations agree rather than one
computation run twice. A passing `check` proves the checker's rules were met; it
does not prove the series says what the headline says.

Usage:  python -I verify_drafts.py <slug> [<slug> ...]
        python -I verify_drafts.py --all
"""

import io, json, os, sys, glob

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


def main():
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        return 2
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

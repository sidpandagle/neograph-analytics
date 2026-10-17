# STATUS

**Updated:** 2026-10-17 18:05 IST
**Budget:** 7d used 25% | ceiling (70% of pace) 52.1% | headroom +27.1 points
(5h window 21% — the tighter of the two after a five-agent fan-out)
**Current task:** `/research` round 5 **complete — five reports pass `check`,
verified by re-derivation, held on the branch for the 21:00 IST window.**
`dialysis-and-renal-care-market`, `contract-research-organization-market`,
`pharmacovigilance-market`, `radiotherapy-equipment-market`,
`ambulatory-surgery-centers-market`. Corpus 182 -> 187 on publish. Next: the
cross-report article on the size-spread-to-CAGR-spread ratio, which cannot pass
its own `--online` check until those five are live.
**Merges to `main` today (IST):** #18 at 00:48 (pre-policy-change), **#19 at
17:40 on Siddhant's request** (`576143e`, live in ~2 min, production verified).
Extra merges on request are uncapped; the 21:00 scheduled slot is now free for
whatever the evening produces.
**Mode:** running

## On the branch, verified locally, awaiting a merge slot

The four owner decisions, implemented. This bundle needs a deploy for the code
half to reach production — it goes out at the 21:00 IST merge.

```
/legal/terms-of-use            200, 10 sections (published to Supabase, live now)
Dataset.license                restored, 1 assertion per report page
footer                         4 legal links (was 3)
/api/purchase-inquiry          400 on missing email, bad email, malformed body
corpus by industry             13 verticals (was 6; 28 rows were mislabelled)
hero / listing counts          "182 reports across 13 verticals", derived
audit-html.mjs                 17 of 17 routes, 0 errors, 1 warning
contrast-audit.mjs             0 failing pairs
tsc --noEmit                   clean
```

The Supabase half — the terms page and the 13 chips — reaches production
through ISR within the hour without a deploy. The licence assertion, the
checkout fix, the footer link and the widened copy need the merge.

## Shipped 2026-10-17 17:40 IST in #19, verified in production

Ten commits, each verified before the next began. In defect order rather than
commit order:

```
R-17  every trimmed report title lost its letter "s"    6 cards x 182 pages + every OG image
      marketName() collapsed whitespace with /s+/        "Antimicrobial Re i tance Diagno tic  Market"
R-18  datePublished a day early, build-host dependent    IST build emitted 2025-12-17 for Dec 18
R-19  /about + /services unreadable in dark mode         h2 1.05:1, body 2.24:1, meta 3.57:1
R-20  every status chip stayed light on a dark page       68 raw classes -> 13 tokens, 1 of 35 had dark:
R-23  featured subheading was a stale industry list      now Intl.ListFormat over the 6 rows on screen
R-24  17 indexable pages in no advertised sitemap        4 legal + 10 consulting + 3 authors
R-25  MeetTheTeam linked to URLs that 404                parseInt('tm001') -> NaN; 0 imports, 0 inbound
R-27  39KB of company research stored and not rendered   418 overviews, 172 distinct; 17 unlisted profiles
R-28  CLAUDE.md wrong in six places                      3 of 7 chart files live; chartUtils dead and unsafe
```

New checkers, both offline, both negative-tested:

```
scripts/seo-unit.mjs         16 assertions over lib/seo.ts; it is what caught R-18
scripts/source-hygiene.mjs   221 files, byte-level; catches an eaten regex escape
contrast-audit.mjs           +12 status pairs: text 7.60-11.83:1, glyphs 3.00-9.51:1
audit-html.mjs               + a sitemap rule (--prod); fires on production today
```

All four green on the final build: `audit-html.mjs` 17 of 17 routes error-free
(0 errors, 1 pre-existing warning), `contrast-audit.mjs` 0 failing pairs,
`source-hygiene.mjs` 0 findings, `seo-unit.mjs` 16 of 16. `tsc --noEmit` clean.
Build exit 0 with the same 12 lint warnings it started the day with.

**Verified live, not inferred from a green deploy.** `audit-html.mjs --prod`:
17 of 17 pages error-free, 0 errors, 1 pre-existing warning; the ld+json
licence resolves 200; `/sitemap.xml` carries **221 URLs** (was 204) with all
six page families present and **0 dead** among the 44 fetched. Spot checks on
the live site: the related cards read "Antimicrobial Resistance Diagnostics
Market" (was "Re i tance Diagno tic"), `/about` has 0 `text-slate-*` classes,
the production stylesheet carries `--status-error-surface` as #FEF2F2 light and
#3A1D25 dark, the homepage subheading reads "Medical Devices, Life Sciences,
Pharmaceuticals, and Healthcare IT.", `/authors/1..3` and the 4 legal and 10
consulting URLs all return 200, and
`/reports/europe-clinical-decision-support-market` now shows IBM Watson Health
and Siemens Healthineers under "Also profiled" — the report whose three
company profiles previously rendered nothing at all.

The merge needed one commit of care: #18 was squash-merged, so 17 files
conflicted against content `main` already had under a single commit. `main`
held no independent work — checked by diffing each file, not assumed — and the
tree after the merge is byte-identical to the pre-merge tip, so the verified
build is exactly what shipped.

## Deployed and verified in production

**Corpus 152 -> 182.** Thirty reports, two analysis articles and the press
release went out in one deploy, reports first, then the articles that link to
them.

```
new report URLs                200 (spot-checked across rounds 2, 3 and 4)
both analysis articles         200
press release                  200
/llms.txt report URLs          182
listing chips                  41 + 47 + 28 + 6 + 31 + 29 = 182
audit-html.mjs --prod          16 of 16 routes error-free, 0 errors
isotope report (unit Million)  $963.7M -> $1,177.8M, 6 related links, caption, own OG card
```

Production was reporting **5 errors** before this deploy; it reports none now.

## What the deploy exposed, and what it cost to find

The new report pages built with **no related-research block at all** while the
old ones kept theirs. Three wrong explanations were discarded on evidence — a
transient query failure, stale build artefacts, bad data — before instrumenting
the build showed the corpus query returning **152 rows inside the build and 182
outside it**.

Next's Data Cache wraps `fetch`, supabase-js queries through it, and a fetch
with no cache hint is cached **indefinitely**, so the query was served from the
previous build's entry. `generateStaticParams` had fresh data, so all 182 pages
generated; the 30 new ones each failed to find themselves in a 152-row corpus
and rendered nothing. No error, no empty section.

`cache: 'no-store'` was the wrong fix and the build said so: it makes the route
dynamic, and with `dynamicParams = false` **all 182** pages then shipped without
the block. A 60-second revalidate on that one query keeps the route static.

PR #17 having been squash-merged also meant nine files conflicted on this merge;
the branch side was strictly newer in every case.

## Needs Siddhant

All four `[H]` items are answered and implemented (R-9, R-4, R-10, R-11). One
narrower question came out of the work:

- **Who is the contracting entity, and under which law?** The footer says
  NeoGraph Analytics Pvt. Ltd. (Pune) while `lib/contact.ts` also lists an
  Austin, TX office. `/legal/terms-of-use` therefore says the entity and
  governing law are stated on each order rather than naming one. One line from
  you replaces that paragraph with a real governing-law clause.
- **One live send of the new purchase-inquiry route is unverified.** Its
  validation path is tested (400 on missing email, bad email, malformed body)
  and the Resend sender is the one `/api/contact` already uses, but no real
  email was sent to `support@` without being asked. To confirm delivery:
  `curl -X POST https://www.neographanalytics.com/api/purchase-inquiry -H 'Content-Type: application/json' -d '{"fullName":"Test","email":"you@example.com","reportTitle":"Test","reportSlug":"femtech-market"}'`

## Next up

Three findings are open and **all three need the 21:00-09:00 browser window**,
which opens at the same hour as the merge:

1. **R-13, first paint.** FCP and LCP are the same event at ~1.3s on a
   server-rendered text page whose TTFB is 89ms. Today's headless pass narrowed
   the candidates from the built HTML of `/methodology`, in document order: two
   render-blocking stylesheets totalling **74.6KB** (66,374 + 8,244 bytes), then
   **13 `async` chunk scripts in `<head>`**, then a `rel=preload` for
   `googletagmanager.com/gtag/js` carrying **no `fetchPriority`** — a
   High-priority third-party fetch competing with the stylesheets, while Next's
   own chunk preload beside it is marked `fetchPriority="low"`. This also
   corrects the earlier note that gtag was absent from the static HTML; the
   preload link is in it, on every page. Next: trace with googletagmanager
   blocked to size its share, then choose between `strategy="lazyOnload"` for GA
   and splitting the 66KB stylesheet.
2. **R-19, R-20 rendered confirmation.** Every dark-mode ratio shipped today was
   computed from token hexes, not observed. The arithmetic says `/about`,
   `/services` and all the status panels now read correctly in dark mode; one
   pass in a real browser would make that observed rather than modelled.
3. **R-22, prose tables.** `.prose table` sets `width: 100%; overflow: hidden`
   and the only scroll escape is behind `@media (max-width: 768px)`. Whether a
   wide table above 769px is clipped or pushes the page into horizontal scroll
   depends on how the browser applies `overflow` to a table box, which this
   queue may not assert without looking. Doubly latent: 0 of 22 snapshot rows
   contain a `<table>`.

Not browser-dependent:

4. **R-21** — the four `/about` impact stats carry `divide-white/[0.06]` with no
   `divide-x`, so 0 of 3 intended rules render. Left alone deliberately:
   `divide-x` on a 2-up grid also stripes the row starts, so which rule was
   wanted is a design call, not a bug fix.
5. **R-26** — no published figure carries a named analyst.
   `neograph_reports` has no author column (32, checked) and
   `lib/jsonReports.ts:170` hardcodes `authors: []`. Three analyst profiles sit
   unlinked. One mapping from Siddhant and the byline, the profile links and the
   schema `author` all follow.
6. Watch Search Console for the 30 newer URLs and resubmit the sitemap after the
   merge — it is the sitemap itself that changed this time, 204 URLs to 221.
7. **The report-expansion target is met** — 182 rows against the 142 it started
   from is 40, inside the 30-50 asked for. No round 5 is scheduled; the loop
   stays on review and fixes unless more reports are asked for.
## Round 5 publish sequence — run in the run-up to the 21:00 IST merge

Five reports and one article sit on `work/continuous-improvements`, all passing
`check`, none published. Corpus goes **182 -> 187**. Prior rounds' content is
already live (8 blog rows, 6 press releases), so this is the only new content.

Reports first, then the article, because the article links all five and
`blog-db.mjs check --online` fails until they resolve. That failure has already
been observed and names exactly the five slugs — it is the sequencing rule
working, not a defect.

```bash
# 1. everything must still pass
node scripts/report-db.mjs check content/reports/*.json

# 2. reports FIRST
node scripts/report-db.mjs publish \
  content/reports/dialysis-and-renal-care-market.json \
  content/reports/contract-research-organization-market.json \
  content/reports/pharmacovigilance-market.json \
  content/reports/radiotherapy-equipment-market.json \
  content/reports/ambulatory-surgery-centers-market.json

# 3. the article's links now resolve — this check must flip from FAIL to PASS
node scripts/blog-db.mjs check content/blogs/when-forecasters-agree-on-size-and-not-on-growth.json --online

# 4. then the article
node scripts/blog-db.mjs publish content/blogs/when-forecasters-agree-on-size-and-not-on-growth.json

# 5. prerender every page — an unbuilt row is a hard 404 behind an ISR card
npm run build
```

Then the deploy per `DEPLOY-RUNBOOK.md`, and resubmit the sitemap: it grows by
six URLs (five reports plus the article), 221 -> 227.

**Do not publish before the window.** `app/reports/[slug]/page.tsx` and
`app/blog/[slug]/page.tsx` set `dynamicParams = false`, so a Supabase row absent
from the last build's `generateStaticParams()` is a hard 404 while `/reports`
(ISR, hourly) already lists a card linking to it.

### After publishing, update these

- `research/REPORT-PIPELINE.md` — rows 41-45 `check-passed` -> `published`
- `WORKLOG.md` — the published figures and what production actually shows
- the corpus count in the hero, the listing and `/llms.txt` — 182 -> 187,
  derived, so confirm rather than edit
- `node scripts/audit-html.mjs --prod` once the deploy lands

## Blockers

None.

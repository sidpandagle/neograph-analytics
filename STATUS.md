# STATUS

**Updated:** 2026-10-17 02:50 IST
**Budget:** 7d used ~15% | ceiling (70% of pace) ~39% | headroom ~+23 points
**Merges to `main` today (IST):** #18 at 00:48 (pre-policy-change). Next
scheduled merge **21:00 IST** — one scheduled merge a day now; extra merges
only on the owner's request.
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

1. **R-13: first paint — waits for the 21:00–09:00 browser window.** FCP and
   LCP are the same event at ~1.3s on a server-rendered text page whose TTFB is
   89ms. Today's headless pass narrowed the candidates from the built HTML of
   `/methodology`, in document order: two render-blocking stylesheets totalling
   **74.6KB** (66,374 + 8,244 bytes), then **13 `async` chunk scripts in**
   **`<head>`**, then a `rel=preload` for `googletagmanager.com/gtag/js` carrying
   **no `fetchPriority`** — so a High-priority third-party fetch competing with
   the stylesheets, while Next's own chunk preload beside it is marked
   `fetchPriority="low"`. This also corrects the earlier note that gtag was
   absent from the static HTML; the preload link is in it, on every page. Next:
   trace with googletagmanager blocked to size its share, then choose between
   `strategy="lazyOnload"` for GA and splitting the 66KB stylesheet.
2. Watch Search Console for the 30 new URLs; resubmit the sitemap.
3. **The report expansion target is met** — 182 rows against the 142 it started
   from, so the 30–50 instruction is satisfied at 40. No round 5 is scheduled;
   the loop stays on review and fixes unless more reports are asked for.
4. A fresh review pass on the rotation (next focus: responsive 640–1024px).

## Blockers

None.

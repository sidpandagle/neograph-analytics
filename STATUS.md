# STATUS

**Updated:** 2026-10-17 00:55 IST
**Budget:** 7d used ~15% | ceiling (70% of pace) ~39% | headroom ~+23 points
**Merges to `main` today (IST):** **1 of 5** — #18 at 00:48. Four slots left.
**Mode:** running

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

- **R-9** — the client-logo marquee asserts relationships with 12 third-party
  marks. One yes/no per logo.
- **R-10** — 26 of the 182 reports are not healthcare. Keep and widen the
  positioning, or separate them? Copy now says "research verticals" either way.
- **R-4** — the Product/Offer schema publishes a hardcoded $2,995 with
  `InStock`, matching the visible price.
- **R-11** — no terms-of-use page exists; the Dataset schema wanted to cite one.

## Next up

1. **R-13**: first paint. FCP and LCP are the same event at ~1.4s on a
   server-rendered text page whose TTFB is 89ms, with DOMContentLoaded at 484ms
   — roughly 950ms where the DOM is ready and nothing is on screen. Block gtag
   at the network layer, then look at render-blocking CSS.
2. Watch Search Console for the 30 new URLs; resubmit the sitemap.
3. Round 5 of the expansion, or a fresh review pass.

## Blockers

None.

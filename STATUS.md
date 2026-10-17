# STATUS

**Updated:** 2026-10-18 00:15 IST
**Budget:** 7d used 25% | pace 74.5% | ceiling (70% of pace) 52.2% | **headroom
+27.2 points** — normal running
**Merges to `main`:** yesterday (17th) #18 at 00:48 and #19 at 17:40 on
request; **the 21:00 scheduled merge did not land — see Blockers.** Today (18th)
the 21:00 slot is open and PR #20 is what it would carry.
**Mode:** running. A second session, `neograph-analytics-72`, is working the
content pipeline on the same branch; file ownership agreed by message.

## Needs one click from Siddhant

**PR #20 is open, verified, and I could not merge it.** This session's
permission classifier refused `gh pr merge` as *"Merge Without Review"*. No
second PR was opened for the same branch.

https://github.com/sidpandagle/neograph-analytics/pull/20

What it carries to production:

```
Dataset.license            restored, 1 assertion per report page
/api/purchase-inquiry      400 on missing email, bad email, malformed body
footer                     4 legal links (was 3)
hero / listing copy        "182 reports across 13 verticals", derived
Button variant="danger"    label contrast 2.74:1 -> 6.87:1 dark, 4.37 -> 4.83 light
.prose wide tables         no longer scroll the whole page (R-22)
Dataset node               10 keys -> 12: spatialCoverage on 140 of 182, and
                           conditionsOfAccess on all 182 (C-4)
report ItemList            182 of 182 pages declare their TOC, pinned to the
                           rendered one by five audit rules (C-5)
RegionalBarChart           h2 -> h4 heading jump fixed on every report page
                           that has a regional section
CLAUDE.md                  names the second, dead filter implementation (C-6)
+ the three operating skills and the competitor-research seed, checked in
```

Verified before the PR was opened, and again after tonight's two fixes:

```
npm run build          exit 0, 182 report paths + 182 OG images
tsc --noEmit           clean
audit-html.mjs         18 of 18 routes error-free, 0 errors, 1 pre-existing warning
contrast-audit.mjs     0 failing pairs, both themes
source-hygiene.mjs     227 files, 0 findings
seo-unit.mjs           16 of 16
npm run lint           12 warnings, 0 errors — unchanged from this morning
```

## Tonight, 22:44 onward — the browser window

Three findings that had been waiting for 21:00-09:00 are settled, and all three
turned out differently from what the queue assumed.

**R-19, R-20 — now observed, not modelled.** Per-element sweep that composites
each text node's real background through its ancestors: `/about` 0 failing of
66, `/services` 0 of 93, a report page 0 of 218, `/design-system` 0 of 122,
both themes, worst case 4.63:1.

**R-30, new and fixed.** `Button variant="danger"` hardcoded `text-white` on
`--destructive`: **2.74:1 dark, 4.37:1 light**. The dark theme had already
declared #0B1120 for that fill in `--destructive-foreground-hsl` and then not
used it. `contrast-audit.mjs` had **no `--destructive` pair at all**, which is
why arithmetic never caught it; it has one now, negative-tested.

**R-22 — real, wrong mechanism.** Nothing is clipped; `overflow` does not apply
to a `display: table` box. The *grid track* overflows: an `auto` track with
`min-width: auto` inflated to the table's min-content width, 1,009px inside a
669px container, so the **page** gained horizontal scroll — +240px at 800px,
+22px at 1024px, none at 1280px. Fixed and re-verified at four widths.

**R-13 — both candidate levers refuted.** Slow 4G + 4x CPU on production
`/methodology`: FCP = LCP = 3,140ms, render delay 97.3%. The stylesheets finish
**1,286ms before** the paint and Chrome prices them at 0ms savings; `gtag/js`
completes at 4,113ms, about a second **after** the paint. Neither splitting the
66KB CSS nor deferring GA would move first paint. The gap is the first
style-and-layout pass — one **968ms layout over 362 nodes** — and it is not
intrinsic: forced relayouts on the settled page measure 0.1ms median.

## Needs Siddhant

- **R-31 (new).** Deferring GA returns **1,827ms of main-thread time and
  179.5kB**, but `lazyOnload` fires after `load`, so visitors who leave before
  that stop being counted and your session and bounce numbers move. One line
  either way. Not taken unilaterally because it is a measurement decision, not
  a performance fix.
- **Contracting entity and governing law.** The footer says NeoGraph Analytics
  Pvt. Ltd. (Pune); `lib/contact.ts` also lists Austin, TX.
  `/legal/terms-of-use` therefore defers to each order rather than naming one.
- **One live send through `/api/purchase-inquiry` is unverified.** Validation is
  tested; no real email was sent to `support@` without being asked.
- **R-26.** No published figure carries a named analyst; `neograph_reports` has
  no author column (32, checked) and `lib/jsonReports.ts:170` hardcodes
  `authors: []`. Three analyst profiles sit unlinked.
- **R-21.** The four `/about` impact stats carry `divide-white/[0.06]` with no
  `divide-x`, so 0 of 3 rules render. `divide-x` on a 2-up grid also stripes the
  row starts, so which rule was wanted is a design call.

## Next, in order

1. **Resubmit the sitemap** in Search Console after #20 deploys — it is the
   sitemap itself that changed, 204 URLs to 221 — and watch the 30 newer URLs.
2. **Verify #20 in production** with `audit-html.mjs --prod` once it lands,
   rather than inferring it from a green deploy.
3. **Competitor backlog: C-4, C-5 and C-6 are closed** (and R-29 with C-6).
   `C-1` and `C-3` are marked `needs-owner`. **`C-2` is the next unblocked
   item** — make segment shares readable as numbers.

   The one thing worth carrying forward from C-4: the new audit rule reported
   **18 of 18 clean while exercising neither key**, because all three report
   routes in the audit list happen to be rows with no regional breakdown. A
   green checker over a sample that cannot contain the defect is not evidence,
   and it looks exactly like evidence. Adding one route that does carry regional
   data immediately found the h2 → h4 jump. Worth checking, for any new rule,
   that the sample can actually fail it.
4. One open `BACKLOG.md` P1 remains: the chart set driven by real columns
   (`market_forecast`, segmentation share, regional bars). Recharts is already
   a dependency; `lib/chartUtils.ts` must not be wired up as-is — it returns
   Infinity and NaN on the zero and single-year cases.

## Blockers

**PR #20 cannot be merged from this session.** `gh pr merge` is refused by the
permission classifier as "Merge Without Review". Everything else tonight
proceeded; the branch is verified and waiting. If the merge should be
self-serviceable in future sessions, that is a permission rule for `Bash`, and
it is Siddhant's call rather than something to work around.

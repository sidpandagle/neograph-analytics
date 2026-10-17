# Competitor backlog

Actionable items derived from competitor observations in this folder, by the
`gather` skill. **This is the file an unattended agent reads.** Every item names
the file it would change and a condition that settles it, so work can start from
one line without reopening the competitor site.

**Updated:** 2026-10-17 — pass 1: grandviewresearch.com, mordorintelligence.com,
precedenceresearch.com (headless; IST 17:15 is outside the browser window, so
every competitor figure below is **modelled** from delivered HTML, not observed).
**Ids:** `C-1` upward, never reused. Evidence lives in `<site-slug>.md`.
**Rules:** `.claude/skills/gather/references/checklist-protocol.md`.

Standing constraints on anything taken from here:

1. No competitor copy, report titles, taxonomy strings or market figures ever
   enter this repo. Mechanism and structure only, expressed in our own words.
2. This is a research publication, not lead-gen. Lead-capture patterns go in
   **Rejected** at the bottom and stay there.
3. Items marked `needs-owner` wait for Siddhant — they need a Supabase column,
   new copy, legal text or a pricing decision.
4. No deletions. Closed items are struck through in place with the measurement
   that settled them.

---

## 1. Correctness and honesty

- [x] ~~**C-6 · content · S**~~ — **DONE 2026-10-18, commit in the same batch as
  C-5.** Re-verified independently before writing it into the doc that steers
  every session, and every number in the item held: **0** references to either
  file outside the two re-export lines in `components/reports/index.ts`;
  `REPORT_TYPES` and `PRICE_RANGES` commented out as "Reserved for future
  use" (2 of 4 option arrays) while `hasActiveFilters` at `:77-82` still tests
  both fields; `app/reports/page.tsx` renders `ReportsListingClient`.
  `grep -c FilterSidebar CLAUDE.md` returns **2**. Both files stay in place.
  Original item below.

  - [ ] ~~Add `FilterSidebar.tsx` and `FilterSection.tsx` to~~
  the dead-component list in `CLAUDE.md`, which currently names only the four
  unused charts, `MarketSizeChart`, `SegmentationChart`, `lib/chartUtils.ts` and
  `lib/html-toc-utils.ts`.
  - **Evidence:** counting our listing filters against theirs turned up a second
    filter implementation. `FilterSidebar.tsx` declares a 5-field `FilterState`
    (industries, regions, reportTypes, priceRanges, searchQuery) of which **2 of
    4** checkbox groups are commented out, and `grep` finds **0** importers
    outside `components/reports/index.ts`. The live listing is
    `ReportsListingClient.tsx`, which derives its own category counts and region
    options. So the repo holds **2** filter implementations, **1** of them live,
    and the doc that steers every session names neither (gather pass 1,
    2026-10-17).
  - **Touches:** `CLAUDE.md` (+ `REVIEW-QUEUE.md` for the mirror row)
  - **Done when:** `CLAUDE.md` names both files as unused, and `grep -c
    FilterSidebar CLAUDE.md` returns ≥ 1.
  - **Checker:** `manual: grep FilterSidebar CLAUDE.md` — plus the standing
    no-deletion rule, so the components stay in place.

## 2. Depth

- [ ] **C-1 · report · L · needs-owner** — Give each market driver and restraint
  a quantified row instead of a sentence: the driver, its contribution to the
  forecast CAGR, where that contribution applies, and over what period. Render
  the set as one table per side.
  - **Evidence:** mordorintelligence.com report page carries two tables with
    stable ids (`drivers-impact-analysis-*`, `restraints-impact-analysis-*`),
    each **4 columns** — driver · % impact on forecast CAGR · geographic
    relevance · impact timeline. Drivers: 8 `<tr>` / 25 `<td>` (7 data rows).
    Restraints: 6 `<tr>` / 17 `<td>` (5 data rows). So **7 drivers × 3
    quantified attributes**. **Ours:** `market_dynamics.drivers` is a list of
    **6 plain strings** and `restraints` **5 plain strings**, with no numeric
    attribute on any of them (`content/reports/advanced-wound-care-market.json`;
    `market_dynamics` keys are drivers/restraints/opportunities/challenges)
    (mordorintelligence.com, 2026-10-17).
  - **Touches:** `components/reports/JsonReportSections.tsx` (+ the
    `market_dynamics` object shape, `scripts/report-db.mjs check`, and the
    `research` skill's draft template)
  - **Done when:** a report whose `market_dynamics.drivers` entries are objects
    renders one `<table>` with one row per driver and one column per declared
    attribute, and `node scripts/report-db.mjs check content/reports/*.json`
    passes on a draft using the new shape. Every figure in it must come from our
    own research — no competitor number enters this repo.
  - **Checker:** `node scripts/report-db.mjs check content/reports/*.json`
  - **Why `needs-owner`:** changes the `market_dynamics` JSONB shape on 152 rows
    and asserts a per-driver CAGR contribution, which is a publication claim.

- [ ] **C-2 · report · L — RENDER HALF DONE 2026-10-18; the drafting half is
  what keeps it open.** The item was filed against the 43 local drafts, where
  **0 of 129** dimensions carried `market_share`. Against the **live** corpus
  the picture is the opposite and much larger: **186 of 470** dimensions on
  **141 of 182** rows carry shares, so `ComponentSharePieChart` was already
  firing on 141 published report pages with no numeric equivalent at all. All
  186 live share sums were measured and every one totals exactly 100.0, over 2
  to 7 segments, all with descriptions.

  Shipped: the donut's legend is now a real `<table>` — `<caption>`,
  `scope="col"` headers, one `scope="row"` per segment, a `<tfoot>` total,
  `tabular-nums`, the wrapper marked `role="img"` so assistive tech reads the
  figures once rather than twice. Built output: **186 tables against 186
  donuts on 141 of 182 report pages**, 1:1. Five new `audit-html.mjs` rules
  pin the table to the chart and were negative-tested six ways against
  corrupted built HTML — every corruption caught, nothing missed.

  Found and fixed in passing: `by_component` was drawn **twice** on the 11 rows
  that use that key, once from a hardcoded block in the Charts section and
  once from `MarketSegmentationSection`. The hardcoded block is gone, and every
  charted dimension now goes out inside `ChartFigure`, so all 186 carry a
  source line and a `/methodology` link instead of only the 11.

  **Still open — the only remaining condition:** the count of dimensions
  carrying `market_share` across `content/reports/*.json` is still **0 of 141**
  (47 drafts, re-measured 2026-10-18). Drafts publish without shares, so new
  rows render as `SegmentListCard` bullets. That half needs a share figure in
  the `research` skill's draft template and real per-segment research behind
  it — no number gets invented to close a checklist item. Original item below.

  - [ ] Make segment shares readable as numbers. Populate a
  share figure per segment in the drafting pipeline, and render each dimension
  that has shares as a table beside its chart, so exact values are legible and
  the chart has a text equivalent.
  - **Evidence:** across **43** local drafts there are **129** segmentation
    dimensions and **0** of them carry a `market_share` key, so
    `ComponentSharePieChart` never fires from a draft and **129 of 129**
    dimensions render as `SegmentListCard` bullet lists with no figure
    (`components/reports/JsonReportSections.tsx:242-275`; measured over
    `content/reports/*.json`). The pie branch also has **0** `<table>` and **0**
    `role`/`aria-label` in `charts/ComponentSharePieChart.tsx`, so even when it
    does fire there is no numeric fallback. **Theirs:** mordorintelligence.com
    publishes segment structure as **5** `segmentation-toc-table` tables plus a
    **46-entry** `ItemList`; grandviewresearch.com **6** tables;
    precedenceresearch.com **4** (2026-10-17).
  - **Touches:** `components/reports/JsonReportSections.tsx` (+
    `components/reports/charts/ComponentSharePieChart.tsx`, and the `research`
    skill's draft template for the share field)
  - **Done when:** for a report whose `market_segmentation` has a dimension with
    `market_share`, the built HTML contains a `<table>` with one row per segment
    whose values match the chart's, and the count of dimensions carrying
    `market_share` across `content/reports/*.json` is > 0.
  - **Checker:** `node scripts/audit-html.mjs` + `manual: count dimensions with
    market_share across content/reports/*.json (today: 0 of 129)`
  - Cross-reference: `BACKLOG.md:36` ("chart set driven by real columns") is the
    chart side of the same data gap; this item is the numeric-table side.

- [ ] **C-3 · dataviz · S · needs-owner** — State reuse terms for our figures in
  the figure caption, so a reader who wants to cite a chart knows what is
  permitted without reading the legal pages.
  - **Evidence:** mordorintelligence.com puts a reuse-licence line in **5 of 5**
    `<figcaption>` elements on a report page (attribution-required reuse), though
    it carries **no** data-source line. **Ours** is the inverse:
    `components/reports/ChartFigure.tsx:32-45` emits `<figure>`/`<figcaption>`
    with a `Source:` line, a modelling note and a `/methodology` link on all
    **3** rendered charts, and **no** reuse terms (2026-10-17).
  - **Touches:** `components/reports/ChartFigure.tsx` (+
    `app/legal/terms-of-use` for the terms it points at)
  - **Done when:** every `<figcaption>` in a built report page contains both a
    `Source:` line and a reuse-terms link that resolves to a route the build
    renders — the same assertion `audit-html.mjs` already enforces for
    `Dataset.license` after R-11.
  - **Checker:** `node scripts/audit-html.mjs`
  - **Why `needs-owner`:** the reuse terms are legal text and Siddhant's call.

## 3. Navigation and findability

_(empty — see **Rejected**: all three sites ship **0** report filters and **0**
sort options on their healthcare listing. Our listing already derives a
19-category filter with live counts, a region select that drops itself while one
distinct value exists, a search box and 12 per page, server-rendered. Nothing
filed.)_

## 4. Craft

_(empty this pass — typography, spacing, states and scroll behaviour cannot be
measured headless. They are listed under **Open** in each site note and wait for
the 21:00-09:00 IST browser window.)_

## 5. Technical / SEO

- [x] ~~**C-4 · seo · S**~~ — **DONE 2026-10-17, commit `34141c4`.** Settled by
  measurement: the Dataset node now carries **12** keys, not 10.
  `spatialCoverage` is emitted on **140 of 182** report pages as `Place`
  objects taken from the row's own `regional_analysis`; the other **42** carry
  no regional breakdown and emit nothing rather than a guessed "Global".
  `conditionsOfAccess` is on all 182. `audit-html.mjs` asserts both shapes and
  was negative-tested three ways. The rule's first run reported 18 of 18 clean
  while testing nothing — all three audited report routes were rows without
  regions — so `/reports/ai-in-lab-automation-market` joined the list, and it
  immediately found an **h2 → h4 jump** in `RegionalBarChart` on every report
  page with a regional section (fixed in the same commit).
  Original item below.

  - [ ] ~~Add `spatialCoverage` and `conditionsOfAccess` to the~~
  report `Dataset` node. We already hold the geographic coverage that
  `spatialCoverage` wants, and report bodies are purchasable, which is exactly
  what `conditionsOfAccess` is for.
  - **Evidence:** mordorintelligence.com's report `Dataset` node carries **15**
    keys including `spatialCoverage` and `conditionsOfAccess`;
    grandviewresearch.com's carries **8**; precedenceresearch.com emits **no**
    `Dataset` at all. **Ours** carries **10** — name, description, url,
    publisher, creator, datePublished, license, keywords, temporalCoverage,
    variableMeasured — and neither of those two
    (`components/seo/StructuredData.tsx:209-249`) (2026-10-17).
  - **Touches:** `components/seo/StructuredData.tsx` (+
    `app/reports/[slug]/page.tsx:336` to pass the values through)
  - **Done when:** the built report HTML's `Dataset` node contains
    `spatialCoverage` sourced from the row's geographic coverage and a
    `conditionsOfAccess` string, and `audit-html.mjs` passes. Do not add
    `distribution`/`DataDownload` — see **Rejected**.
  - **Checker:** `node scripts/audit-html.mjs`

- [x] ~~**C-5 · seo · M**~~ — **DONE 2026-10-18, commit `bec488f`.** All **182**
  report pages now emit an `ItemList` (13 entries on the audited row), built
  from the same `sidebarTOC` array the sidebar renders. `audit-html.mjs`
  compares the declared list against the anchors actually in
  `nav[aria-label="Report details"]` — count, order, per-entry anchor, and
  that every declared anchor is an id the page really has — so the two cannot
  drift. Five rules, all negative-tested against corrupted built HTML.
  Original item below.

  - [ ] ~~Declare the report table of contents as an `ItemList`~~
  in JSON-LD, built from the same source the rendered TOC uses, so the section
  structure is machine-readable as well as visible.
  - **Evidence:** mordorintelligence.com's report page emits an `ItemList` with
    **46** entries alongside `Dataset` and `FAQPage`; their listing emits a
    `CollectionPage` + `ItemList` too. **Ours:** **0** `ItemList` anywhere —
    `components/seo/StructuredData.tsx` defines generators for Organization,
    WebSite, Article, Breadcrumb, FAQ, Product, Dataset and LocalBusiness, and
    the report page renders **5** nodes (Article, Product, Dataset,
    BreadcrumbList, FAQPage). Our TOC is rendered from `lib/reportToc.ts` and
    declared nowhere (2026-10-17).
  - **Touches:** `components/seo/StructuredData.tsx` +
    `app/reports/[slug]/page.tsx` (+ `lib/reportToc.ts` as the single source, so
    the list cannot drift from the rendered TOC)
  - **Done when:** the built report HTML contains an `ItemList` whose
    `itemListElement` count equals the number of items `lib/reportToc.ts`
    produces for that row, and `audit-html.mjs` passes.
  - **Checker:** `node scripts/audit-html.mjs`

## 6. Rejected — do not re-file

Patterns seen on competitor sites and deliberately not adopted. The next run
checks this list before filing.

**Seeded before pass 1:**

- ~~Email wall in front of a report's own prose~~ — we publish the analysis; gating it contradicts being a publication.
- ~~Exit-intent and scroll-depth popups~~ — interrupts reading.
- ~~"Speak to an analyst now" chat widget~~ — no sales floor behind it.
- ~~Countdown timers / "only N licences left"~~ — manufactured urgency on a research product.
- ~~Client-logo walls and unattributed testimonials~~ — unverifiable claims.

**Added by pass 1 (2026-10-17):**

- ~~`distribution` / `DataDownload` in the `Dataset` node~~ — mordorintelligence.com declares **2** `DataDownload` nodes. We do not serve a downloadable dataset, and declaring one would be a false claim in structured data. Revisit only if a real download ships.
- ~~`SpeakableSpecification` in report JSON-LD~~ — present on both grandviewresearch.com and mordorintelligence.com report pages. It is a news-oriented voice feature, not a market-research one; adding it is cargo-cult schema with no reader benefit.
- ~~An 81-item country/region checkbox grid on the listing~~ — mordorintelligence.com ships 81 geography checkboxes inside a **582 KB** listing page, 5.4× their own home page. It only pays off at their catalogue size; our corpus is 152 rows and every one is `Global` (see `REVIEW-QUEUE.md` R-0c, which already dropped our 6-option region select for exactly this reason).
- ~~A newsletter industry picker as a listing's only `<select>`~~ — mordorintelligence.com's healthcare listing offers **0** report filters and **1** select, and that select signs you up to a newsletter. Subordinates findability to list-building.
- ~~Report-page sales routing (`/ask-an-analyst/*`, `/speak-to-author/<id>`)~~ — grandviewresearch.com links both from the report page. Roster rule 3: no sales floor behind it.
- ~~A per-report methodology page that is `Disallow`-ed in `robots.txt`~~ — grandviewresearch.com publishes `/industry-analysis/<slug>/methodology` and then blocks it. Publishing a methodology and hiding it from crawlers is the opposite of the transparency we want; our single public `/methodology`, linked from inside every chart caption, is the better shape.
- ~~**30** distinct price points on one report page~~ — precedenceresearch.com spans `USD 143` to `USD 5,400` across report licences and separate databook SKUs, with 19 radio inputs to pick between them. Pricing granularity presented as product depth; pricing is Siddhant's call regardless.
- ~~Raster-only figures~~ — precedenceresearch.com's report page has **47** `<img>`, **0** `<svg>`, **0** `<canvas>` and **0** `<figcaption>`: every chart is a flat bitmap with no attached source line. Cheaper to produce, strictly worse for a publication. Recorded so "their report HTML is lighter (137 KB vs our charts)" is never read as a target.
- ~~Client-rendered listing cards~~ — precedenceresearch.com's healthcare listing ships an un-interpolated `${report.CustomName}` inside an `href`, so with JS off the grid links nowhere, and the page carries **0** `h1`. A defect, not a mechanism.
- ~~Meta descriptions over 160 characters~~ — mordorintelligence.com runs **265** chars on a report and **290** on a listing; `lib/seo.ts` caps ours at 160, which is the right side of this.

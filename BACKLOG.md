# BACKLOG

Priority order. `[P0]` = site is broken / losing traffic. `[P1]` = high value.
`[P2]` = improvement. `[H]` = needs Siddhant. Items move to Done, never deleted.

## P0 — critical
- [x] **Soft-404 on 130 report pages.** `app/reports/[slug]/page.tsx` reads
      `data/all_reports.json` (10 reports) while `sitemap.ts` lists all 140 from
      Supabase. The 130 missing slugs return the "Report Not Found" page with
      **HTTP 200** — Google reads these as soft 404s and it drags down the whole
      domain. Fix: route the detail page through Supabase (`lib/api/reports.ts`),
      keep the JSON path as fallback.
      **DONE 2026-10-15 — PR #4 — dynamicParams=false; /reports/zzz-nope now 404.**
- [x] **Stale production cache.** Homepage served with `Age: ~28 days`. New
      content may never reach visitors. Investigate revalidate/ISR config.

      **DONE 2026-10-15 — PR #4 — revalidate on 11 routes; Age 2,399,980s -> 1s.**
## P1 — data fidelity (biggest content win)
- [x] `rowToReport` in `lib/api/reports.ts` discards ~20 of 32 Supabase columns
      and hardcodes `pages: 150`, `price: '$2,995'`, `marketShare: 'N/A'`,
      `region: 'Global'`, empty `authors`/`fullReportTOC`. Map everything real;
      drop invented values.
      **DONE 2026-10-15 — PR #5 — invented values removed.**
- [x] Render the unused columns: `market_dynamics`, `market_segmentation`,
      `regional_analysis`, `country_analysis`, `regulatory_landscape`,
      `recent_developments`, `research_methodology`, `company_profiles`,
      `key_highlights`, `reader_takeaways`.
      **DONE 2026-10-15 — PR #5 and #7 — incl. all segmentation dimensions.**
- [x] `getReportBySlug` runs a second full-table query just to compute an array
      index. Remove it. **DONE 2026-10-16.**
- [x] Listing page does `select('*')` over 140 rows of large JSONB. Select only
      the columns the cards need. **DONE 2026-10-16** — `getReportCards()`;
      `/reports` HTML 508KB -> 184KB with the corpus up from 142 to 152.

## P1 — visuals
- [x] Build a chart set driven by real columns: forecast line (`market_forecast`),
      segmentation share, regional bars, country comparison, competitive position.
      Recharts is already a dependency.
      **DONE 2026-10-18 for four of the five; the fifth is refuted, not deferred.**
      Forecast line, segmentation share and regional bars shipped earlier in the
      week. **Country comparison** shipped 2026-10-18 —
      `components/reports/charts/CountryBarChart.tsx`, on **140 of 182** report
      pages, 1:1 with the country table beside it, audit rule negative-tested
      three ways.
      **Competitive position cannot be built from this data and should not be
      faked.** Measured with `scripts/column-population.mjs`:
      `competitive_landscape` has a first element on **182 of 182** rows and the
      only numeric field on it is `founded` (142 of 182); `market_position` is
      prose and `company_profiles.revenue` is a string ("42B"). There is no
      disclosed share to position anyone by, so a scatter or quadrant would be
      axes invented to look like measurement — which is the thing this
      publication refuses to do. Reopen only if a share column is added and
      sourced per company.
- [x] Per-report OG images (1200x630) generated from market metrics.
      **DONE 2026-10-16** — `app/reports/[slug]/opengraph-image.tsx`, build-time,
      no image host and no egress. All 152 reports previously shared one stock
      photo.
- [x] ~~`cdn.neographanalytics.com` + R2~~ **DROPPED 2026-10-15.** The domain is on
      GoDaddy nameservers, not Cloudflare, and R2 custom domains require the zone to
      be on Cloudflare. Not worth migrating DNS on a live domain. Visuals ship as
      inline SVG instead (no hosting, no egress, no image-optimization quota).
- [x] ~~Repoint author/team avatar `<img>` srcs from the non-resolving CDN host~~
      **NOT A DEFECT 2026-10-16** — measured: `image_url` is empty on all 3 team
      rows and both render sites guard on it, so no broken image is served. The
      only CDN reference left is a `remotePatterns` entry in `next.config.ts`.

## P2 — technical
- [x] JSON-LD audit (Dataset/Report, FAQPage, BreadcrumbList) — 6 ld+json blocks
      already render; verify correctness against the real data.
      **DONE 2026-10-16** — 8 blocks audited. `Dataset.license` pointed at a
      404ing `/legal/terms-of-use` on all 152 pages (removed; R-11 covers
      writing one); `datePublished` was `"2026"` / `"December 18, 2025"`, not
      calendar dates (normalised). Breadcrumbs, FAQ parity and
      `temporalCoverage` checked and correct. `scripts/audit-html.mjs` now
      enforces all of it.
- [ ] Core Web Vitals pass (LCP, CLS) on report + listing pages.
- [ ] Accessibility pass: headings, contrast, focus states, tap targets.
- [x] Reconcile `data/all_reports.json` (10) / `bulk` (107) / `old` (104) /
      `reports.json` (12) against Supabase (140). Document the canonical source.
      **DONE 2026-10-16** — table in `AGENTS.md`: Supabase `neograph_reports`
      (152) is canonical; `all_reports.json` is the fallback behind
      `lib/supabaseReports.ts`; `bulk`/`old` are historical and unused;
      `categories.json` is a slug map whose 6 unmatched entries no longer reach
      the UI. The snapshots stay — they are what stops a Supabase outage
      rendering an empty site.
- [x] `AGENTS.md` is stale (claims no database). Refresh to match reality.
      **DONE 2026-10-16** — rewritten. It also said the dev server runs on 3000
      (it must not — that port is Siddhant's), that dark mode switches on
      `prefers-color-scheme` (there is no such block), and that `lib/utils.ts`
      exports `slugify` (it does not). It now carries the data table, the
      publish/deploy sequencing rule, the egress discipline and the checkers.

## P1 — owner decisions, answered 2026-10-17
- [x] **R-9** client-logo marquee — owner confirms all 12 relationships. No change.
- [x] **R-4** $2,995 / `InStock` — owner confirms the price. Schema stays. Verifying
      it exposed that the checkout form never sent the lead anywhere; fixed with
      `/api/purchase-inquiry`.
- [x] **R-11** terms of use — drafted and published to `neograph_legal_pages`;
      `Dataset.license` restored on 182 pages; footer link added.
      **Governing law is not asserted** — Pune Pvt. Ltd. and an Austin office both
      appear in the repo. Naming the contracting entity is Siddhant's call.
- [x] **R-10** 26 non-healthcare reports — **kept, positioning widened.** 28 rows
      relabelled out of `Life Sciences` into 7 honest industries; the corpus now
      reads 13 verticals. Copy widened at root, home, `/reports` and `/about`.

## P1 — new content
- [ ] Research + publish new reports into `neograph_reports`, full schema,
      primary sources cited. Target 2-3/day once P0 is clear.
- [ ] Supporting analysis articles that internally link related reports.

## Done
See the `**DONE**` annotations against each item in place; the item text is kept
so the original diagnosis stays readable next to what was actually shipped.

Shipped 2026-10-15: PR #4 (soft 404s, stale cache, fabricated ratings, canonical
leak), #5 (real figures, TOC, methodology), #6 (form hardening), #7 (segmentation
recovery + first sourced report), #8 (document structure, landmarks, titles,
sidebar widths), #9 (server rendering on /reports and /request-sample),
#10 (wide-screen layout, /consulting 404).

## Added 2026-10-15 — from Search Console + UI review
### P0 — credibility (fabricated data on a research site)
- [x] `components/home/HeroSection.tsx:11-15,62,65,102` — hero chart hardcodes a
      "Global Telemedicine Market" with invented figures ($286B/$331B/$842B,
      CAGR 16.8%, "North America 38.4% share") for a report URL that 404s.
      Drive from a real report record.
      **DONE 2026-10-15 — PR #5 — driven from real corpus data.**
- [x] `HeroSection.tsx:5-7,29,37` — "2,500+ Research reports / 1,000+ Satisfied
      clients / 50+ Countries" (actual: 140). `app/about/page.tsx:53-58` adds
      "500+ Projects / 1,000+ Healthcare Clients / 50+ Specialists / 10+ Years".
      Derive the count from data; drop unsubstantiated claims.

      **DONE 2026-10-15 — PR #5 — counts derived from the corpus.**
### P0 — SEO discovery
- [x] **Submit sitemap to Search Console** — DONE 2026-10-15 after the fix
      deployed. Google read it same-day: Status Success, 158 pages discovered.
- [ ] Only 7 pages indexed of 158. Re-check coverage ~2 weeks after the fix ships.
- [ ] Demand exists and is unconverted: "ai in oncology market" 506 impressions /
      0 clicks, "ai oncology analytical solution market" 217/0, "ai in cancer
      diagnostic market" 181/0, avg position 31.8. Prioritise oncology-cluster
      reports and internal linking once pages resolve.

### P1 — make the research legible (UI review)
- [x] `app/reports/[slug]/page.tsx:131` hardcodes `hasFullContent = false`, which
      disables the whole TOC aside in `ReportContentWrapper.tsx:88`. The sticky
      price rail is ungated. Turn the TOC on, demote the CTA.
      **DONE 2026-10-15 — PR #5 — TOC enabled, 13 anchors.**
- [x] `research_methodology` is in every row and never rendered. Add a
      "How we built this" section + credential strip.
      **DONE 2026-10-15 — PR #5 — MethodologySection.**
- [ ] `lib/jsonReports.ts:170` hardcodes `authors: []` -> no byline, and an
      author-less Article schema. Add analyst attribution.
- [ ] Charts have no `<figure>/<figcaption>`, no source note, no figure number;
      `charts[].data_source` is unused.
- [ ] ~~Base-year figure disagrees with the chart's first plotted point ($64.5B tile
      above a line starting at $68.2B).~~ **FIRST HALF FIXED 2026-10-18.**
      Mechanism measured: `base_year` is outside `market_forecast` on **141 of
      182 rows**, with the gap exactly 1 year in all 141, while the other 41
      include it and its value equals `market_size.current_value` exactly in
      all 41. The series now starts at the base year on all 182 — which also
      made the chart's `ReferenceLine` labelled "Base" render for the first
      time; it had been anchored to a year the axis did not contain on 77% of
      report pages. **Still open:** `historical_period` 2019-2023 is never
      plotted, so there is no actual-vs-forecast distinction. No historical
      series is stored, so that half needs data before it needs code.
- [ ] ~~Analyst prose is `text-xs` (12px) at ~2.9:1 contrast — fails WCAG AA~~ — and
      the measure runs ~95 characters. Promote to 16-17px/1.65, cap at ~68ch.
      **RE-MEASURED 2026-10-18 and mostly stale, with one real defect found and
      fixed.** Body prose on a report page is `text-sm`, not `text-xs`: across
      all 182 built pages, **1,669** paragraphs over 120 characters are
      `text-sm` and **0** are `text-xs`. The contrast half was settled by R-19,
      R-20 and R-30 — 0 failing pairs in both themes, 0 failing elements in a
      rendered per-element sweep. What was real: `KeyHighlightsSection` split
      each highlight on its **first colon** and set everything before it in
      12px bold uppercase. Measured over the live corpus — 757 highlights on
      182 rows, 49 containing a colon, median prefix **44** characters, maximum
      **142**, and exactly **10** of the 49 a genuine label (all of them the
      word "Headline"). So the heuristic was right 10 times and wrong 39,
      shouting whole findings. A label is now required to be at most 2 words
      and 24 characters with no sentence punctuation; `audit-html.mjs` fails
      any uppercase paragraph over 40 characters, negative-tested at the
      boundary (41 caught, 40 passes). Built pages now carry **0** `text-xs`
      paragraphs over 120 characters, down from 3.
      **Still open:** the promotion of body prose from 14px to 16-17px and a
      ~68ch measure is a typography decision across every report page, so it
      stays here rather than being taken unilaterally.
- [x] MegaMenu renders 28 `<h3>`s before the page `<h1>`, wrecking the document
      outline for crawlers. Make them spans.
      **DONE 2026-10-15 — PR #8 — now 0 headings before h1 on all 13 pages.**
- [ ] Both SearchBars import the whole corpus into a client component and match
      contiguous substrings only. Will ship multi-MB once 140 reports load.
- [x] ~~A11y: two `<main>` landmarks, no skip link, FAQ accordion lacks
      `aria-expanded`/`hidden` (collapsed links stay tabbable), mobile drawer's
      ~40 links stay focusable when closed, country table clips instead of
      scrolling, heading levels skip h2->h4.~~
      **ALL SIX VERIFIED FIXED 2026-10-18** — re-measured against the current
      build rather than taken on the item's word, across a report page, `/`,
      `/about`, `/reports` and `/blog`: **1** `<main>` per page (not 2), a skip
      link present on all five, **1** `h1` per page, **0** heading-level skips,
      and the FAQ accordion emits `aria-expanded="false"` with
      `aria-controls` on all 4 buttons against 4 panels that each carry
      `hidden`, `role="region"` and `aria-labelledby`. The mobile drawer sets
      `visibility: hidden` plus `aria-hidden` when closed
      (`Navigation.tsx:150-161`), which is what takes its links out of the tab
      order; the code even carries the comment explaining it. The country table
      scrolls rather than clips (R-22), and the h2->h4 jump was the
      `RegionalBarChart` heading, fixed alongside C-4. Fixed in pieces by other
      items; nothing was outstanding by the time this was checked.

## Added 2026-10-15 — technical/functional audit
### P0
- [x] **Soft 404s are caused by `loading.tsx`, not by the data source.** 6/6
      correlation: routes with a sibling `loading.tsx` (`reports/[slug]`,
      `blog/[slug]`, `press-releases/[slug]`, `authors/[id]`) return 200 on
      unknown slugs; `legal/[slug]` and `consulting/[slug]` have none and
      correctly return 404. The stream starts before the lookup resolves, so the
      status line is already flushed. Fixing the data source does NOT fix this.
      **DONE 2026-10-15 — PR #4 — loading files moved to legacy/.**
- [x] **28-day stale cache root cause:** `app/reports/page.tsx:7` is the only
      `revalidate` in the app. Every other page is an infinite-cache static
      prerender (`X-Nextjs-Stale-Time: 4294967294`). Supabase edits can never
      reach production between deploys. Add `revalidate` across all routes.
      **DONE 2026-10-15 — PR #4.**
- [x] **Fabricated `aggregateRating` on all 140 reports.**
      `components/seo/StructuredData.tsx:195-202` hardcodes `ratingValue: '4.7'`,
      `reviewCount: '45'` with no reviews on the page. Violates Google's
      review-snippet policy — risks sitewide rich-result loss or a manual action.
      Remove immediately.
      **DONE 2026-10-15 — PR #4 — removed.**
- [x] **`public/robots.txt` points at `synapticresearch.com`** (previous brand) and
      conflicts with `app/robots.ts` — local `/robots.txt` returns HTTP 500.
      Which file wins in a Vercel build is build-order dependent.
      **DONE 2026-10-15 — PR #4 — moved to legacy/.**
- [x] **13+ pages canonicalise to the homepage.** All 10 `/consulting/*`,
      `/contact`, `/request-sample`, `/authors/*` inherit `app/layout.tsx:69`
      `canonical: '/'`. Google treats them as duplicates of `/`.
      **DONE 2026-10-15 — PR #4 — root canonical removed.**
- [ ] Hardcoded `price: '$2,995'` is published as Product/Offer JSON-LD with
      `InStock` on all 140 reports, while checkout throws by design.
- [ ] ~~No `error.tsx`/`global-error.tsx` anywhere~~; `lib/api/consulting.ts:22,42`
      throws instead of returning `ApiResponse`, so a Supabase outage fails the
      build or shows a bare error screen.
      **HALF STALE 2026-10-18** — `app/error.tsx`, `app/global-error.tsx`,
      `app/not-found.tsx` and `app/consulting/[slug]/not-found.tsx` all exist;
      an earlier session added them and the bullet was never updated. The
      `consulting.ts` throws stand, and the open question is whether a Supabase
      outage *should* fail the build (keeping the last good deploy) rather than
      render an error page - so this is a decision, not a bug.
- [x] ~~Sitemap fragmentation: `robots.ts` advertises only `/sitemap.xml`;
      `/sitemap-pages.xml`, `/sitemap-consulting.xml` are referenced nowhere, so
      consulting and legal URLs are in no discoverable sitemap. Reports are
      declared twice with conflicting priority.~~
      **DONE 2026-10-18.** The discoverability half was fixed by R-24 —
      `/sitemap.xml` carries all 221 URLs including the consulting and legal
      pages. The contradiction half is fixed now: both legacy routes are **308
      permanent redirects to `/sitemap.xml`**, superseded rather than deleted,
      with the previous generator's git ref in each file header. Measured first:
      `/sitemap-consulting.xml` was 10 of 10 already in the canonical sitemap,
      `/sitemap-pages.xml` 8 of 8 (its homepage entry being the bare host
      against the canonical trailing-slash form), and the pages route stamped
      `lastModified: new Date().toISOString()` on every entry — the same lying
      date `eaba86a` had just removed from the main sitemap. Verified over HTTP
      on port 3102, both 308ing to a 221-URL sitemap. The redirect is
      host-relative; the absolute form sent a local verification run to
      production.
      **Not touched, deliberately:** `/api/sitemap-reports/[page]` and its blog
      and press-release siblings are also unadvertised and also declare report
      URLs, but they paginate at 500 against a 50,000-URL limit — a growth
      mechanism rather than a stale subset. They stay.

### P1
- [x] `/consulting` returns 404 but is linked from 3 places and listed in
      `sitemap-pages.xml`. `/authors` 404s but is every author breadcrumb parent.
      **DONE 2026-10-15 — PR #10 — 308 -> /services; /authors is a legitimate 404, nothing links it.**
- [ ] `lib/api/authors.ts:9-20` identifies authors by array position, not by id —
      inserting a team member silently repoints every author URL.
- [ ] `getReportsByAuthorId` and `getReportsByCategory` return `[]` with
      `success: true` (unimplemented), so every author page publishes "0 reports".
      **The published claim is fixed 2026-10-18; the data gap is not.** The three
      author pages are in `/sitemap.xml` and each said "Total Reports Authored:
      0" over an empty state naming the analyst as having authored nothing - a
      statement about a named person that the corpus cannot support, because
      `neograph_reports` has no author column (R-26). The empty state now says
      figures are published under organisational attribution, and the counter
      tile renders only when the count is above zero. Implementing the join
      needs the column, which is R-26 and Siddhant's.
      `getReportsByCategory` is called from nowhere.
- [x] ~~Checkout collects buyer details then `lib/api/orders.ts:8` throws
      unconditionally — with no error boundary, a buyer sees a white screen.~~
      **NOT A DEFECT 2026-10-18** — no code path reaches it. `createOrder` and
      `captureOrder` are called from nowhere in `app/` or `components/`; the
      only grep hit, `PayPalButton.tsx:58`, is the PayPal SDK's own
      `createOrder` prop resolving an id it already holds. Dead code, kept per
      the no-deletion rule. `app/error.tsx` also exists now.
- [x] Form handlers (`api/contact`, `api/request-sample`, `api/not-found-inquiry`)
      do no validation or HTML escaping and have no rate limit; attacker-controlled
      `replyTo` + raw HTML interpolation = phishing from support@, plus Resend
      quota burn.
      **DONE 2026-10-15 — PR #6 — validated, escaped, rate-limited.**
- [x] `StructuredData.tsx:20-23` does `JSON.stringify` into
      `dangerouslySetInnerHTML` without escaping `<` — a `</script>` in report text
      breaks out of the script tag.
      **DONE 2026-10-15 — PR #4 — escapes < as \u003c.**
- [ ] `/reports` ships 502KB of HTML (all 140 reports' JSONB) and paginates
      client-side, so Google only ever sees page 1.
- [x] `.toFixed()` called directly on untyped JSONB values in 6+ places; one
      string-typed number in the DB throws and blanks the page.
      **DONE 2026-10-15 — PR #7 — lib/format.ts; 1 bad row found and corrected.**
- [ ] Chart projection math yields NaN when market size is 0/absent
      (`MarketGrowthChart.tsx:33-44`, `lib/chartUtils.ts:73,90`).
- [x] ~~`sitemap-reports/[page]/route.ts:29` throws RangeError on a null
      `published_year`, dropping all 140 report URLs from that sitemap.~~
      **FIXED 2026-10-18 — and the filed mechanism was wrong.** The route is
      now `app/api/sitemap-reports/[page]/route.ts:28`. It does **not** throw:
      measured on Node 24, `new Date("")` is an Invalid Date and would throw,
      but the template is `${year}-01-01`, so the empty year makes
      `new Date("-01-01")`, which parses cleanly as **1 January 2001** — as
      does `new Date("soon-01-01")`. Nothing crashes and no URL is dropped.
      The row is published with a `lastModified` of 2001 instead, and because
      that string is parsed as *local* midnight and written out with
      `toISOString()`, it reads 2000-12-31 from IST — a wrong date asserted to
      crawlers that also varies with the build machine's timezone, which is
      R-18's class of defect. Quieter than the filed bug and harder to notice.
      `safeYear()` now keeps such a row out of the sitemap, and
      `scripts/api-unit.mjs` asserts the corrected mechanism so the rationale
      cannot drift back. Whether any row actually has a null `published_year`
      was not checked against Supabase.
- [ ] Synthetic `id` is a position in a year-sorted list; publishing one report
      renumbers every older one. `neograph_reports` has no `id` column — use
      `slug`/`report_id` as the stable key.

### P2
- [x] ~~PostgREST filter injection in `.or()` search paths (currently dead code).~~
      **FIXED 2026-10-18.** 3 sites confirmed before the fix
      (`lib/api/reports.ts:58`, `blogs.ts:13`, `press-releases.ts:15`), all
      still with 0 callers outside their own files. Each now builds its filter
      with `ilikeAny()` from the new `lib/api/pgrst.ts`, which double-quotes
      the value so a comma cannot open a new alternative, a parenthesis cannot
      close the group and a dot cannot start an operator, escapes `\` and `"`
      inside the quotes, makes a user's own `%`/`_` literal, and clamps the
      term to 120 characters. 24 offline assertions in
      `scripts/api-unit.mjs`, including the backslash-then-quote break-out.
- [x] ~~`getLegalPages`/`getBlogs`/`getPressReleases` accept page/limit then
      fetch whole tables and slice in JS — wasted metered egress.~~
      **FIXED 2026-10-18.** Reproduced first: `getLegalPages` was the literal
      fetch-then-slice (`select('*')` then `pages.slice(start, …)`), while
      `getBlogs` and `getPressReleases` had stopped slicing but still
      `select('*')` over the whole table with their page/limit ignored. All
      three now apply the window with `.range()` via `rangeFor()`, and
      `getLegalPages` names its 8 columns instead of `*`. **A caller that
      passes neither page nor limit still gets the whole table**, so no
      existing call site changes behaviour — the fix is that asking for one
      page now costs one page.
- [ ] `<img>` instead of `next/image` on author/team avatars, which point at the
      non-resolving CDN, so they are broken images today. `logo.png` is 185KB.
- [ ] Generate Supabase types (`supabase gen types typescript`) to turn the
      `.toFixed()` bug class into compile errors.

## Content plan — oncology cluster (added 2026-10-15)
Evidence: Search Console shows real, unconverted oncology demand while the corpus
holds only **2 oncology reports**, both AI-framed (`ai-in-oncology-market`,
`ai-in-oncology-for-analytical-solutions-market`), both ranking around position 30.

Demand (90 days, impressions / clicks):
- `ai in oncology market` 506 / 0
- `ai oncology analytical solution market` 217 / 0
- `ai in cancer diagnostic market` 181 / 0
- `oncology consulting` 84 / 0, `oncology consulting services` 36 / 0,
  `oncology consulting firms` 31 / 0, `private oncology strategy consultant` 48 / 0
- `oncology information systems market` 40 / 0, `oncology analytics` 29 / 0

Reading: Google already associates the domain with AI-oncology but has nothing
deep enough to rank. Two reports cannot carry a topic cluster. The consulting-intent
queries point at `/consulting/*`, which until today canonicalised to the homepage —
that fix alone may move them.

Proposed reports, in priority order (each needs primary sources and its own visuals):
1. **AI in Cancer Diagnostics Market** — 181 impressions, no dedicated report.
2. **Oncology Information Systems Market** — 40 impressions, exact-match gap.
3. **Precision Oncology & Companion Diagnostics Market** — adjacent, high value.
4. **Radiation Oncology / Radiotherapy Market** — no coverage at all.
5. **Cancer Immunotherapy Market** — anchors the cluster commercially.

Each must interlink with the two existing oncology reports and with the oncology
consulting service page, so the cluster reinforces itself rather than competing.

Corpus shape for reference: 140 reports across 6 industries — Biotechnology 38,
Healthcare IT 38, Life Sciences 23, Pharmaceuticals 20, Medical Devices 16,
Medical Imaging 5. Medical Imaging is thin relative to demand.


## Added 2026-10-15 (evening) — from the headless audit cycle

The audit fetches 13 routes and checks heading order, landmarks, ARIA wiring,
form labelling, title/description length, canonicals and JSON-LD validity. It
runs against `.next/server/app/*.html` before a commit and against production
after the deploy. Seven of eleven audited pages now come back clean.

### Fixed in the same cycle
- [x] Both report rails were `col-span-2` of 12 at 2xl, wrapping "Buy report now"
      and most two-word TOC labels. **PR #8** — 3/6/3 at every breakpoint.
- [x] `--desk-max: 1240px` left ~330px of dead space each side on a 1900px
      display while the three columns fought over what was left (centre column
      540px). **PR #10** — steps to 1400px at 1536px and 1520px at 1800px;
      centre column 680px, rails 324px.
- [x] `/services` and `/request-sample` published
      `... | NeoGraph Analytics | NeoGraph Analytics` — their own titles named the
      brand and the layout template appended it again. **PR #8.**
- [x] All 13 titles exceeded the ~60 characters Google renders. **PR #8** — 2
      remain, both from stored `meta_title`.
- [x] `/reports` and `/request-sample` server-rendered **nothing** — no `<h1>`,
      no report links, no form fields. `useSearchParams()` opts a static route
      out of SSR up to the nearest Suspense boundary. **PR #9.**
- [x] `/request-sample` was listed in `sitemap-pages.xml` while being `noindex`
      *and* robots-disallowed. **PR #10.**
- [x] `lib/api/authors.ts` selected `*` across the whole team table on every
      author page render to return one author. Now one row, four columns.

### Still open
- [x] Report `meta_title` exceeded what Google renders on **141 of 142 rows**
      (mean 92.4, max 137). **DONE 2026-10-15** — pattern pass over Supabase:
      mean 92.4 -> 56.4, max 137 -> 77, over-60 count 141 -> 45. Three distinct
      defects were behind it: a boilerplate tail `| Market Research Report 2032`
      appended to titles already ending in 2032 (so the year appeared twice, 0
      remain); long forms such as "Market Size, Share and Trends Analysis Report
      2032" condensed; and **26 titles that claimed both "Global" and a region**
      ("Global Asia Pacific Biosimilars Market"). The slug settled which was
      right, and "Global" was dropped only where the slug corroborated the
      region. The 45 still over 60 are long subject names that cannot shorten
      further without losing meaning.
- [ ] Report `meta_description` exceeds 160 characters on 14 of 142 rows. Left
      alone deliberately: each needs an editorial judgement, not a pattern
      substitution.
- [ ] Author URLs remain positional (`/authors/1` = first row ordered by id, not
      the row whose id is 1 — real ids are strings like `tm001`). Removing a team
      member silently repoints every author after them. Documented in
      `lib/api/authors.ts`; deliberately not redesigned, because `MeetTheTeam` is
      dead code, nothing links to author pages and they are in no sitemap.
- [x] `/reports` server-renders 12 of 142 report links; the rest sit behind
      client-side pagination. Discovery is covered by the sitemap, so this is
      internal-linking depth rather than indexing.
      **DONE 2026-10-18** — `components/reports/ReportDirectory.tsx`, a Server
      Component listing all **182** reports as real links grouped by vertical
      (13 groups, counts summing to 182), rendered *outside* the Suspense
      boundary because `useSearchParams()` in the client listing would otherwise
      replace it with the skeleton in the static HTML. `getReportCards()` is now
      `cache()`d so the listing and the directory are one query. Cost: 199KB ->
      273KB of HTML, 33.0KB gzipped; hoisting the link classes to one container
      returned 47KB of that. Audit rule added and negative-tested — the page
      fails if it renders under 100 report links.
- [x] ~~`/design-system` renders 2 `<h1>` and has no canonical. Robots-disallowed,
      so low priority.~~ **NOT A DEFECT 2026-10-18** — the built page has **1**
      `<h1>` and a canonical pointing at
      `https://www.neographanalytics.com/design-system`. Measured against
      `server/app/design-system.html` in a clean build.
- [ ] `/reports` still ships ~508KB, nearly all of it the RSC payload for 142
      reports. Select only the columns the cards need.

## Content — published
- [x] **AI in Cancer Diagnostics Market** — published 2026-10-15 (PR #7).
      Thesis: published 2032 estimates span $1.7B-$17.9B and the 7x spread is
      definitional, not a disagreement about growth. Grounded in the FDA
      AI-enabled device register. `regional_analysis` and `country_analysis`
      left empty: no defensible source.
- [x] **Oncology Information Systems Market** — row published to Supabase
      2026-10-15, corpus now 142, live on the next deploy.
      Thesis: base-year estimates spread **2.74x** ($3.10B-$8.49B) while
      published CAGRs spread only **1.27x** (6.67%-8.5%) — forecasters agree
      about growth and disagree about what the market is. Grounded by dividing
      published sizes by the IAEA DIRAC register (~8,700 radiotherapy centres):
      the high estimates imply **~$976,000 per centre per year**, which rules out
      a radiotherapy-only reading. Notes in
      `research/oncology-information-systems-notes.md`.
      No regional split, no vendor share percentages — current OIS share is not
      publicly disclosed and the circulating ARIA/MOSAIQ figures are from 2011
      and 2013.

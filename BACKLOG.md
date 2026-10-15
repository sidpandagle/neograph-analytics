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
- [ ] `getReportBySlug` runs a second full-table query just to compute an array
      index. Remove it.
- [ ] Listing page does `select('*')` over 140 rows of large JSONB. Select only
      the columns the cards need.

## P1 — visuals
- [ ] Build a chart set driven by real columns: forecast line (`market_forecast`),
      segmentation share, regional bars, country comparison, competitive position.
      Recharts is already a dependency.
- [ ] Per-report OG images (1200x630) generated from market metrics.
- [x] ~~`cdn.neographanalytics.com` + R2~~ **DROPPED 2026-10-15.** The domain is on
      GoDaddy nameservers, not Cloudflare, and R2 custom domains require the zone to
      be on Cloudflare. Not worth migrating DNS on a live domain. Visuals ship as
      inline SVG instead (no hosting, no egress, no image-optimization quota).
- [ ] Repoint author/team avatar `<img>` srcs from the non-resolving CDN host to
      local assets in `public/`. They are broken images today.

## P2 — technical
- [ ] JSON-LD audit (Dataset/Report, FAQPage, BreadcrumbList) — 6 ld+json blocks
      already render; verify correctness against the real data.
- [ ] Core Web Vitals pass (LCP, CLS) on report + listing pages.
- [ ] Accessibility pass: headings, contrast, focus states, tap targets.
- [ ] Reconcile `data/all_reports.json` (10) / `bulk` (107) / `old` (104) /
      `reports.json` (12) against Supabase (140). Document the canonical source.
- [ ] `AGENTS.md` is stale (claims no database). Refresh to match reality.

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
- [ ] Base-year figure disagrees with the chart's first plotted point ($64.5B tile
      above a line starting at $68.2B). `historical_period` 2019-2023 is never
      plotted, so there is no actual-vs-forecast distinction.
- [ ] Analyst prose is `text-xs` (12px) at ~2.9:1 contrast — fails WCAG AA — and
      the measure runs ~95 characters. Promote to 16-17px/1.65, cap at ~68ch.
- [x] MegaMenu renders 28 `<h3>`s before the page `<h1>`, wrecking the document
      outline for crawlers. Make them spans.
      **DONE 2026-10-15 — PR #8 — now 0 headings before h1 on all 13 pages.**
- [ ] Both SearchBars import the whole corpus into a client component and match
      contiguous substrings only. Will ship multi-MB once 140 reports load.
- [ ] A11y: two `<main>` landmarks, no skip link, FAQ accordion lacks
      `aria-expanded`/`hidden` (collapsed links stay tabbable), mobile drawer's
      ~40 links stay focusable when closed, country table clips instead of
      scrolling, heading levels skip h2->h4.

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
- [ ] No `error.tsx`/`global-error.tsx` anywhere; `lib/api/consulting.ts:22,42`
      throws instead of returning `ApiResponse`, so a Supabase outage fails the
      build or shows a bare error screen.
- [ ] Sitemap fragmentation: `robots.ts` advertises only `/sitemap.xml`;
      `/sitemap-pages.xml`, `/sitemap-consulting.xml` are referenced nowhere, so
      consulting and legal URLs are in no discoverable sitemap. Reports are
      declared twice with conflicting priority.

### P1
- [x] `/consulting` returns 404 but is linked from 3 places and listed in
      `sitemap-pages.xml`. `/authors` 404s but is every author breadcrumb parent.
      **DONE 2026-10-15 — PR #10 — 308 -> /services; /authors is a legitimate 404, nothing links it.**
- [ ] `lib/api/authors.ts:9-20` identifies authors by array position, not by id —
      inserting a team member silently repoints every author URL.
- [ ] `getReportsByAuthorId` and `getReportsByCategory` return `[]` with
      `success: true` (unimplemented), so every author page publishes "0 reports".
- [ ] Checkout collects buyer details then `lib/api/orders.ts:8` throws
      unconditionally — with no error boundary, a buyer sees a white screen.
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
- [ ] `sitemap-reports/[page]/route.ts:29` throws RangeError on a null
      `published_year`, dropping all 140 report URLs from that sitemap.
- [ ] Synthetic `id` is a position in a year-sorted list; publishing one report
      renumbers every older one. `neograph_reports` has no `id` column — use
      `slug`/`report_id` as the stable key.

### P2
- [ ] PostgREST filter injection in `.or()` search paths (currently dead code).
- [ ] `getLegalPages`/`getBlogs`/`getPressReleases` accept page/limit then
      fetch whole tables and slice in JS — wasted metered egress.
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
- [ ] `/reports` server-renders 12 of 142 report links; the rest sit behind
      client-side pagination. Discovery is covered by the sitemap, so this is
      internal-linking depth rather than indexing.
- [ ] `/design-system` renders 2 `<h1>` and has no canonical. Robots-disallowed,
      so low priority.
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

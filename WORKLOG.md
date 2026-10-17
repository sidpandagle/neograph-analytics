# WORKLOG

Append-only. Newest last.

## 2026-10-15 — session start
- Closed secret-leak risk: `env` was untracked but not gitignored (held Supabase service-role + Resend keys). Added `/env`, `/env.*` to `.gitignore`; mirrored to `.env.local`. No files removed.
- Set repo-local git identity (siddhant.pandagle1998@gmail.com). Global identity untouched.
- `npm install` — node_modules was missing.
- Patched `~/.claude/statusline-command.sh` with an additive `budget-probe` block writing `~/.claude/budget-state.json`. Backup: `.pre-budget-probe.bak`.
- Audit: Supabase has 140 reports across 32 columns; `data/all_reports.json` has 10. `/reports/[slug]` reads the JSON, `sitemap.ts` reads Supabase -> 130 sitemap URLs render "Report Not Found" at HTTP 200 (soft 404). Logged as P0.
- Audit: production homepage served with `Age: ~28 days`.
- Created AUTOPILOT.md, BACKLOG.md, STATUS.md, WORKLOG.md.
- Verified the soft-404 is NOT caused by `middleware.ts` (tested with it disabled; status stayed 200, file restored immediately). Real cause: the not-found render is prerendered and cached — response carries `x-nextjs-prerender: 1`, `x-nextjs-cache: HIT` and HTTP 200. Any unknown slug, e.g. `/reports/zzz-does-not-exist`, returns 200.
- Found a second symptom of the same root cause: `components/reports/SearchBar.tsx` and `components/ui/SearchBar.tsx` search via `searchJsonReports` over `data/all_reports.json`, so on-site search can only ever return 10 of 140 reports.
- Found `components/reports/JsonReportSections.tsx:181-185` renders only `by_component`/`by_type`/`by_application`/`by_end_user`. Live Supabase rows use other keys (e.g. `by_product`, `by_crop_type`, `by_technology`), so segmentation data is silently dropped for many reports. Needs generic key rendering.

## 2026-10-15 — live data captured via one-time browser session
Search Console (property `sc-domain:neographanalytics.com`):
- **Sitemaps submitted: 0.** Google has never been handed the sitemap.
- Page indexing: **7 indexed, 7 not indexed** (14 URLs known vs 158 in the sitemap).
  Not-indexed reasons: redirect 3, noindex 1, 404 1, alt-canonical 1, crawled-not-indexed 1.
- Performance, last 90 days: 6 clicks, 2,400 impressions, 0.2% CTR, avg position 31.8.
- Top queries by impressions: "neograph" 527 (2 clicks), "ai in oncology market" 506 (0),
  "ai oncology analytical solution market" 217 (0), "ai in cancer diagnostic market" 181 (0),
  "oncology consulting" 84 (0). 68 queries total. Real demand exists; nothing ranks on page 1.

Vercel:
- Project `vercel-market-research` -> www.neographanalytics.com, git-connected to
  sidpandagle/neograph-analytics. Auto-deploys on push to main, so merged PRs ship themselves.
- Hobby plan. Usage comfortably inside free limits (ISR reads 92K/1M, fast data transfer
  8.1GB/100GB, image optimization 492/5K transformations, deployment storage 1.35GB/10GB).
- 6 environment variables configured.

Cloudflare:
- Account ID captured: 285396a791526c52f57464b8529ff8f9 (written to `env`).
- R2 overview page would not render for capture; R2 enablement unconfirmed.
- Still blocked on CLOUDFLARE_API_TOKEN.

## 2026-10-15 — P0 bundle (branch work, pre-commit)
Data path:
- Added `lib/supabaseReports.ts`: Supabase-first report loader returning the existing
  `JsonReport` shape, with `data/all_reports.json` kept as an offline fallback.
  `getReportSlugs()` selects the `slug` column only (metered egress).
- `app/reports/[slug]/page.tsx` now loads from Supabase, with
  `revalidate = 3600` and `dynamicParams = true`. All 140 reports render; verified
  telemedicine-market, healthcare-ai-market, genomics-market, drug-discovery-ai-market.

SEO / policy:
- Removed the fabricated `aggregateRating` (4.7 / 45 reviews) from
  `components/seo/StructuredData.tsx` — invented ratings with no on-page reviews
  violate Google's review-snippet policy.
- Fixed JSON-LD injection: `JSON.stringify` does not escape `<`, so report prose
  containing `</script>` could break out of the tag. First attempt wrote `'<'`,
  which TypeScript parses as `<` — a silent no-op. Corrected to `'\u003c'` and
  verified at runtime that no raw `</script>` survives and the JSON still parses.
- Moved `public/robots.txt` to `legacy/public-robots.txt.bak`. It listed six sitemaps
  on `synapticresearch.com` (a previous brand) and conflicted with `app/robots.ts`,
  making `/robots.txt` return 500 locally.
- Removed the site-wide `canonical: '/'` from `app/layout.tsx`, which every route
  without its own canonical inherited (10 consulting pages, contact, request-sample,
  author profiles all declared themselves duplicates of the homepage). Added
  per-route canonicals, plus `app/contact/layout.tsx` because the contact page is a
  client component and cannot export metadata.

Caching:
- Added `export const revalidate = 3600` to 11 routes. Previously only
  `app/reports/page.tsx` had one, so every other page was an infinite-cache static
  prerender and Supabase edits could never reach production between deploys.

Soft 404s:
- Moved `loading.tsx` out of the 4 dynamic detail segments to `legacy/loading-files/`.
  These start a streamed 200 before the lookup resolves. `/authors/99` now correctly
  returns 404. Reports/blog/press-releases still showed 200 in dev; pending
  confirmation against a production build, which caches differently.

Crash-proofing (found by a failing production build):
- Build aborted on `agritech-ai-crop-disease-detection-market`:
  `TypeError: Cannot read properties of undefined (reading 'toFixed')`. Cause: a
  placeholder `{"country": ""}` entry in `country_analysis` with no metrics.
- Added `lib/format.ts` (`toNum`, `pct`, `money`, `num`, `barWidth`, `usableRows`)
  and routed `JsonReportSections.tsx`, `RegionalBarChart.tsx` and
  `lib/jsonReports.ts` through it. Missing values now render "—" instead of
  aborting the export. One malformed row can no longer kill the whole build.
- Audited all 140 rows for malformed numerics: exactly 1 was bad. Corrected that
  row in Supabase (dropped the empty entry; the 4 real countries are untouched).

## 2026-10-15 — PR #4 merged
- Commits `12c0abe` (code) and `9eddb89` (autopilot docs), merged as `a83c3bc`.
  Both authored as Siddhant Pandagle <siddhant.pandagle1998@gmail.com>.
- Verified before commit: `next build` passes (187 pages); unknown slugs return
  404 on reports/blog/press-releases/authors; previously-broken reports resolve.
- Caught during staging: I had overwritten the existing `app/contact/layout.tsx`
  (it already had title/description/keywords) instead of adding to it. Restored
  from git and reapplied as an additive change — canonical only, plus correcting
  a stale "contact synaptic research" keyword. That prompted a repo-wide sweep
  which found two more stale brand keyword lists in `app/layout.tsx` and
  `app/page.tsx`.
- Awaiting the Vercel deploy. Production still served the pre-merge build at the
  time of checking (homepage `Age: 2399980`, `/reports/zzz-nope` still 200).

## 2026-10-15 — deploy verified + sitemap submitted
Production after PR #4 deployed:
- `/reports/zzz-nope` -> **404** (was 200, a soft 404).
- `/reports/genomics-market`, `/reports/telemedicine-market` -> **200 with real
  titles** (were the "Report Not Found" shell).
- Homepage cache `Age` dropped from 2,399,980s (27.8 days) to ~331s.
- Sitemap: 158 URLs; 5 randomly sampled report URLs all returned 200.
- Sitemap submitted to Search Console (by Siddhant; the typing action was blocked
  for me by the permission classifier). Google read it the same day:
  **Status Success, 158 pages discovered** — up from 0 sitemaps and 7 indexed.
- Browser session closed; back to headless-only per AUTOPILOT.md.

Baseline to measure against (90 days to 2026-10-15): 6 clicks, 2,400 impressions,
0.2% CTR, average position 31.8, 7 pages indexed. Re-check coverage ~2026-10-29.

## 2026-10-15 — Cloudflare verified, and why the CDN plan is being dropped
- Token now valid: `verify` -> active. (First value supplied was a `cfut_` dashboard
  /OAuth token, which the REST API rejects with 6111; replaced with a real API token.)
- **`neographanalytics.com` is not on Cloudflare.** Its nameservers are
  `ns55/ns56.domaincontrol.com` (GoDaddy); the token's zone list contains only
  `pixelforgestudio.in`. The site itself is served by Vercel.
- R2 is not enabled on the account (`10042: Please enable R2 through the Dashboard`).
- Consequence: R2 custom domains require the zone to be on Cloudflare, so
  `cdn.neographanalytics.com` cannot be wired up without moving the domain's DNS
  off GoDaddy — a disruptive change to a live production domain, for a benefit we
  do not actually need.

**Decision: drop the CDN dependency rather than migrate DNS.**
- All report visuals ship as **inline SVG** committed to the repo: zero hosting,
  zero egress, zero Vercel image-optimization transformations (the tightest free
  meter at 492/5,000), crisp at any DPI, diffable in review, and no broken-image
  risk. This was already the interim plan; it is now the permanent one.
- The broken `cdn.neographanalytics.com` references on author/team avatars will be
  repointed at local assets in `public/`.
- `next.config.ts` keeps the remotePattern (harmless) until those refs are gone.
- Cloudflare credentials stay in `env` unused. No further human action needed.

## 2026-10-15 — real figures, reading navigation, methodology
- `lib/api/home.ts`: homepage facts computed from Supabase (report / industry /
  country / company counts, plus a featured-report snapshot). Two narrow queries,
  not one wide one, because egress is metered.
- `HeroSection` is now async and renders only real values. Removed "2,500+
  research reports" (actual 140), "1,000+ Satisfied clients", "50+ Countries", and
  the invented telemedicine snapshot ($286B/$331B/$842B at 16.8% CAGR — the real
  row is $111B -> $300.47B at 11.7%, and the report it linked to was one of the
  130 that 404'd). Bars are now scaled from `market_forecast`, with a caption
  stating which year is actual and which are forecast, and the currency and unit.
- `app/about/page.tsx`: replaced "500+ Projects Delivered / 1,000+ Healthcare
  Clients / 50+ Specialists on Team / 10+ Years Experience" with counts derived
  from the corpus. The team claim contradicted the 3 members actually published.
- Reading navigation was disabled twice over: `hasFullContent = false` gated the
  aside, and the page passed `tableOfContents={[]}` — truthy, so the
  `useGeneratedTOC` fallback never ran either. Added `lib/reportToc.ts` to build
  the TOC on the server (present in first paint, works without JS, no layout
  shift from col-span-9 to col-span-6 on hydration). Verified: 13 anchors, all
  resolving to real ids on the page.
- Added a Research Methodology section. `research_methodology` is populated on
  every row and was previously serialised into the payload and discarded.
- Research notes for a planned AI-in-cancer-diagnostics report saved under
  `research/`. Published estimates for that market differ by ~7x purely on scope
  definition; the FDA AI-device list (1,524 devices, 76% radiology) is public and
  countable, and no one publishes an oncology-specific cut of it.

## 2026-10-15 — form endpoint hardening
- Added `lib/api/form-guard.ts`: schema validation with length caps, HTML escaping,
  single-line coercion for mail headers, a per-instance sliding-window rate limit
  (5/min) and shared 400/429 responses.
- Applied to `api/contact`, `api/request-sample`, `api/not-found-inquiry`. All three
  previously took `await request.json()` with only a TypeScript annotation as
  validation, interpolated values straight into HTML email, and set `replyTo` from
  the request body — so a message body containing a link arrived in the support
  inbox as a working link apparently sent by support@neographanalytics.com, with
  Reply-To pointing at the sender. Missing fields rendered the literal "undefined".
- Caught two mistakes in my own first pass: HTML-escaping the plain-text mail
  subject (would print "&amp;" in the inbox), and `??` where the fallback can never
  fire on an empty string. Both corrected before building.
- Verified with invalid payloads only, so no email was sent: empty body, bad
  address, missing required field, malformed JSON, array body and oversized field
  all return 400 with specific messages; the 6th request from one client returns
  429 with Retry-After.
- **Known limitation, deliberately not hidden:** the rate limit is per-instance and
  in-memory. On serverless each instance has its own counter, so it throttles a
  single caller but not a distributed flood. A real limit needs a shared store
  (e.g. Upstash); that is a service decision, so it is logged rather than assumed.

## 2026-10-15 — PR #5 verified in production
- Homepage: no fabricated values remain live. Real counts and $300.5B rendering.
- `/reports/ai-in-oncology-market`: 13 TOC anchors server-rendered, methodology
  section present, fabricated `ratingValue` confirmed absent.
- Homepage cache `Age: 1` — the ISR fix is working end to end.

## 2026-10-15 — first new report + segmentation recovery
- Published `ai-in-cancer-diagnostics-market` to Supabase (corpus 140 -> 141).
  Angle: published 2032 estimates span $1.7B-$17.9B, a 7x spread caused by scope
  definition rather than growth assumptions. Grounded in the FDA AI-enabled device
  register (1,524 authorisations through Q1 2026, 1,164 radiology), which is
  countable, versus top-down figures that are not. Unit growth in the high teens
  against low-double-digit revenue growth implies falling revenue per cleared device.
- `regional_analysis` and `country_analysis` left empty deliberately: no defensible
  public source for a regional split of this specific market. The conditional TOC
  omits the section rather than showing invented shares. Having spent the day
  removing fabricated figures, adding new ones would be incoherent.
- Methodology states plainly that no primary interviews were conducted and that
  intermediate years are a modelled curve, not observed data.
- **Found while verifying it:** `MarketSegmentationSection` read four hardcoded keys
  (`by_component`, `by_type`, `by_application`, `by_end_user`) and silently dropped
  every other dimension, leaving a "Market Segmentation" heading above nothing.
  Measured across the corpus: **48 of 141 reports affected, 238 segment entries that
  never rendered** — `by_technology` (17 reports), `by_product_type` (13),
  `by_modality`, `by_crop_type`, `by_indication`, `by_therapeutic_area` and 13 more.
  Rewrote it to render whatever dimensions a row carries, deriving headings from the
  key, and widened the `market_segmentation` type with an index signature.
  Verified: agricultural-biotechnology now shows By Product / By Crop Type /
  By Technology / By Application where it previously showed one.
- Note on process: a verification run reported "no segmentation anywhere" on three
  reports. That was a false negative — `next start` had raced the build and was
  serving no build at all (curl status 000). Re-ran after restarting the server.

---

## 2026-10-15 (later) — testing cycle added; structure, SSR and layout fixes

User asked for a testing cycle after commits, run headless against production or
locally. Built one: it fetches 13 routes and checks heading order, landmarks,
ARIA wiring, form labelling, title/description length, canonicals and JSON-LD
validity. No browser is opened. It runs against `.next/server/app/*.html` before
a commit and against production after the deploy.

### PR #8 — document structure, landmarks, titles, sidebar widths
- The Reports and Consulting dropdowns marked every category and service label
  as `<h3>`/`<h4>`. That put **28 headings before the `<h1>` on all 13 pages**.
  They are navigation link text, not document structure.
- Four components nested a second `<main>` inside the root layout's.
- No skip link anywhere: a keyboard user tabbed ~30 menu links on every page.
- Every title exceeded the ~60 characters Google renders. `/services` and
  `/request-sample` named the brand themselves while the layout template
  appended it again, publishing `... | NeoGraph Analytics | NeoGraph Analytics`.
  `/reports` also carried two leftovers of an old brand find/replace
  ("in-depth neograph analytics reports").
- The market-dynamics pills are a tablist and the FAQ is a disclosure; neither
  announced itself. The collapsed FAQ answer and the closed mobile drawer were
  hidden only by opacity and pointer-events, so their links stayed in the tab
  order and were read aloud. `visibility` removes them from both and still
  animates.

### PR #9 — `/reports` and `/request-sample` server-rendered nothing
The biggest find of the cycle. `/reports` served 495KB containing **no `<h1>`,
no report titles and no links to any report** — header, footer and a skeleton.
`/request-sample` had no heading and none of its eight fields.

Not a bug in either page: a statically rendered route opts out of SSR up to the
nearest Suspense boundary above any `useSearchParams()` call, and the only
boundary above was the one wrapping the whole page. One line cost both pages
their entire server-rendered output. The params now come from `UrlParams`, which
renders `null` behind its own boundary.

`SearchBar` needed a sync effect: `initialQuery` now arrives after hydration and
`useState` only reads it once, so a `?search=` link would have left the field
empty.

### PR #10 — wide-screen layout and the `/consulting` 404
User sent two screenshots. First: the report rails looked congested. Measured
cause — both were `col-span-2` of 12 at 2xl, which wrapped "Buy report now" and
most two-word TOC labels. Fixed to 3/6/3 in PR #8.

Second: with the rails fixed the centre column looked small and the page ignored
the sides of the screen. Measured cause — `--desk-max: 1240px`, leaving ~330px
dead on each side of a 1900px display. The cap now steps to 1400px at 1536px and
1520px at 1800px: centre column 540px -> 680px, rails 254px -> 324px. Stopped at
1520px on purpose; past that the measure gets too long to read.

`/consulting` returned 404 while being advertised in **both** sitemaps and linked
from three places on the consulting detail pages. There is no hub there, only
`/consulting/[slug]`, and `/services` is the hub the navigation already points
at — so the bare path now redirects there. `/request-sample` left the sitemap
too: it was `noindex` *and* robots-disallowed while being advertised.

`/authors` also 404s, but nothing links to it and it is in no sitemap. Left as a
legitimate 404.

### Process notes
- A check reported `/consulting` still 404ing after the fix. False negative: a
  stale `next start` from an earlier session was holding :3100 and serving old
  code. Confirmed by PID and command line that the process was mine and from
  this repo before stopping it. Same class of mistake as the segmentation false
  negative earlier in the day — **verify the server is the one you just built.**
- Two rules in the audit script were themselves wrong: it counted `&amp;` as
  five characters when measuring title length, and flagged buttons as icon-only
  when they had visible text. Both corrected before trusting the output.

### Content — report 2 of the oncology cluster
`oncology-information-systems-market` published to Supabase (corpus **142**).

Thesis: base-year estimates spread **2.74x** ($3.10B-$8.49B) while published
CAGRs spread only **1.27x** (6.67%-8.5%). Forecasters agree about growth and
disagree about what the market is, so a headline 2032 number reports the
analyst's scope decision rather than a finding.

Grounded by dividing published sizes by the IAEA DIRAC register (~8,700
radiotherapy centres worldwide, corroborated at 8,925 geo-verified centres by a
2025 *Radiotherapy and Oncology* analysis): the high estimates imply **~$976,000
per centre per year**, which rules out a radiotherapy-only reading. That is
checkable arithmetic rather than an assertion.

Held to the same discipline as the previous report:
- `regional_analysis` and `country_analysis` left empty — no defensible source.
- **No vendor share percentages.** Current OIS share is not publicly disclosed;
  the ARIA and MOSAIQ installed-base figures still in circulation are from 2011
  and 2013, and a 2018 Varian linac count measures machines, not installations.
  The competitive section names players and says plainly that share is unknown.
- `recent_developments` left empty rather than filled with unsourced items.
- Segmentation uses plain strings, not `{name, market_share}` objects, so the
  renderer lists the dimensions without attaching invented percentages.
- Methodology records that the per-centre figure is a plausibility test, not a
  market estimate, and that DIRAC describes itself as incomplete.

Notes: `research/oncology-information-systems-notes.md`.

### Also staged
`lib/api/authors.ts` selected `*` across the whole team table on every author
page render to return a single author — bios and image URLs included — which is
waste on metered egress. Now fetches one row and four columns.

The positional-identity problem is documented rather than redesigned: author
URLs are `/authors/1..N` by row order, because the table's real ids are strings
(`tm001`) and cannot be the numeric route param. Removing a team member would
silently repoint every author after them. Not worth a URL redesign — `MeetTheTeam`
is dead code, nothing links to author pages, and they are in no sitemap.

### Meta titles — a pattern pass over all 142 rows (no commit needed)
Surveyed `meta_title` across the corpus: **141 of 142 exceeded** the ~60
characters Google renders, mean 92.4, max 137. Three distinct defects were
behind that, not one:

1. **26 titles claimed both "Global" and a region** — "Global Asia Pacific
   Biosimilars Market", "Global Europe Continuous Glucose Monitoring Market".
   The slug (`asia-pacific-biosimilars-market`) settles which is correct. The
   script drops the leading "Global" *only* where the slug corroborates the
   region, so it cannot guess wrong.
2. A boilerplate tail `| Market Research Report 2032` was appended to titles
   that already ended in 2032, printing the year twice. 23 rows.
3. Long forms — "Market Size, Share and Trends Analysis Report 2032" (61 rows)
   and five other variants — condensed.

Result, verified by reading the rows back:

```
mean length        92.4 -> 56.4
max  length         137 -> 77
over 60 characters  141 -> 45
'Global <Region>'    26 -> 0
'2032' twice         34 -> 0
```

The 45 still over 60 are long subject names ("Graphene-Enhanced Composites for
Aerospace Market Size & Forecast 2032") that cannot shorten further without
losing meaning. `meta_description` was left alone: only 14 rows exceed 160
characters and each needs an editorial judgement rather than a substitution.

Dry-run first, applied second; the script writes nothing without `--apply`.
Because report pages carry `revalidate = 3600`, these reach production through
ISR without waiting for a deploy.

## 2026-10-16 — the report pipeline, and making sources visible

### `scripts/report-db.mjs` — one place where a report becomes a row
Reports were going into Supabase ad hoc, with the evidence discipline enforced
only by whoever was typing. The tool now holds both halves:

- `count` / `slugs` / `industries` / `dump` for reading the corpus (142 rows,
  6 industries: Healthcare IT 39, Biotechnology 38, Life Sciences 23,
  Pharmaceuticals 20, Medical Devices 16, Medical Imaging 6).
- `check` runs offline and refuses a draft that fails the house rules.
- `publish` upserts on `slug` — never deletes, never truncates.

The checks that matter, all of them arithmetic rather than taste:
- **The CAGR must reconcile.** `current * (1+cagr)^years` has to land on
  `forecast_value` within 0.6 points. A headline that fails its own arithmetic
  is the most common defect in published market research.
- The plotted series must start at `base_year` on exactly `current_value`.
- `competitive_landscape[].market_share` is **rejected outright** — vendor share
  is almost never publicly disclosed, so a number there is invention by
  definition.
- Numeric shares anywhere else require a sourcing statement in the prose.
- `meta_title` <= 60 chars and never both "Global" and a region; description
  70-160. These are the two defects the 142-row corpus already had.
- Every `charts[]` entry needs a `data_source`.

Calibrated against the published OIS row: it passes the CAGR and base-year
checks and fails three (summary 364 chars, title 61, description 191) — the last
two are real, already-known defects, which is the right answer for a checker.

### `research/REPORT-AUTHORING-BRIEF.md` and `research/REPORT-PIPELINE.md`
The brief is the contract for a research pass: the evidence-file format with its
mandatory "do not publish" list, the grounding-arithmetic requirement, the draft
JSON shape, the corpus conventions (`report_id` equals the slug; base year 2026;
forecast 2026-2032). The pipeline file holds 40 topics in 8 batches, picked
against `research/corpus-slugs.txt` so none duplicates an existing row.

No further regional clones (`north-america-*`, `europe-*`, ...). The corpus
already carries four regional copies of fourteen topics; a fifth adds no
analysis, and all 142 rows say `region: Global` anyway.

### Charts now say where their numbers come from (was R-1, R-0g)
`charts[].data_source` has been populated on every row and rendered nowhere.
Three charts now sit inside `<figure>` with a `<figcaption>`:

```
Source: NeoGraph Analytics, tabulated from the base-year and forecast values
stated in this report. Modelled at constant CAGR between published endpoints.
How these figures are produced.
```

Two details worth recording. Some `data_source` values name a real publication;
others name the column the series was read from (`market_forecast`), which tells
a reader nothing — `lib/chartAttribution.ts` rephrases those into a true
statement instead of printing the column name. And the OIS row had buried its
modelling caveat *inside the chart title*, where it reads as part of the
chart's name; `chartModellingNote` lifts it into the caption where it belongs.

### `/methodology` — the page three other pages were already promising
The site said "methodology" and "sources" in three places and had no such
route, and zero source attributions were reachable anywhere. The page states
what the checker enforces: estimates collected rather than averaged, the spread
reported as the finding, every headline divided through by a public register,
and an explicit list of what gets left out (vendor shares, unsourced regional
splits, segment percentages, padded development lists). Linked from the footer,
from every chart caption, and added to both sitemaps.

### Error boundaries (was R-5)
`app/error.tsx` (retry + browse, logs the digest only) and
`app/global-error.tsx` (self-contained inline styles, since a root-layout
failure means no fonts and no theme tokens). Neither existed, so any unhandled
render error showed the bare Next.js screen.

### Verified
Build clean, 142 report pages + `/methodology` prerendered. In the built HTML:
`<figure>` wraps the forecast chart with the caption above; `/methodology`
renders 1 `<h1>`, 5 `<h2>` and the live corpus count (142 across 6).

### Filters that return nothing (was R-0b, R-0c)
`/reports` rendered 12 category chips from `data/categories.json` while the
corpus contains 6 industries. Six chips — Clinical Diagnostics, Healthcare
Services, Laboratory Equipment, Therapeutic Area, Dental, Animal Health — were
guaranteed to return an empty page, and the same six were tiles in the
mega-menu and rows in the mobile drawer. The region select offered six options
over a corpus where all 142 rows are `Global`: five returned nothing, one
returned everything.

Both now derive from the data. `getReportCategories()` selects the single
`industry` column (a few KB over 142 rows, in keeping with the egress rule in
that file) and the header passes the result to `Navigation` and `MobileNav`;
`data/categories.json` stays as the slug/description map and as the fallback if
the query fails, so the menu can never render empty. The listing builds its own
chip list the same way and prints the count on each chip. The region control is
dropped while only one distinct value exists and returns on its own when
regional rows do.

Verified in the built HTML: chips read
`Biotechnology 38, Healthcare IT 39, Medical Devices 16, Medical Imaging 6,
Life Sciences 23, Pharmaceuticals 20` — summing to 142 — the hero line reads
"across 6 healthcare sectors" rather than 12, the header exposes 6 distinct
`?category=` links rather than 12, and no region select is present.

### Testimonials off the homepage (was R-0f)
Ten testimonials, each with a five-star rating, under "What healthcare
executives say". The names are job titles — "Head of Marketing", "Research
Associate" — and nine of the ten companies are outside healthcare: West Ham
United, Mitsubishi Motors R&D of America, The Clorox Company, Singapore Tourism
Board, Beeline, Nissan Chemical, SMS Elotherm, Berumen, Mitsubishi. Only Exact
Sciences is a healthcare company.

The section is no longer rendered. `data/testimonials.json`,
`TestimonialsSection` and its skeleton all stay in place and stay exported, for
when real attributable quotes exist. Nothing was deleted.

Filed alongside it as **R-9, needing Siddhant**: the "Our research shapes
decisions at" marquee asserts client relationships with twelve third-party
marks (Meta, Trivago, Suzuki, Kawasaki, Nestlé Professional, CDC, BCG, PwC,
Argonne, ChampionX, Mitsubishi, SK). Unlike the testimonials this may well be
true, and it is not mine to judge from inside the repo — it needs a yes or no
per logo. Left on the page until then.

R-4 was also marked `[H]`: the Product/Offer JSON-LD publishes a hardcoded
`$2,995` with `InStock`, and the same figure is shown on the page. Making the
schema disagree with the visible price would be worse than the present state,
and pricing and checkout are Siddhant's call, so it is flagged rather than
changed.

Verified in the built homepage: "healthcare executives", "West Ham" and
"Clorox" all absent.

### Two metered-egress queries that fetched what nothing reads
- `getReportBySlug` ran a **second corpus-wide query** for the `slug` column of
  all 142 rows, purely to compute the report's index in listing order so
  `rowToReport` could use it as `id`. Nothing on a detail page reads that id —
  checkout and its form key off the slug — so every report view paid for a
  142-row query it discarded. Removed.
- `getReports()` does `select('*')`, which pulls `market_dynamics`,
  `company_profiles`, `research_methodology`, `faqs` and every other large JSONB
  column so a card can show a title, a category, a year and a description. Two
  new projections, both additive — `getReportCards()` (11 surface columns) for
  the listing and `getReportSitemapEntries()` (`slug,published_year`) for
  `sitemap.ts` and `/api/sitemap-reports/[page]`. `getReports()` is untouched
  for anything that still wants the whole row.

Measured: the built `/reports` HTML drops from **508KB to 284KB** (-44%) with
the same 12 cards and the same 142-report count, because the RSC payload no
longer carries the unread JSONB.

### Round 1 of the expansion — 10 reports, corpus 142 -> 152
Two research passes ran in parallel (the two-agent limit), one on diagnostics
and devices, one on therapeutics, both against
`research/REPORT-AUTHORING-BRIEF.md`. All ten drafts pass
`node scripts/report-db.mjs check`. Evidence files are in `research/*-notes.md`
and the headline figures with their grounding arithmetic are tabulated in
`research/REPORT-PIPELINE.md`.

What makes these different from the corpus they joined: every base year is a
named publisher's own figure advanced at that publisher's own rate, stated as
such on the page, and every headline is divided through by something countable.
Several of those divisions are decisive rather than decorative:

- **CAR-T**: five disclosed product revenues sum to **$5.53B, which exceeds
  every published market size for the same year.** The bottom-up floor is above
  the top-down estimates.
- **GLP-1**: Novo's DKK 234,549m plus Lilly's $36,507m is **$71.94B disclosed**,
  above three of five published market sizes. One publisher's $2.6B is smaller
  than a single quarter of Zepbound.
- **Bispecifics**: two published estimates are below Hemlibra and Vabysmo
  **alone**; 74% of disclosed revenue is non-oncology.
- **Liquid biopsy**: the top forecast implies 43.0M tests a year against ~20M
  annual cancer cases — 2.15x total incidence, so it cannot be therapy
  selection; it assumes population screening.
- **Phage therapy**: no marketing authorisation in the US, EU or UK; the top
  published figure works out at $10.3M per registered trial. Published as
  option value on an unread Phase 3, explicitly not as revenue.

Three defects surfaced while reviewing the drafts, all fixed before publishing:

1. **Unit blindness, 1,000x.** Two of the ten are stored in millions
   (`phage-therapy-market` $66.5M, `brain-computer-interface-market` $795.3M).
   `money()` defaults to `'B'` and two other call sites hardcoded `B`, so the
   cards and the detail-page metrics would have rendered "$66.5B" — the worst
   class of error this site can make. `unitSuffix()`/`marketValue()` now read
   the row's `unit`, and `unit,currency` were added to `CARD_COLUMNS`. The
   charts and the hero already read the column.
2. **`recent_developments` keyed `development`** where the renderer reads
   `event`, which would have printed a company and year above an empty
   paragraph. Normalised, and the checker now rejects it by name.
3. **U+FFFD in "bioMérieux"** — a source decoded with the wrong codec upstream.
   Repaired, and the checker now rejects any draft containing a replacement
   character.

Verified after publishing: build clean, **200 static pages** (was 190), the two
million-unit reports render `$66.5M`/`$167.9M` and `$795.3M`/`$2252.5M`, each
report page carries its chart source caption, and the homepage corpus count
reads 152.

One thing to flag outside the repo: the diagnostics agent installed `pypdf`
into the user Python site-packages to read the CMS CLIA statistics PDF. Nothing
in the project or in global config was touched and nothing was removed, but it
is a change outside this repo and the standing rule is not to make them. The
brief for round 2 forbids installing anything.

### SEO field lengths, all 152 rows (was R-3)
`report-db.mjs audit` (new) measured the corpus: **45 titles over 60 characters**
and **14 descriptions over 160**. The earlier title pass had cut the mean from
92.4 to 56.4 but left a 61-77 character tail that no pattern substitution
reaches — the template itself had to shorten.

`scripts/fix-meta-lengths.mjs` (dry run by default, `--apply` to write):

- **Titles** try progressively shorter templates against the market name taken
  from the row's own title, and take the first that fits 60. Seven rows said
  "... Industry Size & Analysis 2032" rather than "... Market ...", so the name
  extractor had to terminate on both words — without that they were unfixable
  mechanically.
- **Descriptions** are rebuilt from the row's structured figures rather than
  trimmed, because several restated numbers that no longer match the columns the
  page renders, and `united-states-cell-gene-therapy-manufacturing-market` was
  **truncated mid-sentence** at "is expected to ". A description built from
  `market_size`, `base_year` and `forecast_period` cannot drift from the page.
  Descriptions that open analytically rather than formulaically — the OIS row
  leads with its 2.74x spread — are shortened in place instead.
- No marketing tail was appended. "Sources and methodology inside" would be a
  claim about the page's contents, and these are legacy rows whose depth varies;
  the figures are the part that is certainly true.

55 rows written. Re-audit: **titles over 60 = 0, descriptions over 160 = 0,
descriptions under 70 = 0.** Supabase-only, so this reaches production through
ISR without spending a deploy.

### Keyboard focus was invisible on a third of the controls (was R-0e)
The global ring was `2px solid var(--primary)` — #1541E3 — which is the exact
fill of the hero and CTA panels. Measured contrast of the ring against the three
surfaces a focusable control actually sits on:

```
                  ring #1541E3   ink #0B1220   paper #FFFFFF
white card          7.25:1        18.72:1        1.00:1
blue panel          1.00:1         2.58:1        7.25:1
ink footer          2.58:1         1.00:1       18.72:1
```

No single colour clears WCAG 1.4.11's 3:1 on all three, which is why this was
never fixable by swapping the token. The ring is now two-tone — ink outline plus
a paper inner ring, inverted in dark mode — so one of the two always contrasts,
and the two sit at 18.72:1 against each other. Worst case across the three
surfaces goes from **1.00:1 to 7.25:1**.

The larger half of the finding was not in the original filing: **`focus:outline-none`
appears at 33 call sites** and exactly one of them supplies a focus-visible
style of its own. Those classes outspecify a bare `:focus-visible`, so a third
of the interactive controls had no keyboard focus indicator at all regardless of
the token. The rule therefore carries `!important` on the outline and the inner
ring — deliberate, documented in place, and the whole point of the rule.

The outline survives an `overflow: hidden` ancestor while the box-shadow can be
clipped, so the outer ring is the one carrying contrast.

Verified in the built CSS; the contrast figures are computed from the token
values, not yet observed in a browser (browser tools open at 21:00 IST).

### Round 2, batch 2B — five Healthcare IT reports drafted (held, not published)
All five pass `check`. Held on the branch rather than published, because
`dynamicParams = false` on the report route means a row in Supabase that was not
in the last build's `generateStaticParams()` **404s**, while `/reports` — ISR,
hourly — would already be listing a card pointing at it. That is PR #4's
soft-404 defect with the sign flipped. The rule is now written into the
authoring brief: publish only when a merge slot can follow within the hour.

The batch's findings are unusually good:

- **RWE**: IQVIA's 2026 segment reorganisation accidentally disclosed its
  real-world line at **$674M in 2025 revenue** — 21.7% of one published whole
  global market, while IQVIA's whole Technology & Analytics segment ($6,626M) is
  **3.31x another publisher's entire $2.0B world**.
- **Interoperability**: a **14.6x** spread at 2025 ($5.8B to $84.58B) with
  nothing in between, and **Credence Research publishes both ends** — ~$10.63B
  and ~$349.9B by 2032, a 33-fold gap inside one catalogue. Per Designated QHIN
  (11, Sequoia Project), the high estimate implies $9.4B each, **15.5x Epic's
  entire 2025 revenue**.
- **Decentralised trials**: four houses agree to 1.07x, which the report reads as
  a shared derivation rather than corroboration. Only **37 of 607,160**
  ClinicalTrials.gov studies text-match "decentralized clinical trial", and the
  only pure-play (Science 37) sold for ~$38M after booking $70.1M — 0.37% of the
  market named after it. The FDA dropped "decentralized clinical trials" for
  "decentralized elements" in September 2024, which is the regulator conceding
  the same scope point.
- **Hospital-at-home**: 373 approved hospitals across 140 systems (January
  2026), against **31,000 patients in four years** of the CMS programme, while
  published sizes imply 202,211 to 811,027 episodes a year.
- **RCM**: published as `revenue-cycle-management-market`, **not** as the
  automation slug it was queued under. The report's finding is that no
  defensible standalone size for RCM automation exists — the one
  automation-specific figure is **29.0x Waystar's entire FY2025 revenue** — so a
  title promising an automation market size would have reproduced the defect the
  report is about. The superseded draft is kept at
  `content/reports/_superseded-...json`; nothing was deleted.

One correction to my own brief, which the research pass caught: I told it the
CMS hospital-at-home waiver was near statutory expiry. **Section 6210 of the
Consolidated Appropriations Act, 2026 extended it to 30 September 2030**
(corroborated by Chartis and the AMA). The real restraint is that the waiver
**already lapsed once**, in the 2025 shutdown, and that 30 September 2030 falls
inside every published forecast period while none of them says what happens on
1 October 2030.

### Two queue items closed by measurement rather than by code
- **R-0d** (`.prose` never applies to a report page) is true and correct as it
  stands. `StyledReportContent.tsx` post-processes an **HTML blob** — wrapping
  images, lazy loading, reserving intrinsic dimensions — and the report page has
  no HTML blob: every section comes from structured Supabase columns through
  `JsonReportSections`, which styles its own prose against the measured
  `--content-*` contrast ramp. The only HTML field left in the type graph is an
  optional `marketDetails` that no row populates and no component reads. The
  component keeps its 381 lines and now carries a header saying exactly when it
  would be wired back in. Nothing deleted, nothing wired in for the sake of it.
- **R-8** (avatars point at a non-resolving CDN) is stale. `image_url` is
  **empty on all three** `neograph_team_members` rows, `imageUrl` is empty in
  the JSON, and both render sites guard on it — initials fallback in
  `MeetTheTeam`, conditional OG image on `/authors/[id]`. No broken image is
  served. The only surviving reference to `cdn.neographanalytics.com` is the
  `remotePatterns` entry in `next.config.ts`, which costs nothing while the host
  is NXDOMAIN.
- **R-2** remeasured rather than closed: `/reports` is **508KB -> 284KB** after
  the card projection, still the heaviest route. The rest is 152 cards of real
  data, so the next move is pagination or streaming, not column trimming.

### Round 2, batch 2A — five Life Sciences reports drafted (held with 2B)
All five pass `check`. Held for the next merge slot for the same reason as 2B.

Two of the five are built on the kind of arithmetic that is hard to argue with:

- **Proteomics** — one publisher's proteomics *instruments* line alone ($8.0B)
  is **1.06x Thermo Fisher's entire Analytical Instruments segment** ($7.55B,
  all applications), and its $41.2B total is **3.75x** that segment plus all of
  Bruker. Meanwhile disclosed pure-play revenue (Quanterix, SomaLogic, Standard
  BioTools, Seer) sums to **$340.5M — a factor of 121 below the headline.**
  Illumina paid ~$350M in cash for SomaLogic, roughly the whole pure-play
  sector's annual revenue.
- **Pharmacogenomics** — the FDA's Table of Pharmacogenomic Biomarkers in Drug
  Labeling enumerated on 16 Oct 2026: **692 rows, 439 distinct drug products**,
  against ~**53** active ingredients with CPIC Level A guidance. Forecasts cite
  the 439; payers pay for the 53. The high estimate divided by Medicare's
  $917.08 CLFS rate for CPT 81418 implies **20.98M panels a year — 30.3% of
  every Medicare beneficiary, annually, for a genotype that never changes.**

Also worth recording:

- **Spatial biology** spreads **16.9x**, and the two extremes claim the *same*
  narrow scope. One house's subset figure exceeds its own superset figure by
  5.4x. Here the narrow totals are too *low* — 10x plus Akoya alone are 67.9% of
  the lowest published total, before Bruker's NanoString — which is why the
  report publishes the wide scope.
- **Single-cell sequencing**: the published 12.2% rate needs $1.51B of net new
  revenue by 2030, **3.9x the market leader's entire Single Cell line** — in a
  year when that line fell 2% and its instruments fell 36%.
- **Organoids / organ-on-chip**: the forecast needs $1,710.3M of net new revenue
  against **one** accepted ISTAND letter of intent (step 1 of 3) and **zero**
  qualified organ-chip drug development tools as of the FDA's 22 Sep 2026 page.
  The prose is careful that the April 2025 roadmap *encourages* new-approach
  data — it mandates no model and qualifies none — and that FDAMA 3.0 passed
  each chamber separately and **is not law**.

### `/design-system`: two `<h1>`s and no canonical (was R-6)
The second `<h1>` was a **type specimen** — the sample that shows what an h1
looks like — so the page had two top-level headings and a document outline that
claimed two documents. The specimen only has to look like an h1; it is now a
`<p>` with the same classes. The h2-h6 specimens below it are left as they are:
they produce an odd outline but not a competing root, and the page is an
internal tool.

The page is a client component and so cannot export metadata, which is why it
had no canonical. A new `app/design-system/layout.tsx` supplies one plus an
explicit `noindex, nofollow`. The robots.txt disallow alone was not enough: a
disallowed URL can still be indexed from external links precisely because the
crawler never fetches the page to find a meta robots tag, while a direct request
does see it.

Verified in the built HTML: h1 count 2 -> 1, canonical present,
`noindex, nofollow` present.

### `/reports` payload: 508KB -> 184KB (was R-2)
Two passes. First the Supabase projection (`getReportCards()`), which stopped
pulling `market_dynamics`, `company_profiles`, `research_methodology`, `faqs`
and the rest for a card that shows four fields: 508KB -> 284KB.

Then the server-to-client boundary. `ReportsListingClient` declares thirteen
fields in its own interface, but it was being handed the full `Report` shape, so
`meta_title`, `meta_keywords`, `baseYear`, `forecastPeriod`, the formatted
market-size strings, `cagr`, `reportCode`, `discounted_price` and three empty
arrays rode along in the RSC payload **unread, once per card, 152 times**. The
page now maps to exactly those thirteen. `description` and `summary` also held
the same string twice per card, so the duplicate is dropped — `ReportCard`
renders `summary || description` and the client filter reads both, so neither
changes behaviour.

284KB -> **184KB**, 12 cards on page one, filter and search unchanged. Total
from the original measurement: **508KB -> 184KB, -64%**, while the corpus grew
from 142 to 152. Pagination is not worth the complexity at this size.

### `scripts/audit-html.mjs` — the headless audit, committed this time
The 2026-10-15 session ran an HTML audit as throwaway shell and lost it with the
session, so every later session re-derived the same checks by hand. It is a
committed tool now: 13 routes, read from `.next/server/app/*.html` or from
production with `--prod`, exit code = error count so it can gate a commit. No
browser, so it runs at any hour.

Checks: exactly one `<h1>` and no headings above it, heading-level skips,
empty headings, one `<main>`, skip link, title ≤60 (entities decoded first),
description 70-160, canonical present and on-site, every `ld+json` block parses,
`<img>` without `alt`, buttons and links with no accessible name, form controls
with no label, `<figure>` without `<figcaption>`, `<html lang>`.

The two rules the predecessor got wrong are explicitly not repeated: it counted
`&amp;` as five characters when measuring titles, and it called buttons
icon-only when they had visible text. The accessible-name check reads text
content, and a `noindex` page is no longer asked for a canonical.

First run: **1 error, 7 warnings over 13 pages.** All but one are now fixed:

- `/methodology` rendered a **63-character title** — my own page from this
  morning. The root layout appends " | NeoGraph Analytics" (21 chars), so the
  page name has to carry the subject alone. Now "Methodology".
- **Heading outlines jumped h1 -> h3** on `/reports`, `/blog` and
  `/press-releases`: the page `h1` is the only heading above the grid, and every
  card title was an `h3`. A screen-reader user navigating by heading cannot tell
  a skipped level from missed content. `ReportCard` now takes a `headingLevel`
  prop defaulting to `h2`; the author page, where the grid sits under a section
  `h2`, passes `h3`. `BlogCard` and `PressReleaseCard` go to `h2`.
- **h2 -> h4 inside report pages**: the per-region and per-company item
  headings were `h4` directly under a section `h2`. Both are `h3` now.
- `/request-sample` had a 57-character description; it now says what a sample
  actually contains.

Re-run: **13 of 13 pages error-free, 0 errors, 1 warning** — `/design-system`'s
66-character description, left as it is because the page is an internal tool
carrying `noindex, nofollow`.

### Two analysis articles, drafted from the reports' own evidence
The blog corpus was six generic pieces with invented bylines ("Dr. Sarah
Johnson" appears nowhere in `team-members`). Rather than add more of the same,
these two are written out of the research notes behind this month's reports, with
every figure traceable to a named filing and every claim linked to the report it
came from. Byline is "NeoGraph Analytics Research Desk" — the honest one.

1. **"When the sellers' own filings exceed the market they sell into"** — the
   bottom-up inversion in CAR-T ($5.53B of disclosed product revenue against
   published bases of $3.87-4.6B), GLP-1 ($71.94B disclosed, above three of five
   published sizes, one of which is smaller than a quarter of Zepbound) and
   bispecifics (two published estimates below Hemlibra and Vabysmo alone, and
   74% of disclosed revenue non-oncology). Also retires the circulating "CD19 =
   86.5% of CAR-T" claim: the two BCMA products are 42% of the disclosed total.
2. **"Why two forecasts of the same market differ by ten times"** — the
   base-versus-rate table across ten markets. Point-of-care spreads 11.0x on the
   base and 1.37x on the rate; radiopharmaceuticals invert it at 1.78x and 3.35x.
   Includes the three cases worth remembering: one publisher at both extremes
   (Credence, 33x apart in one catalogue), a subset exceeding its own superset by
   5.4x, and four houses agreeing to 1.07x about a category only 37 of 607,160
   registered studies name.

`scripts/blog-db.mjs` carries the checks that matter for an HTML article:
balanced tags (the page injects content with `dangerouslySetInnerHTML`, so a
stray `</table>` breaks everything below it), no `<h1>` inside the body, no
U+FFFD, a date and read-time in the corpus's format, and — with `--online` —
**every internal `/reports/<slug>` link verified against the live corpus**, since
a dead link in an analysis piece lands exactly where a reader is most likely to
click. Both drafts pass.

Held for the same deploy as round 2's reports: `/blog/[slug]` also sets
`dynamicParams = false`.

### Round 3, batch 3B — five supply-side reports drafted (held)
All five pass `check`. Held with round 2 for the same deploy.

This batch is the strongest yet on grounding, because the suppliers are listed
and report by segment, in four currencies — converted at the **IRS yearly
average rates for 2025**, named and dated in every methodology block (CHF 0.831,
KRW 1,421.779, EUR 0.886, CNY 7.129, JPY 149.632 per USD).

- **Plasma fractionation**: CSL Behring $11,158M + Grifols Biopharma €6,487M +
  Octapharma €3.47bn = **$22,396M, which is 80.9% of one published whole market**
  — and adding a single Takeda immunoglobulin line reaches **96.4% of it.** That
  publisher's figure is a floor, not a market. Per litre of US plasma: ~$358.
  The structural find the forecasts miss: Grifols closed 29 US collection
  centres in April 2026 **while reporting rising collection** — growth has moved
  to yield per donation, not centre count.
- **Sterile injectables**: a **13.6x** spread at 2025, with the *same publisher*
  holding both ends ($46.43B and $632.46B). Fresenius Kabi Pharma plus Hikma
  Injectables are 12.1% of the generic reading and **0.95% of the $591B
  reading** — two of the largest generic injectable suppliers in the world
  cannot be under 1% of their own market, so the high series is list-price
  injectable *drug* revenue. Separately: the three shortage registers disagree
  **2.44x** (FDA 93, USP 75, ASHP 227), and Hikma's disclosed Injectables margin
  fell 36.3% -> 30.0% on ~12% revenue growth, which is the shortage economics in
  a single disclosure.
- **Biologics CDMO**: Lonza + Samsung Biologics + WuXi Biologics = **$10,655M =
  56.7% of a published market the same page calls "fragmented."** Samsung's
  revenue over its stated 605,000 L of capacity is **$5,298 per litre per year**,
  so a $25B+ base needs 4.8 million litres of fully-utilised third-party
  capacity against ~845,000 L at the world's largest owner.
- **Vaccine cold chain**: 11.2x on size *and* 12.0x on rate. Against UNICEF's
  2.787bn doses (2024) the published markets imply $1.48, $12.67 and $16.63 per
  dose, and the top figure is **8.26x UNICEF's entire $5.610B procurement
  budget, vaccines included.** The chosen publisher's own series also fails its
  own arithmetic (its rate compounds to 65.01, not the 66.3 it prints), so the
  report uses their rate and says why it does not use their endpoint.
- **Pharmacy automation**: Omnicell's $1,185M is **16.5% of one whole published
  market** — the cleanest single-vendor ratio in three rounds, because Omnicell
  is a pure play. The per-store anchor (~$39,100 per US retail pharmacy per
  year) is the one grounding calculation in this batch that **confirms** the
  published range rather than contradicting it, which is worth recording: the
  method is not only capable of producing contradictions. One publisher's 2032
  forecast is 9.3% *below* another's 2025 actual, because it publishes no base
  year at all.

Method note the agent left for the next pass rather than repeating blind: the
WHO PQS prequalified-equipment catalogue cannot be used as a count, because its
own guidance says reference codes are never reassigned.

### A press release, and the publish order it exposed
`content/press-releases/neograph-publishes-methodology-and-twenty-grounded-reports.json`
— the methodology, the five grounding results that contradict the literature
outright, the base-versus-rate pattern, and an explicit section on what the
reports deliberately omit. Including the one report published with no revenue
base at all: phage therapy, where nothing holds marketing authorisation in the
US, EU or UK.

`blog-db.mjs` now takes `--press` and switches tables rather than being
duplicated; the press-release table has the same columns and the same
`dynamicParams = false` behaviour.

The draft **fails its own check**, correctly: it links
`/reports/plasma-fractionation-market` and `/reports/proteomics-market`, neither
of which is in the live corpus yet. That is the link checker doing its job, and
it establishes the order inside a deploy — **reports first, then anything that
links to them** — which is now written into the authoring brief. Its title also
measured 89 characters and is now 57.

### `/llms.txt` was describing 8% of the publication, and advertising 404s
Two defects in one endpoint, both found while checking whether new content
reaches it.

**It read the bundled snapshots, not the corpus.** `data/reports.json` holds 12
rows and `data/blogs.json` 6, against 152 reports live. A crawler asking this
endpoint what the publication covers was told about **12 of 152 reports** — the
same defect class as the listing search that filtered a 10-row snapshot, and
with the same cause: a JSON file left in place after the data moved to Supabase.

**It advertised URLs that do not exist.** A `/categories/<slug>` link for each of
the twelve entries in `categories.json`, printed twice over — **24 dead links**,
against a route that does not exist (`/categories/biotechnology` -> 404,
verified). Six of those twelve categories match no report at all. It also
advertised `/consulting`, which 308s to `/services`. Feeding a crawler a list of
dead links is the soft-404 problem aimed at machines instead of people.

Rewritten: Supabase first with the snapshots as the fallback that keeps the
endpoint answering if the database is unreachable (and the footer now says which
source produced the output). Categories are derived from the corpus, so one with
no reports cannot be advertised, and category links point at
`/reports?category=<slug>`, which is what the listing actually reads. The report
index is complete rather than a sample of 15 — one line each is a few hundred
bytes, and a crawler asking what we cover should be told. Analysis articles and
press releases are included, and the methodology is stated in full near the top.

Measured on a clean local server: **21KB -> 85KB, 12 -> 152 report URLs, 24 -> 0
`/categories/` links**, `Content source: live corpus`, and the million-unit
reports render correctly (`$66.5M base year -> $167.9M forecast`).

**Process note, the same trap as PR #10's false negative.** The first
verification showed the *old* output. Cause: a `next start -p 3100` from this
repo, launched at 02:24 today by an earlier session, still holding the port and
serving stale code. Confirmed by PID and command line that it was mine and from
this repo, then **left running** and the check repeated on **port 3101** — the
instruction is to not disturb anything on this machine, and a second port costs
nothing. Verify the server is the one you just built.

### Titles composed at render time were still too long (`lib/seo.ts`)
The corpus rows were fixed in place this afternoon, but article and press-release
pages compose their metadata in `generateMetadata` from an excerpt plus a
template, so the rendered `<title>` can break the limit even when the stored
fields are clean. Extending `audit-html.mjs` to cover two detail pages caught it
immediately:

```
"The Future of Personalized Medicine | Healthcare Insights | NeoGraph Analytics"  78
"Digital Health Investment Surpasses $30 Billion in 2025 | NeoGraph Analytics"     76
press-release meta description                                                    195
```

`lib/seo.ts` holds the rule now. `pageTitle()` tries the full template, then
drops suffixes one at a time, and takes the first form that fits 60 — returning
`{ absolute }` so the root layout cannot append the brand a second time, which
is how an earlier title came to read "... | NeoGraph Analytics | NeoGraph
Analytics". `pageDescription()` cuts at the last sentence boundary inside 160,
or a word boundary, never mid-word and never leaving a dangling comma.

Applied to `/blog/[slug]` and `/press-releases/[slug]`. The audit now covers 16
routes including a million-unit report, a blog article and a press release:
**16 of 16 error-free.**

### Round 3, batch 3A — five device reports drafted (held)
All five pass. Twenty reports are now drafted and waiting on one deploy.

- **Hearing aids** is the best-grounded report in three rounds, because it
  resolves a contradiction instead of just finding one. EHIMA members sold
  **23.16M units in 2025**; the published market over those units is **$380 per
  aid**, which is a factory-gate price, while a 1,100-respondent buyer survey
  measures $1,347 per aid at retail — so consumer spend on the same units is
  **~$31.2B, 3.5x the headline**. Demant proves both tiers inside one company:
  2025 retail revenue (DKK 10,724M, +8%) now **exceeds** its external wholesale
  revenue (DKK 9,841M, -2%). Four manufacturers disclose 1.34x the whole
  published market, and stripping retail out lands them back at ~$8-9B. The
  coherence failure is the finding: units decelerating 7.7% -> 4.0% -> 2.1%,
  measured prices down 42% since 2018 (OTC $502 a pair against $3,432
  prescription), manufacturers growing 2-3% — against published CAGRs of
  5.6-11.7%.
- **Sleep apnoea**: three disclosures sum to **104.5% of one publisher's entire
  global market** — ResMed alone is 65.0% of another's — before Philips
  Respironics, Löwenstein, BMC, oral appliances and the diagnostics half one of
  them explicitly includes. The headline uses MarketsandMarkets' endpoints at
  the rate they *imply* (7.6%), not the 10.9% its page states, because 10.9%
  compounds to $14.4B against its own $11.6B forecast; a reprint of the same
  report states 7.6%, which corroborates the endpoints. Also flagged: the
  425M-patient prevalence denominator everyone divides by was ResMed-funded and
  rests on reliable data from 16 countries.
- **Surgical navigation**: a **9.99x** spread, the widest the corpus has seen,
  and cleanly bimodal — 6.5-6.9% against 14-15.2%, split by whether robotics is
  counted. One publisher issues both halves and labels them. The ceiling test is
  decisive: the high figure would be 88.5% of Stryker's *entire* MedSurg &
  Neurotechnology segment and 1.40x Medtronic's *entire* Neuroscience portfolio.
- **Insulin delivery**: Insulet's $2.7B of Omnipod revenue is **3.0x one
  publisher's entire $900M global pump-consumables segment**. Revenue per
  patient is directly checkable here — $4,500 per Omnipod user, $2,865 per Beta
  Bionics user — which inverts to **1.6-2.6M pump users worldwide**, or
  0.27-0.44% of the IDF's 589M adults with diabetes.
- **Proton therapy**: $13.1M per operating centre per year against a $33-160M,
  20-to-30-year asset, which rules out a capital-only reading; a bottom-up build
  from IBA's own disclosed unit economics lands within 10-20% of the lowest
  dated published figure. PTCOG's register was unreachable all pass (503), so
  the ~125-centre count comes from a 2026 peer-reviewed review citing it, and
  says so.

Two more published series that fail their own arithmetic, bringing this month's
tally to four: MarketsandMarkets' sleep-apnoea rate (10.9% stated, 7.65%
implied) and GMI's proton-therapy rate (10.8% stated, 10.3% implied).

### Report pages were 152 dead ends
Measured: **0 occurrences of `href="/reports/` in the built HTML of a report
page.** Not one report linked to another. The `// TODO: Fetch related reports`
in `app/reports/[slug]/page.tsx` had been open long enough for the corpus to
reach 152. That costs a reader the obvious next step and costs the site the
internal links a crawler follows to find depth — on a domain whose indexed count
has been the standing problem.

`lib/api/relatedReports.ts` scores every other report on shared industry (+3),
shared topic words (+2 each, with report-title stopwords removed) and a baseline
+1, penalises regional clones (-2) so four copies of one topic cannot fill the
list, and breaks ties by order-of-magnitude size distance so the suggested
report is a comparable one. Deterministic throughout — these pages are
prerendered, and two builds of the same corpus must produce the same page.

One narrow select for the whole corpus, memoised for the process: a build
renders 152 report pages in one process, so without the memo this would run 152
times per build for the same rows.

**The finding that shaped it.** The first version put *earth observation, 5G
smart grid, green hydrogen, vertical farming and quantum sensors* under
`liquid-biopsy-market`. Cause: 26 rows in the corpus are not healthcare at all,
and the stored `industry` does not separate them — `liquid-biopsy-market` and
`agritech-vertical-farming-led-market` are both "Life Sciences". Same industry,
similar market size, nothing else in common. There is now a hard cluster
boundary on the slug prefix (agritech, climate-tech, space-economy,
quantum-technology, digital-infrastructure, advanced-materials,
synthetic-biology): a healthcare report never lists a non-healthcare one, and
vice versa, whatever the column says.

Built HTML across 152 report pages: **mean 5.4 outbound report links, minimum 2,
zero dead ends.** Spot checks read correctly — BCI next to neuromodulation,
wearables and surgical robotics; OIS next to the two AI-in-oncology reports and
clinical decision support; the climate cluster staying inside itself.

### 26 of 152 reports are not healthcare (filed as R-10, needs Siddhant)
Found while building the related-reports boundary. By slug prefix:
`agritech-*` 4, `climate-tech-*` 4, `space-economy-*` 4, `quantum-technology-*`
4, `advanced-materials-*` 4, `digital-infrastructure-*` 3, `synthetic-biology-*`
3 — lunar mining, undersea cable, green hydrogen, ceramic defence materials.

They are also filed under the same `industry` values as the healthcare rows,
which is why the first related-reports pass offered earth observation and
vertical farming to a reader of the liquid-biopsy report.

Two defensible answers — keep them and widen the positioning, or move them
behind a separate section — and the choice is Siddhant's, not mine. What I have
done meanwhile is make the page stop asserting something untrue: the listing
read "{n} healthcare sectors" and now reads "{n} research sectors", which holds
either way. The `relatedReports` cluster boundary already keeps the two sets
from appearing next to each other.

### Two defects Siddhant reported from screenshots
**Header dropdowns painted behind page content.** The Consulting mega-menu was
underneath the hero search bar and the chart card. The menu panels already set
`z-50`, which is why this looks impossible until you notice the `<header>`
carries `backdrop-blur-xl`: a `backdrop-filter` **creates a stacking context**,
so `z-50` only ranked the panel *inside the header*, while the header itself sat
at `z-index: auto` in the root context. Any later page element that makes its
own stacking context — the hero's search suggestions are `z-50`, the panels
carry shadows and transforms — therefore painted over it.

Fixing it on the menus would have been a patch per menu. The header wrapper is
now `relative z-[60]`, which lifts the whole subtree, including the mobile
drawer and its scrim, above page content on **every** page at once. 60 sits
above the `z-50` used inside pages and below the `z-100` skip link, which must
stay on top. Verified present in the built HTML of six routes.

**The FAQ +/x toggle sat low and left in its circle.** It was the text character
`+`, rotated 45 degrees to read as a cross. A glyph is centred by its line box,
not by the plus's crossing point, and the rotation then turns it about that same
off-centre origin — so both states were off, and the cross worse than the plus.
It is now two SVG strokes on a 16-unit viewBox, centred by geometry and rotated
about the SVG's own centre, so both states land dead centre regardless of font.

Both are structural fixes verified in the built HTML and in the stacking rules;
the visual confirmation in a browser comes after 21:00 IST, when that window
opens.

### Round 4, batch 4B — five reports drafted (held)
The first attempt at round 4 was killed mid-run by an expired login, leaving one
notes file behind. The retry was told to reuse it rather than redo it, **and to
verify it before relying on it** — which earned its keep: of the two
load-bearing sources, IDEXX's SEC exhibit confirmed to the dollar, but a "45% of
revenue from reference laboratories" claim **was not on the publisher's page on
re-reading**. It was withdrawn, the withdrawal documented in the notes, and the
scope finding rebuilt on a different source plus the structural fact that one
publisher carries no services line at all.

- **Veterinary diagnostics**: IDEXX's disclosed CAG Diagnostics recurring
  revenue is **92.6% of one publisher's entire global market**, and IDEXX's
  total revenue **exceeds that market by 17%**.
- **Orthopaedic implants**: five disclosed segment revenues sum to **$34,369M =
  120.8% of one publisher's whole global market**; two companies alone are
  62.2% of it. The per-procedure test lands at $3,040, inside the measured
  $1,797-$12,093 implant cost range — so the *procedure* arithmetic is sound
  while the *market total* is not.
- **Advanced wound care** is the second report in two rounds that **resolves**
  its spread rather than only finding it: one publisher's own stated 60%
  advanced share applied to its own $24.4B all-wound-care figure gives $14.64B,
  within **9.5%** of another publisher's independent advanced-only $13.37B. The
  1.83x gap is the gauze, proven from inside one publisher's own two numbers.
  It also catches a shock no published CAGR has priced: CMS's $127.14/cm² skin
  substitute rate from 1 January 2026 has already produced a guided **71% fall**
  at one supplier and a booked $72M impairment.
- **Rehabilitation robotics** is the thinnest, and says so in its first
  paragraph: **all three listed pure-plays sum to $75.7M, 5.0% of the published
  market**, and disclosed powered-exoskeleton revenue is 2.98% of one
  publisher's own exoskeleton segment — about 234 devices at the CMS K1007 rate
  against an implied 7,850. What the other 95% must be is named (the stationary
  clinical platform tier, all private) and deliberately not sized. One of the
  three listed companies **left the category mid-forecast** — merged into an AI
  infrastructure business in May 2026, unit put up for sale in October — and no
  published forecast mentions it.
- **Femtech**: a **7.5x** base spread against a 1.32x CAGR spread. Three
  disclosed segments are 45.7% of the narrow reading and **5.3% of the widest**,
  which would need a ~$70B remainder that only consumer menstrual care could
  supply. Published at the narrow reading with the exclusions named. The
  structural finding: **no femtech app or platform company discloses revenue,
  subscribers or units** — reported as a result rather than filled with an
  estimate — and the category's largest public disclosure is about to disappear
  into a take-private.

### Round 4, batch 4A — the last five drafts. The 40-topic queue is complete.
Ten reports published, thirty drafted and held. Three of these five turn on
*composition* rather than on the size of the spread, which is a different class
of finding from the earlier rounds:

- **Psychedelic therapeutics.** Both publishers read list **gamma-hydroxybutyrate
  as a substance type**, and one makes it the largest segment at 34.2%. GHB is
  sodium oxybate — a narcolepsy drug. Jazz's oxybate franchise (~$1,846M) plus
  J&J's Spravato ($1,696M) is **$3,542M = 113.5% of one publisher's entire 2025
  base**, which leaves psilocybin and MDMA an implied value **below zero**. The
  same publisher undersizes its own GHB segment by 1.73x. The residual was then
  ruled out two more ways: **$264,900 per Oregon administration session**
  against measured session prices of $275-1,300, and $3.30-8.93M per registered
  study across 432 psilocybin and MDMA trials.
- **Nuclear medicine isotopes.** Published figures are **bimodal with nothing in
  the gap** — $0.7-1.8B and $5.9-11.8B. The NEA's own supply table (six
  reactors, 26,200 6-day Ci/week ≈ 95% of world supply) puts the lower cluster at
  **$672 per 6-day curie, inside the NEA's own required-price band of
  $536-1,033**, while the upper cluster implies 2.9-4.0x the NEA's
  radiopharmacy-stage cost. Lantheus discloses both tiers in one statement —
  TechneLite $86.8M against Pylarify $989.1M, 11.4:1 — which identifies the
  upper cluster as the *drug product* market this report deliberately excludes,
  and it lands within 4% of our own already-published
  `radiopharmaceuticals-market`.
- **Ophthalmic therapeutics.** Disclosed anti-VEGF revenue is **21.1x** one
  company's entire branded glaucoma portfolio, which refutes a publisher's
  "anti-glaucoma is the largest class" while leaving its total intact — so the
  report publishes that publisher's total and rate and **none of its
  structure**, and says so. The rate is chosen on disclosed trajectory: the US
  branded intravitreal market shrank 15% through 2025 and one supplier guides
  -20 to -25% for 2026.
- **Fertility services.** The cleanest grounding in four rounds, because Progyny
  publishes revenue *and* cycles in one release: **$19,824 per cycle**, inside
  the published US list range. Billing **every** cycle in four public
  registries (2.13M) at that US rate — rigged in the published figure's favour —
  reaches only **52.4% of the published market**, so at most half of it is
  clinical services. Growth is also not where the forecasts say: **42.4% of US
  cycles are banking cycles**, UK egg freezing is up 47%, and one operator's
  female-only utilisation *fell*.
- **Medical device cybersecurity.** The spine is a contradiction *inside one
  house*: Fortune Business Insights updated two reports **on the same day** with
  $1.46B and $7.29B for the same base year, both scope tables printed. Per US
  hospital that is $91,000 a year against $456,000-$776,000, where all
  cybersecurity is traditionally ≤6% of IT budget.

Gaps recorded rather than papered over: no CISA advisory count (the page is
client-rendered), no Colorado programme count, no absolute cycle count for one
operator, and Curium and Cardinal's nuclear line are not separately disclosed.

### `scripts/contrast-audit.mjs`, and the two defects it found
Contrast claims on this project have to carry a number, so the measurement is
now a committed script: it reads the hex tokens out of `app/globals.css` (the
`:root` block for light, `.dark` for dark) and measures the pairs the components
actually use. Exit code is the failure count.

**The audit's own first run was wrong twice, and both corrections are written
into the file** — the standing rule here is that reviewer output is a hypothesis:

1. It measured each stroke of the two-tone focus ring separately and reported
   the ink stroke failing on the blue panel at 2.58:1, when the paper stroke
   beside it is at 7.25:1 — which is the entire reason the ring is two-tone. A
   ring now passes if *either* stroke clears 3:1.
2. It failed `--border` against `--card` at 1.22:1. WCAG 1.4.11 does not ask
   3:1 of a decorative rule — a card outline is not a boundary a user must
   perceive, and the card has its own background. Those pairs are now printed
   for information with no threshold.

What survived as real:

- **Form field borders were effectively invisible.** The fields use
  `--border` — 1.07:1 against the desk, 1.22:1 on a card in light mode — while
  a `--input` token exists for exactly this and was used nowhere. A field border
  *is* the affordance, which is the case 1.4.11 covers. `--input` is now
  #7684A6 light (3.30:1 on the desk, 3.74:1 on a card) and #5A6FA3 dark (3.80
  and 3.43); the previous dark value cleared the desk at 3.12 but fell to 2.81
  on a card, where most fields sit. 23 field borders repointed across contact,
  request-sample, the blog form and the 404 page.
- **`country-select.tsx` ignored the theme entirely.** It predates the token
  system: `border-gray-300`, `hover:border-purple-500`, `focus:ring-purple-500`,
  `text-gray-900`, `bg-purple-100`. Purple appears nowhere else on the site, and
  in dark mode `text-gray-900` (#111827) on `--card` (#131C30) measures
  **1.02:1** — the selected country was invisible on both live forms. Every
  class now reads a token.

Audit after the fixes: **0 failing pairs in both themes**, 16 of 16 pages still
error-free in the HTML audit.

### The JSON-LD audit (BACKLOG P2), and two defects across every page
Eight `ld+json` blocks render on a report page and nothing had checked their
*contents*. Two real defects, both on every page of their kind:

- **`Dataset.license` pointed at `/legal/terms-of-use`, which 404s.** The legal
  pages are privacy, refund and cancellation; there is no terms-of-use. So 152
  report pages each declared a licence URL that does not resolve. The field is
  now absent rather than wrong — asserting no licence beats asserting a broken
  one — and R-11 records that it returns if a terms-of-use page is ever written,
  which is Siddhant's call because it is legal copy.
- **`datePublished` was not a date.** Report rows store only a year, so the
  schema said `"2026"`; blog and press-release rows store a human date, so they
  said `"December 18, 2025"`. schema.org Date wants a calendar date and a
  validator drops what it cannot read rather than reporting it. `schemaDate()`
  normalises both — a year-only row becomes 1 January of that year, which is the
  honest reading of "we know the year and not the day".

The audit now checks structured-data *content*, not just that it parses:
calendar dates on `datePublished`/`dateModified`/`uploadDate`, breadcrumb
positions starting at 1 and incrementing, every breadcrumb item named, and
**FAQPage parity — the schema may not claim more questions than the page
renders**, which is the mismatch that costs a rich result for a whole domain.

Checked and correct, so left alone: breadcrumb positions (1,2,3 with names),
FAQPage parity (6 = 6), `Dataset.temporalCoverage` (`2026/2032`),
`variableMeasured` carrying the real figures with the right unit suffix.

### Per-report social cards (BACKLOG P1 visuals)
Every report shared one stock photo as its `og:image`, so 152 distinct reports
unfurled identically in Slack, LinkedIn and X. `app/reports/[slug]/opengraph-image.tsx`
renders the report's own figures instead: industry, market name, base-year
value, forecast value and rate, 1200x630.

Generated at build time next to the page, so there is no image host, no egress
and no transformation quota — the constraint that keeps Cloudflare and Supabase
inside their free tiers. No external font is fetched either: a build that reaches
out to Google Fonts 152 times is slow and fails closed on a flaky network.

The page's `generateMetadata` had an explicit `images: [...]` entry, which
**overrides** the file-based convention — the cards generated but nothing used
them until that was removed.

**The bug worth recording.** The title trimmer looked right and did nothing:
cards kept rendering "North America Cell & Gene Therapy Manufacturing Market —
Growth Drivers, Restraints and Future Outlook 2032" across four lines, into the
figures row. The regex `/\bMarket\b/i` had been written through a tool that
turned the backslash-b escapes into **literal backspace characters (U+0008)**,
so the pattern was `\x08Market\x08` and matched nothing. It was invisible in the
editor and in `grep`; `cat -A` showed it as `^HMarket^H`, and the giveaway was
that the rendered PNG came back **byte-identical** after a rebuild. The pattern
is now built from a character class, which cannot be mangled the same way, and
the title falls back to itself when no "Market" appears at all.

Verified: 1200x630 PNG per report, correct units on the million-unit rows
($66.5M -> $167.9M), and `og:image` / `twitter:image` now point at each report's
own card.

Also tidied: the six `next start` servers this session left on ports 3101-3106
are stopped, each confirmed by command line as mine and from this repo first.
The one on :3100 from an earlier session is left alone.

### `AGENTS.md` rewritten, and the data sources finally documented
Two BACKLOG items, both stale documentation that was actively misleading.

`AGENTS.md` opened with "Content is sourced from **static JSON files**" and
"Static JSON Data: simplifies content management without a database" — the site
has run on Supabase for some time. It also told an agent to run the dev server
on **port 3000**, which belongs to Siddhant's own work; claimed dark mode
switches on `prefers-color-scheme`, which appears nowhere in `globals.css`; and
documented a `slugify()` export from `lib/utils.ts` that does not exist.

It now carries what an agent actually needs: the canonical-data table, the
publish/deploy sequencing rule, the egress discipline, the checker commands, the
list of routes that exist (and the two that do not — `/consulting` 308s and
`/categories/*` 404s, which `/llms.txt` was advertising 24 times), and the house
rules about deleting nothing and attaching numbers to findings.

The data reconciliation, as a table rather than a mystery:

```
neograph_reports (Supabase)   152   canonical
data/all_reports.json          10   fallback behind lib/supabaseReports.ts
data/reports.json              12   stale snapshot, feeds nothing load-bearing
data/all_reports bulk.json    107   historical, unused
data/all_reports old.json     104   historical, unused
data/categories.json           12   slug map; 6 entries match no report
```

The snapshots stay. They are what stops a Supabase outage rendering an empty
site, and that is now written down so the next pass does not "tidy" them away.

Six BACKLOG items closed in place with what was actually done, including one
closed as **not a defect** after measurement: the avatar CDN finding, where
`image_url` is empty on all three team rows and both render sites guard on it,
so nothing broken is served.

### Browser verification (window opened 21:00 IST)
Three fixes confirmed in Chrome against the local build at 1512x950, measured
rather than eyeballed.

**Header dropdown stacking.** With the Consulting menu open, `elementFromPoint`
at the panel's centre, both lower corners and the point overlapping the hero
search area each returns an element **inside the panel and inside the z-60
header wrapper**. The live DOM also confirms the root cause: the `<header>`
computes `backdrop-filter: blur(24px)`, which creates a stacking context, and
the highest z-index anywhere outside the header is the skip link at 100 —
intentionally above — then 50.

A false negative worth recording: the first three probes said the hero was on
top. The menu had closed. Each `evaluate_script` run was clicking the trigger
again and toggling it shut, so the probes ran against
`visibility: hidden; opacity: 0`. Reading `aria-expanded` before clicking fixed
it. Same family as the stale-server false pass — confirm the state you think
you are measuring.

**FAQ toggle centring.** Glyph centre against circle centre:
**offsetX 0.00px, offsetY 0.00px** in both states, with the open state showing
`matrix(0.707107, …)` — the 45-degree rotation about the SVG's own centre.

**Focus ring.** Tabbed to "Buy report now" on the blue CTA panel in dark mode:
`:focus-visible` matches, `outline: 2px solid rgb(255,255,255)` at 2px offset
with a `rgb(11,18,32)` inner ring from the box-shadow. Both strokes present, the
white one at 7.70:1 against that fill — where the old single-colour ring
measured 1.00:1 on the same button.

Also seen working in the browser: the related-research block renders six sourced
neighbours with size and CAGR under each report.

Filed while looking: related-report card titles carry the full stored
boilerplate ("Global Cell & Gene Therapy Manufacturing Market — Growth Drivers,
Restraints and Future Outlook 2032"), where the social card already trims to
"… Market". Cosmetic, queued as R-12 rather than fixed at 23:30 with a deploy
pending.

### One title trim, shared (R-12)
The related-report cards printed the stored title in full — "Global Cell & Gene
Therapy Manufacturing Market — Growth Drivers, Restraints and Future Outlook
2032" — six times per page, while the social card already trimmed to "… Market".
`marketName()` now lives in `lib/seo.ts` and both call it, so the two cannot
drift. Built HTML: "Global Gene Therapy Market", "CAR-T Cell Therapy Market".

The helper carries the warning with it: build the pattern from a character
class, not a word-boundary escape, because an earlier copy had its escapes
turned into literal backspace characters and silently did nothing.

### The homepage made the same overstatement as the listing
The hero read "152 research reports across 6 **healthcare and life sciences**
verticals" while 26 of those rows are agritech, climate tech, space economy,
quantum technology, digital infrastructure, advanced materials or synthetic
biology. Now "152 research reports across 6 research verticals", which is true
whichever way Siddhant decides R-10. Verified in the built homepage.

### Core Web Vitals, measured (BACKLOG P2)
First trace of a report page, local production build, no throttling:

```
LCP            1,572 ms   (TTFB 28 ms, render delay 1,544 ms — 98.2%)
LCP element    the server-rendered <h1>: text, already in the HTML
CLS            0.00
DOM            771 elements, depth 16 — not the problem
layout updates 678 ms, 179 ms, 680 ms, each over 1102 of 1102 nodes
```

The shape of this is unusual and worth stating plainly: the largest element is
text that is **already in the delivered HTML**, so nothing is waiting on the
network — 98% of LCP is the main thread, and two ~680ms full-page layout passes
account for most of it. On a desktop with no throttling.

Filed as **R-13** with the suspects ranked (Recharts measuring its container,
the TOC `IntersectionObserver`, the header's `backdrop-filter`) rather than
guessed at: isolating it needs a trace with the charts removed, which is not
something to start twenty minutes before a deploy.

CLS at 0.00 is worth recording as a pass — the chart containers and the sticky
rails hold their space.

### The slow paint is in production, and it is not the charts
Traced `/methodology` in **production**: **LCP 3,921ms, TTFB 45ms, CLS 0.03.**
The page has no charts, no `IntersectionObserver` and six headings, and its LCP
element is text already in the delivered HTML — so 3,876ms of that is the main
thread, not the network.

That rules out the first suspect from the report-page trace. The chartless page
is **worse** than the report page (1,572ms), so Recharts is not what is costing
the time; something in the shared shell is. Measured so far: the HubSpot/GTM
script takes 288ms of main thread. Remaining suspects are the header's
`backdrop-filter`, the theme-toggle hydration and the font load.

R-13 is raised to **high** on that evidence. Deferring the fix rather than
guessing at it twenty minutes before a deploy: the next pass isolates it by
tracing with the third-party script blocked, which is one line of CDP and
answers the question outright.

### Correcting the performance finding before it became a wrong one
The trace attributed **288ms of main thread to Google Tag Manager**. The
production HTML ships **no external scripts at all** — 14 script tags, every one
a first-party chunk — so that time came from the measuring browser, which is a
real Chrome profile with extensions installed, not from the site.

Which means an unknown share of the 3.9s render delay is the profile rather than
the page, and R-13 drops back to medium and **"not yet attributable"** until it
is re-measured in a clean profile. The one conclusion that survives the caveat
is the differential: the chartless page is slower than the report page, so
Recharts is not the cause whatever the absolute numbers turn out to be.

This is the third time today that a measurement needed the measurement checked:
the stale `next start` serving old code, the menu probes running against a
toggled-shut menu, and now an extension's work counted as the site's. The rule
earns its place — reproduce cleanly before fixing.

### And a correction to the correction
Re-measured in an **isolated browser context**, which is the clean-profile check
the last entry said was needed:

```
                        everyday profile      isolated context
/methodology LCP            3,921 ms              1,316 ms
TTFB                           45 ms                 89 ms
CLS                             0.03                 0.035
```

So most of the 3.9s was the profile, as suspected. But two things came out of
the clean run that the "no external scripts" check had got wrong:

1. **Google Analytics is on the site after all.** `app/layout.tsx:114` renders
   `GoogleAnalytics` from `@next/third-parties/google`, which injects gtag
   **client-side** — so it is absent from the static HTML I grepped, and present
   in the live DOM. Checking the delivered HTML was the wrong instrument.
2. **FCP and LCP are the same event at 1,316ms.** Nothing paints at all for 1.3
   seconds on a server-rendered text page whose TTFB is 89ms. That part is the
   site, not the profile, and it is what R-13 now describes.

Three instruments, three different answers, and only the third one was sound.
Worth the entry even though the finding shrank: the first number would have sent
the next session optimising charts that are not the problem.

### One more measurement, and an attempt that did not work
Tried to isolate gtag by patching `document.createElement` in an init script
before navigation. **It did not block it** — the script was still in the DOM
afterwards (`@next/third-parties` sets `src` by a path the patch did not cover),
so that experiment is inconclusive and is recorded as such rather than as a
result.

The run was still worth having, because of the gap it shows:

```
TTFB                187 ms
DOMContentLoaded    484 ms
first paint       1,436 ms
first contentful  1,436 ms   (same event as LCP)
CLS                 0.035
```

**Roughly 950ms passes between the DOM being ready and anything appearing on
screen.** That is the shape to chase next — a stylesheet applied late, the
pre-paint theme script, the font load, or a long task holding the first frame —
and it is a different question from the one R-13 started as. Next pass blocks
gtag at the network layer rather than in page script, where it cannot be routed
around.

## 2026-10-17 — the deploy, and the defect it exposed on the way

Published 30 reports, 2 articles and the press release to Supabase (corpus
**152 -> 182**), then built — and the spot check found the new report pages
carrying **no related-research block at all**, while the old ones had theirs.

Three wrong explanations before the right one, each discarded on evidence:

1. *A transient Supabase failure under build load.* Added a retry and a longer
   memo TTL. Rebuilt: unchanged.
2. *Stale build artefacts.* File timestamps showed both files written in the
   same build, six seconds apart.
3. *Bad data.* A direct query returned 182 rows, found the new slug, and counted
   27 same-industry candidates. The data was fine.

Instrumenting the build settled it: **the corpus query returned 152 rows inside
the build while returning 182 outside it.** Next's Data Cache wraps `fetch`, and
supabase-js issues its queries through it — a fetch with no cache hint is cached
**indefinitely**, so this query was served from the *previous build's* entry.
`generateStaticParams` had fresh data, so all 182 pages were generated; each of
the 30 new ones then looked itself up in a 152-row corpus, failed to find
itself, and rendered nothing. No error, no empty section — a missing block on
exactly the new pages.

The first fix was wrong and the build said so plainly: `cache: 'no-store'` made
the route dynamic, and with `dynamicParams = false` every page logged "Dynamic
server usage" and **all 182** shipped without the block — worse than the defect.
The fix is a 60-second `revalidate` on that one query, which keeps the route
static and makes any build a minute after a publish see the new rows.

Verified after the fix: **182 of 182 pages have a related list** (0 with none, 0
query failures), the new reports render their figures with the right unit
(`$963.7M -> $1,177.8M` on the isotope report), each carries its chart source
caption and its own social card, 16 of 16 audited routes are clean and contrast
has 0 failing pairs.

Worth keeping in mind for any future corpus-wide read used during a build: it
needs a revalidate, or the build will cheerfully serve yesterday's corpus.

## 2026-10-17 — the four owner decisions, answered and implemented
Siddhant answered the four `[H]` items in one line each: R-10 "go with what is
better for site", R-9 yes, R-4 yes, R-11 "you draft it and use it in site".

- **R-9 closed as confirmed.** All 12 marks in `TrustedPartnersSection` are
  authorised by the owner. No code change; the finding is recorded as answered
  rather than fixed, which is the honest disposition.
- **R-4: the price is real, the delivery was not.** $2,995 / `InStock` is
  correct and stays. Verifying it exposed a worse defect: `CheckoutForm`'s
  `handleSubmit` was `setSubmitted(true)` and nothing else. It rendered "our
  team will contact you" over a lead that was never sent anywhere — every
  checkout inquiry since the form shipped was dropped. New
  `app/api/purchase-inquiry/route.ts` (mirrors `/api/contact`: same
  `form-guard`, same Resend sender, plus report slug/title and the quoted
  price), `submitPurchaseInquiry()` in `lib/api/forms.ts`, and the form now
  flips to the success panel only on a confirmed send, shows the server's
  message on failure, and keeps what the buyer typed. Its 5 field borders also
  still used `--border` (1.07:1) and are repointed to `--input` (3.43/3.80:1) —
  the token pass that fixed contact, request-sample, blog and 404 had missed
  checkout.
- **R-11 drafted and published.** `/legal/terms-of-use` exists: 10 sections,
  ~5.9KB, covering what we publish and that forecasts are estimates, ordering
  and sales-assisted payment, the report licence (one named user, internal use,
  quoting with attribution; no resale, no training a competing data product),
  free material, automated access via `/llms.txt`, IP, liability capped at what
  was paid, personal data, and who the contracting entity is. Published through
  a new `scripts/legal-db.mjs` (list/dump/check/publish, upsert on `slug`,
  nothing deleted). `Dataset.license` is restored on all 182 report pages and
  the footer carries a Terms of Use link.
  **Governing law is deliberately not asserted** — the footer says NeoGraph
  Analytics Pvt. Ltd. (Pune) while `lib/contact.ts` also carries an Austin, TX
  office, so the page says the contracting entity and governing law are stated
  on the order. Siddhant's call to name one.
- **R-10 resolved as "keep all 182 and widen".** Orphaning 26 indexed pages
  costs more than a broader masthead. Measuring it found the actual defect:
  **22 of those rows were labelled `Life Sciences` in Supabase** — lunar
  mining, undersea cable, green hydrogen, high-entropy alloys, precision-farming
  drones, quantum networking — and both the mega-menu tiles and the `/reports`
  chips derive from that column, so the taxonomy actively misfiled them.
  `scripts/relabel-industries.mjs` (dry run by default) relabelled 28 rows into
  7 honest industries: Advanced Materials 4, Agriculture & Food Tech 6,
  Climate & Energy 4, Digital Infrastructure 3, Quantum Technology 4, Space
  Economy 4, Synthetic Biology 3. The corpus now reads 13 verticals, not 6, and
  the hero and listing counts — which are derived, not written — say so
  without any wording that has to be kept true by hand. `data/categories.json`
  gained the 7 with editorial descriptions and slugs matching the runtime
  derivation. Root, home and `/reports` metadata widened to "healthcare, life
  sciences and frontier technology" (153 and 151 chars); `/about` no longer
  calls itself "a specialized healthcare consulting firm". The "Behind
  Healthcare's Biggest Decisions" h1 stays: healthcare is 156 of 182 rows and
  the ranking brand anchor.

### A third false pass of the same family, caught
`npm run build` on a warm `.next` **emitted the previous build's HTML**: the
compiled server chunk contained the new Terms of Use footer link while
`.next/server/app/about.html`, written by that same build, carried only the old
three. Verification against it would have passed a change that had not been
built. Before that, `next start -p 3100` had failed with `EADDRINUSE` (PID
15684 already held the port) and the 200s came from a stale server — the exact
trap CLAUDE.md warns about. Both now have a habit attached: confirm the PID
owning the port is ours, and move `.next` aside before a build whose output
will be used as evidence.

### Checker
`scripts/audit-html.mjs` audits `/legal/terms-of-use` as a 17th route and gains
a licence rule: a `license` in any ld+json block must point at a route this
build renders (local) or return 200 (`--prod`). Negative-tested — repointing it
at `/legal/nope-does-not-exist` fails the audit, restoring it clears.
`17 of 17 routes error-free, 0 errors, 1 warning` (the pre-existing short
`/design-system` description). `contrast-audit.mjs`: 0 failing pairs.

## 2026-10-17 — the homepage band, and a letter missing from 182 pages

### Featured reports: six in a 3-up grid
Four reports in a 2-up grid gave each card roughly 470px of width, and the
section read as a pair of oversized tiles stacked twice rather than a shelf of
reports. Six in `md:2 xl:3` fills the same band at the width the type was sized
for — title 17/18px, chips and growth rail stepped down to match. Two
alignment rules make a row of three hold together: `min-h-[2.5em]` on the title
so the chips, rail and footer line up whether a title wraps once or twice, and
`mt-auto` on the rail so a short chip row cannot lift it.

Two defects came out of the rework. Every card whose `regional_analysis` was
empty printed "0 regions · Base year 2026" — the count is now omitted rather
than rendered as zero, because nothing-shaped text is worse than nothing. And
each card carried two links to the same page, the title and a "Read more"; the
title's link now stretches over the card with `after:inset-0`, so the whole
card is the hit target and the footer arrow is `aria-hidden` decoration. The
Supabase order gained `report_id desc` as a tiebreaker, so a page of rows
sharing `published_year` is stable between builds rather than arbitrary.

### Partner logos, and why no two tiles matched
The 12 source files in `/assets/logos` are all 150×120 with the artwork
floating in a baked-in white margin that differs per brand. On a 152px tile
that produced a white rectangle of one size with a dark gutter of another
beside every logo. `/assets/logos/trimmed` holds the same artwork cropped to
its ink; each entry declares its real intrinsic size — verified by reading the
PNG IHDR of all 12, every declared pair matches — so `next/image` reserves the
right box, and the tile is white so artwork and tile meet with no seam. The
marquee track gained `pr-4` to pay for the gap that falls between the two
copies; without it the `-50%` keyframe lands half a gap short and the loop
visibly jumps once a cycle.

### A letter missing from every trimmed title (R-17)
`marketName()` in `lib/seo.ts` collapses whitespace, and shipped as `/s+/`
where `/\s+/` was meant — so it replaced the literal letter **s** with a
space. Measured on the built HTML of `/reports/liquid-biopsy-market`, the same
six related-report cards before and after the one-character fix:

```
Antimicrobial Re i tance Diagno tic  Market  ->  Antimicrobial Resistance Diagnostics Market
Veterinary Diagno tic  Market                ->  Veterinary Diagnostics Market
Pharmacogenomic  Market                      ->  Pharmacogenomics Market
Proteomic  Market                            ->  Proteomics Market
```

Six cards on each of 182 report pages, plus every report's OpenGraph image,
which calls the same helper. Nothing failed and no checker fired: the string
was simply wrong, and a wrong string renders. The function's own docstring
already recorded a tool turning its escapes into literal control characters
once — it had happened twice, in the same function, and the second time the
mangled pattern still matched something, so it did damage instead of nothing.
A repo-wide scan found no other unescaped `/s+/`-class pattern and no stray
control characters in any `.ts/.tsx/.mjs/.js/.css` source.

### And a date that depended on where the build ran (R-18)
Writing assertions for the rest of `lib/seo.ts` turned up a second one on the
first run. `schemaDate('December 18, 2025')` returned **2025-12-17**: `new
Date` parses a long-form date as *local* midnight and `toISOString()` converts
to UTC before slicing, so every build east of Greenwich emitted the previous
day while Vercel's UTC build emitted the right one. The calendar fields are now
read back in the zone they were parsed in. A `datePublished` in structured data
should not be a function of the builder's timezone.

### Checker
`scripts/seo-unit.mjs` — 16 offline assertions over `marketName`, `pageTitle`,
`pageDescription` and `schemaDate`, no network and no build, with both
regressions as named cases. It is what caught R-18. Run it with
`node --experimental-strip-types scripts/seo-unit.mjs`; it is in the CLAUDE.md
checker list.

### Housekeeping
The stale `next start -p 3100` from 2026-10-16 02:24 was still holding the port
— the exact false-pass trap CLAUDE.md warns about. Ownership confirmed by
command line before stopping it. Both builds this session ran with `.next`
moved aside, and `.gitignore` now ignores `/.next.*/` so those set-asides stop
showing up as untracked noise; they are build output and are never deleted by
tooling here.

### Verification
Clean build exit 0, no new lint warnings (the one `region` unused warning in
`app/reports/[slug]/page.tsx:65` predates this work). `audit-html.mjs`:
17 of 17 routes error-free, 0 errors, 1 pre-existing warning.
`contrast-audit.mjs`: 0 failing pairs. `seo-unit.mjs`: 16 of 16.
Built homepage HTML: 6 `growth-rail` cards, 24 trimmed-logo references.

## 2026-10-17 — two pages that never got the theme, and a third stale claim

### `/about` and `/services` were still painted in raw slate (R-19)
Both pages wrap their content in `bg-[var(--card)]` and
`bg-[var(--cmi-surface)]` panels — surfaces that do flip for dark mode — with
type on top that did not. Measured against the dark tokens (`--card #131C30`,
`--background #0B1120`, `--muted #18223A`):

```
text-slate-900   1.05 / 1.05 / 1.13 : 1   every h2 and h3 on both pages
text-slate-700   1.64 / 1.82 / 1.53 : 1   the pull quote
text-slate-600   2.24 / 2.48 / 2.09 : 1   mission + who-we-are body, service bullets
text-slate-500   3.57 / 3.96 / 3.32 : 1   all six why-us cards, every service blurb and step
```

WCAG AA asks 4.5:1 for body text. In dark mode the headings were effectively
invisible — the same defect that measured 1.02:1 in `country-select`, left
behind on the two pages that were never converted. 22 classes repointed to
tokens (14 in `app/about/page.tsx`, 8 in `app/services/page.tsx`): ink to
`--cmi-ink`, body to `--cmi-body` (6.00:1 light), meta to `--cmi-meta`
(4.60:1 light), hairlines to `--cmi-line`, and the hover border to
`--cmi-primary` to match every other card on the site. The served `/about`
now contains **0** raw slate classes — the 21 `slate-` substrings a naive grep
finds are all `-translate-`.

A repo-wide scan confirms no `text-slate-*` or `text-gray-*` remains anywhere
in `app/` or `components/` except one `<svg>` stroke in `not-found.tsx:164`,
which sits on its own `bg-slate-100` chip and so keeps its ratio. That pair,
and 34 others like it, are filed as **R-20**: `bg-blue-100`+`text-blue-600`
chips, `bg-red-50`+`text-red-800` error panels and so on. They are not
contrast failures — each pale background carries its own dark foreground — but
they stay light chips on a dark page. `CheckoutForm.tsx:176` is the only one
with a `dark:` variant triple, and shows what a status-colour token set would
replace.

### The third hand-maintained corpus claim on the homepage (R-23)
The featured-reports subheading read "Oncology, medical devices, diagnostics,
digital health and life sciences" — accurate for a healthcare-only corpus, and
untrue since R-15 widened the taxonomy to 13 verticals. The cards are ordered
by publication date, so the first frontier-technology report to top the list
would have appeared under a healthcare-only heading. Its predecessor on the
same line was the "2,500 reports spanning 20+ sectors and 50+ countries" claim.
Rather than rewrite the sentence a third time, it is now `Intl.ListFormat` over
the distinct `industry` values of the six rows the section already fetches:
today, "Medical Devices, Life Sciences, Pharmaceuticals, and Healthcare IT."
from 4 distinct industries across the 6 cards. A sentence derived from its own
data cannot go stale.

### Also filed, not fixed
- **R-21**: the four impact stats on `/about` carry `divide-white/[0.06]` with
  no `divide-x` or `divide-y` beside it, so Tailwind sets a divider colour and
  a zero border width — **0 of 3 intended rules render**. Left in place rather
  than guessed at: `divide-x` on a 2-up grid would also stripe the row starts,
  so which rule was wanted is a design call.
- **R-22**: `.prose table` sets `width: 100%; overflow: hidden` for its rounded
  corners, and the only `display:block; overflow-x:auto` escape is inside
  `@media (max-width: 768px)` — so above 769px a wide table has no scroll
  container. Whether its cells are then clipped or push the page into
  horizontal scroll depends on how the browser applies `overflow` to a table
  box, which this queue may not assert without looking. Doubly latent: **0 of
  the 22 rows in the local snapshots contain a `<table>`**, so nothing
  published exercises it. One rendered check with a deliberately wide table,
  in the night window, before any fix.

### Verification
`tsc --noEmit` clean. Clean build exit 0, 12 lint warnings — the same 12 as
before this work. `audit-html.mjs` against the served build: 17 of 17 routes
error-free, 0 errors, 1 pre-existing warning. `contrast-audit.mjs`: 0 failing
pairs. Built `/about` and `/services`: 0 slate classes, 48/33/16 and 48/79/20
occurrences of `--cmi-ink` / `--cmi-body` / `--cmi-meta`. The dark-mode numbers
above are computed from the token hexes, not observed in a browser — the
rendered check waits for the 21:00-09:00 window.

## 2026-10-17 — a status-colour token set, and the last raw palette class

### What R-20 actually was
Every status panel, chip and glyph on the site was a hand-written Tailwind
pair: `bg-red-50 border-red-200 text-red-800` error panels, `bg-blue-100` +
`text-blue-600` round icon chips, `bg-blue-50` + `text-blue-800` note panels,
`bg-green-100` + `text-green-600` order-confirmed ticks, `bg-amber-50` +
`text-amber-600` accents, and one `bg-purple-100` chip of a hue that appears
nowhere else on the site. None of them were contrast failures — each pale fill
carries its own dark foreground, so the pair keeps its ratio — which is exactly
why they survived three contrast passes. They simply did not flip, so every one
stayed a light chip on a dark page. **One of 35 call sites** had a `dark:`
variant triple, in `CheckoutForm.tsx:176`, which is what the hand-written
approach gets you over time.

### 13 tokens instead of 35 `dark:` variants
`--status-{error,info,success,warn}-{surface,border,text,icon}` now exist in
both theme blocks. The light values are the exact Tailwind hexes they replace,
so light mode is unchanged to the pixel; the dark values are new. 68 raw
classes were repointed across 16 pages and components, and `app/` +
`components/` now contain **0** raw Tailwind palette classes in live markup —
the only matches a grep still finds are inside the `country-select` docstring,
which describes the defect it was fixed for.

The dark fills are deliberately quiet against the card, **1.12 to 1.41:1**,
which is *below* the site's own card hairline at 1.55:1. A dark panel that
shouts is worse than one that whispers, and what makes these panels
perceivable is the border instead: `--status-error-border` is **1.88:1**
against the card and `--status-info-border` **2.41:1**, both above that
baseline. The two round icon chips carry no border of their own, which is why
the chip fill is the loudest of the set.

`scripts/contrast-audit.mjs` gained 12 measured pairs so none of this is
asserted: message text on its own panel runs **7.60–11.83:1** across both
themes, and the glyphs **3.00–9.51:1** against 1.4.11's 3:1 floor. The two
tightest numbers, 3.00 and 3.07, are light-mode amber and green — the existing
Tailwind values, unchanged, so they are not a regression, but they are the two
worth revisiting first if the palette is ever retuned.

### Three things that were not status colours at all
Repointing turned up raw classes doing other jobs:
- `text-blue-600` meant two different things. Inside a `bg-blue-100` chip it is
  a status glyph; in `OrderSummary`, `RegionalAnalysisChart` and the checkout
  bullets it is brand accent text. Mapped per file, to
  `--status-info-icon` and `--cmi-primary` respectively, rather than globally.
- `captcha.tsx` painted its valid state `border-blue-500 focus:ring-blue-500`
  while the invalid branch two lines below already used
  `border-[var(--border)] focus:ring-[var(--primary)]`. Now both branches speak
  the same language.
- Three hand-rolled loading bars in `app/request-sample/page.tsx` and a
  `border-slate-200` footer in `ReportsSkeleton` used raw greys while the
  `Skeleton` component beside them paints `--cmi-surface`. Repointed to match.

The `bg-purple-100` / `text-purple-600` chip on `/request-sample` was mapped to
the info chip rather than given a purple token. Purple was already removed from
`country-select` for appearing nowhere else on the site; adding a token for it
would have made one off-brand chip permanent.

### Verification
`tsc --noEmit` clean. `contrast-audit.mjs` 0 failing pairs in both themes with
the 12 new pairs in place. The rendered confirmation — that these panels read
as panels in a real dark-mode browser — still waits for the 21:00-09:00 window;
every number above is computed from the token hexes.

## 2026-10-17 — 17 pages nobody was told about

### The sitemap robots points at was missing three whole families (R-24)
`robots.ts` advertises exactly one sitemap, `/sitemap.xml`. That route listed
8 static pages, 182 reports, 8 articles and 6 press releases — and none of the
4 legal pages, none of the 10 consulting services, and none of the 3 author
profiles, all of which the build renders. The consulting pages did have a
sitemap of their own, `/sitemap-consulting.xml`, but `robots.ts` never names
it, so no crawler was ever told it exists. With Search Console reporting
**7 pages indexed of 158**, a sitemap that omits 17 real pages is not a
rounding error.

`/sitemap.xml` now emits all three families. The legal query is a deliberate
lean `select('slug,last_updated')` rather than the existing `getLegalPages()`,
which selects `*`: that would pull four policies' full text out of a metered
database every hour to print four URLs. `/sitemap-pages.xml` and
`/sitemap-consulting.xml` keep serving their own subsets unchanged — this route
is simply the complete one, and the one robots points at.

### A component that links to 404s, rendered by nothing (R-25)
`/authors/<n>` is positional: n is the 1-based rank of the row in
`neograph_team_members` ordered by id, because the real ids are strings
(`tm001`, `tm002`, `tm003`) and `app/authors/[id]/page.tsx` does
`parseInt(id)`. `MeetTheTeam` built its two profile links from `member.id`, so
a caller handing it the real rows would have produced `/authors/tm001` →
`parseInt` → `NaN` → `notFound()`. It has never fired, because grep finds
**0 imports** of `MeetTheTeam` outside its own file — which is the other half
of the finding: every build generates 3 author pages and **0 pages link to
them**.

Both hrefs now take the 1-based array index, which is what the route means, and
the positional contract is written down in all four places that have to agree:
`lib/api/authors.ts`, the route's `generateStaticParams`, `app/sitemap.ts` and
the card itself. Three places silently encoding the same off-by-one convention
is how this kind of thing survives.

### Filed for the owner, not guessed (R-26)
No published figure on the site carries a named analyst. `neograph_reports` has
no author column — 32 columns, checked against the live table — and
`lib/jsonReports.ts:170` hardcodes `authors: []`, so the report page's JSON-LD
falls back to `author: {Organization, NeoGraph Analytics}` on all 182 pages.
That is normal for market research and the schema is not wrong. But three
analyst profiles with bios are sitting unlinked, and on a publication whose
differentiator is checkable figures, a named analyst is worth more than a logo.
Who wrote which report is not mine to assign.

### Checker
`scripts/audit-html.mjs` gains a sitemap rule, `--prod` only because
`/sitemap.xml` is a route handler with no artefact under `.next/server/app`
to read locally. It asserts that each of the six published page families is
represented, and that nothing advertised 404s — a sitemap full of dead URLs
is worse than a short one. The 182 report URLs are sampled rather than all
fetched, since the per-route pass already covers report pages.

Negative-tested against production before the merge, which is still serving
the old sitemap:

```
sitemap.xml  HTTP 200
  204 urls
  ok 182 x /reports/
  ok   8 x /blog/
  ok   6 x /press-releases/
  x no /consulting/ urls - a published page family is absent from the sitemap
  x no /legal/ urls - a published page family is absent from the sitemap
  x no /authors/ urls - a published page family is absent from the sitemap
  ok 27 of 204 urls fetched (every non-report url, plus a 5-report sample): 0 dead
```

### Verification
`tsc --noEmit` clean. Build exit 0, 12 lint warnings — the same 12.
`audit-html.mjs` locally: 17 of 17 routes error-free, 0 errors, 1 pre-existing
warning. The served `/sitemap.xml` from this build carries **221 URLs**:
8 static + 182 reports + 8 articles + 6 press releases + 10 consulting +
4 legal + 3 authors, and all **17** newly advertised URLs were fetched
individually and returned **200**. `contrast-audit.mjs`: 0 failing pairs.
`seo-unit.mjs`: 16 of 16.

## 2026-10-17 — 39KB of research the site was storing and not showing

### What a section census turned up
Scanning all 182 built report pages for the sections they render, against the
32 columns the table actually has, produced one real gap. `reader_takeaways`
looked absent but renders as "Strategic Takeaways" — 545 takeaways across all
182 rows, working. `company_profiles` was the real find.

### R-27: the overview nobody could read
Every one of the **418** objects in `company_profiles` carries an `overview`,
and 39KB of that prose was going nowhere. The landscape card matches profiles
to players by company name and reads exactly two fields off the match —
`profile.revenue` for the figure in the corner and
`profile.ai_healthcare_products` for the chips. The paragraph was never
referenced.

Two measurements decided the fix rather than one:

- **246 of the 418 overviews repeat the landscape row's own `description`
  verbatim.** Rendering all of them would have printed the same sentence twice
  on 246 cards. The overview is therefore shown only when it differs, which
  surfaces the **172** that were saying something new.
- **19 of 418 profiles match no player by exact name.** The first instinct was
  a name-matching bug — "Siemens Healthineers" against a list of startups looks
  like a punctuation problem. A normaliser (case, brackets, punctuation,
  corporate suffixes) recovers exactly **2**: "Novartis (Hexal)" and "Teladoc
  Health", which are the same companies spelled differently in the two columns.
  The remaining **17, across 15 reports**, are companies that were researched
  and written up and genuinely are not in that report's player list. They now
  follow the cards under an "Also profiled" sub-heading instead of being
  discarded.

  The normaliser stays, because it earns its place in the other direction: with
  exact matching those 2 profiles lose their revenue and product chips from the
  player card *and* get printed a second time below it as unlisted. The built
  corpus went from 19 cards on 16 pages to 17 on 15.

That second measurement is the one worth keeping: the obvious fix — fuzzy
matching — would have recovered 2 profiles of 19, left 15 still invisible, and
introduced a new way to match the wrong company.

### And the same regex hazard, a third time
The first draft of the normaliser used `` word boundaries. A tool ate the
backslashes and left literal backspace characters in the source, exactly as
recorded twice in `lib/seo.ts` — and this time the mangled pattern still
matched things, so `co` matched inside "Covestro" and `sa` inside "Samsung".
Caught by reading the bytes rather than the rendered file, where a backspace is
invisible. The pieces are now built with `new RegExp` from plain strings, the
suffix list is anchored on spaces, and `normName` pads the name so those
anchors work at both ends. A string has no escape to lose. Verified on the real
names: "Covestro AG" → "covestro", "Samsung Electronics" → "samsung
electronics", "Dexcom, Inc." → "dexcom".

### Not fixed, noted
`CompanyProfile.founded` and `market_position` are also never read off a
profile. `founded` is a single number and its absence costs little; it stays
unused rather than being worked into a card that already carries five fields.

### Checker
`scripts/source-hygiene.mjs` — 221 source files, offline, scanning bytes rather
than text for two things nothing else catches:

- **Stray control characters.** A backspace, vertical tab or form feed in source
  is a regex escape that lost its backslash. None of them are visible in an
  editor or in `cat`, which is how three of them survived here.
- **Regex literals that start `/s+`, `/d{4}`, `/w+`** — the exact shape a lost
  backslash leaves behind.

Negative-tested by reintroducing the real `/s+/` bug into `lib/seo.ts`:

```
x lib\seo.ts:119  regex literal starts (/s+ — a lost backslash looks exactly like this
1 finding
```

restored, 0 findings. Worth stating why this earns a checker: none of the three
instances failed a build, a typecheck or a lint, and two of them matched
*something*, so they did damage instead of nothing. A silent wrong string is
the hardest class of defect on a site whose value is that its figures are
checkable.

### Verification
`tsc --noEmit` clean. Build exit 0, 12 lint warnings — the same 12 as before
today's work. Built corpus: `"Also profiled"` on **15 pages with 17 cards**,
matching the live-table measurement exactly (418 profiles, 399 exact matches,
2 recovered by normalising, 17 unlisted across 15 reports), and
`europe-biosimilars-market` correctly shows **0** unlisted now that
"Novartis (Hexal)" matches "Novartis (via Hexal)". The overview paragraph
renders as visible HTML, confirmed on `/reports/ai-in-lab-automation-market`.
`audit-html.mjs`: 17 of 17 routes error-free, 0 errors, 1 pre-existing warning.
`contrast-audit.mjs`: 0 failing pairs. `source-hygiene.mjs`: 0 findings.
`seo-unit.mjs`: 16 of 16.

## 2026-10-17 — auditing the file that tells the next session what is true

### R-28: CLAUDE.md was wrong in six places
Chasing a BACKLOG item about NaN in chart projections turned into a check of
CLAUDE.md itself, and the doc that steers every session had drifted:

- **Chart components.** The list named six under `components/reports/charts/`.
  Two of them, `MarketSizeChart` and `SegmentationChart`, are not in that
  directory at all — they sit a level up. And only **3 of the 7** files that
  *are* there get imported by anything: `MarketForecastLineChart`,
  `ComponentSharePieChart` and `RegionalBarChart`, all from
  `JsonReportSections.tsx`.
- **`lib/chartUtils.ts`** was listed as "Chart data processing" and is imported
  by nothing. That matters more than a stale line usually would, because its
  arithmetic is unsafe. Measured:

  ```
  calculateCAGR(0, 5.6, 9)              -> Infinity
  calculateCAGR(1, 5.6, 0)              -> Infinity
  generateMarketProjection(0, 5.6, 2023, 2032) -> NaN from the second point on
  generateMarketProjection(1, 5.6, 2024, 2024) -> NaN
  parseCurrencyValue('—')               -> NaN
  parsePercentage('N/A')                -> NaN
  ```

  The BACKLOG entry "Chart projection math yields NaN when market size is
  0/absent" is real, and it is in dead code. Writing that down is worth more
  than fixing it: the next person to need a projection helper now knows not to
  reach for this one unexamined.
- **`lib/html-toc-utils.ts`** is unused too; the report page uses
  `lib/reportToc.ts`.
- **The routes list** omitted `/methodology` — the page R-13's measurements were
  taken on — and `/design-system`.
- **The sitemap line** named `/sitemap-pages.xml` and `/sitemap-consulting.xml`
  and not `/sitemap.xml`, which is the only one `robots.ts` advertises and now
  the complete one.
- **`lib/api`** omitted 5 modules, `relatedReports.ts` among them;
  **`components/ui`** omitted 6, including `country-select`, which has its own
  defect history in this queue.

Nothing was deleted, per the standing rule. The doc now says which files are
live and which are not, which is the part that saves time: a dead component and
a broken one look identical from a stale index.

## 2026-10-17 17:40 IST — merged on request (#19), verified in production

Siddhant asked for a merge outside the 21:00 slot; extra merges on request are
uncapped. `576143e`, squashed. Vercel had it live in roughly two minutes.

### The merge itself cost one commit of care
#18 was squash-merged, so all of its content sits in `main` under one commit the
branch did not have, and **17 files conflicted**. `git log origin/main --not
work/continuous-improvements` returns exactly that one squash commit, so `main`
held no independent work — but that was checked rather than assumed, by diffing
each conflicted file's two versions. Everything present only on main's side was
the *older* form of a line the branch had since changed: the `/s+/` bug, the
`toISOString()` date, the comment explaining the removed licence (superseded now
that `/legal/terms-of-use` exists), the usage string without `columns`, and
"Five merges a day". Resolved to the branch version in all 17.

`git diff` between the pre-merge branch tip and the merge result is **empty** —
the merge is purely a history-linking commit, so what shipped is byte-identical
to what the checkers had already passed. No rebuild was needed, and that was
verified rather than hoped: the three previous false passes in this repo all
came from trusting a build that did not match the source.

`git checkout --ours` was refused by the harness as irreversible local
destruction. Writing each file from `git show HEAD:<path>` reaches the same
state without a destructive checkout, and is what was used.

### Production verification

```
audit-html.mjs --prod        17 of 17 pages error-free, 0 errors, 1 warning
  ld+json license            -> /legal/terms-of-use  HTTP 200
  sitemap.xml                221 urls, all six families present
                             44 of 221 fetched (every non-report url + a 5-report sample): 0 dead
sitemap composition          182 reports / 8 blog / 6 PR / 10 consulting / 4 legal / 3 authors
                             was 204 urls with three families missing entirely
```

Each fix checked on the live site rather than inferred from the deploy
succeeding:

```
R-17  /reports/liquid-biopsy-market related cards
        "Antimicrobial Resistance Diagnostics Market"   (was "Re i tance Diagno tic")
        "Pharmacogenomics Market", "Proteomics Market", "Veterinary Diagnostics Market"
R-18  /blog/when-disclosed-revenue-exceeds-the-market
        "datePublished":"2026-10-16"                    a calendar date, single value
R-19  /about                                            0 occurrences of text-slate-*
R-20  production stylesheet 9ee8b620361267b1.css
        --status-error-surface  #FEF2F2 light / #3A1D25 dark
        --status-info-chip      #DBEAFE light / #22355E dark
R-23  /                                                 "Medical Devices, Life Sciences,
                                                          Pharmaceuticals, and Healthcare IT."
R-24  /legal/terms-of-use /legal/privacy-policy /consulting/market-assessment
      /authors/1 /authors/3                              200 each
R-25  /authors/2                                        h1 "Aditi Shivarkar"
R-27  /reports/europe-clinical-decision-support-market
        "Also profiled": IBM Watson Health, Siemens Healthineers
        — the report whose 3 profiles previously rendered nothing at all
```

Corpus still reads 182 across the hero, the listing and `/llms.txt`.

The sitemap rule added to `audit-html.mjs` this morning now passes in
production, having correctly failed there an hour before the merge with all
three missing families named. That is the negative and positive test of the same
rule inside one day.

### Still unobserved
Every dark-mode contrast ratio in this deploy is computed from the token hexes.
Production confirms the tokens shipped with both values; it does not confirm
what a person sees. That, R-13's first-paint trace and R-22's table check all
wait for the 21:00-09:00 browser window.

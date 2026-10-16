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

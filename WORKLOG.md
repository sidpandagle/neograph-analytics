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

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

# STATUS

**Updated:** 2026-10-15
**Budget:** 7d used            : 3% ceiling (70% pace) : 22.6% headroom           : +19.6 points  (ceiling is 70% of pace, not 70% absolute)
**Mode:** P0 bundle built and verified; awaiting production build to confirm 404 status

## Now
Second production build running after fixing a crash it exposed. On success:
commit the P0 bundle as one PR.

## P0 bundle — complete, pending build confirmation
1. All 140 reports render (were 10). New Supabase-first loader, JSON kept as fallback.
2. Fabricated `aggregateRating` (4.7/45 reviews) removed — Google policy violation.
3. JSON-LD `</script>` injection closed (and a silent no-op in my first fix caught).
4. `public/robots.txt` pointing at the old `synapticresearch.com` brand moved aside.
5. Site-wide canonical leak removed; per-route canonicals added to 13+ pages.
6. `revalidate = 3600` added to 11 routes — fixes the 28-day stale production cache.
7. `loading.tsx` moved off 4 dynamic detail routes — `/authors/99` now 404s correctly.
8. `lib/format.ts` added; one malformed row can no longer abort the whole build.

## Blockers
- **[H] Cloudflare API token.** Account ID captured (in `env`). Image hosting, OG
  images and `cdn.neographanalytics.com` wait on this. Nothing else is blocked.

## Next (no input needed)
1. Confirm 404 status on the production build; if reports/blog/press-releases still
   return 200, resolve existence before streaming rather than after.
2. Remove fabricated figures: invented telemedicine hero chart, "2,500+ reports"
   (actual 140), About's client/specialist claims.
3. Turn on the report TOC (`hasFullContent = false` disables it), render
   `research_methodology`, add chart source captions and bylines.
4. Harden form handlers (no validation, no escaping, no rate limit today).
5. Submit the sitemap to Search Console — only after the 140 pages are live.

## Key facts
- Search Console: 0 sitemaps submitted, 7 pages indexed of 158, 6 clicks / 2.4k
  impressions / position 31.8 over 90 days. Demand exists: "ai in oncology market"
  506 impressions, 0 clicks.
- Vercel auto-deploys from `main`, Hobby plan, all meters well inside free limits.
  Tightest meter: Image Optimization 492/5,000 transformations — prefer inline SVG.

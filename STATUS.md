# STATUS

**Updated:** 2026-10-15 07:10 UTC
**Budget:** 7d used 5% | pace 39.4% | ceiling (70% of pace) 27.6% | headroom +22.6 points
**Commits today:** 3 of 5 used — slots at 03:30, 03:50, 04:25 UTC. Two left; next ~08:30.
**Pacing:** commits spread across the 24h window, roughly one every 4-5 hours
(user instruction 2026-10-15). Between slots: research, Supabase content, audits,
production verification. A slot passes unused rather than forcing out an
unfinished bundle.
**Mode:** running

## Shipped and verified in production today

| PR | What it fixed |
|---|---|
| #4 | 130 soft 404s; all 140 reports reachable; fabricated `aggregateRating` removed; canonical leak; `revalidate` on 11 routes |
| #5 | Every fabricated figure replaced with real data; TOC enabled (13 anchors); methodology rendered |
| #6 | Form endpoints validated, escaped, rate-limited |
| #7 | Segmentation recovery (48 reports, 238 dropped entries) + first sourced report |
| #8 | Document structure: 28 headings before `<h1>` -> 0; 2 `<main>` -> 1; skip link; titles; sidebar widths |
| #9 | `/reports` and `/request-sample` server-rendered nothing — restored |
| #10 | Wide-screen layout; `/consulting` 404 -> 308; sitemap contradictions |

Sitemap submitted and read by Google same-day: Success, 158 pages discovered,
against 7 indexed before.

## The testing cycle (standing, added 2026-10-15)

A headless audit fetches 13 routes and checks heading order, landmarks, ARIA
wiring, form labelling, title/description length, canonicals and JSON-LD
validity. No browser is opened. It runs against `.next/server/app/*.html` before
a commit and against production after the deploy.

Current result: **7 of 11 audited pages clean.** Remaining flags are the stored
`meta_title`/`meta_description` lengths (a Supabase content pass) and
`/design-system`, which is robots-disallowed.

Two rules in the audit script itself were wrong and were corrected: it counted
`&amp;` as five characters when measuring titles, and flagged buttons as
icon-only when they had visible text.

## Verified in production after the latest deploy

```
headings before <h1>        28 -> 0
<main> landmarks             2 -> 1
/reports report links in HTML 0 -> 12
/reports title length        71 -> 55
/consulting                 404 -> 308 -> /services
sitemap-pages URLs            9 -> 7, all resolve
--desk-max at >=1800px      1240px -> 1520px (confirmed in the served CSS)
```

## In flight

- **`oncology-information-systems-market`** published to Supabase (corpus now
  **142**). Builds clean locally, all 11 sections render, regional analysis
  correctly omitted. `dynamicParams = false`, so it needs a deploy to go live —
  it ships with the next commit.
- **`lib/api/authors.ts`** egress fix staged, not yet committed.
- **Meta titles** already live in Supabase (141 rows); they reach production via
  ISR without waiting for a deploy.

## Blockers

None. Cloudflare remains closed out: the domain runs on GoDaddy nameservers, so
R2 custom domains would require migrating DNS on a live domain. Visuals ship as
inline SVG — no hosting, no egress, no image transformations consumed.

## Next up

1. Deploy the OIS report (next commit slot).
2. ~~Report `meta_title` too long~~ **DONE** — pattern pass over Supabase, mean
   92.4 -> 56.4 chars, 26 contradictory "Global <Region>" titles repaired.
   `meta_description` still over 160 on 14 rows; needs editorial judgement.
3. Chart `<figure>`/`<figcaption>` with source notes; `charts[].data_source` is
   populated and unused.
4. Analyst prose at 12px, ~2.9:1 contrast (fails WCAG AA), ~95-character lines.
5. `/reports` ships ~508KB, nearly all RSC payload for 142 reports. Select only
   the columns the cards need.
6. Re-check Search Console coverage ~2026-10-29 against the baseline (6 clicks,
   2,400 impressions, 0.2% CTR, position 31.8, 7 indexed).

## Content pipeline

Oncology cluster (see BACKLOG). **2 of 5 published.** Next: Precision Oncology &
Companion Diagnostics, Radiation Oncology, Cancer Immunotherapy.

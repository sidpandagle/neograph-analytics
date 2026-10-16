# STATUS

**Updated:** 2026-10-16 18:10 IST
**Budget:** 7d used 12% | pace 56.3% | ceiling (70% of pace) 39.4% | headroom +27.4 points
**Merges to `main` today (IST):** **5 of 5 used** — #13 00:13, #14 01:02,
#15 02:26, #16 09:08, #17 17:30 (round 1 of the reports). No deploy left today;
work continues on the branch and Supabase content changes still reach
production through ISR.
**Commits on `work/continuous-improvements`:** three since the merge.
**Mode:** running

## Active task — the 30-50 report expansion

Standing instruction received today: add **30-50 research reports**. Corpus is
**142** rows.

Built first, because the discipline could not be enforced by hand across 40
reports:

- `scripts/report-db.mjs` — `count` / `slugs` / `industries` / `dump` / `check` /
  `publish`. `check` is offline and refuses a draft whose CAGR does not
  reconcile with its own endpoints, whose series does not start at the base
  year, which claims a vendor market share, whose `meta_title` exceeds 60 chars
  or claims both "Global" and a region, or whose charts carry no `data_source`.
  `publish` upserts on `slug` — never deletes.
- `research/REPORT-AUTHORING-BRIEF.md` — the contract for a research pass:
  evidence file first, with a mandatory "do not publish" list; at least three
  published estimates with their stated scopes; one grounding calculation
  against a countable public register.
- `research/REPORT-PIPELINE.md` — 40 topics in 8 batches, checked against
  `research/corpus-slugs.txt` so none duplicates an existing row. No further
  regional clones.

**Round 1 published — corpus 142 -> 152.** Ten reports, every base year a named
publisher's own figure advanced at that publisher's own rate, every headline
divided through by something countable. Figures and grounding arithmetic are
tabulated in `research/REPORT-PIPELINE.md`. Live in production and verified.

**In flight:** round 2, two agents — batch 2A (single-cell sequencing, spatial
biology, proteomics, pharmacogenomics, organoids) and batch 2B (decentralised
trials, RWE, interoperability, RCM automation, hospital-at-home). ETA ~25
minutes from 18:10 IST. Their brief forbids installing anything, after a round-1
agent put `pypdf` into user site-packages.

## Shipped to the branch since the last merge

| Commit | What it does |
|---|---|
| `ab17fc0` | Charts carry `<figure>`/`<figcaption>` source notes; `/methodology` page; `error.tsx` + `global-error.tsx`; the report-db tool and authoring brief |
| `1aea085` | Category chips, mega-menu tiles and the region select derived from the corpus instead of a 12-row JSON |
| `1e04e20` | Fabricated testimonials no longer rendered on the homepage |

Shipped since (on the branch, awaiting tomorrow's first slot):

| Commit | What it does |
|---|---|
| `51d2e7f` | Round 1: ten reports; unit-aware money formatting; two new checker rules |
| `2bd5c83` | Titles over 60 chars 45 -> 0, descriptions over 160 14 -> 0, across all 152 rows (Supabase, already live via ISR) |
| `c20f2e0` | Two-tone focus ring; worst-case contrast 1.00:1 -> 7.25:1, and it now survives the 33 `focus:outline-none` call sites |

Measured outcomes:

```
chart source attributions in built HTML      0 -> rendered under every chart
/methodology                                 404 -> prerendered, 1 h1 / 5 h2
category chips matching zero reports         6 of 12 -> 0 of 6
?category= links in the header               12 -> 6 (38/39/16/6/23/20 = 142)
region options returning nothing             5 of 6 -> control dropped
error boundaries                             0 -> 2
```

## Needs Siddhant

- **R-9** — the "Our research shapes decisions at" marquee asserts client
  relationships with 12 third-party marks (Meta, Trivago, Suzuki, Kawasaki,
  Nestlé, CDC, BCG, PwC, Argonne, ChampionX, Mitsubishi, SK). It may be true;
  it is not mine to judge. One yes/no per logo and the unverifiable ones come
  off the page.
- **R-4** — the Product/Offer JSON-LD publishes a hardcoded `$2,995` with
  `InStock`. The same figure is on the page, so changing only the schema would
  make them disagree. Pricing and checkout are yours.

## Next up

1. Review and publish round 2 when both batches pass `check` (publishing is
   Supabase-only; it needs tomorrow's first merge slot only to prerender the
   pages, since `dynamicParams = false`).
2. Launch round 3 (batches 3A/3B — proton therapy, surgical navigation, insulin
   delivery, sleep apnoea, hearing aids; biologics CDMO, sterile injectables,
   vaccine cold chain, plasma fractionation, pharmacy automation).
3. `StyledReportContent.tsx` (381 lines of tuned long-form CSS) is imported
   nowhere, so `.prose` never applies to a report page. Wire it or record why
   not — it is not to be deleted.
4. Confirm the new focus ring in a browser after 21:00 IST; the contrast
   figures so far are computed from token values.
5. `/design-system` renders 2 `<h1>` and has no canonical (robots-disallowed,
   so the impact is confined).

## Blockers

None.

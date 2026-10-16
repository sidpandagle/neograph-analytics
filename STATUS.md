# STATUS

**Updated:** 2026-10-16 17:05 IST
**Budget:** 7d used 12% | pace 56.3% | ceiling (70% of pace) 39.4% | headroom +27.4 points
**Merges to `main` today (IST):** 4 of 5 used — #13 00:13, #14 01:02, #15 02:26,
#16 09:08. **One slot left**, held for the first batch of new reports.
**Commits on `work/continuous-improvements`:** unlimited, three since the last merge.
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

**In flight:** two research agents on round 1 (batch 1A diagnostics/devices,
batch 1B therapeutics), 5 reports each. They stop at a passing `check`;
publishing stays here. ETA for round 1 drafts: ~60-90 minutes from 16:50 IST.

## Shipped to the branch since the last merge

| Commit | What it does |
|---|---|
| `ab17fc0` | Charts carry `<figure>`/`<figcaption>` source notes; `/methodology` page; `error.tsx` + `global-error.tsx`; the report-db tool and authoring brief |
| `1aea085` | Category chips, mega-menu tiles and the region select derived from the corpus instead of a 12-row JSON |
| `1e04e20` | Fabricated testimonials no longer rendered on the homepage |

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

1. Publish round 1 of the new reports once both batches pass `check`, then
   spend today's last merge slot on them.
2. Launch round 2 (batches 2A/2B — single-cell sequencing, spatial biology,
   proteomics, pharmacogenomics, organoids; DCTs, RWE, interoperability, RCM
   automation, hospital-at-home).
3. `meta_description` over 160 chars on 14 of 142 rows — the new checker
   rejects this, so the corpus has to meet its own rule. Per-row editorial, not
   a pattern substitution.
4. `getReportBySlug` runs a second full-table query purely to compute an array
   index; the listing still does `select('*')` over 142 rows of large JSONB.
   Both are metered egress.
5. `StyledReportContent.tsx` (381 lines of tuned long-form CSS) is imported
   nowhere, so `.prose` never applies to a report page. Wire it or record why
   not — it is not to be deleted.

## Blockers

None.

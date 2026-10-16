# Radiopharmaceuticals Market — research notes
**Slug:** radiopharmaceuticals-market   **Drafted:** 2026-10-16

## Published estimates (what others say)

| Source | Published | Base year | Base value | Forecast year | Forecast value | CAGR | Scope as stated |
|---|---|---|---|---|---|---|---|
| Precedence Research (via BioSpace press release) | 2025 | 2025 | $7.51B (2024: $6.74B) | 2034 | $14.44B | 7.53% (2025-34) | "Radiopharmaceuticals" — diagnostic and therapeutic combined |
| BCC Research, *Radiopharmaceuticals: Technologies and Global Markets* | 2024 | 2024 | $10.3B | 2029 | $21.9B | 16.4% (2024-29) | Radiopharmaceuticals incl. generators, cold kits and radioisotope supply |
| Towards Healthcare | 2025 | 2025 | $7.75B | 2035 | $17.91B | 8.74% (2026-35) | "Radiopharmaceuticals for nuclear medicine" — narrower than the above |
| IMARC Group | 2025 | 2024 | $5.8B | 2033 | — | 4.9% (2025-33) | Radiopharmaceuticals, global |
| Market Research Future | 2025 | 2024 | $6.81B | 2035 | $12.3B | ~5.52% | Radiopharmaceuticals, global |
| Roots Analysis | 2025 | — | — | 2040 | $54.6B | 10.6% | Radiopharmaceuticals, long horizon |
| PS Market Research (radioligand therapy only) | 2024 | 2024 | $9.21B | 2030 | $9.74B | ~0.9% | Radioligand **therapy** only — not comparable |

## The spread

On the base year the houses are relatively close by market-research standards:
**$5.8B (IMARC, 2024) to $10.3B (BCC, 2024) — a 1.78x spread.**

The growth rates are the opposite case. They run **4.9% (IMARC) to 16.4%
(BCC), a 3.35x spread** — far wider than the base-year disagreement, and the
reverse of the usual pattern (in the oncology-information-systems report the
bases spread 2.74x while the rates spread only 1.27x).

That tells you where the real scope decision sits. This market is the sum of
two businesses moving in opposite directions:

- **Therapy** (Lu-177, Ra-223, future Ac-225): Pluvicto grew **+43%** in USD in
  FY2025, Lutathera **+13%**.
- **Diagnostics** (Tc-99m generators, FDG, PSMA PET tracers): Lantheus's
  Pylarify, the largest disclosed single diagnostic tracer, **fell 6.5%** in
  FY2025 and Lantheus guided 2026 group revenue *down*, to $1.40-1.45B from
  $1.54B.

A published CAGR for "radiopharmaceuticals" is therefore mostly an assumption
about the therapy/diagnostic mix. 16.4% is a therapy-weighted view; 4.9% is a
generator-and-tracer-weighted view. Neither is wrong on its own definition.

## Grounding arithmetic

Disclosed FY2025 radiopharmaceutical product revenue, from company reporting
(USD millions):

| Company | Product | FY2025 revenue | Source |
|---|---|---|---|
| Novartis | Pluvicto | 1,994 (+43% USD) | FY2025 results, top-20 brand table |
| Novartis | Lutathera | 816 (+13% USD) | same table |
| Lantheus | Pylarify | 989.1 (-6.5%) | FY2025 results, 26 Feb 2026 (Q4 alone $240.2m, -9.7%) |
| Telix | Group ex third-party distribution | 633.7 | FY2025 group revenue US$803.8m less US$170.1m RLS third-party product sales and service fees |
| **Sum** | | **4,432.8 → $4.43B** | |

Compare with the published base-year sizes:

| Published base | Disclosed sum as % of it | Residual left for everything else |
|---|---|---|
| IMARC $5.8B (2024) | **76%** | ~$1.37B |
| Precedence $7.51B (2025) | **59%** | ~$3.08B |
| BCC $10.3B (2024) | **43%** | ~$5.87B |

The residual has to cover **every** Tc-99m generator and cold kit worldwide,
all F-18 FDG production, cardiac perfusion agents, I-131, Xofigo (Bayer does
not disclose it separately), Curium and Cardinal Health Nuclear (both private,
no public product revenue), and all Chinese, Japanese and Indian domestic
production.

**$1.37B does not cover that.** Tc-99m alone is administered in tens of
millions of procedures a year. So the arithmetic **rules out the bottom of the
published range** — IMARC's $5.8B and Market Research Future's $6.81B cannot be
describing the whole category, because four products from three companies
already account for three-quarters of it. It is **consistent with** the
Precedence/Towards Healthcare cluster at $7.5-7.8B only if that cluster is read
as therapy-plus-branded-diagnostics and largely excludes commodity generator
supply, and it is comfortably consistent with BCC's $10.3B.

This is a plausibility test, not a market estimate. It establishes a floor and
rules out the low end; it does not tell us the right number.

Second register check: **ClinicalTrials.gov**, intervention search `"lutetium
Lu 177"`, retrieved 2026-10-16 via the v2 API: **102 registered studies**. That
is the pipeline behind the therapy half of the market, and it is why the
therapy-weighted forecasts carry the higher CAGRs.

## What we publish

- **Base:** $8.08B for 2026 — Precedence Research's published 2025 figure of
  $7.51B advanced one year at Precedence's own published 7.53% CAGR. Stated as
  such in the methodology. It was chosen because it is the most recently based
  broad-scope estimate that the grounding arithmetic does not rule out.
- **Forecast:** $12.49B by 2032 at **7.53%**, Precedence's own rate.
- The spread, both ways round (1.78x on base, 3.35x on rate), and the
  disclosed-revenue arithmetic, are the report's headline content.

## Do not publish

- **Vendor market share.** Curium and Cardinal Health Nuclear are private and
  publish no product revenue; Bayer does not break out Xofigo. Any share table
  would be invented. `competitive_landscape[].market_share` stays absent.
- **Regional and country splits.** Precedence states North America held the
  largest share but publishes no auditable split in the public release.
  `regional_analysis` and `country_analysis` stay `[]`.
- **Segment percentages** (diagnostic vs therapeutic shares). Nobody publishes
  a defensible split; segmentation stays as plain strings.
- **Kymriah-style inferred annual totals.** Telix's product-only figure is
  derived by subtracting a disclosed line item, which is stated; no other
  figure is reconstructed from quarters.
- **An FDA approval count.** No authoritative public list of approved
  radiopharmaceuticals with a count was located; the number is left out rather
  than guessed.

## Sources

1. Precedence Research, "Radiopharmaceuticals Market Size Worth USD 14.44
   Billion by 2034", via BioSpace press releases, 2025.
   https://www.biospace.com/press-releases/radiopharmaceuticals-market-size-worth-usd-14-44-billion-by-2034
2. BCC Research, *Radiopharmaceuticals: Technologies and Global Markets*
   ($10.3B 2024 → $21.9B 2029, 16.4%).
   https://www.bccresearch.com/market-research/pharmaceuticals/radiopharmaceuticals-technologies-markets-report.html
3. Towards Healthcare, "Radiopharmaceutical for Nuclear Medicine Market
   Sizing", 2025.
   https://www.towardshealthcare.com/insights/radiopharmaceutical-for-nuclear-medicine-market-sizing
4. IMARC Group, "Radiopharmaceuticals Market", 2025.
   https://www.imarcgroup.com/radiopharmaceuticals-market
5. Market Research Future, radiopharmaceuticals market page, 2025.
6. Roots Analysis, "Radiopharmaceuticals Market Growth", 2025.
   https://www.rootsanalysis.com/press-releases/radiopharmaceuticals-market-growth.html
7. Novartis, full-year 2025 results media release, 2026 — Pluvicto USD 1,994m
   (+43% USD, +42% cc), Lutathera USD 816m (+13% USD), group USD 54,532m.
   https://www.novartis.com/news/media-releases/novartis-delivered-high-single-digit-sales-growth-achieved-40-core-margin-and-further-advanced-pipeline-2025
8. Lantheus Holdings, "Fourth Quarter and Full Year 2025 Financial Results",
   26 February 2026 — group revenue $1.54B, Q4 Pylarify $240.2m (-9.7%),
   FY Pylarify $989.1m (-6.5%, from the earnings summary of that release),
   2026 guidance $1.40-1.45B. https://investor.lantheus.com/node/16821
9. Telix Pharmaceuticals, "FY 2025 Results", 19-20 February 2026 — group
   revenue US$803.8m (+56%), RLS segment US$238.4m including US$170.1m
   third-party product sales and service fees, FY2026 guidance US$950-970m.
   https://telixpharma.com/news-views/fy-2025-results-strong-commercial-growth-focused-pipeline-investment/
10. ClinicalTrials.gov API v2, `query.intr="lutetium Lu 177"`, totalCount 102,
    retrieved 2026-10-16.
11. AJMC, "Will the Coming Radiopharmaceutical Wave Reach More Patients With
    Cancer?", 10 April 2025 — Pluvicto's March 2025 label expansion.
    https://www.ajmc.com/view/will-the-coming-radiopharmaceutical-wave-reach-more-patients-with-cancer-

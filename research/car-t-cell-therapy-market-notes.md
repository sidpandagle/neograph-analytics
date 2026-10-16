# CAR-T Cell Therapy Market — research notes
**Slug:** car-t-cell-therapy-market   **Drafted:** 2026-10-16

## Published estimates (what others say)

| Source | Published | Base year | Base value | Forecast year | Forecast value | CAGR | Scope as stated |
|---|---|---|---|---|---|---|---|
| Coherent Market Insights (via BioSpace) | 2025 | 2025 | $3.99B | 2032 | $15.06B | 20.9% | Global CAR-T cell therapy; states CD19 = 86.5% of 2025 share |
| Global Market Insights | 2025 | 2024 | $4.3B | 2034 | $61.1B | 30.5% (2025-34) | Global CAR-T cell therapy |
| Research and Markets (via BusinessWire, Jul 2025) | 2025 | 2024 | $4.6B | 2033 | $18.1B | 14.6% | Global CAR-T cell therapy |
| Research and Markets (via GlobeNewswire, Dec 2025) | 2025 | 2024 | $3.87B | 2030 | $13.25B | 22.77% | Global CAR-T cell therapy forecast report |
| Technavio | 2025 | 2024 | — | 2029 | +$3.56B increase | 17.3% | Incremental growth, not a level |
| Meticulous Research | 2025 | — | — | 2032 | $51.6B | 43.3% | Global CAR-T; clear outlier |
| Towards Healthcare (solid tumours only) | 2025 | 2025 | $1.42B | 2035 | $17.98B | 28.9% | CAR-T **for solid tumours** — not comparable |

## The spread

The base-year estimates are unusually tight: **$3.87B to $4.6B, a 1.19x
spread.** The growth rates are not: **14.6% to 43.3%, a 2.97x spread.**

So the houses broadly agree about today and disagree violently about the slope.
That would normally be the story. It is not the story here, because of what the
companies themselves disclose.

## Grounding arithmetic

Worldwide net product revenue for approved CAR-T products, FY2025, as disclosed
by their manufacturers (USD millions):

| Product | Company | FY2025 | FY2024 | Source |
|---|---|---|---|---|
| Yescarta | Gilead | 1,500 | — (-5% y/y) | Gilead FY2025 results, 10 Feb 2026 |
| Tecartus | Gilead | 344 | — (-15% y/y) | same |
| Carvykti | J&J / Legend Biotech | 1,900 | — | J&J FY2025 reporting |
| Breyanzi | Bristol Myers Squibb | 1,358 | 747 | BMS Q4 2025 8-K Ex-99.1 product table |
| Abecma | Bristol Myers Squibb | 427 | 406 | same |
| **Sum** | | **5,529 → $5.53B** | | |

Not included, and both positive: **Kymriah** (Novartis does not break it out in
its FY2025 top-20 brand table; trade press reported ~$100m in Q1 and ~$125m in
Q2 2025) and **Aucatzyl** (Autolus, approved in the US after the other six).
The sum is therefore a **floor**.

**The finding: $5.53 billion of disclosed FY2025 product revenue exceeds every
published base-year market size.**

| Published base | Disclosed FY2025 revenue as a multiple of it |
|---|---|
| Research and Markets (Dec 2025), $3.87B (2024) | **1.43x** |
| Coherent, $3.99B (2025) | **1.39x** |
| Global Market Insights, $4.3B (2024) | 1.29x |
| Research and Markets (Jul 2025), $4.6B (2024) | 1.20x |

Five products from three companies, reported in audited filings, already sell
more than any of these houses says the whole market is worth. Coherent's figure
is for 2025 itself, so it is not a vintage problem that can be explained by a
stale base year.

That matters compoundingly, not just at the base. A 30.5% CAGR applied to a
base that is 1.29x too low does not produce a forecast that is 1.29x too low;
it produces one that is 1.29x too low *and* then compounds the error. Equally,
the honest consequence of a correct base is a lower rate: Gilead's cell therapy
line **fell 7% in FY2025**, and Yescarta and Tecartus fell 5% and 15%. The
growth is real but it is concentrated in Carvykti and Breyanzi, and it is
partly displacement of Yescarta and Abecma rather than expansion.

Register check: **ClinicalTrials.gov**, intervention search `"chimeric antigen
receptor"`, retrieved 2026-10-16 via the v2 API: **1,278 registered studies.**
Set against seven approved products, that is the clearest available statement
of how much of this field is pipeline rather than revenue.

## What we publish

- **Base:** $5.53B, anchored to FY2025 disclosed product revenue across five
  products and used as the 2026 anchor without an uplift, since 2026 revenue
  is not yet disclosed. Stated as a floor in the methodology.
- **CAGR:** 14.6% — the *lowest* published mainstream rate (Research and
  Markets, July 2025). Chosen deliberately: a correct, higher base paired with
  the highest published rate would compound an optimism we cannot defend, and
  the disclosed data show two of the five products in decline.
- **Forecast:** $12.53B by 2032.
- The report's spine is that disclosed revenue exceeds every published market
  size, and what that does to forecasts built on those sizes.

## Do not publish

- **Vendor market share.** Although five product revenues are disclosed, the
  denominator is not, so a share percentage would be a ratio against our own
  floor. State positions in words.
- **Regional and country splits.** Gilead and BMS disclose US vs ex-US for some
  products, but not consistently across all five, so no comparable regional
  table can be built. `regional_analysis` and `country_analysis` stay `[]`.
- **CD19 = 86.5% of the market.** Coherent publishes this, but against a base
  our arithmetic contradicts; and the disclosed revenue mix (BCMA products
  Carvykti $1.9B + Abecma $0.43B = $2.33B of $5.53B, i.e. 42%) is flatly
  inconsistent with it. Do not repeat the 86.5% figure.
- **Kymriah or Aucatzyl annual totals reconstructed from quarters.** Left out.
- **A manufacturing-capacity or turnaround-time figure.** Widely asserted, not
  publicly registered.

## Sources

1. Gilead Sciences, "Fourth Quarter and Full Year 2025 Financial Results",
   10 February 2026 — Yescarta $1.5B (-5%), Tecartus $344m (-15%), cell therapy
   total $1.8B (-7%).
   https://www.gilead.com/news/news-details/2026/gilead-sciences-announces-fourth-quarter-and-full-year-2025-financial-results
2. Bristol Myers Squibb, Q4 2025 Form 8-K Exhibit 99.1 product revenue table,
   5 February 2026 — Breyanzi $1,358m (2024: $747m), Abecma $427m (2024:
   $406m), total revenue $48,194m.
   https://www.sec.gov/Archives/edgar/data/14272/000001427226000002/a2025q4ex991.htm
3. Johnson & Johnson, Q4 and Full Year 2025 results, 20 January 2026 — Carvykti
   FY2025 $1.9B; oncology sales $25.4B (+22.1%); group $94.2B (+6.0%).
4. Novartis, full-year 2025 results media release, 2026 — Kymriah not broken
   out in the top-20 brand table.
5. Coherent Market Insights, via BioSpace press release, 2025 — $3.99B (2025)
   → $15.06B (2032), 20.9%.
   https://www.biospace.com/press-releases/car-t-cell-therapy-market-projected-to-witness-massive-growth-surging-to-usd-15-06-billion-by-2032-coherent-market-insights
6. Global Market Insights, CAR-T cell therapy market, 2025 — $4.3B (2024) →
   $61.1B (2034), 30.5%.
   https://www.gminsights.com/industry-analysis/car-t-cell-therapy-market
7. Research and Markets, via BusinessWire, 31 July 2025 — $4.6B (2024) →
   $18.1B (2033), 14.6%.
   https://www.businesswire.com/news/home/20250731490264/en
8. Research and Markets, "CAR T Cell Therapy Forecast Report 2025", via
   GlobeNewswire, 1 December 2025 — $3.87B (2024) → $13.25B (2030), 22.77%.
   https://www.globenewswire.com/fr/news-release/2025/12/01/3197149/0/en/CAR-T-Cell-Therapy-Forecast-Report-2025-A-13-25-Billion-Market-by-2030-Driven-by-Rising-Cancer-Incidence-Strong-Efficacy-in-R-R-Patients-and-Growing-R-D-Investment.html
9. Technavio, CAR-T cell therapy market analysis, 2025 — +$3.56B 2024-2029,
   17.3%. https://technavio.com/report/car-t-cell-therapy-market-analysis
10. Meticulous Research, CAR-T cell therapy market, 2025 — $51.6B by 2032,
    43.3%. https://www.meticulousresearch.com/product/car-t-cell-therapy-market-5508
11. ClinicalTrials.gov API v2, `query.intr="chimeric antigen receptor"`,
    totalCount 1,278, retrieved 2026-10-16.

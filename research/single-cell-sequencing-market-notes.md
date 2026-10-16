# Single-Cell Sequencing Market — research notes
**Slug:** single-cell-sequencing-market   **Drafted:** 2026-10-16

## Published estimates (what others say)

| Source | Published | Base year | Base value | Forecast year | Forecast value | CAGR | Scope as stated |
|---|---|---|---|---|---|---|---|
| MarketsandMarkets (report BT 9503) | 30–31 Jul 2025 | 2025 | $1.95B | 2030 | $3.46B | 12.2% | "Single Cell Sequencing Market — Global Forecast to 2030", by product (Reagents & Kits, Platforms, Software), workflow, sequencing type, application, end user |
| Towards Healthcare | last updated 07 Sep 2026 | 2025 | $1.88B (2026: $2.16B) | 2034 | $6.65B | 15.05% (2025–2034) | Single-cell genomic, transcriptomic, epigenomic and multi-omic profiling — **explicitly includes spatial transcriptomics as a technology segment** |
| 360iResearch | — (via search aggregation) | 2025 | $2.83B (2024: $2.49B) | 2030 | $5.45B | 13.94% | Single cell sequencing by product. **Taken from a third-party summary, not the primary page** |
| Lucintel | — | — | — | 2031 | — | 12.2% | Single cell sequencing to 2031 |
| Global Market Insights | — | 2025 | $5.0B | 2034 | $20.0B | 16.7% | **"Single-cell analysis"** — the wider scope: flow cytometry, imaging, cell isolation, as well as sequencing |
| MarketsandMarkets (second report) | — | 2025 | $3.81B | 2030 | $7.56B | 14.7% | **"Single-cell analysis"** — same house, wider scope, nearly 2x its own sequencing figure |
| Fortune Business Insights | — | 2026 | $4.48B | 2034 | $12.58B | 13.79% | Single-cell analysis |
| 360iResearch (analysis scope) | — | 2026 | $5.34B | 2032 | $12.32B | 14.86% | Single-cell analysis |
| Value Market Research | — | 2025 | $6.73B | 2034 | $32.15B | — | Single-cell analysis. Highest base and highest endpoint in the set |
| Verified Market Reports | — | — | — | 2033 | $5.4B | 9.5% | Single-cell analysis. Endpoint below several houses' 2026 bases |

## The spread

**Within the sequencing scope the houses actually agree reasonably well: $1.88B to $2.83B at 2025, a 1.51x spread.** That is unusually tight for this corpus.

**The spread appears the moment you cross from "sequencing" to "analysis": $1.88B to $6.73B at 2025, a 3.58x spread.** MarketsandMarkets publishes both scopes and its own two figures are 1.95x apart ($1.95B vs $3.81B) in the same base year, which is the clearest available statement that this is a definitional gap and not a disagreement about the market. The wider scope adds flow cytometry, cell sorting and imaging instruments — a mature instrument base that has nothing to do with sequencing chemistry.

A second, subtler definitional problem runs the other way. Towards Healthcare lists **spatial transcriptomics inside its single-cell sequencing technology segmentation.** Spatial is separately forecast by other houses as its own $0.4–1.5B market (see `research/spatial-biology-market-notes.md`). Anyone adding a published single-cell number to a published spatial number is at risk of double-counting, and no house states whether it has excluded the other.

Published CAGRs are the tighter dimension: 9.5% to 16.7%, with the sequencing-scope houses clustered at 12.2–15.05%.

## Grounding arithmetic

**Register used:** 10x Genomics, Inc., Form 8-K Exhibit 99.1, preliminary unaudited fourth-quarter and full-year 2025 revenue, released 11 January 2026. 10x reports Single Cell and Spatial separately, and consumables separately from instruments, which is exactly the disclosure this calculation needs.

10x Genomics, FY2025, Single Cell only:

```
Single Cell consumables      $363.2M   (down 2% year-over-year)
Single Cell instruments       $22.7M   (down 36% year-over-year)
----------------------------------------------------------------
Single Cell revenue          $385.9M
```

(Company totals for context: consumables $507.2M, instruments $56.8M, services and
license/royalty $34.8M; total revenue ~$642.8M including $44.1M of patent-litigation
settlement receipts, or ~$598.7M excluding them, down 2% on the prior year.
Spatial is handled in the spatial-biology notes.)

Set the Single Cell figure against the published 2025 market sizes:

| Published 2025 figure | 10x Single Cell $385.9M as a share |
|---|---|
| Towards Healthcare $1.88B | **20.5%** |
| MarketsandMarkets (sequencing) $1.95B | **19.8%** |
| 360iResearch $2.83B | 13.6% |
| MarketsandMarkets (analysis) $3.81B | 10.1% |
| Global Market Insights (analysis) $5.0B | 7.7% |

**One vendor is a fifth of the sequencing-scope market.** That is our own arithmetic — two
disclosed line items divided by a published total — and it is reported as arithmetic, not
as a share estimate. 10x does not publish a market share and we do not assign one.

### What that does to the forecast

The 19.8% figure is the useful part, because it lets the published growth rate be tested
against a disclosed run-rate rather than against itself.

MarketsandMarkets' 12.2% rate on its own $1.95B base requires the market to add
**$1.51B between 2025 and 2030** — roughly **3.9x 10x Genomics' entire FY2025 Single Cell
revenue**, added in five years.

In the same year, 10x's Single Cell consumables revenue **fell 2%** and its Single Cell
instrument revenue **fell 36%**. If the category leader is flat-to-down and holds a fifth of
the market, a 12.2% whole-market rate requires the remaining ~80% to compound at roughly
**16% a year** — a field made up largely of private, pre-revenue or materially smaller
platforms (Parse Biosciences, Scale Biosciences, Singleron, Fluent BioSciences, Mission Bio),
plus BD's Rhapsody line, which BD does not break out.

That is not impossible. Instrument revenue is capital spend and is the first line to be cut
when academic and biopharma budgets tighten; consumables pull-through on an installed base of
instruments can keep growing after instrument sales stall, which is the pattern 10x's own
split shows (consumables +3% company-wide while instruments -39%). But it is a forecast about
*recovery in research funding*, not an extrapolation of a disclosed run-rate, and no published
series says so.

**Secondary context, not arithmetic:** PubMed returns **31,041** records for the phrase
`"single-cell RNA sequencing"` (retrieved 16 October 2026). This establishes the method is
pervasive in the literature; it does not divide into any market figure, because publication
counts are cumulative and a paper is not a purchase. Recorded as scale, not as a denominator.

**This is a plausibility and run-rate test, not a market estimate.** It establishes that the
sequencing-scope published totals are consistent with a market in which one disclosed vendor
holds about a fifth, and that the published growth rates are premised on a funding recovery
rather than on current momentum. It does not establish the correct market size, and
$385.9M ÷ a published total is a ratio against someone else's denominator.

## What we publish

**Headline: $2.19B (2026) → $4.37B (2032) at 12.2%.**

Source: MarketsandMarkets report BT 9503, published 30–31 July 2025, which states $1.95B for
2025, $3.46B for 2030 and a 12.2% CAGR. The 2026 base is **derived by advancing that house's
own published 2025 figure one year at that house's own stated rate** (1.95 × 1.122 = 2.19), and
the 2032 endpoint by continuing the same rate (2.19 × 1.122^6 = 4.37). Both are labelled as
interpolation in the report, not presented as separately published observations. The modelled
2030 point of the series, $3.47B, lands within 0.3% of MarketsandMarkets' own published 2030
figure of $3.46B, which is the internal check that the interpolation is faithful.

Chosen because: (a) it is the narrower, sequencing-only scope, which is the market the slug
names; (b) it carries the **lowest** CAGR in the sequencing cluster, and the grounding
arithmetic above shows the published rates are already ahead of the category leader's
run-rate; and (c) it is independently corroborated — Towards Healthcare publishes its own
2026 figure of **$2.16B**, 1.4% away from our derived $2.19B, from a different house and a
different base year.

Unit: USD Billion. Industry: Life Sciences.

## Do not publish

- **Vendor market share.** 10x's $385.9M ÷ a published total is our arithmetic against
  somebody else's denominator, and the denominators are 1.51x apart within scope and 3.58x
  apart across scopes. The number is stated in prose with both inputs named.
  `competitive_landscape[].market_share` is omitted entirely.
- **Regional splits.** MarketsandMarkets names North America as the leading region for 2024
  and Towards Healthcare lists five regions with country breakdowns, but neither publishes a
  percentage in the public page text. `regional_analysis` stays `[]`.
- **Country splits.** No named source gives any. `country_analysis` stays `[]`.
- **Segment shares.** MarketsandMarkets names pre-sequencing consumables and RNA sequencing as
  the 2024 leading segments but publishes no percentage. Segmentation goes out as plain
  strings.
- **The "single-cell analysis" figures as our headline.** $3.81–6.73B is a different market.
  Reported as the scope disagreement, never as our number.
- **BD Biosciences', Parse's, Scale's or Singleron's revenue.** Not disclosed, not
  estimable. The 80%-growing-at-16% inference above is stated as a requirement of the
  published forecast, not as a measurement of those companies.
- **Total global single-cell library or test volume.** Nobody publishes it. 10x does not
  disclose kit units, only revenue.
- **Any figure drawn from the 360iResearch listing.** It survives in the estimates table
  flagged as a third-party summary and is used for nothing else.

## Sources

1. 10x Genomics, Inc., Form 8-K Exhibit 99.1, preliminary unaudited Q4 and FY2025 revenue
   results, 11 January 2026 — Single Cell consumables $363.2M (-2%), Single Cell instruments
   $22.7M (-36%), Spatial consumables $144.0M (+19%), Spatial instruments $34.1M (-41%),
   total consumables $507.2M (+3%), total instruments $56.8M (-39%), services and
   license/royalty $34.8M (+41%), total revenue ~$642.8M including $44.1M of patent-litigation
   settlements received in Q1 and Q2 2025 (~$598.7M excluding, -2%).
   https://www.sec.gov/Archives/edgar/data/1770787/000162828026001808/ex-991_2026x01x11.htm
2. MarketsandMarkets, "Single Cell Sequencing Market — Global Forecast to 2030", report
   BT 9503, published 30–31 July 2025 — $1.95B (2025) → $3.46B (2030), 12.2%.
   https://www.marketsandmarkets.com/PressReleases/single-cell-sequencing.asp
3. Towards Healthcare, "Single Cell Sequencing Market Sizing", last updated 07 September
   2026 — $1.88B (2025), $2.16B (2026), $6.65B (2034), 15.05%. Note: the page's header cites
   2025–2035 while its body cites 2025–2034; the end year is internally inconsistent.
   https://www.towardshealthcare.com/insights/single-cell-sequencing-market-sizing
4. Global Market Insights, single-cell analysis market — $5.0B (2025) → $20.0B (2034), 16.7%.
   https://www.gminsights.com/industry-analysis/single-cell-analysis-market
5. Lucintel, "Single Cell Sequencing Market Report: Trends, Forecast and Competitive Analysis
   to 2031" — 12.2% CAGR. https://lucintel.com/single-cell-sequencing-market.aspx
6. Verified Market Reports, via PR Newswire, "Single-cell Analysis Market Surges to USD 5.4
   Billion by 2033, Propelled by 9.5% CAGR".
   https://prnewswire.co.uk/news-releases/single-cell-analysis-market-surges-to-usd-5-4-billion-by-2033--propelled-by-9-5-cagr---verified-market-reports-302413097.html
7. Fortune Business Insights, single-cell analysis market (report 105462) — $4.48B (2026) →
   $12.58B (2034), 13.79%.
   https://www.fortunebusinessinsights.com/markt-f-r-einzelzellanalysen-105462
8. PubMed (NCBI E-utilities esearch, db=pubmed), term `"single-cell RNA sequencing"`,
   retrieved 16 October 2026: **31,041** records.
   https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=%22single-cell+RNA+sequencing%22&rettype=count
9. Illumina, Inc., fourth-quarter and fiscal-year 2025 results, 5 February 2026 — FY2025
   revenue $4.34B (flat), Q4 sequencing consumables $755M (+8%), Greater China $55M in Q4,
   FY2026 guidance $4.5–4.6B.
   https://investor.illumina.com/news-releases/news-release-details/illumina-reports-financial-results-fourth-quarter-and-fiscal
10. Standard BioTools Inc., Form 8-K Exhibit 99.1, Q4 and FY2025 results, 24 February 2026 —
    FY2025 continuing-operations revenue $85.3M; combined-company revenue including SomaLogic
    ~$185M; SomaLogic sale to Illumina closed 30 January 2026.
    https://www.sec.gov/Archives/edgar/data/1162194/000119312526067026/lab-ex99_1.htm
11. Association for Molecular Pathology v. FDA — U.S. District Judge Sean D. Jordan vacated
    FDA's laboratory-developed tests final rule in its entirety, 31 March 2025; FDA did not
    appeal within the 60-day window, so CLIA oversight by CMS remains the operative regime.
    https://www.thefdalawblog.com/2025/04/federal-district-court-vacates-fdas-laboratory-developed-tests-final-rule/

# Liquid Biopsy Market — research notes
**Slug:** liquid-biopsy-market   **Drafted:** 2026-10-16

## Published estimates (what others say)

| Source | Published | Base year | Base value | Forecast year | Forecast value | CAGR | Scope as stated |
|---|---|---|---|---|---|---|---|
| Precedence Research | 2025 (press release, biospace) | 2025 | $7.05B (2024: $6.17B) | 2034 | $22.69B | 13.91% (2025–2034) | "Global liquid biopsy market". Reports North America 45.59% of 2024 and blood-based tests 67.59% |
| Fortune Business Insights | 2025/2026 edition | 2025 | $11.66B (2026: $14.23B) | 2034 | $106.49B | 28.61% | Global liquid biopsy; reports North America 54.57% of 2025. Highest published rate in the set |
| MarketsandMarkets | — (company report page) | 2024 | $6.4B | 2029 | $11.3B | 11.9% | Global liquid biopsy |
| Towards Healthcare | — | 2024 | $2.21B | 2034 | $8.72B | 14.79% | "Liquid biopsy **IVD**" — explicitly the in-vitro-diagnostic product scope only |
| Fortune Business Insights (earlier edition) | — | 2024 | $9.63B | 2032 | $58.64B | 25.9% (2025–2032) | Global liquid biopsy. Conflicts with the same house's 2034 series above |
| Spherical Insights & Consulting | 2023-11-15 (GlobeNewswire) | 2022 | $8.50B | 2032 | $25.24B | 11.5% (2022–2032) | Global liquid biopsy |
| SkyQuest Technology | 2024 (PR Newswire) | — | — | 2031 | $24.14B | 11.21% (2024–2031) | Global liquid biopsy |
| Data Bridge Market Research | — | — | — | 2031 | $8.0B | 16.8% | Global liquid biopsy. Endpoint inconsistent with the others |
| IMARC (not comparable) | — | — | — | 2032 | $497.2M | 15.5% | **Breast cancer liquid biopsy only.** Recorded to show how narrow a sub-scope looks |

## The spread

On the four houses that publish a **2024** base year the figures are $2.21B, $6.17B,
$6.4B and $9.63B — a **4.36x spread** at the same base year. Restricting to 2025,
Precedence's $7.05B against Fortune Business Insights' $11.66B is 1.65x.

Unlike the oncology information systems case, **the growth rates also diverge
badly**: published CAGRs run 9.0%–28.61%, a **2.55x spread** (11.21% to 28.61%
among the houses with a full series). So this market has two disagreements, not
one, and they have different causes:

1. **The base-year spread is scope.** Towards Healthcare labels its $2.21B as
   "liquid biopsy IVD" — kits, assays and instruments. The houses near $7–11B
   are counting laboratory service revenue (an LDT run in a CLIA lab is a
   service, not an IVD product), which is where essentially all of the actual
   money is. Guardant Health alone booked $982.0M of revenue in FY2025; a $2.21B
   whole-market figure cannot be counting that.
2. **The CAGR spread is which market is being forecast.** The low-rate houses
   (11.2–13.9%) are forecasting *therapy selection* — genotyping advanced solid
   tumours to pick a targeted drug, a reimbursed activity that exists today. The
   high-rate houses (25.9–28.61%) are forecasting *multi-cancer early detection
   screening of asymptomatic people*, which barely exists as a reimbursed
   activity. These are not the same market growing at different speeds; they are
   two markets, one of which is a bet.

## Grounding arithmetic

**Register used:** Guardant Health's disclosed FY2025 test volumes and revenue
(fourth-quarter and full-year 2025 results, 19 February 2026; Form 10-K for
FY2025), cross-checked against GLOBOCAN 2022 global cancer incidence (IARC, via
*CA: A Cancer Journal for Clinicians*, 2024).

Guardant's own disclosed average selling price, therapy-selection testing:

```
$683.6M oncology revenue / ~276,000 oncology tests = $2,477 per test
```

Guardant's own disclosed average selling price, screening (Shield):

```
$79.7M screening revenue / ~87,000 Shield tests = $916 per test
```

($916 is consistent with the $920 Medicare rate for Shield effective
1 August 2024; Shield later moved to $1,495 under ADLT status. Guardant360's
Medicare rate for CLFS code 0326U was $5,000 effective 1 January 2024, so
$2,477 is a blended realised figure well below list.)

Now divide the published market sizes by the therapy-selection ASP to get the
implied annual test volume:

| Published figure | ÷ $2,477 | Implied tests per year |
|---|---|---|
| Precedence, $7.05B (2025) | 7,050,000,000 / 2,477 | **2.85 million** |
| Fortune Business Insights, $11.66B (2025) | 11,660,000,000 / 2,477 | **4.71 million** |
| Fortune Business Insights, $106.49B (2034) | 106,490,000,000 / 2,477 | **43.0 million** |

GLOBOCAN 2022 puts total new cancer cases worldwide at close to **20 million per
year** (including non-melanoma skin cancers).

- 2.85 million tests is **14% of annual global cancer incidence** — plausible for
  genotyping advanced solid tumours in high-income health systems, and arguably
  conservative.
- 43.0 million tests is **2.15x the entire annual global incidence of cancer**.
  You cannot run 2.15 liquid biopsies per newly diagnosed cancer patient per year
  and call it therapy selection. **The $106.49B figure necessarily assumes
  population screening of asymptomatic people.**

The screening ASP makes the point sharper still, because screening tests are
cheaper:

```
$106,490,000,000 / $916 = 116.3 million screening tests per year
```

116 million tests a year is far more than the whole screening-eligible
population of the United States and the European Union combined. The high
forecast is a bet on universal multi-cancer early detection, priced as if
reimbursement already existed.

**This is a plausibility test, not a market estimate.** It establishes that the
high and low published figures are describing different activities. It does not
establish what the correct market size is, and the per-test divisor is one
company's realised ASP, not an industry average.

## What we publish

**Headline:** $8.03B (2026) → $17.54B (2032) at 13.91%.

Source: Precedence Research, which publishes $7.05B for 2025 and a stated 13.91%
CAGR over 2025–2034. The 2026 base is **derived by advancing Precedence's own
published 2025 figure one year at Precedence's own stated rate**
(7.05 × 1.1391 = 8.03) and the 2032 endpoint by continuing that rate
(8.03 × 1.1391^6 = 17.54). This is labelled as interpolation on the page, not
presented as a separately published observation.

Chosen because: (a) it is the most recently based series with an explicit
base-year value and an explicit rate; (b) its rate sits in the therapy-selection
cluster, which is the market that actually exists and is reimbursed today; and
(c) it passes the per-test plausibility test, where the 25–28% series do not.

Unit: USD Billion. Industry: Life Sciences.

## Do not publish

- **Vendor market share.** Not disclosed by any vendor and not published by any
  named source for this category. `competitive_landscape[].market_share` omitted
  entirely. Position described in words only.
- **Regional splits.** Precedence states North America at 45.59% of 2024 and
  Fortune Business Insights states North America at 54.57% of 2025 — two houses,
  nine points apart, on different base years, with no methodology visible. That
  is not a regional analysis, it is two incompatible assertions.
  `regional_analysis` stays `[]`.
- **Country splits.** No named source gives any. `country_analysis` stays `[]`.
- **Segment shares.** Precedence's "blood-based tests 67.59%" is a single
  unexplained figure from a press release. Segmentation published as plain
  strings, no percentages.
- **The 28.61% CAGR as a headline.** It fails the arithmetic above. It is
  reported in the notes and in the report as a disagreement, never as our number.
- **Any claim about Guardant's or Roche's share of liquid biopsy.** Guardant
  reports 25 companion-diagnostic indications, but that is a count of
  indications, not of revenue or share, and the figure is company-stated.
- **Total global liquid biopsy test volume.** Nobody publishes it. The 2.85
  million figure above is our own division, labelled as such, and is not offered
  as a measurement.

## Sources

1. Precedence Research, "Liquid Biopsy Market Size to Surpass USD 22.69 Billion by 2034", via BioSpace, 2025 — https://www.biospace.com/press-releases/liquid-biopsy-market-size-to-surpass-usd-22-69-billion-by-2034-driven-by-early-cancer-detection-and-precision-diagnostics
2. Fortune Business Insights, liquid biopsy market (report 102506), 2025/2026 edition — https://www.fortunebusinessinsights.com/liquid-biopsy-market-102506
3. MarketsandMarkets, "Liquid Biopsy Market" size and share — https://www.marketsandmarkets.com/ResearchInsight/liquid-biopsy-market-size-and-share.amp
4. Towards Healthcare, "Liquid Biopsy IVD Market Sizing" — https://www.towardshealthcare.com/table-of-content/liquid-biopsy-ivd-market-sizing
5. Spherical Insights & Consulting, "Global Liquid Biopsy Market Size To Worth USD 25.24 Billion By 2032", GlobeNewswire, 15 November 2023 — https://www.globenewswire.com/news-release/2023/11/15/2780820/0/en/Global-Liquid-Biopsy-Market-Size-To-Worth-USD-25-24-Billion-By-2032-CAGR-of-11-5.html
6. SkyQuest Technology, "Liquid Biopsy Market Rising Adoption To Propel 11.21% CAGR By 2031", PR Newswire, 2024 — https://prnewswire.co.uk/news-releases/liquid-biopsy-market-rising-adoption-to-propel-11-21-cagr-by-2031--skyquest-technology-302210938.html
7. Guardant Health, "Reports Fourth Quarter and Full Year 2025 Financial Results and Provides 2026 Outlook", 19 February 2026 — https://www.businesswire.com/news/home/20260219448137/en
8. Guardant Health, Form 10-K for FY2025 (SEC EDGAR, CIK 1576280) — https://www.sec.gov/Archives/edgar/data/1576280/000157628026000013/gh-20251231.htm
9. Bray F. et al., "Global cancer statistics 2022: GLOBOCAN estimates of incidence and mortality worldwide for 36 cancers in 185 countries", *CA Cancer J Clin*, 2024 — https://pubmed.ncbi.nlm.nih.gov/38572751/
10. UICC, "GLOBOCAN 2022: latest global cancer data shows rising incidence and stark inequities" — https://www.uicc.org/news/globocan-2022-latest-global-cancer-data-shows-rising-incidence-and-stark-inequities
11. FDA approval of Guardant360 CDx (first FDA-approved liquid biopsy companion diagnostic), 7 August 2020 — FierceBiotech coverage: https://www.fiercebiotech.com/medtech/fda-approves-guardant-s-next-gen-tumor-sequencing-blood-test
12. FDA approval of FoundationOne Liquid CDx, 26 August 2020 — https://medcitynews.com/tag/foundationone-liquid-cdx/
13. Guardant Health / Boehringer Ingelheim, Guardant360 CDx approved as companion diagnostic for HERNEXEOS (zongertinib) in HER2-mutant advanced NSCLC, June 2026 — https://www.businesswire.com/news/home/20260610919127/en/
14. Abbott, "Reports Fourth-Quarter and Full-Year 2025 Results; Issues 2026 Financial Outlook", 22 January 2026 (agreement to acquire Exact Sciences, expected close Q2 2026) — https://abbott.mediaroom.com/2026-01-22-Abbott-Reports-Fourth-Quarter-and-Full-Year-2025-Results-Issues-2026-Financial-Outlook
15. CMS Clinical Laboratory Fee Schedule — Guardant360 LDT at $5,000 for code 0326U effective 1 January 2024; Shield at $920 effective 1 August 2024, subsequently $1,495 under ADLT status (reported by 360Dx / GenomeWeb and Guardant quarterly releases) — https://www.360dx.com/node/100221
16. ClinicalTrials.gov API v2, `query.term="liquid biopsy"`, retrieved 16 October 2026: **860** registered studies, against 607,160 studies in the register — https://clinicaltrials.gov/api/v2/studies?query.term=%22liquid+biopsy%22&countTotal=true

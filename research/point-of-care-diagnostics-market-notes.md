# Point-of-Care Diagnostics Market — research notes
**Slug:** point-of-care-diagnostics-market   **Drafted:** 2026-10-16

## Published estimates (what others say)

| Source | Published | Base year | Base value | Forecast year | Forecast value | CAGR | Scope as stated |
|---|---|---|---|---|---|---|---|
| Fortune Business Insights | 2025 edition | 2025 | $32.87B | 2034 | $60.43B | 7.00% (implied) | Scope **stated**: blood glucose monitoring, infectious disease, cardiometabolic, pregnancy and fertility, haematology testing |
| Fortune Business Insights | earlier edition | 2023 | $30.87B | 2032 | $51.19B | 6.2% | Same house, same category, earlier vintage |
| IMARC Group | 2025 | 2024 | $53.1B | — | — | — | Global point-of-care diagnostics |
| Knowledge Sourcing Intelligence | 2025 | 2025 | $36.7B | 2030 | — | — | "Point of Care Diagnostic Market — Forecasts from 2025 to 2030" |
| Grand View Research | 2022 edition | — | — | 2030 | $68.59B | 6.8% (2022–2030) | Global point-of-care diagnostics |
| Precedence Research | — | 2021 | $36.0B | 2029 | $83.64B | — | Product categories **include blood glucose monitoring** |
| Meticulous Research | — | — | — | 2030 | $43.1B | 5.1% (2023–2030) | Global point-of-care diagnostics |
| Credence Research | — | 2025 | **$4.81B** | 2032 | $7.43B | 6.4% (2025–2032) | Titled "point of care diagnostics or testing market". Two orders of magnitude below the rest — behaves like a sub-segment definition |
| Spherical Insights (not comparable) | 2023-11-06 | — | — | 2032 | $11.84B | 5.2% | **Point-of-care molecular diagnostics only.** Recorded to show what a named sub-scope looks like |
| Global Market Insights (not comparable) | — | — | — | — | — | — | POC molecular diagnostics sub-scope |

## The spread

This is the widest spread in the batch and the clearest case of a definition
problem rather than a forecasting disagreement.

- **Base-year values, same or adjacent year: $4.81B (Credence, 2025) to $53.1B
  (IMARC, 2024) — an 11.0x spread.** Restricting strictly to 2025: $4.81B against
  $36.7B is **7.63x**.
- **Published CAGRs: 5.1% to 7.00% — a 1.37x spread.**

Everyone agrees this market grows in the mid single digits. They disagree by up
to eleven times about what it is. This is the oncology-information-systems
pattern in a more extreme form, and the scope decision is identifiable rather
than mysterious: **two of the large houses state in their own scope definitions
that they include blood glucose monitoring.** Fortune Business Insights lists
blood glucose monitoring, pregnancy and fertility testing among its product
categories; Precedence Research does the same. Self-monitoring of blood glucose
and home pregnancy tests are consumer purchases made outside any clinical
testing site. Including them roughly multiplies the market; excluding them
roughly divides it.

## Grounding arithmetic

**Register used:** the CMS CLIA database, as published by the Division of
Clinical Laboratory Improvement and Quality, Centers for Medicare & Medicaid
Services, **September 2026** (`laboratory-statistics.pdf`). This is the only
complete, countable, government-maintained census of point-of-care-grade testing
sites anywhere.

| CMS CLIA category, September 2026 | Number of labs | of which physician office labs |
|---|---|---|
| Laboratories registered (exempt + non-exempt) | 301,284 | 116,814 |
| Laboratories registered (non-exempt only) | 285,940 | 114,313 |
| **Certificate of Waiver** | **233,448** | 84,829 |
| **Provider-Performed Microscopy (PPM)** | **21,736** | 16,123 |
| Certificate of Compliance | 15,214 | 9,104 |
| Certificate of Accreditation | 15,542 | 4,257 |

A Certificate of Waiver permits a site to perform **only waived tests** — the
regulatory definition in the United States of testing simple enough to be done
at the point of care. Waiver plus PPM is therefore the correct denominator:

```
233,448 + 21,736 = 255,184 US sites whose certificate permits only
                   point-of-care-grade testing
```

### Test 1 — the high estimates

```
$53,100,000,000 (IMARC, 2024, global)  /  255,184 US waived + PPM sites
= $208,087 per site per year
```

Note what this calculation does: it puts a **global** numerator over a
**US-only** denominator. The true global per-site figure is therefore *lower*
than $208,087, because the rest of the world adds sites without being counted
here. $208,087 a year is roughly **$570 of testing every single day** at a site
that typically runs a handful of strep A, influenza, urinalysis, HbA1c and
glucose tests.

**This rules out a professional-site-only reading of the high estimates.** They
cannot be describing waived testing performed at clinical sites. They must be
including self-monitoring of blood glucose consumables and home test kits bought
by patients, entirely outside the CLIA system — which is exactly what Fortune
Business Insights and Precedence Research say their scope includes.

### Test 2 — the low estimate

Abbott's FY2025 Diagnostics segment net sales were **$8,937 million**
(Form 10-K FY2025; fourth-quarter and full-year results, 22 January 2026), of
which $3,535 million US and $5,402 million international. Abbott's rapid and
near-patient lines (ID NOW, BinaxNOW, i-STAT, Afinion, Panbio) are a **subset**
of that segment.

```
$8,937M (one vendor's whole diagnostics segment)
/ $4,810M (Credence Research's entire global market)
= 1.86x
```

**One company's diagnostics segment is 1.86 times the whole market as Credence
Research sizes it.** A $4.81B figure cannot be whole-market point-of-care
diagnostics. It is coherent only as a narrow sub-segment, and should be treated
the way the explicitly labelled molecular sub-scope figures ($11.84B by 2032,
Spherical Insights) are treated.

### Both tests together

The two tests bracket the honest answer. A whole-market figure must be large
enough that Abbott's rapid-diagnostics subset is a plausible fraction of it, and
small enough that the implied per-site spend at 255,184 US waived sites is not
absurd. The Fortune Business Insights series — $32.87B for 2025 — sits inside
that bracket and, uniquely in this set, **states its own scope**.

**These are plausibility tests, not market estimates.** They establish which
published figures cannot mean what their titles say. They do not establish the
correct size.

## What we publish

**Headline:** $35.17B (2026) → $52.78B (2032) at 7.00%.

Source: Fortune Business Insights, 2025 edition, which publishes $32.87B for
2025 and $60.43B for 2034. Those two endpoints imply exactly 7.00% compound
((60.43/32.87)^(1/9) − 1 = 7.00%). The 2026 base is the published 2025 value
advanced one year at that implied rate (32.87 × 1.07 = 35.17); the 2032 endpoint
continues it (35.17 × 1.07^6 = 52.78).

Chosen because it is the only series in the set that **states what it counts**,
it has an explicit base-year value and an explicit far endpoint, and it survives
both grounding tests. Scope caveat carried onto the page: it includes blood
glucose monitoring and pregnancy/fertility testing.

Unit: USD Billion. Industry: Medical Devices.

## Do not publish

- **Vendor market share.** Abbott, Roche, Siemens Healthineers, Danaher/Cepheid
  and bioMérieux do not disclose point-of-care-specific revenue. Abbott's
  segment figure is a whole-diagnostics number and must not be used as a POC
  share numerator. `competitive_landscape[].market_share` omitted.
- **Regional splits.** No named source gives a defensible one.
  `regional_analysis` stays `[]`.
- **Country splits.** None published. `country_analysis` stays `[]`.
- **A US-only market size.** Tempting given the CLIA register, but no named
  source publishes one for this scope and we are not going to derive one by
  apportioning a global figure.
- **Any per-site spend figure presented as a measurement.** The $208,087 above
  is a deliberately mismatched global/US ratio used as an upper bound. It must be
  labelled as such everywhere it appears.
- **Blood glucose monitoring as a share of the market.** Several houses include
  it; none quantifies it. Stating a percentage would be invention.
- **The Credence $4.81B figure as a comparable whole-market estimate.** Recorded
  as the low bound of the published spread, explained, never averaged in.

## Sources

1. Centers for Medicare & Medicaid Services, Division of Clinical Laboratory Improvement and Quality, "Laboratory Statistics", September 2026 — https://www.cms.gov/files/document/laboratory-statistics.pdf (301,284 labs registered; 233,448 Certificate of Waiver; 21,736 PPM; 15,214 Compliance; 15,542 Accreditation; 116,814 physician office laboratories)
2. CMS, CLIA historical laboratory numbers 1993–2021 — https://cms.gov/Regulations-and-Guidance/Legislation/CLIA/Downloads/2021-1993_Historical_Numbers.pdf (peak of 323,086 labs in 2021)
3. CMS, Provider of Services File: Clinical Laboratories — https://data.cms.gov/provider-characteristics/hospitals-and-other-facilities/provider-of-services-file-clinical-laboratories
4. Abbott Laboratories, "Reports Fourth-Quarter and Full-Year 2025 Results; Issues 2026 Financial Outlook", 22 January 2026 — https://abbott.mediaroom.com/2026-01-22-Abbott-Reports-Fourth-Quarter-and-Full-Year-2025-Results-Issues-2026-Financial-Outlook (Diagnostics $8,937M FY2025; US $3,535M; international $5,402M; reported −4.3%, organic −4.5%)
5. Abbott Laboratories, Form 10-K for FY2025, SEC EDGAR CIK 1800 — https://www.sec.gov/Archives/edgar/data/1800/000162828026010185/abt-20251231.htm
6. Fortune Business Insights, point-of-care diagnostics market, 2025 edition ($32.87B 2025 → $60.43B 2034; scope includes blood glucose monitoring, infectious disease, cardiometabolic, pregnancy and fertility, haematology) — https://www.fortunebusinessinsights.com/point-of-care-diagnostics-market
7. IMARC Group, point-of-care diagnostics market ($53.1B, 2024) — https://imarcgroup.com/point-of-care-diagnostics-market
8. Grand View Research, point-of-care diagnostics market ($68.59B by 2030, 6.8% CAGR 2022–2030) — https://synapse.patsnap.com/news-detail/c3986c48-ba64-33be-a67e-1972fd2dcc32-point-of-care-diagnostics-market-to-be-worth-6859-billion-by-2030-grand-view-research-inc
9. Precedence Research, "Point of Care Diagnostics Market Size to Worth US$ 83.64 BN by 2029" ($36.0B in 2021; includes blood glucose monitoring) — https://www.biospace.com/point-of-care-diagnostics-market-size-to-worth-us-83-64-bn-by-2029
10. Meticulous Research, point-of-care diagnostics market 2030 ($43.1B by 2030, 5.1% CAGR 2023–2030) — https://www.meticulousresearch.com/index.php/pressrelease/299/point-of-care-diagnostics-market-2030
11. Credence Research, point-of-care diagnostics/testing market ($4.81B 2025 → $7.43B 2032, 6.4%) — https://www.credenceresearch.com/report/point-of-care-diagnostics-or-testing-market
12. Knowledge Sourcing Intelligence, "Point of Care Diagnostic Market — Forecasts from 2025 to 2030" ($36.7B, 2025) — https://m.giikorea.co.kr/report/ksi1775321-point-care-diagnostic-market-forecasts-from.html
13. Spherical Insights, "Global Point-of-Care Molecular Diagnostics Market Size To Worth USD 11.84 Billion By 2032", GlobeNewswire, 6 November 2023 — https://www.globenewswire.com/news-release/2023/11/06/2774150/0/en/Global-Point-of-Care-Molecular-Diagnostics-Market-Size-To-Worth-USD-11-84-Billion-By-2032-CAGR-of-5-2.html
14. CDC, "Good Laboratory Practices for Waived Testing Sites", MMWR Recommendations and Reports 54(RR-13), 2005 — https://www.cdc.gov/mmwr/preview/mmwrhtml/rr5413a1.htm (historical baseline: 105,138 waived-only sites of ~180,000)
15. Gaur R. et al., "Increases in CLIA-Waived Testing Sites Since the Start of the COVID-19 Pandemic", *Laboratory Medicine* 54(2):126, 2023 — https://academic.oup.com/labmed/article/54/2/126/6987228
16. Federal Register, "Clinical Laboratory Improvement Amendments of 1988 (CLIA) Fees; Histocompatibility, Personnel, and Alternative Sanctions for Certificate of Waiver Laboratories", 28 December 2023 — https://www.federalregister.gov/documents/2023/12/28/2023-28170/clinical-laboratory-improvement-amendments-of-1988-clia-fees-histocompatibility-personnel-and
17. ClinicalTrials.gov API v2, `query.term="point-of-care"`, retrieved 16 October 2026: **2,705** registered studies, against 607,160 studies in the register — https://clinicaltrials.gov/api/v2/studies?query.term=%22point-of-care%22&countTotal=true

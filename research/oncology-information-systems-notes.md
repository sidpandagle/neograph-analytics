# Research notes — Oncology Information Systems Market

Gathered 2026-10-15. Working notes for a planned report. **Nothing here is
published until every figure is attributed to its source on the page.**

## Why this topic

Search Console (90 days to 2026-10-15): `oncology information systems market`
drew 40 impressions and 0 clicks; the corpus has no dedicated report. It is a
small term, but it sits in the oncology cluster alongside the existing
`ai-in-oncology-market` and the new `ai-in-cancer-diagnostics-market`, so the
internal linking has somewhere to go.

## Published market estimates

| Source | Base | Forecast 2032 | CAGR | Notes |
|---|---|---|---|---|
| Research and Markets / 360iResearch | $8.49B (2026) | $13.42B | 7.84% | $7.91B in 2025 |
| Zion Market Research | $8.23B (2023) | $15.78B | ~7.5% | high end |
| Strategic Market Research | $3.60B (2025) | $6.4B | 8.5% | |
| Global Market Insights | $3.10B (2022) | $6.6B | 7.9% | |
| Credence Research | — | $6.16B | 7.44% | CAGR over 2024–2032 |
| SNS Insider | — | $6.1B | 7.84% | CAGR over 2024–2032 |
| Dimension Market Research | — | $5.7B | 8.2% | |
| GII Research | — | $5.70B | 6.67% | |

## The analytical point: they agree about growth and disagree about the market

Measured across the four sources that publish a base-year size:

- **Base-year size spreads 2.74x** ($3.10B to $8.49B)
- **CAGR spreads 1.27x** (6.67% to 8.5%)

Everyone is modelling the same underlying driver and arriving at much the same
growth rate. The 2032 endpoints range from $5.7B to $15.78B almost entirely
because the starting points differ, not because anyone disagrees about how fast
the market grows. **A report whose headline is a single 2032 number is
reporting the analyst's scope decision, not a finding about the market.**

## Bottoms-up test — what the headline numbers imply per site

Denominator, from public registers rather than vendor claims:

- **~8,700** radiotherapy centres worldwide — IAEA DIRAC, 2025. The DIRAC
  homepage lists "8,500+"; the IAEA news item says "nearly 8,700".
- **8,925** centres with verified coordinates in a 2025 *Radiotherapy and
  Oncology* geospatial analysis, filtered from 9,061 DIRAC records as of
  November 2024. The two agree closely, which is reassuring.
- **3,145** US radiation oncology practice sites in 2025, from a CMS-based
  study ASTRO publicised. Down from 3,214–3,338 across 2018–2023.

Dividing the published base-year sizes by ~8,700 centres:

| Source | Base | Implied per centre, per year |
|---|---|---|
| Research and Markets | $8.49B (2026) | **$975,862** |
| Zion | $8.23B (2023) | $945,977 |
| Strategic Market Research | $3.60B (2025) | $413,793 |
| Global Market Insights | $3.10B (2022) | $356,322 |

**$976,000 per radiotherapy centre per year is not a software licence.** The
high estimates cannot be describing radiation oncology information systems —
the ARIA and MOSAIQ class of product — alone. They must be bundling medical
oncology EMR, practice management, revenue cycle and professional services
across a far larger population of sites than the 8,700 radiotherapy centres.

That is the explanation for the 2.74x spread, and it is checkable arithmetic
rather than an assertion. It is the strongest thing these notes contain and
should be the spine of the report.

## Caveats that must survive into the published report

- **DIRAC is self-described as incomplete**: "still an incomplete description
  of the worldwide status of radiotherapy infrastructure." It is the best
  public register, not a census. Quote the caveat.
- **The two US site counts are not comparable.** 3,145 (2025) comes from CMS
  billing data; an earlier 2,332 (2020) came from state regulators and
  dosimetry monitoring organisations. The gap is partly methodology. Do not
  present them as a growth trend — that was the trap in the source coverage.
- **The per-centre arithmetic is a plausibility test, not a market estimate.**
  It shows the high figures cannot be radiotherapy-only. It does not establish
  what the correct number is, and the report must not imply that it does.
- **No methodology was inspected** for any of the eight estimates above. They
  are "published third-party estimates", and must be labelled as such with the
  definition each uses where that is stated.

## Vendor landscape — what is and is not knowable

Signify Research (2023) says Varian, Elekta and RaySearch hold most radiation
oncology OIS revenue, and that Varian and Elekta hold share in non-US markets
on the strength of installed bases and bundled hardware. Elekta's 2023/24
annual report calls MOSAIQ "market-leading" with a large global installed base.

**No current, precise share figures are public.** The numbers that circulate
are old and measure different things:

- ARIA "~2,500 treatment centers" — Varian press release, **2011**
- MOSAIQ "more than 2,500 global customers" — Elekta press release, **2013**
- Varian linac installed base 8,057 units — 2018 investor filing; this counts
  treatment machines, not OIS installations, and must not be used as a proxy
- Elekta "~7,500 devices and software solutions" — not broken out by product

→ **Do not publish a competitive share table.** State that current share is not
publicly disclosed, cite the qualitative Signify characterisation, and leave
`competitive_landscape` with named players and no invented percentages. This is
the same discipline applied to `regional_analysis` in the cancer diagnostics
report.

## Gaps — what is still missing before writing

1. **No census of medical oncology practices.** COA publishes Practice Impact
   Reports tracking acquisitions (544 hospital acquisitions, 149 corporate, in
   the 2014 edition) but not a total count. Without this the second half of the
   denominator is unknown, which limits the bottoms-up test to radiotherapy.
   Next: COA Studies & Reports page directly.
2. **ONC certified health IT (CHPL)** — worth checking whether certified
   oncology modules can be counted, as an independent register analogous to the
   FDA AI device list used in the cancer diagnostics report.
3. Confirm the IAEA figure from dirac.iaea.org directly rather than via the
   news item, and record the retrieval date.

## Sources

- IAEA DIRAC — https://dirac.iaea.org/
- IAEA, "Artificial Intelligence Improves Collection of Global Radiotherapy Data" — https://www.iaea.org/newscenter/news/artificial-intelligence-improves-collection-of-global-radiotherapy-data
- *Radiotherapy and Oncology* (2025), global geospatial analysis of radiotherapy access — https://www.thegreenjournal.com/article/S0167-8140(25)04565-7/fulltext
- ASTRO, "50 million Americans live in counties without a radiation oncology clinic" — https://www.astro.org/news-and-publications/news-and-media-center/news-releases/2026/50-million-americans-live-in-counties-without-a-radiation-oncology-clinic
- Healio coverage of the same CMS-based study — https://www.healio.com/news/hematology-oncology/20260720/wakeup-call-radiation-oncology-practice-closures-limit-access-for-millions-of-americans
- Signify Research, Varian onco-IT deal analysis — https://www.signifyresearch.net/insights/varian-secures-one-of-its-largest-ever-onco-it-deals-with-us-health-system/
- Elekta Annual Report 2023/24 — https://ir.elekta.com/files/mfn/5028c69b-cd26-43c4-a5ae-920caaa196ef/Elekta-AR-2324.pdf
- Global Market Insights — https://www.gminsights.com/industry-analysis/oncology-information-system-market
- Research and Markets — https://www.researchandmarkets.com/report/oncology-information-system
- Zion Market Research — https://www.zionmarketresearch.com/report/oncology-information-system-market
- Strategic Market Research — https://www.strategicmarketresearch.com/market-report/oncology-information-system-market
- Credence Research — https://www.credenceresearch.com/report/oncology-information-system-market
- SNS Insider — https://www.snsinsider.com/reports/oncology-information-system-market-1898
- Dimension Market Research — https://dimensionmarketresearch.com/report/oncology-information-system-market/
- GII Research — https://www.giiresearch.com/report/ires2096495-oncology-information-systems-market-global.html

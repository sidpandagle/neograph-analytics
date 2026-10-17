# Home Infusion Therapy — research notes
**Slug:** home-infusion-therapy-market   **Drafted:** 2026-10-18

## Published estimates (what others say)

| Source | Published | Base year | Base value | Forecast year | Forecast value | CAGR | Scope as stated |
|---|---|---|---|---|---|---|---|
| Strategic Market Research | 2026 report page | 2025 | $39.4B | 2032 | $66.6B | 7.8% (2026-2032) | Global home infusion therapy market |
| Straits Research | 2026 report page | 2025 | $41.65B | 2034 | $83.30B | 8.03% (2026-2034) | Global home infusion therapy market |
| The Insight Partners | 2026 report page | 2025 | $33.25B | 2034 | $61.18B | 7.01% (2026-2034) | Global home infusion therapy market |
| Mordor Intelligence | 2026 report page | 2025 | $25.99B | 2030 | $35.60B | 6.5% | Global home infusion market |
| Coherent Market Insights | 2026 report page | 2026 | $28.01B | 2033 | $44.98B | 7.0% | Global home infusion therapy market |
| Global Market Insights | 2025 report page | 2024 | $36.6B | 2034 | not stated in the page summary | 9.2% (2025-2034) | Global home infusion therapy market |
| SNS Insider | 2025 report page | 2024 | $38.98B | 2032 | $71.82B | 8.36% (2025-2032) | Global home infusion therapy market |
| Data Bridge Market Research | 2025 report page | 2024 | $28.25B | 2032 | $61.77B | 10.27% (2025-2032) | Global home infusion therapy market |
| DataHorizzon Research | 2024 press release | 2023 | $37.3B | 2032 | $76.2B | 8.3% (2024-2032) | Global home infusion therapy market |
| Zion Market Research | 2025 report page | not stated in page summary | — | 2032 | $71.53B | 4.72% | Global home infusion therapy market |
| SkyQuest Technology | 2025 report page | not stated in page summary | — | 2032 | $68.22B | 4.63% | Global home infusion therapy market |
| Credence Research | 2025 report page | not stated in page summary | — | 2032 | $42.5B | 6.80% (2024-2032) | Global home infusion therapy market |
| Coherent Market Insights (earlier edition) | 2024 press release | not stated in release summary | — | 2031 | $38.4B | 6.6% (2024-2031) | Global home infusion therapy market |

Where a cell says "not stated in page summary", the publisher's public page did
not expose a base-year value to a non-subscriber. Those rows are carried for
their endpoint and growth rate only; they are **not** used in the base-year
spread below, because inferring a base value by back-discounting a published
CAGR would be manufacturing the figure the publisher withheld.

## The spread

Three spreads, measured on like-for-like cells only:

- **Base year, 2025 cohort** (four houses: Mordor $25.99B, Insight Partners
  $33.25B, Strategic Market Research $39.4B, Straits $41.65B):
  41.65 / 25.99 = **1.603x**
- **2032 endpoint** (seven houses: Credence $42.5B, Data Bridge $61.77B,
  Strategic Market Research $66.6B, SkyQuest $68.22B, Zion $71.53B, SNS Insider
  $71.82B, DataHorizzon $76.2B): 76.2 / 42.5 = **1.793x**
- **CAGR** (SkyQuest 4.63% to Data Bridge 10.27%): 10.27 / 4.63 = **2.218x**

**Verdict: this is a growth disagreement, not a scope disagreement.** That is
the reverse of the usual pattern in this corpus, and it is worth stating
plainly. The growth spread (2.218x) is wider than the base-year spread
(1.603x), so the houses are not mainly starting in different places — they are
mainly compounding at different rates. A reader who matches base years still
faces a 2.2x disagreement about the rate.

### The drug-vs-service fault line — established, not assumed

The obvious scope fault line in this market is whether an estimate counts the
**infused drug** or only the **professional service** of delivering it. The
instruction was to establish that from the sources rather than assume it. It
can be established, and the answer is unambiguous: **every published estimate
listed above is on the drug-inclusive side of that line. None is service-only.**

Two independent proofs, both printed in full under "Grounding arithmetic":

1. The United States has a statutory, per-visit price for the *service* alone —
   the Medicare Part B home infusion therapy services benefit. Multiply the
   actual national visit count by the statutory CY2026 rate and the entire
   service-only Medicare line comes to **$5.3M-$11.5M a year**. Against a
   $39.4B headline that is 0.014% to 0.029%, a ratio of roughly **3,400x**.
   No published estimate can be measuring that.
2. The largest US provider's own income statement splits drug from service.
   Option Care Health's FY2024 gross margin is **20.27%**: $3.93 of product
   cost behind every $1.00 of margin. Apply that margin to the $39.4B headline
   and the implied service-only market is **$7.99B**. Not one published
   estimate sits near $8B; the lowest 2032 endpoint in the table is $42.5B.

So the drug/service question, which would normally explain a spread this wide,
explains none of it here. It is a boundary all thirteen houses are on the same
side of. What remains is a genuine disagreement about the rate of growth, and
that is the finding.

A secondary scope note: Mordor Intelligence titles its series "home infusion
market" rather than "home infusion therapy market" and lands lowest of the
2025 cohort at $25.99B. Data Bridge at $28.25B (2024) and Coherent at $28.01B
(2026) cluster with it. Whether that ~$26-28B tier excludes some drug classes
is not stated on the public pages, so it is noted as an open question and not
presented as a resolved tier.

## Grounding arithmetic

### Register 1 — the statutory per-visit price, against the actual visit count

Medicare's home infusion therapy services benefit is unusually checkable
because the price is set in regulation and the volume is published.

**The price (CY2026 national unadjusted amounts, CMS):** CMS sorts home
infusion drugs into three payment categories by J-code, pays once per infusion
drug administration calendar day, and pays a higher amount for the first visit
in the home. The six CY2026 amounts are:

| HCPCS | Payment category | Visit | CY2026 national amount |
|---|---|---|---|
| G0068 | 1 (IV anti-infectives, long-term infusions, pain, inotropic, chelation) | subsequent | $190.22 |
| G0069 | 2 (subcutaneous, incl. immunotherapy) | subsequent | $257.04 |
| G0070 | 3 (certain chemotherapy) | subsequent | $319.76 |
| G0088 | 1 | first home visit | $231.36 |
| G0089 | 2 | first home visit | $312.60 |
| G0090 | 3 | first home visit | $388.89 |

Derivation CMS itself prints: $186.16 (CY2025 G0068) x 1.0018 (GAF
standardisation) x 1.0200 (CPI-U less MFP) = $190.22. The CY2026 HIT update is
2.0%.

Note on the pipeline row: it named payment categories "1-4". The sources give
**three** payment categories and six G-codes (three subsequent, three initial).
Corrected here.

**The volume (CMS HIT Monitoring Report, February 2026, data Q1 2023 - Q2 2025):**
quarterly average **6,991** HIT service visits; **7,365** visits in Q2 2025;
7,400 in Q1 2023, so the series is flat at the endpoints.

**The division.** Annualise the volume and multiply by the statutory price.

    Most recent quarter, annualised:   7,365 x 4 = 29,460 visits/year
    Quarterly average, annualised:     6,991 x 4 = 27,964 visits/year

    Lower bound (every visit paid at the lowest category-1 subsequent rate):
      27,964 x $190.22 = $5,319,312/year
      29,460 x $190.22 = $5,603,881/year

    Absolute ceiling (every visit paid at the highest rate in the schedule,
    G0090 category-3 first-visit — physically impossible, since a first visit
    occurs once per episode):
      27,964 x $388.89 = $10,874,920/year
      29,460 x $388.89 = $11,456,699/year

**What it rules in or out.** The entire US Medicare fee-for-service home
infusion therapy *services* benefit is a **$5.3M to $11.5M per year** line
item. Measured against Strategic Market Research's $39.4B base:

    $5,603,881 / $39,400,000,000 = 0.01422%
    $39,400,000,000 / $11,456,699 = 3,439x

This rules out, conclusively, any reading in which a published
"home infusion therapy market" figure is the professional service as the US
statute defines and prices it. The headline figures must be counting the
infused drug product, and across payers the US statutory benefit does not
reach (commercial, Medicare Advantage, Medicaid, Part D, and Part B DME drug
spend). It does **not** tell us what the correct market size is; it tells us
what the published figures cannot be.

Corroborating the same point from the provider side: CMS's monitoring data via
NHIA shows **1,081 beneficiaries** receiving HIT services in Q2 2024 and just
**62 providers** billing for them, against what NHIA describes as nearly 1,000
home infusion pharmacies and 11,000 home health agencies capable of furnishing
the service. A benefit used by 62 suppliers is not the market anyone is sizing.

### Register 2 — Option Care Health's filed income statement, per site

Option Care Health describes itself in its FY2024 Form 10-K as the largest
independent provider of home and alternate-site infusion services in the
United States, operating a national network of **185 locations in 43 states**
(92 full-service pharmacies, 93 stand-alone ambulatory infusion suites) as of
31 December 2024. The FY2025 10-K reports **196 locations** (87 pharmacies, 109
stand-alone ambulatory infusion suites) as of 31 December 2025.

Filed figures, FY2024 (US$ thousands): net revenue **4,998,202**; cost of
revenue **3,985,209**; gross profit **1,012,993**. Prior years: net revenue
4,302,324 (2023) and 3,944,735 (2022).

**The divisions.**

    Revenue per location:        $4,998.202M / 185 = $27.017M per site per year
    Gross profit per location:   $1,012.993M / 185 = $5.476M per site per year
    Gross margin:                1,012,993 / 4,998,202 = 20.27%
    Product cost per $1 margin:  3,985,209 / 1,012,993 = $3.93

    Implied service-only market at the headline:
      $39.4B x 20.27% = $7.99B

    Option Care's share of the $39.4B headline:
      $4.998B / $39.4B = 12.7%

**What it rules in or out.** $27.0M of revenue per site per year is a drug
distribution business with a nursing and pharmacy service attached, not a
service business. 80% of every revenue dollar at the largest US provider is
product cost. That makes the drug-inclusive reading of the published headlines
the only one consistent with the one audited income statement available, and it
prices the service-only market at roughly a fifth of whatever drug-inclusive
figure you start from — about $8B against the $39.4B base. A 12.7% share for
the self-described largest independent provider is also internally consistent
with the "large and highly fragmented" market the same filing describes; it
would not be consistent with a $8B service-only market, where the same revenue
would be 63% of the total.

The two registers agree, and they were derived from unrelated data: a statutory
fee schedule times a federal visit count, and an SEC-filed income statement
divided by a site count. Neither is a market estimate.

## What we publish

- **Base year 2025, $39.4B; 2032, $66.6B; CAGR 7.79%.** Strategic Market
  Research's endpoints. Chosen because it is the most recently based estimate
  that publishes *both* a base value and a matching endpoint on a 2032 horizon,
  which is the horizon seven of the thirteen houses use — so it is the one
  series a reader can set beside the most peers.
- The CAGR is stated as **7.79%**, re-derived from the publisher's own two
  endpoints over 7 years: (66.6 / 39.4)^(1/7) - 1 = 7.7875%. Strategic Market
  Research publishes 7.8%; the two-decimal figure is the same number carried to
  the precision the endpoints support, not a different claim.
- `market_forecast` interpolates those two endpoints at the constant 7.79%
  rate: 2025 39.40, 2026 42.47, 2027 45.78, 2028 49.34, 2029 53.18, 2030 57.32,
  2031 61.79, 2032 66.60. These intermediate years are the shape implied by two
  published endpoints, not eight separately sourced observations, and the chart
  title says so.
- The three spreads (1.603x, 1.793x, 2.218x) and the growth-not-scope verdict.
- Both grounding divisions, with the arithmetic printed.
- The six CY2026 statutory per-visit amounts, the three payment categories, and
  the 1.0018 / 1.0200 derivation.
- The CMS visit counts (6,991 quarterly average; 7,365 in Q2 2025) and the
  Q2 2024 beneficiary and billing-provider counts (1,081 / 62).
- Option Care Health's filed FY2024 revenue, cost of revenue, gross profit and
  site counts for FY2024 and FY2025.
- Named players in words only, with an explicit statement that share is not
  disclosed.

## Do not publish

- **`regional_analysis`: empty.** Several publishers assert North America
  dominates and Asia-Pacific grows fastest, but not one public page gives a
  regional value or a regional percentage that can be attributed. A qualitative
  "North America leads" is not a regional split and will not be dressed as one.
- **`country_analysis`: empty.** No source gives country values. The US
  material here is a statutory price and a federal visit count, which bounds the
  US *Medicare service* line and nothing else; it is not a US market size and
  must not be presented as one.
- **`recent_developments`: empty.** Nothing in this pass produced a company,
  year and verifiable event together. Option Care's site-count change between
  the FY2024 and FY2025 filings is in the competitive section as filed fact, not
  dressed up as a dated "development".
- **No `market_share` anywhere** — not in `competitive_landscape`, not in
  `market_segmentation`, not in the regional or country arrays. Option Care's
  12.7% of the $39.4B headline is arithmetic against a third-party estimate, not
  a disclosed share, and it stays in the prose as the division it is.
- **Segment shares.** Several pages split the market by therapy
  (anti-infectives, parenteral nutrition, chemotherapy, immunotherapy) and by
  product. None gives attributable percentages, so segmentation is plain
  strings.
- **Base values for Zion, SkyQuest, Credence and the earlier Coherent
  edition.** Back-discounting their published CAGRs would produce a number the
  publisher did not publish. Left blank.
- **A Global Market Insights 2034 endpoint.** The page summary gave the 2024
  base and the 9.2% CAGR but no endpoint value; the endpoint is left blank
  rather than computed.
- **Total Medicare HIT drug spend, and any total-payer US figure.** Not located
  in this pass. The CMS and MedPAC material found covers home health, a
  different benefit, and MedPAC's post-acute tables do not break out home
  infusion.
- **A count of enrolled qualified HIT suppliers.** CMS publishes the register
  (data.cms.gov "Home Infusion Therapy Providers", PECOS-derived, biweekly), and
  the CSV for the 14-27 December 2025 period was located, but every retrieval
  path available in this pass returned HTTP 403 from the CDN, so the row count
  was never actually counted. It is not reported. The adjacent figures that
  *were* obtainable — 62 billing providers in Q2 2024, and NHIA's "203 suppliers
  have participated" from an earlier CMS report — are the register-adjacent
  counts quoted, and the 203 is labelled as an earlier period rather than as a
  current enrolment total.

## Sources

1. CMS, "CY 2026 National Home Infusion Therapy Services Rates" —
   https://www.cms.gov/files/document/cy-2026-national-home-infusion-therapy-services-rates.pdf
   (CY2026 schedule; G0068 $190.22, G0069 $257.04, G0070 $319.76, G0088 $231.36,
   G0089 $312.60, G0090 $388.89; $186.16 x 1.0018 x 1.0200 = $190.22). Retrieved
   via search indexing; direct fetch returned HTTP 403 from the CMS CDN.
2. CMS, "Home Infusion Therapy (HIT) Monitoring Report", February 2026, data
   Q1 2023 - Q2 2025 —
   https://www.cms.gov/files/document/hit-monitoring-report-feb-2026.pdf
   (quarterly average 6,991 HIT service visits; 7,400 in Q1 2023; 7,365 in
   Q2 2025).
3. CMS, "Updated Billing Requirements for Home Infusion Therapy Services",
   MM12108 — https://www.cms.gov/files/document/mm12108.pdf (three payment
   categories by J-code; one payment per infusion drug administration calendar
   day; highest category paid when categories are mixed in a day).
4. 42 CFR 414.1550, Basis of payment —
   https://www.law.cornell.edu/cfr/text/42/414.1550 (single payment amount set
   equivalent to 5 hours of infusion in a physician's office; annual CPI-U less
   MFP update; geographic adjustment).
5. CMS, "Update to 'J' Drug Code List for Billing Home Infusion Therapy (HIT)
   Services", MM12667 —
   https://www.cms.gov/files/document/mm12667-update-j-drug-code-list-billing-home-infusion-therapy-hit-services.pdf
   (J1551 added to payment category 2, G0069/G0089).
6. National Home Infusion Association, "Fixing the Medicare Part B Home
   Infusion Therapy Benefit" — https://nhia.org/advocacy/fixing-part-b-hit-benefit/
   (CMS February 2025 report: 1,081 beneficiaries receiving HIT services in
   Q2 2024; 62 providers billed in Q2 2024; nearly 1,000 home infusion
   pharmacies and 11,000 home health agencies capable of furnishing the
   service; payment limited to days a nurse is physically present).
7. CMS, "Home Infusion Therapy Providers", data.cms.gov, PECOS-derived
   enrolment register, updated biweekly; CSV for 14-27 December 2025 at
   https://data.cms.gov/sites/default/files/2025-12/0241c84c-74f5-4f86-b692-d408180a03bd/Home%20Infusion%20Therapy%2012.29.2025.csv
   — located but not retrievable in this pass (HTTP 403). No count reported.
8. Option Care Health, Inc., Form 10-K for FY2024 (filed 2025) —
   https://www.sec.gov/Archives/edgar/data/1014739/000101473925000012/bios-20241231.htm
   (net revenue $4,998,202K; cost of revenue $3,985,209K; gross profit
   $1,012,993K; 2023 revenue $4,302,324K; 2022 revenue $3,944,735K; 92
   full-service pharmacies and 93 stand-alone ambulatory infusion suites; 185
   locations in 43 states; "largest independent provider of home and alternate
   site infusion services"; market described as "large and highly fragmented").
9. Option Care Health, Inc., Form 10-K for FY2025 (196 locations; 87 pharmacies
   and 109 stand-alone ambulatory infusion suites as of 31 December 2025).
10. Strategic Market Research, home infusion therapy market —
    https://www.strategicmarketresearch.com/market-report/home-infusion-therapy-market
    ($39.4B in 2025 to $66.6B by 2032, 7.8%, forecast window 2026-2032).
11. Straits Research, home infusion therapy market —
    https://straitsresearch.com/report/home-infusion-therapy-market
    ($41.65B in 2025 to $83.30B by 2034, 8.03% for 2026-2034).
12. The Insight Partners, home infusion therapy market —
    https://www.theinsightpartners.com/reports/home-infusion-therapy-market
    ($33.25B in 2025 to $61.18B by 2034, 7.01% for 2026-2034).
13. Mordor Intelligence, home infusion market —
    https://www.mordorintelligence.com/industry-reports/home-infusion-market
    ($25.99B in 2025 to $35.60B by 2030, 6.5%).
14. Coherent Market Insights, home infusion therapy market —
    https://www.coherentmarketinsights.com/market-insight/home-infusion-therapy-market-4276
    ($28.01B in 2026 to $44.98B by 2033, 7.0%). Earlier edition via BioSpace,
    2024: $38.4B by 2031 at 6.6% for 2024-2031.
15. Global Market Insights, home infusion therapy market —
    https://www.gminsights.com/industry-analysis/home-infusion-therapy-market-report
    ($36.6B in 2024; 9.2% CAGR for 2025-2034).
16. SNS Insider, home infusion therapy market —
    https://www.snsinsider.com/reports/home-infusion-therapy-market-3021
    ($38.98B in 2024 to $71.82B by 2032, 8.36% for 2025-2032).
17. Data Bridge Market Research, global home infusion therapy market —
    https://www.databridgemarketresearch.com/reports/global-home-infusion-therapy-market
    ($28.25B in 2024 to $61.77B by 2032, 10.27% for 2025-2032).
18. DataHorizzon Research, home infusion therapy market, 2024 press release via
    Yahoo Finance —
    https://finance.yahoo.com/news/home-infusion-therapy-market-reach-074000577.html
    ($37.3B in 2023 to $76.2B by 2032, 8.3% for 2024-2032).
19. Zion Market Research, home infusion therapy market —
    https://www.zionmarketresearch.com/report/home-infusion-therapy-market
    ($71.53B by 2032, 4.72%).
20. SkyQuest Technology, home infusion therapy market —
    https://www.skyquestt.com/report/home-infusion-therapy-market
    ($68.22B by 2032, 4.63%).
21. Credence Research, home infusion therapy market —
    https://www.credenceresearch.com/report/home-infusion-therapy-market
    ($42.5B by 2032, 6.80% for 2024-2032).
22. eCFR, 42 CFR 424.68, Enrollment requirements for home infusion therapy
    suppliers —
    https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-B/part-424/subpart-E/section-424.68
    (CMS-855B enrolment, accreditation by a CMS-approved organisation,
    limited-risk screening).
23. eCFR, 42 CFR Part 486 Subpart I, Requirements for Home Infusion Therapy
    Suppliers —
    https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-G/part-486/subpart-I
    (supplier standards and plan-of-care requirements).

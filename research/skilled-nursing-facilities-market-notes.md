# Skilled Nursing Facilities — research notes
**Slug:** skilled-nursing-facilities-market   **Drafted:** 2026-10-18

Pipeline row 47, round 6A. Industry: Healthcare IT.

This market is unusually checkable. The payment rate is statutory and published
annually in the Federal Register; the facility count is a federal certification
register; the spending total, occupancy, margin and days-per-stay are published
by MedPAC each March from claims and cost reports; and three of the largest
operators are SEC registrants. Almost nothing here has to be taken on trust, and
the notes below take as little as possible on trust.

## Published estimates (what others say)

| Source | Published | Base year | Base value | Forecast year | Forecast value | CAGR | Scope as stated |
|---|---|---|---|---|---|---|---|
| Coherent Market Insights (CMI6806) | 2 Apr 2026 | 2026 (est.) | USD 453.31 bn | 2033 | USD 844.77 bn | 9.3% (2026-2033) | Global. Facility type (hospital, freestanding); ownership (government, profit, non-profit); service offered (PT, OT, speech-language pathology, medical social services, other). Historical period 2020-2024. No formal definition published. |
| Coherent Market Insights (earlier release) | c. 2024-25 | 2025 | USD 414.74 bn | 2032 | USD 763.53 bn | 9.1% stated (2025-2032); endpoints imply 9.11% | Same global framing as above, prior edition. A second release from the same house gave 8.9% for the same period. |
| 360iResearch / Research and Markets (report 6011760, "Global Forecast 2026-2032") | Sep 2026 | 2026 | USD 482.78 **million** as printed | 2032 | USD 702.73 **million** as printed | 6.42% (6.4% in the summary table); endpoints imply 6.46% | Global; 16 countries; service type (long-term care incl. memory care and residential nursing; rehabilitation incl. OT/PT/SLP), facility size, payment type (Medicaid/Medicare/private pay), ownership. **Unit is printed as "Million" throughout, which cannot be reconciled with any other estimate or with the US registers; see "Do not publish".** |
| Credence Research | last updated "Sep 21" (no year; site carries a 2026 copyright) | 2024 (the page also states 2023 in its summary table) | USD 380,085 million (USD 380.09 bn) | 2032 | USD 711,365 million (USD 711.37 bn) | 8.15% (2024-2032); endpoints reconcile to 8.15% | Global. Region, ownership (for-profit/non-profit/government), facility type (freestanding/hospital-based), service offered. Described as "post-acute care services" plus round-the-clock care, medical monitoring, rehabilitation and assistance with activities of daily living. |
| Research Dive | Jul 2023 | 2022 | USD 326.43 bn | 2032 | USD 651.25 bn | 7.5% stated; endpoints imply 7.15% | Global. Facility type (freestanding/hospitals), ownership, four regions (NA, Europe, APAC, LAMEA). |
| Nova One Advisor (US) | undated; 2026 copyright | 2023 | USD 180.95 bn (page's scope table gives USD 187.17 bn for 2024) | 2033 | USD 253.77 bn | 3.44% (2024-2033); endpoints reconcile to 3.44% | **United States only.** Facility type (freestanding/hospital), ownership. Defined as care above assisted living and below hospital: rehabilitation, long-term custodial care, post-acute care. Page is internally inconsistent (FAQ gives 2022 = USD 182.07 bn, 2032 = USD 252.64 bn, 3.33%). |

Editions move. The same Research and Markets report number (6011760) carried a
materially different series one edition earlier, and both Coherent editions are
live on the web at the same time with different base years. Any SNF figure
quoted without an edition date is unusable.

## The spread

Three different comparisons have to be kept apart, because they answer different
questions.

**1. Across tiers — scope, and by a very wide margin.** The countable register
for Medicare's actual skilled nursing benefit is MedPAC's: in 2024 the FFS
Medicare program and its beneficiaries spent **USD 31 billion** under the SNF
prospective payment system. The smallest *global* published base-year figure for
a comparable year is Credence's USD 380.09 bn for 2024. That is **12.3x** the
register. Against the most recent global figure (CMI, USD 453.31 bn for 2026)
the multiple is **14.6x**. Within the same base year, the US-only house and the
global houses differ by **2.03x** (Nova One Advisor USD 187.17 bn for 2024
against Credence USD 380.09 bn for 2024).

The tiers, named:

- **Tier 1 — the Medicare Part A skilled nursing benefit, United States: ~USD 31
  bn (2024, MedPAC).** Post-acute, time-limited, paid per diem under PDPM after
  a qualifying inpatient stay. This is what "skilled nursing facility" means as
  a term of art in US payment policy.
- **Tier 2 — all-payer United States nursing facility revenue: USD 180.95-187.17
  bn (Nova One Advisor, 2023-2024); USD 219.9 bn for the adjacent CMS national
  accounts category (2024).** Medicaid long-term care is the bulk of it; FFS
  Medicare is 13% of freestanding facility revenue and 8% of days at the median
  facility.
- **Tier 3 — global institutional nursing and long-term care: USD 326.43 bn
  (2022) to USD 482.78 bn (2026) at the base year, USD 651.25-844.77 bn at the
  forecast horizon.** Arrived at by adding the rest of the world to Tier 2 and
  keeping the senior-living adjacency inside the boundary.

No published estimate sits in Tier 1. Every global headline is a Tier 3 number.
A buyer who reads "skilled nursing facility market" and thinks of the Medicare
SNF benefit is off by an order of magnitude before any growth assumption is
applied.

**2. Within Tier 3 at the base year — close to agreement.** On a 2026 base,
CMI's USD 453.31 bn and 360iResearch's USD 482.78 (as printed, million) differ by
only **1.065x**. At the 2032 horizon, Credence's USD 711.37 bn and Research
Dive's USD 651.25 bn differ by **1.092x**. The houses have converged on the
boundary.

**3. On growth — a genuine disagreement, not a scope artefact.** Published CAGRs
run 3.44% (Nova One Advisor, US) to 9.3% (CMI, global): a **2.70x** spread. Even
confining the comparison to global-scope houses, 6.42% to 9.3% is **1.45x**.
That is the opposite of the usual pattern, where houses agree on growth and
disagree on scope.

**Verdict: the headline gap between the register and the published literature is
a scope disagreement; the gap *among* the published global estimates is a growth
disagreement.** Both are reported in the JSON. The growth disagreement matters
more for planning, because it is the part no public register settles and the part
on which the register's own trend (below) is openly unsupportive.

## Grounding arithmetic

### (a) Realised Medicare per-diem against the statutory PDPM rate

PDPM base rates are set by regulation, so this is the rare market where the unit
price of the service is a published legal fact rather than an estimate.

FY 2026 unadjusted Federal per-diem rates, prior to case-mix adjustment (SNF PPS
final rule, 90 FR 37318, published 4 August 2025, effective 1 October 2025):

| Component | Urban | Rural |
|---|---|---|
| Physical therapy | $75.73 | $86.33 |
| Occupational therapy | $70.49 | $79.29 |
| Speech-language pathology | $28.28 | $35.63 |
| Nursing | $132.00 | $126.12 |
| Non-therapy ancillaries | $99.59 | $95.15 |
| Non-case-mix | $118.21 | $120.40 |
| **Sum at case-mix index 1.0** | **$524.30** | **$542.92** |

Now the volume denominator, all from MedPAC's March 2026 SNF chapter for 2024:
about **1.5 million** FFS Medicare-covered SNF stays, at **30.7 covered days per
admission**.

```
1,500,000 stays x 30.7 covered days per admission = 46,050,000 covered days

$31,000,000,000 (program + beneficiary, SNF PPS, 2024) / 46,050,000 days = $673.18 per covered day
$26,000,000,000 (program only, excl. beneficiary cost sharing and swing beds) / 46,050,000 days = $564.60 per covered day

$673.18 / $524.30 (FY2026 urban unadjusted sum) = 1.284
$564.60 / $524.30 = 1.077
```

**What it rules in:** the USD 31 bn figure is the right order of magnitude for
the service it claims to describe. A realised per-diem 1.28x the urban
case-mix-index-1.0 sum is what you would expect from a case-mix distribution
whose nursing and NTA indices exceed 1.0 for post-acute admissions, plus
wage-index uplift on the labour share in urban markets. If the division had
produced $200 or $2,000 a day, one of the two series would be wrong.

**Caveat stated plainly:** the spend is calendar 2024 and the rates are FY2026,
so the comparison crosses two payment updates (FY2025 and the net 3.2% FY2026
update). The bias runs one way — FY2024/FY2025 rates were lower than FY2026's —
so the true multiple against the rates actually in force in 2024 is **larger**
than 1.284, not smaller. The direction is known; the magnitude is not claimed.
The 1.5 million stays figure is MedPAC's own rounding, so the per-day results
carry roughly one significant figure of denominator uncertainty.

### (b) Two unrelated federal series on US all-payer facility revenue

MedPAC reports that FFS Medicare's share of freestanding SNF facility revenue
fell from 14% in 2023 to **13% in 2024**. Grossing the register up by that share:

```
$31 bn / 0.13 = $238.5 bn implied US all-payer nursing facility revenue, 2024
```

The CMS National Health Expenditure Accounts put spending at freestanding
nursing care facilities and continuing care retirement communities at **USD
219.9 bn in 2024** (+7.3% on 2023's USD 205.0 bn). The two agree to within
8.5%, from entirely different instruments — cost reports and a revenue-share
statistic on one side, the national accounts on the other.

**What it rules out:** it rules out the Tier 2 estimates being far wrong, and it
rules out any reading in which the United States is a minor part of the global
total. US all-payer nursing facility revenue of ~USD 220 bn against CMI's USD
453.31 bn global 2026 figure leaves roughly USD 233 bn for the entire rest of
the world. That is only coherent if "skilled nursing facility" is being read as
institutional long-term care everywhere, which is Tier 3, not Tier 1.

### (c) Operator disclosure, per day and per facility

Ensign Group, FY2025 (10-K, year ended 31 December 2025): skilled services
revenue **USD 4.84 bn** (+18.7%), **10,795,373 actual patient days**, operational-
bed occupancy **82.2%** (from 80.5%), **373** facilities, **95.6%** of revenue
from skilled nursing facilities, with Medicaid **46.6%** and Medicare **24.7%**
of skilled services revenue.

```
$4,840,000,000 / 10,795,373 patient days = $448.34 per patient day (all payers)
$4,840,000,000 / 373 facilities = $12.98 million per facility per year
$219,900,000,000 (CMS NHE, 2024) / 14,518 certified SNFs (MedPAC/CMS QCOR, July 2025) = $15.15 million per facility per year
```

A blended all-payer $448.34 sitting *below* the Medicare-only statutory floor of
$524.30 is exactly right for a book that is 46.6% Medicaid, and it is the
cleanest available demonstration that Medicaid long-term care — not the Medicare
skilled benefit — is what most of a SNF's revenue is. The per-facility figures
agree within 17% across a single operator and the whole national register.

### (d) Where the Tier 3 boundary actually sits: senior living per resident

Brookdale Senior Living reported **623 communities** able to serve about
**57,000 residents** as of 30 September 2025, 2025 revenue of about **USD 3.19
bn**, and consolidated occupancy of **80.9%** (from 78.6% in 2024).

```
$3,194,000,000 / 57,000 residents = $56,035 per resident per year
$448.34 per patient day x 365 = $163,644 per occupied bed per year (Ensign, all payers)

$163,644 / $56,035 = 2.92x
```

Skilled nursing revenue per occupied bed is **2.92x** senior living revenue per
resident. That multiple is the price of the scope decision. A global estimate
that bundles assisted and independent living into "skilled nursing facility"
inflates the bed count far faster than the revenue, which is one mechanical
reason the Tier 3 numbers can be large while the growth story stays weak. Note
also that Brookdale's 2025 disclosures carry no skilled nursing breakout at all
— the company is a senior living operator — so its inclusion in any "skilled
nursing facility" competitive set is itself a scope statement.

### (e) The register's own trend, against the published CAGRs

From MedPAC's March 2026 chapter (CMS Quality, Certification and Oversight
Reports, accessed 3 November 2025) and its Table 7-3:

- Medicare-participating SNFs: 14,798 (2023) → 14,634 (2024) → **14,518** (through
  10 July 2025). Average **-1.0% per year since 2019**; -0.8% in the first six
  months of 2025. 20 new facilities and 50 terminations in that half-year, of
  which all but 9 were voluntary.
- Medicaid-certified nursing facilities: 14,232 as of July 2025, -0.7% since
  December 2024.
- Median national SNF occupancy: **83%** in 2024 (84% in October 2024 on the
  prior year's measure); upper quartile above 91%, lower quartile at or below
  70%. Pre-pandemic 2019 median was 85%, down from 88% in 2010.
- Covered admissions per 1,000 FFS beneficiaries: 55 (2019) → **45** (2024),
  -3.9% per year. Covered days per 1,000: 1,447 (2019) → **1,396** (2024).
  Covered days per admission: 26.1 (2019) → **30.7** (2024), +4.9% in 2024 alone.
- FFS Medicare margin for freestanding SNFs: **24.4%** in 2024, up from 22.5% in
  2023 — the 25th consecutive year at or above 10%. All-payer total margin 2.1%
  in 2024, up from 0.4%; 40% of SNFs had negative all-payer margins, down from
  46%. Non-FFS Medicare margin -2.3%.
- FFS Medicaid nursing home spending: **USD 46.3 bn** in 2024, +9.0% on 2023.
- MedPAC's recommendation for FY2027: cut 2026 SNF base rates by **4 percent**
  (FY2026 recommendation was -3%).

A register with a falling facility count, 83% median occupancy, falling
admissions and a flat day count does not obviously support 9.3% compound revenue
growth. It can support growth in *spending* through rate updates (a net 3.2%
FY2026 update), longer stays (+4.9% days per admission in 2024), Medicaid rate
increases in 45 states for FY2024, and case-mix intensity under PDPM — MedPAC
cites published evidence (Geng et al. 2025, Wang et al. 2025) that providers are
adapting billing behaviour to PDPM incentives. That is the honest mechanism
behind the growth rates, and it is a payment-policy mechanism, not a volume one.
It is also the mechanism MedPAC is recommending Congress reverse.

## What we publish

**Headline: USD 453.31 bn (2026) → USD 844.77 bn (2033) at 9.3%.** Coherent
Market Insights, report CMI6806, published 2 April 2026. Chosen because it is
the most recently published estimate, it carries the most recent base year, it
states its currency and unit unambiguously in billions, and its endpoints
reconcile to its stated CAGR to within 0.001 points
(`453.31 x 1.093^7 = 844.77`). It is a Tier 3, global-scope series, and the
report says so in the executive summary, the forecast analysis and the FAQs.

It is also the fastest-growing series in the set. That is stated as a problem
with the series rather than hidden: `forecast_analysis` tells a reader working to
a US all-payer definition to anchor on USD 180.95-187.17 bn and 3.44%, and a
reader working to the Medicare Part A benefit to anchor on the USD 31 bn register
and MedPAC's own trend, which is a falling facility count and a recommended rate
cut.

`market_forecast` interpolates geometrically between the two published endpoints
at 9.3001%: 453.31, 495.47, 541.55, 591.91, 646.96, 707.13, 772.89, 844.77. The
intermediate years are interpolation, not separately sourced observations, and
the chart title says so.

Everything else published in the JSON is a register figure or an SEC disclosure,
each traceable to a numbered source below: the PDPM rate table, the facility
counts, occupancy, margins, days and admissions from MedPAC; the national
accounts total from CMS; the operator figures from Ensign, PACS and Brookdale
filings and releases.

## Do not publish

- **`regional_analysis`: empty.** Every global house advertises a regional
  segmentation behind the paywall; none publishes the split. The only regional
  number this research can defend is "the United States is roughly half of the
  global total", and that is a derived inference from two series with different
  scopes, not a regional estimate. It stays in the prose as an inference and out
  of the table.
- **`country_analysis`: empty.** Same reason. The US figures here are national
  accounts and Medicare program totals, not a country row inside a global
  market model, and presenting them as one would imply a consistent global
  model that does not exist in public.
- **`recent_developments`: empty.** The verifiable 2025-2026 events in this
  sector are regulatory (the FY2026 final rule, the FY2027 proposed rule,
  MedPAC's -4% recommendation, the expected repeal of minimum staffing
  requirements) and they are carried in `regulatory_landscape` where they
  belong. Operator M&A is real but the public record of individual transactions
  is thin enough that a list would mix verified filings with trade-press
  paraphrase.
- **No `market_share` anywhere.** No house publishes vendor share for this
  sector and the arithmetic forbids inventing it: Ensign at USD 4.84 bn and PACS
  at USD 5.3 bn are each about 2% of a USD 220 bn US all-payer total, and MedPAC
  describes the sector as "fragmented and characterized by independent providers
  and regional and local chains" with ownership structures that make common
  ownership hard to identify at all. A share table would be fiction.
- **The 360iResearch unit as printed.** The page says "USD 482.78 Million in
  2026" and "USD 702.73 Million by 2032". Taken literally that is a market
  roughly 1/450th the size of US Medicare's SNF benefit alone, which the
  registers rule out absolutely. Taken as billions it sits 1.065x from CMI's
  2026 figure and fits the Tier 3 cluster exactly. The notes record the
  discrepancy; the JSON cites the house and the CAGR, and does **not** silently
  restate its unit as a headline figure.
- **The USD 274.12 bn (2025) → USD 402.8 bn (2032) at 5.64% series** that search
  engines still return for Research and Markets report 6011760. Both live URLs
  for that report number now serve the September 2026 edition. The figure could
  not be verified on any publisher page and is therefore not published, only
  noted as evidence that editions of the same report restate the base year by
  large margins.
- **A single "the SNF market is X" headline without a tier.** Dropped by
  construction: the title, meta description, summary, executive summary and first
  FAQ all state the scope before the number.
- **Per-facility or per-bed revenue as an estimate.** Sections (c) and (d) are
  plausibility tests computed from published totals and published denominators.
  They establish what the published figures cannot mean. They are not market
  estimates and `data_validation` says so.
- **Any swing-bed figure inside the market size.** MedPAC reports USD 2 bn for
  about 66,000 covered swing-bed stays in 2024, but most of those stays are not
  paid under the SNF PPS, so they are excluded from the per-diem division in (a)
  and mentioned only as context.

## Sources

1. MedPAC, *Report to the Congress: Medicare Payment Policy*, March 2026,
   Chapter 7, "Skilled nursing facility services."
   https://www.medpac.gov/wp-content/uploads/2026/03/Mar26_Ch7_MedPAC_Report_To_Congress_SEC.pdf
   — 2024: ~14,400 freestanding SNFs, ~1.5 m Medicare-covered stays, 1.1 m FFS
   beneficiaries, USD 31 bn program + beneficiary spending under the SNF PPS
   (USD 26 bn program only, +4% on 2023), USD 2 bn for ~66,000 swing-bed stays.
   Median occupancy 83%. FFS Medicare margin for freestanding SNFs 24.4% (22.5%
   in 2023), 25th consecutive year >= 10%. All-payer total margin 2.1%; non-FFS
   Medicare margin -2.3%. FFS Medicare 13% of freestanding facility revenue
   (14% in 2023) and 8% of days at the median facility. Table 7-2: 14,798
   (2023), 14,634 (2024), 14,518 (through 10 July 2025), -1.0% average annual
   since 2019; source given as CMS Quality, Certification and Oversight Reports
   accessed 3 November 2025. Table 7-3: covered admissions per 1,000 FFS
   beneficiaries 55 (2019) to 45 (2024); covered days per 1,000 1,447 to 1,396;
   covered days per admission 26.1 to 30.7. Medicaid-certified facilities 14,232
   (July 2025); FFS Medicaid nursing home spending USD 46.3 bn in 2024, +9.0%.
   Recommendation: reduce 2026 base rates by 4% for FY2027.
2. MedPAC, *Report to the Congress: Medicare Payment Policy*, March 2025,
   Chapter 6, "Skilled nursing facility services."
   https://www.medpac.gov/wp-content/uploads/2025/03/Mar25_Ch6_MedPAC_Report_To_Congress_SEC.pdf
   — 2023: ~14,500 freestanding SNFs, ~1.6 m covered stays, 1.2 m FFS
   beneficiaries, USD 30 bn FFS Medicare + beneficiary spending. Margin 22% in
   2023 (23% in 2022), 23% projected for 2025. Median occupancy 84% in October
   2024; 69% at the January 2021 low; 85% in 2019 and 88% in 2010. 96% of SNFs
   dually certified. FY2026 recommendation: -3%. Used here only for the
   historical series; the 2026 chapter supersedes it for current figures.
3. CMS, *Medicare Program; Prospective Payment System and Consolidated Billing
   for Skilled Nursing Facilities; Updates to the Quality Reporting Program for
   Federal Fiscal Year 2026*, final rule, 90 FR 37310 et seq., published 4
   August 2025, effective 1 October 2025.
   https://www.govinfo.gov/content/pkg/FR-2025-08-04/pdf/2025-14679.pdf
   — Section III.B.5, "Unadjusted Federal Per Diem Rates for FY 2026", Tables 4
   and 5. Net 3.2% update (3.3% market basket plus 0.6 point forecast error
   adjustment, less a 0.7 point productivity adjustment). The rate tables are
   embedded as images in the Federal Register PDF and so were read from a
   secondary transcription (source 4) rather than from the PDF text layer.
4. Powerback Rehabilitation, "CMS Issues FY 2026 SNF Final Rule for SNF PPS",
   2025. https://www.getpowerback.com/blog-posts/cms-issues-fy-2026-snf-final-rule-for-snf-pps
   — transcription of the FY2026 unadjusted Federal per-diem table: urban PT
   $75.73, OT $70.49, SLP $28.28, Nursing $132.00, NTA $99.59, non-case-mix
   $118.21; rural $86.33 / $79.29 / $35.63 / $126.12 / $95.15 / $120.40.
   Independently consistent with a second transcription of the same table
   reporting identical component values and the 3.2% net update.
5. CMS Office of the Actuary / *Health Affairs*, "National Health Care Spending
   Increased 7.2 Percent in 2024", 2026 (National Health Expenditure Accounts).
   https://www.healthaffairs.org/doi/10.1377/hlthaff.2025.01683
   — spending at freestanding nursing care facilities and continuing care
   retirement communities rose 7.3% in 2024 to USD 219.9 bn, from USD 205.0 bn
   in 2023; the category is about 4% of national health spending; total national
   health spending USD 5.3 trn.
6. The Ensign Group, Inc., Form 10-K for the year ended 31 December 2025, and
   the FY2025 earnings release.
   https://www.sec.gov/Archives/edgar/data/1125376/000112537626000007/ensg-20251231.htm
   — skilled services revenue USD 4.84 bn (+18.7%); actual patient days
   10,795,373 (+14.5% on 9,431,825); operational-bed occupancy 82.2% (80.5%);
   373 facilities at 31 December 2025, 253 under long-term lease; 95.6% of
   revenue from skilled nursing facilities; Medicaid 46.6% and Medicare 24.7% of
   skilled services revenue; same-facility set of 210 facilities at 82.9%
   occupancy on ~7.58 m patient days.
7. PACS Group, Inc., Form 10-K for the year ended 31 December 2025.
   https://www.sec.gov/Archives/edgar/data/2001184/000200118426000005/pacs-20251231.htm
   — 321 post-acute care facilities in 17 states (plus 28 assisted living and 2
   independent living); patient and resident service revenue USD 5.3 bn, +29.4%
   (+USD 1,201.2 m); skilled nursing services revenue +29.0% (+USD 1,164.0 m) to
   ~USD 5.2 bn on a 22.8% increase in patient days; portfolio occupancy 89%
   (mature facilities 95%); Medicare 33.7% and Medicaid 40.5% of routine
   revenue. The filing is internally inconsistent on leased facility count (219
   in Item 1 against 268 in Properties), so only the 321 total is used.
8. Brookdale Senior Living Inc., Q4 and full-year 2025 results (18 February
   2026) and the September 2025 occupancy Form 8-K.
   https://brookdaleinvestors.com/news/news-details/2026/Brookdale-Announces-Fourth-Quarter-and-Full-Year-2025-Results/default.aspx
   https://www.sec.gov/Archives/edgar/data/1332349/000133234925000138/september2025occupancy.htm
   — 623 communities in 41 states serving approximately 57,000 residents as of
   30 September 2025; 2025 revenue approximately USD 3.19 bn; RevPAR +5.7%;
   Adjusted EBITDA USD 458 m; net loss USD 263 m; consolidated occupancy 80.9%
   (78.6% in 2024). No skilled nursing breakout is disclosed.
9. Coherent Market Insights, "Global Skilled Nursing Facility Market", report
   CMI6806, published 2 April 2026.
   https://www.coherentmarketinsights.com/industry-reports/global-skilled-nursing-facility-market
   — USD 453.31 bn in 2026 to USD 844.77 bn by 2033 at 9.3%; base year 2025
   (no 2025 value published); historical period 2020-2024. An earlier release
   from the same house gave USD 414.74 bn (2025) to USD 763.53 bn (2032) at
   9.1%, and a second release 8.9% for the same period.
10. Credence Research, "Skilled Nursing Facility Market Size, Growth and
    Forecast 2032", last updated "Sep 21" (site copyright 2026).
    https://www.credenceresearch.com/report/skilled-nursing-facility-market
    — USD 380,085 m in 2024 to USD 711,365 m in 2032 at 8.15%. The page states
    2023 as base year in its summary table and 2024 in its attribute table and
    Chapter 2; the 2024 value is identical in both.
11. 360iResearch via Research and Markets, "Skilled Nursing Facility Market by
    Service Type, Facility Size, Payment Type, Ownership Type — Global Forecast
    2026-2032", report 6011760, September 2026, 199 pages.
    https://www.researchandmarkets.com/reports/6011760/skilled-nursing-facility-market-service-type
    https://www.360iresearch.com/library/intelligence/skilled-nursing-facility
    — "projected to reach USD 482.78 Million in 2026" and USD 702.73 Million by
    2032 at 6.42% (6.4% in the summary table). Unit printed as million; see "Do
    not publish". The methodology section states the summary is built "without
    relying on market sizing, market share, or forecasting assumptions", which
    contradicts the headline figures on the same page.
12. Research Dive, "Skilled Nursing Facility Market", July 2023.
    https://www.researchdive.com/8740/skilled-nursing-facility-market
    — USD 326.43 bn in 2022 to USD 651.25 bn in 2032 at a stated 7.5%; the two
    endpoints imply 7.15% over ten years, so the stated rate and the stated
    endpoints do not reconcile.
13. Nova One Advisor, "U.S. Skilled Nursing Facility Market", undated (2026
    copyright). https://www.novaoneadvisor.com/report/us-skilled-nursing-facility-market
    — USD 180.95 bn in 2023 to USD 253.77 bn in 2033 at 3.44% for 2024-2033;
    scope table gives USD 187.17 bn for 2024; FAQ gives USD 182.07 bn (2022),
    USD 252.64 bn (2032) and 3.33%. United States only.
14. Geng et al. (2025) and Wang et al. (2025), cited in source 1 as published
    evidence that SNF providers are adapting billing behaviour to PDPM
    incentives in order to receive higher payments. Cited here at second hand,
    through MedPAC.
15. American Health Care Association, industry-sponsored survey of 411
    providers, reported March 2024, cited in sources 1 and 2 — about half of
    respondents had turned away potential residents and 19% had closed a unit,
    wing or floor. Cited at second hand and labelled industry-sponsored.
16. Department of Housing and Urban Development Section 232 program data, cited
    in source 1 — 337 projects financed in FY2025 against 220 in FY2024; total
    HUD-insured amount USD 6.0 bn in 2025 against USD 3.2 bn in 2024.

# Home health care — research notes
**Slug:** home-health-care-market   **Drafted:** 2026-10-18

Pipeline row 51, round 7A. Industry: Healthcare IT.

Like skilled nursing, this market is unusually checkable, and for the same
reasons: the unit price is statutory and published annually, the provider count
is a federal certification register, the spending total and the volume
denominator are published by MedPAC each March from claims and cost reports, and
three of the largest operators are SEC registrants. Almost nothing below has to
be taken on trust.

**One thing that is NOT like skilled nursing, and has already cost this pipeline
a correction elsewhere: Medicare home health is paid on the CALENDAR year.** The
rule is a CY rule, not an FY rule, unlike SNF, IRF, LTCH and hospice. Verified
directly against the Federal Register: the operative rule is the **CY 2026** HH
PPS rate update, CMS-1828-F, **90 FR 55342** (published 2 December 2025), and its
own title begins "Calendar Year 2026 Home Health Prospective Payment System
(HH PPS) Rate Update" (source 3). Every rate in these notes is a CY figure. There
is no FY2026 home health rule and the phrase should not appear on the page.

## The boundary against `hospital-at-home-market`

This corpus already carries a published report at slug `hospital-at-home-market`.
The two do not overlap, and the boundary is established from the payment
instruments rather than asserted:

| | Home health (this report) | Hospital at home (the other report) |
|---|---|---|
| Statutory basis | §1895 of the Act; HH PPS | Acute Hospital Care at Home (AHCAH) waiver of the 24-hour on-premises nursing Condition of Participation |
| Unit of payment | 30-day period of care, case-mix adjusted under PDGM; LUPAs paid per visit | The inpatient stay, billed under the IPPS at the MS-DRG rate |
| Level of care | Intermittent skilled nursing or therapy for a **homebound** patient | **Inpatient-level** acute care |
| Prior hospital stay | Not required (expressly contrasted with the SNF benefit in MedPAC Ch. 8) | The patient is an admitted inpatient by construction |
| Certification required | Physician, NP, CNS or PA certifies eligibility; face-to-face encounter in the 90 days before or 30 days after start of care | Hospital-level waiver approval from CMS |
| The register | **12,234** Medicare-certified HHAs, 2024 (source 1) | **373** approved hospitals, January 2026 (the other report's own register) |
| Register ratio | 12,234 / 373 = **32.8x** more home health agencies than approved AHCAH hospitals | |
| Duration of authority | Permanent benefit | Waiver, extended to 30 September 2030 by the Consolidated Appropriations Act, 2026 (source 11) |

The $16.0 bn FFS Medicare figure used throughout these notes is HH PPS spending
and therefore **excludes** AHCAH entirely, because AHCAH episodes are paid under
the IPPS. The two reports' register figures, payment systems and dollar totals are
disjoint. A patient can receive both in sequence — AHCAH discharge to home health
is a normal path — but no dollar is counted twice.

## Published estimates (what others say)

| Source | Published | Base year | Base value | Forecast year | Forecast value | CAGR | Scope as stated |
|---|---|---|---|---|---|---|---|
| Grand View Research (report 978-1-68038-010-1) | Published Jun 2026; page states "last updated September 2026" | 2025 (USD 485.3 bn); 2026 estimate USD 504.8 bn | USD 504.8 bn (2026) | 2033 | USD 1,015.8 bn | 10.5% stated (2026-2033); endpoints imply **10.5056%** | Global. Component (Equipment, Services — Services 83.9% of 2025 revenue), Indication (neurological & mental disorders largest at 16.8% in 2025), Region. North America **42.3%** of revenue in 2025. Actual data 2021-2025. Company list is device- and product-heavy: B. Braun, Abbott, 3M, Baxter, Medtronic, Cardinal Health, Roche, Air Liquide, Philips, GE Healthcare, Linde, Fresenius Kabi, Omron, BD, Teleflex — plus Amedisys. |
| Coherent Market Insights (report 840) | 1 Apr 2026 | 2025 (no 2025 value published); 2026 estimate USD 473.10 bn | USD 473.10 bn (2026) | 2033 | USD 848.31 bn | 8.7% stated (2026-2033); endpoints imply **8.700%** | Global. "Provides medical equipment and services to patients at home" — infusion therapy, respiratory therapy, **unskilled home healthcare**, rehabilitation, telehealth; devices include blood sugar monitors, mobility aids, pregnancy test kits, BP monitors. Product & Services, Indication, Geography. Product segment 51.6% in 2026; North America **40.7%** in 2026. |
| Fortune Business Insights (report FBI101030) | Page states last updated 28 Sep 2026 | 2025 (USD 404.26 bn) | USD 432.01 bn (2026) | 2034 | USD 1,015.51 bn | 11.28% stated (2026-2034); endpoints imply **11.275%** | Global. Type (Services, Products), Therapeutic Area, Payor (Private, Public), Region. North America **42.71%** / **USD 172.64 bn** in 2025. Historical 2021-2024. |
| Precedence Research | Page states last updated 9 Sep 2026 | 2025 (USD 487.2 bn); 2026 table value USD 566.22 bn | USD 487.2 bn (2025) | 2035 | USD 1,556.59 bn | 12.32% stated for 2026-2035; **the 2025-2035 endpoints imply 12.317%, the 2026-2035 endpoints imply 11.892%** — the stated rate is a 2025-base rate labelled as a 2026-base one | Global. Type (Device, Services); Device (diagnostic & monitoring, therapeutic, home mobility assist); Services (rehabilitation, telehealth, respiratory therapy, infusion therapy, **unskilled homecare**); Region. North America 50.21% in 2025. **US: USD 222.61 bn (2025) to USD 692.30 bn (2035) at 12.01%.** The page's own device/service tables print values such as "USD 27,697.3 billion" that cannot be reconciled with a USD 487.2 bn total. |
| Persistence Market Research | Jan 2026 | Not stated; 2026E value given | USD 580.8 bn (2026E) | 2033 | USD 954.0 bn | 7.8% stated (2026-2033); **endpoints imply 7.347%** — does not reconcile, 0.45 points apart | Global. Product (therapeutic devices, testing/screening/monitoring devices, mobility care devices), Service (skilled nursing, rehabilitation therapy, respiratory therapy, infusion therapy, **pregnancy care**), Indication, Region. North America 48.8% in 2026. Historical CAGR 2020-2025 given as 6.2%. |
| Verified Market Research (report 49479) | May 2025 | 2024 | USD 390.24 bn | 2032 | USD 720.17 bn | 7.96% stated for "2026 to 2032"; **the 2024-2032 endpoints imply exactly 7.96%**, so the stated period is mislabelled by two years | Global "home health care **services**". Service Type (physical therapy, occupational therapy, home health aide services), End User (hospitals, rehabilitation centres, nursing homes, home care agencies), Geography. North America "dominant" with no percentage. The page's own chart image prints the 2032 figure as "US$ 720.17 **Mn**" against "Billion" in the text. |
| Towards Healthcare (US only) | Page states last updated 20 Jul 2026 | 2025 (USD 56.93 bn est.) | USD 61.48 bn (2026) | 2035 | USD 122.91 bn | 8% stated (2026-2035); endpoints imply **8.001%** | **United States only.** Component, Indication, Service Type, Payer, Delivery Mode. Historical 2020-2023. |
| Data Bridge Market Research | Edition date not recoverable | 2024 | USD 117.67 bn | 2032 | USD 232.76 bn | 8.90% stated; endpoints imply **8.901%** | Global. **Could not be verified on the publisher's own page** — every reachable copy is a syndicated repost or an SEO blog, and the URLs that carry the figure (openpr, the publisher's own report page) returned HTTP 403 to this research pass. The widely circulated "USD 139.54 bn in 2026" is **derived** from the 2024 base at 8.90%, not published. Earlier Data Bridge-attributed series give USD 108.06 bn (2023) to USD 213.74 bn (2031) and USD 99,236.66 m (2022) to USD 196,288.64 m (2030), all at 8.90%. Recorded for completeness; **excluded from the published spread.** |

Editions move here as they do everywhere. Precedence, Fortune and Grand View all
carry September 2026 "last updated" stamps against materially different base-year
values for the same year, and Data Bridge's base year has been restated three
times at an unchanged 8.90% CAGR. Any home health figure quoted without an
edition date is unusable.

## The spread

Three comparisons, kept apart because they answer different questions.

**1. Within the verified global tier at the 2026 base year — close to agreement.**
USD 432.01 bn (Fortune) to USD 580.80 bn (Persistence):

```
580.80 / 432.01 = 1.344x
```

Six of the seven verified houses sit inside a 1.34x band. That is tighter than
most markets in this corpus and it means the global houses have converged on a
boundary. Including the unverifiable Data Bridge series' derived 2026 value would
widen it to `580.80 / 139.54 = 4.162x`, which is exactly why that series is not
published: a 4x spread reported from an unverifiable source misrepresents a
literature that actually agrees.

**2. Within the United States at essentially one base year — a 3.91x disagreement.**

```
222.61 / 56.93 = 3.910x   (Precedence US 2025 against Towards Healthcare US 2025)
```

The single country for which there is a federal measurement is the one on which
the houses disagree most. The federal measurement — CMS National Health
Expenditure Accounts, home health care, **USD 169.4 bn in 2024** (source 5) —
sits between them, 2.98x above the low and 0.76x of the high. This is the most
useful single fact in the published literature on this market: the US component
is measured, and two houses bracket it by a factor of four.

**3. On growth — a real disagreement, not a scope artefact.**

```
12.32 / 7.8 = 1.579x   (Precedence against Persistence)
```

A 1.58x spread on growth against a 1.34x spread on base-year size is the
opposite of the usual pattern. Here the houses broadly agree what the market is
and disagree about how fast it grows.

**Verdict: the global houses agree on scope and disagree on growth; the gap that
matters is the 31.6x one between any global headline and the Medicare benefit a
buyer is likely to have in mind.** The tiers, named:

- **Tier 1 — the Medicare home health benefit, United States: USD 16.0 bn (2024,
  MedPAC).** 8.3 million 30-day periods, 2.7 million FFS beneficiaries, paid under
  the HH PPS. This is what "home health" means as a term of art in US payment
  policy.
- **Tier 2 — all-payer United States home health care: USD 169.4 bn (2024, CMS
  National Health Expenditure Accounts),** up 10.2% on 2023's USD 153.6 bn.
  Medicare Advantage, Medicaid home health, private insurance and out-of-pocket
  on top of Tier 1.
- **Tier 3 — global home health care including equipment and unskilled care: USD
  432.01-580.80 bn at a 2026 base.** Arrived at by adding the rest of the world to
  Tier 2 and keeping devices, infusion, respiratory, telehealth and unskilled
  homecare inside the boundary — which every Tier 3 house's own published
  definition does, explicitly.

```
504.80 / 16.0  = 31.55x   global headline against the Medicare benefit
169.40 / 16.0  = 10.59x   US all-payer against the Medicare benefit
504.80 / 169.4 =  2.98x   global headline against US all-payer
```

No published estimate sits in Tier 1, and the US-only houses do not sit in Tier 2
either — Towards Healthcare's USD 56.93 bn is 2.98x *below* the national accounts.

## Grounding arithmetic

### (a) The headline divided through by the certification register — the primary test

Grand View publishes exactly one regional number: North America **42.3% of
revenue in 2025**. Applying its own share to its own 2026 headline, and dividing
by the only countable US register of home health providers:

```
0.423 x $504.80B = $213.53B     implied North America, 2026
$213,530,000,000 / 12,234 Medicare-certified HHAs (2024, CMS Provider of Services via MedPAC)
                = $17,454,000 per agency per year
```

Now two *measured* per-location revenues, from filings rather than estimates:

```
Enhabit, FY2025 10-K:  $813,800,000 home health segment revenue / 249 home health locations
                       = $3,268,300 per location per year

DOJ consent decree, UnitedHealth/Amedisys divestiture (closed Aug 2025):
                       $528,000,000 annual revenue / 164 home health and hospice locations
                       = $3,219,500 per location per year
```

The two independent measurements agree to within **1.5%** (`3.2683 / 3.2195 =
1.015`), which is the strongest evidence in these notes that ~$3.2 m is the real
annual revenue of a US home health location. Against the implied figure:

```
$17,454,000 / $3,268,300 = 5.34x
$17,454,000 / $3,219,500 = 5.42x
```

**What it rules out:** the Tier 3 headline cannot be describing the Medicare-certified
home health agency sector. A North American total that works out to 5.3-5.4 times
the measured revenue of an actual home health location, multiplied across the
whole certification register, is arithmetically impossible unless the boundary
includes far more than agency-delivered home health. **What it rules in:** exactly
what the houses' own definitions say it includes — home medical equipment and
devices (Grand View's own Component split puts Services at 83.9% of 2025 revenue,
so 16.1% is equipment before any other adjustment), infusion and respiratory
therapy, telehealth, and **unskilled homecare**, which Coherent and Precedence
both name in their published segment lists.

The operators confirm the direction independently. Aveanna's fiscal 2025 (53
weeks to 3 January 2026, source 8) splits USD 2,433.2 m of revenue into Private
Duty Services **USD 2,001.1 m**, Home Health & Hospice **USD 248.6 m** and
Medical Solutions USD 183.5 m:

```
$2,001.1M / $248.6M = 8.05x
$248.6M / $2,433.2M = 10.2%   of the largest pure-play home-based care operator's revenue
                              is the home health and hospice benefit
```

The largest home-based care companies are overwhelmingly **not** in the Medicare
home health benefit. 82.2% of Aveanna's revenue is Medicaid-funded private duty
nursing. That is the unskilled/personal-care mass the Tier 3 boundary absorbs.

### (b) The register's internal consistency, against the statutory rate

The CY 2026 base rate is a published legal fact, so the realised payment per unit
can be checked against it rather than assumed.

MedPAC's 2024 figures (source 1, Tables 8-2, 8-4 and 8-7): FFS Medicare HH PPS
spending **USD 16.0 bn**, **8.3 million** 30-day periods, **65.4 million**
in-person visits.

```
$16,000,000,000 / 8,300,000 thirty-day periods = $1,927.71 per 30-day period
$1,927.71 / $2,038.22 (CY2026 national standardized 30-day rate, 90 FR 55342, Table 14) = 0.9458

$16,000,000,000 / 65,400,000 in-person visits = $244.65 per visit
   — MedPAC's own independently computed figure is $245 per visit in 2024. Agreement to 0.14%.

$244.65 / $176.96 (CY2026 LUPA skilled-nursing per-visit amount, Table 16) = 1.3825
```

**What it rules in:** the USD 16.0 bn figure is the right order of magnitude for
the service it claims to describe. A realised per-period payment at **0.946** of
the statutory base rate is exactly what an episode mix containing LUPAs should
produce, because a LUPA is paid per visit at between USD 80.12 and USD 283.64 a
visit for two to five visits rather than at the full period rate — a LUPA period
is worth a few hundred dollars, not two thousand. And a realised per-visit
payment **1.38x** the per-visit rate for the dominant discipline is exactly what
episode-based payment should produce against per-visit payment: that 1.38x gap
*is* the financial incentive to stay above the LUPA threshold. Had the division
produced $200 or $20,000 a period, one of the two series would be wrong.

**Caveat stated plainly:** the spend is calendar 2024 and the rates are CY2026, so
the comparison crosses two payment updates. The bias runs *against* the result —
CY2026 is a net 1.4% reduction to the base rate from CY2025's USD 2,057.35 (Table
14: 2,057.35 x 0.98977 x 1.0052 x 1.0025 x 1.024 x 0.97000 = 2,038.22), and
CY2025 was itself a reduction — so the ratio against the rates actually in force
in 2024 is slightly *lower* than 0.9458, not higher. The 8.3 m and 65.4 m
denominators are MedPAC's own roundings, so the results carry about three
significant figures.

### (c) Two independent federal instruments on the same payment base

The CY 2026 final rule's own regulatory impact analysis states a net transfer
impact of **-USD 220 million, which it puts at -1.3 percent** of aggregate HH PPS
payments (source 3). Grossing up:

```
$220,000,000 / 0.013 = $16,923,000,000 implied CY2026 aggregate HH PPS payment base
```

MedPAC measured **USD 16.0 bn** actually paid in 2024, from claims (source 1).

```
($16.923B - $16.0B) / $16.0B = +5.77%
```

Two entirely different instruments — a forward-looking actuarial impact estimate
built on CY2024 claims and OASIS assessments on one side, a retrospective claims
tabulation on the other — agree to within 5.8% across two years in which the base
rate fell and volume was flat. **What it rules out:** any reading in which the
Medicare home health benefit is materially larger or smaller than USD 16-17 bn.
Tier 1 is pinned.

### (d) Where the Tier 3 regional shares break — and which one survives

This is the test that chose the headline. Every global house publishes a North
America share. North America contains the United States, so each share, applied
to that house's own headline, must leave a **positive and non-trivial** remainder
after subtracting the United States alone. The US alone is federally measured
(USD 169.4 bn, 2024), and advancing a *measurement* at each house's *own* growth
rate is the fairest available test, because it uses nothing the house would
dispute.

**Coherent Market Insights — fails.**
```
0.407 x $473.10B = $192.55B   implied North America, 2026
$169.4B x 1.087^2 = $200.16B  United States alone, 2026, at Coherent's own 8.7%
($200.16B - $192.55B) / $200.16B = 3.80%
```
Coherent's entire North America for 2026 is **3.80% below the United States
alone**, advanced at Coherent's own rate from a federal measurement. Either the
share is wrong or the headline is too low.

**Fortune Business Insights — fails, and on its own published dollar figure.**
Fortune publishes North America 2025 not as a share alone but as **USD 172.64 bn**.
```
$169.4B x 1.1128 = $188.51B   United States alone, 2025, at Fortune's own 11.28%
($188.51B - $172.64B) / $188.51B = 8.42%
```
Fortune's entire North America for 2025 is **8.42% below the United States
alone**. The federal 2024 measurement itself (USD 169.4 bn) is already only 1.9%
below Fortune's whole-continent 2025 figure, before any growth is applied at all.

**Grand View Research — passes.**
```
0.423 x $485.3B  = $205.28B   implied North America, 2025 (its own share x its own 2025 value)
$169.4B x 1.105  = $187.19B   United States alone, 2025, at Grand View's own 10.5%
$205.28B - $187.19B = $18.09B remainder for the rest of North America
$205.28B / $187.19B = 1.097   North America 9.67% above the US alone
```
A remainder of USD 18.09 bn for Canada, Mexico and the rest of North America is
positive, non-trivial and of a plausible order. Grand View is the only global
house in this set whose regional share survives the test against a federal
measurement.

**Precedence Research — not a failure of the same kind, but its US figure is high.**
Precedence publishes a US value directly, USD 222.61 bn for 2025.
```
$169.4B x 1.102 = $186.68B    US 2025 at the NHEA's own measured 2024 growth of 10.2%
$222.61B / $186.68B = 1.192
```
19.2% above what the national accounts' own trend would give. Not impossible —
a wider boundary than the NHEA category would explain it — but it is an estimate
sitting above a measurement, and it is why Precedence's USD 566.22 bn 2026 value
is not the headline here.

**Generalises past these publishers.** Any Tier 3 global headline in the
USD 430-580 bn range for a 2026 base must put North America at **at least ~40%**,
because the US component is federally measured and is most of it. Two of the five
global houses print a share that cannot carry their own headline. The defect is a
property of the tier, not of any one house.

### (e) The register's own trend, against the published CAGRs

From MedPAC's March 2026 Chapter 8 (source 1):

- Medicare-participating HHAs: 11,356 (2019) → 11,386 → 11,506 → 11,657 → 12,057
  (2023) → **12,234** (2024). +1.5% a year 2019-2023, +1.5% 2023-24. **The entire
  increase is California:** 1,533 (2019) → **2,914** (2024), +14.6% a year
  2019-2023 and +269 agencies in 2024 alone, while the rest of the nation and
  territories fell from 9,823 to **9,320**, about -1% a year. Growth in California
  is concentrated in Los Angeles County, which accounted for **USD 1.4 bn — about
  9% of total FFS home health expenditure — on about 2% of FFS beneficiaries**,
  with ~16% of the county's FFS beneficiaries using home health against a national
  average under half that. MedPAC flags this against a 2022 California State
  Auditor finding on hospice fraud in the same county and says "further
  investigation may be warranted".
- FFS users of home health: 3.3 m (2019) → 2.7 m (2023) → **2.7 m** (2024),
  -4.7% a year 2019-2023, -2.1% in 2024. Share of FFS beneficiaries using home
  health 8.5% (2019) → **7.9%** (2024).
- 30-day periods: 9.3 m (2021) → 8.6 m → 8.3 m (2023) → **8.3 m** (2024), -0.5%.
  Periods per 100 FFS beneficiaries 25.5 (2021) → 24.1 (2023) → **24.7** (2024),
  +2.6%. Periods per user steady at **3.1**.
- Total in-person visits: 99.7 m (2019) → **65.4 m** (2024), **-34.4%**. Visits per
  full 30-day period 10.2 (2019) → **8.4** (2024), **-18.0%** — therapy visits
  -21.5%, skilled nursing -11.8%, MSS and aide -41.6%.
- Aggregate FFS payments: USD 17.9 bn (2019) → 15.9 bn (2023) → **USD 16.0 bn**
  (2024), -3.0% a year to 2023 then +1.1%. Payment per full period USD 1,945
  (2021) → **USD 2,057** (2024). Payment per visit USD 180 (2019) → **USD 245**
  (2024), +7.2% a year.
- FFS Medicare margin, freestanding HHAs: 15.4% (2019) → 24.9% (2021) → 19.8%
  (2023) → **21.2%** (2024). 2001-2023 average **17.2%**. For-profit 23.1% against
  nonprofit 12.2%; largest volume quintile 23.2% against smallest 14.4%; 5.7% at
  the 25th percentile to 31.0% at the 75th. All-payer margin **5.0%**. MedPAC
  projects **19%** for 2026.
- Access: **97%** of FFS beneficiaries in a ZIP served by two or more HHAs, 86% by
  five or more. Share of IPPS discharges whose first post-acute site was an HHA:
  15.8% (2019) → 20.1% (2020) → **18.0%** (first 10 months of 2024).
- Digital: **2.2%** of 30-day periods included a telehealth visit or remote
  monitoring in 2024; about 12% of HHAs reported any telehealth visit; about
  375,000 telehealth visits, ~80% skilled nursing — under 1% of all visits.
- **MedPAC's recommendation: reduce the CY2026 base rate by 7 percent for CY2027.**
  Vote 17-0. Estimated to reduce spending by USD 750 m to USD 2 bn over one year
  and USD 10-25 bn over five.

A register with a 34.4% fall in visits since 2019, flat periods, a falling user
count, a declining non-California agency count and a 21.2% Medicare margin against
which the Commission has voted 17-0 for a 7% cut does **not** support 10.5%
compound revenue growth for the Medicare benefit. It is not meant to: 10.5% is a
Tier 3 global rate on a boundary that is mostly not the Medicare benefit. What
the register does support is growth in *spending per unit* through rate updates
and case-mix, which is a payment-policy mechanism, not a volume one — and it is
the mechanism MedPAC is recommending Congress reverse.

## What we publish

**Headline: USD 504.80 bn (2026) → USD 1,015.80 bn (2033) at 10.51%.** Grand View
Research, report 978-1-68038-010-1, published June 2026, page last updated
September 2026. Chosen for four reasons, in order:

1. **It is the only global house in the set whose published regional share
   survives division against a federal measurement** (grounding (d)). Coherent's
   and Fortune's North America both fall below the United States alone.
2. Its endpoints reconcile to its stated CAGR: `(1015.80/504.80)^(1/7) - 1 =
   10.5056%`, against a stated 10.5%. The JSON carries **10.51** so the verifier
   lands under 0.01 points.
3. It carries a 2026 base year and one of the two most recent edition dates.
4. Its own Component split (Services 83.9% of 2025) states the scope decision
   explicitly rather than leaving it to be inferred, which is what makes grounding
   (a) possible at all.

It is a Tier 3, global-scope series and the report says so in the title-adjacent
summary, the executive summary, the forecast analysis and the first FAQ.

`market_forecast` interpolates geometrically between the two published endpoints
at 10.5056%: 504.80, 557.83, 616.44, 681.20, 752.76, 831.84, 919.23, 1015.80. The
intermediate years are interpolation, not separately sourced observations, and the
chart title says so.

Everything else published in the JSON is a register figure, a Federal Register
rate or an SEC disclosure, each traceable to a numbered source below: the CY2026
base rate and the six LUPA per-visit amounts from 90 FR 55342; agency counts,
periods, visits, users, payments per unit, margins and the CY2027 recommendation
from MedPAC Chapter 8; the all-payer US total from the National Health Expenditure
Accounts; operator figures from Enhabit's and Aveanna's 10-Ks and from the DOJ
settlement in the UnitedHealth/Amedisys merger.

## Do not publish

- **`regional_analysis`: empty.** Five global houses advertise a regional
  segmentation and none publishes a split in dollars; four publish a single North
  America percentage, and grounding (d) shows two of those percentages cannot
  carry their own house's headline. The only regional statement this research can
  defend is "the United States is most of North America and North America is
  roughly 40-50% of the global total", which is an inference from two series with
  different scopes, not a regional estimate. It stays in the prose and out of the
  table.
- **`country_analysis`: empty.** Same reason, one step worse. The US figures here
  are national accounts and a Medicare program total, not a country row inside a
  consistent global model. Presenting them as one would imply a global model that
  does not exist in public. Precedence's USD 222.61 bn US value is the only
  published country row in the set and grounding (d) shows it sits 19.2% above
  what the national accounts' own trend gives.
- **`recent_developments`: empty.** The verifiable 2025-2026 events here are
  either regulatory — the CY2026 final rule, the -1.023% permanent and -3.0%
  temporary adjustments, MedPAC's 17-0 vote for -7%, the HHVBP measure-set
  changes, the face-to-face change at 42 CFR 424.22(a)(1)(v) — and carried in
  `regulatory_landscape` where they belong, or corporate and already stated in
  `competitive_landscape` with their filing or decree as the source. A separate
  list would restate the same handful of events a third time or pad with
  trade-press paraphrase.
- **No `market_share` anywhere.** No house publishes vendor share for this sector
  and the arithmetic forbids inventing it. Enhabit's USD 813.8 m of home health
  revenue is **0.48%** of the USD 169.4 bn US all-payer total; Aveanna's whole
  home health and hospice segment at USD 248.6 m is 0.15%. MedPAC describes the
  sector as highly fragmented, Enhabit's own 10-K calls the industry "large,
  growing, and highly fragmented", and Aveanna's calls it "highly competitive and
  fragmented". A share table would be fiction. Grand View's own named-company list
  is device manufacturers, which would make any "home health market share" table
  a statement about Baxter and Medtronic rather than about home health agencies.
- **The Data Bridge series.** USD 117.67 bn (2024) to USD 232.76 bn (2032) at
  8.90% is internally consistent, but it could not be verified on the publisher's
  own page — the report URL and every syndication carrying it returned HTTP 403 or
  resolved to an SEO repost. Recorded in the table with that flag; excluded from
  the spread, because a 4.16x spread computed from an unverifiable source would
  misrepresent a literature that actually agrees inside 1.34x.
- **The widely circulated "USD 139.54 bn in 2026".** It is arithmetic on the Data
  Bridge 2024 base at 8.90%, not a published base-year figure, and the press
  release carrying it was unreachable. Not published.
- **Persistence's stated 7.8% as a reconciled rate.** Its own endpoints imply
  7.347%. The CAGR range in the report is stated as "7.8% stated, 7.35% implied"
  where it appears, and the low end of the CAGR spread is attributed to the house
  rather than presented as reconciled.
- **Verified Market Research's "2026 to 2032" period.** The 7.96% reconciles over
  2024-2032, not 2026-2032. The figure is published with its real period.
- **Precedence's device and service tables.** They print values such as
  "USD 27,697.3 billion" against a USD 487.2 bn total. Unusable; the house's
  headline and US row are cited, its segment values are not.
- **Any FY2026 home health figure.** There is no FY2026 home health rule. The
  trap named in the brief is handled by construction: every rate on the page is
  labelled CY and cited to 90 FR 55342.
- **Per-agency or per-location revenue as an estimate.** Grounding (a) is a
  plausibility test computed from published totals and published denominators. It
  establishes what the published figures cannot mean. It is not a market estimate
  and `data_validation` says so.
- **Any overlap with `hospital-at-home-market`.** No AHCAH figure, hospital count
  or DRG-paid dollar appears in this report's market size, and the boundary table
  above is reproduced in substance in a FAQ so a reader cannot conflate them.
- **A single "the home health market is X" headline without a tier.** Dropped by
  construction: the meta description, summary, executive summary and first FAQ all
  state the scope before the number.

## Sources

1. MedPAC, *Report to the Congress: Medicare Payment Policy*, March 2026,
   Chapter 8, "Home health care services."
   https://www.medpac.gov/wp-content/uploads/2026/03/Mar26_Ch8_MedPAC_Report_To_Congress_SEC.pdf
   — 2024: about 2.7 million FFS Medicare beneficiaries received home health care
   and the program spent **USD 16.0 bn** under the HH PPS; **over 12,000 HHAs**
   certified. Table 8-1: participating HHAs 11,356 (2019), 11,386, 11,506, 11,657,
   12,057 (2023), **12,234** (2024), +1.5% average annual 2019-2023 and +1.5%
   2023-24; nation excluding California 9,823 → 9,320 (-1.1% and -1.0%); California
   1,533 → 2,914 (+14.6% and +10.2%); source given as MedPAC analysis of the CMS
   Provider of Services file. Los Angeles County USD 1.4 bn, ~9% of FFS home health
   expenditure, ~2% of FFS beneficiaries, ~16% county use rate; California State
   Auditor 2022 cited. Table 8-2: FFS users 3.3 m (2019) → 2.7 m (2024); share of
   FFS beneficiaries using home health 8.5% → 7.9%; **30-day periods 9.3 m (2021),
   8.6 m, 8.3 m (2023), 8.3 m (2024)**; periods per 100 FFS beneficiaries 25.5 →
   24.7; periods per user 3.1. Table 8-3: 24.8 periods per 100 urban against 21.7
   rural and 11.7 frontier. Table 8-4: **total in-person visits 99.7 m (2019) →
   65.4 m (2024), -34.4%**; visits per full period 10.2 → 8.4, -18.0%; PT/OT/SLP
   4.9 → 3.8; skilled nursing 4.6 → 4.1; MSS and aide 0.8 → 0.5. Table 8-5: first
   post-acute site HHA 15.8% (2019) → 20.1% (2020) → 18.0% (first 10 months 2024).
   Table 8-7: **total payments USD 17.9 bn (2019), 17.1, 16.9, 16.2, 15.9 (2023),
   16.0 (2024)**; payment per user 5,437 → 6,031; **average payment per full 30-day
   period 1,945 (2021), 2,010, 2,024, 2,057 (2024)**; **payment per in-person visit
   180 (2019) → 245 (2024)**. Table 8-8: FFS Medicare margin freestanding HHAs
   15.4%, 20.2%, 24.9%, 22.2%, 19.8%, **21.2%** (2024); for-profit 23.1%, nonprofit
   12.2%; smallest volume quintile 14.4%, largest 23.2%; 25th percentile 5.7%, 75th
   31.0%; 2001-2023 average 17.2%; 2001 margin 23%; 2019 margin 15.4%. All-payer
   margin 5.0%; 2026 projected FFS margin 19%. Table 8-9: CY2026 policy changes —
   market basket 3.2%, productivity -0.8, BBA budget neutrality -3.6, outlier
   threshold -0.5, total -1.4. Access: 97% of FFS beneficiaries in a ZIP served by
   2+ HHAs, 86% by 5+. Telehealth: 2.2% of periods, ~12% of HHAs, ~375,000 visits,
   ~80% skilled nursing. **Recommendation for CY2027: reduce the CY2026 base rate
   by 7 percent; vote 17-0; USD 750 m - 2 bn over one year, USD 10-25 bn over
   five.** Corporate items: Addus HomeCare's USD 21.3 m Pennsylvania acquisition
   (2025); Pennant Group's **USD 146.5 m** purchase of HHAs from UnitedHealth
   Group; Optum's 2023 LHC Group purchase and 2025 Amedisys purchase; Humana's
   2021 Kindred at Home purchase.
2. MedPAC, *Report to the Congress: Medicare Payment Policy*, March 2026,
   Chapter 6 (cross-sector), and Chapter 14, "Mandated report: the impact of
   recent changes to the home health prospective payment system."
   https://www.medpac.gov/document/chapter-14-mandated-report-the-impact-of-recent-changes-to-the-home-health-prospective-payment-system-march-2026-report/
   — home health has the lowest FFS Medicare payment per unit of service of any
   sector, **USD 1,937 per 30-day period in 2024** (all periods, including LUPAs;
   the USD 2,057 in source 1 Table 8-7 is full periods only). Chapter 14 is the
   BBA of 2018 mandated final report.
3. CMS, *Medicare and Medicaid Programs; Calendar Year 2026 Home Health
   Prospective Payment System (HH PPS) Rate Update; Requirements for the HH
   Quality Reporting Program and the HH Value-Based Purchasing Expanded Model;
   DMEPOS Competitive Bidding Program Updates; DMEPOS Accreditation Requirements;
   Provider Enrollment; and Other Medicare and Medicaid Policies*, final rule
   CMS-1828-F, **90 FR 55342** (2 December 2025); FR document 2025-21767; released
   by CMS 28 November 2025.
   https://www.federalregister.gov/documents/2025/12/02/2025-21767/medicare-and-medicaid-programs-calendar-year-2026-home-health-prospective-payment-system-hh-pps-rate
   https://www.govinfo.gov/content/pkg/FR-2025-12-02/html/2025-21767.htm
   https://public-inspection.federalregister.gov/2025-21767.pdf (text used here)
   — **Table 14: CY2026 national standardized 30-day period payment USD 2,038.22**
   = 2,057.35 (CY2025) x 0.98977 (permanent adjustment) x 1.0052 (case-mix
   recalibration neutrality) x 1.0025 (wage index neutrality) x 1.024 (payment
   update) x 0.97000 (temporary adjustment); USD 2,101.26 without the temporary
   adjustment. **Table 15: USD 1,998.41** for an HHA not submitting quality data
   (update 0.4% instead of 2.4%). **Table 16: CY2026 national per-visit amounts
   (used to pay LUPAs and to impute outlier costs) — home health aide USD 80.12,
   medical social services USD 283.64, occupational therapy USD 194.74, physical
   therapy USD 193.42, skilled nursing USD 176.96, speech-language pathology
   USD 210.25**, each = the CY2025 amount x 1.0005 (LUPA wage-index neutrality) x
   1.0240. Table 17 gives the non-submitter amounts (USD 78.55 / 278.10 / 190.94 /
   189.64 / 173.51 / 206.14). Home health payment update percentage **2.4%**;
   permanent adjustment **-1.023%**; temporary adjustment **-3.0%**; neither
   applies to LUPA per-visit rates. FDL set so outlier payments do not exceed 2.5%
   of aggregate payments. LUPA thresholds set at the 10th percentile of visits for
   each PDGM payment group, reevaluated annually, recalculated on CY2024 claims.
   **Regulatory impact: net transfer -USD 220 million, -1.3 percent** = +2.4%
   update (+USD 405 m), -0.9% permanent adjustment (-USD 150 m), -2.7% temporary
   adjustment (-USD 460 m), -0.1% FDL (-USD 15 m); the -0.9% and -2.7% differ from
   the -1.023% and -3.0% because the adjustments do not apply to LUPA periods.
   Smaller HHAs (<100 periods) -2.0%, larger (>1,000 periods) -1.1%, Pacific
   region -2.4%. Also finalises changes to the face-to-face encounter policy at
   42 CFR 424.22(a)(1)(v), HH QRP measure and item removals, a revised HHCAHPS
   survey from the April 2026 sample month, and a ninth HHVBP measure-removal
   factor with changes to the applicable measure set and weights.
4. CMS, Small Entity Compliance Guide for CMS-1828-F.
   https://www.cms.gov/files/document/cms-1828-f.pdf
   — gives the rule's full Federal Register range as 90 FR 55342-55620 and
   restates the ~USD 220 million (1.3%) decrease.
5. CMS Office of the Actuary / *Health Affairs*, "National Health Care Spending
   Increased 7.2 Percent In 2024 As Utilization Remained Elevated", January 2026
   (National Health Expenditure Accounts).
   https://www.healthaffairs.org/doi/10.1377/hlthaff.2025.01683
   — Exhibit 2, national health expenditures by type of service: **home health
   care USD 153.6 bn in 2023 and USD 169.4 bn in 2024, +10.2% in 2024 after
   +11.1% in 2023**; the preceding years in the same row are 106.6, 113.9, 126.2,
   127.4, 138.2. The growth-rate exhibit independently gives 10.2 and 11.1 for
   the same row, and both reproduce from the level series
   (153.6 -> 169.4 = +10.29%; 138.2 -> 153.6 = +11.14%), which is how the row was
   identified: the published PDF's table labels are offset by one line in text
   extraction. Nursing care facilities and CCRCs in the same exhibit are
   USD 205.0 bn (2023) and USD 219.9 bn (2024), matching the figure used in the
   skilled-nursing report from the same source, which corroborates the extraction.
   Total national health spending USD 5.3 trn, +7.2%, 18.0% of GDP. Home health
   care is also noted as one of the Medicaid long-term care categories that
   continued to grow strongly in 2023 and 2024 while other Medicaid services
   slowed.
6. Enhabit, Inc., Form 10-K for the year ended 31 December 2025.
   https://www.sec.gov/Archives/edgar/data/1803737/000180373726000018/ehab-20251231.htm
   — **249 home health locations in 33 states and 117 hospice locations in 25
   states** at 31 December 2025, across 34 states in total. Net service revenue
   about **USD 1,060.0 m** (+2.4% on USD 1,034.8 m in 2024), of which **home
   health USD 813.8 m (76.8%)** and hospice USD 246.2 m (23.2%); hospice revenue
   +17.2% and home health segment revenue -1.3%. Payor mix: Medicare **65.8%**,
   Medicare Advantage 23.9%, managed care 9.1%, Medicaid 0.8%, other 0.4% —
   Medicare plus Medicare Advantage **89.7%**. About 38% of 2025 home health
   admissions from physician offices or other community sources, 62% from
   facility-based sources. Gross margin excluding D&A USD 519.8 m; goodwill
   impairment USD 44.7 m (from USD 161.7 m in 2024). Describes the home health and
   hospice industries as "large, growing, and highly fragmented" and cites about
   **12,200 home health agencies** and about 7,000 hospice agencies nationwide in
   2025; states it is the largest publicly traded standalone home health and
   hospice organisation in the country.
7. United States Department of Justice settlement in *United States v.
   UnitedHealth Group Inc. and Amedisys, Inc.*, agreed 7 August 2025, merger
   closed 14 August 2025 at USD 101 per share / about USD 3.3 bn, consent decree
   finalised by the district court in December 2025.
   https://www.paulweiss.com/insights/client-news/amedisys-completes-sale-to-unitedhealth-group-s-optum
   https://www.fiercehealthcare.com/payers/unitedhealth-amedisys-sell-facilities-settlement-doj
   — requires divestiture of **at least 164 home health and hospice locations
   representing approximately USD 528 million in annual revenue across 19 states**,
   plus eight more if approval of the divestiture package is not obtained. Buyers:
   The Pennant Group and BrightSpring Health Services. Pennant completed a
   **USD 146.5 m** purchase of 54 home health, hospice and personal care agencies
   across three states (also recorded in source 1). DOJ had sued to block the
   merger in November 2024. Optum had previously acquired LHC Group in 2023
   (source 1).
8. Aveanna Healthcare Holdings, Inc., Form 10-K for the 53 weeks ended 3 January
   2026.
   https://www.sec.gov/Archives/edgar/data/1832332/000119312526115851/avah-20260103.htm
   — consolidated revenue **USD 2,433.199 m**, of which Private Duty Services
   **USD 2,001.147 m**, Home Health & Hospice **USD 248.557 m** and Medical
   Solutions USD 183.495 m. Reimbursement sources across 38 states; about 300
   leased offices and medical sites; about 32,000 employees. Private duty nursing
   is reimbursed mainly by Medicaid fee-for-service and Medicaid managed care,
   while adult home health and hospice are "primarily reimbursed by Medicare and
   Medicare Advantage plans". Describes the home health market as "highly
   competitive and fragmented" and cites MedPAC for "over 12,000 Medicare-certified
   home health agencies in the United States in 2025".
9. Grand View Research, "Home Healthcare Market Size, Growth Report, 2026-2033",
   report ID 978-1-68038-010-1, published June 2026, page states last updated
   September 2026, 220 pages.
   https://www.grandviewresearch.com/industry-analysis/home-healthcare-industry
   — **USD 485.3 bn (2025), USD 504.8 bn (2026) to USD 1,015.8 bn (2033) at a
   stated 10.5% for 2026-2033**; endpoints imply 10.5056%. Actual data 2021-2025.
   **North America 42.3% of revenue in 2025**; Asia Pacific fastest growing.
   Component (Equipment, Services — **Services 83.9% of 2025 revenue**),
   Indication (neurological and mental disorders largest at 16.8% in 2025),
   Region. Named companies: B. Braun Melsungen, Abbott, Sunrise Medical, 3M
   Healthcare, Baxter International, Medtronic, Cardinal Health, F. Hoffmann-La
   Roche, Air Liquide, Amedisys, NxStage Medical (Fresenius Medical Care), Arkray,
   Becton Dickinson, Omron Healthcare, Drive DeVilbiss Healthcare, GE Healthcare,
   Medline Industries, Koninklijke Philips, Johnson & Johnson Services, Linde
   Healthcare, Acelity (3M), Vygon, Teleflex, Moog, Intersurgical, Fresenius Kabi,
   Bayer HealthCare, GF Health Products.
10. Coherent Market Insights, "Home Healthcare Market Size, Trends & Forecast,
    2026-2033", market insight 840, published 1 April 2026.
    https://www.coherentmarketinsights.com/market-insight/home-healthcare-market-840
    — **USD 473.10 bn (2026) to USD 848.31 bn (2033) at 8.7%**; endpoints imply
    8.700%. Base year 2025, no 2025 value published. **North America 40.7% in
    2026**; product segment 51.6%; cardiovascular disorder and hypertension
    indication 26.12%. Definition names infusion therapy, respiratory therapy,
    **unskilled home healthcare**, rehabilitation, telehealth and telemedicine as
    services, and blood sugar monitors, mobility aids, pregnancy test kits and BP
    monitors as devices.
11. Fortune Business Insights, "Home Healthcare Market Size, Share & Growth
    Report, 2034", report FBI101030, page states last updated 28 September 2026.
    https://www.fortunebusinessinsights.com/industry-reports/home-healthcare-market-101030
    — **USD 404.26 bn (2025), USD 432.01 bn (2026) to USD 1,015.51 bn (2034) at
    11.28%** for 2026-2034; endpoints imply 11.275%. Historical 2021-2024. **North
    America 42.71% / USD 172.64 bn in 2025.** Type (Services, Products),
    Therapeutic Area, Payor (Private, Public), Region.
12. Precedence Research, "Home Healthcare Market Size to Hit USD 1,556.59 Billion
    by 2035", page states last updated 9 September 2026.
    https://www.precedenceresearch.com/home-healthcare-market
    — **USD 487.2 bn (2025), USD 566.22 bn (2026) to USD 1,556.59 bn (2035) at a
    stated 12.32% for 2026-2035**; the 2025-2035 endpoints imply 12.317% and the
    2026-2035 endpoints imply 11.892%, so the stated rate is a 2025-base rate
    labelled as 2026-base. North America 50.21% in 2025. **US: USD 222.61 bn
    (2025) to USD 692.30 bn (2035) at 12.01%.** Type (Device, Services) with
    unskilled homecare inside Services. The page's own device and service tables
    print values such as "USD 27,697.3 billion" against a USD 487.2 bn total, and
    its home mobility share is 37.91% in one section and 40.26% in another.
13. Persistence Market Research, "Home Healthcare Market Size, Share & Future
    Scope, 2033", January 2026.
    https://www.persistencemarketresearch.com/market-research/home-healthcare-market.asp
    — **USD 580.8 bn (2026E) to USD 954.0 bn (2033) at a stated 7.8%**; endpoints
    imply **7.347%**, so the stated rate and stated endpoints do not reconcile.
    Historical CAGR 2020-2025 given as 6.2%. North America 48.8% in 2026; Asia
    Pacific CAGR ~10.6%. Product, Service (skilled nursing, rehabilitation
    therapy, respiratory therapy, infusion therapy, **pregnancy care**),
    Indication, Region.
14. Verified Market Research, "Home Health Care Services Market", report 49479,
    May 2025.
    https://www.verifiedmarketresearch.com/product/home-health-care-services-market/
    — **USD 390.24 bn (2024) to USD 720.17 bn (2032)**, stated 7.96% "from 2026 to
    2032"; the 2024-2032 endpoints imply exactly 7.96%, so the stated period is
    mislabelled. Service Type (physical therapy, occupational therapy, home health
    aide services), End User, Geography. The page's own chart image prints the 2032
    figure as "US$ 720.17 Mn" against "Billion" in the text.
15. Towards Healthcare, "US Home Healthcare Market Trends for 2026", page states
    last updated 20 July 2026.
    https://www.towardshealthcare.com/insights/us-home-healthcare-market-sizing
    — **United States only: USD 56.93 bn (2025 est.), USD 61.48 bn (2026) to
    USD 122.91 bn (2035) at 8%**; endpoints imply 8.001%. Base year 2025,
    historical 2020-2023. Component, Indication, Service Type, Payer, Delivery
    Mode.
16. Data Bridge Market Research, "Global Home Healthcare Market".
    https://www.databridgemarketresearch.com/reports/global-home-healthcare-market
    — **USD 117.67 bn (2024) to USD 232.76 bn (2032) at 8.90%**; endpoints imply
    8.901%. **Not verified on the publisher's own page**: the report URL and the
    syndicated release carrying the derived "USD 139.54 bn in 2026" both returned
    HTTP 403 to this research pass, and every reachable copy is an SEO repost.
    Earlier Data Bridge-attributed series: USD 108.06 bn (2023) to USD 213.74 bn
    (2031) and USD 99,236.66 m (2022) to USD 196,288.64 m (2030), both also at
    8.90%. Recorded for completeness and excluded from the published spread.
17. Consolidated Appropriations Act, 2026 (signed February 2026) — extended the
    Acute Hospital Care at Home waiver through 30 September 2030 and decoupled its
    statutory authority from government-funding deadlines. Cited here only to fix
    the boundary against the `hospital-at-home-market` report; no AHCAH figure
    enters this report's market size.
    https://senahealth.com/press-industry-news/hospital-at-home-waiver-2030/
    (secondary; the waiver's own register and hospital counts belong to the
    hospital-at-home report, not this one)
18. Auditor of the State of California, 2022 report on hospice agency growth in
    Los Angeles County, and Braff Group (2024) on investor purchases of HHAs —
    both cited at second hand, through source 1.

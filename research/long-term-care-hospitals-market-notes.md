# Long-Term Care Hospitals — research notes
**Slug:** long-term-care-hospitals-market   **Drafted:** 2026-10-18

Pipeline row 53, round 7A. Industry: Healthcare IT.

A long-term care hospital is not a general category of healthcare facility. It is
a Medicare payment class, defined by US statute and regulation: a hospital that
meets the acute care conditions of participation and maintains an average length
of stay greater than 25 days for its qualifying Medicare cases. The register is
tiny — **approximately 336 facilities**, a count CMS prints in the Federal
Register — and the payment rate is a published legal fact. Almost every number
that matters here is a federal measurement rather than an estimate, which is
fortunate, because the published market-research literature on this market is
the weakest encountered in this corpus and the registers are the only thing
holding it to account.

The headline finding is that this is a **small and measurably shrinking**
market, and that the shrinkage was caused on purpose by a 2013 statute. It is
reported that way below, with the arithmetic.

## Published estimates (what others say)

| Source | Published | Base year | Base value | Forecast year | Forecast value | CAGR | Scope as stated |
|---|---|---|---|---|---|---|---|
| Dataintelo (report HC-202080) | page undated; "Updated: May 2026", research through Q4 2025 | 2025 | USD 22.5 bn | 2034 | USD 34.8 bn | 5.2% stated (2026-2034); endpoints imply **4.9649%** | Global. "Specialized care for patients needing extended hospitalization and intensive monitoring beyond traditional acute care settings, often called LTACs or specialty hospitals." Service type (inpatient, outpatient); condition (respiratory failure, traumatic brain injury, multiple organ failure, other); end-user (hospitals, specialty clinics, long-term care facilities, other); five regions. Historical 2019-2025, with 2019 = USD 16.8 bn and 2022 = USD 19.2 bn. |
| Reanin (report Rn160052364) | published Sep 2026, updated Oct 2026 | 2025 | USD 1.32 bn | 2032 | USD 1.94 bn | 5.7% stated; endpoints imply **5.6549%** | Global. Service (inpatient, outpatient); facility (hospitals, specialty clinics, rehabilitation centres, home healthcare); five regions; a "by patient" (adult/paediatric) dimension appears in the table of contents only. No formal definition published. Overview is in "USD Billion", segment tables are labelled "USD Million". |
| Global Market Insights (GMI5203), US post-acute care | Jan 2026 | 2025 | USD 490.6 bn (whole post-acute market, not LTCH) | 2035 | USD 898.5 bn | 6.4% (2026-2035) for the whole market; **LTCH segment 7.4%** | United States. LTCH is one of six service segments (SNF, home health, LTCH, hospice, IRF, other). **No dollar value for the LTCH segment is published** — only the segment CAGR. |
| Kentley Insights via Research and Markets (report 6224051), "Acute Long-Term Care Services Global Market" | Oct 2026 edition | historical 2014-2025 | not published | 2026 + "next 5 years" | not published | not published | Global; 4 regions, 22 subregions, 195 countries. Sales channels: specialty (except psychiatric and substance abuse) hospitals, general medical and surgical hospitals, psychiatric and substance abuse hospitals. A real, dated, purchasable sizing whose figures are entirely behind the paywall. |
| IBISWorld, "Specialty Hospitals in the US" (industry 1591) | Mar 2026 release | 2025/2026 (page states both) | USD 66.8 bn | — | — | 1.7% historical CAGR; +0.5% in 2025 | United States. Described as an industry in which "specialty hospitals primarily provide long-term care for the chronically ill". **381 businesses**, grown at a 4.8% CAGR 2021-2026. An adjacency, not an LTCH sizing. |
| Market Report Analytics, "Long-Term Acute Care" | 2025-2033 series | 2025 | USD 50 bn (as reported by the search index) | 2033 | ~USD 80 bn | 6% | Global. **Could not be verified: the publisher page returns HTTP 403.** Its named companies (Johnson & Johnson, Medtronic, Baxter) and product segments indicate it is sizing medical devices, not hospital services. Excluded from every multiple below. |

Editions move and the houses are inconsistent on their own pages. Reanin's
"Recent Developments" entries are dated October 2022 against a stated September
2026 publication date; Dataintelo's regional shares do not sum against its own
dollar values (Asia Pacific is given as 18.4% but USD 4.1 bn of USD 22.5 bn is
18.2%), and its FAQ describes the same percentages as shares of *admissions*
rather than of value. Any LTCH figure quoted without an edition date and a
publisher name is unusable.

## The spread

**Among the two verifiable, hospital-scope global estimates: 17.0x at the base
year.** Dataintelo's USD 22.5 bn and Reanin's USD 1.32 bn are both global, both
2025, both nominally "long-term acute care", and differ by

```
22.5 / 1.32 = 17.05x
```

If the unverified Market Report Analytics figure were admitted, the spread would
be `50 / 1.32 = 37.9x`. It is not admitted, because the page could not be read
and its competitive set is device manufacturers.

**On growth there is near-agreement: 5.2% against 5.7%, a 1.10x spread.** This
is the mirror image of the usual pattern. The houses agree almost exactly on the
rate and disagree by more than an order of magnitude on the level. That is a
definition failure so large that it cannot be described as a scope *decision* —
one of the two numbers is simply wrong, and the register below says which.

**The decisive comparison is not between the houses, it is against the
register.** US Medicare fee-for-service spent **USD 2.4 billion** on LTCH care
in FY2024 (MedPAC). Reanin's entire *global* market, one year later, is **0.55x
that single payer in that single country**:

```
1.32 / 2.4 = 0.55
```

Against the implied US all-payer figure derived below (USD 6.6-8.0 bn),
Reanin's global total is `1.32 / 6.64 = 0.20x`. A global market cannot be
one-fifth of one country's revenue in it. Reanin is ruled out absolutely, not
on judgement but on arithmetic.

Dataintelo survives at the North America level and fails at the global one. Its
published North America figure is USD 10.2 bn for 2025:

```
10.2 / 6.64 = 1.54x   (against US all-payer derived at the FFS payment rate)
10.2 / 8.01 = 1.27x   (against US all-payer derived from operator disclosure)
```

Either multiple is defensible for a North America that also contains Canada and
a measurement year one behind. Its **global** total of USD 22.5 bn, however,
leaves USD 12.3 bn outside North America for a facility class that exists as a
payment category only because of the Pathway for SGR Reform Act of 2013 and
42 CFR 412 subpart O. That is the scope statement, and it is the reason the
report publishes Dataintelo's series while telling readers in plain terms what
it is.

## Grounding arithmetic

### (a) Realised Medicare payment per stay against the statutory rate

The LTCH standard federal payment rate is set by regulation and published
annually, so the unit price of the service is a legal fact.

- FY2024: **$48,116.62**
- FY2025: **$49,383.26**
- FY2026: **$50,824.51** (FY2026 IPPS/LTCH PPS final rule, 90 FR, 4 August 2025;
  a 2.7 percent annual update; labor-related share 72.9 percent; high-cost
  outlier fixed-loss amount $78,936)
- FY2027: **$52,132.76** (MedPAC payment basics, October 2026; labor share 73.0
  percent)

MedPAC reports that in FY2024 the FFS Medicare program and its beneficiaries
spent **$2.4 billion on 47,000 inpatient stays at about 330 LTCHs**.

```
$2,400,000,000 / 47,000 stays = $51,063.83 realised payment per stay, FY2024

$51,063.83 / $48,116.62 (FY2024 standard federal rate)  = 1.0613
$51,063.83 / $50,824.51 (FY2026 standard federal rate)  = 1.0047
```

**What it rules in:** the USD 2.4 bn figure is the right magnitude for the thing
it claims to measure. A realised payment per stay 6.1% above the unadjusted
FY2024 standard federal rate is what you would expect when case mix and the
urban wage index push payments up, high-cost outliers add about 8% of aggregate
standard-rate dollars, and the roughly 9% of cases paid the site-neutral rate
(section (c)) pull them back down. If the division had produced $5,000 or
$500,000, one of the two series would be wrong. The spending figure includes
beneficiary cost sharing, so this is a payment-per-stay test and not a
program-outlay test.

**CMS's own projection agrees from a different instrument.** The FY2026 final
rule estimates aggregate FY2026 LTCH PPS payments at **$2.583 billion** against
estimated aggregate FY2025 payments of **$2.500 billion**, an increase of about
$83 million or 3.3 percent, for the 329 LTCHs in its impact database.

```
$2.583 bn / $2.4 bn = 1.076 over two fiscal years = 3.74% per year
```

A claims-and-cost-report measurement for FY2024 and a regulatory payment
projection for FY2026 differ by exactly what two annual rate updates would
produce. The register is internally consistent.

### (b) Implied US all-payer LTCH revenue, two ways

CMS prints an all-payer admission count in its FY2026 rule's burden estimate,
because the LTCH Continuity Assessment Record and Evaluation data set is
completed for every patient regardless of payer: **130,050 total admissions
from 330 LTCHs**, using FY2024 data.

```
47,000 FFS Medicare stays / 130,050 total admissions = 36.14%
```

**Fee-for-service Medicare is only about 36% of LTCH admissions.** That single
division is the most important number in this file, because every market
estimate implicitly claims to cover all payers while the only reliable spending
measurement covers barely a third of the volume. The other 64% is Medicare
Advantage — now the majority of Medicare enrolment — plus Medicaid managed care
and commercial insurance, exactly the payer mix ScionHealth describes.

**Way 1 — grossing the register up at its own realised rate:**

```
130,050 admissions x $51,063.83 per stay = $6.64 billion
```

This is a floor, because it prices non-Medicare admissions at the Medicare rate.

**Way 2 — from operator disclosure.** Select Medical's critical illness recovery
hospital segment, FY2025: revenue **$2,477.8 million** from **104 hospitals** in
28 states, **1,107,387 patient days**, revenue per patient day **$2,230**,
occupancy **69%** (68% in 2024), segment Adjusted EBITDA $265.4 million.

```
$2,477.8 m / 104 hospitals = $23.825 m per hospital per year (all payers)
$23.825 m x 336 LTCHs      = $8.01 billion implied US all-payer LTCH revenue
$23.825 m x 330 LTCHs      = $7.86 billion on MedPAC's facility count
```

The two ways bracket the answer at **USD 6.6-8.0 billion**, and the gap between
them is itself informative: the ratio `$8.01 bn / $6.64 bn = 1.21` is the
premium non-Medicare payers pay over the Medicare rate, and it matches the
per-day comparison independently:

```
47,000 stays x 27.6 days average length of stay = 1,297,200 FFS Medicare days
$2,400,000,000 / 1,297,200 days = $1,850.14 per day, FFS Medicare
$2,230 (Select, all payers, 2025) / $1,850.14 = 1.21
```

Two routes to 1.21 from different inputs. Dataintelo's own page, separately,
states LTAC rates of "$1,500-2,200 per day", which brackets both figures — the
one place that house's prose is corroborated by a federal measurement.

**Caveat stated plainly:** Way 2 assumes Select's hospitals are of average size,
and they are probably not. Select's 104 hospitals produced 1,107,387 patient days
against a national FFS Medicare total of 1,297,200 — 85.4% of the entire national
fee-for-service day count from 31% of the facilities — which is only possible
because most of Select's book is not fee-for-service Medicare. Mixed years
(FY2024 register, FY2025 and calendar-2025 disclosures) are not corrected for.
The USD 6.6-8.0 bn range is a plausibility bracket, not a market estimate.

### (c) What the dual rate did: the structural measurement

The Pathway for SGR Reform Act of 2013 split LTCH payment in two from fiscal
year 2016. A stay is paid the standard federal rate only if it immediately
follows an acute care hospital stay that included three or more days in an
intensive care unit, **or** the LTCH stay includes mechanical ventilation for at
least 96 hours. Everything else is paid the **site-neutral rate**: the lower of
Medicare's IPPS rate for that stay or 100 percent of the cost of the stay. A
four-year blended transition ran 2016-2019; full site-neutral rates were due in
2020 and were temporarily waived during the coronavirus public health emergency.
Since cost-reporting periods beginning on or after 1 October 2019 a facility must
also maintain a discharge payment percentage of at least 50 percent — the ratio
of its FFS discharges that qualify for the LTCH PPS rate to its total Medicare
discharges — or be paid under the IPPS until it recovers.

The published prices of the two rates, from MedPAC's own table:

```
2019: qualifying $46,800 per case   nonqualifying $25,738   ratio 0.55
2020: qualifying $49,835 per case   nonqualifying $32,401   ratio 0.65
```

**The effect was not that LTCHs absorbed a lower price. It was that the
site-neutral population left the setting.** MedPAC's Table 10-3 gives 23,160
nonqualifying and 67,987 qualifying cases in 2019, with average annual changes
of -24.2% and -2.0% respectively over 2016-2019. Reversing those rates:

```
nonqualifying 2016 = 23,160 / 0.758^3 = 53,178
qualifying   2016 = 67,987 / 0.980^3 = 72,235
total                                 = 125,413
```

MedPAC's March 2018 chapter reports **125,586** cases for 2016 from a different
table. The back-derivation reproduces it to within 0.14%, which is what makes
the split below usable rather than a guess:

```
site-neutral-eligible share of cases
  2016 (derived) : 53,178 / 125,413 = 42.4%
  2019 (reported): 23,160 /  91,147 = 25.4%
  2020 (reported): 18,702 /  77,603 = 24.1%
  FY2024 (CMS)   : "approximately 9 percent of those cases were classified as
                    site neutral payment rate cases"
  FY2026 (CMS)   : site-neutral cases = 4.1% of total LTCH PPS payments
```

```
53,178 - 23,160 = 30,018 nonqualifying cases lost, 2016-2019 = -56.4%
125,586 - 91,147 = 34,439 total cases lost over the same three years
30,018 / 34,439 = 87.2%
```

**Seven-eighths of the volume the LTCH sector lost between 2016 and 2019 was the
population the dual rate was designed to price out, and it was priced out of the
setting rather than onto a lower rate.** By FY2024 that population is 9% of
cases; by FY2026 it is 4.1% of dollars. The policy worked, completely, and the
market contracted by the amount of the population it removed.

### (d) The register's own trend, against the published CAGRs

Spending (FFS Medicare program and beneficiaries), cases, and facilities, each
from a MedPAC publication for its year:

| Year | FFS spending | Cases | LTCHs | Payment per case |
|---|---|---|---|---|
| 2012 | $5.5 bn | 140,463 | 426 (valid cost reports) | $39,493 |
| 2016 | $5.1 bn | 125,586 | 407 | $40,656 |
| 2018 | $4.2 bn | ~102,000 | 374 | — |
| 2019 | — | 91,147 | — | $41,448 |
| 2020 | $3.4 bn | 77,603 | — | $45,634 |
| FY2024 | $2.4 bn | 47,000 | ~330 (CMS: ~336 currently) | $51,064 (derived) |

```
spending     $5.1 bn -> $2.4 bn over 8 years  = -8.99% per year
cases        125,586 -> 47,000 over 8 years   = -11.56% per year
facilities   407     -> 336 over 8 years      = -2.37% per year
payment/case $40,656 -> $51,064 over 8 years  = +2.89% per year
spending     $5.5 bn -> $2.4 bn over 12 years = -6.68% per year
```

**Price per case is rising at roughly the rate the statute updates it, and
everything else is falling faster.** Beneficiaries served fell from 111,000
(2016) to 71,000 (2020); cases per 10,000 FFS beneficiaries fell from 32.7 (2016)
to 23.8 (2019) to 20.9 (2020). Average LTCH occupancy was 63% in 2018 and 2019
and 65% in 2020; Select Medical's own segment occupancy was 69% in 2025 and 68%
in 2024. MedPAC's March 2026 post-acute care chapter **excludes LTCHs
altogether**, in a footnote: "Because there are few providers and beneficiaries
who use this service, we have not included LTCHs in this chapter." The federal
advisory body that publishes the only reliable sizing of this setting has
stopped giving it a chapter.

A register that has lost more than half its spending, nearly two-thirds of its
cases and a sixth of its facilities in eight years does not support 5.2% compound
growth. That contradiction is the report's central finding and it is stated on
the page rather than smoothed over.

### (e) The adjacency test: is "specialty hospitals" an LTCH proxy?

IBISWorld's Specialty Hospitals industry is the nearest US industry statistic,
at USD 66.8 bn and 381 businesses.

```
$66.8 bn / 381 businesses = $175.3 m per business
$66.8 bn / 336 LTCHs      = $198.8 m per LTCH-equivalent
$175.3 m / $23.825 m (Select, per LTCH, all payers) = 7.36x
```

**It is not a proxy.** A category whose average member earns 7.4x what the
largest LTCH operator earns per hospital is counting psychiatric, rehabilitation,
cancer, cardiac and children's hospitals alongside LTCHs. The business count
being close to the LTCH count (381 against 336) is a coincidence of enterprise
counting and should not be used to bridge the two. The same applies to GMI's US
post-acute care market at USD 490.6 bn for 2025, which is 8.5x MedPAC's entire
USD 57.7 bn of FY2024 FFS Medicare post-acute spending: GMI's 7.4% LTCH segment
CAGR is cited in the report, but its parent total is an all-payer figure on a
much wider boundary and no dollar value for its LTCH segment is published.

### (f) Concentration, without a share table

```
Select Medical:  104 critical illness recovery hospitals, 28 states (31 Dec 2025)
ScionHealth:      65 LTCHs, 20 states (AHA case study, December 2025)
                 ---
                 169 of approximately 336 LTCHs = 50.3% of the national register
```

Two operators hold half the facilities in the register. That is a *facility*
count from two named, dated disclosures against a federal count — it is not a
revenue share, and no revenue share is published by anyone. It is reported as
what it is.

## What we publish

**Headline: USD 23.62 bn (2026) -> USD 34.80 bn (2034) at 4.96%.** This is
Dataintelo's own global long-term acute care series — USD 22.5 bn for 2025 and
USD 34.8 bn for 2034 — with the 2025 figure advanced one year at the rate
Dataintelo's own two endpoints imply:

```
(34.8 / 22.5)^(1/9) - 1 = 4.9649%
22.5 x 1.049649         = 23.617 -> 23.62   (2026, interpolated)
(34.80 / 23.62)^(1/8) - 1 = 4.9633%  -> published as 4.96%
```

The 2026 base year is **interpolation on the publisher's own curve, not a
published observation**, and the report says so in `forecast_analysis` and in a
FAQ. The CAGR published is 4.96% and not Dataintelo's stated 5.2%, because 5.2%
does not reconcile with Dataintelo's own endpoints (it implies USD 35.5 bn for
2034, not USD 34.8 bn). The endpoints are the publisher's; the rate is the rate
those endpoints actually describe. That is stated too.

Dataintelo was chosen over Reanin for one reason only: Reanin's global total is
0.20x the United States alone on this research's own grounding, which the
register rules out absolutely, while Dataintelo's published North America figure
sits within 1.27-1.54x of it. Choosing between two weak houses on an
order-of-magnitude test against a federal measurement is the most that can
honestly be done here, and the report says that in those words.

**Published with the contradiction stated, not hidden.** The chosen series grows
at 4.96% while the only measured series for its largest component — US FFS
Medicare LTCH spending — fell 8.99% per year over 2016-2024. Both numbers are on
the page with their arithmetic. A reader working to the US Medicare benefit
should anchor on USD 2.4 bn (FY2024) and USD 2.583 bn (CMS's FY2026 projection);
a reader working to US all-payer LTCH revenue should anchor on the USD 6.6-8.0 bn
bracket in section (b); only a reader who accepts a global all-payer
"long-term acute care" boundary that extends well beyond the US statutory
facility class should use the headline at all.

`market_forecast` interpolates geometrically at 4.9633% across nine points:
23.62, 24.79, 26.02, 27.31, 28.67, 30.09, 31.59, 33.15, 34.80. Only the last is
a published observation. The chart title says so.

Everything else published in the JSON is a federal measurement, a regulatory
figure or an SEC/association disclosure, each traceable to a numbered source
below: the facility counts, payment rates, outlier thresholds, site-neutral
shares and aggregate payment projections from the Federal Register; the
spending, case, beneficiary, occupancy and per-case series from MedPAC; the
operator figures from Select Medical's filings and the AHA's ScionHealth case
study.

## Do not publish

- **`regional_analysis`: empty.** Dataintelo publishes a five-region table with
  shares and dollar values, and it is not usable: the shares do not reconcile
  against its own dollars (Asia Pacific stated at 18.4% where USD 4.1 bn of
  USD 22.5 bn is 18.2%), its own FAQ describes the same percentages as shares of
  *admissions* rather than of value, and its North America share of 45.3% is
  numerically identical to the figure another house publishes for a different
  post-acute market, which is not evidence of copying but is not evidence of
  measurement either. The only regional statement this research can defend —
  that the LTCH facility class is a United States payment construct and that a
  global total therefore cannot be two to three times the US figure — is prose,
  not a table. Reanin publishes no regional dollars at all, only "more than 55%"
  for North America and Europe combined, untied to any value.
- **`country_analysis`: empty.** Same reason, more strongly. The US figures here
  are Medicare program totals and a federal certification count, not a country
  row inside a coherent global model. Presenting them as one would imply a
  global model that does not exist in public for this facility class.
- **`recent_developments`: empty.** The verifiable 2025-2026 events are
  regulatory — the FY2026 final rule's 2.7% update and $50,824.51 rate, the
  ending of the CARES Act site-neutral waiver, the FY2027 rate of $52,132.76 —
  and they are carried in `regulatory_landscape` where they belong. The
  corporate record is thin: Select Medical's segment disclosures are financial
  results rather than events, ScionHealth is private, and the trade-press
  account of individual LTCH closures could not be verified facility by facility
  against the CMS register from public sources.
- **No `market_share` anywhere.** No house publishes vendor share for LTCHs, and
  the register forbids inventing it. Section (f) gives a facility count — 169 of
  approximately 336 — from two dated disclosures, which is a different claim and
  is labelled as one. Select Medical's USD 2,477.8 m segment revenue against an
  implied USD 6.6-8.0 bn US all-payer total would imply 31-38%, but that
  calculation is circular because the denominator was partly derived from
  Select's own per-hospital revenue. It is therefore not published.
- **Reanin's USD 1.32 bn (2025) -> USD 1.94 bn (2032) at 5.7% as a headline.**
  Recorded in the table above with its endpoint-implied 5.6549%, and cited in the
  report as the low end of the published spread, but not published as a market
  size: a global total 0.55x one country's single-payer spending and 0.20x that
  country's implied all-payer revenue is ruled out by federal measurement.
- **Market Report Analytics' USD 50 bn (2025) -> ~USD 80 bn (2033) at 6%.** The
  publisher page returns HTTP 403 and the figures could not be verified on any
  publisher-controlled page. Its named companies are device manufacturers. It is
  excluded from the spread multiple and from the report, and noted here only as
  evidence of how wide the unverifiable end of this literature is.
- **The Kentley Insights / Research and Markets series.** A real, dated,
  purchasable global sizing of "acute long-term care services" whose base value,
  forecast value and CAGR are entirely behind a USD 295 paywall. Cited in the
  report as existing; no figure is attributed to it, because none is public.
- **GMI's LTCH segment as a dollar value.** GMI publishes a 7.4% CAGR for its US
  LTCH segment and no dollar value for it. The CAGR is cited with its scope; no
  level is inferred from the parent USD 490.6 bn, which is an all-payer
  post-acute total 8.5x MedPAC's FFS Medicare post-acute spending.
- **IBISWorld's USD 66.8 bn as an LTCH figure.** Section (e) shows it implies
  USD 175.3 m per business against Select Medical's USD 23.825 m per LTCH, a
  7.36x gap. Cited as an adjacency that fails the test, not as a sizing. The page
  is also internally inconsistent on whether the USD 66.8 bn is a 2025 or 2026
  figure.
- **Per-hospital, per-stay and per-day revenue as estimates.** Sections (a), (b),
  (d) and (e) are plausibility tests computed from published totals and published
  denominators. They establish what the published figures cannot mean. They are
  not market estimates and `data_validation` says so.
- **A negative CAGR as the headline.** The honest central tendency of the US
  register is contraction at roughly -9% per year in spending and -11.6% in
  cases. The schema cannot carry a negative compound rate, and inventing a
  positive one from the register would be worse. So the published headline is a
  named publisher's global series and the contraction is reported beside it,
  quantified, in the executive summary, the forecast analysis, the key
  highlights and two FAQs. A reader cannot take the headline without meeting the
  contradiction.
- **"LTCH patients make up just 2-4% of the overall Medicare population."**
  ScionHealth's own framing in an AHA case study. Plausible and uncited within
  that document; it is an industry statement about a denominator this research
  did not measure, so it is not published.
- **Any blending of "long term care" sizings into this market.** IMARC's global
  long-term care market at USD 1,138.5 bn (2024) and Towards Healthcare's US
  long-term care market at USD 503.42 bn (2025) size nursing homes, assisted
  living, home care and hospice. Against USD 2.4 bn of FFS Medicare LTCH
  spending, IMARC's figure is 474x. These are a different market with a similar
  name and are recorded here only so that nobody later mistakes one for the
  other.

## Sources

1. Medicare Payment Advisory Commission, *Long-term care hospitals payment
   system*, payment basics, revised October 2026; policies current as of 30
   September 2026.
   https://www.medpac.gov/wp-content/uploads/2026/10/MedPAC_Payment_Basics_26_LTCH_FINAL_SEC.pdf
   — "In fiscal year 2024, the fee-for-service Medicare program and its
   beneficiaries spent $2.4 billion on 47,000 inpatient stays at about 330
   LTCHs." FY2027 standard federal base rate $52,132.76; labor-related portion
   73.0 percent in 2027; high-cost outlier fixed loss $78,936 in 2027, funded by
   reducing standard-rate payments about 8 percent; site-neutral high-cost
   outlier threshold uses the IPPS fixed loss amount of $49,346, funded by a 5.1
   percent reduction to site-neutral payments. Qualifying criteria: immediately
   preceding acute stay with three or more ICU days, or mechanical ventilation
   for at least 96 hours; site-neutral rate is the lower of the IPPS rate or 100
   percent of the cost of the stay. Average length of stay greater than 25 days
   to qualify as an LTCH; discharge payment percentage of at least 50 percent for
   cost-reporting periods beginning on or after 1 October 2019. Inpatient
   deductible $1,736 and daily copayment $434 (61st-90th day) in calendar 2026;
   $868 per lifetime reserve day. FY2027 IPPS operating base update 2.3 percent.
2. CMS, *Medicare Program; Hospital Inpatient Prospective Payment Systems for
   Acute Care Hospitals and the Long-Term Care Hospital Prospective Payment
   System and Policy Changes and Fiscal Year 2026 Rates*, final rule
   (CMS-1833-F), issued 31 July 2025, published in the Federal Register 4 August
   2025. https://www.govinfo.gov/content/pkg/FR-2025-08-04/html/2025-14681.htm
   — "LTCH PPS standard Federal payment rate of $50,824.51"; 2.7 percent annual
   update; labor-related share for FY2026 of 72.9 percent; high-cost outlier
   fixed-loss amount $78,936. "There are 329 LTCHs included in this impact
   analysis. We note that, although there are currently **approximately 336
   LTCHs**, for purposes of this impact analysis, we excluded the data of
   all-inclusive rate providers." 17 rural LTCHs out of 327 in Table IV.
   "Based on the FY 2024 LTCH cases that were used for the analysis in this final
   rule, **approximately 9 percent of those cases were classified as site neutral
   payment rate cases** (that is, 9 percent of LTCH cases would not meet the
   statutory patient-level criteria for exclusion from the site neutral payment
   rate)." "We estimate payments to site neutral payment rate cases in FY 2026
   will represent **approximately 4.1 percent** of total estimated FY 2026 LTCH
   PPS payments." "We estimate that aggregate FY 2026 LTCH PPS payments will be
   **approximately $2.583 billion**, as compared to estimated aggregate FY 2025
   LTCH PPS payments of **approximately $2.500 billion**" — +$83 million or 3.3
   percent overall, of which +$73 million (3.0 percent) on standard-rate cases
   and +$10 million (10.0 percent) on site-neutral cases. LTCH QRP burden
   estimate, using FY2024 data: "a total of **130,050 admissions from 330 LTCHs**
   annually" and 6,503 expired assessments.
3. Medicare Payment Advisory Commission, *Report to the Congress: Medicare
   Payment Policy*, March 2022, Chapter 10, "Long-term care hospital services."
   https://www.medpac.gov/wp-content/uploads/2022/03/Mar22_MedPAC_ReportToCongress_Ch10_SEC.pdf
   — 2020: Medicare spent $3.4 billion; about 71,000 FFS beneficiaries had about
   77,600 LTCH stays. Table 10-3: all cases 91,147 (2019) and 77,603 (2020),
   -14.9%; nonqualifying 23,160 (2019) and 18,702 (2020), -13.4%, average annual
   change 2016-2019 of -24.2%; qualifying 67,987 (2019) and 58,901 (2020),
   average annual change 2016-2019 of -2.0%; share of qualifying cases 75% (2019)
   and 76% (2020); payment per case all $41,448 (2019) and $45,634 (2020),
   nonqualifying $25,738 and $32,401, qualifying $46,800 and $49,835; average
   length of stay all 26.8 days (2019) and 27.6 days (2020). Cases per 10,000 FFS
   beneficiaries 23.8 (2019), 20.9 (2020). In 2016 about 11 percent of LTCHs had
   more than 85 percent qualifying cases, against more than 47 percent in 2019
   and 47 percent in 2020; 44 percent of LTCHs billing every year 2016-2020 never
   reached the 85 percent threshold, just under half of them in Texas or
   Louisiana. Average LTCH occupancy 65 percent in 2020, similar to 2019; 63
   percent in 2018 and 2019. Medicare marginal profit about 18 percent across
   LTCHs in 2020 and 20 percent for high-qualifying-share LTCHs; Medicare
   aggregate margin 2.9 percent in 2019 for high-qualifying-share LTCHs and 6.9
   percent in 2020; all-payer margin 4 percent with relief funds and 2.7 percent
   without. Four-year blended transition 2016-2019; full site-neutral rates due
   2020, waived during the public health emergency.
4. Medicare Payment Advisory Commission, *Report to the Congress: Medicare
   Payment Policy*, March 2018, Chapter 11, "Long-term care hospital services."
   https://www.medpac.gov/wp-content/uploads/import_data/scrape_files/docs/default-source/reports/mar18_medpac_ch11_sec.pdf
   — "In 2016, Medicare spent $5.1 billion on care provided in LTCHs nationwide.
   About 111,000 fee-for-service (FFS) beneficiaries had roughly 126,000 LTCH
   stays in 407 LTCHs." FFS beneficiaries are about two-thirds of LTCH
   discharges. Table 11-2: cases 140,463 (2012), 137,827 (2013), 133,984 (2014),
   131,129 (2015), 125,586 (2016); spending $5.5 bn (2012), $5.5 bn (2013),
   $5.4 bn (2014), $5.3 bn (2015), $5.1 bn (2016); payment per case $39,493
   (2012) to $40,656 (2016); cases per 10,000 FFS beneficiaries 37.7 (2012) to
   32.7 (2016); users 123,652 (2012) to 111,171 (2016); average length of stay
   26.2 days (2012) to 26.8 days (2016). Table 11-1: hospitals with valid cost
   reports 426 (2012), 407 (2016). Moratoria on new LTCHs and beds ran 29
   December 2007 to 29 December 2012 and 1 April 2014 to 30 September 2017.
5. Medicare Payment Advisory Commission, *Report to the Congress: Medicare
   Payment Policy*, March 2020, Chapter 11, "Long-term care hospital services."
   https://medpac.gov/wp-content/uploads/import_data/scrape_files/docs/default-source/reports/mar20_medpac_ch11_sec.pdf
   — "In 2018, the 374 LTCHs that participated in the Medicare program provided
   about 102,000 LTCH stays to 92,000 Medicare fee-for-service (FFS)
   beneficiaries, and Medicare FFS spending on LTCH services was $4.2 billion."
   FFS beneficiaries about 60 percent of LTCH stays. The high-qualifying-share
   cohort was about 39 percent of LTCHs in 2018. LTCH Medicare margins peaked in
   2012 at 7.6 percent.
6. Medicare Payment Advisory Commission, *Report to the Congress: Medicare
   Payment Policy*, March 2026, Chapter 6, "Post-acute care: Trends and key
   issues."
   https://www.medpac.gov/wp-content/uploads/2026/03/Mar26_Ch6_MedPAC_Report_To_Congress_SEC.pdf
   — 2024 FFS Medicare post-acute spending $57.7 billion including $5.6 billion
   of beneficiary cost sharing: SNF $31 billion, home health $15.7 billion, IRF
   $11 billion. Endnote 1: "Some chronically critically ill beneficiaries receive
   care in long-term care hospitals (LTCHs). Because there are few providers and
   beneficiaries who use this service, we have not included LTCHs in this
   chapter."
7. Select Medical Holdings Corporation, Form 10-K for the year ended 31 December
   2025, and the 19 February 2026 fourth-quarter and full-year 2025 earnings
   release (Exhibit 99.1 to Form 8-K).
   https://www.sec.gov/Archives/edgar/data/1320414/000132041426000007/sem-20251231.htm
   https://www.sec.gov/Archives/edgar/data/1320414/000110465926017585/tm266741d1_ex99-1.htm
   — Critical illness recovery hospital segment, FY2025: revenue $2,477.8 million
   (from $2,444.2 million in 2024); 104 hospitals in 28 states at 31 December
   2025 (104 a year earlier); patient days 1,107,387 (1,118,757 in 2024);
   revenue per patient day $2,230 ($2,177); occupancy 69% (68%); segment Adjusted
   EBITDA $265.4 million ($301.6 million). Rehabilitation hospital segment
   revenue $1,289.0 million, +16.1%, 38 hospitals in 15 states. Total company
   revenue $5,452.8 million.
8. American Hospital Association, *Post-Acute Care (PAC) Case Study:
   ScionHealth U.S.*, December 2025.
   https://www.aha.org/system/files/media/file/2025/12/ScionHealth-Post-Acute-Care-Case-Study.pdf
   — "65 Long-Term Acute Care Hospitals (LTCHs) in 20 states", operating under
   the Kindred Hospitals, Cornerstone Specialty Hospitals and Solara Specialty
   Hospitals brands; patients covered by "all payers, including Traditional
   Medicare and Medicare Advantage (MA), Medicaid Managed Care, as well as
   commercial insurance." The document's claim that "LTCH patients make up just
   2-4% of the overall Medicare population" is an uncited industry statement and
   is not published. Industry-sponsored content on an association site.
9. Wisconsin Hospital Association, FY2025 LTCH final rule brief, and Iowa
   Hospital Association / Michigan Hospital Association FY2025 LTCH rule
   summaries, 2024.
   https://wha.org/WisconsinHospitalAssociation/media/WHACommon/Finance/PDFs/2025-LTCHfinalRuleBrief.pdf
   https://www.team-iha.org/getmedia/2857a529-dbc6-4164-8653-43a2b2bc8bc4/FFY-2025-Medicare-LTCH-FR-Rule-Summary.pdf
   — LTCH standard federal rate $48,116.62 (FY2024) to $49,383.26 (FY2025),
   +2.63%; FY2025 market basket +3.5% less a 0.5-point productivity adjustment,
   wage index budget neutrality factor 0.9964315. Used only for the FY2024 and
   FY2025 rate levels; these are transcriptions of the Federal Register by
   hospital associations, not the Federal Register itself.
10. American Hospital Association, "Long-Term Care Hospital PPS", FY2026 final
    rule bulletin, 2025. https://www.aha.org/node/2852
    — net LTCH payments +3.3% or $83 million in FY2026 relative to FY2025;
    standard-rate payments +3.0% or $73 million; site-neutral payments +10% or
    $10 million. Independently consistent with source 2, which is the primary
    text for all three figures.
11. Dataintelo, "Long-Term Acute Care Market", report HC-202080, page undated,
    marked "Updated: May 2026", research through Q4 2025, 257 pages.
    https://dataintelo.com/report/global-long-term-acute-care-market
    — USD 22.5 bn in 2025 to USD 34.8 bn in 2034 at a stated 5.2% for 2026-2034;
    the endpoints imply 4.9649%. Historical series shown as USD 16.8 bn (2019)
    and USD 19.2 bn (2022). Regional 2025: North America 45.3% / USD 10.2 bn /
    5.8%; Europe 26.8% / USD 6.0 bn; Asia Pacific 18.4% / USD 4.1 bn / 6.9%;
    Latin America 5.2% / 4.8%; Middle East and Africa 4.3% / 4.1%. Service type:
    inpatient USD 14.4 bn (64.2%), outpatient USD 8.1 bn (35.8%). Condition:
    respiratory failure USD 9.8 bn (43.6%), traumatic brain injury USD 5.4 bn
    (24.0%), multiple organ failure USD 4.2 bn (18.7%), other USD 3.1 bn (13.7%).
    The page states LTAC rates of "$1,500-2,200 per day". Its stated 5.2% implies
    USD 35.5 bn for 2034 rather than the published USD 34.8 bn; its Asia Pacific
    share of 18.4% is 18.2% on its own dollars; and its FAQ describes the segment
    percentages as shares of admissions rather than of value. See "Do not
    publish".
12. Reanin, "Long-Term Acute Care (LTAC) Market Size & Share Analysis", report
    Rn160052364, published September 2026, updated October 2026, 360 pages.
    https://www.reanin.com/reports/long-term-acute-care-market
    — "The Long-Term Acute Care market was valued at USD 1.32 billion in the year
    2025, and is expected to increase to USD 1.94 billion by the year 2032, while
    growing at a CAGR of 5.7%"; the endpoints imply 5.6549%. Study period
    2026-2032. North America and Europe together "more than 55%" of market
    penetration, untied to any value; no regional dollars published. The overview
    is labelled USD Billion while the segment tables are labelled USD Million.
13. Global Market Insights, "U.S. Post-Acute Care Market", report GMI5203,
    January 2026. https://www.gminsights.com/industry-analysis/u-s-post-acute-care-market
    — USD 490.6 bn in 2025, USD 513.9 bn in 2026, USD 898.5 bn in 2035, 6.4%
    CAGR 2026-2035. Segmented by service (SNF, home health agencies, LTCHs,
    hospice, IRFs, other), age group and condition, across US census regions and
    states. The LTCH segment "accounted for significant revenue in 2025" and is
    "anticipated to grow at a CAGR of 7.4% over the forecast period"; no dollar
    value for the LTCH segment is published.
14. Kentley Insights via Research and Markets, "2026 Acute Long-Term Care
    Services Global Market Size & Growth Report with Updated Country Recession
    Risk Forecasts", report 6224051, October 2026, 45 pages.
    https://www.researchandmarkets.com/reports/6224051/acute-long-term-care-services-global-market
    — historical 2014-2025, forecasts for 2026 and "the next 5 years"; 4 regions,
    22 subregions, 195 countries; sales channels given as specialty (except
    psychiatric and substance abuse) hospitals, general medical and surgical
    hospitals, and psychiatric and substance abuse hospitals. No base value,
    forecast value or CAGR is published on the page; single-user licence USD 295.
15. IBISWorld, "Specialty Hospitals in the US", industry 1591, March 2026
    release. https://www.ibisworld.com/united-states/market-size/specialty-hospitals/1591/
    — USD 66.8 bn; 1.7% historical CAGR with revenue +0.5% in 2025; 381
    businesses, +4.8% CAGR 2021-2026; described as an industry in which
    specialty hospitals primarily provide long-term care for the chronically ill.
    The page is internally inconsistent on whether USD 66.8 bn is a 2025 or a
    2026 figure.
16. Market Report Analytics, "Long-Term Acute Care 2025-2033".
    https://www.marketreportanalytics.com/reports/long-term-acute-care-43518
    — reported by the search index as USD 50 bn in 2025 to approximately USD 80
    bn in 2033 at 6%. **The publisher page returns HTTP 403 and the figures could
    not be verified on any publisher-controlled page.** Its named companies
    (Johnson & Johnson, Medtronic, Baxter) indicate a device scope. Excluded
    from every multiple in this file and from the report.
17. IMARC Group, "Long Term Care Market", and Towards Healthcare, "U.S. Long
    Term Care Market Sizing" (updated July 2026).
    https://www.imarcgroup.com/long-term-care-market
    https://www.towardshealthcare.com/insights/us-long-term-care-market-sizing
    — IMARC: global long term care market USD 1,138.5 bn in 2024 to about
    USD 1,827.8 bn by 2033 at 5.13% (2025-2033). Towards Healthcare: US long term
    care market USD 503.42 bn in 2025 to about USD 1,107.14 bn by 2035 at 8.2%
    (2026-2035). Both size nursing homes, assisted living, home care and hospice.
    Recorded here only as the scope confusion to avoid: these are not LTCH
    sizings and are not blended into anything above.

# Pharmacovigilance — research notes
**Slug:** pharmacovigilance-market   **Drafted:** 2026-10-17

Pharmacovigilance is the one healthcare-IT-adjacent market with an exact,
published denominator. The whole point of the work the market pays for is to
produce countable artefacts — individual case safety reports — and three public
registers count them: the FDA's adverse-event system, the EMA's EudraVigilance,
and the WHO's VigiBase. So the division that is usually impossible here is
trivial: dollars of published market per adverse-event report received. This
file does it four ways and finds that the answer is not a cost.

## Published estimates (what others say)

| Source | Published | Base year | Base value | Forecast year | Forecast value | CAGR | Scope as stated |
|---|---|---|---|---|---|---|---|
| Research and Markets, *Pharmacovigilance Market* [1] | Sep 2026 | 2026 | **$13.71B** | 2032 | $34.17B | 16.34% stated (16.3% in its own table) | Pharmacovigilance, "a subset of the Healthcare Services industry": software **and** services, pre-clinical through Phase IV, in-house **and** outsourced |
| Precedence Research [2] | upd. 10 Sep 2026 | 2025 $10.36B; 2026 **$11.29B** | $11.29B | 2035 | $23.92B | 8.73% (2026-2035) | "Pharmacovigilance", global; no formal definition given |
| Fortune Business Insights [3] | 2026 | 2025 $9.35B; 2026 **$10.54B** | $10.54B | 2034 | $31.56B | 14.69% (2026-2034) | Type = services **and** software; deployment = in-house **and** outsourced; end users = CROs, pharma/biotech, others |
| Mordor Intelligence [4] | upd. 11 Sep 2026 | 2025 $9.35B; 2026 **$10.45B** | $10.45B | 2031 | $18.26B | 11.78% (2026-2031) | The value of PV **work** across the product life cycle — case handling, signal work, risk management. **"Standalone drug safety software licence revenue is excluded unless bundled into pharmacovigilance service delivery."** |
| Future Market Insights [5] | 2026 | 2026 | **$9.8B** | 2036 | $22.8B | 8.8% | "Pharmacovigilance market", global |
| SNS Insider [6] | 2026 | 2025 | $8.91B | 2035 | n/d | 10.34% | "Pharmacovigilance market" |
| Grand View Research [7] | 2026 | 2025 $8.6B; 2026 **$9.2B** | $9.2B | 2033 | $13.5B | 5.6% (2026-2033) | Product life cycle, service provider, type, end use, therapeutic area, process flow; 23 countries |
| SkyQuest [8] | 2026 | 2024 | $8.01B | 2032 | $13.56B | 6.8% | "Pharmacovigilance market" |
| IMARC [9] | 2026 | 2025 | $9.2B | 2034 | n/d | n/d | "Pharmacovigilance market" |
| Global Growth Insights [10] | 2026 | 2025 | $13.17B | 2035 | n/d | n/d | "Pharmacovigilance market" |
| Research and Markets, *Clinical Safety & Pharmacovigilance **Services*** [11] | 28 Sep 2026 | 2026 | **$3.07B** | 2032 | $6.14B | 12.26% | Outsourced clinical safety and PV **services** only |
| 360iResearch, *Pharmacovigilance & Drug Safety **Software*** [12] | 6 Sep 2026 | 2026 | **$0.371B** | 2032 | $0.531B | 6.28% | **Software only** — collection, processing, assessment, reporting and monitoring of adverse-event information |

### Normalisation to a common 2026 base

Four publishers state a 2026 value themselves and are used as given. The three
with a non-2026 base are advanced at that publisher's **own** stated CAGR:

- SkyQuest, 2024 base: `$8.01B x 1.068^2 = $8.01B x 1.140624 = **$9.14B (2026)**`
- SNS Insider, 2025 base: `$8.91B x 1.1034 = **$9.83B (2026)**`
- Grand View, 2025 base: publisher states 2026 itself at $9.2B; its own
  `$8.6B x 1.056 = $9.08B` is within 1.3% of that, so $9.2B is used.

IMARC and Global Growth Insights publish a 2025 level with no retrievable CAGR
and cannot be normalised. They are listed for completeness and excluded from the
spread arithmetic. Global Growth Insights' $13.17B for 2025 is noted because it
is the only estimate that would, if normalised at any plausible rate, land above
Research and Markets' 2026 figure.

**Self-consistency checks on the two forecasts that matter most.** Mordor's own
endpoints reconcile with its own rate: `$10.45B x 1.1178^5 = $18.24B` against the
$18.26B it publishes for 2031, a 0.1% difference. Research and Markets' do too:
`(34.17/13.71)^(1/6) - 1 = 16.44%` against its stated 16.34%, a 0.10-point
rounding. Grand View's: `$9.2B x 1.056^7 = $13.51B` against $13.5B. Precedence's:
`(23.92/11.29)^(1/9) - 1 = 8.70%` against 8.73%. All four publish arithmetic that
closes. That is worth saying, because it is not always true, and it means the
disagreement between them is a real disagreement and not a rounding artefact.

## The spread

Headline, across every scope on a 2026 footing: **$0.371B to $13.71B — a 36.95x
spread.** But that number is almost useless on its own, because the two extremes
are deliberately narrow sub-scopes that are nonetheless routinely quoted as "the
pharmacovigilance market":

| Tier | 2026 value | What it counts |
|---|---|---|
| Software only | $0.371B | Drug-safety database and case-processing software licences |
| Outsourced services only | $3.07B | The slice a sponsor buys from a CRO or BPO vendor |
| **The whole function** | **$9.14B - $13.71B** | Internal headcount + outsourced services + platforms |

**The interesting thing is what happens inside the whole-function tier.** Eight
independent publishers, normalised to 2026, give $9.14B, $9.20B, $9.80B, $9.83B,
$10.45B, $10.54B, $11.29B and $13.71B. Low to high is **1.50x** — unusually tight
for this literature. Their CAGRs, by contrast, are 5.6%, 6.8%, 8.73%, 8.8%,
10.34%, 11.78%, 14.69% and 16.34%: a **2.92x** spread.

**This is the inverse of the usual pattern, and it is the finding.** In most
healthcare markets the sizes disagree by multiples and the growth rates agree
closely, which means the publishers are describing different things and calling
them one. Here they agree about the thing and its present size to within 50%, and
disagree by nearly threefold about how fast it grows. Pharmacovigilance is not a
definition problem — the function is statutorily defined, its deliverables are
enumerated in ICH E2B(R3) and the EU GVP modules, and everyone is counting the
same work. It is a **forecasting** problem.

Carried forward, the disagreement widens rather than narrowing:

```
Grand View, its own rate:  $9.2B  x 1.056^6  = $12.76B (2032)
Research and Markets:      $13.71B x 1.1634^6 = $34.17B (2032)   [published]
SkyQuest:                                       $13.56B (2032)   [published]
```

**2026: 1.50x apart. 2032: $12.76B to $34.17B — 2.68x apart.** Nearly half the
uncertainty a reader inherits from this literature is created after 2026 by the
choice of growth rate, not by the choice of scope. A buyer who takes a 2026
figure from one publisher and a 2032 figure from another is not blending
estimates; they are compounding a disagreement neither publisher owns.

## Grounding arithmetic

Pharmacovigilance has the best public denominator in healthcare: the reports
themselves are counted, by three separate authorities, and published.

### The registers

**FAERS, via openFDA** — the FDA's own public API over the adverse event
reporting system. Counted by `receivedate`, so these are reports *received* in
each calendar year. Query form:
`https://api.fda.gov/drug/event.json?search=receivedate:[20250101+TO+20251231]&limit=1`,
reading `meta.results.total`. Run 17 October 2026 against a release
`last_updated: 2026-07-30` [13]:

| FAERS year | Reports received |
|---|---|
| 2018 | 1,428,121 |
| 2019 | 1,434,195 |
| 2020 | 1,455,117 |
| **2021** | **1,566,148** (peak) |
| 2022 | 1,523,664 |
| 2023 | 1,368,572 |
| 2024 | 1,319,106 |
| **2025** | **1,307,769** |

Total records in the public release: **20,692,690.**

**EudraVigilance** — EMA's 2025 Annual Report to the European Parliament, the
Council and the Commission, EMA/371010/2025 [14]:

- **1,765,581** EVPM ICSRs processed in 2025, against **1,757,524** in 2024
  (+0.5%) and **1,908,605** in 2023 (the 2024 figure was a 7.9% fall)
- **31,253,245** ICSRs held at 31 December 2025, referring to **17,898,709**
  individual cases; EVPM 29,097,802 ICSRs / 17,347,873 cases; EVCTM 2,155,443
  ICSRs / 550,836 SUSAR cases
- **1,174** marketing authorisation holders at headquarter level sent reports to
  EVPM in 2025 (+2.9%); **690** clinical trial sponsors sent to EVCTM (-6%)
- **20,331** individual MAH users and 9,826 clinical trial sponsor users
  registered in EudraVigilance
- **1,201** potential safety signals reviewed in 2025 across 995 active
  substances; the PRAC prioritised and assessed **60** confirmed signals, about
  85% of which used EudraVigilance data

**The FDA's own cost of running the registers** — FDA press announcement, "FDA
Launches New Adverse Event Look-Up Tool", 11 March 2026 [15]. This is the single
most valuable disclosure in the file, because it gives a numerator and a
denominator in the same sentence:

- "approximately **6 million** adverse event reports per year"
- across "a patchwork of **seven** databases"
- which "cost the agency approximately **$37 million per year** to operate"
- AEMS is expected to "save approximately **$120 million over the next five
  years**"; it replaced FAERS, VAERS and AERS on 11 March 2026, with MAUDE, HFCS
  and CTPAE to follow in May

**VigiBase** — over **40 million** individual case reports coded in WHODrug and
MedDRA as of 31 December 2024, from over 160 countries, roughly 80% medicines and
20% vaccines [16]; the WHO PIDM page recorded over 35 million in July 2023 [17].

### 1. The headline division — dollars per adverse-event report received

```
$10.45B (Mordor, 2026) / 1,307,769 FAERS reports received in 2025 = $7,991 per report
$10.45B                / 1,319,106 FAERS reports received in 2024 = $7,922 per report
$13.71B (R&M high)     / 1,307,769                                = $10,483 per report
$9.14B  (SkyQuest low) / 1,307,769                                = $6,989 per report
```

**Across the entire whole-function tier, the published pharmacovigilance market
is $6,989 to $10,483 per FAERS report received.**

**Is that credible as a per-case processing cost? No — not within an order of
magnitude.** The only published per-case price found is an outsourcing provider's
own rate card: **$200-$400 per case for standard processing and $400-$600 for
expedited** [18]. Against the midpoint of our reading:

```
$7,991 / $600 (expedited) = 13.3x
$7,991 / $200 (standard)  = 40.0x
```

Widening the denominator does not close the gap. Add the EU:

```
1,307,769 (FAERS 2025) + 1,765,581 (EudraVigilance 2025) = 3,073,350 regulatory ICSR submissions
$10.45B / 3,073,350 = $3,400 per ICSR     — still 5.7x to 17.0x the rate card
```

And take the FDA's own, far broader count of everything it receives across all
seven systems and all regulated product categories:

```
$10.45B / 6,000,000 reports = $1,742 per report  — still 2.9x to 8.7x the rate card
```

**What this rules out.** The published pharmacovigilance market cannot be read as
a case-processing market priced per case. Even on the most generous denominator
available anywhere — the FDA's six million reports a year, which includes
devices, vaccines, cosmetics, tobacco and animal products, none of which the PV
market is said to cover — the market is still three times the cost of processing
those reports at an outsourced expedited rate. The per-report figure of
$1,742-$7,991 is a **density metric, not a unit cost**, and anyone presenting it
as the cost of handling a case is wrong by between one and two orders of
magnitude.

**What it rules in.** A whole-function reading: salaried in-house drug-safety
headcount, the qualified person responsible for pharmacovigilance and their
deputies, periodic safety update reports and PBRERs, risk management plans,
signal detection and validation, literature screening, aggregate reporting,
pharmacovigilance system master files, audits and inspection readiness, and
clinical trial SUSAR management — none of which scales with ICSR count. Mordor
puts contract outsourcing at 54.88% of spend and Fortune at 57.03%, so roughly
43-45% of the market is internal cost that was never priced per case at all.

### 2. The bottom-up build, and why it lands low

Run the arithmetic in the other direction. Indegene's white paper puts case
processing at **40%-80% of allocated PV budgets** [19]. Applying the rate card to
the exact regulatory flow:

```
3,073,350 ICSRs x $200 = $0.615B      3,073,350 ICSRs x $600 = $1.844B
If that is 80% of the budget: $0.615 / 0.80 = $0.77B total
If that is 40% of the budget: $1.844 / 0.40 = $4.61B total
```

**A bottom-up build from the exact register counts gives $0.77B-$4.61B — below
every broad published estimate.** Against the whole-function tier:

```
$9.14B  / $4.61B = 2.0x      (most generous build vs lowest published)
$13.71B / $0.77B = 17.8x     (tightest build vs highest published)
```

The gap of 2x to 18x is not evidence that the publishers are wrong. It is a
measure of three things the register count cannot see: that one adverse event is
processed repeatedly and independently by the MAH, the national competent
authority, the FDA or EMA and finally Uppsala, so the industry handles several
times more case-instances than any single register holds; that an outsourced
marginal price is not a fully-loaded internal cost; and that the non-case-driven
deliverables above are most of the work. **But it does mean the market is a
headcount market and not a throughput market, and that is not how it is
marketed.** It also sets a floor: any estimate below about $1B for the whole
function is arithmetically impossible given the register counts.

### 3. The regulator's own unit cost — an independent check on #1

The FDA disclosed both terms:

```
$37,000,000 / 6,000,000 reports per year = $6.17 per report to operate seven databases
$37,000,000 / $10,450,000,000 published market = 0.354%
$24,000,000 per year of projected AEMS savings / $37,000,000 = 64.9% of its own run cost
```

**The entire data infrastructure through which every adverse event for every
FDA-regulated product flows costs $6.17 per report and 0.354% of what industry is
said to spend on pharmacovigilance.** The ratio of $7,991 to $6.17 is **1,295x**.
That is the cleanest possible demonstration that this market is people and
process, not platforms — and it is the arithmetic reason the software-only tier
in the spread table is three decimal orders below the whole-function tier rather
than, say, a third of it.

### 4. The software tier against a disclosed software vendor

360iResearch puts the **entire global** pharmacovigilance and drug-safety
software market at **$371.02M in 2026** [12]. Veeva Systems, whose safety
products are one application family among many, reported FY2026 (year ended 31
January 2026) **total revenue of $3,195.3M** and **subscription revenue of
$2,684.2M**, up 16% and 17% [20]:

```
$371.02M / $3,195.3M = 11.6% of one vendor's total revenue
```

And Veeva is the challenger in safety, not the incumbent — its own FY2026 release
describes "Veeva's sixth top 20 win" in safety, i.e. six of the twenty largest
biopharma companies, which is a statement about having recently arrived. Oracle's
Argus is the long-standing installed base. Cross-check against the other
publishers' own implied software line: Fortune puts services at 91.43% of its
2026 market, so software is 8.57%:

```
0.0857 x $10.54B = $0.903B implied software tier (Fortune)
$0.903B / $0.371B = 2.43x
```

**Two publishers disagree by 2.43x about the software tier alone**, and the lower
of the two is 11.6% of a single vendor's revenue. The $371M figure must never be
quoted as "the pharmacovigilance market"; on the evidence it is not even a
credible total for pharmacovigilance software.

### 5. The services tier against the largest disclosed provider

IQVIA Holdings reported FY2025 **R&D Solutions revenue of $8,896M** on total
company revenue of **$16,310M**, with R&DS contracted backlog of $32.7B [21].
R&D Solutions contains clinical trials, laboratories, site services and data as
well as safety; IQVIA does not break pharmacovigilance out, and neither do
Accenture, Cognizant or the private ArisGlobal. So the test is a containment
test, not a share calculation:

```
$10.45B / $8.896B = 1.17x    the published PV market vs ALL of IQVIA R&D Solutions
$13.71B / $8.896B = 1.54x    same, at the high reading
```

Apply Mordor's own outsourcing ratio to isolate the part that is actually bought
from vendors:

```
$10.45B x 0.5488 = $5.74B outsourced;  $5.74B / $8.896B = 64.5% of IQVIA R&DS
$13.71B x 0.5488 = $7.52B outsourced;  $7.52B / $8.896B = 84.6% of IQVIA R&DS
```

**The 64.5% ratio is survivable; the 84.6% ratio is not.** At 64.5%, outsourced
pharmacovigilance across every vendor on earth — IQVIA, Accenture, Cognizant,
TCS, Indegene, ICON, Parexel, ArisGlobal's services arm and the long tail of
regional BPOs — equals about two-thirds of what the largest clinical research
organisation books across all of R&D Solutions. That is plausible. At 84.6% it
requires the global outsourced PV business to be within a sixth of IQVIA's entire
R&D segment while PV is a minor line inside that segment for IQVIA itself. **This
is the division that rules out the $13.71B reading and the 16.34% CAGR that comes
with it.**

### 6. Per reporting marketing authorisation holder

```
$10.45B / 1,174 MAHs that reported to EVPM in 2025 = $8.90M per MAH per year
$13.71B / 1,174                                    = $11.68M per MAH per year
```

$8.90M of annual pharmacovigilance spend per reporting MAH is credible as a
**mean** — large pharma spends multiples of it and the long tail spends a
fraction — and the true global denominator is larger than 1,174, because that
count excludes every company that markets outside the EEA only. So the per-MAH
figure is an upper bound on the mean, which is the direction that supports the
published level. The per-registered-user version does not work:
`$10.45B / 20,331 registered individual MAH users = $513,994 per user`, which is
three to five times a fully loaded drug-safety professional anywhere in the
world. Registered EudraVigilance users are the subset authorised to transmit, not
the PV workforce, so this division is indeterminate and is reported here only so
that nobody else runs it and mistakes it for a headcount.

### 7. Volume is flat. The forecast is not. This is the decisive check.

```
FAERS:           1,566,148 (2021) -> 1,307,769 (2025) = -16.5% over four years, -4.4%/yr
EudraVigilance:  1,908,605 (2023) -> 1,765,581 (2025) = -7.5% over two years
```

Both of the world's two largest adverse-event registers have taken in fewer
reports in 2025 than at their post-pandemic peak. Yet the median published CAGR
for this market is about 10% and the highest is 16.34%. **Every published
forecast therefore embeds a rising cost per adverse-event report, and no
publisher says so.** Hold FAERS volume at its 2025 level and run our own
published forecast through it:

```
2026: $10.45B / 1,307,769 = $7,991 per FAERS report
2032: $20.38B / 1,307,769 = $15,586 per FAERS report
```

**The forecast implies the dollars of pharmacovigilance spend per adverse-event
report received nearly double between 2026 and 2032 at constant report volume.**
That is a defensible claim — regulatory obligations per case have risen through
ICH E2B(R3), the GVP modules, PSMF and RMP requirements, signal-management
worksharing and the expansion of PV into biosimilars, cell and gene therapies and
digital therapeutics, and none of those add reports — but it is a claim about
regulatory intensity, not about adverse events. A reader who buys a 10% CAGR here
is buying a forecast of regulation, and they should know that.

### What the divisions rule in and out

- **Ruled out:** $0.371B as "the pharmacovigilance market". It is 11.6% of one
  software vendor's revenue and 2.43x below another publisher's own implied
  software line.
- **Ruled out:** $3.07B as "the pharmacovigilance market". It is explicitly the
  outsourced services slice, and Mordor's and Fortune's own outsourcing ratios
  (54.88%, 57.03%) place the outsourced slice of the whole function at
  $5.7B-$6.0B, roughly double it — so even on its own terms it is a subset of a
  subset.
- **Ruled out:** $13.71B at 16.34%. Its outsourced slice would be 84.6% of all
  IQVIA R&D Solutions revenue, and its CAGR is 2.92x the lowest published rate
  while the registers it serves shrink.
- **Ruled out:** any reading of this market as case processing priced per case.
  $1,742-$7,991 per report against a $200-$600 rate card is a one-to-two order of
  magnitude error.
- **Ruled in:** $9.14B-$11.29B for 2026 on a whole-function scope, with $10.45B
  the median of the eight normalised estimates and the only one whose publisher
  states its scope boundary explicitly.
- **Ruled in, as an exact register ratio only:** 1,307,769 FAERS reports in 2025
  against 1,765,581 EudraVigilance ICSRs — the EU system processed **1.35x** the
  US system's intake. Both terms are published counts. This is a ratio of
  *reports*, not of market value, and it is not entered as a regional split
  anywhere in the JSON.

## What we publish

**Scope: the pharmacovigilance function, global — case handling, signal
management and risk management across the product life cycle, in-house and
outsourced, with standalone software licences excluded unless bundled into
service delivery.** That is Mordor Intelligence's stated scope, and it is chosen
because it is the only definition in the whole literature that names its own
boundary. Base 2026 **$10.45B**.

**Forecast 2032 $20.38B at 11.78%.** Mordor's horizon ends at 2031 ($18.26B), so
the 2032 endpoint is **our one-year extension of the publisher's own stated
rate**, not a figure Mordor publishes:

```
$10.45B x 1.1178^6 = $20.3846B  -> published as $20.38B
cross-check: Mordor's own $18.26B (2031) x 1.1178 = $20.41B — 0.15% apart
reconciliation: (20.38 / 10.45)^(1/6) - 1 = 11.776%  vs 11.78% stated
```

This is stated plainly in `forecast_analysis` rather than presented as a
published endpoint. It is the honest way to put a 2026-2032 series on a publisher
whose own series stops in 2031, and the alternative — adopting Research and
Markets' published 2032 figure of $34.17B — is ruled out by division 5.

`market_forecast` interpolates seven points, 2026-2032, at 11.78% from exactly
$10.45B: 10.45, 11.68, 13.06, 14.60, 16.32, 18.24, 20.38. The chart is labelled
as modelled between endpoints, because the intermediate years are arithmetic.

**`unit` is Billion** and the market is comfortably above $1B on this scope.
Note for anyone tempted to publish the software tier instead: at $0.371B that
scope would need `unit` set to `Million`, which `lib/format.ts` handles via
`marketValue()` / `unitSuffix()`. It is not published here.

## Do not publish

- **No vendor market share anywhere.** `competitive_landscape[].market_share`
  absent throughout, and the checker rejects the field. None of IQVIA, Accenture,
  Cognizant, Oracle, Veeva or ArisGlobal discloses pharmacovigilance revenue —
  that absence was the admitting condition for this topic and it held up.
- **No vendor customer counts.** ArisGlobal "220+ life sciences customers" and
  "100+ new and expanded LifeSphere customers, 34 global go-lives in 2025", Veeva
  Vault Safety "50+ organizations" (2021) and "100+" (2026), and Oracle Argus
  "400+ customers, 10 million cases annually" all trace to third-party industry
  write-ups, not to a company release or filing. All excluded. The only
  vendor-side figure published is Veeva's **audited total and subscription
  revenue**, which is a filing, plus its own release's statement of a sixth top-20
  safety win — a count of customers it names as a milestone, not a share.
- **`regional_analysis: []`.** Four publishers give North America's share of a
  nominally identical market in the same year: **31.14%** (Precedence, 2025),
  **31.7%** (Grand View, 2025), **40.84%** (Fortune, 2025) and **43.62%**
  (Mordor, 2025). That is a **1.40x** disagreement on one region in one year,
  wider than their disagreement about the global total. Fortune's full split
  (NA 40.84%/$3.82B, Europe 25.64%/$2.40B, APAC 20.22%/$1.89B, LATAM 7.99%/$0.75B,
  MEA 5.31%/$0.50B) is internally consistent and sums to its own $9.36B, but it is
  a split of Fortune's scope and 2025 base, not of the scope and year we publish.
  Publishing it against our figures would attach a sourced appearance to an
  unsourced mapping. The disagreement goes in prose instead.
- **`country_analysis: []`.** Precedence gives the U.S. at $2.29B in 2025 rising
  to about $5.58B by 2035 at 9.32%. On its own $10.36B 2025 base that is 22.1% of
  the world, which cannot be reconciled with the same page's 31.14% for all of
  North America unless Canada and Mexico are 9% of global pharmacovigilance. One
  of the two numbers is wrong and the page does not say which, so neither is
  published.
- **No segment percentages.** Phase IV is 76% (Grand View, Precedence) or 32.05%
  (Mordor) of the same nominal market; spontaneous reporting is 30.4%
  (Precedence) or 42.96% (Mordor); contract outsourcing is 54.88% (Mordor), 57.03%
  (Fortune) or 60% (Precedence); pharmaceutical companies are 42.8% (Precedence),
  58.91% (Mordor) or 62.51% (Fortune). The 76%-vs-32% disagreement about Phase IV
  is the largest single contradiction in the file. Segmentation is published as
  plain strings. The outsourcing ratios are used in divisions 1 and 5 to test an
  order of magnitude and are quoted in prose with their publisher attached, never
  as a published split.
- **No per-case processing cost as a sourced figure.** The $200-$600 band is one
  outsourcing provider's published rate card [18], not a study. It is used only to
  test whether $7,991 per report could be a unit cost, and the test is reported as
  what it is — an order-of-magnitude refutation, not a measurement.
- **No "40%-80% of PV budget is case processing" as a hard split.** One vendor
  white paper [19]. Used only to bracket the bottom-up build in division 2.
- **No single FAERS cumulative total.** openFDA's public release holds
  **20,692,690** records; a 2026 peer-reviewed analysis counts FAERS at 26.3
  million as of 31 December 2025 [22]; a November 2025 paper cites the dashboard at
  nearly 32 million [23]. The three count different objects — deduplicated public
  release records, deduplicated cases, and all report versions including
  follow-ups. There is no one true number and the file does not pretend there is.
  Only the per-year `receivedate` counts, which are unambiguous, are used.
- **No VigiBase annual intake.** Only cumulative milestones are published: over
  35 million in July 2023 [17] and over 40 million at 31 December 2024 [16].
  Differencing them to about 3.5M a year would manufacture precision across a
  period in which the inclusion criteria and contributing-country count both
  changed. VigiBase appears in this report as a corroborating order of magnitude
  only, never as a denominator.
- **No FDA OSE headcount or drug-safety budget.** Wikipedia's "72 employees and a
  roughly $15 million annual budget" carries citation-needed tags on both claims
  and could not be traced to an FDA source. The FDA's own OSE page states only
  that it "evaluates more than 2 million adverse event and medication error
  reports submitted every year to FDA's MedWatch program" and that it "consists of
  two offices and eight divisions" [24] — that is published and is used; the
  headcount is not.
- **No PDUFA fee revenue as a pharmacovigilance figure.** The FY2026 PDUFA base
  revenue target of $1,434,377,467 [25] funds human drug application review, of
  which postmarket safety is one part. It is not a pharmacovigilance budget and is
  excluded rather than repurposed.
- **No IMARC or Global Growth Insights value in the spread arithmetic.** Both
  publish a 2025 level with no retrievable CAGR, so neither can be normalised to
  2026 without inventing a rate.
- **No Research and Markets 2032 endpoint.** $34.17B is published by its author
  and is ruled out by division 5. It appears in the spread table and in
  `forecast_analysis` as the top of the range, never as our forecast.

## Sources

1. Research and Markets, *Pharmacovigilance Market* — $13.71B in 2026 reaching
   $34.17B by 2032 at 16.34% (16.3% in its own table information); published
   September 2026; scope described as a subset of the Healthcare Services
   industry, segmented by component (software, services), delivery mode (in-house,
   outsourced), process flow (case data management, risk management system, signal
   detection) and product life cycle.
   https://www.researchandmarkets.com/report/pharmacovigilance
2. Precedence Research, *Pharmacovigilance Market Size* — 2025 $10.36B, 2026
   $11.29B, 2035 $23.92B at 8.73% (2026-2035); North America 31.14% of 2025
   revenue; U.S. $2.29B in 2025 to about $5.58B by 2035 at 9.32%; last updated
   10 September 2026, report code 1442.
   https://www.precedenceresearch.com/pharmacovigilance-market
3. Fortune Business Insights, *Pharmacovigilance Market Size, Share & Trends* —
   2025 $9.35B, 2026 $10.54B, 2034 $31.56B at 14.69%; study period 2021-2034;
   2025 regional split NA 40.84%/$3.82B, Europe 25.64%/$2.40B, APAC
   20.22%/$1.89B, LATAM 7.99%/$0.75B, MEA 5.31%/$0.50B; 2026 shares services
   91.43%, outsourced 57.03%, pharma/biotech end user 62.51%.
   https://www.fortunebusinessinsights.com/pharmacovigilance-pv-market-102746
4. Mordor Intelligence, *Pharmacovigilance Market Size, Growth & Analysis* —
   2025 $9.35B, 2026 $10.45B, 2031 $18.26B at 11.78%; study period 2020-2031;
   standalone drug safety software licence revenue excluded unless bundled into
   PV service delivery; 2025 shares contract outsourcing 54.88%, Phase IV 32.05%,
   spontaneous reporting 42.96%, pharmaceutical companies 58.91%, North America
   43.62%; page last updated 11 September 2026.
   https://www.mordorintelligence.com/industry-reports/pharmacovigilance-pv-market
5. Future Market Insights, *Pharmacovigilance Market: Global Industry Analysis
   and Opportunity Assessment, 2036* — $9.8B in 2026 to $22.8B by 2036 at 8.8%.
   https://www.futuremarketinsights.com/reports/pharmacovigilance-market
6. SNS Insider, *Pharmacovigilance Market Size, Share & Growth Report 2035* —
   $8.91B in 2025 at a 10.34% CAGR.
   https://www.snsinsider.com/reports/pharmacovigilance-market-3095
7. Grand View Research, *Pharmacovigilance Market Size, Share* — 2025 $8.6B,
   2026 $9.2B, 2033 $13.5B at 5.6% (2026-2033); actual data 2021-2025; North
   America 31.7% of 2025 revenue; Phase IV over 76.0% of 2025 revenue; oncology
   27.3%; 23 countries covered.
   https://www.grandviewresearch.com/industry-analysis/pharmacovigilance-industry
8. SkyQuest, *Pharmacovigilance Market Size, Share* — $8.01B in 2024 to $13.56B
   by 2032 at 6.8%. https://www.skyquestt.com/report/pharmacovigilance-market
9. IMARC Group, *Pharmacovigilance Market Size, Growth & Forecast 2034* — $9.2B
   in 2025; no retrievable CAGR.
   https://www.imarcgroup.com/pharmacovigilance-market
10. Global Growth Insights, *Pharmacovigilance Market Size, Share & Forecast
    Report 2035* — $13.17B in 2025; no retrievable CAGR.
    https://www.globalgrowthinsights.com/market-reports/pharmacovigilance-market-107670
11. Research and Markets, *Global Clinical Safety & Pharmacovigilance Services
    Market Forecast 2026-2032*, via GlobeNewswire, 28 September 2026 — $3.07B in
    2026 to $6.14B by 2032 at 12.26%; outsourced clinical safety and PV services
    scope. Self-consistency: $3.07B x 1.1226^6 = $6.15B.
    https://www.globenewswire.com/news-release/2026/09/28/3369614/28124/en/global-clinical-safety-pharmacovigilance-services-market-forecast-2026-2032-ai-enabled-safety-operations-and-regulatory-complexity-drive-12-26-cagr-propelling-the-market-to-usd-6-1.html
12. 360iResearch, *Pharmacovigilance & Drug Safety Software Market 2026-2032* —
    $371.02M in 2026 to $531.33M by 2032 at 6.28%; published 6 September 2026.
    Self-consistency: (531.33/371.02)^(1/6) - 1 = 6.17%, against 6.28% stated.
    https://www.360iresearch.com/library/intelligence/pharmacovigilance-drug-safety-software
13. openFDA, `drug/event` endpoint — FDA's public API over the adverse event
    reporting system. Counts by `receivedate` calendar year, queried 17 October
    2026 against a release stamped `last_updated: 2026-07-30`: 2018 1,428,121;
    2019 1,434,195; 2020 1,455,117; 2021 1,566,148; 2022 1,523,664; 2023
    1,368,572; 2024 1,319,106; 2025 1,307,769. Total records in the public
    release 20,692,690. https://open.fda.gov/apis/drug/event/
14. European Medicines Agency, *2025 Annual Report on EudraVigilance for the
    European Parliament, the Council and the Commission*, EMA/371010/2025 —
    1,765,581 EVPM ICSRs processed in 2025 against 1,757,524 in 2024 (+0.5%);
    31,253,245 ICSRs and 17,898,709 individual cases held at 31 December 2025;
    EVPM 29,097,802 / 17,347,873; EVCTM 2,155,443 / 550,836 SUSAR cases; 1,174
    MAHs and 690 clinical trial sponsors reporting at headquarter level; 20,331
    individual MAH users registered; 1,201 potential safety signals reviewed
    across 995 active substances; 60 confirmed signals assessed by the PRAC, about
    85% using EudraVigilance data.
    https://www.ema.europa.eu/en/documents/report/2025-annual-report-eudravigilance-european-parliament-council-commission_en.pdf
15. U.S. Food and Drug Administration, press announcement, "FDA Launches New
    Adverse Event Look-Up Tool", 11 March 2026 — approximately 6 million adverse
    event reports per year across a patchwork of seven databases costing
    approximately $37 million per year to operate; approximately $120 million of
    savings projected over five years; AEMS replaced FAERS, VAERS and AERS at
    launch with MAUDE, HFCS and CTPAE to follow in May 2026.
    https://www.fda.gov/news-events/press-announcements/fda-launches-new-adverse-event-look-tool
16. *VigiBase: Resource Profile Update with a Summary of Global Patterns and
    Trends in Adverse Event Reports for Medicines and Vaccines* — over 40 million
    individual case reports coded in WHODrug and MedDRA as of 31 December 2024,
    from over 160 countries after standard exclusion criteria; roughly 80%
    medicines and 20% vaccines.
17. World Health Organization, Programme for International Drug Monitoring —
    over 35 million reports of adverse reactions in VigiBase as of July 2023.
    https://www.who.int/teams/regulation-prequalification/regulation-and-safety/pharmacovigilance/networks/pidm
18. Peptide Staff, outsourced adverse event reporting services rate card —
    $200-$400 per case for standard processing, $400-$600 for expedited;
    annual programme cost $150,000-$800,000 depending on case volume. A provider
    price list, not a study.
    https://peptidestaff.com/outsourcing-services/peptide-adverse-event-reporting-outsourcing-services/
19. Indegene, *Applying Automation Effectively on Pharmacovigilance ICSR
    Processing* — case processing consumes 40%-80% of allocated PV budgets;
    roughly 35% cost reduction claimed from automation. A vendor white paper.
    https://www.indegene.com/what-we-think/reports/applying-automation-effectively-pharmacovigilance-icsr-processing
20. Veeva Systems Inc., "Veeva Announces Fourth Quarter and Fiscal Year 2026
    Results", fiscal year ended 31 January 2026 — total revenues $3,195.3M
    (+16%), subscription revenues $2,684.2M (+17%), professional services and
    other $511.1M; prior-year total $2,746.6M; "Safety momentum continued with
    Veeva's sixth top 20 win and its first top 20 biopharma live on Workbench and
    Signal". Vault Safety revenue is not broken out.
    https://www.veeva.com/resources/veeva-announces-fourth-quarter-and-fiscal-year-2026-results/
21. IQVIA Holdings Inc., "IQVIA Reports Fourth-Quarter and Full-Year 2025
    Results; Issues Full-Year 2026 Guidance", February 2026 — full-year 2025
    revenue $16,310M (+5.9%); R&D Solutions revenue $8,896M (+4.3%); Q4 R&DS
    $2,333M (+9.9%); R&DS contracted backlog $32.7B with approximately $8.3B
    expected to convert within twelve months. Pharmacovigilance is not broken out.
    https://www.iqvia.com/newsroom/2026/02/iqvia-reports-fourth-quarter-and-full-year-2025-results-issues-full-year-2026-guidance
22. Frontiers in Drug Safety and Regulation, 2026 — VigiBase approximately 42.4
    million reports and FAERS approximately 26.3 million as of 31 December 2025;
    after deduplication VigiBase 39.5 million, of which 27.0 million (68.4%)
    exclusive to that source.
    https://www.frontiersin.org/journals/drug-safety-and-regulation/articles/10.3389/fdsfr.2026.1919822/full
23. *Utility and limitations of the FDA adverse events reporting system public
    dashboard for safety analyses*, Expert Opinion on Drug Safety, November 2025 —
    FAERS held nearly 32 million reports as of that month, with over one million
    new submissions annually; only a subset of submitted data points appears in
    the public dashboard.
    https://www.tandfonline.com/doi/full/10.1080/14740338.2025.2588634
24. U.S. Food and Drug Administration, CDER Office of Surveillance and
    Epidemiology — "OSE evaluates more than 2 million adverse event and
    medication error reports submitted every year to FDA's MedWatch program";
    "OSE consists of two offices and eight divisions".
    https://www.fda.gov/about-fda/cder-offices-and-divisions/cder-office-surveillance-and-epidemiology
25. Federal Register, "Prescription Drug User Fee Rates for Fiscal Year 2026",
    90 FR 35866, document 2025-14413, 30 July 2025 — PDUFA VII base revenue
    amount for FY2026 of $1,434,377,467 before inflation, capacity and hiring
    adjustments; FY2026 application fee $4,682,003 (clinical data), $2,341,002
    (no clinical data), program fee $442,213.
    https://www.federalregister.gov/documents/2025/07/30/2025-14413/prescription-drug-user-fee-rates-for-fiscal-year-2026
26. U.S. Food and Drug Administration, "Reports Received and Reports Entered into
    FAERS by Year" — the agency's own annual table, which stops at Q1 2015
    (content current as of 10 November 2015). Cited to establish that no current
    official annual table exists, which is why openFDA `receivedate` counts are
    used instead.
    https://www.fda.gov/drugs/fda-adverse-event-monitoring-system-aems/reports-received-and-reports-entered-faers-year

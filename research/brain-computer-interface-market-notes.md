# Brain-Computer Interface Market — research notes
**Slug:** brain-computer-interface-market   **Drafted:** 2026-10-16

## Published estimates (what others say)

| Source | Published | Base year | Base value | Forecast year | Forecast value | CAGR | Scope as stated |
|---|---|---|---|---|---|---|---|
| MarketsandMarkets | — | 2024 | **$262M** | 2029 | $506M | ~14.1% implied | "Brain computer interface market". Lowest base in the set by a factor of nine |
| Kings Research | — | 2025 | **$668.8M** | 2032 | $2,252.5M | 18.91% | Brain computer interface market |
| Market Research Future | — | 2023 | $1.64B | 2032 | $3.26B | 9.0% | Brain computer interface market. Lowest rate in the set |
| Data Bridge Market Research | — | 2022 | $1.74B | 2030 | $5.691B | 15.61% | Brain computer interface market |
| (GII-hosted report) | — | 2025 | **$2.40B** | 2032 | $6.16B | 14.4% (2025–2032) | Brain computer interface by component, type |
| Precedence Research | — | — | — | 2032 | $9.445B | 16.7% | Brain computer interface market |
| Acumen Research | — | — | — | 2032 | $8.9B | 16.8% (2023–2032) | Brain computer interface market |
| Vantage Market Research | — | — | — | 2030 | $7.2B | 18.2% | Brain computer interface market |
| Emergen Research | — | — | — | 2032 | $6.4B | — | Brain computer interface market |

## The spread

**The widest spread in this batch, and in this market the spread is the finding
rather than a complication of it.**

- **Base-year values: $262M (2024, MarketsandMarkets) to $2.40B (2025) — a
  9.16x spread.** Even restricting strictly to the same year, 2025: $668.8M
  against $2.40B is **3.59x**.
- **2032 endpoints: $2.2525B to $9.445B — a 4.20x spread.**
- **Published CAGRs: 9.0% to 18.91% — a 2.10x spread.**

Nine titles, nine "brain computer interface market" labels, and a nine-fold
disagreement about what it is worth today. Every one of them is describing a
different thing, and none of them says which.

The reason is structural: **there is almost nothing to measure.** A market
estimate is normally anchored by somebody's revenue. In this category, as of
October 2026, no implanted brain-computer interface holds FDA market
authorisation, so there is no reimbursed clinical revenue in the United States
to anchor against. What is left to count — non-invasive EEG headsets, research
instrumentation, software toolkits, consumer neurotechnology — has no agreed
boundary at all, and the estimates diverge accordingly.

## Grounding arithmetic

### The register

**ClinicalTrials.gov API v2, retrieved 16 October 2026:**

```
query.term = "brain-computer interface" OR "brain computer interface"
  → totalCount = 265 registered studies

same query, filter.overallStatus = RECRUITING
  → totalCount = 69 currently recruiting

register size for context: 607,160 total studies
```

265 of 607,160 studies is **0.044% of the clinical trials register.**

### The regulatory position, as of October 2026

- **No implanted brain-computer interface holds FDA market authorisation** — no
  PMA, no De Novo.
- Precision Neuroscience obtained a **510(k) clearance for one component** of its
  system in May 2025. A component clearance is not an authorisation of a
  brain-computer interface.
- Neuralink's **Blindsight** and Synchron's **Stentrode** hold **Breakthrough
  Device designations**, which accelerate review and authorise nothing.
- Paradromics received an **IDE** for the Connect-One early feasibility study in
  November 2025 — an investigational trial, not a marketing authorisation.
- Synchron has stated it is **preparing its first pivotal trial** for PMA in
  2026, which confirms approval has not been granted.
- The only commercial approval for an **invasive** BCI anywhere is **China's, for
  the Neuracle NEO, granted in March 2026**.
- The one FDA-cleared BCI-based product in routine clinical use, **IpsiHand**, is
  a **non-implanted** upper-extremity rehabilitation device.

### The division

Published base-year size ÷ registered studies:

| Source | Base | ÷ 265 studies | Implied spend per registered study per year |
|---|---|---|---|
| MarketsandMarkets | $262M (2024) | 262,000,000 / 265 | **$988,679** |
| Kings Research | $668.8M (2025) | 668,800,000 / 265 | **$2,523,774** |
| GII-hosted report | $2.40B (2025) | 2,400,000,000 / 265 | **$9,056,604** |

**$988,679 per registered study per year is the right order of magnitude for
research-grade neural recording hardware, amplifiers, electrode arrays, software
and the grant-funded staff time around them.** That is what this market
currently is: a research instrumentation and software market attached to 265
registered studies, 69 of them actively recruiting.

**$9,056,604 per registered study is not.** Nine million dollars a year per
registered trial is more than most of these studies' entire budgets, and it
cannot be clinical revenue because there is no approved implant to generate any.
The $2.40B class of figure must be counting non-invasive consumer and
research-adjacent neurotechnology — EEG headsets, attention-monitoring wearables,
software platforms — rather than anything a health system buys.

### The patient denominator (weaker, and flagged as such)

The implanted population is in the low hundreds at most. Neuralink was reported
at **21 patients across four countries** (United States, Canada, United Kingdom,
United Arab Emirates) as of 28 January 2026; Synchron at **six patients** with
twelve months of follow-up and no safety events; Blackrock Neurotech's implants
are described only as having been used experimentally in "dozens" of patients.

```
$2,400,000,000 / ~250 implanted patients worldwide ≈ $9.6M per implanted patient-year
```

**Caveat, and it is a serious one: these patient counts come from company
statements and secondary coverage, not from a registry or peer-reviewed
publication, and one of the sources notes explicitly that the Neuralink results
it discusses have not been published in a peer-reviewed journal with
reproducible methodology.** The trial-count denominator above is the defensible
one; the patient-count division is recorded as directional corroboration and is
**not** used as the report's primary grounding.

**Both calculations are plausibility tests, not market estimates.** They
establish that figures above roughly $1 billion cannot be clinical-device
revenue. They do not establish the correct market size.

## What we publish

**Headline:** $795.3M (2026) → $2,252.5M (2032) at 18.95%.

Source: Kings Research, which publishes $668.8 million for 2025 and
$2,252.5 million for 2032 at a stated 18.91%. The 2026 base is the published
2025 value advanced one year at that published rate (668.8 × 1.1891 = 795.3).
The 2032 endpoint is **Kings Research's own published figure, unmodified**.
$795.3M → $2,252.5M over six years reconciles at **18.95%**.

Chosen because: it has both an explicit base-year value and an explicit endpoint
inside the forecast window; its base sits in the range the trial-count test rules
in as research-instrumentation-scale; and it is the only series with a 2025 base
that does not require the market to already be nine times larger than the
lowest published figure. MarketsandMarkets' $262 million base is the single most
defensible figure in the set on the grounding test, but it forecasts only to
2029 and therefore cannot carry a 2032 series.

**Unit: USD Million** (not Billion — this market does not warrant it).
Industry: Medical Devices.

## Is the evidence base thick enough to publish?

Yes, but for an unusual reason, and the report must say so plainly.

The evidence base on the **market estimates** is actually rich: nine named
houses. The evidence base on the **market** is nearly empty: no approved
implant, no reimbursed revenue, no vendor disclosure, 265 registered studies and
an implanted population of low hundreds known only from company statements.

A report that gave a confident 2032 number here would be dishonest. A report
whose subject is *why* the published numbers differ nine-fold, grounded in a
countable trial register and a documented regulatory position, is defensible and
genuinely useful. That is what this is. **The thinness is the story, and it is
disclosed in the executive summary, the methodology and the FAQs rather than
papered over.**

## Do not publish

- **Vendor market share.** Neuralink, Synchron, Blackrock Neurotech, Paradromics
  and Precision Neuroscience are private and pre-revenue in clinical terms. No
  share exists. `competitive_landscape[].market_share` omitted.
- **Any vendor revenue figure.** None is disclosed by any participant.
- **Regional splits.** No named source gives a defensible one.
  `regional_analysis` stays `[]`.
- **Country splits.** None published. `country_analysis` stays `[]`.
- **A global implanted-patient total presented as a measurement.** The ~250
  figure is an aggregation of company statements and secondary coverage. It is
  quoted in prose with that caveat attached and is never used as a denominator in
  a published figure.
- **Any claim that a BCI is FDA-approved.** It is not, as of October 2026.
  Precision Neuroscience's 510(k) covers a component; Breakthrough designations
  authorise nothing.
- **Segment shares** (invasive versus non-invasive, hardware versus software).
  Not published by any named source. Segmentation as plain strings.
- **Addressable-population estimates** for paralysis, ALS or stroke. Tempting,
  and there are epidemiological sources, but converting prevalence into
  addressable market would require a device price and a reimbursement rate,
  neither of which exists.

## Sources

1. ClinicalTrials.gov API v2, `query.term="brain-computer interface" OR "brain computer interface"`, retrieved 16 October 2026: **265** registered studies — https://clinicaltrials.gov/api/v2/studies?query.term=%22brain-computer+interface%22+OR+%22brain+computer+interface%22&countTotal=true
2. ClinicalTrials.gov API v2, same query with `filter.overallStatus=RECRUITING`, retrieved 16 October 2026: **69** recruiting — https://clinicaltrials.gov/api/v2/studies?query.term=%22brain-computer%20interface%22&filter.overallStatus=RECRUITING&countTotal=true
3. ClinicalTrials.gov API v2 `/stats/size`, retrieved 16 October 2026: **607,160** total studies in the register — https://clinicaltrials.gov/api/v2/stats/size
4. MarketsandMarkets, brain computer interface market ($262M 2024 → $506M 2029) — https://www.marketsandmarkets.com/Market-Reports/brain-computer-interface-market-32728179.html
5. Kings Research, brain computer interface market ($668.8M 2025 → $2,252.5M 2032, 18.91% CAGR) — https://www.kingsresearch.com/brain-computer-interface-market-1234
6. Market Research Future, brain computer interface market ($1.64B 2023 → $3.26B 2032, 9.0% CAGR) — https://www.marketresearchfuture.com/reports/brain-computer-interface-market-1474
7. Data Bridge Market Research, brain computer interface market ($1,740.00M 2022 → $5,691.49M 2030, 15.61% CAGR) — https://www.databridgemarketresearch.com/reports/global-brain-computer-interface-market
8. GII Research, "Brain Computer Interface Market by Component, Type" ($2.40B 2025 → $6.16B 2032, 14.4% CAGR 2025–2032) — https://www.giiresearch.com/report/ires2083519-brain-computer-interface-market-by-component-type.html
9. Precedence Research, brain computer interface market ($9,445.1M by 2032, 16.7% CAGR per Towards Healthcare) — https://towardshealthcare.com/table-of-content/brain-computer-interface-market
10. Acumen Research and Consulting, brain computer interface market ($8.9B by 2032, 16.8% CAGR 2023–2032) — https://www.acumenresearchandconsulting.com/brain-computer-interface-market
11. Vantage Market Research, brain computer interface market ($7.2B by 2030, 18.2%) — https://www.vantagemarketresearch.com/industry-report/brain-computer-interface-market-1524
12. FDA, "Leapfrog" guidance on implanted brain-computer interface devices for patients with paralysis or amputation — https://www.medicaldesignandoutsourcing.com/fda-issues-leap-frog-guidance-on-brain-computer-interfaces/
13. BioWorld, "Precision Neuro leads BCI race following FDA clearance" (510(k) clearance for a component, May 2025) — https://www.bioworld.com/articles/719652-precision-neuro-leads-bci-race-following-fda-clearance
14. Paradromics, FDA IDE approval for the Connect-One early feasibility study, November 2025 — reported at https://pdpspectra.com/blog/brain-computer-interfaces-neuralink-2026
15. Synchron, Stentrode Breakthrough Device designation and stated preparation of a first pivotal trial for PMA in 2026 — https://liveinthefuture.org/stories/synchron-endovascular-bci-wins-regulatory-race
16. Neuralink patient count: 21 patients across the United States, Canada, the United Kingdom and the United Arab Emirates as of 28 January 2026, per company reporting relayed in secondary coverage — https://pdpspectra.com/blog/brain-computer-interfaces-neuralink-2026 **(company-reported, not peer-reviewed or registry-confirmed)**
17. Synchron: six patients, twelve months, no safety events — https://liveinthefuture.org/stories/bci-patient-outcomes **(secondary blog source; treat as indicative only)**
18. Blackrock Neurotech: implants used experimentally in "dozens" of patients — https://fintool.com/news/neuralink-mass-production-2026 **(no precise figure available)**
19. China's National Medical Products Administration commercial approval of the Neuracle NEO invasive BCI, March 2026 — reported at https://eu.36kr.com/en/p/3766512444703233
20. RAND Forecasting Initiative, "Will the FDA grant market approval for a brain computer interface (BCI) with indications for use in able-bodied individuals by 31 December 2030?" — https://www.randforecastinginitiative.org/questions/1509-will-the-fda-grant-market-approval-for-a-brain-computer-interface-bci-with-indications-for-use-in-able-bodied-individuals-by-31-december-2030

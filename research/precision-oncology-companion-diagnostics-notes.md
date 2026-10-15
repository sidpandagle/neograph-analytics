# Research notes — Precision Oncology & Companion Diagnostics

Gathered 2026-10-16. Working notes for a planned report (report 3 of the
oncology cluster). **Nothing here is published until every figure is attributed
to its source on the page.** All retrieval dates below are 2026-10-16 unless
stated otherwise.

## Why this topic

Third report in the oncology cluster, after `ai-in-oncology-market`,
`ai-in-cancer-diagnostics-market` and the planned oncology-information-systems
report. Unlike OIS, this topic has a genuine public register behind it — the
FDA's own list of authorised companion diagnostic devices — so the arithmetic
can be grounded harder than in the OIS notes.

It also has a worse definitional problem than OIS, and that problem is the
story. See "The analytical point".

## Published market estimates

### A. Estimates published under the name "companion diagnostics"

Verified by fetching the publisher's own page (retrieved 2026-10-16).

| Source | Base | Forecast | CAGR | Definition / scope as stated |
|---|---|---|---|---|
| MarketsandMarkets | $5.66B (2025) | $11.57B (2031) | 12.9% (2026–31) | "an in vitro diagnostic (IVD) device that is used to make biomarker assessments"; counts assay kits, reagents, instruments, software and lab testing services; cancer + infectious + cardiovascular + neurological |
| Credence Research | $8.86B (2024) | $21.94B (2032) | 12% (window stated inconsistently as 2024–32 and 2025–32) | no formal definition; segments by product & services (assays/kits/reagents; instruments & systems; software & services), technology (PCR, NGS, ISH, IHC, MRI), sample type (tissue, blood, other). States assays/kits/reagents ≈54% and oncology ≈62% of 2024 |
| Maximize Market Research | $9.31B (2025) | $21.1B (2032) | 12.4% (2026–32) | no formal definition; product / technology / indication / end-user / region |
| Precedence Research | $9.97B (2025) | $31.46B (2035) | 12.18% (2026–35) | no formal definition; 2026 interim value $11.20B |
| Fortune Business Insights | $10.37B (2025) | $30.25B (2034) | 12.86% (2026–34) | "a test used for the safe and effective application of a corresponding biological product or drug"; 2026 interim $11.49B; states cancer segment = 89.61% of 2026 |
| Zion Market Research (**oncology CDx only**) | $13.30B (2023) | $52.16B (2032) | 16.4% (2024–32) | diagnostics only (products + services); no therapeutic segment sized |

### B. Further estimates seen only in search results or press releases

**Lower confidence — these were not confirmed on the publisher's own report
page and must not be published without that confirmation.**

| Source | Base | Forecast | CAGR |
|---|---|---|---|
| DelveInsight | ~$5.91B (2024) | ~$11.89B (2032) | 12.32% |
| SNS Insider (release A) | $8.68B (2023) | $20.6B (2031) | 11.40% |
| SNS Insider (release B) | $7.66B (2023) | $21.15B (2032) | 11.9% |
| DataHorizzon Research | — | $16.8B (2032) | 10.7% |
| Market.us / Persistence (GlobeNewswire, 2023-04-10) | — | $4,786M (2032) | 3.1% |

Note the two SNS Insider releases: **the same publisher gives two different
base-year values for the same base year (2023)** — $8.68B and $7.66B — and two
different CAGRs. That is not a disagreement between analysts; it is one
analyst's number moving. Worth one sentence in the report as evidence for why a
single headline figure cannot be trusted.

### C. Estimates published under the name "precision oncology"

Search-result level only; not individually verified on publisher pages.

| Source | Base | Forecast 2032 | CAGR |
|---|---|---|---|
| Global Market Insights | $68.7B (2022) | $184.8B | 10.6% |
| Market.us | $97.0B (2024) | $202.5B | 9.8% |
| SNS Insider | $110.38B (2024) | $225.65B | 9.35% |
| Maximize Market Research | $118.8B (2025) | $230.04B | 9.9% |
| Precision Business Insights | $132.9B (2025) | $257.3B | 9.9% |
| Coherent MI ("oncology precision medicine") | $153.81B (2025) | $281.17B | 9.00% |
| Persistence Market Research | $132.3**M** (2025) | $280.3**M** | 10.8% |

The Persistence figures are reported in millions against peers' billions — a
three-order-of-magnitude discrepancy that is almost certainly a unit error.
**Do not cite it in either form.** It is, however, a usable example of why
these numbers need checking.

## The analytical point

### 1. The definitional gap is larger than the growth disagreement

Computed from the tables above:

- **Companion diagnostics, 2025 base-year spread: 1.83x** ($5.66B to $10.37B)
- **Companion diagnostics, CAGR spread (verified set, general definition):
  1.075x** (12.0% to 12.9%)
- Widen to the lower-confidence set and the CAGR spread becomes **5.29x**
  (3.1% to 16.4%) and the 2032 endpoint spread **10.9x** ($4.786B to $52.16B)

So, as with the OIS material, the publishers that do real work agree closely on
growth (12–13%) and disagree substantially on what they are counting. But the
sharper fact here is across names rather than within one:

- the **same base year, 2025**, is sized at **$9.31–10.37B** when the report is
  titled "companion diagnostics" and at **$118.8–153.81B** when it is titled
  "precision oncology"
- that is an **11.9x to 15.4x** gap for two phrases that vendor marketing, SEO
  copy and even some of these same publishers treat as near-synonyms

The gap is explicable — "precision oncology" sizing includes targeted and
immuno-oncology **therapeutics**, which is where nearly all the money is, while
"companion diagnostics" sizing is the test layer only — but **no page in either
set states that boundary explicitly.** A report that puts both names in its
title and then quotes one number is misleading by construction. The report must
carry two separately labelled market frames or pick one and say so.

### 2. The approval register: 77 devices, 243 device–drug pairings

Counted by hand from the FDA's own list on 2026-10-16
(https://www.fda.gov/medical-devices/in-vitro-diagnostics/list-fda-authorized-companion-diagnostic-devices-in-vitro-and-imaging-tools).
Device numbers cross-checked against the openFDA PMA endpoint
(https://api.fda.gov/device/pma.json).

- **243 rows total** — 234 in the main table ("List of FDA-Authorized Companion
  Diagnostic Devices (In Vitro and Imaging Tools)") plus **9** in the second
  table, "Device Indication for a Specific Group of Oncology Therapeutic
  Products" (group labelling)
- **77 distinct base submissions** across those rows — i.e. roughly **77
  distinct FDA-authorised companion diagnostic devices**, not 243
- of the 77, **74 appear at least once as an original (non-supplement)
  authorisation**; the pathway mix is 68 PMA, 4 De Novo (DEN130012, DEN200059,
  DEN240035, DEN240067), 2 510(k) (K173492, K242952), 3 HDE (H140005, H140006,
  H230005), plus BR220737 and BK241074

**Row counts by year** (main table, 234 rows; a row is one device–drug/
indication pairing, and a single PMA supplement commonly generates several
rows):

| Year | Rows | Year | Rows |
|---|---|---|---|
| pre-2015 (1997–2014, 12 years) | 27 | 2021 | 15 |
| 2015 | 8 | 2022 | 21 |
| 2016 | 7 | 2023 | 17 |
| 2017 | 22 | 2024 | 22 |
| 2018 | 12 | 2025 | 18 |
| 2019 | 11 | 2026 (to ~Sept) | 28 |
| 2020 | 26 | | |

**The cadence is real but it is flat-to-lumpy, not compounding.** 2020 (26) and
2017 (22) were as busy as 2024 (22). 2026 is on course to be the highest year
on the register, but 2025 (18) was below 2022 (21). There is no 12–13%
year-on-year compounding in the approval record. Over 2017–2025 the annual row
count went 22, 12, 11, 26, 15, 21, 17, 22, 18 — a trendless oscillation.

**That is the finding to build on.** The published estimates claim a market
compounding at 12–13% a year. The regulatory register that defines the product
category shows authorisation activity oscillating around ~19 pairings a year
since 2017 with no trend. Either the growth is in price, volume and
reimbursement per existing assay rather than in new assays, or the estimates
are measuring something other than authorised companion diagnostics. The report
should say which it thinks and show this table.

### 3. Drug-to-CDx coupling — the measured ratio

Two peer-reviewed sources, independently arrived at, converge:

- **Jørgensen JT**, "An analysis of FDA drug approvals for oncological
  hematological malignancies in relation to companion diagnostics",
  *Frontiers in Oncology*, online 2025-09-25, DOI 10.3389/fonc.2025.1635491
  (PMID 41079076). Of **217 new molecular entities** approved for oncological
  and haematological malignancies **1998–2024**, **78 (36%)** were linked to one
  or more CDx. Split by era: **7 of 46 (15%)** in 1998–2010 and **71 of 171
  (42%)** in 2011–2024. For 52 of the 78 (67%) drug and CDx were approved
  simultaneously; for 26 (33%) the CDx followed by supplement. By class:
  kinase inhibitors 48 of 80 (60%) CDx-linked; antibodies 39%; small molecules
  26%; chemotherapeutics 0 of 20; ATMPs 0 of 12. 9 of 217 (4%) have a
  tissue-agnostic indication and all 9 were CDx-linked, but for 8 of the 9 the
  CDx came **after** the drug (mean delay reported as 707 days, range 0–1,732).
- **Saito K, Narukawa M**, "Strategic Integration of Companion Diagnostics in
  Precision Oncology: Key Factors, Drug Development Timelines, and Regulatory
  Insights from U.S. FDA Approvals", *Therapeutic Innovation & Regulatory
  Science* 60(4):983–992, online 2026-03-17, DOI 10.1007/s43441-026-00917-z
  (PMID 41845174). **354 oncology indications across 127 anticancer drugs
  approved 2014–2024.** CDx-linked indications rose to **43% of indications by
  2022**. CDx presence associated with a mean development-time reduction of
  **~379.5 days** for new molecular entities, comparable in magnitude to
  Breakthrough Therapy Designation. Sponsor size and orphan designation had no
  effect on CDx adoption.

**So the measured coupling ratio is 36% of oncology/haematology NMEs since 1998,
42% since 2011, and 43% of indications by 2022.** That is a real number with a
method behind it, and it is far more useful to a reader than any CAGR. It also
bounds the opportunity: on current practice **well over half of new oncology
drug approvals do not carry a required companion diagnostic**, and two whole
classes (cytotoxic chemotherapy, cell and gene therapy) carry none at all.

Note the direction of the Saito finding carefully: CDx presence **correlates
with** shorter development time, and the authors attribute much of it to a
higher likelihood of early-phase approval. It is not evidence that adding a CDx
shortens a programme. Do not publish it as causal.

### 4. Tissue vs liquid biopsy — what is actually authorised

From the FDA list, cross-checked to openFDA for trade name and applicant:

Plasma / circulating-tumour-DNA assays I could verify on the register:

| Device | Submission | Applicant | Rows on the list |
|---|---|---|---|
| FoundationOne Liquid CDx | P190032 | Foundation Medicine | 14 |
| Guardant360 CDx | P200010 | Guardant Health | 10 |
| Guardant360 Liquid CDx | P250027 (original 2026-05-19) | Guardant Health | 7 |
| Signatera CDx | P260004 (original 2026-05-15) | Natera | 1 |
| cobas EGFR Mutation Test v2 (tissue **and** plasma; plasma use approved 2016-06-01) | P120019 | Roche | 10 |

- **Strictly plasma-based assays account for 32 of 243 rows (13.2%).**
- Including the dual tissue/plasma cobas assay: **42 of 243 (17.3%)**.
- Jørgensen's paper **does not report** a tissue-versus-liquid split, and gives
  **no percentage breakdown by technology** (IHC, FISH/ISH, PCR, NGS) either —
  it notes only that IHC and ISH dominated before 2011, that PCR entered as a
  CDx platform in 2011 and NGS in 2017.

Against that: Credence puts **NGS at ~38%** of its 2024 market value and
segments by sample type **tissue / blood / other** without publishing the
split; MarketsandMarkets and Fortune both segment by sample type likewise
without a published split. **So the estimates assume a liquid-biopsy share that
none of them discloses, and the register says the authorised liquid share of
device–drug pairings is about 13–17%.** This is a legitimate second check in
the report, with the caveat below.

I did **not** verify sample type for all 77 submissions, so **13.2% / 17.3%
must be presented as a floor**, not as the share.

### 5. The two 2026 entrants worth naming

Both are originals, both 2026, both from companies previously outside the CDx
register:

- **Guardant360 Liquid CDx** — P250027, original decision 2026-05-19, Guardant
  Health; already carries 7 rows on the list by October 2026
- **Signatera CDx** — P260004, original decision 2026-05-15, Natera; 1 row

(Decision dates from openFDA PMA records, retrieved 2026-10-16.)

## Bottoms-up test — what the headline numbers imply per unit

### Test 1: per authorised companion diagnostic device

Denominator: **77** distinct FDA-authorised CDx submissions (counted above).

| Source | Base | Implied revenue per authorised CDx, per year |
|---|---|---|
| Zion (oncology CDx only) | $13.30B (2023) | **$172.7M** |
| Fortune Business Insights | $10.37B (2025) | **$134.7M** |
| Precedence Research | $9.97B (2025) | $129.5M |
| Maximize Market Research | $9.31B (2025) | $120.9M |
| Credence Research | $8.86B (2024) | $115.1M |
| MarketsandMarkets | $5.66B (2025) | $73.5M |

Reality anchor, from filed full-year 2025 results of the three largest
independent US molecular-oncology laboratories:

| Company | FY2025 total revenue (all businesses) | CDx submissions held on the FDA list |
|---|---|---|
| Natera | **$2,306.1M** (up 35.9% on $1,696.9M) | 1 (Signatera CDx, authorised May 2026) |
| Guardant Health | **$982.0M** (up 33%) | 2 (Guardant360 CDx; Guardant360 Liquid CDx) |
| Myriad Genetics | **$824.5M** (down 2%) | 2 (BRACAnalysis CDx P140020; myChoice CDx P190014) |
| **Combined** | **$4,112.6M** | 5 of 77 |

**That $4.11B is every dollar those three companies earned from everything they
do** — non-invasive prenatal testing, carrier screening, hereditary cancer
panels, MRD surveillance, blood-based colorectal screening, biopharma services —
of which companion diagnostic testing is a minority in each case. Yet five
published estimates place the **global companion diagnostics market** at
$8.86–13.30B.

The arithmetic only closes if the published estimates are counting, in addition
to clinical CDx assay revenue: Roche and Agilent IHC/ISH antibody and reagent
revenue, instrument and consumable sales, software, and — most likely the
largest single piece — **pharmaceutical co-development and biopharma service
revenue**, which is paid by drug sponsors rather than by payers for patient
testing. Several of the estimates confirm this indirectly by listing
"pharmaceutical and biopharmaceutical companies" and "contract research
organizations" as **end users**.

**That is the explanation the report should give for the 1.83x base-year spread,
and it is checkable arithmetic rather than assertion.** It also means the number
a diagnostics executive wants (clinical assay revenue) and the number these
reports publish (assay + instrument + reagent + software + pharma services) are
not the same number, and the published reports do not separate them.

### Test 2: implied comprehensive-profiling test volume

Price anchor: **$3,500** — the Medicare rate for CPT **0037U** (FoundationOne
CDx), set when CMS granted it the first Advanced Diagnostic Laboratory Test
designation in 2018 and still $3,500 on a West Virginia Medicaid schedule
effective 2025-04-01 to 2026-03-31. **I could not confirm the current federal
CLFS rate from a CMS file directly** — see Gaps.

Denominator: **19,964,800** new cancer cases worldwide in 2022, GLOBOCAN 2022 /
IARC (including non-melanoma skin cancers), as published in Bray et al.,
*CA: A Cancer Journal for Clinicians*, 2024.

If the entire published companion diagnostics market were comprehensive genomic
profiling billed at $3,500:

| Source | Base | Implied CGP tests/yr | As % of new cancer cases worldwide |
|---|---|---|---|
| Fortune Business Insights | $10.37B | 2.96M | 14.8% |
| Precedence | $9.97B | 2.85M | 14.3% |
| MarketsandMarkets | $5.66B | 1.62M | 8.1% |

Comparator for whether that is plausible: **MYLUNG Consortium Protocol 2**, a
prospective observational study of 556 patients with metastatic NSCLC enrolled
2020-12 to 2022-09 in The US Oncology Network community practices (*JCO
Precision Oncology*, published 2026-04-22, 10(4):e2500832):

- 98.8% tested for **at least one** biomarker at any time
- **72.8% received NGS testing** (405 patients)
- 71.0% tested for all five guideline-concordant biomarkers (BRAF, EGFR, ROS1,
  ALK, PD-L1)
- 63.5% for the 8-gene panel; 79.0% had ≥1 biomarker result before first-line
  therapy; only **55.6% had NGS results before first-line therapy**

and Protocol 1 (retrospective, 3,474 patients, 2018–2020): 90% tested for ≥1
biomarker, **46% for all five**, NGS use rising 33% → 45%.

So in the **best-case tumour type** (metastatic NSCLC), in a well-resourced US
community network, NGS reached 72.8% — and results arrived before treatment
only 55.6% of the time. Extrapolated worldwide across all tumour types, an
8–15% global CGP penetration rate is not obviously implausible; **this test does
not refute the estimates.** Report it honestly as that: a plausibility check the
published figures survive, which makes Test 1 the load-bearing one.

### Test 3: vendor concentration by countable pairings

Not revenue share — a count of rows on the FDA list, which is a fact.

| Device | Submission | Applicant | Rows (of 243) |
|---|---|---|---|
| FoundationOne CDx | P170019 | Foundation Medicine | **37** |
| FoundationOne Liquid CDx | P190032 | Foundation Medicine | 14 |
| Oncomine Dx Target Test | P160045 | Life Technologies (Thermo Fisher) | 14 |
| Guardant360 CDx | P200010 | Guardant Health | 10 |
| PD-L1 IHC 22C3 pharmDx | P150013 | Agilent | 10 |
| cobas EGFR Mutation Test v2 | P120019 | Roche | 10 |
| PATHWAY anti-HER-2/neu (4B5) | P990081 | Ventana (Roche) | 8 |

- The **top 7 submissions account for 103 of 243 rows (42.4%)**.
- Roche-group entities (Foundation Medicine, Ventana / Roche Tissue
  Diagnostics, Roche Molecular) hold **83 of 243 rows (34.2%)** across nine
  submissions: P170019 (37), P190032 (14), P120019 (10), P990081 (8), P190031
  (4), P210001 (4), P140025 (4), P250031 (1), P240037 (1).
- Agilent holds **19 of 243 (7.8%)**: P150013 (10), P980018 HercepTest (4),
  P040005 HER2 FISH pharmDx (4), P230016 MAGE-A4 IHC 1F9 pharmDx (1).

**This is a concentration-of-authorisations count, not a market share.** It must
be labelled that way every time it appears. A single FoundationOne CDx row and
a single HercepTest row are not equal revenue.

## Caveats that must survive into the published report

- **The 243 / 234 / 9 row counts were read off the rendered FDA page across
  three overlapping retrievals on 2026-10-16.** The junction between retrievals
  was verified by overlap, but a count assembled this way may be off by one or
  two rows at table boundaries. State the retrieval date and the method; do not
  present 243 as exact to the unit. The **77 distinct submissions** figure is
  more robust because it survives small row-level error.
- **The FDA page carries no "content current as of" date and no completeness
  disclaimer** that I could find. It is the authoritative register but it is not
  dated, so any count from it is "as retrieved on 2026-10-16" and nothing
  stronger. The page directs questions to DICE@fda.hhs.gov.
- **One row on the list bears the date "08/22/0218"**, an evident typo. I
  allocated it to 2018. Say so if the year table is published.
- **A row is a device–drug/indication pairing, not an approval event.** One PMA
  supplement frequently generates several rows (P250027 produced 7; P240010 MI
  Cancer Seek produced 7). The year table counts pairings. Do not describe it as
  "FDA approvals per year".
- **Counts of "indications" are not comparable across sources.** Foundation
  Medicine's press release of 2025-12-04 claims **100 approved and active CDx
  indications, 57 in the US and 43 in Japan**. My count of US FDA-list rows for
  its two devices (P170019 + P190032) is 51 as of 2026-10-16 — *fewer*, at a
  *later* date, than the company's US claim. The two are counting different
  units (a single FDA-list row can name two drugs; a company can count
  biomarker × drug × tumour combinations). **Report both numbers with their
  definitions and do not reconcile them.**
- **Foundation Medicine's "first and only" and "global leader" claims are the
  company's own characterisation** and were not independently verified. Roche
  reported 2025 Diagnostics division sales of **CHF 13.85bn** (down from CHF
  14.32bn in 2024, up 2% at constant exchange rates) and **does not break out
  Foundation Medicine or companion diagnostics**. Nobody public knows FMI's
  revenue.
- **No methodology was inspected** for any estimate in sections A, B or C. They
  are "published third-party estimates" and must be labelled as such, with the
  stated definition recorded where the publisher gives one (MarketsandMarkets
  and Fortune do; Credence, Maximize and Precedence do not).
- **Section B and C figures came from search results, not publisher pages.**
  Either verify each on the publisher's own page before publication or drop it.
- **The $3,500 price anchor is not confirmed against a current CMS CLFS file.**
  It traces to the 2018 ADLT designation and a 2025/26 state Medicaid schedule.
  Do not state it as "the current Medicare rate".
- **MYLUNG is one tumour type, one US network, enrolled 2020–2022.** It is the
  best available real-world testing-rate evidence in the notes, and it is not
  generalisable to all cancers or outside the US. Enrolment ended more than
  three years before publication.
- **The liquid-biopsy share (13.2% / 17.3% of rows) is a floor**, because sample
  type was not verified for all 77 submissions.
- **Saito's development-time finding is an association, not causation**, and the
  authors themselves attribute much of it to a higher likelihood of early-phase
  approval.

## Regulatory context

### FDA pathway

- A companion diagnostic is defined on the FDA list page as a device —
  IVD **or imaging tool** — "that provides information that is essential for
  the safe and effective use of a corresponding therapeutic product". The
  intended CDx use is stipulated both in the diagnostic's own labelling **and**
  in the therapeutic product's labelling, "as well as in the labeling of any
  generic equivalents and biosimilar equivalents".
- Most authorisations are PMA; the register also contains De Novo (4), 510(k)
  (2) and HDE (3) routes, so "CDx approval" is not a single pathway.
- FDA maintains a second, separate table for devices indicated for a **group**
  of oncology therapeutic products rather than a named drug — 9 rows. This
  group-labelling mechanism is the regulatory expression of the shift from
  one-drug-one-test toward panel-level claims, and it is small: **9 of 243 rows
  (3.7%)**.

### LDT regulation — the 2026 status

- The FDA LDT final rule was **vacated in full** by the US District Court for
  the Eastern District of Texas (Judge Sean Jordan) on **2025-03-31**, in the
  consolidated *ACLA v. FDA* / *AMP v. FDA* litigation. The court held that
  LDTs are not "devices" under the FFDCA and that FDA had exceeded its
  statutory authority.
- **FDA did not appeal.** Secondary analyses (Arnold & Porter, July 2026;
  Husch Blackwell) describe the pre-rule status quo as restored, with CLIA the
  operative framework for most LDTs, and note that FDA continues to assert
  jurisdiction over distributed kits, components and software.
- **This matters enormously to the report's thesis.** It means the large
  majority of clinical oncology NGS in the US is performed as laboratory
  developed tests outside FDA authorisation. An NCCN educational deck (2021)
  states that most oncology NGS testing is performed as LDTs. **So the 77-device
  register is a complete census of FDA-authorised CDx and an incomplete picture
  of actual clinical biomarker testing.** The report must state this plainly,
  because it is the main limitation on Test 1 and Test 2.
- Legislative codification of CLIA-based oversight has been proposed; one
  secondary source cites **H.R. 8890, introduced 2026-05-19**. **I could not
  verify this against congress.gov** — see Gaps. Do not publish the bill number
  unverified.

### NCCN

- NCCN recommends biomarkers and testing approaches; it does **not** require an
  FDA-approved companion diagnostic, and an NCCN-derived brochure notes the
  NSCLC guidelines "do not endorse particular commercial assays". Requirements
  to use an FDA-approved CDx are **payer** rules, not NCCN rules — a Maryland
  Medicaid policy is an example of a payer that imposes one.
- **No primary NCCN guideline text was read.** All NCCN statements above are
  from secondary sources, some dated 2018–2021. Verify against the current NCCN
  NSCLC guideline before publishing any of it.

### CMS

- **NCD 90.2** covers NGS as a diagnostic laboratory test for somatic
  (effective for services on or after 2018-03-16) and germline (2020-01-27)
  cancer, under stated conditions and in a CLIA-certified lab on a treating
  physician's order. CMS's own text describes in vitro companion diagnostics as
  "essential for the safe and effective use of a corresponding therapeutic
  product". A secondary source says the NCD affords automatic coverage to
  FDA-approved NGS companion diagnostics; **I could not confirm that exact
  wording from the CMS text itself.**
- CMS adds individual tests to the NCD over time — e.g. 0473U, xT CDx (Tempus
  AI), effective 2024-07-01.
- The FDA/CMS **parallel review** route exists and was used: Foundation
  Medicine's CEO credits parallel review for F1CDx's pan-tumour CDx approval
  and simultaneous national Medicare coverage.

### EU IVDR

- Companion diagnostics are classified **at least Class C** under IVDR
  **Annex VIII, Rule 3(f)** (BfArM). Under **Article 48**, the notified body
  must obtain a scientific opinion from EMA (for centrally authorised
  medicines, or those with a pending centralised application) or from the
  relevant national competent authority, and give it due weight.
- Transition end dates, set by **Regulation (EU) 2024/1860**: **Class D
  2027-12-31, Class C 2028-12-31, Class B and sterile Class A 2029-12-31** —
  conditional on milestone gates. For Class C the application milestone was
  **2026-05-26** and the written-agreement milestone **2026-09-26**, both now
  passed. Missing a milestone ends that device's transition on the milestone
  date, not in December 2028.
- Notified body capacity is the documented driver of the extension. A European
  Commission document of December 2025 records **51 notified bodies designated
  under MDR and 19 under IVDR**.
- **No source found addresses companion diagnostics specifically** within the
  IVDR transition — the Class C timeline is the applicable one by
  classification, not by a CDx-specific rule. Say exactly that; do not assert a
  documented CDx-specific IVDR impact, because I did not find one.

## Vendor landscape — what is and is not knowable

**Knowable and publishable** (all counts as retrieved 2026-10-16):

- Which companies hold FDA CDx authorisations, how many distinct submissions
  each holds, and how many device–drug rows each appears in (Test 3 above).
- Trade names and applicants, from openFDA PMA records: Foundation Medicine
  (P170019 FoundationOne CDx, P190032 FoundationOne Liquid CDx); Guardant
  Health (P200010 Guardant360 CDx, P250027 Guardant360 Liquid CDx); Roche /
  Ventana (P990081 PATHWAY anti-HER-2/neu 4B5, P190031 HER2 Dual ISH, P210001
  VENTANA MMR RxDx Panel, P140025 VENTANA ALK D5F3 CDx, P250031 VENTANA PTEN
  SP218 RxDx, P240037 VENTANA MET SP44 RxDx, P120019 cobas EGFR v2); Agilent
  (P150013 PD-L1 IHC 22C3 pharmDx, P980018 HercepTest, P040005 HER2 FISH
  pharmDx, P230016 MAGE-A4 IHC 1F9 pharmDx); Thermo Fisher / Life Technologies
  (P160045 Oncomine Dx Target Test); Illumina (P230011 TruSight Oncology
  Comprehensive); Caris Life Sciences (P240010 MI Cancer Seek); Myriad
  (P140020 BRACAnalysis CDx, P190014 myChoice CDx); QIAGEN (P110027 therascreen
  KRAS RGQ PCR, P120022 therascreen EGFR RGQ PCR); Natera (P260004 Signatera
  CDx); Abbott Molecular (P170041 RealTime IDH1); Pillar Biosciences (P200011
  ONCO/Reveal Dx Lung & Colon); Promega (P240026 OncoMate MSI Dx); Entrogen
  (P220005 CRCDx RAS).
- Filed full-year 2025 total revenue for the three listed pure-play labs
  (Natera $2,306.1M, Guardant Health $982.0M, Myriad Genetics $824.5M) — with
  the explicit statement that these are **company-wide, not CDx, revenues**.
- Roche Diagnostics 2025 division sales of CHF 13.85bn, with the explicit
  statement that **companion diagnostics are not broken out**.

**Not knowable from public sources:**

- **No current, precise companion diagnostics market shares are public.**
  Foundation Medicine, Agilent, Thermo Fisher, Illumina, Roche/Ventana and
  QIAGEN do not disclose CDx-segment revenue. Caris is private.
- No public source states what fraction of any company's revenue is companion
  diagnostics versus general clinical testing versus biopharma services.
- Guardant's own press release claims its 2026 colorectal approval was its
  "25th companion diagnostic indication". That is a company count on a company
  definition, not an independently verifiable share.

→ **Do not publish a competitive share table.** State that CDx-segment revenue
is not disclosed by any major holder, publish the authorisation-count table
(Test 3) clearly labelled as a count of FDA-list rows, and leave
`competitive_landscape` with named players and no invented percentages. Same
discipline as the OIS and cancer-diagnostics reports.

## Gaps — what is still missing before writing

1. **Current federal CMS CLFS rate for 0037U.** The $3,500 anchor traces to the
   2018 ADLT designation and a state Medicaid schedule. Pull the CY2026 CLFS
   file from cms.gov and record the figure and effective date, or drop Test 2's
   price anchor.
2. **Exact NCD 90.2 text on FDA-approved CDx.** Open the CMS Medicare Coverage
   Database record (NCDId=372) and quote the somatic coverage conditions
   verbatim. The secondary claim of "automatic coverage for FDA-approved NGS
   CDx" is currently unverified.
3. **Primary NCCN language.** Everything in the NCCN subsection is secondary
   and partly from 2018–2021. Either read the current NSCLC guideline or cut
   the NCCN material.
4. **H.R. 8890** (claimed LDT oversight bill, introduced 2026-05-19) — verify on
   congress.gov or delete.
5. **Sample type for all 77 submissions.** Needed to convert the 13.2%/17.3%
   liquid-biopsy floor into an actual share. openFDA PMA records plus each
   device's FDA summary of safety and effectiveness would do it; it is
   mechanical but about 70 lookups.
6. **A technology split (IHC / ISH / PCR / NGS) over the 77 submissions.** No
   peer-reviewed source publishes one — Jørgensen explicitly does not — and
   Credence's "NGS ≈38%" is a value share on an uninspected methodology.
   Deriving the count from the register would be an original and checkable
   contribution.
7. **Verification of every section B and C estimate on its publisher's own
   page.** Currently search-snippet sourced.
8. **EU register equivalent.** EUDAMED's public data and the EMA CDx
   consultation records were not examined. If an EU count of certified CDx is
   extractable, it would be a second independent denominator — the strongest
   remaining upside in these notes.
9. **Full Saito abstract.** Paywalled; the figures above came from the Europe
   PMC record. Quote from the paper itself before publishing its numbers.
10. **The FDA list is undated.** Ask DICE@fda.hhs.gov whether an update
    cadence or a machine-readable version exists, so the count is reproducible.

## Do not publish

- **Do not publish a single headline market size.** The name determines the
  number: $9.31–10.37B for "companion diagnostics", $118.8–153.81B for
  "precision oncology", same base year. Publish both frames with their names
  and definitions, or publish one and say which.
- **Do not publish a competitive market share table.** No holder discloses
  CDx-segment revenue. The authorisation-count table is a count, and must be
  labelled as a count on every appearance.
- **Do not publish "243 FDA-approved companion diagnostics".** There are
  **77 distinct authorised devices**; 243 is the number of device–drug/
  indication rows on the FDA list, many of them supplements to the same device.
- **Do not publish the year table as "FDA CDx approvals by year".** It is
  device–drug pairings by year, assembled from a rendered page on 2026-10-16.
- **Do not claim the approval cadence validates a 12–13% CAGR.** It does not:
  2017–2025 pairings run 22, 12, 11, 26, 15, 21, 17, 22, 18 — trendless.
  Report the discrepancy; do not resolve it with an assertion.
- **Do not claim adding a CDx shortens drug development.** Saito reports an
  association of ~379.5 days and attributes much of it to earlier-phase
  approval.
- **Do not publish the Persistence Market Research precision oncology figures**
  in either millions or billions. The units are internally inconsistent with
  every peer.
- **Do not publish the Market.us/Persistence $4,786M-by-2032 / 3.1% CAGR
  companion diagnostics figure** alongside the others as if comparable. If it
  appears at all, it appears as an example of the spread.
- **Do not reconcile Foundation Medicine's "57 US CDx indications" with the
  FDA list's 51 rows.** Report both with their definitions.
- **Do not state an EU IVDR impact specific to companion diagnostics.** The
  Class C classification and Article 48 consultation duty are documented; a
  CDx-specific transition rule or documented market impact is not.
- **Do not state that the FDA CDx register describes clinical biomarker testing
  practice.** The LDT rule was vacated on 2025-03-31 and most US oncology NGS is
  performed as laboratory developed tests outside FDA authorisation.
- **Do not publish the liquid-biopsy share as 13.2% or 17.3% without the word
  "at least".** Sample type was not verified for all 77 submissions.
- **Do not publish the H.R. 8890 bill number, the "automatic Medicare coverage"
  claim, the $3,500 "current Medicare rate", or any NCCN statement** until the
  corresponding gap above is closed.

## Sources

**Registers and regulators**

- FDA, List of FDA-Authorized Companion Diagnostic Devices (In Vitro and
  Imaging Tools) — https://www.fda.gov/medical-devices/in-vitro-diagnostics/list-fda-authorized-companion-diagnostic-devices-in-vitro-and-imaging-tools
  (retrieved 2026-10-16; the older "List of Cleared or Approved Companion
  Diagnostic Devices" URL 301-redirects here)
- openFDA device PMA endpoint — https://api.fda.gov/device/pma.json
- CMS, NCD 90.2 Next Generation Sequencing — https://www.cms.gov/medicare-coverage-database/view/ncd.aspx?NCDId=372
- CMS transmittal R215NCD (NGS NCD) — https://www.cms.gov/regulations-and-guidance/guidance/transmittals/2019downloads/r215ncd.pdf
- CMS, Advanced Diagnostic Laboratory Tests under the Medicare CLFS — https://www.cms.gov/files/document/advanced-diagnostic-laboratory-tests-under-medicare-clfs.pdf
- CMS, Preliminary CY2027 Clinical Laboratory Fee Schedule payment rates — https://www.cms.gov/newsroom/fact-sheets/preliminary-calendar-year-cy-2027-medicare-clinical-laboratory-fee-schedule-payment-rates
- West Virginia Bureau for Medical Services, Clinical Lab Fee Schedule
  effective 04/01/25–03/31/26 — https://bms.wv.gov/media/28301/download
- European Commission, Extension of the IVDR transitional periods (Q&A) — https://health.ec.europa.eu/document/download/dfd7a1c6-f319-4682-9bac-77bef1165818_en?filename=mdr_qna-ext-ivdr.pdf
- European Commission, COM(2025) 1023 final, 2025-12-16 — https://health.ec.europa.eu/document/download/25e7ea7c-cab3-40cf-86d9-d11f5e7744d8_en?filename=md_com_2025-1023_act_en.pdf
- BfArM, Companion diagnostics (CDx) — https://bfarm.de/EN/Medical-devices/Tasks/Special-topics/Companion-diagnostics/_node.html
- Congressional Research Service, FDA Regulation of Laboratory-Developed Tests
  (IF11389) — https://www.congress.gov/crs-product/IF11389

**Peer-reviewed literature**

- Jørgensen JT, "An analysis of FDA drug approvals for oncological
  hematological malignancies in relation to companion diagnostics",
  *Frontiers in Oncology* (2025), DOI 10.3389/fonc.2025.1635491 — https://www.frontiersin.org/articles/10.3389/fonc.2025.1635491/full
- Saito K, Narukawa M, "Strategic Integration of Companion Diagnostics in
  Precision Oncology...", *Ther Innov Regul Sci* 60(4):983–992 (2026),
  DOI 10.1007/s43441-026-00917-z — https://pubmed.ncbi.nlm.nih.gov/41845174/
- MYLUNG Consortium, "Biomarker Testing Rates and Patterns in Patients With
  Metastatic Non–Small Cell Lung Cancer: A Prospective, Observational Study in
  Community Practices", *JCO Precision Oncology* 10(4):e2500832 (2026-04-22) — https://ascopubs.org/doi/10.1200/PO-25-00832
  (full text: https://pmc.ncbi.nlm.nih.gov/articles/PMC13105603/)
- MYLUNG Protocol 1 — https://pubmed.ncbi.nlm.nih.gov/35313244/
- Bray F et al., "Global cancer statistics 2022: GLOBOCAN estimates...",
  *CA Cancer J Clin* (2024) — https://pubmed.ncbi.nlm.nih.gov/38572751/
- JAMA Health Forum, "Public Health Implications of Legal Challenges to the
  FDA's Regulation of Laboratory-Developed Tests" — https://jamanetwork.com/journals/jama-health-forum/fullarticle/2835281

**Epidemiology**

- American Cancer Society, Cancer Facts & Figures 2026 — https://www.cancer.org/research/cancer-facts-statistics/all-cancer-facts-figures/2026-cancer-facts-figures.html
  (PDF: https://www.cancer.org/content/dam/cancer-org/research/cancer-facts-and-statistics/annual-cancer-facts-and-figures/2026/2026-cancer-facts-and-figures.pdf)
- UICC, GLOBOCAN 2022 summary — https://www.uicc.org/news/globocan-2022-latest-global-cancer-data-shows-rising-incidence-and-stark-inequities

**LDT litigation and analysis**

- ACLA, "Federal Court Vacates FDA Rule on Laboratory Developed Testing
  Services" — https://www.acla.com/federal-court-vacates-fda-rule-on-laboratory-developed-testing-services-siding-with-acla/
- Husch Blackwell, "Federal Court Vacates FDA's Final Rule on
  Laboratory-Developed Tests" — https://www.huschblackwell.com/newsandinsights/federal-court-vacates-fdas-final-rule-on-laboratory-developed-tests
- Arnold & Porter, "Oversight of Laboratory Developed Tests One Year After
  ACLA v. FDA" (July 2026) — https://www.arnoldporter.com/en/perspectives/advisories/2026/07/oversight-of-laboratory-developed-tests-one-year-after-acla-v-fda
- FDLI, "American Clinical Laboratory Association v. FDA" — https://www.fdli.org/2026/06/acla-v-fda/

**Company filings and releases**

- Guardant Health FY2025 results (8-K exhibit 99.1) — https://www.sec.gov/Archives/edgar/data/1576280/000157628026000012/gh-12312025xexhibit991.htm
- Myriad Genetics FY2025 results (8-K exhibit 99.1) — https://www.sec.gov/Archives/edgar/data/899923/000089992326000012/ex991mygn-xearningsrelease.htm
- Natera FY2025 results (8-K exhibit 99.1) — https://www.sec.gov/Archives/edgar/data/1604821/000110465926020482/tm266979d1_ex99-1.htm
- Foundation Medicine, "100 Approved and Active Companion Diagnostic
  Indications" (2025-12-04) — https://www.foundationmedicine.com/press-release/100-cdx
  (Businesswire: https://secure.businesswire.com/news/home/20251204680697/en/Foundation-Medicine-Achieves-Historic-Milestone-of-100-Approved-and-Active-Companion-Diagnostic-Indications-Solidifying-Leadership-in-Precision-Medicine)
- Guardant Health, Guardant360 CDx / LUMAKRAS approval — https://investors.guardanthealth.com/press-releases/press-releases/2021/Guardant360-CDx-Receives-FDA-Approval-as-First-and-Only-Liquid-Biopsy-Companion-Diagnostic-for-Amgens-LUMAKRAS-sotorasib-KRASG12C-Inhibitor-for-Use-in-Advanced-Non-Small-Cell-Lung-Cancer/default.aspx
- Guardant Health, Guardant360 CDx / BRAFTOVI approval (2026) — https://investors.guardanthealth.com/press-releases/press-releases/2026/Guardant-Health-Receives-FDA-Approval-for-Guardant360-CDx-as-Companion-Diagnostic-for-BRAFTOVI-encorafenib-Combination-in-Patients-with-BRAF-V600E-Mutant-Metastatic-Colorectal-Cancer/default.aspx
- NCI, "FDA Approves Two Liquid Biopsy Tests" (2020) — https://www.cancer.gov/news-events/cancer-currents-blog/2020/fda-guardant-360-foundation-one-cancer-liquid-biopsy
- FDA, cobas EGFR Mutation Test v2 — https://www.fda.gov/drugs/approved-drugs/cobas-egfr-mutation-test-v2

**Published third-party market estimates**

- MarketsandMarkets — https://www.marketsandmarkets.com/Market-Reports/companion-diagnostic-market-155571681.html
- Fortune Business Insights — https://www.fortunebusinessinsights.com/companion-diagnostics-market-107097
- Credence Research — https://www.credenceresearch.com/report/companion-diagnostics-market
- Precedence Research — https://www.precedenceresearch.com/companion-diagnostics-market
- Maximize Market Research — https://www.maximizemarketresearch.com/market-report/global-companion-diagnostics-market/22057/
- Zion Market Research (oncology CDx) — https://www.zionmarketresearch.com/report/oncology-companion-diagnostic-market
- DelveInsight — https://www.delveinsight.com/report-store/companion-diagnostics-market
- SNS Insider (precision oncology) — https://www.snsinsider.com/reports/precision-oncology-market-4121
- SNS Insider (companion diagnostics, 2024 release via GlobeNewswire) — https://www.globenewswire.com/news-release/2024/10/09/2960586/0/en/Companion-Diagnostics-Market-Size-Worth-US-21-15-billion-by-2032-Rising-Prevalence-of-Cancer-and-Advances-in-Precision-Medicine-Drives-Growth-Research-by-SNS-Insider.html
- DataHorizzon Research (via GlobeNewswire) — https://www.globenewswire.com/de/news-release/2023/09/26/2749997/0/en/Companion-Diagnostics-Market-to-Reach-USD-16-8-Billion-by-2032-CAGR-10-7-Report-By-DataHorizzon-Research.html
- Market.us / Persistence (via GlobeNewswire) — https://www.globenewswire.com/news-release/2023/04/10/2643655/0/en/Companion-Diagnostics-Market-Sales-to-Top-US-4-786-Mn-in-Revenues-by-2032-At-a-CAGR-of-3-1.html
- Global Market Insights (precision oncology) — https://www.gminsights.com/industry-analysis/precision-oncology-market
- Coherent MI (oncology precision medicine) — https://www.coherentmi.com/industry-reports/oncology-precision-medicine-market
- Precision Business Insights (precision oncology) — https://www.precisionbusinessinsights.com/market-reports/precision-oncology-market
- Market.us (precision oncology) — https://media.market.us/precision-oncology-market-news/

**Secondary / context (not citable as evidence without verification)**

- NCCN educational deck, Aisner, biomarkers (2021) — https://education.nccn.org/sites/default/files/Aisner_NCCNbiomarkers21_v1.pdf
- American Cancer Society CAN, Payer Coverage Policies of Tumor Biomarker
  Testing — https://www.fightcancer.org/sites/default/files/Payer%20Coverage%20Policies%20of%20Tumor%20Biomarker%20Testing_DateStamp.pdf
- Maryland Medicaid, Biomarkers for Companion Diagnostic Testing clinical
  criteria — https://dhmh.maryland.gov/mmcp/Documents/BioMarkers%20for%20Companion%20Diagnostic%20Testing%20%26%20Target%20Drug%20Therapy%20-%20Clinical%20Criteria.pdf
- Team-NB, IVDR CDx conformity assessment training — https://www.team-nb.org/team-nb-certification/ivdr-cdx-conformity-assessment-training
- Johner Institute, IVDR transitional periods — https://blog.johner-institute.com/regulatory-affairs/ivdr-transitional-periods/
- CLP Magazine on the Foundation Medicine 100-CDx milestone — https://clpmag.com/diagnostic-technologies/molecular-diagnostics/foundation-medicine-reaches-100-approved-companion-diagnostic-indications/

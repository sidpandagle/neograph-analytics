# Pharmacogenomics Market — research notes
**Slug:** pharmacogenomics-market   **Drafted:** 2026-10-16

## Published estimates (what others say)

| Source | Published | Base year | Base value | Forecast year | Forecast value | CAGR | Scope as stated |
|---|---|---|---|---|---|---|---|
| P&S Intelligence (report 12295) | Dec 2024 | 2024 | $6.1B (2025: $6.4B) | 2032 | $10.0B | 6.6% (2025–2032) | By service (genotyping, SNP identification, pharmacogenetic testing), application, technology, end user. Study period 2019–2032. States North America 45% of 2024 revenue, PCR 30%, research organisations 40% |
| IMARC Group (SR112026A4396) | last updated 02 Jun 2026 | 2025 | $9.2B | 2034 | $17.6B | 7.25% (2026–2034) | "the study of inherited variations in human genes in response to specific drugs"; technology, application, end user, region. End users limited to hospitals/clinics and academic/research institutes |
| Global Market Insights (2025–2034 edition) | — | 2024 | $6.6B (2025: $7.3B) | 2034 | $17.7B | 10.4% | Pharmacogenomics by offering |
| Global Market Insights (2026–2035 edition) | — | 2025 | $5.7B | — | — | — | Same house, later edition, **$1.6B lower for the same year** |
| Precedence Research, via BioSpace | — | 2022 | $15.0B | 2032 | $35.67B | 9.1% (2023–2032) | Global pharmacogenomics. **Attribution unconfirmed in the article text — flagged** |
| Global Info Research, via a Japanese distributor listing | — | 2025 | $19.24B | 2032 | $42.29B | 11.9% | Global pharmacogenomics. **Read from a distributor listing, not the primary page — flagged.** Highest base in the set |
| Meticulous Research | — | — | — | 2031 | $19.5B | 8.9% (2024–2031) | Global pharmacogenomics |
| QYResearch (not comparable) | — | 2024 | $12.59B | 2031 | $32.47B | 14.7% | **Theranostics and companion diagnostics technology segment only.** Recorded to show how a sub-scope can exceed several whole-market figures |

## The spread

**At 2025, $5.7B to $19.24B — a 3.38x spread.** At 2032, $10.0B to $42.29B — a **4.23x** spread.
Published CAGRs run 6.6% to 11.9%, so both dimensions disagree.

Two things make this spread diagnostic rather than merely wide.

**First, one house disagrees with itself across editions.** Global Market Insights' 2025–2034
edition puts 2025 at $7.3B; its 2026–2035 edition puts the same year at $5.7B. A $1.6 billion,
22% revision of a historical year by the same publisher is not a refinement of a forecast — it
is an admission that the base was never measured.

**Second, the sub-scope is bigger than several of the whole-market figures.** QYResearch sizes
*theranostics and companion diagnostics* alone at $12.59B for 2024, which exceeds P&S's
$6.1B, GMI's $6.6B and IMARC's $9.2B for the whole market. Somewhere in the set, companion
diagnostics is being counted as pharmacogenomics and somewhere it is not, and no page says
which. Oncology companion diagnostics — testing a tumour for a target before prescribing a
targeted drug — is a reimbursed, high-volume activity. Germline pharmacogenomics — testing a
patient's inherited metabolism to choose a dose — is mostly not. Folding the first into the
second is what produces the $15–19B bases.

## Grounding arithmetic

Two countable registers are used: the FDA's own table of pharmacogenomic drug labelling, and
the Medicare clinical laboratory fee schedule.

### Anchor 1 — counting the FDA table

**FDA, "Table of Pharmacogenomic Biomarkers in Drug Labeling", content current as of
08/12/2026, enumerated by us on 16 October 2026:**

```
Rows in the table                                    692
Distinct drug products named (parenthetical
  section-indices collapsed)                         439
```

The table's own scope note matters: where a drug exists in several dosage forms, salts or
combinations, **"a single representative product is listed"**; for combination products the
single agent associated with the biomarker is listed unless that agent is only approved in
combination. And critically: labelling for *some, but not all*, of the listed products
"includes specific actions to be taken based on the biomarker information."

So 439 drugs carry pharmacogenomic information in their labels. That is the number every
published forecast's narrative rests on, usually phrased as "the FDA now lists hundreds of
drugs with pharmacogenomic biomarkers." It is a real, growing, checkable count — and it is
not a measure of reimbursable testing, because most of those entries describe a biomarker
without directing an action.

**The actionable subset is an order of magnitude smaller.** A 2026 analysis of the CPIC list
as updated on 28 July 2026 evaluated **53 active ingredients with CPIC Level A guidance** —
Level A being the tier CPIC considers sufficient to support a prescribing recommendation.
(Read from a secondary analysis, not from cpicpgx.org directly — flagged.)

```
53 / 439 = 12.1%
```

**Published forecasts cite the 439. Payers pay for something closer to the 53.** That single
ratio is the restraint the published series routinely omit.

### Anchor 2 — implied test volume against the Medicare rate

CPT **81418** is the multi-gene pharmacogenomic panel code — "drug metabolism /
pharmacogenomics genomic sequence analysis panel, must include testing of at least 6 genes."
Its Medicare clinical laboratory fee schedule national rate is **$917.08**. (Taken from state
fee-schedule documents that quote the Medicare national limitation amount — Kentucky's 2026
clinical diagnostic laboratory fee schedule and West Virginia Medicaid's schedule effective
04/2025–03/2026 — rather than from the CMS quarterly file directly. **Flagged as a
third-party reproduction of a Medicare figure.**)

Divide the published market sizes by that rate to get the implied annual panel volume:

| Published 2025 figure | ÷ $917.08 | Implied panels per year |
|---|---|---|
| P&S Intelligence, $6.4B | 6,400,000,000 / 917.08 | **6.98 million** |
| IMARC, $9.2B | 9,200,000,000 / 917.08 | **10.03 million** |
| Global Info Research, $19.24B | 19,240,000,000 / 917.08 | **20.98 million** |
| Global Info Research, $42.29B (2032) | 42,290,000,000 / 917.08 | **46.11 million** |

Set those against the population that could be tested. US Medicare enrolment in 2025 was about
**69.3 million**, covering roughly **20.3%** of the US population, which implies a US
population of about **341 million**. (USAFacts aggregating CMS enrolment data — a secondary
aggregator, **flagged**; the primary source is the CMS Medicare Enrollment Dashboard.)

- **6.98 million panels** = 2.0% of the US population per year, or **10.1% of all Medicare
  beneficiaries annually**. Demanding, but reachable: psychiatric PGx panels have substantial
  cash-pay and commercial volume on top of Medicare.
- **20.98 million panels** = 6.1% of the US population per year, or **30.3% of every Medicare
  beneficiary, every year**. Pharmacogenomic genotype does not change, so there is no clinical
  reason to repeat a panel annually, and no payer pays for it twice. Non-US reimbursed PGx
  volume is far smaller than US volume, so the global total cannot rescue the figure.
- **46.11 million panels by 2032** = 13.5% of the US population annually, or **two-thirds of
  the entire Medicare population every single year**.

**The $19.24B base and its $42.29B endpoint are ruled out as measures of reimbursed
pharmacogenomic testing.** They are consistent only with a scope that includes oncology
companion diagnostics, pharma-funded research genotyping, or software and services — which is
exactly what the QYResearch sub-scope figure suggests is happening somewhere in the set.

### Why the published forecasts miss the binding constraint

**There is no Medicare national coverage determination for pharmacogenomic panel testing.**
Coverage is set jurisdiction by jurisdiction. NGS MAC's local coverage determination **L39995,
effective 12 July 2025**, covers panel testing for Minnesota/Wisconsin/Illinois and
New York/New England only when the panel includes at least six genes including CYP2C19 and
CYP2D6 with duplication and deletion analysis; under MolDX criteria, gene-specific testing is
covered only where the gene-drug pair carries CPIC Level A or B evidence or appears in FDA
labelling. (LCD requirements read from a policy-analysis blog summary rather than the LCD text
itself — **flagged**.) Commercial policy is narrower still: Cigna's pharmacogenetic testing
policy lists CPT 81225 (CYP2C19) as not covered, and a CareSource Medicaid policy classes
several high-volume CYP tests as experimental and investigational.

**Payer non-coverage is the restraint, and it is the one the published series do not price.**
A 6.6%–11.9% CAGR on a germline-PGx market is a forecast that coverage policy loosens. Nothing
in the 2025–2026 record suggests it is loosening; L39995 narrowed the panel definition rather
than widening it.

**These are plausibility and ratio tests, not market estimates.** They rule out the high end
of the published range as reimbursed-testing revenue and rule the low end in. They do not
establish the correct market size. The divisor is one US payer's rate for one panel code,
reproduced from state documents; the 53-ingredient CPIC count is from a secondary analysis;
and no register publishes global pharmacogenomic test volume.

## What we publish

**Headline: $6.82B (2026) → $10.01B (2032) at 6.6%.**

Source: P&S Intelligence, *Pharmacogenomics Market Size & Share Analysis (2025–2032)*, report
12295, published December 2024, which states $6.1B for 2024, $6.4B for 2025, $10.0B for 2032
and a 6.6% CAGR over 2025–2032. The 2026 base is **derived by advancing that house's own
published 2025 figure one year at its own stated rate** (6.4 × 1.066 = 6.82); the 2032
endpoint is that house's own published figure, reproduced to the arithmetic
(6.82 × 1.066^6 = 10.01 against its published 10.0). Labelled as interpolation in the report.

Internal check: P&S's own series closes — 6.4 × 1.066^7 = 10.01 against its published $10.0B.

Chosen because: (a) its forecast window is exactly 2025–2032, so the endpoint is published
rather than extrapolated; (b) it carries the **lowest base and the lowest CAGR** in the set,
and the grounding arithmetic above shows the high end is impossible as reimbursed testing while
the low end is merely demanding; and (c) it is corroborated in the same neighbourhood by a
different house — Global Market Insights' 2026–2035 edition puts 2025 at $5.7B, 11% below P&S.

Unit: USD Billion. Industry: Life Sciences.

## Do not publish

- **Vendor market share.** No vendor discloses pharmacogenomic testing revenue separately.
  `competitive_landscape[].market_share` omitted entirely.
- **P&S's "North America 45% of 2024."** A single unexplained percentage from a report page,
  against a total we have only partially validated, and no second source agrees or disagrees
  with it. `regional_analysis` stays `[]`.
- **Country splits.** No named source gives any. `country_analysis` stays `[]`.
- **P&S's segment shares** (PCR 30% of 2024, research organisations 40%). One source, one page,
  no method. Segmentation goes out as plain strings.
- **A number of pharmacogenomic tests performed globally.** Nobody publishes it. The 6.98 and
  20.98 million figures are our own division of published totals by one US payment rate,
  labelled as such, and are not offered as volume measurements.
- **The $19.24B / $42.29B series and the Precedence $15B base as anything but spread.** One was
  read from a distributor listing; the other's attribution is unconfirmed in the article text.
  Both appear in the estimates table, flagged, and are used for nothing else.
- **The QYResearch theranostics/companion-diagnostics figures as pharmacogenomics.** Recorded
  only to demonstrate the scope overlap.
- **A count of CLIA-certified laboratories offering PGx.** CMS publishes CLIA certificate
  counts but not test-menu detail, so no PGx-specific count is derivable.
- **Cost-offset or avoided-adverse-event savings figures.** Widely quoted in PGx advocacy
  literature, not publicly registered at a checkable level.

## Sources

1. U.S. Food and Drug Administration, "Table of Pharmacogenomic Biomarkers in Drug Labeling",
   content current as of 08/12/2026; enumerated by us on 16 October 2026: **692 rows covering
   439 distinct drug products**. Includes the table's own scope note that a single
   representative product is listed per dosage form, salt or combination, and that labelling
   for some but not all listed products includes specific actions to be taken based on the
   biomarker.
   https://www.fda.gov/drugs/science-and-research-drugs/table-pharmacogenomic-biomarkers-drug-labeling
2. CPT 81418 Medicare clinical laboratory fee schedule national rate of **$917.08**, as
   reproduced in Kentucky's 2026 Clinical Diagnostic Laboratory Fee Schedule (revised
   23 September 2026) and West Virginia Medicaid's clinical lab fee schedule effective
   01/04/2025–31/03/2026. *Third-party reproduction of a Medicare figure; the primary source is
   the CMS quarterly CLFS file.*
   https://www.chfs.ky.gov/agencies/dms/DMSFeeRateSchedules/2026ClinicalLabRates.pdf
   and https://bms.wv.gov/media/28301/download
3. CMS Medicare enrolment, 2025 — approximately 69.3 million beneficiaries (62.5 million aged
   65+, 6.95 million under 65), covering about 20.3% of the US population. *Via USAFacts, a
   secondary aggregator of CMS data; the primary source is the CMS Medicare Enrollment
   Dashboard.* https://usafacts.org/answers/how-many-people-are-on-medicare/country/united-states/
4. Clinical Pharmacogenetics Implementation Consortium (CPIC) — Level A and B are the tiers
   CPIC considers sufficient to support a prescribing recommendation; assignments for pairs
   without guidelines are provisional. A 2026 analysis of the CPIC list as updated
   28 July 2026 evaluated **53 active ingredients with CPIC Level A guidance**. *The
   53-ingredient count is from a secondary analysis, not from cpicpgx.org.*
   https://cpicpgx.org/?p=53 and https://www.maxapress.com/article/doi/10.48130/targetome-0026-0043
5. NGS MAC local coverage determination **L39995**, effective 12 July 2025, covering
   pharmacogenomic panel testing in MN/WI/IL and NY/New England; requires a panel of at least
   six genes including CYP2C19 and CYP2D6 with duplication/deletion analysis, and follows MolDX
   criteria under which gene-specific testing is covered where the pair has CPIC Level A or B
   evidence or appears in FDA labelling. *LCD requirements read from a policy-analysis summary,
   not the LCD text.*
   https://www.discoveriesinhealthpolicy.com/2025/07/ngs-mac-new-lcd-for-pgx-testing.html
6. Cigna, "Pharmacogenetic Testing" coverage policy MM 0500 — lists CPT 81225 (CYP2C19) among
   codes considered not medically necessary.
   https://d.static.cigna.com/assets/chcp/pdf/coveragePolicies/medical/mm_0500_coveragepositioncriteria_pharmacogenetic_testing.pdf
7. CareSource Ohio Medicaid policy AD-1342 (effective 01/04/2024) — classes several
   high-volume CYP tests as experimental and investigational.
   https://caresource.com/documents/medicaid-oh-policy-admin-ad-1342-20240401
8. P&S Intelligence, *Pharmacogenomics Market Size & Share Analysis — Trends, Drivers,
   Competitive Landscape, and Forecasts (2025–2032)*, report 12295, 230 pages, published
   December 2024 — $6.1B (2024), $6.4B (2025), $10.0B (2032), 6.6%; North America 45% of 2024;
   PCR 30%; research organisations 40%; Asia-Pacific fastest-growing at 8%.
   https://www.psmarketresearch.com/market-analysis/pharmacogenomics-market
9. IMARC Group, *Pharmacogenomics Market Report by Technology, Application, End User, and
   Region, 2026–2034*, report SR112026A4396, last updated 02 June 2026 — $9.2B (2025) →
   $17.6B (2034), 7.25% (2026–2034).
   https://www.imarcgroup.com/pharmacogenomics-market
10. Global Market Insights, pharmacogenomics market — 2025–2034 edition: $6.6B (2024),
    $7.3B (2025) → $17.7B (2034), 10.4%; 2026–2035 edition: $5.7B (2025).
    https://www.gminsights.com/industry-analysis/pharmacogenomics-market
11. Precedence Research, via BioSpace, "Pharmacogenomics Market Size Is Forecasted To Worth
    USD 35.67 Billion By 2032" — $15B (2022), 9.1% (2023–2032). *Attribution unconfirmed in
    the article text.*
    https://www.biospace.com/pharmacogenomics-market-size-is-forecasted-to-worth-usd-35-67-billion-by-2032
12. Meticulous Research, pharmacogenomics market — $19.5B by 2031, 8.9% (2024–2031).
    https://meticulousresearch.com/pressrelease/593/pharmacogenomics-market-2029
13. ClinicalTrials.gov API v2, `query.term="pharmacogenomic"`, retrieved 16 October 2026:
    **737** registered studies.
    https://clinicaltrials.gov/api/v2/studies?query.term=%22pharmacogenomic%22&countTotal=true
14. Association for Molecular Pathology v. FDA — FDA's laboratory-developed tests final rule
    vacated in its entirety by U.S. District Judge Sean D. Jordan on 31 March 2025, on the
    ground that LDTs are not devices under the FDCA and that Congress assigned their oversight
    to CMS under CLIA; FDA did not appeal within the 60-day window.
    https://www.thefdalawblog.com/2025/04/federal-district-court-vacates-fdas-laboratory-developed-tests-final-rule/

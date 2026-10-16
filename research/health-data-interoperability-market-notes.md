# Health Data Interoperability Market — research notes
**Slug:** health-data-interoperability-market   **Drafted:** 2026-10-16

## Published estimates (what others say)

| Source | Published | Base year | Base value | Forecast year | Forecast value | CAGR | Scope as stated |
|---|---|---|---|---|---|---|---|
| P&S Intelligence (13954) | March 2026 | 2025 | **$5.8B** | 2032 | $14.0B | 13.4% (2026–2032) | "Healthcare interoperability solutions" — solutions and services that let healthcare systems exchange data. Segmented by component (solutions, services); interoperability type (structural, semantic, organisational/process); deployment; end user (hospitals, physician practices, pharma, payers, government and public health agencies, imaging centres, health IT vendors and integrators). Also publishes **$6.5B for 2026** |
| IMARC Group | 2024/2025 edition | 2023 | $3.9B | 2032 | $11.0B | 12.24% (2024–2032) | Global healthcare interoperability solutions |
| Credence Research | 2024 edition | 2023 | $3,857.68M | 2032 | $10,625.41M | 13.38% (2024–2032) | By type (EHR interoperability, HIE interoperability, other solutions, plus services); level (foundational, structural, semantic); deployment; end user (providers, payers). **The same page also publishes $6.78B → $25.41B at 14.10%, so its headline figures are internally inconsistent** |
| SNS Insider | 16 September 2024 (GlobeNewswire) | 2023 | $3.4B | 2032 | $10.9B | 13.8% (2024–2032) | Global healthcare interoperability solutions |
| Global Market Insights (GMI3148) | April 2023 | 2022 | $5.6B | 2032 | $18.9B | 13.2% (2023–2032) | "Healthcare data interoperability". Segmented by level (foundational, structural, semantic); deployment; application (diagnosis, treatment, other); model (centralised, hybrid, decentralised); end use. North America over 44% of 2022. Narrative text says "over USD 5.5 billion", so the exact base is slightly ambiguous |
| Coherent Market Insights (CMI5844 / 7895) | 2025 edition | 2025 | **$84.58B** | 2032 | $352.13B | 22.65% (2025–2032) | "Health data interoperability" — *"a wide range of technologies, standards, and solutions that aim to break down data silos."* Cloud-based nearly two-thirds of 2025; North America nearly 2/5. **Figures reached us through a Barchart-hosted press release, not a clean primary page** |
| Coherent Market Insights (newer edition) | 2026 | 2026 | $103.90B | 2033 | $438.80B | 22.9% (2026–2033) | Same house, same category, later vintage. Shown to demonstrate that the outlier is being carried forward, not corrected |
| Credence Research, "data interoperability" (separate report) | — | — | — | 2032 | ~$349.9B | 22.51% | A **different Credence report** at the Coherent scale. Recorded because the same house publishes both a $10.6B and a $350B version of this market |

## The spread

- **Base-year values for 2025: $5.8B (P&S Intelligence) to $84.58B (Coherent
  Market Insights) — a 14.6x spread.**
- **Published CAGRs: 12.24% to 22.9% — a 1.87x spread.**

Two populations of estimate exist, not one distribution. The "solutions"
population clusters tightly: $3.4B–$5.8B at the base year and 12.2%–13.8%
growth, from four independent houses. The "data interoperability" population
sits at $84.6B–$103.9B at 22.6%–22.9%. There is nothing in between.

The most telling fact in this table is that **Credence Research publishes both
populations**: a *healthcare interoperability solutions* report reaching ~$10.6B
by 2032 at 13.38%, and a separate *data interoperability* report reaching
~$349.9B by 2032 at 22.51%, a 33-fold difference inside one house's catalogue.
That is not a disagreement about the market. It is two different products with
similar titles, and a reader who quotes one while meaning the other will be
wrong by a factor of thirty.

The scope decision is identifiable from Coherent's own wording: *"a wide range of
technologies, standards, and solutions that aim to break down data silos."* Read
literally that includes integration middleware, API management, cloud data
platforms and master data management sold into healthcare — most of which is
general-purpose enterprise software with a healthcare customer, not an
interoperability product.

## Grounding arithmetic

Interoperability is the rare healthcare-IT market with a **small countable
register**: the entities legally designated to move data nationally.

**Register 1 — TEFCA Qualified Health Information Networks.** The Sequoia
Project, which serves as the Recognized Coordinating Entity for the Trusted
Exchange Framework and Common Agreement, lists **11 Designated QHINs**
(retrieved 16 October 2026): CommonWell Health Alliance, eClinicalWorks
(PrismaNet), eHealth Exchange, Epic (Nexus), Health Gorilla, Kno2, KONZA,
MedAllies, Netsmart, Oracle Health Information Network and Surescripts. Oracle's
designation on 20 November 2025 was reported as the eleventh, *"roughly double
the number when TEFCA went live at the end of 2023."* Five were designated in
December 2023 (eHealth Exchange, Epic Nexus, Health Gorilla, KONZA, MedAllies),
two in February 2024 (CommonWell, Kno2), and four across 2025 (eClinicalWorks in
January, Surescripts in April, Netsmart in August, Oracle in November).

**Register 2 — US hospitals.** AHA Annual Survey, 2024 data year: **6,100** US
hospitals, **5,121** community hospitals, **907,216** staffed beds,
**35,658,583** admissions.

### Test 1 — revenue per designated national network

```
$6,500,000,000 (P&S Intelligence, 2026, global) / 11 Designated QHINs
= $590,909,091 per QHIN per year
```

```
$103,900,000,000 (Coherent Market Insights, 2026, global) / 11 Designated QHINs
= $9,445,454,545 per QHIN per year
```

$9.4 billion per QHIN is more than Epic's entire company revenue. Epic is
privately held and does not file, but its revenue has been press-reported at
about **$5.7 billion for 2024** and **$6.7 billion for 2025** — and Epic sells a
complete electronic health record to most of the US hospital market, of which
Nexus is one component.

```
$103,900M (Coherent, 2026) / $6,700M (Epic, reported 2025 revenue)
= 15.5x
```

**The Coherent figure is fifteen times the revenue of the largest company in
health IT.** Interoperability is a feature inside products like Epic's, not a
market fifteen times larger than the leading product vendor.

### Test 2 — spend per US hospital

```
$6,500M (P&S, 2026, global) / 6,100 US hospitals = $1,065,574 per hospital
$103,900M (Coherent, 2026, global) / 6,100 US hospitals = $17,032,787 per hospital
```

Both place a global numerator over a US-only denominator, so both are **upper
bounds** — the real global per-hospital figure is lower. $1.07 million a year per
hospital on interfaces, APIs, terminology services and integration engines is a
believable IT line item for a mid-sized hospital and far too high for a small
one, which is consistent with a global market of that size. **$17 million a year
per hospital on interoperability alone is not a line item any hospital has.**

### Installed-base share — which is not revenue share

KLAS Research's 2025 acute care EHR market share report, released **14 May
2026**, gives **installed-base** shares, which are a different measurement from
revenue share and are stated here as such:

| Vendor | Share of acute care hospitals, 2025 | Share of beds, 2025 |
|---|---|---|
| Epic | 43.7% (from 42.3% in 2024) | 56.9% (from 54.9%) |
| Oracle Health | 21.9% | 20.4% |
| MEDITECH | 14.7% | 12.5% |
| TruBridge | 7.6% | 2.4% |
| Altera Digital Health | 2.9% | 2.8% |

Epic added **77** acute care hospitals in 2025, down from 180 in 2024 and 154 in
2023; Oracle Health lost a net **56**. Hospitals affected by EHR purchase
decisions fell about **40%** against 2024 and nearly **50%** against 2023. Only
two health systems with more than ten hospitals made an enterprise-wide decision
in 2025, and both chose Epic.

**These are hospital and bed counts, not revenue shares, and they must never be
presented as interoperability market share.** They are relevant because a market
where one vendor holds 56.9% of beds is one where much of the "interoperability
problem" is solved inside a single vendor's product and never becomes a
third-party purchase — which is a restraint on the market, not a driver.

**All of the above are plausibility tests, not market estimates.**

## What we publish

**Headline:** $6.50B (2026) → $14.00B (2032) at 13.4%.

Source: P&S Intelligence, March 2026, report code 13954, which publishes $5.8B
for 2025, $6.5B for 2026 and $14.0B for 2032 with a stated 13.4% CAGR over
2026–2032. Those two endpoints imply 13.64% compound, which reconciles with the
stated rate.

Chosen because it is the most recent member of the tightly clustered "solutions"
population, it publishes an explicit 2026 and an explicit 2032 value on one
scope, its segmentation names the buyers rather than abstractions, and it
survives both grounding tests. The Coherent population does not.

Unit: USD Billion. Industry: Healthcare IT.

## Do not publish

- **Vendor market share for interoperability.** No participant discloses
  interoperability revenue. Epic is private and files nothing; the $5.7B/$6.7B
  revenue figures are press reports about a private company, not filings, and
  are whole-company. Oracle reports Oracle Health inside Oracle. Surescripts,
  Health Gorilla, Kno2, KONZA and MedAllies are private or non-profit.
  `competitive_landscape[].market_share` omitted.
- **The KLAS installed-base percentages as market share.** They are counts of
  hospitals and beds running an EHR, from a named source (KLAS 2025 acute care
  EHR market share report, 14 May 2026). They are cited in prose with that
  label. They are not revenue and they are not interoperability.
- **Regional splits.** GMI publishes North America over 44% of 2022 and Coherent
  "nearly 2/5" for 2025, on scopes that differ by fifteen times. Apportioning
  either would be meaningless. `regional_analysis` stays `[]`.
- **Country splits.** None published for this scope.
  `country_analysis` stays `[]`.
- **The Coherent Market Insights series.** Recorded as the high bound, explained
  by its own scope wording and refuted by the Epic-revenue test. Never averaged
  in. Note also that we only have it through a Barchart-hosted press release.
- **The Credence Research headline figures.** The same page publishes two
  mutually inconsistent sets, and the same house publishes a separate report at
  thirty times the scale.
- **A TEFCA transaction-volume figure.** We looked. Neither the Sequoia Project
  nor Oracle published exchange volumes with the designation announcements, and
  we will not estimate one.
- **Any count of certified health IT products.** The ONC/ASTP Certified Health
  IT Product List is the obvious second register, but its REST endpoint returned
  HTTP 400 on the queries we tried and no current total was retrievable from a
  named source. We would rather omit the denominator than publish a stale one.

## Sources

1. The Sequoia Project (Recognized Coordinating Entity for TEFCA), Designated QHINs, retrieved 16 October 2026: **11** designated networks — https://rce.sequoiaproject.org/designated-qhins/
2. Oracle, "Oracle Health Secures TEFCA QHIN Designation", 20 November 2025 — https://www.oracle.com/news/announcement/oracle-health-secures-tefca-qhin-designation-2025-11-20/
3. Healthcare Dive, "Oracle Health lands QHIN designation" (brings the total to 11 QHINs, roughly double the number when TEFCA went live at the end of 2023) — https://www.healthcaredive.com/news/oracle-health-qhin-designation-tefca/806217/
4. ASTP/ONC, "Data Liquidity, Affordability, and Access: The History & Growth of TEFCA" (designation timeline: five in December 2023; CommonWell and Kno2 February 2024; eClinicalWorks January 2025; Surescripts April 2025; Netsmart August 2025; Oracle Health Information Network November 2025) — https://healthit.gov/resources/data-liquidity-affordability-and-access-the-history-growth-of-tefca/
5. ASTP/ONC, TEFCA Updates presentation, 19 February 2026 — https://healthit.gov/wp-content/uploads/2026/02/2026-02-19_TEFCA_Updates_Presentation_508.pdf
6. The Sequoia Project, "ASTP and The Sequoia Project Designate eClinicalWorks as QHIN" (eighth QHIN) — https://sequoiaproject.org/astp-and-the-sequoia-project-designate-eclinicalworks-as-qhin/
7. American Hospital Association, Fast Facts on U.S. Hospitals, 2024 AHA Annual Survey: 6,100 hospitals; 5,121 community hospitals; 907,216 staffed beds; 35,658,583 admissions — https://www.aha.org/statistics/fast-facts-us-hospitals
8. KLAS Research, 2025 acute care EHR market share report, released 14 May 2026, as reported by Fierce Healthcare and Becker's Hospital Review (Epic 43.7% of hospitals and 56.9% of beds; Oracle Health 21.9%/20.4%; MEDITECH 14.7%/12.5%; TruBridge 7.6%/2.4%; Altera 2.9%/2.8%; Epic +77 hospitals in 2025 against +180 in 2024 and +154 in 2023; Oracle Health −56 net; purchase decisions down ~40% on 2024) — https://www.fiercehealthcare.com/health-tech/epic-continues-grow-ehr-market-share-it-makes-gains-small-health-systems and https://www.beckershospitalreview.com/healthcare-information-technology/ehrs/hospital-ehr-market-share-leaders-in-2025-by-category/ — **third-party reporting of a paid KLAS report, not the report itself**
9. Becker's Hospital Review, "Epic's dominance in 14 numbers" (Epic revenue $6.7 billion in 2025) — https://www.beckershospitalreview.com/healthcare-information-technology/ehrs/epics-dominance-in-14-numbers/ — **press report about a private company, not a filing**
10. BizTimes, Judy Faulkner profile (Epic "a reported $5.7 billion in revenue in 2024"; No. 141 on Forbes' list of America's largest private companies) — https://biztimes.com/judy-faulkner-wisconsin275/
11. P&S Intelligence, healthcare interoperability solutions market, March 2026, report code 13954 ($5.8B 2025; $6.5B 2026; $14.0B 2032; 13.4% CAGR 2026–2032) — https://www.psmarketresearch.com/market-analysis/healthcare-interoperability-solutions-market-report
12. IMARC Group, healthcare interoperability solutions market ($3.9B 2023 → $11.0B 2032, 12.24% CAGR 2024–2032) — https://www.imarcgroup.com/healthcare-interoperability-solutions-market
13. Credence Research, healthcare interoperability solutions market ($3,857.68M 2023 → $10,625.41M 2032 at 13.38%; the same page also carries $6.78B → $25.41B at 14.10%) — https://www.credenceresearch.com/report/healthcare-interoperability-solutions-market
14. Credence Research, healthcare data interoperability market (~$349.9B by 2032 at 22.51%) — https://www.credenceresearch.com/report/healthcare-data-interoperability-market
15. SNS Insider, "Healthcare Interoperability Solutions Market Projected to Hit USD 10.9 Billion by 2032", GlobeNewswire, 16 September 2024 ($3.4B 2023 → $10.9B 2032 at 13.8%) — https://www.globenewswire.com/de/news-release/2024/09/16/2946699/0/en/Healthcare-Interoperability-Solutions-Market-Projected-to-Hit-USD-10-9-Billion-by-2032-Exclusive-Report-by-SNS-Insider.html
16. Global Market Insights, healthcare data interoperability market, report GMI3148, April 2023 ($5.6B 2022 → $18.9B 2032 at 13.2%; North America over 44% of 2022) — https://www.gminsights.com/industry-analysis/healthcare-data-interoperability-market
17. Coherent Market Insights, health data interoperability market, as reported by Barchart ($84.58B 2025 → $352.13B 2032 at 22.65%; cloud-based nearly two-thirds of 2025; North America nearly 2/5) — https://www.barchart.com/story/news/32856632/health-data-interoperability-market-to-hit-us35213-billion-by-2032-with-2265-cagr-coherent-market-insights — **third-party-hosted press release**
18. Coherent Market Insights, health data interoperability market segmentation page, report 7895 ($103.90B 2026 → $438.80B 2033 at 22.9%; scope described as "a wide range of technologies, standards, and solutions that aim to break down data silos") — https://www.coherentmarketinsights.com/insight/health-data-interoperability-market-7895/segmentation
19. HIMSS, analysis of the HTI-2 final rule released by ASTP/ONC — https://www.himss.org/news-center/himss-analysis-hti-2-final-rule-released-astponc/
20. ASTP/ONC, Certified Health IT Product List — https://chpl.healthit.gov/ (REST endpoint returned HTTP 400 on the queries attempted 16 October 2026; no current total used)

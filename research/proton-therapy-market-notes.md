# Proton Therapy Market — research notes
**Slug:** proton-therapy-market   **Drafted:** 2026-10-16

## Published estimates (what others say)

| Source | Published | Base year | Base value | Forecast year | Forecast value | CAGR | Scope as stated |
|---|---|---|---|---|---|---|---|
| IndustryARC, *Proton Therapy Systems Market* (report 503994) | Page carries a 2026 copyright; no publication date stated | 2025 ("the study uses 2025 as the base year") | $1.64B | 2032 | $3.36B | 10.8% (2026–2032) | **Equipment** — "the proton therapy machines (such as cyclotrons or synchrotrons) and their delivery systems" — plus **Service** — "maintenance, upgrades, training, and technical support over the systems' operational life". Segmented single-room vs multiroom |
| Towards Healthcare, *Proton Therapy Systems Market Sizing* | No original date; page shows last updated 21 Apr 2026 | 2024 | $1.52B (2025: $1.66B) | 2034 | $3.72B | 9.44% (stated as 2025–2034 in the table, 2024–2034 in the FAQ) | "Specialised medical accelerators and beam-delivery solutions": full treatment systems, cyclotrons and synchrotrons, single- and multi-room installations, accessories, service and maintenance, **and clinical implementation services** |
| Global Market Insights, proton therapy systems market | Page read 2026; GMI gives no publication month on the size page | 2022 | $1.2B | 2032 | $3.2B | 10.8% (2023–2032) | No formal definition given. Revenue 2018–2032, segmented by set-up type (single/multiple room), indication and end use (hospitals, proton therapy centres, others). U.S. $530M in 2022; gastrointestinal cancer $322M in 2022; hospitals 62% of 2022 |
| Report Prime, proton therapy systems (r13186) | — | 2025 | $1.21B | 2032 | $2.11B | 8.24% | "Proton therapy systems". **Read from a search summary, not the publisher's page — flagged** |
| Lucintel, *Proton Therapy Market* | — | 2025 (implied) | ~$0.83B (our back-calculation from the endpoint and rate) | 2031 | $1.7B | 12.7% (2025–2031) | "Global proton therapy market". **Read from a search summary — flagged.** No base value published; the $0.83B is ours |
| Allied Market Research, proton therapy market | — | 2021 | $438.33M (2025 implied ~$0.73B at its own rate) | 2031 | $1.6B | 13.65% (2022–2031) | "Global proton therapy". Vintage base; **read from a search summary — flagged** |
| Data Bridge Market Research | — | 2024 | "1,386.41 billion" | 2032 | "2,342.25 billion" | 10.33% | **Discarded.** The page's own figures are three orders of magnitude out — a units error, not an estimate. Recorded so the reader knows why it is absent |

## The spread

**At 2025, $0.73B (Allied Market Research's trajectory, extended at its own rate) to $1.66B (Towards Healthcare) — a 2.3x spread.** Among the series that actually publish a dated 2025 base, $1.21B to $1.66B — 1.37x. At 2032, $2.11B to $3.36B — 1.59x. Published CAGRs run 8.24% to 13.65%, a 1.66x spread.

Two things explain the gap, and neither is a disagreement about growth.

**First, the service boundary.** IndustryARC says plainly that it counts equipment *and* service — "maintenance, upgrades, training, and technical support over the systems' operational life". Towards Healthcare goes further and adds "clinical implementation services". Allied Market Research's much smaller base reads like equipment alone. For a product where the vendor's recurring service line is roughly 40% of its segment revenue (see the arithmetic below: IBA's FY2025 proton therapy segment was €202.7M equipment and €131.7M services), the decision to count service or not moves the total by two-thirds on its own.

**Second, and more fundamental, this is not a market that has a size in the sense a CAGR assumes.** A proton therapy centre is a single construction project costing $33M to over $160M, recognised over several years. In FY2025 IBA — the largest independent vendor — grew its proton therapy net sales **57%**, and the year before it shrank. There is no published CAGR in the set anywhere near 57%, and there should not be: the series is the sum of a few dozen building projects, and it steps rather than compounds. Every publisher in the table smooths it into a 8–14% curve. The curve is an artefact of the method.

## Grounding arithmetic

**Registers used:** the Particle Therapy Co-Operative Group (PTCOG) list of facilities in clinical operation, as cited and counted in the peer-reviewed literature; PTCOG's cumulative patient statistics; and IBA's audited FY2025 segment disclosures, which are the only pure proton-therapy revenue figures any vendor publishes.

**A note on access.** PTCOG's own facility pages (ptcog.site and ptcog.online) returned HTTP 503 on every attempt during this research pass, so the facility count here is taken from a 2026 peer-reviewed review that cites and tabulates the PTCOG register, not from the register itself. **Flagged.** A search summary of PTCOG's own world map reported 128–133 facilities in clinical operation (last update May 2025), which is consistent with the review but which we could not verify directly and therefore do not use in the arithmetic.

- *Advances in proton therapy technology and global clinical applications* (PMC12932165) states **"over 120" operational proton therapy centres worldwide at the end of 2024**, with ~125 in its Table 3, and more than 50 additional centres under construction or planned (~55 in Table 3), citing the PTCOG website accessed 15 January 2025. The same review states cumulative patients treated **exceeded 450,000** at end-2024.
- A separate search summary of PTCOG's own patient-statistics page reported close to 410,000 cumulative particle-therapy patients at end-2023 (~350,000 with protons). **Read from a search summary — flagged.** Taken with the review's >450,000 at end-2024, the implied global annual throughput is roughly **40,000 patients a year**.

### Test 1 — the published total per operating centre

```
$1.64B   (IndustryARC, 2025)
÷ 125    (operational centres worldwide, end-2024, PTCOG via PMC12932165)
= $13.1M per operating centre per year
```

Now put that against what a centre costs. St. Joseph's Hospital Cancer Institute in Tampa announced a **$33M** single-room compact centre (2023 announcement, opening targeted for autumn 2025); a UMass Memorial filing dated March 2025 lists **$39.5M** for the proton treatment vault line item alone; multi-room centres run **upward of $160M**. A proton accelerator is a 20–30 year asset.

$13.1M per centre per year against a $33–160M asset with a 20–30 year life means the world would have to be rebuilding its entire proton fleet every **3 to 12 years**. It is not. So **the published total cannot be capital equipment alone** — it has to be new-build capital spending on a growing fleet *plus* recurring service on the installed one. That is exactly what IndustryARC says it is counting, and it rules out reading the figure as "what the installed base is worth".

### Test 2 — the per-patient reading, ruled out

```
$1.64B   (IndustryARC, 2025)
÷ ~40,000 patients treated worldwide per year (PTCOG cumulative delta, end-2023 to end-2024)
= ~$41,000 per patient per year
```

A Medicare claims analysis puts the median reimbursement for a course of proton therapy at **$32,428** (against $18,575 for IMRT); industry and modelled figures for a full proton course run roughly $25,000–$65,000. **Read from a search summary of secondary sources, and undated — flagged.**

So the published "market" is approximately equal to the **entire global clinical revenue** from treating patients with protons. Vendors do not collect treatment fees; hospitals do. If the published figure were measuring treatment revenue, the equipment makers would be capturing 100% of the clinical fee, which is absurd. **The per-patient reading is ruled out.** The coincidence is worth stating because it is the reading a general reader will assume.

### Test 3 — the bottom-up build from the one vendor that discloses

IBA (Ion Beam Applications SA, Euronext Brussels) is the only vendor with a separately reported proton therapy segment. FY2025, reported 27 March 2026:

| IBA line | FY2025 | FY2024 | Change |
|---|---|---|---|
| Proton Therapy net sales | €334.3M | €212.8M | +57% |
| — Equipment Proton Therapy | €202.7M | €89.4M | +127% |
| — Services Proton Therapy | €131.7M | €123.4M | +7% |
| IBA Clinical (PT + Dosimetry) net sales | €395.3M | €274.6M | +44% |
| Group net sales | €620.2M | €498.2M (restated) | +24% |

And the operating counts IBA publishes alongside them: **45 active proton therapy sites worldwide** (3 out of service at year end); **9 rooms delivered in 2025**; **12 rooms sold** (second-best year ever); **43 projects in equipment backlog** (7 Proteus PLUS, 36 Proteus ONE); equipment backlog €564M and services backlog €806M.

```
Service revenue per active site:  €131.7M ÷ 45 sites        = €2.93M per site per year
Equipment revenue per room delivered: €202.7M ÷ 9 rooms      = €22.5M per room
```

(The per-room figure is an average of percentage-of-completion revenue across a portfolio, not a price. **Labelled as ours and as an average, not an ASP.**)

Scale those two unit rates to the world:

```
Service:   125 centres × €2.93M                = €366M
Equipment: ~25-30 rooms delivered worldwide/yr × €22.5M = €563M - €675M
------------------------------------------------------------------
Total global vendor revenue                      €929M - €1,041M
                                           ≈  $1.00B - $1.12B
   (converted at EUR 1 ≈ USD 1.08, the rate implied by the USD figures
    in the same trade coverage; our conversion, labelled as such)
```

The worldwide room-delivery rate is **our assumption**, not a published figure: no register counts rooms commissioned per year. We take ~25–30 on the basis that IBA delivered 9 and competes with Varian (Siemens Healthineers), Hitachi, Sumitomo, Mevion and ProTom, and that the fleet grew from roughly 104 facilities in 2022 to ~125 in 2024. It is the weakest link in this calculation and it is flagged.

Against the published range:

```
Report Prime  $1.21B ÷ our $1.00-1.12B  = 1.08x - 1.21x
IndustryARC   $1.64B ÷ our $1.00-1.12B  = 1.46x - 1.64x
Towards HC    $1.66B ÷ our $1.00-1.12B  = 1.48x - 1.66x
```

**This is the unusual result in this corpus: the published figures are the right order of magnitude.** A bottom-up build from the only disclosed vendor unit economics lands within 10–20% of the low end of the published range and within 65% of the high end. Proton therapy is a market with a small number of large, visible, physical transactions, and that makes it one of the few healthcare markets where the published totals survive an independent build.

### Test 4 — the floor that rules out the low tail

```
IBA Proton Therapy FY2025: €334.3M ≈ $361M (our conversion at EUR 1 ≈ USD 1.08)

÷ Allied Market Research's implied 2025 total (~$0.73B) = 49.5%
÷ IndustryARC's $1.64B                                 = 22.0%
÷ Towards Healthcare's $1.66B                          = 21.7%
```

IBA is the largest independent vendor but it is not the only one: Varian's ProBeam, Hitachi, Sumitomo, Mevion and ProTom all ship systems, and Varian's installed and contracted base is comparable. For Allied Market Research's trajectory to be right, **IBA alone would have to be half the world market** — leaving $369M for every other vendor's new-build and service revenue combined. That is not credible. **IBA's €334.3M is a hard floor that rules out any 2025 total below roughly $1.0B**, which eliminates the Allied Market Research and Lucintel trajectories.

**What these tests are and are not.** They are scope and plausibility tests. They establish that the published figures measure new-build capital plus recurring service on a fleet of roughly 125 centres, that they cannot be read as the value of the installed base or as treatment revenue, and that the low tail of the published range is ruled out by one vendor's audited disclosure. They do not establish the correct figure. The global room-delivery rate is our assumption; the per-room figure is an accounting average not a price; currency conversion compares differently-constructed numbers; and dividing one vendor's unit economics into a global fleet count assumes vendors are interchangeable, which for service contracts on proprietary accelerators they are not.

## What we publish

**Headline: $1.82B (2026) → $3.36B (2032) at 10.8%.**

Source: IndustryARC, *Proton Therapy Systems Market* (report 503994), which states a 2025 base of $1.64B, a 2032 figure of $3.36B, a 10.8% CAGR for 2026–2032, and 2025 as its base year. The 2026 base is **derived by advancing IndustryARC's own published 2025 figure one year at IndustryARC's own stated rate** (1.64 × 1.108 = 1.817, published as 1.82). The 2032 endpoint is IndustryARC's own published figure, unaltered. Internal check: 1.82 compounded at 10.8% for six years gives $3.37B against the published $3.36B — a 0.3% difference, so the interpolation is faithful.

Chosen because: (a) it publishes **the clearest stated scope in the set** — it is the only source that defines both of its product segments in words, and the only one that names what "service" includes; (b) it publishes a **dated base year** (2025) rather than a vintage base extended forward; (c) its base sits in the middle of the range our own bottom-up build supports, and above the floor IBA's disclosure establishes; and (d) its endpoints and its stated CAGR actually reconcile, which is not true of every source here.

Unit: USD Billion. Industry: Medical Devices.

The report states plainly in `market_context` and `forecast_analysis` that this figure is new-build capital plus recurring service across a fleet of roughly 125 centres, that it works out to about $13.1M per operating centre per year, and that it cannot be read as treatment revenue or as the value of the installed base.

## Do not publish

- **Vendor market share.** Nobody discloses it. IBA publishes a segment; Varian is inside Siemens Healthineers' Varian business with no proton split; Hitachi, Sumitomo, Mevion and ProTom publish nothing comparable. `competitive_landscape[].market_share` omitted entirely.
- **GMI's regional and segment figures** (U.S. $530M in 2022, gastrointestinal cancer $322M in 2022, hospitals 62% of 2022). They are splits of a 2022 base from a source whose own endpoints do not reconcile with its own stated rate — $1.2B to $3.2B over ten years is 10.3%, not the 10.8% the page claims, and GMI does not explain the gap. `regional_analysis` and `country_analysis` stay `[]`.
- **Country splits.** No named source gives any for 2025 or 2026.
- **An exact worldwide facility count.** PTCOG's pages were unreachable throughout this pass. We publish "roughly 125 operating centres at end-2024, per the PTCOG register as counted in the peer-reviewed literature" and never a precise figure of our own.
- **A worldwide annual room-delivery count.** No register publishes it. Our ~25–30 assumption appears only inside the flagged build-up and is not published as a finding.
- **Varian's, Hitachi's, Sumitomo's, Mevion's or ProTom's proton revenue.** None is disclosed. Named, not sized.
- **Per-patient cost of proton therapy as a current figure.** The Medicare claims figures we found are undated and came from secondary summaries. Used only to rule out the per-patient reading of the market size, labelled as such.
- **The Data Bridge series.** Its own numbers are three orders of magnitude out.
- **Report Prime, Lucintel and Allied Market Research as anything but spread.** All three were read from search summaries rather than publisher pages.

## Sources

1. IBA (Ion Beam Applications SA), "IBA delivers strong FY 2025 results with solid execution in all segments", press release 27 March 2026 — group net sales €620.2M (+24% from €498.2M restated); IBA Clinical €395.3M (+44%); IBA Technologies €224.9M (+1%); Proton Therapy net sales €334.3M (+57%), of which Equipment €202.7M (+127%) and Services €131.7M (+7%); Proton Therapy adjusted EBIT €10.2M; group adjusted EBIT €27.4M (+58%); net result €12.7M; EPS €0.43; gross margin 32.2% (from 33.7%); equipment order intake €452M (+41%), IBA Clinical +81% to €310M, Proton Therapy €250M (+137%) with 10 accelerator systems sold vs 5 in 2024; backlog €1.6B (equipment €0.78B, services €0.822B); **12 rooms sold**, **9 rooms delivered in 2025**, **45 active sites worldwide** with 3 out of service at year end, 43 projects in equipment backlog (7 Proteus PLUS, 36 Proteus ONE); first of the 10-room Spanish projects started installation Q4 2025; first live treatment rooms in Chengdu and Shenzhen. Full-year text extracted from the company's own results PDF. https://www.iba-worldwide.com/sites/default/files/2026-03/260327-iba-fy2025-results-en.pdf and https://www.iba-worldwide.com/iba-delivers-strong-fy-2025-results-solid-execution-all-segments
2. *Advances in proton therapy technology and global clinical applications*, PMC12932165 — over 120 (Table 3: ~125) operational proton therapy centres worldwide at end-2024; more than 50 (Table 3: ~55) under construction or planned; cumulative patients treated exceeded 450,000 at end-2024; China cited at more than 30 centres operational or under construction combined (Table 3: 10+ operational, 20+ planned or under construction); PTCOG website cited as accessed 15 January 2025. https://pmc.ncbi.nlm.nih.gov/articles/PMC12932165/
3. Particle Therapy Co-Operative Group (PTCOG), facilities in clinical operation and patient statistics — https://www.ptcog.site/index.php/facilities-in-operation-public and https://ptcog.online/facilities-in-clinical-operation/ . **Both returned HTTP 503 throughout this research pass; the register is cited through source 2 and through flagged search summaries, not read directly.**
4. *PTCOG Ocular Survey — Perspective on Ocular Particle Therapy: Current Practices and Emerging Trends*, PMC12914457 (January 2026) — "over 100 PT centers in operation worldwide", citing the PTCOG website; 42,457 ocular particle therapy treatments through end-2023 at participating centres, including 347 helium and 367 carbon-ion; twenty facilities offering ocular particle therapy at end-2023. https://pmc.ncbi.nlm.nih.gov/articles/PMC12914457/
5. IndustryARC, *Proton Therapy Systems Market* (report 503994) — $1.64B (2025 base year), $3.36B (2032), 10.8% (2026–2032); scope stated as Equipment (accelerators and delivery systems) and Service (maintenance, upgrades, training, technical support); segmented single-room / multiroom, by indication and by geography. https://www.industryarc.com/research/proton-therapy-systems-market-research-503994
6. Towards Healthcare, *Proton Therapy Systems Market Sizing* — $1.52B (2024), $1.66B (2025), $3.72B (2034), 9.44%; scope includes full treatment systems, accelerators, single- and multi-room installations, accessories, service and maintenance, and clinical implementation services; page last updated 21 April 2026. https://www.towardshealthcare.com/insights/proton-therapy-systems-market-sizing
7. Global Market Insights, proton therapy systems market — $1.2B (2022), $3.2B (2032), 10.8% stated for 2023–2032 (the endpoints imply 10.3%); U.S. $530M (2022); gastrointestinal cancer $322M (2022); hospitals 62% (2022); single-room segment 10.5% CAGR. https://www.gminsights.com/industry-analysis/proton-therapy-systems-market
8. Healthcare Design, "St. Joseph's Hospital Center To Build Proton Therapy Center In Florida" (2023 announcement) — $33M single-room compact proton centre in Tampa, targeted to open autumn 2025. https://healthcaredesignmagazine.com/news/st-josephs-hospital-center-to-build-proton-therapy-center-in-florida/
9. Massachusetts Department of Public Health determination-of-need filing, UMass Memorial Health Care Inc., substantial change in service, March 2025 — approximately $39,495,099 for the proton treatment vault line item. https://www.mass.gov/doc/factor-4-correction-pdf-umass-memorial-health-care-inc-substantial-change-in-service/download
10. AuntMinnie, "Is proton therapy worth the cost for prostate cancer?" and "Success of proton therapy may depend on who pays for it" — multi-room proton centres "upward of $160 million"; median Medicare reimbursement $32,428 for proton therapy against $18,575 for IMRT; modelled single-gantry room construction assumption of $40M. **Secondary summaries of undated analyses — flagged.** https://www.auntminnie.com/clinical-news/radiation-oncology-therapy/article/15604997/is-proton-therapy-worth-the-cost-for-prostate-cancer
11. Siemens Healthineers / Varian, ProBeam proton therapy — installed and contracted centres announced individually (Scripps, Rinecker, Paul Scherrer Institute, Cincinnati Children's, King Fahd Medical City, National Taiwan University, two Norwegian centres, the Danish national centre in Aarhus). No proton therapy revenue is disclosed in Siemens Healthineers' segment reporting. https://www.varian.com/
12. Report Prime, proton therapy systems (r13186) — $1.21B (2025), $2.11B (2032), 8.24%. **Read from a search summary — flagged.** https://www.reportprime.com/proton-therapy-systems-r13186
13. Lucintel, *Proton Therapy Market* — $1.7B by 2031, 12.7% (2025–2031). **Read from a search summary — flagged.** https://www.lucintel.com/proton-therapy-market.aspx
14. Allied Market Research, proton therapy market — $438.33M (2021), $1.6B (2031), 13.65% (2022–2031). **Read from a search summary — flagged.** https://www.alliedmarketresearch.com/press-release/proton-therapy-market.html
15. Data Bridge Market Research, global proton therapy market — "1,386.41 billion" (2024) to "2,342.25 billion" (2032), 10.33%. Discarded as a units error. https://www.databridgemarketresearch.com/nucleus/global-proton-therapy-market

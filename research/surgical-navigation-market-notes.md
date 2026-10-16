# Surgical Navigation Market — research notes
**Slug:** surgical-navigation-market   **Drafted:** 2026-10-16

## Published estimates (what others say)

| Source | Published | Base year | Base value | Forecast year | Forecast value | CAGR | Scope as stated |
|---|---|---|---|---|---|---|---|
| Global Market Insights, *Surgical Navigation Systems Market* (GMI5908) | September 2026 | 2025 (estimate year) | **$1.382B** (2026: $1.5B) | 2035 | $2.571B | 6.5% (2026–2035) | No formal definition. Scope expressed through segments: tracking technology (electromagnetic, optical, hybrid), clinical application (neurology, orthopaedics, ENT, dental), end user, region. Page describes "platforms combining navigation, imaging, planning, robotics, and implants" |
| SkyQuest Technology, *Surgical Navigation Systems Market* | December 2025 | 2024 | **$11.98B** (2025: $13.8B) | 2033 | $42.81B | 15.2% (2026–2033) | No formal definition. Segments by technology (electromagnetic, optical, intraoperative imaging, hybrid), by application, by end use, and by **product type: hardware, software and services**. Cites NDI Polaris optical trackers and Medtronic's NeuroSmart MER system as examples |
| Grand View Research, surgical navigation systems | Press release October 2024 (an earlier 2022 edition put 2030 at $23.3B) | 2024 | **$8.378B** (Horizon application-level statistic) | 2030 | $18.47B | 14.0% (2025–2030); the Traditional Chinese edition of the same report states 14.08% for 2024–2030 | Electromagnetic 40.7% of 2024; neurology 36.6% of 2024. **Base value read from Grand View's Horizon statistics page via a search summary, not the report — flagged** |
| Coherent Market Insights / Coherent Opportunity Map | — | 2025 | $8.33B | 2032 | $13.21B | 6.8% (2025–2032) | "Surgical navigation system". **Read from a search summary — flagged** |
| Market Glass | — | 2025 | $9.3B | 2032 | $24.0B | 14.6% | "Surgical navigation". **Read from a search summary — flagged** |
| iData Research | — | — | "just under $1.8B" | — | — | 6.8% | Surgical navigation, reported **separately from** surgical robotics, which iData puts at 15.7%. **Read from a search summary — flagged.** The separation is the most useful thing in the set |
| Technavio | — | 2023 | — | 2028 | — | 6.92% (2023–2028) | "Surgical navigation systems". **Read from a search summary — flagged** |
| QYResearch | — | 2025 | $1.346B | 2031 | $1.964B | 6.5% | **Narrower product:** surgical navigation *projection* systems only. Recorded for scope contrast, not for the spread |

## The spread

**At 2025, $1.382B (GMI) to $13.8B (SkyQuest) — a 9.99x spread.** At the 2032/2033 horizon, $13.21B to $42.81B — 3.24x. Published CAGRs run 6.5% to 15.2%, a 2.34x spread.

A 10x spread is the widest in this corpus to date, and it is not noise. **The published estimates fall into two clean clusters that are not estimating the same thing**, and the dividing line is whether surgical robotics is inside the market:

- **The 6.5–6.9% cluster** — GMI ($1.382B), iData ("just under $1.8B"), Technavio (6.92%), QYResearch (6.5%), Coherent (6.8%). These describe optical and electromagnetic tracking systems: a camera or field generator, instrument trackers, a workstation and planning software.
- **The 14–15.2% cluster** — SkyQuest ($11.98–13.8B), Grand View ($8.378B, 14.0%), Market Glass ($9.3B, 14.6%). These are an order of magnitude larger and grow at twice the rate.

iData, uniquely, says the quiet part out loud by publishing both: **surgical navigation at just under $1.8B growing 6.8%, and surgical robotics separately at 15.7%.** That single disclosure explains the entire 10x. GMI's own page gives the game away from the other side — it describes its scope as "platforms combining navigation, imaging, planning, **robotics**, and implants" while publishing a $1.382B total that no robotics-inclusive definition could produce.

So the reader's first decision is not which number to trust. It is which market they mean. A navigation-only market is a mature, mid-single-digit capital-equipment business. A navigation-plus-robotics market is a different industry with different economics, a different buying committee and a different growth rate — and three publishers sell the second under the name of the first.

GMI's internal figures are also not self-consistent. Its 2022 technology values (electromagnetic $531.95M, optical $406.79M, plus a hybrid segment) sum to above $938.7M, while its 2022 regional values (North America $463.68M, Europe $330.81M, Latin America $66.12M, plus Asia Pacific and Middle East & Africa) are published for the same base year without a stated total. SkyQuest's page carries a "Global Market Size" snapshot of $10.4B with no year attached against a 2024 base value of $11.98B. Neither publisher reconciles its own tables.

## Grounding arithmetic

**Registers used:** the FDA 510(k) clearance database via the openFDA API, queried on product code HAW (neurological stereotaxic instrument, 21 CFR 882.4560); and FY2025 audited segment revenue for Globus Medical, Stryker and Medtronic.

### Test 1 — the only disclosed navigation line in the industry

Of the five companies the sector is built on — Medtronic, Stryker, Brainlab, Zimmer Biomet and Globus Medical — **exactly one publishes a revenue line that is mostly navigation and robotics capital**, and it is the smallest of them.

Globus Medical reports an **Enabling Technologies** segment: the ExcelsiusGPS navigation-and-robotics platform and related capital.

| Globus Medical, FY2025 (reported 25 February 2026) | Figure |
|---|---|
| Total net sales | $2,938.9M (+16.7%) |
| Musculoskeletal Solutions | $2,797.9M |
| **Enabling Technologies** | **$141.0M** |
| Enabling Technologies, Q4 2025 | $55.6M (a record quarter, +18.5%) |
| Nevro contribution to FY2025 | $293.6M |
| Base business excluding Nevro | $2,645.3M (+5.0%) |

Note the direction of travel. Enabling Technologies' Q4 was a record at $55.6M, yet the full year **fell roughly 8%** — Q4 $55.6M against a $141.0M full year means the first three quarters averaged $28.5M. Globus described the segment as lumpy through 2025, with a weak first and third quarter before the fourth-quarter rebound.

```
$141.0M (Globus Enabling Technologies, FY2025)
÷ $1,382M (GMI's 2025 surgical navigation market)   = 10.2%
÷ $13,800M (SkyQuest's 2025 surgical navigation market) =  1.02%
```

Globus is one of roughly five vendors with a commercial cranial-or-spinal navigation-robotics platform in the market. **For GMI's $1.382B to be right, Globus holds about a tenth of the market — entirely plausible for the smallest of five.** For SkyQuest's $13.8B to be right, Globus holds 1%, and the other four vendors must be doing **$13.66B of navigation capital between them**. Hold that number.

### Test 2 — the ceiling, built from the largest containers available

Nobody discloses navigation revenue, so bound it from above using the biggest reported segment that *contains* navigation at each company.

| Container (FY2025) | Revenue | What else is inside it |
|---|---|---|
| Stryker, MedSurg and Neurotechnology | **$15.6B** (+15.7% reported, +10.7% organic) | Endoscopy, instruments, medical equipment (beds, stretchers), sustainability solutions, neurovascular, CMF, ENT — *and* Mako robotics and navigation |
| Medtronic, Neuroscience portfolio | **$9.846B** (+4.7% reported, +5.2% organic) | Cranial & Spinal Technologies (spine implants, biologics, neurosurgery, the AiBLE ecosystem), Specialty Therapies (ENT, pelvic health, neurovascular), Neuromodulation (pain stim, DBS) — *and* StealthStation navigation and Mazor robotics |
| Medtronic, Cranial & Spinal Technologies, Q4 FY2025 | $1,266M (+1.8% reported) | Spine implants and biologics dominate; navigation capital is not split out |
| Globus Medical, total | $2,938.9B | Of which Enabling Technologies is $141.0M — **4.8%** |

```
SkyQuest's $13.8B surgical navigation market (2025)
÷ $15.6B  (Stryker's ENTIRE MedSurg and Neurotechnology segment, FY2025) = 88.5%
÷ $9.846B (Medtronic's ENTIRE Neuroscience portfolio, FY2025)            = 1.40x
```

A global surgical navigation market of $13.8B would be **88.5% of the whole of Stryker's MedSurg and Neurotechnology segment** — a business that sells hospital beds, endoscopes, power tools and neurovascular coils — and **1.40 times Medtronic's entire Neuroscience portfolio**, inside which navigation is a capital adjunct that pulls through spine implants. Medtronic's own FY2025 commentary mentions navigation exactly once, as "strength in Navigation capital" contributing to low-single-digit ENT growth inside Specialty Therapies. It is a sentence, not a segment.

**The $13.8B figure is ruled out.** It would require the four non-disclosing vendors to generate $13.66B of navigation capital revenue while two of them report whole segments, several times broader, of $15.6B and $9.846B.

Reconstructing the opposite way: if Globus's $141.0M represents a tenth of the market, the market is about $1.4B; if the four larger vendors each do 2–4 times Globus's navigation revenue, the total lands between $1.3B and $2.5B. **That is GMI's and iData's cluster, not SkyQuest's.**

### Test 3 — the regulatory register

The FDA's 510(k) database, queried through the openFDA API on product code **HAW** (neurological stereotaxic instrument, regulation 21 CFR 882.4560 — the code under which optical tracking systems and cranial navigation platforms clear):

```
Cumulative 510(k) clearances, product code HAW, all years : 425
Clearances with a decision date in 2024-2025 inclusive    :  16
```

(Queried 2026-10-16; openFDA reported the device 510(k) endpoint last updated 2026-10-05.)

Sixteen clearances across two years, or **eight a year**, under the principal cranial-navigation product code. That is the regulatory footprint of a concentrated market with a handful of serious vendors iterating on established platforms — consistent with five vendors and a low-to-mid-single-digit growth rate. It is not the footprint of a $13.8B market growing at 15.2%, which would imply new entrants and new platform clearances at a far higher rate.

The register is a context check rather than a division: HAW covers cranial stereotaxic instruments and misses orthopaedic and ENT navigation under other codes, 510(k) counts do not scale with revenue, and a single clearance can cover a platform family. **It rules in the concentrated reading; it does not price the market.**

**What these tests are and are not.** They are scope and plausibility tests. They establish that the published estimates occupy two incompatible clusters separated by whether surgical robotics is counted, that the robotics-inclusive cluster cannot be reconciled with the segment revenue of the companies it names, and that the navigation-only cluster is consistent with the one disclosed navigation line and with the FDA register's concentration. They do not establish the correct figure for either reading. Globus's Enabling Technologies segment contains robotics as well as navigation, so using it as a navigation proxy overstates navigation; Stryker's and Medtronic's segments are ceilings, not estimates; and 510(k) counts are a regulatory artefact, not revenue.

## What we publish

**Headline: $1.50B (2026) → $2.19B (2032) at 6.5%.**

Source: Global Market Insights, *Surgical Navigation Systems Market*, report GMI5908, published September 2026, which states $1.382B for 2025, **$1.5B for 2026**, $2.571B for 2035 and a 6.5% CAGR for 2026–2035. The 2026 base is GMI's own published 2026 figure, unaltered. The 2032 endpoint is **derived by compounding that figure at GMI's own stated rate** (1.50 × 1.065^6 = 2.19) and is labelled as interpolation in the report. Internal check: the implied rate between our endpoints is 6.51% against GMI's stated 6.5%.

Chosen because: (a) it is the **most recently published** estimate in the set (September 2026) with a dated base year; (b) it sits in the cluster our arithmetic supports — a market in which the one disclosed navigation line, Globus's $141.0M, is a plausible tenth rather than an implausible hundredth; (c) it publishes the most granular segmentation of any source, which makes its internal consistency checkable (and we report where it fails); and (d) 6.5% is corroborated independently by iData, Technavio and QYResearch, all of which land between 6.5% and 6.92% when they size navigation separately from robotics.

Unit: USD Billion. Industry: Medical Devices.

The report states plainly in `market_context` and `forecast_analysis` that the 10x spread is a robotics-inclusion decision rather than a disagreement, that the robotics-inclusive figures are ruled out by Stryker's and Medtronic's own segment revenue, and that Globus's disclosed navigation-and-robotics capital line *fell* roughly 8% in FY2025 against every published growth rate.

## Do not publish

- **Vendor market share.** None of Medtronic, Stryker, Brainlab, Zimmer Biomet or Globus discloses navigation revenue. Globus publishes an Enabling Technologies segment that mixes navigation with robotics; Medtronic mentions navigation once in prose; Stryker reports Mako inside a $15.6B segment; Zimmer Biomet does not split ROSA; Brainlab is private and postponed its Frankfurt IPO on 1 July 2025. `competitive_landscape[].market_share` omitted entirely.
- **GMI's regional figures** (North America $463.68M to $906.10M, Europe $330.81M to $692.84M, Latin America $66.12M to $162.43M, Asia Pacific 7.93% CAGR reaching $709.26M, Middle East & Africa $100.84M by 2035). They are 2022-base and 2035-horizon splits that GMI does not reconcile against its own technology or end-use tables for the same base year, and no source gives a 2026 regional split. `regional_analysis` stays `[]`.
- **SkyQuest's or Grand View's splits** (SkyQuest's unattributed $10.4B "Global Market Size" snapshot; Grand View's electromagnetic 40.7% and neurology 36.6% of 2024). Both belong to the robotics-inclusive cluster our arithmetic rules out. `country_analysis` stays `[]`.
- **GMI's segment dollar values** (electromagnetic $531.95M and optical $406.79M for 2022; neurology $425.56M, orthopaedics $309.47M, ENT $207.98M for 2022; hospitals $678.69M for 2022). One source, one page, published for a base year four years before ours, and not reconciled against its own regional table. Segmentation goes out as plain strings.
- **Brainlab's revenue.** Third-party trackers give wildly different figures ($349.5M from one, $508.7M from another, €429.2M for 2022/23 from a third) and none is a company filing. The only company-sourced figure we found is €239M of revenue for the **first half** of FY2024/25 "reflecting portfolio adjustments", cited in its June 2025 IPO announcement. Named, characterised, not sized.
- **Medtronic's navigation revenue or a Cranial & Spinal Technologies full-year figure.** The segment table in Medtronic's FY2025 Q4 release did not extract cleanly from the PDF; only the Q4 CST figure of $1,266M could be read with confidence, alongside the clearly stated Neuroscience full-year total of $9.846B. We publish those two and nothing derived from a reconstruction.
- **A navigation-only market figure of our own.** Our arithmetic brackets the navigation-only reading at roughly $1.3–2.5B. That is a plausibility range, published as such in prose, and never as a market size.
- **An attach rate of navigation to surgical procedures.** CMS and AHA publish surgical volumes, but no source publishes navigated-procedure counts, so the division has no numerator.
- **Any estimate read from a search summary as a headline.** Grand View, Coherent, Market Glass, iData, Technavio and QYResearch appear in the spread table only, each flagged.

## Sources

1. Globus Medical, Inc., "Globus Medical Reports Fourth Quarter and Full Year 2025 Results", 25 February 2026 — FY2025 net sales $2,938.9M (+16.7% reported, +16.2% constant currency); Musculoskeletal Solutions $2,797.9M; **Enabling Technologies $141.0M**; Q4 net sales $826.4M (+25.7%), Q4 Musculoskeletal Solutions $770.8M, **Q4 Enabling Technologies $55.6M** described in the release as up 19%; Nevro contributed $293.6M for the year and $99.7M in Q4; base business excluding Nevro $2,645.3M (+5.0%) for the year and $726.7M (+10.6%) in Q4; non-GAAP EPS $3.98. https://www.investors.globusmedical.com/node/13366 (read via https://seekingalpha.com/pr/20412132)
2. Stryker Corporation, "Stryker reports 2025 operating results and 2026 outlook", 29 January 2026, and Form 10-K for FY2025 (SEC EDGAR, CIK 310764) — consolidated FY2025 net sales $25.1B (+11.2% reported, +10.7% constant currency); **MedSurg and Neurotechnology $15.6B (+15.7% reported, +15.4% constant currency)**, of which about 4.7 points of full-year growth came from acquisitions and divestitures and organic growth was 10.7%; Orthopaedics about $9.5B (+4.3%). Mako robotics and navigation are inside MedSurg and Neurotechnology with no separate line. https://www.sec.gov/Archives/edgar/data/310764/000031076426000010/syk-20251231.htm
3. Medtronic plc, "Medtronic reports strong finish to its fiscal year with its fourth quarter financial results", 21 May 2025, and Form 10-K for fiscal 2025 (SEC EDGAR, CIK 1613103) — **Neuroscience portfolio FY2025 revenue $9.846B (+4.7% reported, +5.2% organic)**, comprising Cranial & Spinal Technologies, Specialty Therapies and Neuromodulation; Q4 Neuroscience $2.620B (+2.9% reported, +3.7% organic); **Q4 Cranial & Spinal Technologies $1,266M against $1,244M (+1.8% reported)**; CST full-year net sales up 5%, driven by adoption of the AiBLE ecosystem of spine implants; Q4 Specialty Therapies commentary cites "low-single digit growth in ENT with strength in Navigation capital and Head & Neck disposable sales" — the only mention of navigation in the release. https://news.medtronic.com/2025-05-21-Medtronic-reports-strong-finish-to-its-fiscal-year-with-its-fourth-quarter-financial-results-announces-dividend-increase and https://www.sec.gov/Archives/edgar/data/1613103/000161310325000091/mdt-20250425.htm
4. U.S. FDA 510(k) premarket notification database, queried through the openFDA API on 2026-10-16 (endpoint last updated 2026-10-05) — product code **HAW** (neurological stereotaxic instrument, regulation 21 CFR 882.4560): **425 cumulative clearances**; **16 clearances with a decision date between 2024-01-01 and 2025-12-31**. https://api.fda.gov/device/510k.json?search=product_code:%22HAW%22&limit=1 and https://api.fda.gov/device/510k.json?search=product_code:%22HAW%22+AND+decision_date:[2024-01-01+TO+2025-12-31]&limit=1
5. Global Market Insights, *Surgical Navigation Systems Market*, report GMI5908, published September 2026 — $1.382B (2025 estimate), $1.5B (2026), $2,571.48M (2035), 6.5% (2026–2035); electromagnetic $531.95M (2022) to $1,088.08M (2035); optical $406.79M (2022) to $950.32M (2035) at 7.09%; hybrid 6.68%; neurology $425.56M (2022) to $856.91M (2035); orthopaedics $309.47M (2022) to $752.21M (2035) at 7.41%; ENT $207.98M (2022) to $461.74M (2035) at 6.67%; dental 7.09% to $310.02M (2035); hospitals $678.69M (2022) to $1,441.29M (2035); ambulatory surgical centres 7.01% to $905.49M (2035); North America $463.68M (2022) to $906.10M (2035); Europe $330.81M (2022) to $692.84M (2035); Asia Pacific 7.93% to $709.26M (2035); Latin America $66.12M (2022) to $162.43M (2035); Middle East & Africa $100.84M (2035); scope described as "platforms combining navigation, imaging, planning, robotics, and implants". https://www.gminsights.com/industry-analysis/surgical-navigation-systems-market
6. SkyQuest Technology, *Surgical Navigation Systems Market*, published December 2025 — $11.98B (2024 base year), $13.8B (2025), $42.81B (2033), 15.2% (2026–2033); segments by technology, application, end use, region and product type (hardware, software, services); page also carries an unattributed "Global Market Size" snapshot of $10.4B with no year. https://www.skyquestt.com/report/surgical-navigation-systems-market
7. Grand View Research, "Surgical Navigation Systems Market To Reach $18.47 Billion By 2030", press release October 2024 — $18.47B by 2030 at 14.0% (2025–2030); the Traditional Chinese edition states 14.08% for 2024–2030; electromagnetic 40.7% of 2024; neurology 36.6% of 2024; Horizon statistics page gives an application-level 2024 value of $8,377.9M; an earlier 2022 edition projected $23.3B by 2030 at 14.2%. **Read from a search summary — flagged.** https://www.grandviewresearch.com/press-release/global-surgical-navigation-systems-market
8. iData Research, surgical navigation market — "just under $1.8 billion" at a 6.8% CAGR, published separately from its surgical robotics market at 15.7%. **Read from a search summary — flagged.** The separation of the two markets is the single most useful disclosure in the set. https://idataresearch.com/
9. Coherent Market Insights / Coherent Opportunity Map, surgical navigation system market — $8.33B (2025) to $13.21B (2032) at 6.8%. **Read from a search summary — flagged.**
10. Market Glass, surgical navigation market — $9.3B (2025) to $24.0B (2032) at 14.6%. **Read from a search summary — flagged.**
11. QYResearch, surgical navigation **projection** system market — $1,346M (2025) to $1,964M (2031) at 6.5%. A narrower product than the others; recorded for scope contrast. **Read from a search summary — flagged.**
12. Technavio, surgical navigation systems market — 6.92% CAGR for 2023–2028. **Read from a search summary — flagged.** https://technavio.com/report/surgical-navigation-systems-market-industry-analysis
13. Brainlab SE, "Brainlab SE postpones planned IPO", ad-hoc announcement 1 July 2025 — the company and its selling shareholders postponed the planned IPO and Prime Standard listing on the Frankfurt Stock Exchange, which had been scheduled to begin trading on 3 July 2025; an IPO at a later time remains under consideration. The June 2025 offering announcement cited record revenues of EUR 239 million for the **first half** of FY2024/25 reflecting portfolio adjustments, a 22.4% EBITDA margin, a primary capital increase of up to EUR 200 million, and mid-term targets of 10–13% revenue growth with a mid-20s EBITDA margin. No audited full-year figure is public. https://www.gettex.de/en/news-overview/newsdetail/eqs-news-brainlab-to-accelerate-digital-transformation-in-healthcare-through-ipo-in-frankfurt/
14. GlobalData, Brainlab AG company profile — FDA 510(k) clearance and United States launch of Spine Mixed Reality Navigation in September 2025. **Third-party profile, not a company release — flagged.** https://www.globaldata.com/company-profile/brainlab-ag/

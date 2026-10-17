# Report pipeline — the 30-50 report expansion

Standing instruction (2026-10-16): add **30-50 new research reports** to the
corpus, held to `REPORT-AUTHORING-BRIEF.md`. Corpus was **142** rows at the
start of this expansion.

Research runs in batches of 5, now **one agent per topic with up to five in
flight at once** (raised from two on Siddhant's instruction, 2026-10-17; the cap
lives in `.claude/skills/research/SKILL.md`). Each agent owns only its own
`research/<slug>-notes.md` and `content/reports/<slug>.json`, so no two write the
same file. A batch is done when every draft in it passes
`node scripts/report-db.mjs check`. Publishing is the session owner's step.

Topics were chosen against `research/corpus-slugs.txt` so none duplicates an
existing row. Regional cuts (`north-america-*`, `europe-*`, `asia-pacific-*`,
`united-states-*`) are deliberately **not** used here — the corpus already has
four regional clones of fourteen topics, and another clone adds no analysis.

| # | Slug | Industry | Round | State |
|---|---|---|---|---|
| 1 | liquid-biopsy-market | Life Sciences | 1A | published |
| 2 | point-of-care-diagnostics-market | Medical Devices | 1A | published |
| 3 | antimicrobial-resistance-diagnostics-market | Life Sciences | 1A | published |
| 4 | neuromodulation-market | Medical Devices | 1A | published |
| 5 | brain-computer-interface-market | Medical Devices | 1A | published |
| 6 | radiopharmaceuticals-market | Pharmaceuticals | 1B | published |
| 7 | car-t-cell-therapy-market | Biotechnology | 1B | published |
| 8 | bispecific-antibodies-market | Biotechnology | 1B | published |
| 9 | glp-1-receptor-agonists-market | Pharmaceuticals | 1B | published |
| 10 | phage-therapy-market | Biotechnology | 1B | published |
| 11 | single-cell-sequencing-market | Life Sciences | 2A | published |
| 12 | spatial-biology-market | Life Sciences | 2A | published |
| 13 | proteomics-market | Life Sciences | 2A | published |
| 14 | pharmacogenomics-market | Life Sciences | 2A | published |
| 15 | organoid-and-organ-on-chip-market | Life Sciences | 2A | published |
| 16 | decentralized-clinical-trials-market | Healthcare IT | 2B | published |
| 17 | real-world-evidence-market | Healthcare IT | 2B | published |
| 18 | health-data-interoperability-market | Healthcare IT | 2B | published |
| 19 | ~~revenue-cycle-management-automation-market~~ -> **revenue-cycle-management-market** | Healthcare IT | 2B | published |
| 20 | hospital-at-home-market | Healthcare IT | 2B | published |
| 21 | proton-therapy-market | Medical Devices | 3A | published |
| 22 | surgical-navigation-market | Medical Devices | 3A | published |
| 23 | insulin-delivery-devices-market | Medical Devices | 3A | published |
| 24 | sleep-apnea-devices-market | Medical Devices | 3A | published |
| 25 | hearing-aids-market | Medical Devices | 3A | published |
| 26 | biologics-cdmo-market | Pharmaceuticals | 3B | published |
| 27 | sterile-injectables-market | Pharmaceuticals | 3B | published |
| 28 | vaccine-cold-chain-market | Pharmaceuticals | 3B | published |
| 29 | plasma-fractionation-market | Pharmaceuticals | 3B | published |
| 30 | pharmacy-automation-market | Healthcare IT | 3B | published |
| 31 | medical-device-cybersecurity-market | Healthcare IT | 4A | published |
| 32 | nuclear-medicine-radioisotope-market | Pharmaceuticals | 4A | published |
| 33 | ophthalmic-therapeutics-market | Pharmaceuticals | 4A | published |
| 34 | psychedelic-therapeutics-market | Pharmaceuticals | 4A | published |
| 35 | fertility-services-market | Healthcare IT | 4A | published |
| 36 | femtech-market | Medical Devices | 4B | published |
| 37 | advanced-wound-care-market | Medical Devices | 4B | published |
| 38 | orthopedic-implants-market | Medical Devices | 4B | published |
| 39 | rehabilitation-robotics-market | Medical Devices | 4B | published |
| 40 | veterinary-diagnostics-market | Life Sciences | 4B | published |

**Rounds 2, 3 and 4 are drafted and passing `check` — thirty reports held for the
21:00 IST merge**, plus two analysis articles and a press release in
`content/blogs/` and `content/press-releases/`. Order inside the deploy: reports
first, then the articles that link to them.

**Round 2.** Ten
reports: single-cell sequencing, spatial biology, proteomics, pharmacogenomics,
organoids & organ-on-chip; decentralised trials, real-world evidence, health
data interoperability, revenue cycle management, hospital-at-home. Publishing
them before a deploy would list cards pointing at 404s — see the sequencing rule
in `REPORT-AUTHORING-BRIEF.md`.

States: `queued` -> `drafting` -> `check-passed` -> `published`. A topic that
turns out to have no defensible public evidence base is marked `dropped` with
the reason, and the next queued topic takes its slot — a thin report is worse
than no report.

## Published from this expansion

**Round 1 — 10 reports, published 2026-10-16. Corpus 142 -> 152.**

| Slug | Base -> forecast | CAGR | Estimate spread | Grounding |
|---|---|---|---|---|
| liquid-biopsy-market | $8.03B -> $17.54B | 13.91% | 4.36x base, 2.55x CAGR | Guardant FY2025 $683.6M / ~276k tests = $2,477/test; the top forecast implies 43.0M tests/yr against ~20M annual cancer cases (GLOBOCAN 2022) |
| point-of-care-diagnostics-market | $35.17B -> $52.78B | 7.00% | 11.0x base, 1.37x CAGR | CMS CLIA Sept 2026: 255,184 waived + PPM sites; $53.1B over them = $208,087/site/yr |
| antimicrobial-resistance-diagnostics-market | $5.28B -> $7.60B | 6.26% | 1.54x (bases agree to 1.02x) | bioMérieux microbiology ~$1.40B = 31.5% of the whole published market |
| neuromodulation-market | $9.42B -> $16.10B | 9.35% | 1.52x base, **2.77x CAGR** | Medtronic $1.930B + Boston Scientific $1.198B = $3.128B disclosed; the remainder is 1.87x their combined total |
| brain-computer-interface-market | $795.3M -> $2,252.5M | 18.95% | **9.16x base** | ClinicalTrials.gov 265 BCI studies; $262M/study = $989k, $2.40B/study = $9.06M; no approved implant |
| radiopharmaceuticals-market | $8.08B -> $12.49B | 7.53% | 1.78x base, **3.35x CAGR** | Pluvicto + Lutathera + Pylarify + Telix = $4.43B = 76% of the lowest published whole market |
| car-t-cell-therapy-market | $5.53B -> $12.53B | 14.6% | 1.19x base, 2.97x CAGR | Five disclosed products sum to $5.53B, **exceeding every published market size** |
| bispecific-antibodies-market | $14.45B -> $32.90B | 14.7% | 3.49x base | Oncology bispecifics $3.79B + Hemlibra/Vabysmo $10.66B = $14.45B, 74% non-oncology |
| glp-1-receptor-agonists-market | $71.94B -> $142.76B | 12.1% | **24.2x base** | Novo DKK 234,549m + Lilly $36,507m = $71.94B disclosed, above three of five published market sizes |
| phage-therapy-market | $66.5M -> $167.93M | 16.7% | **33.2x base** | No US/EU marketing authorisation; 124 registered studies; the top figure implies $10.3M per study |

Every one of the ten: `regional_analysis` and `country_analysis` empty, no vendor
market shares anywhere, base years derived from a named publisher's own figure
advanced at that publisher's own rate, and the derivation stated on the page.

## Round 5 queue — appended 2026-10-17

Rounds 1-4 are all **published**; the live corpus is **182** rows (142 at the
start of the expansion, +40), so the prose above about "thirty reports held for
the 21:00 IST merge" describes a state that has already cleared. The 30-50
target is met. This round exists because `/research` was invoked again with the
queue empty, which the skill answers by proposing five topics.

Each topic below was admitted on one test: a public, countable register exists
to divide a headline figure through. The register is named in the row, because a
topic with no register is dropped rather than drafted.

| # | Slug | Industry | Round | Countable register | State |
|---|---|---|---|---|---|
| 41 | dialysis-and-renal-care-market | Medical Devices | 5A | ESRD Networks national census (7,556 centres / 516,837 dialysis patients, 31 Mar 2025); CMS CY2026 ESRD PPS base rate $281.71/treatment; MedPAC FFS dialysis spending; FMC / DaVita / Vantive disclosed revenue | check-passed (2026-10-17) |
| 42 | contract-research-organization-market | Life Sciences | 5A | ClinicalTrials.gov API v2 industry-lead interventional starts and ongoing counts; eight disclosed FY2025 CRO revenue lines | check-passed (2026-10-17) |
| 43 | pharmacovigilance-market | Healthcare IT | 5A | openFDA `drug/event` counts by receivedate; EudraVigilance ICSRs processed (EMA/371010/2025); FDA's own $37M/6M-reports disclosure | check-passed (2026-10-17) |
| 44 | radiotherapy-equipment-market | Medical Devices | 5A | IAEA DIRAC centre and teletherapy-unit counts; Varian / Elekta / Accuray disclosed revenue; PTCOG particle-centre count | check-passed (2026-10-17) |
| 45 | ambulatory-surgery-centers-market | Healthcare IT | 5A | MedPAC certified-ASC count and FFS ASC spending; CMS CY2026 ASC payment system; USPI / Surgery Partners facility counts | check-passed (2026-10-17) |

### Round 5 — all five pass `check`, held for the publish window

Five topics, five agents in parallel (the cap raised from two to five on
Siddhant's instruction mid-run), one agent per topic, each owning only its own
notes and report JSON. Every figure below was re-derived by the session owner
rather than taken from the agent's report: `check` re-run on all five, every CAGR
recomputed from its own endpoints, and each report's headline grounding division
recomputed independently. All reproduced.

| Slug | Base -> forecast | CAGR | Size spread | CAGR spread | Grounding |
|---|---|---|---|---|---|
| dialysis-and-renal-care-market | $83.97B -> $118.79B | 5.95% | **6.65x** | 1.80x | FMC $22.18B + DaVita $13.643B = $35.823B, **1.77x the whole published machines market**; $281.71 CMS bundle x 156 = $43,947/patient-yr against DaVita's realised $58,519; 516,837 patients x $58,519 = $30.245B US ceiling = $4.003M across 7,556 centres vs $4.416M at DaVita's own 2,657 |
| contract-research-organization-market | $81.13B -> $135.33B | 8.90% | 2.06x | 1.38x | Eight disclosed FY2025 CRO lines = **$36.768B**, 49.3% of R&M's implied 2025 base; $81.13B / 16,499 ongoing trials = $4.917M/trial-yr, x3 yrs = 77.6% of the $19.0M median pivotal cost; industry-lead starts **-1.99% CAGR** 2021-25 against a published 8.90% |
| pharmacovigilance-market | $10.45B -> $20.38B | 11.78% | 1.50x | **2.92x** | $10.45B / 1,307,769 FAERS reports = **$7,991 per report**, 13.3-40.0x the only published per-case rate card; FDA's own $37M / 6M reports = **$6.17**, a 1,295x ratio; containment at Mordor's 54.88% outsourced ratio = 64.5% of all IQVIA R&DS, against 84.6% for the $13.71B reading |
| radiotherapy-equipment-market | $8.14B -> $12.70B | 7.69% | 1.39x (3.38x raw) | 1.50x | $8,140M / 17,000 DIRAC teletherapy units = **$478,824/unit/yr**, against $100,648 measured Elekta service + $406,630 Lancet capital per year = $507,277, **5.9% apart**; Varian + Elekta + Accuray = $6,720.4M = 82.6% of the headline |
| ambulatory-surgery-centers-market | $109.04B -> $141.19B | 4.40% | 3.47x (31.0x raw) | 2.23x | Coherent's own NA share x headline / 6,436 certified ASCs = **$7.404M per ASC**, against $7.575M from Fortune's US figure — **2.3% apart**; Medicare FFS $7,500M / 6,436 = $1.1653M; MedPAC's own components 1.032 x 1.008 x 1.084 x 1.004 = 1.1321, reproducing its published 13.0% rise to 0.2 points |

Every one: `regional_analysis` and `country_analysis` empty, no vendor
`market_share` anywhere, 20-28 numbered sources per notes file, no U+FFFD, and
the CAGR reconciling to its own endpoints within **0.005 points** on all five.


## Round 6 queue — appended 2026-10-18

Round 5's five rows are `check-passed` and held, so the queue was again empty
and the skill's answer is again to propose five. Live corpus at 00:43 IST on the
18th: **182** rows, none of the five slugs below among them, and none a regional
clone.

**This round is deliberately homogeneous, and that is the design.** Four of the
five are Medicare-rate-regulated service markets where **the price is published
by law** — CMS prints the per-visit, per-diem or per-treatment amount, and CMS
also prints how many certified providers exist. In those markets the grounding
division is not an estimate dressed as arithmetic: rate x volume x providers is
most of the market, from two public tables. That makes them the sharpest possible
test of the finding round 5 produced. If the size spread in a market whose price
is statutory is still wide, the spread cannot be a forecasting problem and cannot
be a data problem — it can only be a scope problem, and the tiers should be
nameable exactly. If it is narrow, that is the first confirmation the diagnostic
has had from a market where the answer is independently knowable.

| # | Slug | Industry | Round | Countable register | State |
|---|---|---|---|---|---|
| 46 | hospice-care-market | Healthcare IT | 6A | CMS Medicare-certified hospice count and Care Compare file; MedPAC hospice chapter FFS spending and margin; **FY**2026 hospice final rule CMS-1835-F, 90 FR 37404 (5 Aug 2025) per-diem rates (RHC days 1-60 / 61+, CHC, IRC, GIP) and the $35,361.44 aggregate cap; Chemed/VITAS and Addus disclosed revenue | check-passed (2026-10-18) — **row corrected:** it said "CY2026", and there is no CY2026 hospice rule; Medicare hospice is paid on the federal fiscal year. The agent caught the error in the brief it was given. |
| 47 | skilled-nursing-facilities-market | Healthcare IT | 6A | CMS certified SNF count (Care Compare / Provider of Services file); MedPAC SNF chapter FFS spending, occupancy and margin; FY2026 SNF PPS final rule PDPM base rates; Ensign / PACS / Brookdale disclosed revenue and facility counts | **needs review (2026-10-18)** — two defects, both found by cross-checking rather than by `check`. (a) The note that said "scope corrected to U.S. in the title" was **false**: `title` and `seo.meta_title` are both geo-neutral, and the headline is Coherent's **global** $453.31B. (b) That source fails a US register cross-check — its own 45.3% North America share gives `0.453 x 453.31 = $205.35B`, which is **6.6% below** the CMS NHEA 2024 US-alone actual of $219.9B, a figure the NA component must contain. Raised by peer session neograph-analytics-72 and re-derived here. Do not publish until re-sourced or the contradiction is stated on the page. |
| 48 | home-infusion-therapy-market | Life Sciences | 6A | CMS qualified Home Infusion Therapy supplier enrollment list; CY2026 HIT per-visit payment amounts by payment category (**three** categories x initial vs subsequent = six HCPCS codes, per 42 CFR 414.1505 — this row said "1-4", which the agent corrected); Medicare DME/HIT claims; Option Care Health disclosed revenue and site count | check-passed (2026-10-18), **owned by peer session neograph-analytics-72** — committed here at 8ceaf73 as $39.4B (2025) -> $66.6B, then superseded in the tree by $42.47B (2026) -> $66.6B at 7.79%, 2026-2032. The surviving version is the coherently paired one (`42.47` x17 in the notes, `190.22` x7 including the statutory per-visit grounding), so it stands; the 2025 figures are withdrawn. `check` exit 0, verifier reproduces. |
| 49 | patient-monitoring-devices-market | Medical Devices | 6A | AHA Annual Survey hospital and **staffed bed** counts; CMS Provider of Services hospital file; FDA 510(k) product codes for physiological monitors; Philips Monitoring & Analytics, GE HealthCare PCS and Baxter (Hillrom) Front Line Care disclosed segment revenue | **needs review (2026-10-18)** — two agents drafted this slug at once. Resolved: agent B's evidence file landed and now matches its JSON (`9.04` 32/25, `9.32` 7/7), so the sourcing gap is closed. Live: $9.04B (2026) -> $15.43B (2032) at 9.32%, 360iResearch, wearables excluded; `check` exit 0, verifier reproduces at 0.0000 pt. **Not check-passed** only because the JSON carries 8 populated `recent_developments` against a dispatch requiring `[]` — a read, not a re-draft. Agent A's independent draft kept in `research/collisions/`. |
| 50 | digital-pathology-market | Healthcare IT | 6A | FDA cleared/de novo whole-slide-imaging device list (DEN and 510(k) numbers); CMS CLIA-certified laboratory counts by type; CMS Clinical Lab Fee Schedule and PFS amounts for 88305 and the digital add-on codes; Roche / Leica (Danaher) / Philips disclosed pathology lines | **re-paired (2026-10-18)** — the $1.66B/16.22% draft was live but **unsourced against the notes on disk**: "16.22" appeared 0 times in them and its grounding division `$147.70/specimen` 0 times, because the surviving notes file belongs to the other draft. The sourcing rule therefore picks the version, not a view on publishers: the live pair is now $2,010M (2026) -> $3,541.46M at 9.90%, which the notes do carry (`2,010` x23, `9.90` x10). `check` exit 0. The unsourced $1.66B JSON is kept at `research/collisions/digital-pathology-market.unsourced-1.66B.json`; it is a complete report and only wants an evidence file, which no longer exists on disk. |

Admission test applied as usual: a public, countable register must exist to
divide a headline through, and the register is named in the row. Rejections from
this pass, recorded so they are not re-proposed: **medical-device sterilization**
(FDA publishes a contract EO-facility list, but no count of cycles or devices
processed, so the denominator is a facility count against a market whose unit is
a device-load — not divisible); **single-use bioprocessing** (no public register
at all; the only denominators available are vendor-reported and so are the
numerators); **clinical trial site management** (not separable from row 42's
CRO register without double-counting the same trial starts).

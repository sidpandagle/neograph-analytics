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
| 47 | skilled-nursing-facilities-market | Healthcare IT | 6A | CMS certified SNF count (Care Compare / Provider of Services file); MedPAC SNF chapter FFS spending, occupancy and margin; FY2026 SNF PPS final rule PDPM base rates; Ensign / PACS / Brookdale disclosed revenue and facility counts | **check-passed (2026-10-18)** — resolved by 9a, 07:30 IST. Of the two recorded defects, **(a) was a mis-record, not a defect**: a geo-neutral `title` and `seo.meta_title` are *correct* beside a global headline, so there was nothing to fix — only the earlier note claiming the scope had been "corrected to U.S." was false, and it is withdrawn. **(b) is real and now stated on the page rather than re-sourced.** Coherent's own page publishes one regional figure, North America **45.3% in 2026** (re-verified at the publisher, not a repost); `0.453 x 453.31 = $205.35B`, which is **6.62% below** the CMS NHEA's *measured* US-alone $219.9B for 2024. Advancing that actual at Coherent's own 9.3% gives `219.9 x 1.093^2 = $262.70B`, forcing NA to **>=57.95%** of the headline, or the headline to `262.70/0.453 = $579.92B` = **1.279x** published. Either the share or the level is wrong. **6.62% is the published figure, not the peer's first 4.3%:** 4.3% measured against $214.65B, a published *2026 estimate*, and an estimate does not bound another estimate, whereas a forward-dated regional component below a *historical measurement* cannot be rescued by any growth assumption. **Not re-sourced, deliberately** — any Tier 3 global near $450B forces the same ~58% NA floor, so the defect is a property of the tier and swapping houses would hide the finding. Carried as notes grounding section **(e)**, in `forecast_analysis`, and in FAQ 6. `check` exit 0, verifier reproduces at 0.0001 pt, `--pair` paired 38/39 (the one miss is `1888`, the SSA s.1888(e) statutory citation, not a figure). |
| 48 | home-infusion-therapy-market | Life Sciences | 6A | CMS qualified Home Infusion Therapy supplier enrollment list; CY2026 HIT per-visit payment amounts by payment category (**three** categories x initial vs subsequent = six HCPCS codes, per 42 CFR 414.1505 — this row said "1-4", which the agent corrected); Medicare DME/HIT claims; Option Care Health disclosed revenue and site count | check-passed (2026-10-18), **owned by peer session neograph-analytics-72** — committed here at 8ceaf73 as $39.4B (2025) -> $66.6B, then superseded in the tree by $42.47B (2026) -> $66.6B at 7.79%, 2026-2032. The surviving version is the coherently paired one (`42.47` x17 in the notes, `190.22` x7 including the statutory per-visit grounding), so it stands; the 2025 figures are withdrawn. `check` exit 0, verifier reproduces. |
| 49 | patient-monitoring-devices-market | Medical Devices | 6A | AHA Annual Survey hospital and **staffed bed** counts; CMS Provider of Services hospital file; FDA 510(k) product codes for physiological monitors; Philips Monitoring & Analytics, GE HealthCare PCS and Baxter (Hillrom) Front Line Care disclosed segment revenue | **needs review (2026-10-18)** — two agents drafted this slug at once. Resolved: agent B's evidence file landed and now matches its JSON (`9.04` 32/25, `9.32` 7/7), so the sourcing gap is closed. Live: $9.04B (2026) -> $15.43B (2032) at 9.32%, 360iResearch, wearables excluded; `check` exit 0, verifier reproduces at 0.0000 pt. **Not check-passed** only because the JSON carries 8 populated `recent_developments` against a dispatch requiring `[]` — a read, not a re-draft. Agent A's independent draft kept in `research/collisions/`. **Blocker closed by 72 (owner of the surviving JSON) at 01:50:** the `[]` requirement was 9a's dispatch, not 72's — 72's brief required well-formed objects. All 8 entries read: each carries a company, an integer year and a dated event, and **K242737 was confirmed against openFDA** (applicant Empatica S.r.l., decision 2025-06-06, product code MWI) exactly as stated. **check-passed (2026-10-18).** |
| 50 | digital-pathology-market | Healthcare IT | 6A | FDA cleared/de novo whole-slide-imaging device list (DEN and 510(k) numbers); CMS CLIA-certified laboratory counts by type; CMS Clinical Lab Fee Schedule and PFS amounts for 88305 and the digital add-on codes; Roche / Leica (Danaher) / Philips disclosed pathology lines | **re-paired (2026-10-18)** — the $1.66B/16.22% draft was live but **unsourced against the notes on disk**: "16.22" appeared 0 times in them and its grounding division `$147.70/specimen` 0 times, because the surviving notes file belongs to the other draft. The sourcing rule therefore picks the version, not a view on publishers: the live pair is now $2,010M (2026) -> $3,541.46M at 9.90%, which the notes do carry (`2,010` x23, `9.90` x10). `check` exit 0. The unsourced $1.66B JSON is kept at `research/collisions/digital-pathology-market.unsourced-1.66B.json`; it is a complete report and only wants an evidence file, which no longer exists on disk. |

### Pairing debt found by `--pair`, 2026-10-18 (pre-existing, both live)

Two published rows fail the pairing test and are queued for repair rather than
left silent. Neither is a round 6 row.

| Slug | Defect | Fix |
|---|---|---|
| `revenue-cycle-management-market` | no `research/<slug>-notes.md` exists at all | **closed by 9a, 07:10 IST — it needed no research.** The evidence file was on disk the whole time under the *draft* slug, `revenue-cycle-management-automation-market-notes.md`: the report was deliberately renamed at publish time (row 19) because the research's own finding is that no defensible standalone size for RCM *automation* exists. `pair()` matches evidence by **exact filename**, so a deliberate rename reads to it as absent research — the figures had reconciled all along (`73.61` x4, `148.44` x2, `12.4` x5). `git mv` to the published slug, content unchanged, pointer stub left at the old path per the no-deletion rule. `--pair`: paired, 40/40. **Lesson for the checker, not for the corpus:** `--pair` cannot distinguish a rename from missing work, so a renamed slug must move its notes in the same commit. |
| `veterinary-diagnostics-market` | JSON `forecast_value` 16.48 vs notes 16.49 (x2); 16.48 absent from notes | **fixed and published by 72, 02:05 IST.** The notes print the derivation: Mordor publishes $9.53B (2026), $15.05B (2031) and 9.57% for 2026-2031, and 9.53 x 1.0957^6 = **16.49084**. 16.48 also implied 9.5580%, contradicting the JSON's own stated 9.57%, so it was a transcription slip and not a second reading of the source. All 6 occurrences corrected; CAGR delta 0.0120 -> 0.0009 pt; `--pair` now 16/16, paired. Published as an edit to an already-built row, which reaches prod via ISR with no deploy - corpus still 182, confirming an overwrite rather than an addition. |

Both reach production through ISR with no deploy, so neither waits on a window.

**Table closed 2026-10-18, 07:15 IST.** Both rows are fixed — veterinary by 72 at 02:05, RCM by 9a at 07:10 — and a corpus-wide sweep, `python -I scripts/verify-report-arithmetic.py --pair --all`, now reports **50 paired-checked, 0 not paired**. Every draft in `content/reports/` carries an evidence file whose figures contain its own headline.

Admission test applied as usual: a public, countable register must exist to
divide a headline through, and the register is named in the row. Rejections from
this pass, recorded so they are not re-proposed: **medical-device sterilization**
(FDA publishes a contract EO-facility list, but no count of cycles or devices
processed, so the denominator is a facility count against a market whose unit is
a device-load — not divisible); **single-use bioprocessing** (no public register
at all; the only denominators available are vendor-reported and so are the
numerators); **clinical trial site management** (not separable from row 42's
CRO register without double-counting the same trial starts).

## Round 7 queue — appended 2026-10-18, 07:35 IST by session 9a

Round 6's five rows are all `check-passed` as of 07:20 (row 47 was the last, and
its defect is now stated on the page rather than re-sourced), and the
pairing-debt table above is closed. The queue is therefore empty again, and the
skill's answer to an empty queue is to propose five. Live corpus at 07:30:
**182** rows, none of the five slugs below among them, none a regional clone.

**The design: finish the post-acute family, then step outside it.** Rounds 5 and
6 established one diagnostic — divide the headline by a statutory price times a
federal provider count — and row 47 showed its sharpest result yet: a global
headline whose *own* published regional share falls 6.62% below a measured
national actual. Medicare pays for post-acute care in **five** settings, each
with its own prospective payment system, its own published base rate and its own
certification register. This corpus now has two of them (SNF row 47, hospice row
46). Rows 51-53 take the remaining three, which makes the set complete and makes
one cross-report finding available that no single report can carry: **the same
patient, discharged to five different settings at five statutory prices, sized
by houses that disagree with each other by different multiples in each setting.**
If the size spread varies systematically across the five, it is a scope artefact
of each setting's boundary; if it is constant, it is a property of the houses.
Either answer is publishable, and neither is reachable without all five.

Rows 54 and 55 deliberately leave the family, so the round is not five
restatements of one register. Both still meet the admission test, and both carry
a statutory price list: the Clinical Laboratory Fee Schedule and the Ambulance
Fee Schedule.

| # | Slug | Industry | Round | Countable register | State |
|---|---|---|---|---|---|
| 51 | home-health-care-market | Healthcare IT | 7A | CMS Medicare-certified home health agency count (Care Compare / Provider of Services file); **CY**2026 HH PPS final rule 30-day episode base payment amount and the LUPA per-visit amounts (home health is paid on the *calendar* year, unlike SNF/IRF/LTCH/hospice, which are fiscal-year — do not assume FY); MedPAC home health chapter FFS spending, episode counts and margin; UnitedHealth/LHC, Enhabit and Aveanna disclosed revenue and location counts | **check-passed (2026-10-18)** — $504.80B (2026) -> $1,015.80B (2033) @ 10.51%, Grand View. CY trap avoided: CMS-1828-F, **90 FR 55342**, 2 Dec 2025, "Calendar Year 2026". Boundary vs `hospital-at-home-market` set from the payment instruments (s.1895 HH PPS / 30-day period / 12,234 agencies / no prior stay, against the AHCAH waiver / IPPS DRG / 373 hospitals), not asserted. |
| 52 | inpatient-rehabilitation-facilities-market | Healthcare IT | 7A | CMS certified IRF count (freestanding vs hospital-unit split); FY2026 IRF PPS final rule standard payment conversion factor and CMG relative weights; MedPAC IRF chapter FFS spending, cases, occupancy and margin; Encompass Health and Select Medical disclosed segment revenue and bed counts | **check-passed (2026-10-18), WITH A DEVIATION FOR SIDDHANT** — $23.72B (2026) -> $37.22B (2032) @ 7.80%. **No publisher sizes the IRF in dollars**, so the base is NeoGraph's own construction from MedPAC and the Federal Register, and the growth rate comes from a *different* publisher (GMI) than the base. First constructed headline in this corpus. Labelled as a construction in the meta description, executive summary, forecast analysis, methodology and two FAQs, with both derivation routes and their 3.94% divergence printed. Accepted on the view that a construction from federal measurements, labelled, beats citing a house that does not measure it — but it is a precedent, so it is flagged here rather than buried in a commit. |
| 53 | long-term-care-hospitals-market | Healthcare IT | 7A | CMS certified LTCH count (~340, small enough to be nearly exact); FY2026 LTCH PPS final rule standard federal payment rate and the site-neutral rate; MedPAC LTCH chapter FFS spending, discharges and margin, plus the post-2016 dual-rate structure that halved the eligible population; Select Medical critical-illness-recovery segment disclosed revenue and hospital count | **check-passed (2026-10-18)** — $23.62B (2026) -> $34.80B (2034) @ 4.96%, Dataintelo, published at the rate its own endpoints imply (4.9649%) rather than its stated 5.2%, which contradicts its own 2034 value. A contracting sector: spending -8.99%/yr, cases -11.56%/yr. MedPAC's March 2026 post-acute chapter **excludes LTCHs by footnote**. |
| 54 | clinical-laboratory-services-market | Life Sciences | 7A | CMS CLIA certified-laboratory counts by certificate type; Clinical Laboratory Fee Schedule amounts and the PAMA private-payer rate-setting data; Medicare Part B lab spending; Labcorp and Quest disclosed revenue, requisition and test volumes | **check-passed (2026-10-18)** — $315.14B (2026) -> $459.58B (2032) @ 6.49%, Mordor, chosen as the only surveyed series whose scope excludes instruments, reagents and standalone software by name. CLIA register split cleanly from the point-of-care report: that one owns waiver 233,448 + PPM 21,736 = 255,184; this one uses compliance 15,214 + accreditation 15,542 = 30,756. |
| 55 | ambulance-and-emergency-medical-services-market | Healthcare IT | 7A | CMS Ambulance Fee Schedule base rates by level of service plus the mileage amounts and the ground ambulance add-ons; CMS ambulance supplier enrollment counts; NEMSIS national EMS activation counts; No Surprises Act ground-ambulance advisory committee data; Global Medical Response / Falck disclosed figures where public | **check-passed (2026-10-18)** — $51.73B (2026) -> $90.93B (2032) @ 9.86% (published at the derivation, since 360iResearch's printed 9.82% disagrees with its own endpoints). MedPAC's GADCS ownership tiers sum to **exactly** its printed 49,901,430 transports and $51.11B, which is **0.988x the entire global published headline** and is published as a floor, not grossed up. |

Admission test applied as usual, and two candidates were rejected rather than
drafted, recorded so they are not re-proposed: **dental services** (no federal
price register — Medicare largely excludes dental, so there is no statutory
amount and no certification count to divide through; the only denominators are
ADA survey estimates, which are themselves estimates); **freestanding imaging
centres** (the Physician Fee Schedule prices the procedure, but no federal
register counts *centres* as distinct from enrolled billing suppliers, so the
denominator and the numerator are not the same unit — the same defect that
rejected medical-device sterilization in round 6).

Marked `drafting` and **committed before any agent was dispatched**, which is the
correction round 6A earned: a queue committed as `queued` with the claims left
uncommitted reads as unclaimed from every other session on the branch, and that
is what put ten agents on five slugs. Five agents, one per topic, each owning
exactly `research/<slug>-notes.md` and `content/reports/<slug>.json` and nothing
else — not this file, not `WORKLOG.md`, not `STATUS.md`.

### Round 7 — all five pass `check`, held for the publish window

Five topics, five agents, one per topic, each owning only its own notes and
report JSON. **No agent wrote outside its two paths this time** — `git status`
after the fan-out showed exactly the ten expected files, which is the round 6A
lesson holding. Every figure below was re-derived in the session: all three
gates re-run on all five files, and each grounding division recomputed
independently. All five reproduced.

| Slug | Base -> forecast | CAGR | Size spread | CAGR spread | Grounding |
|---|---|---|---|---|---|
| home-health-care-market | $504.80B -> $1,015.80B | 10.51% | 1.344x verified global; **3.91x** US-only | **1.579x** | `0.423 x 504.80 = $213.53B` NA, `/ 12,234` certified agencies = **$17.45M per agency**, against two *measured* per-location figures agreeing to 1.5% — $3.2683M (Enhabit 10-K) and $3.2195M (DOJ divestiture decree) — a **5.34x** gap that rules out the global headline being the certified-agency sector. Register internally consistent: `$16.0B / 8.3M periods = $1,927.71` = **0.9458** of the statutory $2,038.22; `$16.0B / 65.4M visits = $244.65` against MedPAC's own $245 |
| inpatient-rehabilitation-facilities-market | $23.72B -> $37.22B | 7.80% | 6.36x across parent categories; **12.79x / 54.81x** against this market | 1.19x | The FY2026 rule reconciles **to the cent**: `18,907 x 1.026 x 1.0001 x 0.9985 = $19,371`, and `19,371 x 0.7244 = $14,032.35` / `x 4.5328 = $87,804.87` reproduce both published CMG rates exactly. Realised `$11.0B / 435,000 stays = $25,287` = **1.3054x** statutory. Per occupied bed day $2,062.51, between Encompass's $1,806.79 and Select's $2,260. MedPAC's own 42% reproduces: `166 / 392 = 42.3%` |
| long-term-care-hospitals-market | $23.62B -> $34.80B | 4.96% | **17.05x** | 1.10x | `$2.4B / 47,000` FFS stays = $51,064 = **1.0613x** statutory; all-payer floor `130,050 x $51,064 = $6.64B` against an operator-scaled `$23.825M x 336 = $8.01B`, gap **1.21x**, reproduced independently as $2,230/day vs $1,850.14/day. Reanin's global $1.32B is **0.55x** US Medicare FFS alone and is ruled out |
| clinical-laboratory-services-market | $315.14B -> $459.58B | 6.49% | 1.480x | **1.97x** | `$103.79B / 30,756` compliance-and-accreditation labs = **$3.37M/lab** (the same numerator over the waived 255,184 gives $406,726, absurd for a waiver certificate — which is how the two CLIA tiers separate). Quest `$10,785M / 244M requisitions = $44.20` against a $31.72 three-test CLFS basket = **1.393x**. Labcorp Dx alone is **1.0997x** MarkNtel's entire US market |
| ambulance-and-emergency-medical-services-market | $51.73B -> $90.93B | 9.86% | 8.94x full set; 1.99x ex-outlier; **1.90x inside one house** | 1.72x | MedPAC's GADCS ownership tiers sum to **exactly** its printed total: `20,995,123 x $563 + 9,692,384 x $830 + 19,213,923 x $1,626 = $51,106,771,767` over `49,901,430` transports = **$1,024.15 per transport**, and that US-ground-only floor is **0.988x the entire global published headline**. Realised Medicare `$5.3B / 11.3M = $469.03` = **45.80%** of measured cost |

**Three findings this round produced that no single earlier report could.**

1. **Row 47's defect generalises across houses and across markets.** In home
   health, two of five global houses publish a North America figure that falls
   *below* the federally measured United States alone when advanced at their own
   rate — Coherent by **3.80%**, Fortune by **8.42%** on its own published
   dollar figure rather than on a share. Grand View passes (NA 9.67% above the
   US alone), which is why it is the headline. In ambulance, the measured US
   floor is **2.317x** Fortune's implied US, forcing either a >=80.15% US share
   or a headline 2.317x larger. So the SNF finding was not about one publisher.
2. **In two of five markets the CAGR spread exceeds the size spread** — clinical
   lab 1.97x against 1.480x, home health 1.579x against 1.344x — reversing the
   pattern every earlier round found. Where it reverses, the growth rate is a
   forecast of a *policy* (PAMA's blocked-but-still-authorised cuts; the CY2026
   home health rate path), not of volume.
3. **One house, two incompatible markets, same day.** Fortune publishes
   "Ambulance Services" at $63.76B and "Emergency Medical Services" at $33.56B,
   both for 2026, both last updated 28 September 2026, neither page mentioning
   the other. A **1.90x** disagreement inside a single publisher is not a scope
   difference between houses; it is one house selling two answers.

**The post-acute family is now complete.** Medicare pays for post-acute care in
five settings and this corpus has all five: SNF (row 47), hospice (46), home
health (51), IRF (52), LTCH (53). The cross-setting article the round was
designed to make possible is now writable, and the striking part is how
unequally the literature treats them — the size spread runs **17.05x** for
LTCHs, **6.65x** for dialysis-adjacent SNF, **3.91x** for US home health, and
for IRFs there is *no published dollar figure at all*. That is not five houses
disagreeing about growth. It is the literature being thinnest exactly where the
federal measurement is sharpest.

**One deviation, flagged for Siddhant rather than buried.** The IRF headline is
the first **constructed** headline in this corpus: no publisher sizes the IRF in
dollars, so the base is built from MedPAC and the Federal Register, and the
growth rate is taken from a different publisher than the base. It is labelled as
a construction in the meta description, executive summary, forecast analysis,
methodology and two FAQs, with both derivation routes and their 3.94% divergence
printed on the page. Accepted on the view that a labelled construction from
federal measurements is worth more than a citation to a house that does not
measure the thing — but it is a precedent for what this publication will put in
a headline, so it is a decision Siddhant should see rather than inherit.

Every one of the five: `regional_analysis` and `country_analysis` empty; no
vendor `market_share` anywhere; `check` exit 0; verifier reproduces with a worst
CAGR delta of **0.0044 pt**; `--pair` paired on all five. Corpus-wide after this
round: **`check` 55 pass 0 fail, `--pair --all` 55 paired-checked 0 not paired.**

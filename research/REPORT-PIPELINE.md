# Report pipeline — the 30-50 report expansion

Standing instruction (2026-10-16): add **30-50 new research reports** to the
corpus, held to `REPORT-AUTHORING-BRIEF.md`. Corpus was **142** rows at the
start of this expansion.

Research runs in batches of 5, two batches in flight at a time (the two-subagent
limit). A batch is done when every draft in it passes
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
| 11 | single-cell-sequencing-market | Life Sciences | 2A | check-passed |
| 12 | spatial-biology-market | Life Sciences | 2A | check-passed |
| 13 | proteomics-market | Life Sciences | 2A | check-passed |
| 14 | pharmacogenomics-market | Life Sciences | 2A | check-passed |
| 15 | organoid-and-organ-on-chip-market | Life Sciences | 2A | check-passed |
| 16 | decentralized-clinical-trials-market | Healthcare IT | 2B | check-passed |
| 17 | real-world-evidence-market | Healthcare IT | 2B | check-passed |
| 18 | health-data-interoperability-market | Healthcare IT | 2B | check-passed |
| 19 | ~~revenue-cycle-management-automation-market~~ -> **revenue-cycle-management-market** | Healthcare IT | 2B | check-passed |
| 20 | hospital-at-home-market | Healthcare IT | 2B | check-passed |
| 21 | proton-therapy-market | Medical Devices | 3A | check-passed |
| 22 | surgical-navigation-market | Medical Devices | 3A | check-passed |
| 23 | insulin-delivery-devices-market | Medical Devices | 3A | check-passed |
| 24 | sleep-apnea-devices-market | Medical Devices | 3A | check-passed |
| 25 | hearing-aids-market | Medical Devices | 3A | check-passed |
| 26 | biologics-cdmo-market | Pharmaceuticals | 3B | check-passed |
| 27 | sterile-injectables-market | Pharmaceuticals | 3B | check-passed |
| 28 | vaccine-cold-chain-market | Pharmaceuticals | 3B | check-passed |
| 29 | plasma-fractionation-market | Pharmaceuticals | 3B | check-passed |
| 30 | pharmacy-automation-market | Healthcare IT | 3B | check-passed |
| 31 | medical-device-cybersecurity-market | Healthcare IT | 4A | queued |
| 32 | nuclear-medicine-radioisotope-market | Pharmaceuticals | 4A | queued |
| 33 | ophthalmic-therapeutics-market | Pharmaceuticals | 4A | queued |
| 34 | psychedelic-therapeutics-market | Pharmaceuticals | 4A | queued |
| 35 | fertility-and-ivf-services-market | Healthcare IT | 4A | queued |
| 36 | femtech-market | Medical Devices | 4B | queued |
| 37 | advanced-wound-care-market | Medical Devices | 4B | queued |
| 38 | orthopedic-implants-market | Medical Devices | 4B | queued |
| 39 | rehabilitation-robotics-market | Medical Devices | 4B | queued |
| 40 | veterinary-diagnostics-market | Life Sciences | 4B | queued |

**Rounds 2 and 3 are drafted and passing `check` — twenty reports held for the
next merge slot**, plus two analysis articles and a press release in
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

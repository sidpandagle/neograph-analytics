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
| 1 | liquid-biopsy-market | Life Sciences | 1A | drafting |
| 2 | point-of-care-diagnostics-market | Medical Devices | 1A | drafting |
| 3 | antimicrobial-resistance-diagnostics-market | Life Sciences | 1A | drafting |
| 4 | neuromodulation-market | Medical Devices | 1A | drafting |
| 5 | brain-computer-interface-market | Medical Devices | 1A | drafting |
| 6 | radiopharmaceuticals-market | Pharmaceuticals | 1B | drafting |
| 7 | car-t-cell-therapy-market | Biotechnology | 1B | drafting |
| 8 | bispecific-antibodies-market | Biotechnology | 1B | drafting |
| 9 | glp-1-receptor-agonists-market | Pharmaceuticals | 1B | drafting |
| 10 | phage-therapy-market | Biotechnology | 1B | drafting |
| 11 | single-cell-sequencing-market | Life Sciences | 2A | queued |
| 12 | spatial-biology-market | Life Sciences | 2A | queued |
| 13 | proteomics-market | Life Sciences | 2A | queued |
| 14 | pharmacogenomics-market | Life Sciences | 2A | queued |
| 15 | organoid-and-organ-on-chip-market | Life Sciences | 2A | queued |
| 16 | decentralized-clinical-trials-market | Healthcare IT | 2B | queued |
| 17 | real-world-evidence-market | Healthcare IT | 2B | queued |
| 18 | health-data-interoperability-market | Healthcare IT | 2B | queued |
| 19 | revenue-cycle-management-automation-market | Healthcare IT | 2B | queued |
| 20 | hospital-at-home-market | Healthcare IT | 2B | queued |
| 21 | proton-therapy-market | Medical Devices | 3A | queued |
| 22 | surgical-navigation-market | Medical Devices | 3A | queued |
| 23 | insulin-delivery-systems-market | Medical Devices | 3A | queued |
| 24 | sleep-apnea-devices-market | Medical Devices | 3A | queued |
| 25 | hearing-aids-market | Medical Devices | 3A | queued |
| 26 | biologics-cdmo-market | Pharmaceuticals | 3B | queued |
| 27 | sterile-injectables-market | Pharmaceuticals | 3B | queued |
| 28 | vaccine-cold-chain-market | Pharmaceuticals | 3B | queued |
| 29 | plasma-fractionation-market | Pharmaceuticals | 3B | queued |
| 30 | pharmacy-automation-market | Healthcare IT | 3B | queued |
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

States: `queued` -> `drafting` -> `check-passed` -> `published`. A topic that
turns out to have no defensible public evidence base is marked `dropped` with
the reason, and the next queued topic takes its slot — a thin report is worse
than no report.

## Published from this expansion

(none yet)

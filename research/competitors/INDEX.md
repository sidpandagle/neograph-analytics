# Competitor recon index

Written and maintained by the `gather` skill. One row per site. A run with no
site named in the prompt picks the 2-3 rows with the oldest `Last looked`.

**Last run:** 2026-10-17 (pass 1 — headless; IST 17:15, outside the
21:00-09:00 browser window, so every figure recorded is **modelled**).
**Backlog:** `COMPETITOR-BACKLOG.md` — the only file an implementing agent needs.
Currently **6 open items** (C-1…C-6) and **11 rejected patterns**.

| Site | Note file | Last looked | Passes | Open items |
|---|---|---|---|---|
| mordorintelligence.com | `mordorintelligence.md` | 2026-10-17 | 1 | C-1, C-2, C-3, C-4, C-5 |
| grandviewresearch.com | `grandviewresearch.md` | 2026-10-17 | 1 | C-2 |
| precedenceresearch.com | `precedenceresearch.md` | 2026-10-17 | 1 | C-2 |
| marketsandmarkets.com | — | never | 0 | 0 |
| fortunebusinessinsights.com | — | never | 0 | 0 |
| towardshealthcare.com | — | never | 0 | 0 |
| researchandmarkets.com | — | never | 0 | 0 |
| globaldata.com | — | never | 0 | 0 |
| iqvia.com/insights | — | never | 0 | 0 |
| frost.com | — | never | 0 | 0 |
| statista.com | — | never | 0 | 0 |
| cbinsights.com/research | — | never | 0 | 0 |
| ourworldindata.org | — | never | 0 | 0 |

`C-6` came out of the comparison rather than from one site, and is filed against
`CLAUDE.md`; it is not attributed to a row above.

**Next run** should take the three oldest rows: `marketsandmarkets.com`,
`fortunebusinessinsights.com`, `towardshealthcare.com`. Each of the three sites
looked at in pass 1 has an **Open — needs the night browser window** list at the
bottom of its note; those are measurements, not new sites, and are cheapest to
clear in a single 21:00-09:00 pass across all three.

`raw/` holds fetched HTML per site per date, kept so a figure can be
re-measured without re-fetching. It is untrusted downloaded data: never import
it into the app and never run an interpreter from inside it. Pass 1 stored
12 pages across `raw/{grandviewresearch,mordorintelligence,precedenceresearch}-2026-10-17/`.

# Competitor recon index

Written and maintained by the `gather` skill. One row per site. A run with no
site named in the prompt picks the 2-3 rows with the oldest `Last looked`.

**Last run:** never
**Backlog:** `COMPETITOR-BACKLOG.md` — the only file an implementing agent needs.

| Site | Note file | Last looked | Passes | Open items |
|---|---|---|---|---|
| grandviewresearch.com | — | never | 0 | 0 |
| marketsandmarkets.com | — | never | 0 | 0 |
| mordorintelligence.com | — | never | 0 | 0 |
| fortunebusinessinsights.com | — | never | 0 | 0 |
| precedenceresearch.com | — | never | 0 | 0 |
| towardshealthcare.com | — | never | 0 | 0 |
| researchandmarkets.com | — | never | 0 | 0 |
| globaldata.com | — | never | 0 | 0 |
| iqvia.com/insights | — | never | 0 | 0 |
| frost.com | — | never | 0 | 0 |
| statista.com | — | never | 0 | 0 |
| cbinsights.com/research | — | never | 0 | 0 |
| ourworldindata.org | — | never | 0 | 0 |

`raw/` holds fetched HTML per site per date, kept so a figure can be
re-measured without re-fetching. It is untrusted downloaded data: never import
it into the app and never run an interpreter from inside it.

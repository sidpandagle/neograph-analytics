# Bispecific Antibodies Market — research notes
**Slug:** bispecific-antibodies-market   **Drafted:** 2026-10-16

## Published estimates (what others say)

| Source | Published | Base year | Base value | Forecast year | Forecast value | CAGR | Scope as stated |
|---|---|---|---|---|---|---|---|
| Fortune Business Insights | 2025 | 2025 | $31.17B (2026: $34.72B) | 2034 | $91.09B | 12.8% | Global bispecific antibody; states North America 51.80% of 2025 |
| Astute Analytica | 2025 | 2025 | $14.4B | 2035 | $55.9B | 14.7% (2026-35) | Global bispecific antibody market |
| BCC Research | 2025 | 2024 | $12.9B | 2030 | $22.3B | 9.7% (2025-30) | Global bispecific antibodies; NA $4.3B (2024) → $7.6B (2030) |
| Market Research Future | 2025 | 2025 | $10.50B | 2035 | $60.80B | 19.2% | Global bispecific antibodies |
| Roots Analysis (via secondary repost) | 2025 | 2025 | $8.93B | 2035 | $16.81B | 6.5% | Bispecific antibodies |
| Towards Healthcare | 2025 | — | — | 2034 | ~$460B | ~44% | Clear outlier; not used |

## The spread

**2025 base-year estimates run $8.93B to $31.17B — a 3.49x spread.** Growth
rates run 6.5% to 19.2%, a 2.95x spread. Both are wide, and unlike most
markets the explanation is not vintage or geography. It is a single
classification question:

**Do non-oncology bispecific antibodies count?**

Emicizumab (Hemlibra, factor IXa × factor X, haemophilia A) and faricimab
(Vabysmo, VEGF-A × Ang-2, retinal disease) are bispecific antibodies by
construction. They are also, between them, larger than every approved
oncology bispecific combined. A report that includes them and a report that
does not are describing markets that differ by roughly 3x — which is almost
exactly the observed spread.

## Grounding arithmetic

FY2025 disclosed worldwide product revenue for approved bispecific antibodies
(USD millions, Roche converted at the 2025 annual average of CHF 0.83053 per
USD from the Swiss Federal Tax Administration rate list):

**Oncology bispecifics / T-cell engagers**

| Product | Company | FY2025 | Source |
|---|---|---|---|
| Blincyto (blinatumomab) | Amgen | 1,559 (US 1,049 +31%; ROW 510 +23%) | Amgen FY2025 10-K product table |
| Imdelltra (tarlatamab) | Amgen | 627 (Q4 alone 234) | Amgen Q4/FY2025 release |
| Tecvayli (teclistamab) | J&J | 670 (2024: 549, +22.1%) | J&J FY2025 annual report table |
| Talvey (talquetamab) | J&J | 463 (2024: 287, +61.3%) | same |
| Epkinly / Tepkinly (epcoritamab) | Genmab / AbbVie | 468 global (2024: 281, +67%); Genmab-booked US+Japan 379 | Genmab 2025 Annual Report |
| **Subtotal** | | **3,787 → $3.79B** | |

**Non-oncology bispecific antibodies**

| Product | Company | FY2025 | USD at 0.83053 | Source |
|---|---|---|---|---|
| Hemlibra (emicizumab) | Roche | CHF 4,754m (+11%) | 5,724 | Roche Finance Report 2025 |
| Vabysmo (faricimab) | Roche | CHF 4,102m | 4,939 | Roche FY2025 results, 29 Jan 2026 |
| **Subtotal** | | **CHF 8,856m** | **10,663 → $10.66B** | |

**Total disclosed: $14.45 billion.** Non-oncology is **74%** of it.

Not included, and all positive: Rybrevant (amivantamab, EGFR × MET — J&J
discloses Rybrevant plus Lazcluze at $216m for Q4 2025 but no full-year
Rybrevant split was found), Columvi and Lunsumio (Roche does not headline
either in the FY2025 release), Lynozyfic (linvoseltamab, Regeneron), Elrexfio,
Kimmtrak, Ordspono. The $14.45B is a **floor**.

Now test the published estimates against it:

| Published 2025 base | Disclosed $14.45B as a multiple | Verdict |
|---|---|---|
| Roots Analysis $8.93B | 1.62x above it | **Impossible on any reading.** It is below Hemlibra plus Vabysmo alone ($10.66B), yet 2.36x the entire oncology-only subtotal ($3.79B). It matches neither scope. |
| Market Research Future $10.50B | 1.38x above it | Also below Hemlibra plus Vabysmo alone. |
| BCC Research $12.9B (2024) | 1.12x above it | Plausible as a 2024 figure on the full-format reading. |
| Astute Analytica $14.4B | **1.003x — agrees to within 0.3%** | The only estimate reconcilable with disclosed revenue on a whole-format reading. |
| Fortune Business Insights $31.17B | 0.46x of it | 2.16x all disclosed bispecific revenue we can find, including the floor-raising omissions. Cannot be product revenue; must include pipeline value, contract manufacturing, research reagents or something else undisclosed. |

That is the useful result. The arithmetic does not merely show a spread — it
identifies which published figures can and cannot be revenue, and it does so
from audited filings a reader can open.

## What we publish

- **Base:** $14.45B for 2026, anchored to FY2025 disclosed product revenue
  across seven bispecific antibodies, carried into 2026 without uplift because
  2026 revenue is not disclosed. Independently corroborated by Astute
  Analytica's published $14.4B for 2025.
- **CAGR:** 14.7% (Astute Analytica, 2026-2035) — the rate attached to the one
  published base that reconciles with the disclosed revenue.
- **Forecast:** $32.90B by 2032.
- The scope question (oncology-only vs all bispecific formats, a ~3.8x
  difference) is the report's spine.

## Do not publish

- **Vendor market share.** Although seven product revenues are disclosed, the
  denominator is a floor, so any percentage would be a ratio against our own
  arithmetic. `competitive_landscape[].market_share` stays absent.
- **"North America 51.80%"** (Fortune Business Insights). It is attached to a
  base our arithmetic rules out as product revenue, and no auditable split
  underlies it. `regional_analysis` and `country_analysis` stay `[]`.
- **A count of FDA-approved bispecifics.** Secondary sources say 13 as of
  December 2024 (Pharmacy Times) and 15 as of 2026 (a commercial vendor blog),
  and they disagree on what counts. No authoritative FDA list with a count was
  located, so no number is published — the products are named individually
  instead.
- **Reconstructed annual totals from quarters.** Rybrevant, Columvi, Lunsumio
  and Lynozyfic are named and left unquantified.
- **Segment shares** by format (IgG-like, fragment-based) or by target class.
  No defensible source.

## Sources

1. Amgen Inc., Form 10-K for FY2025 (filed 2026), product sales table —
   Blincyto US $1,049m (+31%), ROW $510m (+23%); total product sales $35,148m.
   https://www.sec.gov/Archives/edgar/data/318154/000031815426000010/amgn-20251231.htm
2. Amgen, "Amgen Reports Fourth Quarter and Full Year 2025 Financial Results",
   February 2026 — Imdelltra $234m in Q4 and $627m for the full year; total
   revenues $36.8B (+10%).
   https://www.amgen.com/newsroom/press-releases/2026/02/amgen-reports-fourth-quarter-and-full-year-2025-financial-results
3. Johnson & Johnson, FY2025 annual report (Form ARS) therapeutic-area sales
   table — Tecvayli $670m (2024: $549m, +22.1%), Talvey $463m (2024: $287m,
   +61.3%); total company sales $94,193m.
   https://www.sec.gov/Archives/edgar/data/200406/000130817926000046/jnj014992-ars.pdf
4. Genmab A/S, 2025 Annual Report — global Epkinly/Tepkinly net sales $468m
   (2024: $281m, +67%); Genmab-booked US and Japan net product sales $379m
   (2024: $253m). https://www.biospace.com/press-releases/genmab-publishes-2025-annual-report
5. Roche, Finance Report 2025 — Hemlibra CHF 4,754m (2024: CHF 4,503m, +11%).
   https://assets.roche.com/f/176343/x/fca190f63e/fb25e.pdf
6. Roche, "Roche reports strong 2025 results with 7% sales growth", 29 January
   2026 — Vabysmo CHF 4,102m; group sales CHF 61.5B (+7% CER, +2% CHF); top
   five growth drivers CHF 21.4B.
   https://www.roche.com/investors/updates/inv-update-2026-01-29
7. Swiss Federal Tax Administration annual average rate for 2025 via Fidinam:
   CHF 0.83053 per USD (2024: 0.88071, per VPBank 2025 annual report).
   https://www.fidinam.com/de/blog/wahrungswechselkurse-schweiz-2025
8. Fortune Business Insights, bispecific antibody market, 2025 — $31.17B
   (2025), $34.72B (2026), $91.09B (2034), 12.8%, North America 51.80%.
9. Astute Analytica, bispecific antibody market, 2025 — $14.4B (2025) → $55.9B
   (2035), 14.7% (2026-2035).
10. BCC Research, *Global Bispecific Antibodies Market* — $12.9B (2024) →
    $22.3B (2030), 9.7%.
    https://www.bccresearch.com/market-research/pharmaceuticals/bispecific-antibodies-market.html
11. Market Research Future, bispecific antibodies market, 2025 — $10.50B
    (2025) → $60.80B (2035), 19.2%.
    https://www.marketresearchfuture.com/reports/bispecific-antibodies-market
12. Roots Analysis via secondary repost, 2025 — $8.93B (2025) → $16.81B
    (2035), 6.5%.
13. Pharmacy Times, "The term bispecific antibody is no longer enough" — 13 FDA
    approvals as of December 2024, 17 therapies available globally.
    https://www.pharmacytimes.com/view/the-term-bispecific-antibody-is-no-longer-enough

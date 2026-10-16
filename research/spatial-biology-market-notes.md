# Spatial Biology Market — research notes
**Slug:** spatial-biology-market   **Drafted:** 2026-10-16

## Published estimates (what others say)

| Source | Published | Base year | Base value | Forecast year | Forecast value | CAGR | Scope as stated |
|---|---|---|---|---|---|---|---|
| Roots Analysis, *Spatial Biology Market* | last updated Sep 2026 | 2025 | $1.20B (2026: $1.40B) | 2035 | $5.14B | 15.5% (2026–2035) | "commercial revenue attributable to in-scope spatial-biology instruments, consumables, software" plus analytics and outsourced services. Transcriptomics, genomics, proteomics, metabolomics, multi-omics |
| Meticulous Research, *Spatial Biology Market* (6714) | Jun 2026 | 2025 (base), 2026 value given | $1.48B (2026) | 2036 | $10.2B | 19.3% (2026–2036) | Instruments, consumables, software, services; spatial transcriptomics, proteomics, genomics. **Its own endpoints do not reconcile with its own rate — see below** |
| MarketsandMarkets, spatial genomics & transcriptomics | — | 2024 | $554.5M | 2029 | $995.7M | 12.4% | **Spatial genomics and transcriptomics only** — no spatial proteomics |
| Arizton, *Spatial Transcriptomics and Genomics* | — | 2024 | $383.93M | 2030 | $1.00B | 17.4% | Spatial transcriptomics and genomics only. Lowest base in the set |
| Global Market Insights | — | 2022 | $305.7M | 2032 | $1.2B | 15.2% (2023–2032) | Spatial genomics and transcriptomics |
| Roots Analysis, *Spatial Genomics and Transcriptomics* | — | 2025 | $6.5B (2026: $7.3B) | 2035 | $20.1B | 11.9% (2026–2035) | Spatial genomics and transcriptomics. **Same house, narrower scope, 5.4x its own wider-scope figure. Taken from a third-party search summary, not the primary page — flagged** |
| BCC Research, spatial genomics & transcriptomics | — | 2022 | $1.5B | 2027 | $2.5B | 10.8% | Spatial genomics and transcriptomics. Vintage figures, retained for the spread only |

## The spread

**$383.93M (Arizton, 2024) to $6.5B (Roots Analysis narrow scope, 2025) — a 16.9x spread.**

Unusually, the spread here is *not* mainly a scope difference, because the two extremes
claim the *same, narrower* scope: spatial transcriptomics and genomics. Arizton puts it at
$383.93M for 2024; Roots Analysis puts it at $6.5B for 2025. Both exclude spatial proteomics.
These cannot both be measurements of the same thing.

Worse, the house publishing the largest narrow-scope number publishes a *smaller* number for
the wider scope that contains it: Roots Analysis's *Spatial Biology* report (instruments,
consumables, software, services, across transcriptomics, genomics, proteomics, metabolomics and
multi-omics) is **$1.20B for 2025**, while its *Spatial Genomics and Transcriptomics* report is
**$6.5B for 2025** — a subset larger than its superset by 5.4x, from the same publisher. One of
the two is wrong by construction. We treat the $6.5B series as unusable and say so, and note
that we read it from a third-party summary rather than the primary page.

Setting that outlier aside, the remaining disagreement is a genuine scope split:
- **Narrow (transcriptomics + genomics, no proteomics):** $383.93M–$554.5M at 2024, a 1.44x spread.
- **Wide (all spatial modalities including proteomics and services):** $1.20B (2025) to $1.48B (2026), which is roughly the same series one year apart.

So the sector's real published disagreement is that **spatial proteomics plus services is
worth 2–3x the sequencing-based spatial market on its own** — which is the opposite of the
impression the sector's publicity gives.

### Meticulous Research's figures do not reconcile with each other

```
$1.48B (2026) x 1.193^10 = $8.64B    — not the $10.2B published
To reach $10.2B from $1.48B in 10 years requires (10.2/1.48)^(1/10) - 1 = 21.3%
```

Its stated 19.3% and its stated $10.2B endpoint are 18% apart in value. By contrast,
Roots Analysis's series closes: $1.40B x 1.155^9 = $5.12B against its published $5.14B, a
0.4% difference. That internal consistency is one reason we build on Roots rather than
Meticulous.

## Grounding arithmetic

**Register used:** 10x Genomics' Form 8-K Exhibit 99.1 (11 January 2026), which reports Spatial
separately from Single Cell and consumables separately from instruments; and Akoya Biosciences'
last full standalone fiscal year before its acquisition by Quanterix.

**10x Genomics, FY2025, Spatial only:**

```
Spatial consumables   $144.0M   (up 19% year-over-year)
Spatial instruments    $34.1M   (down 41% year-over-year)
--------------------------------------------------------
Spatial revenue       $178.1M
```

**10x Genomics, FY2024, Spatial — back-solved from 10x's own disclosed growth rates**
(our derivation, labelled as such):

```
consumables:  144.0 / 1.19  = $121.0M
instruments:   34.1 / 0.59  = $57.8M
----------------------------------------
FY2024 spatial            ~= $178.8M
```

**Akoya Biosciences, FY2024 (last full standalone year):** revenue **$81.7M**, down 15.5% from
$96.6M in FY2023, the decline attributed to lower instrument sales. Installed base 1,330
instruments at 31 December 2024. Quanterix announced the all-stock acquisition on 10 January
2025 and its FY2025 Form 10-K reports Akoya contributing **$21.9M of product revenue** from
the close date (a partial year, so not annualisable).

**Two disclosing vendors, FY2024:**

```
10x Genomics spatial (derived)   $178.8M
Akoya Biosciences (reported)      $81.7M
----------------------------------------
                                 $260.5M
```

Against the published whole-market totals for the same year:

| Published 2024 figure | $260.5M from two vendors as a share |
|---|---|
| Arizton, $383.93M | **67.9%** |
| MarketsandMarkets, $554.5M | **47.0%** |

Two companies are two-thirds of one published market and half of another — **before** adding
NanoString (acquired by Bruker in Q2 2024; GeoMx and CosMx are reported inside Bruker's BSI
NANO segment, which was $1.08B in FY2025, and are not separately disclosed), Standard BioTools'
Hyperion imaging mass cytometry (inside $85.3M of FY2025 continuing-operations revenue, also not
separately disclosed), Vizgen, Resolve Biosciences, Curio Bioscience, Rebus Biosystems or
Veracyte. Arizton's $383.93M leaves $123.4M for that entire remaining field, which is not
arithmetically credible once Bruker's spatial line is acknowledged to be non-zero — Bruker's
chief executive described the spatial biology business as growing at low double digits in 2025
with double-digit organic order growth in Q4.

**Conclusion of the test: the narrow-scope published totals are too low, not too high.** That
is the reverse of the usual finding in this corpus, and it is why we publish the wider
spatial-biology scope.

Against the wider scope, the same disclosed sum is comfortable rather than impossible:
$260.5M (FY2024, two vendors) against Roots Analysis's $1.20B for 2025 is **21.7%** — a
plausible position for the two largest reporting vendors in a market that also contains
Bruker's NanoString line, Standard BioTools, a long tail of platform companies, and
outsourced service providers.

**This is a plausibility test, not a market estimate.** It rules the $383.93M and $554.5M
narrow-scope totals out as measures of spatial biology as a whole, and rules the wider
$1.2–1.5B range in. It does not establish the correct figure, the 10x FY2024 split is our own
back-solve from disclosed growth rates rather than a reported number, and the two sums mix a
derived figure with a reported one.

## What we publish

**Headline: $1.40B (2026) → $3.32B (2032) at 15.5%.**

Source: Roots Analysis, *Spatial Biology Market*, last updated September 2026, which publishes
$1.20B for 2025, $1.40B for 2026, $5.14B for 2035 and a 15.5% CAGR over 2026–2035. The 2026
base is that house's **own published figure**, not a derivation. The 2032 endpoint is obtained
by applying that house's own rate over six years (1.40 × 1.155^6 = 3.32) and is labelled as
interpolation on the page.

Chosen because: (a) it is the only series in the set whose published endpoints reconcile with
its own published rate to better than 1%; (b) its scope is stated in revenue terms
("commercial revenue attributable to in-scope spatial-biology instruments, consumables,
software" plus analytics and services) rather than as a segment list, which is what makes it
checkable; (c) it carries the lower of the two wide-scope CAGRs; and (d) it survives the
grounding test, where the narrow-scope figures do not.

Unit: USD Billion. Industry: Life Sciences.

## Do not publish

- **Vendor market share.** No vendor publishes one. 10x's and Akoya's disclosed revenue
  divided by a published total is our own arithmetic and the denominators are 16.9x apart;
  the numbers appear in prose with both inputs named. `competitive_landscape[].market_share`
  omitted entirely.
- **Roots Analysis's own "North America ~45% / ~42%" split.** The same page gives two
  different figures in two different sections, for the organs-on-chips report; for the spatial
  reports no regional percentage is published in the page text at all.
  `regional_analysis` stays `[]`.
- **Country splits.** No named source gives any. `country_analysis` stays `[]`.
- **The $6.5B (2025) spatial-genomics figure.** It exceeds the same publisher's own
  wider-scope figure by 5.4x and we read it from a third-party summary rather than the
  primary page. Recorded in the estimates table as a flagged outlier; used for nothing.
- **Meticulous Research's $10.2B (2036).** Its own base and rate give $8.64B. Reported as an
  internal inconsistency, never as our number.
- **NanoString's or Standard BioTools Hyperion's spatial revenue.** Neither Bruker nor
  Standard BioTools discloses it. Their presence is used only to argue that the narrow-scope
  totals leave too little room, never quantified.
- **Annualised Akoya revenue for 2025.** Quanterix discloses $21.9M of Akoya product revenue
  from the close date, a partial period. Annualising it would be invention.
- **Installed-base-derived market sizes.** Akoya's 1,330 instruments at end-2024 is a
  disclosed count, but no vendor publishes consumables pull-through per instrument, so it
  divides into nothing.

## Sources

1. 10x Genomics, Inc., Form 8-K Exhibit 99.1, preliminary unaudited Q4 and FY2025 revenue
   results, 11 January 2026 — Spatial consumables $144.0M (+19%), Spatial instruments $34.1M
   (-41%), Q4 spatial consumables $41.0M (+14%), Q4 spatial instruments $9.4M (-30%).
   https://www.sec.gov/Archives/edgar/data/1770787/000162828026001808/ex-991_2026x01x11.htm
2. Akoya Biosciences, Inc., fourth-quarter and full-year 2024 financial results — FY2024
   revenue $81.7M (FY2023 $96.6M, -15.5%), Q4 2024 revenue $21.3M, installed base 1,330 at
   31 December 2024.
   https://www.barchart.com/story/news/31442920/akoya-reports-fourth-quarter-of-2024-and-full-year-financial-results
3. Quanterix Corporation, Form 10-K for FY2025 (SEC EDGAR, CIK 1503274) — total revenue
   $138.9M (FY2024 $137.4M); Akoya added $21.9M of product revenue and $14.1M of cost of
   product revenue; legacy product revenue declined $8.7M (-11%).
   https://www.sec.gov/Archives/edgar/data/1503274/000150327426000013/qtrx-20251231.htm
4. Quanterix Corporation / Akoya Biosciences, definitive all-stock merger agreement announced
   10 January 2025. https://www.businesswire.com/news/home/20250317014926/en
5. Roots Analysis, *Spatial Biology Market*, last updated September 2026 — $1.20B (2025),
   $1.40B (2026), $5.14B (2035), 15.5% (2026–2035).
   https://www.rootsanalysis.com/reports/spatial-biology-market.html
6. Meticulous Research, *Spatial Biology Market* (report 6714), June 2026 — $1.48B (2026),
   $10.2B (2036), 19.3% (2026–2036).
   https://www.meticulousresearch.com/product/spatial-biology-market-6714
7. MarketsandMarkets, spatial genomics and transcriptomics market — $554.5M (2024) →
   $995.7M (2029), 12.4%.
   https://www.barchart.com/story/news/1073043/spatial-genomics-transcriptomics-market-to-reach-9957-million-by-2029-driven-by-precision-medicine-and-multiomics-innovation
8. Arizton, *Spatial Transcriptomics and Genomics Market* — $383.93M (2024) → $1.00B (2030),
   17.4%. https://arizton.com/market-reports/spatial-transcriptomics-and-genomics-market
9. Global Market Insights, spatial genomics and transcriptomics market — $305.7M (2022),
   15.2% (2023–2032), $1.2B (2032).
   https://www.gminsights.com/industry-analysis/spatial-genomics-and-transcriptomics-market
10. BCC Research, spatial genomics and transcriptomics market — $1.5B (2022) → $2.5B (2027),
    10.8%.
    https://www.bccresearch.com/market-research/biotechnology/spatial-genomics-and-transcriptomics-market.html
11. Bruker Corporation, fourth-quarter and full-year 2025 financial results, 12 February 2026 —
    FY2025 revenue $3.44B (+2% reported, -4% organic); BSI NANO segment $1.08B (-2%), decline
    partly offset by NanoString (acquired Q2 2024); spatial biology described as low
    double-digit growth in 2025 with double-digit organic order growth in Q4.
    https://www.businesswire.com/news/home/20260212110485/en/Bruker-Reports-Fourth-Quarter-and-Full-Year-2025-Financial-Results
12. Standard BioTools Inc., Form 8-K Exhibit 99.1, Q4 and FY2025 financial results,
    24 February 2026 — FY2025 continuing-operations revenue $85.3M.
    https://www.sec.gov/Archives/edgar/data/1162194/000119312526067026/lab-ex99_1.htm
13. PubMed (NCBI E-utilities esearch, db=pubmed), term `"spatial transcriptomics"`, retrieved
    16 October 2026: **8,121** records.
    https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=%22spatial+transcriptomics%22&rettype=count

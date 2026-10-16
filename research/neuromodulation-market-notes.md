# Neuromodulation Market — research notes
**Slug:** neuromodulation-market   **Drafted:** 2026-10-16

## Published estimates (what others say)

| Source | Published | Base year | Base value | Forecast year | Forecast value | CAGR | Scope as stated |
|---|---|---|---|---|---|---|---|
| iData Research | 2025 | 2025 | $5.9B | 2032 | $8.0B | 4.4% | Neuromodulation **devices**. Lowest rate in the set |
| Zion Market Research | — | 2023 | $6.63B | 2032 | $11.30B | 6.1% | "Neuromodulation market" |
| Meticulous Research | — | — | — | 2032 | $10.29B | 8.2% (2025–2032) | Neuromodulation **systems** |
| DelveInsight | — | 2024 | $7.862B | 2032 | $16.111B | 9.44% (2025–2032) | Neuromodulation **devices** |
| Data Bridge Market Research | — | 2024 | $8.99B | 2032 | $21.64B | 11.60% (2025–2032) | "Global neuromodulation market" — broader wording |
| Precedence Research | — | 2022 | $6.43B | 2032 | $20.28B | 12.17% (2023–2032) | "Neuromodulation market" |

## The spread

**This is the inverse of the oncology information systems case, and that
inversion is the finding.**

- **Base-year values: $5.9B (2025) to $8.99B (2024) — a 1.52x spread.** For this
  literature, that is close agreement.
- **Published CAGRs: 4.4% to 12.17% — a 2.77x spread.**
- **2032 endpoints: $8.0B to $21.64B — a 2.71x spread.**

In the OIS market the base years spread 2.74x and the rates spread 1.27x: a
scope disagreement. Here the base years spread 1.52x and the rates spread 2.77x.
**The houses broadly agree what this market is today and disagree violently
about how fast it grows.** The entire 2.71x range at 2032 is produced by the
rate, not by the starting point.

That makes the usual "it is just a definition difference" explanation
insufficient, and the grounding arithmetic below suggests what is actually
happening: the high-rate houses are implicitly including external and
non-implantable neurostimulation, where growth rates are consumer-like, while
the low-rate houses are forecasting the implantable device market, which is an
oligopoly growing in the high single digits at best.

## Grounding arithmetic

### Test 1 — disclosed vendor revenue against the published market

**Register used:** SEC filings and audited results releases of the two companies
that disclose a neuromodulation revenue line.

**Medtronic**, fiscal 2025 (year ended 25 April 2025): Neuromodulation net sales
**$1.93 billion**, against $1.75 billion in fiscal 2024, a 10.7% reported
increase. The Form 10-K states Neuromodulation net sales rose **11%** year over
year, driven by Pain Stimulation and the continued launch of the Inceptiv
closed-loop spinal cord stimulator, within a Neuroscience portfolio of
**$9.8 billion** (+5%).

**Boston Scientific**, calendar 2025 — two disclosed figures, added:

```
Nine months to 30 September 2025 (Form 10-Q): $866M
Q4 2025 (results release, 4 February 2026):   $332M
                                              ------
FY2025 Neuromodulation net sales:            $1,198M
```

(The Q4 figure of $332M is against $299M a year earlier, +11.1% reported and
+9.9% operational; full-year organic growth was stated at 8%, with the brain
franchise up low double digits and the pain franchise up high single digits.
Nine-month sales were 6% of consolidated net sales, +7.4% on the prior-year
period.)

Sum of the only two disclosed neuromodulation lines in the industry:

```
$1.930B (Medtronic FY2025) + $1.198B (Boston Scientific FY2025) = $3.128B
```

Divide by the published base-year sizes:

| Source | Published base | $3.128B ÷ base |
|---|---|---|
| iData Research | $5.9B (2025) | **53.0%** |
| DelveInsight | $7.862B (2024) | **39.8%** |
| Data Bridge | $8.99B (2024) | **34.8%** |

Now invert the question. For Data Bridge's $8.99B to hold:

```
$8.99B − $3.128B = $5.86B of annual neuromodulation revenue
                   outside Medtronic and Boston Scientific
$5.86B / $3.128B = 1.87x their combined disclosed total
```

**$5.86 billion must sit outside the two largest disclosed participants —
nearly twice their combined revenue.** Abbott is universally named as the third
of the three implantable neurostimulation vendors, but **Abbott does not break
out neuromodulation in its segment reporting**: it stated only that
neuromodulation sales grew 7% year over year in the third quarter of 2025, led
by the Eterna rechargeable spinal cord stimulator in international markets, with
no dollar figure. Abbott is therefore **excluded from this calculation**, and the
combined share of the three cannot be computed. Even on a generous assumption
about Abbott, no public filing evidences a fourth participant of the scale the
high estimates require in implantable neurostimulation.

**What this rules out:** the high estimates cannot be implantable-neurostimulation-
only. They must be including external and non-implantable neurostimulation —
transcutaneous electrical nerve stimulation, transcranial magnetic and direct
current stimulation, non-implanted vagus nerve stimulation and wearable
devices — which is a consumer-adjacent category with a different cost structure
and a genuinely higher growth rate.

**What this rules in:** the $5.9B-to-$7.9B cluster as a coherent figure for the
implantable device market, in which two disclosed participants plausibly hold
40–53% and a named third holds much of the rest. That is the textbook shape of
an oligopoly, and an oligopoly in a reimbursement-constrained surgical category
does not compound at 12.17%.

**This also explains the 2.77x CAGR spread**, which the scope-difference
explanation alone does not: the high rates are being forecast for the external
segment and then applied to a whole-market base.

### Test 2 — revenue per implant (corroboration only)

Procedure and device volumes for spinal cord stimulation, which the sources
agree is the largest neuromodulation application:

- **~34,000** SCS implants per year **worldwide**, about half in North America
  (Vanderbilt University Medical Center, 2022).
- **~60,000** SCS devices surgically implanted per year in the **United States**
  (NBC News; no underlying source given).
- **~110,000** SCS implants **sold** in a year, up 20,000 from 2017 (Medtech 360,
  reported by Becker's Spine Review).
- Medicare Part B, 2000–2019 cumulative: **992,372** percutaneous and **99,736**
  open SCS operations approved; annual placement rates peaked in 2013 at 19.6,
  7.1 and 16.8 per 100,000 Medicare, private-payer and overall patients
  respectively (*Journal of Pain Research*, 2020).

**These four figures are not comparable with each other** — one counts worldwide
procedures, one counts US procedures, one counts devices sold, one counts
Medicare-approved operations over two decades. They must not be presented as a
single series. Used only as an order-of-magnitude check:

```
$3.128B disclosed revenue (both companies, all neuromodulation)
/ 110,000 SCS devices sold = ~$28,400 per device
```

~$28,400 is the right order of magnitude for an implantable pulse generator plus
leads at system level, which corroborates that the disclosed revenue and the
disclosed volumes describe the same activity. It is a weak check: the $3.128B
also contains deep brain stimulation and sacral neuromodulation, and the
110,000 figure is devices sold rather than patients implanted.

**Both calculations are plausibility tests, not market estimates.**

## What we publish

**Headline:** $9.42B (2026) → $16.10B (2032) at 9.35%.

Source: DelveInsight, which publishes $7,862.04 million for 2024 and
$16,111.10 million for 2032 at a stated 9.44% over 2025–2032. The 2026 base is
the published 2024 value advanced two years at that published rate
(7.862 × 1.0944² = 9.42). Over our 2026–2032 window, $9.42B → $16.10B
reconciles at **9.35%**, which is the rate published on the page; the 0.09-point
difference from DelveInsight's 9.44% is the arithmetic consequence of anchoring
on their published 2032 endpoint rather than extrapolating past it. Stated
explicitly in `forecast_analysis`.

Chosen because: it has both an explicit base-year value and an explicit endpoint
inside the window; its base sits in the cluster the grounding test rules in; and
its rate sits between the implantable-only floor (4.4%) and the
external-inclusive ceiling (12.17%), which is the honest place for a figure whose
scope is "devices" without further qualification. The scope ambiguity is carried
onto the page rather than hidden.

Unit: USD Billion. Industry: Medical Devices.

## Do not publish

- **Vendor market share.** Neither Medtronic nor Boston Scientific states a
  neuromodulation share, and **Abbott does not disclose a neuromodulation
  revenue figure at all**. The 53.0%/39.8%/34.8% ratios above are our own
  plausibility calculations against published market sizes and must never be
  rendered as shares. `competitive_landscape[].market_share` omitted.
- **A combined "big three" share.** Cannot be computed, because one of the three
  does not disclose. Say so explicitly.
- **Regional splits.** No named source gives one for this market.
  `regional_analysis` stays `[]`.
- **Country splits.** None published. `country_analysis` stays `[]`.
- **An SCS implant volume presented as a single trend.** The four figures above
  measure four different things and the two-decade Medicare cumulative must never
  be divided into an annual rate.
- **A split between implantable and external neuromodulation.** The grounding
  test shows the high estimates must include external devices; it does not
  quantify how much. No source splits it, so no percentage is published.
- **Application shares** (pain versus movement disorders versus urology). Not
  published by any named source at a level that survives scrutiny.
- **Abbott's neuromodulation revenue.** Not disclosed. The field is left out
  rather than estimated from its Medical Devices segment.

## Sources

1. Medtronic plc, Form 10-K for fiscal 2025 (year ended 25 April 2025), SEC EDGAR CIK 1613103 — https://www.sec.gov/Archives/edgar/data/1613103/000161310325000091/mdt-20250425.htm (Neuroscience net sales $9.8B, +5%; Neuromodulation net sales +11%, driven by Pain Stimulation and the Inceptiv closed-loop SCS launch)
2. Medtronic plc, fiscal 2025 fourth-quarter earnings release exhibit 99.1, 20 May 2025 — https://mma.prnewswire.com/media/2692341/Exhibit_99_1___FY25_Q4_Earnings_Release_5_20.pdf (Neuromodulation $1.93B FY25 against $1.75B FY24, +10.7% reported; Neuroscience $9.846B, +4.7% reported / +5.2% organic)
3. Boston Scientific Corporation, Form 10-Q for the quarter ended 30 September 2025, SEC EDGAR CIK 885725 — https://www.sec.gov/Archives/edgar/data/885725/000088572525000050/bsx-20250930.htm (nine-month Neuromodulation net sales $866M, 6% of consolidated net sales, +7.4%; Q3 $293M, +9.1%)
4. Boston Scientific Corporation, "Boston Scientific announces results for fourth quarter and full year 2025", 4 February 2026 — https://news.bostonscientific.com/2026-02-04-Boston-Scientific-announces-results-for-fourth-quarter-and-full-year-2025 (Q4 Neuromodulation $332M against $299M, +11.1% reported / +9.9% operational; total Q4 net sales $5,286M; full-year neuromodulation organic growth 8%; acquisition of Nalu Medical completed, agreement to acquire Valencia Technologies announced)
5. Abbott Laboratories, third-quarter 2025 commentary on neuromodulation (+7% year over year, led by Eterna rechargeable SCS in international markets; **no dollar figure disclosed**) — https://www.nasdaq.com/articles/bsxs-neuromodulation-prospect-looks-strong-whats-behind-it
6. iData Research, neuromodulation devices market ($5.9B 2025 → $8.0B 2032, 4.4% CAGR) — https://idataresearch.com/?p=113259
7. DelveInsight, "Neuromodulation Devices Market Insights, Competitive Landscape, and Market Forecast — 2032" ($7,862.04M 2024 → $16,111.10M 2032, 9.44% CAGR 2025–2032) — https://www.delveinsight.com/report-store/neuromodulation-devices-market
8. Data Bridge Market Research, "Global Neuromodulation Market" ($8.99B 2024 → $21.64B 2032, 11.60% CAGR) — https://www.databridgemarketresearch.com/reports/global-neuromodulation-market
9. Zion Market Research, "Neuromodulation Market Size, Share Report" ($6.63B 2023 → $11.30B 2032, 6.1% CAGR) — https://www.zionmarketresearch.com/report/neuromodulation-market
10. Precedence Research, "Neuromodulation Market Will Grow at CAGR of 12.17% By 2032" ($6.43B 2022 → $20.28B 2032) — https://www.precedenceresearch.com/press-release/neuromodulation-market
11. Meticulous Research, neuromodulation systems market ($10.29B by 2032, 8.2% CAGR 2025–2032) — https://www.meticulousresearch.com/index.php/tags/Neuromodulation_device
12. Vanderbilt University Medical Center, "Spinal cord stimulator implants helping ease chronic pain", 24 February 2022 — https://news.vumc.org/2022/02/24/spinal-cord-stimulator-implants-helping-ease-chronic-pain/ (~34,000 SCS implants per year worldwide, about half in North America)
13. Becker's Spine Review, "Neuromodulation implant for spinal cord stimulation on the rise as search for opioid alternatives intensifies", citing Medtech 360 (~110,000 SCS implants sold, up 20,000 from 2017) — https://www.beckersspine.com/spinal-tech/neuromodulation-implant-for-spinal-cord-stimulation-on-the-rise-as-search-for-opioid-alternatives-intensifies/
14. *Journal of Pain Research* (July 2020), Medicare Part B spinal cord stimulator utilisation 2000–2019 (992,372 percutaneous and 99,736 open operations approved; annual placement rates peaked in 2013) — https://doaj.org/article/f404b6f9b2914bf8981304cd74261417
15. NBC News, ~60,000 SCS devices surgically implanted per year in the United States (no underlying source stated) — https://www.nbcnews.com/news/amp-video/mmvo45036613516

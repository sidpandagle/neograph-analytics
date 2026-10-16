# Decentralized Clinical Trials Market — research notes
**Slug:** decentralized-clinical-trials-market   **Drafted:** 2026-10-16

## Published estimates (what others say)

| Source | Published | Base year | Base value | Forecast year | Forecast value | CAGR | Scope as stated |
|---|---|---|---|---|---|---|---|
| P&S Intelligence | April 2026 (report code 13993) | 2025 | $9.1B | 2032 | $21.4B | 13.0% (2026–2032) | Scope **stated by segmentation**: platforms/technology solutions (~70% of revenue) plus operational & support services; execution model split into hybrid (~60%), fully decentralised, and **site-centric with digital enablement**. Also publishes $10.2B for 2026 |
| BCC Research | 2025 edition | 2024 | $8.8B | 2030 | $18.8B | 13.7% (2025–2030) | Segmented by study design, therapeutic area and deployment mode; end users pharma/biotech companies and CROs |
| Global Market Insights | 2025 edition | 2024 | $8.6B | 2034 | $29.7B | 13.3% | Segmented by study design, technology, therapeutic area, study phase and participant engagement |
| Business Research Insights | 2024 edition | 2024 | $8.19B | 2032 | $24.97B | 14.8% | Also publishes $7.14B for 2023. Figures reached us via Outsourcing-Pharma's write-up, **not the primary release** |
| Visiongain (not comparable) | 2022 edition | 2021 | $7,235.5M | 2032 | — | 6.95% | Public pages publish "xx" placeholders; the base value and CAGR reached us only through a third-party Substack quotation and **could not be verified against the original**. Recorded to show the low-CAGR outlier, not used |
| Grand View Research (not comparable) | — | 2024 | $25.7B | 2030 | $60.8B | — | **Clinical trial technology and services as a whole**, a wider market than DCT. Recorded so a reader does not mistake it for a DCT figure. Reached us via a third-party PDF, flagged as such |

## The spread

This market is the **opposite** of the usual NeoGraph finding, and that is itself
the story.

- **Base-year values for 2024: $8.19B to $8.8B — a spread of only 1.07x.**
- **Published CAGRs among the four comparable houses: 13.0% to 14.8% — 1.14x.**

Four independent houses, working from different segmentations, land within 7% of
each other on the base year and within 1.8 percentage points on growth. That
almost never happens in the market-research literature, and when it does it
usually means the houses are all deriving the number the same way from the same
upstream denominator rather than measuring independently. A reader should treat
the tight agreement as a shared method, not as corroboration.

The forecast endpoints still diverge — $18.8B (2030), $21.4B (2032), $24.97B
(2032), $29.7B (2034) — but that is horizon arithmetic, not disagreement.
Rebased to 2032 at each house's own CAGR, they sit between roughly $21B and
$25B.

The one genuine outlier is the 6.95% CAGR attributed to Visiongain, which we
could not verify against a primary page and therefore do not use.

## Grounding arithmetic

**Register used:** ClinicalTrials.gov, via API v2, retrieved **16 October 2026**.

| Query | Studies |
|---|---|
| Whole register | **607,160** |
| Text match `"decentralized clinical trial"` | **37** |
| Text match `"remote monitoring" OR "telehealth"` | **5,711** |
| Interventional **and** industry lead sponsor **and** start date 2024-01-01 to 2025-12-31 | **11,502** |

### Test 1 — how many trials call themselves decentralised

```
37 / 607,160 = 0.006% of the register
```

Thirty-seven studies in a register of 607,160 use the phrase at all. Whatever
these published market sizes are measuring, it is **not** a population of trials
that identify themselves as decentralised trials. If it were, the market would
be a rounding error.

### Test 2 — spend per industry trial

11,502 industry-sponsored interventional studies began over the two calendar
years 2024 and 2025, a run-rate of **5,751 per year**.

```
$10,200,000,000 (P&S Intelligence, 2026, global)
/ 5,751 industry-sponsored interventional trials started per year
= $1,773,605 per trial
```

A late-phase industry trial costs tens of millions of dollars. $1.77 million of
decentralisation technology and service spend per trial is **2–9% of a typical
phase III budget** — entirely plausible as a technology and vendor-service
layer, but only if **essentially every industry-sponsored trial carries some
decentralised element.** Thirty-seven of them say so in the register.

### Test 3 — the one pure-play, and what it sold for

Science 37 was the only listed pure-play decentralised-trial company. It went
public by SPAC merger in 2021 at a valuation above **$1 billion**, booked
**$70.1 million** of revenue in 2022 against the $100 million it had forecast at
the time of the merger, and on 29 January 2024 agreed to be acquired by the
telehealth company eMed for **$5.75 per share in cash, about $38 million** — a
~21% premium to the prior close. It delisted and now operates as a subsidiary of
eMed, LLC.

```
$70.1M (Science 37 revenue, 2022, the pure-play's best year)
/ $10,200M (P&S Intelligence's entire global market, 2026)
= 0.69%
```

```
$38M (what the whole company sold for, 2024)
/ $10,200M = 0.37%
```

The only company that built itself entirely around the narrow definition of this
market reached 0.69% of the market as published, and then sold for a third of
one percent of it. That is the sharpest available evidence that the published
sizes are not measuring standalone decentralised-trial businesses. They are
measuring decentralised **elements** bought from CROs, eClinical platform
vendors and technology suppliers whose revenue is counted elsewhere.

### What the three tests together establish

The published figures are coherent **only** on the broad reading: DCT means any
trial with any decentralised element — a telehealth visit, an eConsent, an
ePRO/eCOA instrument, a home nursing visit, a wearable. They are not coherent on
the narrow reading of a distinct class of fully remote trial.

This is not our interpretation imposed on the data. It is the FDA's. The agency
issued its final guidance **Conducting Clinical Trials With Decentralized
Elements** in September 2024 (sources differ between 17 and 18 September), and
in doing so **retitled** the 2023 draft, which had been *Decentralized Clinical
Trials for Drugs, Biological Products, and Devices*. Commentators read the
retitling as the FDA deliberately abandoning the attempt to classify a trial as
either decentralised or hybrid, in favour of regulating **individual
decentralised elements**. P&S Intelligence's own segmentation agrees: it carries
a category called *site-centric with digital enablement*, and puts hybrid
designs at about 60% of the market and fully decentralised designs in the
minority.

**These are plausibility tests, not market estimates.** They establish which
reading of "decentralized clinical trials market" the published numbers can
support. They do not establish the correct size.

## What we publish

**Headline:** $10.2B (2026) → $21.4B (2032) at 13.0%.

Source: P&S Intelligence, April 2026 edition, which publishes $9.1B for 2025,
$10.2B for 2026 and $21.4B for 2032 with a stated 13.0% CAGR over 2026–2032.
Those endpoints imply 13.15% compound, which reconciles with the stated rate.

Chosen because it is the only series in the set that publishes an explicit 2026
value and an explicit 2032 value on the same scope, and because its segmentation
makes the broad reading explicit by naming *site-centric with digital
enablement* as a category — the scope decision that the grounding arithmetic
shows must be in force.

Unit: USD Billion. Industry: Healthcare IT.

## Do not publish

- **Vendor market share.** Medidata is a Dassault Systèmes business with no
  separate revenue disclosure. Veeva reports product-family mix, not a DCT line:
  its 10-K for the year ended 31 January 2026 says R&D and Quality Solutions was
  approximately 55% of $3,195.3M total revenue, which arithmetically implies
  about $1.76B — **our own arithmetic on a percentage, not a reported figure**,
  and in any case the whole R&D platform rather than decentralisation. Oracle
  Health Sciences is inside Oracle. Science 37, the only pure-play, was acquired
  by eMed for about $38M in 2024 and has published nothing since. There is no
  numerator anywhere.
  `competitive_landscape[].market_share` omitted.
- **Regional splits.** P&S Intelligence publishes "North America about 40%" and
  "Asia-Pacific fastest-growing at 13.9%", but gives no dollar values and we did
  not inspect the method. `regional_analysis` stays `[]`.
- **Country splits.** None published. `country_analysis` stays `[]`.
- **The Visiongain 6.95% CAGR.** Third-party quotation of a report whose public
  pages carry placeholders. Recorded above as an unverified outlier only.
- **The Grand View $25.7B / $60.8B series as a DCT figure.** It is clinical trial
  technology and services as a whole and reached us through a third-party PDF.
- **Segment percentages as market shares.** P&S publishes platform ~70%,
  hybrid ~60%, oncology ~35%, large enterprises ~75%. These are one house's
  unaudited apportionments; `market_segmentation` carries plain strings.
- **Any claim that DCT adoption is growing or shrinking from the
  ClinicalTrials.gov phrase count.** 37 is a text-match artefact of how sponsors
  write their registrations, not a measurement of practice.

## Sources

1. ClinicalTrials.gov API v2, retrieved 16 October 2026 — whole register `https://clinicaltrials.gov/api/v2/studies?countTotal=true` (607,160); `query.term="decentralized clinical trial"` (37); `query.term="remote monitoring" OR "telehealth"` (5,711); `filter.advanced=AREA[LeadSponsorClass]INDUSTRY AND AREA[StudyType]INTERVENTIONAL AND AREA[StartDate]RANGE[2024-01-01,2025-12-31]` (11,502)
2. FDA, *Conducting Clinical Trials With Decentralized Elements*, final guidance for industry, investigators and other interested parties, September 2024 — https://www.fda.gov/regulatory-information/search-fda-guidance-documents (retitled from the 2023 draft *Decentralized Clinical Trials for Drugs, Biological Products, and Devices*)
3. McGuireWoods, "Recent FDA Guidance Signals Future Growth for Decentralized Clinical Trials", October 2024 — https://mcguirewoods.com/client-resources/alerts/2024/10/recent-fda-guidance-signals-future-growth-for-decentralized-clinical-trials
4. Applied Clinical Trials, commentary on the FDA decentralized clinical trial guidance, 25 November 2024 — https://www.appliedclinicaltrialsonline.com/view/fda-decentralized-clinical-trial-guidance (reads the retitling as a move away from classifying whole trials as DCT or hybrid)
5. NSF, "Conducting Clinical Trials with Decentralized Elements: FDA Update" — https://nsf.org/life-science-news/conducting-clinical-trials-decentralized-elements-fda-update
6. P&S Intelligence, decentralized clinical trials market, April 2026, report code 13993 ($9.1B 2025; $10.2B 2026; $21.4B 2032; 13.0% CAGR 2026–2032) — https://www.psmarketresearch.com/market-analysis/decentralized-clinical-trials-market-report
7. BCC Research, *Decentralized Clinical Trials: Global Markets* ($8.8B 2024 → $18.8B 2030, 13.7% CAGR 2025–2030) — https://www.bccresearch.com/market-research/biotechnology/decentralized-clinical-trials-market.html
8. Global Market Insights, decentralized clinical trials market ($8.6B 2024 → $29.7B 2034, 13.3% CAGR) — https://www.gminsights.com/industry-analysis/decentralized-clinical-trials-market
9. Outsourcing-Pharma, "The decentralized clinical trials market will grow to $25 billion by 2032", 13 November 2024, reporting Business Research Insights ($7.14B 2023; $8.19B 2024; $24.97B 2032; 14.8% CAGR) — https://outsourcing-pharma.com/Article/2024/11/13/decentralized-clinical-trials-market-expected-to-grow-to-25bn — **third-party summary, not the primary release**
10. Veeva Systems, Form 10-K for the fiscal year ended 31 January 2026, SEC EDGAR CIK 1393052 — https://www.sec.gov/Archives/edgar/data/1393052/000139305226000014/veev-20260131.htm (R&D and Quality Solutions approximately 55% of total revenues; 45%/55% Commercial vs R&D and Quality split)
11. Veeva Systems, fourth-quarter and fiscal year 2026 results, 4 March 2026 — https://ir.veeva.com/news/news-details/2026/Veeva-Announces-Fourth-Quarter-and-Fiscal-Year-2026-Results/default.aspx (total revenues $3,195.3M, up 16%; subscription revenue $2,684.2M)
12. Visiongain, decentralized clinical trials market report 2022–2032 (public pages carry "xx" placeholders) — https://visiongain.com/report/decentralized-clinical-trials-market-2022/
13. Fierce Biotech, "Science 37 agrees to be acquired by eMed in deal valued at $38M", 29 January 2024 ($5.75/share cash, ~21% premium; $70.1M 2022 revenue against a $100M SPAC-era forecast; SPAC merger in 2021 above $1B valuation) — https://www.fiercebiotech.com/cro/science-37-agrees-be-acquired-emed-deal-valued-38m
14. Informa Connect, "eMed to buy Science 37 for $38 million", January 2024 — https://informaconnect.com/emed-to-buy-science-37-for-38-million
15. Global Genes RARE Daily, "Telehealth Company eMed to Acquire Decentralized Clinical Trials Company Science 37" — https://globalgenes.org/raredaily/telehealth-company-emed-to-acquire-decentralized-clinical-trials-company-science-37/

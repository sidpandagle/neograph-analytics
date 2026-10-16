# Vaccine Cold Chain Market — research notes
**Slug:** vaccine-cold-chain-market   **Drafted:** 2026-10-16

## Published estimates (what others say)

| Source | Published | Base year | Base value | Forecast year | Forecast value | CAGR | Scope as stated |
|---|---|---|---|---|---|---|---|
| IMARC Group | 15 May 2026 | 2025 | $35.3B | 2034 | $66.3B | 7.03% (2026–2034) | "Vaccine storage and packaging": storage equipment (refrigerators, freezers, others) and services (warehouse storage, transportation), plus packaging by type (cool bags, vials and ampoules, corrugated boxes) and by level (primary, secondary, tertiary). End users biopharmaceutical companies, hospitals, medical laboratories. Historical 2020–2025. Companies covered include Thermo Fisher Scientific, McKesson, DHL International |
| Roots Analysis | last updated Aug 2026 | 2025 | $4.13B (2026: $4.18B) | 2030 | $4.32B | **0.85%** (2026–2030) | "Cold Chain Logistics Market for Vaccines" — by vaccine type (COVID-19 and others), service type (storage, packaging, transportation), transport mode, holding temperature (refrigerated / frozen / deep frozen-cryogenic), scale of operation, container type (active/passive), packaging method, end users. Conservative, base and optimistic scenarios |
| Mordor Intelligence (healthcare cold chain, vaccine slice) | page updated 11 Sep 2026; estimates "as of January 2026" | 2025 | $124.53B whole market; **vaccines 37.23% of 2025 revenue → $46.35B derived by us** | 2031 | $223.39B whole market | 10.23% (2026–2031) | Global healthcare cold chain by product type (vaccines, biopharmaceuticals, clinical trial materials, blood and plasma products, cell and gene therapies), service type, end user, geography. 5 regions, 17 countries |
| IMARC Group (healthcare cold chain logistics) | — | 2024 | $18.1B | 2033 | $23.2B | **2.8%** (2025–2033) | Healthcare cold chain *logistics* — the same house's logistics-only scope, 1.95x smaller than its own storage-and-packaging figure and growing at 40% of the rate. *Read from a search-result summary — flagged* |
| Older vaccine cold chain logistics report | — | 2021 | $3.12B | 2028 | $4.59B | 5.2% (2022–2028) | Global vaccine cold chain logistics. *Read from a refindustry news summary, not the primary report — flagged* |

## The spread

**At 2025, $4.13B to $46.35B — an 11.2x spread.** Against IMARC's $35.3B it is 8.5x. And the
growth rates are worse: **0.85% to 10.23%, a 12.0x spread in the rate itself.** This is the
widest pair of spreads in the batch on both dimensions simultaneously.

One house disagrees with itself by almost a factor of two. IMARC publishes vaccine storage and
packaging at $35.3B (2025) growing at 7.03%, and healthcare cold chain *logistics* at $18.1B
(2024) growing at 2.8%. Same publisher, overlapping subject matter, 1.95x apart in size and
2.5x apart in rate.

The scope decision that explains the main gap is **equipment versus movement.** A refrigerator
is capital equipment with a ten-year life; shipping a dose is a service consumed once. IMARC's
figure counts the refrigerators, the freezers, the vials, the ampoules, the cool bags and the
corrugated boxes, plus warehouse storage and transportation services. Roots Analysis counts the
logistics only. The 8.5x gap is almost entirely the hardware and the packaging.

**The second gap is COVID normalisation, and it is why Roots Analysis prints 0.85%.** Roots
segments explicitly "by vaccine type: COVID-19 and others". A logistics market that was
inflated by the COVID campaign and is now shrinking back toward routine immunisation volumes
will show near-zero growth from a 2025 base. Mordor's 10.23% for the whole healthcare cold
chain is driven by cell and gene therapy and biopharmaceuticals, which are growing fast and
are not vaccines. **Neither rate is wrong for what it measures, and neither is a rate for
vaccine cold chain.**

## Grounding arithmetic

UNICEF is the largest single buyer of vaccines in the world and publishes both the doses it
delivers and the money it spends. That makes a cost-per-dose test possible, and it is decisive
against the high end.

### Anchor 1 — cost per dose shipped

From the **UNICEF Supply Annual Report 2024**:

```
Vaccine doses delivered, 2024                        2.787 billion   to 99 countries
  (stated as enough to reach 45% of the world's children under 5)
Total UNICEF procurement, 2024                       $5.610 billion  across 160 countries
  of which supplies                                  $3.778 billion
  of which services                                  $1.832 billion
```

Divide the published market sizes by UNICEF's dose volume:

| Published 2025 market | ÷ 2.787bn doses | Implied cold chain cost per dose |
|---|---|---|
| Roots Analysis, $4.13B (logistics only) | 4,130,000,000 / 2,787,000,000 | **$1.48** |
| IMARC, $35.3B (storage + packaging) | 35,300,000,000 / 2,787,000,000 | **$12.67** |
| Mordor-derived, $46.35B (vaccine slice) | 46,350,000,000 / 2,787,000,000 | **$16.63** |

UNICEF is not the whole world, so these are upper bounds on cost per dose for the global
market — generously so, since UNICEF reaches 45% of children under 5 and the figures above
assign the entire global market to UNICEF's volume alone. Even granting a global dose volume
of 6 billion, more than double UNICEF's, the IMARC and Mordor figures still imply **$5.88 and
$7.73 per dose of cold chain cost.**

### Anchor 2 — the market against UNICEF's entire procurement budget

This is the test that settles it.

```
Mordor-derived vaccine cold chain, 2025     $46.35B
UNICEF total procurement, 2024               $5.61B   (all supplies AND all services,
                                                       160 countries, vaccines included)

46.35 / 5.61 = 8.26x
```

**The derived vaccine cold chain market is 8.26 times UNICEF's entire procurement spend,
including the vaccines themselves.** IMARC's $35.3B is 6.29 times it. For context, UNICEF
publishes awarded prices per dose for each antigen, and for the high-volume routine antigens
those prices are measured in cents to a few dollars. A cold chain cost of $12.67 or $16.63 per
dose would exceed the price of the vaccine inside the box by a large multiple for most of the
routine immunisation schedule. (*We could not read UNICEF's measles price PDF, so no specific
per-dose price is quoted as a figure here; the characterisation is based on the existence of
the per-antigen awarded-price series UNICEF publishes, and is flagged as a characterisation
rather than a cited number.*)

**Roots Analysis' $1.48 per dose is the only figure in the set that is plausible as the cost
of moving and storing a dose.** It is the right order of magnitude for passive packaging, cold
boxes, ground and air freight and in-country storage on a routine immunisation dose.

This rules the Mordor-derived vaccine slice and the IMARC storage-and-packaging figure out as
measures of *vaccine logistics*. It does not rule them out as measures of *equipment plus
packaging plus logistics*, which is what IMARC says it is counting — and that is the honest
resolution: the gap is scope, and the scope is disclosed.

### Anchor 3 — the one listed pure-play, for scale

Cryoport is the only listed company whose entire business is temperature-controlled life
science logistics and equipment, and it reports both halves.

```
Cryoport FY2025 revenue (reported 3 March 2026)                 $176.2M   (+~12%)
  Life Sciences Services                                         $96.497M (+17.6%)
  Life Sciences Products                                         $79.680M (+6.6%)
  of which commercial cell and gene therapy support              $33.4M    (+29%)
  of which clinical trial support                                $47.1M    (+14%)
Gross margin                                                     47.1%     (2024: 44.4%)
FY2026 guidance                                                  $190-194M (+8-10%)
```

```
176.2 / 4,130  = 4.3%    of Roots Analysis' vaccine cold chain logistics market
176.2 / 46,350 = 0.38%   of the Mordor-derived vaccine slice
```

Cryoport is cell-and-gene-therapy weighted, not vaccine weighted, so this is a scale check
rather than a share. What it establishes is that the entire revenue of the sector's only
listed pure-play is 4.3% of the smaller published market and under half a percent of the
larger — and that the growth in its book came from cell and gene therapy (+29%), not vaccines.
**That is corroborating evidence for the COVID-normalisation reading behind Roots Analysis'
0.85%:** the money in temperature-controlled life science logistics is moving toward cell and
gene therapy, which is why the whole-healthcare-cold-chain figures grow at 10% while the
vaccine-specific one does not.

### A published figure that fails its own arithmetic

IMARC's own series does not close.

```
Published:  $35.3B (2025) -> $66.3B (2034) at a stated 7.03% CAGR (2026-2034)
Check:      35.3 x 1.0703^9 = 35.3 x 1.8417 = $65.01B,  not $66.3B
Implied:    (66.3 / 35.3)^(1/9) - 1 = 7.26%,  not 7.03%
```

**The stated rate and the stated endpoint disagree by 0.23 points.** Small, but it means one of
the two is a rounding of a model output and the other is not, and the page does not say which.
We publish the stated **rate**, not the stated endpoint, because the rate is the figure the
report's forecast window (2026–2034) is expressed in and because our window ends in 2032,
inside their series rather than at its endpoint.

## What we publish

**Headline: $37.78B (2026) → $56.80B (2032) at 7.03%.**

Source: IMARC Group, *Global Vaccine Storage and Packaging Market*, published 15 May 2026,
which states $35.3B for 2025, $66.3B for 2034 and a 7.03% CAGR over 2026–2034, with a
historical period of 2020–2025.

The 2026 base is **derived by advancing that house's own published 2025 figure one year at its
own stated rate**: 35.3 × 1.0703 = 37.78. The 2032 value is **interpolated on that same stated
rate**, not taken from a published endpoint: 37.78 × 1.0703^6 = 56.80. Labelled as
interpolation in the report, and the reason for preferring the rate over the endpoint is the
0.23-point arithmetic failure documented above.

Chosen because: (a) its scope is the most completely disclosed in the set — it names the
equipment categories, the packaging types, the packaging levels, the service lines and the end
users, so a reader can see exactly what the number counts; (b) it is the most recent
(May 2026) and has a 2025 base and a 2026-forward window; (c) the cost-per-dose test above does
**not** rule it out, because it is explicitly an equipment-plus-packaging-plus-services figure
rather than a logistics figure, which is the reading under which $12.67 per dose of installed
hardware, packaging and handling is defensible; and (d) its 7.03% sits between the 0.85%
logistics-only rate and the 10.23% all-healthcare rate, which is the right place for a
vaccine-specific equipment-and-services market.

**We publish Roots Analysis' figures in the report as the logistics-only reading**, because a
reader asking "what does it cost to move a dose" needs $4.13B and $1.48, not $35.3B.

Unit: USD Billion. Industry: Pharmaceuticals.

## Do not publish

- **Vendor market share.** Cryoport discloses revenue; Thermo Fisher, DHL, Kuehne+Nagel,
  Envirotainer, B Medical Systems and McKesson do not disclose a vaccine cold chain line at
  all. `competitive_landscape[].market_share` omitted entirely.
- **Any regional split.** Mordor and IMARC both segment by five regions; neither publishes a
  percentage we could read, and the one regional figure available anywhere in the set
  (Mordor's vaccine product share of 37.23%) is a product split, not a geographic one.
  `regional_analysis` stays `[]`.
- **Country splits.** No named source gives any. `country_analysis` stays `[]`.
- **Mordor's "vaccines 37.23% of 2025 revenue" as a vaccine cold chain market size.** The
  $46.35B figure in the estimates table is **our own multiplication** of Mordor's whole-market
  figure by Mordor's stated vaccine share. It is labelled as derived everywhere it appears and
  is used only to establish the top of the spread and to be ruled out by the cost-per-dose
  test. It is not a published figure and is not offered as one.
- **IMARC's published $66.3B 2034 endpoint.** It fails the publisher's own stated CAGR by 0.23
  points. We publish the rate and say why.
- **A count of WHO PQS-prequalified cold chain products.** This was the intended second
  grounding anchor. The WHO Catalogue of Prequalified Immunization Devices does list
  refrigerators and freezers under category E003, and each product carries a code made of the
  category reference plus a number — **but the catalogue's own guidance states that a reference
  is never reassigned, "therefore breaks in the numerical sequence will appear when an item is
  dropped from the catalogue." The code numbers are therefore not a count of currently listed
  products, and we could not read the catalogue PDF to enumerate the live entries.** No PQS
  count is published here. The method note is recorded so the next pass does not repeat the
  attempt blind.
- **A UNICEF per-dose freight or logistics rate.** UNICEF publishes awarded vaccine prices per
  dose and Gavi shipment reports, both as PDFs we could not read. No per-dose freight rate is
  quoted.
- **A specific UNICEF awarded price per dose for any antigen.** Same reason — the price PDFs
  could not be opened. The characterisation that routine antigen prices are in cents to a few
  dollars is flagged as a characterisation.
- **A global count of vaccine doses administered.** UNICEF's 2.787 billion is UNICEF's own
  delivery volume to 99 countries, which it states reaches 45% of the world's children under
  5. It is not a world total, and the 6-billion figure used in the sensitivity above is our
  own generous assumption, labelled as such.
- **COVID-era cold chain figures.** The 2021-base $3.12B series is in the estimates table for
  completeness and flagged; a market sized in the middle of the COVID campaign is not a
  baseline for a routine immunisation market.

## Sources

1. UNICEF Supply Annual Report 2024 — **2.787 billion vaccine doses delivered to 99
   countries** in 2024, stated as enough to reach 45% of the world's children under 5; total
   2024 procurement **$5.610 billion across 160 countries**, of which supplies $3.778 billion
   and services $1.832 billion, described as a 7% rise on the previous year; UNICEF described
   as the largest single buyer of vaccines.
   https://www.unicef.org/supply/reports/unicef-supply-annual-report-2024
2. UNICEF Supply Division, per-antigen awarded vaccine price data (measles, measles-rubella,
   DTP, meningococcal, Japanese encephalitis, rabies, vaccine carriers), measles page updated
   5 December 2025. *The price tables are PDFs we could not open; no per-dose price is quoted
   as a figure. Listed as the primary source for anyone needing the awarded prices.*
   https://www.unicef.org/supply/documents/measles-vaccine-price-data
3. UNICEF Supply Division, Gavi shipment reports — downloadable reports for 2024 and January
   2025, plus the Immunization Market Dashboard. *Not opened; the dose volumes they contain
   are the correct primary source for a per-dose logistics cost and were not available to us.*
   https://www.unicef.org/supply/documents/gavi-shipment-reports
4. Cryoport, Inc., Fourth Quarter and Full-Year 2025 Financial Results, 3 March 2026 — FY2025
   revenue **$176.2 million**, above the high end of guidance, up about 12%; Life Sciences
   Services **$96.497 million** (+17.6%), Life Sciences Products **$79.680 million** (+6.6%);
   commercial cell and gene therapy support **$33.4 million** (+29%), clinical trial support
   **$47.1 million** (+14%); gross margin 47.1% against 44.4% in 2024; FY2026 guidance
   $190–194 million (+8–10%); strategic partnership with DHL Group including DHL's acquisition
   of CRYOPDP.
   https://ir.cryoportinc.com/news-events/press-releases/detail/406/cryoport-reports-fourth-quarter-and-full-year-2025-financial-results
5. IMARC Group, *Global Vaccine Storage and Packaging Market*, published 15 May 2026 — **$35.3
   billion (2025) → $66.3 billion (2034), 7.03% (2026–2034)**, historical period 2020–2025;
   segments vaccine storage (storage equipment: refrigerators, freezers, others; services:
   warehouse storage, transportation) and vaccine packaging (by type: cool bags, vials and
   ampoules, corrugated boxes, others; by level: primary, secondary, tertiary); end users
   biopharmaceutical companies, hospitals, medical laboratories, others; ten companies covered
   including Thermo Fisher Scientific, McKesson and DHL International.
   **The stated 7.03% rate and the stated $66.3B endpoint do not reconcile: 35.3 × 1.0703^9 =
   65.01, and the endpoint implies 7.26%.**
   https://imarcgroup.com/global-vaccine-storage-packaging-market
6. Roots Analysis, *Cold Chain Logistics Market for Vaccines: Industry Trends and Global
   Forecasts, till 2030*, last updated August 2026 — **$4.13 billion (2025), $4.18 billion
   (2026) → $4.32 billion (2030), 0.85% (2026–2030)**; segmented by vaccine type (COVID-19 and
   others), service type (storage, packaging, transportation), transport mode (ground, air,
   ocean), holding temperature (refrigerated, frozen, deep frozen/cryogenic), scale of
   operation (clinical, commercial), container type (active, passive), packaging method (dry
   ice, liquid nitrogen, gel packs), end users and six regions; conservative, base and
   optimistic scenarios provided.
   https://www.rootsanalysis.com/reports/cold-chain-logistics-for-vaccines.html
7. Mordor Intelligence, *Healthcare Cold Chain Market*, page last updated 11 September 2026
   with estimates stated as of January 2026 — **$124.53 billion (2025), $137.27 billion (2026)
   → $223.39 billion (2031), 10.23% (2026–2031)**, study period 2020–2031; by product type
   (vaccines, biopharmaceuticals, clinical trial materials, blood and plasma products, cell and
   gene therapies), service type (transportation, storage and warehousing, packaging,
   monitoring and tracking), end user and geography across 5 regions and 17 countries;
   **vaccines 37.23% of 2025 market revenue.**
   https://www.mordorintelligence.com/industry-reports/healthcare-cold-chain-market
8. WHO Catalogue of Prequalified Immunization Devices (IMD-PQS) — refrigerators and freezers
   are category **E003**; each product code is the category reference plus a number, and the
   catalogue's guidance states that a reference is never reassigned, so "breaks in the
   numerical sequence will appear when an item is dropped from the catalogue." Each edition is
   date-stamped; the most recent PDF edition located was dated 14 February 2025. *The catalogue
   PDF could not be read, so no count of currently prequalified products is published. The code
   numbering explicitly cannot be used as a count.*
   https://extranet.who.int/prequal/immunization-devices/general-information and
   https://extranet.who.int/prequal/sites/default/files/media_document/immunization_devices_catalogue.pdf
9. IMARC Group, *Global Healthcare Cold Chain Logistics Market Report & Forecast 2025–2033* —
   $18.1 billion (2024) → $23.2 billion (2033), **2.8% (2025–2033)**. The same house's
   logistics-only scope, 1.95x smaller than its own storage-and-packaging figure and growing at
   40% of the rate. *Read from a search-result summary — flagged.*
   https://www.imarcgroup.com/healthcare-cold-chain-logistics-market
10. Vaccine cold chain logistics, 2021-base report — $3.12 billion (2021) → $4.59 billion
    (2028), 5.2% (2022–2028). *Read from a refindustry market-research news summary, not the
    primary report — flagged. A market sized mid-COVID is not a baseline for routine
    immunisation.*
    https://refindustry.com/news/market-research/vaccine-cold-chain-logistics-market-worth-4-59-billion-by-2028/

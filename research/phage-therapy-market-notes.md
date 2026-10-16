# Phage Therapy Market — research notes
**Slug:** phage-therapy-market   **Drafted:** 2026-10-16

## Published estimates (what others say)

| Source | Published | Base year | Base value | Forecast year | Forecast value | CAGR | Scope as stated |
|---|---|---|---|---|---|---|---|
| QYResearch | 2024 | 2024 | $38.6M | 2031 | $72.7M | 9.6% | Bacteriophage therapy, global |
| QYResearch (earlier edition) | 2023 | 2023 | $32M | 2030 | $62M | 9.6% | Bacteriophage therapy, global |
| Roots Analysis | 2026 | 2026 | $66.5M | 2035 | $266.8M | 16.7% (2026-35) | Bacteriophage therapy market |
| Verified Market Research (via GII) | 2025 | — | — | 2032 | $74.28M | 5.12% | Bacteriophage therapy |
| Coherent Market Insights | 2024 | 2023 | $1,280.9M | 2030 | $1,651.8M | 3.7% | "Bacteriophage therapy" |
| GII listing (second series) | 2025 | 2025 | $1,270M | 2034 | $1,840M | 4.17% | "Bacteriophage therapy" |

## The spread

**$38.6M (QYResearch, 2024) to $1,280.9M (Coherent, 2023) — a 33.2x spread.**

That is the widest spread in this batch by a factor of ten, and it is not a
scope subtlety. It is a disagreement about whether this market exists yet.

## The commercial fact that frames everything

**There is no approved bacteriophage therapeutic for human use in the United
States, the European Union or the United Kingdom.**

- US access runs through investigational new drug and expanded-access
  (compassionate use) routes only. A 2026 review describes the FDA enabling
  access through IND and expanded-access mechanisms with updated guidance for
  individual-patient use.
- The UK regulator's November 2025 guidance states there are no marketing
  authorisations for bacteriophage medicinal products in the UK.
- Belgium operates a magistral-preparation (pharmacy compounding) model rather
  than a marketing authorisation.
- The most advanced Western programme, Armata Pharmaceuticals' AP-SA02, had
  Qualified Infectious Disease Product status granted in February 2026 and Fast
  Track in May 2026, with a Phase 3 superiority protocol submitted and the
  trial planned to start in the second half of 2026. Designations are not
  approvals.

So **worldwide approved-product revenue for human phage therapeutics is
approximately zero.** Any published "market size" for this category is
measuring something other than therapeutic product sales.

## Grounding arithmetic

Register counts, ClinicalTrials.gov API v2, intervention search
`bacteriophage`, retrieved **2026-10-16**:

| Query | totalCount |
|---|---|
| All registered studies | **124** |
| Currently recruiting | **22** |
| Phase 3 | **9** |

Now divide the high published estimate by the register:

> $1,280.9M ÷ 124 registered studies = **$10.3 million per registered study**

That figure has to be accounted for on some reading, and none works:

- **It is not product revenue**, because no product is approved anywhere in the
  US, EU or UK.
- **It is not R&D spend either.** Only 22 of the 124 studies are recruiting.
  $10.3M per registered study — against a population that is mostly completed,
  terminated or not yet open, and mostly early-phase academic anti-infective
  work — is not a credible sponsor outlay. Nine Phase 3 studies exist in total
  across the entire field.
- The low cluster implies **$38.6M ÷ 124 = $311,000 per registered study**,
  which is the right order of magnitude for a field funded largely by academic
  and government grants with a handful of venture-funded sponsors.

So the arithmetic does not merely show a spread: it **rules out the high
cluster as a description of human phage therapy**. The most likely thing those
figures are counting is **phage products that are approved and sold, just not
as medicines** — Intralytix's ListShield was approved by the FDA as a food
additive for ready-to-eat foods in 2006 under 21 CFR 172.785 and registered by
the EPA as a microbial pesticide, and the company also lists EcoShield,
SalmoFresh and CampyShield for food-safety use. A market built on food-safety
and biocontrol phage is a real market with real revenue; it is not the market a
reader searching for "phage therapy" is asking about.

## Should this topic be dropped?

Considered seriously, per the brief. The argument for dropping: the commercial
market is pre-revenue, so a "market size" is option value rather than revenue.

The argument for publishing, which wins: a report that says plainly **no
approved product, 124 registered trials, 9 of them Phase 3, 22 recruiting, and
therefore published forecasts are option value rather than revenue** is more
useful than silence, and there *is* a defensible base-year figure to hang it on
— Roots Analysis publishes **$66.5M for 2026**, a base year that is the current
year, within the cluster the per-trial arithmetic supports. The report is
honest about what that number is: a pre-revenue, pre-approval estimate of a
field whose commercial value depends on a Phase 3 result that has not been
read out.

**State → `drafting` → `check-passed`. Not dropped.**

## What we publish

- **Base:** $66.5M for 2026 (Roots Analysis), unit **Million**, not Billion.
- **CAGR:** 16.7% (Roots Analysis, 2026-2035).
- **Forecast:** $167.93M by 2032.
- The report's spine: no approved product anywhere in the US, EU or UK; 124
  registered trials; the 33.2x spread; and the per-trial arithmetic that rules
  out the $1.28B cluster.

## Do not publish

- **Any revenue figure for an approved human phage therapeutic.** There is
  none.
- **Vendor market share.** No approved products means no product revenue means
  no share. `competitive_landscape[].market_share` absent.
- **Regional or country splits.** Georgia (Eliava Institute) and Belgium have
  the most developed access routes, and Poland has a long-running experimental
  programme, but no named source quantifies revenue or patient numbers by
  country. `regional_analysis` and `country_analysis` stay `[]`.
- **Patient-treated counts.** Compassionate-use and magistral-preparation
  volumes are not centrally registered anywhere we could find.
- **The $1.27-1.28B cluster as a therapy market.** Cited as a contrast and
  explicitly ruled out, never repeated as the market size.
- **A count of approved phage food-safety products.** Secondary sources give
  five as of 2022 via Wikipedia; not verified against the FDA GRAS inventory,
  so no count is published.

## Sources

1. ClinicalTrials.gov API v2, `query.intr=bacteriophage`: totalCount 124; with
   `filter.overallStatus=RECRUITING`: 22; with `AREA[Phase]PHASE3`: 9. All
   retrieved 2026-10-16.
2. Exploration Publishing review (2026) on phage therapy regulation — FDA IND
   and expanded-access routes, updated individual-patient guidance.
   https://www.explorationpub.com/Journals/em/Article/1001422
3. STAT, "Phage therapy for antibiotic-resistant bacteria: FDA should loosen
   restrictions", 23 June 2024 — describes US access as expanded-access only.
   https://www.statnews.com/2024/06/23/phage-therapy-antibiotic-resistant-bacteria-fda-loosen-restrictions/
4. UK MHRA guidance, November 2025 — no marketing authorisations for
   bacteriophage medicinal products in the UK (via secondary reporting).
5. Armata Pharmaceuticals — AP-SA02 Phase 3 superiority protocol submitted to
   FDA, trial start planned 2H 2026; QIDP granted February 2026; Fast Track
   granted May 2026 (company announcements via trade press, 2026).
6. QYResearch, bacteriophage therapy market — $38.6M (2024) → $72.7M (2031),
   9.6%.
7. Roots Analysis, *Bacteriophage Therapy Market* — $66.5M (2026) → $266.8M
   (2035), 16.7%.
   https://www.rootsanalysis.com/reports/bacteriophage-therapy-market.html
8. Coherent Market Insights, bacteriophage therapy market, via BioSpace press
   release — $1,280.9M (2023) → $1,651.8M (2030), 3.7%.
   https://www.biospace.com/press-releases/bacteriophage-therapy-market-size-expected-to-reach-usd-1-651-8-million-by-2030
9. Verified Market Research via GII — $74.28M by 2032, 5.12%.
   https://giikorea.co.kr/report/vmr1982908-global-bacteriophage-therapy-market-size-share.html
10. Intralytix — ListShield approved by FDA as a food additive for ready-to-eat
    foods, 18 August 2006, under 21 CFR 172.785; also EPA-registered as a
    microbial pesticide; EcoShield, SalmoFresh and CampyShield listed for
    food-safety use (CampyShield GRAS notice GRN 966, 2020).
    https://www.intralytix.com/product/listshield
11. The Microbiologist, "Establishing a regulatory framework for phage therapy
    in China", 2025 — on the absence of a settled authorisation pathway.
    https://www.the-microbiologist.com/news/establishing-a-regulatory-framework-for-phage-therapy-in-china/8935.article

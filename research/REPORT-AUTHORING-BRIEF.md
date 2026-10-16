# Report authoring brief

How a NeoGraph Analytics report gets written. This is the contract between a
research pass and the published row in `neograph_reports`.

NeoGraph is a **research publication, not a lead-generation site.** The only
thing it sells is credibility. One unsourced headline number undoes the value of
the analysis around it, and the reader cannot audit us.

## Deliverables per report

1. `research/<slug>-notes.md` — the evidence file. Written first.
2. `content/reports/<slug>.json` — the draft row, in the shape below.

Both are additive. Never edit or delete another report's files.

## The evidence file

```markdown
# <Market name> — research notes
**Slug:** <slug>   **Drafted:** <YYYY-MM-DD>

## Published estimates (what others say)
| Source | Published | Base year | Base value | Forecast year | Forecast value | CAGR | Scope as stated |
|---|---|---|---|---|---|---|---|

## The spread
<How far apart the published estimates are, as a multiple. Say what scope
decision explains the gap — almost always a definition difference, not a
disagreement about growth.>

## Grounding arithmetic
<At least one independent sanity check against a countable public register:
FDA device/approval lists, CMS counts, IAEA DIRAC, WHO/OECD statistics,
ClinicalTrials.gov counts, EMA registers, company 10-K segment revenue.
Show the division. State what it rules in or out.>

## What we publish
<The figures that go into the JSON, and why those and not the others.>

## Do not publish
<Explicit list. Every figure that was tempting but is not defensible —
vendor shares, regional splits, country splits, un-sourced segment percentages.
This list must survive into the JSON as empty arrays, not as guesses.>

## Sources
<Numbered, with URL and publication date for each.>
```

## Hard rules on figures

- **Every number in the JSON traces to a source in the notes.** No exceptions.
- **The CAGR must reconcile.** `current_value * (1+cagr)^years == forecast_value`
  across `forecast_period`. The checker enforces this to ±0.6 points.
- **`market_forecast` must start at `base_year` with exactly `current_value`**
  and interpolate on the stated CAGR. 7-9 points.
- **No vendor market share.** It is almost never publicly disclosed. Name the
  players, describe their position in words, and say plainly that share is not
  disclosed. `competitive_landscape[].market_share` is rejected by the checker.
- **`regional_analysis` / `country_analysis` stay `[]`** unless a named source
  gives those splits. An empty array renders as an omitted section, which is
  honest. A fabricated 38.4% is not.
- **Segmentation dimensions as plain strings** (`["Software", "Services"]`)
  unless a source gives shares. The renderer handles both; strings attach no
  invented percentages.
- **Disagreement is the story.** A report whose headline is a single number is
  reporting the analyst's scope decision, not a finding about the market. Say so
  in `market_context` or `forecast_analysis`, with the spread as a multiple.
- **`recent_developments` stays `[]`** rather than filled with unsourced items.
  Any entry needs a real company, year and verifiable event.
- Prefer **arithmetic against a public register** over repeating a vendor's
  headline. "~$976,000 per centre per year, which rules out a radiotherapy-only
  reading" is worth more than any cited forecast.

## Draft JSON shape

Written to `content/reports/<slug>.json`. Field names are the Supabase column
names, except SEO fields which nest under `seo` (the publisher flattens them).

```json
{
  "report_id": "<same string as slug — the corpus convention>",
  "slug": "<kebab-case, ends in -market>",
  "title": "<Market Name> Market Size, Share & Forecast <base>-<end>",
  "industry": "<one of the existing industry values>",
  "published_year": 2026,
  "base_year": 2026,
  "forecast_period": "2026-2032",
  "historical_period": "2022-2025",
  "currency": "USD",
  "unit": "Billion",
  "market_size": { "current_value": 0.0, "forecast_value": 0.0, "cagr": 0.0 },
  "market_overview": {
    "summary": "<350+ chars: what the market is, how wide the estimates are, what we conclude>",
    "key_trends": ["<4-6 trends, each a claim a reader can check>"],
    "market_stage": "Emerging | Growth | Mature",
    "adoption_level": "<short phrase>"
  },
  "market_dynamics": {
    "drivers": ["<3-6>"], "restraints": ["<3-6>"],
    "opportunities": ["<3-6>"], "challenges": ["<3-6>"]
  },
  "market_segmentation": { "by_type": ["..."], "by_application": ["..."], "by_end_user": ["..."] },
  "regional_analysis": [],
  "country_analysis": [],
  "market_forecast": [{ "year": 2025, "value": 0.0 }],
  "charts": [{ "type": "line_chart", "title": "Market size, 2026-2032 (modelled at constant CAGR between published endpoints)", "data_source": "market_forecast" }],
  "competitive_landscape": [
    { "company": "...", "headquarters": "...", "market_position": "<words, no share>", "description": "..." }
  ],
  "company_profiles": [],
  "recent_developments": [],
  "regulatory_landscape": ["<named instrument or pathway, with what it requires>"],
  "research_methodology": {
    "primary_research": ["..."],
    "secondary_research": ["<5+ named, datable publications and registers>"],
    "data_validation": "<120+ chars: how the figures were checked, what the grounding arithmetic was, and what it is NOT (a plausibility test is not a market estimate)>"
  },
  "faqs": [{ "question": "...", "answer": "..." }],
  "seo": {
    "meta_title": "<<= 60 chars, never both 'Global' and a region>",
    "meta_description": "<70-160 chars>",
    "keywords": ["<3-8>"]
  },
  "executive_summary": "<600+ chars — this is the analysis, not a blurb>",
  "key_highlights": ["<4-7>"],
  "market_context": "<400+ chars — where this sits in the wider system>",
  "forecast_analysis": "<400+ chars — why the forecast is what it is, and the spread>",
  "reader_takeaways": ["<3-5>"]
}
```

`industry` must reuse a value already in the corpus (`node scripts/report-db.mjs
industries`): **Healthcare IT, Biotechnology, Life Sciences, Pharmaceuticals,
Medical Devices, Medical Imaging**.

## Checking and publishing

```bash
node scripts/report-db.mjs check content/reports/<slug>.json      # offline, no network
node scripts/report-db.mjs publish content/reports/<slug>.json    # upsert by slug
```

`check` must exit 0 before anything is published. Warnings are read, not
ignored: a "confirm each is sourced" warning means go back to the notes file.

Only the session owner publishes. A research pass stops at a passing `check`.

**Publishing is paired with a deploy, in that order and close together.**
`app/reports/[slug]/page.tsx` sets `dynamicParams = false`, so a slug that
exists in Supabase but was not in the last build's `generateStaticParams()`
returns a hard 404 — while `/reports` (ISR, hourly) will already be listing a
card that links to it. That is the soft-404 class of defect PR #4 existed to
fix, pointed the other way. So: publish only when a merge slot is available to
follow it within the hour; otherwise hold the drafts on the branch, which costs
nothing. Supabase-only edits to rows that are **already** built (meta fields,
corrections to prose) are different and reach production through ISR with no
deploy at all.

## Reference

`content/reports/_reference-oncology-information-systems-market.json` is a
published row dumped from Supabase, in row shape (flat SEO). Read it for tone
and depth; it is the standard to match, not a template to fill.

# Mordor Intelligence — mordorintelligence.com

**Positioning:** multi-industry research publisher with a healthcare &
life-sciences practice presented as a named team.
**Corpus claim:** not a single advertised number. The healthcare hub page is
`/market-analysis/healthcare` (not `/market-research-healthcare`, which 404s).
**Why we study it:** report-page information density and chart-per-page count
(`references/site-roster.md`).

---

## Pass — 2026-10-17 (headless)

Method: headless `curl` + HTML measurement. IST 17:15 is outside the
21:00-09:00 browser window — **every figure below is modelled**, not observed.

Pages read (raw bytes, decompressed):
- `https://www.mordorintelligence.com/` (68,318 B)
- `https://www.mordorintelligence.com/market-analysis/healthcare` (581,772 B)
- `https://www.mordorintelligence.com/industry-reports/continuous-glucose-monitoring-market` (222,466 B)
- `https://www.mordorintelligence.com/blog` (40,469 B)
- `https://www.mordorintelligence.com/robots.txt`

### Home
- Headings: h1 1, h2 **7**, h3 6 — the flattest home page of the three.
  Words: 1,762. Images 57, inline `<svg>` 4, tables 0.
- Forms 2 / inputs 8 / buttons 14. No `<select>`.
- Corpus counts shown live: **not found** in the markup.
- JSON-LD: `Organization`, `ImageObject`, `ContactPoint`, `WebSite`, `WebPage`.
- `<title>` 46 chars, meta description 185 chars, canonical yes.
- HTML weight 68 KB — a third of the Grand View home page.

### Report listing — /market-analysis/healthcare
- 581,772 B, the heaviest page measured in this pass (5.4x their own home page).
- Headings: h1 1, h2 2, h3 6. Words 2,731. Images 66, inline `<svg>` **228**.
- Controls: **81 checkbox inputs** and 1 `<select>` with 20 options.
  Classified by their `name` attributes, the 81 checkboxes are a
  **geography picker** (continents and individual countries — `Africa`,
  `Americas`, `Asia`, then country names), not report filters. The select is a
  newsletter industry picker (its `aria-label` names the newsletter).
- So: a healthcare listing with **0 report filters** and **0 sort options** in
  the delivered HTML. 96 buttons and 88 inputs total, across 3 forms.
- JSON-LD: `CollectionPage`, `ItemList` (5 entries), `BreadcrumbList`,
  `ListItem`, `WebPage`, `Organization`, `ImageObject`, `ContactPoint`.
- `<title>` 47 chars, meta description **290 chars**, canonical yes.

### Report detail — /industry-reports/continuous-glucose-monitoring-market
Counts: `h1` 1 · `h2` **10** · `h3` 14 (25 headings) · `<table>` **5 opened,
3 closed** (two tables are left unclosed in the delivered HTML) ·
`<figure>` **5** · `<figcaption>` **5** · inline `<svg>` 54 · `<img>` 57 ·
`<canvas>` 0.
- Words of prose in the document: **3,838** — about half the Grand View figure,
  with more of the page given to structured tables than to running text.
- FAQ: **5** `Question` nodes.
- **Driver/restraint impact tables — the strongest mechanism found this pass.**
  Two tables with stable ids (`drivers-impact-analysis-*`,
  `restraints-impact-analysis-*`), each **4 columns**:
  driver/restraint · % impact on the forecast CAGR · geographic relevance ·
  impact timeline. Drivers table: 8 `<tr>` (7 data rows), 25 `<td>`.
  Restraints table: 6 `<tr>` (5 data rows), 17 `<td>`. Every driver therefore
  carries three quantified attributes instead of being a sentence.
- 5 further tables use `class="segmentation-toc-table"` (2-3 rows each) —
  segment structure rendered as tables rather than as a nested list.
- `<figcaption>` on all 5 figures carries an **image reuse licence line**
  (CC BY 4.0, attribution required) — one mechanism, repeated identically on
  every figure. It does **not** carry a data-source line.
- Licence/price tiers: **1** price-shaped string (`USD 100`) in the delivered
  HTML; `*/buy-now$` is Disallow-ed in robots.txt, so the tier table is not a
  public page.
- Author attribution: 1 credit in JSON-LD — a named **team**, not an individual
  analyst. 0 `/author/` links.
- Methodology: **0** links containing `methodolog` anywhere in the report page.
- JSON-LD types: `Organization`, `ImageObject`, `ContactPoint`, `WebPage`,
  `SpeakableSpecification`, `CreativeWork`, `BreadcrumbList`, `ListItem`,
  `FAQPage`, `Question`, `Answer`, **`Dataset`**, `Place`, **`DataDownload`**
  (x2), `PropertyValue`, `ItemList` (**46 entries**), `Thing`.
- `Dataset` node carries **15 keys**: `mainEntityOfPage`, `name`, `description`,
  `url`, `conditionsOfAccess`, `license`, `creator`, `publisher`,
  `thumbnailUrl`, `temporalCoverage`, **`spatialCoverage`**, `distribution`,
  `variableMeasured` (+ `@type`, `@id`). The richest Dataset node of the three.
- Report-page `ItemList` with 46 entries — the segment/TOC structure re-declared
  as machine-readable list items.
- `<title>` 58 chars, meta description **265 chars**, 4 `<select>`
  (11/9/1/3 options), 4 checkboxes, 46 buttons, 16 inputs, 3 textareas.

### Blog / insights — /blog
- Words 515, h1 1, h2 5, h3 5, images 14. JSON-LD: **none**.
- Posts visible / median length / cadence: **not determinable headless** — the
  feed is injected client-side; only 515 words of shell arrive.
- Bylines, categories, report links: **open**.
- `<title>` 43 chars, meta description 210 chars.

### UI / UX mechanics
- Viewport meta: `width=device-width,initial-scale=1` (home/listing);
  `width=device-width,initial-scale=1,shrink-to-fit=no` (report, blog).
- Typography and colour: **not checked** — browser-window measurements.
- Dark mode: **not found** in the delivered HTML.
- Breadcrumbs: yes (`BreadcrumbList` on report and listing).
- Sticky TOC / sticky CTA: **open**.
- Forms: the report page carries 6 forms, 16 inputs, 4 selects, 3 textareas —
  the most form surface of the three report pages measured.
- Tailwind-shaped utility classes with named design tokens appear in the markup
  (`text-Body-Medium-14`, `text-Neutrals-950`) — a named type scale and a
  numbered neutral ramp, the same idea as our CSS custom properties.

### SEO / technical
- `robots.txt` advertises **1 sitemap** (`/static/sitemap.xml`); an HTML
  `/sitemap.html` is also linked. Disallow: `/socket.io/`, `/api/`,
  `/cdn-cgi/`, `*/buy-now$`.
- `llms.txt`: **not checked** this pass.
- Canonical on every page read. Image CDN: **not checked**.
- HTML weight: home 68 KB · listing **582 KB** · report 222 KB · blog 40 KB.

### Measured gaps vs us
| Their number | Our number | File that would change |
|---|---|---|
| 7 drivers x 3 quantified attributes (% CAGR impact, geographic relevance, timeline) in a 4-column table | `market_dynamics.drivers` is 6 plain strings; `restraints` 5 strings (`content/reports/advanced-wound-care-market.json`) | `components/reports/JsonReportSections.tsx` + a `market_dynamics` shape change |
| `Dataset` node: 15 keys, incl. `spatialCoverage` and `conditionsOfAccess` | **10 keys** — no `spatialCoverage` although we hold geographic coverage in `market_metrics`, and no `conditionsOfAccess` although report bodies are purchasable | `components/seo/StructuredData.tsx` |
| report `ItemList`: 46 machine-readable segment/TOC entries | 0 — our TOC is rendered but not declared in JSON-LD | `components/seo/StructuredData.tsx` + `app/reports/[slug]/page.tsx` |
| 5 segment tables (`segmentation-toc-table`) | 1 `<table>` in `JsonReportSections.tsx` | `components/reports/JsonReportSections.tsx` |
| 5 `<figcaption>`, each with an explicit image reuse licence | 5 `<figcaption>` equivalents via `ChartFigure.tsx`, carrying **`Source:` + a modelling note + a `/methodology` link** but no reuse terms | `components/reports/ChartFigure.tsx` |
| report page: 0 methodology links | we link `/methodology` from inside every chart caption | (we are ahead — not filed) |
| meta description 265-290 chars | capped at 160 by `lib/seo.ts` | (we are ahead — not filed) |
| 2 unclosed `<table>` elements in delivered HTML | 0 | (we are ahead — not filed) |

### Rejected
- 6 forms / 46 buttons on a single report page — that is lead-capture surface
  competing with the analysis; roster rules 1 and 3.
- A newsletter industry picker occupying the healthcare listing's only
  `<select>` while the listing offers 0 report filters — subordinates
  findability to list-building.
- An 81-item country checkbox grid shipped on every listing page view — it costs
  582 KB of HTML and only pays off at their catalogue size, not at our 152 rows.
  Dropped per `checklist-protocol.md` ("only works with their catalogue size").
- `conditionsOfAccess` is worth taking as a *mechanism*; their
  `distribution`/`DataDownload` pair is **not**, unless we genuinely serve a
  downloadable dataset — asserting a download we do not serve is a false claim.

### Open — needs the night browser window
- Typography families and the px values behind `text-Body-Medium-14`.
- Whether the report TOC/CTA are sticky, and where the impact tables sit in the
  visual order (heading order alone does not settle it).
- Blog post count, length, cadence, bylines — the feed is client-injected.
- Image CDN host and `llms.txt`.
- Rendered contrast of the impact tables' positive/negative impact cells.

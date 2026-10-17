# Grand View Research — grandviewresearch.com

**Positioning:** broad multi-industry market-research publisher; healthcare is one
of ~19 top-level industry verticals rather than the whole catalogue.
**Corpus claim:** not stated as a single number on the home page or the
healthcare listing. The category jump-select offers 65 destinations.
**Why we study it:** report-page section order and depth; segment tables; TOC
structure (`references/site-roster.md`).

---

## Pass — 2026-10-17 (headless)

Method: headless `curl` + HTML measurement. IST 17:15 is outside the
21:00-09:00 browser window, so **every figure below is modelled**, not observed.
Pixel geometry, rendered contrast, hover/focus states and scroll behaviour were
not measurable and are listed under **Open**.

Pages read (raw bytes on disk, decompressed):
- `https://www.grandviewresearch.com/` (213,385 B)
- `https://www.grandviewresearch.com/industry/healthcare` (107,458 B)
- `https://www.grandviewresearch.com/industry-analysis/compression-stockings-market-report` (318,454 B)
- `https://www.grandviewresearch.com/press-release` (84,235 B)
- `https://www.grandviewresearch.com/robots.txt`

### Home
- Headings: h1 1, h2 12, h3 20. Words of text: 1,689.
- Forms in the document: 3; total inputs 3; buttons 5. No `<select>`.
- Images 59, inline `<svg>` 36, `<table>` 0.
- Corpus counts shown live: **not found** — searched the HTML for digit-grouped
  counts next to "report"; no catalogue total in the markup.
- JSON-LD: `Organization`, `ContactPoint`, `SearchAction`. No `WebSite` node.
- `<title>` 64 chars, meta description 141 chars, canonical present.

### Report listing — /industry/healthcare
- Filters: **1 control** — a `<select aria-label="Browse categories">` with 65
  options whose `onchange` sets `window.location` to `/industry/<value>`. It is
  a jump-navigation control, not a filter: it replaces the page rather than
  narrowing the result set. Checkbox inputs: 1. Radio inputs: 0.
- Sort options: **absent** (searched for `sort` in control attributes: 0 hits in
  any `<select>`/`<button>`).
- Words of text on the page: 766. Images: 1. `h2` 5, `h3` 5.
- Price in listing: yes — 2 price-shaped strings (`USD 573`, `USD 792`).
- JSON-LD on the listing: **none**. `<title>` 10 chars, meta description
  **0 chars (absent)**, h1 1.
- Pagination controls: 22 inputs on the page across 3 forms; results-per-page is
  not declared in the markup (the grid is injected client-side).

### Report detail — /industry-analysis/compression-stockings-market-report
Counts: `h1` 1 · `h2` **29** · `h3` 14 (43 headings) · `<table>` **6**
(all 6 closed; 5 carry `class="table-curved"`) · `<figure>` **0** ·
`<figcaption>` **0** · inline `<svg>` 38 · `<img>` 46 · `<canvas>` 0.
- Words of prose in the document: **7,347** — the largest of the three sites in
  this pass, and not gated: the text is in the delivered HTML.
- FAQ: **10** `Question` nodes in JSON-LD.
- Licence/price tiers: **3** price points inline (`$792`, `$825`, `$1,051`),
  linked to `/checkout/select-license/<slug>`.
- Author attribution: 1 `Person`-shaped credit in JSON-LD, a **team** name
  rather than a named analyst. One `/speak-to-author/<id>/sta` link.
- Methodology: **2** links — a site-wide `/info/research-methodology` and a
  per-report `/industry-analysis/<slug>/methodology`. The per-report one is
  `Disallow`-ed in `robots.txt`, so it is not a public page in practice.
- JSON-LD types: `WebPage`, `Article`, `ImageObject`, `Organization`,
  `SpeakableSpecification`, `BreadcrumbList`, `ListItem`, `FAQPage`, `Question`,
  `Answer`, **`Dataset`**, `PropertyValue`.
- `Dataset` node carries 8 keys: `name`, `description`, `temporalCoverage`,
  `creator`, `license`, `variableMeasured` (+ `@context`, `@type`).
- `<title>` 53 chars, meta description 149 chars.

### Blog / insights — /press-release
- `h1` **3** (three h1s on one page), `h2` 5, `h3` 1. Words: 711. Images 4.
- `<title>` **19 chars**, meta description **19 chars**. JSON-LD: **none**.
- Posts link to reports: not determinable headless — the feed is injected.
- Bylines: absent from the delivered HTML.

### UI / UX mechanics
- Viewport meta: `width=device-width, initial-scale=1.0`.
- Typography families, body/h1 px and measure: **not checked** — requires
  rendered CSS resolution, which is a browser-window measurement.
- Dark mode: **not found** in the delivered HTML (no `prefers-color-scheme`
  block and no theme-toggle control in the markup).
- Search: a `SearchAction` is declared in home JSON-LD; the visible control was
  not resolvable headless.
- Breadcrumbs: yes — `BreadcrumbList` on the report page.
- Sticky TOC / sticky CTA: **open** — scroll behaviour is not measurable headless.
- Forms: 3 forms / 6 inputs on the report page; 0 `<select>`, 0 `<textarea>`.
- `robots.txt` `Disallow`s 30+ paths including `/industry-analysis/*/toc`,
  `/industry-analysis/*/segmentation`, `/industry-analysis/*/methodology`,
  `/ask-an-analyst/*` and `/statistics/*`.

### SEO / technical
- Report page `<title>` 53 chars, meta description 149 chars, h1 1, canonical yes.
- `robots.txt` advertises **0 sitemaps** (no `Sitemap:` line at all). An HTML
  `/html-sitemap` is linked from pages.
- `llms.txt`: **not checked** this pass.
- HTML weight: home 213 KB · listing 107 KB · report **318 KB** · press 84 KB.

### Measured gaps vs us
| Their number | Our number | File that would change |
|---|---|---|
| report page: 43 headings (29 h2 + 14 h3) | 14 id-anchored sections in `JsonReportSections.tsx`; 5 h2 + 8 h3 + 3 h4 across all report-page components | `components/reports/JsonReportSections.tsx` |
| report page: 6 tables, 5 of them styled segment tables | 1 `<table>` in `JsonReportSections.tsx` (+ any inside author-supplied `market_details` HTML) | `components/reports/JsonReportSections.tsx` |
| report page: 7,347 words ungated | not measured this pass (needs a built page) | — (open) |
| report JSON-LD includes `SpeakableSpecification` | absent — our 5 nodes are `Article`, `Product`, `Dataset`, `BreadcrumbList`, `FAQPage` | `components/seo/StructuredData.tsx` |
| report FAQ: 10 questions | 7 in `content/reports/advanced-wound-care-market.json` | (parity — not filed) |
| `Dataset` node: 8 keys | **10 keys** incl. `license`, `variableMeasured`, `temporalCoverage` | (parity, we are ahead — not filed) |
| listing: price shown on cards | we show price on cards | (parity — not filed) |
| listing meta description: 0 chars | ours is capped at 160 by `lib/seo.ts` | (parity, we are ahead) |

### Rejected
- `/ask-an-analyst/*` and `/speak-to-author/<id>` as a report-page CTA — a sales
  routing surface with no sales floor behind it here; roster rule 3.
- Per-report methodology page that is `Disallow`-ed in `robots.txt` — publishing
  a methodology and then hiding it from crawlers is the opposite of the
  transparency we want; our single public `/methodology` is the better shape.
- Three h1s on one page (their press feed) — not a mechanism, a defect.

### Open — needs the night browser window
- Typography: families, body px, h1 px, line measure in ch.
- Whether the report-page TOC and CTA are sticky, and at what scroll offset.
- Rendered contrast of their body text and card borders.
- Results-per-page and pagination on the healthcare listing (grid is injected).
- Whether press-release posts carry bylines and link to reports.
- `llms.txt` presence.

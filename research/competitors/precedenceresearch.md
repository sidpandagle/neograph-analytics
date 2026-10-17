# Precedence Research — precedenceresearch.com

**Positioning:** multi-industry research publisher with a large healthcare
footprint, plus separately-branded data products (a databook store, a
cell-and-gene intelligence platform, an AI product line).
**Corpus claim:** not stated as a number on the home page or the healthcare
listing.
**Why we study it:** free-prose depth before the gate; statistics pages
(`references/site-roster.md`).

---

## Pass — 2026-10-17 (headless)

Method: headless `curl` + HTML measurement. IST 17:15 is outside the
21:00-09:00 browser window — **every figure below is modelled**, not observed.

Pages read (raw bytes, decompressed):
- `https://www.precedenceresearch.com/` (117,914 B)
- `https://www.precedenceresearch.com/industry/healthcare` (46,088 B)
- `https://www.precedenceresearch.com/digital-health-market` (137,077 B)
- `https://www.precedenceresearch.com/insights` (62,132 B)
- `https://www.precedenceresearch.com/sitemap.xml` — **timed out at 30 s, 0 bytes
  received**; measured nothing from it.
- `https://www.precedenceresearch.com/robots.txt`

### Home
- Headings: h1 1, h2 17, **h3 58** — the deepest heading tree of the three home
  pages. Words 2,152. Images 53, inline `<svg>` **0**, tables 0.
- Forms **0**, inputs 1, buttons 13.
- Corpus counts shown live: **not found** in the markup.
- JSON-LD: **`Organization` only** — the thinnest of the three; no `WebSite`,
  no `SearchAction`.
- `<title>` 50 chars, meta description 148 chars, canonical yes.

### Report listing — /industry/healthcare
- **`h1` 0** — the healthcare listing ships no h1 at all. h2 2, h3 10.
- Words **385**. Images 21. Forms 0, inputs 3, buttons 5.
- Filters: **0**. Sort options: **0**. Checkboxes 0, radios 0, selects 0.
- The card grid is **client-rendered**: the delivered HTML contains an
  un-interpolated template literal in an `href`
  (`https://www.precedenceresearch.com/${report.CustomName}`), so with JS off
  the listing links nowhere. Only jQuery 3.5.1 and Bootstrap 5.0.2 bundles are
  loaded; no data endpoint is named in the HTML.
- Price in listing: **absent** (0 price-shaped strings).
- JSON-LD on the listing: **none**. `<title>` 44 chars, meta description 133.
- Results per page: **not determinable headless** (grid is injected).

### Report detail — /digital-health-market
Counts: `h1` 1 · `h2` **30** · `h3` 25 (**56 headings, the most of the three**) ·
`<table>` **4** (all closed) · `<figure>` **0** · `<figcaption>` **0** ·
inline `<svg>` **0** · `<img>` 47 · `<canvas>` 0.
- Words of prose in the document: **5,727**, ungated — between the Grand View
  figure (7,347) and the Mordor figure (3,838).
- FAQ: **5** `Question` nodes.
- **Charts are raster images only** — 0 `<svg>` and 0 `<canvas>` on a report
  page with 47 `<img>`. Every figure is a flat bitmap: not selectable, not
  scalable, and with no `<figure>`/`<figcaption>` pairing, so no source line is
  attached to any figure in the markup.
- Licence/price tiers: **30 distinct price-shaped strings**, the most granular
  pricing of the three — a spread from `USD 143` to `USD 5,400` spanning report
  licences and the separate databook products. 19 **radio inputs** on the page,
  consistent with a radio-selected licence tier.
- Author attribution: **a named individual** in JSON-LD as a `Person`, linked to
  `/author/116` — the only one of the three sites that credits a person rather
  than a team. JSON-LD includes a `Person` node.
- Methodology: **0** links containing `methodolog` on the report page.
- Sample: 1 link to `/sample/<id>`; `/sample/` is Disallow-ed in robots.txt, so
  the sample flow is gated. The gate's field count was **not counted** — reading
  it would mean loading a form page behind the Disallow, which this run does not
  do.
- JSON-LD types: `BreadcrumbList`, `ListItem`, `Article`, `Person`,
  `Organization`, `ImageObject`, `WebPage`, `WebSite`, `FAQPage`, `Question`,
  `Answer`. **No `Dataset` node** — the only one of the three without it.
- 3 `<select>` controls, 6 options each. 31 inputs, 13 buttons, 1 textarea,
  2 forms.
- `<title>` 56 chars, meta description 161 chars.

### Blog / insights — /insights
- **`h1` 0**; h2 **32**, h3 6. Words 1,387. Images 17. JSON-LD: **none**.
- 32 h2s on a feed page implies ~32 post cards server-rendered — the only one of
  the three whose feed arrives in the HTML rather than being injected.
- Post length, cadence, bylines, categories, report links: **open** — the feed
  page carries titles but the per-post metadata was not resolvable from it.
- `<title>` 30 chars, meta description 125 chars.

### UI / UX mechanics
- Viewport meta: `width=device-width, initial-scale=1, shrink-to-fit=no` on all
  four pages.
- Typography and colour: **not checked** — browser-window measurements.
- Dark mode: **not found** in the delivered HTML.
- Search: **absent** — no `SearchAction` in JSON-LD and no search input in the
  listing markup (1 input on the home page, 3 on the listing).
- Breadcrumbs: yes on the report page (`BreadcrumbList`); **absent** on the
  listing (no JSON-LD at all there).
- Sticky TOC / sticky CTA: **open**.
- Forms: 2 forms / 31 inputs / 1 textarea / 3 selects on the report page.
- Front end is jQuery 3.5.1 + Bootstrap 5.0.2 from public CDNs.

### SEO / technical
- `robots.txt` advertises **2 sitemaps** (`/sitemap.xml`, `/imagesitemap.xml`).
  Disallow: `/checkout/`, `/sample/`, `/checkout-databook/`,
  `/subscribe-us/checkout/`, `/request-consultation/`, `/precedence/login`,
  `/stats/sign-in`.
- `/sitemap.xml` **did not respond within 30 s** — a sitemap advertised in
  robots.txt that times out is worse than one not advertised.
- `llms.txt`: **not checked** this pass.
- Canonical on all four pages. Image CDN: **not checked**.
- HTML weight: home 118 KB · listing 46 KB · report 137 KB · insights 62 KB —
  the lightest report page of the three (137 KB vs 222 KB and 318 KB).

### Measured gaps vs us
| Their number | Our number | File that would change |
|---|---|---|
| report page: 56 headings (30 h2 + 25 h3) | 14 id-anchored sections in `JsonReportSections.tsx` | `components/reports/JsonReportSections.tsx` |
| report page: 4 closed data tables | 1 `<table>` in `JsonReportSections.tsx` | `components/reports/JsonReportSections.tsx` |
| report page: 30 distinct price points across licence tiers | not measured this pass | — (needs-owner, pricing) |
| a named individual author linked to `/author/<id>` | we have an `authors` array and `/authors/[id]` routes | (parity — not filed) |
| report charts: 0 `<svg>`, 47 raster `<img>`, 0 `<figcaption>` | 3 Recharts SVG charts, each wrapped in `ChartFigure.tsx` with a `Source:` line, a modelling note and a `/methodology` link | (we are well ahead — not filed) |
| no `Dataset` JSON-LD | `Dataset` with 10 keys on all report pages | (we are ahead — not filed) |
| listing: 0 filters, grid dead without JS | 1 derived category filter (19 categories, with counts), 1 derived region select, a search box, 12 per page, server-rendered first page | (we are ahead — not filed) |
| listing h1: 0; insights h1: 0 | 1 h1 per page | (we are ahead — not filed) |
| sitemap advertised in robots.txt times out at 30 s | `/sitemap.xml` is the single advertised sitemap and is complete | (we are ahead — not filed) |

### Rejected
- Gating the sample behind a Disallow-ed form path — roster rule 1.
- 30 visible price points spanning report licences and separate databook SKUs on
  one report page — pricing granularity presented as product depth. Not our
  shape, and a pricing decision is Siddhant's call regardless.
- Client-rendered listing cards (`${report.CustomName}` shipped
  un-interpolated) — this is a defect, not a mechanism: the listing has no
  working links without JS. Recorded so nobody reads "lighter listing HTML" as
  something to copy.
- A report page whose figures are all raster images — cheaper to produce,
  strictly worse for a publication. Explicitly not a model to follow.

### Open — needs the night browser window
- Typography families, body/h1 px, measure.
- Results per page on the healthcare listing and whether the grid paginates.
- Per-post metadata on `/insights`: dates, bylines, cadence, report links.
- Whether their report page has a sticky TOC or CTA.
- `/sitemap.xml` — retry; it may be a transient timeout rather than a dead URL.
- `llms.txt` presence.

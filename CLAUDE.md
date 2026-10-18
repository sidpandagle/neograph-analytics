# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server with Turbopack (fast refresh)
npm run dev

# Build for production
npm run build

# Start production server (requires build first)
npm start

# Run ESLint
npm run lint
```

The dev server runs with Turbopack. **Use port 3100 or above** — `npm run dev -- -p 3100`.
Port 3000 belongs to Siddhant's own work and must stay free. A stale `next start`
holding a port and serving old code has caused two false passes; confirm ownership
with `netstat -ano | grep ":3100"` before trusting local output.

## Environment Variables

```bash
RESEND_API_KEY                  # Email delivery (Resend service)
NEXT_PUBLIC_API_BASE_URL        # Backend API (https://healthcare-market-research-backend.onrender.com)
NEXT_PUBLIC_PAYPAL_CLIENT_ID    # PayPal checkout integration
```

## Architecture Overview

### Next.js 15 App Router Structure

**Server-first architecture** using Next.js 15 App Router with React 19:

- **Default to Server Components**: All components in `app/` are Server Components unless marked with `"use client"`
- **Client Components**: Only used when needed for interactivity (e.g., `Navigation.tsx` uses `usePathname`)
- **Static Generation**: Reports, blog, consulting, press-releases, and legal pages use `generateStaticParams()` for build-time generation
- **Layout System**: Root layout wraps all pages with persistent Header/Footer

### Data Architecture

Content is canonically in **Supabase**; the files in `/data/` are snapshots kept as
the fallback that stops an outage rendering an empty site. `neograph_reports` holds
152 rows against `data/all_reports.json`'s 10 and `data/reports.json`'s 12 — publish
to Supabase, not to the files. `AGENTS.md` carries the full table. The files:
- `reports.json` - Research reports with slug-based routing and extended metadata
- `blogs.json` - Blog posts with author/date metadata
- `categories.json` - Content categories
- `consulting-services.json` - Consulting offerings grouped by category
- `press-releases.json` - Press release content
- `legal-pages.json` - Terms of Service, Privacy Policy, etc.
- `team-members.json` - Team profiles with credentials/expertise
- `testimonials.json` - Customer testimonials

**Report metadata shape** (see `REPORT_METADATA_BINDING.md` and `METADATA_FIELD_MAPPING.md` for full spec):
- `meta_title`, `meta_description`, `meta_keywords` - SEO fields
- `market_metrics` - Revenue, forecast, CAGR, geographic coverage
- `sections.keyPlayers` (JSON), `sections.marketDetails` (HTML), `sections.tableOfContents` (JSON)
- `authors` array, `faqs` array, `keyFindings` array

### lib/api Layer

**Critical architectural layer** — all data access goes through `/lib/api/` rather than directly reading JSON:
- `reports.ts` - Report fetching with API integration fallback to JSON
- `categories.ts`, `blogs.ts`, `press-releases.ts`, `legal-pages.ts`, `authors.ts`, `consulting.ts`
- `forms.ts` - Form submission handling (contact, request-sample)
- `orders.ts` - Checkout/order data
- `mappers.ts` - Transforms API responses to UI-ready format
- `config.ts` - API base URL configuration
- `relatedReports.ts` - the related-report block; enforces the healthcare /
  frontier-tech boundary so the two sets never appear beside each other
- `home.ts` - homepage queries
- `llmtxt.ts` - the `/llms.txt` payload
- `form-guard.ts` - shared validation for the contact, request-sample and
  purchase-inquiry routes
- `pgrst.ts` - PostgREST filter helpers. **Build an `or()` search filter with
  `ilikeAny()`, never by interpolating the term**: a comma in the term used to
  open a new alternative in the filter grammar. `rangeFor()` turns a
  page/limit pair into a `.range()` window so pagination happens in the
  database rather than after the whole table has crossed metered egress, and
  returns null when the caller asked for neither. `safeYear()` keeps a row
  with no `published_year` out of the sitemap
- `index.ts` - barrel re-export

Type definitions live alongside in `*.types.ts` files. See `lib/api/README.md` for full documentation.

### Routes

- `/` - Home page
- `/reports` - Report listing with filter/search
- `/reports/[slug]` - Individual report (static generation)
- `/blog` - Blog listing
- `/about` - Company mission/values
- `/services` - Healthcare consulting services listing
- `/consulting/[slug]` - Individual consulting service detail (static generation)
- `/press-releases` - Press releases listing
- `/press-releases/[slug]` - Individual press release (static generation)
- `/legal/[slug]` - Legal pages — Terms, Privacy, etc. (static generation)
- `/authors/[id]` - Author profile pages
- `/contact` - Contact form page
- `/request-sample` - Request sample form
- `/checkout/[reportSlug]` - PayPal-powered checkout
- `/order-success` - Post-purchase confirmation
- `/methodology` - how the figures are produced; linked from report pages
- `/design-system` - live component gallery, `noindex, nofollow`
- `/llms.txt` - LLM crawler endpoint
- `/sitemap.xml` - **the only sitemap `robots.ts` advertises**, and the
  complete one: static pages, reports, articles, press releases, consulting,
  legal and author profiles. `/sitemap-pages.xml` and
  `/sitemap-consulting.xml` are **308 redirects to it** as of 2026-10-18 —
  they used to serve older subsets (8 static pages, 10 consulting) with their
  own `priority` and, in the pages one, a `lastmod` stamped at fetch time.
  Measured 10 of 10 and 8 of 8 already present in `/sitemap.xml` before the
  redirect. The paginated `/api/sitemap-reports/[page]` family (reached via the
  `sitemap-reports-:page.xml` rewrites in `next.config.ts`) is still
  unadvertised and still duplicates report URLs; it paginates at 500 against a
  50,000-URL limit, so it is a growth mechanism rather than a stale subset

### External Integrations

- **Resend**: Email delivery for contact/request forms via Next.js Route Handlers
- **PayPal**: Report purchase flow via `@paypal/react-paypal-js` (CheckoutForm, PayPalButton components)
- **Image CDN**: `cdn.neographanalytics.com` configured as remote image pattern in `next.config.ts`
- **HubSpot**: Tracking script injected in root layout

### Navigation Components

Three navigation components in `components/layout/`:
- `Navigation.tsx` - Top nav with `usePathname` for active state
- `MegaMenu.tsx` - Report category dropdown with keyboard navigation (Escape + outside-click close)
- `ConsultingMenu.tsx` - Consulting services dropdown grouped by category

### Report Page Features

The `/reports/[slug]` page includes:
- 4-card market metrics grid (revenue, forecast, CAGR, geographic coverage)
- Sticky sidebar TOC with `IntersectionObserver` scroll tracking (`components/reports/TableOfContents.tsx`)
- Sticky CTA panel
- HTML content rendering for market details
- Key findings bullets, FAQ accordion, competitive landscape / key players
- Report code in `HF{id}` format

**Chart components.** Four render, all imported by
`components/reports/JsonReportSections.tsx`:
- `charts/MarketForecastLineChart.tsx`
- `charts/ComponentSharePieChart.tsx`
- `charts/RegionalBarChart.tsx`
- `charts/CountryBarChart.tsx` — share and growth by country, on **140 of 182**
  report pages (the rows with a populated `country_analysis`). It has no table
  of its own on purpose: `CountryTable` renders the same figures server-side
  directly below it, which is also why the SVG is `role="img"`

There is **no competitive-position chart and should not be one**:
`competitive_landscape` carries exactly one numeric field across all 182 rows
(`founded`, on 142), `market_position` is prose and `company_profiles.revenue`
is a string. Measured with `scripts/column-population.mjs`.

Four more exist and are imported by nothing: `charts/MarketGrowthChart.tsx`,
`charts/MarketSharePieChart.tsx`, `charts/RegionalAnalysisChart.tsx`, and
`lib/chartUtils.ts`. Before wiring any of them up, note that `chartUtils`
divides by its start value and by `years - 1`, measured:
`calculateCAGR(0, 5.6, 9)` -> **Infinity**, `calculateCAGR(1, 5.6, 0)` ->
**Infinity**, and `generateMarketProjection(0, 5.6, 2023, 2032)` -> every point
after the first is **NaN**. A single-year period (`2024, 2024`) is NaN too.
`MarketSizeChart.tsx` and
`SegmentationChart.tsx` sit at `components/reports/`, not under `charts/`, and
are also unused. They stay in place per the standing no-deletion rule; this
list says which is which so nobody debugs a chart that never runs.
`ChartFigure.tsx` is the `<figure>`/`<figcaption>` wrapper and does render.

**Two filter implementations, one live.** `components/reports/FilterSidebar.tsx`
and `components/reports/FilterSection.tsx` are **unused** — the only references
anywhere are the two re-export lines in `components/reports/index.ts`. The live
listing filter is `ReportsListingClient.tsx`, which derives its own category
counts from the corpus. `FilterSidebar` declares a 5-field `FilterState`
(industries, regions, reportTypes, priceRanges, searchQuery) while **2 of its 4
option arrays — `REPORT_TYPES` and `PRICE_RANGES` — are commented out as
"Reserved for future use"**, so `hasActiveFilters` (`:77-82`) tests two fields
nothing can set. Both files stay per the no-deletion rule; edit
`ReportsListingClient.tsx` when changing how the listing filters.

### Design System

`/components/ui/` — premium B2B component library:
- `Button` - 5 variants, loading states, sizes
- `Card` - Composable with Header/Title/Description/Content/Footer sub-components
- `Badge` - Status indicators with 6 color variants
- `Section/Container/Grid` - Layout system with responsive behavior
- `Skeleton` - Loading states with pulse animations
- Also in `components/ui/`, undocumented until now: `Breadcrumb`, `SearchBar`,
  `country-select` (the only themed `<select>`), `captcha`, `chart` (the
  Recharts container primitives) and `StyledArticleContent`

All UI components use `forwardRef` and accept a `className` prop merged with `cn()`.

```tsx
import { Button, Card, Badge } from '@/components/ui';
```

Visit `/design-system` for live component examples.

### Theming System

CSS custom properties in `app/globals.css` provide automatic dark mode:

```css
--background, --foreground, --primary, --card, --muted, etc.
```

Use via Tailwind: `bg-[var(--primary)]`. Dark mode is **class/attribute driven** (a
`.dark` block in `globals.css`), not `prefers-color-scheme` — there is no such block.
`scripts/contrast-audit.mjs` measures the token pairs in both themes.

### Typography & Fonts

**Geist Sans** (primary) and **Geist Mono** loaded via `next/font/google`. Font variables injected in root layout: `--font-geist-sans`, `--font-geist-mono`.

### Utility Functions

- `lib/utils.ts` - `cn()`, `formatDate()`, `truncate()` (there is no `slugify`)
- `lib/format.ts` - JSONB-safe formatters. **Use `marketValue()` / `unitSuffix()`**:
  not every report is in billions, and a hardcoded "B" renders $66.5M as $66.5B
- `lib/seo.ts` - `pageTitle()` (<=60 chars), `pageDescription()` (<=160), `schemaDate()`
- `lib/toc-utils.ts` - Table of contents parsing. `lib/html-toc-utils.ts` is
  the HTML variant and is **imported by nothing**; `lib/reportToc.ts` is what
  the report page actually uses
- `lib/chartUtils.ts` - **imported by nothing.** See the chart note above
- `lib/jsonReports.ts` - JSON report file utilities
- `lib/data/countries.ts` - Country + dial code list for forms

### Tailwind Configuration

Extended Tailwind config (`tailwind.config.ts`):
- Custom spacing: `18, 88, 100, 112, 128`
- Custom animations: `shimmer, fadeIn, slideIn`
- Custom max-widths: `8xl, 9xl`
- Custom easing: `in-expo, out-expo`

## Key Architectural Decisions

1. **lib/api abstraction**: All data fetching goes through `/lib/api/` — never read JSON directly from page components
2. **Server Components First**: Maximize performance by defaulting to server rendering
3. **Static JSON Data**: Simplifies content management without a database/CMS; API fallback available
4. **Component Composition**: Cards use composable sub-components vs. monolithic props
5. **CSS Variables for Theming**: Enables dark mode without JavaScript
6. **Turbopack in Development**: Faster than Webpack for local iteration

## Important Patterns

### Adding New Pages

1. Create file in `app/[route]/page.tsx`
2. Export default component (Server Component by default)
3. Add to Navigation in `components/layout/Navigation.tsx`
4. Use `Section`/`Container` for consistent layout
5. Add `generateMetadata()` for SEO

### Adding New UI Components

1. Create in `components/ui/[ComponentName].tsx`
2. Use `forwardRef` for ref forwarding
3. Accept `className` prop and merge with `cn()`
4. Export types for TypeScript support
5. Add to `components/ui/index.ts` for centralized imports
6. Document in `components/ui/README.md`

### Working with Data

1. Add/modify JSON files in `/data/`
2. Add corresponding accessor in `/lib/api/`
3. Ensure `slug` field exists for dynamic routing
4. Update TypeScript types (co-located `*.types.ts` file)
5. For dynamic routes, implement `generateStaticParams()`

### SEO

- Use `generateMetadata()` in route segments for dynamic metadata
- Add `noindex` robots meta on pages that shouldn't be indexed (e.g., `/checkout`)
- Use `StructuredData` component for JSON-LD (articles, breadcrumbs)
- Sitemaps are route handlers — add new content types to sitemap routes

### Client Interactivity

Only add `"use client"` when you need:
- React hooks (`useState`, `useEffect`, `usePathname`)
- Browser APIs
- Event handlers

## TypeScript Conventions

- Components use React.FC or direct function exports
- Props interfaces export alongside components
- Use `type` for component props, `interface` for extensible objects
- All `@/` imports use TypeScript path mapping

## Publishing content is paired with a deploy

`app/reports/[slug]/page.tsx` and `app/blog/[slug]/page.tsx` set
`dynamicParams = false`. A Supabase row that was not in the last build's
`generateStaticParams()` **404s**, while `/reports` — ISR, hourly — already shows
a card for it. Publish only when a deploy can follow within the hour, reports
before the articles that link to them. `DEPLOY-RUNBOOK.md` has the sequence.
Edits to rows that are already built (meta fields, prose) reach production
through ISR with no deploy.

## Checkers

```bash
node scripts/report-db.mjs check content/reports/*.json   # drafts, offline
node scripts/report-db.mjs columns                        # the table's 32 columns
node scripts/audit-html.mjs [--prod]                      # 18 routes, headless
node scripts/column-population.mjs [--depth <col>]        # which JSONB columns carry data
node scripts/contrast-audit.mjs                           # token contrast, both themes
node scripts/report-db.mjs audit                          # SEO lengths corpus-wide
node --experimental-strip-types scripts/seo-unit.mjs      # lib/seo.ts helpers, offline
node --experimental-strip-types scripts/api-unit.mjs     # lib/api/pgrst.ts helpers, offline
node scripts/source-hygiene.mjs                           # eaten regex escapes, offline
```

Supabase egress is metered and the report rows carry large JSONB columns: never
`select('*')` for a list view, and memoise any query that would otherwise run
once per page in a 152-page build. To ask whether a column is populated at all,
select its **first element** (`country_analysis->0`) rather than the array —
that is what `scripts/column-population.mjs` does, and it answers the question
for all 182 rows at the cost of 182 small objects.

`audit-html.mjs` reads the built HTML under `.next/server/app`, and both it and
`next.config.ts` honour **`NEXT_DIST_DIR`**. Use it whenever another session may
have a dev server running: `next dev` rewrites `.next` continuously, and a build
racing it fails mid-export with `PageNotFoundError: Cannot find module for page:
/reports/[slug]/page` naming an arbitrary report route — a failure that looks
like a defect in that page and is not one.

```bash
NEXT_DIST_DIR=.next-verify npm run build
NEXT_DIST_DIR=.next-verify node scripts/audit-html.mjs
git checkout -- tsconfig.json   # the build adds <distDir>/types to `include`
```

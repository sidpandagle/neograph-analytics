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

The dev server runs on `http://localhost:3000` with Turbopack for ultra-fast HMR.

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

Content is sourced from **static JSON files** in `/data/`:
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
- `forms.ts` - Form submission handling (contact, request-sample, request-demo)
- `orders.ts` - Checkout/order data
- `mappers.ts` - Transforms API responses to UI-ready format
- `config.ts` - API base URL configuration

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
- `/request-demo` - Request demo page
- `/checkout/[reportSlug]` - PayPal-powered checkout
- `/order-success` - Post-purchase confirmation
- `/llms.txt` - LLM crawler endpoint
- `/sitemap-pages.xml`, `/sitemap-consulting.xml` - SEO sitemaps

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

**Chart components** (`components/reports/charts/`):
- MarketSizeChart, SegmentationChart, RegionalAnalysisChart
- MarketForecastLineChart, MarketSharePieChart, ComponentSharePieChart

### Design System

`/components/ui/` — premium B2B component library:
- `Button` - 5 variants, loading states, sizes
- `Card` - Composable with Header/Title/Description/Content/Footer sub-components
- `Badge` - Status indicators with 6 color variants
- `Section/Container/Grid` - Layout system with responsive behavior
- `Skeleton` - Loading states with pulse animations

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

Use via Tailwind: `bg-[var(--primary)]`. Dark mode switches automatically via `prefers-color-scheme`.

### Typography & Fonts

**Geist Sans** (primary) and **Geist Mono** loaded via `next/font/google`. Font variables injected in root layout: `--font-geist-sans`, `--font-geist-mono`.

### Utility Functions

- `lib/utils.ts` - `cn()`, `formatDate()`, `slugify()`, `truncate()`
- `lib/toc-utils.ts`, `lib/html-toc-utils.ts` - Table of contents parsing from JSON/HTML
- `lib/chartUtils.ts` - Chart data processing
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

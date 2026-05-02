# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

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

## Architecture Overview

### Next.js 15 App Router Structure

This is a **server-first architecture** using Next.js 15 App Router with React 19:

- **Default to Server Components**: All components in `app/` are Server Components unless marked with `"use client"`
- **Client Components**: Only used when needed for interactivity (e.g., `Navigation.tsx` uses `usePathname`)
- **Static Generation**: Report and blog detail pages use `generateStaticParams()` for build-time generation
- **Layout System**: Root layout wraps all pages with persistent Header/Footer

### Data Architecture

Content is sourced from **static JSON files** in `/data/`:
- `reports.json` - Research reports with slug-based routing
- `blogs.json` - Blog posts with author/date metadata
- `categories.json` - Content categories

**Dynamic routes** (`/reports/[slug]`) fetch data by matching slugs at build time.

### Design System (Phase 2)

The project implements a **premium B2B design language** in `/components/ui/`:

**Core Principles:**
- Neutral colors (white, gray, dark blue) via CSS custom properties
- Minimal animations (200ms transitions)
- Enterprise-grade spacing and responsive grids
- Server Component compatible (all UI components use `forwardRef`)

**Component Library:**
- `Button` - 5 variants, loading states, sizes
- `Card` - Composable with Header/Title/Description/Content/Footer sub-components
- `Badge` - Status indicators with 6 color variants
- `Section/Container/Grid` - Layout system with responsive behavior
- `Skeleton` - Loading states with pulse animations

**Import pattern:**
```tsx
import { Button, Card, Badge } from '@/components/ui';
```

### Theming System

CSS custom properties in `app/globals.css` provide automatic dark mode:

```css
--background, --foreground, --primary, --card, --muted, etc.
```

Use via Tailwind: `bg-[var(--primary)]`

Dark mode switches automatically via `prefers-color-scheme`.

### Typography & Fonts

- **Geist Sans** (primary) and **Geist Mono** loaded via `next/font/google`
- Font variables injected in root layout: `--font-geist-sans`, `--font-geist-mono`
- High readability hierarchy via CardTitle/CardDescription components

### Utility Functions

`lib/utils.ts` provides:
- `cn()` - Combines `clsx` + `tailwind-merge` for safe className merging
- `formatDate()` - Consistent date formatting
- `slugify()` - URL-safe slug generation
- `truncate()` - Text truncation with ellipsis

### Routing & Navigation

Navigation uses client-side `usePathname` hook for active state highlighting. Routes:
- `/` - Home page
- `/reports` - Report listing (grid)
- `/reports/[slug]` - Individual report (static generation)
- `/blog` - Blog listing (grid)
- `/design-system` - Design system showcase (interactive demo)

### Tailwind Configuration

Extended Tailwind config (`tailwind.config.ts`) includes:
- Custom spacing: `18, 88, 100, 112, 128`
- Custom animations: `shimmer, fadeIn, slideIn`
- Custom max-widths: `8xl, 9xl`
- Custom easing: `in-expo, out-expo`

## Key Architectural Decisions

1. **Server Components First**: Maximize performance by defaulting to server rendering
2. **Static JSON Data**: Simplifies content management without a database/CMS
3. **Component Composition**: Cards use composable sub-components vs. monolithic props
4. **CSS Variables for Theming**: Enables dark mode without JavaScript
5. **Turbopack in Development**: Faster than Webpack for local iteration

## Important Patterns

### Adding New Pages

1. Create file in `app/[route]/page.tsx`
2. Export default component (Server Component by default)
3. Add to Navigation in `components/layout/Navigation.tsx`
4. Use Section/Container for consistent layout

### Adding New UI Components

1. Create in `components/ui/[ComponentName].tsx`
2. Use `forwardRef` for ref forwarding
3. Accept `className` prop and merge with `cn()`
4. Export types for TypeScript support
5. Add to `components/ui/index.ts` for centralized imports
6. Document in `components/ui/README.md`

### Working with Data

1. Add/modify JSON files in `/data/`
2. Ensure `slug` field exists for dynamic routing
3. Update TypeScript types if adding new fields
4. For dynamic routes, implement `generateStaticParams()`

### Client Interactivity

Only add `"use client"` when you need:
- React hooks (`useState`, `useEffect`, `usePathname`)
- Browser APIs
- Event handlers (onClick, etc.)

Keep Server Components for static content rendering.

## Design System Usage

Visit `/design-system` to see all components with live examples.

**Maintain consistency:**
- Use `Section` component for vertical rhythm
- Apply `hover` prop to Cards for interactive content
- Use Badge variants consistently (success=green, danger=red, warning=yellow)
- Leverage Grid component for responsive layouts
- Show Skeleton loaders during async operations

## TypeScript Conventions

- Components use React.FC or direct function exports
- Props interfaces export alongside components
- Use `type` for component props, `interface` for extensible objects
- All `@/` imports use TypeScript path mapping

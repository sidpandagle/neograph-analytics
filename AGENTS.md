# AGENTS.md

Guidance for agents working in this repository. Last corrected 2026-10-16; the
previous version described a JSON-file site with no database, which stopped
being true some time ago.

## What this site is

A healthcare and life-sciences **market-research publication**, not a lead-gen
site. The value is depth of analysis and figures a reader can check. Two rules
follow from that and outrank everything else here:

- **Never publish a number without a source.** Where a figure is not publicly
  disclosed — vendor market share above all — the section is omitted, not
  estimated. An empty array renders as an absent section, which is honest.
- **Every headline is divided through by something countable** before it is
  published. See `/methodology` for the public statement of this, and
  `research/REPORT-AUTHORING-BRIEF.md` for the working contract.

## Commands

```bash
npm run dev                    # Turbopack dev server
npm run build                  # production build; prerenders every report page
npm start -- -p 3100           # serve a build. NEVER use 3000 — that port is Siddhant's
npm run lint

node scripts/report-db.mjs check content/reports/*.json   # report drafts, offline
node scripts/report-db.mjs publish content/reports/*.json # upsert to Supabase
node scripts/report-db.mjs audit                          # SEO lengths across the corpus
node scripts/blog-db.mjs check content/blogs/*.json --online
node scripts/audit-html.mjs [--prod]                      # 16 routes, headless
node scripts/contrast-audit.mjs                           # token contrast, both themes
python scripts/budget-check.py                            # spend guardrail
```

A stale `next start` holding a port and serving old code has produced a false
pass twice. Confirm the process before trusting local output:
`netstat -ano | grep ":3100"`, then
`Get-CimInstance Win32_Process -Filter "ProcessId=<pid>"`.

## Data: Supabase is canonical, the JSON files are snapshots

| Source | Rows | Status |
|---|---|---|
| `neograph_reports` (Supabase) | **152** | **canonical** |
| `data/reports.json` | 12 | stale snapshot; feeds nothing load-bearing |
| `data/all_reports.json` | 10 | fallback behind `lib/supabaseReports.ts` only |
| `data/all_reports bulk.json` | 107 | historical, unused |
| `data/all_reports old.json` / `all_reports_old.json` | 104 | historical, unused |
| `data/blogs.json`, `data/press-releases.json` | 6, 5 | fallbacks; the tables are canonical |
| `data/categories.json` | 12 | slug/description map only — **6 of its 12 match no report**, so UI reads live industries and uses this file for slugs |
| `data/team-members.json`, `testimonials.json`, `consulting-services.json` | 3, 10, — | still file-backed |

The snapshots are kept on purpose: they are the fallback that stops a Supabase
outage rendering an empty site. Do not delete them, and do not add rows to them
expecting the site to change — publish to Supabase instead.

Access layers:

- `lib/supabaseReports.ts` — full report rows for the detail page, JSON fallback.
- `lib/api/reports.ts` — `getReports()` (full rows), `getReportCards()` (11
  surface columns for the listing), `getReportSitemapEntries()` (`slug,published_year`).
- `lib/api/home.ts` — counts, hero snapshot, search index, live categories.
- `lib/api/relatedReports.ts` — the related-report block, one memoised corpus select.

**Egress discipline.** Supabase free tier meters egress and these rows carry
large JSONB columns. Never `select('*')` for a list view; select the columns the
view reads. A query that runs per page in a 152-page build must be memoised.

## Publishing and deploying are one sequence

`app/reports/[slug]/page.tsx` and `app/blog/[slug]/page.tsx` set
`dynamicParams = false`. A row that exists in Supabase but was not in the last
build's `generateStaticParams()` **404s**, while the listing — ISR, hourly —
already shows a card for it. So content is published only when a deploy can
follow within the hour, reports before the articles that link to them.
`DEPLOY-RUNBOOK.md` has the full sequence. Edits to rows that are *already*
built (meta fields, prose corrections) are different: they reach production
through ISR with no deploy.

## Architecture

Next.js 15 App Router, React 19, server-first. `"use client"` only for hooks,
browser APIs and event handlers.

- **Report page**: `JsonReportSections` renders every section from structured
  columns. Charts sit in `<figure>` with a source caption (`ChartFigure` +
  `lib/chartAttribution.ts`). Each page ends with `RelatedReports`.
- **Social cards**: `app/reports/[slug]/opengraph-image.tsx` renders a 1200x630
  card per report at build time. Do not set `openGraph.images` in
  `generateMetadata` — it overrides the file convention and the cards go unused.
- **Theming**: CSS custom properties in `app/globals.css`, with a `.dark` block.
  Dark mode is class/attribute driven, **not** `prefers-color-scheme` — there is
  no such block, whatever older docs say.
- **Fonts**: Geist Sans and Geist Mono via `next/font/google`.
- **Utilities**: `lib/utils.ts` exports `cn()`, `formatDate()`, `truncate()`
  (there is no `slugify`). `lib/format.ts` has the JSONB-safe formatters,
  including `marketValue()` / `unitSuffix()` — **use them**: not every report is
  in billions, and a hardcoded "B" renders $66.5M as $66.5B.
- **SEO**: `lib/seo.ts` — `pageTitle()` keeps a title inside 60 characters,
  `pageDescription()` inside 160, `schemaDate()` makes a schema.org Date.

## Routes

`/`, `/reports`, `/reports/[slug]`, `/methodology`, `/blog`, `/blog/[slug]`,
`/press-releases`, `/press-releases/[slug]`, `/services`, `/consulting/[slug]`,
`/about`, `/contact`, `/request-sample`, `/legal/[slug]`, `/authors/[id]`,
`/checkout/[reportSlug]`, `/order-success`, `/design-system` (noindex),
`/llms.txt`, `/sitemap.xml`, `/sitemap-pages.xml`, `/sitemap-consulting.xml`,
`/api/sitemap-reports/[page]`.

`/consulting` and `/categories/*` do **not** exist as pages: the first 308s to
`/services`, the second 404s. Do not link or advertise them — `/llms.txt` did
both and shipped 24 dead links to crawlers.

## House rules

- **Delete nothing.** Supersede instead; unused code stays with a header saying
  why it is unused.
- **Never commit to `main`.** Branch, PR, squash-merge. Repo-local git identity
  only; never touch the global config.
- **Install nothing globally**, and nothing at all from a research agent.
- Keep Supabase and Cloudflare inside their free tiers.
- Findings carry numbers. "The caption looks faint" is not a finding; "4.7:1
  against the card" is.
- Reviewer output is a hypothesis. Both audit scripts in `scripts/` carry
  comments about rules they got wrong before they got them right.

## Where the state lives

- `STATUS.md` — current task, budget, merge slots used today (IST), blockers.
- `WORKLOG.md` — append-only; every change with the measurement behind it.
- `BACKLOG.md`, `REVIEW-QUEUE.md` — queues; items move, never vanish.
- `research/REPORT-PIPELINE.md` — the report expansion, topic by topic.
- `AUTOPILOT.md` — operating rules for the unattended session.

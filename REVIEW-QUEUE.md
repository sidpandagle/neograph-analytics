# UI/UX REVIEW QUEUE

A standing, continuously-running design review. A reviewer agent audits the live
site and this repo on a rotating focus every ~3 hours, headless — no browser
window is ever opened. Findings land here with a measured fact attached, get
fixed in commit-budget order, and are struck through when verified in
production.

**Every finding must carry a number.** A contrast ratio, a byte count, a
character count, a quoted class string. If it cannot be measured it does not get
filed, because an unmeasured design opinion cannot be verified as fixed.

**Updated:** 2026-10-17 16:3x IST
**Rotation:** typography & rhythm -> dataviz -> colour & interaction states ->
responsive 640-1024px -> editorial UX -> perceived performance

---

## Browser access

Chrome / chrome-devtools MCP may be used **only 21:00-09:00 IST**. Outside that
window every measurement is headless and must be described as *modelled*, not
observed. The reviewer agent gets this rule in its brief every cycle.

## Staged, verified in a browser, awaiting a commit slot

Budget was 5/5 when these were found, so they are fixed in the working tree and
land at the first slot after 00:00 UTC.

| Finding | Before | After |
|---|---|---|
| **Header 280px narrower than the page content.** `max-w-desk` was a hardcoded Tailwind 1240px while `.desk` reads `--desk-max`, which PR #10 stepped to 1520px. Only the header consumed the stale token. **Regression I introduced in #10.** | header 1240px vs content 1520px | both **213->1693**, measured in Chrome at 1920px |
| **Share bars encoded rank, not magnitude** — divided by the largest row, so the top row was always a full bar. A factual misstatement on a data publication. | US 25% rendered **100% full** | US 25.0% -> **25%** bar, China 20%, India 15% |
| **3 of 4 Market Dynamics tabs unreachable by keyboard.** Roving `tabIndex` with no arrow handler. **Regression I introduced in #8** — the markup read as more accessible than plain buttons. | 1 of 4 reachable | all 4; Arrow/Home/End verified, wraps correctly |
| **Homepage claimed "over 2,500 research reports spanning 20+ sectors and 50+ countries"** one scroll below the hero's correct "142 across 6". | 3 corpus sizes on one page | claim removed; hero is sole source of truth |
| **Left rail overhung the hero by ~155px.** 13 items at 48px pitch. | rail ~721px | **645px**, pitch 42px, measured |
| Negative growth rendered as `+-2.1%` | latent | sign handled |
| **Every report page declared a licence URL that 404s** — `Dataset.license` pointed at `/legal/terms-of-use`, and the legal pages are privacy, refund and cancellation only | 152 pages x 1 broken licence assertion; `/legal/terms-of-use` -> **404** | the field is removed rather than pointed at an unrelated policy. It returns when a terms-of-use page exists (**R-11**, legal copy is Siddhant's) |
| **`datePublished` was not a date** on every report, article, press release and legal page | reports emitted `"2026"`; articles and press releases emitted `"December 18, 2025"` | `schemaDate()` normalises to a calendar date (`2026-01-01` for a year-only row — the honest reading of "we know the year, not the day"). The HTML audit now fails any non-calendar date, so it cannot come back |
| **Form field borders were effectively invisible** — fields used `--border`, not the `--input` token that exists for them | **1.07:1** on the desk, 1.22:1 on a card (light); 1.72 / 1.55 (dark). WCAG 1.4.11 asks 3:1 of a field border, which *is* the affordance | `--input` re-measured to #7684A6 light / #5A6FA3 dark: **3.30 / 3.74** and **3.80 / 3.43**. 23 field borders across contact, request-sample, the blog form and 404 repointed |
| **`country-select` ignored the theme entirely** — raw `gray-*` and `purple-*` classes, used on both live forms | dark mode: `text-gray-900` #111827 on `--card` #131C30 = **1.02:1**, i.e. the selected country was invisible | every class repointed to tokens; purple (which appears nowhere else on the site) gone |
| **Header dropdowns painted behind page content** (reported by Siddhant with a screenshot: the Consulting mega-menu sat under the hero search bar and the chart card) | menu invisible behind panels on every page | the `<header>` carries `backdrop-blur-xl`, and a backdrop-filter **creates a stacking context** — so the menu's `z-50` only ranked it inside the header, while the header itself sat at `z-index: auto`. Header wrapper is now `relative z-[60]`, above the `z-50` used inside pages and below the `z-100` skip link. Verified present on 6 built pages |
| **FAQ +/x toggle sat off-centre in its circle** (reported by Siddhant) | text glyph "+" rotated 45deg | a glyph centres by line box, not by the plus's crossing point, and rotating it turns it about that same off-centre origin. Replaced with two SVG strokes centred by geometry: both states land dead centre in any font |
| **`/reports` RSC payload** (was R-2) | 508KB for 142 reports | **184KB for 152** (-64%): a card projection in `getReportCards()`, then only the 13 fields the client interface declares crossing to the browser. 12 cards and the client filter unchanged. Pagination is no longer worth the complexity at this size |
| **`/design-system` renders 2 `<h1>` and has no canonical** (was R-6) | robots-disallowed, so impact is confined | h1 count 2 -> 1 (the second was a type specimen, now a styled `p`); canonical and explicit `noindex, nofollow` added via a new layout, since the page itself is a client component |
| **Focus ring `#1541E3` on the blue hero panels = **1.00:1**; on the footer = 2.46:1. WCAG 1.4.11 needs 3:1** (was R-0e) | keyboard focus invisible on the primary CTAs | two-tone ring (ink + paper, inverted in dark): 18.72 / 7.25 / 18.72:1 across white card, blue panel and ink footer. **Confirmed in Chrome 2026-10-16 23:2x**: focused CTA shows `outline: 2px solid white` + ink inner ring, `:focus-visible` matching |
| **`meta_description` over 160 chars on 14 of 142 rows** (was R-3) | needs editorial judgement per row, not pattern substitution | corpus-wide pass: 14 descriptions over 160 and 45 titles over 60 -> **0 and 0** across all 152 rows |
| **9 of 10 testimonials are non-healthcare, under the heading "What healthcare executives say" — incl. a vehicle-engineering principal engineer and a football club director** (was R-0f) | West Ham United, Mitsubishi Motors R&D, Clorox, Singapore Tourism Board | section no longer rendered; component and data left in place |
| **Region filter: **142 of 142** reports are `Global`, so 5 of 6 options return nothing and the 6th returns everything** (was R-0c) | `"region":"Global"` x142 | region select dropped while one distinct value exists; it returns when regional rows do |
| **6 of 12 category chips and mega-menu entries match **zero** reports (Clinical Diagnostics, Healthcare Services, Laboratory Equipment, Therapeutic Area, Dental, Animal Health)** (was R-0b) | counted in the live `/reports` RSC payload | chips and tiles now derived from the corpus: 6 live categories with counts (38/39/16/6/23/20 = 142) |
| **No `error.tsx` or `global-error.tsx` anywhere** (was R-5) | an unhandled render error shows the bare Next.js error page | fixed — see below |
| **Charts have no `<figure>`/`<figcaption>`; `charts[].data_source` is populated in the data and never rendered** (was R-1) | field present on report rows, 0 occurrences in built HTML | fixed — see below |
| **Site promises methodology and sources in 3 places; **0** reachable source attributions exist and there is no `/methodology` route** (was R-0g) | `charts[].data_source` populated, never rendered | fixed — see below |

## Open

| # | Severity | Finding | Measured evidence |
|---|---|---|---|
| R-13 | medium | **Nothing paints for ~1.3s on a server-rendered text page.** Clean isolated browser context, production `/methodology`: **TTFB 89ms, FCP 1,316ms, LCP 1,316ms** (they are the same event), CLS 0.035. The same page measured 3,921ms in the everyday profile, so most of *that* was the profile — but 1.3s to first paint with an 89ms TTFB is the site. Google Analytics **is** present after all (`@next/third-parties` `GoogleAnalytics` in `app/layout.tsx:114` injects gtag client-side, which is why it is absent from the static HTML and why the first check missed it). Charts are ruled out: the chartless page is slower than a report page. **Headless pass 2026-10-17, built `/methodology` HTML, in document order:** two render-blocking stylesheets totalling **74.6KB** (66,374 + 8,244 bytes), then **13 `async` chunk scripts in `<head>`**, then `<link rel="preload" href="https://www.googletagmanager.com/gtag/js?id=G-NJ1DNL58KB" as="script">` — **with no `fetchPriority`, so it is a High-priority preload to a third-party origin** (DNS + TLS + fetch) competing with the stylesheets, while Next's own webpack chunk preload beside it *is* marked `fetchPriority="low"`. Correcting the earlier note: gtag is **not** absent from the static HTML — that preload link is in it on every page. Also **0 font preload links** despite `preload: true` on both `next/font` families, so the 8 woff2 files are discovered only after the CSS parses; `display: swap` means that costs a swap, not the first paint. Next (needs the 21:00-09:00 browser window): trace with googletagmanager blocked at the network layer to size its share, then decide between `strategy="lazyOnload"` for GA and splitting the 66KB stylesheet | Chrome, isolated context, production; byte counts and tag order from the local build |
| ~~R-14~~ | **fixed 2026-10-17** | **Every checkout purchase inquiry was dropped on the floor.** `CheckoutForm.handleSubmit` called `setSubmitted(true)` and nothing else, then rendered "Our team will contact you at <email>" - there was no request, no email, no store. Found while verifying R-4 | 0 network calls in the handler; `lib/api/orders.ts` throws and is called by nothing. Now POSTs `/api/purchase-inquiry` (Resend, same guard as `/api/contact`); success panel only on a confirmed send; 400s verified for missing email, bad email and malformed body |
| ~~R-15~~ | **fixed 2026-10-17** | **22 non-healthcare reports were filed under `Life Sciences`** - lunar mining, undersea cable, green hydrogen, high-entropy alloys, precision-farming drones, quantum networking. The mega-menu tiles and `/reports` chips both derive from `industry`, so the taxonomy misfiled them and the vertical count read 6 | 28 rows relabelled into 7 industries; corpus now reports **13 verticals**, counted from the data, not written |
| ~~R-11~~ | **fixed 2026-10-17** | No terms-of-use page existed, so `Dataset.license` had been removed from all 182 report pages | `/legal/terms-of-use` published (10 sections, ~5.9KB); licence restored and asserted once per report page; footer link added; `audit-html.mjs` now fails any ld+json `license` pointing at a route the build does not render (negative-tested) |
| ~~R-23~~ | **fixed 2026-10-17** | **The featured-reports subheading was a hand-written industry list that the taxonomy had outgrown.** It read "Oncology, medical devices, diagnostics, digital health and life sciences" — true of the healthcare-only corpus, and no longer true after R-15 widened the taxonomy to **13 verticals**. The six cards are ordered by publication date, so the first frontier-technology report to top the list would have appeared under a healthcare-only heading. The predecessor of this same sentence is the "2,500 reports spanning 20+ sectors and 50+ countries" claim already struck above — the third hand-maintained corpus claim on this page | the sentence is now `Intl.ListFormat` over the distinct `industry` values of the six rows the section already fetches, so it cannot fall out of step: today it renders **"Medical Devices, Life Sciences, Pharmaceuticals, and Healthcare IT."** from 4 distinct industries across the 6 cards |
| ~~R-19~~ | **fixed 2026-10-17** | **`/about` and `/services` were still painted in raw Tailwind slate on themed surfaces, so both pages are near-unreadable in dark mode.** Both pages wrap their content in `bg-[var(--card)]` / `bg-[var(--cmi-surface)]` panels, which do flip, while the type on top did not. Measured against the dark tokens `--card #131C30`, `--background #0B1120`, `--muted #18223A`: `text-slate-900` **1.05 / 1.05 / 1.13:1** (every h2 and h3 on both pages), `text-slate-600` **2.24 / 2.48 / 2.09:1** (mission and who-we-are body copy, service bullets), `text-slate-500` **3.57 / 3.96 / 3.32:1** (all six why-us descriptions, every service blurb, every process step), `text-slate-700` **1.64 / 1.82 / 1.53:1** (the pull quote). WCAG AA asks 4.5:1 for body text. The same defect class as the `country-select` finding, left behind on the two pages that were never converted | 22 classes repointed to tokens (14 in `app/about/page.tsx`, 8 in `app/services/page.tsx`): ink -> `--cmi-ink`, body -> `--cmi-body` (**6.00:1** light), meta -> `--cmi-meta` (**4.60:1** light), hairlines -> `--cmi-line`, the hover border -> `--cmi-primary` to match every other card on the site. A repo-wide scan confirms **0** `text-slate-*` / `text-gray-*` classes remain anywhere in `app/` or `components/` outside one `<svg>` stroke in `not-found.tsx:164`, which sits on its own `bg-slate-100` chip and so keeps its ratio — that pair belongs to **R-20** |
| ~~R-20~~ | **fixed 2026-10-17** | **Every status panel, chip and glyph on the site was a raw Tailwind pair that did not flip for dark mode** — `bg-red-50`+`border-red-200`+`text-red-800` error panels, `bg-blue-100`+`text-blue-600` round icon chips, `bg-blue-50`+`text-blue-800` note panels, `bg-green-100`+`text-green-600` order-confirmed ticks, `bg-amber-50`+`text-amber-600` accents, and one `bg-purple-100` chip of a hue that appears nowhere else on the site. None were contrast failures — each pale fill carries its own dark foreground, so the pair keeps its ratio — but every one stayed a light chip on a dark page. **1 of 35 call sites** had a `dark:` variant triple (`CheckoutForm.tsx:176`), which is what a hand-written approach gets you | **13 new tokens** in both theme blocks (`--status-{error,info,success,warn}-*`). Light values are the exact Tailwind hexes they replace, so light mode is unchanged to the pixel; the dark values are new. **68 raw classes repointed across 16 pages and components**, and `app/` + `components/` now contain **0** raw Tailwind palette classes in live markup — the only matches left are inside the `country-select` docstring. `contrast-audit.mjs` gained **12 measured pairs** so these are checked, not asserted: text on its own panel **7.60–11.83:1**, glyphs **3.00–9.51:1** against 1.4.11's 3:1, in both themes. The dark fills are deliberately quiet against the card (**1.12–1.41:1**, below the site's own **1.55:1** card hairline) and it is the border that makes a panel perceivable (**1.88:1** error, **2.41:1** note). Rendered confirmation still waits for the night window |
| R-21 | low | **The four impact stats on `/about` were given a divider colour and no divider.** `app/about/page.tsx:182` reads `grid grid-cols-2 lg:grid-cols-4  divide-white/[0.06]`: the Tailwind `divide-{color}` utility only sets the colour, and without a `divide-x` / `divide-y` beside it the border width stays 0, so **0 of the 3 intended rules render**. Left in place rather than guessed at — `divide-x` on a 2-up grid would also stripe the row starts, so which rule was wanted is a design call | 1 class, 0 dividers rendered, measured from the built HTML |
| R-22 | low | **Above 769px a wide table in report prose has no scroll container.** `.prose table` sets `width: 100%` and `overflow: hidden` (there to clip its own rounded corners), and the only escape — `display: block; overflow-x: auto` — is inside `@media (max-width: 768px)`. So a table whose columns need more than the prose column gets no scrollbar on a tablet or narrow desktop; whether the cells are then clipped by the table box or push the page into horizontal scroll depends on how the browser applies `overflow` to a table box, which is exactly the kind of mechanism this queue is not allowed to assert without looking. **Both the defect and its mechanism are unobserved:** 0 of the 22 rows in the local snapshots contain a `<table>`, and the report pages in this build emit none, so nothing published exercises it. Needs one rendered check in the 21:00-09:00 window with a deliberately wide table, before any fix | `app/globals.css:809` (`width: 100%; overflow: hidden`) vs `:845` (the scroll rule, behind `max-width: 768px`); `<table>` count in `data/reports.json` + `data/all_reports.json` = **0 of 22** |
| ~~R-17~~ | **fixed 2026-10-17** | **Every trimmed report title silently lost its letter "s".** `marketName()` in `lib/seo.ts` collapsed whitespace with `/s+/` where `/\s+/` was meant, so the literal letter was replaced by a space: "Global Liquid Biopsy Market" rendered **"Global Liquid Biop y Market"** on all 6 related-report cards of every report page and in each report's OpenGraph image. The same file's docstring already warned that a tool had eaten its escapes once; it had happened twice | 2 call sites (`lib/api/relatedReports.ts:203`, `app/reports/[slug]/opengraph-image.tsx:37`) x 182 rows. Fixed, and `scripts/seo-unit.mjs` (16 offline assertions, no network) now fails on it |
| ~~R-18~~ | **fixed 2026-10-17** | **`datePublished` was a day early on any long-form date, depending on where the build ran.** `schemaDate()` parsed "December 18, 2025" as *local* midnight and then read it back through `toISOString()`, which converts to UTC first — so an IST build emitted **2025-12-17** and a Vercel (UTC) build emitted the correct day. Structured-data dates should not be a function of the builder's timezone | reproduced offline: `schemaDate('December 18, 2025')` -> `2025-12-17` at UTC+5:30. Now read back from the same zone's calendar fields; asserted in `scripts/seo-unit.mjs` |
| ~~R-12~~ | **fixed 2026-10-17** | ~~Related-report cards print the full stored title including boilerplate — "Global Cell & Gene Therapy Manufacturing Market — Growth Drivers, Restraints and Future Outlook 2032". The social card already trims at the first whole word "Market"; the same trim belongs in `RelatedReports`~~ — `marketName()` is applied in `relatedReports.ts:203`, and verifying it is how **R-17** was found | observed in Chrome, 6 cards per report page |
| R-11 | low **[H]** | There is no terms-of-use page. The `Dataset` schema wanted to cite one as the licence for the published figures, and a research publication reasonably has one. Legal copy is not mine to write — if you want it, the three existing legal pages show the shape | `/legal/terms-of-use` 404s; legal pages are privacy, refund, cancellation |
| R-10 | medium **[H]** | **26 of 152 corpus rows are not healthcare** — `agritech-*` (4), `climate-tech-*` (4), `space-economy-*` (4), `quantum-technology-*` (4), `digital-infrastructure-*` (3), `advanced-materials-*` (4), `synthetic-biology-*` (3) — on a site that describes itself as a healthcare research publication, and they are filed under the same `industry` values as the healthcare rows (`liquid-biopsy-market` and `agritech-vertical-farming-led-market` are both "Life Sciences"). Keep them and widen the positioning, or move them behind a separate section? Either is defensible; neither is mine to choose. Meanwhile the listing says "research sectors" rather than "healthcare sectors", which is true either way, and `relatedReports` enforces a hard boundary so the two sets never appear next to each other | 26 of 152 rows, counted by slug prefix |
| ~~R-9~~ | **answered 2026-10-17** | Owner confirms all 12 client marks in the logo marquee are real relationships. No change; recorded as answered, not fixed | 12 logos, owner-confirmed |
| ~~R-0~~ | fixed #14 | `/reports` search filters a **10-row** `all_reports.json`, not the 142 passed from the server — typing anything hides 93% of the catalogue | `len(all_reports.json)` = 10 vs 142 live; also ships 206KB of JSON to the client |
| ~~R-4~~ | **answered 2026-10-17** | Owner confirms $2,995 / `InStock` is the real offer, so the schema stays. Verifying it found the real defect: the checkout form sent the lead **nowhere** - see below | price confirmed; `handleSubmit` was `setSubmitted(true)` and nothing else |
| ~~R-7~~ | fixed #15 | CLAUDE.md documents automatic dark mode; no `prefers-color-scheme` block exists | 0 matches in `app/globals.css` |

## Fixed and verified in production

- ~~**Grey ramp failed WCAG AA.**~~ `--cmi-meta`/`--content-muted` were `#8A97B2`
  = **2.59:1** on the page background, failing even the 3:1 large-text floor.
  Now 4.60 / 6.00 / 8.09, hue 220.5deg preserved, darkening only. (#12)
- ~~**Analyst prose at 12px.**~~ Four `text-xs leading-relaxed` paragraphs to
  14px. Labels and uppercase meta stay at 12px. (#12)
- ~~**Prose measure unbounded**~~ at roughly 89 chars/line once the centre
  column reached ~690px. Capped at `64ch`; tables and charts unaffected. (#12)
- ~~**`/press-releases` title 62 chars**~~ after the layout template appended
  `" | NeoGraph Analytics"`. Now 53. (#12)
- ~~Rails at `col-span-2` of 12~~ -> 3/6/3. (#10)
- ~~`--desk-max` 1240px left ~330px dead each side at 1900px~~ -> 1400/1520px
  step-ups. (#10)
- ~~28 headings before every `<h1>`~~ -> 0; duplicate `<main>` -> 1. (#8)
- ~~`/reports` and `/request-sample` server-rendered nothing~~ — `useSearchParams`
  SSR bailout. h1 0->1, report links 0->12. (#9)

## Dismissed — do not re-file

| Finding | Why |
|---|---|
| `/order-success` missing canonical | the page is `noindex`, so it is not eligible for canonicalisation. This was a false positive in the audit script's own rule, since corrected. |
| `/authors/[id]` returns 404 | nothing links it and it is in no sitemap. A legitimate 404, not a defect. |
| 12px uppercase labels, badges, table headers | 12px is correct for that role. Only *prose* at 12px was a defect. |
| Competitive share percentages for OIS | current share is not publicly disclosed; circulating figures date to 2011/2013. Deliberately omitted. |
| **R-8** — author/team avatars point at a non-resolving CDN | Stale. Measured: `image_url` is **empty on all 3** `neograph_team_members` rows and `imageUrl` is empty in `data/team-members.json`, and both render sites guard on it — `MeetTheTeam` falls back to initials, `/authors/[id]` only adds an OG image when one exists. No broken image is served. The only reference left to `cdn.neographanalytics.com` is the `remotePatterns` entry in `next.config.ts`, which costs nothing while the host stays NXDOMAIN. |
| **R-0d** — `.prose` never applies to a report page | True, and correct as it stands. `StyledReportContent.tsx` post-processes an HTML blob (wrapping images, lazy loading, reserving dimensions) and the report page has no HTML blob: every section comes from structured Supabase columns through `JsonReportSections`, which styles its own prose against the measured `--content-*` ramp. The only HTML field left in the type graph is an optional `marketDetails` that no row populates and no component reads. The component is kept and now carries a header saying when it would be wired back in. |

## Two audit rules that were themselves wrong

Worth recording, because a reviewer that reports its own bugs as site defects
wastes commits:

1. Counted `&amp;` as five characters when measuring title length, falsely
   flagging `/blog` and `/services`. Fixed with `html.unescape()` before `len()`.
2. Flagged buttons as icon-only when they contained visible text. Fixed to
   require genuinely empty text content.
3. Flagged `noindex` pages for a missing canonical. Fixed as above.

**And the standing lesson from a false negative:** a stale `next start` on :3100
served old code and produced a confident, wrong "still 404" result. *Verify the
server is the one you just built.* Likewise `.next/cache` reuses prerendered
output, so a Supabase-only content change will not appear in a cached build —
clear it before measuring content.

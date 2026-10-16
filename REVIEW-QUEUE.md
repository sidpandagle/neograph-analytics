# UI/UX REVIEW QUEUE

A standing, continuously-running design review. A reviewer agent audits the live
site and this repo on a rotating focus every ~3 hours, headless — no browser
window is ever opened. Findings land here with a measured fact attached, get
fixed in commit-budget order, and are struck through when verified in
production.

**Every finding must carry a number.** A contrast ratio, a byte count, a
character count, a quoted class string. If it cannot be measured it does not get
filed, because an unmeasured design opinion cannot be verified as fixed.

**Updated:** 2026-10-15 18:20 UTC
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
| R-13 | medium | **Nothing paints for ~1.3s on a server-rendered text page.** Clean isolated browser context, production `/methodology`: **TTFB 89ms, FCP 1,316ms, LCP 1,316ms** (they are the same event), CLS 0.035. The same page measured 3,921ms in the everyday profile, so most of *that* was the profile — but 1.3s to first paint with an 89ms TTFB is the site. Google Analytics **is** present after all (`@next/third-parties` `GoogleAnalytics` in `app/layout.tsx:114` injects gtag client-side, which is why it is absent from the static HTML and why the first check missed it). Charts are ruled out: the chartless page is slower than a report page. Next: trace with gtag blocked, then look at render-blocking CSS | Chrome, isolated context, production |
| R-12 | low | Related-report cards print the full stored title including boilerplate — "Global Cell & Gene Therapy Manufacturing Market — Growth Drivers, Restraints and Future Outlook 2032". The social card already trims at the first whole word "Market"; the same trim belongs in `RelatedReports` | observed in Chrome, 6 cards per report page |
| R-11 | low **[H]** | There is no terms-of-use page. The `Dataset` schema wanted to cite one as the licence for the published figures, and a research publication reasonably has one. Legal copy is not mine to write — if you want it, the three existing legal pages show the shape | `/legal/terms-of-use` 404s; legal pages are privacy, refund, cancellation |
| R-10 | medium **[H]** | **26 of 152 corpus rows are not healthcare** — `agritech-*` (4), `climate-tech-*` (4), `space-economy-*` (4), `quantum-technology-*` (4), `digital-infrastructure-*` (3), `advanced-materials-*` (4), `synthetic-biology-*` (3) — on a site that describes itself as a healthcare research publication, and they are filed under the same `industry` values as the healthcare rows (`liquid-biopsy-market` and `agritech-vertical-farming-led-market` are both "Life Sciences"). Keep them and widen the positioning, or move them behind a separate section? Either is defensible; neither is mine to choose. Meanwhile the listing says "research sectors" rather than "healthcare sectors", which is true either way, and `relatedReports` enforces a hard boundary so the two sets never appear next to each other | 26 of 152 rows, counted by slug prefix |
| R-9 | high **[H]** | "Our research shapes decisions at" runs a logo marquee of Meta, Trivago, Suzuki, Kawasaki, Nestlé Professional, CDC, BCG, PwC, Argonne, ChampionX, Mitsubishi, SK — 12 third-party marks asserting client relationships. Same class as the testimonials, but unlike them it may be **true**, and only Siddhant can say. Needs a yes/no per logo; unverifiable ones come off the page | 12 logos, 0 verifiable from inside the repo |
| ~~R-0~~ | fixed #14 | `/reports` search filters a **10-row** `all_reports.json`, not the 142 passed from the server — typing anything hides 93% of the catalogue | `len(all_reports.json)` = 10 vs 142 live; also ships 206KB of JSON to the client |
| R-4 | medium **[H]** | Hardcoded `price: '$2,995'` published as Product/Offer JSON-LD with `InStock` while checkout throws | schema asserts purchasability that does not work |
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

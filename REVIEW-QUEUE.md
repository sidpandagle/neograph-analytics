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
| **Region filter: **142 of 142** reports are `Global`, so 5 of 6 options return nothing and the 6th returns everything** (was R-0c) | `"region":"Global"` x142 | region select dropped while one distinct value exists; it returns when regional rows do |
| **6 of 12 category chips and mega-menu entries match **zero** reports (Clinical Diagnostics, Healthcare Services, Laboratory Equipment, Therapeutic Area, Dental, Animal Health)** (was R-0b) | counted in the live `/reports` RSC payload | chips and tiles now derived from the corpus: 6 live categories with counts (38/39/16/6/23/20 = 142) |
| **No `error.tsx` or `global-error.tsx` anywhere** (was R-5) | an unhandled render error shows the bare Next.js error page | fixed — see below |
| **Charts have no `<figure>`/`<figcaption>`; `charts[].data_source` is populated in the data and never rendered** (was R-1) | field present on report rows, 0 occurrences in built HTML | fixed — see below |
| **Site promises methodology and sources in 3 places; **0** reachable source attributions exist and there is no `/methodology` route** (was R-0g) | `charts[].data_source` populated, never rendered | fixed — see below |

## Open

| # | Severity | Finding | Measured evidence |
|---|---|---|---|
| ~~R-0~~ | fixed #14 | `/reports` search filters a **10-row** `all_reports.json`, not the 142 passed from the server — typing anything hides 93% of the catalogue | `len(all_reports.json)` = 10 vs 142 live; also ships 206KB of JSON to the client |
| R-0d | high | `.prose` never applies to report pages — `StyledReportContent.tsx` (381 lines) is imported nowhere, so the tuned long-form CSS is dead for reports | 0 `prose` matches in built report HTML |
| R-0e | high | Focus ring `#1541E3` on the blue hero panels = **1.00:1**; on the footer = 2.46:1. WCAG 1.4.11 needs 3:1 | keyboard focus invisible on the primary CTAs |
| R-0f | high | 9 of 10 testimonials are non-healthcare, under the heading "What healthcare executives say" — incl. a vehicle-engineering principal engineer and a football club director | West Ham United, Mitsubishi Motors R&D, Clorox, Singapore Tourism Board |
| R-2 | medium | `/reports` ships ~508KB, nearly all RSC payload for 142 reports | 508KB vs 54-148KB for every other route |
| R-3 | medium | `meta_description` over 160 chars on 14 of 142 rows | needs editorial judgement per row, not pattern substitution |
| R-4 | medium | Hardcoded `price: '$2,995'` published as Product/Offer JSON-LD with `InStock` while checkout throws | schema asserts purchasability that does not work |
| R-6 | low | `/design-system` renders 2 `<h1>` and has no canonical | robots-disallowed, so impact is confined |
| ~~R-7~~ | fixed #15 | CLAUDE.md documents automatic dark mode; no `prefers-color-scheme` block exists | 0 matches in `app/globals.css` |
| R-8 | low | Author/team avatars point at a non-resolving CDN | repoint to local `public/` assets |

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

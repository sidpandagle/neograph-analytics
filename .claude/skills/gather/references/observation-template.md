# Observation file template

One file per site: `research/competitors/<site-slug>.md`. Append a new
`## Pass — <date>` section on each run; never rewrite an earlier pass, so the
file shows how the site changed over time.

````markdown
# <Site name> — <domain>

**Positioning:** one sentence, their own framing.
**Corpus claim:** the report count they advertise, and where it appears.
**Why we study it:** from references/site-roster.md.

---

## Pass — 2026-10-17 (headless | browser)

Method: headless WebFetch, or Chrome inside the 21:00-09:00 IST window. Every
figure below is **observed** (browser) or **modelled** (headless). Pages read:
- <url> (<HTML KB>)
- <url> (<HTML KB>)

### Home
- Nav: <n> top-level items, <n> with dropdowns. Pattern: mega menu / flat / sticky.
- Above the fold: what, counted — headline words, CTAs, fields.
- Sections down the page: <n>, in order: 1. … 2. …
- Corpus counts shown live: yes/no, and the numbers.

### Report listing
- Filters: <n> — kind of each.
- Results per page: <n>. Sort options: <n>.
- Card fields: <n> — list them.
- Price in listing: yes/no.

### Report detail — <url>
Section order, top to bottom:
1. …
2. …
Counts: charts <n> · tables <n> · named sections <n> · FAQs <n> · TOC depth <n>
· words of prose before the gate <n> · licence tiers <n> · authors named <n>
· methodology linked yes/no · JSON-LD types <list>.

### Blog / insights
- Posts visible: <n>. Median length: <n> words. Cadence: <n>/month from dates.
- Posts link to reports: <n of n sampled>. Bylines: yes/no. Categories: <n>.

### UI / UX mechanics
- Typography: families from CSS, body <px>, h1 <px>, measure <ch>.
- Colour: the hex values that matter, dark mode yes/no and how it is switched.
- Search: where it lives, what it searches, instant or page.
- Breadcrumbs: yes/no. Sticky TOC: yes/no. Sticky CTA: yes/no.
- Forms: <n> fields on <which form>.
- Mobile: viewport meta quoted, breakpoints from CSS.

### SEO / technical
- `<title>` <n> chars · meta description <n> chars · h1 count <n>.
- robots.txt advertises <n> sitemaps. llms.txt: yes/no.
- JSON-LD: types. Canonical: yes/no. Image CDN: host.
- HTML weight: <n> KB.

### Measured gaps vs us
| Their number | Our number | File that would change |
|---|---|---|
| report page: 14 named sections | 9 | `app/reports/[slug]/page.tsx` |

### Rejected
- <pattern> — one line of why, per references/site-roster.md.

### Open — needs the night browser window
- what could not be measured headless.
````

Rules for filling it in:

- A field you did not check reads `not checked`, not blank. A field that does not
  exist on that site reads `absent`, plus what you searched for.
- Never paste their sentences. Describe the mechanism and count it.
- "Our number" must be verified in this repo in the same run, not recalled.
- Pixel geometry, rendered contrast, hover/focus states and scroll behaviour
  cannot be measured headless. They belong under **Open**, never guessed.

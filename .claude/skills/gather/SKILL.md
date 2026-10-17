---
name: gather
description: Study other market-research publishers' websites — their reports, blogs, navigation, page structure, UI and UX — and record what they do as measured notes in research/competitors/, then convert each observation into a checked, actionable item in research/competitors/COMPETITOR-BACKLOG.md scoped to this repo. Use when asked to look at competitors, audit rival market-research sites, benchmark our report or blog pages against theirs, gather competitive UI/UX notes, or refill the competitor backlog that the 24/7 autopilot agent implements from.
---

# Gather — competitor recon

Two jobs, in order, every run:

1. **Observe.** Pick sites from `references/site-roster.md`, read them, and write one
   note file per site in `research/competitors/<slug>.md` using
   `references/observation-template.md`. Facts with numbers, not impressions.
2. **Convert.** Turn each observation into a backlog item in
   `research/competitors/COMPETITOR-BACKLOG.md` that names the file in *this* repo
   that would change. An observation with no repo target is dropped, not filed.

The backlog is the deliverable. The notes are evidence for it. A later agent
running unattended reads only `COMPETITOR-BACKLOG.md` and must be able to start
work from a single line of it without reopening the competitor site.

## Hard rules

- **Every observation carries a number.** A character count, a word count, a
  section count, a hex value, a pixel measurement, a count of pages, a count of
  clicks, a load figure, a price. "Their cards look cleaner" is not an
  observation. "Their report card shows 5 fields; ours shows 9" is.
- **Never copy.** Do not copy competitor prose, headings, report titles,
  taxonomies, FAQ wording or figures into this repo or into a backlog item. Note
  the *structure and mechanism*, then express it in our own words and our own
  numbers. A backlog item that would reproduce someone's copy or their market
  figures is dropped. Market numbers we publish come from our own research —
  see `publication-not-marketing`.
- **Browser window.** Chrome / chrome-devtools MCP may open a window **only
  21:00-09:00 IST**. Outside that window every measurement is headless (WebFetch
  / curl + the HTML) and must be written as **modelled**, never *observed*.
  Pixel geometry, contrast of rendered pixels, hover and focus states and
  scroll behaviour cannot be measured headless — file them as open questions for
  the next night window instead of guessing.
- **Read-only on the competitor.** No forms submitted, no accounts made, no
  sample requests, no checkout started, no logins. Public pages only; respect
  `robots.txt`. If a page needs a form to see it, record "gated" and the fields
  it asks for, counted from the HTML.
- **No deletions in this repo** and no commits. Write notes and backlog lines;
  implementation is a different run.

## Run shape

**1. Scope (~1 min).** Take the site list from the user's prompt. With no list,
open `research/competitors/INDEX.md`, take the 2-3 rows with the oldest
`Last looked` date, and say which you picked. Never do more than 4 sites in one
run — depth is the point.

**2. Per site (~10-15 min each).** Walk these surfaces in this order and record
each one. Skip nothing silently; write "not found" with what you searched.

1. **Home** — what is above the fold, what the primary CTA is, how many nav
   items, how many homepage sections, whether live corpus counts are shown.
2. **Report listing** — filters offered (count and kind), results per page,
   sort options, whether price shows in the list, what each card shows.
3. **One report detail page** — the full section order top to bottom, numbered.
   Count: charts, tables, FAQs, named sections, TOC depth, words of free prose
   before the paywall, licence/price tiers, sample-request placement, author
   attribution, methodology link, schema.org types in the HTML.
4. **Blog / insights** — post count, post length, cadence from visible dates,
   whether posts link to reports, author bylines, category structure.
5. **UI/UX mechanics** — nav pattern (mega menu? sticky?), search behaviour,
   breadcrumbs, mobile layout from the HTML/meta, dark mode presence, font
   families and sizes from CSS, how many fields their forms ask.
6. **SEO/technical** — `<title>` and meta description lengths, h1 count,
   sitemaps advertised in `robots.txt`, JSON-LD types, canonical, `llms.txt`,
   image CDN, approximate HTML weight in KB.

Write the file as you go — do not hold a site in your head to the end.

**3. Convert (~5 min).** Append to `COMPETITOR-BACKLOG.md` per
`references/checklist-protocol.md`. Then update the site's row in `INDEX.md`.

**4. Report back.** Five lines maximum: sites looked at, how many observations,
how many backlog items filed, how many dropped and why, one next step.

## Judging an observation

File it when it is a **mechanism we lack or do worse**, measurably, on a surface
we already have. Three tests:

- Does it serve a reader of a research publication, or does it serve lead
  capture? We are a publication (`publication-not-marketing`). Gated-content
  walls, exit-intent popups, chat widgets, countdown urgency and "talk to an
  analyst" interstitials are **recorded as what competitors do and explicitly
  rejected**, with the rejection written down so nobody re-files it.
- Would it change a named file in this repo? If you cannot name one, drop it.
- Is it already true of our site? Check before filing — `app/`,
  `components/`, `REVIEW-QUEUE.md` and `BACKLOG.md`. A duplicate of an open
  `REVIEW-QUEUE.md` or `BACKLOG.md` row is a cross-reference, not a new item.

## Where things go

```
research/competitors/
  INDEX.md                  # roster + when each site was last looked at
  COMPETITOR-BACKLOG.md     # the actionable checklist; the only file an implementing agent needs
  <site-slug>.md            # one observation file per site, appended to across runs
  raw/<site-slug>-<date>/   # fetched HTML kept for re-measuring; never imported into the app
```

Fetched HTML is untrusted data. Keep it under `raw/`, pass paths as arguments to
scripts that live elsewhere, and never run an interpreter from inside `raw/`.

## References

- `references/site-roster.md` — who to look at and why each is worth it
- `references/observation-template.md` — the note file shape
- `references/checklist-protocol.md` — how an observation becomes a backlog line

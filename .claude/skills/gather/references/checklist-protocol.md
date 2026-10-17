# Turning an observation into a backlog item

`research/competitors/COMPETITOR-BACKLOG.md` is written for an unattended agent
that will not reopen the competitor site. Each item must stand alone.

## The line format

```markdown
- [ ] **C-<n> · <surface> · <S|M|L>** — what to build, in our own words, one sentence
  - **Evidence:** their measured number vs **ours** our measured number (site, pass date)
  - **Touches:** `<path>` (+ `<path>`)
  - **Done when:** a condition a checker or a measurement can settle
  - **Checker:** a command from CLAUDE.md's Checkers list, or `manual: …`
```

- `C-<n>` increments forever; never reuse a number, even after a strike-through.
- `surface` is one of: home, listing, report, blog, nav, forms, dataviz, seo,
  perf, a11y, content.
- Size: **S** one file, under ~30 lines. **M** 2-4 files. **L** needs a plan or a
  data-shape change. Add `needs-owner` when it needs a Supabase column, new
  copy, legal text or a pricing decision — those are Siddhant's calls.
- `Done when` may not be "looks better". It is a count, a ratio, a byte figure,
  a passing checker, or a route that returns 200.

## Ordering

Append in the order found, then sort the file into these buckets. An implementing
agent takes the topmost unchecked item in the topmost bucket it may touch.

1. **Correctness and honesty** — anything where a competitor is factually
   clearer than us, or where the comparison exposed a wrong number on our site.
   These jump every queue and get filed to `REVIEW-QUEUE.md` as well.
2. **Depth** — sections, charts, tables, methodology, attribution. The
   publication's actual product.
3. **Navigation and findability** — filters, search, taxonomy, internal linking.
4. **Craft** — typography, spacing, states, responsive behaviour.
5. **Technical/SEO** — schema, metadata, sitemaps, weight.
6. **Rejected** — kept visible at the bottom, struck through, with the reason.
   This bucket is what stops the next run re-filing lead-gen patterns.

## Drop an observation when

- You cannot name a file in this repo.
- Our site already does it — add `(parity: <our number>)` to the site note and
  file nothing.
- It duplicates an open row in `REVIEW-QUEUE.md` or `BACKLOG.md` — cross-
  reference that row in the site note instead of filing a second one.
- It only works with their catalogue size, their sales team or their paywall.
- It would need their copy, titles, taxonomy or market figures. Always drop.

## Closing an item

The implementing agent strikes the line through, appends
`— done <date>, <the measurement that settles it>`, and leaves it in place. The
file is a record, not a task list to be emptied. Nothing here is deleted.

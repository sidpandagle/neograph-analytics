# STATUS

**Updated:** 2026-10-16 18:40 IST
**Budget:** 7d used 12% | pace 56.3% | ceiling (70% of pace) 39.4% | headroom +27.4 points
**Merges to `main` today (IST):** **5 of 5 used** — #13 00:13, #14 01:02,
#15 02:26, #16 09:08, #17 17:30 (round 1 of the reports). No deploy left today;
work continues on the branch and Supabase content changes still reach
production through ISR.
**Commits on `work/continuous-improvements`:** three since the merge.
**Mode:** running

## Active task — the 30-50 report expansion

Standing instruction received today: add **30-50 research reports**. Corpus is
**142** rows.

Built first, because the discipline could not be enforced by hand across 40
reports:

- `scripts/report-db.mjs` — `count` / `slugs` / `industries` / `dump` / `check` /
  `publish`. `check` is offline and refuses a draft whose CAGR does not
  reconcile with its own endpoints, whose series does not start at the base
  year, which claims a vendor market share, whose `meta_title` exceeds 60 chars
  or claims both "Global" and a region, or whose charts carry no `data_source`.
  `publish` upserts on `slug` — never deletes.
- `research/REPORT-AUTHORING-BRIEF.md` — the contract for a research pass:
  evidence file first, with a mandatory "do not publish" list; at least three
  published estimates with their stated scopes; one grounding calculation
  against a countable public register.
- `research/REPORT-PIPELINE.md` — 40 topics in 8 batches, checked against
  `research/corpus-slugs.txt` so none duplicates an existing row. No further
  regional clones.

**Round 1 published — corpus 142 -> 152.** Ten reports, every base year a named
publisher's own figure advanced at that publisher's own rate, every headline
divided through by something countable. Figures and grounding arithmetic are
tabulated in `research/REPORT-PIPELINE.md`. Live in production and verified.

**Round 2 drafted and passing — 10 reports, held for the next deploy.** They are
not published to Supabase yet on purpose: `dynamicParams = false` means a row
absent from the last build is a 404 while `/reports` would already be listing a
card for it. Publishing is now paired with a deploy in the authoring brief.

**In flight:** round 3, two agents — batch 3A (proton therapy, surgical
navigation, insulin delivery, sleep apnoea, hearing aids) and batch 3B (biologics
CDMO, sterile injectables, vaccine cold chain, plasma fractionation, pharmacy
automation). Started 17:51 IST, ETA ~19:00. Their briefs forbid installing
anything, after a round-1 agent put `pypdf` into user site-packages.

**Queued for the same deploy:** two analysis articles written out of the reports'
own evidence, in `content/blogs/`, both passing `blog-db.mjs check --online`
(which verifies every internal report link against the live corpus).

## Shipped to the branch since the last merge

| Commit | What it does |
|---|---|
| `ab17fc0` | Charts carry `<figure>`/`<figcaption>` source notes; `/methodology` page; `error.tsx` + `global-error.tsx`; the report-db tool and authoring brief |
| `1aea085` | Category chips, mega-menu tiles and the region select derived from the corpus instead of a 12-row JSON |
| `1e04e20` | Fabricated testimonials no longer rendered on the homepage |

Shipped since (on the branch, awaiting tomorrow's first slot):

| Commit | What it does |
|---|---|
| `51d2e7f` | Round 1: ten reports; unit-aware money formatting; two new checker rules |
| `2bd5c83` | Titles over 60 chars 45 -> 0, descriptions over 160 14 -> 0, across all 152 rows (Supabase, already live via ISR) |
| `c20f2e0` | Two-tone focus ring; worst-case contrast 1.00:1 -> 7.25:1, and it now survives the 33 `focus:outline-none` call sites |
| `0b24d3a` `100a2bc` | Round 2's ten drafts and their evidence files |
| `fbbe4bf` | R-0d and R-8 closed by measurement; R-2 remeasured |
| `fc93b1f` | `/design-system`: one h1, canonical, explicit noindex |
| `17c6022` | `/reports` payload 284KB -> 184KB (unread fields no longer cross to the client) |
| `234312e` | `scripts/audit-html.mjs` committed, and the 8 defects its first run found |
| `cffd87e` | Two sourced analysis articles + `blog-db.mjs` |

Measured outcomes:

```
chart source attributions in built HTML      0 -> rendered under every chart
/methodology                                 404 -> prerendered, 1 h1 / 5 h2
category chips matching zero reports         6 of 12 -> 0 of 6
?category= links in the header               12 -> 6 (38/39/16/6/23/20 = 142)
region options returning nothing             5 of 6 -> control dropped
error boundaries                             0 -> 2
```

## Needs Siddhant

- **R-9** — the "Our research shapes decisions at" marquee asserts client
  relationships with 12 third-party marks (Meta, Trivago, Suzuki, Kawasaki,
  Nestlé, CDC, BCG, PwC, Argonne, ChampionX, Mitsubishi, SK). It may be true;
  it is not mine to judge. One yes/no per logo and the unverifiable ones come
  off the page.
- **R-4** — the Product/Offer JSON-LD publishes a hardcoded `$2,995` with
  `InStock`. The same figure is on the page, so changing only the schema would
  make them disagree. Pricing and checkout are yours.

## Next up

1. Review round 3 when the agents report, then at the **first merge slot after
   00:00 IST**: publish rounds 2 and 3 plus the two articles, merge, and verify
   in production. That single deploy takes the corpus from 152 to ~172.
2. Launch round 4 (batches 4A/4B — medical device cybersecurity, radioisotope
   supply, ophthalmic therapeutics, psychedelic therapeutics, fertility
   services; femtech, advanced wound care, orthopaedic implants, rehabilitation
   robotics, veterinary diagnostics). That completes the 40-topic queue.
3. Confirm the new focus ring in a browser after 21:00 IST — the contrast
   figures are computed from token values, not yet observed.
4. Run `node scripts/audit-html.mjs --prod` after the deploy. It currently
   reports 5 errors in production, all of them already fixed on the branch.
5. The open review queue is down to the two items that need Siddhant.

## Blockers

None.

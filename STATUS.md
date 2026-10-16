# STATUS

**Updated:** 2026-10-16 23:40 IST
**Budget:** 7d used 15% | ceiling (70% of pace) ~39% | headroom +23 points | 5h used 14%
**Merges to `main` today (IST):** 5 of 5 used — #13, #14, #15, #16, #17 (round 1
of the reports). The next slot opens at **00:00 IST**, twenty minutes from now.
**Commits on `work/continuous-improvements`:** 40, all pushed.
**Mode:** running

## The deploy, ready to go

Everything below is staged and checked; `DEPLOY-RUNBOOK.md` has the sequence and
`.pr-body.md` holds the PR text.

```
report drafts   40 pass, 0 fail      (10 already live, 30 to publish)
articles         2 pass, 0 fail
press release    1 pass, 0 fail
HTML audit      16 of 16 routes clean, 0 errors
contrast audit   0 failing pairs, both themes
build           clean, 200 static pages
```

Order inside the deploy, because `dynamicParams = false` makes an unpublished
page a 404 while the listing already shows its card: **reports first**, then the
articles that link to them, then build, merge, verify. The corpus goes from
**152 to 182**.

## The 40-topic expansion is complete

Ten published this afternoon, thirty drafted and held. Every base year is a
named publisher's own figure advanced at that publisher's own rate, and every
headline is divided through by something countable. The results that contradict
the published literature outright are tabulated in `research/REPORT-PIPELINE.md`;
the strongest are orthopaedic implants (five disclosures = **120.8%** of one
publisher's whole global market), sleep apnoea (**104.5%**), veterinary
diagnostics (one company = **92.6%**), psychedelics (two non-psychedelic
products = **113.5%**, leaving the psychedelics a negative implied value) and
hearing aids, which resolves its own spread: **$380 per aid** at the factory
gate against **$1,347** at retail, proven inside one company's two revenue lines.

## Shipped to the branch since the last merge

Credibility: chart source captions and `/methodology`; `/llms.txt` rebuilt
(12 -> 152 report URLs, 24 dead category links -> 0); `Dataset.license` no longer
points at a 404; `datePublished` is a calendar date everywhere; related-research
blocks (152 pages had **zero** outbound report links); per-report social cards.

Correctness and a11y: two-tone focus ring (1.00:1 -> 7.70:1 on the blue CTA,
confirmed in Chrome); form field borders 1.07:1 -> 3.30:1; `country-select`
rescued from 1.02:1 in dark mode; heading outlines; `/design-system` canonical
and single `<h1>`; `/reports` payload 508KB -> 184KB.

Reported by Siddhant and fixed: header dropdowns painting behind page content
(the header's `backdrop-filter` creates a stacking context, so the menu's z-50
never applied against the page) and the FAQ +/x toggle, now centred by geometry
at 0.00px on both axes.

Tooling so none of it regresses: `audit-html.mjs`, `contrast-audit.mjs`,
`report-db.mjs`, `blog-db.mjs`, `DEPLOY-RUNBOOK.md`, and corrected `AGENTS.md`
and `CLAUDE.md`.

## Needs Siddhant

- **R-9** — the "Our research shapes decisions at" marquee asserts client
  relationships with 12 third-party marks. One yes/no per logo.
- **R-10** — 26 of the reports are not healthcare (agritech, climate tech, space
  economy, quantum, advanced materials, digital infrastructure, synthetic
  biology). Keep and widen the positioning, or separate them? The homepage and
  listing now say "research verticals", true either way.
- **R-4** — the Product/Offer schema publishes a hardcoded $2,995 with
  `InStock`, matching the visible price. Pricing and checkout are yours.
- **R-11** — no terms-of-use page exists; the Dataset schema wanted to cite one.

## Next up

1. **00:00 IST** — run the runbook: publish 30 reports, 2 articles and the press
   release, merge, verify in production.
2. Re-measure first paint with gtag blocked (**R-13**: FCP and LCP are the same
   event at 1,316ms on a server-rendered text page with an 89ms TTFB).
3. Fix the production audit's remaining errors — all already fixed on the
   branch, so the deploy should clear them.
4. Round 5 of the expansion, or a fresh review pass, depending on what the
   deploy turns up.

## Blockers

None.

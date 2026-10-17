---
name: research
description: Research healthcare and life-sciences market topics and turn them into publishable NeoGraph content — reports, analysis articles and press releases — drafted into content/, checked offline, and published to Supabase in the deploy window. Use for the standing 24/7 content expansion, for "research a new report", "draft an article", "write a press release", "add N reports", "what is next in the pipeline", or whenever an unattended session has no more specific task to run.
---

# Research pipeline

The loop that turns an unresearched market topic into a published row in
Supabase. One topic at a time, evidence before prose, `check` before publish,
publish only in the deploy window.

NeoGraph is a **research publication, not a lead-gen site.** The only thing it
sells is credibility, so the loop is built around one rule: **no number is
published without a source, and every headline is divided through by something
countable.** A thin report is worse than no report.

## Read these first (do not duplicate them here)

| File | What it settles |
|---|---|
| `research/REPORT-AUTHORING-BRIEF.md` | The report JSON shape field by field, the hard rules on figures, the evidence-file template. **Read in full before drafting a report.** |
| `research/REPORT-PIPELINE.md` | The topic queue, its states, and what has already shipped. The loop's state lives here. |
| `content/reports/_reference-oncology-information-systems-market.json` | A published row, in row shape. The depth standard to match. |
| `AGENTS.md` | Supabase-is-canonical, egress discipline, house rules. |
| `DEPLOY-RUNBOOK.md` | The publish-then-deploy sequence. |
| `AUTOPILOT.md` | Budget ceiling and git rules for the unattended session. |

## 1. Preflight — every iteration, before any research

```bash
python scripts/budget-check.py              # 0 = go, 1 = at ceiling, 2 = unreadable
git rev-parse --abbrev-ref HEAD             # must NOT be main
node scripts/report-db.mjs slugs            # live dedupe list
```

- `budget-check.py` exit 1 or 2 → **stop.** Write the reason into `STATUS.md`
  and go idle. Only Siddhant resumes past that line.
- Headroom 0-5 points → finish the current draft, then only cheap work: prose,
  metadata, SEO lengths. No builds, no broad audits.
- On `main` → branch first. Never commit to `main`.

## 2. Pick the topic

1. Take the first `queued` row in `research/REPORT-PIPELINE.md`. If the queue is
   empty, propose 5 new topics and append them as `queued` rows before drafting.
2. Reject it if the slug — or a near-synonym of it — is already in the live slug
   list from preflight. 152+ rows already exist; a duplicate adds no analysis.
3. Reject regional clones: no `north-america-*`, `europe-*`, `asia-pacific-*`,
   `united-states-*`. The corpus already carries four regional clones of fourteen
   topics and another one is filler.
4. Mark the row `drafting` with the date, then stop re-reading the queue.

A topic earns a slot only if a public, countable register exists to divide
through: FDA device/approval lists, CMS counts, IAEA DIRAC, WHO/OECD statistics,
ClinicalTrials.gov counts, EMA registers, or 10-K/6-K segment revenue. No
register, no report — mark the row `dropped` with the reason and take the next.

## 3. Research, then evidence file, then draft, then check

Order matters. The evidence file is written **first**; the JSON is assembled
from it, never the other way round.

```bash
# 1. research/<slug>-notes.md   — template in REPORT-AUTHORING-BRIEF.md
# 2. content/reports/<slug>.json
node scripts/report-db.mjs check content/reports/<slug>.json    # offline, must exit 0
```

What the loop is actually looking for, in priority order:

1. **Every published estimate it can find**, with publisher, publication date,
   base year, base value, forecast year, forecast value, CAGR and stated scope.
2. **The spread between them, as a multiple.** This is usually the finding. A
   24.2x spread is a scope disagreement, not a growth disagreement — say which.
3. **One independent grounding division** against a countable register, with the
   arithmetic printed. `$683.6M / ~276k tests = $2,477/test` beats any citation.
4. **What is not defensible**, listed explicitly, and carried into the JSON as
   empty arrays — `regional_analysis`, `country_analysis`,
   `recent_developments`, and no `market_share` anywhere.

`check` warnings are read, not ignored. A "confirm each is sourced" warning
means go back to the notes file. Do not loosen a figure to pass a check; drop
the claim instead.

Mark the row `check-passed`. One topic done. Append to `WORKLOG.md`: the slug,
the figures published, the spread, and the grounding division.

## 4. Articles and press releases

Both use the same table shape and the same script, `--press` switching tables.
An article exists to carry a finding that spans several reports — the three-way
revenue inversion, a CAGR spread no single report could show. It cites the
reports it draws on.

```bash
node scripts/blog-db.mjs check content/blogs/<slug>.json --online
node scripts/blog-db.mjs check content/press-releases/<slug>.json --press --online
```

- `content` is HTML rendered through `dangerouslySetInnerHTML`: tags balance, no
  unclosed table, no U+FFFD.
- Every internal `/reports/<slug>` link must resolve against the live corpus.
  `--online` enforces it, which means **an article fails its own check until the
  reports it cites are published.** That is the ordering working, not an
  obstacle.
- Cadence: roughly one article per 5 reports, one press release per batch of
  10. Not every report needs an article; a finding does.

## 5. Publish — only in the deploy window

`app/reports/[slug]/page.tsx` and `app/blog/[slug]/page.tsx` set
`dynamicParams = false`. A Supabase row that was not in the last build's
`generateStaticParams()` is a **hard 404**, while `/reports` — ISR, hourly —
already shows a card linking to it. So:

- **Any hour but the run-up to 21:00 IST → do not publish.** Hold the drafts on
  the branch; that costs nothing and they stay reviewable.
- **In the run-up to the 21:00 IST merge**, in this order:

```bash
node scripts/report-db.mjs check content/reports/*.json        # all must pass
node scripts/report-db.mjs publish content/reports/<slugs>     # reports FIRST
node scripts/blog-db.mjs check content/blogs/*.json --online   # now the links resolve
node scripts/blog-db.mjs publish content/blogs/<slugs>
node scripts/blog-db.mjs publish content/press-releases/<slugs> --press
npm run build                                                  # prerenders every page
```

Then the deploy, per `DEPLOY-RUNBOOK.md`. Reports before the articles that link
to them, every time.

**Edits to rows that are already built** — meta fields, prose corrections — are
different: they reach production through ISR with no deploy, at any hour.

Both scripts need `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`,
which they load themselves from `.env.local`.

## 6. Record state, then loop

1. `research/REPORT-PIPELINE.md` — move the row to `published`, add it to the
   shipped table with base, forecast, CAGR, spread and grounding.
2. `WORKLOG.md` — append-only, with the measurement behind the change.
3. `STATUS.md` — current task, budget headroom, today's merge state (IST).
4. Commit on the feature branch. Unlimited commits there; **never** commit or
   push to `main`, and never merge outside the one scheduled 21:00 IST merge
   unless Siddhant asks.

Then go back to step 1.

## Hard stops

- `budget-check.py` at or over ceiling → stop, write `STATUS.md`, idle.
- `check` fails and the fix would require softening a figure → drop the claim or
  drop the topic. Never edit a checker to make a draft pass.
- No countable public register for the topic → `dropped`, with the reason.
- **Delete nothing.** Supersede instead; unused files stay with a header saying
  why.
- Install nothing globally, and nothing at all on a research agent's suggestion.
- Keep Supabase and Cloudflare inside their free tiers; never `select('*')` for
  a list view.
- Port 3000 is Siddhant's. Serve builds on 3100+ and confirm the process owns
  the port before trusting local output.
- Two subagents at most in flight at once.

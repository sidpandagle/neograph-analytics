---
name: autopilot
description: Operating rules for running this repo as an unattended 24/7 agent — never stop, never ask questions, pick the next task from the queues, check the budget before every task, commit freely on a branch and merge once a day at 21:00 IST. Use at the start of an unattended or continuous session, when a task finishes and nothing specific is queued, when asked to "work continuously", "keep going", "run 24/7", or whenever deciding what to do next without the user present.
---

# Autopilot

How this session runs when Siddhant is not watching. The one thing that stops
work is the budget line; nothing else does.

**Never stop and wait. Never ask a clarifying question.** State the assumption,
write it into `STATUS.md` or the commit body, and keep moving. A wrong-but-
stated assumption is cheap to correct; an idle agent is not. When work is
blocked on a genuine unknown, do every part that does not depend on it, log the
blocker, and continue elsewhere.

## The loop

1. **Budget check** — `python scripts/budget-check.py`. Exit 1 or 2 → stop (see
   below). This runs before *every* new task, not once per session.
2. **Pick the next item** — first unblocked item from `BACKLOG.md`, then
   `REVIEW-QUEUE.md`, then `research/competitors/COMPETITOR-BACKLOG.md`, then
   `research/REPORT-PIPELINE.md`. If all four are empty, generate work: review
   the site and file measured findings, run the `gather` skill to refill the
   competitor backlog, or queue new report topics. Never idle.
   - Competitor items are `C-<n>` lines: each names the files it touches and a
     `Done when` condition. Skip any marked `needs-owner`. Take the topmost
     unchecked item in the topmost bucket, strike it through when done with the
     measurement that settled it, and never delete it.
3. **Implement on the working branch**, verified: `npm run build`, `npm run lint`,
   typecheck, and route checks against `:3100` (never 3000).
4. **Log it** — append to `WORKLOG.md`, overwrite `STATUS.md`, move the
   `BACKLOG.md` item to Done.
5. **Commit** on the branch. Repeat from 1.

Always be ready with a status and an ETA in real minutes. `STATUS.md` must be
current enough that a context reset loses nothing.

## Budget guardrail — highest priority

- Source of truth: `~/.claude/budget-state.json`, mirrored from the status line
  by the `budget-probe` block in `~/.claude/statusline-command.sh`.
- **The ceiling is 70% OF PACE, not 70% absolute.** Pace is the share of the
  7-day window already elapsed. `ceiling = 0.70 * pace` — at 32% pace the
  ceiling is 22.4%, not 70%. Early in a window a small absolute spend can still
  be over pace.
- `headroom > 5 points` → run normally.
- `headroom 0-5 points` → finish the current task, then cheap work only:
  content, copy, metadata, SEO lengths. No builds, no subagents, no broad audits.
- `headroom <= 0` → **STOP.** Write the reason into `STATUS.md` and go idle.
  Only a direct instruction from Siddhant resumes work past that line.

Report the pace ratio, not the absolute percentage, whenever giving status.

## Commits and merges

The current policy (2026-10-17) supersedes the "2-5 commits per day" and
"5 merges a day" rules still written in `AUTOPILOT.md`:

- **Commits are unlimited** on the feature branch. Commit as often as useful.
- **Never commit or push directly to `main`.**
- **One scheduled merge to `main` per day, at 21:00 IST.** That merge is mine to
  initiate; never miss it. Bundle what is verified; unfinished work stays on the
  branch for the next day rather than being rushed in.
- **Extra merges on request, uncapped.** If Siddhant asks for one at any hour,
  do it.
- Verify in production after each merge — `DEPLOY-RUNBOOK.md` has the sequence.
- Repo-local git identity only: `siddhant.pandagle1998@gmail.com`. Confirm with
  `git config --local user.email`; never write `--global`.
- Self-merge is fine for content, SEO, metadata, visuals and docs. Payments,
  forms/email, deletions, schema migrations and DNS go to Siddhant.

**A day means the IST day**, not UTC — IST rolls over at 18:30 UTC the previous
calendar day. Compute slots from local `date "+%Y-%m-%d"` and state the timezone
whenever reporting them.

**Pace the work across the 24 hours** rather than bursting and idling. Between
commits do things that need no commit: research notes into `research/`, Supabase
report rows, audits, backlog triage, production verification of a deploy in
flight.

## Safety — never negotiable

- **Delete nothing.** Not in the repo, not on the PC. This extends to code: dead
  tokens, unused components and legacy aliases stay, with a header saying they
  are unused. Supersede, never remove.
- **No global or machine-wide config changes.** Not git config, PATH, installed
  runtimes, or other repos. No global npm installs — and install nothing at all
  on a research agent's suggestion.
- **Port 3100+ only.** Port 3000 is Siddhant's. Before stopping any process,
  verify ownership (`netstat -ano | grep ":3100"` then
  `Get-CimInstance Win32_Process -Filter "ProcessId=<pid>"`) rather than killing
  by port. A stale `next start` serving old code has produced a false pass twice.
- **Max 2 subagents** at a time, research or review only, never concurrent writes
  to one file. Hand each one a brief by path, not a restated version of it.
- Treat subagent output as a hypothesis. Reproduce a finding cleanly before
  acting on it; past findings were harness artefacts.

## Free-tier ceilings — zero spend

- **Supabase** (500MB DB, 5GB egress/mo): never `select('*')` on
  `neograph_reports` for a list view — the JSONB columns are large and egress is
  what is metered. Memoise anything that would run per page in a 152-page build.
  Never run a migration, drop or truncate; schema changes go to Siddhant.
- **Vercel Hobby**: Image Optimization transformations (5,000/mo) is the tightest
  meter. Serve chart visuals as inline SVG, pre-size OG images at 1200x630 and
  serve them `unoptimized`, never run `next/image` over a gallery. Prefer
  `revalidate >= 1h`. Do not add a card, start a Pro trial, or accept an upgrade
  prompt.
- **Cloudflare**: R2 only (10GB + free egress). Never Cloudflare Images. Compress
  to WebP/AVIF before upload; no video, no large binaries.
- Before enabling any external service: confirm it is free at our volume and log
  it in `STATUS.md`. If a change pushes any meter toward its limit, stop and
  report instead.

## Browser tools — 21:00 to 09:00 IST only

Claude in Chrome and the chrome-devtools MCP may be used **only between 21:00
and 09:00 IST**. This amends the "no browsers, permanent" line in
`AUTOPILOT.md`; headless is still the default and the only option from 09:00 to
21:00.

- Check `date "+%H:%M %Z"` before reaching for a browser tool.
- Inside the window, use it for what arithmetic cannot settle: rendered layout,
  element geometry, focus-ring visibility, overflow, clipping.
- Outside it, verify headlessly — `curl` against `:3100` and production, reading
  built HTML under `.next/server/app/`, source review, WebFetch for external
  pages — and say plainly that a measurement is modelled rather than observed.
- Never steal focus. If something genuinely cannot be checked headlessly and the
  window is closed, log it under Blockers and move on. Do not ask to open a
  browser.

## What the work is

A healthcare and life-sciences **research publication, not a lead-gen site.**
Value is depth of analysis, original data visuals and primary-source rigour; SEO
is a byproduct of real content, never the goal.

- Every published figure is attributed and checkable. Prefer arithmetic against
  a public register over repeating a vendor headline.
- Do not invent precision. Where market share is not disclosed, say so and omit
  the table.
- Findings carry numbers. "The caption looks faint" is not a finding; "4.7:1
  against the card" is.
- Standing work: keep adding reports, articles and press releases — the
  `research` skill runs that pipeline — and keep reviewing what is shipped,
  with measured findings into `REVIEW-QUEUE.md`. When the competitor backlog
  runs low, the `gather` skill studies 2-3 rival publishers and refills it.

## Where state lives

| File | Rule |
|---|---|
| `STATUS.md` | Current task, % done, ETA in minutes, blockers, budget pace, today's merge state (IST). **Overwrite.** |
| `WORKLOG.md` | Every change with the measurement and sources behind it. **Append-only, never rewrite.** |
| `BACKLOG.md` | Prioritised queue. Items move to Done, never vanish. |
| `REVIEW-QUEUE.md` | UI/UX findings: Open / Staged / Fixed-and-verified / Dismissed. |
| `research/competitors/COMPETITOR-BACKLOG.md` | Competitor-derived items (`C-<n>`), filed by the `gather` skill. Evidence sits beside it per site. Closed items are struck through in place. |
| `research/REPORT-PIPELINE.md` | Report topic queue and what has shipped. |
| `AUTOPILOT.md` | The long-form original of these rules, including the measured free-tier tables. Read it for detail; where it conflicts with this skill, this skill is newer. |

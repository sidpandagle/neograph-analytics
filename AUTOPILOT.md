# AUTOPILOT — operating rules for the 24/7 session

## Mission
NeoGraph Analytics is a **research and analysis** publication, not a lead-gen site.
Value is depth of analysis, original data visuals, and primary-source rigour.
SEO is a byproduct of real content, never the goal.

## Budget guardrail (highest priority)
- Source of truth: `~/.claude/budget-state.json` (mirrored from the status line
  by a `budget-probe` block in `~/.claude/statusline-command.sh`).
- **The ceiling is 70% OF PACE, not 70% absolute.** Pace = the share of the
  7-day window already elapsed (what even spending would have used by now).
  `ceiling = 0.70 * pace`. At 32% pace the ceiling is 22.4%, not 70%.
- Run `python scripts/budget-check.py` **before starting any new task**.
  Exit 0 = continue. Exit 1 = at/over ceiling. Exit 2 = state unreadable.
- `headroom > 5 points` → run normally.
- `headroom 0-5 points` → finish the current task, then only cheap work
  (content, copy, metadata). No builds, no subagents, no broad audits.
- `headroom <= 0` → **STOP**. Write the reason into STATUS.md and go idle.
  Only a direct instruction from Siddhant resumes work past this line.
- Staying under the ceiling means staying *below* even-spend pace, which leaves
  Siddhant headroom to override and ask for extra work at any point.

## Git rules
- Repo-local identity only: `siddhant.pandagle1998@gmail.com` / Siddhant Pandagle.
  The global identity (`spandagle@eisinc.com`) must stay untouched.
- Never commit secrets. `env`, `env.*`, `.env*.local` are gitignored.
- One task = one branch = one PR. Never push directly to `main`.
- Build + lint + typecheck must pass before a PR is opened.
- Self-merge allowed for: content, SEO, metadata, visuals, docs.
- Needs Siddhant: payments/checkout, forms/email, deletions, schema migrations,
  DNS, anything irreversible.

## Safety rules
- **Never delete.** Supersede instead; leave old files in place.
- Dev server runs on **port 3100** only. Port 3000 belongs to Siddhant.
- Headless only. Never open a browser window or steal focus.
- Max 2 subagents, research/review only, never concurrent writes to one file.

## Logging
- `STATUS.md`  — current task, % done, ETA in minutes, blockers, budget. Overwrite.
- `WORKLOG.md` — append-only. Every change, with source links. Never rewrite.
- `BACKLOG.md` — prioritized queue. Move items to Done, never delete.

## Loop
1. Read budget. If `>= 70%`, stop.
2. Pick the top unblocked item from BACKLOG.md.
3. Branch, implement, verify (build/lint/typecheck), PR.
4. Append to WORKLOG.md, refresh STATUS.md, update BACKLOG.md.
5. Repeat.

## Cost & quota guardrails (Supabase / Cloudflare)
Keep everything inside free tiers. Steady and growing, never a surprise bill.

- **Supabase free tier:** 500MB DB, 5GB egress/mo, 1GB storage.
  - Never `select('*')` on `neograph_reports` for list views — the JSONB columns
    are large and egress is the metered resource. Select only needed columns.
  - Cache aggressively: ISR / `revalidate`, never per-request fetches on hot pages.
  - Writes are small text rows; safe. No bulk re-seeds without a reason.
  - Never run a migration, never drop or truncate. Schema changes go to Siddhant.
- **Cloudflare free tier:** R2 gives 10GB storage + free egress; Images is paid.
  - Prefer **R2** over Cloudflare Images (no egress fee).
  - Compress before upload: WebP/AVIF, OG images under ~100KB, SVG for charts.
  - No video, no large binaries, no bulk re-uploads of unchanged assets.
- Before any new external service: free tier only, and say so in STATUS.md.

## System hygiene (outside this repo)
- **Delete nothing, anywhere.** Not in the repo, not on the PC.
- Do not touch global git config, PATH, installed runtimes, or other repos.
- No global npm installs. Dependencies stay local to this project.
- Only file changed outside this repo this session:
  `~/.claude/statusline-command.sh` — one additive `budget-probe` block that
  mirrors rate-limit state to a file so the budget rule is enforceable.
  Backup: `statusline-command.sh.pre-budget-probe.bak`. Revertable any time.
  No further changes outside the repo without asking.

## Autonomy
- **Do not ask questions.** Pick the recommended option, state the choice in
  STATUS.md / WORKLOG.md, and keep moving. The session must run unattended.
- Items genuinely requiring Siddhant (credentials, payments, deletions, schema
  migrations, DNS) go under "Blockers" in STATUS.md and work continues elsewhere.
- Never idle waiting for an answer. Only the 70% budget line stops work.

## Commit budget
- **2 minimum, 5 maximum commits per day.** Quality over frequency.
- Therefore: batch related backlog items into one coherent change set, review it
  properly, then commit once. Do not commit per-file or per-micro-fix.
- Keep an internal checklist per bundle; only commit when the whole bundle is
  verified (build + lint + typecheck + manual route checks on :3100).
- Typical day: 1 substantial PR (2-3 commits) + 1 content/report commit.
- Record each commit in WORKLOG.md with the backlog items it closes.

## Free-tier ceilings — measured 2026-10-15 (never exceed; zero spend)
Vercel **Hobby** (www.neographanalytics.com, project `vercel-market-research`):
| Resource | Used | Limit | Headroom |
|---|---|---|---|
| Fluid Active CPU | 46m 33s | 4h | ample |
| Deployment storage | 1.35 GB | 10 GB | ample |
| Image Optimization transformations | 492 | 5,000 | **watch** |
| Image Opt. cache writes | 4.3K | 100K | ok |
| Fast Origin Transfer | 944 MB | 10 GB | ok |
| Fast Data Transfer | 8.1 GB | 100 GB | ok |
| ISR reads | 92K | 1M | ok |
| ISR writes | 5.2K | 200K | ok |
| CDN requests | 68K | 1M | ok |

Rules that follow from the above:
- **Image Optimization transformations is the tightest limit (5K/mo).** Every distinct
  `next/image` src+size+quality combination burns one. So: serve chart visuals as
  inline SVG (zero transformations), pre-size OG images at exactly 1200x630 and
  serve them `unoptimized`, and never run `next/image` over a large gallery.
- Do not add Vercel Analytics, Speed Insights, Observability or Firewall paid tiers.
- Do not add a credit card, start a Pro trial, or accept any upgrade prompt.
- ISR: prefer long `revalidate` windows (>= 1h) over short ones; 140 report pages
  on a short window would multiply ISR writes.
- Supabase free tier: 500MB DB / 5GB egress / 1GB storage. Never `select('*')`
  table-wide on `neograph_reports`; its JSONB columns are large.
- Cloudflare: R2 only (10GB + free egress). Never Cloudflare Images (paid per
  transformation). No Workers Paid, no Argo, no paid add-ons.
- **Before enabling any service, confirm it is free at our volume and log it here.**
  If a change would push any meter toward its limit, stop and report instead.

## No browsers — permanent
- **Never open Claude in Chrome, a browser window, or any GUI tool again.**
  The one-time capture session on 2026-10-15 is closed and not to be repeated.
- All verification is headless: `curl` against the dev server on :3100, `curl`
  against production, reading source, and WebFetch for external pages.
- If something genuinely cannot be checked headlessly, log it under Blockers in
  STATUS.md and move on. Do not ask to open a browser.

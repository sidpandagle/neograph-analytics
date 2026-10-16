# Deploy runbook

One scheduled merge to `main` a day, at 9:00 pm IST; each merge is a deploy.
The owner may request extra merges at any time — those are uncapped.
Content and code are published in one sequence because of one constraint:

> `/reports/[slug]` and `/blog/[slug]` set `dynamicParams = false`. A row that
> exists in Supabase but was not in the last build's `generateStaticParams()`
> **404s**, while the listing — ISR, hourly — already shows a card for it.

So Supabase content and the deploy go together, in this order.

## 1. Pre-flight

```bash
python scripts/budget-check.py          # exit 0 required
git log --oneline main..HEAD | wc -l    # what this deploy carries
node scripts/report-db.mjs check content/reports/[a-z]*.json
node scripts/blog-db.mjs check content/blogs/*.json
node scripts/blog-db.mjs check content/press-releases/*.json --press
```

Every check must pass before anything is published. `_reference-*` and
`_superseded-*` drafts are excluded by the `[a-z]*` glob on purpose.

## 2. Publish content, reports first

```bash
node scripts/report-db.mjs publish content/reports/[a-z]*.json
node scripts/blog-db.mjs check content/blogs/*.json --online        # link check
node scripts/blog-db.mjs publish content/blogs/*.json
node scripts/blog-db.mjs check content/press-releases/*.json --press --online
node scripts/blog-db.mjs publish content/press-releases/*.json --press
```

Reports first because `--online` verifies every internal `/reports/<slug>` link
against the live corpus: an article that cites a report fails its own check
until that report exists. That is the intended behaviour.

Publishing is an upsert on `slug`. Nothing is ever deleted.

## 3. Build and audit locally

```bash
npm run build                 # must compile and prerender every report page
node scripts/audit-html.mjs   # 0 errors required
node scripts/report-db.mjs audit   # 0 titles >60, 0 descriptions >160
```

If a local server is needed, use a port no one else holds — a stale
`next start` on :3100 served old code during one verification and produced a
false pass. Confirm the process before trusting the output:

```bash
netstat -ano | grep ":3100"
# then, by PID:  Get-CimInstance Win32_Process -Filter "ProcessId=<pid>"
```

## 4. Merge

```bash
git push origin work/continuous-improvements
gh pr create --base main --head work/continuous-improvements --title "..." --body "..."
gh pr merge <n> --squash --delete-branch=false
```

Never commit to `main` directly. Repo-local identity only
(`git config --local user.email` -> `siddhant.pandagle1998@gmail.com`).

## 5. Verify in production

```bash
node scripts/audit-html.mjs --prod            # expect 0 errors
curl -sI https://www.neographanalytics.com/reports/<new-slug> | head -1
curl -s https://www.neographanalytics.com/llms.txt | grep -c "^URL: .*/reports/"
curl -s https://www.neographanalytics.com/reports | grep -o "[0-9]* research reports"
```

A new report URL returning 404 after the deploy means the build ran before the
row was published — republish nothing, just redeploy.

## 6. Record

- `STATUS.md` — overwrite: slots used today (IST), what shipped, what is next.
- `WORKLOG.md` — append: what changed and the measurement behind it.
- `REVIEW-QUEUE.md` — move fixed findings out of Open, with the measured before
  and after.
- `research/REPORT-PIPELINE.md` — move published topics to `published`.

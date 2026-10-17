# Collision quarantine — round 6A, 2026-10-18

Drafts held here are **not publishable** and are not wired into anything. They
are kept, not deleted, because each contains real sourced work; what they lack
is a trustworthy pairing between a figure and its evidence file.

## patient-monitoring-devices-market (pipeline row 49)

Two agents drafted this one slug concurrently. Neither was told to; the
dispatch sent one agent per topic. The result is a **mismatched pair** on the
live paths:

- `research/patient-monitoring-devices-market-notes.md` — agent A's evidence
  file (28,821 bytes), preserved here as `*-notes.agent-A.md`.
- `content/reports/patient-monitoring-devices-market.json` — agent B's report
  (55,556 bytes), preserved here as `*.agent-B.json`.

They describe different markets. Measured by substring count across the two
live files:

| Figure | in agent A's notes | in agent B's JSON |
|---|---|---|
| `9.04`  | 0 | 25 |
| `9.32`  | 0 | 7 |
| `3,587` | 0 | 9 |
| `56.91` | 5 | 0 |
| `106.20`| 5 | 0 |

Agent B's JSON states in `data_validation` that its arithmetic "is printed in
research/patient-monitoring-devices-market-notes.md". **That file does not
contain any of its figures.** The report is therefore unsourced in the only
sense the house rule cares about, and it must not be published.

`node scripts/report-db.mjs check` returns **PASS, exit 0** on it anyway. That
is the lesson worth keeping: `check` reconciles a report's arithmetic against
itself. It cannot tell whether the evidence file backs the numbers, so a
passing `check` is not evidence of sourcing. The skill already says to
spot-check grounding by hand; this is what it is for.

Agent B's JSON also carries **8 populated `recent_developments`** entries
against a dispatch that required `[]`. They cite real companies, integer years
and verifiable events (FDA K-numbers, 10-K lines), so they may well be sound —
but they were not reviewed, and the field was supposed to be empty.

### To resolve (owner's call, not a subagent's)

Either re-pair agent A's notes with a report built from them — A's own headline
was Fortune Business Insights FBI103484, $56.91B (2026) -> $106.20B (2034) at
8.1%, and it failed `check` only on a 161-char `seo.meta_description`, a
one-character trim — or re-derive an evidence file for agent B's JSON and
verify its 8 developments. Do not publish either until one of those is done.

---

## Update, same evening — the pairing resolved itself

Agent B's evidence file landed after the quarantine note above was written,
replacing agent A's on the live path. Re-running the same substring test:

| Figure | agent B's notes (now live) | agent B's JSON |
|---|---|---|
| `9.04`  | 32 | 25 |
| `9.32`  | 7  | 7  |
| `3,587` | 3  | 9  |
| `56.91` | 4  | 0  |
| `106.20`| 3  | 0  |

The pair is coherent. `56.91` / `106.20` still appear in the notes because
Fortune Business Insights is one of the nine estimates the notes tabulate —
which is what a survey of published estimates is supposed to do, not a
leftover of agent A's headline.

The live report is **$9.04B (2026) -> $15.43B (2032) at 9.32%** (360iResearch,
bedside multiparameter, wearables excluded). `check` exit 0; the independent
verifier reproduces at a **0.0000 pt** delta. The notes carry the derivation,
including why 9.32% rather than the publisher's 9.01%: the publisher's own
2026 estimate sits below its 2029-based curve, so the two endpoints actually
connect at 9.32%.

So row 49 is not blocked on sourcing any more. **What it is still blocked on
is review:** the JSON carries 8 populated `recent_developments` against a
dispatch that required `[]`. They cite real companies, integer years and
verifiable events, but nobody has checked them, and the field was meant to be
empty. That is a read, not a re-draft.

`*-notes.agent-A.md` is kept regardless. It is a complete, independent
evidence file for the same market built from a different publisher (Fortune
FBI103484, $56.91B (2026) -> $106.20B (2034) at 8.1%, a 4.93x base-year
spread against 1.36x on CAGR), and its tier analysis of the remote/wearable
boundary is per-publisher and sourced. If the wearables-excluded scope above
is ever questioned, A's file is the cross-check.

## digital-pathology-market (pipeline row 50) — two coherent, exclusive versions

`digital-pathology-market.rewritten-after-verify.json` arrived on the live path
after the committed version had been verified. It is **not** a corruption: its
prose, metrics and unit agree with each other throughout. It is a wholesale
re-source to a different publisher.

| | committed (restored, live) | the rewrite (here) |
|---|---|---|
| unit | Billion | Million |
| base 2026 | $1.66B | $2,010M |
| 2032 | $4.09B | $3,541.46M |
| CAGR | 16.22% | 9.9% |

Both pass `check` at exit 0 and both reconcile against their own endpoints
(`(3541.46/2010)^(1/6)-1 = 9.9000%` exactly). They differ by **1.21x** on the
base and **6.3 points** of growth, and they cannot both be the house view.

The committed version is live because it is the one that was verified and
reasoned about in a commit message; that is a reversible default, not a verdict
on which publisher is right. Picking between them is the owner's call.

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

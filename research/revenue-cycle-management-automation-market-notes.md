# Revenue Cycle Management Automation Market — moved, not deleted

This path held the evidence file for the draft slug
`revenue-cycle-management-automation-market`. That draft published as
**`revenue-cycle-management-market`** (pipeline row 19), because the research
itself found that no defensible standalone size for RCM *automation* exists —
the only published automation figure fails the vendor-revenue test by 29x.

The evidence file now sits at its published slug:
**`research/revenue-cycle-management-market-notes.md`** — same content, moved
with `git mv` on 2026-10-18, nothing rewritten.

Why it moved: `scripts/verify-report-arithmetic.py --pair` matches a report to
its evidence by exact filename (`pair()`, `research/<slug>-notes.md`), so a
deliberate slug rename read to it as **missing research**. It was recorded as
pairing debt in `research/REPORT-PIPELINE.md` on that basis. The figures had in
fact reconciled all along: the headline `73.61` / `148.44` / `12.4` appear in
the file 4, 2 and 5 times respectively.

The superseded report JSON for this slug is kept alongside at
`content/reports/_superseded-revenue-cycle-management-automation-market.json`.

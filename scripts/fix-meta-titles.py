# -*- coding: utf-8 -*-
"""Shorten report meta_titles and repair contradictory region prefixes.

Run with --apply to write; without it, this is a dry run that writes nothing.

Three problems, in order of severity:

1. 26 titles claim BOTH "Global" and a region, e.g. "Global Asia Pacific
   Biosimilars Market". The slug (asia-pacific-biosimilars-market) settles which
   is correct, so the leading "Global " is dropped -- but ONLY when the slug
   confirms the region. No slug corroboration, no change.

2. A boilerplate tail "| Market Research Report 2032" is appended to titles that
   already end in 2032, so the year appears twice.

3. The remaining long forms ("Market Size, Share and Trends Analysis Report
   2032") are condensed. 141 of 142 titles exceed the ~60 characters Google
   renders, at a mean of 92.4.

meta_description is NOT touched here: only 14 rows exceed 160 characters and
each needs an editorial judgement, not a pattern substitution.
"""
import json
import os
import re
import sys
import urllib.request
import urllib.error

sys.stdout.reconfigure(encoding="utf-8")

REPO = r"D:\Siddhant\learning\neograph-analytics"
TABLE = "neograph_reports"
APPLY = "--apply" in sys.argv

REGIONS = [
    "Asia Pacific", "North America", "Latin America", "Middle East and Africa",
    "Middle East", "Europe", "United States", "China", "India", "Japan",
    "Germany", "United Kingdom", "UK",
]

TAILS = [" | Market Research Report 2032", " Market Research Report 2032"]

LONG_FORMS = [
    (r"Market Size, Share and Trends Analysis Report 2032$", "Market Size & Forecast 2032"),
    (r"Market Size, Share, Growth and Forecast to 2032$", "Market Size & Forecast 2032"),
    (r"Market Size, Share and Trends Analysis$", "Market Size & Forecast 2032"),
    (r"Market Size, Share and Forecast to 2032$", "Market Size & Forecast 2032"),
    (r"Market Analysis, Opportunities and Forecast 2024-2032$", "Market Analysis & Forecast 2032"),
    (r"Market - Growth Drivers, Restraints and Future Outlook 2032$", "Market Drivers & Outlook 2032"),
    (r"Industry Size, Competitive Landscape and Regional Analysis$", "Industry Size & Analysis 2032"),
    (r"Market Trends Report 2032$", "Market Trends 2032"),
    (r"Market Forecast$", "Market Forecast 2032"),
]


def load_env():
    env = {}
    for line in open(os.path.join(REPO, "env"), encoding="utf-8"):
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            env[k.strip()] = v.strip().strip('"').strip("'")
    return env


def slugify(text):
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def shorten(title, slug):
    t = title.replace("\u2011", "-").replace("\u2013", "-").replace("\u2014", "-")
    t = re.sub(r"\s+", " ", t).strip()
    notes = []

    # 1. "Global <Region> ..." -- drop "Global" only if the slug names the region.
    m = re.match(r"^Global (" + "|".join(map(re.escape, REGIONS)) + r")\b", t)
    if m and slug.startswith(slugify(m.group(1))):
        t = t[len("Global "):]
        notes.append("dropped contradictory 'Global'")

    # 2. redundant boilerplate tail
    for tail in TAILS:
        if t.endswith(tail):
            t = t[: -len(tail)].rstrip(" |-").strip()
            notes.append("stripped duplicate tail")
            break

    # 3. condense the remaining long form
    for pat, rep in LONG_FORMS:
        new = re.sub(pat, rep, t)
        if new != t:
            t = new
            notes.append("condensed long form")
            break

    return re.sub(r"\s+", " ", t).strip(), notes


def main():
    env = load_env()
    base = env["NEXT_PUBLIC_SUPABASE_URL"].rstrip("/")
    key = env["SUPABASE_SERVICE_ROLE_KEY"]
    headers = {"apikey": key, "Authorization": f"Bearer {key}",
               "Content-Type": "application/json"}

    req = urllib.request.Request(
        f"{base}/rest/v1/{TABLE}?select=slug,meta_title&order=slug", headers=headers)
    rows = json.loads(urllib.request.urlopen(req).read().decode())

    plan = []
    for r in rows:
        old = (r.get("meta_title") or "").strip()
        if not old:
            continue
        new, notes = shorten(old, r["slug"])
        if new != old:
            plan.append({"slug": r["slug"], "old": old, "new": new, "notes": notes})

    lo = [len(r.get("meta_title") or "") for r in rows]
    by_slug = {p["slug"]: p["new"] for p in plan}
    ln = [len(by_slug.get(r["slug"], r.get("meta_title") or "")) for r in rows]

    print(f"rows               : {len(rows)}")
    print(f"to change          : {len(plan)}")
    print(f"mean title length  : {sum(lo)/len(lo):.1f} -> {sum(ln)/len(ln):.1f}")
    print(f"max  title length  : {max(lo)} -> {max(ln)}")
    print(f"over 60 characters : {sum(1 for x in lo if x > 60)} -> {sum(1 for x in ln if x > 60)}")
    print(f"'Global <Region>'  : {sum(1 for p in plan if 'dropped contradictory Global' in ' '.join(p['notes']).replace(chr(39),''))} repaired")

    if not APPLY:
        print("\nDRY RUN -- nothing written. Re-run with --apply.")
        print("\n-- 6 samples --")
        for p in plan[:6]:
            print(f'  {p["slug"]}')
            print(f'    {len(p["old"]):3d}  {p["old"]}')
            print(f'    {len(p["new"]):3d}  {p["new"]}   [{", ".join(p["notes"])}]')
        return 0

    ok = 0
    for p in plan:
        body = json.dumps({"meta_title": p["new"]}).encode()
        req = urllib.request.Request(
            f"{base}/rest/v1/{TABLE}?slug=eq.{p['slug']}",
            data=body, headers={**headers, "Prefer": "return=minimal"}, method="PATCH")
        try:
            with urllib.request.urlopen(req) as resp:
                if resp.status in (200, 204):
                    ok += 1
                else:
                    print("unexpected status", resp.status, p["slug"])
        except urllib.error.HTTPError as e:
            print("FAILED", p["slug"], e.code, e.read().decode()[:200])

    print(f"\nupdated {ok}/{len(plan)} rows")
    return 0 if ok == len(plan) else 1


if __name__ == "__main__":
    sys.exit(main())

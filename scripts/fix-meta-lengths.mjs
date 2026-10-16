/**
 * Bring `meta_title` and `meta_description` inside the lengths Google renders.
 *
 * State before this ran (from `report-db.mjs audit`, 152 rows):
 *   meta_title  > 60 chars : 45
 *   meta_description > 160 : 14
 *
 * An earlier pass (`scripts/fix-meta-titles.py`) cut the mean title from 92.4 to
 * 56.4 chars and repaired 26 titles claiming both "Global" and a region. What it
 * left behind is the tail — 61 to 77 characters — where no pattern substitution
 * helps and the template itself has to shorten.
 *
 * Titles: try progressively shorter templates against the market name taken from
 * the row's own `title`, and take the first that fits. A row whose name alone
 * exceeds 60 characters is left alone and reported: truncating a market's name
 * is an editorial decision, not a mechanical one.
 *
 * Descriptions: rewritten from the row's **structured figures** rather than
 * trimmed. Several of the long ones restate numbers that no longer match the
 * columns the page renders, and one — united-states-cell-gene-therapy — is
 * truncated mid-sentence at "is expected to ". A description built from
 * `market_size`, `base_year` and `forecast_period` cannot drift from the page.
 *
 * Descriptions that are already analytical rather than formulaic (the OIS row
 * opens with the 2.74x spread) are shortened in place instead, because the
 * sentence is worth more than the template.
 *
 *   node scripts/fix-meta-lengths.mjs            # dry run, prints every change
 *   node scripts/fix-meta-lengths.mjs --apply    # writes
 */
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const APPLY = process.argv.includes('--apply');
const TITLE_MAX = 60;
const DESC_MAX = 160;

function loadEnv() {
  for (const f of ['.env.local', 'env']) {
    if (!fs.existsSync(f)) continue;
    for (const line of fs.readFileSync(f, 'utf8').split('\n')) {
      const t = line.trim();
      if (!t || t.startsWith('#') || !t.includes('=')) continue;
      const i = t.indexOf('=');
      const k = t.slice(0, i).trim();
      if (!process.env[k]) process.env[k] = t.slice(i + 1).trim();
    }
  }
}

loadEnv();
const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

/** The market's name, with any "Market ..." tail and boilerplate removed. */
function marketName(row) {
  const source = row.meta_title || row.title || '';
  // Some rows say "... Industry Size & Analysis 2032" rather than "... Market",
  // so both words have to terminate the name.
  const cut = source.split(/\s+(?:Market|Industry)\b/i)[0].trim();
  return cut || source.trim();
}

function endYear(row) {
  const m = String(row.forecast_period ?? '').match(/(\d{4})\s*$/);
  return m ? m[1] : '';
}

function shortenTitle(row) {
  const name = marketName(row);
  const end = endYear(row);
  const candidates = [
    end && `${name} Market Size & Forecast ${end}`,
    end && `${name} Market Size ${end}`,
    end && `${name} Market Forecast ${end}`,
    end && `${name} Market ${end}`,
    `${name} Market Size & Forecast`,
    `${name} Market`,
  ].filter(Boolean);
  return candidates.find((c) => c.length <= TITLE_MAX) ?? null;
}

/** `8.49` + "Billion" -> "$8.49B". */
function money(value, unit) {
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  const suffix =
    { trillion: 'T', billion: 'B', million: 'M', thousand: 'K' }[
      String(unit ?? '').toLowerCase()
    ] ?? '';
  const digits = Math.abs(n) >= 100 ? 0 : Math.abs(n) >= 10 ? 1 : 2;
  return `$${n.toFixed(digits)}${suffix}`;
}

function rebuildDescription(row) {
  const name = marketName(row);
  const cur = money(row.market_size?.current_value, row.unit);
  const fc = money(row.market_size?.forecast_value, row.unit);
  const cagr = Number(row.market_size?.cagr);
  const end = endYear(row);

  // A description that restates figures is only worth writing if the figures
  // are there; otherwise fall back to trimming the existing sentence.
  if (cur && fc && Number.isFinite(cagr) && row.base_year && end) {
    /* Figures only. An added tail like "sources and methodology inside" would be
       a claim about the page's contents, and these are legacy rows whose depth
       varies — the numbers are the part that is certainly true. */
    const built = `${name} market: ${cur} in ${row.base_year}, forecast ${fc} by ${end} at ${cagr}% CAGR.`;
    if (built.length <= DESC_MAX) return built;
  }
  return null;
}

/** Cut at the last sentence boundary that fits, else the last word. */
function trimToLimit(text, limit) {
  const t = String(text ?? '').trim();
  if (t.length <= limit) return t;
  const window = t.slice(0, limit);
  const lastStop = Math.max(window.lastIndexOf('. '), window.lastIndexOf('! '));
  if (lastStop > limit * 0.55) return window.slice(0, lastStop + 1).trim();
  const lastSpace = window.lastIndexOf(' ');
  return `${window.slice(0, lastSpace).replace(/[,;:—-]$/, '').trim()}.`;
}

const { data, error } = await sb
  .from('neograph_reports')
  .select('slug,title,meta_title,meta_description,market_size,base_year,forecast_period,unit');
if (error) {
  console.error(error.message);
  process.exit(1);
}

const updates = [];
const skipped = [];

for (const row of data) {
  const patch = {};
  const title = row.meta_title ?? '';
  const desc = row.meta_description ?? '';

  if (title.length > TITLE_MAX) {
    const next = shortenTitle(row);
    if (next && next.length <= TITLE_MAX && next !== title) patch.meta_title = next;
    else skipped.push(`${row.slug}: title ${title.length} chars, no template fits — "${title}"`);
  }

  if (desc.length > DESC_MAX) {
    // Keep an analytical opening sentence; rebuild a formulaic one.
    const formulaic = /was valued at|is expected to grow|Explore key trends/i.test(desc);
    const next = formulaic ? rebuildDescription(row) ?? trimToLimit(desc, DESC_MAX)
                           : trimToLimit(desc, DESC_MAX);
    if (next && next.length <= DESC_MAX && next !== desc) patch.meta_description = next;
    else skipped.push(`${row.slug}: description ${desc.length} chars, no safe shortening`);
  }

  if (Object.keys(patch).length) updates.push({ slug: row.slug, patch, before: { title, desc } });
}

for (const u of updates) {
  console.log(`\n${u.slug}`);
  if (u.patch.meta_title) {
    console.log(`  T ${u.before.title.length} -> ${u.patch.meta_title.length}`);
    console.log(`    - ${u.before.title}`);
    console.log(`    + ${u.patch.meta_title}`);
  }
  if (u.patch.meta_description) {
    console.log(`  D ${u.before.desc.length} -> ${u.patch.meta_description.length}`);
    console.log(`    - ${u.before.desc}`);
    console.log(`    + ${u.patch.meta_description}`);
  }
}

console.log(`\n${updates.length} rows to update, ${skipped.length} left for editorial judgement`);
skipped.forEach((s) => console.log(`  ! ${s}`));

if (!APPLY) {
  console.log('\nDry run. Re-run with --apply to write.');
  process.exit(0);
}

let ok = 0;
for (const u of updates) {
  const { error: upErr } = await sb
    .from('neograph_reports')
    .update(u.patch)
    .eq('slug', u.slug);
  if (upErr) console.error(`x ${u.slug}: ${upErr.message}`);
  else ok++;
}
console.log(`\n${ok} of ${updates.length} rows written`);

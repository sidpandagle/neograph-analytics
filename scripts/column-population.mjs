/**
 * Column population probe — which JSONB columns actually carry data, corpus-wide.
 *
 * Why this exists: BACKLOG P1 "visuals" asks for a country-comparison chart and
 * a competitive-position chart. Both are only worth building if the columns
 * behind them are populated, and a chart over an empty column is a component
 * that never renders (the repo already carries six of those). The drafts in
 * content/reports/ are not evidence either way: the 182 published rows predate
 * the current draft template.
 *
 * Egress discipline: this selects the FIRST element of each array column
 * (`country_analysis->0`), never the array. One object per row per column,
 * not 182 series. AGENTS.md and CLAUDE.md forbid list-shaped reads of the
 * large JSONB columns; this is the cheap form that answers the same question.
 *
 *   node scripts/column-population.mjs
 */
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

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
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY.');
  process.exit(2);
}
const sb = createClient(url, key, { auth: { persistSession: false } });

/** Columns probed by their first element only. */
const COLUMNS = ['country_analysis', 'competitive_landscape', 'company_profiles', 'regional_analysis'];

/**
 * `--depth <col>` additionally probes how long that column's arrays are, by
 * selecting single elements at a few indices rather than the arrays. Still one
 * small object per index per row — the point is to size a chart's axis without
 * paying for the series.
 */
const depthArg = process.argv.indexOf('--depth');
const depthCol = depthArg > -1 ? process.argv[depthArg + 1] : null;
const DEPTH_INDICES = [3, 5, 7, 9, 11];

if (depthCol) {
  const sel = ['slug', ...DEPTH_INDICES.map((i) => `i${i}:${depthCol}->${i}`)].join(',');
  const { data, error } = await sb.from('neograph_reports').select(sel);
  if (error) {
    console.error(error.message);
    process.exit(1);
  }
  console.log(`${depthCol} — rows reaching each index (of ${data.length}):`);
  for (const i of DEPTH_INDICES) {
    console.log(`    index ${String(i).padStart(2)}  ${data.filter((r) => r[`i${i}`] != null).length}`);
  }
  process.exit(0);
}

const select = ['slug', ...COLUMNS.map((c) => `first_${c}:${c}->0`)].join(',');
const { data, error } = await sb.from('neograph_reports').select(select);
if (error) {
  console.error(error.message);
  process.exit(1);
}

console.log(`rows: ${data.length}\n`);
for (const col of COLUMNS) {
  const firsts = data.map((r) => r[`first_${col}`]).filter((v) => v != null);
  const keys = new Map();
  for (const f of firsts) {
    if (f && typeof f === 'object') {
      for (const k of Object.keys(f)) keys.set(k, (keys.get(k) || 0) + 1);
    }
  }
  console.log(`${col}: ${firsts.length} of ${data.length} rows have a first element`);
  for (const [k, n] of [...keys.entries()].sort((a, b) => b[1] - a[1])) {
    const numeric = firsts.filter((f) => typeof f?.[k] === 'number').length;
    console.log(`    ${k.padEnd(24)} present ${String(n).padStart(4)}   numeric ${String(numeric).padStart(4)}`);
  }
  if (firsts[0]) console.log(`    sample: ${JSON.stringify(firsts[0]).slice(0, 260)}`);
  console.log('');
}

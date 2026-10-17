/**
 * One-off, re-runnable: give the non-healthcare clusters an honest `industry`.
 *
 * 22 reports whose subject is lunar mining, undersea cable, green hydrogen,
 * high-entropy alloys, precision-farming drones or quantum networking were
 * labelled `Life Sciences`, and both the mega-menu tiles and the `/reports`
 * chips are derived from that column — so the taxonomy actively misfiled them.
 * Industry is matched on the slug prefix the clusters were published under.
 *
 *   node scripts/relabel-industries.mjs          # dry run, prints the diff
 *   node scripts/relabel-industries.mjs --apply
 */
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

for (const line of fs.readFileSync('.env.local', 'utf8').split('\n')) {
  const t = line.trim();
  if (!t || t.startsWith('#') || !t.includes('=')) continue;
  const i = t.indexOf('=');
  const k = t.slice(0, i).trim();
  if (!process.env[k]) process.env[k] = t.slice(i + 1).trim();
}

const RULES = [
  [/^advanced-materials-/, 'Advanced Materials'],
  [/^agritech-/, 'Agriculture & Food Tech'],
  [/^agricultural-biotechnology-/, 'Agriculture & Food Tech'],
  [/^biotechnology-cell-based-meat-/, 'Agriculture & Food Tech'],
  [/^climate-tech-/, 'Climate & Energy'],
  [/^digital-infrastructure-/, 'Digital Infrastructure'],
  [/^quantum-technology-/, 'Quantum Technology'],
  [/^space-economy-/, 'Space Economy'],
  [/^synthetic-biology-/, 'Synthetic Biology'],
];

const apply = process.argv.includes('--apply');
const c = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const { data, error } = await c.from('neograph_reports').select('report_id, slug, industry').order('slug');
if (error) { console.error(error.message); process.exit(1); }

const changes = [];
for (const r of data) {
  const rule = RULES.find(([re]) => re.test(r.slug));
  if (!rule || r.industry === rule[1]) continue;
  changes.push({ id: r.report_id, slug: r.slug, from: r.industry, to: rule[1] });
}

for (const ch of changes) console.log(`${ch.slug.padEnd(52)} ${String(ch.from).padEnd(16)} -> ${ch.to}`);
console.log(`\n${changes.length} rows would change (${new Set(changes.map(c => c.to)).size} new labels)`);

if (!apply) { console.log('dry run — pass --apply to write'); process.exit(0); }

for (const ch of changes) {
  const { error: e } = await c.from('neograph_reports').update({ industry: ch.to }).eq('slug', ch.slug);
  if (e) { console.error(`FAILED ${ch.slug}: ${e.message}`); process.exit(1); }
}
console.log(`applied ${changes.length} updates`);

const { data: after } = await c.from('neograph_reports').select('industry');
const counts = new Map();
for (const r of after) counts.set(r.industry, (counts.get(r.industry) ?? 0) + 1);
console.log('\ncorpus by industry:');
for (const [k, v] of [...counts].sort((a, b) => b[1] - a[1])) console.log(`  ${String(v).padStart(3)}  ${k}`);
console.log(`  total ${after.length}`);

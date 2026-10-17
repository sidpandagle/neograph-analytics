/**
 * Legal page tool — read and publish `neograph_legal_pages` rows.
 *
 * Same shape and discipline as `report-db.mjs`: env from `.env.local`, service
 * role key, upsert keyed on `slug`, nothing ever deleted.
 *
 *   node scripts/legal-db.mjs list
 *   node scripts/legal-db.mjs dump <slug> [outfile]
 *   node scripts/legal-db.mjs publish content/legal/*.json
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

function client() {
  loadEnv();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

const TABLE = 'neograph_legal_pages';

async function list() {
  const { data, error } = await client().from(TABLE).select('id, slug, title, last_updated, category').order('id');
  if (error) throw new Error(error.message);
  for (const r of data) console.log(`${String(r.id).padStart(3)}  ${r.slug.padEnd(24)} ${r.last_updated ?? '-'}  ${r.title}`);
  console.log(`\n${data.length} rows`);
}

async function dump(slug, out) {
  const { data, error } = await client().from(TABLE).select('*').eq('slug', slug).single();
  if (error) throw new Error(error.message);
  const json = JSON.stringify(data, null, 2);
  if (out) { fs.writeFileSync(out, json); console.log(`wrote ${out}`); } else console.log(json);
}

/* A legal page is prose, so there is no numeric check to run — but an empty
   body or a missing meta pair silently ships a blank page with no description,
   so those are refused. */
function check(row, file) {
  const errs = [];
  for (const k of ['slug', 'title', 'excerpt', 'content', 'last_updated', 'category']) {
    if (!row[k] || !String(row[k]).trim()) errs.push(`${k} is empty`);
  }
  if (row.content && row.content.length < 400) errs.push(`content is only ${row.content.length} chars`);
  const m = row.metadata || {};
  if (!m.metaTitle) errs.push('metadata.metaTitle is missing');
  if (!m.metaDescription) errs.push('metadata.metaDescription is missing');
  if (m.metaTitle && m.metaTitle.length > 60) errs.push(`metaTitle is ${m.metaTitle.length} chars (max 60)`);
  if (m.metaDescription && m.metaDescription.length > 160) errs.push(`metaDescription is ${m.metaDescription.length} chars (max 160)`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(row.last_updated || '')) errs.push('last_updated is not YYYY-MM-DD');
  if (errs.length) { console.error(`FAIL ${file}`); for (const e of errs) console.error(`  - ${e}`); }
  else console.log(`ok   ${file}  (${row.content.length} chars)`);
  return errs.length === 0;
}

async function publish(files) {
  const rows = [];
  let allOk = true;
  for (const f of files) {
    const row = JSON.parse(fs.readFileSync(f, 'utf8'));
    if (!check(row, f)) { allOk = false; continue; }
    rows.push(row);
  }
  if (!allOk) { console.error('\nRefusing to publish: fix the failures above.'); process.exit(1); }
  const { data, error } = await client().from(TABLE).upsert(rows, { onConflict: 'slug' }).select('id, slug');
  if (error) throw new Error(error.message);
  for (const r of data) console.log(`published  ${r.slug}  (id ${r.id})`);
}

const [cmd, ...args] = process.argv.slice(2);
try {
  if (cmd === 'list') await list();
  else if (cmd === 'dump') await dump(args[0], args[1]);
  else if (cmd === 'check') { if (!args.map(f => check(JSON.parse(fs.readFileSync(f, 'utf8')), f)).every(Boolean)) process.exit(1); }
  else if (cmd === 'publish') await publish(args);
  else console.log('usage: node scripts/legal-db.mjs <list|dump|check|publish> [args]');
} catch (e) {
  console.error(e.message);
  process.exit(1);
}

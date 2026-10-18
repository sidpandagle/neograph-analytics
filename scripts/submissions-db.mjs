/**
 * Lead table tool — confirm `form_submissions` exists and read it from the CLI.
 *
 *   node scripts/submissions-db.mjs check          # table present? how many rows?
 *   node scripts/submissions-db.mjs list [n]       # newest n (default 10)
 *
 * DDL cannot go through PostgREST, so creating the table is a one-time paste of
 * scripts/sql/form_submissions.sql into the Supabase SQL editor. `check` is how
 * you confirm that landed.
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
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY.');
    process.exit(2);
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

const [cmd, arg] = process.argv.slice(2);
const db = client();

if (cmd === 'check') {
  // Not head:true — a HEAD against a missing table came back with no error and
  // a null count, which read as "present" for a table that did not exist.
  const { count, error } = await db
    .from('form_submissions')
    .select('id', { count: 'exact' })
    .limit(1);
  if (error || count === null) {
    console.error('form_submissions is not readable:', error ? error.message : 'no count returned');
    console.error('Run scripts/sql/form_submissions.sql in the Supabase SQL editor.');
    process.exit(1);
  }
  console.log(`form_submissions: present, ${count} row(s).`);
} else if (cmd === 'list') {
  const limit = Math.min(200, Number(arg) || 10);
  const { data, error } = await db
    .from('form_submissions')
    .select('created_at,form_type,full_name,email,company,subject,report_title')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) {
    console.error(error.message);
    process.exit(1);
  }
  for (const r of data) {
    console.log(
      [r.created_at, r.form_type, r.full_name, r.email, r.company, r.subject || r.report_title]
        .map((v) => v ?? '')
        .join(' | ')
    );
  }
  if (!data.length) console.log('(no rows)');
} else {
  console.log('usage: node scripts/submissions-db.mjs check | list [n]');
  process.exit(2);
}

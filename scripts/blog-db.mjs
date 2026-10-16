/**
 * Analysis articles: read and publish `neograph_blogs` rows.
 *
 * The same shape as `report-db.mjs` and for the same reason — the checks have to
 * live somewhere a draft cannot get past them. The article-specific ones:
 *
 * - **Internal links must resolve.** An article that links `/reports/<slug>` for
 *   a slug not in the corpus ships a 404 into the one place a reader is most
 *   likely to click. `check --online` verifies every internal report link
 *   against Supabase; offline it only checks the shape.
 * - **Content is HTML** (the blog page renders it through `dangerouslySetInnerHTML`),
 *   so tags have to balance and there must be no unclosed table.
 * - No U+FFFD, for the same reason as reports: it means a source was decoded
 *   with the wrong codec upstream.
 *
 *   node scripts/blog-db.mjs list
 *   node scripts/blog-db.mjs check content/blogs/*.json [--online]
 *   node scripts/blog-db.mjs publish content/blogs/*.json
 *
 * Publishing is paired with a deploy, exactly as for reports: the blog route
 * sets `dynamicParams = false`, so a row that was not in the last build's
 * `generateStaticParams()` is a 404 while `/blog` already lists it.
 */
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const TABLE = 'neograph_blogs';
const PAIRED = ['p', 'h2', 'h3', 'ul', 'ol', 'li', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'strong', 'em', 'a', 'blockquote'];

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

export function draftToRow(d, id) {
  return {
    id,
    slug: d.slug,
    title: d.title,
    excerpt: d.excerpt,
    category: d.category,
    author: d.author,
    date: d.date,
    read_time: d.read_time,
    location: d.location ?? '',
    content: d.content,
  };
}

export function checkDraft(d, { reportSlugs, blogSlugs } = {}) {
  const errors = [];
  const warnings = [];
  const req = (cond, msg) => { if (!cond) errors.push(msg); };

  req(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(d.slug ?? ''), 'slug missing or not kebab-case');
  req((d.title ?? '').length > 15, 'title missing or too short');
  if ((d.title ?? '').length > 70) warnings.push(`title ${d.title.length} chars — long for a card`);
  req((d.excerpt ?? '').length >= 80, 'excerpt under 80 chars');
  if ((d.excerpt ?? '').length > 260) warnings.push(`excerpt ${d.excerpt.length} chars — the card will clamp it`);
  req((d.category ?? '').length > 2, 'category missing');
  req((d.author ?? '').length > 2, 'author missing');
  req(/^[A-Z][a-z]+ \d{1,2}, \d{4}$/.test(d.date ?? ''), 'date must read like "October 16, 2026" (the corpus convention)');
  req(/^\d+ min read$/.test(d.read_time ?? ''), 'read_time must read like "9 min read"');

  const html = d.content ?? '';
  req(html.length >= 1500, `content ${html.length} chars — an analysis piece, not a note`);
  req(/<h2[\s>]/.test(html), 'content has no <h2> — it needs sections');
  if (/<h1[\s>]/.test(html)) errors.push('content contains an <h1>; the page title is the h1');

  if (html.includes('�')) errors.push('contains U+FFFD — a mis-decoded source, repair the text');

  // Tag balance. A stray </table> or a missing </p> breaks the rest of the page,
  // because this is injected with dangerouslySetInnerHTML.
  for (const tag of PAIRED) {
    const open = (html.match(new RegExp(`<${tag}(?:\\s[^>]*)?>`, 'gi')) ?? []).length;
    const close = (html.match(new RegExp(`</${tag}>`, 'gi')) ?? []).length;
    if (open !== close) errors.push(`<${tag}> opened ${open} times, closed ${close}`);
  }

  // Internal links: shape always, existence when the corpus was loaded.
  const links = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  const internal = links.filter((h) => h.startsWith('/'));
  if (!internal.length) warnings.push('no internal links — an analysis piece should point at the reports behind it');
  for (const href of internal) {
    if (!/^\/[a-z0-9\-/?=&.#]*$/i.test(href)) errors.push(`malformed internal link: ${href}`);
    const m = href.match(/^\/reports\/([a-z0-9-]+)$/);
    if (m && reportSlugs && !reportSlugs.has(m[1])) {
      errors.push(`links /reports/${m[1]}, which is not in the corpus`);
    }
  }

  if (blogSlugs?.has(d.slug)) warnings.push('slug already in neograph_blogs — publish will overwrite that row');

  return { errors, warnings };
}

async function main() {
  const [cmd, ...args] = process.argv.slice(2);
  const files = args.filter((a) => a.endsWith('.json'));
  const online = args.includes('--online');

  if (cmd === 'list') {
    const { data, error } = await client().from(TABLE).select('id,slug,title,date').order('id', { ascending: false });
    if (error) { console.error(error.message); process.exit(1); }
    data.forEach((r) => console.log(`${String(r.id).padStart(3)}  ${r.date.padEnd(20)} ${r.slug}`));
    console.log(`${data.length} articles`);
    return;
  }

  if (cmd === 'check' || cmd === 'publish') {
    if (!files.length) { console.error('no draft files given'); process.exit(2); }

    let reportSlugs;
    let blogSlugs;
    let nextId = 1;
    if (cmd === 'publish' || online) {
      const sb = client();
      const [reports, blogs] = await Promise.all([
        sb.from('neograph_reports').select('slug'),
        sb.from(TABLE).select('id,slug'),
      ]);
      reportSlugs = new Set((reports.data ?? []).map((r) => r.slug));
      blogSlugs = new Set((blogs.data ?? []).map((r) => r.slug));
      nextId = Math.max(0, ...(blogs.data ?? []).map((r) => Number(r.id) || 0)) + 1;
    }

    const ok = [];
    let failed = 0;
    for (const f of files) {
      let d;
      try { d = JSON.parse(fs.readFileSync(f, 'utf8')); }
      catch (e) { console.log(`FAIL ${f}\n  x unreadable JSON: ${e.message}`); failed++; continue; }
      const { errors, warnings } = checkDraft(d, { reportSlugs, blogSlugs });
      const name = path.basename(f);
      if (errors.length) { failed++; console.log(`FAIL ${name}`); errors.forEach((e) => console.log(`  x ${e}`)); }
      else { console.log(`PASS ${name}`); ok.push(d); }
      warnings.forEach((w) => console.log(`  ! ${w}`));
    }

    console.log(`\n${ok.length} pass, ${failed} fail`);
    if (cmd === 'check') process.exit(failed ? 1 : 0);
    if (!ok.length) { console.error('nothing to publish'); process.exit(1); }

    const sb = client();
    for (const d of ok) {
      const existing = (await sb.from(TABLE).select('id').eq('slug', d.slug).maybeSingle()).data;
      const id = existing?.id ?? nextId++;
      const { error } = await sb.from(TABLE).upsert(draftToRow(d, id), { onConflict: 'id' });
      console.log(error ? `x ${d.slug}: ${error.message}` : `+ ${d.slug} (id ${id})`);
    }
    const { count } = await sb.from(TABLE).select('id', { count: 'exact', head: true });
    console.log(`${count} articles now`);
    return;
  }

  console.log('usage: node scripts/blog-db.mjs <list|check|publish> [files] [--online]');
  process.exit(2);
}

const invokedDirectly = process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]));
if (invokedDirectly) await main();

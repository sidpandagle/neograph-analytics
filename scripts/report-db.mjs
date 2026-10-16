/**
 * Report corpus tool — read and publish `neograph_reports` rows.
 *
 * Why this exists: reports were being published to Supabase ad hoc, one at a
 * time, with the evidence discipline enforced only by whoever was typing. This
 * puts the schema mapping and the discipline checks in one place so a batch of
 * drafts can be reviewed and published reproducibly.
 *
 *   node scripts/report-db.mjs count
 *   node scripts/report-db.mjs slugs
 *   node scripts/report-db.mjs dump <slug> [outfile]
 *   node scripts/report-db.mjs check content/reports/*.json
 *   node scripts/report-db.mjs publish content/reports/*.json
 *
 * `check` never touches the network. `publish` runs the same checks and refuses
 * to upsert any file that fails. Nothing is ever deleted: publish is an upsert
 * keyed on `slug`.
 */
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

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

/** Draft JSON (JsonReport shape, `seo` nested) -> Supabase row (SEO flat). */
export function draftToRow(d) {
  return {
    report_id: d.report_id,
    slug: d.slug,
    title: d.title,
    industry: d.industry,
    published_year: d.published_year,
    base_year: d.base_year,
    forecast_period: d.forecast_period,
    historical_period: d.historical_period ?? '',
    currency: d.currency ?? 'USD',
    unit: d.unit ?? 'Billion',
    market_size: d.market_size,
    market_overview: d.market_overview,
    market_dynamics: d.market_dynamics,
    market_segmentation: d.market_segmentation ?? {},
    regional_analysis: d.regional_analysis ?? [],
    country_analysis: d.country_analysis ?? [],
    market_forecast: d.market_forecast ?? [],
    charts: d.charts ?? [],
    competitive_landscape: d.competitive_landscape ?? [],
    company_profiles: d.company_profiles ?? [],
    recent_developments: d.recent_developments ?? [],
    regulatory_landscape: d.regulatory_landscape ?? [],
    research_methodology: d.research_methodology,
    faqs: d.faqs ?? [],
    meta_title: d.seo?.meta_title ?? '',
    meta_description: d.seo?.meta_description ?? '',
    meta_keywords: d.seo?.keywords ?? [],
    executive_summary: d.executive_summary ?? null,
    key_highlights: d.key_highlights ?? null,
    market_context: d.market_context ?? null,
    forecast_analysis: d.forecast_analysis ?? null,
    reader_takeaways: d.reader_takeaways ?? null,
  };
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Discipline checks. Errors block publication; warnings are printed.
 * These encode the house rules: no invented precision, nothing published that
 * a reader cannot check, and no section filled only to look complete.
 */
export function checkDraft(d, { knownSlugs } = {}) {
  const errors = [];
  const warnings = [];
  const req = (cond, msg) => { if (!cond) errors.push(msg); };

  req(typeof d.slug === 'string' && SLUG_RE.test(d.slug), 'slug missing or not kebab-case');
  req(typeof d.title === 'string' && d.title.length > 10, 'title missing');
  req(typeof d.industry === 'string' && d.industry.length > 2, 'industry missing');
  req(typeof d.report_id === 'string' && d.report_id.length > 2, 'report_id missing');
  req(Number.isInteger(d.base_year), 'base_year must be an integer');
  req(Number.isInteger(d.published_year), 'published_year must be an integer');
  req(/^\d{4}\s*[-–]\s*\d{4}$/.test(d.forecast_period ?? ''), 'forecast_period must look like "2025-2032"');

  const ms = d.market_size ?? {};
  req(typeof ms.current_value === 'number' && ms.current_value > 0, 'market_size.current_value missing');
  req(typeof ms.forecast_value === 'number' && ms.forecast_value > 0, 'market_size.forecast_value missing');
  req(typeof ms.cagr === 'number' && ms.cagr > 0, 'market_size.cagr missing');

  // The stated CAGR must actually reconnect current to forecast across the
  // forecast period. A headline that fails its own arithmetic is the most
  // common defect in published market research.
  if (typeof ms.current_value === 'number' && typeof ms.forecast_value === 'number'
      && typeof ms.cagr === 'number' && /^\d{4}/.test(d.forecast_period ?? '')) {
    const [a, b] = d.forecast_period.split(/[-–]/).map((s) => Number(s.trim()));
    const years = b - a;
    if (years > 0) {
      const implied = (Math.pow(ms.forecast_value / ms.current_value, 1 / years) - 1) * 100;
      if (Math.abs(implied - ms.cagr) > 0.6) {
        errors.push(`CAGR ${ms.cagr}% does not reconcile: ${ms.current_value} -> ${ms.forecast_value} over ${years}y implies ${implied.toFixed(2)}%`);
      }
    }
  }

  const mo = d.market_overview ?? {};
  req(typeof mo.summary === 'string' && mo.summary.length >= 350, 'market_overview.summary under 350 chars');
  req(Array.isArray(mo.key_trends) && mo.key_trends.length >= 4, 'market_overview.key_trends needs >= 4 entries');

  const md = d.market_dynamics ?? {};
  for (const k of ['drivers', 'restraints', 'opportunities', 'challenges']) {
    req(Array.isArray(md[k]) && md[k].length >= 3, `market_dynamics.${k} needs >= 3 entries`);
  }

  req(typeof d.executive_summary === 'string' && d.executive_summary.length >= 600,
    'executive_summary under 600 chars — this is the analysis, not a blurb');
  req(Array.isArray(d.key_highlights) && d.key_highlights.length >= 4, 'key_highlights needs >= 4 entries');
  req(typeof d.market_context === 'string' && d.market_context.length >= 400, 'market_context under 400 chars');
  req(typeof d.forecast_analysis === 'string' && d.forecast_analysis.length >= 400, 'forecast_analysis under 400 chars');
  req(Array.isArray(d.reader_takeaways) && d.reader_takeaways.length >= 3, 'reader_takeaways needs >= 3 entries');
  req(Array.isArray(d.faqs) && d.faqs.length >= 5, 'faqs needs >= 5 entries');

  const rm = d.research_methodology ?? {};
  req(Array.isArray(rm.secondary_research) && rm.secondary_research.length >= 3,
    'research_methodology.secondary_research needs >= 3 named sources');
  req(typeof rm.data_validation === 'string' && rm.data_validation.length >= 120,
    'research_methodology.data_validation must say how the figures were checked');

  // Sourcing: the methodology must name checkable publications, not categories.
  const named = (rm.secondary_research ?? []).filter(
    (s) => /\d{4}|register|FDA|WHO|OECD|CMS|IAEA|Eurostat|EMA|NHS|\(/i.test(String(s))
  );
  if (named.length < 2) warnings.push('fewer than 2 secondary sources look like named, datable publications');

  // No invented precision: shares are allowed only where a source is named for
  // them. Plain strings are the safe form for a segmentation dimension.
  const shareBearing = [];
  for (const [dim, items] of Object.entries(d.market_segmentation ?? {})) {
    if (!Array.isArray(items)) continue;
    for (const it of items) {
      if (it && typeof it === 'object' && typeof it.market_share === 'number' && it.market_share > 0) {
        shareBearing.push(`market_segmentation.${dim}`);
      }
    }
  }
  for (const r of d.regional_analysis ?? []) {
    if (typeof r?.market_share === 'number' && r.market_share > 0) shareBearing.push('regional_analysis');
  }
  for (const c of d.country_analysis ?? []) {
    if (typeof c?.market_share === 'number' && c.market_share > 0) shareBearing.push('country_analysis');
  }
  if (shareBearing.length) {
    const prose = [rm.data_validation, d.market_context, d.forecast_analysis, d.executive_summary].join(' ');
    if (!/source|per |derived|register|published|estimate/i.test(prose)) {
      errors.push(`numeric shares present in ${[...new Set(shareBearing)].join(', ')} with no sourcing statement in the prose`);
    } else {
      warnings.push(`numeric shares in ${[...new Set(shareBearing)].join(', ')} — confirm each is sourced, not apportioned by feel`);
    }
  }

  // The competitive section may name players; it may not claim their share.
  for (const c of d.competitive_landscape ?? []) {
    if (typeof c?.market_share === 'number') {
      errors.push(`competitive_landscape.${c.company}: vendor market_share is almost never publicly disclosed — drop it`);
    }
  }

  const mt = d.seo?.meta_title ?? '';
  const mdesc = d.seo?.meta_description ?? '';
  req(mt.length > 0, 'seo.meta_title missing');
  if (mt.length > 60) errors.push(`seo.meta_title ${mt.length} chars (max 60)`);
  if (/\bglobal\b/i.test(mt) && /\b(north america|europe|asia pacific|latin america|middle east)\b/i.test(mt)) {
    errors.push('seo.meta_title claims both "Global" and a region');
  }
  req(mdesc.length >= 70, 'seo.meta_description under 70 chars');
  if (mdesc.length > 160) errors.push(`seo.meta_description ${mdesc.length} chars (max 160)`);
  req(Array.isArray(d.seo?.keywords) && d.seo.keywords.length >= 3, 'seo.keywords needs >= 3 entries');

  // The forecast series has to agree with the headline numbers it illustrates.
  const mf = d.market_forecast ?? [];
  if (mf.length) {
    const sorted = [...mf].sort((x, y) => x.year - y.year);
    if (sorted.some((p, i) => i && p.value < sorted[i - 1].value)) {
      warnings.push('market_forecast is not monotonic — intended?');
    }
    const base = sorted.find((p) => p.year === d.base_year);
    if (base && Math.abs(base.value - ms.current_value) > Math.max(0.05, ms.current_value * 0.02)) {
      errors.push(`market_forecast at base_year ${d.base_year} is ${base.value} but market_size.current_value is ${ms.current_value}`);
    }
    if (sorted.length < 5) warnings.push('market_forecast has fewer than 5 points — the chart will look thin');
  } else {
    warnings.push('no market_forecast series — the forecast chart will not render');
  }

  for (const c of d.charts ?? []) {
    if (!c.data_source) errors.push(`chart "${c.title}" has no data_source`);
  }

  if (knownSlugs?.has(d.slug)) warnings.push('slug already in the corpus — publish will overwrite that row');

  return { errors, warnings };
}

function readDraft(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

async function main() {
  const [cmd, ...args] = process.argv.slice(2);

  if (cmd === 'count') {
    const { count, error } = await client()
      .from('neograph_reports').select('slug', { count: 'exact', head: true });
    if (error) { console.error(error.message); process.exit(1); }
    console.log(count);
    return;
  }

  if (cmd === 'slugs') {
    const { data, error } = await client().from('neograph_reports').select('slug');
    if (error) { console.error(error.message); process.exit(1); }
    console.log(data.map((r) => r.slug).sort().join('\n'));
    return;
  }

  if (cmd === 'industries') {
    const { data, error } = await client().from('neograph_reports').select('industry');
    if (error) { console.error(error.message); process.exit(1); }
    const tally = new Map();
    for (const r of data) tally.set(r.industry, (tally.get(r.industry) ?? 0) + 1);
    [...tally.entries()].sort((a, b) => b[1] - a[1])
      .forEach(([k, n]) => console.log(`${String(n).padStart(4)}  ${k}`));
    return;
  }

  if (cmd === 'dump') {
    const [slug, out] = args;
    const { data, error } = await client()
      .from('neograph_reports').select('*').eq('slug', slug).maybeSingle();
    if (error || !data) { console.error(error?.message ?? 'not found'); process.exit(1); }
    const json = JSON.stringify(data, null, 2);
    if (out) { fs.writeFileSync(out, json); console.log(`wrote ${out}`); }
    else console.log(json);
    return;
  }

  if (cmd === 'check' || cmd === 'publish') {
    const files = args.filter((a) => a.endsWith('.json'));
    if (!files.length) { console.error('no draft files given'); process.exit(2); }

    let knownSlugs;
    if (cmd === 'publish') {
      const { data } = await client().from('neograph_reports').select('slug');
      knownSlugs = new Set((data ?? []).map((r) => r.slug));
    }

    const ok = [];
    let failed = 0;
    for (const f of files) {
      let d;
      try {
        d = readDraft(f);
      } catch (e) {
        console.log(`FAIL ${f}\n  x unreadable JSON: ${e.message}`);
        failed++;
        continue;
      }
      const { errors, warnings } = checkDraft(d, { knownSlugs });
      const name = path.basename(f);
      if (errors.length) {
        failed++;
        console.log(`FAIL ${name}`);
        errors.forEach((e) => console.log(`  x ${e}`));
      } else {
        console.log(`PASS ${name}`);
        ok.push(d);
      }
      warnings.forEach((w) => console.log(`  ! ${w}`));
    }

    console.log(`\n${ok.length} pass, ${failed} fail`);
    if (cmd === 'check') process.exit(failed ? 1 : 0);

    if (!ok.length) { console.error('nothing to publish'); process.exit(1); }
    const sb = client();
    for (const d of ok) {
      const { error } = await sb.from('neograph_reports')
        .upsert(draftToRow(d), { onConflict: 'slug' });
      console.log(error ? `x ${d.slug}: ${error.message}` : `+ ${d.slug}`);
    }
    const { count } = await sb.from('neograph_reports')
      .select('slug', { count: 'exact', head: true });
    console.log(`corpus now ${count}`);
    return;
  }

  console.log('usage: node scripts/report-db.mjs <count|slugs|dump|check|publish> [args]');
  process.exit(2);
}

const invokedDirectly = process.argv[1]
  && import.meta.url.endsWith(path.basename(process.argv[1]));
if (invokedDirectly) await main();

/**
 * Headless HTML audit. No browser, no focus stolen, runs any time of day.
 *
 * An audit like this existed as throwaway shell during the 2026-10-15 session
 * and was lost with it, which meant every later session re-derived the same
 * checks by hand. It is a committed tool now.
 *
 *   node scripts/audit-html.mjs                 # the built output in .next/server/app
 *   node scripts/audit-html.mjs --prod          # production, over the network
 *   node scripts/audit-html.mjs --prod --only /reports,/methodology
 *
 * Exit code is the number of errors (capped at 125), so it can gate a commit.
 *
 * Two rules in the predecessor were themselves wrong and are not repeated here:
 * it counted `&amp;` as five characters when measuring title length (entities
 * are decoded first, below), and it flagged buttons as icon-only when they had
 * visible text (the accessible-name check reads text content, not just
 * `aria-label`).
 */
import fs from 'fs';
import path from 'path';

const PROD = process.argv.includes('--prod');
const BASE = 'https://www.neographanalytics.com';
const onlyArg = process.argv.indexOf('--only');
const ONLY = onlyArg > -1 ? process.argv[onlyArg + 1].split(',') : null;

/** Routes worth auditing, with the local build artefact that holds each one. */
const ROUTES = [
  ['/', 'index.html'],
  ['/reports', 'reports.html'],
  ['/reports/glp-1-receptor-agonists-market', 'reports/glp-1-receptor-agonists-market.html'],
  ['/reports/oncology-information-systems-market', 'reports/oncology-information-systems-market.html'],
  ['/reports/phage-therapy-market', 'reports/phage-therapy-market.html'],
  ['/methodology', 'methodology.html'],
  ['/blog/future-of-personalized-medicine', 'blog/future-of-personalized-medicine.html'],
  ['/press-releases/digital-health-investment-surpasses-30-billion', 'press-releases/digital-health-investment-surpasses-30-billion.html'],
  ['/about', 'about.html'],
  ['/services', 'services.html'],
  ['/blog', 'blog.html'],
  ['/press-releases', 'press-releases.html'],
  ['/contact', 'contact.html'],
  ['/request-sample', 'request-sample.html'],
  ['/legal/privacy-policy', 'legal/privacy-policy.html'],
  ['/design-system', 'design-system.html'],
];

const ENTITIES = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&apos;': "'", '&nbsp;': ' ' };

function decode(s) {
  return String(s ?? '')
    .replace(/&(?:amp|lt|gt|quot|#39|apos|nbsp);/g, (m) => ENTITIES[m])
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)));
}

/** Visible text of a fragment: tags stripped, entities decoded, collapsed. */
function textOf(html) {
  return decode(String(html ?? '').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
}

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`${name}\\s*=\\s*"([^"]*)"`, 'i'))
    ?? tag.match(new RegExp(`${name}\\s*=\\s*'([^']*)'`, 'i'));
  return m ? m[1] : null;
};

async function load(route, file) {
  if (PROD) {
    const res = await fetch(`${BASE}${route}`, { redirect: 'follow' });
    return { status: res.status, html: await res.text() };
  }
  const p = path.join('.next', 'server', 'app', file);
  if (!fs.existsSync(p)) return { status: 0, html: null };
  return { status: 200, html: fs.readFileSync(p, 'utf8') };
}

function auditDocument(route, html) {
  const errors = [];
  const warnings = [];

  // ── headings ──────────────────────────────────────────────────────────────
  const headings = [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({
    level: Number(m[1]),
    text: textOf(m[2]),
    index: m.index,
  }));
  const h1s = headings.filter((h) => h.level === 1);
  if (h1s.length === 0) errors.push('no <h1>');
  if (h1s.length > 1) errors.push(`${h1s.length} <h1> elements: ${h1s.map((h) => JSON.stringify(h.text.slice(0, 40))).join(', ')}`);

  if (h1s.length) {
    const before = headings.filter((h) => h.index < h1s[0].index && h.level !== 1);
    if (before.length) errors.push(`${before.length} heading(s) before the <h1>`);
  }

  // A skipped level (h2 -> h4) breaks the outline for a screen-reader user
  // navigating by heading. Reported as a warning: it is a real defect but it
  // does not hide content.
  let previous = 0;
  for (const h of headings) {
    if (previous && h.level > previous + 1) {
      warnings.push(`heading level jumps h${previous} -> h${h.level} at ${JSON.stringify(h.text.slice(0, 40))}`);
    }
    previous = h.level;
  }

  const empty = headings.filter((h) => !h.text);
  if (empty.length) warnings.push(`${empty.length} empty heading(s)`);

  // ── landmarks ─────────────────────────────────────────────────────────────
  const mains = (html.match(/<main\b/gi) ?? []).length;
  if (mains === 0) errors.push('no <main> landmark');
  if (mains > 1) errors.push(`${mains} <main> landmarks`);
  if (!/href="#(main|content|main-content)"/i.test(html)) warnings.push('no skip link to the main landmark');

  // ── head metadata ─────────────────────────────────────────────────────────
  const title = decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) ?? [])[1] ?? '');
  if (!title) errors.push('no <title>');
  else if (title.length > 60) errors.push(`title ${title.length} chars (>60): ${JSON.stringify(title)}`);
  else if (title.length < 15) warnings.push(`title only ${title.length} chars`);

  const desc = decode((html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) ?? [])[1] ?? '');
  const robots = (html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i) ?? [])[1] ?? '';
  const noindex = /noindex/i.test(robots);
  if (!desc) errors.push('no meta description');
  else if (desc.length > 160) errors.push(`meta description ${desc.length} chars (>160)`);
  else if (desc.length < 70) warnings.push(`meta description only ${desc.length} chars`);

  const canonical = (html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i) ?? [])[1] ?? '';
  if (!canonical) {
    // A noindex page is not eligible for canonicalisation; flagging it was a
    // false positive in the predecessor and is not repeated.
    if (!noindex) errors.push('no canonical');
  } else if (!canonical.startsWith(BASE)) {
    errors.push(`canonical points off-site: ${canonical}`);
  }

  // ── structured data ───────────────────────────────────────────────────────
  const blocks = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)];
  for (const [i, b] of blocks.entries()) {
    let parsed;
    try {
      parsed = JSON.parse(b[1]);
    } catch (e) {
      errors.push(`ld+json block ${i + 1} does not parse: ${e.message}`);
      continue;
    }
    const label = `ld+json ${parsed['@type'] ?? `block ${i + 1}`}`;
    if (!parsed['@context']) warnings.push(`${label} has no @context`);
    if (!parsed['@type'] && !Array.isArray(parsed)) warnings.push(`${label} has no @type`);

    /* A bare year passed JSON.parse happily and was emitted on 152 report pages
       as `"datePublished": "2026"`. schema.org Date wants a calendar date, and
       a validator drops what it cannot read rather than telling you. */
    for (const field of ['datePublished', 'dateModified', 'uploadDate']) {
      const v = parsed[field];
      if (v !== undefined && !/^\d{4}-\d{2}-\d{2}/.test(String(v))) {
        errors.push(`${label}.${field} is "${v}" — not a calendar date`);
      }
    }

    if (parsed['@type'] === 'BreadcrumbList') {
      const items = parsed.itemListElement ?? [];
      const positions = items.map((it) => it.position);
      const sequential = positions.every((p, n) => p === n + 1);
      if (!sequential) errors.push(`BreadcrumbList positions are ${positions.join(',')} — must start at 1 and increment`);
      const unnamed = items.filter((it) => !it.name && !it.item?.name).length;
      if (unnamed) errors.push(`BreadcrumbList has ${unnamed} item(s) with no name`);
    }

    if (parsed['@type'] === 'FAQPage') {
      const entities = parsed.mainEntity ?? [];
      /* Schema that claims more questions than the page shows is the kind of
         mismatch that costs a rich result for the whole domain. */
      const rendered = (html.match(/id="faq-q-\d+"/g) ?? []).length;
      if (rendered && entities.length !== rendered) {
        errors.push(`FAQPage declares ${entities.length} questions, the page renders ${rendered}`);
      }
      const malformed = entities.filter((q) => !q.name || !q.acceptedAnswer?.text).length;
      if (malformed) errors.push(`FAQPage has ${malformed} entry/entries missing a name or acceptedAnswer.text`);
    }
  }

  // ── images ────────────────────────────────────────────────────────────────
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const noAlt = imgs.filter((t) => attr(t, 'alt') === null);
  if (noAlt.length) errors.push(`${noAlt.length} <img> without an alt attribute`);

  // ── accessible names ──────────────────────────────────────────────────────
  // Text content counts, which is where the predecessor went wrong.
  const buttons = [...html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)];
  const namelessButtons = buttons.filter(
    ([, open, inner]) => !textOf(inner) && !attr(open, 'aria-label') && !attr(open, 'aria-labelledby') && !attr(open, 'title')
  );
  if (namelessButtons.length) errors.push(`${namelessButtons.length} button(s) with no accessible name`);

  const links = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)];
  const namelessLinks = links.filter(
    ([, open, inner]) =>
      !textOf(inner) &&
      !attr(open, 'aria-label') &&
      !attr(open, 'aria-labelledby') &&
      !attr(open, 'title') &&
      !/<img\b[^>]*alt="[^"]+"/i.test(inner) &&
      !/<svg\b[^>]*aria-label="/i.test(inner)
  );
  if (namelessLinks.length) errors.push(`${namelessLinks.length} link(s) with no accessible name`);

  // ── form controls ─────────────────────────────────────────────────────────
  const controls = [...html.matchAll(/<(input|select|textarea)\b([^>]*)>/gi)];
  const labelFor = new Set([...html.matchAll(/<label\b[^>]*\sfor="([^"]+)"/gi)].map((m) => m[1]));
  const unlabelled = controls.filter(([, tag, open]) => {
    const type = (attr(open, 'type') ?? '').toLowerCase();
    if (tag.toLowerCase() === 'input' && ['hidden', 'submit', 'button', 'reset', 'image'].includes(type)) return false;
    const id = attr(open, 'id');
    return !(
      (id && labelFor.has(id)) ||
      attr(open, 'aria-label') ||
      attr(open, 'aria-labelledby') ||
      attr(open, 'title')
    );
  });
  if (unlabelled.length) errors.push(`${unlabelled.length} form control(s) with no label`);

  // ── charts carry their source ─────────────────────────────────────────────
  const figures = (html.match(/<figure\b/gi) ?? []).length;
  const figcaptions = (html.match(/<figcaption\b/gi) ?? []).length;
  if (figures > figcaptions) warnings.push(`${figures - figcaptions} <figure> without a <figcaption>`);
  if (route.startsWith('/reports/') && figures === 0) warnings.push('report page renders no <figure>');

  // ── language ──────────────────────────────────────────────────────────────
  if (!/<html[^>]+lang="/i.test(html)) errors.push('<html> has no lang attribute');

  return { errors, warnings, stats: { headings: headings.length, bytes: html.length, ld: blocks.length } };
}

let totalErrors = 0;
let totalWarnings = 0;
const rows = [];

for (const [route, file] of ROUTES) {
  if (ONLY && !ONLY.includes(route)) continue;
  const { status, html } = await load(route, file);
  if (!html) {
    console.log(`\n${route}\n  SKIP  no artefact (${PROD ? `HTTP ${status}` : file}) — build first, or the route is dynamic`);
    continue;
  }
  if (PROD && status !== 200) {
    console.log(`\n${route}\n  x HTTP ${status}`);
    totalErrors++;
    continue;
  }
  const { errors, warnings, stats } = auditDocument(route, html);
  totalErrors += errors.length;
  totalWarnings += warnings.length;
  rows.push({ route, errors: errors.length, warnings: warnings.length, bytes: stats.bytes });

  console.log(`\n${route}  (${(stats.bytes / 1024).toFixed(0)}KB, ${stats.headings} headings, ${stats.ld} ld+json)`);
  if (!errors.length && !warnings.length) console.log('  clean');
  errors.forEach((e) => console.log(`  x ${e}`));
  warnings.forEach((w) => console.log(`  ! ${w}`));
}

console.log('\n' + '-'.repeat(60));
console.log(`${PROD ? 'production' : 'built output'}: ${rows.filter((r) => !r.errors).length} of ${rows.length} pages error-free`);
console.log(`${totalErrors} errors, ${totalWarnings} warnings`);
process.exit(Math.min(totalErrors, 125));

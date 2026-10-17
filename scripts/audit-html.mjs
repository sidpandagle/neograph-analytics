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
  /* Added 2026-10-17 for C-4. The three report routes already audited all
     happen to be rows with no regional breakdown, so they emit no
     spatialCoverage and the Dataset rules below never ran on them -- the
     audit passed without exercising the thing it had just been taught to
     check. This row carries three Place entries. */
  ['/reports/ai-in-lab-automation-market', 'reports/ai-in-lab-automation-market.html'],
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
  ['/legal/terms-of-use', 'legal/terms-of-use.html'],
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

/** Licence URLs seen in --prod mode, verified once after the per-route pass. */
const licenceRoutes = new Set();

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

    /* `Dataset.license` once pointed at /legal/terms-of-use while no such page
       existed - 152 pages asserting a licence URL that 404'd, invisibly. The
       page exists now, so the rule is not "never assert a licence" but "only
       assert one this build actually renders". */
    if (parsed.license !== undefined) {
      const lic = String(parsed.license);
      const route = lic.startsWith(BASE) ? lic.slice(BASE.length) : lic.startsWith('/') ? lic : null;
      if (!route) {
        warnings.push(`${label}.license is off-site (${lic}) - not checkable here`);
      } else if (!PROD) {
        const file = path.join('.next', 'server', 'app', `${route.replace(/^\//, '')}.html`);
        if (!fs.existsSync(file)) errors.push(`${label}.license points at ${route}, which this build does not render`);
      } else {
        /* auditDocument is synchronous; defer the network check to the run loop. */
        licenceRoutes.add(route);
      }
    }

    /* spatialCoverage and conditionsOfAccess (C-4). The point of asserting
       them is that both are easy to emit as something a validator silently
       drops: spatialCoverage wants Place objects with a name, not a bare
       string, and an empty array is worse than an absent field because it
       claims coverage of nowhere. conditionsOfAccess is Text, and a Dataset
       without one reads as openly available, so a report body behind a
       purchase has to say so. Absence is allowed -- 42 of 182 rows carry no
       regional breakdown and correctly omit spatialCoverage -- but a present
       field has to be well formed. */
    if (parsed['@type'] === 'Dataset') {
      const sc = parsed.spatialCoverage;
      if (sc !== undefined) {
        const list = Array.isArray(sc) ? sc : [sc];
        if (list.length === 0) {
          errors.push(`${label}.spatialCoverage is an empty array - omit the field instead`);
        }
        for (const place of list) {
          if (typeof place !== 'object' || place === null) {
            errors.push(`${label}.spatialCoverage holds a bare ${typeof place}; schema.org wants a Place`);
          } else if (place['@type'] !== 'Place') {
            errors.push(`${label}.spatialCoverage entry is @type "${place['@type']}", not Place`);
          } else if (!String(place.name ?? '').trim()) {
            errors.push(`${label}.spatialCoverage holds a Place with no name`);
          }
        }
      }
      const coa = parsed.conditionsOfAccess;
      if (coa !== undefined && !String(coa).trim()) {
        errors.push(`${label}.conditionsOfAccess is present but empty`);
      }
    }

    /* C-5: the declared outline has to be the rendered one. The TOC an
       ItemList describes is built from buildReportTOC and so is the sidebar, but
       nothing stops a later edit from rendering one and declaring the other, and
       a machine-readable outline that disagrees with the page is worse than
       none. So this compares the ItemList against the anchors actually present
       in nav[aria-label="Report details"], not against the generator. */
    if (parsed['@type'] === 'ItemList') {
      const entries = Array.isArray(parsed.itemListElement) ? parsed.itemListElement : [];
      if (entries.length === 0) {
        errors.push(`${label} has no itemListElement`);
      }
      if (parsed.numberOfItems !== undefined && Number(parsed.numberOfItems) !== entries.length) {
        errors.push(`${label}.numberOfItems is ${parsed.numberOfItems} but it lists ${entries.length}`);
      }
      const positions = entries.map((e) => Number(e?.position));
      const expected = entries.map((_, i) => i + 1);
      if (positions.join(',') !== expected.join(',')) {
        errors.push(`${label} positions are ${positions.join(',')} - expected 1..${entries.length} in order`);
      }
      for (const e of entries) {
        if (!String(e?.name ?? '').trim()) errors.push(`${label} holds a ListItem with no name`);
      }

      const nav = html.match(/<nav[^>]+aria-label="Report details"[\s\S]*?<\/nav>/i);
      if (nav) {
        const rendered = [...nav[0].matchAll(/href="#([a-z0-9-]+)"/gi)].map((m) => m[1]);
        if (rendered.length !== entries.length) {
          errors.push(
            `${label} declares ${entries.length} sections but the rendered TOC links ${rendered.length}`
          );
        } else {
          const declared = entries.map((e) => String(e?.url ?? '').split('#')[1] ?? '');
          const mismatch = declared.findIndex((id, i) => id !== rendered[i]);
          if (mismatch !== -1) {
            errors.push(
              `${label} entry ${mismatch + 1} points at #${declared[mismatch]} but the rendered TOC links #${rendered[mismatch]}`
            );
          }
          /* Every declared anchor must be a heading id that exists on the page,
             or the outline sends a crawler to a fragment that goes nowhere. */
          for (const id of declared) {
            if (id && !new RegExp(`id="${id}"`).test(html)) {
              errors.push(`${label} points at #${id}, which no element on the page has`);
            }
          }
        }
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

/* The deferred half of the licence rule: in --prod the URL is fetched once per
   distinct route rather than once per page that asserts it. */
for (const route of licenceRoutes) {
  const res = await fetch(`${BASE}${route}`, { redirect: 'follow' });
  if (res.status === 200) {
    console.log(`
ld+json license -> ${route}  HTTP 200`);
  } else {
    console.log(`
ld+json license -> ${route}`);
    console.log(`  x HTTP ${res.status} - a licence URL that does not resolve`);
    totalErrors++;
  }
}

/* The sitemap rule, --prod only, because `/sitemap.xml` is a route handler and
   has no artefact under `.next/server/app` to read locally.

   Why it exists: `robots.ts` advertises exactly one sitemap, and that one was
   silently missing three whole page families -- 4 legal pages, 10 consulting
   services and 3 author profiles, 17 URLs the build renders and no crawler was
   told about. The consulting pages even had a sitemap of their own that robots
   never names. Nothing failed; the pages were just invisible.

   Two things are checked: that every family the site publishes is represented,
   and that nothing advertised 404s -- a sitemap full of dead URLs is worse than
   a short one. The 182 report URLs are sampled rather than all fetched, because
   the per-route pass above already covers report pages and 182 extra requests
   per audit is not worth the signal. */
if (PROD) {
  const FAMILIES = ['/reports/', '/blog/', '/press-releases/', '/consulting/', '/legal/', '/authors/'];
  const res = await fetch(`${BASE}/sitemap.xml`, { redirect: 'follow' });
  console.log(`\nsitemap.xml  HTTP ${res.status}`);
  if (res.status !== 200) {
    console.log('  x the only sitemap robots.ts advertises does not resolve');
    totalErrors++;
  } else {
    const xml = await res.text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    console.log(`  ${locs.length} urls`);
    for (const family of FAMILIES) {
      const n = locs.filter((u) => u.includes(family)).length;
      if (n === 0) {
        console.log(`  x no ${family} urls - a published page family is absent from the sitemap`);
        totalErrors++;
      } else {
        console.log(`  ok ${String(n).padStart(3)} x ${family}`);
      }
    }
    const reports = locs.filter((u) => u.includes('/reports/'));
    const step = Math.max(1, Math.ceil(reports.length / 5));
    const sample = [
      ...locs.filter((u) => !u.includes('/reports/')),
      ...reports.filter((_, i) => i % step === 0),
    ];
    let dead = 0;
    for (const u of sample) {
      const r = await fetch(u, { method: 'HEAD', redirect: 'follow' });
      if (r.status !== 200) {
        console.log(`  x HTTP ${r.status}  ${u}`);
        dead++;
      }
    }
    totalErrors += dead;
    console.log(`  ${dead === 0 ? 'ok' : 'x '} ${sample.length} of ${locs.length} urls fetched (every non-report url, plus a 5-report sample): ${dead} dead`);
  }
}

console.log('\n' + '-'.repeat(60));
console.log(`${PROD ? 'production' : 'built output'}: ${rows.filter((r) => !r.errors).length} of ${rows.length} pages error-free`);
console.log(`${totalErrors} errors, ${totalWarnings} warnings`);
process.exit(Math.min(totalErrors, 125));

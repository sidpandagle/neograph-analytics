/**
 * Offline assertions for the pure helpers in `lib/seo.ts`.
 *
 * Why this exists: `marketName` shipped with `/s+/` where `/\s+/` was meant,
 * so every title containing a lowercase "s" lost it — "Global Liquid Biopsy
 * Market" rendered as "Global Liquid Biop y Market" on related-report cards
 * and in each report's OpenGraph image. Nothing failed; the string was simply
 * wrong. Both regex escapes in that file have now been mangled by tooling
 * once each, which is a good reason to assert them rather than trust them.
 *
 *   node --experimental-strip-types scripts/seo-unit.mjs
 *
 * No network, no build, no Supabase. Exits non-zero on the first failure.
 */
import { pageTitle, pageDescription, marketName, schemaDate, TITLE_MAX, DESCRIPTION_MAX } from '../lib/seo.ts';

let failed = 0;

function eq(label, actual, expected) {
  const ok = actual === expected;
  if (!ok) failed++;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${label}`);
  if (!ok) console.log(`       expected ${JSON.stringify(expected)}\n       actual   ${JSON.stringify(actual)}`);
}

function ok(label, condition, detail = '') {
  if (!condition) failed++;
  console.log(`${condition ? 'ok  ' : 'FAIL'} ${label}${condition ? '' : `  ${detail}`}`);
}

console.log('marketName');
eq('cuts the "Size, Share & Forecast" tail',
  marketName('Global Liquid Biopsy Market Size, Share & Forecast 2026-2032'),
  'Global Liquid Biopsy Market');
eq('cuts the em-dash outlook tail',
  marketName('Global Cell & Gene Therapy Manufacturing Market — Growth Drivers, Restraints and Future Outlook 2032'),
  'Global Cell & Gene Therapy Manufacturing Market');
eq('keeps every letter s (the /s+/ regression)',
  marketName('Healthcare Business Process Outsourcing Market Size and Trends Analysis'),
  'Healthcare Business Process Outsourcing Market');
eq('collapses real runs of whitespace',
  marketName('Femtech   Market Size'),
  'Femtech Market');
eq('a title with no "Market" is returned unchanged',
  marketName('Precision Oncology Outlook 2032'),
  'Precision Oncology Outlook 2032');
eq('"Marketing" is not the word "Market"',
  marketName('Pharmaceutical Marketing Services Market Size'),
  'Pharmaceutical Marketing Services Market');
eq('empty and null are safe', marketName(null) + marketName(undefined) + marketName(''), '');

console.log('\npageTitle');
ok('stays inside TITLE_MAX with brand and suffix',
  pageTitle('Digital Health Investment Surpasses $30 Billion in 2025', { suffix: 'Healthcare Insights' }).absolute.length <= TITLE_MAX,
  `${pageTitle('Digital Health Investment Surpasses $30 Billion in 2025', { suffix: 'Healthcare Insights' }).absolute.length} chars`);
ok('appends the brand when it fits',
  pageTitle('Femtech Market').absolute.endsWith('NeoGraph Analytics'));
ok('never doubles the brand',
  pageTitle('Femtech Market').absolute.match(/NeoGraph Analytics/g).length === 1);

console.log('\npageDescription');
ok('stays inside DESCRIPTION_MAX',
  pageDescription('x '.repeat(200)).length <= DESCRIPTION_MAX,
  `${pageDescription('x '.repeat(200)).length} chars`);
ok('does not end on a dangling separator',
  !/[\s,;:—-]$/.test(pageDescription('The global femtech market, valued at $66.5 million in 2026, is forecast to reach $140.2 million by 2032 — a figure that depends entirely on whether period tracking apps are counted as devices or software.')));

console.log('\nschemaDate');
eq('a year-only row becomes a calendar date', schemaDate('2026'), '2026-01-01');
eq('a full date passes through', schemaDate('2026-03-14'), '2026-03-14');
eq('a long-form date is normalised', schemaDate('December 18, 2025'), '2025-12-18');

console.log(`\n${failed === 0 ? 'all assertions passed' : `${failed} assertion(s) FAILED`}`);
process.exit(failed === 0 ? 0 : 1);

/**
 * Offline assertions for the pure helpers in `lib/api/pgrst.ts`.
 *
 * Why this exists: three search paths built a PostgREST `or()` filter by
 * interpolating a user string into the filter grammar, where a comma starts a
 * new alternative and a dot separates column from operator. A search for
 * "a,b" was not a search for "a,b". The paths are dead code today, so the
 * defect could only be found by reading — and will only stay fixed if the
 * escaping is asserted rather than trusted. Same reasoning as
 * `scripts/seo-unit.mjs`, which exists because a regex escape was eaten twice.
 *
 *   node --experimental-strip-types scripts/api-unit.mjs
 *
 * No network, no build, no Supabase. Exits non-zero on the first failure.
 */
import { ilikePattern, ilikeAny, rangeFor, safeYear, SEARCH_MAX } from '../lib/api/pgrst.ts';

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

// ── ilikePattern ────────────────────────────────────────────────────────────
eq('plain term is quoted and wildcarded', ilikePattern('oncology'), '"%oncology%"');
eq('surrounding whitespace is dropped', ilikePattern('  oncology  '), '"%oncology%"');

// The separators of the or() grammar. None may escape the quotes.
ok('comma stays inside the quotes', !ilikePattern('a,b').slice(1, -1).includes('"'));
eq('comma is not a new alternative', ilikePattern('a,b'), '"%a,b%"');
eq('parenthesis cannot close the group', ilikePattern('a)b'), '"%a)b%"');
eq('dot cannot start an operator', ilikePattern('a.ilike.b'), '"%a.ilike.b%"');

// Quote and backslash are the only two characters that matter inside quotes.
eq('double quote is escaped', ilikePattern('say "hi"'), '"%say \\"hi\\"%"');
eq('backslash is escaped first', ilikePattern('a\\b'), '"%a\\\\b%"');
eq('a quote behind a backslash cannot break out', ilikePattern('a\\"'), '"%a\\\\\\"%"');

// A user's own wildcards are literal; only the caller's wrapping ones are not.
eq('percent typed by the user is literal', ilikePattern('50%'), '"%50\\%%"');
eq('underscore typed by the user is literal', ilikePattern('a_b'), '"%a\\_b%"');

ok(
  'an over-long search is clamped',
  ilikePattern('x'.repeat(SEARCH_MAX + 50)).length <= SEARCH_MAX + 8,
  `got ${ilikePattern('x'.repeat(SEARCH_MAX + 50)).length}`
);

// ── ilikeAny ────────────────────────────────────────────────────────────────
eq('empty search produces no filter', ilikeAny(['title'], ''), null);
eq('whitespace-only search produces no filter', ilikeAny(['title'], '   '), null);
eq(
  'one alternative per column',
  ilikeAny(['title', 'excerpt'], 'ai'),
  'title.ilike."%ai%",excerpt.ilike."%ai%"'
);
ok(
  'a comma in the term does not add an alternative',
  ilikeAny(['title', 'excerpt'], 'a,b').split('.ilike.').length === 3,
  ilikeAny(['title', 'excerpt'], 'a,b')
);

// ── rangeFor ────────────────────────────────────────────────────────────────
eq('no page and no limit means no window', rangeFor(undefined, undefined), null);
eq('page 1 of 10', JSON.stringify(rangeFor(1, 10)), JSON.stringify({ from: 0, to: 9 }));
eq('page 3 of 10', JSON.stringify(rangeFor(3, 10)), JSON.stringify({ from: 20, to: 29 }));
eq('page 0 is clamped to page 1', JSON.stringify(rangeFor(0, 10)), JSON.stringify({ from: 0, to: 9 }));
eq('negative page is clamped', JSON.stringify(rangeFor(-5, 10)), JSON.stringify({ from: 0, to: 9 }));
eq('limit 0 is clamped to 1', JSON.stringify(rangeFor(1, 0)), JSON.stringify({ from: 0, to: 0 }));
ok('an absurd limit is capped', rangeFor(1, 100000).to <= 199, `to=${rangeFor(1, 100000).to}`);
eq('a fractional page does not produce a fractional offset', rangeFor(2.7, 10).from, 10);

// ── safeYear ────────────────────────────────────────────────────────────────
eq('a four-digit year passes', safeYear(2026), 2026);
eq('a year as a string passes', safeYear('2026'), 2026);
eq('null is rejected', safeYear(null), null);
eq('undefined is rejected', safeYear(undefined), null);
eq('empty string is rejected', safeYear(''), null);
eq('a non-year number is rejected', safeYear(42), null);
eq('a far-future year is rejected', safeYear(9999), null);
eq('a non-numeric string is rejected', safeYear('soon'), null);

/* The real shape of the sitemap defect, asserted so the rationale cannot
   drift back to the one that was filed. It was filed as a RangeError; it is
   not one. An empty year does not make an Invalid Date here, it makes a
   confident and wrong one. */
ok(
  'the empty-year case never reaches new Date()',
  safeYear('') === null,
  'safeYear("") must be null, or a wrong date is published to crawlers'
);
/* Parsed as LOCAL midnight, which is why getFullYear is 2001 while
   toISOString -- what the sitemap actually publishes -- can read 2000 east of
   Greenwich. The published date is wrong AND a function of the build
   machine's timezone, which is the same class of defect as R-18. */
eq(
  'an empty year parses as 2001, it does not throw',
  new Date(`${''}-01-01`).getFullYear(),
  2001
);
eq(
  'an unparseable year also parses as 2001',
  new Date(`${'soon'}-01-01`).getFullYear(),
  2001
);
ok(
  'only a bare empty string is an Invalid Date, and the template cannot make one',
  Number.isNaN(new Date('').getTime()) && !Number.isNaN(new Date('-01-01').getTime()),
  'the premise of the correction no longer holds'
);

console.log(failed ? `\n${failed} assertion(s) failed` : '\nall assertions passed');
process.exit(failed ? 1 : 0);

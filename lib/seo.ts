/**
 * Length discipline for titles and descriptions, applied at render time.
 *
 * The corpus rows were fixed in place (`scripts/fix-meta-lengths.mjs` brought
 * all 152 reports inside 60/160), but article and press-release pages build
 * their metadata in `generateMetadata` from an excerpt plus a template, so the
 * rendered `<title>` can exceed the limit even when the stored fields do not:
 *
 *   "The Future of Personalized Medicine | Healthcare Insights | NeoGraph Analytics"  78
 *   "Digital Health Investment Surpasses $30 Billion in 2025 | NeoGraph Analytics"     76
 *
 * Both were measured by `scripts/audit-html.mjs`. The fix belongs here rather
 * than in each page, because every route that composes a title from content
 * needs the same rule.
 */

const BRAND = 'NeoGraph Analytics';
export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 160;

/**
 * A page title that fits, with the brand appended **only if it still fits**.
 * Returned as `{ absolute }` so the root layout's template cannot append the
 * brand a second time — which is how one earlier title ended up reading
 * "... | NeoGraph Analytics | NeoGraph Analytics".
 */
export function pageTitle(
  title: string,
  options: { suffix?: string; brand?: boolean } = {}
): { absolute: string } {
  const { suffix, brand = true } = options;
  const base = String(title ?? '').trim();

  const candidates = [
    suffix && brand ? `${base} | ${suffix} | ${BRAND}` : null,
    suffix ? `${base} | ${suffix}` : null,
    brand ? `${base} | ${BRAND}` : null,
    base,
  ].filter((c): c is string => Boolean(c));

  const fitting = candidates.find((c) => c.length <= TITLE_MAX);
  if (fitting) return { absolute: fitting };

  // Nothing fits: trim the title itself at a word boundary rather than mid-word.
  const window = base.slice(0, TITLE_MAX);
  const lastSpace = window.lastIndexOf(' ');
  return { absolute: (lastSpace > 24 ? window.slice(0, lastSpace) : window).trim() };
}

/**
 * A description inside 160 characters, cut at the last sentence boundary that
 * fits, or else at a word boundary. Never mid-word, and never with a dangling
 * comma or dash.
 */
export function pageDescription(text: string, max = DESCRIPTION_MAX): string {
  const t = String(text ?? '').replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;

  const window = t.slice(0, max);
  const lastStop = Math.max(window.lastIndexOf('. '), window.lastIndexOf('! '), window.lastIndexOf('? '));
  if (lastStop > max * 0.5) return window.slice(0, lastStop + 1).trim();

  const lastSpace = window.lastIndexOf(' ');
  const cut = (lastSpace > max * 0.5 ? window.slice(0, lastSpace) : window).replace(/[\s,;:—-]+$/, '');
  return `${cut}.`;
}

/**
 * A schema.org Date from whatever the row carries.
 *
 * Report rows store only `published_year`, so every report page was emitting
 * `"datePublished": "2026"`. A bare year is a valid ISO 8601 *year*, but
 * schema.org's Date and Google's structured-data parsers expect a calendar
 * date, and a four-character value is the kind of thing a validator drops
 * silently. A year-only row becomes 1 January of that year, which is the honest
 * reading of "we know the year and not the day".
 */
export function schemaDate(value: string | number | undefined | null): string | undefined {
  const v = String(value ?? '').trim();
  if (!v) return undefined;
  if (/^\d{4}-\d{2}-\d{2}/.test(v)) return v.slice(0, 10);
  if (/^\d{4}$/.test(v)) return `${v}-01-01`;
  const parsed = new Date(v);
  if (Number.isNaN(parsed.getTime())) return undefined;
  /* Read the calendar fields back in the same zone `Date` parsed them in.
     "December 18, 2025" parses as local midnight, so `toISOString()` — which
     converts to UTC first — returned 2025-12-17 for every build east of
     Greenwich, and the correct date on Vercel. The emitted `datePublished`
     should not depend on where the build ran. */
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${parsed.getFullYear()}-${pad(parsed.getMonth() + 1)}-${pad(parsed.getDate())}`;
}

/**
 * A report's market name, without the stored title's boilerplate tail.
 *
 * Corpus titles carry several tails — "Market Size, Share & Forecast
 * 2026-2032", "Market — Growth Drivers, Restraints and Future Outlook 2032",
 * "Market Size and Trends Analysis" — so the cut is made at the end of the
 * first whole word "Market" rather than by matching each tail in turn. A title
 * with no "Market" in it is returned unchanged.
 *
 * The pattern is built from a character class rather than a word-boundary
 * escape: an earlier copy of this logic had its escapes turned into literal
 * backspace characters by a tool, matched nothing, and silently did nothing.
 *
 * The same hazard bit the whitespace collapse below, which shipped as `/s+/`
 * and so replaced every literal letter "s" with a space — "Global Liquid
 * Biopsy Market" rendered as "Global Liquid Biop y Market" on related-report
 * cards and in the OpenGraph image. `scripts/seo-unit.mjs` now asserts both
 * patterns offline so neither can regress silently again.
 */
export function marketName(title: string | undefined | null): string {
  const raw = String(title ?? '');
  const match = new RegExp('(^|[^A-Za-z])Market([^A-Za-z]|$)', 'i').exec(raw);
  const cut = match
    ? raw.slice(0, match.index + match[0].indexOf('Market') + 'Market'.length)
    : raw;
  return cut.replace(/\s+/g, ' ').trim();
}

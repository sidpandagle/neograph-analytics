/**
 * PostgREST filter helpers.
 *
 * Why this exists: the search paths in `reports.ts`, `blogs.ts` and
 * `press-releases.ts` each built a PostgREST `or()` filter by interpolating a
 * user string straight into the filter grammar:
 *
 *     query.or(`title.ilike.%${q}%,excerpt.ilike.%${q}%`)
 *
 * In that grammar a comma separates the alternatives, a dot separates column,
 * operator and value, and parentheses group. A search for `a,b` therefore does
 * not search for "a,b" — it injects a third alternative, `b%`, which PostgREST
 * parses as a malformed filter and rejects, and a value containing `)` can
 * close the group early. The three call sites are currently dead code
 * (`searchReports`, `searchBlogs` and `searchPressReleases` have no callers
 * outside their own files), so nothing is exploitable today; they are fixed
 * here rather than left as a trap for whoever wires the search box up.
 *
 * PostgREST allows a value to be double-quoted, which takes the separators out
 * of the grammar. Inside those quotes only `"` and `\` need escaping.
 */

/** Longest search string we will send. Anything beyond this is noise. */
export const SEARCH_MAX = 120;

/**
 * Turn a user string into a quoted `ilike` pattern that is safe to drop into
 * an `or()` filter.
 *
 * `%` is deliberately NOT escaped in the caller's own wrapping wildcards, but
 * any `%` or `_` the user typed is, so a search for "50%" does not silently
 * become a match-anything.
 */
export function ilikePattern(raw: string): string {
  const trimmed = raw.trim().slice(0, SEARCH_MAX);
  const escaped = trimmed
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/%/g, '\\%')
    .replace(/_/g, '\\_');
  return `"%${escaped}%"`;
}

/**
 * Build an `or()` filter that matches `pattern` against each column.
 *
 * Returns null for an empty search, so callers can skip the filter entirely
 * rather than sending one that matches everything.
 */
export function ilikeAny(columns: string[], raw: string): string | null {
  if (!raw || !raw.trim()) return null;
  const pattern = ilikePattern(raw);
  return columns.map((c) => `${c}.ilike.${pattern}`).join(',');
}

/**
 * Clamp a page/limit pair into a `.range()` window.
 *
 * Returns null when the caller asked for no pagination, so the query is left
 * alone and existing call sites that expect a whole table keep working.
 */
export function rangeFor(
  page: number | undefined,
  limit: number | undefined,
  maxLimit = 200
): { from: number; to: number } | null {
  if (page == null && limit == null) return null;
  const p = Math.max(1, Math.floor(page ?? 1));
  const l = Math.min(maxLimit, Math.max(1, Math.floor(limit ?? maxLimit)));
  const from = (p - 1) * l;
  return { from, to: from + l - 1 };
}

/**
 * A four-digit year, or null.
 *
 * `/api/sitemap-reports/[page]` builds `new Date(`${year}-01-01`)`, and a row
 * with no `published_year` reached it as the empty string. This was filed as
 * a RangeError taking out the whole response. **It is not.** Measured on
 * Node 24: `new Date("")` is an Invalid Date and does throw, but the template
 * can never produce the empty string — `new Date("-01-01")` parses cleanly as
 * **1 January 2001**, and so does `new Date("soon-01-01")`. So nothing
 * crashes; the URL is simply published with a `lastModified` around
 * 2001-01-01 — and because that string is parsed as *local* midnight and then
 * written out with `toISOString()`, the published date is also a function of
 * the build machine's timezone, reading 2000-12-31 from IST. A wrong date
 * asserted to crawlers rather than a visible failure, and the same class of
 * defect as R-18. Quieter than the filed one and harder to notice. A year is
 * either usable or the row is left out of the sitemap.
 */
export function safeYear(value: unknown): number | null {
  const n = Number(String(value ?? '').trim());
  if (!Number.isInteger(n) || n < 1900 || n > 2100) return null;
  return n;
}

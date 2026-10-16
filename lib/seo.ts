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

/**
 * Source notes for charts.
 *
 * Why: every report row carries a `charts[]` array with a `data_source` on each
 * entry, and none of it was ever rendered. A research publication that shows a
 * forecast curve without saying where the numbers came from is asking to be
 * taken on trust — which is the one thing this site cannot ask for.
 *
 * Some `data_source` values name a real publication; others name the column the
 * series was read from (`market_forecast`, `regional_analysis`), which tells a
 * reader nothing on its own. Those are rephrased into something true and
 * useful: the series is this report's own tabulation, and the endpoints behind
 * it are sourced in the methodology section.
 */
import type { JsonReport } from '@/lib/jsonReports';

type ChartEntry = JsonReport['charts'][number];

/** Column names that appear as `data_source` but are not sources. */
const SELF_REFERENTIAL = new Set([
  'market_forecast',
  'market_size',
  'market_segmentation',
  'regional_analysis',
  'country_analysis',
  'competitive_landscape',
  'company_profiles',
]);

/**
 * Picks the `charts[]` entry that describes a given rendered chart.
 * Matching is by `data_source` first (that is the column the chart reads), then
 * by a keyword in the authored title, so a report that labels its entries
 * loosely still gets its own caption rather than the generic one.
 */
export function findChartEntry(
  charts: ChartEntry[] | undefined,
  column: string,
  titleKeywords: string[] = []
): ChartEntry | undefined {
  if (!charts?.length) return undefined;

  const byColumn = charts.find(
    (c) => typeof c.data_source === 'string' && c.data_source.trim() === column
  );
  if (byColumn) return byColumn;

  const keywords = [column.replace(/_/g, ' '), ...titleKeywords].map((k) => k.toLowerCase());
  return charts.find((c) => {
    const haystack = `${c.title ?? ''} ${c.type ?? ''}`.toLowerCase();
    return keywords.some((k) => haystack.includes(k));
  });
}

/**
 * The sentence printed under a chart. Never empty: a chart with no recorded
 * source still has to say that it is this report's own tabulation.
 */
export function chartSourceNote(entry: ChartEntry | undefined): string {
  const own =
    'NeoGraph Analytics, tabulated from the base-year and forecast values stated in this report.';

  const raw = entry?.data_source?.trim();
  if (!raw || SELF_REFERENTIAL.has(raw)) return own;

  // An authored source string may already read as a sentence; leave it alone.
  return /[.!]$/.test(raw) ? raw : `${raw}.`;
}

/**
 * A modelling caveat, where the report's own chart title records one. The OIS
 * report's title — "modelled at constant CAGR between published endpoints" — is
 * exactly the kind of statement that belongs under the figure rather than
 * inside its heading, where it reads as part of the chart's name.
 */
export function chartModellingNote(entry: ChartEntry | undefined): string | undefined {
  const title = entry?.title ?? '';
  const match = title.match(/\(([^)]*model[^)]*)\)/i);
  if (match) {
    const note = match[1].trim();
    return note.charAt(0).toUpperCase() + note.slice(1) + '.';
  }
  return undefined;
}

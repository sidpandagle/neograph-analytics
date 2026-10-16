import { supabase } from '@/lib/supabase/client';
import type { Report, ReportFilters } from './reports.types';
import type { ApiResponse } from './config';
import { marketValue } from '@/lib/format';

function rowToReport(row: Record<string, unknown>, index: number): Report {
  const ms = (row.market_size ?? {}) as Record<string, number>;
  const mo = (row.market_overview ?? {}) as Record<string, unknown>;
  const cl = (row.competitive_landscape ?? []) as Array<Record<string, string>>;

  return {
    id: index + 1,
    slug: row.slug as string,
    title: row.title as string,
    description: (row.meta_description as string) || (mo.summary as string) || '',
    summary: (mo.summary as string) || '',
    category: row.industry as string,
    date: String(row.published_year),
    price: '$2,995',
    discounted_price: '$2,495',
    region: 'Global',
    year: String(row.published_year),
    reportType: 'Market Analysis',
    pages: 150,
    reportCode: row.report_id as string,
    baseYear: String(row.base_year),
    forecastPeriod: row.forecast_period as string,
    marketSize2024: marketValue(ms.current_value, row.unit),
    marketSize2032: marketValue(ms.forecast_value, row.unit),
    cagr: `${ms.cagr ?? 0}%`,
    overview: (mo.summary as string) || '',
    keyFindings: (mo.key_trends as string[]) || [],
    meta_title: row.meta_title as string,
    meta_description: row.meta_description as string,
    meta_keywords: Array.isArray(row.meta_keywords)
      ? (row.meta_keywords as string[]).join(', ')
      : '',
    keyPlayers: cl.map(c => ({
      name: c.company,
      marketShare: 'N/A',
      headquarters: c.headquarters ?? '',
    })),
    faqs: (row.faqs as Array<{ question: string; answer: string }>) || [],
    authors: [],
    marketDetails: undefined,
    fullReportTOC: undefined,
  };
}

export async function getReports(filters?: ReportFilters): Promise<ApiResponse<Report[]>> {
  let query = supabase
    .from('neograph_reports')
    .select('*')
    .order('published_year', { ascending: false });

  if (filters?.search) {
    const q = filters.search;
    query = query.or(`title.ilike.%${q}%,meta_description.ilike.%${q}%,industry.ilike.%${q}%`);
  }

  const { data, error } = await query;
  if (error) return { success: false, error: 'fetch_error', message: error.message };

  const reports = (data ?? []).map((row, i) =>
    rowToReport(row as Record<string, unknown>, i)
  );

  return { success: true, data: reports };
}

/**
 * One report by slug.
 *
 * This used to run a second, corpus-wide query for the `slug` column of all 142
 * rows purely to work out the report's position in the listing order, which
 * `rowToReport` then used as its `id`. Nothing consumes that id on a detail page
 * — the checkout page and its form key off the slug — so the query was pure
 * metered egress. The id is now 0 here, and the listing still numbers its own
 * rows positionally, which is the only place the number is read.
 */
export async function getReportBySlug(slug: string): Promise<ApiResponse<Report>> {
  const { data, error } = await supabase
    .from('neograph_reports')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return { success: false, error: 'not_found', message: 'Report not found' };
  }

  return { success: true, data: rowToReport(data as Record<string, unknown>, 0) };
}

export async function searchReports(
  query: string,
  page: number = 1,
  limit: number = 50
): Promise<ApiResponse<Report[]>> {
  return getReports({ search: query, page, limit });
}

/**
 * Columns the listing cards and the sitemaps actually read.
 *
 * `getReports()` does `select('*')` over 142 rows, which pulls every large
 * JSONB column — `market_dynamics`, `company_profiles`, `research_methodology`,
 * `faqs` and the rest — to render a card that shows a title, a category, a year
 * and a description. Supabase egress is the metered resource on the free tier,
 * so the two callers that only need the surface get their own projection.
 */
const CARD_COLUMNS =
  'slug,title,meta_title,meta_description,meta_keywords,industry,published_year,report_id,base_year,forecast_period,market_size,unit,currency';

const SITEMAP_COLUMNS = 'slug,published_year';

/**
 * The listing page's data. Same `Report` shape, so `ReportCard` and
 * `ReportsListingClient` are unchanged; the fields those components never read
 * (`keyFindings`, `faqs`, `keyPlayers`, `overview`) come back empty rather than
 * being fetched and discarded.
 */
export async function getReportCards(): Promise<ApiResponse<Report[]>> {
  const { data, error } = await supabase
    .from('neograph_reports')
    .select(CARD_COLUMNS)
    .order('published_year', { ascending: false });

  if (error) return { success: false, error: 'fetch_error', message: error.message };

  const reports = (data ?? []).map((row, i) => rowToReport(row as Record<string, unknown>, i));
  return { success: true, data: reports };
}

/** Slug and year only — everything a sitemap entry needs. */
export async function getReportSitemapEntries(): Promise<
  Array<{ slug: string; year: string }>
> {
  const { data, error } = await supabase
    .from('neograph_reports')
    .select(SITEMAP_COLUMNS)
    .order('published_year', { ascending: false });

  if (error || !data) {
    console.error('[getReportSitemapEntries] query failed:', error?.message ?? 'no data');
    return [];
  }

  return data
    .filter((r): r is { slug: string; published_year: number } => Boolean(r.slug))
    .map((r) => ({ slug: String(r.slug), year: String(r.published_year ?? '') }));
}

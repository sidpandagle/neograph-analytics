/**
 * Supabase-backed report source.
 *
 * Why this exists: `lib/jsonReports.ts` reads `data/all_reports.json`, which only
 * holds 10 reports, while `neograph_reports` in Supabase holds 140. The detail
 * page used the JSON path, so 130 report URLs rendered the "Report Not Found"
 * shell — and because that render is prerendered and cached, it was served with
 * HTTP 200, i.e. 130 soft 404s sitting in the sitemap.
 *
 * This module returns the exact same `JsonReport` shape the page and
 * `JsonReportSections` already consume, so Supabase becomes the primary source
 * without reshaping the render tree. The JSON file stays in place as a fallback
 * for when Supabase is unreachable.
 *
 * Cost note: Supabase egress is metered on the free tier and these rows carry
 * large JSONB columns. Only `getReportSlugs()` runs table-wide, and it selects
 * the `slug` column alone. Full rows are fetched one at a time, by slug.
 */
import { supabase } from '@/lib/supabase/client';
import {
  getJsonReportBySlug,
  getAllJsonReportSlugs,
  type JsonReport,
} from '@/lib/jsonReports';

const TABLE = 'neograph_reports';

/** Supabase stores SEO fields flat; `JsonReport` nests them under `seo`. */
function rowToJsonReport(row: Record<string, unknown>): JsonReport {
  const keywords = Array.isArray(row.meta_keywords)
    ? (row.meta_keywords as string[])
    : typeof row.meta_keywords === 'string' && row.meta_keywords
      ? (row.meta_keywords as string).split(',').map((k) => k.trim()).filter(Boolean)
      : [];

  // Defaults below exist only so a partially-populated row cannot crash a render.
  // They are structural fallbacks, never invented analytical values.
  return {
    report_id: (row.report_id as string) ?? (row.slug as string),
    slug: row.slug as string,
    title: row.title as string,
    industry: (row.industry as string) ?? '',
    published_year: Number(row.published_year) || new Date().getFullYear(),
    base_year: Number(row.base_year) || 0,
    forecast_period: (row.forecast_period as string) ?? '',
    historical_period: (row.historical_period as string) ?? '',
    currency: (row.currency as string) ?? 'USD',
    unit: (row.unit as string) ?? 'Billion',
    market_size: (row.market_size as JsonReport['market_size']) ?? {
      current_value: 0,
      forecast_value: 0,
      cagr: 0,
    },
    market_overview: (row.market_overview as JsonReport['market_overview']) ?? {
      summary: '',
      key_trends: [],
      market_stage: '',
      adoption_level: '',
    },
    market_dynamics: (row.market_dynamics as JsonReport['market_dynamics']) ?? {
      drivers: [],
      restraints: [],
      opportunities: [],
      challenges: [],
    },
    market_segmentation:
      (row.market_segmentation as JsonReport['market_segmentation']) ?? {},
    regional_analysis: (row.regional_analysis as JsonReport['regional_analysis']) ?? [],
    country_analysis: (row.country_analysis as JsonReport['country_analysis']) ?? [],
    market_forecast: (row.market_forecast as JsonReport['market_forecast']) ?? [],
    charts: (row.charts as JsonReport['charts']) ?? [],
    competitive_landscape:
      (row.competitive_landscape as JsonReport['competitive_landscape']) ?? [],
    company_profiles: (row.company_profiles as JsonReport['company_profiles']) ?? [],
    recent_developments:
      (row.recent_developments as JsonReport['recent_developments']) ?? [],
    regulatory_landscape: (row.regulatory_landscape as string[]) ?? [],
    research_methodology:
      (row.research_methodology as JsonReport['research_methodology']) ?? {
        primary_research: [],
        secondary_research: [],
        data_validation: '',
      },
    faqs: (row.faqs as JsonReport['faqs']) ?? [],
    seo: {
      meta_title: (row.meta_title as string) ?? (row.title as string) ?? '',
      meta_description: (row.meta_description as string) ?? '',
      keywords,
    },
    executive_summary: (row.executive_summary as string) ?? undefined,
    key_highlights: (row.key_highlights as string[]) ?? undefined,
    market_context: (row.market_context as string) ?? undefined,
    forecast_analysis: (row.forecast_analysis as string) ?? undefined,
    reader_takeaways: (row.reader_takeaways as string[]) ?? undefined,
  };
}

/**
 * One report by slug. Supabase first, local JSON as fallback.
 * Returns null only when the slug exists in neither source — the caller is then
 * right to produce a real 404.
 */
export async function getReportBySlugFull(slug: string): Promise<JsonReport | null> {
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (!error && data) return rowToJsonReport(data as Record<string, unknown>);
  } catch {
    // fall through to the local snapshot
  }
  return getJsonReportBySlug(slug);
}

/**
 * Every report slug, for `generateStaticParams`. Selects one column only.
 * Falls back to the local snapshot so a build can never produce zero pages.
 */
export async function getReportSlugs(): Promise<string[]> {
  try {
    const { data, error } = await supabase.from(TABLE).select('slug');
    if (!error && data && data.length > 0) {
      const slugs = (data as Array<{ slug: string | null }>)
        .map((r) => r.slug)
        .filter((s): s is string => Boolean(s));
      if (slugs.length > 0) return Array.from(new Set(slugs));
    }
  } catch {
    // fall through
  }
  return getAllJsonReportSlugs();
}

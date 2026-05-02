import allReportsData from '@/data/all_reports.json';

export interface MarketForecastPoint {
  year: number;
  value: number;
}

export interface SegmentItem {
  name: string;
  market_share: number;
  description?: string;
}

export interface RegionItem {
  region: string;
  market_share: number;
  growth_rate: number;
  largest_country?: string;
  description?: string;
}

export interface CountryItem {
  country: string;
  market_share: number;
  growth_rate: number;
}

export interface CompanyProfile {
  company: string;
  market_position?: string;
  description?: string;
  headquarters?: string;
  founded?: number;
  overview?: string;
  revenue?: string;
  ai_healthcare_products?: string[];
}

export interface RecentDevelopment {
  year: number;
  company: string;
  event: string;
}

export interface JsonReport {
  report_id: string;
  slug: string;
  title: string;
  industry: string;
  published_year: number;
  base_year: number;
  forecast_period: string;
  historical_period: string;
  currency: string;
  unit: string;
  market_size: {
    current_value: number;
    forecast_value: number;
    cagr: number;
  };
  market_overview: {
    summary: string;
    key_trends: string[];
    market_stage: string;
    adoption_level: string;
  };
  market_dynamics: {
    drivers: string[];
    restraints: string[];
    opportunities: string[];
    challenges: string[];
  };
  market_segmentation: {
    by_component?: (SegmentItem | string)[];
    by_type?: (SegmentItem | string)[];
    by_application?: (SegmentItem | string)[];
    by_end_user?: (SegmentItem | string)[];
  };
  regional_analysis: RegionItem[];
  country_analysis: CountryItem[];
  market_forecast: MarketForecastPoint[];
  charts: Array<{
    type: string;
    title: string;
    data_source: string;
  }>;
  competitive_landscape: CompanyProfile[];
  company_profiles: CompanyProfile[];
  recent_developments: RecentDevelopment[];
  regulatory_landscape: string[];
  research_methodology: {
    primary_research: string[];
    secondary_research: string[];
    data_validation: string;
  };
  faqs: Array<{ question: string; answer: string }>;
  seo: {
    meta_title: string;
    meta_description: string;
    keywords: string[];
  };
  executive_summary?: string;
  key_highlights?: string[];
  market_context?: string;
  forecast_analysis?: string;
  reader_takeaways?: string[];
}

// Type assertion for imported JSON
const allReports = allReportsData as JsonReport[];

export function getJsonReportBySlug(slug: string): JsonReport | null {
  return allReports.find((r) => r.slug === slug) ?? null;
}

export function getAllJsonReportSlugs(): string[] {
  return allReports.map((r) => r.slug);
}

export function getAllJsonReports(): JsonReport[] {
  return allReports;
}

export function searchJsonReports(query: string): JsonReport[] {
  const q = query.toLowerCase().trim();
  if (!q) return allReports;
  return allReports.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.industry.toLowerCase().includes(q) ||
      r.market_overview.summary.toLowerCase().includes(q) ||
      (r.seo.meta_description ?? '').toLowerCase().includes(q)
  );
}

/** Maps a JsonReport to the flat UI Report shape used by ReportCard / ReportsListingClient */
export function jsonReportToUIReport(report: JsonReport, index: number) {
  return {
    id: index + 1,
    slug: report.slug,
    title: report.title,
    description: report.seo.meta_description || report.market_overview.summary,
    summary: report.market_overview.summary,
    category: report.industry,
    date: String(report.published_year),
    price: '$2,995',
    discounted_price: '$2,495',
    region: report.regional_analysis[0]?.region ?? 'Global',
    year: String(report.published_year),
    reportType: 'Market Analysis',
    pages: 150,
    // Detail-page fields
    reportCode: report.report_id,
    baseYear: String(report.base_year),
    forecastPeriod: report.forecast_period,
    marketSize2024: `$${report.market_size.current_value.toFixed(1)}B`,
    marketSize2032: `$${report.market_size.forecast_value.toFixed(1)}B`,
    cagr: `${report.market_size.cagr}%`,
    overview: report.market_overview.summary,
    keyFindings: report.market_overview.key_trends,
    meta_title: report.seo.meta_title,
    meta_description: report.seo.meta_description,
    meta_keywords: report.seo.keywords.join(', '),
    keyPlayers: report.competitive_landscape.map((c) => ({
      name: c.company,
      marketShare: 'N/A',
      headquarters: c.headquarters ?? '',
    })),
    faqs: report.faqs,
    authors: [] as Array<{
      id: number;
      name: string;
      role?: string;
      bio?: string;
      imageUrl?: string;
      linkedinUrl?: string;
      createdAt: string;
      updatedAt: string;
    }>,
    marketDetails: undefined as string | undefined,
    fullReportTOC: undefined as Array<{
      id: string;
      title: string;
      number?: string;
      children?: Array<{ id: string; title: string; number?: string }>;
    }> | undefined,
  };
}

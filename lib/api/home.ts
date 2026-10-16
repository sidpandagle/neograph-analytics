/**
 * Homepage facts, derived from Supabase rather than hardcoded.
 *
 * The hero previously shipped invented figures: "2,500+ research reports" against
 * 140 actual, and a "Global Telemedicine Market" snapshot whose numbers
 * ($286B/$331B/$842B, CAGR 16.8%) appear in no report — the real row says
 * $111B -> $300.47B at 11.7%. On a site whose product is analysis, invented
 * figures next to real ones devalue both.
 *
 * Everything returned here is read from the database or computed from it.
 */
import { supabase } from '@/lib/supabase/client';
import { toNum } from '@/lib/format';
import categoriesJson from '@/data/categories.json';

const TABLE = 'neograph_reports';

export interface HeroSnapshot {
  slug: string;
  title: string;
  industry: string;
  cagr: number | null;
  currency: string;
  unit: string;
  baseYear: number | null;
  forecastPeriod: string;
  /** Three points across the forecast: base year, midpoint, final year. */
  points: Array<{ year: string; value: number }>;
  topRegion: { region: string; share: number | null; year: string } | null;
  companiesProfiled: number;
  countriesAnalysed: number;
}

export interface HomeFacts {
  reportCount: number;
  industryCount: number;
  countryCount: number;
  /** Distinct companies named across every report's competitive landscape. */
  companyCount: number;
  snapshot: HeroSnapshot | null;
}

/** Shape the chosen report into the three-bar hero snapshot. */
function toSnapshot(row: Record<string, unknown>): HeroSnapshot {
  const ms = (row.market_size ?? {}) as Record<string, unknown>;
  const forecast = Array.isArray(row.market_forecast)
    ? (row.market_forecast as Array<{ year?: number; value?: number }>)
        .map((p) => ({ year: toNum(p?.year), value: toNum(p?.value) }))
        .filter((p): p is { year: number; value: number } => p.year !== null && p.value !== null)
        .sort((a, b) => a.year - b.year)
    : [];

  const baseYear = toNum(row.base_year);
  const current = toNum(ms.current_value);

  // Base year first (it is the actual, not a projection), then a midpoint and the
  // final forecast year, so the bars show where the market is and where it goes.
  const points: Array<{ year: string; value: number }> = [];
  if (baseYear !== null && current !== null) {
    points.push({ year: String(baseYear), value: current });
  }
  if (forecast.length) {
    const mid = forecast[Math.floor((forecast.length - 1) / 2)];
    const last = forecast[forecast.length - 1];
    if (mid && (!points.length || mid.year !== Number(points[0].year))) {
      points.push({ year: String(mid.year), value: mid.value });
    }
    if (last && last.year !== mid?.year) {
      points.push({ year: String(last.year), value: last.value });
    }
  }

  const regions = Array.isArray(row.regional_analysis)
    ? (row.regional_analysis as Array<Record<string, unknown>>)
    : [];
  const ranked = regions
    .filter((r) => typeof r?.region === 'string' && (r.region as string).trim())
    .sort((a, b) => (toNum(b?.market_share) ?? 0) - (toNum(a?.market_share) ?? 0));
  const top = ranked[0];

  const countries = Array.isArray(row.country_analysis)
    ? (row.country_analysis as Array<Record<string, unknown>>).filter(
        (c) => typeof c?.country === 'string' && (c.country as string).trim()
      )
    : [];

  return {
    slug: row.slug as string,
    title: row.title as string,
    industry: (row.industry as string) ?? '',
    cagr: toNum(ms.cagr),
    currency: (row.currency as string) ?? 'USD',
    unit: (row.unit as string) ?? 'Billion',
    baseYear,
    forecastPeriod: (row.forecast_period as string) ?? '',
    points: points.slice(0, 3),
    topRegion: top
      ? {
          region: top.region as string,
          share: toNum(top.market_share),
          year: baseYear !== null ? String(baseYear) : '',
        }
      : null,
    companiesProfiled: Array.isArray(row.competitive_landscape)
      ? (row.competitive_landscape as unknown[]).length
      : 0,
    countriesAnalysed: countries.length,
  };
}

/**
 * Counts and one featured snapshot.
 *
 * Deliberately two small queries rather than one wide one: Supabase egress is
 * metered and `neograph_reports` carries large JSONB columns, so the corpus-wide
 * query selects only `industry` and `country_analysis`.
 */
export async function getHomeFacts(featuredSlug?: string): Promise<HomeFacts> {
  const empty: HomeFacts = {
    reportCount: 0,
    industryCount: 0,
    countryCount: 0,
    companyCount: 0,
    snapshot: null,
  };

  try {
    const [{ data: corpus }, { data: featured }] = await Promise.all([
      supabase.from(TABLE).select('industry,country_analysis,competitive_landscape'),
      supabase
        .from(TABLE)
        .select(
          'slug,title,industry,base_year,forecast_period,currency,unit,market_size,market_forecast,regional_analysis,country_analysis,competitive_landscape'
        )
        .eq('slug', featuredSlug ?? 'telemedicine-market')
        .maybeSingle(),
    ]);

    const rows = corpus ?? [];
    const industries = new Set<string>();
    const countries = new Set<string>();
    const companies = new Set<string>();

    for (const row of rows as Array<Record<string, unknown>>) {
      const industry = row.industry;
      if (typeof industry === 'string' && industry.trim()) industries.add(industry.trim());

      const list = row.country_analysis;
      if (Array.isArray(list)) {
        for (const c of list as Array<Record<string, unknown>>) {
          const name = c?.country;
          if (typeof name === 'string' && name.trim()) countries.add(name.trim());
        }
      }

      const players = row.competitive_landscape;
      if (Array.isArray(players)) {
        for (const c of players as Array<Record<string, unknown>>) {
          const name = c?.company;
          if (typeof name === 'string' && name.trim()) companies.add(name.trim());
        }
      }
    }

    return {
      reportCount: rows.length,
      industryCount: industries.size,
      countryCount: countries.size,
      companyCount: companies.size,
      snapshot: featured ? toSnapshot(featured as Record<string, unknown>) : null,
    };
  } catch {
    return empty;
  }
}

/**
 * Minimal index for the hero typeahead.
 *
 * The hero search filtered `data/all_reports.json`, a 10-row snapshot, while
 * its own placeholder read "Search 142 reports". Typing a topic the
 * publication genuinely covers returned nothing, which reads as "we don't
 * cover that" rather than "the search is broken".
 *
 * Only the three columns the typeahead matches on are selected, so this is a
 * few KB rather than the full corpus, and the page is ISR-cached so it is not
 * fetched per visitor.
 */
export interface SearchIndexEntry {
  slug: string;
  title: string;
  category: string;
  description: string;
  region: string;
}

export async function getSearchIndex(): Promise<SearchIndexEntry[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('slug,title,industry,meta_description,regional_analysis')
    .order('title');

  /* Returning [] quietly on error makes a broken query look like an empty
     corpus: the hero renders "No results found" for every term and nothing
     anywhere says why. An earlier revision of this function selected a
     non-existent `seo` column and failed exactly that way. */
  if (error) {
    console.error('[getSearchIndex] query failed:', error.message);
    return [];
  }
  if (!data) return [];

  return data.map((r) => {
    const regions = Array.isArray(r.regional_analysis)
      ? (r.regional_analysis as Array<{ region?: string }>)
      : [];
    return {
      slug: String(r.slug ?? ''),
      title: String(r.title ?? ''),
      category: String(r.industry ?? ''),
      description: String(r.meta_description ?? ''),
      region: regions[0]?.region ?? 'Global',
    };
  });
}

/**
 * The report categories that actually exist in the corpus, with counts.
 *
 * `data/categories.json` lists 12 sectors. Six of them — Clinical Diagnostics,
 * Healthcare Services, Laboratory Equipment, Therapeutic Area, Dental, Animal
 * Health — match no report, so half the mega-menu tiles and listing chips led
 * to an empty page. The JSON is still the source of slugs and descriptions;
 * this decides which of them get rendered, and adds any industry present in
 * the corpus that the JSON never listed.
 *
 * Selects one short column over 142 rows (a few KB), in keeping with the
 * egress discipline in this file. The header is in the root layout, so every
 * ISR-cached route pays this once per revalidation window.
 */
export interface ReportCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export async function getReportCategories(): Promise<ReportCategory[]> {
  const { data, error } = await supabase.from(TABLE).select('industry');

  if (error) {
    console.error('[getReportCategories] query failed:', error.message);
    return [];
  }

  const counts = new Map<string, number>();
  for (const row of data ?? []) {
    const name = typeof row.industry === 'string' ? row.industry.trim() : '';
    if (name) counts.set(name, (counts.get(name) ?? 0) + 1);
  }
  if (counts.size === 0) return [];

  const defined = categoriesJson as Array<{
    id: number; name: string; slug: string; description: string;
  }>;
  const order = new Map(defined.map((c, i) => [c.name, i]));

  return [...counts.entries()]
    .map(([name, count]) => {
      const match = defined.find((c) => c.name === name);
      return {
        id: match?.id ?? 1000 + (order.size + count),
        name,
        slug: match?.slug ?? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        description: match?.description ?? `${count} research reports in ${name}.`,
        count,
      };
    })
    .sort(
      (a, b) =>
        (order.get(a.name) ?? 99) - (order.get(b.name) ?? 99) ||
        a.name.localeCompare(b.name)
    );
}

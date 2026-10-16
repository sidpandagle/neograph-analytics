/**
 * Related reports for the foot of a report page.
 *
 * Why: a report page contained **zero links to any other report** — measured as
 * 0 occurrences of `href="/reports/` in the built HTML of a report page. With
 * 152 reports that is 152 dead ends. It costs a reader the obvious next step,
 * and it costs the site the internal links a crawler uses to find depth, which
 * matters on a domain whose indexed count has been the standing problem.
 *
 * Selection is deterministic, because these pages are prerendered and two
 * builds of the same corpus must produce the same page: score, then break ties
 * by published year and slug. No randomness, no "trending".
 *
 * Egress: one narrow select of the whole corpus, memoised for the process. A
 * build renders 152 report pages in one process, so without the memo this would
 * run 152 times per build for the same rows.
 */
import { supabase } from '@/lib/supabase/client';
import { marketValue } from '@/lib/format';
import { marketName } from '@/lib/seo';

export interface RelatedReport {
  slug: string;
  title: string;
  industry: string;
  size: string;
  cagr: string;
}

interface LightRow {
  slug: string;
  title: string;
  industry: string;
  published_year: number;
  market_size: { current_value?: number; forecast_value?: number; cagr?: number } | null;
  unit: string | null;
}

const TTL_MS = 60_000;
let memo: { at: number; rows: LightRow[] } | null = null;

async function loadCorpus(): Promise<LightRow[]> {
  if (memo && Date.now() - memo.at < TTL_MS) return memo.rows;

  const { data, error } = await supabase
    .from('neograph_reports')
    .select('slug,title,industry,published_year,market_size,unit');

  if (error || !data) {
    console.error('[relatedReports] query failed:', error?.message ?? 'no data');
    return memo?.rows ?? [];
  }

  const rows = data as unknown as LightRow[];
  memo = { at: Date.now(), rows };
  return rows;
}

/** Words that carry no topical signal in a market-report title. */
const STOPWORDS = new Set([
  'market', 'markets', 'global', 'size', 'share', 'trends', 'analysis', 'report',
  'forecast', 'outlook', 'industry', 'growth', 'and', 'the', 'for', 'in', 'of',
  'by', 'to', 'with', 'drivers', 'research', '2026', '2032', 'from',
]);

/**
 * How far apart two markets are in scale, as an order-of-magnitude distance.
 * Used only to break ties: among equally related reports, one of a comparable
 * size is the more useful comparison to a reader who has just read this one.
 */
function sizeDistance(a: LightRow, b: LightRow): number {
  const av = a.market_size?.current_value;
  const bv = b.market_size?.current_value;
  if (!av || !bv || av <= 0 || bv <= 0) return 99;
  return Math.abs(Math.log10(av) - Math.log10(bv));
}

function topicTokens(title: string): Set<string> {
  return new Set(
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/[\s-]+/)
      .filter((w) => w.length > 2 && !STOPWORDS.has(w))
  );
}

/**
 * Reports to show alongside `slug`. Same industry counts for a lot, shared
 * topic words count for more where they overlap strongly — which is what puts
 * the oncology reports next to each other and keeps a diagnostics report from
 * being surrounded by unrelated Life Sciences rows.
 */
export async function getRelatedReports(
  slug: string,
  limit = 6
): Promise<RelatedReport[]> {
  const rows = await loadCorpus();
  const self = rows.find((r) => r.slug === slug);
  if (!self) return [];

  const selfTokens = topicTokens(self.title);

  /* Regional clones — `north-america-*`, `europe-*`, `asia-pacific-*`,
     `united-states-*` — are copies of a base topic, and four of them in a
     related list crowd out four different markets. They are penalised, not
     excluded: for a regional report they are the genuinely closest neighbours. */
  const REGION_PREFIX = /^(north-america|europe|asia-pacific|united-states|latin-america|middle-east)-/;
  const selfIsRegional = REGION_PREFIX.test(slug);

  /* 26 rows in the corpus are not healthcare at all — agritech, climate tech,
     space economy, quantum technology, digital infrastructure, advanced
     materials, synthetic biology — and several are filed under the same
     `industry` values as the healthcare rows. Without this, the related list
     for `liquid-biopsy-market` came back as earth observation, 5G smart grid,
     green hydrogen, vertical farming and quantum sensors: same stored industry,
     similar market size, nothing else in common. Crossing that boundary costs
     more than a same-industry match is worth. */
  const CLUSTER_PREFIX = /^(agritech|climate-tech|space-economy|quantum-technology|digital-infrastructure|advanced-materials|synthetic-biology)-/;
  const selfCluster = slug.match(CLUSTER_PREFIX)?.[1] ?? null;

  const scored = rows
    .filter((r) => r.slug !== slug)
    /* Hard boundary, not a penalty: a healthcare report never lists a
       non-healthcare one and vice versa, whatever the stored `industry` says.
       The corpus's `industry` values do not separate them — `liquid-biopsy` and
       `agritech-vertical-farming-led` are both "Life Sciences". */
    .filter((r) => (r.slug.match(CLUSTER_PREFIX)?.[1] ?? null) === selfCluster)
    .map((r) => {
      const shared = [...topicTokens(r.title)].filter((t) => selfTokens.has(t)).length;
      /* +1 for being on the right side of that boundary at all, so a report
         whose own industry holds few siblings still gets a full list rather than
         one lonely link. Industry and shared topic words do the real ranking. */
      let score = 1 + (r.industry === self.industry ? 3 : 0) + shared * 2;
      if (!selfIsRegional && REGION_PREFIX.test(r.slug)) score -= 2;
      return { row: r, score, shared };
    })
    .filter((s) => s.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.shared - a.shared ||
        sizeDistance(a.row, self) - sizeDistance(b.row, self) ||
        (b.row.published_year ?? 0) - (a.row.published_year ?? 0) ||
        a.row.slug.localeCompare(b.row.slug)
    );

  /* Prefer rows that share a topic word, and only fall back to same-industry
     neighbours if there are not enough. Without this the list for a market with
     no close neighbour was simply the industry in alphabetical order. */
  const topical = scored.filter((s) => s.shared > 0).slice(0, limit);
  const filler = scored.filter((s) => s.shared === 0).slice(0, Math.max(0, limit - topical.length));
  const chosen = [...topical, ...filler];

  return chosen.map(({ row }) => ({
    slug: row.slug,
    /* Cards printed the whole stored title, boilerplate tail and all. */
    title: marketName(row.title),
    industry: row.industry,
    size: marketValue(row.market_size?.current_value, row.unit),
    cagr:
      typeof row.market_size?.cagr === 'number' ? `${row.market_size.cagr}% CAGR` : '',
  }));
}

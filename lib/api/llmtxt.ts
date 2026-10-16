/**
 * `/llms.txt` — the machine-readable site summary for LLM crawlers.
 *
 * It used to be generated from `data/reports.json` (12 rows) and
 * `data/blogs.json` (6), while the live corpus holds 150-plus reports. A crawler
 * asking this endpoint what the publication covers was told about 8% of it —
 * the same defect class as the listing search that filtered a 10-row snapshot.
 *
 * It also advertised URLs that do not exist: a `/categories/<slug>` link for
 * each of the twelve entries in `categories.json`, twice over, against a route
 * that returns 404 (verified: `/categories/biotechnology` -> 404), plus
 * `/consulting`, which 308s to `/services`. Feeding a crawler a list of dead
 * links is the soft-404 problem pointed at machines instead of people.
 *
 * Now: Supabase first, with the JSON snapshots as the fallback that keeps the
 * endpoint answering if the database is unreachable. Categories are derived from
 * the corpus, so a category with no reports cannot be advertised, and category
 * links point at `/reports?category=<slug>`, which is what the listing actually
 * reads.
 *
 * Egress note: three narrow selects, and the route caches for an hour
 * (`s-maxage=3600`), so this is not fetched per crawl.
 */
import { supabase } from '@/lib/supabase/client';
import reportsData from '@/data/reports.json';
import blogsData from '@/data/blogs.json';
import consultingData from '@/data/consulting-services.json';
import categoriesData from '@/data/categories.json';
import { marketValue } from '@/lib/format';

interface ReportLine {
  slug: string;
  title: string;
  description: string;
  category: string;
  year: string;
  currentValue: string;
  forecastValue: string;
  cagr: string;
  forecastPeriod: string;
}

interface ArticleLine {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
}

interface ConsultingService {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  overview: string;
  servicesInclude: string[];
}

const BASE_URL = 'https://www.neographanalytics.com';

/** Report lines from Supabase, falling back to the bundled snapshot. */
async function loadReports(): Promise<{ reports: ReportLine[]; source: 'supabase' | 'snapshot' }> {
  const { data, error } = await supabase
    .from('neograph_reports')
    .select('slug,title,meta_description,industry,published_year,base_year,forecast_period,market_size,unit')
    .order('published_year', { ascending: false });

  if (!error && data?.length) {
    const reports = data.map((r) => {
      const ms = (r.market_size ?? {}) as Record<string, number>;
      return {
        slug: String(r.slug ?? ''),
        title: String(r.title ?? ''),
        description: String(r.meta_description ?? ''),
        category: String(r.industry ?? ''),
        year: String(r.published_year ?? ''),
        currentValue: marketValue(ms.current_value, r.unit),
        forecastValue: marketValue(ms.forecast_value, r.unit),
        cagr: typeof ms.cagr === 'number' ? `${ms.cagr}%` : '',
        forecastPeriod: String(r.forecast_period ?? ''),
      };
    });
    return { reports, source: 'supabase' };
  }

  if (error) console.error('[llms.txt] report query failed:', error.message);

  const snapshot = (reportsData as Array<Record<string, unknown>>).map((r) => ({
    slug: String(r.slug ?? ''),
    title: String(r.title ?? ''),
    description: String(r.description ?? ''),
    category: String(r.category ?? ''),
    year: String(r.year ?? r.date ?? ''),
    currentValue: String(r.marketSize2024 ?? ''),
    forecastValue: String(r.marketSize2032 ?? ''),
    cagr: String(r.cagr ?? ''),
    forecastPeriod: String(r.forecastPeriod ?? ''),
  }));
  return { reports: snapshot, source: 'snapshot' };
}

async function loadArticles(table: string, fallback: ArticleLine[]): Promise<ArticleLine[]> {
  const { data, error } = await supabase
    .from(table)
    .select('slug,title,excerpt,category,author,date,read_time')
    .order('id', { ascending: false });

  if (!error && data?.length) {
    return data.map((b) => ({
      slug: String(b.slug ?? ''),
      title: String(b.title ?? ''),
      excerpt: String(b.excerpt ?? ''),
      category: String(b.category ?? ''),
      author: String(b.author ?? ''),
      date: String(b.date ?? ''),
      readTime: String(b.read_time ?? ''),
    }));
  }
  if (error) console.error(`[llms.txt] ${table} query failed:`, error.message);
  return fallback;
}

export async function generateLLMTxt(): Promise<string> {
  const [{ reports, source }, blogs, pressReleases] = await Promise.all([
    loadReports(),
    loadArticles(
      'neograph_blogs',
      (blogsData as Array<Record<string, unknown>>).map((b) => ({
        slug: String(b.slug ?? ''),
        title: String(b.title ?? ''),
        excerpt: String(b.excerpt ?? ''),
        category: String(b.category ?? ''),
        author: String(b.author ?? ''),
        date: String(b.date ?? ''),
        readTime: String(b.readTime ?? ''),
      }))
    ),
    loadArticles('neograph_press_releases', []),
  ]);

  const services = consultingData as ConsultingService[];
  const definedCategories = categoriesData as Array<{
    name: string; slug: string; description: string;
  }>;

  // Categories come from the corpus. One that matches no report is not
  // advertised, because its page would be empty.
  const counts = new Map<string, number>();
  for (const r of reports) if (r.category) counts.set(r.category, (counts.get(r.category) ?? 0) + 1);
  const categories = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => {
      const defined = definedCategories.find((c) => c.name === name);
      return {
        name,
        count,
        slug: defined?.slug ?? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        description: defined?.description ?? `${count} research reports in ${name}.`,
      };
    });

  let content = '';

  content += '# NeoGraph Analytics\n\n';
  content += '## Site Overview\n\n';
  content += 'A healthcare and life-sciences market research publication. Every published figure is traced to a named source — company filings, regulatory registers, public statistics — and every headline market size is tested against a countable denominator before publication. Coverage spans pharmaceuticals, biotechnology, medical devices, diagnostics, life-science tools and healthcare IT.\n\n';
  content += `Research reports: ${reports.length}\n`;
  content += `Analysis articles: ${blogs.length}\n`;
  content += `Press releases: ${pressReleases.length}\n`;
  content += `Consulting services: ${services.length}\n`;
  content += `Report categories: ${categories.length}\n\n`;

  content += '## Methodology\n\n';
  content += 'Published estimates are collected and compared rather than averaged, each with its publisher and stated scope. Every headline is divided through by something countable (product revenue, an approval register, a trial count, a certified-site count). Vendor market shares, undisclosed regional splits and unsourced segment percentages are omitted rather than estimated. Each report is checked mechanically: the stated CAGR must reconnect the base-year value to the forecast value across the stated period, and every chart must carry a source.\n';
  content += `URL: ${BASE_URL}/methodology\n\n`;

  content += '## Report Categories\n\n';
  for (const cat of categories) {
    content += `### ${cat.name}\n`;
    content += `${cat.description}\n`;
    content += `Reports: ${cat.count} | URL: ${BASE_URL}/reports?category=${cat.slug}\n\n`;
  }

  content += '## Research Reports\n\n';
  content += `${reports.length} reports covering global healthcare markets, each with a base-year figure attributed to a named publisher and a grounding calculation printed with it.\n\n`;

  content += '### Reports by category\n\n';
  for (const cat of categories) content += `- ${cat.name}: ${cat.count} reports\n`;
  content += '\n';

  // The whole index, not a sample: a crawler asking what we cover should be
  // told, and one line per report is a few hundred bytes.
  content += '### Report index\n\n';
  for (const r of reports) {
    content += `#### ${r.title}\n`;
    if (r.description) content += `${r.description}\n`;
    content += `Category: ${r.category}`;
    if (r.year) content += ` | Published: ${r.year}`;
    content += '\n';
    if (r.cagr && r.forecastPeriod) content += `Market growth: ${r.cagr} CAGR | Forecast period: ${r.forecastPeriod}\n`;
    if (r.currentValue && r.forecastValue && r.currentValue !== '—') {
      content += `Market size: ${r.currentValue} base year -> ${r.forecastValue} forecast\n`;
    }
    content += `URL: ${BASE_URL}/reports/${r.slug}\n\n`;
  }

  if (blogs.length) {
    content += '## Analysis Articles\n\n';
    for (const b of blogs) {
      content += `### ${b.title}\n`;
      if (b.excerpt) content += `${b.excerpt}\n`;
      content += `Author: ${b.author} | Category: ${b.category} | Published: ${b.date}${b.readTime ? ` | ${b.readTime}` : ''}\n`;
      content += `URL: ${BASE_URL}/blog/${b.slug}\n\n`;
    }
  }

  if (pressReleases.length) {
    content += '## Press Releases\n\n';
    for (const p of pressReleases) {
      content += `### ${p.title}\n`;
      if (p.excerpt) content += `${p.excerpt}\n`;
      content += `Published: ${p.date}\n`;
      content += `URL: ${BASE_URL}/press-releases/${p.slug}\n\n`;
    }
  }

  content += '## Consulting Services\n\n';
  content += 'Advisory work for healthcare and life-sciences organisations across market intelligence, R&D, regulatory affairs and business development.\n\n';
  for (const category of [...new Set(services.map((s) => s.category))]) {
    content += `### ${category}\n\n`;
    for (const service of services.filter((s) => s.category === category)) {
      content += `#### ${service.title}\n`;
      content += `${service.description}\n\n`;
      content += `${service.overview}\n\n`;
      content += 'Key services:\n';
      service.servicesInclude.slice(0, 5).forEach((item) => { content += `- ${item}\n`; });
      content += `\nURL: ${BASE_URL}/consulting/${service.slug}\n\n`;
    }
  }

  content += '## Site Structure\n\n';
  content += `- Home: ${BASE_URL}/\n`;
  content += `- Research reports: ${BASE_URL}/reports\n`;
  content += `- Methodology: ${BASE_URL}/methodology\n`;
  content += `- Analysis articles: ${BASE_URL}/blog\n`;
  content += `- Press releases: ${BASE_URL}/press-releases\n`;
  // /consulting 308s to /services, so the hub is advertised by its real path.
  content += `- Consulting services: ${BASE_URL}/services\n`;
  content += `- About: ${BASE_URL}/about\n`;
  content += `- Contact: ${BASE_URL}/contact\n\n`;

  content += '---\n\n';
  content += `Generated: ${new Date().toISOString()}\n`;
  content += `Content source: ${source === 'supabase' ? 'live corpus' : 'bundled snapshot (database unreachable)'}\n`;
  content += 'Content type: healthcare market research, life sciences, pharmaceuticals, medical devices, biotechnology, healthcare IT\n';

  return content;
}

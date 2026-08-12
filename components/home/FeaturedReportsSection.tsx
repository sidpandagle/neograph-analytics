import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';

interface FeaturedReport {
  report_id: string;
  slug: string;
  title: string;
  industry: string;
  published_year: number;
  base_year: number;
  forecast_period: string;
  currency: string;
  unit: string;
  market_size: { current_value: number; forecast_value: number; cagr: number };
  regional_analysis: Array<{ region: string; market_share?: number }>;
}

const unitSuffix: Record<string, string> = {
  Trillion: 'T',
  Billion: 'B',
  Million: 'M',
  Thousand: 'K',
};

/** Market sizes are set in Outfit; the forecast figure always gets the blue. */
function formatSize(value: number, currency: string, unit: string) {
  const symbol = currency === 'USD' ? '$' : '';
  const suffix = unitSuffix[unit] ?? '';
  const rounded = value >= 100 ? Math.round(value) : Number(value.toFixed(2));
  return `${symbol}${rounded}${suffix}`;
}

function splitPeriod(period: string, baseYear: number) {
  const [start, end] = (period ?? '').split(/[-–]/).map((p) => p.trim());
  return { start: start || String(baseYear), end: end || '' };
}

export default async function FeaturedReportsSection() {
  const { data } = await supabase
    .from('neograph_reports')
    .select(
      'report_id, slug, title, industry, published_year, base_year, forecast_period, currency, unit, market_size, regional_analysis'
    )
    .order('published_year', { ascending: false })
    .limit(4);

  const reports = (data ?? []) as FeaturedReport[];
  if (reports.length === 0) return null;

  return (
    <section className="flex flex-col gap-6.5 rounded-panel bg-white p-7 md:p-11">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex max-w-[620px] flex-col gap-3">
          <span className="eyebrow">Trending reports by industry</span>
          <h2 className="text-[28px] md:text-[36px]">Latest market insights</h2>
          <p className="text-[15px] leading-[1.6] text-[var(--cmi-body)]">
            Oncology, medical devices, diagnostics, digital health and life sciences —
            over 2,500 research reports spanning 20+ sectors and 50+ countries.
          </p>
        </div>
        <Link href="/reports" className="text-sm font-semibold text-[var(--cmi-primary)]">
          Browse all reports →
        </Link>
      </div>

      {/* Report cards — the primary content unit */}
      <div className="grid gap-[18px] lg:grid-cols-2">
        {reports.map((report) => {
          const { start, end } = splitPeriod(report.forecast_period, report.base_year);
          const region = report.regional_analysis?.[0];

          return (
            <article
              key={report.report_id}
              className="flex flex-col gap-[18px] rounded-card border border-[var(--cmi-line)] p-6.5 transition-colors duration-200 hover:border-[var(--cmi-primary)]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="truncate text-[11.5px] font-bold uppercase tracking-[0.08em] text-[var(--cmi-body)]">
                  {report.industry}
                </span>
                <span className="shrink-0 text-[11.5px] font-bold text-[var(--cmi-meta)]">
                  {report.published_year}
                </span>
              </div>

              <h3 className="line-clamp-2 font-display text-[20px] font-semibold leading-[1.25] md:text-[22px]">
                <Link href={`/reports/${report.slug}`} className="text-[var(--cmi-ink)] hover:text-[var(--cmi-primary)]">
                  {report.title}
                </Link>
              </h3>

              <div className="flex flex-wrap gap-2">
                <span className="chip-primary">CAGR {report.market_size?.cagr ?? '—'}%</span>
                {report.forecast_period && <span className="chip">{report.forecast_period}</span>}
                {region?.region && (
                  <span className="chip">
                    {region.region}
                    {region.market_share ? ` ${region.market_share}%` : ''}
                  </span>
                )}
              </div>

              {/* Growth rail: base year → forecast year */}
              <div className="growth-rail">
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold text-[var(--cmi-meta)]">{start}</span>
                  <span className="num text-[18px] md:text-[20px]">
                    {formatSize(report.market_size?.current_value ?? 0, report.currency, report.unit)}
                  </span>
                </div>

                <div className="flex flex-1 items-center gap-1" aria-hidden="true">
                  <div className="h-[3px] flex-1 rounded-pill bg-[var(--cmi-base)]" />
                  <div className="h-[3px] flex-[2] rounded-pill bg-[var(--cmi-primary)]" />
                  <span className="text-[11px] font-bold text-[var(--cmi-primary)]">▸</span>
                </div>

                <div className="flex flex-col text-right">
                  <span className="text-[11px] font-semibold text-[var(--cmi-meta)]">{end}</span>
                  <span className="num text-[18px] text-[var(--cmi-primary)] md:text-[20px]">
                    {formatSize(report.market_size?.forecast_value ?? 0, report.currency, report.unit)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-0.5">
                <span className="text-[12.5px] text-[var(--cmi-body)]">
                  {report.regional_analysis?.length ?? 0} regions · Base year {report.base_year}
                </span>
                <Link
                  href={`/reports/${report.slug}`}
                  className="text-[13.5px] font-semibold text-[var(--cmi-primary)]"
                >
                  Read more →
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

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
  /* Six, not four: at four the 2-up grid left each card ~470px wide and the
     section read as a pair of oversized tiles stacked twice. Six in a 3-up
     grid fills the same band at a card width the type was sized for. */
  const { data } = await supabase
    .from('neograph_reports')
    .select(
      'report_id, slug, title, industry, published_year, base_year, forecast_period, currency, unit, market_size, regional_analysis'
    )
    .order('published_year', { ascending: false })
    .order('report_id', { ascending: false })
    .limit(6);

  const reports = (data ?? []) as FeaturedReport[];
  if (reports.length === 0) return null;

  return (
    <section className="flex flex-col gap-6.5 rounded-panel bg-[var(--card)] p-7 md:p-11">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex max-w-[620px] flex-col gap-3">
          <span className="eyebrow">Trending reports by industry</span>
          <h2 className="text-[28px] md:text-[36px]">Latest market insights</h2>
          <p className="text-[15px] leading-[1.6] text-[var(--cmi-body)]">
            {/* This read "over 2,500 research reports spanning 20+ sectors and
                50+ countries" while the hero, one scroll above, correctly said
                142 across 6 verticals. Three different corpus sizes were
                visible on one page. The hero already states the real count
                from a live query, so this sentence states no number at all
                rather than inventing a second source of truth. */}
            Oncology, medical devices, diagnostics, digital health and life sciences.
          </p>
        </div>
        <Link
          href="/reports"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--cmi-primary)] hover:underline"
        >
          Browse all reports
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>

      {/* Report cards — the primary content unit */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reports.map((report) => {
          const { start, end } = splitPeriod(report.forecast_period, report.base_year);
          const region = report.regional_analysis?.[0];
          const regionCount = report.regional_analysis?.length ?? 0;

          return (
            <article
              key={report.report_id}
              className="group relative flex flex-col gap-3.5 rounded-card border border-[var(--cmi-line)] p-5 transition-colors duration-200 hover:border-[var(--cmi-primary)] focus-within:border-[var(--cmi-primary)]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="truncate text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--cmi-body)]">
                  {report.industry}
                </span>
                <span className="shrink-0 text-[11px] font-bold text-[var(--cmi-meta)]">
                  {report.published_year}
                </span>
              </div>

              {/* min-h holds two lines so the chips, rail and footer of every
                  card in a row line up whether the title wraps once or twice. */}
              <h3 className="line-clamp-2 min-h-[2.5em] font-display text-[17px] font-semibold leading-[1.25] md:text-[18px]">
                {/* The stretched pseudo-element makes the whole card the hit
                    target, so the footer arrow is decoration rather than a
                    second link to the same page. */}
                <Link
                  href={`/reports/${report.slug}`}
                  className="text-[var(--cmi-ink)] after:absolute after:inset-0 after:content-[''] group-hover:text-[var(--cmi-primary)]"
                >
                  {report.title}
                </Link>
              </h3>

              <div className="flex flex-wrap gap-1.5">
                <span className="chip-primary">CAGR {report.market_size?.cagr ?? '—'}%</span>
                {report.forecast_period && <span className="chip">{report.forecast_period}</span>}
                {region?.region && (
                  <span className="chip">
                    {region.region}
                    {region.market_share ? ` ${region.market_share}%` : ''}
                  </span>
                )}
              </div>

              {/* Growth rail: base year → forecast year. mt-auto pins it to the
                  bottom of the card so a short chip row cannot shift it. */}
              <div className="growth-rail mt-auto gap-3 p-3.5">
                <div className="flex flex-col">
                  <span className="text-[10.5px] font-semibold text-[var(--cmi-meta)]">{start}</span>
                  <span className="num text-[17px]">
                    {formatSize(report.market_size?.current_value ?? 0, report.currency, report.unit)}
                  </span>
                </div>

                <div className="flex flex-1 items-center gap-1" aria-hidden="true">
                  <div className="h-[3px] flex-1 rounded-pill bg-[var(--cmi-base)]" />
                  <div className="h-[3px] flex-[2] rounded-pill bg-[var(--cmi-primary-fill)]" />
                  <span className="text-[11px] font-bold text-[var(--cmi-primary)]">▸</span>
                </div>

                <div className="flex flex-col text-right">
                  <span className="text-[10.5px] font-semibold text-[var(--cmi-meta)]">{end}</span>
                  <span className="num text-[17px] text-[var(--cmi-primary)]">
                    {formatSize(report.market_size?.forecast_value ?? 0, report.currency, report.unit)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                {/* "0 regions · Base year 2026" printed on every report whose
                    regional_analysis is empty; say nothing instead of nothing-
                    shaped. */}
                <span className="text-[12px] text-[var(--cmi-body)]">
                  {regionCount > 0 ? `${regionCount} region${regionCount === 1 ? '' : 's'} · ` : ''}
                  Base year {report.base_year}
                </span>
                <span
                  aria-hidden="true"
                  className="inline-flex shrink-0 items-center gap-1 text-[13px] font-semibold text-[var(--cmi-primary)]"
                >
                  Read more
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

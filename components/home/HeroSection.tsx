import Link from 'next/link';
import { SearchBar } from '@/components/ui';
import { getHomeFacts, getSearchIndex } from '@/lib/api/home';

/*
 * Every figure in this hero is read from Supabase.
 *
 * It previously hardcoded "2,500+ research reports" (actual: 140) and a
 * telemedicine snapshot of $286B/$331B/$842B at 16.8% CAGR — numbers that appear
 * in no report; the real row reads $111B -> $300.47B at 11.7%. The linked report
 * was also one of the 130 that 404'd. On a research publication, an invented
 * chart in the hero undermines every real number behind it.
 */

/* Charts sit on white inside a sky panel — never directly on the desk. */
const BAR_FILLS = ['var(--cmi-sky)', 'var(--cmi-mid)', 'var(--cmi-primary)'];

function compact(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

export default async function HeroSection() {
  const [{ reportCount, industryCount, countryCount, snapshot }, searchIndex] = await Promise.all([
    getHomeFacts(),
    getSearchIndex(),
  ]);

  const heroStats = [
    { val: reportCount ? String(reportCount) : '—', label: 'Research reports' },
    { val: industryCount ? String(industryCount) : '—', label: 'Industries covered' },
    { val: countryCount ? String(countryCount) : '—', label: 'Countries analysed' },
  ];

  const corpusLabel = reportCount ? `${reportCount} research reports` : 'Research reports';

  // Bars are scaled against the largest value so the shape reflects the data.
  const maxValue = snapshot?.points.length
    ? Math.max(...snapshot.points.map((p) => p.value))
    : 0;
  const symbol = snapshot?.currency === 'USD' ? '$' : `${snapshot?.currency ?? ''} `;
  const unitShort = snapshot?.unit === 'Billion' ? 'B' : snapshot?.unit === 'Million' ? 'M' : '';

  return (
    <section className="grid items-center gap-8 overflow-hidden rounded-panel bg-[var(--cmi-primary)] p-7 md:p-11 lg:grid-cols-2 lg:gap-10">
      {/* ── Left: the claim ─────────────────────────────────────── */}
      <div className="flex flex-col gap-6">
        <h1 className="animate-reveal-up-d1 text-[38px] font-bold leading-[1.04] tracking-[-0.03em] text-white sm:text-[46px] lg:text-[54px]">
          Behind Healthcare&apos;s
          <br />
          Biggest Decisions
        </h1>

        <p className="animate-reveal-up-d2 max-w-[440px] text-[15px] leading-[1.55] text-[var(--cmi-on-blue)] md:text-base">
          {corpusLabel} across {industryCount || 'every'} healthcare and life
          sciences {industryCount === 1 ? 'vertical' : 'verticals'} — market sizing,
          segmentation, regional and competitive analysis, each with its sources and
          method stated.
        </p>

        <div className="animate-reveal-up-d3">
          <SearchBar
            reports={searchIndex}
            variant="hero"
            placeholder={
              reportCount
                ? `Search ${reportCount} reports — e.g. oncology diagnostics`
                : 'Search reports — e.g. oncology diagnostics'
            }
          />
        </div>

        <div className="animate-reveal-up-d4 flex flex-wrap gap-x-7 gap-y-4 pt-1">
          {heroStats.map(({ val, label }) => (
            <div key={label} className="flex flex-col gap-0.5">
              <span className="num text-[26px] text-white">{val}</span>
              <span className="text-xs font-medium tracking-[0.04em] text-[var(--cmi-on-blue-dim)]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: the proof ────────────────────────────────────── */}
      <div className="animate-reveal-up-d3 flex min-h-[420px] flex-col justify-center gap-4 rounded-[20px] bg-[var(--cmi-sky)] p-5 md:p-6.5">
        {/* Report snapshot — real figures from the featured report */}
        {snapshot ? (
          <div className="flex flex-col gap-3.5 rounded-tile bg-white p-4 md:p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11.5px] font-semibold uppercase tracking-[0.06em] text-[var(--cmi-meta)]">
                Report snapshot
              </span>
              {snapshot.cagr !== null && (
                <span className="chip-primary">CAGR {snapshot.cagr}%</span>
              )}
            </div>

            <h2 className="font-display text-[17px] font-semibold leading-[1.25] text-[var(--cmi-ink)] md:text-[19px]">
              <Link href={`/reports/${snapshot.slug}`} className="hover:underline">
                {snapshot.title}
              </Link>
            </h2>

            <div className="grid h-32 items-end gap-3" style={{ gridTemplateColumns: `repeat(${snapshot.points.length}, minmax(0, 1fr))` }}>
              {snapshot.points.map((point, i) => (
                <div key={point.year} className="flex h-full flex-col justify-end gap-2">
                  <span
                    className={`num text-[13px] ${
                      i === snapshot.points.length - 1
                        ? 'text-[var(--cmi-primary)]'
                        : 'text-[var(--cmi-ink)]'
                    }`}
                  >
                    {symbol}
                    {compact(point.value)}
                    {unitShort}
                  </span>
                  <div
                    className="animate-grow-bar rounded-t-lg"
                    style={{
                      height: `${maxValue ? Math.max(8, (point.value / maxValue) * 100) : 0}%`,
                      background: BAR_FILLS[Math.min(i, BAR_FILLS.length - 1)],
                      animationDelay: `${0.35 + i * 0.12}s`,
                    }}
                  />
                  <span className="text-[11px] font-semibold text-[var(--cmi-meta)]">
                    {point.year}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[11px] leading-[1.4] text-[var(--cmi-meta)]">
              {snapshot.baseYear !== null
                ? `${snapshot.baseYear} actual; later years forecast`
                : 'Forecast'}
              {snapshot.forecastPeriod ? ` (${snapshot.forecastPeriod})` : ''}. Figures in{' '}
              {snapshot.currency} {snapshot.unit.toLowerCase()}.
            </p>
          </div>
        ) : null}

        {/* Two supporting tiles — also from the featured report */}
        {snapshot && (
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-tile bg-white p-4">
              <div className="num text-[17px] text-[var(--cmi-ink)]">
                {snapshot.topRegion?.region ?? snapshot.industry}
              </div>
              <p className="mt-1 text-xs leading-[1.45] text-[var(--cmi-body)]">
                {snapshot.topRegion?.share !== null && snapshot.topRegion
                  ? `Largest market — ${snapshot.topRegion.share}% share${
                      snapshot.topRegion.year ? `, ${snapshot.topRegion.year}` : ''
                    }`
                  : 'Leading segment'}
              </p>
            </div>
            <div className="rounded-tile bg-white p-4">
              <div className="num text-[17px] text-[var(--cmi-ink)]">
                {snapshot.companiesProfiled} companies
              </div>
              <p className="mt-1 text-xs leading-[1.45] text-[var(--cmi-body)]">
                Profiled alongside {snapshot.countriesAnalysed} countries and segment
                detail
              </p>
            </div>
          </div>
        )}

        {/* Ink strip — the one dark note in the hero */}
        <div className="flex items-center justify-between gap-3 rounded-tile bg-[var(--cmi-ink)] p-4 md:px-[18px]">
          <span className="max-w-[250px] text-[13px] leading-[1.4] text-[var(--cmi-on-blue)]">
            Exclusive, in-depth intelligence to grow your revenue.
          </span>
          <Link
            href="/request-sample"
            className="shrink-0 rounded-pill bg-white px-4 py-2.5 text-[13px] font-semibold text-[var(--cmi-ink)] transition-colors hover:bg-[var(--cmi-chip-blue)] hover:text-[var(--cmi-ink)]"
          >
            Download sample
          </Link>
        </div>
      </div>
    </section>
  );
}

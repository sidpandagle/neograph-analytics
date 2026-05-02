import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui';
import allReportsData from '@/data/all_reports.json';
import type { JsonReport } from '@/lib/jsonReports';

const accentPalette = [
  { bar: '#111a4a', badgeBg: 'rgba(17,26,74,0.06)', badgeText: '#111a4a', badgeBorder: 'rgba(17,26,74,0.12)', dot: '#111a4a' },
  { bar: '#ec652b', badgeBg: 'rgba(236,101,43,0.08)', badgeText: '#ec652b', badgeBorder: 'rgba(236,101,43,0.20)', dot: '#ec652b' },
  { bar: '#111a4a', badgeBg: 'rgba(17,26,74,0.06)', badgeText: '#111a4a', badgeBorder: 'rgba(17,26,74,0.12)', dot: '#111a4a' },
];

const reports = (allReportsData as JsonReport[]).slice(0, 3);

export default function FeaturedReportsSection() {
  const [featured, ...secondary] = reports;

  return (
    <section className="py-24" style={{ backgroundColor: '#f6f6f8' }}>
      <Container size="xl">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div className="space-y-3">
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border"
              style={{ color: '#111a4a', backgroundColor: 'rgba(17,26,74,0.05)', borderColor: 'rgba(17,26,74,0.12)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#ec652b' }} />
              Featured Research
            </span>
            <h2 className="text-3xl md:text-[2.6rem] lg:text-5xl tracking-[-0.03em] leading-[1.08]" style={{ color: '#011821' }}>
              Latest Market Intelligence
            </h2>
            <p className="text-base max-w-xl leading-relaxed" style={{ color: '#7c7f88' }}>
              High-impact reports updated with the latest data, trends, and forecasts.
            </p>
          </div>
          <Link
            href="/reports"
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors shrink-0 group text-[#ec652b] hover:text-[#d45a25]"
          >
            View all reports
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Magazine layout */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Featured card */}
          <Link
            href={`/reports/${featured.slug}`}
            className="group lg:flex-[1.35] flex flex-col bg-white rounded-2xl overflow-hidden border border-[#e3e4e8] hover:border-[#111a4a]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Accent bar */}
            <div className="h-1.5 shrink-0" style={{ backgroundColor: '#111a4a' }} />

            {/* Dark visual header */}
            <div
              className="relative px-8 pt-8 pb-10 overflow-hidden"
              style={{ background: '#111a4a' }}
            >
              <div className="absolute inset-0 line-grid opacity-30 pointer-events-none" />
              <div className="relative">
                <span
                  className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-5 border"
                  style={{ color: 'rgba(255,255,255,0.60)', backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.12)' }}
                >
                  {featured.industry}
                </span>
                <h3 className="text-2xl md:text-[1.65rem] text-white leading-[1.22] tracking-[-0.025em] mb-5 group-hover:text-white/90 transition-colors">
                  {featured.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <div
                    className="flex items-center gap-1.5 text-[10px] font-semibold rounded-lg px-3 py-1.5 border"
                    style={{ color: 'rgba(255,255,255,0.50)', backgroundColor: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.10)' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#ec652b' }} />
                    {featured.regional_analysis[0]?.region ?? 'Global'} Coverage
                  </div>
                  <div
                    className="flex items-center gap-1.5 text-[10px] font-semibold rounded-lg px-3 py-1.5 border"
                    style={{ color: 'rgba(255,255,255,0.50)', backgroundColor: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.10)' }}
                  >
                    {featured.published_year}
                  </div>
                  <div
                    className="flex items-center gap-1.5 text-[10px] font-semibold rounded-lg px-3 py-1.5 border"
                    style={{ color: '#ec652b', backgroundColor: 'rgba(236,101,43,0.12)', borderColor: 'rgba(236,101,43,0.22)' }}
                  >
                    {featured.market_size.cagr}% CAGR
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 p-8">
              <p className="text-sm leading-[1.85] flex-1 mb-6 line-clamp-4" style={{ color: '#7c7f88' }}>
                {featured.market_overview.summary}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#7c7f88', letterSpacing: '0.08em' }}>
                  Full Report Available
                </span>
                <span
                  className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg border transition-all duration-200 group-hover:bg-[#ec652b] group-hover:text-white group-hover:border-[#ec652b]"
                  style={{ color: '#ec652b', backgroundColor: 'rgba(236,101,43,0.06)', borderColor: 'rgba(236,101,43,0.20)' }}
                >
                  View Report
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>

          {/* Secondary cards */}
          <div className="lg:flex-1 flex flex-col gap-6">
            {secondary.map((report, idx) => {
              const accent = accentPalette[idx + 1];
              return (
                <Link
                  key={report.report_id}
                  href={`/reports/${report.slug}`}
                  className="group flex flex-col flex-1 bg-white rounded-2xl overflow-hidden border border-[#e3e4e8] hover:border-[#111a4a]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="h-1 shrink-0" style={{ backgroundColor: accent.bar }} />
                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span
                        className="text-[10px] font-semibold px-2 py-1 rounded-md uppercase tracking-wide border shrink-0 max-w-[150px] truncate"
                        style={{ color: accent.badgeText, backgroundColor: accent.badgeBg, borderColor: accent.badgeBorder }}
                      >
                        {report.industry}
                      </span>
                      <span className="text-xs shrink-0" style={{ color: '#7c7f88' }}>{report.published_year}</span>
                    </div>
                    <h3 className="text-base font-semibold line-clamp-2 leading-snug mb-3 flex-1 group-hover:text-[#ec652b] transition-colors" style={{ color: '#011821' }}>
                      {report.title}
                    </h3>
                    <p className="text-sm line-clamp-2 leading-relaxed mb-4" style={{ color: '#7c7f88' }}>
                      {report.market_overview.summary}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: '#f0f1f3' }}>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accent.dot }} />
                        <span className="text-xs" style={{ color: '#7c7f88' }}>{report.regional_analysis[0]?.region ?? 'Global'}</span>
                      </div>
                      <span className="text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-150" style={{ color: '#ec652b' }}>
                        View Report
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </Container>
    </section>
  );
}

import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui';
import allReportsData from '@/data/all_reports.json';
import type { JsonReport } from '@/lib/jsonReports';

const accentPalette = [
  {
    bar: 'var(--primary)',
    badgeBg: 'hsl(var(--primary-hsl) / 0.06)',
    badgeText: 'var(--primary)',
    badgeBorder: 'hsl(var(--primary-hsl) / 0.12)',
    dot: 'var(--primary)',
  },
  {
    bar: 'var(--accent)',
    badgeBg: 'hsl(var(--accent-hsl) / 0.08)',
    badgeText: 'var(--accent)',
    badgeBorder: 'hsl(var(--accent-hsl) / 0.20)',
    dot: 'var(--accent)',
  },
  {
    bar: 'var(--primary)',
    badgeBg: 'hsl(var(--primary-hsl) / 0.06)',
    badgeText: 'var(--primary)',
    badgeBorder: 'hsl(var(--primary-hsl) / 0.12)',
    dot: 'var(--primary)',
  },
];

const reports = (allReportsData as JsonReport[]).slice(0, 3);

export default function FeaturedReportsSection() {
  const [featured, ...secondary] = reports;

  return (
    <section className="py-24" style={{ backgroundColor: 'var(--muted)' }}>
      <Container size="xl">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div className="space-y-3">
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border"
              style={{ color: 'var(--primary)', backgroundColor: 'hsl(var(--primary-hsl) / 0.05)', borderColor: 'hsl(var(--primary-hsl) / 0.12)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--accent)' }} />
              Featured Research
            </span>
            <h2 className="text-3xl md:text-[2.6rem] lg:text-5xl tracking-[-0.03em] leading-[1.08]" style={{ color: 'var(--foreground)' }}>
              Latest Market Intelligence
            </h2>
            <p className="text-base max-w-xl leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              High-impact reports updated with the latest data, trends, and forecasts.
            </p>
          </div>
          <Link
            href="/reports"
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors shrink-0 group"
            style={{ color: 'var(--accent)' }}
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
            className="group lg:flex-[1.35] flex flex-col bg-[var(--card)] rounded-2xl overflow-hidden border border-[var(--border)] hover:border-[var(--primary)]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Accent bar */}
            <div className="h-1.5 shrink-0" style={{ backgroundColor: 'var(--primary)' }} />

            {/* Dark visual header */}
            <div
              className="relative px-8 pt-8 pb-10 overflow-hidden"
              style={{ background: 'var(--primary)' }}
            >
              <div className="absolute inset-0 line-grid opacity-30 pointer-events-none" />
              <div className="relative">
                <span
                  className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-5 border"
                  style={{ color: 'var(--on-dark-muted)', backgroundColor: 'var(--on-dark-surface)', borderColor: 'var(--on-dark-border)' }}
                >
                  {featured.industry}
                </span>
                <h3 className="text-2xl md:text-[1.65rem] text-white leading-[1.22] tracking-[-0.025em] mb-5 group-hover:text-white/90 transition-colors">
                  {featured.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <div
                    className="flex items-center gap-1.5 text-[10px] font-semibold rounded-lg px-3 py-1.5 border"
                    style={{ color: 'var(--on-dark-subtle)', backgroundColor: 'var(--on-dark-surface)', borderColor: 'var(--on-dark-border)' }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--accent)' }} />
                    {featured.regional_analysis[0]?.region ?? 'Global'} Coverage
                  </div>
                  <div
                    className="flex items-center gap-1.5 text-[10px] font-semibold rounded-lg px-3 py-1.5 border"
                    style={{ color: 'var(--on-dark-subtle)', backgroundColor: 'var(--on-dark-surface)', borderColor: 'var(--on-dark-border)' }}
                  >
                    {featured.published_year}
                  </div>
                  <div
                    className="flex items-center gap-1.5 text-[10px] font-semibold rounded-lg px-3 py-1.5 border"
                    style={{ color: 'var(--accent)', backgroundColor: 'hsl(var(--accent-hsl) / 0.12)', borderColor: 'hsl(var(--accent-hsl) / 0.22)' }}
                  >
                    {featured.market_size.cagr}% CAGR
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 p-8">
              <p className="text-sm leading-[1.85] flex-1 mb-6 line-clamp-4" style={{ color: 'var(--muted-foreground)' }}>
                {featured.market_overview.summary}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--muted-foreground)', letterSpacing: '0.08em' }}>
                  Full Report Available
                </span>
                <span
                  className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg border transition-all duration-200 group-hover:bg-[var(--accent)] group-hover:text-white group-hover:border-[var(--accent)]"
                  style={{ color: 'var(--accent)', backgroundColor: 'hsl(var(--accent-hsl) / 0.06)', borderColor: 'hsl(var(--accent-hsl) / 0.20)' }}
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
                  className="group flex flex-col flex-1 bg-[var(--card)] rounded-2xl overflow-hidden border border-[var(--border)] hover:border-[var(--primary)]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
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
                      <span className="text-xs shrink-0" style={{ color: 'var(--muted-foreground)' }}>{report.published_year}</span>
                    </div>
                    <h3 className="text-base font-semibold line-clamp-2 leading-snug mb-3 flex-1 group-hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--foreground)' }}>
                      {report.title}
                    </h3>
                    <p className="text-sm line-clamp-2 leading-relaxed mb-4" style={{ color: 'var(--muted-foreground)' }}>
                      {report.market_overview.summary}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'var(--border-light)' }}>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accent.dot }} />
                        <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{report.regional_analysis[0]?.region ?? 'Global'}</span>
                      </div>
                      <span className="text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-150" style={{ color: 'var(--accent)' }}>
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

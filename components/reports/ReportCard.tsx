import Link from 'next/link';
import { ArrowUpRight, Globe, Calendar } from 'lucide-react';

interface ReportCardReport {
  id: number;
  slug: string;
  title: string;
  description: string;
  summary: string;
  category: string;
  date: string;
  price: string;
  region: string;
  year: string;
  reportType: string;
  pages: number;
}

interface ReportCardProps {
  report: ReportCardReport;
  index?: number;
}

export default function ReportCard({ report, index }: ReportCardProps) {
  const indexLabel = index !== undefined ? String(index).padStart(2, '0') : null;

  return (
    <Link href={`/reports/${report.slug}`} className="group block h-full">
      <article
        className="relative h-full flex flex-col theme-card rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg border"
        style={{
          boxShadow: '0 1px 3px hsl(var(--foreground-hsl) / 0.07), 0 1px 2px hsl(var(--foreground-hsl) / 0.05)',
        }}
      >
        {/* Category accent bar */}
        <div
          className="h-[3px] w-full flex-shrink-0 transition-all duration-300"
          style={{ background: 'var(--accent)' }}
        />

        <div className="flex flex-col flex-1 p-5">
          {/* Header: badge + index */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <span
              className="inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase leading-none flex-shrink-0"
              style={{ background: 'hsl(var(--accent-hsl) / 0.12)', color: 'var(--accent)' }}
            >
              {report.category}
            </span>
            {indexLabel && (
              <span
                className="font-display font-bold tabular-nums leading-none flex-shrink-0 select-none"
                style={{ color: 'hsl(var(--muted-foreground-hsl) / 0.45)', fontSize: '1.625rem', letterSpacing: '-0.03em' }}
              >
                {indexLabel}
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            className="font-display font-bold leading-snug line-clamp-2 mb-3 transition-colors duration-200"
            style={{ color: 'var(--foreground)', fontSize: '0.9375rem', letterSpacing: '-0.01em' }}
          >
            <span
              style={{ transition: 'color 0.2s' }}
              className="group-hover:text-[var(--accent)]"
            >
              {report.title}
            </span>
          </h3>

          {/* Summary */}
          <p
            className="text-sm leading-relaxed line-clamp-3 flex-1"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {report.summary || report.description}
          </p>

          {/* Divider */}
          <div className="mt-5 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between gap-2">
              {/* Metadata */}
              <div
                className="flex items-center gap-3 flex-wrap"
                style={{ color: 'var(--muted-foreground)', fontSize: '11px' }}
              >
                {report.region && (
                  <span className="flex items-center gap-1">
                    <Globe className="w-3 h-3 flex-shrink-0" />
                    {report.region}
                  </span>
                )}
                {report.year && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 flex-shrink-0" />
                    {report.year}
                  </span>
                )}
              </div>

              {/* CTA */}
              <span
                className="flex items-center gap-1 text-xs font-semibold flex-shrink-0 transition-all duration-200"
                style={{ color: 'var(--accent)' }}
              >
                View
                <ArrowUpRight
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

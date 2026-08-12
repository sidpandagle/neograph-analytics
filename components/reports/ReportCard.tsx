import Link from 'next/link';

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

/** The report card — the primary content unit of the listing pages. */
export default function ReportCard({ report }: ReportCardProps) {
  return (
    <article className="group flex h-full flex-col gap-4 rounded-card border border-[var(--cmi-line)] bg-white p-5 transition-colors duration-200 hover:border-[var(--cmi-primary)] md:p-6.5">
      <div className="flex items-center justify-between gap-3">
        <span className="truncate text-[11.5px] font-bold uppercase tracking-[0.08em] text-[var(--cmi-body)]">
          {report.category}
        </span>
        {report.year && (
          <span className="shrink-0 text-[11.5px] font-bold text-[var(--cmi-meta)]">
            {report.year}
          </span>
        )}
      </div>

      <h3 className="font-display text-[18px] font-semibold leading-[1.25] md:text-[20px]">
        <Link
          href={`/reports/${report.slug}`}
          className="line-clamp-3 text-[var(--cmi-ink)] transition-colors hover:text-[var(--cmi-primary)]"
        >
          {report.title}
        </Link>
      </h3>

      <p className="line-clamp-3 flex-1 text-[13.5px] leading-[1.6] text-[var(--cmi-body)]">
        {report.summary || report.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {report.region && <span className="chip">{report.region}</span>}
        {report.reportType && <span className="chip">{report.reportType}</span>}
        {report.pages ? <span className="chip">{report.pages} pages</span> : null}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[var(--cmi-line)] pt-4">
        {report.price && (
          <span className="num text-[15px] text-[var(--cmi-primary)]">{report.price}</span>
        )}
        <Link
          href={`/reports/${report.slug}`}
          className="ml-auto text-[13.5px] font-semibold text-[var(--cmi-primary)]"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}

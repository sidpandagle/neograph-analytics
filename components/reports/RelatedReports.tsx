import Link from 'next/link';
import type { RelatedReport } from '@/lib/api/relatedReports';

/**
 * The foot of a report page. Before this existed, a report page carried no link
 * to any other report — 152 pages, each a dead end for a reader and for a
 * crawler following internal links.
 *
 * Each row carries the base-year size and the growth rate, because that is what
 * makes the next report worth opening: the reader has just read one set of
 * figures and can see immediately how the next market compares.
 */
export function RelatedReports({ reports }: { reports: RelatedReport[] }) {
  if (!reports.length) return null;

  return (
    <section className="mt-14 border-t border-[var(--border)] pt-10" aria-labelledby="related-reports">
      <h2
        id="related-reports"
        className="text-[22px] font-semibold tracking-[-0.01em] text-[var(--foreground)]"
      >
        Related research
      </h2>
      <p className="mt-2 text-[14px] leading-[1.7] text-[var(--muted-foreground)]">
        Reports in the same field, each with its base-year figure and the growth
        rate it is published at.
      </p>

      <ul className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
        {reports.map((r) => (
          <li key={r.slug}>
            <Link
              href={`/reports/${r.slug}`}
              className="group flex h-full flex-col gap-2 rounded-card border border-[var(--border)] bg-[var(--card)] p-4 transition-colors hover:border-[var(--cmi-primary)]"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--muted-foreground)]">
                {r.industry}
              </span>
              <span className="text-[15px] font-semibold leading-[1.35] text-[var(--foreground)] group-hover:text-[var(--cmi-primary)]">
                {r.title}
              </span>
              {(r.size !== '—' || r.cagr) && (
                <span className="mt-auto text-[12.5px] tabular-nums text-[var(--muted-foreground)]">
                  {r.size !== '—' ? r.size : ''}
                  {r.size !== '—' && r.cagr ? ' · ' : ''}
                  {r.cagr}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

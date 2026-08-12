import Link from 'next/link';

/**
 * Closing panel. White, so the ink footer directly beneath it lands as
 * the page's only dark note.
 */
export default function CTASection() {
  return (
    <section className="flex flex-wrap items-center justify-between gap-8 rounded-panel bg-white p-7 md:p-10">
      <div className="flex max-w-[620px] flex-col gap-2.5">
        <h2 className="text-[26px] md:text-[32px]">Request a free sample today</h2>
        <p className="text-[15px] leading-[1.6] text-[var(--cmi-body)]">
          See the methodology, segmentation and data tables before you buy. Every report
          ships with analyst support and Excel datasets alongside the full analysis.
        </p>
      </div>

      <div className="flex flex-col items-start gap-2.5 lg:items-end">
        <span className="text-[12.5px] text-[var(--cmi-meta)]">
          No obligation · Response within one business day
        </span>
        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/request-sample"
            className="rounded-pill bg-[var(--cmi-primary)] px-[26px] py-[15px] text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-[var(--cmi-primary-pressed)] hover:text-white"
          >
            Download sample PDF
          </Link>
          <Link
            href="/contact"
            className="rounded-pill border border-[var(--cmi-line)] px-[26px] py-[15px] text-[15px] font-semibold text-[var(--cmi-ink)] transition-colors duration-150 hover:border-[var(--cmi-primary)] hover:text-[var(--cmi-ink)]"
          >
            Talk to an analyst
          </Link>
        </div>
      </div>
    </section>
  );
}

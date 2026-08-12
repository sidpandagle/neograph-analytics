import Link from 'next/link';
import { SearchBar } from '@/components/ui';

const heroStats = [
  { val: '2,500+', label: 'Research reports' },
  { val: '1,000+', label: 'Satisfied clients' },
  { val: '50+', label: 'Countries covered' },
];

/* Charts sit on white inside a sky panel — never directly on the desk. */
const snapshotBars = [
  { year: '2025', value: '$286B', height: 55, fill: 'var(--cmi-sky)' },
  { year: '2026', value: '$331B', height: 66, fill: 'var(--cmi-mid)' },
  { year: '2032', value: '$842B', height: 100, fill: 'var(--cmi-primary)' },
];

export default function HeroSection() {
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
          2,500+ research reports and strategic advisory across every healthcare
          vertical — from oncology to medical devices to digital health, delivered
          as PDF, PPT, Excel or interactive dashboards.
        </p>

        <div className="animate-reveal-up-d3">
          <SearchBar
            variant="hero"
            placeholder="Search 2,500+ reports — e.g. oncology diagnostics"
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
        {/* Report snapshot */}
        <div className="flex flex-col gap-3.5 rounded-tile bg-white p-4 md:p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11.5px] font-semibold uppercase tracking-[0.06em] text-[var(--cmi-meta)]">
              Report snapshot
            </span>
            <span className="chip-primary">CAGR 16.8%</span>
          </div>

          <h2 className="font-display text-[17px] font-semibold leading-[1.25] text-[var(--cmi-ink)] md:text-[19px]">
            Global Telemedicine Market 2025–2032
          </h2>

          <div className="grid h-32 grid-cols-3 items-end gap-3">
            {snapshotBars.map((bar, i) => (
              <div key={bar.year} className="flex h-full flex-col justify-end gap-2">
                <span
                  className={`num text-[13px] ${
                    i === snapshotBars.length - 1 ? 'text-[var(--cmi-primary)]' : 'text-[var(--cmi-ink)]'
                  }`}
                >
                  {bar.value}
                </span>
                <div
                  className="animate-grow-bar rounded-t-lg"
                  style={{
                    height: `${bar.height}%`,
                    background: bar.fill,
                    animationDelay: `${0.35 + i * 0.12}s`,
                  }}
                />
                <span className="text-[11px] font-semibold text-[var(--cmi-meta)]">{bar.year}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Two supporting tiles */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-tile bg-white p-4">
            <div className="num text-[17px] text-[var(--cmi-ink)]">North America</div>
            <p className="mt-1 text-xs leading-[1.45] text-[var(--cmi-body)]">
              Largest market — 38.4% share, 2025
            </p>
          </div>
          <div className="rounded-tile bg-white p-4">
            <div className="num text-[17px] text-[var(--cmi-ink)]">320+ pages</div>
            <p className="mt-1 text-xs leading-[1.45] text-[var(--cmi-body)]">
              Segments, regions, competitive landscape
            </p>
          </div>
        </div>

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

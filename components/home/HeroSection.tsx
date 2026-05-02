import Link from 'next/link';
import { ArrowRight, BarChart2, Globe, Users, BookOpen } from 'lucide-react';
import { SearchBar } from '@/components/ui';

const heroStats = [
  { val: '2,500+', label: 'Reports', icon: BookOpen },
  { val: '50+',    label: 'Countries', icon: Globe },
  { val: '1,000+', label: 'Clients', icon: Users },
];

const trustBadges = ['HIPAA Compliant', 'ISO Certified', 'FDA Compliant Data'];

const dashboardCards = [
  {
    tag: 'Pharmaceuticals',
    title: 'Pharmaceutical Industry Outlook 2025–2032',
    year: '2025',
    cagr: '7.9%',
    size: '$1.9T',
    bars: [40, 52, 47, 61, 68, 64, 76, 84, 79, 92],
    accent: 'plum' as const,
  },
  {
    tag: 'Medical Devices',
    title: 'Medical Devices Innovation Report 2025',
    year: '2025',
    cagr: '6.1%',
    size: '$603B',
    bars: [35, 42, 50, 48, 58, 62, 55, 70, 75, 80],
    accent: 'orange' as const,
  },
  {
    tag: 'Healthcare IT',
    title: 'Telemedicine Market Analysis 2025–2032',
    year: '2025',
    cagr: '16.8%',
    size: '$286B',
    bars: [30, 38, 45, 52, 60, 68, 77, 85, 90, 96],
    accent: 'plum' as const,
  },
];

const cardShadow = 'rgba(17, 26, 74, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.08) 0px 1px 2px 0px, rgba(255, 255, 255, 0.7) 0px 0px 0px 1px inset';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[var(--background)]">

      {/* Blueprint dot-grid background */}
      <div className="absolute inset-0 dot-grid pointer-events-none" style={{ opacity: 0.55 }} />


<div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-12 xl:gap-16 items-center">

          {/* Left: Content */}
          <div className="lg:col-span-6 flex flex-col gap-6">

            {/* Eyebrow pill */}
            <div
              className="inline-flex items-center gap-2.5 self-start px-4 py-2 rounded-full border theme-muted-card animate-reveal-up-d1"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 bg-[var(--accent)]" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
              </span>
              <span className="text-xs font-semibold tracking-wide text-[var(--foreground)]">
                Trusted by 500+ Healthcare Organizations Worldwide
              </span>
            </div>

            {/* Headline */}
            <div className="animate-reveal-up-d2">
              <h1 className="text-[2.8rem] sm:text-[3.4rem] lg:text-[3.75rem] xl:text-[4.25rem] leading-[1.04] tracking-[-0.03em] font-semibold text-[var(--foreground)]">
                Behind Healthcare&apos;s
              </h1>
              <h1 className="text-[2.8rem] sm:text-[3.4rem] lg:text-[3.75rem] xl:text-[4.25rem] leading-[1.04] tracking-[-0.03em] font-semibold text-[var(--accent)]">
                Biggest Decisions.
              </h1>
            </div>

            {/* Subheadline */}
            <p className="text-lg text-[var(--muted-foreground)] max-w-lg leading-[1.70] font-light animate-reveal-up-d2">
              Access 2,500+ research reports and strategic insights across every healthcare
              vertical — from oncology to medical devices to digital health.
            </p>

            {/* Stats strip */}
            <div
              className="flex items-stretch border border-[var(--border)] rounded-xl overflow-hidden animate-reveal-up-d3"
              style={{ boxShadow: cardShadow }}
            >
              {heroStats.map(({ val, label, icon: Icon }, i) => (
                <div
                  key={val}
                  className={`flex-1 flex items-center gap-2.5 px-4 py-3.5 bg-[var(--card)]${i < heroStats.length - 1 ? ' border-r border-[var(--border)]' : ''}`}
                >
                  <div className="w-8 h-8 rounded-lg bg-[var(--muted)] flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-[var(--primary)]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-sm font-bold block leading-tight text-[var(--foreground)]">{val}</span>
                    <span className="text-[10px] block leading-tight text-[var(--muted-foreground)]">{label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Search bar */}
            <div className="max-w-lg w-full animate-reveal-up-d3">
              <SearchBar
                variant="hero"
                placeholder="Search 2,500+ reports, markets, regions..."
                className="w-full"
              />
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 animate-reveal-up-d4">
              <Link href="/reports">
                <button
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-lg text-[var(--accent-foreground)] bg-[var(--accent)] hover:opacity-90 transition-all duration-200 min-w-[185px] hover:-translate-y-px"
                  style={{ boxShadow: 'rgba(0,0,0,0.05) 0px 4px 8px 0px, rgba(0,0,0,0.1) 0px 2px 4px 0px' }}
                >
                  Browse All Reports
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/request-sample">
                <button className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-lg bg-transparent border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--muted)] transition-all duration-200 min-w-[185px] hover:-translate-y-px">
                  Request Free Sample
                </button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 animate-reveal-up-d4">
              {trustBadges.map((b) => (
                <div key={b} className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
                  <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'hsl(var(--chart-4))' }} aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {b}
                </div>
              ))}
            </div>

          </div>

          {/* Right: Intelligence Dashboard */}
          <div className="hidden lg:flex lg:col-span-6 flex-col gap-3.5">

            {/* Panel header */}
            <div className="flex items-center gap-2 mb-0.5 px-1">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border theme-muted-card">
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[var(--accent)]" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--accent)]" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--foreground)]">
                  Current Intelligence
                </span>
              </div>
              <span className="text-[10px] font-mono text-[var(--muted-foreground)]">Updated Jan 2025</span>
            </div>

            {/* Stacked cards */}
            {dashboardCards.map((card, idx) => (
              <div
                key={idx}
                className="relative bg-[var(--card)] rounded-xl p-5 border border-[var(--border)] transition-all duration-300"
                style={{
                  marginLeft: `${idx * 22}px`,
                  boxShadow: cardShadow,
                  animationName: idx === 0 ? 'float-gentle' : idx === 1 ? 'float-gentle-alt' : 'float-gentle-c',
                  animationDuration: `${8 + idx * 2}s`,
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                  animationDelay: `${idx * 1.2}s`,
                  animationFillMode: 'both',
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border"
                    style={{ backgroundColor: 'hsl(var(--accent-hsl) / 0.1)', color: 'var(--accent)', borderColor: 'hsl(var(--accent-hsl) / 0.22)' }}
                  >
                    {card.tag}
                  </span>
                  <span className="text-[11px] text-[var(--muted-foreground)]">{card.year}</span>
                </div>

                <h3 className="text-xs font-semibold leading-snug mb-3 pr-4 text-[var(--foreground)]">
                  {card.title}
                </h3>

                <div className="flex items-center gap-8 mb-3">
                  <div>
                    <p className="text-xl font-bold leading-tight text-[var(--foreground)]">{card.size}</p>
                    <p className="text-[10px] mt-0.5 text-[var(--muted-foreground)]">Market Size 2032</p>
                  </div>
                  <div>
                    <p
                      className="text-xl font-bold leading-tight"
                      style={{ color: card.accent === 'orange' ? 'var(--accent)' : 'var(--primary)' }}
                    >
                      {card.cagr}
                    </p>
                    <p className="text-[10px] mt-0.5 text-[var(--muted-foreground)]">CAGR</p>
                  </div>
                </div>

                {/* Sparkline */}
                <div className="flex items-end gap-[3px] h-8" aria-hidden="true">
                  {card.bars.map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-[2px]"
                      style={{
                        height: `${h}%`,
                        backgroundColor: i >= 7
                          ? card.accent === 'orange' ? 'hsl(var(--accent-hsl) / 0.68)' : 'hsl(var(--primary-hsl) / 0.68)'
                          : 'var(--border)',
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Footer badge */}
            <div
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border theme-muted-card"
              style={{ marginLeft: '44px' }}
            >
              <BarChart2 className="w-4 h-4 text-[var(--primary)] shrink-0" />
              <span className="text-xs text-[var(--muted-foreground)]">
                Updated monthly · Primary &amp; secondary research methodology
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

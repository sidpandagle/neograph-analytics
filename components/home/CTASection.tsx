import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const checkmarks = ['HIPAA Compliant', 'ISO Certified', 'FDA Compliant Data'];

const metrics = [
  { val: '2,500+', label: 'Reports Available',   bar: 94 },
  { val: '48h',    label: 'Avg. Delivery Time',  bar: 88 },
  { val: '98%',    label: 'Client Satisfaction', bar: 98 },
];

const features = [
  'Primary & secondary research methodology',
  'Expert analyst interviews included',
  'Custom segment analysis available',
  'Excel datasets with every report',
];

export default function CTASection() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32 theme-hero"
    >
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 theme-hero-grid opacity-80 pointer-events-none" />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='28' height='28' viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='white' opacity='0.06'/%3E%3C/svg%3E\")",
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-10 xl:gap-16 items-center">

          {/* Left: Text + CTAs */}
          <div className="lg:col-span-7 flex flex-col gap-7">

            {/* Eyebrow */}
            <span
              className="inline-flex items-center gap-2 self-start text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border"
              style={{ color: 'hsl(var(--primary-foreground-hsl) / 0.7)', borderColor: 'hsl(var(--primary-foreground-hsl) / 0.16)', backgroundColor: 'hsl(var(--primary-foreground-hsl) / 0.08)' }}
            >
              Get Started Today
            </span>

            {/* Headline */}
            <div>
              <h2
                className="text-3xl md:text-[2.6rem] lg:text-5xl theme-hero-text leading-[1.08] tracking-[-0.03em]"
              >
                Ready to Make Data-Driven
              </h2>
              <h2
                className="text-3xl md:text-[2.6rem] lg:text-5xl leading-[1.08] tracking-[-0.03em]"
                style={{ color: 'var(--accent)' }}
              >
                Healthcare Decisions?
              </h2>
            </div>

            {/* Subtext */}
            <p className="text-lg max-w-xl leading-[1.80] theme-hero-muted">
              Join 1,000+ healthcare organizations that trust NeoGraph Analytics for
              comprehensive market intelligence, strategic analysis, and actionable insights.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
              {features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm theme-hero-muted">
                  <CheckCircle2 className="w-4 h-4 shrink-0" strokeWidth={1.75} style={{ color: 'hsl(var(--chart-4))' }} />
                  {f}
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/reports">
                <button
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold rounded-lg transition-all duration-200 min-w-[210px] hover:-translate-y-0.5 bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90"
                  style={{ boxShadow: 'rgba(0,0,0,0.25) 0px 4px 12px 0px' }}
                >
                  Browse All Reports
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/contact">
                <button
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold rounded-lg border-2 transition-all duration-200 min-w-[210px] hover:-translate-y-0.5"
                  style={{ color: 'hsl(var(--primary-foreground-hsl) / 0.84)', borderColor: 'hsl(var(--primary-foreground-hsl) / 0.22)', background: 'hsl(var(--primary-foreground-hsl) / 0.06)' }}
                >
                  Contact Sales
                </button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              {checkmarks.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm theme-hero-faint">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ color: 'hsl(var(--chart-4))' }} aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>

          </div>

          {/* Right: Metrics panel */}
          <div className="lg:col-span-5">
            <div
              className="relative rounded-2xl p-8 overflow-hidden"
              style={{
                backgroundColor: 'hsl(var(--primary-foreground-hsl) / 0.08)',
                border: '1px solid hsl(var(--primary-foreground-hsl) / 0.14)',
                backdropFilter: 'blur(20px)',
                boxShadow: 'hsl(var(--foreground-hsl) / 0.22) 0px 20px 40px 0px',
              }}
            >
              {/* Top accent */}
              <div
                className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl"
                style={{ backgroundColor: 'var(--accent)' }}
              />

              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-semibold text-base theme-hero-text">Why NeoGraph Analytics?</h3>
                <div
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border"
                  style={{ backgroundColor: 'hsl(var(--accent-hsl) / 0.14)', borderColor: 'hsl(var(--accent-hsl) / 0.28)' }}
                >
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ backgroundColor: 'var(--accent)' }} />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: 'var(--accent)' }} />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: 'var(--accent)' }}>Live</span>
                </div>
              </div>

              {/* Metric rows */}
              <div className="space-y-6">
                {metrics.map(({ val, label, bar }) => (
                  <div key={val}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium theme-hero-muted">{label}</span>
                      <span className="text-sm font-bold theme-hero-text">{val}</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'hsl(var(--primary-foreground-hsl) / 0.1)' }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${bar}%`, backgroundColor: 'var(--accent)' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-[1px] my-7" style={{ backgroundColor: 'hsl(var(--primary-foreground-hsl) / 0.1)' }} />

              {/* Compliance chips */}
              <div className="flex flex-wrap gap-2">
                {['HIPAA', 'ISO Certified', 'SOC 2', 'FDA Compliant'].map((c) => (
                  <span
                    key={c}
                    className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border theme-hero-text"
                    style={{ backgroundColor: 'hsl(var(--secondary-hsl) / 0.5)', borderColor: 'hsl(var(--primary-foreground-hsl) / 0.16)' }}
                  >
                    {c}
                  </span>
                ))}
              </div>

              <div className="mt-7 pt-6 border-t" style={{ borderColor: 'hsl(var(--primary-foreground-hsl) / 0.1)' }}>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold transition-opacity group theme-hero-muted hover:opacity-100"
                >
                  Learn about our methodology
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

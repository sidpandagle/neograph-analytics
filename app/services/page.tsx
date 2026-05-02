import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Healthcare Research & Consulting Services | NeoGraph Analytics",
  description: "Explore healthcare research services including market analysis, custom reports, consulting, forecasting, and strategic insights.",
  keywords: ["healthcare research services", "healthcare consulting", "custom healthcare reports", "market analysis services"],
  alternates: {
    canonical: '/services',
  },
};

const services = [
  {
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    title: 'Competitive Intelligence Services',
    desc: 'Competitor profiling, market and pipeline analysis, pricing and positioning assessment, and business model benchmarking.',
    items: [
      'Competitor profiling and company benchmarking',
      'Market and pipeline analysis',
      'Pricing and positioning assessment',
      'Product, service, and business model benchmarking',
      'Regulatory filings and clinical trial data analysis',
      'Patent information and IP landscape review',
      'Strategic planning and investment decision support',
    ],
    accent: 'ocean',
  },
  {
    icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z',
    title: 'Forecasting Services',
    desc: 'Precise forecasts using historical data analysis, statistical modeling, scenario planning, and expert judgment.',
    items: [
      'Market size and growth forecasting',
      'Demand and utilization forecasting',
      'Revenue and pricing projections',
      'Capacity planning and supply chain forecasting',
      'Scenario planning (best, base, worst case)',
      'Product lifecycle and launch planning forecasts',
      'Pipeline development and investment feasibility',
    ],
    accent: 'amber',
  },
  {
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    title: 'Desktop Research Partnership',
    desc: 'Ongoing or project-based partnerships delivering market landscapes, competitive analysis, and trend tracking.',
    items: [
      'Market landscape development',
      'Competitive analysis and benchmarking',
      'Trend tracking and monitoring',
      'Technology assessments',
      'Policy and regulatory reviews',
      'Market entry studies and therapeutic area evaluation',
      'Pricing and reimbursement assessment',
    ],
    accent: 'ocean',
  },
  {
    icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z',
    title: 'Customized / Adhoc Services',
    desc: 'Tailored solutions addressing immediate operational needs and unique business challenges with flexible delivery.',
    items: [
      'Custom research and analysis projects',
      'Targeted market intelligence reports',
      'Adhoc competitive landscape assessments',
      'Specific operational and strategic advisory',
      'Tailored data collection and synthesis',
      'Quick-turnaround strategic briefings',
      'Bespoke forecasting and modeling support',
    ],
    accent: 'amber',
  },
];

const processSteps = [
  { num: '01', title: 'Data Collection', desc: 'Primary and secondary research from multiple verified sources including proprietary databases.' },
  { num: '02', title: 'Analysis', desc: 'Expert analysis using advanced statistical and qualitative methods tailored to your market.' },
  { num: '03', title: 'Validation', desc: 'Multi-layer validation by domain experts and rigorous quality assurance processes.' },
  { num: '04', title: 'Delivery', desc: 'Comprehensive reporting with actionable recommendations and ongoing support.' },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden theme-hero py-20 md:py-28">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'28\' height=\'28\' viewBox=\'0 0 28 28\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'1\' cy=\'1\' r=\'1\' fill=\'white\'/%3E%3C/svg%3E")',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute inset-0 theme-hero-grid opacity-75 pointer-events-none" />

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full theme-hero-panel">
              Our Services
            </span>
            <h1 className="text-[2.75rem] md:text-5xl lg:text-[3.5rem] theme-hero-text leading-[1.1] tracking-[-0.02em]">
              Comprehensive Healthcare<br className="hidden md:block" />{' '}
              <span className="text-[var(--accent)]">Market Intelligence</span>
            </h1>
            <p className="text-lg theme-hero-muted max-w-2xl mx-auto leading-[1.8]">
              From syndicated reports to bespoke research solutions, we provide the insights you need
              to make confident strategic decisions in healthcare markets.
            </p>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-16 md:py-20 bg-[var(--background)]">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {services.map((svc) => (
              <div
                key={svc.title}
                className="flex flex-col theme-card border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Accent stripe */}
                <div className={`h-[3px] shrink-0 ${svc.accent === 'amber' ? 'bg-bright-500' : 'bg-ocean-600'}`} />

                <div className="p-8 flex flex-col gap-5 flex-1">
                  {/* Icon + Title */}
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${svc.accent === 'amber' ? 'bg-amber-50 text-amber-600' : 'bg-ocean-50 text-ocean-700'}`}>
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={svc.icon} />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900 leading-snug">{svc.title}</h2>
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">{svc.desc}</p>
                    </div>
                  </div>

                  {/* Feature list */}
                  <ul className="space-y-2.5 flex-1">
                    {svc.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <svg className="w-4 h-4 text-ocean-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="pt-2">
                    <Link href="/contact">
                      <button className="inline-flex items-center gap-2 text-sm font-semibold text-ocean-600 hover:text-ocean-700 transition-colors group">
                        Get Started
                        <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Research Process */}
      <section className="py-16 md:py-20 bg-[var(--muted)]">
        <Container size="xl">
          <div className="text-center space-y-4 mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ocean-600 px-3 py-1.5 rounded-full bg-ocean-50 border border-ocean-100">
              <span className="w-1.5 h-1.5 rounded-full bg-ocean-500 shrink-0" />
              Our Methodology
            </span>
            <h2 className="text-3xl md:text-4xl text-slate-900">
              A Rigorous Research Process
            </h2>
            <p className="text-base text-slate-500 max-w-2xl mx-auto">
              Every report and engagement follows a four-stage methodology ensuring accuracy and actionable insights.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <div key={step.num} className="relative">
                {/* Connector line */}
                {idx < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] right-[-50%] h-px bg-slate-200" />
                )}
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-ocean-600 flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-ocean-600/25 shrink-0 relative z-10">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 mb-1.5">{step.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA — dark navy */}
      <section className="relative overflow-hidden theme-hero py-20 md:py-24">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'28\' height=\'28\' viewBox=\'0 0 28 28\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'1\' cy=\'1\' r=\'1\' fill=\'white\'/%3E%3C/svg%3E")',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute inset-0 theme-hero-grid opacity-75 pointer-events-none" />

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-[2.75rem] theme-hero-text leading-[1.15] tracking-[-0.02em]">
              Ready to Get <span className="text-[var(--accent)]">Started?</span>
            </h2>
            <p className="text-lg theme-hero-muted leading-[1.8]">
              Whether you need a syndicated report or a comprehensive custom research project, we are here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold rounded-xl text-[var(--primary)] bg-[var(--primary-foreground)] hover:opacity-95 shadow-xl hover:-translate-y-0.5 transition-all duration-200 min-w-[180px]">
                  Contact Our Team
                </button>
              </Link>
              <Link href="/request-demo">
                <button className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold rounded-xl hover:-translate-y-0.5 transition-all duration-200 min-w-[180px]" style={{ color: 'hsl(var(--primary-foreground-hsl) / 0.84)', background: 'hsl(var(--primary-foreground-hsl) / 0.07)', border: '1px solid hsl(var(--primary-foreground-hsl) / 0.16)' }}>
                  Schedule a Demo
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

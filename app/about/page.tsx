import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "About NeoGraph Analytics | Healthcare Consulting Experts",
  description: "NeoGraph Analytics is a specialized healthcare consulting firm offering comprehensive advisory services to healthcare providers, life sciences companies, payers, and health technology organizations.",
  keywords: ["about synaptic research", "healthcare consulting firm", "healthcare advisory services", "healthcare transformation", "healthcare analytics"],
  alternates: {
    canonical: '/about',
  },
};

const whyUs = [
  {
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Integrated Approach',
    desc: 'We combine clinical expertise, regulatory intelligence, operational excellence, and advanced analytics to deliver comprehensive healthcare solutions.',
    accent: 'ocean',
  },
  {
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    title: 'Multidisciplinary Experts',
    desc: 'Our team spans clinical practice, healthcare management, health economics, data science, and policy advisory across global markets.',
    accent: 'ocean',
  },
  {
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Data-Driven Insights',
    desc: 'We apply real-world data, benchmarking insights, and international best practices to achieve better financial outcomes and improved patient care.',
    accent: 'amber',
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'Execution Focused',
    desc: 'Our consulting method establishes a direct link between strategic planning and execution, ensuring recommendations translate into real results.',
    accent: 'ocean',
  },
  {
    icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4',
    title: 'Tailored Solutions',
    desc: 'We collaborate with hospitals, clinics, pharmaceutical companies, insurers, and health tech firms to create solutions that meet specific objectives.',
    accent: 'amber',
  },
  {
    icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
    title: 'Sustainable Value',
    desc: 'We focus on measurable results, reducing risk, and creating lasting value across clinical, business, and customer service operations.',
    accent: 'ocean',
  },
];

const impactStats = [
  { val: '500+', label: 'Projects Delivered' },
  { val: '1,000+', label: 'Healthcare Clients' },
  { val: '50+', label: 'Specialists on Team' },
  { val: '10+', label: 'Years Experience' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 py-20 md:py-28">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'28\' height=\'28\' viewBox=\'0 0 28 28\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'1\' cy=\'1\' r=\'1\' fill=\'white\'/%3E%3C/svg%3E")',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-ocean-600/[0.16] rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ocean-300/80 px-4 py-1.5 rounded-full border border-ocean-500/20 bg-ocean-600/[0.12]">
              About Us
            </span>
            <h1 className="text-[2.75rem] md:text-5xl lg:text-[3.5rem] text-white leading-[1.1] tracking-[-0.02em]">
              Sustainable Healthcare Transformation<br className="hidden md:block" />{' '}
              Through an <span className="text-bright-400">Integrated Approach</span>
            </h1>
            <p className="text-lg text-white/55 max-w-2xl mx-auto leading-[1.8]">
              A specialized healthcare consulting firm offering comprehensive advisory services to providers,
              life sciences companies, payers, and health technology organizations worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Who We Are */}
      <section className="py-16 md:py-20 bg-white">
        <Container size="lg">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl text-slate-900">Our Mission</h2>
              <p className="text-base text-slate-600 leading-[1.85]">
                Our mission is to enable healthcare stakeholders to utilize data for their decision-making process, leading to improved system resilience and providing high-quality healthcare services to patients at a reasonable cost throughout many locations. We use innovative methods and maintain ethical standards to assist healthcare organizations facing challenges from new reimbursement methods, digital technology changes, and increased patient demands.
              </p>
            </div>

            <div className="h-px bg-slate-100" />

            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl text-slate-900">Who We Are</h2>
              <p className="text-base text-slate-600 leading-[1.85]">
                Our firm was founded on the belief that sustainable healthcare transformation requires an integrated approach that combines clinical expertise, regulatory intelligence, operational excellence, and advanced analytics. We assist healthcare providers throughout their operational process — helping them understand regulatory requirements, manage expenses, enhance patient care, and develop strategies for future growth.
              </p>
              <p className="text-base text-slate-600 leading-[1.85]">
                Our team consists of experts with multiple professional competencies in clinical practice, healthcare management, health economics, data science, and policy advisory. Our consulting method establishes a direct link between strategic planning and execution, delivering operational recommendations that staff members can implement during transformation projects.
              </p>
            </div>

            {/* Pull quote */}
            <blockquote className="border-l-4 border-ocean-600 pl-6 py-2">
              <p className="text-xl text-slate-700 font-medium leading-[1.6] italic">
                &ldquo;Our portfolio covers strategic planning, market assessment, operational efficiency, digital health transformation, regulatory compliance, and performance enhancement programs.&rdquo;
              </p>
            </blockquote>
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-[var(--muted)]">
        <Container size="xl">
          <div className="text-center space-y-4 mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ocean-600 px-3 py-1.5 rounded-full bg-ocean-50 border border-ocean-100">
              <span className="w-1.5 h-1.5 rounded-full bg-ocean-500 shrink-0" />
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl text-slate-900">
              What Sets Us Apart
            </h2>
            <p className="text-base text-slate-500 max-w-2xl mx-auto">
              Six pillars that define our approach to healthcare research and consulting excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyUs.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-slate-200 hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className={`h-[3px] ${item.accent === 'amber' ? 'bg-bright-500' : 'bg-ocean-600'}`} />
                <div className="p-6">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${item.accent === 'amber' ? 'bg-amber-50 text-amber-600' : 'bg-ocean-50 text-ocean-700'}`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Impact Stats — dark navy */}
      <section className="bg-navy-950 border-y border-navy-900/80">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4  divide-white/[0.06]">
            {impactStats.map((stat) => (
              <div key={stat.val} className="px-6 md:px-10 py-12 text-center">
                <div className="text-4xl md:text-5xl font-bold text-white tracking-tight tabular-nums">
                  {stat.val}
                </div>
                <div className="text-sm font-semibold text-slate-300 mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supporting text */}
      <section className="py-16 md:py-20 bg-white">
        <Container size="lg">
          <div className="max-w-3xl mx-auto space-y-5 text-base text-slate-600 leading-[1.85]">
            <p>
              We assist clients in achieving operational improvement through the application of real-world data, benchmarking insights, and international best practices — resulting in better financial outcomes and improved patient care systems.
            </p>
            <p>
              Our organization assists healthcare providers throughout their operational process by helping them understand regulatory requirements, manage expenses, enhance patient care, and develop strategies for future growth in a market that demands better results.
            </p>
          </div>
        </Container>
      </section>

      {/* CTA — dark navy */}
      <section className="relative overflow-hidden bg-navy-950 py-20 md:py-24">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'28\' height=\'28\' viewBox=\'0 0 28 28\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'1\' cy=\'1\' r=\'1\' fill=\'white\'/%3E%3C/svg%3E")',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute top-0 left-1/3 w-[500px] h-[400px] bg-ocean-500/[0.18] rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-[2.75rem] text-white leading-[1.15] tracking-[-0.02em]">
              Ready to Work With <span className="text-bright-400">NeoGraph Analytics?</span>
            </h2>
            <p className="text-lg text-white/55 leading-[1.8]">
              Join leading healthcare organizations that trust our research to drive their strategic initiatives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold rounded-xl text-navy-950 bg-white hover:bg-white/95 shadow-xl hover:-translate-y-0.5 transition-all duration-200 min-w-[170px]">
                  Contact Us
                </button>
              </Link>
              <Link href="/reports">
                <button className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold rounded-xl text-white/80 bg-white/[0.07] border border-white/[0.15] hover:bg-white/[0.12] hover:border-white/[0.25] hover:-translate-y-0.5 transition-all duration-200 min-w-[170px]">
                  Browse Reports
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

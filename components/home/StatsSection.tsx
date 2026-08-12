import Link from 'next/link';

const benefits = [
  'Benchmark performance against industry peers',
  'Analyze competitor strategies and shifting market share',
  'Spot regional growth pockets and expansion opportunities',
  'Monitor emerging trends and market dynamics',
  'Rely on accurate, research-backed intelligence',
  'Access insights via PDF, PPT, Excel or dashboards',
];

const practices = [
  {
    title: 'Market Research',
    body: 'Quickly identify business opportunities by combining market intelligence with the right set of skills.',
    href: '/reports',
  },
  {
    title: 'Business Consulting',
    body: 'For clients who want a deeper understanding of the market and a more secure position within it.',
    href: '/services',
  },
];

/**
 * The split panel: the argument on the left, the numbered proof on a
 * blue card to the right.
 */
export default function StatsSection() {
  return (
    <section className="grid gap-8 rounded-panel bg-white p-7 md:p-11 lg:grid-cols-[1.05fr_1fr] lg:gap-11">
      <div className="flex flex-col gap-5">
        <span className="eyebrow">Strategy execution</span>
        <h2 className="text-[28px] leading-[1.1] md:text-[38px]">
          Accelerate strategy execution and consistency in revenue growth
        </h2>
        <p className="text-[15px] leading-[1.6] text-[var(--cmi-body)]">
          With insightful and precise advisory you can keep a close eye on the market&apos;s
          shifting trends. NeoGraph has a solution for every business question you face.
        </p>

        <div className="mt-1 grid gap-3.5 sm:grid-cols-2">
          {practices.map((practice) => (
            <div
              key={practice.title}
              className="flex flex-col gap-2.5 rounded-soft bg-[var(--cmi-surface)] p-5 md:p-[22px]"
            >
              <div className="font-display text-[19px] font-semibold">{practice.title}</div>
              <p className="text-[13.5px] leading-[1.55] text-[var(--cmi-body)]">{practice.body}</p>
              <Link
                href={practice.href}
                className="mt-auto text-[13.5px] font-semibold text-[var(--cmi-primary)]"
              >
                View more →
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-[20px] bg-[var(--cmi-primary)] p-6 md:p-[30px]">
        <div className="font-display text-[20px] font-semibold text-white md:text-[22px]">
          Market intelligence — key benefits
        </div>
        <div className="flex flex-col gap-3">
          {benefits.map((benefit, i) => (
            <div
              key={benefit}
              className="flex items-start gap-3 rounded-xl bg-[var(--cmi-primary-raised)] px-4 py-3.5"
            >
              <span className="num shrink-0 text-[13px] text-[var(--cmi-sky)]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-sm leading-[1.45] text-white">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

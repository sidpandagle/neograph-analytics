import { BookOpen, Globe, LayoutGrid, Users } from 'lucide-react';
import type { ElementType } from 'react';

interface Stat {
  value: string;
  label: string;
  desc: string;
  icon: ElementType;
}

const stats: Stat[] = [
  { value: '2,500+', label: 'Research Reports',  desc: 'Across all healthcare verticals', icon: BookOpen },
  { value: '50+',    label: 'Countries Covered',  desc: 'Global research and market insights', icon: Globe },
  { value: '20+',    label: 'Industry Sectors',   desc: 'From pharma to animal health', icon: LayoutGrid },
  { value: '1,000+', label: 'Enterprise Clients', desc: 'Trusted by industry leaders worldwide', icon: Users },
];

export default function StatsSection() {
  return (
    <section className="border-y" style={{ backgroundColor: 'var(--muted)', borderColor: 'var(--border)' }}>
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderColor: 'var(--border)' } as React.CSSProperties}>
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.value} className="px-8 md:px-10 py-16 md:py-20 text-center">

                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: 'hsl(var(--primary-hsl) / 0.06)',
                      boxShadow: '0px 0px 0px 1px hsl(var(--primary-hsl) / 0.08)',
                    }}
                  >
                    <Icon className="w-5 h-5" strokeWidth={1.5} style={{ color: 'var(--primary)' }} />
                  </div>
                </div>

                {/* Number */}
                <div
                  className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight tabular-nums leading-none mb-3"
                  style={{ color: 'var(--foreground)', letterSpacing: '-0.04em' }}
                >
                  {stat.value}
                </div>

                {/* Label */}
                <div
                  className="text-xs font-semibold uppercase mb-2"
                  style={{ color: 'var(--accent)', letterSpacing: '0.10em' }}
                >
                  {stat.label}
                </div>

                {/* Description */}
                <div className="text-xs leading-relaxed max-w-[160px] mx-auto" style={{ color: 'var(--muted-foreground)' }}>
                  {stat.desc}
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

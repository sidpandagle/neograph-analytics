import Link from 'next/link';
import {
  Dna, Microscope, Heart, FlaskConical, Monitor, Activity,
  Eye, Pill, Leaf, Smile, Atom, PawPrint, ArrowRight,
} from 'lucide-react';
import type { ElementType } from 'react';
import { Container } from '@/components/ui';
import categories from '@/data/categories.json';

interface CategoryStyle {
  icon: ElementType;
  iconColor: string;
  iconBg: string;
}

const categoryStyles: Record<string, CategoryStyle> = {
  biotechnology:          { icon: Dna,          iconColor: '#111a4a', iconBg: 'rgba(17,26,74,0.07)' },
  'clinical-diagnostics': { icon: Microscope,   iconColor: '#111a4a', iconBg: 'rgba(17,26,74,0.07)' },
  'healthcare-services':  { icon: Heart,        iconColor: '#ec652b', iconBg: 'rgba(236,101,43,0.08)' },
  'laboratory-equipment': { icon: FlaskConical, iconColor: '#111a4a', iconBg: 'rgba(17,26,74,0.07)' },
  'healthcare-it':        { icon: Monitor,      iconColor: '#111a4a', iconBg: 'rgba(17,26,74,0.07)' },
  'medical-devices':      { icon: Activity,     iconColor: '#ec652b', iconBg: 'rgba(236,101,43,0.08)' },
  'medical-imaging':      { icon: Eye,          iconColor: '#111a4a', iconBg: 'rgba(17,26,74,0.07)' },
  'therapeutic-area':     { icon: Pill,         iconColor: '#ec652b', iconBg: 'rgba(236,101,43,0.08)' },
  'life-sciences':        { icon: Leaf,         iconColor: '#111a4a', iconBg: 'rgba(17,26,74,0.07)' },
  dental:                 { icon: Smile,        iconColor: '#ec652b', iconBg: 'rgba(236,101,43,0.08)' },
  pharmaceuticals:        { icon: Atom,         iconColor: '#111a4a', iconBg: 'rgba(17,26,74,0.07)' },
  'animal-health':        { icon: PawPrint,     iconColor: '#ec652b', iconBg: 'rgba(236,101,43,0.08)' },
};

const fallbackStyle: CategoryStyle = { icon: Activity, iconColor: '#111a4a', iconBg: 'rgba(17,26,74,0.07)' };

export default function IndustryCategoriesSection() {
  return (
    <section className="bg-white py-24">
      <Container size="xl">
        <div className="space-y-14">

          {/* Section header */}
          <div className="text-center space-y-3">
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border"
              style={{ color: '#111a4a', backgroundColor: 'rgba(17,26,74,0.05)', borderColor: 'rgba(17,26,74,0.12)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#ec652b' }} />
              Industry Coverage
            </span>
            <h2 className="text-3xl md:text-[2.6rem] lg:text-5xl tracking-[-0.03em] leading-[1.08]" style={{ color: '#011821' }}>
              Every Healthcare Sector, Covered
            </h2>
            <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: '#7c7f88' }}>
              Deep-dive research across every major healthcare and life sciences vertical —
              from pharma to animal health.
            </p>
          </div>

          {/* 4×3 grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => {
              const style = categoryStyles[category.slug] ?? fallbackStyle;
              const Icon = style.icon;

              return (
                <Link
                  key={category.id}
                  href={`/reports?category=${category.slug}`}
                  className="group flex flex-col gap-3.5 p-5 bg-white border border-[#e3e4e8] rounded-xl hover:border-[#111a4a]/25 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200"
                    style={{ backgroundColor: style.iconBg }}
                  >
                    <Icon className="w-5 h-5" strokeWidth={1.75} style={{ color: style.iconColor }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold leading-snug group-hover:text-[#ec652b] transition-colors" style={{ color: '#011821' }}>
                      {category.name}
                    </h3>
                    <p className="text-xs mt-1 line-clamp-2 leading-relaxed" style={{ color: '#7c7f88' }}>
                      {category.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 translate-y-0.5 group-hover:translate-y-0 transition-all duration-200" style={{ color: '#ec652b' }}>
                    Explore
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </Container>
    </section>
  );
}

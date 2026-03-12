import Link from 'next/link';
import categories from '@/data/categories.json';

interface CategorySidebarProps {
  basePath: string;
  categoryBasePath?: string;
  activeCategorySlug?: string;
}

export default function CategorySidebar({ basePath, categoryBasePath, activeCategorySlug }: CategorySidebarProps) {
  const catBase = categoryBasePath ?? basePath;
  return (
    <div className="space-y-5">
      {/* Browse by Category */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
            Browse by Category
          </h2>
        </div>
        <nav className="py-1.5">
          <Link
            href={basePath}
            className={`flex items-center px-4 py-2 text-sm transition-colors ${
              !activeCategorySlug
                ? 'text-[#2563A3] bg-blue-50 font-semibold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            All Categories
          </Link>
          {categories.map((category) => {
            const isActive = category.slug === activeCategorySlug;
            return (
              <Link
                key={category.id}
                href={`${catBase}/${category.slug}`}
                className={`flex items-center px-4 py-2 text-sm transition-colors ${
                  isActive
                    ? 'text-[#2563A3] bg-blue-50 font-semibold border-l-[3px] border-[#2563A3]'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-[3px] border-transparent'
                }`}
              >
                {category.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-[#1B4B7F] to-[#0F2D52] rounded-xl p-5 text-white">
        <h3 className="font-bold text-sm mb-1.5">Need Custom Research?</h3>
        <p className="text-blue-200 text-xs leading-relaxed mb-4">
          Our analysts can create tailored reports for your specific needs and market segment.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 bg-white text-[#2563A3] text-xs font-bold px-3.5 py-2 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Request a Custom Report
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

import Link from 'next/link';
import categories from '@/data/categories.json';

/**
 * The industry store — a blue panel of tiles. Tiles invert to white on
 * hover, which is the system's one showy interaction.
 */
export default function IndustryCategoriesSection() {
  return (
    <section className="flex flex-col gap-7 rounded-panel bg-[var(--cmi-primary)] p-7 md:p-11">
      <div className="flex flex-col items-center gap-2.5 text-center">
        <h2 className="text-[26px] text-white md:text-[34px]">
          Every healthcare sector, one research desk
        </h2>
        <p className="max-w-[620px] text-[15px] text-[var(--cmi-on-blue)]">
          Every report is backed by primary interviews, validated secondary data and
          NeoGraph&apos;s own forecasting models.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/reports?category=${category.slug}`}
            className="group flex items-center justify-between gap-2.5 rounded-tile bg-[var(--cmi-primary-raised)] p-4 text-[14.5px] font-semibold text-white transition-colors duration-150 hover:bg-white hover:text-[var(--cmi-primary)] md:p-[18px]"
          >
            <span className="min-w-0 truncate">{category.name}</span>
            <span className="shrink-0 text-xs opacity-70 transition-transform duration-150 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

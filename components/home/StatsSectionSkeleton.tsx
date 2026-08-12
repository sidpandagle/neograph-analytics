export default function StatsSectionSkeleton() {
  return (
    <section className="grid gap-8 rounded-panel bg-white p-7 md:p-11 lg:grid-cols-[1.05fr_1fr] lg:gap-11">
      <div className="flex flex-col gap-5">
        <div className="h-3 w-40 animate-pulse rounded-pill bg-[var(--cmi-surface)]" />
        <div className="space-y-3">
          <div className="h-9 w-full animate-pulse rounded-pill bg-[var(--cmi-surface)]" />
          <div className="h-9 w-4/5 animate-pulse rounded-pill bg-[var(--cmi-surface)]" />
        </div>
        <div className="h-4 w-3/4 animate-pulse rounded-pill bg-[var(--cmi-surface)]" />
        <div className="mt-1 grid gap-3.5 sm:grid-cols-2">
          {[0, 1].map((i) => (
            <div key={i} className="h-[150px] animate-pulse rounded-soft bg-[var(--cmi-surface)]" />
          ))}
        </div>
      </div>
      <div className="h-[420px] animate-pulse rounded-[20px] bg-[var(--cmi-surface)]" />
    </section>
  );
}

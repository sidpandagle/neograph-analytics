import { Skeleton } from '@/components/ui';

export default function AuthorLoading() {
  return (
    <div className="bg-[var(--background)]">
      {/* Breadcrumb Bar Skeleton */}
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="px-4 py-4 md:px-6">
          <Skeleton className="h-5 w-48" />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-8 md:px-6 max-w-7xl mx-auto">
        {/* Author Profile Skeleton */}
        <section className="mb-12">
          <div className="bg-[#F8F9FA] py-12 px-4 rounded-2xl border border-[var(--border)]">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                {/* Avatar Skeleton */}
                <Skeleton variant="circular" width={128} height={128} className="flex-shrink-0" />

                {/* Info Skeleton */}
                <div className="flex-1 w-full space-y-4">
                  <Skeleton className="h-10 w-64" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-5/6" />

                  {/* Stats Card Skeleton */}
                  <div className="mt-4">
                    <div className="rounded-xl border border-[var(--border)] bg-white/80 p-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8" />
                        <div className="flex-1">
                          <Skeleton className="h-4 w-32 mb-2" />
                          <Skeleton className="h-8 w-16" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reports Listing Skeleton */}
        <section className="py-8">
          {/* Section Header Skeleton */}
          <div className="mb-8">
            <Skeleton className="h-9 w-64 mb-2" />
            <Skeleton className="h-5 w-32" />
          </div>

          {/* Reports Grid Skeleton */}
          <div className="grid grid-cols-1 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <Skeleton className="h-7 w-full mb-3" />
                  <Skeleton className="h-5 w-full mb-2" />
                  <Skeleton className="h-5 w-3/4 mb-4" />
                  <div className="flex items-center gap-4 mb-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
                <div className="border-t border-[var(--border)] px-6 py-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

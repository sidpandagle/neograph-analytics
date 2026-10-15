import { Skeleton, Section, Container, Grid, Card, CardHeader, CardContent, CardFooter } from '@/components/ui';

/**
 * Skeleton loader for reports page
 * Matches the exact layout of ReportsListingClient with sidebar, search, and report cards
 */
export default function ReportsSkeleton() {
  return (
    <Section padding="lg">
      <Container size="xl">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Left Sidebar Skeleton - Hidden on mobile */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Filter header */}
              <div className="space-y-3">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>

              {/* Filter sections */}
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="space-y-3">
                  <Skeleton className="h-5 w-28" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <div>
            {/* Search Bar Skeleton */}
            <div className="mb-6">
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>

            {/* Header Skeleton */}
            <div className="mb-8">
              <Skeleton className="h-10 w-64 mb-2" />
              <Skeleton className="h-6 w-40" />
            </div>

            {/* Report Cards Skeleton - Single column grid */}
            <Grid cols={1} gap="lg">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="h-full flex flex-col">
                  <CardHeader>
                    {/* Badge + Price Row */}
                    <div className="flex items-center justify-between mb-3">
                      <Skeleton className="h-6 w-24 rounded-full" />
                      <div className="text-right space-y-1">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-6 w-20" />
                      </div>
                    </div>

                    {/* Title */}
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-6 w-3/4" />
                  </CardHeader>

                  <CardContent className="flex-grow" style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                    {/* Description */}
                    <div className="space-y-2 mb-4">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>

                    {/* Metadata Row with Icons */}
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </CardContent>

                  <CardFooter className="border-t border-slate-200 pt-4 mt-4">
                    <div className="flex items-center justify-between w-full">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </Grid>
          </div>
        </div>
      </Container>
    </Section>
  );
}

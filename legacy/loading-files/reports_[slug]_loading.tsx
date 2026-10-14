import { Section, Container, Skeleton } from "@/components/ui";

export default function ReportDetailLoading() {
  return (
    <>
      <Section className="bg-[var(--muted)]">
        <Container>
          <Skeleton className="h-4 w-32 mb-8" />
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Skeleton className="h-6 w-32 mb-4" />
              <Skeleton className="h-16 w-full mb-6" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-4/5 mb-8" />
              <div className="flex flex-wrap gap-3 mb-6">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-28" />
                <Skeleton className="h-6 w-32" />
              </div>
            </div>
            <div>
              <Skeleton className="h-64 w-full rounded-lg" />
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
            </div>
            <div>
              <Skeleton className="h-96 w-full rounded-lg" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

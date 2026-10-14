import { Section, Container, Skeleton } from "@/components/ui";

export default function BlogDetailLoading() {
  return (
    <>
      <Section className="bg-[var(--muted)]">
        <Container size="sm">
          <Skeleton className="h-4 w-32 mb-6" />
          <Skeleton className="h-6 w-24 mb-6" />
          <Skeleton className="h-16 w-full mb-6" />
          <Skeleton className="h-8 w-full mb-2" />
          <Skeleton className="h-8 w-4/5 mb-8" />
          <div className="flex items-center gap-4 pb-8">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="sm">
          <div className="space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="h-6 w-full mt-8" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-4/5" />
            <Skeleton className="h-6 w-full mt-8" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        </Container>
      </Section>
    </>
  );
}

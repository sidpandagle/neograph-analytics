import { Suspense } from "react";
import { Section, Container } from "@/components/ui";
import RequestCustomizationForm from "./RequestCustomizationForm";
import { getReportBySlug, isApiError } from "@/lib/api";

async function RequestCustomizationContent({ reportId }: { reportId?: string }) {
  let reportTitle = "";
  let reportSlug = "";

  if (reportId) {
    const response = await getReportBySlug(reportId);
    if (!isApiError(response)) {
      reportTitle = response.data.title;
      reportSlug = response.data.slug;
    }
  }

  return <RequestCustomizationForm reportTitle={reportTitle} reportSlug={reportSlug} />;
}

export default async function RequestCustomizationPage({
  searchParams,
}: {
  searchParams: Promise<{ reportId?: string; report?: string; slug?: string }>;
}) {
  const params = await searchParams;
  const reportId = params.reportId;

  // Legacy support: if old ?report=...&slug=... params are used, pass them directly
  const legacyTitle = params.report || "";
  const legacySlug = params.slug || "";

  return (
    <Suspense fallback={
      <Section padding="lg" background="muted">
        <Container size="lg">
          <div className="text-center space-y-4">
            <div className="h-6 w-40 bg-gray-200 rounded-full mx-auto animate-pulse" />
            <div className="h-12 w-96 bg-gray-200 rounded mx-auto animate-pulse" />
            <div className="h-6 w-full max-w-2xl bg-gray-200 rounded mx-auto animate-pulse" />
          </div>
        </Container>
      </Section>
    }>
      {reportId ? (
        <RequestCustomizationContent reportId={reportId} />
      ) : (
        <RequestCustomizationForm reportTitle={legacyTitle} reportSlug={legacySlug} />
      )}
    </Suspense>
  );
}

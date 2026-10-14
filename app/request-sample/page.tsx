import { Suspense } from "react";
import { Section, Container } from "@/components/ui";
import RequestSampleForm from "./RequestSampleForm";
import type { Metadata } from "next";

// Declares its own canonical rather than inheriting one. The route is disallowed
// in robots.ts, so this exists to prevent a stray duplicate signal, not to rank.
export const metadata: Metadata = {
  title: "Request a Sample | NeoGraph Analytics",
  description: "Request a sample of a NeoGraph Analytics research report.",
  alternates: { canonical: "/request-sample" },
  robots: { index: false, follow: true },
};

export default function RequestSamplePage() {
  return (
    <Suspense fallback={
      <Section padding="lg" background="muted">
        <Container size="lg">
          <div className="text-center space-y-4">
            <div className="h-6 w-32 bg-gray-200 rounded-full mx-auto animate-pulse" />
            <div className="h-12 w-96 bg-gray-200 rounded mx-auto animate-pulse" />
            <div className="h-6 w-full max-w-2xl bg-gray-200 rounded mx-auto animate-pulse" />
          </div>
        </Container>
      </Section>
    }>
      <RequestSampleForm />
    </Suspense>
  );
}

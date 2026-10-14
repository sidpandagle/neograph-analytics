import { Suspense } from 'react';
import type { Metadata } from 'next';

// Content is served from Supabase and must not be cached forever. Without this,
// App Router marks the route fully static (X-Nextjs-Stale-Time: 4294967294) and
// Vercel serves the build-time HTML until the next deploy - which is why
// production was serving 28-day-old pages.
export const revalidate = 3600;

import {
  HeroSection,
  FeaturedReportsSection,
  IndustryCategoriesSection,
  StatsSection,
  TrustedPartnersSection,
  TestimonialsSection,
  CTASection,
  StatsSectionSkeleton,
  TestimonialsSectionSkeleton,
} from '@/components/home';

export const metadata: Metadata = {
  title: "NeoGraph Analytics | Healthcare Market Insights & Research Reports",
  description: "NeoGraph Analytics delivers trusted neograph analytics, industry insights, trends, forecasts, and data-driven analysis across global healthcare sectors.",
  keywords: ["neograph analytics", "healthcare insights", "healthcare industry trends", "medical market analysis", "healthcare reports"],
  alternates: {
    canonical: 'https://www.neographanalytics.com',
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedReportsSection />
      <IndustryCategoriesSection />

      <Suspense fallback={<StatsSectionSkeleton />}>
        <StatsSection />
      </Suspense>

      <TrustedPartnersSection />

      <Suspense fallback={<TestimonialsSectionSkeleton />}>
        <TestimonialsSection />
      </Suspense>

      <CTASection />
    </>
  );
}

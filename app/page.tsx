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
  CTASection,
  StatsSectionSkeleton,
} from '@/components/home';

export const metadata: Metadata = {
  title: { absolute: "NeoGraph Analytics | Healthcare Market Research" },
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

      {/* Testimonials are not rendered.
          The ten rows in `data/testimonials.json` carry job titles in place of
          names ("Head of Marketing", "Research Associate") and nine of the ten
          companies are outside healthcare — West Ham United, Mitsubishi Motors
          R&D, The Clorox Company, Singapore Tourism Board, Beeline, Nissan
          Chemical — under a heading that reads "What healthcare executives
          say", each with a five-star rating. On a publication whose only asset
          is credibility, unverifiable praise next to sourced analysis devalues
          the analysis. The component and the data stay in place for when real,
          attributable quotes exist; they are simply not on the page.
          `TestimonialsSection` / `TestimonialsSectionSkeleton` remain exported
          from `@/components/home`. */}

      <CTASection />
    </>
  );
}

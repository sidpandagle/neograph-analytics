import { Container, Grid } from "@/components/ui";
import { PressReleaseCard } from "@/components/press-releases/PressReleaseCard";
import { getPressReleases, isApiError } from "@/lib/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare Press Releases & Industry News",
  description: "Stay updated with the latest healthcare press releases, research announcements, and industry developments.",
  keywords: ["healthcare press releases", "healthcare news", "industry announcements", "healthcare market updates"],
  alternates: {
    canonical: '/press-releases',
  },
};

export default async function PressReleasesPage() {
  const response = await getPressReleases({ status: 'published', limit: 100 });

  if (isApiError(response)) {
    console.error('Failed to fetch press releases:', response.message);
    return (
      <section className="relative overflow-hidden theme-hero py-20 md:py-24">
        <div className="absolute inset-0 theme-hero-grid opacity-75 pointer-events-none" />
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center space-y-5">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full theme-hero-panel">
            Press Releases
          </span>
          <h1 className="text-[2.75rem] md:text-5xl theme-hero-text leading-[1.1] tracking-[-0.02em]">Press Releases</h1>
          <p className="text-lg theme-hero-muted max-w-xl mx-auto leading-[1.8]">
            Unable to load press releases at this time. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  const pressReleases = response.data;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden theme-hero py-20 md:py-24">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'28\' height=\'28\' viewBox=\'0 0 28 28\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'1\' cy=\'1\' r=\'1\' fill=\'white\'/%3E%3C/svg%3E")',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute inset-0 theme-hero-grid opacity-75 pointer-events-none" />
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full theme-hero-panel">
              Press Releases
            </span>
            <h1 className="text-[2.75rem] md:text-5xl theme-hero-text leading-[1.1] tracking-[-0.02em]">
              News &{' '}
              <span className="text-[var(--accent)]">Announcements</span>
            </h1>
            <p className="text-lg theme-hero-muted max-w-2xl mx-auto leading-[1.8]">
              Latest research publications, industry announcements, and developments from NeoGraph Analytics.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm theme-hero-faint">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
              {pressReleases.length} announcements published
            </div>
          </div>
        </div>
      </section>

      {/* Press Releases Grid */}
      <section className="py-14 md:py-20 bg-[var(--muted)]">
        <Container>
          <Grid cols={3}>
            {pressReleases.map((pr) => (
              <PressReleaseCard
                key={pr.id}
                slug={pr.slug}
                title={pr.title}
                excerpt={pr.excerpt}
                category={pr.category}
                author={pr.author}
                date={pr.date}
                readTime={pr.readTime}
                location={pr.location}
              />
            ))}
          </Grid>
        </Container>
      </section>
    </>
  );
}

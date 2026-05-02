import { Container, Grid } from "@/components/ui";
import { BlogCard } from "@/components/blog/BlogCard";
import { getBlogs, isApiError } from "@/lib/api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare Insights Blog | Trends, News & Analysis",
  description: "Read expert blogs on healthcare trends, innovations, policy updates, market developments, and industry insights.",
  keywords: ["healthcare blog", "healthcare insights", "healthcare trends", "medical industry news", "healthcare analysis"],
  alternates: {
    canonical: '/blog',
  },
};

export default async function BlogPage() {
  const response = await getBlogs({ status: 'published', limit: 100 });

  const errorHero = (
    <section className="relative overflow-hidden theme-hero py-20 md:py-24">
      <div className="absolute inset-0 theme-hero-grid opacity-75 pointer-events-none" />
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center space-y-5">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full theme-hero-panel">
          Insights & Analysis
        </span>
        <h1 className="text-[2.75rem] md:text-5xl theme-hero-text leading-[1.1] tracking-[-0.02em]">
          Healthcare Insights & Analysis
        </h1>
        <p className="text-lg theme-hero-muted max-w-xl mx-auto leading-[1.8]">
          Unable to load blog posts at this time. Please try again later.
        </p>
      </div>
    </section>
  );

  if (isApiError(response)) {
    console.error('Failed to fetch blogs:', response.message);
    return errorHero;
  }

  const blogs = response.data;

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
              Insights & Analysis
            </span>
            <h1 className="text-[2.75rem] md:text-5xl theme-hero-text leading-[1.1] tracking-[-0.02em]">
              Healthcare Insights &{' '}
              <span className="text-[var(--accent)]">Analysis</span>
            </h1>
            <p className="text-lg theme-hero-muted max-w-2xl mx-auto leading-[1.8]">
              Expert perspectives on healthcare market trends, emerging technologies, and industry transformations.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm theme-hero-faint">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
              {blogs.length} articles published
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-14 md:py-20 bg-[var(--muted)]">
        <Container>
          <Grid cols={3}>
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                slug={blog.slug}
                title={blog.title}
                excerpt={blog.excerpt}
                category={blog.category}
                author={blog.author}
                date={blog.date}
                readTime={blog.readTime}
                location={blog.location}
              />
            ))}
          </Grid>
        </Container>
      </section>
    </>
  );
}

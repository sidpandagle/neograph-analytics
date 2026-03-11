import { notFound } from "next/navigation";
import { Section, Container, Badge } from "@/components/ui";
import { getLegalPages, getLegalPageBySlug, isApiError } from "@/lib/api";
import type { Metadata } from "next";
import { StructuredData, generateArticleSchema, generateBreadcrumbSchema } from "@/components/seo/StructuredData";

interface LegalPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const response = await getLegalPages({ limit: 100 });

  if (isApiError(response)) {
    console.error('Failed to fetch legal pages for static params:', response.message);
    return [];
  }

  return response.data.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const response = await getLegalPageBySlug(slug);

    if (isApiError(response)) {
      return {
        title: "Legal Page Not Found",
      };
    }

    const page = response.data;

    // Use metadata fields if available, otherwise fallback to defaults
    const title = page.metadata?.metaTitle || page.title;
    const description = page.metadata?.metaDescription || page.excerpt;
    const keywords = page.metadata?.keywords || ["healthcare legal", "policies"];

    return {
      title: { absolute: title },
      description,
      keywords,
      openGraph: {
        title: page.metadata?.metaTitle || page.title,
        description,
        type: "article",
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
      alternates: {
        canonical: `/legal/${slug}`,
      },
      robots: {
        index: false,
        follow: false,
      },
    };
  } catch {
    return { title: "Legal Page Not Found" };
  }
}

export default async function LegalDetailPage({ params }: LegalPageProps) {
  const { slug } = await params;

  let response;
  try {
    response = await getLegalPageBySlug(slug);
  } catch {
    notFound();
  }

  if (isApiError(response)) {
    notFound();
  }

  const page = response.data;

  // Generate structured data schemas
  const articleSchema = generateArticleSchema({
    type: 'Article',
    title: page.title,
    description: page.excerpt,
    url: `https://www.healthcareforesights.com/legal/${page.slug}`,
    datePublished: page.lastUpdated,
    dateModified: page.lastUpdated,
    keywords: page.metadata?.keywords,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.healthcareforesights.com' },
    { name: 'Legal', url: 'https://www.healthcareforesights.com/legal' },
    { name: page.title, url: `https://www.healthcareforesights.com/legal/${page.slug}` },
  ]);

  // Format date for display
  const formattedDate = new Date(page.lastUpdated).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />
      <Section className="bg-[var(--muted)]">
        <Container size="sm">
          <div className="mb-6">
            <Badge variant="default">{page.category}</Badge>
          </div>

          <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
            {page.title}
          </h1>

          <p className="text-xl text-[var(--muted-foreground)] mb-8 leading-relaxed">
            {page.excerpt}
          </p>

          <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] pb-8 border-b border-[var(--border)]">
            <span>Last updated:</span>
            <time className="font-medium text-[var(--foreground)]">{formattedDate}</time>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="sm">
          <article className="prose prose-lg max-w-none">
            <div
              className="legal-content text-[var(--foreground)] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </article>

          <div className="mt-16 pt-8 border-t border-[var(--border)] text-center">
            <p className="text-[var(--muted-foreground)] mb-2">
              Questions about this policy?
            </p>
            <p className="text-lg">
              Contact us at{' '}
              <a
                href="mailto:support@healthcareforesights.com"
                className="text-[var(--primary)] hover:underline font-medium"
              >
                support@healthcareforesights.com
              </a>
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}

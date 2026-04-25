import { notFound } from "next/navigation";
import Link from "next/link";
import { Section, Container, Badge, StyledArticleContent, Button, Card, CardContent, Breadcrumb } from "@/components/ui";
import { getPressReleases, getPressReleaseBySlug, getReportBySlug, isApiError } from "@/lib/api";
import type { Metadata } from "next";
import { StructuredData, generateArticleSchema, generateBreadcrumbSchema } from "@/components/seo/StructuredData";
import { TrustedPartnersSidebar } from "@/components/contact";

export const revalidate = 300;

interface PressReleasePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const response = await getPressReleases({ status: 'published', limit: 100 });

  if (isApiError(response)) {
    console.error('Failed to fetch press releases for static params:', response.message);
    return [];
  }

  return response.data.map((pressRelease) => ({
    slug: pressRelease.slug,
  }));
}

export async function generateMetadata({ params }: PressReleasePageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const response = await getPressReleaseBySlug(slug);

    if (isApiError(response)) {
      return {
        title: "Press Release Not Found",
      };
    }

    const pressRelease = response.data;

    const title = pressRelease.metadata?.metaTitle || pressRelease.title;
    const description = pressRelease.metadata?.metaDescription || pressRelease.excerpt;
    const keywords = pressRelease.metadata?.keywords || ["healthcare press releases", "healthcare news", "industry announcements", "healthcare market updates"];

    return {
      title: { absolute: title },
      description,
      keywords,
      openGraph: {
        title: pressRelease.metadata?.metaTitle || pressRelease.title,
        description,
        type: "article",
        publishedTime: pressRelease.publishDate || pressRelease.createdAt,
        authors: pressRelease.authorDetails ? [pressRelease.authorDetails.name] : [pressRelease.author],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
      alternates: {
        canonical: `/press-release/${slug}`,
      },
    };
  } catch {
    return { title: "Press Release Not Found" };
  }
}

export default async function PressReleaseDetailPage({ params }: PressReleasePageProps) {
  const { slug } = await params;

  let response;
  try {
    response = await getPressReleaseBySlug(slug);
  } catch {
    notFound();
  }

  if (isApiError(response)) {
    notFound();
  }

  const pressRelease = response.data;

  let relatedReportId: number | null = null;
  if (pressRelease.reportUrl) {
    const reportSlug = pressRelease.reportUrl.split('/').filter(Boolean).pop();
    if (reportSlug) {
      const reportResponse = await getReportBySlug(reportSlug);
      if (!isApiError(reportResponse)) {
        relatedReportId = reportResponse.data.id;
      }
    }
  }

  const articleSchema = generateArticleSchema({
    type: 'NewsArticle',
    title: pressRelease.title,
    description: pressRelease.excerpt,
    url: `https://www.healthcareforesights.com/press-release/${pressRelease.slug}`,
    datePublished: pressRelease.publishDate || pressRelease.createdAt || pressRelease.date,
    dateModified: pressRelease.updatedAt,
    author: pressRelease.authorDetails?.name || pressRelease.author,
    keywords: pressRelease.metadata?.keywords,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.healthcareforesights.com' },
    { name: 'Press Releases', url: 'https://www.healthcareforesights.com/press-releases' },
    { name: pressRelease.title, url: `https://www.healthcareforesights.com/press-release/${pressRelease.slug}` },
  ]);

  return (
    <>
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />
      <Section className="bg-[var(--muted)] pb-0">
        <Container size="lg">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Press Releases', href: '/press-releases' },
                { label: pressRelease.title },
              ]}
            />
          </div>

          <div className="mb-6">
            <Link href={`/industry/${pressRelease.category.toLowerCase().replace(/\s+/g, '-')}`}>
              <Badge variant="default" className="cursor-pointer hover:opacity-80">{pressRelease.category}</Badge>
            </Link>
          </div>

          <h1 className="mb-6 text-4xl font-bold">
            {pressRelease.title}
          </h1>

          <p className="text-xl text-[var(--muted-foreground)] mb-8 leading-relaxed">
            {pressRelease.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted-foreground)] pb-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-semibold">
                {pressRelease.author.split(" ").map(n => n[0]).join("")}
              </div>
              <span className="font-medium text-[var(--foreground)]">{pressRelease.author}</span>
            </div>
            <span>•</span>
            <time>{pressRelease.date}</time>
            <span>•</span>
            <span>{pressRelease.readTime}</span>
            {pressRelease.location && (
              <>
                <span>•</span>
                <span>{pressRelease.location}</span>
              </>
            )}
          </div>
        </Container>
      </Section>

      <Section className="pt-8">
        <Container size="lg">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left – article (2/3 width) */}
            <div className="lg:col-span-2">
              <article>
                <StyledArticleContent htmlContent={pressRelease.content} />
              </article>

              <div className="mt-12 pt-8 border-t border-[var(--border)]">
                <Link
                  href="/press-releases"
                  className="inline-flex items-center gap-2 text-[var(--primary)] hover:underline font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m15 18-6-6 6-6"/>
                  </svg>
                  View all press releases
                </Link>
              </div>
            </div>

            {/* Right – sidebar (1/3 width) */}
            <div className="space-y-6">
              <Card>
                <CardContent className="space-y-3 pt-4">
                  {relatedReportId && (
                    <>
                      <Link href={`/request-sample?reportId=${relatedReportId}`}>
                        <Button
                          className="w-full bg-[#E3F2FD] text-[#1565C0] hover:bg-[#BBDEFB] hover:text-[#0D47A1] border-[#90CAF9] hover:border-[#64B5F6]"
                          variant="outline"
                          size="lg"
                        >
                          Request Sample
                        </Button>
                      </Link>
                      <Link href={`/request-customization?reportId=${relatedReportId}`}>
                        <Button
                          className="w-full mt-3 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 border-green-200 hover:border-green-300"
                          variant="outline"
                          size="lg"
                        >
                          Customization
                        </Button>
                      </Link>
                    </>
                  )}
                  {pressRelease.reportUrl && (
                    <Link href={pressRelease.reportUrl}>
                      <Button
                        className="w-full mt-3"
                        size="lg"
                      >
                        Read Report
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>

              <TrustedPartnersSidebar />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

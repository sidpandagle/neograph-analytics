import { notFound } from "next/navigation";
import Link from "next/link";
import { Section, Container, Badge, StyledArticleContent, Breadcrumb } from "@/components/ui";
import { getBlogs, getBlogBySlug, isApiError } from "@/lib/api";
import type { Metadata } from "next";
import { StructuredData, generateArticleSchema, generateBreadcrumbSchema } from "@/components/seo/StructuredData";
import BlogSidebarForm from "@/components/blog/BlogSidebarForm";
import { QuickContactSection } from "@/components/contact";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const response = await getBlogs({ status: 'published', limit: 100 });

  if (isApiError(response)) {
    console.error('Failed to fetch blogs for static params:', response.message);
    return [];
  }

  return response.data.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const response = await getBlogBySlug(slug);

    if (isApiError(response)) {
      return {
        title: "Blog Not Found",
      };
    }

    const blog = response.data;

    // Use metadata fields if available, otherwise fallback to defaults
    const title = blog.metadata?.metaTitle || blog.title;
    const description = blog.metadata?.metaDescription || blog.excerpt;
    const keywords = blog.metadata?.keywords || [];

    return {
      title: { absolute: title },
      description,
      keywords,
      openGraph: {
        title: blog.metadata?.metaTitle || blog.title,
        description,
        type: "article",
        publishedTime: blog.publishDate || blog.createdAt,
        authors: blog.authorDetails ? [blog.authorDetails.name] : [blog.author],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
      alternates: {
        canonical: `/blog/${slug}`,
      },
    };
  } catch {
    return { title: "Blog Not Found" };
  }
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params;

  let response;
  try {
    response = await getBlogBySlug(slug);
  } catch {
    notFound();
  }

  if (isApiError(response)) {
    notFound();
  }

  const blog = response.data;

  // Generate structured data schemas
  const articleSchema = generateArticleSchema({
    type: 'Article',
    title: blog.title,
    description: blog.excerpt,
    url: `https://www.healthcareforesights.com/blog/${blog.slug}`,
    datePublished: blog.publishDate || blog.createdAt || blog.date,
    dateModified: blog.updatedAt,
    author: blog.authorDetails?.name || blog.author,
    keywords: blog.metadata?.keywords,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.healthcareforesights.com' },
    { name: 'Blog', url: 'https://www.healthcareforesights.com/blog' },
    { name: blog.title, url: `https://www.healthcareforesights.com/blog/${blog.slug}` },
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
                { label: 'Insights', href: '/blog' },
                { label: blog.title },
              ]}
            />
          </div>

          <div className="mb-6">
            <Link href={`/industry/${blog.category.toLowerCase().replace(/\s+/g, '-')}`}>
              <Badge variant="default" className="cursor-pointer hover:opacity-80">{blog.category}</Badge>
            </Link>
          </div>

          <h1 className="mb-6 text-4xl font-bold">
            {blog.title}
          </h1>

          <p className="text-xl text-[var(--muted-foreground)] mb-8 leading-relaxed">
            {blog.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted-foreground)] pb-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-semibold">
                {blog.author.split(" ").map(n => n[0]).join("")}
              </div>
              <span className="font-medium text-[var(--foreground)]">{blog.author}</span>
            </div>
            <span>•</span>
            <time>{blog.date}</time>
            <span>•</span>
            <span>{blog.readTime}</span>
            {blog.location && (
              <>
                <span>•</span>
                <span>{blog.location}</span>
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
                <StyledArticleContent htmlContent={blog.content} />
              </article>

              <div className="mt-12 pt-8 border-t border-[var(--border)]">
                <Link
                  href="/blog"
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
                  View all insights
                </Link>
              </div>
            </div>

            {/* Right – sidebar (1/3 width) */}
            <div className="space-y-6">
              <BlogSidebarForm />
              <QuickContactSection />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

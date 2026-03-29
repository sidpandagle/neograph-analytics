import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getReports, getBlogsByCategory, getPressReleasesByCategory, isApiError } from '@/lib/api';
import { ReportsListingClient } from '@/components/reports';
import IndustryHero from '@/components/reports/IndustryHero';
import IndustryContentPreview from '@/components/industry/IndustryContentPreview';
import categories from '@/data/categories.json';

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<Record<string, never>>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = categories.find((c) => c.slug === categorySlug);

  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${category.name} Market Research Reports`,
    description: category.description,
    keywords: [
      `${category.name} market research`,
      `${category.name} reports`,
      `${category.name} industry analysis`,
    ],
    alternates: {
      canonical: `/industry/${category.slug}`,
    },
  };
}

export const revalidate = 300;
export const fetchCache = 'default-cache';

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const categoryData = categories.find((c) => c.slug === category);

  if (!categoryData) {
    notFound();
  }

  const response = await getReports({
    status: 'published',
    category,
    page: 1,
    limit: 8,
    sort_by: 'publish_date_desc',
  });

  if (isApiError(response)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Unable to Load Reports</h2>
          <p className="text-gray-600">{response.message}</p>
          <Link
            href={`/industry/${category}`}
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </Link>
        </div>
      </div>
    );
  }

  const totalItems = response.meta?.totalItems ?? response.data.length;

  return (
    <>
      <IndustryHero totalItems={totalItems} activeCategory={categoryData} />
      <Suspense fallback={null}>
        <ContentPreviewSection categorySlug={category} />
      </Suspense>
      <ReportsListingClient
        reports={response.data}
        activeCategorySlug={category}
        totalItems={totalItems}
        totalPages={response.meta?.totalPages ?? 1}
      />
    </>
  );
}

async function ContentPreviewSection({ categorySlug }: { categorySlug: string }) {
  const [blogsResponse, pressReleasesResponse] = await Promise.all([
    getBlogsByCategory(categorySlug, { page: 1, limit: 2 }),
    getPressReleasesByCategory(categorySlug, { page: 1, limit: 2 }),
  ]);

  const blogs = isApiError(blogsResponse) ? [] : blogsResponse.data;
  const pressReleases = isApiError(pressReleasesResponse) ? [] : pressReleasesResponse.data;

  return <IndustryContentPreview blogs={blogs} pressReleases={pressReleases} />;
}

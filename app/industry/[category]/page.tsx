import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getReports, isApiError } from '@/lib/api';
import { ReportsListingClient } from '@/components/reports';
import ReportsSkeleton from '@/components/reports/ReportsSkeleton';
import categories from '@/data/categories.json';

const ITEMS_PER_PAGE = 10;

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
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

async function CategoryReportsContent({
  categorySlug,
  page,
}: {
  categorySlug: string;
  page: number;
}) {
  const response = await getReports({
    status: 'published',
    category: categorySlug,   // backend reads ?category=<slug>
    page,
    limit: ITEMS_PER_PAGE,
  });

  if (isApiError(response)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Unable to Load Reports</h2>
          <p className="text-gray-600">{response.message}</p>
          <Link
            href={`/industry/${categorySlug}`}
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </Link>
        </div>
      </div>
    );
  }

  const currentPage = response.meta?.currentPage ?? page;
  const totalPages = response.meta?.totalPages ?? 1;
  const totalItems = response.meta?.totalItems ?? response.data.length;

  return (
    <ReportsListingClient
      reports={response.data}
      activeCategorySlug={categorySlug}
      currentPage={currentPage}
      totalPages={totalPages}
      totalItems={totalItems}
    />
  );
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category } = await params;
  const { page: pageParam } = await searchParams;
  const categoryData = categories.find((c) => c.slug === category);

  if (!categoryData) {
    notFound();
  }

  const page = Math.max(1, parseInt(pageParam ?? '1', 10) || 1);

  return (
    <Suspense fallback={<ReportsSkeleton />}>
      <CategoryReportsContent
        categorySlug={category}
        page={page}
      />
    </Suspense>
  );
}

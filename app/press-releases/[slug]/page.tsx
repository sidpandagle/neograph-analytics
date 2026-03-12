import { Suspense } from "react";
import { notFound } from "next/navigation";
import PressReleaseListingClient from "@/components/press-releases/PressReleaseListingClient";
import { getPressReleasesByCategory, getCategories, isApiError } from "@/lib/api";
import PressReleasesLoading from "@/app/press-releases/loading";
import type { Metadata } from "next";

export const revalidate = 300;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const response = await getCategories({ limit: 200 });
  if (isApiError(response) || !response.data) return [];
  return response.data.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const response = await getCategories({ limit: 200 });
  const categoryName = isApiError(response) || !response.data
    ? slug
    : (response.data.find((c) => c.slug === slug)?.name ?? slug);

  return {
    title: `${categoryName} Press Releases | Healthcare Foresights`,
    description: `Latest press releases and announcements on ${categoryName} from Healthcare Foresights.`,
    alternates: {
      canonical: `/press-releases/${slug}`,
    },
  };
}

async function PressReleaseCategoryContent({ categorySlug }: { categorySlug: string }) {
  const response = await getPressReleasesByCategory(categorySlug, { limit: 1000 });

  if (isApiError(response)) {
    console.error("Failed to fetch press releases by category:", response.message);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Unable to Load Press Releases</h2>
          <p className="text-gray-600">{response.message}</p>
        </div>
      </div>
    );
  }

  if (response.data.length === 0) {
    notFound();
  }

  return (
    <PressReleaseListingClient
      pressReleases={response.data}
      totalItems={response.data.length}
      activeCategorySlug={categorySlug}
    />
  );
}

export default async function PressReleaseCategoryPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <Suspense fallback={<PressReleasesLoading />}>
      <PressReleaseCategoryContent categorySlug={slug} />
    </Suspense>
  );
}

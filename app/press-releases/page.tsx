import { Suspense } from "react";
import PressReleaseListingClient from "@/components/press-releases/PressReleaseListingClient";
import { getPressReleases, isApiError } from "@/lib/api";
import PressReleasesLoading from "./loading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare Press Releases & Industry News",
  description: "Stay updated with the latest healthcare press releases, research announcements, and industry developments.",
  keywords: ["healthcare press releases", "healthcare news", "industry announcements", "healthcare market updates"],
  alternates: {
    canonical: '/press-releases',
  },
};

export const revalidate = 300;

async function PressReleasesContent() {
  const response = await getPressReleases({
    status: 'published',
    page: 1,
    limit: 8,
    sort_by: 'publish_date_desc',
  });

  if (isApiError(response)) {
    console.error('Failed to fetch press releases:', response.message);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Unable to Load Press Releases</h2>
          <p className="text-gray-600">{response.message}</p>
        </div>
      </div>
    );
  }

  const totalItems = response.meta?.totalItems ?? response.data.length;
  const totalPages = response.meta?.totalPages ?? 1;

  return (
    <PressReleaseListingClient
      pressReleases={response.data}
      totalItems={totalItems}
      totalPages={totalPages}
    />
  );
}

export default function PressReleasesPage() {
  return (
    <Suspense fallback={<PressReleasesLoading />}>
      <PressReleasesContent />
    </Suspense>
  );
}

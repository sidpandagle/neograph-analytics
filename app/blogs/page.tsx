import { Suspense } from "react";
import BlogListingClient from "@/components/blog/BlogListingClient";
import { getBlogs, isApiError } from "@/lib/api";
import BlogLoading from "@/app/blog/loading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Healthcare Insights Blog | Trends, News & Analysis",
  description: "Read expert blogs on healthcare trends, innovations, policy updates, market developments, and industry insights.",
  keywords: ["healthcare blog", "healthcare insights", "healthcare trends", "medical industry news", "healthcare analysis"],
  alternates: {
    canonical: '/blogs',
  },
};

export const revalidate = 300;

async function BlogsContent() {
  const response = await getBlogs({ status: 'published', page: 1, limit: 8, sort_by: 'publish_date_desc' });

  if (isApiError(response)) {
    console.error('Failed to fetch blogs:', response.message);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Unable to Load Articles</h2>
          <p className="text-gray-600">{response.message}</p>
        </div>
      </div>
    );
  }

  const totalItems = response.meta?.totalItems ?? response.data.length;
  const totalPages = response.meta?.totalPages ?? 1;

  return (
    <BlogListingClient
      blogs={response.data}
      totalItems={totalItems}
      totalPages={totalPages}
    />
  );
}

export default function BlogsPage() {
  return (
    <Suspense fallback={<BlogLoading />}>
      <BlogsContent />
    </Suspense>
  );
}

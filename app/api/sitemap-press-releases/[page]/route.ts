import { NextResponse } from 'next/server';
import { getPressReleases } from '@/lib/api/press-releases';

const BASE_URL = 'https://www.healthcareforesights.com';
const ITEMS_PER_SITEMAP = 1000;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ page?: string }> }
) {
  const { page: pageParam } = await params;
  const page = parseInt(pageParam ?? '', 10);

  if (isNaN(page) || page < 1) {
    return new NextResponse('Not Found', { status: 404 });
  }

  try {
    const pressReleasesResponse = await getPressReleases({
      status: 'published',
      page,
      limit: ITEMS_PER_SITEMAP,
    });

    if (!pressReleasesResponse.success || !pressReleasesResponse.data) {
      console.error('Error fetching press releases for sitemap');
      return new NextResponse('Error generating sitemap', { status: 500 });
    }

    if (pressReleasesResponse.data.length === 0) {
      return new NextResponse('Not Found', { status: 404 });
    }

    const pressReleaseUrls = pressReleasesResponse.data.map((pressRelease) => ({
      url: `${BASE_URL}/press-release/${pressRelease.slug}`,
      lastModified: new Date(pressRelease.date).toISOString(),
      changeFrequency: 'daily',
      priority: 0.6,
    }));

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pressReleaseUrls
  .map(
    (item) => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastModified}</lastmod>
    <changefreq>${item.changeFrequency}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating press releases sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}

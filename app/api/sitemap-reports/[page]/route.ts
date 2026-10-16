import { NextResponse } from 'next/server';
import { getReportSitemapEntries } from '@/lib/api/reports';

const BASE_URL = 'https://www.neographanalytics.com';
const ITEMS_PER_SITEMAP = 500;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ page?: string }> }
) {
  const { page: pageParam } = await params;
  const page = parseInt(pageParam ?? '', 10);

  if (isNaN(page) || page < 1) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const allReports = await getReportSitemapEntries();
  const startIndex = (page - 1) * ITEMS_PER_SITEMAP;
  const pageReports = allReports.slice(startIndex, startIndex + ITEMS_PER_SITEMAP);

  if (pageReports.length === 0) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const reportUrls = pageReports.map((report) => ({
    url: `${BASE_URL}/reports/${report.slug}`,
    lastModified: new Date(`${report.year}-01-01`).toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${reportUrls
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
}

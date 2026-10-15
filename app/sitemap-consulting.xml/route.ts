import { NextResponse } from 'next/server';
import { getAllConsultingServices } from '@/lib/api/consulting';

const BASE_URL = 'https://www.neographanalytics.com';

export async function GET() {
  try {
    // Get dynamic consulting services from JSON
    const consultingServices = await getAllConsultingServices();

    // No hub entry: /consulting has no page of its own and now redirects to
    // /services, which sitemap-pages already lists. Advertising a redirect
    // here would just hand crawlers a URL that never resolves to content.

    // Dynamic consulting service pages from /consulting/[slug]
    const dynamicConsultingPages = consultingServices.map((service) => ({
      url: `${BASE_URL}/consulting/${service.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    const allPages = dynamicConsultingPages;

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
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
    console.error('Error generating consulting sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}

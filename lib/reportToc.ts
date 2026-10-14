/**
 * Server-side table of contents for a report.
 *
 * `useGeneratedTOC` scans the DOM after hydration, so the TOC was absent from the
 * server HTML and the layout jumped from a 9-column to a 6-column main area once
 * JS ran. Building the list here means the reading navigation is present in the
 * first paint, survives with JS disabled, and causes no layout shift.
 *
 * The conditions below mirror the render guards in `JsonReportSections` exactly;
 * if a section is added there, add it here too or the TOC will point at an anchor
 * that does not exist.
 */
import type { JsonReport } from '@/lib/jsonReports';
import type { SidebarTOCItem } from '@/lib/toc-utils';

export function buildReportTOC(report: JsonReport): SidebarTOCItem[] {
  const items: SidebarTOCItem[] = [];
  const add = (id: string, title: string) => items.push({ id, title, level: 2 });

  if (report.executive_summary) add('executive-summary', 'Executive Summary');
  if (report.key_highlights?.length) add('key-highlights', 'Key Highlights');

  // Market Overview and the forecast/dynamics/segmentation blocks render
  // unconditionally in JsonReportSections.
  add('json-overview', 'Market Overview');
  add('charts', 'Market Forecast & Data');
  add('market-dynamics', 'Market Dynamics');
  add('segmentation', 'Market Segmentation');

  if (report.regional_analysis?.length) add('regional', 'Regional Analysis');
  if (report.competitive_landscape?.length) add('competitive', 'Competitive Landscape');
  if (report.recent_developments?.length) add('developments', 'Recent Developments');
  if (report.regulatory_landscape?.length) add('regulatory', 'Regulatory Landscape');

  const method = report.research_methodology;
  if (
    method &&
    (method.primary_research?.length ||
      method.secondary_research?.length ||
      method.data_validation)
  ) {
    add('methodology', 'Research Methodology');
  }

  if (report.reader_takeaways?.length) add('takeaways', 'Strategic Takeaways');
  if (report.faqs?.length) add('faq', 'Frequently Asked Questions');

  return items;
}

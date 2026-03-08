// Report API client functions

import { apiFetch, buildQueryString, type ApiResponse, type PaginationMeta } from './config';
import type {
  ReportFilters,
  ReportsListData,
  ReportDetailData,
  SearchResultsData,
  Report,
  ApiReport,
} from './reports.types';
import { mapApiReportsToReports, mapApiReportToReport } from './mappers';

/**
 * Fetch all reports from the API
 *
 * @param filters - Optional filters (page, limit, status, category, etc.)
 * @returns Promise<ApiResponse<Report[]>>
 *
 * @example
 * const response = await getReports({ status: 'published', limit: 100 });
 * if (!isApiError(response)) {
 *   const reports = response.data;
 * }
 */
export async function getReports(
  filters?: ReportFilters
): Promise<ApiResponse<Report[]>> {
  const params: Record<string, string | number | boolean | undefined> = {
    page: filters?.page || 1,
    limit: filters?.limit || 100,
    status: filters?.status || 'published',
    // Backend reads ?category=<slug>; prefer slug over numeric id
    ...(filters?.category && { category: filters.category }),
    ...(filters?.report_type && { report_type: filters.report_type }),
    ...(filters?.geography && { geography: filters.geography }),
    ...(filters?.search && { search: filters.search }),
    ...(filters?.is_featured !== undefined && { is_featured: filters.is_featured }),
  };

  const queryString = buildQueryString(params);
  const response = await apiFetch<ReportsListData>(`/api/v1/reports${queryString}`);

  // If error, return as-is
  if (!response.success) {
    return response;
  }

  // Handle different response structures
  let apiReports: ApiReport[];

  // Check if data is directly the array or nested
  if (Array.isArray(response.data)) {
    // API returned array directly
    apiReports = response.data;
  } else if (response.data && typeof response.data === 'object' && 'data' in response.data) {
    // API returned { data: [...], meta: {...} }
    apiReports = (response.data as { data: ApiReport[] }).data;
  } else {
    console.error('Unexpected response structure:', response.data);
    return {
      success: false,
      error: 'invalid_response',
      message: 'API returned unexpected response structure',
    };
  }

  // Map API reports to UI format
  const mappedReports = mapApiReportsToReports(apiReports);

  // Backend meta is at the top-level response with snake_case fields:
  // { page, limit, total, total_pages } — map to frontend PaginationMeta
  const rawMeta = (response as unknown as { meta?: { page?: number; limit?: number; total?: number; total_pages?: number } }).meta;
  const mappedMeta: PaginationMeta | undefined = rawMeta
    ? {
        currentPage: rawMeta.page ?? 1,
        totalPages: rawMeta.total_pages ?? 1,
        totalItems: rawMeta.total ?? 0,
        itemsPerPage: rawMeta.limit ?? 10,
        hasNextPage: (rawMeta.page ?? 1) < (rawMeta.total_pages ?? 1),
        hasPreviousPage: (rawMeta.page ?? 1) > 1,
      }
    : undefined;

  return {
    success: true,
    data: mappedReports,
    meta: mappedMeta,
  };
}

/**
 * Fetch a single report by slug
 *
 * @param slug - Report slug (e.g., 'global-ai-market-2024')
 * @returns Promise<ApiResponse<Report>>
 *
 * @example
 * const response = await getReportBySlug('global-ai-market-2024');
 * if (!isApiError(response)) {
 *   const report = response.data;
 * }
 */
export async function getReportBySlug(slug: string): Promise<ApiResponse<Report>> {
  const response = await apiFetch<ReportDetailData>(`/api/v1/reports/${slug}`);

  // If error, return as-is
  if (!response.success) {
    return response;
  }

  // Handle different response structures
  let apiReport: ApiReport;

  if (response.data && typeof response.data === 'object') {
    // Check if data is nested or direct
    if ('data' in response.data) {
      apiReport = (response.data as { data: ApiReport }).data;
      // console.log(apiReport);
    } else {
      // Assume response.data is the report itself
      apiReport = response.data;
      // console.log(apiReport);
    }
  } else {
    console.error('Unexpected response structure for getReportBySlug:', response.data);
    return {
      success: false,
      error: 'invalid_response',
      message: 'API returned unexpected response structure',
    };
  }

  // Map API report to UI format
  const mappedReport = mapApiReportToReport(apiReport);

  return {
    success: true,
    data: mappedReport,
  };
}

/**
 * Search reports by query string
 *
 * @param query - Search query string
 * @param page - Page number (default: 1)
 * @param limit - Items per page (default: 50)
 * @returns Promise<ApiResponse<Report[]>>
 *
 * @example
 * const response = await searchReports('artificial intelligence', 1, 20);
 * if (!isApiError(response)) {
 *   const results = response.data;
 * }
 */
export async function searchReports(
  query: string,
  page: number = 1,
  limit: number = 50
): Promise<ApiResponse<Report[]>> {
  const params = {
    q: query,
    page,
    limit,
  };

  const queryString = buildQueryString(params);
  const response = await apiFetch<SearchResultsData>(`/api/v1/search${queryString}`);

  // If error, return as-is
  if (!response.success) {
    return response;
  }

  // Handle different response structures
  let apiReports: ApiReport[];

  if (Array.isArray(response.data)) {
    apiReports = response.data;
  } else if (response.data && typeof response.data === 'object' && 'data' in response.data) {
    apiReports = (response.data as { data: ApiReport[] }).data;
  } else {
    console.error('Unexpected search response structure:', response.data);
    return {
      success: false,
      error: 'invalid_response',
      message: 'Search API returned unexpected response structure',
    };
  }

  // Map API reports to UI format
  const mappedReports = mapApiReportsToReports(apiReports);

  const rawSearchMeta = (response as unknown as { meta?: { page?: number; limit?: number; total?: number; total_pages?: number } }).meta;
  const searchMappedMeta: PaginationMeta | undefined = rawSearchMeta
    ? {
        currentPage: rawSearchMeta.page ?? 1,
        totalPages: rawSearchMeta.total_pages ?? 1,
        totalItems: rawSearchMeta.total ?? 0,
        itemsPerPage: rawSearchMeta.limit ?? 50,
        hasNextPage: (rawSearchMeta.page ?? 1) < (rawSearchMeta.total_pages ?? 1),
        hasPreviousPage: (rawSearchMeta.page ?? 1) > 1,
      }
    : undefined;

  return {
    success: true,
    data: mappedReports,
    meta: searchMappedMeta,
  };
}

// Press Release API client functions

import { apiFetch, buildQueryString, type ApiResponse, type PaginationMeta } from './config';
import type {
  PressReleaseFilters,
  PressReleasesListData,
  PressReleaseDetailData,
  PressRelease,
  ApiPressRelease,
} from './press-releases.types';
import { mapApiPressReleasesToPressReleases, mapApiPressReleaseToPressRelease } from './mappers';

/**
 * Fetch all press releases from the API
 *
 * @param filters - Optional filters (page, limit, status, categoryId, etc.)
 * @returns Promise<ApiResponse<PressRelease[]>>
 *
 * @example
 * const response = await getPressReleases({ status: 'published', limit: 100 });
 * if (!isApiError(response)) {
 *   const pressReleases = response.data;
 * }
 */
export async function getPressReleases(
  filters?: PressReleaseFilters
): Promise<ApiResponse<PressRelease[]>> {
  const params: Record<string, string | number | boolean | undefined> = {
    page: filters?.page || 1,
    limit: filters?.limit || 100,
    status: filters?.status || 'published',
    ...(filters?.category && { category: filters.category }),
    ...(filters?.categoryId && { categoryId: filters.categoryId }),
    ...(filters?.authorId && { authorId: filters.authorId }),
    ...(filters?.search && { search: filters.search }),
  };

  const queryString = buildQueryString(params);
  const response = await apiFetch<PressReleasesListData>(`/api/v1/press-releases${queryString}`);

  // If error, return as-is
  if (!response.success) {
    return response;
  }

  // Handle different response structures
  let apiPressReleases: ApiPressRelease[];

  // Check if data is directly the array or nested
  if (Array.isArray(response.data)) {
    // API returned array directly
    apiPressReleases = response.data;
  } else if (response.data && typeof response.data === 'object' && 'pressReleases' in response.data) {
    // API returned { pressReleases: [...], page, limit, total, totalPages }
    apiPressReleases = (response.data as { pressReleases: ApiPressRelease[] }).pressReleases;
  } else {
    console.error('Unexpected response structure:', response.data);
    return {
      success: false,
      error: 'invalid_response',
      message: 'API returned unexpected response structure',
    };
  }

  // Map API press releases to UI format
  const mappedPressReleases = mapApiPressReleasesToPressReleases(apiPressReleases);

  return {
    success: true,
    data: mappedPressReleases,
    meta: (response.data as { meta?: PaginationMeta })?.meta,
  };
}

/**
 * Fetch a single press release by slug
 *
 * @param slug - Press release slug (e.g., 'global-cancer-therapeutics-market-reaches-150-billion')
 * @returns Promise<ApiResponse<PressRelease>>
 *
 * @example
 * const response = await getPressReleaseBySlug('global-cancer-therapeutics-market-reaches-150-billion');
 * if (!isApiError(response)) {
 *   const pressRelease = response.data;
 * }
 */
export async function getPressReleaseBySlug(slug: string): Promise<ApiResponse<PressRelease>> {
  const response = await apiFetch<PressReleaseDetailData>(`/api/v1/press-releases/slug/${slug}`);

  // If error, return as-is
  if (!response.success) {
    return response;
  }

  // Handle different response structures
  let apiPressRelease: ApiPressRelease;

  if (response.data && typeof response.data === 'object') {
    // Check if data is nested or direct
    if ('pressRelease' in response.data) {
      apiPressRelease = (response.data as { pressRelease: ApiPressRelease }).pressRelease;
    } else {
      // Assume response.data is the press release itself
      apiPressRelease = response.data;
    }
  } else {
    console.error('Unexpected response structure for getPressReleaseBySlug:', response.data);
    return {
      success: false,
      error: 'invalid_response',
      message: 'API returned unexpected response structure',
    };
  }

  // Map API press release to UI format
  const mappedPressRelease = mapApiPressReleaseToPressRelease(apiPressRelease);

  return {
    success: true,
    data: mappedPressRelease,
  };
}

/**
 * Search press releases by query string
 *
 * @param query - Search query string
 * @param page - Page number (default: 1)
 * @param limit - Items per page (default: 50)
 * @returns Promise<ApiResponse<PressRelease[]>>
 *
 * @example
 * const response = await searchPressReleases('cancer therapeutics', 1, 20);
 * if (!isApiError(response)) {
 *   const results = response.data;
 * }
 */
export async function searchPressReleases(
  query: string,
  page: number = 1,
  limit: number = 50
): Promise<ApiResponse<PressRelease[]>> {
  return getPressReleases({
    search: query,
    page,
    limit,
    status: 'published',
  });
}

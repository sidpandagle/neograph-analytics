import { supabase } from '@/lib/supabase/client';
import type { ApiAuthor } from './common.types';
import type { Report, ReportFilters } from './reports.types';
import type { ApiResponse } from './config';

/**
 * Author URLs are positional: /authors/1 is the first row of
 * `neograph_team_members` ordered by id, not the row whose id is 1. The table's
 * real ids are strings ("tm001"), so they cannot be used as the numeric route
 * param directly.
 *
 * Two consequences worth knowing before editing the team table:
 *   - `generateStaticParams` in app/authors/[id]/page.tsx builds the same
 *     1..N range the same way. The two must stay in lockstep.
 *   - Removing a member shifts every author after them onto a different URL,
 *     silently repointing published bylines. Adding one at the end is safe.
 *
 * This previously selected `*` across the whole table on every render to return
 * a single author -- bios and image URLs included -- which is pure waste on
 * metered egress. It now fetches exactly the one row and the four columns the
 * response actually uses.
 */
export async function getAuthorById(id: number): Promise<ApiResponse<ApiAuthor>> {
  const index = id - 1;
  if (!Number.isInteger(index) || index < 0) {
    return { success: false, error: 'not_found', message: 'Author not found' };
  }

  const { data, error } = await supabase
    .from('neograph_team_members')
    .select('name,role,short_bio,image_url')
    .order('id')
    .range(index, index)
    .maybeSingle();

  if (error) return { success: false, error: 'fetch_error', message: error.message };
  if (!data) return { success: false, error: 'not_found', message: 'Author not found' };

  const m = data;
  return {
    success: true,
    data: {
      id,
      name: m.name,
      role: m.role,
      bio: m.short_bio,
      imageUrl: m.image_url || undefined,
      createdAt: '',
      updatedAt: '',
    },
  };
}

export async function getReportsByAuthorId(
  _authorId: number,
  _filters?: ReportFilters
): Promise<ApiResponse<Report[]>> {
  return { success: true, data: [] };
}

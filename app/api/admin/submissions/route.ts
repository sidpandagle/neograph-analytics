/**
 * The admin read of `form_submissions`.
 *
 * Two gates, in order:
 *  1. A valid Supabase access token in `Authorization: Bearer …`, verified
 *     against the Auth server — not merely decoded here, so a forged or
 *     expired JWT fails.
 *  2. The token's email must be in ADMIN_EMAILS. Supabase Auth would otherwise
 *     let anyone who can create an account in the project read every lead; the
 *     allowlist is what makes "signed in" mean "allowed". With ADMIN_EMAILS
 *     unset the route denies everyone, which is the safe direction to fail.
 *
 * Only after both does the service-role query run (lib/api/submissions).
 */
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { listSubmissions } from '@/lib/api/submissions';
import { FORM_TYPES, type FormType } from '@/lib/api/submissions.types';

// Leads must never be cached or statically rendered.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

function deny(message: string, status = 401) {
  return NextResponse.json({ success: false, error: 'unauthorized', message }, { status });
}

export async function GET(request: NextRequest) {
  const header = request.headers.get('authorization') || '';
  const token = header.toLowerCase().startsWith('bearer ') ? header.slice(7).trim() : '';
  if (!token) return deny('Sign in to view submissions.');

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    return NextResponse.json(
      { success: false, error: 'not_configured', message: 'Supabase is not configured on the server.' },
      { status: 500 }
    );
  }

  // A throwaway client: no session of its own, it just asks Auth who the token
  // belongs to.
  const auth = createClient(url, anonKey, { auth: { persistSession: false } });
  const { data: userData, error: authError } = await auth.auth.getUser(token);
  const email = userData?.user?.email?.toLowerCase();
  if (authError || !email) return deny('Your session has expired. Sign in again.');

  const allowed = adminEmails();
  if (!allowed.length) {
    console.error('[admin/submissions] ADMIN_EMAILS is not set — refusing every request.');
    return deny('No administrator accounts are configured.', 403);
  }
  if (!allowed.includes(email)) return deny('This account is not allowed to view submissions.', 403);

  const params = request.nextUrl.searchParams;
  const rawType = params.get('formType') || '';
  const formType = FORM_TYPES.includes(rawType as FormType) ? (rawType as FormType) : undefined;

  try {
    const page = await listSubmissions({
      page: Number(params.get('page')) || 1,
      limit: Number(params.get('limit')) || 50,
      formType,
      search: params.get('search') || undefined,
    });
    return NextResponse.json({ success: true, data: page });
  } catch (err) {
    console.error('[admin/submissions] query failed:', err);
    return NextResponse.json(
      { success: false, error: 'query_failed', message: 'Could not load submissions.' },
      { status: 500 }
    );
  }
}

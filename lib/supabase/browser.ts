'use client';

/**
 * Browser Supabase client, for the admin login only.
 *
 * The public site reads content server-side through lib/supabase/client.ts,
 * which sets `persistSession: false`. The admin page needs the opposite: the
 * session must survive a reload, so this client keeps it in localStorage and
 * refreshes it. Anon key only — every privileged read happens in
 * /api/admin/submissions behind a token check.
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

export function browserSupabase(): SupabaseClient {
  if (client) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are not set.');
  }
  client = createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
      storageKey: 'neograph-admin-auth',
    },
  });
  return client;
}

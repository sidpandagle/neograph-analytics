import { NextRequest, NextResponse } from 'next/server';

interface ActiveRedirect {
  id: number;
  sourceUrl: string;
  destinationUrl: string | null;
  redirectType: number;
}

// Module-level cache — persists within Edge worker instance, ~60s TTL
let cache: ActiveRedirect[] = [];
let cacheTime = 0;
const TTL = 60_000;

async function getRedirects(): Promise<ActiveRedirect[]> {
  const now = Date.now();
  if (now - cacheTime < TTL && cache.length > 0) return cache;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/redirects/active`,
      { signal: AbortSignal.timeout(3000) }
    );
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      cache = json.data;
      cacheTime = now;
    }
  } catch {
    // Silently fall back to stale cache on network error
  }

  return cache;
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const redirects = await getRedirects();
  const match = redirects.find(r => r.sourceUrl === path);

  if (match) {
    // Fire-and-forget hit count increment — do not await
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/redirects/hit/${match.id}`,
      { method: 'POST' }
    ).catch(() => {});

    // 410 Gone / 451 Unavailable — no destination, return status only
    if (match.redirectType === 410 || match.redirectType === 451) {
      return new NextResponse(null, { status: match.redirectType });
    }

    return NextResponse.redirect(
      new URL(match.destinationUrl!, request.url),
      { status: match.redirectType }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|api/|.*\\.\\w+$).*)'],
};

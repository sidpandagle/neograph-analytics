'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * Reads the named query parameters and hands them up, once, on mount.
 *
 * This exists only so that `useSearchParams` lives in a component small
 * enough to lose nothing when it is excluded from the prerender. Next.js
 * opts a statically rendered route out of server rendering up to the
 * nearest Suspense boundary above any `useSearchParams` call, so reading
 * the params inside a page's own component meant the server shipped the
 * skeleton and nothing else -- no <h1>, no content, no links. Isolated
 * here behind its own boundary, only this null-rendering component is
 * client-only, and the page around it renders on the server as intended.
 *
 * Render it inside its own <Suspense fallback={null}>.
 */
export default function UrlParams({
  keys,
  onParams,
}: {
  keys: readonly string[];
  onParams: (values: Record<string, string | null>) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const values: Record<string, string | null> = {};
    for (const key of keys) values[key] = searchParams.get(key);
    onParams(values);
    // `keys` is a literal at every call site; depending on the array
    // identity would re-fire this on each render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, onParams]);

  return null;
}

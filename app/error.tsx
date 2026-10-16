"use client"

import { useEffect } from "react";
import Link from "next/link";

/**
 * Route-level error boundary. Without this file an unhandled render error in
 * any route segment falls through to Next.js's own error screen — a bare stack
 * trace in development and an unbranded "Application error" in production.
 *
 * The reset() call re-renders the segment, which is worth offering: most
 * failures here are a Supabase fetch that timed out, and a retry succeeds.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Server-side digest only; the message is not surfaced to the reader.
    console.error("Route error", error.digest ?? "", error.message);
  }, [error]);

  return (
    <main className="desk">
      <div className="mx-auto max-w-[56ch] px-6 py-24 text-center">
        <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--muted-foreground)]">
          Something went wrong
        </p>
        <h1 className="mt-3 text-[30px] font-semibold leading-[1.2] tracking-[-0.02em] text-[var(--foreground)]">
          This page could not be rendered
        </h1>
        <p className="mt-4 text-[15px] leading-[1.75] text-[var(--muted-foreground)]">
          The content behind this page did not load. It is usually transient —
          retrying works more often than not.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg bg-[var(--cmi-primary)] px-5 py-2.5 text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            Try again
          </button>
          <Link
            href="/reports"
            className="rounded-lg border border-[var(--border)] px-5 py-2.5 text-[14px] font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--muted)]"
          >
            Browse research
          </Link>
        </div>
        {error.digest && (
          <p className="mt-8 font-mono text-[12px] text-[var(--muted-foreground)]">
            Reference: {error.digest}
          </p>
        )}
      </div>
    </main>
  );
}

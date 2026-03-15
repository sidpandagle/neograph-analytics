'use client';

export default function ReportError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center px-4 text-center">
      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">
        Unable to load report
      </h2>
      <p className="text-[var(--muted-foreground)] mb-6 max-w-md">
        There was a problem fetching this report. Please try again.
      </p>
      <button
        onClick={reset}
        className="px-6 py-2.5 rounded-lg bg-[var(--primary)] text-white font-medium hover:opacity-90 transition-opacity"
      >
        Try again
      </button>
    </div>
  );
}

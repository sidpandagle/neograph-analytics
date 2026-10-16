"use client"

import { useEffect } from "react";

/**
 * Last-resort boundary: catches errors thrown in the root layout itself, which
 * `app/error.tsx` cannot. It replaces the whole document, so it has to render
 * its own <html> and <body> and cannot rely on the layout's fonts or theme
 * tokens — the styles here are deliberately inline and self-contained.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Root layout error", error.digest ?? "", error.message);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "2rem",
          background: "#ffffff",
          color: "#0b1220",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
        }}
      >
        <main style={{ maxWidth: "52ch", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.75rem", lineHeight: 1.2, margin: 0 }}>
            NeoGraph Analytics is temporarily unavailable
          </h1>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "#4b5563" }}>
            The site failed to start rendering. Reloading usually resolves it.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "1.5rem",
              padding: "0.7rem 1.25rem",
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "#ffffff",
              background: "#1541E3",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
            }}
          >
            Reload
          </button>
          {error.digest && (
            <p style={{ marginTop: "2rem", fontSize: "0.75rem", color: "#6b7280" }}>
              Reference: {error.digest}
            </p>
          )}
        </main>
      </body>
    </html>
  );
}

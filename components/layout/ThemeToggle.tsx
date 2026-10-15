'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

/**
 * Light/dark switch.
 *
 * The theme is applied before first paint by the inline script in
 * app/layout.tsx, so this component never decides the initial theme — it only
 * reads back what is already on <html> and lets the reader change it. Doing it
 * the other way round would flash the wrong theme on every navigation.
 *
 * A reader who has never chosen follows their OS setting, and keeps following
 * it if they change it later. Once they choose here, the choice is stored and
 * the OS no longer overrides it.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }, []);

  function apply(next: Theme) {
    document.documentElement.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* Private mode and blocked site data both throw here. The theme still
         applies for this page view; it just will not be remembered. */
    }
    setTheme(next);
  }

  // Render nothing until mounted: the server cannot know the reader's theme,
  // so committing to an icon here would guarantee a hydration mismatch.
  if (theme === null) {
    return <div className="h-9 w-9 shrink-0" aria-hidden="true" />;
  }

  const next: Theme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={() => apply(next)}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-pill border border-[var(--cmi-line)] text-[var(--cmi-body)] transition-colors hover:border-[var(--cmi-primary)] hover:text-[var(--cmi-primary)]"
    >
      {theme === 'dark' ? (
        // sun
        <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path strokeLinecap="round" d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
        </svg>
      ) : (
        // moon
        <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
        </svg>
      )}
    </button>
  );
}

export default ThemeToggle;

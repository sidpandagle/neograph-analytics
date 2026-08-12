import Link from "next/link";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

/**
 * Wordmark in Outfit — the display face. On light surfaces the name
 * carries the primary blue; on ink panels it reverses to white.
 */
export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      className={`group inline-flex shrink-0 items-baseline gap-2 whitespace-nowrap ${className}`}
      aria-label="NeoGraph Analytics — home"
    >
      <span
        className={`font-display text-[19px] font-bold tracking-[-0.02em] transition-opacity duration-200 group-hover:opacity-80 md:text-[20px] ${
          isLight ? "text-white" : "text-[var(--cmi-primary)]"
        }`}
      >
        NeoGraph Analytics
      </span>
      <span
        className={`hidden text-[11px] font-semibold tracking-[0.08em] sm:inline ${
          isLight ? "text-[var(--cmi-on-blue-dim)]" : "text-[var(--cmi-meta)]"
        }`}
      >
        NGA
      </span>
    </Link>
  );
}

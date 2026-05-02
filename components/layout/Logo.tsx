import Link from "next/link";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const textColor = variant === "light" ? "var(--primary-foreground)" : "var(--foreground)";
  const dotColor = "var(--accent)";

  return (
    <Link href="/" className={`inline-flex items-center group ${className}`}>
      <span
        className="text-[18px] font-semibold tracking-[-0.03em] transition-opacity duration-200 group-hover:opacity-70"
        style={{ fontFamily: "var(--font-inter), Inter, system-ui, sans-serif", color: textColor }}
      >
        NeoGraph
        <span style={{ color: dotColor }}>.</span>
        <span style={{ fontWeight: 300 }}>Analytics</span>
      </span>
    </Link>
  );
}

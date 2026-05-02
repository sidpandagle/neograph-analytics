"use client";

import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import Logo from "./Logo";

export default function Header() {
  usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--card)]/95 backdrop-blur-xl border-b border-[var(--border)]" style={{ boxShadow: '0 1px 3px hsl(var(--foreground-hsl) / 0.06)' }}>
      <div className="container mx-auto flex h-[60px] items-center justify-between px-4 md:px-6 gap-2 md:gap-4 w-full">
        <Logo variant="dark" />
        <div className="flex items-center gap-2 ml-auto">
          <Navigation />
        </div>
      </div>
    </header>
  );
}

"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Navigation, { MobileNav } from "./Navigation";
import Logo from "./Logo";

/**
 * The header is itself a panel on the desk — a white pill fixed in place
 * as the page scrolls beneath it. A spacer of matching height sits in
 * normal document flow so the fixed header doesn't overlap the content
 * below it.
 */
export default function Header() {
  const barRef = useRef<HTMLDivElement>(null);
  const [spacerHeight, setSpacerHeight] = useState(0);

  useLayoutEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const updateHeight = () => setSpacerHeight(bar.offsetHeight);
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(bar);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div style={{ height: spacerHeight }} aria-hidden="true" className="mb-4 md:mb-5" />

      <div className="fixed top-4 inset-x-0 z-50 mx-auto w-full max-w-desk px-3.5 md:top-5 md:px-5">
        <header
          ref={barRef}
          className="flex items-center justify-between gap-4 rounded-card border border-[var(--cmi-line)] bg-white/90 px-4 py-2.5 shadow-card backdrop-blur-xl md:px-[22px] md:py-3.5"
        >
          <Logo variant="dark" />

          <Navigation />

          <div className="flex shrink-0 items-center gap-3 md:gap-4">
            <Link
              href="/request-sample"
              className="hidden rounded-pill bg-[var(--cmi-primary)] px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors duration-150 hover:bg-[var(--cmi-primary-pressed)] hover:text-white sm:inline-flex"
            >
              Request Sample
            </Link>
            <MobileNav />
          </div>
        </header>
      </div>
    </>
  );
}

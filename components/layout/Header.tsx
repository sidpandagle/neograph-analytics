"use client";

import Link from "next/link";
import Navigation, { MobileNav } from "./Navigation";
import Logo from "./Logo";
import { CONTACT_INFO } from "@/lib/contact";

/**
 * The header is itself a panel on the desk — a white pill that stays
 * pinned as the page scrolls beneath it.
 */
export default function Header() {
  return (
    <div className="sticky top-3 z-50 mx-auto mb-4 w-full max-w-desk px-3.5 md:top-5 md:mb-5 md:px-5">
      <header className="flex items-center justify-between gap-4 rounded-card border border-[var(--cmi-line)] bg-white/90 px-4 py-2.5 shadow-card backdrop-blur-xl md:px-[22px] md:py-3.5">
        <Logo variant="dark" />

        <Navigation />

        <div className="flex shrink-0 items-center gap-3 md:gap-4">
          <a
            href={`tel:${CONTACT_INFO.offices.usa.phone}`}
            className="hidden text-[13px] font-semibold text-[var(--cmi-idle)] transition-colors hover:text-[var(--cmi-primary)] 2xl:inline"
          >
            {CONTACT_INFO.offices.usa.phoneFormatted}
          </a>
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
  );
}

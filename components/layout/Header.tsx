import Link from "next/link";
import Navigation, { MobileNav } from "./Navigation";
import Logo from "./Logo";

/**
 * The header is a panel on the desk, sitting in normal document flow so it
 * scrolls away with the rest of the page instead of staying pinned.
 */
export default function Header() {
  return (
    <div className="mx-auto w-full max-w-desk px-3.5 pt-4 pb-4 md:px-5 md:pt-5 md:pb-5">
      <header className="flex items-center justify-between gap-4 rounded-card border border-[var(--cmi-line)] bg-white/90 px-4 py-2.5 shadow-card backdrop-blur-xl md:px-[22px] md:py-3.5">
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
  );
}

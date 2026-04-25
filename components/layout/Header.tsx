"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import GoogleTranslate from "./GoogleTranslate";
import { SearchBar } from "@/components/ui";

export default function Header() {
  const pathname = usePathname();
  const isNotReportPage = !pathname.includes("/reports/");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className={`${isNotReportPage ? 'container mx-auto' : ''} flex h-16 items-center justify-between px-4 md:px-6 gap-2 md:gap-4 w-full`}>
        <h2 className="sr-only">Healthcare Foresights</h2>
        <Link href="/" className="flex items-center group flex-shrink-0">
          <Image
            src="/assets/images/logo.png"
            alt="Healthcare Foresights"
            width={180}
            height={50}
            priority
            fetchPriority="high"
            sizes="180px"
            className="h-10 w-auto md:h-10 transform group-hover:scale-105 transition-transform duration-200"
          />
        </Link>

        {/* Search Bar - Only show on non-homepage */}
        {(
          <div className="hidden lg:flex flex-1 max-w-md mx-4 min-w-0">
            <SearchBar
              variant="header"
              placeholder="Search reports..."
              className="w-full"
            />
          </div>
        )}

        <div className="flex items-center">
        <Navigation />

        {/* Language Selector */}
        <div className="ml-2 pl-2 border-l border-slate-200">
          <GoogleTranslate />
        </div>

</div>

      </div>
    </header>
  );
}

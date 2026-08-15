"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import categories from "@/data/categories.json";
import consultingServicesData from "@/data/consulting-services.json";
import MegaMenu from "./MegaMenu";
import ConsultingMenu from "./ConsultingMenu";
import { cn } from "@/lib/utils";
import { ConsultingService } from "@/lib/api/consulting.types";

const navItems = [
  { name: "Blog", href: "/blog" },
  { name: "Press", href: "/press-releases" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

/* The segmented rail: a soft track with a white puck on the active item. */
const railItem =
  "rounded-pill px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-150";
const railActive = "bg-white font-semibold text-[var(--cmi-ink)]";
const railIdle = "text-[var(--cmi-idle)] hover:bg-white hover:text-[var(--cmi-ink)]";

/** Desktop navigation rail. */
export default function Navigation() {
  const pathname = usePathname();
  const consultingServices = consultingServicesData as ConsultingService[];

  return (
    <nav className="mx-auto hidden items-center gap-1.5 rounded-pill bg-[var(--cmi-rail)] p-1.5 xl:flex">
      <Link
        href="/"
        className={cn(railItem, pathname === "/" ? railActive : railIdle)}
      >
        Home
      </Link>

      <MegaMenu categories={categories} isActive={pathname.startsWith("/reports")} />
      <ConsultingMenu
        services={consultingServices}
        isActive={pathname.startsWith("/consulting") || pathname.startsWith("/services")}
      />

      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(railItem, pathname.startsWith(item.href) ? railActive : railIdle)}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}

/** Mobile toggle + drawer, rendered from the header's right-hand group. */
export function MobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const consultingServices = consultingServicesData as ConsultingService[];

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const drawerLink = "rounded-pill px-4 py-2.5 text-[15px] font-medium transition-colors";

  return (
    <>
      <button
        className="flex h-9 w-9 items-center justify-center rounded-pill border border-[var(--cmi-line)] transition-colors hover:border-[var(--cmi-primary)] xl:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <div className="relative h-4 w-4">
          <span
            className={cn(
              "absolute left-0 h-0.5 rounded-pill bg-[var(--cmi-ink)] transition-all duration-300",
              isOpen ? "top-1/2 w-4 -translate-y-1/2 rotate-45" : "top-0.5 w-4"
            )}
          />
          <span
            className={cn(
              "absolute left-0 top-1/2 h-0.5 -translate-y-1/2 rounded-pill bg-[var(--cmi-ink)] transition-all duration-300",
              isOpen ? "w-0 opacity-0" : "w-3 opacity-100"
            )}
          />
          <span
            className={cn(
              "absolute left-0 h-0.5 rounded-pill bg-[var(--cmi-ink)] transition-all duration-300",
              isOpen ? "top-1/2 w-4 -translate-y-1/2 -rotate-45" : "bottom-0.5 w-4"
            )}
          />
        </div>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[var(--cmi-ink)]/25 backdrop-blur-lg xl:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer — an ink panel sliding onto the desk. */}
      <div
        className={cn(
          "fixed right-3 top-[76px] z-50 h-[calc(100vh-96px)] w-[min(320px,calc(100vw-24px))] xl:hidden",
          "overflow-y-auto rounded-panel bg-[var(--cmi-ink)] p-5",
          "transition-[transform,opacity] duration-300 ease-out"
        )}
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(calc(100% + 16px))",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        <nav className="flex flex-col gap-1">
          <Link
            href="/"
            className={cn(drawerLink, pathname === "/" ? "bg-[var(--cmi-primary)] text-white" : "text-white/85 hover:bg-white/10")}
          >
            Home
          </Link>
          <Link
            href="/reports"
            className={cn(drawerLink, pathname === "/reports" ? "bg-[var(--cmi-primary)] text-white" : "text-white/85 hover:bg-white/10")}
          >
            All Reports
          </Link>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                drawerLink,
                pathname.startsWith(item.href)
                  ? "bg-[var(--cmi-primary)] text-white"
                  : "text-white/85 hover:bg-white/10"
              )}
            >
              {item.name}
            </Link>
          ))}

          <Link
            href="/request-sample"
            className="mt-2 rounded-pill bg-white px-4 py-3 text-center text-sm font-semibold text-[var(--cmi-ink)] transition-colors hover:bg-[var(--cmi-chip-blue)] hover:text-[var(--cmi-ink)]"
          >
            Request Sample
          </Link>

          <div className="mt-5 border-t border-[var(--cmi-footer-line)] pt-4">
            <span className="px-4 text-[11.5px] font-bold uppercase tracking-[0.1em] text-[var(--cmi-on-blue-dim)]">
              Consulting &amp; Services
            </span>
            <div className="mt-2 flex flex-col">
              <Link href="/services" className={cn(drawerLink, "text-sm text-white/70 hover:bg-white/10")}>
                All Services
              </Link>
              {consultingServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/consulting/${service.slug}`}
                  className={cn(drawerLink, "text-sm text-[var(--cmi-footer-link)] hover:bg-white/10 hover:text-white")}
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-5 border-t border-[var(--cmi-footer-line)] pt-4">
            <span className="px-4 text-[11.5px] font-bold uppercase tracking-[0.1em] text-[var(--cmi-on-blue-dim)]">
              Industries
            </span>
            <div className="mt-2 flex flex-col">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/reports?category=${category.slug}`}
                  className={cn(drawerLink, "text-sm text-[var(--cmi-footer-link)] hover:bg-white/10 hover:text-white")}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-[var(--cmi-footer-line)] px-4 pt-5">
            <span className="text-[11.5px] font-bold uppercase tracking-[0.1em] text-[var(--cmi-on-blue-dim)]">
              Follow Us
            </span>
            <div className="mt-3 flex gap-4">
              {[
                { href: "https://facebook.com/neographanalytics", Icon: Facebook, label: "Facebook" },
                { href: "https://instagram.com/neographanalytics", Icon: Instagram, label: "Instagram" },
                { href: "https://linkedin.com/company/neographanalytics", Icon: Linkedin, label: "LinkedIn" },
                { href: "https://twitter.com/neographanalytics", Icon: Twitter, label: "X (Twitter)" },
              ].map(({ href, Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--cmi-footer-link)] transition-colors hover:text-white"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

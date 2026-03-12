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
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blogs" },
  { name: "Press Releases", href: "/press-releases" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const consultingServices = consultingServicesData as ConsultingService[];

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm font-medium transition-colors hover:text-[var(--primary)] whitespace-nowrap ${
              pathname === item.href || pathname.startsWith(item.href + "/") || (item.href === "/blogs" && pathname.startsWith("/blog/"))
                ? "text-[var(--primary)]"
                : "text-[var(--muted-foreground)]"
            }`}
          >
            {item.name}
          </Link>
        ))}

        <MegaMenu
          categories={categories}
          isActive={pathname.startsWith("/industry") || pathname.startsWith("/reports")}
        />
        <ConsultingMenu
          services={consultingServices}
          isActive={pathname.startsWith("/consulting")}
        />

        <Link
          href="/about"
          className={`text-sm font-medium transition-colors hover:text-[var(--primary)] whitespace-nowrap ${
            pathname === "/about"
              ? "text-[var(--primary)]"
              : "text-[var(--muted-foreground)]"
          }`}
        >
          About Us
        </Link>

        <Link
          href="/contact"
          className={`text-sm font-medium transition-colors hover:text-[var(--primary)] whitespace-nowrap ${
            pathname === "/contact"
              ? "text-[var(--primary)]"
              : "text-[var(--muted-foreground)]"
          }`}
        >
          Contact
        </Link>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100 transition-colors"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMobileMenuOpen}
      >
        <div className="relative w-5 h-5">
          <span
            className={cn(
              "absolute left-0 w-5 h-0.5 bg-slate-700 transition-all duration-300",
              isMobileMenuOpen
                ? "top-1/2 -translate-y-1/2 rotate-45"
                : "top-1"
            )}
          />
          <span
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 w-5 h-0.5 bg-slate-700 transition-all duration-300",
              isMobileMenuOpen ? "opacity-0" : "opacity-100"
            )}
          />
          <span
            className={cn(
              "absolute left-0 w-5 h-0.5 bg-slate-700 transition-all duration-300",
              isMobileMenuOpen
                ? "top-1/2 -translate-y-1/2 -rotate-45"
                : "bottom-1"
            )}
          />
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          "fixed top-16 right-0 h-[calc(100vh-4rem)] w-72 bg-white z-50 md:hidden",
          "border-l border-slate-200 shadow-xl",
          "transform transition-transform duration-300 ease-out",
          "overflow-y-auto",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "py-3 px-4 text-base font-medium rounded-lg transition-colors",
                "hover:bg-slate-100",
                pathname === item.href || pathname.startsWith(item.href + "/") || (item.href === "/blogs" && pathname.startsWith("/blog/"))
                  ? "text-[var(--primary)] bg-slate-50"
                  : "text-slate-700"
              )}
            >
              {item.name}
            </Link>
          ))}

          <Link
            href="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(
              "py-3 px-4 text-base font-medium rounded-lg transition-colors",
              "hover:bg-slate-100",
              pathname === "/about"
                ? "text-[var(--primary)] bg-slate-50"
                : "text-slate-700"
            )}
          >
            About Us
          </Link>

          <Link
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(
              "py-3 px-4 text-base font-medium rounded-lg transition-colors",
              "hover:bg-slate-100",
              pathname === "/contact"
                ? "text-[var(--primary)] bg-slate-50"
                : "text-slate-700"
            )}
          >
            Contact
          </Link>

          {/* Consulting Section in Mobile */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <span className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Consulting &amp; Services
            </span>
            <div className="mt-2 flex flex-col">
              <Link
                href="/services"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "py-2 px-4 text-sm font-medium rounded-lg transition-colors hover:bg-slate-100",
                  pathname === "/services"
                    ? "text-[var(--primary)] bg-slate-50"
                    : "text-slate-700"
                )}
              >
                All Services
              </Link>
              {consultingServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/consulting/${service.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 px-4 text-sm text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Reports Section in Mobile */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <span className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Reports
            </span>
            <div className="mt-2 flex flex-col">
              <Link
                href="/industry"
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "py-3 px-4 text-base font-medium rounded-lg transition-colors",
                  "hover:bg-slate-100",
                  pathname === "/industry"
                    ? "text-[var(--primary)] bg-slate-50"
                    : "text-slate-700"
                )}
              >
                All Reports
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/industry/${category.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2 px-4 text-sm text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Request Sample CTA */}
          <div className="mt-6 px-4">
            <Link
              href="/request-sample"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full py-3 px-4 text-center text-white font-medium bg-gradient-to-r from-navy-800 to-ocean-600 rounded-lg hover:from-navy-700 hover:to-ocean-500 transition-all shadow-md"
            >
              Request Sample
            </Link>
          </div>

          {/* Social Media Links */}
          <div className="mt-6 pt-6 px-4 border-t border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Follow Us
            </span>
            <div className="mt-3 flex gap-4">
              <Link
                href="https://facebook.com/healthcareforesights"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-ocean-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="https://instagram.com/healthcareforesights"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-ocean-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com/company/healthcareforesights"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-ocean-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://twitter.com/healthcareforesights"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-ocean-600 transition-colors"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

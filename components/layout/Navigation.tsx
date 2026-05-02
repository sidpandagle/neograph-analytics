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
  { name: "Blog", href: "/blog" },
  { name: "Press Releases", href: "/press-releases" },
];

const navLinkBase =
  "text-sm font-medium transition-colors whitespace-nowrap relative pb-0.5 " +
  "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[var(--accent)] after:transition-all after:duration-200";

const navLinkActive = "text-[var(--foreground)] after:w-full";
const navLinkInactive = "text-[var(--muted-foreground)] after:w-0 hover:text-[var(--foreground)] hover:after:w-full";

export default function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const consultingServices = consultingServicesData as ConsultingService[];

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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
      <nav className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(navLinkBase, pathname === item.href ? navLinkActive : navLinkInactive)}
          >
            {item.name}
          </Link>
        ))}

        <MegaMenu categories={categories} isActive={pathname.startsWith("/reports")} />
        <ConsultingMenu services={consultingServices} isActive={pathname.startsWith("/consulting")} />

        <Link
          href="/about"
          className={cn(navLinkBase, pathname === "/about" ? navLinkActive : navLinkInactive)}
        >
          About Us
        </Link>

        <Link
          href="/contact"
          className={cn(navLinkBase, pathname === "/contact" ? navLinkActive : navLinkInactive)}
        >
          Contact
        </Link>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-[#e3e4e8] hover:border-[#ec652b]/40 hover:bg-[#f6f6f8] transition-colors"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMobileMenuOpen}
      >
        <div className="relative w-4 h-4">
          <span className={cn("absolute left-0 h-0.5 bg-[#232730] transition-all duration-300", isMobileMenuOpen ? "w-4 top-1/2 -translate-y-1/2 rotate-45" : "w-4 top-0.5")} />
          <span className={cn("absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#232730] transition-all duration-300", isMobileMenuOpen ? "w-0 opacity-0" : "w-3 opacity-100")} />
          <span className={cn("absolute left-0 h-0.5 bg-[#232730] transition-all duration-300", isMobileMenuOpen ? "w-4 top-1/2 -translate-y-1/2 -rotate-45" : "w-4 bottom-0.5")} />
        </div>
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} aria-hidden="true" />
      )}

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed top-[62px] right-0 h-[calc(100vh-62px)] w-72 z-50 md:hidden",
          "bg-[var(--primary)]",
          "transform transition-transform duration-300 ease-out",
          "overflow-y-auto"
        )}
        style={{ transform: isMobileMenuOpen ? "translateX(0)" : "translateX(100%)" }}
      >
        <nav className="flex flex-col p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "py-3 px-4 text-base font-medium rounded-lg transition-colors",
                "hover:bg-white/10",
                pathname === item.href ? "text-[#ec652b]" : "text-white/80"
              )}
            >
              {item.name}
            </Link>
          ))}

          <Link
            href="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn("py-3 px-4 text-base font-medium rounded-lg transition-colors hover:bg-white/10", pathname === "/about" ? "text-[#ec652b]" : "text-white/80")}
          >
            About Us
          </Link>

          <Link
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn("py-3 px-4 text-base font-medium rounded-lg transition-colors hover:bg-white/10", pathname === "/contact" ? "text-[#ec652b]" : "text-white/80")}
          >
            Contact
          </Link>

          {/* Consulting */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <span className="px-4 text-xs font-semibold text-white/40 uppercase tracking-wider">
              Consulting &amp; Services
            </span>
            <div className="mt-2 flex flex-col">
              <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className={cn("py-2 px-4 text-sm font-medium rounded-lg transition-colors hover:bg-white/10", pathname === "/services" ? "text-[#ec652b]" : "text-white/70")}>
                All Services
              </Link>
              {consultingServices.map((service) => (
                <Link key={service.id} href={`/consulting/${service.slug}`} onClick={() => setIsMobileMenuOpen(false)} className="py-2 px-4 text-sm text-white/50 rounded-lg hover:bg-white/10 hover:text-white/80 transition-colors">
                  {service.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Reports */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <span className="px-4 text-xs font-semibold text-white/40 uppercase tracking-wider">Reports</span>
            <div className="mt-2 flex flex-col">
              <Link href="/reports" onClick={() => setIsMobileMenuOpen(false)} className={cn("py-3 px-4 text-base font-medium rounded-lg transition-colors hover:bg-white/10", pathname === "/reports" ? "text-[#ec652b]" : "text-white/80")}>
                All Reports
              </Link>
              {categories.map((category) => (
                <Link key={category.id} href={`/reports?category=${category.slug}`} onClick={() => setIsMobileMenuOpen(false)} className="py-2 px-4 text-sm text-white/50 rounded-lg hover:bg-white/10 hover:text-white/80 transition-colors">
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="mt-6 pt-6 px-4 border-t border-white/10">
            <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Follow Us</span>
            <div className="mt-3 flex gap-4">
              {[
                { href: "https://facebook.com/neographanalytics", Icon: Facebook, label: "Facebook" },
                { href: "https://instagram.com/neographanalytics", Icon: Instagram, label: "Instagram" },
                { href: "https://linkedin.com/company/neographanalytics", Icon: Linkedin, label: "LinkedIn" },
                { href: "https://twitter.com/neographanalytics", Icon: Twitter, label: "X (Twitter)" },
              ].map(({ href, Icon, label }) => (
                <Link key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#ec652b] transition-colors" aria-label={label}>
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

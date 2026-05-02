import Link from "next/link";
import { Mail, Phone, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Logo from "./Logo";
import { CONTACT_INFO } from "@/lib/contact";

const quickLinks = [
  { href: "/reports", label: "Research Reports" },
  { href: "/blog", label: "Blog" },
  { href: "/press-releases", label: "Press Releases" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const consultingLinks = [
  { href: "/consulting/market-assessment", label: "Market Assessment" },
  { href: "/consulting/healthcare-competitive-intelligence", label: "Competitive Intelligence" },
  { href: "/consulting/rd-analysis", label: "R&D Analysis" },
  { href: "/consulting/primary-market-research", label: "Primary Research" },
  { href: "/consulting/mergers-acquisitions", label: "M&A Advisory" },
];

const legalLinks = [
  { href: "/legal/privacy-policy", label: "Privacy Policy" },
  { href: "/legal/refund-policy", label: "Refund Policy" },
  { href: "/legal/cancellation-policy", label: "Cancellation Policy" },
];

const socialLinks = [
  { href: "https://facebook.com/neographanalytics", label: "Facebook", Icon: Facebook },
  { href: "https://instagram.com/neographanalytics", label: "Instagram", Icon: Instagram },
  { href: "https://linkedin.com/company/neographanalytics", label: "LinkedIn", Icon: Linkedin },
  { href: "https://twitter.com/neographanalytics", label: "X (Twitter)", Icon: Twitter },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="theme-hero border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="container mx-auto px-4 md:px-6 py-14 md:py-16">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Logo variant="light" />
            <p className="text-sm leading-relaxed max-w-[220px] theme-hero-muted">
              Comprehensive market intelligence and strategic insights for the global healthcare industry.
            </p>
            <div className="flex gap-3.5">
              {socialLinks.map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ background: 'var(--primary)', opacity: 0.08, color: 'var(--primary)' }}
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase theme-hero-faint" style={{ letterSpacing: '0.12em' }}>
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="text-sm theme-hero-muted hover:opacity-100 transition-opacity duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Consulting */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase theme-hero-faint" style={{ letterSpacing: '0.12em' }}>
              Consulting
            </h3>
            <ul className="space-y-2.5">
              {consultingLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="text-sm theme-hero-muted hover:opacity-100 transition-opacity duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase theme-hero-faint" style={{ letterSpacing: '0.12em' }}>
              Contact
            </h3>
            <div className="space-y-3">
              <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-2.5 text-sm theme-hero-muted hover:opacity-100 transition-opacity duration-150">
                <Mail className="w-4 h-4 shrink-0 text-[var(--accent)]" />
                {CONTACT_INFO.email}
              </a>
              <div className="flex items-center gap-2.5 text-sm theme-hero-muted">
                <Phone className="w-4 h-4 shrink-0 text-[var(--accent)]" />
                <span>USA: {CONTACT_INFO.offices.usa.phoneFormatted}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm theme-hero-muted">
                <Phone className="w-4 h-4 shrink-0 text-[var(--accent)]" />
                <span>India: {CONTACT_INFO.offices.india.phoneFormatted}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: 'hsl(var(--primary-foreground-hsl) / 0.08)' }}>
          <p className="text-xs theme-hero-faint">
            &copy; {currentYear} NeoGraph Analytics Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {legalLinks.map(({ href, label }) => (
              <Link key={label} href={href} className="text-xs theme-hero-faint hover:opacity-100 transition-opacity duration-150">
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

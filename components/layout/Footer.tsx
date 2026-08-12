import Link from "next/link";
import { Mail, Phone, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Logo from "./Logo";
import { CONTACT_INFO } from "@/lib/contact";

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Consulting" },
  { href: "/request-demo", label: "Request a Demo" },
  { href: "/contact", label: "Contact" },
];

const researchLinks = [
  { href: "/reports", label: "Research Reports" },
  { href: "/press-releases", label: "Press Releases" },
  { href: "/blog", label: "Blog" },
  { href: "/request-sample", label: "Request Sample" },
];

const consultingLinks = [
  { href: "/consulting/market-assessment", label: "Market Assessment" },
  { href: "/consulting/healthcare-competitive-intelligence", label: "Competitive Intelligence" },
  { href: "/consulting/rd-analysis", label: "R&D Analysis" },
  { href: "/consulting/primary-market-research", label: "Primary Research" },
  { href: "/consulting/mergers-acquisitions", label: "M&A Advisory" },
];

const legalLinks = [
  { href: "/legal/privacy-policy", label: "Privacy" },
  { href: "/legal/refund-policy", label: "Refund Policy" },
  { href: "/legal/cancellation-policy", label: "Cancellation" },
];

const socialLinks = [
  { href: "https://facebook.com/neographanalytics", label: "Facebook", Icon: Facebook },
  { href: "https://instagram.com/neographanalytics", label: "Instagram", Icon: Instagram },
  { href: "https://linkedin.com/company/neographanalytics", label: "LinkedIn", Icon: Linkedin },
  { href: "https://twitter.com/neographanalytics", label: "X (Twitter)", Icon: Twitter },
];

const columnHeading =
  "text-[12px] font-bold uppercase tracking-[0.1em] text-white";
const footerLink =
  "text-[13.5px] text-[var(--cmi-footer-link)] transition-colors hover:text-white";

/**
 * Ink is reserved for the footer — the one dark panel on the desk,
 * squared off at the bottom so it anchors the page.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="desk mt-auto">
      <footer className="rounded-panel rounded-b-none bg-[var(--cmi-ink)] px-6 pb-8 pt-9 md:px-11 md:pb-[30px] md:pt-11">
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(4,1fr)]">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Logo variant="light" />
            <p className="max-w-[240px] text-[13.5px] leading-[1.6] text-[var(--cmi-footer-link)]">
              Research reports and advisory for the global healthcare industry.
            </p>
            <a
              href={`tel:${CONTACT_INFO.offices.usa.phone}`}
              className="text-[13.5px] font-semibold text-[var(--cmi-sky)] transition-colors hover:text-white"
            >
              {CONTACT_INFO.offices.usa.phoneFormatted}
            </a>
            <div className="mt-1 flex gap-3">
              {socialLinks.map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-pill bg-white/[0.07] text-[var(--cmi-footer-link)] transition-colors duration-150 hover:bg-[var(--cmi-primary)] hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-2.5">
            <span className={columnHeading}>Company</span>
            {companyLinks.map(({ href, label }) => (
              <Link key={label} href={href} className={footerLink}>
                {label}
              </Link>
            ))}
          </div>

          {/* Research */}
          <div className="flex flex-col gap-2.5">
            <span className={columnHeading}>Research</span>
            {researchLinks.map(({ href, label }) => (
              <Link key={label} href={href} className={footerLink}>
                {label}
              </Link>
            ))}
          </div>

          {/* Services */}
          <div className="flex flex-col gap-2.5">
            <span className={columnHeading}>Services</span>
            {consultingLinks.map(({ href, label }) => (
              <Link key={label} href={href} className={footerLink}>
                {label}
              </Link>
            ))}
          </div>

          {/* Support */}
          <div className="flex flex-col gap-2.5">
            <span className={columnHeading}>Support</span>
            <a href={`mailto:${CONTACT_INFO.email}`} className={`${footerLink} flex items-center gap-2`}>
              <Mail className="h-3.5 w-3.5 shrink-0 text-[var(--cmi-sky)]" />
              <span className="truncate">{CONTACT_INFO.email}</span>
            </a>
            <span className={`${footerLink} flex items-center gap-2`}>
              <Phone className="h-3.5 w-3.5 shrink-0 text-[var(--cmi-sky)]" />
              USA {CONTACT_INFO.offices.usa.phoneFormatted}
            </span>
            <span className={`${footerLink} flex items-center gap-2`}>
              <Phone className="h-3.5 w-3.5 shrink-0 text-[var(--cmi-sky)]" />
              India {CONTACT_INFO.offices.india.phoneFormatted}
            </span>
            <Link href="/request-demo" className={footerLink}>
              Request a Demo
            </Link>
          </div>
        </div>

        <div className="mt-9 flex flex-col items-center justify-between gap-4 border-t border-[var(--cmi-footer-line)] pt-5 sm:flex-row">
          <span className="text-[12.5px] text-[var(--cmi-footer-meta)]">
            &copy; {currentYear} NeoGraph Analytics Pvt. Ltd. All rights reserved.
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {legalLinks.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="text-[12.5px] text-[var(--cmi-footer-link)] transition-colors hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

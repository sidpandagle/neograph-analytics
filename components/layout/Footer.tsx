import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, ChevronRight, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { CONTACT_INFO } from "@/lib/contact";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/assets/images/logo.png"
                alt="Healthcare Foresights"
                width={180}
                height={50}
                sizes="180px"
                className="h-16 w-auto hover:opacity-80 transition-opacity"
              />
            </Link>
            <p className="text-sm text-slate-600 mb-4">
              Comprehensive insights and analysis for the healthcare industry.
            </p>

            <div className="flex gap-4">
              <Link
                href="https://www.facebook.com/people/Healthcare-Foresights/61588605652792/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-ocean-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.instagram.com/healthcareforesights"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-ocean-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/healthcare-foresights/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-ocean-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://x.com/Healthcare_F"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-ocean-600 transition-colors"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/industry"
                  className="text-slate-600 hover:text-ocean-600 transition-colors flex items-center gap-2 group"
                >
                  <ChevronRight className="w-4 h-4 text-ocean-600 group-hover:translate-x-1 transition-transform" />
                  Research Reports
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-slate-600 hover:text-ocean-600 transition-colors flex items-center gap-2 group"
                >
                  <ChevronRight className="w-4 h-4 text-ocean-600 group-hover:translate-x-1 transition-transform" />
                  Blog
                </Link>
              </li>
              <li className="pt-2 mt-2 border-t border-slate-200">
                <span className="text-xs uppercase text-slate-500 font-semibold">Legal</span>
              </li>
              <li>
                <Link
                  href="/legal/privacy-policy"
                  className="text-slate-600 hover:text-ocean-600 transition-colors flex items-center gap-2 group"
                >
                  <ChevronRight className="w-4 h-4 text-ocean-600 group-hover:translate-x-1 transition-transform" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/refund-policy"
                  className="text-slate-600 hover:text-ocean-600 transition-colors flex items-center gap-2 group"
                >
                  <ChevronRight className="w-4 h-4 text-ocean-600 group-hover:translate-x-1 transition-transform" />
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/cancellation-policy"
                  className="text-slate-600 hover:text-ocean-600 transition-colors flex items-center gap-2 group"
                >
                  <ChevronRight className="w-4 h-4 text-ocean-600 group-hover:translate-x-1 transition-transform" />
                  Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Consulting Services</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/consulting/market-assessment"
                  className="text-slate-600 hover:text-ocean-600 transition-colors flex items-center gap-2 group"
                >
                  <ChevronRight className="w-4 h-4 text-ocean-600 group-hover:translate-x-1 transition-transform" />
                  Market Assessment
                </Link>
              </li>
              <li>
                <Link
                  href="/consulting/healthcare-competitive-intelligence"
                  className="text-slate-600 hover:text-ocean-600 transition-colors flex items-center gap-2 group"
                >
                  <ChevronRight className="w-4 h-4 text-ocean-600 group-hover:translate-x-1 transition-transform" />
                  Competitive Intelligence
                </Link>
              </li>
              <li>
                <Link
                  href="/consulting/rd-analysis"
                  className="text-slate-600 hover:text-ocean-600 transition-colors flex items-center gap-2 group"
                >
                  <ChevronRight className="w-4 h-4 text-ocean-600 group-hover:translate-x-1 transition-transform" />
                  R&D Analysis
                </Link>
              </li>
              <li>
                <Link
                  href="/consulting/primary-market-research"
                  className="text-slate-600 hover:text-ocean-600 transition-colors flex items-center gap-2 group"
                >
                  <ChevronRight className="w-4 h-4 text-ocean-600 group-hover:translate-x-1 transition-transform" />
                  Primary Research
                </Link>
              </li>
              <li>
                <Link
                  href="/consulting/mergers-acquisitions"
                  className="text-slate-600 hover:text-ocean-600 transition-colors flex items-center gap-2 group"
                >
                  <ChevronRight className="w-4 h-4 text-ocean-600 group-hover:translate-x-1 transition-transform" />
                  M&A Advisory
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Contact</h3>
            <div className="space-y-2 text-sm text-slate-600">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-ocean-600" />
                {CONTACT_INFO.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-ocean-600" />
                USA: {CONTACT_INFO.offices.usa.phoneFormatted}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-ocean-600" />
                India: {CONTACT_INFO.offices.india.phoneFormatted}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8 text-center">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} Healthcare Foresights. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Healthcare Foresights | Research & Business Inquiries",
  description: "Contact Healthcare Foresights for healthcare research inquiries, report access, partnerships, or consulting support.",
  keywords: ["contact healthcare foresights", "healthcare research contact", "healthcare consulting inquiry"],
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

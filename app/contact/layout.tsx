import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact NeoGraph Analytics | Research & Business Inquiries",
  description: "Contact NeoGraph Analytics for healthcare research inquiries, report access, partnerships, or consulting support.",
  keywords: ["contact neograph analytics", "healthcare research contact", "healthcare consulting inquiry"],
  // Without an explicit canonical this page inherited the root layout's, which
  // pointed at the homepage and declared /contact a duplicate of it.
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

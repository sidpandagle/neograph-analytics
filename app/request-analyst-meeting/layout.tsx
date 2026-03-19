import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request Analyst Meeting | Healthcare Foresights",
  description: "Request a meeting with our analyst team to explore our healthcare market research platform and discover how our insights can drive your strategic decisions.",
  keywords: ["healthcare research analyst meeting", "market research analyst", "healthcare consulting meeting"],
  alternates: {
    canonical: '/request-analyst-meeting',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RequestAnalystMeetingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

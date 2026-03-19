import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request Report Customization | Healthcare Foresights",
  description: "Customize our healthcare market research reports to fit your specific needs — add regions, segments, or data points tailored to your business requirements.",
  keywords: ["customize healthcare report", "tailored market research", "custom healthcare analysis", "report customization"],
  alternates: {
    canonical: '/request-customization',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RequestCustomizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

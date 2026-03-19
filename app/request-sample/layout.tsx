import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request Sample Report | Healthcare Foresights",
  description: "Request a free sample of our healthcare market research reports to experience the depth and quality of our industry analysis.",
  keywords: ["healthcare report sample", "free healthcare research", "market research sample"],
  alternates: {
    canonical: '/request-sample',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RequestSampleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

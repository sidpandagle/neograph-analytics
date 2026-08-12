import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { StructuredData, generateOrganizationSchema, generateWebSiteSchema, generateLocalBusinessSchema } from "@/components/seo/StructuredData";
import { GoogleAnalytics } from "@next/third-parties/google";

/* Outfit carries display type and every number. */
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
});

/* Plus Jakarta Sans for everything read at length. */
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.neographanalytics.com'),
  title: {
    default: "NeoGraph Analytics | Healthcare Market Insights & Research Reports",
    template: "%s | NeoGraph Analytics",
  },
  description: "NeoGraph Analytics delivers trusted neograph analytics, industry insights, trends, forecasts, and data-driven analysis across global healthcare sectors.",
  keywords: ["synaptic research", "neograph analytics", "healthcare insights", "healthcare industry trends", "medical market analysis", "healthcare reports"],
  authors: [{ name: "NeoGraph Analytics Team" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "NeoGraph Analytics",
    title: "NeoGraph Analytics | Healthcare Market Insights & Research Reports",
    description: "NeoGraph Analytics delivers trusted neograph analytics, industry insights, trends, forecasts, and data-driven analysis across global healthcare sectors.",
    images: [
      {
        url: "/assets/images/mr.webp",
        width: 1200,
        height: 630,
        alt: "NeoGraph Analytics – Neograph Analytics & Insights",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  twitter: {
    card: 'summary_large_image',
    site: '@NeoGraphAnalytics',
    creator: '@NeoGraphAnalytics',
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData data={generateOrganizationSchema()} />
        <StructuredData data={generateWebSiteSchema()} />
        <StructuredData data={generateLocalBusinessSchema()} />
      </head>
      <body
        className={`${outfit.variable} ${jakarta.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* The desk: every section below is a rounded panel floating on it. */}
        <div className="flex min-h-screen flex-col pt-4 md:pt-5">
          <Header />
          <main className="desk flex-1 pb-5">{children}</main>
          <Footer />
        </div>
      </body>
      <GoogleAnalytics gaId="G-NJ1DNL58KB" />
    </html>
  );
}

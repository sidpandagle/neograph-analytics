import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { StructuredData, generateOrganizationSchema, generateWebSiteSchema, generateLocalBusinessSchema } from "@/components/seo/StructuredData";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.healthcareforesights.com'),
  title: {
    default: "Healthcare Foresights | Healthcare Market Insights & Research Reports",
    template: "%s | Healthcare Foresights",
  },
  description: "Healthcare Foresights delivers trusted healthcare market research, industry insights, trends, forecasts, and data-driven analysis across global healthcare sectors.",
  keywords: ["healthcare foresights", "healthcare market research", "healthcare insights", "healthcare industry trends", "medical market analysis", "healthcare reports"],
  authors: [{ name: "Healthcare Foresights Team" }],
  icons: {
    icon: "/assets/images/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Healthcare Foresights",
    title: "Healthcare Foresights | Healthcare Market Insights & Research Reports",
    description: "Healthcare Foresights delivers trusted healthcare market research, industry insights, trends, forecasts, and data-driven analysis across global healthcare sectors.",
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
    site: '@HealthcareForesights',
    creator: '@HealthcareForesights',
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
    <html lang="en">
      <head>
        <StructuredData data={generateOrganizationSchema()} />
        <StructuredData data={generateWebSiteSchema()} />
        <StructuredData data={generateLocalBusinessSchema()} />
        {/* Google Translate: define callback before the loader script runs */}
        <Script
          id="google-translate-init"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.googleTranslateElementInit = function() {
                new google.translate.TranslateElement(
                  { pageLanguage: 'en', autoDisplay: false },
                  'google_translate_element'
                );
                var _gtObserver = new MutationObserver(function() {
                  var banner = document.querySelector('iframe.goog-te-banner-frame');
                  if (banner) {
                    banner.style.display = 'none';
                    document.body.style.top = '0px';
                    _gtObserver.disconnect();
                  }
                });
                _gtObserver.observe(document.body, { childList: true, subtree: true });
                setTimeout(function() { _gtObserver.disconnect(); }, 5000);
              };
            `,
          }}
        />
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="lazyOnload"
        />
        {/* HubSpot Embed Code */}
        <Script
          id="hs-script-loader"
          src="//js.hs-scripts.com/22449271.js"
          strategy="lazyOnload"
        />
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        <div id="google_translate_element" className="hidden" />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-NJ1DNL58KB" />
    </html>
  );
}

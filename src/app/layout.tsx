import type { Metadata } from "next";
import "./globals.css";
import FloatingActions from "@/components/FloatingActions";
import TawkChat from "@/components/TawkChat";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieBanner from "@/components/CookieBanner";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  metadataBase: new URL("https://wilckeweb.org"),
  title: {
    default: "WilckeWeb — Webdesign & Entwicklung aus Österreich | Next.js + WordPress",
    template: "%s — WilckeWeb",
  },
  description:
    "WilckeWeb erstellt moderne, blitzschnelle Websites mit Next.js und Headless WordPress. Transparente Preise ab 790 €, persönliche Beratung, SEO & AEO optimiert. Aus Mauerbach bei Wien.",
  keywords: [
    "Webdesign Österreich",
    "Webdesign Wien",
    "Website erstellen lassen",
    "Next.js Website",
    "Headless WordPress",
    "Webentwicklung Österreich",
    "WilckeWeb",
    "WordPress Agentur",
    "SEO optimierte Website",
    "AEO Answer Engine Optimization",
    "Website Kosten Österreich",
    "Webdesigner Niederösterreich",
    "Webentwickler Mauerbach",
    "Jeremias Wilcke",
    "persönliche Webentwicklung",
    "moderne Website erstellen",
    "schnelle Website",
  ],
  authors: [{ name: "Jeremias Wilcke", url: "https://wilckeweb.org" }],
  creator: "WilckeWeb — Jeremias Wilcke",
  publisher: "WilckeWeb",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_AT",
    url: "https://wilckeweb.org",
    siteName: "WilckeWeb",
    title: "WilckeWeb — Moderne Websites mit Next.js & Headless WordPress",
    description:
      "Blitzschnelle Websites, transparent kalkuliert, persönlich betreut. Ab 790 € netto. Webdesign & Entwicklung aus Österreich.",
    images: [
      {
        url: "/wilckeweb_logo.png",
        width: 1200,
        height: 630,
        alt: "WilckeWeb — Webdesign & Entwicklung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WilckeWeb — Webdesign & Entwicklung aus Österreich",
    description:
      "Moderne Websites mit Next.js & WordPress. Transparente Preise, persönliche Beratung.",
    images: ["/wilckeweb_logo.png"],
  },
  alternates: {
    canonical: "https://wilckeweb.org",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/wilckeweb_logo.png" type="image/png" />
        <StructuredData />
      </head>
      <body className="antialiased">
        <GoogleAnalytics />
        {children}
        <FloatingActions />
        <TawkChat />
        <CookieBanner />
      </body>
    </html>
  );
}

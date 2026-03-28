import type { Metadata } from "next";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: "WilckeWeb — Websites, die klar wirken und gut aussehen",
  description:
    "Planen Sie Ihre neue Website einfach, transparent und professionell. WilckeWeb begleitet Sie von der Idee bis zur fertigen Seite.",
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
      </head>
      <body className="antialiased">
        {children}
        <WhatsAppButton />
        <CookieBanner />
      </body>
    </html>
  );
}

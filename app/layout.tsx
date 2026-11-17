import type { Metadata } from "next";
import { inter, jetbrainsMono, outfit, manrope } from "./fonts";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const GOOGLE_TAG_MANAGER_ID = "GTM-T3NB6CTV";

export const metadata: Metadata = {
  title: "AutoKnerd | Dealership Customer Experience. Engineered.",
  description: "Building systems that help high-end dealerships create trust, clarity, and consistency through behavioral architectural engineering.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${outfit.variable} ${manrope.variable} antialiased selection:bg-primary selection:text-black`}
      >
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GOOGLE_TAG_MANAGER_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GOOGLE_TAG_MANAGER_ID}');
          `}
        </Script>
        <div className="noise-overlay" />
        <div className="fixed inset-0 bg-mesh-gradient opacity-20 pointer-events-none -z-50" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

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
        className={`${inter.variable} ${jetbrainsMono.variable} ${outfit.variable} antialiased selection:bg-primary selection:text-black`}
      >
        <div className="noise-overlay" />
        <div className="fixed inset-0 bg-mesh-gradient opacity-20 pointer-events-none -z-50" />
        {children}
      </body>
    </html>
  );
}

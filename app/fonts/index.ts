// Site fonts, bundled with the site (variable woff2, Latin) instead of fetched from Google Fonts at build time,
// so a Google outage or blocked download can't fail a Vercel build. Same CSS variable names as before.
import localFont from "next/font/local";

export const inter = localFont({ src: "./inter.woff2", weight: "100 900", variable: "--font-inter", display: "swap" });
export const jetbrainsMono = localFont({ src: "./jetbrains-mono.woff2", weight: "100 800", variable: "--font-jetbrains-mono", display: "swap" });
export const outfit = localFont({ src: "./outfit.woff2", weight: "100 900", variable: "--font-outfit", display: "swap" });
export const manrope = localFont({ src: "./manrope.woff2", weight: "200 800", variable: "--font-manrope", display: "swap" });
export const spaceGrotesk = localFont({ src: "./space-grotesk.woff2", weight: "300 700", variable: "--font-grotesk", display: "swap" });

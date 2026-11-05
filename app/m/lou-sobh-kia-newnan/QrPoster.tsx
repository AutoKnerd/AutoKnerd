"use client";

import { useState } from "react";

// Printable QR codes for this store. Both links are fixed, so each QR is a
// static, pre-generated SVG path (37x37 module grid) baked in at build time:
// no runtime library, no network, scans offline, prints as crisp vector.
const QR_MODULES = 37;

const STORE = "Lou Sobh Kia Newnan";
const REG_LINK = "https://autoknerdapp-production.up.railway.app/?enroll=LSKN";
const LOGIN_LINK = "https://autoknerdapp-production.up.railway.app/";

const REG_PATH =
  "M2 2h7v1h-7zM10 2h2v1h-2zM15 2h2v1h-2zM23 2h2v1h-2zM28 2h7v1h-7zM2 3h1v1h-1zM8 3h1v1h-1zM10 3h1v1h-1zM13 3h4v1h-4zM18 3h1v1h-1zM21 3h1v1h-1zM28 3h1v1h-1zM34 3h1v1h-1zM2 4h1v1h-1zM4 4h3v1h-3zM8 4h1v1h-1zM10 4h2v1h-2zM13 4h1v1h-1zM15 4h4v1h-4zM20 4h7v1h-7zM28 4h1v1h-1zM30 4h3v1h-3zM34 4h1v1h-1zM2 5h1v1h-1zM4 5h3v1h-3zM8 5h1v1h-1zM11 5h1v1h-1zM16 5h4v1h-4zM21 5h3v1h-3zM25 5h1v1h-1zM28 5h1v1h-1zM30 5h3v1h-3zM34 5h1v1h-1zM2 6h1v1h-1zM4 6h3v1h-3zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h2v1h-2zM17 6h5v1h-5zM24 6h1v1h-1zM28 6h1v1h-1zM30 6h3v1h-3zM34 6h1v1h-1zM2 7h1v1h-1zM8 7h1v1h-1zM13 7h8v1h-8zM22 7h2v1h-2zM25 7h1v1h-1zM28 7h1v1h-1zM34 7h1v1h-1zM2 8h7v1h-7zM10 8h1v1h-1zM12 8h1v1h-1zM14 8h1v1h-1zM16 8h1v1h-1zM18 8h1v1h-1zM20 8h1v1h-1zM22 8h1v1h-1zM24 8h1v1h-1zM26 8h1v1h-1zM28 8h7v1h-7zM12 9h1v1h-1zM14 9h2v1h-2zM17 9h2v1h-2zM20 9h1v1h-1zM26 9h1v1h-1zM2 10h1v1h-1zM5 10h6v1h-6zM13 10h2v1h-2zM16 10h1v1h-1zM18 10h2v1h-2zM26 10h2v1h-2zM30 10h1v1h-1zM32 10h3v1h-3zM2 11h1v1h-1zM4 11h3v1h-3zM9 11h1v1h-1zM11 11h1v1h-1zM15 11h3v1h-3zM19 11h1v1h-1zM21 11h2v1h-2zM24 11h2v1h-2zM30 11h4v1h-4zM4 12h1v1h-1zM7 12h3v1h-3zM11 12h1v1h-1zM13 12h1v1h-1zM15 12h1v1h-1zM17 12h1v1h-1zM19 12h1v1h-1zM22 12h2v1h-2zM25 12h1v1h-1zM27 12h1v1h-1zM30 12h5v1h-5zM4 13h3v1h-3zM15 13h1v1h-1zM19 13h2v1h-2zM24 13h1v1h-1zM29 13h1v1h-1zM32 13h2v1h-2zM2 14h1v1h-1zM4 14h6v1h-6zM15 14h1v1h-1zM17 14h2v1h-2zM20 14h3v1h-3zM24 14h1v1h-1zM26 14h1v1h-1zM28 14h2v1h-2zM34 14h1v1h-1zM2 15h4v1h-4zM11 15h1v1h-1zM13 15h4v1h-4zM25 15h1v1h-1zM29 15h1v1h-1zM32 15h1v1h-1zM2 16h1v1h-1zM5 16h1v1h-1zM7 16h3v1h-3zM11 16h3v1h-3zM17 16h5v1h-5zM23 16h1v1h-1zM26 16h1v1h-1zM28 16h1v1h-1zM30 16h1v1h-1zM32 16h1v1h-1zM2 17h1v1h-1zM5 17h1v1h-1zM9 17h1v1h-1zM12 17h1v1h-1zM17 17h1v1h-1zM20 17h3v1h-3zM25 17h1v1h-1zM27 17h1v1h-1zM32 17h1v1h-1zM34 17h1v1h-1zM2 18h3v1h-3zM7 18h2v1h-2zM11 18h2v1h-2zM14 18h1v1h-1zM18 18h1v1h-1zM24 18h1v1h-1zM26 18h6v1h-6zM2 19h2v1h-2zM5 19h1v1h-1zM7 19h1v1h-1zM13 19h3v1h-3zM17 19h1v1h-1zM20 19h4v1h-4zM28 19h1v1h-1zM30 19h1v1h-1zM32 19h3v1h-3zM2 20h2v1h-2zM5 20h1v1h-1zM7 20h3v1h-3zM11 20h3v1h-3zM15 20h3v1h-3zM19 20h1v1h-1zM21 20h2v1h-2zM25 20h2v1h-2zM28 20h2v1h-2zM31 20h2v1h-2zM34 20h1v1h-1zM3 21h3v1h-3zM9 21h3v1h-3zM14 21h1v1h-1zM16 21h2v1h-2zM21 21h2v1h-2zM24 21h1v1h-1zM30 21h4v1h-4zM3 22h2v1h-2zM8 22h3v1h-3zM12 22h3v1h-3zM16 22h3v1h-3zM21 22h2v1h-2zM24 22h1v1h-1zM26 22h1v1h-1zM29 22h1v1h-1zM31 22h1v1h-1zM34 22h1v1h-1zM2 23h1v1h-1zM6 23h1v1h-1zM9 23h1v1h-1zM13 23h1v1h-1zM15 23h2v1h-2zM19 23h3v1h-3zM25 23h2v1h-2zM29 23h3v1h-3zM2 24h1v1h-1zM4 24h2v1h-2zM8 24h2v1h-2zM11 24h1v1h-1zM14 24h1v1h-1zM16 24h3v1h-3zM22 24h1v1h-1zM25 24h1v1h-1zM28 24h1v1h-1zM31 24h1v1h-1zM33 24h2v1h-2zM2 25h1v1h-1zM4 25h4v1h-4zM9 25h1v1h-1zM12 25h2v1h-2zM16 25h4v1h-4zM21 25h2v1h-2zM24 25h4v1h-4zM30 25h1v1h-1zM32 25h3v1h-3zM2 26h3v1h-3zM7 26h4v1h-4zM12 26h2v1h-2zM16 26h1v1h-1zM18 26h1v1h-1zM26 26h5v1h-5zM33 26h1v1h-1zM10 27h2v1h-2zM13 27h1v1h-1zM16 27h5v1h-5zM23 27h1v1h-1zM25 27h2v1h-2zM30 27h1v1h-1zM32 27h2v1h-2zM2 28h7v1h-7zM10 28h3v1h-3zM15 28h1v1h-1zM17 28h1v1h-1zM21 28h2v1h-2zM25 28h2v1h-2zM28 28h1v1h-1zM30 28h1v1h-1zM32 28h2v1h-2zM2 29h1v1h-1zM8 29h1v1h-1zM10 29h1v1h-1zM13 29h1v1h-1zM16 29h1v1h-1zM20 29h1v1h-1zM22 29h1v1h-1zM25 29h2v1h-2zM30 29h3v1h-3zM2 30h1v1h-1zM4 30h3v1h-3zM8 30h1v1h-1zM10 30h1v1h-1zM12 30h1v1h-1zM15 30h3v1h-3zM19 30h1v1h-1zM22 30h1v1h-1zM24 30h7v1h-7zM33 30h1v1h-1zM2 31h1v1h-1zM4 31h3v1h-3zM8 31h1v1h-1zM10 31h4v1h-4zM19 31h1v1h-1zM21 31h2v1h-2zM24 31h1v1h-1zM26 31h2v1h-2zM29 31h1v1h-1zM31 31h4v1h-4zM2 32h1v1h-1zM4 32h3v1h-3zM8 32h1v1h-1zM11 32h1v1h-1zM17 32h1v1h-1zM19 32h1v1h-1zM21 32h1v1h-1zM23 32h1v1h-1zM26 32h1v1h-1zM29 32h3v1h-3zM33 32h2v1h-2zM2 33h1v1h-1zM8 33h1v1h-1zM11 33h1v1h-1zM14 33h1v1h-1zM17 33h1v1h-1zM20 33h2v1h-2zM25 33h1v1h-1zM27 33h8v1h-8zM2 34h7v1h-7zM10 34h3v1h-3zM16 34h2v1h-2zM19 34h1v1h-1zM21 34h1v1h-1zM25 34h2v1h-2zM29 34h2v1h-2z";
const LOGIN_PATH =
  "M2 2h7v1h-7zM10 2h1v1h-1zM12 2h2v1h-2zM18 2h1v1h-1zM21 2h3v1h-3zM25 2h1v1h-1zM28 2h7v1h-7zM2 3h1v1h-1zM8 3h1v1h-1zM10 3h1v1h-1zM12 3h1v1h-1zM14 3h1v1h-1zM16 3h1v1h-1zM18 3h2v1h-2zM25 3h2v1h-2zM28 3h1v1h-1zM34 3h1v1h-1zM2 4h1v1h-1zM4 4h3v1h-3zM8 4h1v1h-1zM15 4h2v1h-2zM18 4h1v1h-1zM20 4h3v1h-3zM24 4h2v1h-2zM28 4h1v1h-1zM30 4h3v1h-3zM34 4h1v1h-1zM2 5h1v1h-1zM4 5h3v1h-3zM8 5h1v1h-1zM10 5h4v1h-4zM20 5h2v1h-2zM24 5h2v1h-2zM28 5h1v1h-1zM30 5h3v1h-3zM34 5h1v1h-1zM2 6h1v1h-1zM4 6h3v1h-3zM8 6h1v1h-1zM12 6h4v1h-4zM18 6h3v1h-3zM23 6h2v1h-2zM26 6h1v1h-1zM28 6h1v1h-1zM30 6h3v1h-3zM34 6h1v1h-1zM2 7h1v1h-1zM8 7h1v1h-1zM11 7h2v1h-2zM14 7h1v1h-1zM16 7h3v1h-3zM23 7h1v1h-1zM26 7h1v1h-1zM28 7h1v1h-1zM34 7h1v1h-1zM2 8h7v1h-7zM10 8h1v1h-1zM12 8h1v1h-1zM14 8h1v1h-1zM16 8h1v1h-1zM18 8h1v1h-1zM20 8h1v1h-1zM22 8h1v1h-1zM24 8h1v1h-1zM26 8h1v1h-1zM28 8h7v1h-7zM10 9h1v1h-1zM12 9h1v1h-1zM14 9h1v1h-1zM17 9h3v1h-3zM21 9h1v1h-1zM25 9h1v1h-1zM2 10h1v1h-1zM4 10h2v1h-2zM7 10h3v1h-3zM13 10h1v1h-1zM16 10h5v1h-5zM23 10h1v1h-1zM28 10h1v1h-1zM31 10h1v1h-1zM33 10h2v1h-2zM4 11h1v1h-1zM6 11h2v1h-2zM10 11h1v1h-1zM15 11h1v1h-1zM18 11h2v1h-2zM21 11h1v1h-1zM23 11h1v1h-1zM25 11h1v1h-1zM28 11h2v1h-2zM31 11h4v1h-4zM3 12h2v1h-2zM6 12h1v1h-1zM8 12h1v1h-1zM10 12h6v1h-6zM20 12h1v1h-1zM22 12h1v1h-1zM25 12h3v1h-3zM29 12h3v1h-3zM33 12h2v1h-2zM2 13h1v1h-1zM4 13h2v1h-2zM9 13h3v1h-3zM13 13h1v1h-1zM19 13h1v1h-1zM21 13h1v1h-1zM24 13h4v1h-4zM29 13h1v1h-1zM31 13h1v1h-1zM3 14h1v1h-1zM8 14h1v1h-1zM10 14h3v1h-3zM14 14h1v1h-1zM16 14h3v1h-3zM22 14h1v1h-1zM25 14h3v1h-3zM29 14h3v1h-3zM33 14h1v1h-1zM3 15h1v1h-1zM6 15h2v1h-2zM10 15h1v1h-1zM12 15h2v1h-2zM15 15h2v1h-2zM19 15h1v1h-1zM22 15h1v1h-1zM26 15h2v1h-2zM29 15h1v1h-1zM31 15h1v1h-1zM33 15h1v1h-1zM3 16h1v1h-1zM5 16h1v1h-1zM8 16h5v1h-5zM16 16h1v1h-1zM19 16h1v1h-1zM21 16h2v1h-2zM28 16h3v1h-3zM3 17h1v1h-1zM5 17h3v1h-3zM11 17h1v1h-1zM14 17h1v1h-1zM17 17h1v1h-1zM20 17h1v1h-1zM23 17h3v1h-3zM27 17h4v1h-4zM32 17h1v1h-1zM3 18h1v1h-1zM7 18h2v1h-2zM13 18h1v1h-1zM15 18h2v1h-2zM18 18h1v1h-1zM20 18h1v1h-1zM23 18h2v1h-2zM27 18h2v1h-2zM30 18h3v1h-3zM2 19h2v1h-2zM5 19h1v1h-1zM9 19h1v1h-1zM11 19h1v1h-1zM13 19h2v1h-2zM17 19h1v1h-1zM22 19h2v1h-2zM25 19h4v1h-4zM30 19h2v1h-2zM34 19h1v1h-1zM2 20h1v1h-1zM5 20h1v1h-1zM8 20h1v1h-1zM10 20h1v1h-1zM12 20h3v1h-3zM16 20h3v1h-3zM20 20h1v1h-1zM24 20h1v1h-1zM26 20h2v1h-2zM29 20h2v1h-2zM32 20h2v1h-2zM3 21h1v1h-1zM6 21h1v1h-1zM10 21h1v1h-1zM12 21h1v1h-1zM16 21h2v1h-2zM19 21h2v1h-2zM22 21h1v1h-1zM24 21h4v1h-4zM30 21h1v1h-1zM3 22h1v1h-1zM7 22h2v1h-2zM11 22h2v1h-2zM15 22h1v1h-1zM18 22h1v1h-1zM21 22h1v1h-1zM24 22h1v1h-1zM31 22h2v1h-2zM34 22h1v1h-1zM2 23h6v1h-6zM14 23h2v1h-2zM17 23h3v1h-3zM22 23h2v1h-2zM25 23h2v1h-2zM28 23h1v1h-1zM31 23h1v1h-1zM34 23h1v1h-1zM4 24h1v1h-1zM7 24h7v1h-7zM15 24h1v1h-1zM17 24h1v1h-1zM20 24h4v1h-4zM25 24h2v1h-2zM28 24h2v1h-2zM31 24h4v1h-4zM3 25h1v1h-1zM5 25h2v1h-2zM10 25h1v1h-1zM12 25h2v1h-2zM16 25h2v1h-2zM20 25h1v1h-1zM22 25h1v1h-1zM24 25h1v1h-1zM30 25h2v1h-2zM34 25h1v1h-1zM2 26h1v1h-1zM4 26h1v1h-1zM8 26h1v1h-1zM10 26h3v1h-3zM19 26h1v1h-1zM21 26h2v1h-2zM24 26h8v1h-8zM33 26h2v1h-2zM10 27h4v1h-4zM15 27h1v1h-1zM17 27h2v1h-2zM21 27h1v1h-1zM23 27h1v1h-1zM26 27h1v1h-1zM30 27h2v1h-2zM2 28h7v1h-7zM10 28h1v1h-1zM12 28h2v1h-2zM15 28h1v1h-1zM19 28h5v1h-5zM25 28h2v1h-2zM28 28h1v1h-1zM30 28h1v1h-1zM33 28h1v1h-1zM2 29h1v1h-1zM8 29h1v1h-1zM10 29h2v1h-2zM14 29h2v1h-2zM17 29h4v1h-4zM25 29h2v1h-2zM30 29h3v1h-3zM34 29h1v1h-1zM2 30h1v1h-1zM4 30h3v1h-3zM8 30h1v1h-1zM11 30h1v1h-1zM14 30h2v1h-2zM18 30h3v1h-3zM24 30h7v1h-7zM32 30h2v1h-2zM2 31h1v1h-1zM4 31h3v1h-3zM8 31h1v1h-1zM10 31h2v1h-2zM13 31h1v1h-1zM18 31h1v1h-1zM21 31h1v1h-1zM24 31h2v1h-2zM29 31h1v1h-1zM33 31h2v1h-2zM2 32h1v1h-1zM4 32h3v1h-3zM8 32h1v1h-1zM10 32h1v1h-1zM12 32h1v1h-1zM14 32h1v1h-1zM17 32h2v1h-2zM22 32h8v1h-8zM2 33h1v1h-1zM8 33h1v1h-1zM12 33h1v1h-1zM14 33h1v1h-1zM16 33h1v1h-1zM19 33h1v1h-1zM22 33h1v1h-1zM26 33h1v1h-1zM28 33h3v1h-3zM34 33h1v1h-1zM2 34h7v1h-7zM10 34h1v1h-1zM12 34h4v1h-4zM19 34h3v1h-3zM23 34h1v1h-1zM25 34h1v1h-1zM30 34h1v1h-1zM32 34h1v1h-1z";

type Poster = {
  key: string;
  button: string;
  link: string;
  qrPath: string;
  posterSubtitle: string;
  panelBlurb: string;
  steps: string[];
};

const POSTERS: Poster[] = [
  {
    key: "register",
    button: "Registration QR code",
    link: REG_LINK,
    qrPath: REG_PATH,
    posterSubtitle: "Scan to join AutoKnerd",
    panelBlurb:
      "Hand this out or post it where you onboard your team. Each person scans it once with a phone camera to create their account - it carries your store code, so nobody types anything.",
    steps: [
      "Point your phone camera at the code and tap the link.",
      "Enter your name, work email, and a password.",
      "Pick your role (Sales Consultant, manager, service, parts).",
      "Tap Create account - you are in. No app to download.",
    ],
  },
  {
    key: "login",
    button: "Daily log in QR code",
    link: LOGIN_LINK,
    qrPath: LOGIN_PATH,
    posterSubtitle: "Scan to log in and train",
    panelBlurb:
      "Post this where the team trains - the tower, the service drive, the break room. They scan it each day to log in and do that day's 5-minute reps. Already-registered users only; new people use the Registration code first.",
    steps: [
      "Point your phone camera at the code and tap the link.",
      "Log in with the email and password you registered.",
      "Go straight into today's 5-minute training.",
      "Bookmark it or add to your home screen for one-tap access.",
    ],
  },
];

function qrSvg(qrPath: string, size: number, label: string): string {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" ` +
    `viewBox="0 0 ${QR_MODULES} ${QR_MODULES}" shape-rendering="crispEdges" ` +
    `role="img" aria-label="${label}">` +
    `<rect width="${QR_MODULES}" height="${QR_MODULES}" fill="#FFFFFF"/>` +
    `<path d="${qrPath}" fill="#0C1512"/></svg>`
  );
}

function printPoster(p: Poster) {
  const w = window.open("", "_blank", "width=720,height=900");
  if (!w) return;
  const stepsHtml = p.steps.map((s) => `<li>${s}</li>`).join("");
  w.document.write(
    `<!doctype html><html><head><meta charset="utf-8"><title>${STORE} - ${p.button}</title>` +
      `<style>` +
      `*{box-sizing:border-box}` +
      `body{margin:0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;` +
      `color:#0C1512;display:flex;min-height:100vh;align-items:center;justify-content:center;padding:40px}` +
      `.card{width:100%;max-width:520px;text-align:center;border:2px solid #0C1512;border-radius:24px;padding:40px}` +
      `.kick{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.16em;text-transform:uppercase;` +
      `font-size:12px;color:#2C5B12;margin:0}` +
      `h1{font-size:28px;margin:10px 0 4px;letter-spacing:-.01em}` +
      `.sub{font-size:16px;color:#535D57;margin:0 0 24px}` +
      `.qr{width:300px;height:300px;margin:0 auto}` +
      `.steps{text-align:left;font-size:15px;line-height:1.6;max-width:380px;margin:26px auto 0;color:#2C332E}` +
      `.steps li{margin-bottom:6px}` +
      `.link{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;color:#6A736D;` +
      `word-break:break-all;margin-top:22px}` +
      `.dot{display:inline-block;width:9px;height:9px;border-radius:50%;background:#9ED70A;` +
      `box-shadow:0 0 0 4px rgba(158,215,10,.18);margin-right:8px;vertical-align:middle}` +
      `@media print{body{padding:0}.card{border:none}}` +
      `</style></head><body><div class="card">` +
      `<p class="kick"><span class="dot"></span>AutoKnerd &middot; 90-Day Pilot</p>` +
      `<h1>${STORE}</h1>` +
      `<p class="sub">${p.posterSubtitle}</p>` +
      `<div class="qr">${qrSvg(p.qrPath, 300, p.posterSubtitle)}</div>` +
      `<ol class="steps">${stepsHtml}</ol>` +
      `<p class="link">${p.link}</p>` +
      `</div><script>window.onload=function(){setTimeout(function(){window.print()},250)}<\/script>` +
      `</body></html>`
  );
  w.document.close();
}

export function QrPoster() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {POSTERS.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => setOpen((v) => (v === p.key ? null : p.key))}
            style={{
              border: "1px solid #0C1512",
              cursor: "pointer",
              borderRadius: 12,
              padding: "12px 22px",
              minHeight: 48,
              fontWeight: 800,
              fontSize: 15,
              fontFamily: "inherit",
              background: open === p.key ? "#0C1512" : "transparent",
              color: open === p.key ? "#FFFFFF" : "#0C1512",
            }}
          >
            {p.button}
          </button>
        ))}
      </div>

      {POSTERS.filter((p) => p.key === open).map((p) => (
        <div
          key={p.key}
          style={{
            marginTop: 6,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 20,
            padding: "clamp(18px, 3vw, 24px)",
            border: "1px solid #E7ECE5",
            borderRadius: 16,
            background: "#FFFFFF",
          }}
        >
          <div
            style={{ width: 150, height: 150, flexShrink: 0 }}
            dangerouslySetInnerHTML={{ __html: qrSvg(p.qrPath, 150, p.posterSubtitle) }}
          />
          <div style={{ flex: "1 1 240px", minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#2C332E" }}>{p.panelBlurb}</p>
            <button
              type="button"
              onClick={() => printPoster(p)}
              style={{
                marginTop: 14,
                border: "none",
                cursor: "pointer",
                borderRadius: 12,
                padding: "12px 22px",
                minHeight: 48,
                fontWeight: 800,
                fontSize: 15,
                fontFamily: "inherit",
                background: "#CCFF00",
                color: "#0C1512",
                boxShadow: "0 8px 20px rgba(160,214,0,0.35)",
              }}
            >
              Print QR poster
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

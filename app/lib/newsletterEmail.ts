// Pure builder: turns one podcast episode (plus its article and companion tool)
// into a ready-to-send newsletter email. Client-safe, no server imports. Output
// HTML is table-based with inline styles so it survives real email clients.

import type { EpisodeArticle } from "@/app/lib/episodeArticles";
import type { EpisodeTool } from "@/app/lib/episodeTools";

export type NewsletterEpisode = {
  slug: string;
  title: string;
  summary: string;
  audioUrl: string;
  pubDate: string;
  durationSeconds?: number;
};

export type Newsletter = {
  subject: string;
  preview: string;
  html: string;
  text: string;
};

const INK = "#0C1512";
const LIME = "#CCFF00";
const GREEN = "#2C5B12";
const PAPER = "#F5F7F3";
const CARD = "#FFFFFF";
const BORDER = "#E7ECE5";
const MUTED = "#6A736D";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function clean(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function fmtDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function firstSentence(value: string): string {
  const match = value.match(/^.*?[.!?](\s|$)/);
  return clean(match ? match[0] : value);
}

function button(href: string, label: string, dark = true): string {
  const bg = dark ? INK : LIME;
  const color = dark ? "#FFFFFF" : INK;
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:18px 0 0;"><tr><td style="border-radius:999px;background:${bg};">
    <a href="${esc(href)}" style="display:inline-block;padding:13px 26px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:${color};text-decoration:none;border-radius:999px;">${esc(label)}</a>
  </td></tr></table>`;
}

export function buildEpisodeNewsletter(
  episode: NewsletterEpisode,
  article: EpisodeArticle | null,
  tool: EpisodeTool,
  baseUrl = "https://autoknerd.com"
): Newsletter {
  const base = baseUrl.replace(/\/$/, "");
  const episodeUrl = `${base}/podcast/${episode.slug}`;
  const toolUrl = `${base}${tool.href}`;

  const headline = clean(article?.headline ?? episode.title);
  const dek = clean(article?.dek ?? episode.summary);
  const minutes = episode.durationSeconds ? `${Math.round(episode.durationSeconds / 60)} min` : "";
  const subject = headline;
  const preview = dek.slice(0, 120);

  // "The read" block differs for flagship (hand-written moves) vs. everything else.
  const moves = article?.moves ?? [];
  const readHtml = moves.length
    ? `<p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;letter-spacing:0.12em;color:${MUTED};text-transform:uppercase;">${esc(article?.movesHeading ?? "What to do instead")}</p>
       ${moves
         .map(
           ([title, detail], i) => `<p style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#2C332E;"><strong>${i + 1}. ${esc(title)}.</strong> ${esc(firstSentence(detail))}</p>`
         )
         .join("")}`
    : `<p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.65;color:#2C332E;">${esc(dek)}</p>`;

  const quoteHtml = article?.quote
    ? `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:18px 0 0;"><tr>
        <td style="border-left:3px solid ${LIME};background:#F7F9F5;border-radius:0 12px 12px 0;padding:16px 20px;font-family:Georgia,serif;font-size:18px;font-style:italic;line-height:1.45;color:#1E241F;">${esc(article.quote)}</td>
      </tr></table>`
    : "";

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:${PAPER};">
  <span style="display:none!important;opacity:0;color:transparent;height:0;width:0;overflow:hidden;">${esc(preview)}</span>
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${PAPER};padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;width:100%;background:${CARD};border:1px solid ${BORDER};border-radius:20px;overflow:hidden;">
        <tr><td style="padding:22px 28px 0;">
          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:800;color:${INK};">AutoKnerd</p>
        </td></tr>
        <tr><td style="padding:18px 28px 0;">
          <p style="margin:0;font-family:'Courier New',monospace;font-size:11px;font-weight:700;letter-spacing:0.14em;color:${GREEN};text-transform:uppercase;">New episode${minutes ? ` &middot; ${esc(minutes)}` : ""} &middot; ${esc(fmtDate(episode.pubDate))}</p>
          <h1 style="margin:10px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:28px;line-height:1.2;font-weight:800;color:${INK};">${esc(headline)}</h1>
          <p style="margin:12px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#4B5551;">${esc(dek)}</p>
          ${button(episodeUrl, "▶  Listen to the episode")}
        </td></tr>
        <tr><td style="padding:24px 28px 0;">
          <hr style="border:none;border-top:1px solid ${BORDER};margin:0 0 20px;">
          ${readHtml}
          ${quoteHtml}
        </td></tr>
        <tr><td style="padding:22px 28px 0;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#FBFFEF;border:1px solid #CDE88A;border-radius:16px;">
            <tr><td style="padding:20px 22px;">
              <p style="margin:0;font-family:'Courier New',monospace;font-size:11px;font-weight:700;letter-spacing:0.14em;color:${GREEN};text-transform:uppercase;">This week's free tool</p>
              <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:19px;font-weight:800;color:${INK};">${esc(tool.title)}</p>
              <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;color:#4B5551;">${esc(tool.description)}</p>
              ${button(toolUrl, "Get the free tool", false)}
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:24px 28px 28px;">
          <hr style="border:none;border-top:1px solid ${BORDER};margin:0 0 18px;">
          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#2C332E;">Run it with your team this week.</p>
          <p style="margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#2C332E;">&mdash; Andrew, AutoKnerd</p>
          <p style="margin:18px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:${MUTED};">You're getting this because you follow the AutoKnerd Podcast.<br><a href="*|UNSUB|*" style="color:${MUTED};">Unsubscribe</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const textLines = [
    `AUTOKNERD // NEW EPISODE${minutes ? ` (${minutes})` : ""} // ${fmtDate(episode.pubDate)}`,
    "",
    headline,
    "",
    dek,
    "",
    `Listen: ${episodeUrl}`,
    "",
    article?.movesHeading ? article.movesHeading.toUpperCase() : "THE READ",
    ...(moves.length
      ? moves.map(([title, detail], i) => `${i + 1}. ${title}. ${firstSentence(detail)}`)
      : [dek]),
    ...(article?.quote ? ["", `"${article.quote}"`] : []),
    "",
    `THIS WEEK'S FREE TOOL: ${tool.title}`,
    tool.description,
    `Get it: ${toolUrl}`,
    "",
    "Run it with your team this week.",
    "- Andrew, AutoKnerd",
    "",
    "Unsubscribe: *|UNSUB|*",
  ];

  return { subject, preview, html, text: textLines.join("\n") };
}

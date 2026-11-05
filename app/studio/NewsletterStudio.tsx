"use client";

import { useMemo, useState } from "react";
import s from "@/app/components/site.module.css";
import { getEpisodeArticle } from "@/app/lib/episodeArticles";
import { inferTopicsForEpisode } from "@/app/lib/podcastTopics";
import {
  ALL_EPISODE_TOOLS,
  getEpisodeTool,
  getToolBySlugAny,
} from "@/app/lib/episodeTools";
import { buildEpisodeNewsletter } from "@/app/lib/newsletterEmail";

export type StudioEpisode = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  audioUrl: string;
  pubDate: string;
  durationSeconds?: number;
};

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(date);
}

const field: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  border: "1px solid #D8DED7",
  borderRadius: 12,
  padding: "11px 13px",
  fontSize: 14,
  fontFamily: "inherit",
  color: "#0C1512",
  background: "#FFFFFF",
};

const label: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#8A938D",
  margin: "0 0 7px",
};

export default function NewsletterStudio({ episodes }: { episodes: StudioEpisode[] }) {
  const [slug, setSlug] = useState(episodes[0]?.slug ?? "");
  const [toolOverride, setToolOverride] = useState("");
  const [subjectEdit, setSubjectEdit] = useState<string | null>(null);
  const [tab, setTab] = useState<"preview" | "html" | "text">("preview");
  const [copied, setCopied] = useState("");

  const episode = episodes.find((item) => item.slug === slug) ?? episodes[0];

  const matchedTopics = useMemo(
    () => (episode ? inferTopicsForEpisode(episode.title, episode.description, 3) : []),
    [episode]
  );
  const autoToolSlug = useMemo(
    () => (episode ? getEpisodeTool(episode.slug, matchedTopics).slug : ""),
    [episode, matchedTopics]
  );

  const effectiveToolSlug = toolOverride || autoToolSlug;
  const tool = getToolBySlugAny(effectiveToolSlug) ?? (episode ? getEpisodeTool(episode.slug, matchedTopics) : ALL_EPISODE_TOOLS[0]);
  const article = episode ? getEpisodeArticle(episode.slug) : null;

  const letter = useMemo(
    () => (episode ? buildEpisodeNewsletter(episode, article, tool) : null),
    [episode, article, tool]
  );

  if (!episode || !letter) {
    return (
      <div className={s.page}>
        <div className={s.container} style={{ paddingTop: 80, paddingBottom: 80 }}>
          <div className={s.card}>Podcast episodes are temporarily unavailable. Try again in a moment.</div>
        </div>
      </div>
    );
  }

  const subject = subjectEdit ?? letter.subject;

  async function copy(key: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied((current) => (current === key ? "" : current)), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }

  function downloadHtml() {
    if (!letter) return;
    const blob = new Blob([letter.html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `autoknerd-newsletter-${episode.slug}.html`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  function onEpisodeChange(nextSlug: string) {
    setSlug(nextSlug);
    setToolOverride("");
    setSubjectEdit(null);
  }

  const copyBtn: React.CSSProperties = {
    border: "1px solid #D8DED7",
    background: "#FFFFFF",
    color: "#0C1512",
    borderRadius: 999,
    padding: "9px 15px",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
  };

  return (
    <div className={s.page}>
      <header className={s.hero} style={{ paddingBottom: 0 }}>
        <div className={s.container}>
          <span className={`${s.eyebrow} ${s.mono}`}>
            <span className={s.dot} />NEWSLETTER STUDIO · INTERNAL
          </span>
          <h1 className={s.h1} style={{ fontSize: "clamp(30px, 5vw, 46px)", maxWidth: 760 }}>
            Build this week&apos;s email.
          </h1>
          <p className={s.lead} style={{ maxWidth: 620 }}>
            Pick an episode, confirm its tool, then copy the email into your Podbean / Mailchimp campaign and send.
          </p>
        </div>
      </header>

      <section className={s.section} style={{ paddingTop: "clamp(28px, 4vw, 40px)" }}>
        <div className={s.container}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 360px) minmax(0, 1fr)", gap: 22, alignItems: "start" }} className="studioGrid">
            {/* CONTROLS */}
            <div className={s.card} style={{ padding: 22, position: "sticky", top: 20 }}>
              <div>
                <label style={label} htmlFor="ns-episode">Episode</label>
                <select id="ns-episode" style={field} value={slug} onChange={(event) => onEpisodeChange(event.target.value)}>
                  {episodes.map((item) => (
                    <option key={item.slug} value={item.slug}>
                      {formatDate(item.pubDate)} — {item.title}
                    </option>
                  ))}
                </select>
                <p style={{ margin: "7px 0 0", fontSize: 12, color: "#8A938D" }}>
                  {article ? "Flagship episode (hand-written playbook)." : "Standard episode (built from the feed)."}
                </p>
              </div>

              <div style={{ marginTop: 18 }}>
                <label style={label} htmlFor="ns-tool">This week&apos;s tool</label>
                <select
                  id="ns-tool"
                  style={field}
                  value={effectiveToolSlug}
                  onChange={(event) => setToolOverride(event.target.value)}
                >
                  {ALL_EPISODE_TOOLS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.title}</option>
                  ))}
                </select>
                <p style={{ margin: "7px 0 0", fontSize: 12, color: "#8A938D" }}>
                  {toolOverride ? "Overridden for this send." : "Auto-matched to the episode. Change it anytime."}
                </p>
              </div>

              <div style={{ marginTop: 18 }}>
                <label style={label} htmlFor="ns-subject">Subject line</label>
                <input id="ns-subject" style={field} value={subject} onChange={(event) => setSubjectEdit(event.target.value)} />
                <p style={{ margin: "7px 0 0", fontSize: 12, color: "#8A938D" }}>Preview text: {letter.preview}</p>
              </div>

              <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 9 }}>
                <button type="button" style={copyBtn} onClick={() => copy("subject", subject)}>
                  {copied === "subject" ? "Copied ✓" : "Copy subject"}
                </button>
                <button type="button" style={{ ...copyBtn, background: "#0C1512", color: "#FFFFFF", border: "1px solid #0C1512" }} onClick={() => letter && copy("html", letter.html)}>
                  {copied === "html" ? "Copied ✓" : "Copy HTML"}
                </button>
                <button type="button" style={copyBtn} onClick={() => letter && copy("text", letter.text)}>
                  {copied === "text" ? "Copied ✓" : "Copy plain text"}
                </button>
                <button type="button" style={copyBtn} onClick={downloadHtml}>Download .html</button>
              </div>

              <p style={{ margin: "18px 0 0", fontSize: 12, lineHeight: 1.5, color: "#8A938D" }}>
                Paste the HTML into a new campaign in Mailchimp (your Podbean list), set the subject, and send. The
                <code style={{ background: "#F0F3EC", padding: "1px 5px", borderRadius: 5 }}>*|UNSUB|*</code> link is a
                placeholder — swap it for your platform&apos;s unsubscribe merge tag.
              </p>
            </div>

            {/* PREVIEW */}
            <div className={s.card} style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ display: "flex", gap: 4, padding: 12, borderBottom: "1px solid #E7ECE5", background: "#FAFBF8" }}>
                {(["preview", "html", "text"] as const).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setTab(key)}
                    style={{
                      border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 700,
                      padding: "8px 14px", borderRadius: 999,
                      background: tab === key ? "#0C1512" : "transparent",
                      color: tab === key ? "#CCFF00" : "#6A736D",
                    }}
                  >
                    {key === "preview" ? "Preview" : key === "html" ? "HTML" : "Plain text"}
                  </button>
                ))}
              </div>

              {tab === "preview" ? (
                <iframe title="Email preview" srcDoc={letter.html} style={{ width: "100%", height: 820, border: "none", display: "block", background: "#F5F7F3" }} />
              ) : (
                <pre style={{ margin: 0, padding: 20, maxHeight: 820, overflow: "auto", fontSize: 12.5, lineHeight: 1.6, whiteSpace: "pre-wrap", wordBreak: "break-word", color: "#2C332E", background: "#FFFFFF" }}>
                  {tab === "html" ? letter.html : letter.text}
                </pre>
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`@media (max-width: 860px){ .studioGrid{ grid-template-columns: 1fr !important; } .studioGrid > div:first-child{ position: static !important; } }`}</style>
    </div>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { SiteNav } from "@/app/components/SiteNav";
import { SiteFooter } from "@/app/components/SiteFooter";
import s from "@/app/components/site.module.css";
import { getPodcastFeedData, getPodcastEpisodeBySlug } from "@/app/lib/podcast";
import { getRelatedAutoKnerdTools } from "@/app/lib/podcastTools";
import { getEpisodeArticle, type EpisodeToolBlock } from "@/app/lib/episodeArticles";
import { Headphones, FileText, Wrench, ArrowRight, Check, Play } from "lucide-react";

export const revalidate = 300;
export const dynamicParams = true;

type EpisodePageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function stripTimestampTail(description: string): string {
  const match = description.match(/\b\d{1,2}:\d{2}(?::\d{2})?\b/);
  if (!match || match.index === undefined) return description;
  return description.slice(0, match.index).trim();
}

function normalizeForComparison(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
}

function cleanPoint(value: string): string {
  return value
    .replace(/^[•\-\s]+/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function truncatePoint(value: string, maxLength = 180): string {
  if (value.length <= maxLength) return value;
  const cut = value.slice(0, maxLength);
  const punctuationIndex = Math.max(cut.lastIndexOf("."), cut.lastIndexOf(","), cut.lastIndexOf(";"));
  return `${(punctuationIndex > 80 ? cut.slice(0, punctuationIndex) : cut).trim()}...`;
}

function extractInsightPoints(
  description: string,
  options: { maxItems?: number; truncate?: boolean } = {}
): string[] {
  const { maxItems = 6, truncate = true } = options;
  const source = stripTimestampTail(description)
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  if (!source) return [];

  const rawPoints: string[] = [];
  const paragraphs = source.split(/\n\s*\n+/).map((part) => part.trim());

  paragraphs.forEach((paragraph) => {
    if (!paragraph) return;

    if (paragraph.includes("•")) {
      paragraph.split("•").forEach((part) => rawPoints.push(part));
      return;
    }

    if (/(^|\n)\s*-\s+\S/.test(paragraph)) {
      paragraph.split(/\n\s*-\s+/).forEach((part) => rawPoints.push(part));
      return;
    }

    rawPoints.push(paragraph);
  });

  if (rawPoints.length === 0) rawPoints.push(source);

  const concisePoints: string[] = [];
  rawPoints.forEach((raw) => {
    const cleaned = cleanPoint(raw);
    if (cleaned.length < 24) return;

    if (cleaned.length > 220) {
      const sentenceParts = cleaned
        .split(/(?<=[.!?])\s+/)
        .map(cleanPoint)
        .filter((part) => part.length >= 24 && !/\b\d{1,2}:\d{2}(?::\d{2})?\b/.test(part));

      if (sentenceParts.length > 1) {
        sentenceParts.forEach((part) => concisePoints.push(truncate ? truncatePoint(part, 170) : part));
        return;
      }
    }

    concisePoints.push(truncate ? truncatePoint(cleaned, 170) : cleaned);
  });

  const deduped: string[] = [];
  const seen = new Set<string>();
  concisePoints.forEach((point) => {
    const normalized = normalizeForComparison(point);
    if (!normalized || seen.has(normalized)) return;
    seen.add(normalized);
    deduped.push(point);
  });

  return deduped.slice(0, maxItems);
}

function getBreakdownPoints(description: string): string[] {
  return extractInsightPoints(description, { maxItems: 6 });
}

function getLearnPoints(description: string, overview: string): string[] {
  const points = extractInsightPoints(description, { maxItems: 8, truncate: false });
  const normalizedOverview = normalizeForComparison(overview);
  const filtered = points.filter((point) => {
    const normalizedPoint = normalizeForComparison(point);
    return normalizedPoint.length > 0 && !normalizedOverview.includes(normalizedPoint);
  });
  return filtered.length > 0 ? filtered : points;
}

function getKeyTakeaway(description: string): string {
  const points = getBreakdownPoints(description);
  return points[0] ?? "";
}

function getTimestamps(description: string): Array<{ time: string; label: string }> {
  const normalized = description.replace(/\s+/g, " ").trim();
  const regex =
    /(\b\d{1,2}:\d{2}(?::\d{2})?\b)\s*(?:-|:)?\s*([^0-9][^]*?)(?=\b\d{1,2}:\d{2}(?::\d{2})?\b|$)/g;
  const matches = Array.from(normalized.matchAll(regex));

  return matches
    .map((match) => ({
      time: match[1].trim(),
      label: match[2].replace(/\s+/g, " ").trim(),
    }))
    .filter((item) => item.label.length > 2)
    .slice(0, 8);
}

function inferFrameworkName(content: string): string {
  const text = content.toLowerCase();
  if (text.includes("discovery") || text.includes("needs assessment")) {
    return "Discovery Alignment Model";
  }
  if (text.includes("trust") || text.includes("confidence")) {
    return "Trust Stabilization Loop";
  }
  if (text.includes("manager") || text.includes("reinforcement")) {
    return "Manager Reinforcement System";
  }
  if (text.includes("predictability")) {
    return "Predictability Engine";
  }
  return "Behavioral Stability Model";
}

function getOverviewParagraph(description: string): string {
  const text = stripTimestampTail(description).replace(/\s+/g, " ").trim();
  if (!text) return "";
  if (text.length <= 260) return text;
  const cut = text.slice(0, 260);
  const lastSentence = cut.lastIndexOf(".");
  return (lastSentence > 80 ? cut.slice(0, lastSentence + 1) : `${cut.trim()}...`).trim();
}

function getFrameworkContent(source: string): { name: string; explanation: string; corePrinciple: string[] } | null {
  const normalized = stripTimestampTail(source).replace(/\s+/g, " ").trim();
  if (!normalized) return null;

  const sentenceParts = normalized
    .split(/[.!?]+/)
    .map((part) => part.trim())
    .filter((part) => part.length > 22);
  if (sentenceParts.length === 0) return null;

  const explanation = sentenceParts[0];
  const corePrinciple = sentenceParts.slice(1, 3);
  const name = inferFrameworkName(normalized);

  if (!explanation) return null;

  return {
    name,
    explanation,
    corePrinciple: corePrinciple.length > 0 ? corePrinciple : [sentenceParts[0]],
  };
}

export async function generateStaticParams() {
  try {
    const data = await getPodcastFeedData();
    return data.episodes.map((episode) => ({ slug: episode.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: EpisodePageProps): Promise<Metadata> {
  const { slug } = await params;
  const episodeData = await getPodcastEpisodeBySlug(slug);

  if (!episodeData) {
    return {
      title: "Podcast Episode | AutoKnerd",
      description: "Podcast episode details from AutoKnerd.",
    };
  }

  return {
    title: `${episodeData.episode.title} | AutoKnerd Podcast`,
    description: episodeData.episode.summary,
  };
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const { slug } = await params;
  const episodeData = await getPodcastEpisodeBySlug(slug);

  if (!episodeData) notFound();

  const { episode, related, matchedTopics } = episodeData;

  const article = getEpisodeArticle(slug);
  const overview = getOverviewParagraph(episode.description);
  const learnPoints = getLearnPoints(episode.description, overview || episode.summary).slice(0, 5);
  const takeaway = getKeyTakeaway(episode.description);
  const timestamps = getTimestamps(episode.description);
  const tools = getRelatedAutoKnerdTools(matchedTopics, 2);
  const tool: EpisodeToolBlock | null =
    article?.tool ??
    (tools[0]
      ? {
          kicker: "PUT IT TO WORK · FREE TOOL",
          title: tools[0].title,
          desc: tools[0].description,
          href: tools[0].href,
          cta: "Open the tool",
        }
      : null);
  const readText = article
    ? [article.intro, ...article.moves.map((m) => m[1])].join(" ")
    : [overview, ...learnPoints].join(" ");
  const readMin = Math.max(2, Math.round(readText.split(/\s+/).filter(Boolean).length / 180));
  const durationLabel = episode.durationSeconds ? `${Math.round(episode.durationSeconds / 60)} min` : "";
  const topicLabel = (article?.eyebrow || matchedTopics[0] || "AutoKnerd Podcast").toUpperCase();
  const headingStyle = { fontSize: 24, fontWeight: 800, margin: "34px 0 10px", letterSpacing: "-0.01em" };

  return (
    <div className={s.page}>
      <SiteNav />

      {/* HERO */}
      <header className={s.hero} style={{ paddingBottom: 0 }}>
        <div className={s.container} style={{ maxWidth: 820 }}>
          <Link href="/podcast" className={s.textLink} style={{ display: "inline-block", marginBottom: 18, fontSize: 13 }}>
            ← Back to episodes
          </Link>
          <span className={`${s.eyebrow} ${s.mono}`}>
            <span className={s.dot} />{topicLabel} · {formatDate(episode.pubDate)}
          </span>
          <h1 className={s.h1} style={{ maxWidth: 760 }}>{article?.headline || episode.title}</h1>
          <p className={s.lead} style={{ maxWidth: 640 }}>{article?.dek || overview || episode.summary}</p>

          {/* FORMAT BAR: pick your intent */}
          <div className={s.chips} style={{ marginTop: 26 }}>
            <a href="#listen" className={s.chip}><Headphones size={15} />&nbsp; Listen{durationLabel ? ` · ${durationLabel}` : ""}</a>
            <a href="#read" className={s.chip}><FileText size={15} />&nbsp; Read · {readMin} min</a>
            {tool ? <a href="#tool" className={s.chip}><Wrench size={15} />&nbsp; Get the tool</a> : null}
          </div>
        </div>
      </header>

      {/* LISTEN */}
      <section id="listen" className={s.section} style={{ paddingTop: "clamp(32px, 5vw, 48px)" }}>
        <div className={s.container} style={{ maxWidth: 820 }}>
          <div className={s.card} style={{ padding: "clamp(20px, 3vw, 28px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
              <span style={{ width: 44, height: 44, borderRadius: 12, background: "#F0F3EC", display: "grid", placeItems: "center", color: "#5E8A00", flex: "0 0 44px" }}><Play size={20} /></span>
              <div>
                <p className={s.mono} style={{ margin: 0, fontSize: 11, letterSpacing: "0.14em", color: "#8A938D" }}>LISTEN TO THE EPISODE</p>
                <p style={{ margin: "3px 0 0", fontWeight: 800, fontSize: 16 }}>{episode.title}</p>
              </div>
            </div>
            <div style={{ borderRadius: 14, border: "1px solid #E7ECE5", background: "#F7F9F5", padding: 12 }}>
              <audio controls style={{ width: "100%" }}>
                <source src={episode.audioUrl} />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        </div>
      </section>

      {/* READ */}
      <article id="read" className={s.section} style={{ paddingTop: "clamp(40px, 6vw, 56px)" }}>
        <div className={s.container} style={{ maxWidth: 720 }}>
          <p className={`${s.mono} ${s.kicker}`}>THE BREAKDOWN</p>
          <div style={{ fontSize: 18, lineHeight: 1.72, color: "#2C332E", marginTop: 18 }}>
            {article ? (
              <>
                <p style={{ marginTop: 0 }}>{article.intro}</p>
                <h2 style={headingStyle}>{article.movesHeading}</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {article.moves.map(([t, d], i) => (
                    <div key={t} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <span style={{ flex: "0 0 30px", height: 30, borderRadius: 9, background: "#DFF29A", color: "#2C332E", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 14 }}>{i + 1}</span>
                      <p style={{ margin: 0 }}><strong>{t}.</strong> {d}</p>
                    </div>
                  ))}
                </div>
                <blockquote style={{ margin: "34px 0 0", padding: "20px 24px", borderLeft: "3px solid #9ED70A", background: "#F7F9F5", borderRadius: "0 14px 14px 0", fontSize: 20, fontWeight: 700, lineHeight: 1.45, color: "#1E241F" }}>
                  {article.quote}
                </blockquote>
              </>
            ) : (
              <>
                {overview ? <p style={{ marginTop: 0 }}>{overview}</p> : null}
                {learnPoints.length > 0 ? (
                  <>
                    <h2 style={headingStyle}>What you’ll take away</h2>
                    <ul style={{ margin: 0, paddingLeft: 22 }}>
                      {learnPoints.map((p) => <li key={p} style={{ marginBottom: 8 }}>{p}</li>)}
                    </ul>
                  </>
                ) : null}
                {takeaway ? (
                  <blockquote style={{ margin: "34px 0 0", padding: "20px 24px", borderLeft: "3px solid #9ED70A", background: "#F7F9F5", borderRadius: "0 14px 14px 0", fontSize: 19, fontWeight: 700, lineHeight: 1.45, color: "#1E241F" }}>
                    {takeaway}
                  </blockquote>
                ) : null}
              </>
            )}
          </div>

          {timestamps.length > 0 ? (
            <div style={{ marginTop: 32, borderTop: "1px solid #E7ECE5", paddingTop: 22 }}>
              <p className={s.mono} style={{ margin: "0 0 12px", fontSize: 11, letterSpacing: "0.16em", color: "#8A938D" }}>IN THIS EPISODE</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {timestamps.map((t) => (
                  <div key={`${t.time}-${t.label}`} style={{ display: "flex", gap: 12, fontSize: 15 }}>
                    <span className={s.mono} style={{ color: "#5E8A00", flex: "0 0 52px", fontWeight: 700 }}>{t.time}</span>
                    <span style={{ color: "#2C332E" }}>{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </article>

      {/* TOOL */}
      {tool ? (
        <section id="tool" className={s.section} style={{ paddingTop: "clamp(40px, 6vw, 56px)" }}>
          <div className={s.container} style={{ maxWidth: 820 }}>
            <div className={s.card} style={{ padding: "clamp(24px, 3vw, 34px)", border: "1px solid #CDE88A", background: "linear-gradient(180deg,#FBFFEF,#F6FAED)" }}>
              <p className={s.mono} style={{ margin: 0, fontSize: 11, letterSpacing: "0.16em", color: "#5E8A00" }}>{tool.kicker}</p>
              <h2 className={s.h2sm} style={{ margin: "10px 0 0", fontSize: "clamp(22px, 3vw, 30px)" }}>{tool.title}</h2>
              <p className={s.cardText} style={{ fontSize: 16, marginTop: 10, maxWidth: 560 }}>{tool.desc}</p>
              {tool.items && tool.items.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "18px 0 22px" }}>
                  {tool.items.map(([line, mean]) => (
                    <div key={line} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "#FFFFFF", border: "1px solid #E7ECE5", borderRadius: 12, padding: "12px 14px" }}>
                      <Check size={16} strokeWidth={2.6} style={{ color: "#5E8A00", marginTop: 3, flex: "0 0 16px" }} />
                      <p style={{ margin: 0, fontSize: 15 }}><strong>{line}</strong> <span style={{ color: "#5B655F" }}>{mean}</span></p>
                    </div>
                  ))}
                  {tool.note ? <p style={{ margin: 0, fontSize: 13, color: "#8A938D" }}>{tool.note}</p> : null}
                </div>
              ) : <div style={{ height: 18 }} />}
              <Link href={tool.href} className={s.btnPrimary} style={{ height: 50, fontSize: 15 }}>
                {tool.cta} <ArrowRight size={16} strokeWidth={2.4} />
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {/* MANAGER EXERCISE */}
      {article?.managerNote ? (
        <section className={s.section} style={{ paddingTop: "clamp(40px, 6vw, 56px)" }}>
          <div className={s.container} style={{ maxWidth: 820 }}>
            <div className={s.card} style={{ padding: "clamp(22px, 3vw, 30px)" }}>
              <p className={`${s.mono} ${s.kicker}`}>{article.managerNote.kicker}</p>
              <p className={s.cardText} style={{ fontSize: 16, marginTop: 12 }}>{article.managerNote.body}</p>
            </div>
          </div>
        </section>
      ) : null}

      {/* RELATED */}
      {related.length > 0 ? (
        <section className={s.section} style={{ paddingTop: "clamp(40px, 6vw, 56px)" }}>
          <div className={s.container} style={{ maxWidth: 820 }}>
            <p className={`${s.mono} ${s.kicker}`}>KEEP GOING</p>
            <div className={s.grid3} style={{ marginTop: 20 }}>
              {related.map((r) => (
                <Link key={r.slug} href={`/podcast/${r.slug}`} className={s.card} style={{ padding: 20, textDecoration: "none" }}>
                  <p className={s.mono} style={{ margin: 0, fontSize: 11, letterSpacing: "0.12em", color: "#8A938D" }}>{formatDate(r.pubDate)}</p>
                  <p style={{ margin: "10px 0 0", fontWeight: 800, fontSize: 17, lineHeight: 1.3, color: "#1E241F" }}>{r.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section className={s.section} style={{ paddingTop: "clamp(40px, 6vw, 56px)", paddingBottom: "clamp(56px, 8vw, 88px)" }}>
        <div className={s.container} style={{ maxWidth: 820 }}>
          <div className={s.card} style={{ padding: "clamp(28px, 4vw, 44px)", textAlign: "center" }}>
            <h2 className={s.h2sm} style={{ margin: 0 }}>Make it consistent, not just hoped for.</h2>
            <p className={s.cardText} style={{ fontSize: 16, margin: "12px auto 22px", maxWidth: 520 }}>
              AutoKnerd turns the moves in this episode into five minutes of daily practice, so every rep handles it the same way. See it in your store with a 90-day pilot.
            </p>
            <Link href="/pilot" className={s.btnPrimary} style={{ height: 50, fontSize: 15 }}>
              See the 90-day pilot <ArrowRight size={16} strokeWidth={2.4} />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

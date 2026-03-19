import { notFound } from "next/navigation";
import Link from "next/link";
import { Footer } from "@/app/components/Footer";
import { Navbar } from "@/app/components/Navbar";
import { STRATEGY_CALL_URL } from "@/app/lib/booking";
import { getPodcastFeedData, getPodcastEpisodeBySlug } from "@/app/lib/podcast";
import { getRelatedAutoKnerdTools } from "@/app/lib/podcastTools";
import {
  AUTODRIVECX_INFO_URL,
  AUTODRIVECX_SIGNUP_URL,
  getRecommendedAutoDriveCXSkills,
} from "@/app/lib/autodrivecxSkills";
import type { Metadata } from "next";

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

function extractInsightPoints(description: string, maxItems = 6): string[] {
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
        sentenceParts.forEach((part) => concisePoints.push(truncatePoint(part, 170)));
        return;
      }
    }

    concisePoints.push(truncatePoint(cleaned, 170));
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
  return extractInsightPoints(description, 6);
}

function getLearnPoints(description: string, overview: string): string[] {
  const points = extractInsightPoints(description, 8);
  const normalizedOverview = normalizeForComparison(overview);
  const filtered = points.filter((point) => {
    const normalizedPoint = normalizeForComparison(point);
    return normalizedPoint.length > 0 && !normalizedOverview.includes(normalizedPoint);
  });
  return (filtered.length > 0 ? filtered : points).slice(0, 4);
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
  const breakdownPoints = getBreakdownPoints(episode.description);
  const keyTakeaway = getKeyTakeaway(episode.description);
  const timestamps = getTimestamps(episode.description);
  const overview = getOverviewParagraph(episode.description);
  const learnPoints = getLearnPoints(episode.description, overview || episode.summary);
  const framework = getFrameworkContent(episode.description || keyTakeaway || episode.summary);
  const relatedTools = getRelatedAutoKnerdTools(matchedTopics, 3);
  const relatedSkills = getRecommendedAutoDriveCXSkills(matchedTopics, 3);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-36 md:pt-44 pb-16 md:pb-20 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-mesh-gradient opacity-35 pointer-events-none" />
        <div className="absolute inset-0 parallax-grid-1 pointer-events-none opacity-55" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <Link
            href="/podcast"
            className="inline-block text-primary text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] mb-8 hover:text-white transition-colors"
          >
            Back to Podcast Archive
          </Link>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter text-white leading-tight max-w-6xl">
            {episode.title}
          </h1>
          <p className="mt-5 text-sm uppercase tracking-[0.2em] text-slate/40 font-mono">
            {formatDate(episode.pubDate)}
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20 border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 md:gap-10 items-start">
            <div className="xl:col-span-8 space-y-8 md:space-y-10">
              <div className="luxury-card rounded-[2.8rem] p-8 md:p-12 border-primary/25">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 md:gap-10 items-start">
                  <div className="xl:col-span-5">
                    {episode.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={episode.imageUrl}
                        alt={episode.title}
                        className="w-full rounded-[2rem] border border-white/10 object-cover shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
                      />
                    ) : (
                      <div className="w-full aspect-square rounded-[2rem] border border-white/10 bg-white/[0.02] flex items-center justify-center text-white/40 text-sm uppercase tracking-[0.25em] font-mono">
                        Episode Artwork
                      </div>
                    )}
                  </div>

                  <div className="xl:col-span-7">
                    <div className="mb-8">
                      <h2 className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary/70 mb-4 font-mono">
                        Episode Summary
                      </h2>
                      <p className="text-lg md:text-xl text-slate/70 leading-relaxed tracking-tight mb-7">
                        {overview || episode.summary}
                      </p>
                      {learnPoints.length > 0 && (
                        <div>
                          <h3 className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary/70 mb-4 font-mono">
                            What You&apos;ll Learn
                          </h3>
                          <ul className="space-y-3">
                            {learnPoints.map((point) => (
                              <li key={point} className="text-base md:text-lg text-slate/75 leading-relaxed tracking-tight flex gap-3">
                                <span className="text-primary">•</span>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-4 md:p-5 mb-8">
                      <audio controls className="w-full">
                        <source src={episode.audioUrl} />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href="https://podcasts.apple.com/us/search?term=AutoKnerd%20Podcast"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center bg-primary text-black px-8 py-4 rounded-full text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.3em] border border-primary hover:bg-white hover:border-white transition-all duration-500"
                      >
                        Listen on Apple Podcasts
                      </a>
                      <a
                        href="https://open.spotify.com/search/AutoKnerd%20Podcast"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center px-7 py-4 rounded-full border border-white/10 bg-white/[0.02] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.22em] text-white/75 hover:text-white hover:border-primary/40 transition-all duration-500"
                      >
                        Listen on Spotify
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`grid grid-cols-1 ${keyTakeaway ? "lg:grid-cols-12" : ""} gap-6 md:gap-8`}>
                <div className="lg:col-span-7 rounded-[2rem] border border-white/10 bg-white/[0.02] p-7 md:p-9">
                  <h2 className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary/70 mb-6 font-mono">
                    Episode Breakdown
                  </h2>
                  <ul className="space-y-4">
                    {(breakdownPoints.length > 0 ? breakdownPoints : [episode.summary]).map((point) => (
                      <li key={point} className="text-lg text-slate/75 leading-relaxed tracking-tight flex gap-3">
                        <span className="text-primary">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {keyTakeaway && (
                  <div className="lg:col-span-5 rounded-[2rem] border border-primary/20 bg-primary/[0.05] p-7 md:p-9">
                    <h2 className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary mb-6 font-mono">
                      Key Takeaway
                    </h2>
                    <p className="text-2xl md:text-3xl text-white leading-tight tracking-tight">
                      {keyTakeaway}
                    </p>
                  </div>
                )}
              </div>

              {framework && (
                <div className="rounded-[2rem] border border-primary/30 bg-[linear-gradient(140deg,rgba(124,255,27,0.10)_0%,rgba(255,255,255,0.03)_100%)] p-7 md:p-9 shadow-[0_0_40px_rgba(124,255,27,0.12)]">
                  <h2 className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary mb-5 font-mono">
                    AutoKnerd CX Framework
                  </h2>
                  <h3 className="text-2xl md:text-3xl text-white tracking-tight mb-4 leading-tight">
                    {framework.name}
                  </h3>
                  <p className="text-lg text-slate/75 leading-relaxed tracking-tight mb-7">
                    {framework.explanation}
                  </p>
                  <h4 className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary/80 mb-4 font-mono">
                    Core Principle
                  </h4>
                  <div className="space-y-3">
                    {framework.corePrinciple.map((line) => (
                      <p key={line} className="text-base md:text-lg text-white/90 tracking-tight leading-relaxed">
                        {line}.
                      </p>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-[2rem] border border-primary/20 bg-primary/[0.05] p-7 md:p-9 shadow-[0_0_32px_rgba(124,255,27,0.12)]">
                <h2 className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary mb-4 font-mono">
                  Apply This Skill in Your Showroom
                </h2>
                <p className="text-lg text-slate/75 leading-relaxed tracking-tight mb-4">
                  AutoDriveCX turns the ideas in this episode into guided practice through scenario drills, discovery frameworks, and trust-driven conversation training.
                </p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-primary/80 font-mono mb-6">
                  Start practicing the skill, not just hearing about it.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={AUTODRIVECX_SIGNUP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center bg-primary text-black px-7 py-3.5 rounded-full text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.28em] border border-primary hover:bg-white hover:border-white transition-all duration-300"
                  >
                    Start Training in AutoDriveCX
                  </a>
                  <a
                    href={AUTODRIVECX_INFO_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-white/10 bg-white/[0.02] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.22em] text-white/75 hover:text-white hover:border-primary/40 transition-all duration-300"
                  >
                    What is AutoDriveCX?
                  </a>
                </div>
              </div>

              {timestamps.length > 0 && (
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-7 md:p-9">
                  <h2 className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary/70 mb-6 font-mono">
                    Timestamps
                  </h2>
                  <ul className="space-y-4">
                    {timestamps.map((item) => (
                      <li key={`${item.time}-${item.label}`} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                        <span className="text-primary font-mono text-sm tracking-[0.18em] uppercase">{item.time}</span>
                        <span className="text-slate/75 text-base leading-relaxed tracking-tight">{item.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <aside className="xl:col-span-4 space-y-6 md:space-y-7">
              <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.02] p-6 md:p-7">
                <h2 className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary/70 mb-5 font-mono">
                  Topic Tags
                </h2>
                {matchedTopics.length > 0 ? (
                  <div className="flex flex-wrap gap-2.5">
                    {matchedTopics.slice(0, 3).map((topic) => (
                      <Link
                        key={topic}
                        href={`/podcast?topic=${encodeURIComponent(topic)}`}
                        className="px-3 py-1.5 rounded-full border border-primary/30 bg-primary/[0.06] text-[10px] uppercase tracking-[0.15em] text-primary/90 font-mono hover:border-primary/50 hover:text-white transition-all"
                      >
                        {topic}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate/55">No inferred topic tags for this episode.</p>
                )}
              </div>

              <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.02] p-6 md:p-7">
                <h2 className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary/70 mb-5 font-mono">
                  Related CX Intelligence
                </h2>
                <div className="space-y-4">
                  {related.slice(0, 3).map((item) => (
                    <article key={item.slug} className="border border-white/10 rounded-[1.2rem] bg-black/20 p-4">
                      <h3 className="text-base md:text-lg text-white leading-tight tracking-tight mb-2">
                        {item.title}
                      </h3>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-slate/45 font-mono mb-3">
                        {formatDate(item.pubDate)}
                      </p>
                      <Link
                        href={`/podcast/${item.slug}`}
                        className="text-primary text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] hover:text-white transition-colors"
                      >
                        View Episode
                      </Link>
                    </article>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.02] p-6 md:p-7">
                <h2 className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary/70 mb-5 font-mono">
                  Related AutoKnerd Tools
                </h2>
                <div className="space-y-4">
                  {relatedTools.map((tool) => (
                    <article key={tool.title} className="border border-white/10 rounded-[1.2rem] bg-black/20 p-4">
                      <h3 className="text-base md:text-lg text-white leading-tight tracking-tight mb-2">
                        {tool.title}
                      </h3>
                      <p className="text-sm text-slate/60 leading-relaxed tracking-tight mb-3">
                        {tool.description}
                      </p>
                      <Link
                        href={tool.href}
                        className="text-primary text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] hover:text-white transition-colors"
                      >
                        Explore Tool
                      </Link>
                    </article>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.02] p-6 md:p-7">
                <h2 className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary/70 mb-5 font-mono">
                  Recommended AutoDriveCX Skills
                </h2>
                <p className="text-sm text-slate/60 leading-relaxed tracking-tight mb-5">
                  Based on this episode, here are the best next skills to practice inside AutoDriveCX.
                </p>
                <div className="space-y-4">
                  {relatedSkills.map((skill) => (
                    <article key={skill.title} className="border border-white/10 rounded-[1.2rem] bg-black/20 p-4">
                      <h3 className="text-base md:text-lg text-white leading-tight tracking-tight mb-2">
                        {skill.title}
                      </h3>
                      <p className="text-sm text-slate/60 leading-relaxed tracking-tight mb-3">
                        {skill.description}
                      </p>
                      <a
                        href={AUTODRIVECX_SIGNUP_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] hover:text-white transition-colors"
                      >
                        Practice in AutoDriveCX
                      </a>
                    </article>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.02] p-6 md:p-7">
                <h2 className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary/70 mb-4 font-mono">
                  Related Methodology
                </h2>
                <p className="text-base text-slate/65 leading-relaxed tracking-tight mb-5">
                  Explore the AutoKnerd methodology behind behavioral stabilization, trust-driven CX, and manager-led reinforcement.
                </p>
                <Link
                  href="/methodology"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/10 bg-white/[0.02] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.22em] text-white/75 hover:text-white hover:border-primary/40 transition-all duration-500"
                >
                  Explore Methodology
                </Link>
              </div>

              <div className="rounded-[1.8rem] border border-primary/20 bg-primary/[0.06] p-6 md:p-7">
                <h2 className="text-lg md:text-2xl text-white tracking-tight leading-tight mb-3">
                  Need CX stability at your store?
                </h2>
                <p className="text-base text-slate/75 leading-relaxed tracking-tight mb-5">
                  AutoKnerd helps dealerships replace inconsistent training outcomes with manager-led behavioral systems.
                </p>
                <a
                  href={STRATEGY_CALL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center bg-primary text-black px-6 py-4 rounded-full font-extrabold uppercase tracking-[0.28em] text-[10px] md:text-[11px] border border-primary hover:bg-white hover:border-white transition-all duration-500"
                >
                  Book Strategy Call
                </a>
              </div>

              <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.02] p-6 md:p-7">
                <h2 className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary/70 mb-4 font-mono">
                  Listen On
                </h2>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://open.spotify.com/search/AutoKnerd%20Podcast"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-white/75 hover:text-white hover:border-primary/40 transition-all"
                  >
                    Spotify
                  </a>
                  <a
                    href="https://podcasts.apple.com/us/search?term=AutoKnerd%20Podcast"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-white/75 hover:text-white hover:border-primary/40 transition-all"
                  >
                    Apple
                  </a>
                  <a
                    href="https://www.youtube.com/results?search_query=AutoKnerd+Podcast"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-white/75 hover:text-white hover:border-primary/40 transition-all"
                  >
                    YouTube
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-14 md:py-20 border-b border-white/5">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary/70 mb-8 md:mb-10 font-mono">
              Related Episodes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {related.map((item) => (
                <article
                  key={`main-related-${item.slug}`}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 md:p-7 hover:border-primary/35 hover:shadow-[0_0_45px_rgba(124,255,27,0.2)] hover:-translate-y-1 transition-all duration-500 flex flex-col"
                >
                  <h3 className="text-xl md:text-2xl font-light text-white tracking-tight mb-3 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate/40 mb-4 font-mono">
                    {formatDate(item.pubDate)}
                  </p>
                  <p className="text-base text-slate/65 tracking-tight leading-relaxed mb-6 flex-1">
                    {item.summary}
                  </p>
                  <Link
                    href={`/podcast/${item.slug}`}
                    className="text-primary text-xs md:text-sm font-bold uppercase tracking-[0.2em] hover:text-white transition-colors"
                  >
                    View Episode
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 md:py-14 border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="rounded-[2rem] border border-primary/25 bg-primary/[0.06] p-7 md:p-9 shadow-[0_0_34px_rgba(124,255,27,0.12)]">
            <h2 className="text-2xl md:text-3xl text-white tracking-tight mb-4">
              Learn → Practice → Deploy
            </h2>
            <p className="text-base md:text-lg text-slate/75 leading-relaxed tracking-tight mb-6">
              The podcast gives you the idea.
              <br />
              AutoDriveCX helps you practice the behavior.
              <br />
              AutoKnerd systems help dealerships make it stick.
            </p>
            <a
              href={AUTODRIVECX_SIGNUP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center bg-primary text-black px-7 py-3.5 rounded-full text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.28em] border border-primary hover:bg-white hover:border-white transition-all duration-300"
            >
              Start Training in AutoDriveCX
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-primary relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-blueprint opacity-[0.05]" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-black mb-10 tracking-tighter leading-tight font-outfit">
            Stabilize Your Dealership Customer Experience
          </h2>
          <p className="text-lg md:text-2xl text-black/80 tracking-tight max-w-5xl mx-auto mb-10">
            AutoKnerd helps dealerships replace inconsistent training outcomes with manager-led behavioral systems that improve trust, coaching consistency, and CSI stability.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5 md:gap-6">
            <a
              href={STRATEGY_CALL_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center bg-black text-white px-10 md:px-16 py-5 md:py-7 rounded-full font-extrabold uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-[11px] border border-black hover:bg-white hover:text-black hover:border-white transition-all duration-500"
            >
              Book Strategy Call
            </a>
            <Link
              href="/methodology"
              className="inline-flex items-center justify-center text-black/80 hover:text-black px-8 md:px-12 py-5 md:py-7 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] transition-all border border-black/25 hover:border-black rounded-full"
            >
              Explore Methodology
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

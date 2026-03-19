import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { getPodcastFeedData } from "@/app/lib/podcast";
import {
  AUTODRIVECX_INFO_URL,
  AUTODRIVECX_SIGNUP_URL,
  getRecommendedAutoDriveCXSkills,
} from "@/app/lib/autodrivecxSkills";
import { buildTopicEpisodeMap } from "@/app/lib/intelligenceMap";
import { inferTopicsForEpisode } from "@/app/lib/podcastTopics";
import PodcastArchiveClient from "@/app/podcast/PodcastArchiveClient";
import Link from "next/link";
import { Suspense } from "react";

export const revalidate = 300;

const platformLinks = [
  {
    label: "Spotify",
    href: "https://open.spotify.com/search/AutoKnerd%20Podcast",
  },
  {
    label: "Apple Podcasts",
    href: "https://podcasts.apple.com/us/search?term=AutoKnerd%20Podcast",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/results?search_query=AutoKnerd+Podcast",
  },
];

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

function normalizeTopics(value: string): string {
  const lower = value.toLowerCase();
  if (
    lower.includes("leisure") ||
    lower.includes("education") ||
    lower.includes("technology")
  ) {
    return "Trust, CX, coaching, behavior";
  }
  return value;
}

export default async function PodcastPage() {
  let feedData = null;
  try {
    feedData = await getPodcastFeedData();
  } catch {
    feedData = null;
  }

  const episodes = feedData?.episodes ?? [];
  const [featuredEpisode, ...restEpisodes] = episodes;
  const featuredTopics = featuredEpisode
    ? inferTopicsForEpisode(featuredEpisode.title, featuredEpisode.description, 3)
    : [];
  const featuredSkill = getRecommendedAutoDriveCXSkills(featuredTopics, 1)[0];
  const topicEpisodes = buildTopicEpisodeMap(episodes);
  const telemetry = [
    { label: "Episodes Published", value: feedData?.totalEpisodes?.toString() ?? "N/A" },
    { label: "Average Episode Length", value: feedData?.averageEpisodeLength ?? "N/A" },
    {
      label: "Topics Covered",
      value: normalizeTopics(feedData?.topicsCovered ?? "N/A"),
    },
    {
      label: "Latest Episode Date",
      value: feedData?.latestEpisodeDate ? formatDate(feedData.latestEpisodeDate) : "N/A",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-36 md:pt-44 pb-20 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient opacity-40 pointer-events-none" />
        <div className="absolute inset-0 parallax-grid-1 pointer-events-none opacity-60" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-5xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter text-white font-outfit mb-6">
              The AutoKnerd Podcast
            </h1>
            <h2 className="text-xl md:text-3xl text-primary/90 tracking-tight mb-6">
              Behavioral intelligence for dealership customer experience.
            </h2>
            <p className="text-lg md:text-2xl text-slate/70 tracking-tight max-w-4xl">
              Where dealership leaders learn how to stabilize customer
              experience and build trust-driven performance systems.
            </p>

            <div className="mt-10 rounded-[2rem] border border-primary/20 bg-primary/[0.04] p-6 md:p-8 shadow-[0_0_30px_rgba(124,255,27,0.12)] max-w-4xl">
              <h3 className="text-2xl md:text-3xl text-white tracking-tight mb-4">
                For Consultants Who Want to Apply These Skills
              </h3>
              <p className="text-base md:text-xl text-slate/70 tracking-tight leading-relaxed mb-6">
                AutoDriveCX turns podcast insights into repeatable showroom behavior through guided drills, discovery frameworks, and trust-driven conversation practice.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-5">
                <a
                  href={AUTODRIVECX_SIGNUP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center bg-primary text-black px-8 py-4 rounded-full text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.3em] border border-primary hover:bg-white hover:border-white transition-all duration-500"
                >
                  Start Training in AutoDriveCX
                </a>
                <a
                  href={AUTODRIVECX_INFO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-7 py-4 rounded-full border border-white/10 bg-white/[0.02] text-[10px] md:text-[11px] font-bold uppercase tracking-[0.22em] text-white/75 hover:text-white hover:border-primary/40 transition-all duration-500"
                >
                  What is AutoDriveCX?
                </a>
              </div>
            </div>

            <div className="mt-10">
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary/70 mb-4 font-mono">
                Listen On
              </p>
              <div className="flex flex-wrap gap-4 md:gap-6">
                {platformLinks.map((platform) => (
                  <a
                    key={platform.label}
                    href={platform.href}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 md:px-8 py-3 md:py-4 rounded-full border border-white/10 bg-white/[0.02] text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-white/75 hover:text-white hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(124,255,27,0.25)]"
                  >
                    {platform.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24 border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="luxury-card rounded-[2.6rem] p-6 md:p-8 border-primary/20">
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary/70 mb-6 font-mono">
              System Telemetry
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
              {telemetry.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[1.4rem] border border-white/10 bg-white/[0.02] px-5 py-5 md:px-6 md:py-6"
                >
                  <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-slate/45 font-mono mb-3">
                    {metric.label}
                  </p>
                  <p className="text-xl md:text-2xl text-white tracking-tight leading-snug">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          {!featuredEpisode ? (
            <div className="luxury-card text-center rounded-[2.5rem]">
              <p className="text-2xl text-slate/60 tracking-tight">
                Podcast episodes temporarily unavailable.
              </p>
            </div>
          ) : (
            <div className="luxury-card rounded-[2.8rem] p-8 md:p-12 border-primary/25 hover:border-primary/40 hover:shadow-[0_0_80px_rgba(124,255,27,0.2)] transition-all duration-700 bg-[linear-gradient(140deg,rgba(124,255,27,0.08)_0%,rgba(255,255,255,0.03)_100%)]">
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary/70 mb-6 font-mono">
                CX Intelligence Feed
              </p>
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 md:gap-12 items-center">
                <div className="xl:col-span-6">
                  {featuredEpisode.imageUrl || feedData?.fallbackArtwork ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={featuredEpisode.imageUrl ?? feedData?.fallbackArtwork}
                      alt={featuredEpisode.title}
                      className="w-full rounded-[2rem] border border-white/10 object-cover shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
                    />
                  ) : (
                    <div className="w-full aspect-square rounded-[2rem] border border-white/10 bg-white/[0.02] flex items-center justify-center text-white/40 text-sm uppercase tracking-[0.25em] font-mono">
                      Featured Episode
                    </div>
                  )}
                </div>

                <div className="xl:col-span-6">
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-5 leading-tight">
                    {featuredEpisode.title}
                  </h3>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate/40 mb-7 font-mono">
                    {formatDate(featuredEpisode.pubDate)}
                  </p>
                  <p className="text-lg md:text-xl text-slate/70 leading-relaxed mb-10 tracking-tight max-w-3xl">
                    {truncate(featuredEpisode.summary, 260)}
                  </p>
                  <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-4 md:p-5 mb-10">
                    <audio controls className="w-full">
                      <source src={featuredEpisode.audioUrl} />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                  <div className="text-center xl:text-left">
                    <Link
                      href={`/podcast/${featuredEpisode.slug}`}
                      className="inline-flex items-center justify-center bg-primary text-black px-8 md:px-10 py-4 md:py-5 rounded-full text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.3em] border border-primary hover:bg-white hover:border-white transition-all duration-500"
                    >
                      View Episode
                    </Link>
                    <a
                      href="https://podcasts.apple.com/us/search?term=AutoKnerd%20Podcast"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-0 xl:ml-5 mt-4 xl:mt-0 inline-flex items-center justify-center text-primary text-[10px] md:text-[11px] font-bold uppercase tracking-[0.22em] hover:text-white transition-colors"
                    >
                      Listen on Apple Podcasts
                    </a>
                    <a
                      href="https://open.spotify.com/search/AutoKnerd%20Podcast"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-0 xl:ml-5 mt-4 xl:mt-0 inline-flex items-center justify-center text-primary text-[10px] md:text-[11px] font-bold uppercase tracking-[0.22em] hover:text-white transition-colors"
                    >
                      Listen on Spotify
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {featuredEpisode && featuredSkill && (
        <section className="py-10 md:py-12 border-b border-white/5">
          <div className="container mx-auto px-6 md:px-12">
            <div className="rounded-[1.8rem] border border-primary/20 bg-primary/[0.04] p-6 md:p-7">
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary/70 mb-3 font-mono">
                Recommended Skill Path
              </p>
              <h3 className="text-2xl md:text-3xl text-white tracking-tight mb-3">
                {featuredSkill.title}
              </h3>
              <p className="text-base md:text-lg text-slate/70 tracking-tight leading-relaxed mb-5">
                {featuredSkill.description}
              </p>
              <a
                href={AUTODRIVECX_SIGNUP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center bg-primary text-black px-7 py-3 rounded-full text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.28em] border border-primary hover:bg-white hover:border-white transition-all duration-300"
              >
                Practice in AutoDriveCX
              </a>
            </div>
          </div>
        </section>
      )}

      {restEpisodes.length > 0 && (
        <Suspense
          fallback={
            <section className="py-16 md:py-24">
              <div className="container mx-auto px-6 md:px-12">
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 md:p-10 text-slate/55">
                  Loading archive filters...
                </div>
              </div>
            </section>
          }
        >
          <PodcastArchiveClient
            episodes={restEpisodes}
            featuredEpisode={featuredEpisode}
            topicEpisodes={topicEpisodes}
          />
        </Suspense>
      )}

      <Footer />
    </main>
  );
}

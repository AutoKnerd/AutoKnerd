"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { PodcastEpisode } from "@/app/lib/podcast";
import type { TopicEpisodeMap } from "@/app/lib/intelligenceMap";
import { inferTopicsForEpisode, PODCAST_TOPICS } from "@/app/lib/podcastTopics";
import { AUTOKNERD_TOOLS } from "@/app/lib/podcastTools";
import { getRecommendedAutoDriveCXSkills } from "@/app/lib/autodrivecxSkills";
import IntelligenceMapGraph from "@/app/intelligence-map/IntelligenceMapGraph";

type PodcastArchiveClientProps = {
  episodes: PodcastEpisode[];
  featuredEpisode?: PodcastEpisode;
  topicEpisodes: TopicEpisodeMap;
};
const ITEMS_PER_PAGE = 12;

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function PodcastArchiveClient({
  episodes,
  featuredEpisode,
  topicEpisodes,
}: PodcastArchiveClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialTopic = searchParams.get("topic") ?? "";
  const initialQuery = searchParams.get("q") ?? "";
  const rawInitialPage = Number.parseInt(searchParams.get("page") ?? "1", 10);
  const initialPage = Number.isFinite(rawInitialPage) && rawInitialPage > 0 ? rawInitialPage : 1;

  const [activeTopic, setActiveTopic] = useState(initialTopic);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const episodesWithTopics = useMemo(
    () =>
      episodes.map((episode) => {
        const matchedTopics = inferTopicsForEpisode(episode.title, episode.description, 3);
        const recommendedSkill = getRecommendedAutoDriveCXSkills(matchedTopics, 1)[0];
        return {
          ...episode,
          matchedTopics,
          recommendedSkillTitle: recommendedSkill?.title,
        };
      }),
    [episodes]
  );

  const filteredEpisodes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return episodesWithTopics.filter((episode) => {
      const topicMatch = !activeTopic || episode.matchedTopics.includes(activeTopic);
      const queryMatch =
        !q ||
        episode.title.toLowerCase().includes(q) ||
        episode.description.toLowerCase().includes(q);
      return topicMatch && queryMatch;
    });
  }, [episodesWithTopics, activeTopic, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredEpisodes.length / ITEMS_PER_PAGE));
  const activePage = Math.min(currentPage, totalPages);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (activeTopic) params.set("topic", activeTopic);
    else params.delete("topic");

    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    else params.delete("q");

    if (activePage > 1) params.set("page", String(activePage));
    else params.delete("page");

    const next = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    const current = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;
    if (next !== current) {
      router.replace(next, { scroll: false });
    }
  }, [activeTopic, searchQuery, activePage, router, pathname, searchParams]);

  const paginatedEpisodes = useMemo(() => {
    const start = (activePage - 1) * ITEMS_PER_PAGE;
    return filteredEpisodes.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredEpisodes, activePage]);

  const statusLine = useMemo(() => {
    if (filteredEpisodes.length === 0) return "No matching episodes found.";
    if (!activeTopic && !searchQuery.trim()) {
      return `Showing ${paginatedEpisodes.length} of ${episodes.length} episodes`;
    }
    if (activeTopic && searchQuery.trim()) {
      return `Showing ${paginatedEpisodes.length} of ${filteredEpisodes.length} episodes for ${activeTopic} matching '${searchQuery.trim()}'`;
    }
    if (activeTopic) return `Showing ${paginatedEpisodes.length} of ${filteredEpisodes.length} episodes for ${activeTopic}`;
    return `Showing ${paginatedEpisodes.length} of ${filteredEpisodes.length} episodes matching '${searchQuery.trim()}'`;
  }, [filteredEpisodes.length, paginatedEpisodes.length, activeTopic, searchQuery, episodes.length]);

  return (
    <>
      <section className="py-16 md:py-20 border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8 md:mb-10">
            <div>
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary/70 mb-3 font-mono">
                AutoKnerd Intelligence Console
              </p>
              <p className="text-base md:text-xl text-slate/65 tracking-tight">
                Live CX signals from the AutoKnerd knowledge system.
              </p>
            </div>
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-slate/45 font-mono">
              Monitoring {filteredEpisodes.length} active CX intelligence records
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
            <ConsoleTopThemes
              episodes={filteredEpisodes}
              activeTopic={activeTopic}
              onSelectTopic={(topic) => setActiveTopic(activeTopic === topic ? "" : topic)}
            />
            <ConsoleLatestSignal featuredEpisode={featuredEpisode} />
            <ConsoleTrendingQuestions themesFromEpisodes={filteredEpisodes} />
            <ConsoleRecommendation featuredEpisode={featuredEpisode} />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-8 md:mb-10">
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary/70 mb-3 font-mono">
              CX Intelligence Map
            </p>
            <p className="text-base md:text-xl text-slate/65 tracking-tight mb-2">
              Explore how dealership behavior topics connect across the AutoKnerd knowledge system.
            </p>
            <p className="text-sm md:text-base text-slate/50 tracking-tight">
              Select a topic to explore related CX intelligence.
            </p>
          </div>

          <div className="rounded-[2.3rem] border border-white/10 bg-white/[0.015] p-5 md:p-7 shadow-[0_0_60px_rgba(124,255,27,0.08)]">
            <IntelligenceMapGraph topicEpisodes={topicEpisodes} />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8 md:mb-10">
            <div>
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary/70 mb-4 font-mono">
                Behavioral Intelligence Topics
              </p>
              <p className="text-sm md:text-base text-slate/55 tracking-tight">
                Select a topic to filter the archive.
              </p>
            </div>
            {(activeTopic || searchQuery.trim()) && (
              <button
                onClick={() => {
                  setActiveTopic("");
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="self-start lg:self-auto px-5 py-3 rounded-full border border-white/15 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] text-white/70 hover:text-white hover:border-primary/40 transition-all duration-500"
              >
                Clear Filter
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-3 md:gap-4 mb-10">
            {PODCAST_TOPICS.map((topic) => {
              const active = activeTopic === topic;
              return (
                <button
                  key={topic}
                  onClick={() => {
                    setActiveTopic(active ? "" : topic);
                    setCurrentPage(1);
                  }}
                  className={`px-4 md:px-5 py-3 rounded-full border text-sm md:text-base tracking-tight transition-all duration-500 ${
                    active
                      ? "border-primary bg-primary/15 text-white shadow-[0_0_24px_rgba(124,255,27,0.3)]"
                      : "border-primary/25 bg-primary/[0.04] text-white/85 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(124,255,27,0.2)]"
                  }`}
                >
                  {topic}
                </button>
              );
            })}
          </div>

          <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.02] px-5 py-4 md:px-6 md:py-5">
            <label className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-slate/45 font-mono mb-3 block">
              Search
            </label>
            <input
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search CX intelligence"
              className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate/40 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_18px_rgba(124,255,27,0.25)] transition-all"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between gap-4 mb-8 md:mb-10">
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary/70 font-mono">
              Knowledge Archive
            </p>
            <p className="text-sm md:text-base text-slate/55 text-right">{statusLine}</p>
          </div>

          {filteredEpisodes.length === 0 ? (
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 md:p-10 text-center text-slate/55">
              No matching episodes found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
              {paginatedEpisodes.map((episode) => (
                <article
                  key={episode.link}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 md:p-7 hover:border-primary/35 hover:shadow-[0_0_45px_rgba(124,255,27,0.2)] hover:-translate-y-1 transition-all duration-500 flex flex-col"
                >
                  {episode.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={episode.imageUrl}
                      alt={episode.title}
                      className="w-full aspect-square rounded-[1.2rem] border border-white/10 object-cover mb-5"
                    />
                  )}
                  <h4 className="text-xl md:text-2xl font-light text-white tracking-tight mb-3 leading-tight">
                    {episode.title}
                  </h4>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate/40 mb-4 font-mono">
                    {formatDate(episode.pubDate)}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {episode.matchedTopics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1.5 rounded-full border border-primary/30 bg-primary/[0.06] text-[10px] uppercase tracking-[0.15em] text-primary/90 font-mono"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                  {episode.recommendedSkillTitle && (
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate/45 font-mono mb-4">
                      Practice Skill: {episode.recommendedSkillTitle}
                    </p>
                  )}
                  <p className="text-base text-slate/65 tracking-tight leading-relaxed mb-6 flex-1">
                    {truncate(episode.summary, 180)}
                  </p>
                  <div className="flex flex-col gap-2 mt-2">
                    <Link
                      href={`/podcast/${episode.slug}`}
                      className="text-primary text-xs md:text-sm font-bold uppercase tracking-[0.2em] hover:text-white transition-colors"
                    >
                      View Episode
                    </Link>
                    <a
                      href="https://podcasts.apple.com/us/search?term=AutoKnerd%20Podcast"
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate/45 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] hover:text-white transition-colors"
                    >
                      Listen on Apple Podcasts
                    </a>
                    <a
                      href="https://open.spotify.com/search/AutoKnerd%20Podcast"
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate/45 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] hover:text-white transition-colors"
                    >
                      Listen on Spotify
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}

          {filteredEpisodes.length > 0 && totalPages > 1 && (
            <div className="mt-10 md:mt-12 flex items-center justify-center gap-3 md:gap-4">
              <button
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={activePage === 1}
                className="px-5 py-3 rounded-full border border-white/15 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] text-white/70 hover:text-white hover:border-primary/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-500"
              >
                Prev
              </button>
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-slate/45 font-mono">
                Page {activePage} of {totalPages}
              </p>
              <button
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={activePage === totalPages}
                className="px-5 py-3 rounded-full border border-white/15 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] text-white/70 hover:text-white hover:border-primary/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-500"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function getTopThemes(episodes: Array<PodcastEpisode & { matchedTopics: string[] }>) {
  const counts = new Map<string, number>();
  episodes.forEach((episode) => {
    episode.matchedTopics.forEach((topic) => {
      counts.set(topic, (counts.get(topic) ?? 0) + 1);
    });
  });
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);
}

function getBehavioralSignal(summary: string): string {
  const lines = summary
    .split(/[.!?]+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 24);
  return lines[0] ?? summary;
}

function getTrendingQuestions(themes: string[]): string[] {
  const questionMap: Record<string, string> = {
    "Trust Formation": "Where does customer trust usually start leaking?",
    "Needs Assessment": "What behavior creates hesitation before the desk?",
    "Manager Coaching": "Are managers reinforcing or just reminding?",
    "Customer Psychology": "Which emotions are creating friction in the showroom?",
    "Sales Behavior": "Which conversation habits are lowering clarity?",
    "CX Design": "Where does process inconsistency show up most often?",
  };

  const selected: string[] = [];
  themes.forEach((theme) => {
    const question = questionMap[theme];
    if (question && !selected.includes(question)) selected.push(question);
  });

  if (selected.length < 3) {
    ["Where does customer trust usually start leaking?", "What behavior creates hesitation before the desk?", "Are managers reinforcing or just reminding?"].forEach(
      (fallback) => {
        if (!selected.includes(fallback)) selected.push(fallback);
      }
    );
  }

  return selected.slice(0, 3);
}

function getSystemRecommendation(featuredEpisode?: PodcastEpisode) {
  if (!featuredEpisode) {
    return {
      title: "Explore Methodology",
      description: "Map your next CX stabilization move using the AutoKnerd methodology.",
      href: "/methodology",
      cta: "Explore Methodology",
    };
  }

  const topics = inferTopicsForEpisode(featuredEpisode.title, featuredEpisode.description, 3);

  if (topics.includes("Needs Assessment")) {
    const tool = AUTOKNERD_TOOLS.find((item) => item.title === "Discovery Deep Dive Workbook");
    return {
      title: tool?.title ?? "Discovery Deep Dive Workbook",
      description:
        tool?.description ??
        "Strengthen needs assessment and uncover what actually matters to the customer.",
      href: tool?.href ?? "/methodology",
      cta: "Explore Tool",
    };
  }

  if (topics.includes("Trust Formation")) {
    const tool = AUTOKNERD_TOOLS.find((item) => item.title === "Trust Leak Detector");
    return {
      title: tool?.title ?? "Trust Leak Detector",
      description:
        tool?.description ??
        "Spot common moments where customer confidence drops and repair them fast.",
      href: tool?.href ?? "/methodology",
      cta: "Explore Tool",
    };
  }

  if (topics.includes("Manager Coaching")) {
    const tool = AUTOKNERD_TOOLS.find((item) => item.title === "Manager Reinforcement Guide");
    return {
      title: tool?.title ?? "Manager Reinforcement Guide",
      description:
        tool?.description ??
        "Install weekly coaching loops that make good behavior repeatable.",
      href: tool?.href ?? "/methodology",
      cta: "Explore Tool",
    };
  }

  return {
    title: "Explore Methodology",
    description: "Map your next CX stabilization move using the AutoKnerd methodology.",
    href: "/methodology",
    cta: "Explore Methodology",
  };
}

function ConsoleTopThemes({
  episodes,
  activeTopic,
  onSelectTopic,
}: {
  episodes: Array<PodcastEpisode & { matchedTopics: string[] }>;
  activeTopic: string;
  onSelectTopic: (topic: string) => void;
}) {
  const topThemes = getTopThemes(episodes);
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 md:p-7">
      <h3 className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary/70 mb-5 font-mono">
        Top CX Themes
      </h3>
      <div className="space-y-3">
        {topThemes.length === 0 ? (
          <p className="text-sm text-slate/55">No theme data for current filters.</p>
        ) : (
          topThemes.map(([topic, count]) => (
            <button
              key={topic}
              onClick={() => onSelectTopic(topic)}
              className={`w-full flex items-center justify-between rounded-xl px-4 py-3 border transition-all duration-300 ${
                activeTopic === topic
                  ? "border-primary bg-primary/14 text-white shadow-[0_0_18px_rgba(124,255,27,0.2)]"
                  : "border-white/10 text-slate/70 hover:border-primary/35 hover:text-white"
              }`}
            >
              <span className="text-sm md:text-base tracking-tight">{topic}</span>
              <span className="text-[10px] md:text-[11px] font-mono tracking-[0.15em] uppercase text-primary/90">
                {count}
              </span>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

function ConsoleLatestSignal({ featuredEpisode }: { featuredEpisode?: PodcastEpisode }) {
  return (
    <div className="rounded-[2rem] border border-primary/25 bg-primary/[0.05] p-6 md:p-7 shadow-[0_0_32px_rgba(124,255,27,0.12)]">
      <h3 className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary mb-5 font-mono">
        Latest Behavioral Signal
      </h3>
      <p className="text-lg md:text-2xl text-white tracking-tight leading-relaxed">
        {featuredEpisode
          ? `"${getBehavioralSignal(featuredEpisode.summary)}."`
          : "No recent signal available."}
      </p>
    </div>
  );
}

function ConsoleTrendingQuestions({
  themesFromEpisodes,
}: {
  themesFromEpisodes: Array<PodcastEpisode & { matchedTopics: string[] }>;
}) {
  const themes = getTopThemes(themesFromEpisodes).map(([topic]) => topic);
  const questions = getTrendingQuestions(themes);

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 md:p-7">
      <h3 className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary/70 mb-5 font-mono">
        Trending CX Questions
      </h3>
      <div className="space-y-3">
        {questions.map((question) => (
          <button
            key={question}
            className="w-full text-left rounded-xl border border-white/10 px-4 py-3 text-sm md:text-base text-slate/70 hover:text-white hover:border-primary/35 transition-all duration-300"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}

function ConsoleRecommendation({ featuredEpisode }: { featuredEpisode?: PodcastEpisode }) {
  const recommendation = getSystemRecommendation(featuredEpisode);
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 md:p-7">
      <h3 className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary/70 mb-5 font-mono">
        System Recommendation
      </h3>
      <h4 className="text-xl md:text-2xl text-white tracking-tight mb-3">{recommendation.title}</h4>
      <p className="text-base text-slate/65 leading-relaxed tracking-tight mb-5">
        {recommendation.description}
      </p>
      <Link
        href={recommendation.href}
        className="inline-flex items-center justify-center bg-primary text-black px-6 py-3 rounded-full text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.28em] border border-primary hover:bg-white hover:border-white transition-all duration-300"
      >
        {recommendation.cta}
      </Link>
    </div>
  );
}

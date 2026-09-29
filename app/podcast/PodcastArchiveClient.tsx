"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { PodcastEpisode } from "@/app/lib/podcast";
import type { TopicEpisodeMap } from "@/app/lib/intelligenceMap";
import { inferTopicsForEpisode, PODCAST_TOPICS } from "@/app/lib/podcastTopics";
import s from "@/app/components/site.module.css";
import { Play, ArrowRight } from "lucide-react";

type PodcastArchiveClientProps = {
  episodes: PodcastEpisode[];
  featuredEpisode?: PodcastEpisode;
  topicEpisodes: TopicEpisodeMap;
  fallbackArtwork?: string;
};
const PAGE_SIZE = 10;

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(date);
}

export default function PodcastArchiveClient({ episodes, fallbackArtwork }: PodcastArchiveClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [activeTopic, setActiveTopic] = useState(searchParams.get("topic") ?? "");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") ?? "");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const episodesWithTopics = useMemo(
    () =>
      episodes.map((episode) => ({
        ...episode,
        matchedTopics: inferTopicsForEpisode(episode.title, episode.description, 3),
      })),
    [episodes]
  );

  const filteredEpisodes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return episodesWithTopics.filter((episode) => {
      const topicMatch = !activeTopic || episode.matchedTopics.includes(activeTopic);
      const queryMatch =
        !q || episode.title.toLowerCase().includes(q) || episode.description.toLowerCase().includes(q);
      return topicMatch && queryMatch;
    });
  }, [episodesWithTopics, activeTopic, searchQuery]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (activeTopic) params.set("topic", activeTopic);
    else params.delete("topic");
    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    else params.delete("q");
    params.delete("page");

    const next = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    const current = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;
    if (next !== current) router.replace(next, { scroll: false });
  }, [activeTopic, searchQuery, router, pathname, searchParams]);

  const shown = filteredEpisodes.slice(0, visibleCount);
  const hasFilter = Boolean(activeTopic || searchQuery.trim());

  const selectTopic = (topic: string) => {
    setActiveTopic((prev) => (prev === topic ? "" : topic));
    setVisibleCount(PAGE_SIZE);
  };
  const onSearch = (value: string) => {
    setSearchQuery(value);
    setVisibleCount(PAGE_SIZE);
  };
  const clearAll = () => {
    setActiveTopic("");
    setSearchQuery("");
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section className={s.section}>
      <div className={s.container}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <p className={`${s.mono} ${s.kicker}`}>THE FULL ARCHIVE</p>
            <h2 className={s.h2sm}>Browse every episode.</h2>
          </div>
          <p className={s.mono} style={{ fontSize: 12, letterSpacing: "0.1em", color: "#8A938D" }}>
            {filteredEpisodes.length === 0
              ? "No matching episodes"
              : `${shown.length} of ${filteredEpisodes.length}${hasFilter ? " matching" : ""} episodes`}
          </p>
        </div>

        {/* Filter by topic */}
        <div style={{ marginTop: 26, display: "flex", flexWrap: "wrap", gap: 10 }}>
          {PODCAST_TOPICS.map((topic) => {
            const active = activeTopic === topic;
            return (
              <button
                key={topic}
                type="button"
                onClick={() => selectTopic(topic)}
                style={{
                  padding: "9px 16px", borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: "pointer",
                  fontFamily: "inherit", transition: "all 0.2s",
                  border: active ? "1px solid #0C1512" : "1px solid #E4E9E3",
                  background: active ? "#0C1512" : "#FFFFFF",
                  color: active ? "#CCFF00" : "#3A443F",
                }}
              >
                {topic}
              </button>
            );
          })}
          {hasFilter && (
            <button
              type="button"
              onClick={clearAll}
              style={{
                padding: "9px 16px", borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: "pointer",
                fontFamily: "inherit", border: "1px solid #E4E9E3", background: "transparent", color: "#8A938D",
              }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Search */}
        <div style={{ marginTop: 16 }}>
          <label htmlFor="podcast-search" className={s.srOnly}>Search episodes</label>
          <input
            id="podcast-search"
            value={searchQuery}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Search episodes..."
            style={{
              height: 52, width: "100%", maxWidth: 420, boxSizing: "border-box", border: "1px solid #D8DED7",
              borderRadius: 999, padding: "0 20px", fontSize: 15, fontFamily: "inherit", color: "#0C1512", background: "#FFFFFF",
            }}
          />
        </div>

        {/* Episode list */}
        {filteredEpisodes.length === 0 ? (
          <div className={s.card} style={{ marginTop: 32, textAlign: "center", padding: 40, color: "#6A736D" }}>
            No matching episodes found.
          </div>
        ) : (
          <div className={s.epList}>
            {shown.map((episode) => (
              <Link key={episode.link} href={`/podcast/${episode.slug}`} className={s.epRow}>
                {episode.imageUrl || fallbackArtwork ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className={s.epThumb} src={episode.imageUrl ?? fallbackArtwork} alt="" />
                ) : (
                  <span className={s.epThumb} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Play size={20} color="#8A938D" />
                  </span>
                )}
                <div className={s.epMeta}>
                  <p className={`${s.mono} ${s.epDate}`}>
                    {formatDate(episode.pubDate)}
                    {episode.matchedTopics[0] ? `  ·  ${episode.matchedTopics[0]}` : ""}
                  </p>
                  <h3 className={s.epTitle}>{episode.title}</h3>
                  <p className={s.epSummary}>{truncate(episode.summary, 120)}</p>
                </div>
                <span className={s.epView}>
                  View <ArrowRight size={15} strokeWidth={2.2} />
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* Load more */}
        {visibleCount < filteredEpisodes.length && (
          <div style={{ marginTop: 28, textAlign: "center" }}>
            <button
              type="button"
              onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
              className={s.btnDark}
              style={{ height: 50, fontSize: 15, padding: "0 30px", border: "none", cursor: "pointer" }}
            >
              Load more episodes
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

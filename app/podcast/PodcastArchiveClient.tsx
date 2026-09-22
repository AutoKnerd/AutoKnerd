"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { PodcastEpisode } from "@/app/lib/podcast";
import type { TopicEpisodeMap } from "@/app/lib/intelligenceMap";
import { inferTopicsForEpisode, PODCAST_TOPICS } from "@/app/lib/podcastTopics";
import s from "@/app/components/site.module.css";
import { ext } from "@/app/lib/links";

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
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(date);
}

export default function PodcastArchiveClient({ episodes }: PodcastArchiveClientProps) {
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
    if (next !== current) router.replace(next, { scroll: false });
  }, [activeTopic, searchQuery, activePage, router, pathname, searchParams]);

  const paginatedEpisodes = useMemo(() => {
    const start = (activePage - 1) * ITEMS_PER_PAGE;
    return filteredEpisodes.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredEpisodes, activePage]);

  const statusLine = useMemo(() => {
    if (filteredEpisodes.length === 0) return "No matching episodes found.";
    if (!activeTopic && !searchQuery.trim()) return `Showing ${paginatedEpisodes.length} of ${episodes.length} episodes`;
    return `Showing ${paginatedEpisodes.length} of ${filteredEpisodes.length} episodes`;
  }, [filteredEpisodes.length, paginatedEpisodes.length, activeTopic, searchQuery, episodes.length]);

  const hasFilter = Boolean(activeTopic || searchQuery.trim());

  return (
    <section className={s.section}>
      <div className={s.container}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <p className={`${s.mono} ${s.kicker}`}>THE FULL ARCHIVE</p>
            <h2 className={s.h2sm}>Every episode.</h2>
          </div>
          <p className={s.mono} style={{ fontSize: 12, letterSpacing: "0.1em", color: "#8A938D" }}>{statusLine}</p>
        </div>

        {/* Topic filter */}
        <div style={{ marginTop: 26, display: "flex", flexWrap: "wrap", gap: 10 }}>
          {PODCAST_TOPICS.map((topic) => {
            const active = activeTopic === topic;
            return (
              <button
                key={topic}
                type="button"
                onClick={() => {
                  setActiveTopic(active ? "" : topic);
                  setCurrentPage(1);
                }}
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
              onClick={() => {
                setActiveTopic("");
                setSearchQuery("");
                setCurrentPage(1);
              }}
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
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search episodes..."
            style={{
              height: 52, width: "100%", maxWidth: 420, boxSizing: "border-box", border: "1px solid #D8DED7",
              borderRadius: 999, padding: "0 20px", fontSize: 15, fontFamily: "inherit", color: "#0C1512", background: "#FFFFFF",
            }}
          />
        </div>

        {/* Archive grid */}
        {filteredEpisodes.length === 0 ? (
          <div className={s.card} style={{ marginTop: 32, textAlign: "center", padding: 40, color: "#6A736D" }}>
            No matching episodes found.
          </div>
        ) : (
          <div className={s.grid4} style={{ marginTop: 32 }}>
            {paginatedEpisodes.map((episode) => (
              <article key={episode.link} className={s.card} style={{ padding: 20, display: "flex", flexDirection: "column" }}>
                {episode.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={episode.imageUrl}
                    alt={episode.title}
                    style={{ width: "100%", aspectRatio: "1 / 1", borderRadius: 16, border: "1px solid #E7ECE5", objectFit: "cover", marginBottom: 16, display: "block" }}
                  />
                )}
                <p className={s.mono} style={{ margin: 0, fontSize: 11, letterSpacing: "0.12em", color: "#8A938D" }}>
                  {formatDate(episode.pubDate)}
                </p>
                <h4 style={{ margin: "8px 0 0", fontSize: 18, fontWeight: 800, lineHeight: 1.25 }}>{episode.title}</h4>
                {episode.matchedTopics.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
                    {episode.matchedTopics.slice(0, 2).map((topic) => (
                      <span
                        key={topic}
                        style={{ padding: "4px 10px", borderRadius: 999, background: "#F3FBE8", border: "1px solid #E1EFC5", fontSize: 11, fontWeight: 700, color: "#5E8A00" }}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
                <p className={s.cardText} style={{ fontSize: 14, marginTop: 12, flex: 1 }}>{truncate(episode.summary, 150)}</p>
                <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                  <Link href={`/podcast/${episode.slug}`} className={s.textLink} style={{ marginTop: 0, fontSize: 14 }}>
                    View episode
                  </Link>
                  <a href="https://open.spotify.com/search/AutoKnerd%20Podcast" {...ext} style={{ fontSize: 13, fontWeight: 600, color: "#8A938D" }}>
                    Listen
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {filteredEpisodes.length > 0 && totalPages > 1 && (
          <div style={{ marginTop: 40, display: "flex", alignItems: "center", justifyContent: "center", gap: 18 }}>
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={activePage === 1}
              className={s.btnDark}
              style={{ height: 46, fontSize: 14, padding: "0 22px", opacity: activePage === 1 ? 0.4 : 1, cursor: activePage === 1 ? "not-allowed" : "pointer", border: "none" }}
            >
              Prev
            </button>
            <p className={s.mono} style={{ fontSize: 12, letterSpacing: "0.1em", color: "#8A938D" }}>
              Page {activePage} of {totalPages}
            </p>
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={activePage === totalPages}
              className={s.btnDark}
              style={{ height: 46, fontSize: 14, padding: "0 22px", opacity: activePage === totalPages ? 0.4 : 1, cursor: activePage === totalPages ? "not-allowed" : "pointer", border: "none" }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  INTELLIGENCE_MAP_EDGES,
  INTELLIGENCE_MAP_NODES,
  INTELLIGENCE_TOPIC_DESCRIPTIONS,
  type IntelligenceTopicId,
  type TopicEpisodeMap,
} from "@/app/lib/intelligenceMap";

type IntelligenceMapGraphProps = {
  topicEpisodes: TopicEpisodeMap;
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

export default function IntelligenceMapGraph({ topicEpisodes }: IntelligenceMapGraphProps) {
  const [selectedTopic, setSelectedTopic] = useState<IntelligenceTopicId>("Trust Formation");

  const nodeLookup = useMemo(
    () => new Map(INTELLIGENCE_MAP_NODES.map((node) => [node.id, node])),
    []
  );

  const selectedEpisodes = topicEpisodes[selectedTopic] ?? [];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-8">
      <div className="xl:col-span-8 rounded-[2rem] border border-white/10 bg-white/[0.02] p-4 md:p-6 shadow-[0_0_45px_rgba(124,255,27,0.08)] overflow-hidden">
        <div className="relative w-full aspect-[16/11] rounded-[1.6rem] border border-primary/20 bg-black/35">
          <svg viewBox="0 0 1000 620" className="absolute inset-0 w-full h-full">
            <defs>
              <filter id="edgeGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#7cff1b" floodOpacity="0.45" />
              </filter>
            </defs>

            {INTELLIGENCE_MAP_EDGES.map((edge) => {
              const source = nodeLookup.get(edge.source);
              const target = nodeLookup.get(edge.target);
              if (!source || !target) return null;

              const active = edge.source === selectedTopic || edge.target === selectedTopic;

              return (
                <line
                  key={`${edge.source}-${edge.target}`}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={active ? "rgba(124,255,27,0.8)" : "rgba(124,255,27,0.35)"}
                  strokeWidth={active ? 2.6 : 1.4}
                  filter="url(#edgeGlow)"
                />
              );
            })}
          </svg>

          {INTELLIGENCE_MAP_NODES.map((node) => {
            const active = selectedTopic === node.id;
            return (
              <button
                key={node.id}
                onClick={() => setSelectedTopic(node.id)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 ${
                  active ? "scale-110" : "hover:scale-105"
                }`}
                style={{ left: `${(node.x / 1000) * 100}%`, top: `${(node.y / 620) * 100}%` }}
              >
                <span
                  className={`absolute -inset-2 rounded-full blur-lg transition-opacity ${
                    active ? "opacity-90 bg-primary/30 animate-pulse" : "opacity-30 bg-primary/20"
                  }`}
                />
                <span
                  className={`relative block px-3 md:px-4 py-2 rounded-full border text-[10px] md:text-[11px] uppercase tracking-[0.18em] font-bold font-mono whitespace-nowrap ${
                    active
                      ? "border-primary bg-primary/18 text-white shadow-[0_0_26px_rgba(124,255,27,0.45)]"
                      : "border-primary/40 bg-black/75 text-white/78 group-hover:text-white group-hover:border-primary/60"
                  }`}
                >
                  {node.id}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <aside className="xl:col-span-4 rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 md:p-7">
        <h2 className="text-[10px] md:text-[11px] uppercase tracking-[0.32em] font-bold text-primary/70 mb-4 font-mono">
          Topic Intelligence
        </h2>
        <h3 className="text-2xl md:text-3xl text-white tracking-tight leading-tight mb-4">
          {selectedTopic}
        </h3>
        <p className="text-base text-slate/65 tracking-tight leading-relaxed mb-6">
          {INTELLIGENCE_TOPIC_DESCRIPTIONS[selectedTopic]}
        </p>

        <h4 className="text-[10px] md:text-[11px] uppercase tracking-[0.28em] font-bold text-primary/70 mb-4 font-mono">
          Related Episodes
        </h4>

        {selectedEpisodes.length === 0 ? (
          <p className="text-sm text-slate/55">No mapped episodes for this topic yet.</p>
        ) : (
          <div className="space-y-3">
            {selectedEpisodes.map((episode) => (
              <article key={episode.slug} className="rounded-[1.2rem] border border-white/10 bg-black/25 p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate/45 font-mono mb-2">
                  {formatDate(episode.pubDate)}
                </p>
                <h5 className="text-base text-white tracking-tight leading-snug mb-3">
                  {episode.title}
                </h5>
                <Link
                  href={`/podcast/${episode.slug}`}
                  className="text-primary text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] hover:text-white transition-colors"
                >
                  View Episode
                </Link>
              </article>
            ))}
          </div>
        )}
      </aside>
    </div>
  );
}

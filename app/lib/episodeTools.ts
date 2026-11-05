// Resolves the one companion tool for a given podcast episode. Every tool here
// has a real page at /tools/<slug>: the 3 explainer CX tools (React route) and
// the 15 worksheets (static HTML via the next.config rewrites). Resolution order
// is: curated override, then best topic match, then a deterministic fallback so
// an episode always has a tool. Grow EPISODE_TOOL_OVERRIDES toward a unique tool
// per episode.

import { AUTOKNERD_CX_TOOLS, AUTOKNERD_WORKSHEETS } from "@/app/lib/tools";

export type EpisodeTool = {
  slug: string;
  title: string;
  description: string;
  href: string;
  topics: string[];
};

export const ALL_EPISODE_TOOLS: EpisodeTool[] = [
  ...AUTOKNERD_CX_TOOLS.map((t) => ({
    slug: t.slug,
    title: t.title,
    description: t.shortDescription,
    href: `/tools/${t.slug}`,
    topics: t.topics,
  })),
  ...AUTOKNERD_WORKSHEETS.map((w) => ({
    slug: w.slug,
    title: w.title,
    description: w.description,
    href: `/tools/${w.slug}`,
    topics: w.topics,
  })),
];

const BY_SLUG = new Map(ALL_EPISODE_TOOLS.map((tool) => [tool.slug, tool]));

// Curated episode -> tool slug. Takes priority over topic matching so a known
// episode always gets its exact companion worksheet.
export const EPISODE_TOOL_OVERRIDES: Record<string, string> = {
  "be-back-isnt-a-lost-sale-better-car-sales-conversations-and-follow-up": "be-back-decoder",
};

export function getToolBySlugAny(slug: string): EpisodeTool | undefined {
  return BY_SLUG.get(slug);
}

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function topicScore(tool: EpisodeTool, topics: string[]): number {
  const wanted = topics.map((topic) => topic.toLowerCase());
  return tool.topics.filter((topic) => wanted.includes(topic.toLowerCase())).length;
}

export function getEpisodeTool(episodeSlug: string, matchedTopics: string[] = []): EpisodeTool {
  const override = EPISODE_TOOL_OVERRIDES[episodeSlug];
  if (override && BY_SLUG.has(override)) return BY_SLUG.get(override)!;

  let best: EpisodeTool | null = null;
  let bestScore = 0;
  for (const tool of ALL_EPISODE_TOOLS) {
    const score = topicScore(tool, matchedTopics);
    if (score > bestScore) {
      bestScore = score;
      best = tool;
    }
  }
  if (best) return best;

  // No topic overlap: spread episodes across the library deterministically so the
  // same episode always resolves to the same tool.
  const index = Math.abs(hashString(episodeSlug)) % ALL_EPISODE_TOOLS.length;
  return ALL_EPISODE_TOOLS[index];
}

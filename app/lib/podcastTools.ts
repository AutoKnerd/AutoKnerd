import { AUTOKNERD_CX_TOOLS } from "@/app/lib/tools";

export type AutoKnerdTool = {
  title: string;
  description: string;
  href: string;
  topics: string[];
};

const CORE_TOOLS: AutoKnerdTool[] = AUTOKNERD_CX_TOOLS.map((tool) => ({
  title: tool.title,
  description: tool.description,
  href: `/tools/${tool.slug}`,
  topics: tool.topics,
}));

const SUPPORT_TOOLS: AutoKnerdTool[] = [
  {
    title: "Manager Reinforcement Guide",
    description: "Install weekly coaching loops that make good behavior repeatable.",
    href: "/methodology",
    topics: ["Manager Coaching", "Dealership Culture", "CX Design"],
  },
  {
    title: "Follow-Up Consistency Tracker",
    description: "Standardize follow-up behavior so customers feel guided instead of forgotten.",
    href: "/methodology",
    topics: ["Follow-Up", "CX Design", "Sales Behavior"],
  },
];

export const AUTOKNERD_TOOLS: AutoKnerdTool[] = [...CORE_TOOLS, ...SUPPORT_TOOLS];

export function getRelatedAutoKnerdTools(
  episodeTopics: string[],
  max = 3
): AutoKnerdTool[] {
  const ranked = AUTOKNERD_TOOLS.map((tool) => {
    const overlap = tool.topics.filter((topic) => episodeTopics.includes(topic)).length;
    return { tool, overlap };
  })
    .filter((entry) => entry.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .map((entry) => entry.tool);

  const withFallback = [...ranked];
  AUTOKNERD_TOOLS.forEach((tool) => {
    if (!withFallback.some((candidate) => candidate.title === tool.title)) {
      withFallback.push(tool);
    }
  });

  const minimum = Math.max(2, Math.min(max, 3));
  return withFallback.slice(0, minimum);
}

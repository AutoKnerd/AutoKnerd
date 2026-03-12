import type { PodcastEpisode } from "@/app/lib/podcast";
import { inferTopicsForEpisode, PODCAST_TOPICS } from "@/app/lib/podcastTopics";

export type IntelligenceTopicId = (typeof PODCAST_TOPICS)[number];

export type IntelligenceMapNode = {
  id: IntelligenceTopicId;
  x: number;
  y: number;
};

export type IntelligenceMapEdge = {
  source: IntelligenceTopicId;
  target: IntelligenceTopicId;
};

export const INTELLIGENCE_TOPIC_DESCRIPTIONS: Record<IntelligenceTopicId, string> = {
  "Trust Formation":
    "How clarity, confidence, and process tone shape customer trust through the entire deal path.",
  "Needs Assessment":
    "How consultants uncover what matters most before presenting options or discussing numbers.",
  "Customer Psychology":
    "How emotion, uncertainty, and cognitive friction influence customer decisions in real time.",
  "Sales Behavior":
    "The repeatable conversation and process behaviors that stabilize consultant performance.",
  "Manager Coaching":
    "How leaders reinforce behaviors weekly so standards stay consistent across the floor.",
  "Decision Science":
    "How commitment, certainty, and perceived risk influence whether customers move forward.",
  "CX Design":
    "How dealership process design affects trust, comfort, and consistency at each stage.",
  "Follow-Up":
    "How post-visit communication keeps momentum and protects trust after the first interaction.",
  "Dealership Culture":
    "How team norms and reinforcement systems shape customer experience over time.",
};

export const INTELLIGENCE_MAP_NODES: IntelligenceMapNode[] = [
  { id: "Trust Formation", x: 530, y: 120 },
  { id: "Customer Psychology", x: 730, y: 210 },
  { id: "Sales Behavior", x: 540, y: 300 },
  { id: "Needs Assessment", x: 340, y: 230 },
  { id: "Manager Coaching", x: 350, y: 420 },
  { id: "Decision Science", x: 740, y: 390 },
  { id: "CX Design", x: 560, y: 510 },
  { id: "Follow-Up", x: 840, y: 510 },
  { id: "Dealership Culture", x: 190, y: 320 },
];

export const INTELLIGENCE_MAP_EDGES: IntelligenceMapEdge[] = [
  { source: "Trust Formation", target: "Customer Psychology" },
  { source: "Trust Formation", target: "Sales Behavior" },
  { source: "Needs Assessment", target: "Sales Behavior" },
  { source: "Manager Coaching", target: "Sales Behavior" },
  { source: "CX Design", target: "Customer Psychology" },
  { source: "Follow-Up", target: "Trust Formation" },
  { source: "Dealership Culture", target: "Manager Coaching" },
  { source: "Decision Science", target: "Needs Assessment" },
  { source: "Decision Science", target: "Sales Behavior" },
  { source: "CX Design", target: "Follow-Up" },
];

export type TopicEpisodePreview = {
  title: string;
  slug: string;
  pubDate: string;
};

export type TopicEpisodeMap = Record<IntelligenceTopicId, TopicEpisodePreview[]>;

export function buildTopicEpisodeMap(episodes: PodcastEpisode[], maxPerTopic = 4): TopicEpisodeMap {
  const map = Object.fromEntries(
    PODCAST_TOPICS.map((topic) => [topic, [] as TopicEpisodePreview[]])
  ) as TopicEpisodeMap;

  episodes.forEach((episode) => {
    const topics = inferTopicsForEpisode(episode.title, episode.description, 3);
    topics.forEach((topic) => {
      if (map[topic as IntelligenceTopicId].length < maxPerTopic) {
        map[topic as IntelligenceTopicId].push({
          title: episode.title,
          slug: episode.slug,
          pubDate: episode.pubDate,
        });
      }
    });
  });

  return map;
}

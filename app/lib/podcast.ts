import Parser from "rss-parser";
import { inferTopicsForEpisode } from "@/app/lib/podcastTopics";

const PODCAST_RSS_URL = "https://feed.podbean.com/btedesign/feed.xml";

type RawItem = {
  title?: string;
  link?: string;
  guid?: string;
  pubDate?: string;
  contentSnippet?: string;
  content?: string;
  description?: string;
  categories?: string[];
  enclosure?: { url?: string };
  itunesDuration?: string;
  itunesImage?: { href?: string } | string;
};

type RawFeed = {
  image?: { url?: string };
  itunes?: {
    image?: string;
    categories?: string[];
    categoriesWithSubs?: Array<{ name?: string; subs?: Array<{ name?: string }> | null }>;
  };
};

export type PodcastEpisode = {
  slug: string;
  title: string;
  link: string;
  pubDate: string;
  description: string;
  summary: string;
  audioUrl: string;
  durationSeconds?: number;
  categories: string[];
  imageUrl?: string;
};

export type PodcastFeedData = {
  episodes: PodcastEpisode[];
  totalEpisodes: number;
  latestEpisodeDate: string;
  averageEpisodeLength: string;
  topicsCovered: string;
  fallbackArtwork?: string;
};

const parser: Parser = new Parser({
  customFields: {
    item: [
      ["itunes:image", "itunesImage"],
      ["itunes:duration", "itunesDuration"],
    ],
  },
});

function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function normalizeEpisodeTitle(value: string): string {
  const cleaned = value
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .replace(/,+\s*$/, "")
    .trim();

  return cleaned.replace(/^(EP\d+)\s+(?!:)/i, "$1: ");
}

export function slugifyEpisodeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function getImageUrl(item: RawItem): string | undefined {
  if (!item.itunesImage) return undefined;
  if (typeof item.itunesImage === "string") return item.itunesImage;
  return item.itunesImage.href;
}

function parseDurationToSeconds(value?: string): number | undefined {
  if (!value) return undefined;
  if (/^\d+$/.test(value)) return Number(value);

  const parts = value.split(":").map((part) => Number(part));
  if (parts.some((part) => Number.isNaN(part))) return undefined;
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return undefined;
}

function formatAverageLength(seconds: number | undefined): string {
  if (!seconds || seconds <= 0) return "N/A";
  const minutes = Math.round(seconds / 60);
  return `${minutes} min`;
}

function extractTopics(feed: RawFeed, episodes: PodcastEpisode[]): string {
  const topics = new Set<string>();

  feed.itunes?.categories?.forEach((topic) => {
    if (topic?.trim()) topics.add(topic.trim());
  });

  feed.itunes?.categoriesWithSubs?.forEach((category) => {
    if (category.name?.trim()) topics.add(category.name.trim());
    category.subs?.forEach((sub) => {
      if (sub.name?.trim()) topics.add(sub.name.trim());
    });
  });

  episodes.forEach((episode) => {
    episode.categories.forEach((category) => {
      if (category?.trim()) topics.add(category.trim());
    });
  });

  if (topics.size === 0) return "CX, Leadership, Sales";
  return Array.from(topics).slice(0, 4).join(" / ");
}

function getFallbackArtwork(feed: RawFeed): string | undefined {
  return feed.itunes?.image ?? feed.image?.url;
}

async function fetchPodcastFeed(): Promise<RawFeed & { items: RawItem[] }> {
  const response = await fetch(PODCAST_RSS_URL, {
    next: { revalidate: 3600 },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch podcast feed: ${response.status}`);
  }

  const xml = await response.text();
  const feed = (await parser.parseString(xml)) as RawFeed & {
    items: RawItem[];
  };
  return feed;
}

function sortByPubDateDesc(episodes: PodcastEpisode[]): PodcastEpisode[] {
  return [...episodes].sort((a, b) => {
    const aDate = new Date(a.pubDate).getTime();
    const bDate = new Date(b.pubDate).getTime();
    return (Number.isNaN(bDate) ? 0 : bDate) - (Number.isNaN(aDate) ? 0 : aDate);
  });
}

function ensureUniqueSlugs(episodes: PodcastEpisode[]): PodcastEpisode[] {
  const seen = new Map<string, number>();

  return episodes.map((episode) => {
    const base = episode.slug;
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);

    if (count === 0) return episode;
    return { ...episode, slug: `${base}-${count + 1}` };
  });
}

export async function getPodcastFeedData(): Promise<PodcastFeedData> {
  const feed = await fetchPodcastFeed();
  const fallbackArtwork = getFallbackArtwork(feed);

  const parsed = (feed.items as RawItem[])
    .map((item): PodcastEpisode | null => {
      const title = normalizeEpisodeTitle(item.title ?? "");
      const link = item.link?.trim() ?? "";
      const guid = item.guid?.trim() ?? "";
      const pubDate = item.pubDate?.trim() ?? "";
      const summarySource = item.contentSnippet ?? item.description ?? item.content ?? "";
      const cleanedText = stripHtml(summarySource);
      const summary = cleanedText;
      const description = cleanedText;
      const audioUrl = item.enclosure?.url?.trim() ?? "";
      const imageUrl = getImageUrl(item);
      const durationSeconds = parseDurationToSeconds(item.itunesDuration);
      const categories = item.categories ?? [];
      const slug = slugifyEpisodeTitle(title) || slugifyEpisodeTitle(guid);

      if (!title || !link || !pubDate || !summary || !audioUrl || !slug) return null;

      const episode: PodcastEpisode = {
        slug,
        title,
        link,
        pubDate,
        description,
        summary,
        audioUrl,
        categories,
        ...(durationSeconds !== undefined ? { durationSeconds } : {}),
        ...(imageUrl ? { imageUrl } : {}),
      };

      return episode;
    })
    .filter((episode): episode is PodcastEpisode => episode !== null)
    .map((episode) => ({
      ...episode,
      imageUrl: episode.imageUrl ?? fallbackArtwork,
    }));
  const episodes = ensureUniqueSlugs(sortByPubDateDesc(parsed));

  const durations = episodes
    .map((episode) => episode.durationSeconds)
    .filter((seconds): seconds is number => typeof seconds === "number" && seconds > 0);
  const avgDuration =
    durations.length > 0
      ? durations.reduce((sum, seconds) => sum + seconds, 0) / durations.length
      : undefined;

  return {
    episodes,
    totalEpisodes: episodes.length,
    latestEpisodeDate: episodes[0]?.pubDate ?? "",
    averageEpisodeLength: formatAverageLength(avgDuration),
    topicsCovered: extractTopics(feed, episodes),
    fallbackArtwork,
  };
}

export async function getPodcastEpisodeBySlug(
  slug: string
): Promise<{ episode: PodcastEpisode; related: PodcastEpisode[]; matchedTopics: string[] } | null> {
  const feedData = await getPodcastFeedData();
  const episode = feedData.episodes.find((item) => item.slug === slug);
  if (!episode) return null;

  const matchedTopics = inferTopicsForEpisode(episode.title, episode.description, 3);
  const candidates = feedData.episodes.filter((item) => item.slug !== slug);

  const scored = candidates
    .map((item) => {
      const topics = inferTopicsForEpisode(item.title, item.description, 3);
      const overlap = topics.filter((topic) => matchedTopics.includes(topic)).length;
      return { item, overlap };
    })
    .filter((entry) => entry.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .map((entry) => entry.item);

  const related =
    scored.length >= 3
      ? scored.slice(0, 3)
      : [...scored, ...candidates.filter((item) => !scored.includes(item))].slice(0, 3);

  return { episode, related, matchedTopics };
}

import Parser from "rss-parser";

const PODCAST_RSS_URL = "https://feed.podbean.com/btedesign/feed.xml";

type RawItem = {
  title?: string;
  link?: string;
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
  title: string;
  link: string;
  pubDate: string;
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

export async function getPodcastFeedData(limit = 20): Promise<PodcastFeedData> {
  const feed = (await parser.parseURL(PODCAST_RSS_URL)) as RawFeed & {
    items: RawItem[];
  };
  const fallbackArtwork = getFallbackArtwork(feed);

  const parsed = (feed.items as RawItem[])
    .map((item): PodcastEpisode | null => {
      const title = item.title?.trim() ?? "";
      const link = item.link?.trim() ?? "";
      const pubDate = item.pubDate?.trim() ?? "";
      const summarySource = item.contentSnippet ?? item.description ?? item.content ?? "";
      const summary = stripHtml(summarySource);
      const audioUrl = item.enclosure?.url?.trim() ?? "";
      const imageUrl = getImageUrl(item);
      const durationSeconds = parseDurationToSeconds(item.itunesDuration);
      const categories = item.categories ?? [];

      if (!title || !link || !pubDate || !summary || !audioUrl) return null;

      const episode: PodcastEpisode = {
        title,
        link,
        pubDate,
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

  const episodes = parsed.slice(0, limit);
  const durations = parsed
    .map((episode) => episode.durationSeconds)
    .filter((seconds): seconds is number => typeof seconds === "number" && seconds > 0);
  const avgDuration =
    durations.length > 0
      ? durations.reduce((sum, seconds) => sum + seconds, 0) / durations.length
      : undefined;

  return {
    episodes,
    totalEpisodes: parsed.length,
    latestEpisodeDate: episodes[0]?.pubDate ?? "",
    averageEpisodeLength: formatAverageLength(avgDuration),
    topicsCovered: extractTopics(feed, parsed),
    fallbackArtwork,
  };
}

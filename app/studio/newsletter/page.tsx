import type { Metadata } from "next";
import { getPodcastFeedData } from "@/app/lib/podcast";
import NewsletterStudio, { type StudioEpisode } from "@/app/studio/NewsletterStudio";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Newsletter Studio · AutoKnerd",
  description: "Internal tool: build a ready-to-send newsletter email from any podcast episode.",
  robots: { index: false, follow: false },
};

export default async function NewsletterStudioPage() {
  let episodes: StudioEpisode[] = [];
  try {
    const data = await getPodcastFeedData();
    episodes = data.episodes.map((episode) => ({
      slug: episode.slug,
      title: episode.title,
      summary: episode.summary,
      description: episode.description,
      audioUrl: episode.audioUrl,
      pubDate: episode.pubDate,
      durationSeconds: episode.durationSeconds,
    }));
  } catch {
    episodes = [];
  }

  return <NewsletterStudio episodes={episodes} />;
}

import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { getPodcastFeedData } from "@/app/lib/podcast";

const platformLinks = [
  {
    label: "Spotify",
    href: "https://open.spotify.com/search/AutoKnerd%20Podcast",
  },
  {
    label: "Apple Podcasts",
    href: "https://podcasts.apple.com/us/search?term=AutoKnerd%20Podcast",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/results?search_query=AutoKnerd+Podcast",
  },
];

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

export default async function PodcastPage() {
  let feedData = null;
  try {
    feedData = await getPodcastFeedData(20);
  } catch {
    feedData = null;
  }

  const episodes = feedData?.episodes ?? [];
  const [featuredEpisode, ...restEpisodes] = episodes;
  const telemetry = [
    { label: "Episodes Published", value: feedData?.totalEpisodes?.toString() ?? "N/A" },
    { label: "Average Episode Length", value: feedData?.averageEpisodeLength ?? "N/A" },
    { label: "Topics Covered", value: feedData?.topicsCovered ?? "N/A" },
    {
      label: "Latest Episode Date",
      value: feedData?.latestEpisodeDate ? formatDate(feedData.latestEpisodeDate) : "N/A",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-36 md:pt-44 pb-20 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient opacity-40 pointer-events-none" />
        <div className="absolute inset-0 parallax-grid-1 pointer-events-none opacity-60" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-5xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter text-white font-outfit mb-6">
              The AutoKnerd Podcast
            </h1>
            <h2 className="text-xl md:text-3xl text-primary/90 tracking-tight mb-6">
              Behavioral intelligence for dealership CX.
            </h2>
            <p className="text-lg md:text-2xl text-slate/70 tracking-tight max-w-4xl">
              Where dealership leaders learn how to stabilize customer
              experience and build trust-driven performance.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 md:gap-6">
              {platformLinks.map((platform) => (
                <a
                  key={platform.label}
                  href={platform.href}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 md:px-8 py-3 md:py-4 rounded-full border border-white/10 text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-white/70 hover:text-white hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(124,255,27,0.25)]"
                >
                  {platform.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24 border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="luxury-card rounded-[2.6rem] p-6 md:p-8 border-primary/20">
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary/70 mb-6 font-mono">
              System Telemetry
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
              {telemetry.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[1.4rem] border border-white/10 bg-white/[0.02] px-5 py-5 md:px-6 md:py-6"
                >
                  <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-slate/45 font-mono mb-3">
                    {metric.label}
                  </p>
                  <p className="text-xl md:text-2xl text-white tracking-tight leading-snug">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          {!featuredEpisode ? (
            <div className="luxury-card text-center rounded-[2.5rem]">
              <p className="text-2xl text-slate/60 tracking-tight">
                Podcast episodes temporarily unavailable.
              </p>
            </div>
          ) : (
            <div className="luxury-card rounded-[2.8rem] p-8 md:p-12 border-primary/25 hover:border-primary/40 hover:shadow-[0_0_80px_rgba(124,255,27,0.2)] transition-all duration-700 bg-[linear-gradient(140deg,rgba(124,255,27,0.08)_0%,rgba(255,255,255,0.03)_100%)]">
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary/70 mb-6 font-mono">
                Current Transmission
              </p>
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 md:gap-12 items-center">
                <div className="xl:col-span-5">
                  {featuredEpisode.imageUrl || feedData?.fallbackArtwork ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={featuredEpisode.imageUrl ?? feedData?.fallbackArtwork}
                      alt={featuredEpisode.title}
                      className="w-full rounded-[2rem] border border-white/10 object-cover shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
                    />
                  ) : (
                    <div className="w-full aspect-square rounded-[2rem] border border-white/10 bg-white/[0.02] flex items-center justify-center text-white/40 text-sm uppercase tracking-[0.25em] font-mono">
                      Featured Episode
                    </div>
                  )}
                </div>

                <div className="xl:col-span-7">
                  <h3 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-4 leading-tight">
                    {featuredEpisode.title}
                  </h3>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate/40 mb-6 font-mono">
                    {formatDate(featuredEpisode.pubDate)}
                  </p>
                  <p className="text-lg md:text-xl text-slate/70 leading-relaxed mb-8 tracking-tight">
                    {truncate(featuredEpisode.summary, 260)}
                  </p>
                  <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-4 md:p-5 mb-8">
                    <audio controls className="w-full">
                      <source src={featuredEpisode.audioUrl} />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                  <div className="text-center xl:text-left">
                    <a
                      href={featuredEpisode.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center bg-primary text-black px-8 md:px-10 py-4 md:py-5 rounded-full text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.3em] border border-primary hover:bg-white hover:border-white transition-all duration-500"
                    >
                      View Full Episode
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {restEpisodes.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-12">
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-bold text-primary/70 mb-8 md:mb-10 font-mono">
              Knowledge Archive
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
              {restEpisodes.map((episode) => (
                <article
                  key={episode.link}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 md:p-7 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(124,255,27,0.16)] hover:-translate-y-1 transition-all duration-500 flex flex-col"
                >
                  {episode.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={episode.imageUrl}
                      alt={episode.title}
                      className="w-full aspect-square rounded-[1.2rem] border border-white/10 object-cover mb-5"
                    />
                  )}
                  <h4 className="text-2xl font-light text-white tracking-tight mb-3">
                    {episode.title}
                  </h4>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate/40 mb-4 font-mono">
                    {formatDate(episode.pubDate)}
                  </p>
                  <p className="text-base text-slate/65 tracking-tight leading-relaxed mb-6 flex-1">
                    {truncate(episode.summary, 180)}
                  </p>
                  <audio controls className="w-full mb-5">
                    <source src={episode.audioUrl} />
                    Your browser does not support the audio element.
                  </audio>
                  <a
                    href={episode.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary text-xs md:text-sm font-bold uppercase tracking-[0.2em] hover:text-white transition-colors"
                  >
                    View Full Episode
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}

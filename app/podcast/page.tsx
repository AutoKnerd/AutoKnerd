import type { Metadata } from "next";
import { SiteNav } from "@/app/components/SiteNav";
import { SiteFooter } from "@/app/components/SiteFooter";
import s from "@/app/components/site.module.css";
import { getPodcastFeedData } from "@/app/lib/podcast";
import { buildTopicEpisodeMap } from "@/app/lib/intelligenceMap";
import PodcastArchiveClient from "@/app/podcast/PodcastArchiveClient";
import { DEMO, ext } from "@/app/lib/links";
import Link from "next/link";
import { Suspense } from "react";
import { Play, ArrowRight } from "lucide-react";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Podcast · AutoKnerd",
  description:
    "The AutoKnerd Podcast: real conversations with the people who run dealerships, on trust, transparency, CSI, and building a customer experience that stays consistent.",
};

const platformLinks = [
  { label: "Spotify", href: "https://open.spotify.com/search/AutoKnerd%20Podcast" },
  { label: "Apple Podcasts", href: "https://podcasts.apple.com/us/search?term=AutoKnerd%20Podcast" },
  { label: "YouTube", href: "https://www.youtube.com/results?search_query=AutoKnerd+Podcast" },
];

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(date);
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

function normalizeTopics(value: string): string {
  const lower = value.toLowerCase();
  if (lower.includes("leisure") || lower.includes("education") || lower.includes("technology")) {
    return "Trust, CX, coaching, behavior";
  }
  return value;
}

export default async function PodcastPage() {
  let feedData = null;
  try {
    feedData = await getPodcastFeedData();
  } catch {
    feedData = null;
  }

  const episodes = feedData?.episodes ?? [];
  const [featuredEpisode, ...restEpisodes] = episodes;
  const topicEpisodes = buildTopicEpisodeMap(episodes);
  const stats = [
    { label: "Episodes published", value: feedData?.totalEpisodes?.toString() ?? "N/A" },
    { label: "Average length", value: feedData?.averageEpisodeLength ?? "N/A" },
    { label: "Topics covered", value: normalizeTopics(feedData?.topicsCovered ?? "N/A") },
    { label: "Latest episode", value: feedData?.latestEpisodeDate ? formatDate(feedData.latestEpisodeDate) : "N/A" },
  ];

  return (
    <div className={s.page}>
      <SiteNav />

      {/* HERO */}
      <header className={s.hero}>
        <div className={s.container}>
          <span className={`${s.eyebrow} ${s.mono}`}>
            <span className={s.dot} />THE AUTOKNERD PODCAST
          </span>
          <h1 className={s.h1} style={{ maxWidth: 860 }}>
            Why customers do what they <span className={s.grad}>do.</span>
          </h1>
          <p className={s.lead}>
            Short, practical episodes on trust, customer anxiety, CSI, and the behavior that decides whether a
            deal closes, from the sales floor to the service drive. Steal what works for your own store.
          </p>
          <div className={s.heroCtas} style={{ marginTop: 26 }}>
            {platformLinks.map((p) => (
              <a key={p.label} href={p.href} {...ext} className={s.btnDark} style={{ height: 48, fontSize: 15 }}>
                {p.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* STATS */}
      <section style={{ paddingTop: "clamp(40px, 6vw, 64px)" }}>
        <div className={s.container}>
          <div className={s.card} style={{ padding: "clamp(22px, 3vw, 30px)" }}>
            <div className={s.grid4} style={{ marginTop: 0 }}>
              {stats.map((m) => (
                <div key={m.label}>
                  <p className={`${s.mono}`} style={{ margin: 0, fontSize: 11, letterSpacing: "0.16em", color: "#8A938D" }}>
                    {m.label.toUpperCase()}
                  </p>
                  <p style={{ margin: "8px 0 0", fontSize: 20, fontWeight: 800, lineHeight: 1.25 }}>{m.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className={s.section} style={{ paddingTop: "clamp(40px, 6vw, 64px)" }}>
        <div className={s.container}>
          {!featuredEpisode ? (
            <div className={s.card} style={{ textAlign: "center", padding: 48 }}>
              <p className={s.cardText} style={{ fontSize: 17 }}>Podcast episodes are temporarily unavailable.</p>
            </div>
          ) : (
            <div className={s.card} style={{ padding: "clamp(24px, 3vw, 36px)" }}>
              <p className={`${s.mono} ${s.kicker}`}>LATEST EPISODE</p>
              <div className={s.grid2} style={{ marginTop: 22, alignItems: "center" }}>
                <div>
                  {featuredEpisode.imageUrl || feedData?.fallbackArtwork ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={featuredEpisode.imageUrl ?? feedData?.fallbackArtwork}
                      alt={featuredEpisode.title}
                      style={{ width: "100%", borderRadius: 22, border: "1px solid #E7ECE5", objectFit: "cover", display: "block" }}
                    />
                  ) : (
                    <div style={{ width: "100%", aspectRatio: "1 / 1", borderRadius: 22, border: "1px solid #E7ECE5", background: "#F0F3EC", display: "flex", alignItems: "center", justifyContent: "center", color: "#8A938D" }}>
                      <Play size={40} />
                    </div>
                  )}
                </div>
                <div>
                  <h2 className={s.h2sm} style={{ margin: 0, fontSize: "clamp(24px, 3vw, 34px)" }}>{featuredEpisode.title}</h2>
                  <p className={s.mono} style={{ margin: "12px 0 0", fontSize: 12, letterSpacing: "0.12em", color: "#8A938D" }}>
                    {formatDate(featuredEpisode.pubDate)}
                  </p>
                  <p className={s.cardText} style={{ fontSize: 16, marginTop: 16 }}>{truncate(featuredEpisode.summary, 260)}</p>
                  <div style={{ marginTop: 20, borderRadius: 16, border: "1px solid #E7ECE5", background: "#F7F9F5", padding: 14 }}>
                    <audio controls style={{ width: "100%" }}>
                      <source src={featuredEpisode.audioUrl} />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                  <div style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
                    <Link href={`/podcast/${featuredEpisode.slug}`} className={s.btnPrimary} style={{ height: 48, fontSize: 15 }}>
                      View episode <ArrowRight size={16} strokeWidth={2.4} />
                    </Link>
                    <a href="https://podcasts.apple.com/us/search?term=AutoKnerd%20Podcast" {...ext} className={s.textLink} style={{ marginTop: 0 }}>
                      Apple Podcasts
                    </a>
                    <a href="https://open.spotify.com/search/AutoKnerd%20Podcast" {...ext} className={s.textLink} style={{ marginTop: 0 }}>
                      Spotify
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* HOST */}
      <section className={s.section} style={{ paddingTop: "clamp(40px, 6vw, 64px)" }}>
        <div className={s.container}>
          <div className={s.founderCard}>
            <img
              src="/founder-andrew.webp"
              alt="Andrew Sardone, host of the AutoKnerd Podcast, on the showroom floor"
              className={s.founderImg}
            />
            <div className={s.founderBody}>
              <p className={`${s.mono} ${s.kicker}`}>YOUR HOST</p>
              <h2 className={s.h2sm} style={{ marginTop: 8 }}>Andrew Sardone</h2>
              <p className={s.founderSecond} style={{ marginTop: 14, fontSize: 17, color: "#3A443F" }}>
                A longtime automotive trainer for brands across the industry, Andrew is a subject-matter expert in
                dealership customer experience, internal combustion and electrified vehicles, and automotive
                technology. On the show he breaks down the psychology and behavior behind the car-buying
                experience, why customers walk in guarded, where trust quietly slips, and the small moments that
                make or lose a deal. Practical, no fluff, straight from the sales floor and the service drive.
              </p>
              <p style={{ margin: "18px 0 0", fontSize: 16, fontWeight: 700, color: "#2FA84A", lineHeight: 1.5, maxWidth: 640 }}>
                His conviction runs through every episode: kindness and care in the sale aren&apos;t soft. They are
                directly tied to a customer&apos;s motivation to buy, and to the profit that follows when you deliver
                a genuinely great experience.
              </p>
              <div className={s.founderSig} style={{ marginTop: 22 }}>
                <p className={s.founderRole} style={{ margin: 0 }}>Founder of AutoKnerd · automotive trainer &amp; SME</p>
                <span className={s.tagFound}>New episodes weekly</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHIVE */}
      {restEpisodes.length > 0 && (
        <Suspense
          fallback={
            <section className={s.section}>
              <div className={s.container}>
                <div className={s.card} style={{ padding: 32, color: "#6A736D" }}>Loading archive filters...</div>
              </div>
            </section>
          }
        >
          <PodcastArchiveClient
            episodes={restEpisodes}
            featuredEpisode={featuredEpisode}
            topicEpisodes={topicEpisodes}
            fallbackArtwork={feedData?.fallbackArtwork}
          />
        </Suspense>
      )}

      {/* CTA */}
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.dispatchCard}>
            <div style={{ maxWidth: 560 }}>
              <p className={`${s.mono} ${s.kicker}`}>PUT IT TO WORK</p>
              <h3 className={s.dispatchTitle}>Great on the ears. Better on your floor.</h3>
              <p className={s.dispatchText}>
                The same ideas from the show are what AutoKnerd turns into five-minute weekly practice for
                every rep and advisor. See it work on a live, no-login demo.
              </p>
            </div>
            <a href={DEMO} {...ext} className={s.btnPrimary} style={{ flexShrink: 0 }}>
              See a live demo <ArrowRight size={18} strokeWidth={2.2} />
            </a>
          </div>
        </div>
      </section>

      <div style={{ height: 20 }} />
      <SiteFooter />
    </div>
  );
}

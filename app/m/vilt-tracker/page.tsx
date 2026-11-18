import type { Metadata } from "next";
import { Tracker, type TrackerData } from "./Tracker";
import styles from "./tracker.module.css";
import { FEED_TAG } from "../_kia/feed";

// Unlisted, link-only vILT Live Tracker for the Kia University trainers.
// The numbers come from the "vILT Tracker Receiver" Apps Script (fed hourly by
// the vILT Tracker Sync Chrome extension). The page asks the script for them at
// most once an hour and Vercel caches the answer, so it stays current on its own.
// The feed key lives only in Vercel env vars (VILT_FEED_URL, VILT_FEED_KEY).
// No rosters or emails are ever sent here: only sessions and totals.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "vILT Live Tracker",
  description: "Kia University virtual class schedule and results.",
  robots: { index: false, follow: false },
};

async function load(): Promise<TrackerData | null> {
  const url = process.env.VILT_FEED_URL;
  const key = process.env.VILT_FEED_KEY;
  if (!url || !key) return null;
  try {
    const u = new URL(url);
    u.searchParams.set("feed", "tracker");
    u.searchParams.set("key", key);
    const r = await fetch(u, { next: { revalidate, tags: [FEED_TAG] } });
    if (!r.ok) return null;
    const j = await r.json();
    if (!j || !Array.isArray(j.D) || !j.meta) return null;
    return j as TrackerData;
  } catch {
    return null;
  }
}

export default async function ViltTrackerPage() {
  const data = await load();
  return (
    <div className={styles.page}>
      {data ? (
        <Tracker data={data} />
      ) : (
        <div className={styles.wrap}>
          <h1 className={styles.h1}>vILT Live Tracker</h1>
          <p className={styles.empty}>Couldn&rsquo;t load the tracker data right now. Try again in a few minutes.</p>
        </div>
      )}
    </div>
  );
}

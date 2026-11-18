// Reads one feed from the "vILT Tracker Receiver" Apps Script (fed hourly by the vILT Tracker Sync extension).
// The key lives only in Vercel env vars (VILT_FEED_URL, VILT_FEED_KEY); this runs on the server only.

export const FEED_REVALIDATE = 3600;
// Every feed fetch carries this tag. The Apps Script POSTs to /m/kia-refresh after each pull, which expires it,
// so the pages show new data right after each pull; the hour above is only a fallback.
export const FEED_TAG = "vilt-feed";

export async function readFeed<T>(feed: string, check: (j: unknown) => boolean, extra?: Record<string, string>): Promise<T | null> {
  const url = process.env.VILT_FEED_URL;
  const key = process.env.VILT_FEED_KEY;
  if (!url || !key) return null;
  try {
    const u = new URL(url);
    u.searchParams.set("feed", feed);
    u.searchParams.set("key", key);
    for (const [k, v] of Object.entries(extra || {})) u.searchParams.set(k, v);
    const r = await fetch(u, { next: { revalidate: FEED_REVALIDATE, tags: [FEED_TAG] } });
    if (!r.ok) return null;
    const j: unknown = await r.json();
    return check(j) ? (j as T) : null;
  } catch {
    return null;
  }
}

/** Shape check for the tracker feed (vilt-tracker-data.json). */
export const isTrackerData = (j: unknown) => {
  const x = j as { D?: unknown; meta?: unknown } | null;
  return !!x && Array.isArray(x.D) && !!x.meta;
};

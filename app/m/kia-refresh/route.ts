import { createHash, timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { FEED_TAG } from "../_kia/feed";

// Called by the "vILT Tracker Receiver" Apps Script right after each pull it saves (tracker, rosters).
// It proves itself with the same key the site already uses to read the feeds (VILT_FEED_KEY), sent in the
// POST body so it never lands in a URL or log. Expiring the feed tag makes the next visit to any Kia page
// fetch fresh data instead of waiting out the hourly cache.
export const dynamic = "force-dynamic";

const PAGES = ["/m/vilt-tracker", "/m/enrollment-runway", "/m/team-show-rate", "/m/runway/paul", "/m/runway/anthony", "/m/kia"];
const digest = (s: string) => createHash("sha256").update(s).digest();

export async function POST(req: Request) {
  const want = process.env.VILT_FEED_KEY;
  let got = "";
  try { got = String(((await req.json()) as { key?: unknown }).key ?? ""); } catch {}
  if (!want || !got || !timingSafeEqual(digest(got), digest(want))) {
    await new Promise((r) => setTimeout(r, 800));
    return Response.json({ ok: false }, { status: 401 });
  }
  revalidateTag(FEED_TAG, { expire: 0 });
  for (const p of PAGES) revalidatePath(p);
  return Response.json({ ok: true, at: new Date().toISOString() });
}

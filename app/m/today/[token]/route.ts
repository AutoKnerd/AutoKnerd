import { createHash, timingSafeEqual } from "node:crypto";
import { readFeed, isTrackerData } from "../../_kia/feed";
import { buildRunway, type Bundle } from "../../enrollment-runway/data";
import { ownBands, type HistoryRow } from "../../_kia/insights";
import type { SessionsFeed } from "../../team-show-rate/stats";
import type { TrackerData } from "../../vilt-tracker/Tracker";

// Plain-text "today" sheet for Andrew's morning brief (read by ChatGPT): today's classes with enrollment and the
// same projected attendance the Enrollment Runway shows. Link-only: the address carries a token derived from the
// feed key (sha256 of "kia-today-v1:" + VILT_FEED_KEY, first 32 hex), so there's no extra secret to store and
// the link changes if the key ever does. Numbers only, no names or emails. Refreshes with the feeds after each pull.
export const dynamic = "force-dynamic";

const isBundle = (j: unknown) => !!j && typeof j === "object" && Array.isArray((j as Bundle).record) && Array.isArray((j as Bundle).ledger);
const DOW = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MON = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const longDate = (iso: string) => { const d = new Date(iso.slice(0, 10) + "T12:00:00Z"); return `${DOW[d.getUTCDay()]}, ${MON[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`; };
const t12 = (hhmm: string) => { const [h, m] = hhmm.split(":").map(Number); return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`; };
const text = (body: string, status = 200) => new Response(body, { status, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } });

function tokenOk(got: string) {
  const key = process.env.VILT_FEED_KEY;
  if (!key) return false;
  const want = createHash("sha256").update("kia-today-v1:" + key).digest("hex").slice(0, 32);
  const a = Buffer.from(got), b = Buffer.from(want);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function GET(_req: Request, { params }: { params: Promise<{ token: string }> }) {
  if (!tokenOk((await params).token)) return text("Not found.", 404);
  const [b, tr, sf, hist] = await Promise.all([readFeed<Bundle>("runway", isBundle), readFeed<TrackerData>("tracker", isTrackerData),
    readFeed<SessionsFeed>("sessions", (j) => !!j && Array.isArray((j as SessionsFeed).rows), { from: "2026-08-31" }),
    readFeed<{ rows: HistoryRow[] }>("history", (j) => !!j && Array.isArray((j as { rows?: unknown }).rows))]);
  if (!b) return text("Status: UNAVAILABLE\nThe class data couldn't be loaded right now. Try again in a few minutes.", 503);
  const d = buildRunway(b, new Date(), sf && hist ? ownBands(hist.rows, sf.rows, "Andrew") : undefined);

  // End times come from the tracker feed (rows: [MM/DD/YYYY, day, start, end, trainer, course, event id]).
  const ends = new Map<string, string>();
  for (const r of tr?.D || []) if (r[4] === "Andrew") ends.set(String(r[6]), String(r[3]));

  const rows = d.up.filter((r) => r.date === d.today);
  const best = (lo: number, hi: number) => Math.round((lo + hi) / 2);
  const pull = d.stamp.pull;
  const out = [
    "Andrew Sardone - Kia University virtual classes today",
    `Date: ${d.today} (${longDate(d.today)})`,
    `Rosters last read from Wingspan: ${pull ? `${pull.slice(0, 10)} at ${t12(pull.slice(11, 16))} ET` : "unknown"}`,
    `Status: ${pull && pull.slice(0, 10) === d.today ? "CURRENT" : "STALE (rosters not read yet today)"}`,
    `Classes today: ${rows.length}`,
    "",
  ];
  if (!rows.length) out.push("No Kia classes today.");
  for (const r of rows) {
    const end = ends.get(r.event_id);
    out.push(`${t12(r.start_et.slice(11, 16))}${end ? " - " + end : ""} ET | ${r.title} | ${r.enrolled} enrolled | projected ${r.room[0]}-${r.room[1]} attending (best guess ${best(r.room[0], r.room[1])})`);
  }
  if (rows.length) {
    const e = rows.reduce((a, r) => a + r.enrolled, 0), lo = rows.reduce((a, r) => a + r.room[0], 0), hi = rows.reduce((a, r) => a + r.room[1], 0);
    out.push("", `Total: ${rows.length} class${rows.length === 1 ? "" : "es"} | ${e} enrolled | projected ${lo}-${hi} attending (best guess ${best(lo, hi)})`);
  }
  out.push("", "Projected attending = projected final roster x Andrew's recorded show rate for that kind of class (Welcome to Kia or workshop), the same numbers as the Enrollment Runway.");
  return text(out.join("\n") + "\n");
}

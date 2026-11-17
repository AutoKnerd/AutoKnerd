// Per-trainer patterns from the Session Log (pure). Rows come from the Apps Script "sessions" feed:
// [event id, trainer, date YYYY-MM-DD, start "9:30 AM", class, status, registered, attended].
import type { SessionRow } from "../team-show-rate/stats";

export const SINCE = "2026-09-02";
export const CAP = 35; // workshop rosters stop at 35 in Wingspan
export const SMALL = 5; // fewer classes than this: shown, but flagged as a small sample

export type Tally = { n: number; e: number; x: number };
const add = (t: Tally, r: SessionRow) => { t.n++; t.e += r[6]; t.x += r[7]; };
export const rate = (t: Tally) => (t.e ? t.x / t.e : 0);
const isClosed = (r: SessionRow) => /^(Closed|Attendance Closed)$/.test(r[5]);
const isWelcome = (c: string) => /^\s*welcome to kia/i.test(c);
const DOW = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export const mins = (t: string) => { const m = /(\d+):(\d+)\s*([AP])M/i.exec(t || ""); if (!m) return 0; let h = +m[1] % 12; if (/p/i.test(m[3])) h += 12; return h * 60 + +m[2]; };
const mondayOf = (iso: string) => { const d = new Date(iso + "T12:00:00Z"); d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7)); return d.toISOString().slice(0, 10); };
const addDays = (iso: string, n: number) => { const d = new Date(iso + "T12:00:00Z"); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };

function group(rows: SessionRow[], key: (r: SessionRow) => string) {
  const m = new Map<string, Tally>();
  for (const r of rows) { const k = key(r); const t = m.get(k) || { n: 0, e: 0, x: 0 }; add(t, r); m.set(k, t); }
  return [...m.entries()].map(([k, t]) => ({ k, ...t, rate: rate(t) }));
}

export function insights(all: SessionRow[], who: string, today: string, through: string) {
  const mine = all.filter((r) => r[1] === who && !/cancel|missing/i.test(r[5]));
  const closed = mine.filter((r) => isClosed(r) && r[2] >= SINCE && r[2] <= through && r[6] > 0);
  // 1. closed in Wingspan with nobody marked: left out of every number until someone marks them
  const unmarked = closed.filter((r) => !(r[7] > 0)).sort((a, b) => b[2].localeCompare(a[2]));
  const counted = closed.filter((r) => r[7] > 0);
  const overall = counted.reduce((t, r) => (add(t, r), t), { n: 0, e: 0, x: 0 } as Tally);
  // 2. by course, start time, weekday
  const byCourse = group(counted, (r) => r[4]).sort((a, b) => b.n - a.n || a.k.localeCompare(b.k));
  const bySlot = group(counted, (r) => r[3]).sort((a, b) => mins(a.k) - mins(b.k));
  const byDay = group(counted, (r) => DOW[new Date(r[2] + "T12:00:00Z").getUTCDay()]).sort((a, b) => DOW.indexOf(a.k) - DOW.indexOf(b.k));
  // 3. full classes (workshops at the 35 cap), past and upcoming
  const work = mine.filter((r) => !isWelcome(r[4]) && r[2] >= SINCE && (isClosed(r) || /^Active$/i.test(r[5])));
  const fullByCourse = group(work, (r) => r[4]).map((g) => ({ ...g, full: work.filter((r) => r[4] === g.k && r[6] >= CAP).length }))
    .filter((g) => g.full > 0).sort((a, b) => b.full / b.n - a.full / a.n || b.full - a.full);
  const fullUpcoming = mine.filter((r) => /^Active$/i.test(r[5]) && r[2] >= today && !isWelcome(r[4]) && r[6] >= CAP).sort((a, b) => (a[2] + String(mins(a[3])).padStart(4, "0")).localeCompare(b[2] + String(mins(b[3])).padStart(4, "0")));
  const fullPast = work.filter((r) => isClosed(r) && r[6] >= CAP).length, workPast = work.filter(isClosed).length;
  // 4. weekly trend (complete weeks only)
  const weeks = group(counted, (r) => mondayOf(r[2])).filter((w) => addDays(w.k, 6) <= through).sort((a, b) => a.k.localeCompare(b.k));
  return { overall, unmarked, byCourse, bySlot, byDay, fullByCourse, fullUpcoming, fullPast, workPast, weeks };
}
export type Insights = ReturnType<typeof insights>;

// 5. Growth bands from each trainer's own roster history (daily snapshots kept by the Apps Script).
// history row: [snapshot day, event id, trainer, class date, registered]
export type HistoryRow = [string, string, string, string, number];
export type OwnBands = Record<string, { lo: number; hi: number; n: number }>; // key `${family}|${daysOut 0..4}`
export const MIN_BAND_SAMPLES = 8;

export function ownBands(history: HistoryRow[], sessions: SessionRow[], who: string): OwnBands {
  const final = new Map<string, { reg: number; welcome: boolean }>();
  for (const r of sessions) if (r[1] === who && isClosed(r) && r[6] > 0) final.set(r[0], { reg: r[6], welcome: isWelcome(r[4]) });
  const ratios = new Map<string, number[]>();
  for (const [day, id, trainer, classDate, reg] of history) {
    const f = final.get(id);
    if (trainer !== who || !f || !(reg > 0)) continue;
    const d = Math.min(4, Math.round((Date.parse(classDate + "T12:00:00Z") - Date.parse(day + "T12:00:00Z")) / 864e5));
    if (d < 0) continue;
    const k = `${f.welcome ? "welcome" : "workshop"}|${d}`;
    ratios.set(k, [...(ratios.get(k) || []), f.reg / reg]);
  }
  const q = (xs: number[], p: number) => { const s = xs.slice().sort((a, b) => a - b); const i = (s.length - 1) * p, lo = Math.floor(i), hi = Math.ceil(i); return s[lo] + (s[hi] - s[lo]) * (i - lo); };
  const out: OwnBands = {};
  for (const [k, xs] of ratios) if (xs.length >= MIN_BAND_SAMPLES) out[k] = { lo: Math.max(1, q(xs, 0.25)), hi: Math.max(1, q(xs, 0.75)), n: xs.length };
  return out;
}

// Team Show Rate maths, pure (no I/O). Input is the Apps Script "sessions" feed:
// one row per Kia University vILT session from the Session Log the extension keeps current.

export type Trainer = "Andrew" | "Anthony" | "Paul";
export const TRAINERS: Trainer[] = ["Andrew", "Paul", "Anthony"];
export const FULL: Record<Trainer, string> = { Andrew: "Andrew Sardone", Anthony: "Anthony Burkhardt", Paul: "Paul Reilly" };
export const CONTROLS: Trainer[] = ["Paul", "Anthony"];

// [event id, trainer, date YYYY-MM-DD, start time ET, class, status, registered, attended]
export type SessionRow = [string, Trainer, string, string, string, string, number, number];
export type SessionsFeed = { ok: true; asOf: string; through: string; lastPull: string; rows: SessionRow[] };

export const START = "2026-09-02"; // first day of the comparison
export const SPLIT = "2026-09-26"; // first full day after Andrew's reminder emails began (Sep 24/25)

export type Tally = { s: number; n: number; x: number };
export type Family = "welcome" | "workshop";
const empty = (): Tally => ({ s: 0, n: 0, x: 0 });
const add = (t: Tally, r: SessionRow) => { t.s++; t.n += r[6]; t.x += r[7]; };
export const rate = (t: Tally) => (t.n ? t.x / t.n : 0);

export const family = (cls: string): Family => (/^welcome to kia/i.test(cls) ? "welcome" : "workshop");

// Normal CDF via erf (Abramowitz-Stegun 7.1.26), good to ~1e-7.
function erf(x: number) {
  const s = Math.sign(x); x = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * x);
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
  return s * y;
}
const pFromZ = (z: number) => 2 * (1 - 0.5 * (1 + erf(Math.abs(z) / Math.SQRT2)));

/** Two-proportion z-test, two-sided, pooled variance. */
export function zTest(a: Tally, b: Tally) {
  if (!a.n || !b.n) return { diff: 0, p: 1 };
  const p = (a.x + b.x) / (a.n + b.n);
  const se = Math.sqrt(p * (1 - p) * (1 / a.n + 1 / b.n));
  const diff = rate(a) - rate(b);
  return { diff, p: se ? pFromZ(diff / se) : 1 };
}

/** Difference-in-differences: (treated after - before) - (controls after - before), unpooled SE. */
export function did(tb: Tally, ta: Tally, cb: Tally, ca: Tally) {
  const v = (t: Tally) => (t.n ? (rate(t) * (1 - rate(t))) / t.n : 0);
  const d = rate(ta) - rate(tb) - (rate(ca) - rate(cb));
  const se = Math.sqrt(v(tb) + v(ta) + v(cb) + v(ca));
  return { d, p: se ? pFromZ(d / se) : 1 };
}

const mondayOf = (iso: string) => {
  const d = new Date(iso + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
  return d.toISOString().slice(0, 10);
};
const addDays = (iso: string, n: number) => { const d = new Date(iso + "T12:00:00Z"); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };

function quantile(sorted: number[], q: number) {
  if (!sorted.length) return 0;
  const i = (sorted.length - 1) * q, lo = Math.floor(i), hi = Math.ceil(i);
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (i - lo);
}

export function counts(r: SessionRow, through: string) {
  return (r[5] === "Closed" || r[5] === "Attendance Closed") && r[2] >= START && r[2] <= through && !/test event|zoom testing/i.test(r[4]);
}

export function build(feed: SessionsFeed) {
  const through = feed.through;
  const closed = feed.rows.filter((r) => counts(r, through) && TRAINERS.includes(r[1]));
  const noFigure = closed.filter((r) => !r[7] || !r[6]); // Wingspan recorded no attendance: excluded, never counted as zero
  const rows = closed.filter((r) => r[7] > 0 && r[6] > 0);

  const all: Record<Trainer, Tally> = { Andrew: empty(), Anthony: empty(), Paul: empty() };
  const fam: Record<Family, Record<Trainer, Tally>> = {
    welcome: { Andrew: empty(), Anthony: empty(), Paul: empty() },
    workshop: { Andrew: empty(), Anthony: empty(), Paul: empty() },
  };
  const half: Record<"before" | "after", Record<Trainer, Tally>> = {
    before: { Andrew: empty(), Anthony: empty(), Paul: empty() },
    after: { Andrew: empty(), Anthony: empty(), Paul: empty() },
  };
  const halfWelcome: Record<"before" | "after", Record<Trainer, Tally>> = {
    before: { Andrew: empty(), Anthony: empty(), Paul: empty() },
    after: { Andrew: empty(), Anthony: empty(), Paul: empty() },
  };
  const team = empty();
  const famTeam: Record<Family, Tally> = { welcome: empty(), workshop: empty() };
  const famRange: Record<Family, [number, number]> = { welcome: [Infinity, 0], workshop: [Infinity, 0] };
  const perSession: Record<Trainer, number[]> = { Andrew: [], Anthony: [], Paul: [] };
  const weeks: Record<string, Record<Trainer, Tally>> = {};

  for (const r of rows) {
    const t = r[1], f = family(r[4]), h = r[2] >= SPLIT ? "after" : "before";
    add(all[t], r); add(team, r); add(fam[f][t], r); add(famTeam[f], r); add(half[h][t], r);
    if (f === "welcome") add(halfWelcome[h][t], r);
    famRange[f] = [Math.min(famRange[f][0], r[6]), Math.max(famRange[f][1], r[6])];
    if (r[6] >= 10) perSession[t].push(r[7] / r[6]);
    const w = mondayOf(r[2]);
    weeks[w] = weeks[w] || { Andrew: empty(), Anthony: empty(), Paul: empty() };
    add(weeks[w][t], r);
  }

  const pool = (src: Record<Trainer, Tally>, who: Trainer[]) => who.reduce((acc, t) => ({ s: acc.s + src[t].s, n: acc.n + src[t].n, x: acc.x + src[t].x }), empty());
  const ctrlBefore = pool(half.before, CONTROLS), ctrlAfter = pool(half.after, CONTROLS);
  const lift = did(half.before.Andrew, half.after.Andrew, ctrlBefore, ctrlAfter);
  const liftWelcome = did(halfWelcome.before.Andrew, halfWelcome.after.Andrew, pool(halfWelcome.before, CONTROLS), pool(halfWelcome.after, CONTROLS));
  const andrewBeforeAfter = zTest(half.after.Andrew, half.before.Andrew);

  // complete weeks only: the week's Sunday must be on or before the last complete day
  const weekKeys = Object.keys(weeks).sort().filter((w) => addDays(w, 6) <= through);

  const spread = Object.fromEntries(TRAINERS.map((t) => {
    const s = perSession[t].slice().sort((a, b) => a - b);
    return [t, { count: s.length, median: quantile(s, 0.5), q1: quantile(s, 0.25), q3: quantile(s, 0.75) }];
  })) as Record<Trainer, { count: number; median: number; q1: number; q3: number }>;

  return {
    through, lastPull: feed.lastPull, asOf: feed.asOf,
    rows, noFigure: noFigure.length,
    all, fam, famTeam, famRange, half, ctrlBefore, ctrlAfter, lift, liftWelcome, andrewBeforeAfter,
    weeks: weekKeys.map((w) => ({ w, t: weeks[w] })), team, spread,
    pairs: {
      all: { AP: zTest(all.Andrew, all.Paul), AA: zTest(all.Andrew, all.Anthony), PA: zTest(all.Paul, all.Anthony) },
      welcome: { AP: zTest(fam.welcome.Andrew, fam.welcome.Paul), AA: zTest(fam.welcome.Andrew, fam.welcome.Anthony), PA: zTest(fam.welcome.Paul, fam.welcome.Anthony) },
      workshop: { AP: zTest(fam.workshop.Andrew, fam.workshop.Paul), AA: zTest(fam.workshop.Andrew, fam.workshop.Anthony), PA: zTest(fam.workshop.Paul, fam.workshop.Anthony) },
    },
  };
}
export type ShowRate = ReturnType<typeof build>;

// ---- formatting ----
export const pct = (v: number, d = 1) => (v * 100).toFixed(d) + "%";
export const pts = (v: number) => (v >= 0 ? "+" : "−") + Math.abs(v * 100).toFixed(1);
export const pval = (p: number) => (p < 0.001 ? "p < 0.001" : "p = " + (p < 0.01 ? p.toFixed(4) : p.toFixed(3)));
export const num = (n: number) => n.toLocaleString("en-US");
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const md = (iso: string) => MON[+iso.slice(5, 7) - 1] + " " + +iso.slice(8, 10);

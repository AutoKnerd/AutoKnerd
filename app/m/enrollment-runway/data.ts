// Enrollment Runway maths, pure. Input: the Apps Script "runway" bundle (no names, emails replaced by codes).
// Ports kia_core.py (merge_record, headline, ledger_state, tymetrics) plus the page's locked rules.

type Num = number | null | undefined;
export type RecSession = {
  date: string; title: string; event_id?: string | null; treat?: string | null;
  enrolled?: Num; attended?: Num; in_room?: Num; credited?: Num; class_minutes?: Num; credit_line_minutes?: Num;
  verified?: boolean | null; contacted_emails?: string[] | null; welcomed_emails?: string[] | null;
  attended_emails?: string[] | null; enrolled_emails?: string[] | null; start_et?: string | null; status?: string | null;
  _auto?: boolean;
};
type Person = [string | null, string | null, number, number]; // code, registered_on, active, attended
type PullSession = [string, string, string, string, string, number | null, number | null, Person[]];
type LedgerRow = { run_date: string | null; seq: number; type: string | null; event_ids: string[]; session_title: string | null;
  session_start_et: string | null; bcc_count: number | null; scheduled_for_et: string | null; status: string | null;
  staged_verified: boolean; exchange: boolean; written_at_et: string | null };
type PlanItem = { type: string; event_ids: string[]; session_title: string; session_start_et: string; bcc_count: number;
  send_at_et: string; window_closes_et?: string; seq: number };
type TyEntry = { date: string; type?: string; recipients?: string[] | number; sent?: boolean; draft_created?: boolean };
export type Bundle = {
  version: number; generated_at: string;
  record: { name: string; created: string; doc: { sessions?: RecSession[]; fills_apply_to_existing_entries?: Record<string, unknown>[];
    room_records?: Record<string, unknown>[]; room_records_for_sessions_not_yet_in_the_log?: Record<string, unknown>[] } }[];
  contacted: Record<string, { title?: string; contacted?: string[]; welcomed?: string[] }>;
  pull: { p: string; s: PullSession[]; c: PullSession[] } | null;
  past_sessions: PullSession[];
  plan: { name: string; doc: { generated_at?: string; status?: string; items?: PlanItem[] } } | null;
  plan_people: Record<string, string[]>;
  ledger: LedgerRow[];
  thankyou: { entries?: TyEntry[] };
  engine: { updated_et?: string; mode?: string; pause?: boolean; last_pull?: { at?: string; read_at?: string } | null } | null;
  log: [string, string, string, string, string, number, number][]; // id, date, start, class, status, reg, att
};

// ---------------- config (locked rules from the page; edit here to change them) ----------------
export const CONFIG = {
  windowDays: 16,
  scaleMax: 200,
  bands: {
    workshop: { 0: [1.05, 1.2], 1: [1.15, 1.45], 2: [1.4, 1.8], 3: [1.4, 2.6], 4: [1.7, 2.6] } as Record<number, [number, number]>,
    welcome: { 0: [1.2, 1.8], 1: [1.15, 1.45], 2: [2.2, 2.6] } as Record<number, [number, number]>,
    welcomeFarAbs: [54, 175] as [number, number], // Welcome 3+ days out: the range of recorded finishes
  },
  pace: { hot: 1.25, pace: 0.75, soft: 0.5, minComparator: 3 },
  showPill: { hot: 1.25, pace: 0.85, soft: 0.6 },
  reminderStart: "2026-09-24",
  thankyouFrom: "2026-10-22",
  // sessions excluded from every average until resolved
  heldOut: [{ date: "2026-11-09", reason: "closed in Wingspan with no attendance marks" }] as { date?: string; event_id?: string; reason: string }[],
  tyBefore: { days: 12, attended_per_day: 42.1, sd: 16.4, enrolled_per_day: 100, per_class: 14.4, enrolled_per_class: 34.3, came_back_pct: 15, came_back: "39 of 264", range: [23, 84], iqr: [35, 43] },
};

// ---------------- helpers ----------------
const isInt = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);
export const isWelcome = (t: string) => /^\s*welcome to kia/i.test(t || "");
export const clean = (t: string) => String(t || "").replace(/^\s*(vILT|Teaching):\s*/i, "").replace(/\s*\[[^\]]*\]\s*$/, "").trim();
export const codeOf = (t: string) => (String(t || "").match(/\[([^\]]+)\]\s*$/) || [])[1] || "";
export function normCourse(s: string) {
  let x = String(s || "").replace(/\[.*?\]|vILT:?|Teaching:/gi, "");
  x = x.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  return x.replace("product workshop", "").replace("workshop", "").trim();
}
const fmtET = new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false });
export function etOf(utc: string | Date) {
  const d = typeof utc === "string" ? new Date(utc.replace(" ", "T").replace(/Z?$/, "Z")) : utc;
  const p = Object.fromEntries(fmtET.formatToParts(d).map((x) => [x.type, x.value]));
  return `${p.year}-${p.month}-${p.day} ${p.hour === "24" ? "00" : p.hour}:${p.minute}`;
}
export const addDays = (iso: string, n: number) => { const d = new Date(iso.slice(0, 10) + "T12:00:00Z"); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const dayDiff = (a: string, b: string) => Math.round((Date.parse(a.slice(0, 10) + "T12:00:00Z") - Date.parse(b.slice(0, 10) + "T12:00:00Z")) / 864e5);
const quantile = (xs: number[], q: number) => { const s = xs.slice().sort((a, b) => a - b); if (!s.length) return 0; const i = (s.length - 1) * q, lo = Math.floor(i), hi = Math.ceil(i); return s[lo] + (s[hi] - s[lo]) * (i - lo); };
const lower = (xs: unknown) => (Array.isArray(xs) ? xs.filter((x) => typeof x === "string").map((x) => (x as string).toLowerCase()) : []);

// ---------------- record ----------------
function mergeRecord(b: Bundle) {
  const base = b.record.find((f) => f.name === "reminder-log.json") || b.record[0];
  const sessions: RecSession[] = (base?.doc.sessions || []).map((s) => ({ ...s }));
  const key = (s: { event_id?: unknown; date?: unknown; title?: unknown }) => (s.event_id as string) || `${s.date}|${s.title}`;
  const index = new Map(sessions.map((s) => [key(s), s]));
  const byDt = new Map(sessions.map((s) => [`${s.date}|${s.title}`, s]));
  const find = (x: Record<string, unknown>): RecSession | undefined => (x.event_id ? index.get(x.event_id as string) : undefined) || byDt.get(`${x.date}|${x.title}`);
  const apply = (t: RecSession, fill: Record<string, unknown>) => {
    for (const [k, v] of Object.entries(fill)) {
      if (k.startsWith("_") || k === "date" || k === "title" || k === "event_id") continue;
      (t as Record<string, unknown>)[k.startsWith("set_") ? k.slice(4) : k] = v;
    }
  };
  for (const f of b.record) {
    if (f === base) continue;
    for (const s of f.doc.sessions || []) {
      if (find(s as unknown as Record<string, unknown>)) continue;
      const c = { ...s }; sessions.push(c); index.set(key(c), c); byDt.set(`${c.date}|${c.title}`, c);
    }
    for (const fill of f.doc.fills_apply_to_existing_entries || []) { const t = find(fill); if (t) apply(t, fill); }
    for (const k of ["room_records", "room_records_for_sessions_not_yet_in_the_log"] as const) {
      for (const r of f.doc[k] || []) {
        const t = find(r); if (!t) continue;
        const room: Record<string, unknown> = {};
        for (const kk of ["in_room", "credited", "class_minutes", "credit_line_minutes"]) if (kk in r) room[kk] = r[kk];
        apply(t, room);
      }
    }
  }
  return { sessions, index };
}

/** Sessions closed since the hand-kept record stopped growing come from the Session Log (Wingspan totals) and the
 *  roster pulls (who attended), with treat = "rem" when the reminder pipeline contacted anyone for that session. */
function extendRecord(b: Bundle, sessions: RecSession[], index: Map<string, RecSession>, today: string) {
  const people = new Map<string, PullSession>();
  for (const r of [...(b.past_sessions || []), ...(b.pull?.c || [])]) people.set(r[0], r);
  for (const [id, date, start, cls, status, reg, att] of b.log || []) {
    if (date >= today || !/^(Closed|Attendance Closed)$/.test(status)) continue;
    const existing = index.get(id);
    if (existing) {
      if (!isInt(existing.attended) && att > 0) { existing.enrolled = isInt(existing.enrolled) ? existing.enrolled : reg; existing.attended = att; existing._auto = true; }
      continue;
    }
    if (!(att > 0) || !(reg > 0)) continue; // no attendance recorded yet
    const ct = b.contacted?.[id];
    const pr = people.get(id);
    const s: RecSession = {
      date, title: cls, event_id: id, start_et: start, enrolled: reg, attended: att, status,
      treat: ct && ((ct.contacted || []).length || (ct.welcomed || []).length) ? "rem" : "unknown",
      contacted_emails: ct?.contacted || [], welcomed_emails: ct?.welcomed || [],
      attended_emails: pr ? pr[7].filter((p) => p[3] === 1 && p[0]).map((p) => p[0] as string) : null,
      enrolled_emails: pr ? pr[7].filter((p) => p[0]).map((p) => p[0] as string) : null,
      _auto: true,
    };
    sessions.push(s); index.set(id, s);
  }
  // part files written since November leave out "treat"; every session since the programme began was in it
  for (const s of sessions) if (!s.treat) s.treat = b.contacted?.[s.event_id || ""] || s.date >= CONFIG.reminderStart ? "rem" : "none";
  sessions.sort((a, b) => (a.date + a.title).localeCompare(b.date + b.title));
}

const heldReason = (s: RecSession) => CONFIG.heldOut.find((h) => (h.event_id && h.event_id === s.event_id) || (!h.event_id && h.date === s.date))?.reason || null;
export const isClosed = (s: RecSession) => isInt(s.enrolled) && isInt(s.attended) && (s.enrolled as number) > 0 && !heldReason(s);

export type Fam = { sessions: number; enrolled: number; attended: number; rate: number };
function fam(ss: RecSession[]): Fam {
  const e = ss.reduce((a, s) => a + (s.enrolled as number), 0), a = ss.reduce((x, s) => x + (s.attended as number), 0);
  return { sessions: ss.length, enrolled: e, attended: a, rate: e ? a / e : 0 };
}
export function headline(sessions: RecSession[]) {
  const c = sessions.filter(isClosed);
  return { all: fam(c), welcome: fam(c.filter((s) => isWelcome(s.title))), workshops: fam(c.filter((s) => !isWelcome(s.title))) };
}

// ---------------- emails (ledger) ----------------
const ORDER = ["PLANNED", "ATTEMPTING", "DRAFTED", "STAGED", "VERIFIED", "SENT"];
const BAD = ["FAILED", "MISSED-WINDOW", "CANCELLED"];
const rank = (st: string) => (ORDER.includes(st) ? ORDER.indexOf(st) : BAD.includes(st) ? 99 : -1);
export type EmailState = { type: string; run_date: string; seq: number; bcc: number | null; state: string; display: string;
  when_et: string | null; window_et: string | null; exchange: boolean };

function emailStates(b: Bundle, nowEt: string) {
  // group ledger rows by (run_date, seq)
  const groups = new Map<string, LedgerRow[]>();
  for (const r of b.ledger || []) { if (!r.run_date || r.seq == null) continue; const k = `${r.run_date}#${r.seq}`; groups.set(k, [...(groups.get(k) || []), r]); }
  const planDate = b.plan?.name.match(/plan-(\d{4}-\d{2}-\d{2})/)?.[1] || null;
  const planItems = new Map<string, PlanItem>();
  for (const it of b.plan?.doc.items || []) if (planDate) planItems.set(`${planDate}#${it.seq}`, it);
  const keys = new Set([...groups.keys(), ...planItems.keys()]);
  const byEvent = new Map<string, EmailState[]>();
  const today: EmailState[] = [];
  for (const k of keys) {
    const rows = groups.get(k) || [], it = planItems.get(k);
    let best = "PLANNED", sched: string | null = it?.send_at_et || null, exchange = false, written: string | null = null;
    for (const r of rows) {
      let st = String(r.status || "").toUpperCase().trim();
      if (st === "STAGED" && r.staged_verified) st = "VERIFIED";
      if (rank(st) >= rank(best) || BAD.includes(st)) {
        if (BAD.includes(st) && ["VERIFIED", "SENT", "STAGED"].includes(best)) continue;
        best = st; exchange = r.exchange; written = r.written_at_et; sched = r.scheduled_for_et || sched;
      }
    }
    let display = best;
    if ((best === "STAGED" || best === "VERIFIED") && sched && nowEt >= sched) display = best + "-DUE-PASSED";
    if (best === "ATTEMPTING") display = "UNCERTAIN";
    const r0 = rows[0];
    const es: EmailState = { type: String(it?.type || r0?.type || "EMAIL"), run_date: k.split("#")[0], seq: +k.split("#")[1],
      bcc: (it?.bcc_count ?? r0?.bcc_count) ?? null, state: best, display, when_et: best === "SENT" ? written || sched : sched,
      window_et: it?.window_closes_et || null, exchange };
    for (const id of new Set([...(it?.event_ids || []), ...rows.flatMap((r) => r.event_ids || [])])) byEvent.set(id, [...(byEvent.get(id) || []), es]);
    if (planDate && k.startsWith(planDate + "#")) today.push(es);
  }
  for (const v of byEvent.values()) v.sort((a, b) => (a.run_date + (a.when_et || "")).localeCompare(b.run_date + (b.when_et || "")));
  today.sort((a, b) => (a.when_et || "").localeCompare(b.when_et || ""));
  return { byEvent, today, planDate };
}

// ---------------- upcoming ----------------
export type Pill = "hot" | "pace" | "soft" | "lag" | "early";
export type UpRow = { event_id: string; title: string; code: string; welcome: boolean; start_et: string; date: string; daysOut: number;
  enrolled: number; band: [number, number] | null; bandNote: string | null; proj: [number, number]; room: [number, number];
  pill: Pill; idx: string; emails: EmailState[] };

export function project(enrolled: number, daysOut: number, welcome: boolean): { band: [number, number] | null; note: string | null; proj: [number, number] } {
  if (welcome && daysOut >= 3) {
    const [lo, hi] = CONFIG.bands.welcomeFarAbs;
    return { band: null, note: "range of recorded Welcome finishes", proj: [Math.max(enrolled, lo), Math.max(enrolled, hi)] };
  }
  const tbl = welcome ? CONFIG.bands.welcome : CONFIG.bands.workshop;
  const d = Math.min(daysOut, 4);
  const band = tbl[d] || CONFIG.bands.workshop[d];
  return { band, note: d === 3 ? "no approved 3-day band: bracketed between the 2-day low and 4+-day high" : null,
    proj: [Math.round(enrolled * band[0]), Math.round(enrolled * band[1])] };
}

function upcoming(b: Bundle, closed: RecSession[], rates: { welcome: number; workshop: number }, emails: Map<string, EmailState[]>, today: string) {
  const end = addDays(today, CONFIG.windowDays);
  const rows: UpRow[] = [];
  const seen = new Set<string>();
  const src = [...(b.pull?.s || []), ...(b.pull?.c || []).filter((r) => /^Active$/i.test(r[4]))];
  for (const r of src) {
    const [id, rawTitle, startUtc] = r;
    if (seen.has(id)) continue; seen.add(id);
    const start = etOf(startUtc), date = start.slice(0, 10);
    if (date < today || date > end || /cancel/i.test(r[4])) continue;
    const title = clean(rawTitle), welcome = isWelcome(title);
    const enrolled = isInt(r[5]) ? (r[5] as number) : r[7].filter((p) => p[2] === 1).length;
    const daysOut = dayDiff(date, today);
    const { band, note, proj } = project(enrolled, daysOut, welcome);
    const rate = welcome ? rates.welcome : rates.workshop;
    let pill: Pill = "early", idx = "4+ days out, not paced";
    if (daysOut <= 3) {
      const comp = closed.filter((s) => s.date < today && normCourse(s.title) === normCourse(title)).sort((a, b) => b.date.localeCompare(a.date))[0];
      if (!comp || (comp.enrolled as number) < CONFIG.pace.minComparator) { pill = "early"; idx = comp ? `last run too small to compare (${comp.enrolled})` : "no earlier run to compare"; }
      else {
        const i = enrolled / (comp.enrolled as number);
        pill = i >= CONFIG.pace.hot ? "hot" : i >= CONFIG.pace.pace ? "pace" : i >= CONFIG.pace.soft ? "soft" : "lag";
        idx = `${i.toFixed(2)}× last run (${comp.enrolled})`;
      }
    }
    rows.push({ event_id: id, title, code: codeOf(rawTitle), welcome, start_et: start, date, daysOut, enrolled, band, bandNote: note, proj,
      room: [Math.round(proj[0] * rate), Math.round(proj[1] * rate)], pill, idx, emails: emails.get(id) || [] });
  }
  rows.sort((a, b) => a.start_et.localeCompare(b.start_et));
  return rows;
}

// ---------------- past ----------------
export type PastRow = { event_id: string | null; date: string; title: string; code: string; start_et: string | null; enrolled: number; attended: number;
  pct: number; pill: Pill; label: string; held: string | null; room: { in_room: number; credited: number; line: number | null } | null };

function past(sessions: RecSession[], rates: { welcome: number; workshop: number }, codes: Map<string, string>, from: string, today: string) {
  const rows: PastRow[] = [];
  const closedAll = sessions.filter(isClosed);
  const byCourse = new Map<string, number[]>();
  for (const s of closedAll) { const k = isWelcome(s.title) ? "welcome" : normCourse(s.title); byCourse.set(k, [...(byCourse.get(k) || []), (s.attended as number) / (s.enrolled as number)]); }
  for (const s of sessions) {
    if (s.date < from || s.date >= today || !isInt(s.enrolled) || !isInt(s.attended) || (s.enrolled as number) <= 0) continue;
    const pct = (s.attended as number) / (s.enrolled as number);
    const r = pct / (isWelcome(s.title) ? rates.welcome : rates.workshop);
    const pill: Pill = r >= CONFIG.showPill.hot ? "hot" : r >= CONFIG.showPill.pace ? "pace" : r >= CONFIG.showPill.soft ? "soft" : "lag";
    let label = pill === "hot" ? "above average" : pill === "pace" ? "typical" : pill === "soft" ? "below average" : "well below average";
    const held = heldReason(s);
    if (held) label = "held out";
    else {
      const k = isWelcome(s.title) ? "welcome" : normCourse(s.title), all = byCourse.get(k) || [];
      const name = isWelcome(s.title) ? "Welcome" : clean(s.title).replace(/ Product Workshop| Workshop/, "");
      if (all.length >= 3 && pct >= Math.max(...all)) label += ` · best ${name} on record`;
      else if (all.length >= 3 && pct <= Math.min(...all)) label += ` · weakest ${name} on record`;
    }
    if ((s.enrolled as number) < 10) label += ` · ${s.enrolled}-person class`;
    rows.push({ event_id: s.event_id || null, date: s.date, title: clean(s.title), code: codes.get(normCourse(s.title)) || "",
      start_et: s.start_et ? String(s.start_et).slice(11, 16) : null, enrolled: s.enrolled as number, attended: s.attended as number, pct, pill, label, held,
      room: isInt(s.in_room) && isInt(s.credited) ? { in_room: s.in_room as number, credited: s.credited as number, line: isInt(s.credit_line_minutes) ? (s.credit_line_minutes as number) : null } : null });
  }
  return rows;
}

// ---------------- analysis ----------------
export function sampleSize(p1: number, p2: number) {
  const pb = (p1 + p2) / 2;
  const n = (1.96 * Math.sqrt(2 * pb * (1 - pb)) + 0.8416 * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2))) ** 2 / (p1 - p2) ** 2;
  return Math.ceil(n);
}
export const daysNeeded = (sd: number, delta: number) => Math.ceil((2 * (1.96 + 0.8416) ** 2 * sd * sd) / (delta * delta));

function analysis(sessions: RecSession[], b: Bundle, today: string) {
  const closed = sessions.filter(isClosed);
  const series = sessions.filter((s) => isInt(s.enrolled) && (s.enrolled as number) > 0 && !heldReason(s) && s.date < today).map((s) => ({
    date: s.date, title: clean(s.title), treat: s.treat || "none", enrolled: s.enrolled as number,
    attended: isInt(s.attended) ? (s.attended as number) : null, rate: isInt(s.attended) ? (s.attended as number) / (s.enrolled as number) : null,
  }));
  const none = closed.filter((s) => (s.treat || "none") === "none");
  const baseline = { ...fam(none), iqr: [quantile(none.map((s) => (s.attended as number) / (s.enrolled as number)), 0.25), quantile(none.map((s) => (s.attended as number) / (s.enrolled as number)), 0.75)] as [number, number] };
  const rem = closed.filter((s) => s.treat === "rem");
  const remF = fam(rem);
  const top = rem.slice().sort((a, b) => (b.attended as number) / (b.enrolled as number) - (a.attended as number) / (a.enrolled as number))[0];
  const remEx = fam(rem.filter((s) => s !== top));

  const cr = sessions.filter((s) => isInt(s.in_room) && isInt(s.credited) && (s.in_room as number) > 0 && (!isInt(s.class_minutes) || (s.class_minutes as number) >= 45));
  const crSeries = cr.map((s) => ({ date: s.date, title: clean(s.title), treat: s.treat || "none", in_room: s.in_room as number, credited: s.credited as number, verified: !!s.verified }));
  const crNone = cr.filter((s) => (s.treat || "none") === "none");
  const crBase = crNone.reduce((a, s) => a + (s.credited as number), 0) / Math.max(1, crNone.reduce((a, s) => a + (s.in_room as number), 0));
  const crIqr = [quantile(crNone.map((s) => (s.credited as number) / (s.in_room as number)), 0.25), quantile(crNone.map((s) => (s.credited as number) / (s.in_room as number)), 0.75)] as [number, number];
  const both = cr.filter((s) => isInt(s.attended));
  const creditTotals = {
    classes: cr.length, in_room: cr.reduce((a, s) => a + (s.in_room as number), 0), credited: cr.reduce((a, s) => a + (s.credited as number), 0),
    both: both.length, exact: both.filter((s) => s.attended === s.credited).length, off_by_one: both.filter((s) => Math.abs((s.attended as number) - (s.credited as number)) === 1).length,
    through: cr.reduce((m, s) => (s.date > m ? s.date : m), ""),
  };

  const wc = closed.filter((s) => Array.isArray(s.welcomed_emails) && s.welcomed_emails.length && Array.isArray(s.attended_emails));
  const welcomed = wc.map((s) => { const at = new Set(lower(s.attended_emails)); const w = lower(s.welcomed_emails); return { date: s.date, title: clean(s.title), n: w.length, came: w.filter((x) => at.has(x)).length }; });

  return { series, baseline, remF, remEx, remTop: top ? { date: top.date, title: clean(top.title), rate: (top.attended as number) / (top.enrolled as number) } : null,
    crSeries, crBase, crIqr, creditTotals, welcomed: { sessions: welcomed.length, n: welcomed.reduce((a, x) => a + x.n, 0), came: welcomed.reduce((a, x) => a + x.came, 0), per: welcomed },
    welcomeLast10: closed.filter((s) => isWelcome(s.title)).slice(-10).map((s) => ({ date: s.date, enrolled: s.enrolled as number })) };
}

function thankyou(sessions: RecSession[], b: Bundle, today: string) {
  const byDay = new Map<string, { attended: number; enrolled: number; sessions: number; open: boolean }>();
  const blank = () => ({ attended: 0, enrolled: 0, sessions: 0, open: false });
  for (const s of sessions) {
    if (s.date < CONFIG.thankyouFrom || s.date >= today) continue;
    const d = byDay.get(s.date) || blank();
    if (!isClosed(s)) d.open = true; else { d.attended += s.attended as number; d.enrolled += s.enrolled as number; d.sessions++; }
    byDay.set(s.date, d);
  }
  // a day only counts when every one of its sessions has closed with marks
  const openDates = [
    ...(b.log || []).filter((r) => !/^(Closed|Attendance Closed|Cancelled|Missing)$/.test(r[4]) || !(r[6] > 0)).filter((r) => !/^(Cancelled|Missing)$/.test(r[4])).map((r) => r[1]),
    ...(b.pull?.c || []).filter((r) => /^Active$/i.test(r[4])).map((r) => etOf(r[2]).slice(0, 10)),
  ];
  for (const d of openDates) if (d >= CONFIG.thankyouFrom && d < today) { const x = byDay.get(d) || blank(); x.open = true; byDay.set(d, x); }
  const days = [...byDay.entries()].filter(([, v]) => !v.open && v.sessions).map(([date, v]) => ({ date, ...v })).sort((a, b) => a.date.localeCompare(b.date));
  const heldDays = [...byDay.entries()].filter(([, v]) => v.open).map(([d]) => d).sort();
  const n = days.length;
  const mean = (k: "attended" | "enrolled") => (n ? days.reduce((a, d) => a + d[k], 0) / n : 0);
  const m = mean("attended");
  const sd = n > 1 ? Math.sqrt(days.reduce((a, d) => a + (d.attended - m) ** 2, 0) / (n - 1)) : 0;
  const classes = days.reduce((a, d) => a + d.sessions, 0);
  const after = { days: n, attended_per_day: m, sd, enrolled_per_day: mean("enrolled"), per_class: classes ? days.reduce((a, d) => a + d.attended, 0) / classes : 0,
    enrolled_per_class: classes ? days.reduce((a, d) => a + d.enrolled, 0) / classes : 0, classes };

  // who showed up later (record email lists + plan Bcc lists)
  const later = new Map<string, Set<string>>();
  for (const s of sessions) for (const k of ["attended_emails", "contacted_emails", "welcomed_emails", "enrolled_emails"] as const)
    for (const x of lower(s[k])) later.set(x, (later.get(x) || new Set()).add(s.date));
  for (const [h, ds] of Object.entries(b.plan_people || {})) for (const d of ds) later.set(h.toLowerCase(), (later.get(h.toLowerCase()) || new Set()).add(d));
  const cohorts = (b.thankyou?.entries || []).filter((e) => !e.type || e.type === "thank-you").sort((a, c) => a.date.localeCompare(c.date)).flatMap((e) => {
    const state = e.sent ? "SENT" : e.draft_created ? "DRAFTED" : "NOT-DRAFTED";
    if (state === "NOT-DRAFTED") return [];
    const rec = Array.isArray(e.recipients) ? lower(e.recipients) : [];
    const close = addDays(e.date, 14);
    const back = rec.filter((x) => [...(later.get(x) || [])].some((d) => d > e.date && d <= close)).length;
    return [{ date: e.date, state, size: rec.length, came_back: back, window_closes: close, open: today <= close, counts: state === "SENT" }];
  });
  const sent = cohorts.filter((c) => c.counts);
  return { after, days, heldDays, cohorts, effect: { size: sent.reduce((a, c) => a + c.size, 0), came: sent.reduce((a, c) => a + c.came_back, 0) } };
}

// ---------------- everything ----------------
export function buildRunway(b: Bundle, now: Date = new Date()) {
  const nowEt = etOf(now), today = nowEt.slice(0, 10);
  const { sessions, index } = mergeRecord(b);
  extendRecord(b, sessions, index, today);
  const head = headline(sessions);
  const rates = { welcome: head.welcome.rate, workshop: head.workshops.rate };
  const codes = new Map<string, string>();
  for (const r of [...(b.past_sessions || []), ...(b.pull?.c || []), ...(b.pull?.s || [])]) { const c = codeOf(r[1]); if (c) codes.set(normCourse(r[1]), c); }
  const em = emailStates(b, nowEt);
  const closed = sessions.filter(isClosed);
  const up = upcoming(b, closed, rates, em.byEvent, today);
  const pastFrom = "2026-09-16";
  const pastRows = past(sessions, rates, codes, pastFrom, today);
  const paced = up.filter((r) => r.pill !== "early");
  const todayEmails = em.today;
  const late = todayEmails.filter((e) => !["SENT", "STAGED", "VERIFIED"].includes(e.state) && e.when_et && nowEt > e.when_et && !BAD.includes(e.state));
  return {
    nowEt, today,
    stamp: {
      pull: b.pull?.p ? etOf(b.pull.p) : null, plan: b.plan?.doc.generated_at ? etOf(b.plan.doc.generated_at) : null, planStatus: b.plan?.doc.status || null,
      engine: b.engine?.updated_et || null, engineMode: b.engine?.mode || null, generated: etOf(b.generated_at),
      attendanceThrough: closed.reduce((m, s) => (s.date > m ? s.date : m), ""),
    },
    head, rates,
    todayEmails: { items: todayEmails, sent: todayEmails.filter((e) => e.state === "SENT").length, missed: todayEmails.filter((e) => e.state === "MISSED-WINDOW" || e.state === "FAILED").length,
      queued: todayEmails.filter((e) => e.state === "STAGED" || e.state === "VERIFIED").length, planned: todayEmails.filter((e) => e.state === "PLANNED").length, late: late.length },
    up, upTotals: {
      sessions: up.length, days: new Set(up.map((r) => r.date)).size, today: up.filter((r) => r.daysOut === 0).length,
      enrolled: up.reduce((a, r) => a + r.enrolled, 0), proj: [up.reduce((a, r) => a + r.proj[0], 0), up.reduce((a, r) => a + r.proj[1], 0)],
      room: [up.reduce((a, r) => a + r.room[0], 0), up.reduce((a, r) => a + r.room[1], 0)], paced: paced.length,
      soft: paced.filter((r) => r.pill === "soft" || r.pill === "lag"),
      scale: Math.max(CONFIG.scaleMax, Math.ceil(Math.max(0, ...up.map((r) => r.proj[1])) / 50) * 50),
    },
    past: pastRows, pastFrom,
    pastTotals: fam(pastRows.filter((r) => !r.held).map((r) => ({ date: r.date, title: r.title, enrolled: r.enrolled, attended: r.attended }))),
    analysis: analysis(sessions, b, today),
    ty: thankyou(sessions, b, today),
    noComparator: [...new Set(up.filter((r) => r.daysOut <= 3 && r.pill === "early").map((r) => r.title))],
  };
}
export type Runway = ReturnType<typeof buildRunway>;

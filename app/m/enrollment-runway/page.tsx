import type { Metadata } from "next";
import Link from "next/link";
import { readFeed } from "../_kia/feed";
import { hasAccess } from "../_kia/gate";
import { Gate } from "../_kia/PassGate";
import { buildRunway, CONFIG, sampleSize, daysNeeded, type Bundle, type Runway, type UpRow, type PastRow, type Pill } from "./data";
import { Tabs } from "./Tabs";
import { SessionLinks } from "../_kia/SessionLinks";
import { insights, ownBands, type HistoryRow } from "../_kia/insights";
import { PatternsPanel, UnmarkedNotice } from "../_kia/Patterns";
import type { SessionsFeed } from "../team-show-rate/stats";
import { Tracker, type TrackerData } from "../vilt-tracker/Tracker";
import { ClientOnly } from "../_kia/ClientOnly";
import { isTrackerData } from "../_kia/feed";
import s from "./runway.module.css";

// Enrollment Runway (ported from the claude.ai artifact, numbers only): Andrew's next 16 days of rosters and reminder
// emails, the classes behind, and what the emails are doing. Recomputed from the Apps Script "runway" bundle, which
// carries no names and codes every email address, so nothing on this page identifies a person.
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Enrollment Runway", robots: { index: false, follow: false } };

const isBundle = (j: unknown) => !!j && typeof j === "object" && Array.isArray((j as Bundle).record) && Array.isArray((j as Bundle).ledger);

export default async function RunwayPage({ searchParams }: { searchParams: Promise<{ wrong?: string }> }) {
  if (!(await hasAccess())) return <Gate title="Enrollment Runway" next="/m/enrollment-runway" wrong={!!(await searchParams).wrong} />;
  const [b, tr, sf, hist] = await Promise.all([readFeed<Bundle>("runway", isBundle), readFeed<TrackerData>("tracker", isTrackerData),
    readFeed<SessionsFeed>("sessions", (j) => !!j && Array.isArray((j as SessionsFeed).rows), { from: "2026-08-31" }),
    readFeed<{ rows: HistoryRow[] }>("history", (j) => !!j && Array.isArray((j as { rows?: unknown }).rows))]);
  const own = sf && hist ? ownBands(hist.rows, sf.rows, "Andrew") : undefined;
  let d: Runway | null = null;
  try { d = b ? buildRunway(b, new Date(), own) : null; } catch { d = null; }
  const ins = sf && d ? insights(sf.rows, "Andrew", d.today, sf.through) : null;
  return (
    <div className={s.page}>
      <div className={s.wrap}>
        <p className={s.back}><Link href="/m/kia">&larr; All Kia pages</Link></p>
        <h1 className={s.h1}>Enrollment Runway</h1>
        {!d ? <p className={s.note}>Couldn&rsquo;t load the data right now. Try again in a few minutes.</p> : (
          <>
            <p className={s.sub}>Andrew Sardone&rsquo;s Kia University virtual classes: where each roster stands, where it should land, whether the reminder emails went out, and what happened in the classes behind.</p>
            <p className={s.stamp}>
              Rosters read {hm(d.stamp.pull)} &middot; email plan {hm(d.stamp.plan)} &middot; engine checked in {hm(d.stamp.engine)}{d.stamp.engineMode ? ` (${d.stamp.engineMode})` : ""}
              {" "}&middot; attendance through {md(d.stamp.attendanceThrough)} &middot; data gathered {hm(d.stamp.generated)} &middot; updates itself
            </p>
            {ins && <UnmarkedNotice ins={ins} name="Andrew" />}
            <Tabs tabs={[["upcoming", "Upcoming"], ["past", "Past classes"], ["patterns", "Patterns"], ["analysis", "Analysis & method"], ["tracker", "vILT tracker"]]}
              panels={{ upcoming: <Upcoming d={d} />, past: <Past d={d} />, patterns: ins ? <PatternsPanel ins={ins} name="Andrew" /> : null, analysis: <Analysis d={d} />,
                tracker: tr ? <ClientOnly><Tracker data={tr} only="Andrew" /></ClientOnly> : <p className={s.note}>Couldn&rsquo;t load the tracker right now.</p> }} />
          </>
        )}
      </div>
    </div>
  );
}

// ---------------- formatting ----------------
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DOW = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const md = (iso?: string | null) => (iso ? MON[+iso.slice(5, 7) - 1] + " " + +iso.slice(8, 10) : "—");
const dow = (iso: string) => DOW[new Date(iso.slice(0, 10) + "T12:00:00Z").getUTCDay()];
function t12(hhmm?: string | null) {
  if (!hhmm) return "";
  const [h, m] = hhmm.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}
const hm = (et?: string | null) => (et ? `${md(et)} ${t12(et.slice(11, 16))}` : "—");
const pct = (v: number, dp = 1) => (v * 100).toFixed(dp) + "%";
const num = (n: number) => n.toLocaleString("en-US");
const PILL: Record<Pill, string> = { hot: "Running hot", pace: "On pace", soft: "Soft", lag: "Lagging", early: "Too early" };


// ---------------- Upcoming ----------------
function Upcoming({ d }: { d: Runway }) {
  const T = d.upTotals;
  const days = [...new Set(d.up.map((r) => r.date))];
  const pc = (v: number) => (Math.round((v / T.scale) * 200) / 2) + "%";
  return (
    <div className={s.panel}>

      <p className={s.label}>The window ahead &middot; {md(d.today)} &ndash; {md(d.up.length ? d.up[d.up.length - 1].date : d.today)} &middot; {T.sessions} sessions &middot; rosters read {hm(d.stamp.pull)} from Wingspan</p>
      <section className={s.strip}>
        <div><span>Sessions</span><b>{T.sessions}</b><small>Across {T.days} teaching days &middot; {T.today} today</small></div>
        <div><span>Enrolled now</span><b>{num(T.enrolled)}</b></div>
        <div><span>Will enroll</span><b>{num(T.proj[0])}&ndash;{num(T.proj[1])}</b></div>
        <div className={s.badCell}><span>Will be in the room</span><b>{num(T.room[0])}&ndash;{num(T.room[1])}</b><small>After {pct(d.rates.workshop)} workshop / {pct(d.rates.welcome)} Welcome show rates</small></div>
        <div className={T.soft.length ? s.flagCell : undefined}><span>Running soft</span><b>{T.soft.length}</b><small>Of {T.paced} paced rows{T.soft.length ? `: ${T.soft.map((r) => `${dow(r.date).slice(0, 3)} ${short(r.title)}`).join(", ")}` : ""}</small></div>
      </section>

      <h2 className={s.h2}>Next {CONFIG.windowDays} days <span className={s.hint}>scale 0&ndash;{T.scale} enrolled</span></h2>
      <div className={s.legend}>
        <span><i className={s.swNow} /> Enrolled now</span><span><i className={s.swExp} /> Expected to arrive</span><span><i className={s.swMax} /> Upper end of range</span><span><i className={s.swPin} /> Low end of projection</span>
      </div>
      {days.map((day) => {
        const rows = d.up.filter((r) => r.date === day), out = rows[0].daysOut;
        return (
          <div className={s.day} key={day}>
            <div className={s.dayhead}><b>{md(day)}</b> {dow(day)} <span className={s.out}>{out === 0 ? "today" : out === 1 ? "1 day out" : `${out} days out`}</span></div>
            {rows.map((r) => <UpRowView key={r.event_id} r={r} pc={pc} />)}
          </div>
        );
      })}
      {!d.up.length && <p className={s.note}>No sessions in the next {CONFIG.windowDays} days.</p>}
    </div>
  );
}
const short = (t: string) => t.replace(/^20\d\d(MY)? /, "").replace(/ Product Workshop| Workshop/, "").replace(/ \(.*\)/, "");

function UpRowView({ r, pc }: { r: UpRow; pc: (v: number) => string }) {
  return (
    <div className={s.row}>
      <div className={s.who}>
        <div className={s.t}>{r.title}</div>
        <div className={s.meta}>
          <span>{t12(r.start_et.slice(11, 16))}</span>
          {r.code && <span className={s.code}>{r.code}</span>}
        </div>
      </div>
      <div className={s.gaugeCol}>
        <div className={s.track}>
          <div className={s.segNow} style={{ width: pc(r.enrolled) }} />
          <div className={s.segExp} style={{ left: pc(r.enrolled), width: pc(Math.max(0, r.proj[0] - r.enrolled)) }} />
          <div className={s.segMax} style={{ left: pc(Math.max(r.proj[0], r.enrolled)), width: pc(Math.max(0, r.proj[1] - Math.max(r.proj[0], r.enrolled))) }} />
          <div className={s.pin} style={{ left: pc(r.proj[0]) }} />
        </div>
        <div className={s.glabel}>{r.enrolled} enrolled &middot; {r.proj[0]}&ndash;{r.proj[1]} final &middot; &asymp; {r.room[0]}&ndash;{r.room[1]} in the room{r.bandNote ? <span className={s.faint}> &middot; {r.bandNote}</span> : null}</div>
      </div>
      <div className={s.sig}><span className={`${s.pill} ${s[r.pill]}`}>{PILL[r.pill]}</span><span className={s.idx}>{r.idx}</span></div>
      <SessionLinks id={r.event_id} className={s.links} />
    </div>
  );
}

// ---------------- Past ----------------
function Past({ d }: { d: Runway }) {
  const T = d.pastTotals;
  const days = [...new Set(d.past.map((r) => r.date))];
  const held = d.past.filter((r) => r.held);
  return (
    <div className={s.panel}>
      <p className={s.label}>The window behind &middot; {md(d.pastFrom)} &ndash; {md(d.stamp.attendanceThrough)} &middot; {T.sessions} closed sessions{held.length ? ` · ${held.length} held out` : ""}</p>
      <section className={`${s.strip} ${s.strip4}`}>
        <div><span>Enrolled</span><b>{num(T.enrolled)}</b></div>
        <div><span>Attended</span><b>{num(T.attended)}</b></div>
        <div className={s.badCell}><span>Show rate</span><b>{pct(T.rate)}</b><small>All sessions on record: workshops {pct(d.rates.workshop)} &middot; Welcome to Kia {pct(d.rates.welcome)}</small></div>
        <div className={s.badCell}><span>No-shows</span><b>{num(T.enrolled - T.attended)}</b></div>
      </section>
      <h2 className={s.h2}>Attendance, class by class <span className={s.hint}>newest last</span></h2>
      <div className={s.legend}><span><i className={s.swNow} /> Attended</span><span><i className={s.swTrack} /> Enrolled, did not attend</span></div>
      {days.map((day) => (
        <div className={s.day} key={day}>
          <div className={s.dayhead}><b>{md(day)}</b> {dow(day)}</div>
          {d.past.filter((r) => r.date === day).map((r, i) => <PastRowView key={(r.event_id || "") + i} r={r} />)}
        </div>
      ))}
    </div>
  );
}
function PastRowView({ r }: { r: PastRow }) {
  return (
    <div className={s.row}>
      <div className={s.who}>
        <div className={s.t}>{r.title}</div>
        <div className={s.meta}>
          {r.start_et && <span>{t12(r.start_et)}</span>}{r.code && <span className={s.code}>{r.code}</span>}
          {r.room && <span>{r.room.in_room} in the room &middot; {r.room.credited} past {r.room.line != null ? `a ${r.room.line}-minute line` : "the credit line"}</span>}
          {r.held && <span className={s.badTxt}>held out: {r.held}</span>}
        </div>
      </div>
      <div className={s.gaugeCol}>
        <div className={s.track}><div className={s.segNow} style={{ width: Math.round(r.pct * 1000) / 10 + "%" }} /></div>
        <div className={s.glabel}>{r.attended} of {r.enrolled} attended &middot; {r.enrolled - r.attended} no-show{r.enrolled - r.attended === 1 ? "" : "s"}</div>
      </div>
      <div className={s.sig}><span className={`${s.pill} ${s[r.pill]}`}>{Math.round(r.pct * 100)}% shown</span><span className={s.idx}>{r.label}</span></div>
      {r.event_id ? <SessionLinks id={r.event_id} className={s.links} /> : <span />}
    </div>
  );
}

// ---------------- Analysis ----------------
function Scatter({ points, y, base, iqr, cut, label }: { points: { date: string; v: number; size: number; cls: string; tip: string }[]; y: [number, number]; base: number; iqr: [number, number]; cut: string; label: string }) {
  if (!points.length) return null;
  y = [y[0], Math.max(y[1], Math.ceil(Math.max(...points.map((p) => p.v)) * 5) / 5)];
  const x0 = 50, x1 = 680, yb = 200, yt = 20;
  const t = (iso: string) => Date.parse(iso + "T12:00:00Z");
  const first = Math.min(...points.map((p) => t(p.date))), last = Math.max(...points.map((p) => t(p.date)));
  const X = (iso: string) => x0 + ((x1 - x0) * (t(iso) - first)) / Math.max(1, last - first);
  const Y = (v: number) => yb - ((yb - yt) * (v - y[0])) / (y[1] - y[0]);
  const ticks = []; for (let v = y[0]; v <= y[1] + 1e-9; v += (y[1] - y[0]) / 4) ticks.push(v);
  const months: string[] = []; for (let m = new Date(first); m.getTime() <= last; m = new Date(Date.UTC(m.getUTCFullYear(), m.getUTCMonth() + 1, 1))) months.push(m.toISOString().slice(0, 7) + "-01");
  const cx = cut >= new Date(first).toISOString().slice(0, 10) ? X(cut) : null;
  return (
    <div className={s.chartscroll}>
      <svg className={s.svg} viewBox="0 0 700 230" role="img" aria-label={label}>
        <rect x={x0} y={Y(iqr[1])} width={x1 - x0} height={Math.max(0, Y(iqr[0]) - Y(iqr[1]))} className={s.band} />
        {ticks.map((v) => <g key={v}><line className={s.grid} x1={x0} x2={x1} y1={Y(v)} y2={Y(v)} /><text className={s.tick} x={x0 - 6} y={Y(v) + 3.5} textAnchor="end">{Math.round(v * 100)}%</text></g>)}
        {months.filter((m) => t(m) >= first).map((m) => <text key={m} className={s.tick} x={X(m)} y={218} textAnchor="middle">{md(m)}</text>)}
        <line className={s.base} x1={x0} x2={x1} y1={Y(base)} y2={Y(base)} />
        <text className={s.tick} x={x1} y={Y(base) - 4} textAnchor="end">before the emails: {Math.round(base * 100)}%</text>
        {cx != null && <g><line className={s.cut} x1={cx} x2={cx} y1={yt - 8} y2={yb} /><text className={s.tick} x={cx - 5} y={yt - 10} textAnchor="end">no email</text><text className={s.tick} x={cx + 5} y={yt - 10}>reminders</text></g>}
        {points.map((p, i) => <circle key={i} className={`${s.dot} ${s[p.cls] || ""}`} cx={X(p.date)} cy={Y(Math.max(y[0], Math.min(y[1], p.v)))} r={Math.max(2.5, 0.945 * Math.sqrt(p.size))}><title>{p.tip}</title></circle>)}
        <line className={s.axis} x1={x0} x2={x1} y1={yb} y2={yb} />
      </svg>
    </div>
  );
}

function Analysis({ d }: { d: Runway }) {
  const a = d.analysis, ty = d.ty, B = CONFIG.tyBefore, ct = a.creditTotals;
  const showPts = a.series.filter((p) => p.rate != null).map((p) => ({ date: p.date, v: p.rate as number, size: p.enrolled, cls: p.treat === "rem" ? "rem" : p.treat === "late" ? "late" : "none",
    tip: `${p.title} · ${md(p.date)} · ${Math.round((p.rate as number) * 100)}% · ${p.enrolled} enrolled · ${p.treat === "rem" ? "emailed in advance" : p.treat === "late" ? "emailed late" : p.treat === "none" ? "no email" : "email unknown"}` }));
  const crPts = a.crSeries.map((p) => ({ date: p.date, v: p.credited / p.in_room, size: p.in_room, cls: p.treat === "rem" ? "rem" : p.treat === "late" ? "late" : "none",
    tip: `${p.title} · ${md(p.date)} · ${p.credited} of ${p.in_room} in the room credited · ${p.verified ? "confirmed against Wingspan" : "modelled at the 60% line"}` }));
  const H = d.head;
  const tyMax = Math.max(B.range[1], ...ty.days.map((x) => x.attended), 10);
  return (
    <div className={s.panel}>
      <h2 className={s.h2}>Is the email working? <span className={s.hint}>show rate per class, circle size = enrolled</span></h2>
      <p className={s.lead}>Before the reminder emails, {num(a.baseline.attended)} of {num(a.baseline.enrolled)} enrolled turned up ({pct(a.baseline.rate)}, {a.baseline.sessions} classes). Since, {num(a.remF.attended)} of {num(a.remF.enrolled)} ({pct(a.remF.rate)}, {a.remF.sessions} classes){a.remTop ? `; without the single best class (${a.remTop.title}, ${md(a.remTop.date)}, ${Math.round(a.remTop.rate * 100)}%) it is ${pct(a.remEx.rate)}` : ""}. Team Show Rate has the fair comparison against two instructors who send no emails.</p>
      <Scatter points={showPts} y={[0, 0.8]} base={a.baseline.rate} iqr={a.baseline.iqr} cut={CONFIG.reminderStart} label="Show rate for each closed class over time, coloured by whether reminder emails went out." />
      <div className={s.legend}><span><i className={`${s.swDot} ${s.none}`} /> No email</span><span><i className={`${s.swDot} ${s.late}`} /> Emailed late</span><span><i className={`${s.swDot} ${s.rem}`} /> Emailed in advance</span><span><i className={s.swBand} /> Middle half of classes before the emails</span></div>

      <h2 className={s.h2}>The 60% line <span className={s.hint}>share of the people in the room who got Wingspan credit</span></h2>
      <p className={s.lead}>Wingspan credits attendance only to people who stay about 60% of the class. Across {ct.classes} classes with a room record (through {md(ct.through)}), {num(ct.credited)} of the {num(ct.in_room)} people in the room were credited: {pct(1 - ct.credited / Math.max(1, ct.in_room))} attended and got no credit. Where Wingspan&rsquo;s own count can be checked ({ct.both} classes), the line matches it exactly in {ct.exact} and is out by one in {ct.off_by_one}.</p>
      <Scatter points={crPts} y={[0.5, 1]} base={a.crBase} iqr={a.crIqr} cut={CONFIG.reminderStart} label="Share of people in the room credited by Wingspan, per class." />

      <h2 className={s.h2}>Welcomed early</h2>
      <p className={s.lead}>Of the {a.welcomed.n} people who got a welcome email when they enrolled, across {a.welcomed.sessions} closed classes, {a.welcomed.came} turned up ({pct(a.welcomed.came / Math.max(1, a.welcomed.n))}).</p>

      <h2 className={s.h2} id="thankyou">Is the thank-you working?</h2>
      <section className={`${s.strip} ${s.behind}`}>
        <div><span>Before &middot; in the room a day</span><b>{B.attended_per_day}</b><small>{B.days} teaching days, range {B.range[0]}&ndash;{B.range[1]}</small></div>
        <div><span>Enrolled a day</span><b>{B.enrolled_per_day}</b></div>
        <div><span>In the room a class</span><b>{B.per_class}</b></div>
        <div><span>Enrolled a class</span><b>{B.enrolled_per_class}</b></div>
        <div><span>Came back within 14 days</span><b>{B.came_back_pct}%</b><small>{B.came_back}, approximate</small></div>
      </section>
      <section className={s.strip}>
        <div className={ty.after.attended_per_day < B.attended_per_day ? s.flagCell : undefined}><span>After &middot; in the room a day</span><b>{ty.after.attended_per_day.toFixed(1)}</b><small>{ty.after.days} complete teaching days from {md(CONFIG.thankyouFrom)}{ty.heldDays.length ? `; not yet complete: ${ty.heldDays.map(md).join(", ")}` : ""}</small></div>
        <div><span>Enrolled a day</span><b>{ty.after.enrolled_per_day.toFixed(1)}</b></div>
        <div><span>In the room a class</span><b>{ty.after.per_class.toFixed(1)}</b><small>{ty.after.classes} classes</small></div>
        <div><span>Enrolled a class</span><b>{ty.after.enrolled_per_class.toFixed(1)}</b></div>
        <div><span>Came back within 14 days</span><b>{ty.effect.size ? pct(ty.effect.came / ty.effect.size, 0) : "—"}</b><small>{ty.effect.came} of {ty.effect.size} who got a sent thank-you</small></div>
      </section>
      {ty.days.length > 0 && (
        <div className={s.chartscroll}>
          <svg className={s.svg} viewBox="0 0 700 200" role="img" aria-label="People in the room on each teaching day since the thank-you emails began, against the average before.">
            {(() => {
              const x0 = 50, x1 = 680, yb = 175, yt = 15, n = ty.days.length, w = (x1 - x0) / n;
              const Y = (v: number) => yb - ((yb - yt) * v) / tyMax;
              return <>
                <rect x={x0} y={Y(B.iqr[1])} width={x1 - x0} height={Y(B.iqr[0]) - Y(B.iqr[1])} className={s.band} />
                <line className={s.base} x1={x0} x2={x1} y1={Y(B.attended_per_day)} y2={Y(B.attended_per_day)} />
                <text className={s.tick} x={x1} y={Y(B.attended_per_day) - 4} textAnchor="end">before: {B.attended_per_day} a day</text>
                {ty.days.map((x, i) => <g key={x.date}><rect className={s.bar} x={x0 + i * w + 2} y={Y(x.attended)} width={w - 4} height={yb - Y(x.attended)}><title>{`${md(x.date)} · ${x.attended} in the room · ${x.enrolled} enrolled · ${x.sessions} sessions`}</title></rect>
                  {(n <= 16 || i % 2 === 0) && <text className={s.tick} x={x0 + i * w + w / 2} y={190} textAnchor="middle">{md(x.date)}</text>}</g>)}
                <line className={s.axis} x1={x0} x2={x1} y1={yb} y2={yb} />
              </>;
            })()}
          </svg>
        </div>
      )}
      <div className={s.tblwrap}>
        <table className={s.table}>
          <thead><tr><th>Thank-you cohort</th><th>State</th><th className={s.n}>People</th><th className={s.n}>Came back</th><th>Window</th></tr></thead>
          <tbody>{ty.cohorts.map((c) => (
            <tr key={c.date}><td>{md(c.date)}</td><td>{c.state === "SENT" ? "Sent" : "Draft only (not counted)"}</td><td className={s.n}>{c.size}</td><td className={s.n}>{c.came_back}</td><td>{c.open ? `open until ${md(c.window_closes)}` : `closed ${md(c.window_closes)}`}</td></tr>
          ))}</tbody>
        </table>
      </div>
      <p className={s.lead}>One teaching day swings by about {B.sd} people, so a real change of 10 a day needs about {daysNeeded(B.sd, 10)} teaching days on each side to show; 5 a day needs about {daysNeeded(B.sd, 5)}.</p>

      <h2 className={s.h2}>How the numbers are built</h2>
      <div className={s.tblwrap}>
        <table className={s.table}>
          <thead><tr><th>Course family</th><th className={s.n}>Sessions</th><th className={s.n}>Enrolled</th><th className={s.n}>Attended</th><th className={s.n}>Show rate</th></tr></thead>
          <tbody>
            <tr><td>Workshops</td><td className={s.n}>{H.workshops.sessions}</td><td className={s.n}>{num(H.workshops.enrolled)}</td><td className={s.n}>{num(H.workshops.attended)}</td><td className={s.n}>{pct(H.workshops.rate)}</td></tr>
            <tr><td>Welcome to Kia</td><td className={s.n}>{H.welcome.sessions}</td><td className={s.n}>{num(H.welcome.enrolled)}</td><td className={s.n}>{num(H.welcome.attended)}</td><td className={s.n}>{pct(H.welcome.rate)}</td></tr>
            <tr className={s.tot}><td>All</td><td className={s.n}>{H.all.sessions}</td><td className={s.n}>{num(H.all.enrolled)}</td><td className={s.n}>{num(H.all.attended)}</td><td className={s.n}>{pct(H.all.rate)}</td></tr>
          </tbody>
        </table>
      </div>
      <div className={s.meth}>
        <p><b>Show rate</b> is attended &divide; enrolled over every closed class on record, weighted by people. Welcome to Kia is kept separate because its rosters are several times larger. Classes Wingspan closed without attendance marks are held out.</p>
        <p><b>Where the roster lands.</b> Final enrollment = enrolled now &times; a growth band for how many days are left (locked): workshops {band("workshop", 0)} on the day, {band("workshop", 1)} one day out, {band("workshop", 2)} two days out, {band("workshop", 4)} four or more. Welcome to Kia {band("welcome", 0)} on the day, {band("welcome", 1)} one day out, {band("welcome", 2)} two days out, and the range of recorded Welcome finishes ({CONFIG.bands.welcomeFarAbs.join("–")}) further out. There is no approved three-day band, so three-day rows are bracketed between the two-day low and the four-day high. &ldquo;In the room&rdquo; applies the family show rate to that range. Once Andrew&rsquo;s own roster history has at least 8 finished classes for a course family and number of days out, that row uses the measured band instead and says &ldquo;own history&rdquo;.</p>
        <p><b>Pace</b> compares enrolled now with the most recent finished run of the same course (different model years are different courses): running hot at {CONFIG.pace.hot}&times; or more, on pace from {CONFIG.pace.pace}&times;, soft from {CONFIG.pace.soft}&times;, lagging below. Rows three or fewer days out are paced; further out is too early.{d.noComparator.length ? ` No earlier run to compare yet: ${d.noComparator.join(", ")}.` : ""}</p>
        <p><b>Past-class labels</b> compare a class with its family&rsquo;s show rate: above average at {CONFIG.showPill.hot}&times; or more, typical from {CONFIG.showPill.pace}&times;, below average from {CONFIG.showPill.soft}&times;, well below under that.</p>
        <p><b>Emails</b> come from the Kia engine&rsquo;s send ledger and today&rsquo;s plan. &ldquo;Sent&rdquo; means the engine saw it in Exchange Sent.</p>
        <p><b>People needed</b> to show a lift in show rate (two-sided, 95% confidence, 80% power): 34% &rarr; 44% needs about {sampleSize(0.34, 0.44)} enrolled on each side; 34% &rarr; 39% needs about {sampleSize(0.34, 0.39)}.</p>
        <p><b>Welcome to Kia&rsquo;s last ten finishes:</b> {a.welcomeLast10.map((w) => w.enrolled).join(", ")}.</p>
      </div>
      <footer className={s.footer}>No names or email addresses reach this page: people are matched across files by a one-way code before the data leaves Google. Data gathered {hm(d.stamp.generated)} ET.</footer>
    </div>
  );
}
const band = (f: "workshop" | "welcome", n: number) => { const b = CONFIG.bands[f][n]; return b ? `${b[0]}–${b[1]}×` : "—"; };

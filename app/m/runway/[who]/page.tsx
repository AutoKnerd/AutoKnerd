import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readFeed } from "../../_kia/feed";
import { hasAccess } from "../../_kia/gate";
import { Gate } from "../../_kia/PassGate";
import { CONFIG, project, normCourse, isWelcome, addDays, type Pill } from "../../enrollment-runway/data";
import type { SessionsFeed, SessionRow } from "../../team-show-rate/stats";
import s from "../../enrollment-runway/runway.module.css";

// Enrollment Runway for Paul and Anthony: the same roster runway and past-class view as Andrew's page, built from
// the Wingspan session counts the extension pulls every hour. They send no reminder emails and their rosters
// aren't pulled, so there is no email or analysis section.
export const dynamic = "force-dynamic";
const WHO: Record<string, { short: "Paul" | "Anthony"; full: string }> = {
  paul: { short: "Paul", full: "Paul Reilly" },
  anthony: { short: "Anthony", full: "Anthony Burkhardt" },
};
export async function generateMetadata({ params }: { params: Promise<{ who: string }> }): Promise<Metadata> {
  const w = WHO[(await params).who];
  return { title: w ? `Enrollment Runway · ${w.full}` : "Enrollment Runway", robots: { index: false, follow: false } };
}

const PAST_FROM = "2026-09-16";
const isFeed = (j: unknown) => !!j && typeof j === "object" && Array.isArray((j as SessionsFeed).rows);
const closed = (r: SessionRow) => /^(Closed|Attendance Closed)$/.test(r[5]) && r[6] > 0 && r[7] > 0;
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DOW = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const md = (iso: string) => MON[+iso.slice(5, 7) - 1] + " " + +iso.slice(8, 10);
const dow = (iso: string) => DOW[new Date(iso + "T12:00:00Z").getUTCDay()];
const pct = (v: number, dp = 1) => (v * 100).toFixed(dp) + "%";
const PILL: Record<Pill, string> = { hot: "Running hot", pace: "On pace", soft: "Soft", lag: "Lagging", early: "Too early" };
const etToday = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());

export default async function TrainerRunway({ params, searchParams }: { params: Promise<{ who: string }>; searchParams: Promise<{ wrong?: string }> }) {
  const key = (await params).who, w = WHO[key];
  if (!w) notFound();
  if (!(await hasAccess())) return <Gate title={`Enrollment Runway · ${w.full}`} next={`/m/runway/${key}`} wrong={!!(await searchParams).wrong} />;
  const feed = await readFeed<SessionsFeed>("sessions", isFeed, { from: "2026-08-31" });
  const rows = (feed?.rows || []).filter((r) => r[1] === w.short && !/cancel|missing/i.test(r[5]));
  const today = etToday(), end = addDays(today, CONFIG.windowDays);
  const done = rows.filter((r) => closed(r) && r[2] < today);
  const famRate = (welcome: boolean) => {
    const f = done.filter((r) => isWelcome(r[4]) === welcome);
    const e = f.reduce((a, r) => a + r[6], 0), x = f.reduce((a, r) => a + r[7], 0);
    return { n: f.length, e, x, rate: e ? x / e : 0 };
  };
  const wel = famRate(true), wor = famRate(false);
  const up = rows.filter((r) => /^Active$/i.test(r[5]) && r[2] >= today && r[2] <= end).sort((a, b) => (a[2] + mins(a[3])).localeCompare(b[2] + mins(b[3]))).map((r) => {
    const welcome = isWelcome(r[4]), daysOut = Math.round((Date.parse(r[2] + "T12:00:00Z") - Date.parse(today + "T12:00:00Z")) / 864e5);
    const p = project(r[6], daysOut, welcome), rate = welcome ? wel.rate : wor.rate;
    let pill: Pill = "early", idx = "4+ days out, not paced";
    if (daysOut <= 3) {
      const comp = done.filter((d) => normCourse(d[4]) === normCourse(r[4])).sort((a, b) => b[2].localeCompare(a[2]))[0];
      if (!comp || comp[6] < CONFIG.pace.minComparator) idx = comp ? `last run too small to compare (${comp[6]})` : "no earlier run to compare";
      else { const i = r[6] / comp[6]; pill = i >= CONFIG.pace.hot ? "hot" : i >= CONFIG.pace.pace ? "pace" : i >= CONFIG.pace.soft ? "soft" : "lag"; idx = `${i.toFixed(2)}× last run (${comp[6]})`; }
    }
    return { r, daysOut, ...p, room: [Math.round(p.proj[0] * rate), Math.round(p.proj[1] * rate)] as [number, number], pill, idx };
  });
  const scale = Math.max(CONFIG.scaleMax, Math.ceil(Math.max(0, ...up.map((u) => u.proj[1])) / 50) * 50);
  const pc = (v: number) => Math.round((v / scale) * 200) / 2 + "%";
  const past = done.filter((r) => r[2] >= PAST_FROM).sort((a, b) => (a[2] + mins(a[3])).localeCompare(b[2] + mins(b[3])));
  const pe = past.reduce((a, r) => a + r[6], 0), px = past.reduce((a, r) => a + r[7], 0);
  const paced = up.filter((u) => u.pill !== "early"), soft = paced.filter((u) => u.pill === "soft" || u.pill === "lag");
  const upDays = [...new Set(up.map((u) => u.r[2]))], pastDays = [...new Set(past.map((r) => r[2]))];

  return (
    <div className={s.page}>
      <div className={s.wrap}>
        <p className={s.back}><Link href="/m/kia">&larr; All Kia pages</Link></p>
        <h1 className={s.h1}>Enrollment Runway &middot; {w.full}</h1>
        {!feed ? <p className={s.note}>Couldn&rsquo;t load the data right now. Try again in a few minutes.</p> : (
          <>
            <p className={s.sub}>{w.full}&rsquo;s Kia University virtual classes: where each roster stands, where it should land, and how many turned up in the classes behind. Enrollment counts come from Wingspan every hour; {w.short} sends no reminder emails, so there is no email column.</p>
            <p className={s.stamp}>Wingspan sessions last pulled {feed.lastPull} ET &middot; attendance through {md(feed.through)} &middot; updates itself</p>

            <p className={s.label}>The window ahead &middot; {md(today)} &ndash; {md(up.length ? up[up.length - 1].r[2] : today)} &middot; {up.length} sessions</p>
            <section className={s.strip}>
              <div><span>Sessions</span><b>{up.length}</b><small>Across {upDays.length} teaching days &middot; {up.filter((u) => u.daysOut === 0).length} today</small></div>
              <div><span>Enrolled now</span><b>{up.reduce((a, u) => a + u.r[6], 0)}</b></div>
              <div><span>Will enroll</span><b>{up.reduce((a, u) => a + u.proj[0], 0)}&ndash;{up.reduce((a, u) => a + u.proj[1], 0)}</b></div>
              <div className={s.badCell}><span>Will be in the room</span><b>{up.reduce((a, u) => a + u.room[0], 0)}&ndash;{up.reduce((a, u) => a + u.room[1], 0)}</b><small>After {w.short}&rsquo;s {pct(wor.rate)} workshop / {pct(wel.rate)} Welcome show rates</small></div>
              <div className={soft.length ? s.flagCell : undefined}><span>Running soft</span><b>{soft.length}</b><small>Of {paced.length} paced rows</small></div>
            </section>

            <h2 className={s.h2}>Next {CONFIG.windowDays} days <span className={s.hint}>scale 0&ndash;{scale} enrolled</span></h2>
            <div className={s.legend}><span><i className={s.swNow} /> Enrolled now</span><span><i className={s.swExp} /> Expected to arrive</span><span><i className={s.swMax} /> Upper end of range</span><span><i className={s.swPin} /> Low end of projection</span></div>
            {upDays.map((day) => (
              <div className={s.day} key={day}>
                <div className={s.dayhead}><b>{md(day)}</b> {dow(day)} <span className={s.out}>{up.find((u) => u.r[2] === day)!.daysOut === 0 ? "today" : `${up.find((u) => u.r[2] === day)!.daysOut} day${up.find((u) => u.r[2] === day)!.daysOut === 1 ? "" : "s"} out`}</span></div>
                {up.filter((u) => u.r[2] === day).map((u) => (
                  <div className={s.row} key={u.r[0]}>
                    <div className={s.who}><div className={s.t}>{u.r[4]}</div><div className={s.meta}><span>{u.r[3]}</span></div></div>
                    <div className={s.gaugeCol}>
                      <div className={s.track}>
                        <div className={s.segNow} style={{ width: pc(u.r[6]) }} />
                        <div className={s.segExp} style={{ left: pc(u.r[6]), width: pc(Math.max(0, u.proj[0] - u.r[6])) }} />
                        <div className={s.segMax} style={{ left: pc(Math.max(u.proj[0], u.r[6])), width: pc(Math.max(0, u.proj[1] - Math.max(u.proj[0], u.r[6]))) }} />
                        <div className={s.pin} style={{ left: pc(u.proj[0]) }} />
                      </div>
                      <div className={s.glabel}>{u.r[6]} enrolled &middot; {u.proj[0]}&ndash;{u.proj[1]} final &middot; &asymp; {u.room[0]}&ndash;{u.room[1]} in the room</div>
                    </div>
                    <div className={s.sig}><span className={`${s.pill} ${s[u.pill]}`}>{PILL[u.pill]}</span><span className={s.idx}>{u.idx}</span></div>
                  </div>
                ))}
              </div>
            ))}
            {!up.length && <p className={s.note}>No sessions in the next {CONFIG.windowDays} days.</p>}

            <h2 className={s.h2}>The window behind &middot; {md(PAST_FROM)} &ndash; {md(feed.through)} <span className={s.hint}>{past.length} closed sessions</span></h2>
            <section className={`${s.strip} ${s.strip4}`}>
              <div><span>Enrolled</span><b>{pe.toLocaleString("en-US")}</b></div>
              <div><span>Attended</span><b>{px.toLocaleString("en-US")}</b></div>
              <div className={s.badCell}><span>Show rate</span><b>{pe ? pct(px / pe) : "—"}</b><small>Workshops {pct(wor.rate)} &middot; Welcome to Kia {pct(wel.rate)} (since Sep 2)</small></div>
              <div className={s.badCell}><span>No-shows</span><b>{(pe - px).toLocaleString("en-US")}</b></div>
            </section>
            <div className={s.legend}><span><i className={s.swNow} /> Attended</span><span><i className={s.swTrack} /> Enrolled, did not attend</span></div>
            {pastDays.map((day) => (
              <div className={s.day} key={day}>
                <div className={s.dayhead}><b>{md(day)}</b> {dow(day)}</div>
                {past.filter((r) => r[2] === day).map((r) => {
                  const p = r[7] / r[6], ratio = p / (isWelcome(r[4]) ? wel.rate : wor.rate);
                  const pill: Pill = ratio >= CONFIG.showPill.hot ? "hot" : ratio >= CONFIG.showPill.pace ? "pace" : ratio >= CONFIG.showPill.soft ? "soft" : "lag";
                  const label = { hot: "above average", pace: "typical", soft: "below average", lag: "well below average", early: "" }[pill] + (r[6] < 10 ? ` · ${r[6]}-person class` : "");
                  return (
                    <div className={s.row} key={r[0]}>
                      <div className={s.who}><div className={s.t}>{r[4]}</div><div className={s.meta}><span>{r[3]}</span></div></div>
                      <div className={s.gaugeCol}><div className={s.track}><div className={s.segNow} style={{ width: Math.round(p * 1000) / 10 + "%" }} /></div><div className={s.glabel}>{r[7]} of {r[6]} attended &middot; {r[6] - r[7]} no-show{r[6] - r[7] === 1 ? "" : "s"}</div></div>
                      <div className={s.sig}><span className={`${s.pill} ${s[pill]}`}>{Math.round(p * 100)}% shown</span><span className={s.idx}>{label}</span></div>
                    </div>
                  );
                })}
              </div>
            ))}
            <div className={s.meth}>
              <p><b>How it works.</b> Final enrollment uses the same locked growth bands as Andrew&rsquo;s page (they were measured on Andrew&rsquo;s classes, so treat them as a rough guide for {w.short}&rsquo;s courses). &ldquo;In the room&rdquo; applies {w.short}&rsquo;s own show rate since Sep 2 for that course family. Pace compares enrolled now with {w.short}&rsquo;s most recent finished run of the same course, three or fewer days out. Past-class labels compare a class with {w.short}&rsquo;s own family show rate.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
function mins(t: string) { const m = /(\d+):(\d+)\s*([AP])M/i.exec(t || ""); if (!m) return "0000"; let h = +m[1] % 12; if (/p/i.test(m[3])) h += 12; return String(h).padStart(2, "0") + m[2]; }

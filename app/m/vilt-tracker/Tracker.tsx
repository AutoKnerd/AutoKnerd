"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import s from "./tracker.module.css";

// Same data shape the Apps Script build_() makes for the claude.ai tracker.
// D: [date "MM/DD/YYYY", weekday, start, end, trainer, class, eventId]
// H: [trainer, class, sessions, registered, attended]   (this year so far)
// M: [month "Jan", trainer, sessions, registered, attended]
export type Trainer = "Andrew" | "Anthony" | "Paul";
export type TrackerData = {
  meta: { asOf: string; cutoff: string; year: number; windowLabel: string; note: string; lastPull?: string };
  D: [string, string, string, string, Trainer, string, string][];
  H: [Trainer, string, number, number, number][];
  M: [string, Trainer, number, number, number][];
  TD: Record<Trainer, number>;
  TDM: Record<Trainer, number[]>;
  prev: Record<Trainer, { sessions: number; attended: number; days: number }> | null;
};

const NAMES: Trainer[] = ["Andrew", "Anthony", "Paul"];
const FULL: Record<Trainer, string> = { Andrew: "Andrew Sardone", Anthony: "Anthony Burkhardt", Paul: "Paul Reilly" };
const COLOR: Record<Trainer, string> = { Andrew: "var(--an)", Anthony: "var(--to)", Paul: "var(--pa)" };
const EVENT_URL = "https://wingspan.kiauniversity.com/app/schedulo/events/event-details/";
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const pct = (a: number, r: number) => (r ? Math.round((100 * a) / r) + "%" : "–");
const ym = (mdy: string) => mdy.slice(6, 10) + "-" + mdy.slice(0, 2);
const n = (x: number) => x.toLocaleString("en-US");
const cvar = (t: Trainer) => ({ "--c": COLOR[t] }) as CSSProperties;

/** `only` shows one trainer (used inside each Enrollment Runway); without it this is the global tracker. */
export function Tracker({ data, only }: { data: TrackerData; only?: Trainer }) {
  const { meta, D, H, M, TD, TDM, prev } = data;
  const names: Trainer[] = only ? [only] : NAMES;
  const [who, setWho] = useState<"all" | Trainer>(only || "all");
  const [cls, setCls] = useState("");
  const [view, setView] = useState<"schedule" | "results">("schedule");

  useEffect(() => {
    if (only) return; // embedded: views switch by button, the host page owns the URL hash
    const sync = () => setView(location.hash === "#results" ? "results" : "schedule");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [only]);

  const classes = useMemo(() => [...new Set(D.map((r) => r[5]))].sort(), [D]);
  const windowEnd = meta.windowLabel.split(" – ").pop();

  return (
    <div className={`${s.wrap} ${only ? s.embed : ""}`}>
      {!only && <header>
        <h1 className={s.h1}>vILT Live Tracker</h1>
        <p className={s.sub}>
          Kia University virtual classes taught by Andrew Sardone, Anthony Burkhardt and Paul Reilly: the schedule through {windowEnd} with
          registration links, and {meta.year} results so far.
        </p>
      </header>}

      <nav className={s.views} aria-label="Views">
        {only ? <>
          <button type="button" aria-current={view === "schedule" ? "page" : undefined} onClick={() => setView("schedule")}>Upcoming schedule</button>
          <button type="button" aria-current={view === "results" ? "page" : undefined} onClick={() => setView("results")}>{meta.year} results</button>
        </> : <>
          <a href="#schedule" aria-current={view === "schedule" ? "page" : undefined}>Upcoming schedule</a>
          <a href="#results" aria-current={view === "results" ? "page" : undefined}>{meta.year} results</a>
        </>}
      </nav>

      <div className={s.bar} role="toolbar" aria-label="Filter sessions">
        {!only && <button aria-pressed={who === "all"} onClick={() => setWho("all")}>Everyone</button>}
        {!only && NAMES.map((t) => (
          <button key={t} aria-pressed={who === t} onClick={() => setWho(t)}>
            <i className={s.dot} style={{ background: COLOR[t] }} />
            {t}
          </button>
        ))}
        {view === "schedule" && (
          <select aria-label="Filter by class" value={cls} onChange={(e) => setCls(e.target.value)}>
            <option value="">All classes</option>
            {classes.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        )}
      </div>

      {view === "schedule" ? <Schedule D={D} asOf={meta.asOf} who={who} cls={cls} names={names} /> : (
        <Results meta={meta} H={H} M={M} TD={TD} TDM={TDM} prev={prev} who={who} names={names} />
      )}

      {meta.lastPull && <p className={s.stamp}>Last pulled from Kia University {meta.lastPull} ET</p>}
    </div>
  );
}

function Schedule({ D, asOf, who, cls, names }: { D: TrackerData["D"]; asOf: string; who: "all" | Trainer; cls: string; names: Trainer[] }) {
  const [copied, setCopied] = useState("");
  const mons = [...new Set(D.map((r) => ym(r[0])))].sort();
  const a = new Date(asOf);
  const cur = isNaN(+a) ? mons[0] : a.getFullYear() + "-" + String(a.getMonth() + 1).padStart(2, "0");
  const m0 = mons.includes(cur) ? cur : mons[0];
  const label = (m: string) => MONTHS[+m.slice(5) - 1];

  const rows = D.filter((r) => (who === "all" || r[4] === who) && (!cls || r[5] === cls));
  const days = new Map<string, typeof rows>();
  rows.forEach((r) => days.set(r[0], [...(days.get(r[0]) || []), r]));

  const copy = (u: string) =>
    navigator.clipboard.writeText(u).then(() => {
      setCopied(u);
      setTimeout(() => setCopied(""), 1500);
    });

  return (
    <main className={s.main}>
      <div className={s.stats}>
        {names.map((t) => {
          const mine = D.filter((r) => r[4] === t);
          const inM = (m: string) => mine.filter((r) => ym(r[0]) === m);
          const now = inM(m0);
          return (
            <div key={t} className={s.stat}>
              <span>{FULL[t]}</span>
              <b>{new Set(now.map((r) => r[0])).size} training days in {label(m0)}</b>
              <small>scheduled as of {asOf}</small>
              <small>{now.length} sessions</small>
              {mons.filter((m) => m > m0).map((m) => {
                const x = inM(m);
                return x.length ? <small key={m}>{label(m)}: {new Set(x.map((r) => r[0])).size} days · {x.length} sessions</small> : null;
              })}
            </div>
          );
        })}
      </div>

      {!rows.length ? <p className={s.empty}>No sessions match that filter.</p> : (
        <div className={s.list}>
          {[...days.entries()].map(([d, rs]) => {
            const dt = new Date(+d.slice(6, 10), +d.slice(0, 2) - 1, +d.slice(3, 5));
            return (
              <section key={d} className={s.day}>
                <h2>{dt.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}</h2>
                {rs.map((r) => {
                  const u = EVENT_URL + r[6];
                  return (
                    <div key={r[6]} className={s.row} style={cvar(r[4])}>
                      <div className={s.time}>{r[2]} – {r[3]}</div>
                      <div className={s.cls}>
                        <strong>{r[5]}</strong>
                        <span className={s.who}>{FULL[r[4]]}</span>
                      </div>
                      <div className={s.act}>
                        <a href={u} target="_blank" rel="noopener noreferrer">Open</a>
                        <button onClick={() => copy(u)}>{copied === u ? "Copied" : "Copy link"}</button>
                      </div>
                    </div>
                  );
                })}
              </section>
            );
          })}
        </div>
      )}
    </main>
  );
}

function Results({ meta, H, M, TD, TDM, prev, who, names }: Omit<TrackerData, "D"> & { who: "all" | Trainer; names: Trainer[] }) {
  const sum = (t: Trainer) => H.filter((r) => r[0] === t).reduce((a, r) => [a[0] + r[2], a[1] + r[3], a[2] + r[4]], [0, 0, 0]);
  const ns = who === "all" ? names : [who];
  const months = [...new Set(M.map((r) => r[0]))];
  const mx = Math.max(1, ...M.map((r) => r[4]));
  const rows = H.filter((r) => who === "all" || r[0] === who).slice().sort((a, b) => b[4] - a[4]);

  return (
    <main className={s.main}>
      <p className={s.note}>{meta.note}</p>
      {prev && (
        <p className={s.note}>
          {meta.year - 1} final: {names.map((t) => `${FULL[t]} ${prev[t].sessions} sessions, ${n(prev[t].attended)} attended, ${prev[t].days} training days`).join(" · ")}
        </p>
      )}

      <div className={s.stats}>
        {names.map((t) => {
          const x = sum(t);
          return (
            <div key={t} className={`${s.stat} ${who !== "all" && who !== t ? s.dim : ""}`}>
              <span>{FULL[t]}</span>
              <b>{n(x[2])} attended</b>
              <small>{TD[t]} training days as of {meta.cutoff} · {x[0]} sessions · {n(x[1])} registered · {pct(x[2], x[1])}</small>
            </div>
          );
        })}
      </div>

      <section className={s.block}>
        <h2>Attended by month <span className={s.h2s}>(training days in gray)</span></h2>
        <div className={s.scroll}>
          <table>
            <thead>
              <tr><th>Month</th>{ns.map((t) => <th key={t} className={s.n}>{FULL[t]}</th>)}</tr>
            </thead>
            <tbody>
              {months.map((m, i) => (
                <tr key={m}>
                  <td>{m}</td>
                  {ns.map((t) => {
                    const r = M.find((x) => x[0] === m && x[1] === t);
                    const days = TDM[t]?.[i] ?? 0;
                    return (
                      <td key={t} className={s.n} style={cvar(t)}>
                        <div className={s.mb}>
                          <i style={{ width: Math.round((70 * (r?.[4] ?? 0)) / mx) }} />
                          <span title={`${days} training days, ${r?.[2] ?? 0} sessions, ${r?.[3] ?? 0} registered`}>{r?.[4] ?? 0}</span>
                          <em className={s.td}>{days}d</em>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={s.block}>
        <h2>Classes taught</h2>
        <div className={s.scroll}>
          <table>
            <thead>
              <tr>
                <th>Class</th><th>Trainer</th><th className={s.n}>Sessions</th><th className={s.n}>Registered</th><th className={s.n}>Attended</th><th className={s.n}>Rate</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[0] + r[1]}>
                  <td>{r[1]}</td>
                  <td style={cvar(r[0])}><span className={s.tdot} />{FULL[r[0]]}</td>
                  <td className={s.n}>{r[2]}</td>
                  <td className={s.n}>{n(r[3])}</td>
                  <td className={s.n}>{n(r[4])}</td>
                  <td className={s.n}>{pct(r[4], r[3])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

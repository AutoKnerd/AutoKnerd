import s from "../enrollment-runway/runway.module.css";
import { CAP, SINCE, SMALL, rate, type Insights, type Tally } from "./insights";

// Patterns tab (server-rendered), shared by all three runways.
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const md = (iso: string) => MON[+iso.slice(5, 7) - 1] + " " + +iso.slice(8, 10);
const pct = (v: number) => Math.round(v * 100) + "%";

function Rows({ rows, avg, label }: { rows: ({ k: string; rate: number } & Tally)[]; avg: number; label?: (k: string) => string }) {
  const max = Math.max(0.6, ...rows.map((r) => r.rate));
  return (
    <div className={s.tblwrap}>
      <table className={s.table}>
        <thead><tr><th>{""}</th><th className={s.n}>Classes</th><th className={s.n}>Enrolled</th><th className={s.n}>Attended</th><th>Show rate</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.k} className={r.n < SMALL ? s.dimRow : undefined}>
              <td>{label ? label(r.k) : r.k}{r.n < SMALL ? <span className={s.faint}> &middot; small sample</span> : null}</td>
              <td className={s.n}>{r.n}</td><td className={s.n}>{r.e.toLocaleString("en-US")}</td><td className={s.n}>{r.x.toLocaleString("en-US")}</td>
              <td>
                <div className={s.rateCell}>
                  <div className={s.rateTrack}><div className={r.rate >= avg ? s.rateHi : s.rateLo} style={{ width: (r.rate / max) * 100 + "%" }} /><div className={s.ratePin} style={{ left: (avg / max) * 100 + "%" }} /></div>
                  <span>{pct(r.rate)}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Weekly({ ins }: { ins: Insights }) {
  const W = ins.weeks;
  if (W.length < 2) return <p className={s.note}>Not enough complete weeks yet.</p>;
  const x0 = 50, x1 = 680, yb = 175, yt = 15;
  const vals = W.map((w) => w.rate * 100), lo = Math.max(0, Math.floor(Math.min(...vals) / 10) * 10 - 5), hi = Math.min(100, Math.ceil(Math.max(...vals) / 10) * 10 + 5);
  const X = (i: number) => x0 + ((x1 - x0) * i) / (W.length - 1), Y = (v: number) => yb - ((yb - yt) * (v - lo)) / (hi - lo || 1);
  const ticks = []; for (let v = lo; v <= hi; v += 10) ticks.push(v);
  const avg = rate(ins.overall) * 100;
  return (
    <div className={s.chartscroll}>
      <svg className={s.svg} viewBox="0 0 700 200" role="img" aria-label="Show rate each complete week since September.">
        {ticks.map((v) => <g key={v}><line className={s.grid} x1={x0} x2={x1} y1={Y(v)} y2={Y(v)} /><text className={s.tick} x={x0 - 6} y={Y(v) + 3.5} textAnchor="end">{v}%</text></g>)}
        <line className={s.base} x1={x0} x2={x1} y1={Y(avg)} y2={Y(avg)} />
        <text className={s.tick} x={x1} y={Y(avg) - 4} textAnchor="end">average {Math.round(avg)}%</text>
        <path className={s.trend} d={W.map((w, i) => (i ? "L" : "M") + X(i).toFixed(1) + " " + Y(w.rate * 100).toFixed(1)).join(" ")} />
        {W.map((w, i) => (
          <g key={w.k}>
            <circle className={s.trendDot} cx={X(i)} cy={Y(w.rate * 100)} r={4}><title>{`Week of ${md(w.k)} · ${w.x} of ${w.e} (${pct(w.rate)}) · ${w.n} classes`}</title></circle>
            {(W.length <= 12 || i % 2 === 0) && <text className={s.tick} x={X(i)} y={192} textAnchor="middle">{md(w.k)}</text>}
          </g>
        ))}
      </svg>
    </div>
  );
}

export function PatternsPanel({ ins, name }: { ins: Insights; name: string }) {
  const avg = rate(ins.overall);
  return (
    <div className={s.panel}>
      <p className={s.lead}>{name}&rsquo;s closed classes since {md(SINCE)}: {ins.overall.x.toLocaleString("en-US")} of {ins.overall.e.toLocaleString("en-US")} enrolled attended ({pct(avg)}, {ins.overall.n} classes). Bars are green above that average and orange below; the dark mark is the average. Rows with fewer than {SMALL} classes are faded: too few to read much into.</p>

      <h2 className={s.h2}>Week by week <span className={s.hint}>complete weeks only</span></h2>
      <Weekly ins={ins} />

      <h2 className={s.h2}>By course <span className={s.hint}>most-taught first</span></h2>
      <Rows rows={ins.byCourse} avg={avg} />

      <h2 className={s.h2}>By start time <span className={s.hint}>Eastern</span></h2>
      <Rows rows={ins.bySlot} avg={avg} />

      <h2 className={s.h2}>By weekday</h2>
      <Rows rows={ins.byDay} avg={avg} />

      <h2 className={s.h2}>Full classes <span className={s.hint}>workshops at the {CAP}-seat cap</span></h2>
      <p className={s.lead}>{ins.fullPast} of {ins.workPast} closed workshops since {md(SINCE)} hit the cap ({ins.workPast ? pct(ins.fullPast / ins.workPast) : "0%"}). A course that fills often is a sign more sessions are needed.{ins.fullUpcoming.length ? ` ${ins.fullUpcoming.length} upcoming already full: ${ins.fullUpcoming.map((r) => `${r[4]} (${md(r[2])} ${r[3]})`).join("; ")}.` : " None of the upcoming workshops is full yet."}</p>
      {ins.fullByCourse.length > 0 && (
        <div className={s.tblwrap}>
          <table className={s.table}>
            <thead><tr><th>Course</th><th className={s.n}>Full</th><th className={s.n}>Classes</th><th className={s.n}>Share full</th></tr></thead>
            <tbody>{ins.fullByCourse.map((r) => <tr key={r.k}><td>{r.k}</td><td className={s.n}>{r.full}</td><td className={s.n}>{r.n}</td><td className={s.n}>{pct(r.full / r.n)}</td></tr>)}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

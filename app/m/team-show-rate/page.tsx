import type { Metadata } from "next";
import Link from "next/link";
import { readFeed } from "../_kia/feed";
import { hasAccess } from "../_kia/gate";
import { Gate } from "../_kia/PassGate";
import { build, type SessionsFeed, type ShowRate, type Tally, type Trainer, type Family, TRAINERS, FULL, START, SPLIT, rate, pct, pts, pval, num, md } from "./stats";
import s from "./showrate.module.css";

// Unlisted Team Show Rate page (ported from the claude.ai artifact). Every number, sentence with a number,
// chart and table is computed from the Apps Script "sessions" feed, so the page stays current by itself.
export const dynamic = "force-dynamic"; // reads the access cookie; the feed itself is cached for an hour

export const metadata: Metadata = {
  title: "Team Show Rate",
  description: "Attendance across Kia University virtual sessions.",
  robots: { index: false, follow: false },
};

const COLOR: Record<Trainer, string> = { Andrew: "var(--an)", Paul: "var(--pa)", Anthony: "var(--to)" };
const isFeed = (j: unknown) => !!j && typeof j === "object" && Array.isArray((j as SessionsFeed).rows) && typeof (j as SessionsFeed).through === "string";

export default async function TeamShowRatePage({ searchParams }: { searchParams: Promise<{ wrong?: string }> }) {
  if (!(await hasAccess())) return <Gate title="Team Show Rate" next="/m/team-show-rate" wrong={!!(await searchParams).wrong} />;
  const feed = await readFeed<SessionsFeed>("sessions", isFeed, { from: "2026-08-31" });
  const d = feed && feed.rows.length ? build(feed) : null;
  return (
    <div className={s.page}>
      <div className={s.wrap}>
        <p className={s.back}><Link href="/m/kia">&larr; All Kia pages</Link></p>
        {d && d.team.s ? <Report d={d} /> : (
          <>
            <h1 className={s.h1}>Team Show Rate</h1>
            <p className={s.note}>Couldn&rsquo;t load the session data right now. Try again in a few minutes.</p>
          </>
        )}
      </div>
    </div>
  );
}

function Bar({ t, v, max, sub }: { t: Trainer; v: number; max: number; sub: string }) {
  const w = Math.min(100, (v * 100 / max) * 100);
  return (
    <>
      <div className={s.row}>
        <div className={s.nm}>{FULL[t]}</div>
        <div className={s.track}>
          <div className={s.fill} style={{ width: w + "%", background: COLOR[t] }} />
          <div className={s.val} style={{ left: w + "%" }}>{pct(v)}</div>
        </div>
      </div>
      <div className={s.row}><div /><div className={s.cap2}>{sub}</div></div>
    </>
  );
}

function Scale({ max }: { max: number }) {
  const ticks = []; for (let v = 0; v <= max; v += 10) ticks.push(v);
  return (
    <div className={s.scale}><div /><div className={s.sticks}>
      {ticks.map((v) => <span key={v} style={{ left: (v / max) * 100 + "%" }}>{v}%</span>)}
    </div></div>
  );
}

const byRate = (src: Record<Trainer, Tally>) => TRAINERS.slice().sort((a, b) => rate(src[b]) - rate(src[a]));
const tie = (p: number) => p >= 0.05;

function Report({ d }: { d: ShowRate }) {
  const maxRate = Math.max(...TRAINERS.flatMap((t) => [rate(d.all[t]), rate(d.fam.welcome[t]), rate(d.fam.workshop[t]), rate(d.half.after[t])]));
  const max = Math.max(50, Math.ceil((maxRate * 100 + 5) / 10) * 10);
  const fams: { f: Family; title: string; cap: string }[] = [
    { f: "welcome", title: "Welcome to Kia", cap: `the big-roster course, ${d.famRange.welcome[0]}–${d.famRange.welcome[1]} enrolled each` },
    { f: "workshop", title: "Product & skills workshops", cap: `typically ${d.famRange.workshop[0]}–${Math.min(d.famRange.workshop[1], 60)} enrolled each` },
  ];
  const A = d.half, chg = (t: Trainer) => rate(A.after[t]) - rate(A.before[t]);
  const tide = rate(d.ctrlAfter) - rate(d.ctrlBefore);
  const lead = byRate(d.all);
  const weeksN = d.weeks.length;

  return (
    <>
      <header>
        <h1 className={s.h1}>Team Show Rate</h1>
        <p className={s.sub}>How many enrolled dealer staff actually turn up, across the three instructors running virtual sessions at Kia University. Read the course split before the headline number &mdash; it is the only fair comparison.</p>
        <p className={s.stamp}>Wingspan &middot; closed sessions &middot; {md(START)} &ndash; {md(d.through)} {d.through.slice(0, 4)} &middot; last sync {d.lastPull} ET &middot; updates itself</p>
      </header>

      <p className={s.lede}>
        {weeksN} complete weeks in, Andrew&rsquo;s show rate has moved {pts(d.lift.d)} points more than the two instructors without reminder emails
        {tie(d.lift.p) ? " — not enough to call a result." : " — a statistically clear difference."}
      </p>

      <div className={`${s.note} ${s.warn}`}>
        <b>{tie(d.lift.p) ? "The reminder programme cannot yet claim the lift." : "The reminder programme shows a measurable lift."}</b>{" "}
        Andrew&rsquo;s show rate went from {pct(rate(A.before.Andrew))} before {md(SPLIT)} to {pct(rate(A.after.Andrew))} after, {pts(chg("Andrew"))} points.
        Paul moved {pts(chg("Paul"))} points and Anthony {pts(chg("Anthony"))} points over the same weeks with no reminder emails at all.
        Andrew&rsquo;s excess above that shared movement is <b>{pts(d.lift.d)} points ({pval(d.lift.p)})</b>.
      </div>

      <div className={s.note}>
        <b>Overall:</b> {lead.map((t, i) => <span key={t}>{i ? ", " : ""}{t} {pct(rate(d.all[t]))}</span>)} across {num(d.team.n)} enrollees.
        {" "}Andrew vs Paul: {tie(d.pairs.all.AP.p) ? "a statistical tie" : "a real gap"} ({pval(d.pairs.all.AP.p)}).
        {" "}Andrew vs Anthony: {tie(d.pairs.all.AA.p) ? "a tie" : "a real gap"} ({pval(d.pairs.all.AA.p)}).
        {" "}Paul vs Anthony: {tie(d.pairs.all.PA.p) ? "a tie" : "a real gap"} ({pval(d.pairs.all.PA.p)}).
      </div>

      <h2 className={s.h2}>Show rate by course family <span className={s.hint}>attended &divide; enrolled, weighted by people</span></h2>
      <div className={s.panel}>
        <div className={s.grp}>
          <h3>All virtual sessions</h3>
          <div className={s.cap}>{d.team.s} sessions &middot; {num(d.team.n)} enrolled &middot; {num(d.team.x)} attended</div>
          {byRate(d.all).map((t) => <Bar key={t} t={t} v={rate(d.all[t])} max={max} sub={`${d.all[t].s} sessions · ${num(d.all[t].x)} of ${num(d.all[t].n)}`} />)}
        </div>
        {fams.map(({ f, title, cap }) => (
          <div className={s.grp} key={f}>
            <h3>{title}</h3>
            <div className={s.cap}>{d.famTeam[f].s} sessions &middot; {cap}</div>
            {byRate(d.fam[f]).map((t) => <Bar key={t} t={t} v={rate(d.fam[f][t])} max={max} sub={`${d.fam[f][t].s} sessions · ${num(d.fam[f][t].x)} of ${num(d.fam[f][t].n)}`} />)}
          </div>
        ))}
        <Scale max={max} />
      </div>
      <Legend />

      <div className={s.note}>
        <b>Within each course family.</b>{" "}
        On <b>Welcome to Kia</b> ({num(d.famTeam.welcome.n)} of the {num(d.team.n)} enrollees):
        {" "}Andrew vs Paul {pts(d.pairs.welcome.AP.diff)} pts ({pval(d.pairs.welcome.AP.p)}),
        {" "}Andrew vs Anthony {pts(d.pairs.welcome.AA.diff)} ({pval(d.pairs.welcome.AA.p)}),
        {" "}Paul vs Anthony {pts(d.pairs.welcome.PA.diff)} ({pval(d.pairs.welcome.PA.p)}).
        {" "}On <b>workshops</b>: Andrew vs Paul {pts(d.pairs.workshop.AP.diff)} ({pval(d.pairs.workshop.AP.p)}),
        {" "}Andrew vs Anthony {pts(d.pairs.workshop.AA.diff)} ({pval(d.pairs.workshop.AA.p)}),
        {" "}Paul vs Anthony {pts(d.pairs.workshop.PA.diff)} ({pval(d.pairs.workshop.PA.p)}).
        {" "}Gaps with p of 0.05 or more are ties, not small leads.
      </div>

      <h2 className={s.h2}>Before and after {md(SPLIT)} <span className={s.hint}>only Andrew&rsquo;s sessions carry reminder emails</span></h2>
      <div className={s.panel}>
        {TRAINERS.map((t) => {
          const b = rate(A.before[t]), a = rate(A.after[t]);
          return (
            <div key={t}>
              <div className={s.row}>
                <div className={s.nm}>{FULL[t]}</div>
                <div className={s.track}>
                  <div className={s.fill} style={{ width: (a * 100 / max) * 100 + "%", background: COLOR[t], opacity: 0.38 }} />
                  <div className={s.pin} style={{ left: (b * 100 / max) * 100 + "%" }} />
                  <div className={s.val} style={{ left: (Math.max(a, b) * 100 / max) * 100 + "%" }}>{pct(a)} <span className={s.faintTxt}>&nbsp;{pts(a - b)}</span></div>
                </div>
              </div>
              <div className={s.row}><div /><div className={s.cap2}>from {pct(b)} before {md(SPLIT)} &middot; {A.before[t].s} sessions before, {A.after[t].s} after</div></div>
            </div>
          );
        })}
        <Scale max={max} />
      </div>
      <div className={s.legend}>
        <div className={s.it}><span className={s.sw} style={{ background: "var(--muted)", opacity: 0.38 }} /> after {md(SPLIT)}</div>
        <div className={s.it}><span className={s.sw} style={{ background: "var(--fg)", width: 3 }} /> before {md(SPLIT)}</div>
      </div>

      <div className={s.note}>
        <b>Paul and Anthony are the control group.</b>{" "}
        A before-and-after on one person cannot tell a working intervention from a rising tide. Paul and Anthony teach the same courses to the same dealer network over the same weeks, with no emails; together they moved {pts(tide)} points. On Welcome to Kia alone, Andrew&rsquo;s difference-in-differences is {pts(d.liftWelcome.d)} points ({pval(d.liftWelcome.p)}).
      </div>

      <h2 className={s.h2}>Week by week <span className={s.hint}>each point is that week&rsquo;s enrolled-weighted rate</span></h2>
      <div className={s.panel}><div className={s.chartscroll}><Weekly d={d} /></div></div>
      <Legend />
      <div className={s.note}>
        <b>Single weeks are noise.</b> Weekly rates swing 10 to 15 points on a few hundred enrollees a week, so no one week means anything. Look at the shape: whether the three lines rise and fall together, and whether Andrew&rsquo;s line pulls away after the dashed divider. Hover a point for that week&rsquo;s figures.
      </div>

      <h2 className={s.h2}>The numbers</h2>
      <div className={s.tblwrap}>
        <table className={s.table}>
          <thead><tr><th>Instructor</th><th>Course family</th><th className={s.n}>Sessions</th><th className={s.n}>Enrolled</th><th className={s.n}>Attended</th><th className={s.n}>Show rate</th></tr></thead>
          <tbody>
            {TRAINERS.flatMap((t) => [
              <Tr key={t + "w"} a={FULL[t]} b="Welcome to Kia" t={d.fam.welcome[t]} />,
              <Tr key={t + "k"} a={FULL[t]} b="Workshops" t={d.fam.workshop[t]} />,
              <Tr key={t + "a"} a={FULL[t]} b="All" t={d.all[t]} tot />,
            ])}
            <Tr a="Team" b="All virtual" t={d.team} tot />
          </tbody>
        </table>
      </div>

      <div className={s.note}>
        <b>Single sessions are noise too.</b> Counting only sessions with 10 or more enrolled:{" "}
        {TRAINERS.map((t, i) => {
          const x = d.spread[t];
          return <span key={t}>{i ? "; " : ""}{t}&rsquo;s {x.count} sessions have a median of {pct(x.median, 0)} with the middle half between {pct(x.q1, 0)} and {pct(x.q3, 0)}</span>;
        })}. The spread inside one instructor&rsquo;s own sessions is far wider than the gap between instructors. Nobody should be judged on a class.
      </div>

      <h2 className={s.h2}>Before this goes to the team</h2>
      <div className={`${s.note} ${s.warn}`}>
        <b>An attendance mark is not a record of turning up.</b> Wingspan credits attendance only for people who stayed roughly 60% of the class (checked person by person against the room records on nine sessions). So this measures getting people in <em>and</em> keeping them there, and a low number can mean either. A gap could be a joining problem or a staying problem, and this page cannot tell which.
      </div>
      <div className={`${s.note} ${s.warn}`}>
        <b>Andrew&rsquo;s rows are a treated number against two untreated ones.</b> The reminder programme has covered his sessions since late September, and the other two instructors have nothing equivalent. That is the point of the before-and-after and a problem for the head-to-head: the course-family ranking has to carry that caveat with it, or it reads as a league table it is not.
      </div>

      <h2 className={s.h2}>How this is built</h2>
      <div className={s.meth}>
        <p><b>Source.</b> Wingspan event search for the three instructors, pulled every morning by the vILT Tracker Sync extension into the vILT Live Tracker sheet. Sessions with status <b>Closed</b> or <b>Attendance Closed</b> from {md(START)} through {md(d.through)} ({d.team.s} sessions). Sessions still Active carry partial attendance and are left out until they close.</p>
        <p><b>What is out.</b> In-person ILT courses (they are not on these instructors&rsquo; virtual calendars), test events, and {d.noFigure} session{d.noFigure === 1 ? "" : "s"} where Wingspan recorded no attendance figure &mdash; excluded rather than counted as zero, which would quietly understate an instructor.</p>
        <p><b>Show rate</b> is attended &divide; enrolled, weighted by people rather than averaged across sessions, so a 175-person class counts for more than a four-person one. <b>Significance</b> is a two-proportion z-test, two-sided; differences are called real only when p &lt; 0.05.</p>
        <p><b>The before-and-after</b> splits each instructor&rsquo;s sessions at {md(SPLIT)}, the first full day after the reminder programme began. The test that matters is not whether Andrew improved ({pval(d.andrewBeforeAfter.p)}) but whether he improved <em>more than the untreated two</em>: the difference-in-differences, Andrew&rsquo;s change minus Paul and Anthony&rsquo;s pooled change, with a standard error built from all four halves.</p>
        <p><b>The weekly chart</b> buckets sessions by the Monday of their week and shows complete weeks only, so no point is built on a day and a half of data.</p>
        <p><b>Course families.</b> Welcome to Kia is separated because its rosters are several times larger than workshop rosters, so it dominates any blended average.</p>
      </div>

      <footer className={s.footer}>
        Recomputed from Wingspan data on every refresh (about hourly). Counts are final for closed sessions only.<br />
        The written conclusions above are generated from the same numbers; read the caveats before sharing.
      </footer>
    </>
  );
}

function Tr({ a, b, t, tot }: { a: string; b: string; t: Tally; tot?: boolean }) {
  return (
    <tr className={tot ? s.tot : undefined}>
      <td>{a}</td><td>{b}</td><td className={s.n}>{t.s}</td><td className={s.n}>{num(t.n)}</td><td className={s.n}>{num(t.x)}</td><td className={s.n}>{pct(rate(t))}</td>
    </tr>
  );
}

function Legend() {
  return (
    <div className={s.legend}>
      {TRAINERS.map((t) => <div className={s.it} key={t}><span className={s.sw} style={{ background: COLOR[t] }} /> {FULL[t]}</div>)}
    </div>
  );
}

function Weekly({ d }: { d: ShowRate }) {
  const W = d.weeks;
  if (W.length < 2) return <p className={s.cap}>Not enough complete weeks yet.</p>;
  const vals = W.flatMap((w) => TRAINERS.filter((t) => w.t[t].n).map((t) => rate(w.t[t]) * 100));
  const lo = Math.floor(Math.min(...vals) / 5) * 5, hi = Math.ceil(Math.max(...vals) / 5) * 5 || lo + 5;
  const x0 = 62, x1 = 648, y0 = 214, y1 = 40;
  const X = (i: number) => x0 + ((x1 - x0) * i) / (W.length - 1);
  const Y = (v: number) => y0 - ((y0 - y1) * (v - lo)) / (hi - lo || 1);
  const yt = []; for (let v = lo; v <= hi; v += 5) yt.push(v);
  const splitIdx = W.findIndex((w) => w.w > SPLIT); // first week that starts after the split
  const cutX = splitIdx > 0 ? (X(splitIdx - 1) + X(splitIdx)) / 2 : null;
  const labels: { t: Trainer; y: number }[] = TRAINERS.map((t) => {
    const last = [...W].reverse().find((w) => w.t[t].n);
    return { t, y: last ? Y(rate(last.t[t]) * 100) + 3.5 : y0 };
  }).sort((a, b) => a.y - b.y);
  for (let i = 1; i < labels.length; i++) if (labels[i].y - labels[i - 1].y < 13) labels[i].y = labels[i - 1].y + 13;
  const every = Math.ceil(W.length / 12);
  return (
    <svg className={s.ts} viewBox="0 8 720 230" role="img" aria-label={`Weekly enrolled-weighted show rate for the three instructors, ${W.length} complete weeks from the week of ${md(W[0].w)}.`}>
      {yt.map((v) => <g key={v}><line className={s.g} x1={x0} y1={Y(v)} x2={x1} y2={Y(v)} /><text className={s.yt} x={54} y={Y(v) + 3.5} textAnchor="end">{v}%</text></g>)}
      {W.map((w, i) => (i % every === 0 || i === W.length - 1) && <text key={w.w} className={s.xt} x={X(i)} y={232} textAnchor="middle">{md(w.w)}</text>)}
      {cutX != null && <g>
        <line className={s.cut} x1={cutX} y1={26} x2={cutX} y2={y0} />
        <text className={s.cutlab} x={cutX - 6} y={22} textAnchor="end">no reminders</text>
        <text className={`${s.cutlab} ${s.on}`} x={cutX + 6} y={22}>Andrew reminded</text>
      </g>}
      {TRAINERS.map((t) => {
        const pts2 = W.map((w, i) => (w.t[t].n ? { i, v: rate(w.t[t]) * 100, x: w.t[t] } : null)).filter(Boolean) as { i: number; v: number; x: Tally }[];
        return (
          <g key={t}>
            <path className={s.ln} style={{ stroke: COLOR[t] }} d={pts2.map((p, k) => (k ? "L" : "M") + X(p.i).toFixed(1) + " " + Y(p.v).toFixed(1)).join(" ")} />
            {pts2.map((p) => (
              <circle key={p.i} className={s.pt} style={{ fill: COLOR[t] }} cx={X(p.i)} cy={Y(p.v)} r={4}>
                <title>{`${t} · week of ${md(W[p.i].w)} · ${p.x.x} of ${p.x.n} (${Math.round(p.v)}%)`}</title>
              </circle>
            ))}
          </g>
        );
      })}
      {labels.map((l) => <text key={l.t} className={s.dl} style={{ fill: COLOR[l.t] }} x={x1 + 9} y={l.y}>{l.t}</text>)}
      <line className={s.axis} x1={x0} y1={y0} x2={x1} y2={y0} />
    </svg>
  );
}

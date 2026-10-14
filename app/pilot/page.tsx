import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import s from "./pilot.module.css";
import { DEMO, BOOK, ext } from "@/app/lib/links";
import TrackedLink from "./TrackedLink";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Founding Dealer Pilot · AutoKnerd",
  description:
    "Run AutoKnerd in one store for 90 days. Find the one behavior holding each salesperson and advisor back, turn it into five minutes of daily practice, and show managers exactly where to coach — then decide with real results in front of you.",
};

const SCORED = ["Empathy", "Listening", "Trust", "Follow-up", "Closing"];

const PROBLEMS = [
  ["Customers feel guarded", "Low transparency creates friction the moment price comes up."],
  ["Reps sound different", "Message drift from one consultant to the next dilutes trust."],
  ["Coaching is reactive", "Managers chase missed numbers instead of correcting patterns early."],
];

const STEPS = [
  ["01 · DIAGNOSE", "We find each rep's one limiting habit", "AutoKnerd baselines your team's CX behavior across the sales floor and the service drive."],
  ["02 · COACH", "Reps practice daily. Managers steer weekly.", "Each rep gets a five-minute daily rep on their weakest habit. Managers set a light weekly focus, about five minutes of their time."],
  ["03 · REVIEW", "You see where to coach, then decide", "Owners and GMs see which behaviors are strong and where consistency is slipping. At 90 days, we review it together and you decide whether to continue."],
];

const FIT_GOOD = [
  "You are a GM, dealer principal or owner of a franchise or independent store, one rooftop or a group.",
  "Your reps do not all sound like your best rep, on the sales floor, the service drive, or both.",
  "CSI, gross and repeat business matter to you, and you want managers coaching before the numbers slip.",
  "You can name one store and one manager to run the pilot with.",
];

const FIT_BAD = [
  "You want a one-day event or a binder, not daily practice.",
  "No manager can spare about five minutes a week to set the focus.",
  "Your team will not spend five minutes a day on it. The practice is what makes it work.",
];

const USUAL = ["One big event, then back to normal", "Same lesson for the whole room", "You hope it sticks", "No line of sight for managers"];
const WITH_AK = ["Five focused minutes, every day", "Aimed at each rep's weak spot", "Reps actually do it, because it plays like a game", "Managers see exactly where to coach"];

const METHOD = [
  ["01", "One habit at a time", "Most training tries to fix everything at once, so nothing changes. AutoKnerd finds the single behavior holding each rep back and practices only that until it becomes natural."],
  ["02", "Practice, not just information", "Reps do not watch a slide or read a binder. They hold a live conversation with a simulated customer and say the words out loud, which is how a skill is actually built."],
  ["03", "Short, daily and spaced out", "Five minutes a day, repeated over weeks, beats one long session. Frequent short reps fight the forgetting that follows a one-day class and turn good intentions into habits."],
  ["04", "Feedback while it is fresh", "Every rep is scored on the behaviors customers feel: empathy, listening, trust, follow-up and closing. The rep sees what to adjust right away, not at the next review."],
  ["05", "Aimed at real customer moments", "The scenarios come from the conversations that make or lose a deal: price pushback, a nervous first-time buyer, a service customer who expects bad news. Practice matches the floor and the drive."],
  ["06", "Managers close the loop", "Managers set a light weekly focus and see the patterns across the team, so coaching happens before the numbers slip instead of after."],
];

export default function PilotPage() {
  return (
    <div className={`${s.page} ${grotesk.variable}`}>
      {/* NAV */}
      <div className={s.navBar}>
        <div className={s.wrap}>
          <nav className={s.nav}>
            <a href="/" className={s.brand} aria-label="AutoKnerd home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="AutoKnerd, Dealership CX Development" className={s.brandLogo} />
            </a>
            <div className={s.navRight}>
              <TrackedLink href={DEMO} event="See Demo" location="nav" {...ext} className={s.navLink}>Live demo</TrackedLink>
              <TrackedLink href={BOOK} event="Book Call" location="nav" {...ext} className={s.navPill}>Book 20 minutes</TrackedLink>
            </div>
          </nav>

          {/* HERO */}
          <section className={s.hero}>
            <div className={s.heroCopy}>
              <div className={s.eyebrow}>90-day pilot · One store · Founding dealers</div>
              <h1 className={s.h1}>Reps who sound like your best rep. Managers who know exactly where to coach.</h1>
              <p className={s.lead}>
                AutoKnerd CX AI turns each salesperson&apos;s and advisor&apos;s weakest habit into five minutes of
                daily role-play, and shows your managers exactly where to coach. Run it in one rooftop for 90 days,
                watch your team get sharper, then decide with real results in front of you.
              </p>
              <div className={s.heroCtas}>
                <TrackedLink href={BOOK} event="Book Call" location="hero" {...ext} className={s.btnLime}>Book a 20-minute call</TrackedLink>
                <TrackedLink href={DEMO} event="See Demo" location="hero" {...ext} className={s.btnOutline}>See the live demo</TrackedLink>
              </div>
              <div className={s.trustline}>Sales floor and service drive · Your team downloads nothing · Built by a seasoned CX trainer</div>
            </div>

            <div className={s.heroCard}>
              <div className={s.heroCardTop}>
                <div className={s.cardKicker}>EXAMPLE DAILY REP</div>
                <div className={s.cardBadge}>5 MIN</div>
              </div>
              <div className={s.cardTitle}>Customer pushes back on price</div>
              <div className={s.cardText}>The rep practices a live conversation with a simulated customer, aimed at the habit that is costing them most.</div>
              <div className={s.scoredBox}>
                <div className={s.scoredLabel}>SCORED ON</div>
                <div className={s.chips}>
                  {SCORED.map((c) => <span key={c} className={s.chip}>{c}</span>)}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* PROBLEM */}
      <div className={s.secProblem}>
        <div className={s.wrap}>
          <div className={s.section} style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            <div className={s.secHead}>
              <div className={s.eyebrow}>The real problem</div>
              <h2 className={s.h2}>It is not a motivation problem. It is a consistency problem.</h2>
              <p className={s.sub}>Your team does not lack drive. They lack a system that helps every rep sound like your best rep on every customer.</p>
            </div>
            <div className={s.cards3}>
              {PROBLEMS.map(([h, p]) => (
                <div key={h} className={s.card}>
                  <div className={s.cardH}>{h}</div>
                  <div className={s.cardP}>{p}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* HOW THE PILOT WORKS */}
      <div className={s.secHow}>
        <div className={s.wrap}>
          <div className={s.sectionWide} style={{ display: "flex", flexDirection: "column", gap: 44 }}>
            <div className={s.secHead}>
              <div className={s.eyebrow}>How the pilot works</div>
              <h2 className={s.h2}>One store. About a week to go live. 90 days to see what changes.</h2>
            </div>
            <div className={s.steps}>
              {STEPS.map(([n, t, d]) => (
                <div key={n} className={s.step}>
                  <div className={s.stepNum}>{n}</div>
                  <div className={s.stepTitle}>{t}</div>
                  <div className={s.stepText}>{d}</div>
                </div>
              ))}
            </div>

            <div className={s.fitBlock}>
              <div className={s.secHead}>
                <div className={s.eyebrow}>Who this is for</div>
                <h3 className={s.h3}>Built for stores that want consistency, not another seminar.</h3>
              </div>
              <div className={s.fit}>
                <div className={s.fitGood}>
                  <div className={s.fitH}>A good fit if</div>
                  {FIT_GOOD.map((t) => (
                    <div key={t} className={s.fitRow}><span className={s.fitDot} /><span>{t}</span></div>
                  ))}
                </div>
                <div className={s.fitBad}>
                  <div className={s.fitH}>Probably not a fit if</div>
                  {FIT_BAD.map((t) => (
                    <div key={t} className={`${s.fitRow} ${s.fitRowMuted}`}><span className={`${s.fitDot} ${s.fitDotMuted}`} /><span>{t}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WHY DIFFERENT */}
      <div className={s.secWhy}>
        <div className={s.wrap}>
          <div className={s.section} style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            <h2 className={s.h2} style={{ maxWidth: 760 }}>Not another seminar your team forgets by Monday.</h2>
            <div className={s.compare}>
              <div className={s.compareCard}>
                <div className={s.compareLabel} style={{ color: "#8E8E96" }}>THE USUAL TRAINING</div>
                {USUAL.map((t) => <div key={t} className={`${s.compareItem} ${s.compareItemMuted}`}>{t}</div>)}
              </div>
              <div className={`${s.compareCard} ${s.compareAk}`}>
                <div className={s.compareLabel} style={{ color: "#C6FF00" }}>WITH AUTOKNERD</div>
                {WITH_AK.map((t) => <div key={t} className={s.compareItem}>{t}</div>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* THE METHOD */}
      <div className={s.secMethod}>
        <div className={s.wrap}>
          <div className={s.section} style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            <div className={s.secHead}>
              <div className={s.eyebrow}>The method</div>
              <h2 className={s.h2}>Why five minutes a day changes how your team talks to customers.</h2>
              <p className={s.sub}>Daily microtraining is built on how people really learn a skill: small, frequent, specific practice with feedback. AutoKnerd applies that to customer experience, the conversations where trust is won or lost.</p>
            </div>
            <div className={s.methodGrid}>
              {METHOD.map(([n, t, d]) => (
                <div key={n} className={s.methodCard}>
                  <div className={s.methodNum}>{n}</div>
                  <div className={s.methodTitle}>{t}</div>
                  <div className={s.methodText}>{d}</div>
                </div>
              ))}
            </div>
            <p className={s.methodOutro}>The result is not a team that knows more about customer experience. It is a team that does it, because the behaviors customers feel have been rehearsed every day until they are habit.</p>
          </div>
        </div>
      </div>

      {/* FOUNDER */}
      <div className={s.secFounder}>
        <div className={s.wrap}>
          <div className={s.sectionWide}>
            <div className={s.founderWrap}>
              <div className={s.eyebrow}>Why I built this</div>
              <p className={s.founderQuote}>
                Being nice is not the same as losing money. When people feel heard, gross goes up and happy customers
                come back through service for years.
              </p>
              <p className={s.founderBody}>
                After years on the showroom floor, I built AutoKnerd to make that your standard, every rep, every time.
                We proved it on a real floor with our first pilot store, and now we are opening it to a small group of
                founding dealers.
              </p>
              <div className={s.founderName}>Andrew Sardone · Founder, AutoKnerd</div>
            </div>
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <div className={s.ctaOuter}>
        <div className={s.wrap}>
          <div className={s.cta}>
            <div className={s.ctaCopy}>
              <h2 className={s.ctaTitle}>Pick one store. We will take it from there.</h2>
              <p className={s.ctaText}>A 20-minute call to see if the 90-day pilot fits your store. One rooftop, live in about a week.</p>
            </div>
            <div className={s.ctaBtns}>
              <TrackedLink href={BOOK} event="Book Call" location="final-cta" {...ext} className={s.btnDark}>Book 20 minutes</TrackedLink>
              <TrackedLink href={DEMO} event="See Demo" location="final-cta" {...ext} className={s.btnDarkOutline}>See the live demo</TrackedLink>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className={s.wrap}>
        <footer className={s.footer}>
          <div className={s.footerBrand}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="AutoKnerd" className={s.footerLogo} />
            <span>© 2026 AutoKnerd LLC. All rights reserved.</span>
          </div>
          <div className={s.footerLinks}>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/podcast">Podcast</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

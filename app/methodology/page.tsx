import type { Metadata } from "next";
import { SiteNav } from "@/app/components/SiteNav";
import { SiteFooter } from "@/app/components/SiteFooter";
import s from "@/app/components/site.module.css";
import { DEMO, BOOK, ext } from "@/app/lib/links";
import { ShieldCheck, Eye, TrendingUp, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Methodology · AutoKnerd",
  description:
    "How AutoKnerd turns dealership customer experience into a consistent system: diagnose behavior, coach weekly, and make great CX the standard on every deal.",
};

const PILLARS = [
  {
    icon: ShieldCheck,
    tint: "rgba(70,209,96,0.14)",
    color: "#2FA84A",
    title: "Consistent",
    text: "Every customer gets the same trust-driven experience, no matter which salesperson or advisor they land on.",
  },
  {
    icon: Eye,
    tint: "rgba(6,182,212,0.12)",
    color: "#0891B2",
    title: "Visible",
    text: "Managers see how the team is actually executing, so coaching is based on what is happening, not a hunch.",
  },
  {
    icon: TrendingUp,
    tint: "rgba(160,214,0,0.18)",
    color: "#6E9400",
    title: "Scalable",
    text: "The system holds up through turnover, new hires, and busy months. It never depends on one star rep.",
  },
];

const CONTRAST = [
  { k: "THE PROBLEM", t: "Dealership CX drifts because execution changes from one person to the next, and one day to the next." },
  { k: "WHY TRAINING FAILS", t: "A big event creates awareness, not habit. Without weekly reinforcement, old patterns come right back." },
  { k: "WHAT AUTOKNERD INSTALLS", t: "Manager-led weekly coaching, a daily rep for each person, and clear standards the whole store can see." },
];

const FLOW = ["Behavior", "Manager reinforcement", "Consistency", "Customer trust", "Store performance"];

const STEPS = [
  ["01", "Diagnose", "We read how your sales floor and service drive actually run, and surface the gaps quietly costing you."],
  ["02", "Deploy", "Managers set a light weekly tune. Every rep gets a daily rep on their single weakest habit."],
  ["03", "Calibrate", "We tighten the weekly rhythm and get store leadership aligned on one clear standard."],
  ["04", "Stabilize", "Good execution becomes the norm, the same experience on every customer, every time."],
];

export default function MethodologyPage() {
  return (
    <div className={s.page}>
      <SiteNav />

      {/* HERO */}
      <header className={s.hero}>
        <div className={s.container}>
          <span className={`${s.eyebrow} ${s.mono}`}>
            <span className={s.dot} />THE METHODOLOGY
          </span>
          <h1 className={s.h1} style={{ maxWidth: 820 }}>
            Make great CX a <span className={s.grad}>system,</span> not a hope.
          </h1>
          <p className={s.lead}>
            Most dealership training is reactive, temporary, and emotional. AutoKnerd replaces individual
            heroics with a simple weekly rhythm that keeps the behaviors driving gross, CSI, and repeat
            business running all year, not just the week after a big meeting.
          </p>
          <p className={s.lowLift} style={{ marginTop: 20, fontSize: 16 }}>
            About 5 minutes a week from your managers. The system does the coaching.
          </p>
        </div>
      </header>

      {/* BELIEF */}
      <section style={{ paddingTop: "clamp(36px, 5vw, 56px)" }}>
        <div className={s.container}>
          <div style={{ borderRadius: 28, background: "#F3FBE8", border: "1px solid #D6EFAE", padding: "clamp(28px, 4vw, 40px)", textAlign: "center" }}>
            <p className={`${s.mono} ${s.kicker}`}>WHAT WE BELIEVE</p>
            <p style={{ margin: "12px auto 0", maxWidth: 760, fontSize: "clamp(20px, 2.6vw, 27px)", fontWeight: 800, lineHeight: 1.35, letterSpacing: "-0.01em" }}>
              Kindness and care aren&apos;t the opposite of profit. They are what raise a customer&apos;s motivation
              to buy, and the gross, CSI, and repeat business that follow.
            </p>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.center}>
            <p className={`${s.mono} ${s.kicker}`}>WHAT WE STABILIZE</p>
            <h2 className={s.h2sm}>Three things every store needs.</h2>
          </div>
          <div className={s.grid3}>
            {PILLARS.map((p) => (
              <div key={p.title} className={s.card}>
                <div className={s.cardIcon} style={{ background: p.tint }}>
                  <p.icon size={22} color={p.color} strokeWidth={1.9} />
                </div>
                <h3 className={s.cardTitle} style={{ marginTop: 20 }}>{p.title}</h3>
                <p className={s.cardText}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY SYSTEMS BEAT TRAINING */}
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.center}>
            <p className={`${s.mono} ${s.kicker}`}>WHY SYSTEMS OUTPERFORM TRAINING</p>
            <h2 className={s.h2sm}>Awareness fades. Rhythm sticks.</h2>
          </div>
          <div className={s.grid3}>
            {CONTRAST.map((c) => (
              <div key={c.k} className={s.miniCard} style={{ padding: 26 }}>
                <p className={`${s.mono} ${s.cardKicker}`} style={{ marginTop: 0, color: "#4B7A2E" }}>{c.k}</p>
                <p className={s.cardText} style={{ marginTop: 12, fontSize: 16 }}>{c.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STABILITY MODEL FLOW */}
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.center}>
            <p className={`${s.mono} ${s.kicker}`}>THE BEHAVIORAL STABILITY MODEL</p>
            <h2 className={s.h2sm}>One chain, start to finish.</h2>
          </div>
          <div
            style={{
              marginTop: 40, display: "flex", alignItems: "stretch", justifyContent: "center",
              gap: 12, flexWrap: "wrap",
            }}
          >
            {FLOW.map((label, i) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div className={s.card} style={{ padding: "18px 22px", textAlign: "center", minWidth: 150 }}>
                  <span className={s.mono} style={{ fontSize: 11, letterSpacing: "0.16em", color: "#8A938D" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p style={{ margin: "8px 0 0", fontSize: 16, fontWeight: 800 }}>{label}</p>
                </div>
                {i < FLOW.length - 1 && (
                  <ArrowRight size={20} color="#B9C2BB" strokeWidth={2.2} style={{ flexShrink: 0 }} />
                )}
              </div>
            ))}
          </div>
          <p className={s.center} style={{ margin: "34px auto 0", maxWidth: 620, fontSize: 17, fontWeight: 700, color: "#2FA84A" }}>
            Stable behavior means a consistent experience on every deal, and that is what protects your
            gross, your CSI, and the repeat business that funds the store for years.
          </p>
        </div>
      </section>

      {/* IMPLEMENTATION */}
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.center}>
            <p className={`${s.mono} ${s.kicker}`}>HOW WE ROLL IT OUT</p>
            <h2 className={s.h2sm}>Live in about a week.</h2>
          </div>
          <div className={s.grid4}>
            {STEPS.map(([n, t, d]) => (
              <div key={n} className={s.miniCard} style={{ padding: 24 }}>
                <div
                  className={s.mono}
                  style={{ fontSize: 14, fontWeight: 600, color: "#CDE86B", background: "#0C1512", width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  {n}
                </div>
                <h3 className={s.miniTitle} style={{ fontSize: 20, marginTop: 18 }}>{t}</h3>
                <p className={s.miniText} style={{ fontSize: 15 }}>{d}</p>
              </div>
            ))}
          </div>
          <p className={s.center} style={{ margin: "34px auto 0", maxWidth: 560, fontSize: 15, color: "#6A736D" }}>
            Most stores see it in their CSI and gross within the first 90 days.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ paddingTop: 72 }}>
        <div className={s.container}>
          <div className={s.ctaBand}>
            <div className={s.ctaGlow} />
            <div className={s.ctaInner}>
              <div style={{ maxWidth: 620 }}>
                <h2 className={s.ctaTitle}>Make great CX your standard.</h2>
                <p className={s.ctaText}>
                  See the system in a live, no-login demo, or book a call and we will look at your store together.
                </p>
              </div>
              <div className={s.ctaBtns}>
                <a href={DEMO} {...ext} className={s.ctaBtnLime}>See a live demo</a>
                <a href={BOOK} {...ext} className={s.ctaBtnGhost}>Book a call</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: 20 }} />
      <SiteFooter />
    </div>
  );
}

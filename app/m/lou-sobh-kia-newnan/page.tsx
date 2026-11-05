import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { Manrope, JetBrains_Mono } from "next/font/google";
import { CopyField } from "./CopyField";
import { QrPoster } from "./QrPoster";

// Unlisted, link-only manager manual for Lou Sobh Kia Newnan. Self-contained: it brings
// its own fonts and styles and depends on nothing else in the app, so it can
// ship to main and deploy on its own. Noindex and not linked anywhere, so it is
// reachable only by its URL. The page carries no navigation or outbound links.
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "600", "700", "800"], display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["500", "700"], display: "swap" });

export const metadata: Metadata = {
  title: "AutoKnerd Manager Manual",
  description: "How managers onboard and run their team in AutoKnerd.",
  robots: { index: false, follow: false },
};

const JOIN_LINK = "https://autoknerdapp-production.up.railway.app/?enroll=LSKN";

const INK = "#0C1512";
const GREEN = "#2C5B12";
const BORDER = "#E7ECE5";
const MUTED = "#6A736D";
const PAPER = "#F5F7F3";

const monoFamily = mono.style.fontFamily;

const kicker: CSSProperties = {
  margin: 0,
  fontFamily: monoFamily,
  fontSize: 12,
  letterSpacing: "0.18em",
  color: GREEN,
  textTransform: "uppercase",
};

const h2: CSSProperties = { margin: "10px 0 0", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 800, letterSpacing: "-0.01em", color: INK };
const body: CSSProperties = { margin: "14px 0 0", fontSize: 16, lineHeight: 1.6, color: "#2C332E" };
const liStyle: CSSProperties = { marginBottom: 8, fontSize: 16, lineHeight: 1.55, color: "#2C332E" };
const th: CSSProperties = { textAlign: "left", padding: "12px 14px", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: MUTED, background: "#F0F3EC", borderBottom: `1px solid ${BORDER}`, fontFamily: monoFamily };
const td: CSSProperties = { padding: "13px 14px", fontSize: 15, lineHeight: 1.5, color: "#2C332E", borderBottom: `1px solid ${BORDER}`, verticalAlign: "top" };
const container: CSSProperties = { width: "100%", maxWidth: 820, margin: "0 auto", paddingInline: "clamp(18px, 5vw, 48px)", boxSizing: "border-box" };

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section style={{ paddingTop: "clamp(34px, 5vw, 52px)" }}>
      <p style={kicker}>{eyebrow}</p>
      <h2 style={h2}>{title}</h2>
      {children}
    </section>
  );
}

export default function LouSobhManualPage() {
  return (
    <div className={manrope.className} style={{ minHeight: "100vh", background: PAPER, color: INK, letterSpacing: "-0.01em", WebkitFontSmoothing: "antialiased" }}>
      {/* Brand band (no link) */}
      <div style={{ borderBottom: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.7)" }}>
        <div style={{ ...container, display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#9ED70A", boxShadow: "0 0 0 4px rgba(158,215,10,0.18)" }} />
            <span style={{ fontWeight: 800, fontSize: 19, color: INK }}>AutoKnerd</span>
          </div>
          <span style={{ ...kicker, fontSize: 11 }}>Manager Guide</span>
        </div>
      </div>

      <main style={{ ...container, paddingBottom: "clamp(48px, 8vw, 88px)" }}>
        {/* Hero */}
        <header style={{ paddingTop: "clamp(34px, 6vw, 56px)" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 999, background: "#FFFFFF", border: `1px solid ${BORDER}`, fontFamily: monoFamily, fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", color: "#4B7A2E" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#46D160" }} />LOU SOBH KIA NEWNAN &middot; 90-DAY PILOT
          </span>
          <h1 style={{ margin: "22px 0 0", fontSize: "clamp(32px, 5.5vw, 52px)", lineHeight: 1.03, fontWeight: 800, letterSpacing: "-0.03em", maxWidth: 720 }}>AutoKnerd Manager Manual</h1>
          <p style={{ margin: "22px 0 0", fontSize: "clamp(17px, 2.2vw, 20px)", lineHeight: 1.55, color: "#535D57", maxWidth: 640 }}>
            How to get your team onboarded and run them day to day in AutoKnerd. Your store is on a 90-day pilot.
          </p>
        </header>

        {/* Onboard */}
        <Section eyebrow="Start here" title="Onboard your team">
          <p style={body}>
            Everyone at Lou Sobh Kia Newnan joins with one link. Send it to your team and each person creates their own account,
            connected to your store automatically.
          </p>
          <div style={{ padding: "clamp(20px, 3vw, 28px)", marginTop: 18, border: "1px solid #CDE88A", borderRadius: 20, background: "linear-gradient(180deg,#FBFFEF,#F6FAED)" }}>
            <p style={{ ...kicker, color: GREEN }}>Your store join link</p>
            <CopyField value={JOIN_LINK} />
            <QrPoster />
            <p style={{ margin: "16px 0 0", fontSize: 15, lineHeight: 1.6, color: "#2C332E" }}>
              <strong>No app to download.</strong> AutoKnerd runs in a web browser on a phone or a computer. There is
              nothing to install, and it is not in the App Store or Google Play. After the first sign-up with this link,
              your team gets back in by going to <strong>autoknerd.com</strong> and tapping <strong>Log in</strong>. Tell
              them to bookmark it, or add it to their phone&apos;s home screen, so it is one tap every day.
            </p>
          </div>
          <p style={{ ...body, fontWeight: 700 }}>How it works</p>
          <ul style={{ margin: "8px 0 0", paddingLeft: 22 }}>
            <li style={liStyle}>The link opens a short sign-up with your dealer code (LSKN) already filled in.</li>
            <li style={liStyle}>Each person adds their name, work email, a password, and picks their role, then taps <strong>Create account</strong>.</li>
            <li style={liStyle}>They are active right away. There is no approval step.</li>
            <li style={liStyle}>Everyone who joins is part of the 90-day pilot.</li>
          </ul>
          <p style={{ ...body, fontWeight: 700 }}>Before you send it, tell your team</p>
          <ul style={{ margin: "8px 0 0", paddingLeft: 22 }}>
            <li style={liStyle}>Use this exact link. It carries your store code, so nobody types it in.</li>
            <li style={liStyle}>Pick the right role. Sales people choose <em>Sales Consultant</em>, managers pick their manager role, and service and parts pick theirs. Role decides what each person sees.</li>
            <li style={liStyle}>You and your other managers sign up with the same link and choose a manager role.</li>
            <li style={liStyle}>Want to look first without an account? Open autoknerd.com and tap <strong>Try the interactive demo</strong>.</li>
          </ul>
        </Section>

        {/* Dashboard */}
        <Section eyebrow="The screen" title="Your dashboard at a glance">
          <p style={body}>When you open AutoKnerd as a manager, your store home shows, top to bottom:</p>
          <ul style={{ margin: "8px 0 0", paddingLeft: 22 }}>
            <li style={liStyle}><strong>Team momentum:</strong> how much your team is practicing, versus last week.</li>
            <li style={liStyle}><strong>Biggest opportunity:</strong> the one thing most worth your attention this week, with a <strong>Build coaching plan</strong> button.</li>
            <li style={liStyle}><strong>This week&apos;s focus:</strong> the skill the week&apos;s training is leaning toward (you set it; see below).</li>
            <li style={liStyle}><strong>Team skills:</strong> your department&apos;s average across the core skills.</li>
            <li style={liStyle}><strong>Your team:</strong> your roster, sorted <em>needs help first</em>. Tap anyone to drill in.</li>
          </ul>
        </Section>

        {/* Focus */}
        <Section eyebrow="Steer the week" title="Set the week's focus">
          <p style={body}>Pick one skill and every rep&apos;s practice that week leans toward it, without you building a lesson plan.</p>
          <ul style={{ margin: "8px 0 0", paddingLeft: 22 }}>
            <li style={liStyle}>Department managers set the focus for their <strong>department</strong>.</li>
            <li style={liStyle}>Owners and General Managers can set it <strong>storewide</strong>, per store, or across <strong>all their stores</strong> at once.</li>
            <li style={liStyle}>The focus <strong>resets weekly</strong>, so revisit it at the start of each week.</li>
            <li style={liStyle}>Leave it unset and each rep still gets lessons aimed at their own weakest skill.</li>
          </ul>
        </Section>

        {/* Roster */}
        <Section eyebrow="Coach the right people" title="Your roster and each teammate">
          <p style={body}>
            Your team list is ordered <strong>needs help first</strong>, so the people to coach sit at the top. Each row
            shows the person&apos;s name, role, their watch area, and a skill score, with low scores flagged.
          </p>
          <p style={{ ...body, fontWeight: 700 }}>Tap a teammate to open their page, which shows:</p>
          <ul style={{ margin: "8px 0 0", paddingLeft: 22 }}>
            <li style={liStyle}><strong>Level, day streak, and momentum:</strong> how consistently they practice.</li>
            <li style={liStyle}><strong>Average skill:</strong> their overall score.</li>
            <li style={liStyle}><strong>Top skill and watch area:</strong> what they are strong at and what to coach.</li>
            <li style={liStyle}><strong>Skills:</strong> a bar for each core skill.</li>
            <li style={liStyle}><strong>Recent sessions:</strong> what they have practiced lately.</li>
          </ul>
          <p style={body}>That page is what you bring to a one-on-one.</p>
        </Section>

        {/* Coaching plan */}
        <Section eyebrow="Let the app plan it" title="Build a coaching plan">
          <p style={body}>
            From the <strong>Biggest opportunity</strong> card, tap <strong>Build coaching plan</strong>. AutoKnerd writes a
            plan aimed at where your team is stuck right now, so you can steer the week without prepping anything. Use it
            alongside the weekly focus and the needs-help-first roster to decide who gets a quick nudge and who gets a sit-down.
          </p>
        </Section>

        {/* Roles */}
        <Section eyebrow="Visibility" title="Roles and who sees what">
          <p style={body}>Everyone picks a role when they join. Role sets both the coaching a person gets and what they can see.</p>
          <div style={{ marginTop: 16, border: `1px solid ${BORDER}`, borderRadius: 14, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "#FFFFFF" }}>
              <thead>
                <tr><th style={th}>Role</th><th style={th}>What they see</th></tr>
              </thead>
              <tbody>
                <tr><td style={td}>Sales Consultant, BDC, Service Writer, Parts Consultant, Parts Advisor, Demo Specialist</td><td style={td}>Their own coaching only</td></tr>
                <tr><td style={td}>Sales Manager, Service Manager, Parts Manager, Finance Manager</td><td style={td}>Their own department&apos;s team</td></tr>
                <tr><td style={td}>General Manager, Owner</td><td style={td}>The whole store, and across multiple stores</td></tr>
                <tr><td style={{ ...td, borderBottom: "none" }}>Trainer</td><td style={{ ...td, borderBottom: "none" }}>Team coaching views</td></tr>
              </tbody>
            </table>
          </div>
          <p style={body}>If someone joined with the wrong role, get it corrected. A rep set as a manager would see more than they should.</p>
        </Section>

        {/* Reps */}
        <Section eyebrow="What they see" title="What your reps experience">
          <p style={body}>It helps to know what your people see, so you can point them to it:</p>
          <ul style={{ margin: "8px 0 0", paddingLeft: 22 }}>
            <li style={liStyle}><strong>A daily lesson</strong> aimed at their weakest skill: short, and tuned to their role.</li>
            <li style={liStyle}><strong>XP and streaks</strong> that reward showing up, so practice becomes a habit.</li>
            <li style={liStyle}><strong>Practice that feels like the floor:</strong> real conversations, not quizzes.</li>
          </ul>
          <p style={body}>Service and parts roles get the same engine tuned to their lane: the write-up, the MPI walk-through, and the pickup conversation.</p>
        </Section>

        {/* Daily use */}
        <Section eyebrow="Build the habit" title="Keep your team using it daily">
          <p style={body}>The app rewards showing up: XP, streaks, and a five-minute daily lesson. Your job is to make that daily. Here is what works on a busy floor:</p>
          <ul style={{ margin: "8px 0 0", paddingLeft: 22 }}>
            <li style={liStyle}><strong>Make it a ritual.</strong> The same five minutes every day, tied to something that already happens, like right before the morning huddle. Consistency is what builds the streak.</li>
            <li style={liStyle}><strong>Do it yourself, out loud.</strong> If you practice and mention a lesson on the floor or in a save, your team follows. Managers who use it get teams who use it.</li>
            <li style={liStyle}><strong>Protect the streak.</strong> Call out the longest streaks in your meeting. A visible streak is one of the strongest reasons people come back the next day.</li>
            <li style={liStyle}><strong>Coach from it, do not police it.</strong> Use the needs-help-first roster for a helpful one-on-one, not a &quot;why didn&apos;t you do your lesson&quot; callout. People stick with a tool that helps them.</li>
            <li style={liStyle}><strong>Reward practice, not just units.</strong> Shout out the biggest momentum gain of the week, not only the top closer. The app surfaces the growers a leaderboard misses.</li>
            <li style={liStyle}><strong>Keep it real.</strong> Remind them it is reps, not homework: short, and built around real floor conversations.</li>
          </ul>
        </Section>

        {/* Cost of not using */}
        <Section eyebrow="Why it matters" title="What you lose if they are not using it">
          <p style={body}>When the team stops practicing, it is not just a missed lesson. Here is what quietly slips:</p>
          <ul style={{ margin: "8px 0 0", paddingLeft: 22 }}>
            <li style={liStyle}><strong>Skills stop compounding.</strong> The daily lesson targets each rep&apos;s weakest skill. Skip it and the gap that is costing deals stays open.</li>
            <li style={liStyle}><strong>You lose your read on the floor.</strong> Momentum, skills, and the needs-help-first roster only reflect people who are practicing. Empty data means you are coaching blind.</li>
            <li style={liStyle}><strong>Coaching goes back to guesswork.</strong> No practice means no biggest opportunity and no AI coaching plan, so you are back to generic training that does not stick.</li>
            <li style={liStyle}><strong>Consistency drifts.</strong> The whole point is every rep handling the moment the same way. Without daily reps, behavior slides back to however each person feels that day.</li>
            <li style={liStyle}><strong>The pilot cannot prove itself.</strong> A 90-day pilot only shows a result if the team actually uses it. Low usage means no before-and-after story to justify keeping it.</li>
          </ul>
        </Section>

        {/* Keep it running */}
        <Section eyebrow="During the pilot" title="Keep it running">
          <ul style={{ margin: "14px 0 0", paddingLeft: 22 }}>
            <li style={liStyle}><strong>Pilot:</strong> Lou Sobh Kia Newnan is on a <strong>90-day pilot</strong>. Talk to your AutoKnerd contact about continuing before it ends so coaching does not pause.</li>
            <li style={liStyle}><strong>The AI:</strong> the lessons, insights, and coaching plans are AI-generated. If the AI service is ever interrupted, the app automatically falls back to standard content. Reps will not see errors, but the experience is richer when the AI is running.</li>
            <li style={liStyle}><strong>Watch for it:</strong> if the coaching suddenly feels generic across the whole team, that is the sign the AI needs attention. Flag it so it can be checked.</li>
          </ul>
        </Section>

        {/* Troubleshooting */}
        <Section eyebrow="If something is off" title="Troubleshooting">
          <div style={{ marginTop: 16, border: `1px solid ${BORDER}`, borderRadius: 14, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "#FFFFFF" }}>
              <thead>
                <tr><th style={th}>Question</th><th style={th}>What to do</th></tr>
              </thead>
              <tbody>
                <tr><td style={td}>A rep joined but I do not see them</td><td style={td}>Refresh your dashboard. The roster loads when you open it. Confirm they used your join link.</td></tr>
                <tr><td style={td}>A rep gets the wrong coaching</td><td style={td}>They likely picked the wrong role at signup. Get their role corrected.</td></tr>
                <tr><td style={td}>The link says &quot;Dealer code not found&quot;</td><td style={td}>The code was mistyped or changed. Re-send the Lou Sobh join link above, or copy it fresh from your store screen.</td></tr>
                <tr><td style={td}>Coaching feels generic for everyone</td><td style={td}>The AI may be interrupted. Flag it so the connection can be checked.</td></tr>
                <tr><td style={{ ...td, borderBottom: "none" }}>Someone wants to try it first</td><td style={{ ...td, borderBottom: "none" }}>Point them to autoknerd.com and the <strong>Try the interactive demo</strong> option. No account needed.</td></tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* Direct contact */}
        <Section eyebrow="Help" title="Questions? Reach me directly">
          <div style={{ padding: "clamp(20px, 3vw, 28px)", marginTop: 16, border: "1px solid #CDE88A", borderRadius: 20, background: "linear-gradient(180deg,#FBFFEF,#F6FAED)" }}>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "#2C332E" }}>
              Stuck on anything, or want a hand getting your team rolling? Email me directly at{" "}
              <a href="mailto:andrew@autoknerd.com" style={{ color: GREEN, fontWeight: 700, textDecoration: "underline" }}>andrew@autoknerd.com</a>.
              I make myself available to every pilot store, so do not hesitate.
            </p>
            <p style={{ margin: "10px 0 0", fontSize: 14, lineHeight: 1.55, color: MUTED }}>&mdash; Andrew Sardone, AutoKnerd</p>
          </div>
        </Section>

        <p style={{ marginTop: "clamp(40px, 6vw, 64px)", paddingTop: 20, borderTop: `1px solid ${BORDER}`, fontSize: 13, color: MUTED }}>
          AutoKnerd &middot; Manager guide for Lou Sobh Kia Newnan &middot; 90-day pilot &middot; Questions? andrew@autoknerd.com
        </p>
      </main>
    </div>
  );
}

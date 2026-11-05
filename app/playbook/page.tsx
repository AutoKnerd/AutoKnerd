import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/app/components/SiteNav";
import { SiteFooter } from "@/app/components/SiteFooter";
import s from "@/app/components/site.module.css";
import { BOOK, ext } from "@/app/lib/links";
import { Headphones, FileText, Wrench, ArrowRight, Check, Play } from "lucide-react";

export const metadata: Metadata = {
  title: "Be Back Isn’t a Lost Sale · AutoKnerd Playbook",
  description:
    "“We’ll be back” is rarely a no. Read the 3-minute playbook, listen to the episode, and grab the Be-Back Decoder tool, then run the sales-meeting exercise Monday.",
};

const AUDIO = "https://mcdn.podbean.com/mf/web/cyfypesaxmndvjb4/AutoKnerd-Be-Back-Final-2026-10-22-Podbean.mp3";

const MOVES = [
  ["Lower the pressure on purpose", "“Totally fair. This is a big decision.” You’re not closing; you’re making it safe for them to tell you the truth about what’s holding them back."],
  ["Find the one unanswered question", "Before they leave, ask: “If everything lined up, what’s the one thing you’d still want to feel sure about?” That answer is your follow-up."],
  ["Earn the right to follow up", "Trade contact for a reason: “Can I send you that by tomorrow?” Now the next touch is useful, not needy, and they’re expecting it."],
  ["Follow up with value, on a schedule", "Not “just checking in.” Send the thing you promised at 30 hours, a useful nudge at 90, a genuine check at 180. That’s the 30-90-180 map."],
];

const DECODER = [
  ["“We’ve got a few other places to look.”", "They’re comparing, not leaving. Give them a reason you’re the easy yes."],
  ["“We need to think about it.”", "Something’s unresolved. Find the one question before they walk."],
  ["“We’ll talk it over at home.”", "There’s a second decision-maker. Arm your buyer to sell it for you."],
];

export default function PlaybookPrototype() {
  return (
    <div className={s.page}>
      <SiteNav />

      {/* HERO */}
      <header className={s.hero} style={{ paddingBottom: 0 }}>
        <div className={s.container} style={{ maxWidth: 820 }}>
          <span className={`${s.eyebrow} ${s.mono}`}>
            <span className={s.dot} />FOLLOW-UP · EPISODE 85
          </span>
          <h1 className={s.h1} style={{ maxWidth: 760 }}>
            “We’ll be back” isn’t a <span className={s.grad}>lost sale.</span>
          </h1>
          <p className={s.lead} style={{ maxWidth: 640 }}>
            What your salesperson says in the next ten seconds decides whether that customer ever comes
            back. Here’s the read, the episode, and the tool. Pick your lane.
          </p>

          {/* FORMAT BAR: pick your intent */}
          <div className={s.chips} style={{ marginTop: 26 }}>
            <a href="#listen" className={s.chip}><Headphones size={15} />&nbsp; Listen · 24 min</a>
            <a href="#read" className={s.chip}><FileText size={15} />&nbsp; Read · 3 min</a>
            <a href="#tool" className={s.chip}><Wrench size={15} />&nbsp; Get the tool</a>
          </div>
        </div>
      </header>

      {/* LISTEN */}
      <section id="listen" className={s.section} style={{ paddingTop: "clamp(32px, 5vw, 48px)" }}>
        <div className={s.container} style={{ maxWidth: 820 }}>
          <div className={s.card} style={{ padding: "clamp(20px, 3vw, 28px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
              <span style={{ width: 44, height: 44, borderRadius: 12, background: "#F0F3EC", display: "grid", placeItems: "center", color: "#5E8A00", flex: "0 0 44px" }}><Play size={20} /></span>
              <div>
                <p className={`${s.mono}`} style={{ margin: 0, fontSize: 11, letterSpacing: "0.14em", color: "#8A938D" }}>LISTEN TO THE EPISODE</p>
                <p style={{ margin: "3px 0 0", fontWeight: 800, fontSize: 16 }}>Be Back Isn’t a Lost Sale</p>
              </div>
            </div>
            <div style={{ borderRadius: 14, border: "1px solid #E7ECE5", background: "#F7F9F5", padding: 12 }}>
              <audio controls style={{ width: "100%" }}>
                <source src={AUDIO} />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        </div>
      </section>

      {/* READ: the playbook */}
      <article id="read" className={s.section} style={{ paddingTop: "clamp(40px, 6vw, 56px)" }}>
        <div className={s.container} style={{ maxWidth: 720 }}>
          <p className={`${s.mono} ${s.kicker}`}>THE PLAYBOOK</p>

          <div style={{ fontSize: 18, lineHeight: 1.72, color: "#2C332E", marginTop: 18 }}>
            <p style={{ marginTop: 0 }}>
              Every manager has watched it happen. A good appointment, a decent demo, and then at the desk:
              <em> “We’ve got a couple other places to look. We’ll be back.”</em> Most salespeople hear “no.”
              They deflate, hand over a card, and hope. The ones who actually close them later do three things
              differently.
            </p>

            <h2 style={{ fontSize: 24, fontWeight: 800, margin: "34px 0 10px", letterSpacing: "-0.01em" }}>The moment</h2>
            <p style={{ margin: 0 }}>
              “We’ll be back” is rarely a decision. It’s a <strong>feeling</strong>. The customer isn’t sure
              yet, and walking out feels safer than committing. Pressure in that moment confirms their fear.
              Curiosity disarms it.
            </p>

            <h2 style={{ fontSize: 24, fontWeight: 800, margin: "34px 0 10px", letterSpacing: "-0.01em" }}>Why most stores lose it here</h2>
            <ul style={{ margin: 0, paddingLeft: 22 }}>
              <li style={{ marginBottom: 8 }}>They treat the exit as the end, not the start of the follow-up.</li>
              <li style={{ marginBottom: 8 }}>They ask nothing before the goodbye, so they have no reason to call that earns a reply.</li>
              <li>Their follow-up is “just checking in,” which is about the salesperson, not the customer.</li>
            </ul>

            <h2 style={{ fontSize: 24, fontWeight: 800, margin: "34px 0 16px", letterSpacing: "-0.01em" }}>What to do instead</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {MOVES.map(([t, d], i) => (
                <div key={t} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ flex: "0 0 30px", height: 30, borderRadius: 9, background: "#DFF29A", color: "#2C332E", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 14 }}>{i + 1}</span>
                  <p style={{ margin: 0 }}><strong>{t}.</strong> {d}</p>
                </div>
              ))}
            </div>

            <blockquote style={{ margin: "34px 0 0", padding: "20px 24px", borderLeft: "3px solid #9ED70A", background: "#F7F9F5", borderRadius: "0 14px 14px 0", fontSize: 20, fontWeight: 700, lineHeight: 1.45, color: "#1E241F" }}>
              A “be back” you prepared for is a lead. A “be back” you hoped for is a goodbye.
            </blockquote>
          </div>
        </div>
      </article>

      {/* TOOL */}
      <section id="tool" className={s.section} style={{ paddingTop: "clamp(40px, 6vw, 56px)" }}>
        <div className={s.container} style={{ maxWidth: 820 }}>
          <div className={s.card} style={{ padding: "clamp(24px, 3vw, 34px)", border: "1px solid #CDE88A", background: "linear-gradient(180deg,#FBFFEF,#F6FAED)" }}>
            <p className={`${s.mono}`} style={{ margin: 0, fontSize: 11, letterSpacing: "0.16em", color: "#5E8A00" }}>PUT IT TO WORK · FREE TOOL</p>
            <h2 className={s.h2sm} style={{ margin: "10px 0 0", fontSize: "clamp(22px, 3vw, 30px)" }}>The Be-Back Decoder</h2>
            <p className={s.cardText} style={{ fontSize: 16, marginTop: 10, maxWidth: 560 }}>
              Six things customers say on the way out, what each one usually means, and the exact next line,
              plus the 30-90-180 Follow-Up Map so no lead goes cold.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "18px 0 22px" }}>
              {DECODER.map(([line, mean]) => (
                <div key={line} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "#FFFFFF", border: "1px solid #E7ECE5", borderRadius: 12, padding: "12px 14px" }}>
                  <Check size={16} strokeWidth={2.6} style={{ color: "#5E8A00", marginTop: 3, flex: "0 0 16px" }} />
                  <p style={{ margin: 0, fontSize: 15 }}><strong>{line}</strong> <span style={{ color: "#5B655F" }}>{mean}</span></p>
                </div>
              ))}
              <p style={{ margin: 0, fontSize: 13, color: "#8A938D" }}>…plus 3 more lines + the full follow-up cadence in the tool.</p>
            </div>

            <a href={BOOK} {...ext} className={s.btnPrimary} style={{ height: 50, fontSize: 15 }}>
              Get the free tool <ArrowRight size={16} strokeWidth={2.4} />
            </a>
          </div>
        </div>
      </section>

      {/* RUN IT MONDAY */}
      <section className={s.section} style={{ paddingTop: "clamp(40px, 6vw, 56px)" }}>
        <div className={s.container} style={{ maxWidth: 820 }}>
          <div className={s.card} style={{ padding: "clamp(22px, 3vw, 30px)" }}>
            <p className={`${s.mono} ${s.kicker}`}>RUN IT AT YOUR NEXT SALES MEETING</p>
            <p className={s.cardText} style={{ fontSize: 16, marginTop: 12 }}>
              15 minutes: read the six exit lines aloud, have the team call out what each one really means, and
              role-play the next line. Then the homework: everyone brings one real “be back” from last week and
              the follow-up they’ll actually send.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={s.section} style={{ paddingTop: "clamp(40px, 6vw, 56px)", paddingBottom: "clamp(56px, 8vw, 88px)" }}>
        <div className={s.container} style={{ maxWidth: 820 }}>
          <div className={s.card} style={{ padding: "clamp(28px, 4vw, 44px)", textAlign: "center" }}>
            <h2 className={s.h2sm} style={{ margin: 0 }}>Make this behavior consistent, not just hoped for.</h2>
            <p className={s.cardText} style={{ fontSize: 16, margin: "12px auto 22px", maxWidth: 520 }}>
              AutoKnerd turns moves like these into five minutes of daily practice, so every rep handles the
              “be back” the same way. See it in your store with a 90-day pilot.
            </p>
            <Link href="/pilot" className={s.btnPrimary} style={{ height: 50, fontSize: 15 }}>
              See the 90-day pilot <ArrowRight size={16} strokeWidth={2.4} />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

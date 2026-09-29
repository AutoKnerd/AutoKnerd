import type { Metadata } from "next";
import { SiteNav } from "@/app/components/SiteNav";
import { SiteFooter } from "@/app/components/SiteFooter";
import s from "@/app/components/site.module.css";
import { BOOK, ext } from "@/app/lib/links";
import { Calendar, Mail, Check, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact · AutoKnerd",
  description:
    "Talk to AutoKnerd about your store. Book a 30-minute strategy call to see where dealership CX execution is slipping and where your managers should coach.",
};

const WHO = [
  "Tired of inconsistent numbers from one rep to the next",
  "Done with once-a-year training that fades by Monday",
  "Want to see exactly where to coach, week by week",
  "Ready to make great CX the standard on every deal",
];

const TOPICS = [
  "Where you are losing gross and CSI today",
  "What your managers can coach this week",
  "How AutoKnerd runs alongside your CRM",
];

export default function ContactPage() {
  return (
    <div className={s.page}>
      <SiteNav />

      {/* HERO */}
      <header className={s.hero}>
        <div className={s.container}>
          <span className={`${s.eyebrow} ${s.mono}`}>
            <span className={s.dot} />TALK TO AUTOKNERD
          </span>
          <h1 className={s.h1} style={{ maxWidth: 780 }}>
            Let&apos;s look at your store <span className={s.grad}>together.</span>
          </h1>
          <p className={s.lead}>
            It starts with one honest conversation about where your team is losing deals, gross, and CSI,
            on the sales floor and the service drive. No pitch, no obligation.
          </p>
        </div>
      </header>

      {/* BODY */}
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.grid2} style={{ alignItems: "flex-start" }}>
            {/* Left — who we work with */}
            <div>
              <p className={`${s.mono} ${s.kicker}`}>WHO WE WORK WITH</p>
              <h2 className={s.h2sm} style={{ maxWidth: 420 }}>
                Built for the people who run the store.
              </h2>
              <p className={s.sectionSubLeft} style={{ maxWidth: 470 }}>
                We work best with dealer principals, general managers, and group executives who believe
                caring for the customer and making money are the same job, not opposites, and want a clear,
                data-driven way to prove it on the floor.
              </p>
              <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 14 }}>
                {WHO.map((t) => (
                  <div key={t} className={s.fitItem} style={{ fontSize: 15 }}>
                    <Check size={20} color="#2FA84A" strokeWidth={2.2} />
                    {t}
                  </div>
                ))}
              </div>

              <div className={s.card} style={{ marginTop: 34 }}>
                <div className={s.cardIcon} style={{ background: "rgba(12,21,18,0.06)" }}>
                  <Mail size={22} color="#0C1512" strokeWidth={1.9} />
                </div>
                <h3 className={s.cardTitle} style={{ fontSize: 20, marginTop: 16 }}>General inquiry</h3>
                <p className={s.cardText}>For press, speaking, or anything else:</p>
                <a href="mailto:systems@autoknerd.com" className={s.textLink} style={{ marginTop: 12 }}>
                  systems@autoknerd.com <ArrowRight size={16} strokeWidth={2.2} />
                </a>
              </div>
            </div>

            {/* Right — strategy call panel */}
            <div className={s.ctaBand} style={{ padding: "clamp(28px, 4vw, 44px)" }}>
              <div className={s.ctaGlow} />
              <div style={{ position: "relative" }}>
                <p
                  className={s.mono}
                  style={{ margin: 0, display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, letterSpacing: "0.2em", color: "#8CFF57" }}
                >
                  <Calendar size={15} /> THE STRATEGY CALL
                </p>
                <h2 className={s.ctaTitle} style={{ marginTop: 18, fontSize: "clamp(26px, 3.4vw, 34px)" }}>
                  Move past the symptoms. Read the floor.
                </h2>
                <p className={s.ctaText}>
                  In about 30 minutes we will figure out whether AutoKnerd fits your store, no pitch, just a
                  straight read on where execution is slipping and what it is costing you.
                </p>
                <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 14 }}>
                  {TOPICS.map((t) => (
                    <div key={t} style={{ display: "flex", alignItems: "center", gap: 12, color: "#EAF6F7", fontSize: 15 }}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#CCFF00", flexShrink: 0 }} />
                      {t}
                    </div>
                  ))}
                </div>
                <a href={BOOK} {...ext} className={s.ctaBtnLime} style={{ marginTop: 30, width: "100%" }}>
                  Book the call <ArrowRight size={18} strokeWidth={2.2} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: 40 }} />
      <SiteFooter />
    </div>
  );
}

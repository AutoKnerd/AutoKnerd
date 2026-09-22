import {
  Gauge, Target, Package, Shield, MessagesSquare, TrendingDown, Database,
  ShieldCheck, DollarSign, TrendingUp, RefreshCw, Check, Play, ArrowRight, X,
} from "lucide-react";
import styles from "./site.module.css";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { DEMO, BOOK, ext } from "@/app/lib/links";

export function HomeRedesign() {
  return (
    <div className={styles.page}>
      <SiteNav />

      {/* HERO */}
      <header className={styles.hero}>
        <div className={styles.container}>
          <span className={`${styles.eyebrow} ${styles.mono}`}>
            <span className={styles.dot} />DEALERSHIP CX, MADE CONSISTENT
          </span>
          <h1 className={styles.h1}>
            Make every customer feel your <span className={styles.grad}>best team.</span>
          </h1>
          <p className={styles.lead}>
            AutoKnerd pinpoints the one behavior holding each salesperson and advisor back, turns it into
            short weekly practice they will actually do, and shows managers exactly where to coach, across
            the sales floor and the service drive.
          </p>
          <div className={styles.heroCtas}>
            <a href={DEMO} {...ext} className={styles.btnPrimary}>
              See a live demo <Play size={18} fill="#0C1512" strokeWidth={0} />
            </a>
            <a href={BOOK} {...ext} className={styles.btnDark}>Book a call</a>
          </div>
          <div className={styles.trust}>
            <Check size={16} color="#46D160" strokeWidth={2.4} />
            Built from real dealership behavior, not theory.
          </div>
        </div>
      </header>

      {/* DARK PRODUCT PANEL */}
      <section className={styles.panelWrap}>
        <div className={styles.container}>
          <div className={styles.panel}>
            <div className={styles.panelGlow} />
            <div className={styles.panelTop}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span className={styles.mono} style={{ fontSize: 12, letterSpacing: "0.2em", color: "#8CFF57" }}>HOME</span>
                <div className={styles.chips}>
                  <span className={`${styles.chip} ${styles.chipOn}`}>OWNER</span>
                  <span className={styles.chip}>GM</span>
                  <span className={styles.chip}>SALES</span>
                  <span className={styles.chip}>SERVICE</span>
                </div>
              </div>
              <div><span className={styles.lvl}>LVL 9</span> <span className={styles.xp}>8,940 XP</span></div>
            </div>
            <div className={styles.panelBody}>
              <div className={styles.panelMain}>
                <div className={styles.bar}><div className={styles.barFill} style={{ width: "72%" }} /></div>
                <p className={`${styles.mono} ${styles.focusKicker}`}>TODAY&apos;S FOCUS</p>
                <h3 className={styles.focusTitle}>Product Knowledge</h3>
                <p className={styles.focusText}>Explain the product clearly and tie details to real value. This week: warmer openings, friendlier first impression.</p>
                <div className={styles.startBtn}>START SESSION <Play size={16} fill="#0C1512" strokeWidth={0} /></div>
              </div>
              <div className={styles.panelSide}>
                <div className={styles.sideCard}>
                  <p className={`${styles.mono} ${styles.sideKicker}`}>ALL STORES CX</p>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 10, marginTop: 6 }}>
                    <span className={styles.sideBig}>75%</span>
                    <span className={styles.up} style={{ marginBottom: 12 }}>▲ +4%</span>
                  </div>
                </div>
                <div className={`${styles.sideCard} ${styles.sideCardCyan}`}>
                  <p className={styles.mono} style={{ margin: 0, fontSize: 11, letterSpacing: "0.16em", color: "#06EBF7" }}>WEAKEST SIGNAL</p>
                  <p style={{ margin: "8px 0 0", fontSize: 20, fontWeight: 700, color: "#EAF6F7" }}>Active listening</p>
                  <p style={{ margin: "6px 0 0", fontSize: 13, color: "#8FB6BA" }}>Coach this on the floor this week.</p>
                </div>
              </div>
            </div>
          </div>
          <p className={styles.panelCaption}>This is what your reps open every day. It plays like a game, so they keep coming back, and that is what turns coaching into consistency.</p>
        </div>
      </section>

      {/* PROOF */}
      <section>
        <div className={styles.container}>
          <div className={styles.proof}>
            <span className={styles.proofItem}><Check size={17} color="#46D160" strokeWidth={2.3} />Sales floor and service drive</span>
            <span className={styles.proofDot} />
            <span className={styles.proofItem}><Check size={17} color="#46D160" strokeWidth={2.3} />Weekly cadence, not once a year</span>
            <span className={styles.proofDot} />
            <span className={styles.proofItem}><Check size={17} color="#46D160" strokeWidth={2.3} />No app for your team to download</span>
          </div>
        </div>
      </section>

      {/* PODCAST */}
      <section>
        <div className={styles.container}>
          <div className={styles.podcast}>
            <span className={styles.podIcon}><Play size={14} fill="#CCFF00" strokeWidth={0} /></span>
            <span className={styles.podText}>Real conversations with the people who run stores, on the <a href="/podcast">AutoKnerd podcast</a>.</span>
          </div>
        </div>
      </section>

      {/* ONE SYSTEM */}
      <section id="system" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.center}>
            <p className={`${styles.mono} ${styles.kicker}`}>ONE SYSTEM</p>
            <h2 className={styles.h2}>Showroom to service drive.</h2>
            <p className={styles.sectionSub}>Three connected steps. Start where you are, scale as your store grows.</p>
          </div>
          <div className={styles.grid3}>
            <div className={styles.card}>
              <div className={styles.cardIcon} style={{ background: "rgba(6,182,212,0.12)" }}><Gauge size={22} color="#0891B2" strokeWidth={1.9} /></div>
              <p className={`${styles.mono} ${styles.cardKicker}`}>STEP ONE · DIAGNOSE</p>
              <h3 className={styles.cardTitle}>See what is really costing you</h3>
              <p className={styles.cardText}>Baseline every team&apos;s CX behavior and surface the friction hiding in the day to day.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon} style={{ background: "rgba(70,209,96,0.14)" }}><Target size={22} color="#2FA84A" strokeWidth={1.9} /></div>
              <p className={`${styles.mono} ${styles.cardKicker}`}>STEP TWO · COACH</p>
              <h3 className={styles.cardTitle}>Steer the week in one tap</h3>
              <p className={styles.cardText}>Managers set a light weekly tune; every rep gets a daily rep on their weakest habit, no lesson-building.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon} style={{ background: "rgba(160,214,0,0.18)" }}><Package size={22} color="#6E9400" strokeWidth={1.9} /></div>
              <p className={`${styles.mono} ${styles.cardKicker}`}>STEP THREE · DEPLOY</p>
              <h3 className={styles.cardTitle}>Make it stick on the floor</h3>
              <p className={styles.cardText}>Turn good intentions into visible standards your team hits on every single customer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* OWNER CLARITY */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.split}>
            <div className={styles.splitCopy}>
              <p className={`${styles.mono} ${styles.kicker}`}>MANAGER CLARITY</p>
              <h2 className={styles.h2sm} style={{ maxWidth: 480 }}>Know exactly where to coach, before the numbers slip.</h2>
              <p className={styles.sectionSubLeft} style={{ maxWidth: 470 }}>AutoKnerd shows owners and GMs which behaviors are strong, which are quietly costing consistency, and where each manager should spend their week, store by store.</p>
              <p className={styles.lowLift}>About 5 minutes a week from your managers. The system does the coaching.</p>
              <a href={DEMO} {...ext} className={styles.textLink}>View the clarity panel <ArrowRight size={16} strokeWidth={2.2} /></a>
            </div>
            <div className={styles.ownerPanel}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span className={styles.mono} style={{ fontSize: 11, letterSpacing: "0.2em", color: "#06EBF7" }}>OWNER VIEW</span>
                <span className={styles.mono} style={{ fontSize: 11, letterSpacing: "0.16em", color: "#6D766F" }}>THIS WEEK</span>
              </div>
              <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 12 }}>
                <div className={styles.ownerRow}>
                  <div><p className={styles.mono} style={{ margin: 0, fontSize: 10, letterSpacing: "0.14em", color: "#7B857E" }}>WEAKEST SIGNAL</p><p style={{ margin: "5px 0 0", fontSize: 18, fontWeight: 700, color: "#F4F7F4" }}>Pacing</p></div>
                  <span className={styles.tagRed}>Needs focus</span>
                </div>
                <div className={`${styles.ownerRow} ${styles.ownerRowCyan}`}>
                  <div><p className={styles.mono} style={{ margin: 0, fontSize: 10, letterSpacing: "0.14em", color: "#06EBF7" }}>MANAGER FOCUS</p><p style={{ margin: "5px 0 0", fontSize: 18, fontWeight: 700, color: "#EAF6F7" }}>Active listening</p></div>
                  <span className={styles.tagCyan}>Coach now</span>
                </div>
                <div className={styles.ownerRow} style={{ display: "block" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}><span className={styles.mono} style={{ fontSize: 10, letterSpacing: "0.14em", color: "#7B857E" }}>NETWORK AVG</span><span style={{ fontSize: 15, fontWeight: 800, color: "#F4F7F4" }}>61%</span></div>
                  <div style={{ marginTop: 10, height: 6, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}><div style={{ width: "61%", height: "100%", background: "linear-gradient(90deg,#06EBF7,#46D160)" }} /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER NOTE */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.founderCard}>
            <img src="/founder-sardone.webp" alt="Andrew Sardone, founder of AutoKnerd, in the showroom" className={styles.founderImg} />
            <div className={styles.founderBody}>
              <p className={`${styles.mono} ${styles.kicker}`}>WHY I BUILT AUTOKNERD</p>
              <p className={styles.founderQuote}>I built AutoKnerd because the industry is finally demanding a great experience for every customer. After years on the showroom floor, I know being nice is not the same as losing money. Being nice means lowering a customer&apos;s anxiety and lifting their motivation to buy. When people feel heard, everything gets better: gross goes up, and happy customers come back to fuel the store through service for years. Customers don&apos;t want to be sold. They want to happily buy, and hand you a great survey while they do it.</p>
              <p className={styles.founderSecond}>Great CX touches everything, and the stores with the best of it win. We built the tools to make that your standard, every rep, every time. We proved it on a real floor with our first pilot store, and now we&apos;re opening it to a small group of founding dealers.</p>
              <div className={styles.founderSig}>
                <div><p className={styles.founderName}>Andrew Sardone</p><p className={styles.founderRole}>Founder · AutoKnerd</p></div>
                <span className={styles.tagFound}>Founding dealers · onboarding now</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.h2sm} style={{ maxWidth: 640 }}>It is not a motivation problem. It is a <span style={{ color: "#2FA84A" }}>consistency</span> problem.</h2>
          <p className={styles.sectionSubLeft}>Your team does not lack drive. They lack the infrastructure to sound like your best rep on every touchpoint.</p>
          <div className={styles.grid4}>
            <div className={styles.miniCard}><Shield size={24} color="#0C1512" strokeWidth={1.8} /><h4 className={styles.miniTitle}>Customers feel guarded</h4><p className={styles.miniText}>Low transparency creates friction the moment price comes up.</p></div>
            <div className={styles.miniCard}><MessagesSquare size={24} color="#0C1512" strokeWidth={1.8} /><h4 className={styles.miniTitle}>Reps sound different</h4><p className={styles.miniText}>Message drift from one consultant to the next dilutes trust.</p></div>
            <div className={styles.miniCard}><TrendingDown size={24} color="#0C1512" strokeWidth={1.8} /><h4 className={styles.miniTitle}>Coaching is reactive</h4><p className={styles.miniText}>Managers chase missed quotas instead of correcting patterns early.</p></div>
            <div className={styles.miniCard}><Database size={24} color="#0C1512" strokeWidth={1.8} /><h4 className={styles.miniTitle}>Data sits siloed</h4><p className={styles.miniText}>Insights trapped in legacy tools with nothing actionable coming out.</p></div>
          </div>
        </div>
      </section>

      {/* COST */}
      <section style={{ paddingTop: 56 }}>
        <div className={styles.container}>
          <div className={styles.costBand}>
            <p className={`${styles.mono} ${styles.costKicker}`}>THE COST OF INCONSISTENCY</p>
            <h2 className={styles.h2sm}>Every soft interaction has a price.</h2>
            <div className={styles.costGrid}>
              <div><p className={styles.costTitle}>Gross given away</p><p className={styles.costText}>Reps who skip the process discount to close instead of holding margin.</p></div>
              <div><p className={styles.costTitle}>CSI that costs OEM money</p><p className={styles.costText}>One guarded survey drags the score that ties to your factory incentives.</p></div>
              <div><p className={styles.costTitle}>One-and-done customers</p><p className={styles.costText}>A cold first visit is a lost decade of service and repeat sales.</p></div>
            </div>
            <p className={styles.costBridge}>AutoKnerd closes the gap before it reaches your numbers.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.center}>
            <p className={`${styles.mono} ${styles.kicker}`}>HOW IT WORKS</p>
            <h2 className={styles.h2sm}>Diagnose. Coach. Execute.</h2>
          </div>
          <div className={styles.grid3}>
            {[
              ["01", "Audit the workflow", "We read how your team actually runs the floor and the drive, and find the gaps."],
              ["02", "Recalibrate behavior", "Each rep’s weekly practice targets the one habit moving their numbers."],
              ["03", "Lock it in", "Those wins become standards your store hits the same way every time."],
            ].map(([n, t, d]) => (
              <div key={n} style={{ padding: "8px 6px" }}>
                <div className={styles.mono} style={{ fontSize: 14, fontWeight: 600, color: "#CDE86B", background: "#0C1512", width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>{n}</div>
                <h3 style={{ margin: "18px 0 0", fontSize: 22, fontWeight: 800 }}>{t}</h3>
                <p style={{ margin: "10px 0 0", fontSize: 15, lineHeight: 1.55, color: "#5B655F" }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY DIFFERENT */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.center}>
            <p className={`${styles.mono} ${styles.kicker}`}>WHY IT&apos;S DIFFERENT</p>
            <h2 className={styles.h2sm}>Not another seminar your team forgets by Monday.</h2>
            <p className={styles.sectionSub} style={{ maxWidth: 580 }}>You already invest in training. AutoKnerd is what makes it stick the other 51 weeks of the year.</p>
          </div>
          <div className={styles.grid2}>
            <div className={`${styles.compareCard} ${styles.compareUsual}`}>
              <p className={styles.compareLabel} style={{ color: "#9AA39D" }}>The usual training</p>
              <div className={styles.compareList}>
                {["One big event, then back to normal", "Same lesson for the whole room", "You hope it sticks", "No line of sight for managers"].map((t) => (
                  <div key={t} className={styles.compareItem} style={{ color: "#6A736D" }}><X size={20} color="#B9BFB9" strokeWidth={2} />{t}</div>
                ))}
              </div>
            </div>
            <div className={`${styles.compareCard} ${styles.compareAk}`}>
              <p className={styles.compareLabel} style={{ color: "#5E8A00" }}>With AutoKnerd</p>
              <div className={styles.compareList}>
                {["Five focused minutes, every week", "Aimed at each rep’s weak spot", "Reps actually do it, it’s a game", "Managers see exactly where to coach"].map((t) => (
                  <div key={t} className={styles.compareItem} style={{ fontWeight: 600, color: "#1A2420" }}><Check size={20} color="#2FA84A" strokeWidth={2.2} />{t}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.center}>
            <p className={`${styles.mono} ${styles.kicker}`}>WHERE IT SHOWS UP</p>
            <h2 className={styles.h2sm}>In your numbers, not a binder.</h2>
          </div>
          <div className={styles.grid4}>
            <div className={styles.miniCard} style={{ padding: 24 }}><ShieldCheck size={24} color="#2FA84A" strokeWidth={1.9} /><h4 className={styles.miniTitle} style={{ fontSize: 18 }}>Protect your CSI</h4><p className={styles.miniText}>Consistent, transparent interactions keep survey scores, and your OEM money, where they belong.</p></div>
            <div className={styles.miniCard} style={{ padding: 24 }}><DollarSign size={24} color="#2FA84A" strokeWidth={1.9} /><h4 className={styles.miniTitle} style={{ fontSize: 18 }}>Hold more gross</h4><p className={styles.miniText}>Reps who follow the process stop giving margin away just to close the deal.</p></div>
            <div className={styles.miniCard} style={{ padding: 24 }}><TrendingUp size={24} color="#2FA84A" strokeWidth={1.9} /><h4 className={styles.miniTitle} style={{ fontSize: 18 }}>Higher closing ratio</h4><p className={styles.miniText}>Turn more ups and be-backs into delivered units.</p></div>
            <div className={styles.miniCard} style={{ padding: 24 }}><RefreshCw size={24} color="#2FA84A" strokeWidth={1.9} /><h4 className={styles.miniTitle} style={{ fontSize: 18 }}>Customers who come back</h4><p className={styles.miniText}>Trust on the first visit drives service retention and repeat sales.</p></div>
          </div>
        </div>
      </section>

      {/* FIT */}
      <section style={{ paddingTop: 80 }}>
        <div className={styles.container}>
          <div className={styles.fitBand}>
            {["Franchise or independent", "Sales floor and fixed ops", "Live in about a week", "Runs alongside your CRM"].map((t) => (
              <div key={t} className={styles.fitItem}><Check size={22} color="#2FA84A" strokeWidth={2.2} />{t}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ paddingTop: 64 }}>
        <div className={styles.container}>
          <div className={styles.ctaBand}>
            <div className={styles.ctaGlow} />
            <div className={styles.ctaInner}>
              <div style={{ maxWidth: 620 }}>
                <h2 className={styles.ctaTitle}>See where execution is slipping this week.</h2>
                <p className={styles.ctaText}>Pick a role and click through a live, no-login demo, or book a call and we will look at your store together.</p>
                <p className={styles.ctaPricing}>Simple per-rooftop pricing · start with a 30-day pilot on one store</p>
              </div>
              <div className={styles.ctaBtns}>
                <a href={DEMO} {...ext} className={styles.ctaBtnLime}>See a live demo</a>
                <a href={BOOK} {...ext} className={styles.ctaBtnGhost}>Book a call</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DISPATCH */}
      <section style={{ paddingTop: 70 }}>
        <div className={styles.container}>
          <div className={styles.dispatchCard}>
            <div style={{ maxWidth: 520 }}>
              <p className={`${styles.mono} ${styles.kicker}`}>THE AUTOKNERD DISPATCH</p>
              <h3 className={styles.dispatchTitle}>Stay close to the signal.</h3>
              <p className={styles.dispatchText}>Weekly notes on trust, transparency, CSI, and dealership behavior. No clutter.</p>
            </div>
            <form className={styles.dispatchForm} action="/#dispatch" method="get">
              <label htmlFor="dispatch-email" className={styles.srOnly}>Email address</label>
              <input id="dispatch-email" name="email" type="email" placeholder="you@yourstore.com" className={styles.dispatchInput} />
              <button type="submit" className={styles.dispatchBtn}>Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <SiteFooter />
    </div>
  );
}

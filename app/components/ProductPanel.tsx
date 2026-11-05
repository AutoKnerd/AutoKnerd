"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import styles from "./site.module.css";

type Role = "OWNER" | "GM" | "SALES" | "SERVICE";

const ORDER: Role[] = ["OWNER", "GM", "SALES", "SERVICE"];

const ROLES: Record<Role, {
  lvl: string; xp: string; bar: number;
  kicker: string; title: string; text: string; cta: string;
  metricLabel: string; metric: string; delta: string;
  signalLabel: string; signal: string; signalNote: string;
  caption: string;
}> = {
  OWNER: {
    lvl: "NETWORK", xp: "12 stores", bar: 75,
    kicker: "THIS WEEK ACROSS YOUR STORES",
    title: "Coaching priorities",
    text: "Where each store is strong, where consistency is slipping, and exactly where your managers should spend the week.",
    cta: "OPEN DASHBOARD",
    metricLabel: "ALL STORES CX", metric: "75%", delta: "+4%",
    signalLabel: "WEAKEST SIGNAL", signal: "Active listening", signalNote: "Coach this across the network this week.",
    caption: "This is what you and your GMs open to see the whole group at a glance, and know exactly where to coach.",
  },
  GM: {
    lvl: "STORE", xp: "18 reps", bar: 68,
    kicker: "YOUR STORE THIS WEEK",
    title: "Pacing & follow-up",
    text: "Your team's weakest habit this week, and the two people who need a nudge before the numbers slip.",
    cta: "OPEN DASHBOARD",
    metricLabel: "STORE CX", metric: "71%", delta: "+3%",
    signalLabel: "WEAKEST SIGNAL", signal: "Pacing", signalNote: "Two reps need a quick reset this week.",
    caption: "This is what your GM opens to steer the week in one tap, no lesson-building required.",
  },
  SALES: {
    lvl: "LVL 9", xp: "8,940 XP", bar: 72,
    kicker: "TODAY'S FOCUS",
    title: "Product knowledge",
    text: "Explain the product clearly and tie details to real value. Today: warmer openings, a friendlier first impression.",
    cta: "START SESSION",
    metricLabel: "MY CX SCORE", metric: "78%", delta: "+6%",
    signalLabel: "TODAY'S REP", signal: "Discovery questions", signalNote: "Five focused minutes, then you're on the floor.",
    caption: "This is what your salespeople open every day. It plays like a game, so they keep coming back.",
  },
  SERVICE: {
    lvl: "LVL 7", xp: "6,120 XP", bar: 64,
    kicker: "TODAY'S FOCUS",
    title: "Transparent estimates",
    text: "Walk the customer through the work and the why. Today: no-surprise pricing, plain-language recommendations.",
    cta: "START SESSION",
    metricLabel: "MY CSI", metric: "82%", delta: "+5%",
    signalLabel: "TODAY'S REP", signal: "Setting expectations", signalNote: "Five focused minutes, then you're on the drive.",
    caption: "This is what your service advisors open every day, so the drive feels as good as the showroom.",
  },
};

export function ProductPanel() {
  const [role, setRole] = useState<Role>("OWNER");
  const r = ROLES[role];

  return (
    <section className={styles.panelWrap}>
      <div className={styles.container}>
        <div className={styles.panel}>
          <div className={styles.panelGlow} />
          <div className={styles.panelTop}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span className={styles.mono} style={{ fontSize: 12, letterSpacing: "0.2em", color: "#8CFF57" }}>HOME</span>
              <div className={styles.chips} role="tablist" aria-label="Role">
                {ORDER.map((role_) => (
                  <button
                    key={role_}
                    type="button"
                    role="tab"
                    aria-selected={role === role_}
                    onClick={() => setRole(role_)}
                    className={`${styles.chip} ${styles.chipBtn} ${role === role_ ? styles.chipOn : ""}`}
                  >
                    {role_}
                  </button>
                ))}
              </div>
            </div>
            <div><span className={styles.lvl}>{r.lvl}</span> <span className={styles.xp}>{r.xp}</span></div>
          </div>
          <div className={styles.panelBody}>
            <div className={styles.panelMain}>
              <div className={styles.bar}><div className={styles.barFill} style={{ width: `${r.bar}%` }} /></div>
              <div key={role} className={styles.panelSwap}>
                <p className={`${styles.mono} ${styles.focusKicker}`}>{r.kicker}</p>
                <h3 className={styles.focusTitle}>{r.title}</h3>
                <p className={styles.focusText}>{r.text}</p>
                <div className={styles.startBtn}>{r.cta} <Play size={16} fill="#0C1512" strokeWidth={0} /></div>
              </div>
            </div>
            <div key={`${role}-side`} className={`${styles.panelSide} ${styles.panelSwap}`}>
              <div className={styles.sideCard}>
                <p className={`${styles.mono} ${styles.sideKicker}`}>{r.metricLabel}</p>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 10, marginTop: 6 }}>
                  <span className={styles.sideBig}>{r.metric}</span>
                  <span className={styles.up} style={{ marginBottom: 12 }}>▲ {r.delta}</span>
                </div>
              </div>
              <div className={`${styles.sideCard} ${styles.sideCardCyan}`}>
                <p className={styles.mono} style={{ margin: 0, fontSize: 11, letterSpacing: "0.16em", color: "#06EBF7" }}>{r.signalLabel}</p>
                <p style={{ margin: "8px 0 0", fontSize: 20, fontWeight: 700, color: "#EAF6F7" }}>{r.signal}</p>
                <p style={{ margin: "6px 0 0", fontSize: 13, color: "#8FB6BA" }}>{r.signalNote}</p>
              </div>
            </div>
          </div>
        </div>
        <p className={styles.panelCaption}>{r.caption}</p>
      </div>
    </section>
  );
}

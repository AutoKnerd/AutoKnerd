"use client";
import { useEffect, useState, type ReactNode } from "react";
import s from "./runway.module.css";

// Hash-routed tabs, same hashes as the claude.ai page (#upcoming, #past, #analysis, #thankyou).
const TABS = [["upcoming", "Upcoming"], ["past", "Past classes"], ["analysis", "Analysis & method"]] as const;
type Tab = (typeof TABS)[number][0];

export function Tabs({ panels }: { panels: Record<Tab, ReactNode> }) {
  const [tab, setTab] = useState<Tab>("upcoming");
  useEffect(() => {
    const pick = () => {
      const h = decodeURIComponent(location.hash.slice(1));
      if (TABS.some(([k]) => k === h)) setTab(h as Tab);
      else if (h) {
        const el = document.getElementById(h);
        const owner = el?.closest("[data-panel]")?.getAttribute("data-panel") as Tab | null;
        if (owner) { setTab(owner); setTimeout(() => el?.scrollIntoView(), 0); }
      }
    };
    pick();
    window.addEventListener("hashchange", pick);
    return () => window.removeEventListener("hashchange", pick);
  }, []);
  return (
    <>
      <nav className={s.views} aria-label="Views">
        {TABS.map(([k, label]) => (
          <a key={k} href={"#" + k} aria-current={tab === k ? "page" : undefined} onClick={() => setTab(k)}>{label}</a>
        ))}
      </nav>
      {TABS.map(([k]) => (
        <div key={k} data-panel={k} hidden={tab !== k}>{panels[k]}</div>
      ))}
    </>
  );
}

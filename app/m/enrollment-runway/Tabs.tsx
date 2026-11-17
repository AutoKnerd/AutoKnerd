"use client";
import { useEffect, useState, type ReactNode } from "react";
import s from "./runway.module.css";

// Hash-routed tabs. Andrew's page keeps the claude.ai page's hashes (#upcoming, #past, #analysis, #thankyou).
export function Tabs({ tabs, panels }: { tabs: [string, string][]; panels: Record<string, ReactNode> }) {
  const [tab, setTab] = useState(tabs[0][0]);
  useEffect(() => {
    const pick = () => {
      const h = decodeURIComponent(location.hash.slice(1));
      if (tabs.some(([k]) => k === h)) setTab(h);
      else if (h) {
        const el = document.getElementById(h);
        const owner = el?.closest("[data-panel]")?.getAttribute("data-panel");
        if (owner) { setTab(owner); setTimeout(() => el?.scrollIntoView(), 0); }
      }
    };
    pick();
    window.addEventListener("hashchange", pick);
    return () => window.removeEventListener("hashchange", pick);
  }, [tabs]);
  return (
    <>
      <nav className={s.views} aria-label="Views">
        {tabs.map(([k, label]) => (
          <a key={k} href={"#" + k} aria-current={tab === k ? "page" : undefined} onClick={() => setTab(k)}>{label}</a>
        ))}
      </nav>
      {tabs.map(([k]) => (
        <div key={k} data-panel={k} hidden={tab !== k}>{panels[k]}</div>
      ))}
    </>
  );
}

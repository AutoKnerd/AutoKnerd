"use client";

import { useState } from "react";
import styles from "./site.module.css";
import { BOOK, LOGIN, ext } from "@/app/lib/links";

const LINKS = [
  { href: "/#system", label: "The system" },
  { href: "/#how", label: "How it works" },
  { href: "/podcast", label: "Podcast" },
  { href: "/methodology", label: "Methodology" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.navInner}>
          <a href="/" className={styles.brand}>
            <img src="/ak-gear.png" alt="AutoKnerd" />
            <span>AutoKnerd</span>
          </a>
          <div className={styles.navLinks}>
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </div>
          <div className={styles.navRight}>
            <a href={LOGIN} {...ext} className={styles.navLogin}>Log in</a>
            <a href={BOOK} {...ext} className={styles.pillLime}>Book a call</a>
            <button
              className={styles.hamb}
              type="button"
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span /><span />
            </button>
          </div>
        </div>

        {open && (
          <div className={styles.mobileMenu}>
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
            ))}
            <a href={LOGIN} {...ext} onClick={() => setOpen(false)}>Log in</a>
          </div>
        )}
      </div>
    </nav>
  );
}

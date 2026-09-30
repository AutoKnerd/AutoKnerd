import type { Metadata } from "next";
import { SiteNav } from "@/app/components/SiteNav";
import { SiteFooter } from "@/app/components/SiteFooter";
import s from "@/app/components/site.module.css";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Legal · AutoKnerd",
  description: "AutoKnerd's legal documents: privacy, terms, data processing, sub-processors, acceptable use, and security.",
};

const DOCS = [
  { href: "/privacy", title: "Privacy Policy", desc: "What personal information we collect, how we use it, and your choices." },
  { href: "/terms", title: "Terms of Service", desc: "The agreement that governs access to and use of AutoKnerd." },
  { href: "/dpa", title: "Data Processing Agreement", desc: "How we process a dealership's data as its processor / service provider." },
  { href: "/subprocessors", title: "Sub-processors", desc: "The third-party providers we use to deliver the Service." },
  { href: "/acceptable-use", title: "Acceptable Use Policy", desc: "The rules for using AutoKnerd — part of the Terms." },
  { href: "/security", title: "Security Overview", desc: "How we protect customer and account data today." },
];

export default function LegalPage() {
  return (
    <div className={s.page}>
      <SiteNav />

      <header className={s.hero}>
        <div className={s.container}>
          <span className={`${s.eyebrow} ${s.mono}`}>
            <span className={s.dot} />LEGAL
          </span>
          <h1 className={s.h1}>Legal &amp; <span className={s.grad}>trust.</span></h1>
          <p className={s.lead} style={{ maxWidth: 620 }}>
            Our policies and agreements in one place — how AutoKnerd handles data, what you agree to, and how we
            keep it secure.
          </p>
        </div>
      </header>

      <section className={s.section} style={{ paddingTop: "clamp(32px, 5vw, 48px)" }}>
        <div className={s.container}>
          <div className={s.grid3}>
            {DOCS.map((d) => (
              <a key={d.href} href={d.href} className={s.card} style={{ textDecoration: "none" }}>
                <h3 className={s.cardTitle} style={{ fontSize: 20 }}>{d.title}</h3>
                <p className={s.cardText} style={{ flex: 1 }}>{d.desc}</p>
                <span className={s.textLink} style={{ marginTop: 4, fontSize: 14 }}>
                  Read <ArrowRight size={15} strokeWidth={2.2} />
                </span>
              </a>
            ))}
          </div>
          <p className={s.center} style={{ margin: "34px auto 0", maxWidth: 620, fontSize: 14, color: "#8A938D" }}>
            Questions about any of these? Email{" "}
            <a href="mailto:legal@autoknerd.com" style={{ color: "#5E8A00", fontWeight: 700 }}>legal@autoknerd.com</a>.
          </p>
        </div>
      </section>

      <div style={{ height: 20 }} />
      <SiteFooter />
    </div>
  );
}

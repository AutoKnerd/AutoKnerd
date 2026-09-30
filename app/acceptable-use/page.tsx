import type { Metadata } from "next";
import { SiteNav } from "@/app/components/SiteNav";
import { SiteFooter } from "@/app/components/SiteFooter";
import s from "@/app/components/site.module.css";

export const metadata: Metadata = {
  title: "Acceptable Use Policy · AutoKnerd",
  description: "The rules for using AutoKnerd — part of the Terms of Service.",
};

export default function AcceptableUsePage() {
  return (
    <div className={s.page}>
      <SiteNav />

      <header className={s.hero}>
        <div className={s.container}>
          <span className={`${s.eyebrow} ${s.mono}`}>
            <span className={s.dot} />ACCEPTABLE USE
          </span>
          <h1 className={s.h1}>Acceptable Use <span className={s.grad}>Policy.</span></h1>
          <p className={s.lead} style={{ maxWidth: 640 }}>
            The rules for using AutoKnerd. This policy is part of the{" "}
            <a href="/terms" style={{ color: "#5E8A00", fontWeight: 700 }}>Terms of Service</a> and applies to
            everyone who uses the Service.
          </p>
          <p className={s.mono} style={{ marginTop: 16, fontSize: 13, letterSpacing: "0.08em", color: "#8A938D" }}>
            LAST UPDATED: SEPTEMBER 2026
          </p>
        </div>
      </header>

      <section className={s.section} style={{ paddingTop: "clamp(32px, 5vw, 48px)" }}>
        <div className={s.container}>
          <div className={s.legal}>
            <h2>You may not use AutoKnerd to:</h2>

            <p><strong>Break the law or harm others</strong></p>
            <ul>
              <li>Violate any law or regulation, or infringe anyone&apos;s intellectual property, privacy, or other rights.</li>
              <li>Collect personal information you don&apos;t have the right to collect, or use the Service in a way that violates applicable employment or privacy law.</li>
              <li>Upload or present content that is unlawful, defamatory, harassing, hateful, or threatening.</li>
            </ul>

            <p><strong>Abuse the platform or its users</strong></p>
            <ul>
              <li>Send spam, phishing, or unsolicited messages.</li>
              <li>Impersonate any person or organization, or misrepresent your affiliation.</li>
              <li>Upload malware, or content designed to disrupt or damage any system.</li>
            </ul>

            <p><strong>Attack or overload the Service</strong></p>
            <ul>
              <li>Attempt to gain unauthorized access to the Service, other customers&apos; data, or related systems.</li>
              <li>Probe, scan, or test the vulnerability of the Service, or breach or circumvent security or authentication measures, except under written authorization (for example, an approved security test).</li>
              <li>Scrape, crawl, or harvest data from the Service, or access data you are not authorized to access.</li>
              <li>Interfere with or overload the Service (for example, denial-of-service or excessive automated requests), or circumvent usage limits.</li>
              <li>Reverse engineer, decompile, or attempt to extract source code, except as permitted by law.</li>
            </ul>

            <p><strong>Misuse AI features</strong></p>
            <ul>
              <li>Submit content to AI features that you are not permitted to disclose to a third-party processor.</li>
              <li>Rely on AI output for high-stakes decisions — such as employment or disciplinary decisions — without human review.</li>
            </ul>

            <h2>Enforcement</h2>
            <p>
              We may investigate suspected violations and may suspend or terminate access, remove content, and
              cooperate with law enforcement. Report abuse to{" "}
              <a href="mailto:abuse@autoknerd.com" style={{ color: "#5E8A00", fontWeight: 700 }}>abuse@autoknerd.com</a>.
            </p>
          </div>
        </div>
      </section>

      <div style={{ height: 20 }} />
      <SiteFooter />
    </div>
  );
}

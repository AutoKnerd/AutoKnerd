import type { Metadata } from "next";
import { SiteNav } from "@/app/components/SiteNav";
import { SiteFooter } from "@/app/components/SiteFooter";
import s from "@/app/components/site.module.css";

export const metadata: Metadata = {
  title: "Sub-processors · AutoKnerd",
  description: "The third-party providers AutoKnerd uses to deliver the Service.",
};

const ROWS = [
  ["Google Cloud / Firebase (Google LLC)", "Database (Firestore), authentication, and file storage — the core backend", "Account data; team-member performance data; practice-session responses and coaching inputs", "United States [confirm region]"],
  ["Railway Corp.", "Application hosting for the AutoKnerd app and its APIs", "Data in transit through the app; request metadata (e.g., IP)", "United States"],
  ["Vercel Inc.", "Hosting for the marketing website (autoknerd.com)", "Website visitor request metadata (e.g., IP)", "United States"],
  ["Google (Gemini API) (Google LLC)", "AI practice scenarios and coaching-summary generation", "Practice-session content sent to the AI feature", "United States [confirm region + data-use terms]"],
  ["Google Tag Manager (Google LLC)", "Tag management / analytics on the marketing website", "Website visitor data (e.g., IP, usage) via tags it loads", "Google global"],
];

export default function SubprocessorsPage() {
  return (
    <div className={s.page}>
      <SiteNav />

      <header className={s.hero}>
        <div className={s.container}>
          <span className={`${s.eyebrow} ${s.mono}`}>
            <span className={s.dot} />SUB-PROCESSORS
          </span>
          <h1 className={s.h1}>Sub-<span className={s.grad}>processors.</span></h1>
          <p className={s.lead} style={{ maxWidth: 680 }}>
            The third-party providers AutoKnerd uses to deliver the Service. We execute or accept each
            provider&apos;s standard data-processing terms before relying on it.
          </p>
          <p className={s.mono} style={{ marginTop: 16, fontSize: 13, letterSpacing: "0.08em", color: "#8A938D" }}>
            LAST UPDATED: SEPTEMBER 2026
          </p>
        </div>
      </header>

      <section className={s.section} style={{ paddingTop: "clamp(32px, 5vw, 48px)" }}>
        <div className={s.container}>
          <div className={s.legal}>
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead>
                  <tr>
                    <th>Sub-processor</th>
                    <th>Service provided</th>
                    <th>Data it may process</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((r) => (
                    <tr key={r[0]}>
                      <td><strong>{r[0]}</strong></td>
                      <td>{r[1]}</td>
                      <td>{r[2]}</td>
                      <td>{r[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2>Notes</h2>
            <ul>
              <li>
                <strong>AI / Gemini.</strong> The practice feature sends session content to Google&apos;s Gemini
                API. We maintain (or will execute) a data-processing agreement with Google that prohibits training
                on the data, and confirm US data residency. Public product <strong>demos run on sample data with
                a simulated response</strong>, so no personal data is sent to the AI for demos. [Confirm the
                agreement and region are in place before publishing this as a present-tense statement.]
              </li>
              <li>
                <strong>Email.</strong> Account and transactional emails are sent through Firebase
                Authentication&apos;s built-in email service (Google LLC); there is no separate email provider. If
                one is added later, it will be listed here.
              </li>
              <li>
                <strong>Payments.</strong> When paid billing is enabled, a payment processor will be added here
                (card data handled by the processor, not stored by us). [To confirm.]
              </li>
              <li>
                <strong>Standard DPAs.</strong> Google Cloud, Railway, and Vercel each publish standard
                data-processing terms; we execute or accept each so our Data Processing Agreement can flow
                obligations down to them.
              </li>
            </ul>

            <p>
              We will give notice of new sub-processors as described in our{" "}
              <a href="/dpa" style={{ color: "#5E8A00", fontWeight: 700 }}>Data Processing Agreement</a>.
            </p>
          </div>
        </div>
      </section>

      <div style={{ height: 20 }} />
      <SiteFooter />
    </div>
  );
}

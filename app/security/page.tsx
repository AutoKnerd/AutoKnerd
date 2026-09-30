import type { Metadata } from "next";
import { SiteNav } from "@/app/components/SiteNav";
import { SiteFooter } from "@/app/components/SiteFooter";
import s from "@/app/components/site.module.css";

export const metadata: Metadata = {
  title: "Security Overview · AutoKnerd",
  description: "How AutoKnerd protects customer and account data — the controls in place today.",
};

const mail = { color: "#5E8A00", fontWeight: 700 } as const;

export default function SecurityPage() {
  return (
    <div className={s.page}>
      <SiteNav />

      <header className={s.hero}>
        <div className={s.container}>
          <span className={`${s.eyebrow} ${s.mono}`}>
            <span className={s.dot} />SECURITY
          </span>
          <h1 className={s.h1}>Security <span className={s.grad}>Overview.</span></h1>
          <p className={s.lead} style={{ maxWidth: 680 }}>
            How AutoKnerd protects customer and account data. This describes the controls in place today; our
            roadmap items are listed separately and clearly.
          </p>
          <p className={s.mono} style={{ marginTop: 16, fontSize: 13, letterSpacing: "0.08em", color: "#8A938D" }}>
            LAST UPDATED: SEPTEMBER 2026
          </p>
        </div>
      </header>

      <section className={s.section} style={{ paddingTop: "clamp(32px, 5vw, 48px)" }}>
        <div className={s.container}>
          <div className={s.legal}>
            <h2>Infrastructure</h2>
            <p>
              AutoKnerd runs on established US cloud providers. The application is hosted on <strong>Railway</strong>;
              the marketing website on <strong>Vercel</strong>; and data and authentication run on{" "}
              <strong>Google Cloud / Firebase</strong>. We inherit the physical, network, and platform security of
              these providers, which maintain their own independent security certifications.
            </p>

            <h2>Encryption</h2>
            <ul>
              <li><strong>In transit:</strong> all traffic is served over HTTPS/TLS.</li>
              <li><strong>At rest:</strong> customer and account data is encrypted at rest by our cloud data store (Google Cloud/Firebase default encryption).</li>
            </ul>

            <h2>Authentication &amp; access control</h2>
            <ul>
              <li>User authentication is handled by <strong>Firebase Authentication</strong>; sessions are verified server-side on every request, with token-revocation checking.</li>
              <li><strong>Role-based access control</strong> (owner, general manager, manager, and team member, plus internal admin) limits what each user can do.</li>
              <li><strong>Multi-tenant isolation:</strong> each dealership&apos;s data is logically separated and scoped by dealership; access is restricted to the dealership that owns the data.</li>
              <li>Server APIs enforce authorization in code, and the underlying data store uses <strong>default-deny</strong> access rules.</li>
              <li>Administrative access to production is limited to authorized personnel on a least-privilege basis. [Confirm/expand internal access practices.]</li>
            </ul>

            <h2>Data handling</h2>
            <ul>
              <li><strong>Location:</strong> data is processed and stored in the <strong>United States</strong>.</li>
              <li><strong>Minimization:</strong> we collect the data needed to run coaching and reporting, and do not intentionally collect sensitive categories of data.</li>
              <li><strong>Retention:</strong> data is retained for as long as needed to provide the Service and on the dealership&apos;s instructions; deletion is available on request, and self-service deletion tooling is being added. [Target: a clearly enforced retention window — being implemented.]</li>
              <li><strong>No sale, no ad-targeting, no third-party model training</strong> of customer data. The application uses no third-party advertising trackers; the marketing website uses Google Tag Manager for analytics.</li>
              <li><strong>Sub-processors:</strong> a current list is published (Google Cloud/Firebase, Railway, Vercel, and Google Gemini for AI). See <a href="/subprocessors" style={mail}>Sub-processors</a>.</li>
            </ul>

            <h2>Secure development</h2>
            <p>Access controls and data flows are reviewed as part of development, and security review is an ongoing practice.</p>

            <h2>Incident response</h2>
            <p>
              We log and review platform activity and will notify affected customers of a confirmed security
              incident affecting their data without undue delay after confirmation [set an outside window — e.g.,
              72 hours — only if operationally achievable], consistent with our{" "}
              <a href="/dpa" style={mail}>Data Processing Agreement</a>. [A formal, always-on
              monitoring/alerting and incident-response program is on the roadmap.]
            </p>

            <h2>Compliance posture</h2>
            <p>
              <strong>US state privacy laws (e.g., CCPA/CPRA):</strong> we honor applicable consumer rights
              (access, deletion, correction) via <a href="mailto:privacy@autoknerd.com" style={mail}>privacy@autoknerd.com</a>.
            </p>

            <h2>Roadmap (not yet in place — not represented as current)</h2>
            <ul>
              <li>Automated data-retention/deletion enforcement (in progress)</li>
              <li>Independent third-party penetration test</li>
              <li>SOC 2 Type II examination</li>
              <li>Formal, documented information-security program and vendor-risk process</li>
            </ul>

            <h2>Contact</h2>
            <p>
              Security questions: <a href="mailto:security@autoknerd.com" style={mail}>security@autoknerd.com</a> ·{" "}
              <strong>AutoKnerd LLC</strong>
            </p>
          </div>
        </div>
      </section>

      <div style={{ height: 20 }} />
      <SiteFooter />
    </div>
  );
}

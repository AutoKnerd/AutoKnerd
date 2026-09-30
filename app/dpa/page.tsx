import type { Metadata } from "next";
import { SiteNav } from "@/app/components/SiteNav";
import { SiteFooter } from "@/app/components/SiteFooter";
import s from "@/app/components/site.module.css";

export const metadata: Metadata = {
  title: "Data Processing Agreement · AutoKnerd",
  description: "How AutoKnerd processes a dealership's Customer Data as a processor / service provider.",
};

const mail = { color: "#5E8A00", fontWeight: 700 } as const;

export default function DpaPage() {
  return (
    <div className={s.page}>
      <SiteNav />

      <header className={s.hero}>
        <div className={s.container}>
          <span className={`${s.eyebrow} ${s.mono}`}>
            <span className={s.dot} />DATA PROCESSING
          </span>
          <h1 className={s.h1}>Data Processing <span className={s.grad}>Agreement.</span></h1>
          <p className={s.lead} style={{ maxWidth: 680 }}>
            How AutoKnerd processes a dealership&apos;s Customer Data on its behalf, as a processor / service
            provider.
          </p>
          <p className={s.mono} style={{ marginTop: 16, fontSize: 13, letterSpacing: "0.08em", color: "#8A938D" }}>
            LAST UPDATED: SEPTEMBER 2026
          </p>
        </div>
      </header>

      <section className={s.section} style={{ paddingTop: "clamp(32px, 5vw, 48px)" }}>
        <div className={s.container}>
          <div className={s.legal}>
            <p>
              This Data Processing Agreement (&ldquo;DPA&rdquo;) is between the customer (&ldquo;Customer,&rdquo;
              the controller) and <strong>AutoKnerd LLC</strong> (&ldquo;AutoKnerd,&rdquo; the processor /
              service provider). It is incorporated into the <a href="/terms" style={mail}>Terms of Service</a>.
            </p>

            <h2>1. Scope and roles</h2>
            <p>
              This DPA governs AutoKnerd&apos;s processing of personal information contained in Customer Data on
              Customer&apos;s behalf when Customer uses the Service. Customer is the{" "}
              <strong>controller / business</strong>; AutoKnerd is the{" "}
              <strong>processor / service provider</strong>.
            </p>

            <h2>2. Definitions</h2>
            <p>
              &ldquo;Personal Information,&rdquo; &ldquo;Customer Data,&rdquo; &ldquo;Sub-processor,&rdquo;
              &ldquo;Security Incident,&rdquo; and &ldquo;Process&rdquo; have the meanings given here and in
              applicable US privacy laws, including the CCPA/CPRA and other state consumer-privacy laws.
            </p>

            <h2>3. Processing details</h2>
            <ul>
              <li><strong>Subject matter:</strong> provision of the AutoKnerd Service.</li>
              <li><strong>Duration:</strong> the term of the Terms of Service plus the deletion period below.</li>
              <li>
                <strong>Nature and purpose:</strong> hosting, storing, and processing team members&apos; practice
                responses, performance data, and coaching inputs to run coaching sessions, show results, and
                generate reports at Customer&apos;s direction.
              </li>
              <li>
                <strong>Types of personal information:</strong> team-member names and roles; responses submitted
                during practice sessions (roleplay messages and choices); customer-experience and behavior
                scores, XP, streaks, and progress; coaching notes and weekly-focus settings; and session
                metadata.
              </li>
              <li>
                <strong>Categories of data subjects:</strong> Customer&apos;s team members (salespeople, service
                advisors, and other staff) and Customer&apos;s own owners, managers, and administrators.
              </li>
            </ul>

            <h2>4. AutoKnerd&apos;s obligations</h2>
            <p>AutoKnerd will:</p>
            <ul>
              <li>
                Process Customer Data only on Customer&apos;s documented instructions (including the
                configuration Customer selects in the product), and only to provide the Service — not for its own
                commercial purposes, not sold, and not used to train third-party AI models or for advertising.
              </li>
              <li>Ensure personnel authorized to process Customer Data are bound by confidentiality.</li>
              <li>Implement and maintain the security measures described in the <a href="/security" style={mail}>Security Overview</a> (Section 6 below).</li>
              <li>
                Assist Customer, taking into account the nature of processing, with (a) responding to
                data-subject requests, and (b) Customer&apos;s own security, breach-notification, and
                privacy-assessment obligations.
              </li>
              <li>Make available information reasonably necessary to demonstrate compliance with this DPA.</li>
            </ul>

            <h2>5. Sub-processors</h2>
            <p>
              Customer authorizes AutoKnerd to use the sub-processors listed on our{" "}
              <a href="/subprocessors" style={mail}>Sub-processors</a> page to provide the Service. AutoKnerd
              will (a) impose data-protection obligations on each sub-processor no less protective than this DPA,
              (b) remain responsible for their performance, and (c) give Customer [30 days&apos;] notice of any
              new sub-processor, with a right to object on reasonable data-protection grounds.
            </p>

            <h2>6. Security</h2>
            <p>
              AutoKnerd will maintain reasonable and appropriate administrative, technical, and physical
              safeguards, including: encryption of Customer Data in transit and at rest; role-based access
              control and least-privilege access; logical tenant isolation between customers; authentication with
              server-side session verification; default-deny data-store rules; and secure software-development and
              access practices. Details are in the <a href="/security" style={mail}>Security Overview</a>.
            </p>

            <h2>7. Security incidents</h2>
            <p>
              AutoKnerd will notify Customer without undue delay (and in any event within [72 hours]) after
              becoming aware of a Security Incident affecting Customer Data, will provide information reasonably
              available to Customer, and will take reasonable steps to mitigate and remediate.{" "}
              <strong>[Attorney/ops to confirm the exact window.]</strong>
            </p>

            <h2>8. Data-subject requests</h2>
            <p>
              If AutoKnerd receives a request from a data subject regarding Customer Data, it will, to the extent
              legally permitted, direct them to Customer and assist Customer in responding.
            </p>

            <h2>9. Return and deletion</h2>
            <p>
              On termination, or on Customer&apos;s request, AutoKnerd will delete or return Customer Data within
              [30 days] and delete existing copies, except as required by law.{" "}
              <strong>[Confirm mechanism and timeline; product deletion tooling is being added.]</strong>
            </p>

            <h2>10. Audits</h2>
            <p>
              AutoKnerd will make available information necessary to demonstrate compliance and will allow for and
              contribute to audits conducted by Customer or its auditor, subject to reasonable notice,
              confidentiality, and frequency limits. <strong>[Attorney to scope.]</strong>
            </p>

            <h2>11. International transfers</h2>
            <p>Customer Data is processed in the <strong>United States</strong>. AutoKnerd does not transfer Customer Data outside the US.</p>

            <h2>12. Order of precedence</h2>
            <p>In the event of a conflict, this DPA controls over the Terms of Service with respect to the processing of Customer Data.</p>

            <h2>13. Signatures</h2>
            <p>[Signature blocks — Customer and AutoKnerd LLC.]</p>
          </div>
        </div>
      </section>

      <div style={{ height: 20 }} />
      <SiteFooter />
    </div>
  );
}

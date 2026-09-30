import type { Metadata } from "next";
import { SiteNav } from "@/app/components/SiteNav";
import { SiteFooter } from "@/app/components/SiteFooter";
import s from "@/app/components/site.module.css";

export const metadata: Metadata = {
  title: "Terms of Service · AutoKnerd",
  description: "The terms that govern your access to and use of AutoKnerd.",
};

const mail = { color: "#5E8A00", fontWeight: 700 } as const;

export default function TermsPage() {
  return (
    <div className={s.page}>
      <SiteNav />

      <header className={s.hero}>
        <div className={s.container}>
          <span className={`${s.eyebrow} ${s.mono}`}>
            <span className={s.dot} />TERMS
          </span>
          <h1 className={s.h1}>Terms of <span className={s.grad}>Service.</span></h1>
          <p className={s.lead} style={{ maxWidth: 640 }}>
            The agreement that governs your access to and use of AutoKnerd.
          </p>
          <p className={s.mono} style={{ marginTop: 16, fontSize: 13, letterSpacing: "0.08em", color: "#8A938D" }}>
            LAST UPDATED: SEPTEMBER 2026
          </p>
        </div>
      </header>

      <section className={s.section} style={{ paddingTop: "clamp(32px, 5vw, 48px)" }}>
        <div className={s.container}>
          <div className={s.legal}>
            <h2>1. Agreement</h2>
            <p>
              These Terms of Service (the &ldquo;Terms&rdquo;) govern your access to and use of AutoKnerd (the
              &ldquo;Service&rdquo;). By creating an account or using the Service, you agree to these Terms. If
              you are agreeing on behalf of a dealership or organization, you represent that you have authority
              to bind it, and &ldquo;you&rdquo; refers to that organization.
            </p>

            <h2>2. The Service</h2>
            <p>
              AutoKnerd is a customer-experience coaching platform for car dealerships. Team members run short,
              AI-guided practice sessions; managers set a weekly coaching focus; and owners and general managers
              see where to coach across their stores, along with AI-generated coaching summaries. Features vary
              by plan.
            </p>

            <h2>3. Accounts</h2>
            <p>
              You must provide accurate information, keep your credentials secure, and are responsible for
              activity under your account. You must be at least 18 (or the age of majority in your state) to use
              the Service. Accounts are for dealership staff — owners, general managers, managers, and the team
              members a dealership enrolls.
            </p>

            <h2>4. Plans, billing, and trials</h2>
            <ul>
              <li>Paid plans are billed as described at checkout (for example, per rooftop/store or per billable seat), monthly or annually.</li>
              <li>
                <strong>Auto-renewal.</strong> Paid subscriptions are processed by our payment processor and
                automatically renew at the end of each billing period at the then-current price, unless you
                cancel before the renewal date. You may cancel anytime; cancellation stops the next renewal and
                you keep access through the end of the paid period. <strong>[Attorney to confirm state-specific auto-renewal notice/cancellation language.]</strong>
              </li>
              <li>Fees are billed in advance and are non-refundable except as required by law. [Confirm refund/cancellation policy.]</li>
              <li>We may change pricing on a going-forward basis with [30 days&apos;] notice.</li>
              <li>Taxes are your responsibility unless stated otherwise.</li>
            </ul>

            <h2>5. Your content and data</h2>
            <p>
              <strong>Your Content.</strong> You retain ownership of the materials you upload and of the data
              your dealership collects from its team through the Service (&ldquo;Customer Data&rdquo;). You grant
              us a limited license to host, process, and display Your Content solely to provide the Service.
            </p>
            <p>
              <strong>Roles.</strong> For account data we are the controller; for Customer Data we act as your
              processor / service provider under the <a href="/dpa" style={mail}>Data Processing Agreement</a>,
              which is incorporated by reference for business customers.
            </p>
            <p>
              <strong>Your responsibilities.</strong> You are responsible for having the rights and permissions
              needed to collect and process the team data you gather through the Service, and for using the
              Service in compliance with applicable employment and privacy laws. You must not use the Service to
              collect data you are not permitted to collect.
            </p>

            <h2>6. Acceptable use</h2>
            <p>
              You agree to the <a href="/acceptable-use" style={mail}>Acceptable Use Policy</a>, which is part of
              these Terms. In short: no illegal, harmful, infringing, or abusive use, and no attempts to breach
              security, scrape, or overload the Service.
            </p>

            <h2>7. AI features</h2>
            <p>
              Certain features generate practice scenarios and coaching summaries using a third-party AI provider
              (Google&apos;s Gemini). AI output may be inaccurate or incomplete; you are responsible for reviewing
              it before relying on it, and it should not be the sole basis for employment or disciplinary
              decisions without human review. Do not submit content you are not permitted to disclose to a
              third-party processor.
            </p>

            <h2>8. Our intellectual property</h2>
            <p>
              We own the Service and all related software, trademarks, and content (excluding Your Content). We
              grant you a limited, non-exclusive, non-transferable right to use the Service per these Terms. The
              name &ldquo;AutoKnerd,&rdquo; the wordmark, and our branding are our trademarks.
            </p>

            <h2>9. Third-party services</h2>
            <p>
              The Service relies on third-party providers (for example, payments, hosting, and AI). Your use of
              those may be subject to their terms, and we are not responsible for third-party services.
            </p>

            <h2>10. Suspension and termination</h2>
            <p>
              We may suspend or terminate access for violation of these Terms, non-payment, or to protect the
              Service or others. You may cancel at any time. On termination, your right to use the Service ends,
              and we will handle Customer Data per the Data Processing Agreement and Privacy Policy (return or
              deletion).
            </p>

            <h2>11. Disclaimers</h2>
            <p style={{ textTransform: "none" }}>
              THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE,&rdquo; WITHOUT WARRANTIES OF
              ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
              NON-INFRINGEMENT. <strong>[Attorney to finalize.]</strong>
            </p>

            <h2>12. Limitation of liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, AUTOKNERD LLC WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL,
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, AND OUR TOTAL LIABILITY WILL NOT EXCEED THE AMOUNTS YOU
              PAID IN THE PRIOR 12 MONTHS. <strong>[Attorney to finalize caps and carve-outs.]</strong>
            </p>

            <h2>13. Indemnification</h2>
            <p>
              You will indemnify us for claims arising from Your Content, your Customer Data, or your violation
              of these Terms or law. <strong>[Attorney to finalize scope and mutuality.]</strong>
            </p>

            <h2>14. Governing law and disputes</h2>
            <p>
              These Terms are governed by the laws of the State of <strong>[STATE — attorney to set]</strong>,
              without regard to conflicts of law. <strong>[Attorney to choose exclusive jurisdiction or binding
              arbitration with a class-action waiver.]</strong>
            </p>

            <h2>15. Changes</h2>
            <p>
              We may update these Terms; material changes will be noticed. Continued use after changes means
              acceptance.
            </p>

            <h2>16. Contact</h2>
            <p>
              <strong>AutoKnerd LLC</strong> · <a href="mailto:legal@autoknerd.com" style={mail}>legal@autoknerd.com</a>
            </p>
          </div>
        </div>
      </section>

      <div style={{ height: 20 }} />
      <SiteFooter />
    </div>
  );
}

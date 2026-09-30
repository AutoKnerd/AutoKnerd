import styles from "./site.module.css";
import { DEMO, ext } from "@/app/lib/links";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerTop}>
          <div>
            <div className={styles.brand}>
              <img src="/ak-gear.png" alt="AutoKnerd" />
              <span>AutoKnerd</span>
            </div>
            <p className={styles.footerBlurb}>
              Dealership CX development. Diagnose behavior, prescribe action, drive weekly execution.
            </p>
          </div>
          <div className={styles.footerCols}>
            <div className={styles.footerCol}>
              <b>Product</b>
              <a href="/#system">The system</a>
              <a href={DEMO} {...ext}>Live demo</a>
              <a href="/#how">How it works</a>
            </div>
            <div className={styles.footerCol}>
              <b>Company</b>
              <a href="/methodology">Methodology</a>
              <a href="/podcast">Podcast</a>
              <a href="/contact">Contact</a>
            </div>
          </div>
        </div>
        <div className={styles.footerBar}>
          <span>© {new Date().getFullYear()} AutoKnerd LLC. All rights reserved.</span>
          <span className={styles.footerLegal}>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

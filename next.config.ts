import type { NextConfig } from "next";

// Podcast worksheet one-pagers, hosted as self-contained static HTML under
// public/tools/<slug>/index.html. These rewrites give them clean /tools/<slug>
// URLs — checked before the dynamic /tools/[slug] route, so they don't collide
// with the explainer tools (trust-leak-detector, discovery-deep-dive-workbook,
// predictability-script-pack), which fall through to that route.
const WORKSHEET_SLUGS = [
  "micro-yes-ladder",
  "be-back-decoder",
  "feel-of-the-vehicle-check",
  "delivery-day-checklist",
  "trust-equation-scorecard",
  "ego-check",
  "scoreboard-reset",
  "close-without-pressure",
  "post-discovery-handoff",
  "discovery-before-the-test-drive",
  "third-wheel-play",
  "defensive-customer-reset",
  "what-happens-next-roadmap",
  "lead-rescue-playbook",
  "30-90-180-follow-up-map",
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return WORKSHEET_SLUGS.map((slug) => ({
      source: `/tools/${slug}`,
      destination: `/tools/${slug}/index.html`,
    }));
  },
};

export default nextConfig;

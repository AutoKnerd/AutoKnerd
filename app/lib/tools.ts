export type AutoKnerdTool = {
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  topics: string[];
  whatThisToolSolves: string;
  whyItMatters: string;
  whatItHelpsYouDo: string[];
  howToUseIt: string[];
  bestFitFor: string[];
};

export const AUTOKNERD_CX_TOOLS: AutoKnerdTool[] = [
  {
    slug: "trust-leak-detector",
    title: "Trust Leak Detector",
    description:
      "Spot the moments where customer confidence quietly drops and repair them fast.",
    shortDescription: "Find and fix trust leaks before the deal starts drifting.",
    topics: ["Trust Formation", "Customer Psychology", "Sales Behavior"],
    whatThisToolSolves:
      "Small moments of uncertainty can quietly lower customer confidence and stall the deal before anyone realizes what happened.",
    whyItMatters:
      "Trust rarely breaks in dramatic moments. It usually leaks through vague answers, hedged tone, rushed phrasing, and unclear next steps.",
    whatItHelpsYouDo: [
      "detect common trust leak moments",
      "reset clarity quickly",
      "use steadier language under pressure",
      "protect customer confidence",
    ],
    howToUseIt: [
      "review the common leak points",
      "identify where your conversations usually drift",
      "choose one correction phrase to practice",
      "use it before your next customer interaction",
    ],
    bestFitFor: [
      "consultants",
      "managers coaching trust and clarity",
      "teams struggling with inconsistent confidence",
    ],
  },
  {
    slug: "discovery-deep-dive-workbook",
    title: "Discovery Deep Dive Workbook",
    description:
      "Strengthen needs assessment and uncover what actually matters before moving to the vehicle.",
    shortDescription:
      "A practical workbook for better discovery and clearer customer alignment.",
    topics: ["Needs Assessment", "Decision Science", "Sales Behavior"],
    whatThisToolSolves:
      "Too many consultants move to the vehicle before the customer can clearly explain what they need and why it matters.",
    whyItMatters:
      "Poor discovery creates weak commitment. Weak commitment turns into objections later.",
    whatItHelpsYouDo: [
      "slow down the discovery process",
      "uncover emotional and practical buying drivers",
      "create clearer commitment before numbers",
      "reduce desk objections",
    ],
    howToUseIt: [
      "work through the discovery prompts",
      "document current vehicle pain points",
      "identify desired outcome changes",
      "practice your follow-up questions before your next up",
    ],
    bestFitFor: [
      "consultants who rush discovery",
      "managers coaching needs assessment",
      "stores trying to improve commitment quality",
    ],
  },
  {
    slug: "predictability-script-pack",
    title: "Predictability Script Pack",
    description:
      "Reduce customer anxiety with calmer next-step language, clearer process framing, and more consistent communication.",
    shortDescription: "Script support for creating clarity and reducing friction.",
    topics: ["Trust Formation", "CX Design", "Customer Psychology"],
    whatThisToolSolves:
      "Customers resist when the process feels unclear, inconsistent, or emotionally noisy.",
    whyItMatters:
      "Predictability lowers anxiety. Lower anxiety increases trust.",
    whatItHelpsYouDo: [
      "explain next steps more clearly",
      "reduce friction during transitions",
      "create calmer process language",
      "improve customer comfort without discounting",
    ],
    howToUseIt: [
      "review the script examples",
      "choose the process moments where customers tend to tense up",
      "replace vague phrasing with clearer language",
      "practice the new phrasing until it sounds natural",
    ],
    bestFitFor: [
      "consultants handling anxious customers",
      "managers improving handoffs and next-step framing",
      "teams trying to reduce confusion",
    ],
  },
];

export function getToolBySlug(slug: string): AutoKnerdTool | undefined {
  return AUTOKNERD_CX_TOOLS.find((tool) => tool.slug === slug);
}

export type AutoKnerdWorksheet = {
  slug: string;
  title: string;
  description: string;
  topics: string[];
};

// Self-contained, print-ready one-page worksheets from the AutoKnerd podcast.
// Hosted as static HTML at /tools/<slug> — see public/tools/<slug>/index.html and
// the rewrites in next.config.ts. Ordered loosely along the sales journey.
export const AUTOKNERD_WORKSHEETS: AutoKnerdWorksheet[] = [
  {
    slug: "lead-rescue-playbook",
    title: "The Lead Rescue Playbook",
    description:
      "A one-page system for answering internet leads like a human, fast, and pulling the quiet ones back before they sit in someone else's car.",
    topics: ["Internet Leads", "Lead Response", "CRM Follow-Up"],
  },
  {
    slug: "micro-yes-ladder",
    title: "The Micro-Yes Ladder",
    description:
      "A ladder for thawing out guarded customers with small, genuine yeses, then bridging those into the big commitment.",
    topics: ["Rapport Building", "Trust Building", "Closing"],
  },
  {
    slug: "defensive-customer-reset",
    title: "The Defensive Customer Reset",
    description:
      "A four-step reset for the guarded, arms-crossed customer, plus a 10-minute drill to practice it before the real thing.",
    topics: ["Customer Trust", "Sales Coaching", "Role-Play Drills"],
  },
  {
    slug: "discovery-before-the-test-drive",
    title: "Discovery Before The Test Drive",
    description:
      "Earn the customer's story before you grab a key, so the drive becomes a conversation, not a silent loop around the block.",
    topics: ["Discovery", "Test Drive", "Customer Rapport"],
  },
  {
    slug: "post-discovery-handoff",
    title: "Post-Discovery Handoff",
    description:
      "A card that carries what the customer told you in discovery onto the car, so every feature answers “show me you heard me.”",
    topics: ["Discovery", "Walkaround", "Feature Presentation"],
  },
  {
    slug: "feel-of-the-vehicle-check",
    title: "Feel Of The Vehicle Check",
    description:
      "A demo check that sells how the car feels, not just what it has, using the cabin lighting most consultants skip.",
    topics: ["Vehicle Demo", "Test Drive", "Emotional Selling"],
  },
  {
    slug: "third-wheel-play",
    title: "The Third Wheel Play",
    description:
      "A five-move play that turns the friend, parent or spouse who derails the deal into the one who helps close it.",
    topics: ["Objection Handling", "Influencers", "Closing"],
  },
  {
    slug: "be-back-decoder",
    title: "The Be-Back Decoder",
    description:
      "Six things customers say right before they disappear, what each really means, and what to say instead so they stay.",
    topics: ["Objection Handling", "Follow-Up", "Trust Building"],
  },
  {
    slug: "trust-equation-scorecard",
    title: "Trust Equation Scorecard",
    description:
      "Turns “empathy plus trust equals a sale” into behaviors you can inspect, with a 15-minute rollout for your next sales meeting.",
    topics: ["Trust Formation", "Customer Psychology", "Sales Behavior"],
  },
  {
    slug: "what-happens-next-roadmap",
    title: "The What Happens Next Roadmap",
    description:
      "Customers walk away when they feel lost. A one-page way to tell them what's coming at every step of the visit.",
    topics: ["Customer Anxiety", "Buyer Experience", "Sales Process"],
  },
  {
    slug: "close-without-pressure",
    title: "Close Without Pressure",
    description:
      "A guide to the fragile moment where the customer decides whether to trust you, with confirmation lines to use at the desk today.",
    topics: ["Closing", "Trust Building", "Sales Technique"],
  },
  {
    slug: "delivery-day-checklist",
    title: "Delivery Day Checklist",
    description:
      "A sequence for making delivery the last great impression, so the customer remembers your name and comes back.",
    topics: ["Delivery", "Customer Retention", "Customer Experience"],
  },
  {
    slug: "30-90-180-follow-up-map",
    title: "The 30-90-180 Follow-Up Map",
    description:
      "A system for turning sold customers into repeat and referral business, with a 15-minute rollout you can run in a sales meeting.",
    topics: ["Customer Retention", "Referrals", "Follow-Up Cadence"],
  },
  {
    slug: "scoreboard-reset",
    title: "Scoreboard Reset",
    description:
      "Stop the leaderboard from becoming a verdict on people, find the growers it overlooks, and coach effort and service, not just units.",
    topics: ["Sales Management", "Coaching", "Dealership Culture"],
  },
  {
    slug: "ego-check",
    title: "Ego Check",
    description:
      "A tool to spot ego before it costs you a deal, with a 15-minute rollout you can run in your next sales meeting.",
    topics: ["Mindset", "Coaching", "Sales Culture"],
  },
];

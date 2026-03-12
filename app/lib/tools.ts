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

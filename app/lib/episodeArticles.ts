// Hand-written "playbook" content for flagship episodes. When an episode has an
// entry here, its page renders the rich article (hook, moves, pull-quote, tool,
// manager exercise). Episodes without an entry fall back to content parsed from
// the feed (overview, takeaways, chapters). Keyed by episode slug.

export type EpisodeToolBlock = {
  kicker: string;
  title: string;
  desc: string;
  items?: [string, string][];
  note?: string;
  href: string;
  cta: string;
};

export type EpisodeArticle = {
  eyebrow: string;
  headline: string;
  dek: string;
  intro: string;
  movesHeading: string;
  moves: [string, string][];
  quote: string;
  tool: EpisodeToolBlock;
  managerNote?: { kicker: string; body: string };
};

export const EPISODE_ARTICLES: Record<string, EpisodeArticle> = {
  "be-back-isnt-a-lost-sale-better-car-sales-conversations-and-follow-up": {
    eyebrow: "Follow-up",
    headline: "“We’ll be back” isn’t a lost sale.",
    dek: "What your salesperson says in the next ten seconds decides whether that customer ever comes back. Here’s the read, the episode, and the tool.",
    intro:
      "Every manager has watched it happen. A good appointment, a decent demo, and then at the desk: “We’ve got a couple other places to look. We’ll be back.” Most salespeople hear “no.” They deflate, hand over a card, and hope. The ones who actually close them later do three things differently.",
    movesHeading: "What to do instead",
    moves: [
      ["Lower the pressure on purpose", "“Totally fair. This is a big decision.” You’re not closing; you’re making it safe for them to tell you the truth about what’s holding them back."],
      ["Find the one unanswered question", "Before they leave, ask: “If everything lined up, what’s the one thing you’d still want to feel sure about?” That answer is your follow-up."],
      ["Earn the right to follow up", "Trade contact for a reason: “Can I send you that by tomorrow?” Now the next touch is useful, not needy, and they’re expecting it."],
      ["Follow up with value, on a schedule", "Not “just checking in.” Send the thing you promised at 30 hours, a useful nudge at 90, a genuine check at 180. That’s the 30-90-180 map."],
    ],
    quote: "A “be back” you prepared for is a lead. A “be back” you hoped for is a goodbye.",
    tool: {
      kicker: "PUT IT TO WORK · FREE TOOL",
      title: "The Be-Back Decoder",
      desc: "Six things customers say on the way out, what each one usually means, and the exact next line, plus the 30-90-180 Follow-Up Map so no lead goes cold.",
      items: [
        ["“We’ve got a few other places to look.”", "They’re comparing, not leaving. Give them a reason you’re the easy yes."],
        ["“We need to think about it.”", "Something’s unresolved. Find the one question before they walk."],
        ["“We’ll talk it over at home.”", "There’s a second decision-maker. Arm your buyer to sell it for you."],
      ],
      note: "…plus 3 more lines and the full follow-up cadence in the tool.",
      href: "/tools/predictability-script-pack",
      cta: "Get the free tool",
    },
    managerNote: {
      kicker: "RUN IT AT YOUR NEXT SALES MEETING",
      body: "15 minutes: read the six exit lines aloud, have the team call out what each one really means, and role-play the next line. Then the homework: everyone brings one real “be back” from last week and the follow-up they’ll actually send.",
    },
  },
};

export function getEpisodeArticle(slug: string): EpisodeArticle | null {
  return EPISODE_ARTICLES[slug] ?? null;
}

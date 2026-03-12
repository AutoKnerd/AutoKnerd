export const PODCAST_TOPICS = [
  "Customer Psychology",
  "Needs Assessment",
  "Trust Formation",
  "Manager Coaching",
  "Decision Science",
  "Sales Behavior",
  "CX Design",
  "Follow-Up",
  "Dealership Culture",
] as const;

const TOPIC_KEYWORDS: Record<(typeof PODCAST_TOPICS)[number], string[]> = {
  "Needs Assessment": ["discovery", "needs assessment", "questions", "ask", "uncover"],
  "Trust Formation": ["trust", "confidence", "clarity", "predictability"],
  "Manager Coaching": ["manager", "coaching", "reinforcement", "leadership"],
  "Customer Psychology": ["psychology", "emotion", "anxiety", "behavior", "doubt"],
  "Decision Science": ["decision", "certainty", "commitment", "hesitation"],
  "Sales Behavior": ["consultant", "selling", "objection", "process", "close"],
  "CX Design": ["customer experience", "friction", "journey", "consistency"],
  "Follow-Up": ["follow-up", "retention", "check-in", "message"],
  "Dealership Culture": ["culture", "team", "alignment", "dealership", "store"],
};

function normalizeText(input: string): string {
  return input.toLowerCase();
}

export function inferTopicsForEpisode(
  title: string,
  description: string,
  maxTopics = 3
): string[] {
  const content = normalizeText(`${title} ${description}`);
  const scored: Array<{ topic: string; score: number }> = [];

  PODCAST_TOPICS.forEach((topic) => {
    const keywords = TOPIC_KEYWORDS[topic];
    let score = 0;

    keywords.forEach((keyword) => {
      if (content.includes(keyword.toLowerCase())) score += 1;
    });

    if (score > 0) {
      scored.push({ topic, score });
    }
  });

  if (scored.length === 0) return [];

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, maxTopics)
    .map((item) => item.topic);
}


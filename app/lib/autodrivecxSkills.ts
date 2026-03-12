export type AutoDriveCXSkill = {
  title: string;
  description: string;
  href: string;
  topics: string[];
};

export const AUTODRIVECX_SIGNUP_URL = "https://app.autodrivecx.com/signup";
export const AUTODRIVECX_INFO_URL = "https://autodrivecx.com/";

export const AUTODRIVECX_SKILLS: AutoDriveCXSkill[] = [
  {
    title: "Discovery Pathway Drill",
    description: "Practice uncovering what actually matters before moving to the vehicle.",
    href: AUTODRIVECX_SIGNUP_URL,
    topics: ["Needs Assessment", "Sales Behavior", "Decision Science"],
  },
  {
    title: "Trust Leak Recovery Drill",
    description: "Learn how to catch and repair small moments where customer confidence drops.",
    href: AUTODRIVECX_SIGNUP_URL,
    topics: ["Trust Formation", "Customer Psychology", "Sales Behavior"],
  },
  {
    title: "Manager Reinforcement Loop",
    description: "Build weekly coaching habits that make better behavior stick.",
    href: AUTODRIVECX_SIGNUP_URL,
    topics: ["Manager Coaching", "Dealership Culture", "CX Design"],
  },
  {
    title: "Predictability Language Lab",
    description: "Reduce friction by using calmer, clearer next-step phrasing.",
    href: AUTODRIVECX_SIGNUP_URL,
    topics: ["Trust Formation", "CX Design", "Customer Psychology"],
  },
  {
    title: "Commitment Alignment Drill",
    description: "Practice the language that creates clarity before numbers ever hit the desk.",
    href: AUTODRIVECX_SIGNUP_URL,
    topics: ["Decision Science", "Needs Assessment", "Sales Behavior"],
  },
  {
    title: "Follow-Up Consistency Challenge",
    description: "Standardize follow-up habits so customers feel guided instead of forgotten.",
    href: AUTODRIVECX_SIGNUP_URL,
    topics: ["Follow-Up", "CX Design", "Sales Behavior"],
  },
];

export function getRecommendedAutoDriveCXSkills(
  episodeTopics: string[],
  max = 3
): AutoDriveCXSkill[] {
  const ranked = AUTODRIVECX_SKILLS.map((skill) => {
    const overlap = skill.topics.filter((topic) => episodeTopics.includes(topic)).length;
    return { skill, overlap };
  })
    .filter((entry) => entry.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .map((entry) => entry.skill);

  const deduped = [...ranked];
  AUTODRIVECX_SKILLS.forEach((skill) => {
    if (!deduped.some((candidate) => candidate.title === skill.title)) {
      deduped.push(skill);
    }
  });

  const count = Math.max(1, Math.min(max, 3));
  return deduped.slice(0, count);
}

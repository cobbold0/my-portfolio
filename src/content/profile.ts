import type { Metric, SocialLink } from "@/lib/types";

export const profile = {
  name: "Augustine Cobbold",
  roleLine: "Backend • Frontend • Mobile",
  tagline:
    "Product-focused engineer building scalable APIs, polished web experiences, and reliable mobile apps.",
  shortBio:
    "I partner with teams to ship measurable outcomes end-to-end, from architecture to observability.",
  location: "Austin, Texas, USA",
  timezone: "Central Time (UTC-6 / UTC-5 DST)",
  email: "a.kwawcobbold@gmail.com",
  availableToMentor: true
};

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/augustinecobbold" },
  { label: "X", href: "https://x.com" }
];

export const metrics: Metric[] = [
  { label: "Apps shipped", value: "18+" },
  { label: "APIs built", value: "40+" },
  { label: "Crash-free sessions", value: "99.63%" }
];

export const linkedinEndorsements = [
  {
    skill: "TypeScript",
    endorsementCount: 42,
    topEndorsers: ["Emmanuel Asamoah", "Nana Yaw Mensah"]
  },
  {
    skill: "Node.js",
    endorsementCount: 37,
    topEndorsers: ["Abena Ofori", "Kofi Owusu"]
  },
  {
    skill: "React",
    endorsementCount: 35,
    topEndorsers: ["Kwame Boateng", "Esi Nyarko"]
  }
];

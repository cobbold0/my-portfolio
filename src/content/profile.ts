import type { Metric, SocialLink } from "@/lib/types";

export const profile = {
  name: "Alex Rivera",
  roleLine: "Backend • Frontend • Mobile",
  tagline:
    "Product-focused engineer building scalable APIs, polished web experiences, and reliable mobile apps.",
  shortBio:
    "I partner with teams to ship measurable outcomes end-to-end, from architecture to observability.",
  location: "Austin, Texas, USA",
  timezone: "Central Time (UTC-6 / UTC-5 DST)",
  email: "alex@portfolio.dev"
};

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X", href: "https://x.com" }
];

export const metrics: Metric[] = [
  { label: "Apps shipped", value: "18+" },
  { label: "APIs built", value: "40+" },
  { label: "Crash rate reduction", value: "-37%" }
];

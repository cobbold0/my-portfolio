import type { Metric, SocialLink } from "@/lib/types";

export const profile = {
  name: "Augustine Cobbold",
  roleLine: "Software Engineer | Mobile & Full-Stack Development",
  tagline:
    "Software Engineer and Product Builder with 3.5+ years of experience building mobile applications, automation systems, AI-powered products, and cloud infrastructure.",
  shortBio:
    "Specializing in native Android (Kotlin, Jetpack Compose), full-stack web (Next.js, TypeScript), and backend systems. Currently leading internal business systems development at Basilissa.",
  location: "Accra, Ghana",
  timezone: "GMT (UTC+0)",
  email: "augustine@cobbold.dev",
  availableToMentor: true
};

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/cobbold0" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/augustinecobbold" },
  { label: "Play Store", href: "https://play.google.com/store/apps/developer?id=Cobbold" }
];

export const metrics: Metric[] = [
  { label: "Production experience", value: "3.5+ Years" },
  { label: "Media uploads / user", value: "1000s Daily" },
  { label: "Crash-free sessions", value: "99.6%" }
];

export const linkedinEndorsements = [
  {
    skill: "Android Development",
    endorsementCount: 45,
    topEndorsers: ["Nelson Djalo", "Obed Asante"]
  },
  {
    skill: "Kotlin",
    endorsementCount: 42,
    topEndorsers: ["Nelson Djalo", "Obed Asante"]
  },
  {
    skill: "TypeScript",
    endorsementCount: 38,
    topEndorsers: ["Emmanuel Asamoah", "Nana Yaw Mensah"]
  },
  {
    skill: "Next.js",
    endorsementCount: 35,
    topEndorsers: ["Abena Ofori", "Kwame Boateng"]
  }
];

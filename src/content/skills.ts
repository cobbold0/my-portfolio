import type { SkillGroup } from "@/lib/types";

export const skills: SkillGroup[] = [
  {
    category: "Backend",
    items: ["Node.js", "NestJS", "PostgreSQL", "Redis", "Kafka", "Docker", "GraphQL"]
  },
  {
    category: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Storybook"]
  },
  {
    category: "Mobile",
    items: ["React Native", "Expo", "Kotlin", "Swift", "Firebase"]
  },
  {
    category: "Tools",
    items: ["GitHub Actions", "Vercel", "Sentry", "Datadog", "Jest", "Playwright"]
  }
];

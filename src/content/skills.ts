import type { SkillGroup } from "@/lib/types";

export const skills: SkillGroup[] = [
  {
    category: "Mobile",
    level: "ADVANCED",
    items: [
      { name: "Android Development", level: 4 },
      { name: "Kotlin", level: 4 },
      { name: "Java for Android", level: 4 },
      { name: "SQLite/RoomDB", level: 4 },
      { name: "React Native", level: 4 },
      { name: "Expo", level: 5 },
      { name: "Firebase", level: 4 },
      { name: "App Store & Play Store deployment", level: 4 }
    ]
  },
  {
    category: "Frontend",
    level: "ADVANCED",
    items: [
      { name: "Next.js", level: 5 },
      { name: "React", level: 5 },
      { name: "TypeScript", level: 5 },
      { name: "Tailwind CSS", level: 5 },
      { name: "shadcn/ui", level: 4 }
    ]
  },
  {
    category: "Backend",
    level: "INTERMEDIATE",
    items: [
      { name: "Node.js", level: 5 },
      { name: "NestJS", level: 4 },
      { name: "PostgreSQL", level: 4 },
      { name: "Redis", level: 4 },
      { name: "Docker", level: 4 },
      { name: "Superbase", level: 4 },
      {name: "Rest APIs", level: 5},
    ]
  },
  {
    category: "Tools",
    level: "INTERMEDIATE",
    items: [
      { name: "Vercel", level: 5 },
      { name: "Sentry", level: 4 },
      { name: "Datadog", level: 3 },
      { name: "Jest", level: 4 },
      { name: "Playwright", level: 4 }
    ]
  },
  {
    category: "Other",
    level: "INTERMEDIATE",
    items: [
      { name: "Git", level: 4 },
      { name: "Agile Methodologies", level: 3 },
      { name: "Scrum", level: 3 },
      { name: "Jira", level: 3 },
    ]
  }
];

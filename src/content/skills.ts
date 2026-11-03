import type { SkillGroup } from "@/lib/types";

export const skills: SkillGroup[] = [
  {
    category: "Mobile",
    level: "ADVANCED",
    items: [
      { name: "Android SDK", level: 5 },
      { name: "Kotlin", level: 5 },
      { name: "Jetpack Compose", level: 5 },
      { name: "CameraX", level: 5 },
      { name: "WorkManager", level: 5 },
      { name: "Room & SQLite", level: 5 },
      { name: "Coroutines & Flow", level: 5 },
      { name: "Hilt / Dependency Injection", level: 4 },
      { name: "Java for Android", level: 4 },
      { name: "React Native & Expo", level: 4 },
      { name: "Offline-First Sync Architecture", level: 5 },
      { name: "Play Store & App Store Deployment", level: 5 }
    ]
  },
  {
    category: "Frontend",
    level: "ADVANCED",
    items: [
      { name: "Next.js (App Router)", level: 5 },
      { name: "React", level: 5 },
      { name: "TypeScript", level: 5 },
      { name: "Tailwind CSS", level: 5 },
      { name: "shadcn/ui", level: 5 },
      { name: "JavaScript", level: 5 },
      { name: "Responsive UI & A11y", level: 5 }
    ]
  },
  {
    category: "Backend",
    level: "ADVANCED",
    items: [
      { name: "Node.js", level: 5 },
      { name: "REST APIs & JSON", level: 5 },
      { name: "PostgreSQL", level: 4 },
      { name: "Redis", level: 4 },
      { name: "SQLite", level: 5 },
      { name: "Firebase", level: 5 },
      { name: "JWT Auth & RBAC", level: 4 },
      { name: "AWS Cognito", level: 4 },
      { name: "PHP & SQL", level: 4 }
    ]
  },
  {
    category: "Tools",
    level: "ADVANCED",
    items: [
      { name: "Docker", level: 4 },
      { name: "Proxmox (Homelab)", level: 4 },
      { name: "Coolify PaaS", level: 4 },
      { name: "Cloudflare & Tunnels", level: 4 },
      { name: "Vercel", level: 5 },
      { name: "CI/CD & GitHub Actions", level: 4 },
      { name: "Datadog & Sentry", level: 4 },
      { name: "Tailscale Networking", level: 4 }
    ]
  },
  {
    category: "Other",
    level: "ADVANCED",
    items: [
      { name: "n8n Workflow Automation", level: 5 },
      { name: "LLM Integrations & Prompt Engineering", level: 4 },
      { name: "System Design & Architecture", level: 4 },
      { name: "Git & GitHub Workflows", level: 5 },
      { name: "Agile & Scrum Methodologies", level: 4 }
    ]
  }
];

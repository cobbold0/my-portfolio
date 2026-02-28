import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "payments-observability-hub",
    title: "Payments Observability Hub",
    summary: "Unified telemetry dashboard for payment pipelines and incident triage.",
    problem:
      "Payment failures were traced across 6 systems with no common correlation IDs, causing slow incident resolution.",
    solution:
      "Built a centralized ingestion service and a Next.js operations console that surfaces trace-linked incidents and runbooks.",
    responsibilities: [
      "Architected event schema and streaming ingestion",
      "Built role-based dashboard with server-rendered analytics",
      "Set up error budgets and SLO alerting"
    ],
    impactMetrics: ["MTTR reduced from 52m to 14m", "Failed charge visibility improved to 99.1%", "On-call pages reduced by 28%"],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Kafka", "OpenTelemetry", "Tailwind CSS"],
    category: "Backend",
    featured: true,
    year: 2025,
    screenshots: [
      { src: "/projects/placeholder.svg", alt: "Payments dashboard overview" },
      { src: "/projects/placeholder.svg", alt: "Incident drill-down" }
    ],
    links: {
      github: "https://github.com",
      live: "https://example.com"
    },
    architecture: {
      title: "Event flow",
      mermaid: `flowchart LR\nA[Gateway] --> B[Ingestion API]\nB --> C[(Kafka)]\nC --> D[Processor]\nD --> E[(Postgres)]\nE --> F[Next.js Dashboard]`
    }
  },
  {
    slug: "commerce-frontend-replatform",
    title: "Commerce Frontend Replatform",
    summary: "Migrated legacy storefront to a high-conversion Next.js architecture.",
    problem: "The legacy SPA had poor SEO and 4.8s LCP on mobile, resulting in traffic loss.",
    solution: "Rebuilt the storefront with App Router, server components, and streaming for product discovery pages.",
    responsibilities: [
      "Led migration architecture",
      "Implemented reusable design system",
      "Optimized rendering strategy for product pages"
    ],
    impactMetrics: ["LCP improved 4.8s → 1.9s", "Conversion increased by 12.4%", "Organic traffic up 31%"],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Vercel"],
    category: "Frontend",
    featured: true,
    year: 2024,
    screenshots: [
      { src: "/projects/placeholder.svg", alt: "Homepage hero and collection cards" },
      { src: "/projects/placeholder.svg", alt: "Product detail screen" }
    ],
    links: {
      github: "https://github.com",
      live: "https://example.com"
    },
    architecture: {
      title: "Rendering strategy",
      mermaid: `flowchart TD\nA[Request] --> B[Server Components]\nB --> C[Edge Cache]\nB --> D[Product API]\nD --> E[Hydrated Client Widgets]`
    }
  },
  {
    slug: "field-ops-mobile-suite",
    title: "Field Ops Mobile Suite",
    summary: "Offline-first mobile app for technicians with realtime sync.",
    problem:
      "Technicians worked in low-connectivity environments and relied on paper checklists, causing data loss and delays.",
    solution:
      "Delivered offline local storage with conflict resolution and background sync to central systems.",
    responsibilities: [
      "Implemented offline-first data layer",
      "Shipped diagnostics and crash monitoring",
      "Coordinated release train across iOS and Android"
    ],
    impactMetrics: ["Task completion time down 22%", "Data sync conflicts reduced 63%", "Crash-free sessions at 99.6%"],
    techStack: ["React Native", "Expo", "SQLite", "TypeScript", "Firebase"],
    category: "Mobile",
    featured: true,
    year: 2025,
    screenshots: [
      { src: "/projects/placeholder.svg", alt: "Work order list" },
      { src: "/projects/placeholder.svg", alt: "Checklist detail" }
    ],
    links: {
      github: "https://github.com",
      playStore: "https://play.google.com/store"
    },
    architecture: {
      title: "Offline sync",
      mermaid: `flowchart LR\nA[Mobile App] --> B[(SQLite Cache)]\nA --> C[Sync Queue]\nC --> D[API Gateway]\nD --> E[(Core DB)]`
    }
  },
  {
    slug: "api-governance-platform",
    title: "API Governance Platform",
    summary: "Policy enforcement and contract testing for internal APIs.",
    problem: "Teams shipped inconsistent contracts, breaking integrations across domains.",
    solution: "Built policy checks and schema tests in CI with auto-generated docs.",
    responsibilities: ["Owned policy engine", "Added CI gate checks", "Rolled out team onboarding"],
    impactMetrics: ["Breaking changes down 54%", "Release confidence improved across 9 teams"],
    techStack: ["Node.js", "OpenAPI", "GitHub Actions", "TypeScript"],
    category: "Backend",
    featured: false,
    year: 2023,
    screenshots: [{ src: "/projects/placeholder.svg", alt: "Policy dashboard" }],
    links: { github: "https://github.com" },
    architecture: {
      title: "CI policy chain",
      mermaid: `flowchart LR\nA[PR] --> B[Contract Tests]\nB --> C[Policy Engine]\nC --> D[Deploy Gate]`
    }
  }
];


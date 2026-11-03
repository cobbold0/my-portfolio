import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "fieldtool-auction-data-capture",
    title: "FieldTool — Auction Data-Capture Platform",
    summary:
      "Production Android application used by field operators and inspectors to capture high-volume vehicle and equipment inspection records for auction preparation.",
    problem:
      "Field inspectors operate in harsh, low-connectivity auction yards and need to capture 200+ media files per asset with zero data loss, high memory stability, and reliable background synchronization.",
    solution:
      "Engineered an offline-first Android architecture using Kotlin, Jetpack Compose, CameraX, Room, and WorkManager for resilient background uploads, local persistence, and upload reliability.",
    responsibilities: [
      "Engineered offline-first local persistence and queue-based synchronization using Room and WorkManager",
      "Optimized CameraX media-capture pipelines handling 200+ photos/videos per asset without memory pressure",
      "Investigated and resolved memory leaks and bitmap recycling crashes during heavy capture sessions",
      "Contributed to automated build and release processes using GitHub Actions"
    ],
    impactMetrics: [
      "Supported thousands of daily uploads per user",
      "Maintained 99.6%+ crash-free session stability",
      "Zero data loss across low-connectivity field inspection workflows"
    ],
    techStack: [
      "Kotlin",
      "Java",
      "Jetpack Compose",
      "CameraX",
      "WorkManager",
      "Room",
      "Coroutines",
      "Flow",
      "GitHub Actions"
    ],
    category: "Mobile",
    featured: true,
    year: 2026,
    screenshots: [
      { src: "/projects/placeholder.svg", alt: "FieldTool inspection interface" },
      { src: "/projects/placeholder.svg", alt: "Media capture and upload queue" }
    ],
    links: {
      github: "https://github.com/cobbold0"
    },
    architecture: {
      title: "Offline-First Upload Pipeline",
      mermaid: `flowchart TD\nA[CameraX Capture] --> B[Local Cache & Room DB]\nB --> C{Network Available?}\nC -- Yes --> D[WorkManager Upload Worker]\nC -- No --> E[Persistent Background Queue]\nE --> D\nD --> F[Auction Backend Storage]`
    }
  },
  {
    slug: "devmock-android-developer-tool",
    title: "DevMock — Android Network Simulation Tool",
    summary:
      "Published Android developer utility for simulating network latency, throttle profiles, and API mock testing directly on physical mobile devices.",
    problem:
      "Mobile developers struggle to simulate intermittent connectivity, custom latency, and API error edge cases on physical devices without complex external proxy setups.",
    solution:
      "Designed, developed, published, and maintain an Android application focused on network simulation, mock API scenarios, and traffic control for mobile testing.",
    responsibilities: [
      "Architected the complete Android application with Kotlin and Jetpack Compose",
      "Built mock traffic and network condition controls for developer QA workflows",
      "Published and actively maintain the app on the Google Play Store"
    ],
    impactMetrics: [
      "Published and maintained on Google Play Store",
      "Empowers developers to test mobile edge cases and slow 3G/offline transitions",
      "100% modern Kotlin and Jetpack Compose implementation"
    ],
    techStack: ["Kotlin", "Jetpack Compose", "Android SDK", "Room", "Coroutines"],
    category: "Mobile",
    featured: true,
    year: 2024,
    screenshots: [
      { src: "/projects/placeholder.svg", alt: "DevMock dashboard" },
      { src: "/projects/placeholder.svg", alt: "Network throttling profile screen" }
    ],
    links: {
      live: "https://devmocks.vercel.app",
      playStore: "https://play.google.com/store/apps/developer?id=Cobbold"
    },
    architecture: {
      title: "DevMock Architecture",
      mermaid: `flowchart LR\nA[Developer UI] --> B[Traffic Simulation Engine]\nB --> C[Local Proxy / Interceptor]\nC --> D[Device Network Stack]`
    }
  },
  {
    slug: "ecocoders-environmental-edtech-platform",
    title: "EcoCoders — Environmental EdTech Platform",
    summary:
      "Full-stack environmental education SaaS platform for children, schools, teachers, parents, and individual learners.",
    problem:
      "Environmental learning lacks engaging, interactive digital tools for students and flexible subscription administration for participating educational institutions.",
    solution:
      "Architected a Next.js full-stack platform featuring AI-assisted learning, content narration, Paystack subscription billing, and containerized self-hosted infrastructure.",
    responsibilities: [
      "Owned full-stack product architecture across Next.js App Router, TypeScript, and PostgreSQL",
      "Integrated Paystack subscription billing and school licensing management",
      "Implemented AI-assisted content narration and interactive quiz workflows",
      "Deployed and operate production stack on Proxmox, Docker, Coolify, and Cloudflare"
    ],
    impactMetrics: [
      "Full SaaS architecture with multi-role access (students, teachers, schools)",
      "Self-hosted on custom Homelab (Proxmox + Coolify) with 99.9% uptime",
      "Integrated Paystack subscription processing"
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Tailwind CSS",
      "Docker",
      "Proxmox",
      "Coolify",
      "Cloudflare",
      "Paystack"
    ],
    category: "Frontend",
    featured: true,
    year: 2026,
    screenshots: [
      { src: "/projects/placeholder.svg", alt: "EcoCoders learning portal" },
      { src: "/projects/placeholder.svg", alt: "Student interactive dashboard" }
    ],
    links: {
      live: "https://ecocoders.cobbold.dev"
    },
    architecture: {
      title: "EcoCoders Stack Topology",
      mermaid: `flowchart TD\nA[Cloudflare Ingress] --> B[Coolify / Docker Container]\nB --> C[Next.js App Router]\nC --> D[(PostgreSQL Database)]\nC --> E[Paystack Billing Gateway]\nC --> F[AI Narration Engine]`
    }
  },
  {
    slug: "bernie-ai-assistant-platform",
    title: "Bernie AI — Android AI Assistant Platform",
    summary:
      "Intelligent mobile assistant integrating conversational LLMs, task automation, scheduling, and background notifications.",
    problem:
      "Traditional assistant apps lack context awareness across developer reminders, personal tasks, and external API workflows.",
    solution:
      "Engineered a native Android assistant with Jetpack Compose, AWS Cognito authentication, LLM API integration, and WorkManager background scheduling.",
    responsibilities: [
      "Built native Android client using Jetpack Compose, Hilt DI, and Retrofit",
      "Implemented real-time LLM chat experiences and conversational memory",
      "Engineered secure AWS Cognito authentication and protected navigation",
      "Designed background automation workflows for notifications and productivity tasks"
    ],
    impactMetrics: [
      "Real-time streaming LLM conversational interactions",
      "Robust local persistence and offline task queuing with Room",
      "Automated background scheduling and notification handling"
    ],
    techStack: [
      "Kotlin",
      "Jetpack Compose",
      "Hilt",
      "Retrofit",
      "Room",
      "WorkManager",
      "AWS Cognito",
      "LLM APIs"
    ],
    category: "Mobile",
    featured: true,
    year: 2026,
    screenshots: [
      { src: "/projects/placeholder.svg", alt: "Bernie AI chat screen" },
      { src: "/projects/placeholder.svg", alt: "Task automation manager" }
    ],
    links: {
      github: "https://github.com/cobbold0"
    },
    architecture: {
      title: "Bernie AI Architecture",
      mermaid: `flowchart LR\nA[Compose UI] --> B[Hilt / ViewModel]\nB --> C[Retrofit LLM Client]\nB --> D[Room Local DB]\nB --> E[WorkManager Scheduler]`
    }
  },
  {
    slug: "debbie-automation-assistant",
    title: "Debbie — Telegram & WhatsApp Automation Assistant",
    summary:
      "Intelligent personal automation platform built on n8n connecting messaging channels, Google Calendar, Contacts, and infrastructure monitoring.",
    problem:
      "Manual coordination between calendar events, contact follow-ups, and homelab alerts created recurring operational friction.",
    solution:
      "Built multi-node workflow automation pipelines using n8n to parse natural messaging commands, query APIs, sync schedules, and deliver server health alerts.",
    responsibilities: [
      "Designed multi-node webhook and API integration workflows in n8n",
      "Integrated Telegram Bot API and WhatsApp Business endpoints",
      "Connected Google Workspace APIs (Calendar, Contacts) for automated scheduling",
      "Implemented infrastructure alert monitoring for homelab services"
    ],
    impactMetrics: [
      "Automates 20+ daily recurring productivity and monitoring workflows",
      "Unified messaging interface for server status and calendar management",
      "Zero-maintenance containerized pipeline on Docker"
    ],
    techStack: [
      "n8n",
      "Node.js",
      "Telegram API",
      "WhatsApp API",
      "Google Calendar API",
      "Docker",
      "REST APIs"
    ],
    category: "Backend",
    featured: false,
    year: 2026,
    screenshots: [
      { src: "/projects/placeholder.svg", alt: "n8n workflow canvas" },
      { src: "/projects/placeholder.svg", alt: "Bot interaction interface" }
    ],
    links: {
      github: "https://github.com/cobbold0"
    },
    architecture: {
      title: "Debbie Automation Pipeline",
      mermaid: `flowchart LR\nA[Telegram / WhatsApp] --> B[n8n Webhook Engine]\nB --> C[Google Calendar / Contacts]\nB --> D[Homelab Health Monitor]\nB --> E[Response Generator]`
    }
  },
  {
    slug: "homelab-self-hosted-infrastructure",
    title: "Homelab — Self-Hosted Production-Grade Cloud",
    summary:
      "High-availability self-hosted private cloud environment powering EcoCoders, automation bots, databases, and AI experiments.",
    problem:
      "Relying solely on external cloud providers for personal projects, micro-services, and databases incurred recurring costs with limited infrastructure control.",
    solution:
      "Designed and deployed a clustered homelab using Proxmox VE, Coolify PaaS, Docker containers, Cloudflare Tunnels, and Tailscale zero-trust networking.",
    responsibilities: [
      "Architected virtualization and container topology on Proxmox VE",
      "Configured Coolify PaaS for automated git-based deployments",
      "Provisioned and manage production PostgreSQL and Redis databases",
      "Secured remote ingress using Cloudflare Tunnels and Tailscale mesh VPN"
    ],
    impactMetrics: [
      "Hosts 10+ live services including EcoCoders and automation bots",
      "Zero open public ports with Cloudflare Tunnel & Tailscale security",
      "Automated daily database backups and container health monitoring"
    ],
    techStack: [
      "Proxmox",
      "Docker",
      "Coolify",
      "Cloudflare",
      "Tailscale",
      "PostgreSQL",
      "Redis",
      "Linux"
    ],
    category: "Backend",
    featured: false,
    year: 2026,
    screenshots: [
      { src: "/projects/placeholder.svg", alt: "Proxmox cluster dashboard" },
      { src: "/projects/placeholder.svg", alt: "Coolify deployment view" }
    ],
    links: {
      github: "https://github.com/cobbold0"
    },
    architecture: {
      title: "Homelab Cloud Architecture",
      mermaid: `flowchart TD\nA[Internet Traffic] --> B[Cloudflare Tunnel]\nB --> C[Proxmox VE Host]\nC --> D[Coolify PaaS Containers]\nD --> E[(PostgreSQL / Redis)]\nD --> F[EcoCoders & Services]\nC --> G[Tailscale Zero-Trust Remote Access]`
    }
  }
];

import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    slug: "phone-18-calculator-receipt-scanner",
    title: "Phone 18 Calculator — Receipt Scanner & Math Notes",
    summary:
      "Monetized Android productivity utility with 17,000+ downloads. Features an iOS-inspired fluid interface, scientific math engine, Math Notes, real-time receipt OCR scanner, and financial tools.",
    problem:
      "Standard mobile calculators lack integrated receipt OCR scanning for expense tracking, receipt itemization, and real-time equation evaluation directly from physical receipts.",
    solution:
      "Built a lightweight, beautifully styled Android calculator app combining fluid Glass UI themes, ML Kit text recognition for receipt scanning, financial tip/tax splitters, and AdMob monetization.",
    responsibilities: [
      "Designed and implemented complete architecture with Kotlin and Jetpack Compose",
      "Integrated ML Kit Vision OCR for real-time receipt scanning and automated total parsing",
      "Built currency converters, tax calculation, loan calculators, and editable calculation history",
      "Implemented monetization via Google AdMob and Google Play In-App Billing"
    ],
    impactMetrics: [
      "17,000+ Downloads on Google Play Store",
      "Fully monetized with active recurring ad and premium revenue",
      "High user retention with 4.5+ star review average"
    ],
    techStack: [
      "Kotlin",
      "Jetpack Compose",
      "ML Kit (OCR Vision)",
      "Android SDK",
      "Google AdMob",
      "In-App Billing",
      "Room DB"
    ],
    category: "Mobile",
    featured: true,
    year: 2025,
    screenshots: [
      { src: "/projects/placeholder.svg", alt: "Phone 18 Calculator interface" },
      { src: "/projects/placeholder.svg", alt: "Receipt scanner and math notes" }
    ],
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.cobbold.iphone17calculator"
    },
    architecture: {
      title: "Receipt Scanner & Math Engine",
      mermaid: `flowchart LR\nA[Camera / Receipt Image] --> B[ML Kit OCR Engine]\nB --> C[Equation & Total Parser]\nC --> D[Calculator State Engine]\nD --> E[Monetized Compose UI (AdMob)]`
    }
  },
  {
    slug: "shortcodes-ghana-events-ussd",
    title: "Shortcodes Ghana — USSD Shortcuts & Live Events Hub",
    summary:
      "Ghana's unified gateway for all telecom USSD shortcuts, commercial bank codes, and trending live events & festival ticketing hub (AfroFuture, Tidal Rave, Detty December).",
    problem:
      "Mobile subscribers and event-goers in Ghana face fragmented offline USSD banking codes and chaotic ticket purchasing across disparate channels.",
    solution:
      "Engineered an offline-first Android application and accompanying web platform combining instant offline shortcode dialing with live event discovery and verified mobile ticketing passes.",
    responsibilities: [
      "Engineered offline USSD shortcut dialer supporting MTN MoMo, Telecel Cash, and AT Ghana",
      "Built live events discovery engine with event categories, venue locations, and ticket tiers",
      "Implemented verified mobile ticket pass generation and QR validation",
      "Published, deployed, and actively maintain both the Android app and web platform"
    ],
    impactMetrics: [
      "Unified 100+ telecom, mobile banking, and government USSD shortcuts",
      "Live web portal and ticketing hub at shortcodes.cobbold.dev",
      "Published and maintained on Google Play Store with 4.8★ user rating"
    ],
    techStack: [
      "Android SDK",
      "Kotlin",
      "Jetpack Compose",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Mobile Money APIs"
    ],
    category: "Mobile",
    featured: true,
    year: 2026,
    screenshots: [
      { src: "/projects/placeholder.svg", alt: "Shortcodes Ghana directory" },
      { src: "/projects/placeholder.svg", alt: "Live events & ticketing hub" }
    ],
    links: {
      live: "https://shortcodes.cobbold.dev",
      playStore: "https://play.google.com/store/apps/details?id=com.cobbold.dialhash",
      github: "https://github.com/cobbold0/shortcodes"
    },
    architecture: {
      title: "Shortcodes & Events Engine Architecture",
      mermaid: `flowchart TD\nA[User] --> B[Shortcodes Mobile App / Web]\nB --> C[Offline USSD Engine (Telco Intents)]\nB --> D[Live Events Hub]\nD --> E[Verified Mobile Pass Issuer]\nC --> F[MTN / Telecel / AT Mobile Networks]`
    }
  },
  {
    slug: "datawise-data-usage-manager",
    title: "DataWise — Data Usage Manager & Firewall",
    summary:
      "Android network management utility that monitors cellular and Wi-Fi bundle consumption, forecasts usage, and features an on-device local firewall to block background data hogs.",
    problem:
      "Unexpected mobile background data consumption quickly depletes expensive prepaid cellular bundles in emerging markets without transparent user control.",
    solution:
      "Engineered an on-device Android data manager that tracks per-app bandwidth usage in real time and utilizes a local VpnService firewall to block background apps without external proxy servers.",
    responsibilities: [
      "Implemented local on-device VpnService packet filter for granular per-app data blocking",
      "Built background usage forecasting algorithms based on historical consumption",
      "Designed threshold alerting and custom daily/monthly quota notifications",
      "Published, deployed, and maintain the app on the Google Play Store"
    ],
    impactMetrics: [
      "Saves users up to 30% on monthly cellular data bundle consumption",
      "100% private: Zero external server routing using local Android VpnService",
      "Published and maintained on Google Play Store"
    ],
    techStack: [
      "Kotlin",
      "Android SDK",
      "VpnService",
      "Jetpack Compose",
      "Room DB",
      "WorkManager",
      "Coroutines"
    ],
    category: "Mobile",
    featured: true,
    year: 2025,
    screenshots: [
      { src: "/projects/placeholder.svg", alt: "DataWise usage dashboard" },
      { src: "/projects/placeholder.svg", alt: "Local firewall per-app control" }
    ],
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.cobbold.datawise"
    },
    architecture: {
      title: "Local Firewall & Telemetry Pipeline",
      mermaid: `flowchart TD\nA[Device Traffic] --> B[Local Android VpnService]\nB --> C{App Blocked for Mobile?}\nC -- Yes (Mobile) --> D[Drop Packet]\nC -- No / Wi-Fi --> E[Allow & Log Bytes in Room DB]\nE --> F[DataWise Analytics Dashboard]`
    }
  },
  {
    slug: "spool-media-downloader-audio-extraction",
    title: "Spool — High-Fidelity Stream Piping & Audio Extraction",
    summary:
      "High-performance online video capture and synchronous MP3 audio extraction utility for authorized web video streams, operating with zero server-side file storage.",
    problem:
      "Online media extraction tools are bloated with intrusive ad networks, slow server-side queues, and privacy-invasive tracking scripts.",
    solution:
      "Architected a clean, Apple-inspired Next.js web application that directly pipes streaming video up to 1080p and executes synchronous ffmpeg audio conversion on the fly with SSRF protection.",
    responsibilities: [
      "Built responsive, ultra-clean web interface with Next.js App Router and Tailwind CSS",
      "Engineered serverless stream piping avoiding permanent server disk usage",
      "Integrated synchronous ffmpeg MP3 audio extraction pipeline",
      "Enforced strict SSRF protection and safe streaming rate limits"
    ],
    impactMetrics: [
      "Live web utility at spool.cobbold.dev",
      "Direct client stream piping with zero storage overhead",
      "Instant 1080p video downloads and synchronous MP3 conversion"
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "ffmpeg",
      "Tailwind CSS",
      "Docker",
      "Vercel"
    ],
    category: "Frontend",
    featured: true,
    year: 2026,
    screenshots: [
      { src: "/projects/placeholder.svg", alt: "Spool video downloader homepage" },
      { src: "/projects/placeholder.svg", alt: "MP3 conversion progress screen" }
    ],
    links: {
      live: "https://spool.cobbold.dev",
      github: "https://github.com/cobbold0"
    },
    architecture: {
      title: "Stream Piping Pipeline",
      mermaid: `flowchart LR\nA[User Request URL] --> B[Next.js API Route]\nB --> C[SSRF Validation & Stream Parser]\nC --> D[ffmpeg Audio / Video Transcoder]\nD --> E[Chunked HTTP Response to Browser]`
    }
  },
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
    featured: false,
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
    featured: false,
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

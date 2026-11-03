import type { ExperienceItem } from "@/lib/types";

export const experience: ExperienceItem[] = [
  {
    role: "IT Specialist / CTO",
    company: "Basilissa",
    location: "Ghana",
    start: "2026-01",
    end: "Present",
    achievements: [
      "Lead the development of internal business systems supporting company operations, including customer feedback and HR assessment workflows.",
      "Translate business requirements into application features, system designs, database-backed workflows, and implementation plans.",
      "Work across frontend interfaces, backend services, API integrations, databases, and deployment infrastructure.",
      "Design workforce-management workflows covering attendance capture, location verification, approvals, exception handling, and integration with existing business systems.",
      "Evaluate authentication, permissions, hosting, and integration approaches to support maintainable and secure applications.",
      "Contribute to technical planning, development processes, infrastructure decisions, and the adoption of collaboration tools."
    ]
  },
  {
    role: "Software Developer (Android)",
    company: "Purple Wave, Inc. via DevOps Africa",
    location: "Remote",
    start: "2023-01",
    end: "2026-07",
    achievements: [
      "Developed and maintained production Android features using Kotlin, Java, Jetpack Compose, XML, Coroutines, CameraX, and WorkManager.",
      "Improved media capture reliability and performance for FieldTool, an application used by field operators to capture vehicle and equipment records for auction preparation.",
      "Optimised media upload and synchronisation workflows supporting more than 200 media files per asset and thousands of uploads per user daily.",
      "Investigated and resolved memory, stability, and performance issues during large media-capture sessions.",
      "Maintained and modernised a substantial legacy Android codebase while improving application architecture and user experience.",
      "Implemented offline-first data capture, local persistence, caching, and reliable synchronisation when connectivity returned.",
      "Used production diagnostics and telemetry to investigate defects and improve application reliability.",
      "Contributed to development workflows and automated build and release processes using GitHub Actions."
    ]
  },
  {
    role: "Website & Systems Administrator",
    company: "Awiebo College of Education",
    location: "Ghana",
    start: "2022-01",
    end: "2022-12",
    achievements: [
      "Managed the institution's website and digital infrastructure.",
      "Built and maintained admissions-related systems.",
      "Supported student, staff, and administrative technology needs.",
      "Implemented deployment workflows and technical documentation."
    ]
  }
];

export const education = [
  {
    title: "Diploma in Information Technology",
    issuer: "Kwame Nkrumah University of Science and Technology (KNUST)",
    year: "2026 - 2028"
  },
  {
    title: "Professional Software Development",
    issuer: "Codetrain",
    year: "2021 - 2022"
  }
];

export const certifications = [
  {
    title: "Practical Software Engineering & Mobile App Development",
    issuer: "Codetrain",
    year: "2022"
  }
];

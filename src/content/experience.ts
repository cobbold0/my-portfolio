import type { ExperienceItem } from "@/lib/types";

export const experience: ExperienceItem[] = [
  {
    role: "Senior Product Engineer",
    company: "Northstar Systems",
    location: "Austin, TX",
    start: "2023-01",
    end: "Present",
    achievements: [
      "Led full-stack initiatives across web and mobile products",
      "Introduced observability standards that reduced incident resolution time by 40%",
      "Mentored engineers and established reusable architecture templates"
    ]
  },
  {
    role: "Full Stack Engineer",
    company: "Blue Harbor Tech",
    location: "Remote",
    start: "2020-03",
    end: "2022-12",
    achievements: [
      "Delivered B2B commerce features used by 100k+ monthly users",
      "Modernized frontend stack and improved Core Web Vitals",
      "Implemented CI/CD quality gates and integration testing"
    ]
  }
];

export const education = [
  {
    title: "B.S. Computer Science",
    issuer: "University of Texas",
    year: "2019"
  }
];

export const certifications = [
  {
    title: "AWS Certified Developer - Associate",
    issuer: "Amazon Web Services",
    year: "2024"
  }
];

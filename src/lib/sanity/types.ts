import type { Metric, Project, SocialLink } from "@/lib/types";
import type { ReactNode } from "react";

export type SiteSettingsData = {
  name: string;
  roleLine: string;
  tagline: string;
  shortBio: string;
  profileImage?: string;
  location: string;
  timezone: string;
  email: string;
  phone?: string;
  availableToMentor?: boolean;
  socials: SocialLink[];
  metrics: Metric[];
  linkedinEndorsements: {
    skill: string;
    endorsementCount: number;
    topEndorsers?: string[];
    proofImage?: string;
    proofUrl?: string;
  }[];
  resumeUrl: string;
  seo?: {
    title?: string;
    description?: string;
    ogImage?: string;
  };
};

export type ExperienceData = {
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  achievements: string[];
  techStack?: string[];
};

export type TestimonialData = {
  name: string;
  role: string;
  quote: string;
  avatar?: string;
};

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  coverImage: string;
  readingTime: string;
  shareOnLinkedIn?: boolean;
};

export type BlogPostDetail = {
  frontmatter: {
    title: string;
    date: string;
    tags: string[];
    summary: string;
    coverImage: string;
  };
  readingTime: string;
  headings: { text: string; id: string }[];
  source: "sanity" | "local";
  shareOnLinkedIn?: boolean;
  content?: ReactNode;
  body?: unknown[];
};

export type ProjectData = Project;

export type AppPolicyMeta = {
  title: string;
  appName: string;
  appSlug: string;
  policyType: string;
  summary?: string;
  lastUpdated?: string;
};

export type AppPolicyDetail = AppPolicyMeta & {
  body: unknown[];
  headings: { text: string; id: string }[];
};

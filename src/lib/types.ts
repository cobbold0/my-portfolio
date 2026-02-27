export type SocialLink = {
  label: string;
  href: string;
};

export type Metric = {
  label: string;
  value: string;
};

export type SkillGroup = {
  category: "Backend" | "Frontend" | "Mobile" | "Tools";
  items: string[];
};

export type ProjectCategory = "Backend" | "Frontend" | "Mobile";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  responsibilities: string[];
  impactMetrics: string[];
  techStack: string[];
  category: ProjectCategory;
  featured: boolean;
  year: number;
  screenshots: { src: string; alt: string }[];
  links: {
    github?: string;
    live?: string;
    playStore?: string;
  };
  architecture: {
    title: string;
    mermaid: string;
  };
};

export type ExperienceItem = {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  achievements: string[];
};

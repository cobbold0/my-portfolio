import readingTime from "reading-time";
import { profile as localProfile, socials as localSocials, metrics as localMetrics, linkedinEndorsements as localLinkedInEndorsements } from "@/content/profile";
import { projects as localProjects } from "@/content/projects";
import { experience as localExperience } from "@/content/experience";
import { skills as localSkills } from "@/content/skills";
import { testimonials as localTestimonials } from "@/content/testimonials";
import type { Project, SkillGroup, SkillItem, SkillStrength } from "@/lib/types";
import { client, dataset, projectId } from "@/lib/sanity/client";
import {
  experienceQuery,
  postBySlugQuery,
  postsQuery,
  projectBySlugQuery,
  projectsQuery,
  skillsQuery,
  siteSettingsQuery,
  testimonialsQuery
} from "@/lib/sanity/queries";
import type { BlogPostDetail, BlogPostMeta, ExperienceData, SiteSettingsData, TestimonialData } from "@/lib/sanity/types";
import { urlForImage } from "@/lib/sanity/image";

function hasSanityConfig() {
  return Boolean(projectId && dataset);
}

type SanityImage = {
  asset?: { _ref?: string };
};

type SanityProject = {
  title: string;
  slug: string;
  summary: string;
  categories?: string[];
  featured?: boolean;
  publishedAt?: string;
  techStack?: string[];
  responsibilities?: string[];
  problem: string;
  solution: string;
  impactMetrics?: string[];
  links?: {
    github?: string;
    live?: string;
    playStore?: string;
  };
  coverImage?: SanityImage;
  galleryImages?: SanityImage[];
  architecture?: {
    title?: string;
    mermaid?: string;
  };
};

type SanityPost = {
  title: string;
  slug: string;
  publishedAt: string;
  summary: string;
  tags?: string[];
  coverImage?: SanityImage;
  body?: unknown[];
  readingTime?: string;
  shareOnLinkedIn?: boolean;
};

type SanitySkill = {
  name: string;
  category: string;
  level?: number;
  categoryLevel?: string;
  order?: number;
};

function mapSanityProject(project: SanityProject): Project {
  const rawCategory = (project.categories?.[0] || "backend").toLowerCase();
  const category = rawCategory === "frontend" ? "Frontend" : rawCategory === "mobile" ? "Mobile" : "Backend";
  const cover = urlForImage(project.coverImage);
  const gallery = (project.galleryImages || [])
    .map((image, index) => ({ src: urlForImage(image), alt: `${project.title} screenshot ${index + 1}` }))
    .filter((item): item is { src: string; alt: string } => Boolean(item.src));  const screenshots = [
    ...(cover ? [{ src: cover, alt: `${project.title} cover` }] : []),
    ...gallery
  ];

  return {
    slug: project.slug,
    title: project.title,
    summary: project.summary,
    problem: project.problem,
    solution: project.solution,
    responsibilities: project.responsibilities || [],
    impactMetrics: project.impactMetrics || [],
    techStack: project.techStack || [],
    category,
    featured: Boolean(project.featured),
    year: project.publishedAt ? new Date(project.publishedAt).getFullYear() : new Date().getFullYear(),
    screenshots: screenshots,
    links: project.links || {},
    architecture: {
      title: project.architecture?.title || "Architecture",
      mermaid: project.architecture?.mermaid || "flowchart LR\nA[Client] --> B[Service]\nB --> C[(Database)]"
    }
  };
}

function portableTextToPlainText(blocks: unknown[] = []) {
  return blocks
    .map((block) => {
      if (!block || typeof block !== "object") return "";
      const maybe = block as { _type?: string; children?: Array<{ text?: string }>; code?: string };
      if (maybe._type === "block" && Array.isArray(maybe.children)) {
        return maybe.children.map((child) => child.text || "").join("");
      }
      if (maybe._type === "codeBlock") {
        return maybe.code || "";
      }
      return "";
    })
    .join("\n");
}

function portableTextHeadings(blocks: unknown[] = []) {
  return blocks
    .filter((block): block is { _type: string; style?: string; children?: Array<{ text?: string }> } => {
      if (!block || typeof block !== "object") return false;
      const maybe = block as { _type?: string; style?: string };
      return maybe._type === "block" && ["h2", "h3"].includes(maybe.style || "");
    })
    .map((block) => {
      const text = (block.children || []).map((child) => child.text || "").join("").trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      return { text, id };
    })
    .filter((item) => item.text.length > 0);
}

export async function getSiteSettingsFromSanity(): Promise<SiteSettingsData | null> {
  if (!hasSanityConfig()) return null;

  const data = await client.fetch<{
    name?: string;
    roleLine?: string;
    tagline?: string;
    bio?: string;
    profileImage?: SanityImage;
    location?: string;
    timezone?: string;
    email?: string;
    phone?: string;
    availableToMentor?: boolean;
    socials?: SiteSettingsData["socials"];
    metrics?: SiteSettingsData["metrics"];
    linkedinEndorsements?: SiteSettingsData["linkedinEndorsements"];
    defaultSeo?: { title?: string; description?: string; ogImage?: SanityImage };
    primaryCtas?: { resumeUrl?: string };
    resumeFileUrl?: string;
    resumeUrl?: string;
  }>(siteSettingsQuery, {}, { next: { tags: ["settings"] } });
  if (!data) return null;

  return {
    name: data.name || localProfile.name,
    roleLine: data.roleLine || localProfile.roleLine,
    tagline: data.tagline || localProfile.tagline,
    shortBio: data.bio || localProfile.shortBio,
    profileImage: urlForImage(data.profileImage) || undefined,
    location: data.location || localProfile.location,
    timezone: data.timezone || localProfile.timezone,
    email: data.email || localProfile.email,
    phone: data.phone,
    availableToMentor: Boolean(data.availableToMentor),
    socials: data.socials?.length ? data.socials : localSocials,
    metrics: data.metrics?.length ? data.metrics : localMetrics,
    linkedinEndorsements: data.linkedinEndorsements?.length ? data.linkedinEndorsements : localLinkedInEndorsements,
    resumeUrl: data.resumeFileUrl || data.resumeUrl || data.primaryCtas?.resumeUrl || "/resume.pdf",
    seo: {
      title: data.defaultSeo?.title,
      description: data.defaultSeo?.description,
      ogImage: urlForImage(data.defaultSeo?.ogImage) || undefined
    }
  };
}

export async function getProjectsFromSanity(): Promise<Project[]> {
  if (!hasSanityConfig()) return [];

  const data = await client.fetch<SanityProject[]>(projectsQuery, {}, { next: { tags: ["projects"] } });
  return data?.map(mapSanityProject) || [];
}

export async function getProjectBySlugFromSanity(slug: string): Promise<Project | null> {
  if (!hasSanityConfig()) return null;

  const data = await client.fetch<SanityProject | null>(projectBySlugQuery, { slug }, { next: { tags: ["projects", `project:${slug}`] } });
  return data ? mapSanityProject(data) : null;
}

export async function getPostsMetaFromSanity(): Promise<BlogPostMeta[]> {
  if (!hasSanityConfig()) return [];

  const data = await client.fetch<SanityPost[]>(postsQuery, {}, { next: { tags: ["posts"] } });

  const posts: SanityPost[] = data || [];
  return posts.map((post: SanityPost) => {
    const plainText = portableTextToPlainText(post.body || []);
    return {
      slug: post.slug,
      title: post.title,
      date: post.publishedAt,
      tags: post.tags || [],
      summary: post.summary,
      coverImage: urlForImage(post.coverImage) || "/projects/placeholder.svg",
      readingTime: post.readingTime || readingTime(plainText).text || "1 min read",
      shareOnLinkedIn: Boolean(post.shareOnLinkedIn)
    };
  });
}

export async function getPostBySlugFromSanity(slug: string): Promise<BlogPostDetail | null> {
  if (!hasSanityConfig()) return null;

  const post = await client.fetch<SanityPost | null>(postBySlugQuery, { slug }, { next: { tags: ["posts", `post:${slug}`] } });
  if (!post) return null;

  const text = portableTextToPlainText(post.body || []);

  return {
    source: "sanity",
    frontmatter: {
      title: post.title,
      date: post.publishedAt,
      tags: post.tags || [],
      summary: post.summary,
      coverImage: urlForImage(post.coverImage) || "/projects/placeholder.svg"
    },
    readingTime: post.readingTime || readingTime(text).text || "1 min read",
    shareOnLinkedIn: Boolean(post.shareOnLinkedIn),
    headings: portableTextHeadings(post.body || []),
    body: post.body || []
  };
}

export async function getExperienceFromSanity(): Promise<ExperienceData[]> {
  if (!hasSanityConfig()) return [];

  const data = await client.fetch<Array<{ company: string; role: string; location?: string; startDate: string; endDate?: string; highlights?: string[]; techStack?: string[] }>>(
    experienceQuery,
    {},
    { next: { tags: ["experience"] } }
  );

  const items = data || [];
  return items.map((item) => ({
    company: item.company,
    role: item.role,
    location: item.location || "",
    start: item.startDate?.slice(0, 7) || "",
    end: item.endDate ? item.endDate.slice(0, 7) : "Present",
    achievements: item.highlights || [],
    techStack: item.techStack || []
  }));
}

export async function getTestimonialsFromSanity(): Promise<TestimonialData[]> {
  if (!hasSanityConfig()) return [];

  const data = await client.fetch<Array<{ name: string; role: string; company?: string; quote: string; avatar?: SanityImage }>>(
    testimonialsQuery,
    {},
    { next: { tags: ["testimonials"] } }
  );

  const items = data || [];
  return items.map((item) => ({
    name: item.name,
    role: item.company ? `${item.role}, ${item.company}` : item.role,
    quote: item.quote,
    avatar: urlForImage(item.avatar) || undefined
  }));
}

const skillCategoryMap: Record<string, SkillGroup["category"]> = {
  frontend: "Frontend",
  backend: "Backend",
  mobile: "Mobile",
  tools: "Tools",
  other: "Other"
};

const defaultSkillStrengthByCategory: Record<SkillGroup["category"], SkillStrength> = {
  Backend: "ADVANCED",
  Frontend: "BEGINNER",
  Mobile: "ADVANCED",
  Tools: "INTERMEDIATE",
  Other: "INTERMEDIATE"
};

function normalizeSkillStrength(level?: string, category?: SkillGroup["category"]): SkillStrength {
  if (level === "BEGINNER" || level === "INTERMEDIATE" || level === "ADVANCED" || level === "EXPERT") return level;
  if (category) return defaultSkillStrengthByCategory[category];
  return "INTERMEDIATE";
}

function normalizeSkillLevel(level?: number): SkillItem["level"] {
  if (typeof level !== "number" || Number.isNaN(level)) return 3;
  const rounded = Math.round(level);
  if (rounded < 1) return 1;
  if (rounded > 5) return 5;
  return rounded as SkillItem["level"];
}

export async function getSkillsFromSanity(): Promise<SkillGroup[]> {
  if (!hasSanityConfig()) return [];

  const data = await client.fetch<SanitySkill[]>(skillsQuery, {}, { next: { tags: ["skills"] } });
  const items = data || [];
  if (!items.length) return [];

  const grouped = new Map<SkillGroup["category"], { level: SkillStrength; items: SkillItem[] }>();
  for (const item of items) {
    const category = skillCategoryMap[(item.category || "").toLowerCase()] || "Other";
    if (!category || !item.name) continue;

    const existing = grouped.get(category) || { level: normalizeSkillStrength(item.categoryLevel, category), items: [] };
    if (item.categoryLevel) {
      existing.level = normalizeSkillStrength(item.categoryLevel, category);
    }
    existing.items.push({
      name: item.name,
      level: normalizeSkillLevel(item.level)
    });
    grouped.set(category, existing);
  }

  const orderedCategories: SkillGroup["category"][] = ["Mobile", "Backend", "Frontend", "Tools", "Other"];
  return orderedCategories
    .filter((category) => (grouped.get(category)?.items.length || 0) > 0)
    .map((category) => ({
      category,
      level: grouped.get(category)?.level || defaultSkillStrengthByCategory[category],
      items: grouped.get(category)?.items || []
    }));
}

export function getLocalDefaults() {
  return {
    profile: localProfile,
    socials: localSocials,
    metrics: localMetrics,
    linkedinEndorsements: localLinkedInEndorsements,
    projects: localProjects,
    experience: localExperience,
    testimonials: localTestimonials,
    skills: localSkills
  };
}


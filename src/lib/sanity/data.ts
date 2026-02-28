import readingTime from "reading-time";
import { profile as localProfile, socials as localSocials, metrics as localMetrics } from "@/content/profile";
import { projects as localProjects } from "@/content/projects";
import { experience as localExperience } from "@/content/experience";
import { testimonials as localTestimonials } from "@/content/testimonials";
import type { Project } from "@/lib/types";
import { client, dataset, projectId } from "@/lib/sanity/client";
import {
  experienceQuery,
  postBySlugQuery,
  postsQuery,
  projectBySlugQuery,
  projectsQuery,
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
    location?: string;
    timezone?: string;
    email?: string;
    phone?: string;
    socials?: SiteSettingsData["socials"];
    metrics?: SiteSettingsData["metrics"];
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
    location: data.location || localProfile.location,
    timezone: data.timezone || localProfile.timezone,
    email: data.email || localProfile.email,
    phone: data.phone,
    socials: data.socials?.length ? data.socials : localSocials,
    metrics: data.metrics?.length ? data.metrics : localMetrics,
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
      readingTime: post.readingTime || readingTime(plainText).text || "1 min read"
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

export function getLocalDefaults() {
  return {
    profile: localProfile,
    socials: localSocials,
    metrics: localMetrics,
    projects: localProjects,
    experience: localExperience,
    testimonials: localTestimonials
  };
}


import "dotenv/config";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { createClient } from "@sanity/client";
import { profile, socials, metrics } from "../src/content/profile";
import { projects } from "../src/content/projects";
import { experience } from "../src/content/experience";
import { testimonials } from "../src/content/testimonials";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN");
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false
});

function toPortableTextParagraphs(source: string) {
  return source
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph, index) => ({
      _key: `p${index}`,
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: `c${index}`,
          _type: "span",
          marks: [],
          text: paragraph
        }
      ]
    }));
}

async function seedSiteSettings() {
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    name: profile.name,
    roleLine: profile.roleLine,
    tagline: profile.tagline,
    bio: profile.shortBio,
    location: profile.location,
    timezone: profile.timezone,
    email: profile.email,
    socials,
    metrics,
    resumeUrl: "/resume.pdf",
    defaultSeo: {
      title: `${profile.name} Portfolio`,
      description: profile.tagline
    },
    primaryCtas: {
      projectsUrl: "/projects",
      contactUrl: "/contact",
      resumeUrl: "/resume.pdf"
    }
  });
}

async function seedProjects() {
  for (const project of projects) {
    const publishedAt = `${project.year}-01-01T00:00:00.000Z`;

    await client.createOrReplace({
      _id: `project.${project.slug}`,
      _type: "project",
      title: project.title,
      slug: { _type: "slug", current: project.slug },
      summary: project.summary,
      categories: [project.category.toLowerCase()],
      featured: project.featured,
      publishedAt,
      techStack: project.techStack,
      responsibilities: project.responsibilities,
      problem: project.problem,
      solution: project.solution,
      impactMetrics: project.impactMetrics,
      links: project.links,
      architecture: project.architecture
    });
  }
}

async function seedExperience() {
  for (const item of experience) {
    await client.createOrReplace({
      _id: `experience.${item.company.toLowerCase().replace(/\s+/g, "-")}.${item.role.toLowerCase().replace(/\s+/g, "-")}`,
      _type: "experience",
      company: item.company,
      role: item.role,
      location: item.location,
      startDate: `${item.start}-01`,
      endDate: item.end === "Present" ? undefined : `${item.end}-01`,
      highlights: item.achievements
    });
  }
}

async function seedTestimonials() {
  for (const [index, item] of testimonials.entries()) {
    await client.createOrReplace({
      _id: `testimonial.${index + 1}`,
      _type: "testimonial",
      name: item.name,
      role: item.role,
      quote: item.quote
    });
  }
}

async function seedPosts() {
  const blogDir = path.join(process.cwd(), "src", "content", "blog");
  const files = (await fs.readdir(blogDir)).filter((file) => file.endsWith(".mdx"));

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const raw = await fs.readFile(path.join(blogDir, file), "utf8");
    const { data, content } = matter(raw);

    const title = String(data.title || slug);
    const publishedAt = String(data.date || new Date().toISOString());
    const summary = String(data.summary || "");
    const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];

    await client.createOrReplace({
      _id: `post.${slug}`,
      _type: "post",
      title,
      slug: { _type: "slug", current: slug },
      publishedAt,
      summary,
      tags,
      readingTime: undefined,
      body: toPortableTextParagraphs(content)
    });
  }
}

async function main() {
  await seedSiteSettings();
  await seedProjects();
  await seedPosts();
  await seedExperience();
  await seedTestimonials();

  console.log("Sanity seed complete.");
  console.log("Note: local MDX posts are converted to plain paragraph Portable Text blocks.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getAllPostSlugs } from "@/lib/blog";
import { getProjectsData } from "@/lib/content";
import { getAllAppPolicyParams } from "@/lib/policies";
import { tools } from "@/lib/tools";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogSlugs, projects, policies] = await Promise.all([
    getAllPostSlugs().catch(() => []),
    getProjectsData().catch(() => []),
    getAllAppPolicyParams().catch(() => [])
  ]);
  const now = new Date();

  const staticPages = ["", "/about", "/skills", "/tools", "/projects", "/blog", "/resume", "/contact"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7
  }));

  const toolPages = tools.map((tool) => ({
    url: `${siteConfig.url}/tools/${tool.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));

  const projectPages = projects.map((project) => ({
    url: `${siteConfig.url}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));

  const blogPages = blogSlugs.map((slug) => ({
    url: `${siteConfig.url}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));

  const policyPages = policies.map(({ app, policy }) => ({
    url: `${siteConfig.url}/${app}/${policy}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5
  }));

  return [...staticPages, ...toolPages, ...projectPages, ...blogPages, ...policyPages];
}

import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/studio/", "/api/"]
      },
      {
        userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Applebot-Extended"],
        allow: ["/", "/blog", "/projects", "/tools", "/about", "/llms.txt"],
        disallow: ["/studio", "/api/"]
      }
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`
  };
}

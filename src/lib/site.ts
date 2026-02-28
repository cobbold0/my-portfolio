export const siteConfig = {
  name: "Portfolio",
  description: "Backend, Frontend, and Mobile engineering portfolio with projects, writing, and resume.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  keywords: ["portfolio", "backend engineer", "frontend engineer", "mobile engineer", "next.js", "typescript"],
  authors: [{ name: "Portfolio Owner" }]
};

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path}`;
}

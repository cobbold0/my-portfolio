function normalizeUrl(url: string) {
  return url.trim().replace(/\/+$/, "");
}

function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit && !/^https?:\/\/localhost(?::\d+)?\/?$/i.test(explicit)) {
    return normalizeUrl(explicit);
  }

  // Vercel exposes the canonical production domain in this variable.
  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProductionUrl) {
    return normalizeUrl(`https://${vercelProductionUrl}`);
  }

  // Preview deployments expose this host.
  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) {
    return normalizeUrl(`https://${vercelUrl}`);
  }

  if (explicit) {
    return normalizeUrl(explicit);
  }

  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Portfolio",
  description: "Backend, Frontend, and Mobile engineering portfolio with projects, writing, and resume.",
  url: getSiteUrl(),
  keywords: ["portfolio", "backend engineer", "frontend engineer", "mobile engineer", "next.js", "typescript"],
  authors: [{ name: "Portfolio Owner" }]
};

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path}`;
}

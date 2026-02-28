export type LinkedInProfile = {
  vanity: string;
  profileUrl: string;
};

export function getLinkedInProfileFromUrl(url?: string): LinkedInProfile | null {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    if (!host.includes("linkedin.com")) return null;

    const segments = parsed.pathname.split("/").filter(Boolean);
    const inIndex = segments.findIndex((segment) => segment.toLowerCase() === "in");
    if (inIndex < 0 || inIndex + 1 >= segments.length) return null;

    const vanity = segments[inIndex + 1].trim().replace(/^@/, "");
    if (!vanity) return null;

    return {
      vanity,
      profileUrl: `https://www.linkedin.com/in/${vanity}`
    };
  } catch {
    return null;
  }
}

export type ContentSource = "sanity" | "local";

export function getContentSource(): ContentSource {
  const value = process.env.CONTENT_SOURCE?.toLowerCase();
  if (value === "local") return "local";
  return "sanity";
}

export function isSanityEnabled() {
  return Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET);
}

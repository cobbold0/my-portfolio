type EnvMap = Record<string, string | undefined>;

const viteEnv: EnvMap | undefined =
  typeof import.meta !== "undefined" ? (import.meta as { env?: EnvMap }).env : undefined;

const nodeEnv: EnvMap | undefined = typeof process !== "undefined" ? process.env : undefined;

const readEnv = (...keys: string[]): string | undefined => {
  for (const key of keys) {
    const viteValue = viteEnv?.[key];
    if (viteValue) return viteValue;
    const nodeValue = nodeEnv?.[key];
    if (nodeValue) return nodeValue;
  }
  return undefined;
};

export const projectId = readEnv("SANITY_STUDIO_PROJECT_ID", "NEXT_PUBLIC_SANITY_PROJECT_ID") || "";
export const dataset = readEnv("SANITY_STUDIO_DATASET", "NEXT_PUBLIC_SANITY_DATASET") || "production";
export const apiVersion =
  readEnv("SANITY_STUDIO_API_VERSION", "NEXT_PUBLIC_SANITY_API_VERSION") || "2025-01-01";

if (!projectId) {
  console.warn(
    "Missing SANITY_STUDIO_PROJECT_ID (or NEXT_PUBLIC_SANITY_PROJECT_ID). Sanity Studio will not connect until configured."
  );
}

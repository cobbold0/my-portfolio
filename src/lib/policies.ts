import { getContentSource, isSanityEnabled } from "@/lib/content-source";
import { getAllAppPoliciesFromSanity, getAppPolicyBySlugFromSanity } from "@/lib/sanity/data";
import type { AppPolicyDetail } from "@/lib/sanity/types";

export const reservedAppSlugs = new Set([
  "about",
  "api",
  "blog",
  "contact",
  "projects",
  "resume",
  "skills",
  "studio",
  "tools"
]);

const slugPattern = /^[a-z0-9-]+$/;

export function isValidPolicySlug(value: string) {
  return slugPattern.test(value);
}

export async function getAllAppPolicyParams() {
  if (getContentSource() !== "sanity" || !isSanityEnabled()) return [];

  const policies = await getAllAppPoliciesFromSanity();
  return policies
    .filter((policy) => !reservedAppSlugs.has(policy.appSlug))
    .map((policy) => ({ app: policy.appSlug, policy: policy.policyType }));
}

export async function getAppPolicy(app: string, policy: string): Promise<AppPolicyDetail | null> {
  if (!isValidPolicySlug(app) || !isValidPolicySlug(policy)) return null;
  if (reservedAppSlugs.has(app)) return null;
  if (getContentSource() !== "sanity" || !isSanityEnabled()) return null;

  return getAppPolicyBySlugFromSanity(app, policy);
}

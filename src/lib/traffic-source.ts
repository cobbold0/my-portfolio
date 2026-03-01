export type TrafficSource = "internal_navigation" | "google_search" | "search_engine" | "referral" | "direct_or_unknown";

function getReferrerHost(referrer: string) {
  if (!referrer) return "";
  try {
    return new URL(referrer).hostname.toLowerCase();
  } catch {
    return "";
  }
}

export function classifyTrafficSource(navContext: string, referrer: string, currentHost: string): TrafficSource {
  if (navContext && navContext !== "direct_or_unknown") return "internal_navigation";
  const host = getReferrerHost(referrer);
  if (!host) return "direct_or_unknown";
  if (host === currentHost || host.endsWith(`.${currentHost}`)) return "internal_navigation";
  if (host.includes("google.")) return "google_search";
  if (/(bing\.|yahoo\.|duckduckgo\.|baidu\.|yandex\.)/.test(host)) return "search_engine";
  return "referral";
}

export function getReferrerHostSafe(referrer: string) {
  return getReferrerHost(referrer) || "none";
}


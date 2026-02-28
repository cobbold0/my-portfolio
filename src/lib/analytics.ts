export type AnalyticsEventName =
  | "page_view"
  | "page_engagement"
  | "section_engagement"
  | "home_scroll_bottom"
  | "navigation_click"
  | "click_project"
  | "project_view"
  | "click_blog"
  | "blog_view"
  | "download_cv"
  | "social_click"
  | "submit_contact"
  | "outbound_click";

export type AnalyticsPayload = {
  name: AnalyticsEventName;
  properties?: Record<string, string | number | boolean>;
};

export type AnalyticsAdapter = {
  track: (event: AnalyticsPayload) => void;
};

class NoopAnalytics implements AnalyticsAdapter {
  track(_event: AnalyticsPayload) {
    // Intentionally empty: default safe no-op adapter.
  }
}

let adapter: AnalyticsAdapter = new NoopAnalytics();
const pendingEvents: AnalyticsPayload[] = [];
const NAV_CONTEXT_KEY = "analytics_nav_context";

export function setAnalyticsAdapter(nextAdapter: AnalyticsAdapter) {
  adapter = nextAdapter;
  while (pendingEvents.length > 0) {
    const event = pendingEvents.shift();
    if (event) adapter.track(event);
  }
}

export function trackEvent(event: AnalyticsPayload) {
  if (adapter instanceof NoopAnalytics) {
    pendingEvents.push(event);
    return;
  }
  adapter.track(event);
}

export function setNavigationContext(value: string) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(NAV_CONTEXT_KEY, value);
}

export function consumeNavigationContext() {
  if (typeof window === "undefined") return "";
  const value = window.sessionStorage.getItem(NAV_CONTEXT_KEY) || "";
  if (value) window.sessionStorage.removeItem(NAV_CONTEXT_KEY);
  return value;
}

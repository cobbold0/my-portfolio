export type AnalyticsEventName = "page_view" | "click_project" | "submit_contact";

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

export function setAnalyticsAdapter(nextAdapter: AnalyticsAdapter) {
  adapter = nextAdapter;
}

export function trackEvent(event: AnalyticsPayload) {
  adapter.track(event);
}

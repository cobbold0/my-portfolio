"use client";

import { useEffect } from "react";
import { setNavigationContext, trackEvent, type AnalyticsEventName, type AnalyticsPayload } from "@/lib/analytics";

function readAnalyticsElement(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) return null;
  return target.closest<HTMLElement>("[data-analytics-event]");
}

function extractProperties(element: HTMLElement): AnalyticsPayload["properties"] {
  const props: Record<string, string | number | boolean> = {};
  const dataset = element.dataset;

  if (dataset.analyticsSource) props.source = dataset.analyticsSource;
  if (dataset.analyticsLabel) props.label = dataset.analyticsLabel;
  if (dataset.analyticsTarget) props.target = dataset.analyticsTarget;
  if (dataset.analyticsSlug) props.slug = dataset.analyticsSlug;
  if (dataset.analyticsSection) props.section = dataset.analyticsSection;
  if (dataset.analyticsSurface) props.surface = dataset.analyticsSurface;

  return Object.keys(props).length > 0 ? props : undefined;
}

export function AnalyticsClickTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const element = readAnalyticsElement(event.target);
      if (!element) return;

      const eventName = element.dataset.analyticsEvent as AnalyticsEventName | undefined;
      if (!eventName) return;

      const navContext = element.dataset.analyticsNavContext;
      if (navContext) setNavigationContext(navContext);

      trackEvent({
        name: eventName,
        properties: extractProperties(element)
      });
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

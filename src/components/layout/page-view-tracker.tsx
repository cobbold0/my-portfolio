"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { consumeNavigationContext, trackEvent } from "@/lib/analytics";

export function PageViewTracker() {
  const pathname = usePathname();
  const flushRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const navContext = consumeNavigationContext() || "direct_or_unknown";
    trackEvent({ name: "page_view", properties: { pathname, nav_context: navContext } });

    const startedAt = Date.now();
    let maxScrollPercent = 0;
    let sentHomeBottom = false;

    const sectionTotals = new Map<string, number>();
    const sectionActiveSince = new Map<string, number>();
    const sectionNodes: Element[] = [];
    let observer: IntersectionObserver | null = null;

    const detailMatch = pathname.match(/^\/(projects|blog)\/([^/]+)$/);
    if (detailMatch) {
      const [, type, slug] = detailMatch;
      trackEvent({
        name: type === "projects" ? "project_view" : "blog_view",
        properties: { slug, nav_context: navContext }
      });
    }

    const onScroll = () => {
      const viewportHeight = window.innerHeight || 1;
      const fullHeight = document.documentElement.scrollHeight || 1;
      const scrollTop = window.scrollY || 0;
      const scrollable = Math.max(fullHeight - viewportHeight, 1);
      const percent = Math.min(100, Math.round((scrollTop / scrollable) * 100));
      if (percent > maxScrollPercent) maxScrollPercent = percent;

      if (!sentHomeBottom && pathname === "/" && scrollTop + viewportHeight >= fullHeight - 16) {
        sentHomeBottom = true;
        trackEvent({ name: "home_scroll_bottom", properties: { pathname } });
      }
    };

    const finalizeSections = () => {
      const now = Date.now();
      sectionActiveSince.forEach((since, section) => {
        const current = sectionTotals.get(section) || 0;
        sectionTotals.set(section, current + Math.max(0, now - since));
      });
      sectionActiveSince.clear();
    };

    const flush = () => {
      if (!flushRef.current) return;
      flushRef.current = null;

      finalizeSections();
      const durationSec = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
      trackEvent({
        name: "page_engagement",
        properties: { pathname, duration_sec: durationSec, max_scroll_pct: maxScrollPercent }
      });

      sectionTotals.forEach((ms, section) => {
        const sectionSeconds = Math.round(ms / 1000);
        if (sectionSeconds < 1) return;
        trackEvent({
          name: "section_engagement",
          properties: { pathname, section, duration_sec: sectionSeconds }
        });
      });
    };

    flushRef.current = flush;
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (pathname === "/") {
      sectionNodes.push(...Array.from(document.querySelectorAll("[data-analytics-section]")));
      if (sectionNodes.length > 0) {
        observer = new IntersectionObserver(
          (entries) => {
            const now = Date.now();
            for (const entry of entries) {
              const section = (entry.target as HTMLElement).dataset.analyticsSection;
              if (!section) continue;

              if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
                if (!sectionActiveSince.has(section)) sectionActiveSince.set(section, now);
              } else if (sectionActiveSince.has(section)) {
                const since = sectionActiveSince.get(section) || now;
                const current = sectionTotals.get(section) || 0;
                sectionTotals.set(section, current + Math.max(0, now - since));
                sectionActiveSince.delete(section);
              }
            }
          },
          { threshold: [0.55] }
        );

        sectionNodes.forEach((node) => observer?.observe(node));
      }
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") flush();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      flush();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}

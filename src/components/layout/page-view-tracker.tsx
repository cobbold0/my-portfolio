"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent({ name: "page_view", properties: { pathname } });
  }, [pathname]);

  return null;
}

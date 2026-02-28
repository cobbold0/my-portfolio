"use client";

import Script from "next/script";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";

type BadgeSize = "small" | "medium" | "large";
type BadgeType = "HORIZONTAL" | "VERTICAL";

export function LinkedInProfileBadge({
  vanity,
  profileUrl,
  size = "medium",
  type = "HORIZONTAL",
  locale = "en_US"
}: {
  vanity: string;
  profileUrl: string;
  size?: BadgeSize;
  type?: BadgeType;
  locale?: string;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scriptNonce, setScriptNonce] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = mounted && resolvedTheme === "dark" ? "dark" : "light";
  const badgeKey = useMemo(() => `${theme}-${vanity}-${size}-${type}-${locale}`, [theme, vanity, size, type, locale]);

  useEffect(() => {
    // Force script remount if LinkedIn does not process re-rendered badge on theme changes.
    if (mounted) setScriptNonce((value) => value + 1);
  }, [theme, mounted]);

  return (
    <div className="mt-6">
      <Script
        key={`linkedin-badge-script-${scriptNonce}`}
        src="https://platform.linkedin.com/badges/js/profile.js"
        strategy="afterInteractive"
      />
      <div className="relative inline-block">
        <a
          href={`${profileUrl}?trk=profile-badge`}
          target="_blank"
          rel="noreferrer"
          className="absolute inset-0 z-10"
          aria-label="Open LinkedIn profile"
        >
          <span className="sr-only">Open LinkedIn profile</span>
        </a>
        <div
          key={badgeKey}
          className="badge-base LI-profile-badge relative z-0"
          data-locale={locale}
          data-size={size}
          data-theme={theme}
          data-type={type}
          data-vanity={vanity}
          data-version="v1"
        >
          <a className="badge-base__link LI-simple-link" href={`${profileUrl}?trk=profile-badge`} target="_blank" rel="noreferrer">
            {vanity}
          </a>
        </div>
      </div>
    </div>
  );
}

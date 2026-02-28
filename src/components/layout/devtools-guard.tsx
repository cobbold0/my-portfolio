"use client";

import { useEffect, useState } from "react";

const DEVTOOLS_THRESHOLD = 160;

export function DevToolsGuard() {
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const ctrlOrMeta = event.ctrlKey || event.metaKey;
      const blockedCombo =
        key === "f12" ||
        (ctrlOrMeta && event.shiftKey && (key === "i" || key === "j" || key === "c")) ||
        (ctrlOrMeta && key === "u");

      if (blockedCombo) {
        event.preventDefault();
        setBlocked(true);
      }
    };

    const onContextMenu = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const isLinkTarget = Boolean(target?.closest("a[href]"));
      const isOptInAllowed = Boolean(target?.closest('[data-allow-context-menu="true"]'));

      if (isLinkTarget || isOptInAllowed) return;
      event.preventDefault();
    };

    const detectDevtools = () => {
      const widthGap = window.outerWidth - window.innerWidth;
      const heightGap = window.outerHeight - window.innerHeight;
      if (widthGap > DEVTOOLS_THRESHOLD || heightGap > DEVTOOLS_THRESHOLD) {
        setBlocked(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("contextmenu", onContextMenu);
    window.addEventListener("resize", detectDevtools);

    const timer = window.setInterval(detectDevtools, 1000);
    detectDevtools();

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("contextmenu", onContextMenu);
      window.removeEventListener("resize", detectDevtools);
      window.clearInterval(timer);
    };
  }, []);

  if (!blocked) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white">
      <p className="text-sm">This page is protected. Refresh to go back.</p>
    </div>
  );
}

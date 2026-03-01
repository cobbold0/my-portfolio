"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function DrawBorder({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div className="relative z-10 h-full">{children}</div>
      <svg className="pointer-events-none absolute inset-0 z-20 h-full w-full" aria-hidden="true" preserveAspectRatio="none">
        <motion.rect
          x="0.5%"
          y="0.5%"
          width="99%"
          height="99%"
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? 1 : 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </div>
  );
}

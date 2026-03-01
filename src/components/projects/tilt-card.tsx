"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function TiltCard({ children, className, maxTilt = 7 }: { children: ReactNode; className?: string; maxTilt?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;

    const rotateY = (px - 0.5) * (maxTilt * 2);
    const rotateX = (0.5 - py) * (maxTilt * 2);
    element.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
    element.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
  };

  const onMouseLeave = () => {
    const element = ref.current;
    if (!element) return;
    element.style.setProperty("--tilt-x", "0deg");
    element.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <div className={cn("group [perspective:1200px]", className)}>
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={cn(
          "relative h-full will-change-transform transition-transform duration-150 ease-out [transform-style:preserve-3d]",
          "[transform:rotateX(var(--tilt-x,0deg))_rotateY(var(--tilt-y,0deg))]"
        )}
      >
        {children}
      </div>
    </div>
  );
}

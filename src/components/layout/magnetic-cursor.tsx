"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export function MagneticCursor() {
  const reduceMotion = useReducedMotion();
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const frame = useRef<number | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0, scale: 1 });

  useEffect(() => {
    if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (event: MouseEvent) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;
    };

    const onOver = (event: MouseEvent) => {
      const element = event.target instanceof Element ? event.target : null;
      const interactive = element?.closest("a, button, [data-magnetic]");
      target.current.scale = interactive ? 1.8 : 1;
    };

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.2;
      pos.current.y += (target.current.y - pos.current.y) * 0.2;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x - 9}px, ${pos.current.y - 9}px, 0) scale(${target.current.scale})`;
      }
      frame.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    frame.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-[18px] w-[18px] rounded-full border border-foreground/70 md:block"
    />
  );
}

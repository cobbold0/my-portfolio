"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";
import type { Metric } from "@/lib/types";
import { DrawBorder } from "@/components/ui/draw-border";

function parseMetric(value: string) {
  const number = Number((value.match(/-?\d+(\.\d+)?/) || ["0"])[0]);
  const suffix = value.replace(/^-?\d+(\.\d+)?/, "");
  return { abs: Math.abs(number), negative: number < 0, suffix };
}

function CounterValue({ value }: { value: string }) {
  const parsed = useMemo(() => parseMetric(value), [value]);
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(parsed.abs * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, parsed.abs]);

  return (
    <span ref={ref}>
      {parsed.negative ? "-" : ""}
      {n}
      {parsed.suffix}
    </span>
  );
}

export function StatsSnap({ metrics }: { metrics: Metric[] }) {
  return (
    <DrawBorder className="w-full max-w-full overflow-hidden">
      <div className="w-full max-w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden">
        <div className="grid min-w-full grid-flow-col auto-cols-[minmax(280px,1fr)] md:auto-cols-[minmax(360px,1fr)]">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`flex h-[60vh] min-w-0 snap-start flex-col items-start justify-center px-8 md:px-16 ${
                index < metrics.length - 1 ? "border-r border-border" : ""
              }`}
            >
              <p className="font-display text-[clamp(3.5rem,10vw,5rem)] font-semibold leading-none tracking-tight">
                <CounterValue value={metric.value} />
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.16em] text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </DrawBorder>
  );
}

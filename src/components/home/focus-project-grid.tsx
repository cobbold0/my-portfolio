"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useSpring } from "framer-motion";
import { useState } from "react";
import type { Project } from "@/lib/types";
import { TiltCard } from "@/components/projects/tilt-card";
import { DrawBorder } from "@/components/ui/draw-border";

const bentoSpans = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-2 md:row-span-1",
  "md:col-span-1 md:row-span-2",
  "md:col-span-1 md:row-span-1",
  "md:col-span-2 md:row-span-1",
  "md:col-span-1 md:row-span-1"
];

function MagneticTitle({ children }: { children: React.ReactNode }) {
  const x = useSpring(0, { stiffness: 250, damping: 20 });
  const y = useSpring(0, { stiffness: 250, damping: 20 });

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-20, Math.min(20, dx * 0.12)));
    y.set(Math.max(-20, Math.min(20, dy * 0.12)));
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div onMouseMove={onMove} onMouseLeave={onLeave}>
      <motion.h3 className="font-display mt-1 text-xl" style={{ x, y }}>
        {children}
      </motion.h3>
    </div>
  );
}

export function FocusProjectGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="grid auto-rows-[160px] gap-4 md:grid-cols-4">
      {projects.slice(0, 6).map((project, index) => {
        const focused = !active || active === project.slug;
        return (
          <TiltCard key={project.slug} className={bentoSpans[index % bentoSpans.length]}>
            <DrawBorder className="h-full">
              <Link
                href={`/projects/${project.slug}`}
                onMouseEnter={() => setActive(project.slug)}
                onMouseLeave={() => setActive(null)}
                className={`group relative block h-full overflow-hidden bg-card transition duration-300 hover:scale-[1.015] ${
                  focused ? "" : "saturate-0 blur-[1px] opacity-65"
                }`}
              >
                <Image
                  src={project.screenshots[0]?.src || "/projects/placeholder.svg"}
                  alt={project.screenshots[0]?.alt || project.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.04]"
                />
                {!focused ? <div className="absolute inset-0 backdrop-blur-sm" /> : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/32 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="inline-block rounded-md bg-black/45 px-3 py-2 backdrop-blur-[1px]">
                    <p className="text-[11px] tracking-[0.16em] text-white/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.85)]">
                      {project.category.toUpperCase()}
                    </p>
                    <div className="[text-shadow:0_2px_12px_rgba(0,0,0,0.95)]">
                      <MagneticTitle>{project.title}</MagneticTitle>
                    </div>
                  </div>
                </div>
              </Link>
            </DrawBorder>
          </TiltCard>
        );
      })}
    </div>
  );
}

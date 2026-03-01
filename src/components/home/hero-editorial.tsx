"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LinkedInProfileBadge } from "@/components/home/linkedin-profile-badge";

type HeroEditorialProps = {
  profile: {
    name: string;
    tagline: string;
    roleLine: string;
    availableToMentor?: boolean;
    resumeUrl?: string;
    profileImage?: string;
  };
  linkedinProfile: { vanity: string; profileUrl: string } | null;
};

const words = ["Engineering", "Digital", "Experiences"];

export function HeroEditorial({ profile, linkedinProfile }: HeroEditorialProps) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 120, damping: 22, mass: 0.6 });

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    mx.set(((event.clientX - cx) / cx) * 18);
    my.set(((event.clientY - cy) / cy) * 10);
  };

  return (
    <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_360px] lg:items-start" onMouseMove={onMove}>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-2 left-0 z-0 select-none font-display text-[clamp(4rem,18vw,18rem)] font-semibold uppercase leading-none text-transparent [-webkit-text-stroke:1px_hsl(var(--foreground)/0.2)] dark:[-webkit-text-stroke:1px_hsl(var(--foreground)/0.24)]"
        style={{ x: sx, y: sy }}
      >
        {profile.name.trim().split(/\s+/)[0]}
      </motion.div>

      <div className="relative z-10">
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <Badge className="rounded-none border border-border bg-transparent px-3 py-1 text-xs tracking-[0.18em] text-muted-foreground">
            {profile.roleLine}
          </Badge>
          {profile.availableToMentor ? (
            <Badge className="rounded-none border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs tracking-[0.12em] text-amber-700 dark:text-amber-300">
              AVAILABLE TO MENTOR
            </Badge>
          ) : null}
        </div>
        <h1 className="font-display max-w-4xl text-[2.4rem] font-semibold uppercase leading-[0.92] tracking-[0.16em] md:-ml-2 md:text-[5rem] md:tracking-[0.22em]">
          {words.map((word, index) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                className="block bg-gradient-to-r from-amber-500 via-purple-600 to-amber-400 bg-clip-text text-transparent dark:from-amber-300 dark:via-purple-300 dark:to-amber-400"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>
        <p className="mt-8 max-w-xl text-base text-muted-foreground">{profile.tagline}</p>
        <div className="mt-10 flex max-w-2xl flex-wrap gap-3">
          <Button asChild className="rounded-none px-6" data-magnetic>
            <Link href="/projects">
              View projects <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-none px-6" data-magnetic>
            <Link href="/contact">Contact</Link>
          </Button>
          <Button asChild variant="secondary" className="rounded-none px-6" data-magnetic>
            <Link href={profile.resumeUrl || "/resume.pdf"}>
              Download CV <Download className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        {linkedinProfile ? (
          <div className="mt-8 max-w-sm border-l border-border pl-4">
            <LinkedInProfileBadge vanity={linkedinProfile.vanity} profileUrl={linkedinProfile.profileUrl} />
          </div>
        ) : null}
      </div>

      {profile.profileImage ? (
        <div className="relative z-10 mx-auto w-full max-w-[320px] lg:mx-0 lg:justify-self-end">
          <div className="overflow-hidden border border-border bg-background dark:bg-primary">
            <Image
              src={profile.profileImage}
              alt={`${profile.name} profile picture`}
              width={420}
              height={420}
              className="h-auto w-full object-cover transition-opacity duration-300"
              priority
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

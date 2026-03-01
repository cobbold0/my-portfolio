import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site";
import { getSiteProfile } from "@/lib/content";
import { AnimatedSection } from "@/components/layout/animated-section";
import { DrawBorder } from "@/components/ui/draw-border";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description: "How this portfolio is built, the stack behind it, and how to fork it.",
  openGraph: {
    images: [absoluteUrl("/api/og?page=about")]
  },
  twitter: {
    images: [absoluteUrl("/api/og?page=about")]
  }
};

const stack = [
  "Next.js App Router",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Sanity CMS",
  "Firebase Analytics"
];

const highlights = [
  "Studio CMS at /studio with content fallback",
  "Project and blog routes generated from content",
  "Server-rendered pages with interactive client sections",
  "Revalidation webhook support for Sanity updates",
  "Reusable UI components and motion primitives"
];

function getRepoUrl(fallbackSocial?: string) {
  const envUrl = process.env.NEXT_PUBLIC_SOURCE_REPO_URL;
  if (envUrl) return envUrl;
  return fallbackSocial || "https://github.com";
}

export default async function AboutPage() {
  const profile = await getSiteProfile();
  const githubSocial = profile.socials.find((social) => social.label.toLowerCase() === "github")?.href;
  const repoUrl = getRepoUrl(githubSocial);

  return (
    <div className="container py-24">
      <AnimatedSection>
        <div className="max-w-3xl">
          <Badge className="rounded-none border border-border bg-transparent text-xs tracking-[0.14em] text-muted-foreground">ABOUT THIS SITE</Badge>
          <h1 className="mt-6 font-display text-4xl md:text-6xl">Built as a Product-Grade Portfolio</h1>
          <p className="mt-6 text-muted-foreground">
            This site showcases engineering work and also demonstrates production-ready frontend patterns: modular architecture, animation systems, CMS
            integration, and performance-aware rendering.
          </p>
        </div>
      </AnimatedSection>

      <section className="mt-14 grid gap-6 lg:grid-cols-2">
        <AnimatedSection delay={0.06}>
          <DrawBorder className="h-full">
            <div className="h-full bg-card p-8">
              <h2 className="text-2xl font-semibold">Stack</h2>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                {stack.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </DrawBorder>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <DrawBorder className="h-full">
            <div className="h-full bg-card p-8">
              <h2 className="text-2xl font-semibold">Architecture Notes</h2>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                {highlights.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </DrawBorder>
        </AnimatedSection>
      </section>

      <AnimatedSection delay={0.14}>
        <section className="mt-6">
          <DrawBorder>
            <div className="bg-card p-8">
              <h2 className="text-2xl font-semibold">Open Source</h2>
              <p className="mt-4 max-w-3xl text-sm text-muted-foreground">
                This portfolio is open source. You can use it as a starter, customize the brand/theme/content, and ship your own version.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="rounded-none">
                  <a href={repoUrl} target="_blank" rel="noreferrer">
                    View Source
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-none">
                  <a href={`${repoUrl.replace(/\/$/, "")}/fork`} target="_blank" rel="noreferrer">
                    Fork Repository
                  </a>
                </Button>
                <Button asChild variant="secondary" className="rounded-none">
                  <Link href="/contact">Need help customizing?</Link>
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Tip: set <code>NEXT_PUBLIC_SOURCE_REPO_URL</code> in your env to point these buttons to your actual repository.
              </p>
            </div>
          </DrawBorder>
        </section>
      </AnimatedSection>
    </div>
  );
}

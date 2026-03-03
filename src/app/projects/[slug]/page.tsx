import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Github, Globe, Play } from "lucide-react";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { getProjectDataBySlug, getProjectsData } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { MermaidDiagram } from "@/components/projects/mermaid-diagram";

export async function generateStaticParams() {
  const projects = await getProjectsData();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectDataBySlug(slug);
  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}`
    },
    openGraph: {
      title: project.title,
      description: project.summary,
      url: absoluteUrl(`/projects/${project.slug}`),
      images: [absoluteUrl(`/api/og?page=project-${project.slug}`)]
    },
    twitter: {
      title: project.title,
      description: project.summary,
      images: [absoluteUrl(`/api/og?page=project-${project.slug}`)]
    }
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectDataBySlug(slug);

  if (!project) {
    notFound();
  }
  const projectStructuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: absoluteUrl(`/projects/${project.slug}`),
    image: project.screenshots.length > 0 ? project.screenshots.map((shot) => absoluteUrl(shot.src)) : [absoluteUrl("/projects/placeholder.svg")],
    creator: {
      "@type": "Person",
      name: siteConfig.authors[0]?.name || siteConfig.name
    },
    keywords: project.techStack.join(", ")
  };
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: absoluteUrl("/projects")
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: absoluteUrl(`/projects/${project.slug}`)
      }
    ]
  };

  return (
    <div className="container py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <Link
        href="/projects"
        className="text-sm text-muted-foreground hover:text-foreground"
        data-analytics-event="navigation_click"
        data-analytics-source="project_detail"
        data-analytics-target="/projects"
        data-analytics-label="back_to_projects"
        data-analytics-nav-context="project_detail:back_to_projects"
      >
        &larr; Back to projects
      </Link>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">{project.title}</h1>
      <p className="mt-3 max-w-3xl text-muted-foreground">{project.summary}</p>
      <p className="mt-2 text-sm text-muted-foreground">Built by Augustine Cobbold</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.techStack.map((item) => (
          <Badge key={item} variant="secondary">
            {item}
          </Badge>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.links.github ? (
          <Button asChild variant="outline" size="sm">
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              data-analytics-event="outbound_click"
              data-analytics-source="project_detail"
              data-analytics-label="github"
              data-analytics-target={project.links.github}
              data-analytics-slug={project.slug}
            >
              <Github className="mr-2 h-4 w-4" /> GitHub
            </a>
          </Button>
        ) : null}
        {project.links.live ? (
          <Button asChild size="sm">
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              data-analytics-event="outbound_click"
              data-analytics-source="project_detail"
              data-analytics-label="live"
              data-analytics-target={project.links.live}
              data-analytics-slug={project.slug}
            >
              <Globe className="mr-2 h-4 w-4" /> Live
            </a>
          </Button>
        ) : null}
        {project.links.playStore ? (
          <Button asChild variant="secondary" size="sm">
            <a
              href={project.links.playStore}
              target="_blank"
              rel="noreferrer"
              data-analytics-event="outbound_click"
              data-analytics-source="project_detail"
              data-analytics-label="play_store"
              data-analytics-target={project.links.playStore}
              data-analytics-slug={project.slug}
            >
              <Play className="mr-2 h-4 w-4" /> Play Store
            </a>
          </Button>
        ) : null}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="min-w-0 space-y-8">
          <section>
            <h2 className="text-xl font-semibold">Problem</h2>
            <p className="mt-2 text-muted-foreground">{project.problem}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Solution</h2>
            <p className="mt-2 text-muted-foreground">{project.solution}</p>
          </section>

          <section className="min-w-0">
            <h2 className="text-xl font-semibold">Architecture</h2>
            <Card className="mt-3 w-full max-w-full overflow-x-auto">
              <CardContent className="min-w-0 pt-6">
                <p className="mb-3 text-sm font-medium">{project.architecture.title}</p>
                <MermaidDiagram chart={project.architecture.mermaid} />
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Gallery</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {project.screenshots.length > 0 ? (
                project.screenshots.map((shot) => (
                  <div key={shot.src} className="relative overflow-hidden rounded-lg border bg-muted/20 aspect-[16/10]">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain p-1"
                    />
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No screenshots available yet.</p>
              )}
            </div>
          </section>
        </div>

        <aside>
          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible defaultValue="role">
                <AccordionItem value="role">
                  <AccordionTrigger>Responsibilities</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {project.responsibilities.map((item) => (
                        <li key={item}>- {item}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="results">
                  <AccordionTrigger>Results</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {project.impactMetrics.map((item) => (
                        <li key={item}>- {item}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Github, Globe, Play } from "lucide-react";
import { projects } from "@/content/projects";
import { absoluteUrl } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { MermaidDiagram } from "@/components/projects/mermaid-diagram";

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      images: [absoluteUrl(`/api/og?page=project-${project.slug}`)]
    },
    twitter: {
      images: [absoluteUrl(`/api/og?page=project-${project.slug}`)]
    }
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container py-12">
      <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground">
        ← Back to projects
      </Link>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">{project.title}</h1>
      <p className="mt-3 max-w-3xl text-muted-foreground">{project.summary}</p>

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
            <a href={project.links.github} target="_blank" rel="noreferrer">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </a>
          </Button>
        ) : null}
        {project.links.live ? (
          <Button asChild size="sm">
            <a href={project.links.live} target="_blank" rel="noreferrer">
              <Globe className="mr-2 h-4 w-4" /> Live
            </a>
          </Button>
        ) : null}
        {project.links.playStore ? (
          <Button asChild variant="secondary" size="sm">
            <a href={project.links.playStore} target="_blank" rel="noreferrer">
              <Play className="mr-2 h-4 w-4" /> Play Store
            </a>
          </Button>
        ) : null}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold">Problem</h2>
            <p className="mt-2 text-muted-foreground">{project.problem}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Solution</h2>
            <p className="mt-2 text-muted-foreground">{project.solution}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Architecture</h2>
            <Card className="mt-3">
              <CardContent className="pt-6">
                <p className="mb-3 text-sm font-medium">{project.architecture.title}</p>
                <MermaidDiagram chart={project.architecture.mermaid} />
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-xl font-semibold">Gallery</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {project.screenshots.map((shot) => (
                <Image key={shot.src} src={shot.src} alt={shot.alt} width={1200} height={675} className="rounded-lg border" />
              ))}
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
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="results">
                  <AccordionTrigger>Results</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {project.impactMetrics.map((item) => (
                        <li key={item}>• {item}</li>
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

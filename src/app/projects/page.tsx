import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { absoluteUrl } from "@/lib/site";
import { ProjectsClient } from "@/components/projects/projects-client";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies across backend, frontend, and mobile product engineering.",
  openGraph: {
    images: [absoluteUrl("/api/og?page=projects")]
  },
  twitter: {
    images: [absoluteUrl("/api/og?page=projects")]
  }
};

export default function ProjectsPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
      <p className="mt-2 text-muted-foreground">Filter by platform and browse case studies with measurable outcomes.</p>
      <div className="mt-8">
        <ProjectsClient projects={projects} />
      </div>
    </div>
  );
}

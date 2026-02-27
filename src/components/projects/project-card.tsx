"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import type { Project } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="h-full overflow-hidden">
      <Image
        src={project.screenshots[0]?.src || "/projects/placeholder.svg"}
        alt={project.screenshots[0]?.alt || project.title}
        width={1200}
        height={675}
        className="h-48 w-full object-cover"
      />
      <CardHeader>
        <div className="mb-2 flex items-center gap-2">
          <Badge variant="secondary">{project.category}</Badge>
          {project.featured ? <Badge>Featured</Badge> : null}
        </div>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.summary}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((item) => (
            <Badge key={item} variant="outline">
              {item}
            </Badge>
          ))}
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary"
          onClick={() => trackEvent({ name: "click_project", properties: { slug: project.slug } })}
        >
          View case study <ArrowUpRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}

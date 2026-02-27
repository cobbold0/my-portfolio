"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectCard } from "@/components/projects/project-card";

type Sort = "recent" | "featured";

export function ProjectsClient({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | ProjectCategory>("All");
  const [sort, setSort] = useState<Sort>("recent");

  const filtered = useMemo(() => {
    return projects
      .filter((project) => {
        const matchesCategory = category === "All" || project.category === category;
        const stack = project.techStack.join(" ").toLowerCase();
        const matchesQuery =
          project.title.toLowerCase().includes(query.toLowerCase()) || stack.includes(query.toLowerCase());
        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        if (sort === "featured") {
          return Number(b.featured) - Number(a.featured) || b.year - a.year;
        }
        return b.year - a.year;
      });
  }, [projects, query, category, sort]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <Input
          aria-label="Search projects"
          placeholder="Search by project name or tech"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Tabs value={sort} onValueChange={(value) => setSort(value as Sort)}>
          <TabsList>
            <TabsTrigger value="recent">Most recent</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Tabs value={category} onValueChange={(value) => setCategory(value as "All" | ProjectCategory)}>
        <TabsList className="grid h-auto grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="All">All</TabsTrigger>
          <TabsTrigger value="Backend">Backend</TabsTrigger>
          <TabsTrigger value="Frontend">Frontend</TabsTrigger>
          <TabsTrigger value="Mobile">Mobile</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}

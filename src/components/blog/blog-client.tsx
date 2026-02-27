"use client";

import { useMemo, useState } from "react";
import { BlogPostMeta } from "@/lib/blog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BlogCard } from "@/components/blog/blog-card";

export function BlogClient({ posts }: { posts: BlogPostMeta[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string>("all");

  const tags = useMemo(() => {
    const unique = new Set<string>();
    posts.forEach((post) => post.tags.forEach((item) => unique.add(item)));
    return ["all", ...Array.from(unique)];
  }, [posts]);

  const filtered = useMemo(
    () =>
      posts.filter((post) => {
        const matchesTag = tag === "all" || post.tags.includes(tag);
        const q = query.toLowerCase();
        const matchesQuery = post.title.toLowerCase().includes(q) || post.summary.toLowerCase().includes(q);
        return matchesTag && matchesQuery;
      }),
    [posts, query, tag]
  );

  return (
    <div className="space-y-6">
      <Input
        aria-label="Search blog posts"
        placeholder="Search posts"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <div className="flex flex-wrap gap-2">
        {tags.map((item) => (
          <button key={item} type="button" onClick={() => setTag(item)}>
            <Badge variant={tag === item ? "default" : "secondary"}>{item}</Badge>
          </button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}

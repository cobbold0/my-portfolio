import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";
import { getAllPostsMeta } from "@/lib/blog";
import { BlogClient } from "@/components/blog/blog-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: "Engineering notes on backend systems, frontend architecture, and mobile reliability.",
  openGraph: {
    images: [absoluteUrl("/api/og?page=blog")]
  },
  twitter: {
    images: [absoluteUrl("/api/og?page=blog")]
  }
};

export default async function BlogPage() {
  const posts = await getAllPostsMeta();

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
      <p className="mt-2 text-muted-foreground">Search and filter posts by topic.</p>
      <div className="mt-8">
        <BlogClient posts={posts} />
      </div>
    </div>
  );
}

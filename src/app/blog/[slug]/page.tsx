import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";
import { getAllPostSlugs, getPostBySlug, getPostMeta } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { TableOfContents } from "@/components/blog/toc";
import { PortableTextRenderer } from "@/components/blog/portable-text";

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await getPostMeta(slug);
    return {
      title: post.title,
      description: post.summary,
      openGraph: {
        images: [absoluteUrl(`/api/og?post=${slug}`)]
      },
      twitter: {
        images: [absoluteUrl(`/api/og?post=${slug}`)]
      }
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post: Awaited<ReturnType<typeof getPostBySlug>>;

  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <div className="container py-12">
      <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
        ← Back to blog
      </Link>

      <article className="mt-6 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div>
          <Image
            src={post.frontmatter.coverImage || "/projects/placeholder.svg"}
            alt={post.frontmatter.title}
            width={1200}
            height={675}
            className="h-auto w-full rounded-xl border object-cover"
          />
          <h1 className="mt-6 text-4xl font-bold tracking-tight">{post.frontmatter.title}</h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.frontmatter.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {new Date(post.frontmatter.date).toLocaleDateString()} · {post.readingTime}
          </p>
          {post.source === "sanity" ? (
            <div className="prose prose-slate dark:prose-invert mt-8 max-w-none">
              <PortableTextRenderer value={post.body || []} />
            </div>
          ) : (
            <div className="prose prose-slate dark:prose-invert mt-8 max-w-none">{post.content}</div>
          )}
        </div>
        <div className="space-y-4">
          <TableOfContents items={post.headings} />
        </div>
      </article>
    </div>
  );
}

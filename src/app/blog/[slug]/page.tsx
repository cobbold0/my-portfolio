import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";
import { getAllPostSlugs, getPostBySlug, getPostMeta } from "@/lib/blog";
import { formatDateUtc } from "@/lib/date";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

  const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(absoluteUrl(`/blog/${slug}`))}`;

  return (
    <div className="container py-12">
      <Link
        href="/blog"
        className="text-sm text-muted-foreground hover:text-foreground"
        data-analytics-event="navigation_click"
        data-analytics-source="blog_detail"
        data-analytics-target="/blog"
        data-analytics-label="back_to_blog"
        data-analytics-nav-context="blog_detail:back_to_blog"
      >
        &larr; Back to blog
      </Link>

      <article className="mt-6 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="order-2 lg:order-1">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border bg-muted/20">
            <Image
              src={post.frontmatter.coverImage || "/projects/placeholder.svg"}
              alt={post.frontmatter.title}
              fill
              priority
              sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1279px) calc(100vw - 3rem), calc((100vw - 8rem) * 0.66)"
              className="object-cover"
            />
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight">{post.frontmatter.title}</h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.frontmatter.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {formatDateUtc(post.frontmatter.date)} - {post.readingTime}
          </p>
          {post.shareOnLinkedIn ? (
            <div className="mt-4">
              <Button asChild variant="outline">
                <a
                  href={shareUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-analytics-event="outbound_click"
                  data-analytics-source="blog_detail"
                  data-analytics-label="share_on_linkedin"
                  data-analytics-target={shareUrl}
                  data-analytics-slug={slug}
                >
                  Share on LinkedIn
                </a>
              </Button>
            </div>
          ) : null}
          {post.source === "sanity" ? (
            <div className="prose prose-slate dark:prose-invert mt-8 max-w-none">
              <PortableTextRenderer value={post.body || []} />
            </div>
          ) : (
            <div className="prose prose-slate dark:prose-invert mt-8 max-w-none">{post.content}</div>
          )}
        </div>
        <div className="order-1 space-y-4 lg:order-2">
          <TableOfContents items={post.headings} />
        </div>
      </article>
    </div>
  );
}

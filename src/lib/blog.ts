import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import { getContentSource, isSanityEnabled } from "@/lib/content-source";
import { getPostBySlugFromSanity, getPostsMetaFromSanity } from "@/lib/sanity/data";
import type { BlogPostDetail, BlogPostMeta } from "@/lib/sanity/types";
export type { BlogPostMeta, BlogPostDetail } from "@/lib/sanity/types";

type Frontmatter = {
  title: string;
  date: string;
  tags: string[];
  summary: string;
  coverImage: string;
  shareOnLinkedIn?: boolean;
};

const blogDir = path.join(process.cwd(), "src", "content", "blog");

function toTimestamp(date: string) {
  const value = new Date(date).getTime();
  return Number.isFinite(value) ? value : 0;
}

async function getAllPostSlugsLocal() {
  const files = await fs.readdir(blogDir);
  return files.filter((file) => file.endsWith(".mdx")).map((file) => file.replace(/\.mdx$/, ""));
}

async function getPostMetaLocal(slug: string): Promise<BlogPostMeta> {
  const filePath = path.join(blogDir, `${slug}.mdx`);
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as Frontmatter;

  return {
    ...fm,
    slug,
    date: fm.date,
    readingTime: readingTime(content).text,
    shareOnLinkedIn: Boolean(fm.shareOnLinkedIn)
  };
}

async function getAllPostsMetaLocal(): Promise<BlogPostMeta[]> {
  const slugs = await getAllPostSlugsLocal();
  const posts = await Promise.all(slugs.map((slug) => getPostMetaLocal(slug)));
  return posts.sort((a, b) => toTimestamp(b.date) - toTimestamp(a.date));
}

async function getPostBySlugLocal(slug: string): Promise<BlogPostDetail> {
  const filePath = path.join(blogDir, `${slug}.mdx`);
  const source = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(source);

  const headings = Array.from(content.matchAll(/^##?\s+(.+)$/gm)).map((match) => {
    const text = match[1].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    return { text, id };
  });

  const mdx = await compileMDX<Frontmatter>({
    source: content,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap"
            }
          ],
          rehypeHighlight
        ]
      }
    }
  });

  return {
    source: "local",
    frontmatter: data as Frontmatter,
    content: mdx.content,
    headings,
    readingTime: readingTime(content).text,
    shareOnLinkedIn: Boolean((data as Frontmatter).shareOnLinkedIn)
  };
}

export async function getAllPostsMeta(): Promise<BlogPostMeta[]> {
  if (getContentSource() === "sanity" && isSanityEnabled()) {
    const posts = await getPostsMetaFromSanity();
    if (posts.length > 0) return posts.sort((a, b) => toTimestamp(b.date) - toTimestamp(a.date));
  }

  return getAllPostsMetaLocal();
}

export async function getPostMeta(slug: string): Promise<BlogPostMeta> {
  if (getContentSource() === "sanity" && isSanityEnabled()) {
    const posts = await getPostsMetaFromSanity();
    const post = posts.find((item) => item.slug === slug);
    if (post) return post;
  }

  return getPostMetaLocal(slug);
}

export async function getAllPostSlugs() {
  if (getContentSource() === "sanity" && isSanityEnabled()) {
    const posts = await getPostsMetaFromSanity();
    if (posts.length > 0) return posts.map((post) => post.slug);
  }

  return getAllPostSlugsLocal();
}

export async function getPostBySlug(slug: string): Promise<BlogPostDetail> {
  if (getContentSource() === "sanity" && isSanityEnabled()) {
    const post = await getPostBySlugFromSanity(slug);
    if (post) return post;
  }

  return getPostBySlugLocal(slug);
}

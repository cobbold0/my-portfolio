import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";

type Frontmatter = {
  title: string;
  date: string;
  tags: string[];
  summary: string;
  coverImage: string;
};

export type BlogPostMeta = Frontmatter & {
  slug: string;
  readingTime: string;
};

const blogDir = path.join(process.cwd(), "src", "content", "blog");

export async function getAllPostSlugs() {
  const files = await fs.readdir(blogDir);
  return files.filter((file) => file.endsWith(".mdx")).map((file) => file.replace(/\.mdx$/, ""));
}

export async function getAllPostsMeta(): Promise<BlogPostMeta[]> {
  const slugs = await getAllPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostMeta(slug)));
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostMeta(slug: string): Promise<BlogPostMeta> {
  const filePath = path.join(blogDir, `${slug}.mdx`);
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as Frontmatter;

  return {
    ...fm,
    slug,
    readingTime: readingTime(content).text
  };
}

export async function getPostBySlug(slug: string) {
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
    frontmatter: data as Frontmatter,
    content: mdx.content,
    headings,
    readingTime: readingTime(content).text
  };
}

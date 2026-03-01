import Link from "next/link";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import type { ReactNode } from "react";

function nodeToText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join("");
  if (node && typeof node === "object" && "props" in node) {
    const childNode = (node as { props?: { children?: ReactNode } }).props?.children;
    return nodeToText(childNode);
  }
  return "";
}

function toHeadingId(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }: { children?: ReactNode }) => {
      const id = toHeadingId(nodeToText(children));
      return (
        <h2 id={id} className="mt-8 scroll-mt-24 text-2xl font-semibold">
          {children}
        </h2>
      );
    },
    h3: ({ children }: { children?: ReactNode }) => {
      const id = toHeadingId(nodeToText(children));
      return (
        <h3 id={id} className="mt-6 scroll-mt-24 text-xl font-semibold">
          {children}
        </h3>
      );
    },
    normal: ({ children }: { children?: ReactNode }) => <p className="mt-4 text-base leading-7 text-muted-foreground">{children}</p>,
    blockquote: ({ children }: { children?: ReactNode }) => (
      <blockquote className="mt-6 border-l-2 pl-4 italic text-muted-foreground">{children}</blockquote>
    )
  },
  marks: {
    link: ({ children, value }: { children?: ReactNode; value?: { href?: string } }) => {
      const href = value?.href || "#";
      const external = href.startsWith("http");
      if (external) {
        return (
          <a href={href} target="_blank" rel="noreferrer" className="underline underline-offset-4">
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className="underline underline-offset-4">
          {children}
        </Link>
      );
    }
  },
  list: {
    bullet: ({ children }: { children?: ReactNode }) => <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">{children}</ul>,
    number: ({ children }: { children?: ReactNode }) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-muted-foreground">{children}</ol>
  },
  types: {
    codeBlock: ({ value }: { value?: { code?: string } }) => (
      <pre className="mt-5 overflow-x-auto rounded-lg border bg-muted p-4 text-xs">
        <code>{value?.code}</code>
      </pre>
    )
  }
};

export function PortableTextRenderer({ value }: { value: any }) {
  return <PortableText value={value} components={components} />;
}

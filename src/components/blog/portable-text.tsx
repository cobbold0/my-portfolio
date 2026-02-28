import Link from "next/link";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import type { ReactNode } from "react";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }: { children?: ReactNode }) => <h2 className="mt-8 text-2xl font-semibold">{children}</h2>,
    h3: ({ children }: { children?: ReactNode }) => <h3 className="mt-6 text-xl font-semibold">{children}</h3>,
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

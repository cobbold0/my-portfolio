import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site";
import { tools } from "@/lib/tools";
import { DrawBorder } from "@/components/ui/draw-border";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Tools",
  description: "Developer tools: JSON formatter, UUID generator, JWT decoder, and JavaScript sandbox.",
  openGraph: {
    images: [absoluteUrl("/api/og?page=tools")]
  },
  twitter: {
    images: [absoluteUrl("/api/og?page=tools")]
  }
};

export default function ToolsPage() {
  return (
    <div className="container py-24">
      <div className="max-w-3xl">
        <Badge className="rounded-none border border-border bg-transparent px-3 py-1 text-xs tracking-[0.14em] text-muted-foreground">TOOLS</Badge>
        <h1 className="mt-6 font-display text-4xl md:text-6xl">Utility Lab</h1>
        <p className="mt-4 text-muted-foreground">
          Small utilities built into the portfolio so visitors can use something useful and stay engaged.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {tools.map((tool) => (
          <DrawBorder key={tool.slug} className="h-full">
            <Link href={`/tools/${tool.slug}`} className="block h-full bg-card p-7 transition hover:bg-muted/40">
              <h2 className="text-2xl font-semibold">{tool.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{tool.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="rounded-none">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Link>
          </DrawBorder>
        ))}
      </div>
    </div>
  );
}


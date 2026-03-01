import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site";
import { DrawBorder } from "@/components/ui/draw-border";
import { JsonFormatterTool } from "@/components/tools/json-formatter-tool";

export const metadata: Metadata = {
  title: "JSON Formatter Tool",
  description: "Format, minify, validate, and copy JSON.",
  openGraph: {
    images: [absoluteUrl("/api/og?page=tool-json-formatter")]
  },
  twitter: {
    images: [absoluteUrl("/api/og?page=tool-json-formatter")]
  }
};

export default function JsonFormatterPage() {
  return (
    <div className="container py-20">
      <p className="text-sm text-muted-foreground">
        <Link href="/tools" className="hover:underline">
          Tools
        </Link>{" "}
        / JSON Formatter
      </p>
      <h1 className="mt-3 font-display text-4xl">JSON Formatter</h1>
      <p className="mt-2 text-sm text-muted-foreground">Paste JSON, clean it, and validate structure instantly.</p>
      <div className="mt-8">
        <DrawBorder>
          <div className="bg-card p-6">
            <JsonFormatterTool />
          </div>
        </DrawBorder>
      </div>
    </div>
  );
}


import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site";
import { DrawBorder } from "@/components/ui/draw-border";
import { UuidGeneratorTool } from "@/components/tools/uuid-generator-tool";

export const metadata: Metadata = {
  title: "UUID Generator Tool",
  description: "Generate UUID v4 values in bulk and copy output quickly.",
  openGraph: {
    images: [absoluteUrl("/api/og?page=tool-uuid-generator")]
  },
  twitter: {
    images: [absoluteUrl("/api/og?page=tool-uuid-generator")]
  }
};

export default function UuidGeneratorPage() {
  return (
    <div className="container py-20">
      <p className="text-sm text-muted-foreground">
        <Link href="/tools" className="hover:underline">
          Tools
        </Link>{" "}
        / UUID Generator
      </p>
      <h1 className="mt-3 font-display text-4xl">UUID Generator</h1>
      <p className="mt-2 text-sm text-muted-foreground">Generate UUIDs for APIs, records, IDs, and test data.</p>
      <div className="mt-8">
        <DrawBorder>
          <div className="bg-card p-6">
            <UuidGeneratorTool />
          </div>
        </DrawBorder>
      </div>
    </div>
  );
}


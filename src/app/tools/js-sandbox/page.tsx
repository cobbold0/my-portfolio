import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site";
import { DrawBorder } from "@/components/ui/draw-border";
import { JsSandboxTool } from "@/components/tools/js-sandbox-tool";

export const metadata: Metadata = {
  title: "JavaScript Sandbox Tool",
  description: "Write and run JavaScript in an isolated browser worker with output logs.",
  openGraph: {
    images: [absoluteUrl("/api/og?page=tool-js-sandbox")]
  },
  twitter: {
    images: [absoluteUrl("/api/og?page=tool-js-sandbox")]
  }
};

export default function JsSandboxPage() {
  return (
    <div className="container py-20">
      <p className="text-sm text-muted-foreground">
        <Link href="/tools" className="hover:underline">
          Tools
        </Link>{" "}
        / JavaScript Sandbox
      </p>
      <h1 className="mt-3 font-display text-4xl">JavaScript Sandbox</h1>
      <p className="mt-2 text-sm text-muted-foreground">Run quick scripts and inspect logs without leaving this site.</p>
      <div className="mt-8">
        <DrawBorder>
          <div className="bg-card p-6">
            <JsSandboxTool />
          </div>
        </DrawBorder>
      </div>
    </div>
  );
}


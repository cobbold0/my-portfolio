import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site";
import { DrawBorder } from "@/components/ui/draw-border";
import { JwtDecoderTool } from "@/components/tools/jwt-decoder-tool";

export const metadata: Metadata = {
  title: "JWT Decoder Tool",
  description: "Decode JWT header and payload locally in your browser.",
  openGraph: {
    images: [absoluteUrl("/api/og?page=tool-jwt-decoder")]
  },
  twitter: {
    images: [absoluteUrl("/api/og?page=tool-jwt-decoder")]
  }
};

export default function JwtDecoderPage() {
  return (
    <div className="container py-20">
      <p className="text-sm text-muted-foreground">
        <Link href="/tools" className="hover:underline">
          Tools
        </Link>{" "}
        / JWT Decoder
      </p>
      <h1 className="mt-3 font-display text-4xl">JWT Decoder</h1>
      <p className="mt-2 text-sm text-muted-foreground">Decode token metadata for debugging auth flows. Decoding is local-only.</p>
      <div className="mt-8">
        <DrawBorder>
          <div className="bg-card p-6">
            <JwtDecoderTool />
          </div>
        </DrawBorder>
      </div>
    </div>
  );
}


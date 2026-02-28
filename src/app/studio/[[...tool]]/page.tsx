"use client";

import dynamic from "next/dynamic";
import config from "../../../../sanity/sanity.config";

const NextStudio = dynamic(() => import("next-sanity/studio").then((mod) => mod.NextStudio), {
  ssr: false
});

export default function StudioPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <main className="container py-10">
        <h1 className="text-2xl font-semibold">Sanity Studio is not configured</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Add <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and related Sanity environment variables in your deployment
          settings, then redeploy.
        </p>
      </main>
    );
  }

  return <NextStudio config={config} />;
}

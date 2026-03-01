"use client";

import { NextStudio } from "next-sanity/studio";
import { createStudioConfig } from "../../../../sanity/studio-config";

type StudioClientProps = {
  projectId: string;
  dataset: string;
  apiVersion: string;
};

export function StudioClient({ projectId, dataset, apiVersion }: StudioClientProps) {
  const config = createStudioConfig({ projectId, dataset, apiVersion });
  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <NextStudio config={config} />
    </div>
  );
}

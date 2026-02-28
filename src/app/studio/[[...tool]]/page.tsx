import { StudioClient } from "./studio-client";
import fs from "node:fs";
import path from "node:path";
import { parse } from "dotenv";

function readEnvFileValue(key: string) {
  try {
    const envPath = path.join(process.cwd(), ".env");
    if (!fs.existsSync(envPath)) return "";
    const parsed = parse(fs.readFileSync(envPath));
    return parsed[key] || "";
  } catch {
    return "";
  }
}

export default function StudioPage() {
  const projectId =
    process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || readEnvFileValue("SANITY_STUDIO_PROJECT_ID") || readEnvFileValue("NEXT_PUBLIC_SANITY_PROJECT_ID") || "";
  const dataset =
    process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || readEnvFileValue("SANITY_STUDIO_DATASET") || readEnvFileValue("NEXT_PUBLIC_SANITY_DATASET") || "production";
  const apiVersion =
    process.env.SANITY_STUDIO_API_VERSION ||
    process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
    readEnvFileValue("SANITY_STUDIO_API_VERSION") ||
    readEnvFileValue("NEXT_PUBLIC_SANITY_API_VERSION") ||
    "2025-01-01";

  if (!projectId) {
    return (
      <main className="container py-10">
        <h1 className="text-2xl font-semibold">Sanity Studio is not configured</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Add <code>SANITY_STUDIO_PROJECT_ID</code> or <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> in your deployment
          settings, then redeploy.
        </p>
      </main>
    );
  }

  return <StudioClient projectId={projectId} dataset={dataset} apiVersion={apiVersion} />;
}

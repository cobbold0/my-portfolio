import { StudioClient } from "./studio-client";
import fs from "node:fs";
import path from "node:path";
import { parse } from "dotenv";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const STUDIO_AUTH_COOKIE = "studio_auth";
const STUDIO_AUTH_MAX_AGE_SECONDS = 60 * 60 * 12;

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

async function loginAction(formData: FormData) {
  "use server";

  const pin = process.env.STUDIO_ACCESS_PIN || readEnvFileValue("STUDIO_ACCESS_PIN");
  const submitted = String(formData.get("password") || "").trim();

  if (!pin || submitted !== pin) {
    redirect("/studio?error=invalid_pin");
  }

  const jar = await cookies();
  jar.set(STUDIO_AUTH_COOKIE, "ok", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/studio",
    maxAge: STUDIO_AUTH_MAX_AGE_SECONDS
  });

  redirect("/studio");
}

export default async function StudioPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
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
  const accessPin = process.env.STUDIO_ACCESS_PIN || readEnvFileValue("STUDIO_ACCESS_PIN");
  const jar = await cookies();
  const isAuthed = jar.get(STUDIO_AUTH_COOKIE)?.value === "ok";

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

  if (!accessPin) {
    return (
      <main className="container py-10">
        <h1 className="text-2xl font-semibold">Studio PIN is not configured</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Add <code>STUDIO_ACCESS_PIN</code> in your environment and redeploy/restart.
        </p>
      </main>
    );
  }

  if (!isAuthed) {
    return (
      <main className="container py-10">
        <h1 className="text-2xl font-semibold">Studio Access</h1>
        <p className="mt-3 text-sm text-muted-foreground">Enter the PIN to continue.</p>
        <form action={loginAction} className="mt-6 max-w-sm space-y-3">
          <input
            type="password"
            name="password"
            required
            autoComplete="off"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            placeholder="PIN"
          />
          {params?.error === "invalid_pin" ? <p className="text-sm text-red-500">Invalid PIN. Try again.</p> : null}
          <button type="submit" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            Unlock Studio
          </button>
        </form>
      </main>
    );
  }

  return (
    <>
      <StudioClient projectId={projectId} dataset={dataset} apiVersion={apiVersion} />
    </>
  );
}

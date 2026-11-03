import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type WebhookPayload = {
  _type?: string;
  slug?: { current?: string };
  appSlug?: { current?: string };
  policyType?: string;
  documentId?: string;
};

function isAuthorized(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return false;

  const querySecret = request.nextUrl.searchParams.get("secret");
  const headerSecret = request.headers.get("x-webhook-secret");
  return querySecret === secret || headerSecret === secret;
}

function tagsForPayload(payload: WebhookPayload) {
  const tags = new Set<string>();

  switch (payload._type) {
    case "siteSettings":
      tags.add("settings");
      break;
    case "project":
      tags.add("projects");
      if (payload.slug?.current) tags.add(`project:${payload.slug.current}`);
      break;
    case "post":
      tags.add("posts");
      if (payload.slug?.current) tags.add(`post:${payload.slug.current}`);
      break;
    case "experience":
      tags.add("experience");
      break;
    case "testimonial":
      tags.add("testimonials");
      break;
    case "skill":
      tags.add("skills");
      break;
    case "appPolicy":
      tags.add("policies");
      if (payload.appSlug?.current && payload.policyType) {
        tags.add(`policy:${payload.appSlug.current}:${payload.policyType}`);
      }
      break;
    default:
      tags.add("settings");
      tags.add("projects");
      tags.add("posts");
      tags.add("experience");
      tags.add("testimonials");
      tags.add("skills");
      tags.add("policies");
  }

  return [...tags];
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const tag = request.nextUrl.searchParams.get("tag");
  const path = request.nextUrl.searchParams.get("path");

  if (tag) {
    revalidateTag(tag);
    return NextResponse.json({ revalidated: true, tag });
  }

  if (path) {
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path });
  }

  const allTags = ["settings", "projects", "posts", "experience", "testimonials", "skills", "policies"];
  allTags.forEach((t) => revalidateTag(t));
  revalidatePath("/", "layout");

  return NextResponse.json({ revalidated: true, allTags, path: "/" });
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let payload: WebhookPayload = {};
  try {
    payload = (await request.json()) as WebhookPayload;
  } catch {
    payload = {};
  }

  const tags = tagsForPayload(payload);
  tags.forEach((tag) => revalidateTag(tag));
  revalidatePath("/", "layout");

  return NextResponse.json({ revalidated: true, tags, type: payload._type || "unknown" });
}

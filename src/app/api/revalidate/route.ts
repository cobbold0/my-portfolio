import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

type WebhookPayload = {
  _type?: string;
  slug?: { current?: string };
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
    default:
      tags.add("settings");
      tags.add("projects");
      tags.add("posts");
      tags.add("experience");
      tags.add("testimonials");
      tags.add("skills");
  }

  return [...tags];
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
  tags.forEach((tag) => revalidateTag(tag, "max"));

  return NextResponse.json({ revalidated: true, tags, type: payload._type || "unknown" });
}

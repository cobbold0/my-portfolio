import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { getPostMeta } from "@/lib/blog";
import { getProjectDataBySlug, getSiteProfile } from "@/lib/content";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const postSlug = searchParams.get("post");

  const profile = await getSiteProfile();
  let title = `${profile.name} Portfolio`;
  let subtitle = profile.roleLine;

  if (postSlug) {
    try {
      const post = await getPostMeta(postSlug);
      title = post.title;
      subtitle = post.summary;
    } catch {
      // Fall back to defaults when slug is unknown.
    }
  } else if (page?.startsWith("project-")) {
    const slug = page.replace("project-", "");
    const project = await getProjectDataBySlug(slug);
    if (project) {
      title = project.title;
      subtitle = project.summary;
    }
  } else if (page) {
    title = `${page[0].toUpperCase()}${page.slice(1)}`;
    subtitle = profile.roleLine;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          background: "linear-gradient(135deg, #0b1220 0%, #1e355f 50%, #2ea0b8 100%)",
          color: "white"
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.9 }}>{profile.name}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: "90%" }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>{title}</div>
          <div style={{ fontSize: 30, opacity: 0.9 }}>{subtitle}</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

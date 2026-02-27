import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, contactSchema, handleContactSubmission } from "@/lib/contact";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ message: "Too many requests. Please try again later." }, { status: 429 });
  }

  try {
    const json = (await request.json()) as unknown;
    const parsed = contactSchema.parse(json);

    if (parsed.honey) {
      return NextResponse.json({ message: "Spam detected." }, { status: 400 });
    }

    await handleContactSubmission(parsed);

    return NextResponse.json({ message: "Message received." }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Invalid form submission." }, { status: 400 });
  }
}

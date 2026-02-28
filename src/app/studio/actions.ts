"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const STUDIO_AUTH_COOKIE = "studio_auth";

export async function lockStudioAction() {
  const jar = await cookies();
  jar.delete(STUDIO_AUTH_COOKIE);
  jar.set(STUDIO_AUTH_COOKIE, "", { path: "/studio", maxAge: 0 });
  jar.set(STUDIO_AUTH_COOKIE, "", { path: "/", maxAge: 0 });
  redirect("/studio");
}

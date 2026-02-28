import { getSiteProfile } from "@/lib/content";
import { NavbarClient } from "@/components/layout/navbar-client";

export async function Navbar() {
  const profile = await getSiteProfile();
  return <NavbarClient name={profile.name} socials={profile.socials} />;
}

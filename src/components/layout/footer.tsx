import Link from "next/link";
import { getSiteProfile } from "@/lib/content";

export async function Footer() {
  const profile = await getSiteProfile();

  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <div className="flex items-center gap-4">
          {profile.socials.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              data-analytics-event="social_click"
              data-analytics-source="footer"
              data-analytics-label={social.label}
              data-analytics-target={social.href}
            >
              {social.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

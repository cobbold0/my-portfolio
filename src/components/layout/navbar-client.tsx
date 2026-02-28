"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Instagram, Linkedin, Menu, Store, Twitter } from "lucide-react";
import { setNavigationContext, trackEvent } from "@/lib/analytics";
import type { SocialLink } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { lockStudioAction } from "@/app/studio/actions";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" }
];

export function NavbarClient({ name, socials }: { name: string; socials: SocialLink[] }) {
  const pathname = usePathname();
  const isStudioRoute = pathname.startsWith("/studio");

  const iconMap = {
    GitHub: Github,
    LinkedIn: Linkedin,
    X: Twitter,
    Twitter,
    Instagram: Instagram,
    "Play Store": Store
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          {name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition hover:text-foreground"
              onClick={() => {
                setNavigationContext(`navbar_desktop:${item.href}`);
                trackEvent({
                  name: "navigation_click",
                  properties: { source: "navbar_desktop", target: item.href, label: item.label }
                });
              }}
            >
              {item.label}
            </Link>
          ))}
          {isStudioRoute ? (
            <form action={lockStudioAction}>
              <button type="submit" className="text-sm text-muted-foreground transition hover:text-foreground">
                Lock Studio
              </button>
            </form>
          ) : null}
        </nav>

        <TooltipProvider>
          <div className="hidden items-center gap-2 md:flex">
            {isStudioRoute ? (
              <form action={lockStudioAction}>
                <Button type="submit" size="sm" variant="outline">
                  Lock Studio
                </Button>
              </form>
            ) : null}
            {socials.map((social) => {
              const Icon = iconMap[social.label as keyof typeof iconMap];
              return (
                <Tooltip key={social.label}>
                  <TooltipTrigger asChild>
                    <Button asChild size="icon" variant="ghost">
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={social.label}
                        onClick={() => {
                          trackEvent({
                            name: "social_click",
                            properties: { source: "navbar_desktop", label: social.label, target: social.href }
                          });
                        }}
                      >
                        {Icon ? <Icon className="h-4 w-4" /> : social.label}
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{social.label}</TooltipContent>
                </Tooltip>
              );
            })}
            <ThemeToggle />
          </div>
        </TooltipProvider>

        <div className="flex items-center gap-1 md:hidden">
          {isStudioRoute ? (
            <form action={lockStudioAction}>
              <Button type="submit" size="sm" variant="outline">
                Lock
              </Button>
            </form>
          ) : null}
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="space-y-4 p-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-sm font-medium"
                  onClick={() => {
                    setNavigationContext(`navbar_mobile:${item.href}`);
                    trackEvent({
                      name: "navigation_click",
                      properties: { source: "navbar_mobile", target: item.href, label: item.label }
                    });
                  }}
                >
                  {item.label}
                </Link>
              ))}
              {isStudioRoute ? (
                <form action={lockStudioAction}>
                  <button type="submit" className="block text-sm font-medium">
                    Lock Studio
                  </button>
                </form>
              ) : null}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

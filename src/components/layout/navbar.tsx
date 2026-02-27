"use client";

import Link from "next/link";
import { Github, Linkedin, Menu, Twitter } from "lucide-react";
import { profile, socials } from "@/content/profile";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" }
];

export function Navbar() {
  const iconMap = {
    GitHub: Github,
    LinkedIn: Linkedin,
    X: Twitter
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          {profile.name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-muted-foreground transition hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>

        <TooltipProvider>
          <div className="hidden items-center gap-2 md:flex">
            {socials.map((social) => {
              const Icon = iconMap[social.label as keyof typeof iconMap];
              return (
                <Tooltip key={social.label}>
                  <TooltipTrigger asChild>
                    <Button asChild size="icon" variant="ghost">
                      <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
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
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="space-y-4 p-6">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="block text-sm font-medium">
                  {item.label}
                </Link>
              ))}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

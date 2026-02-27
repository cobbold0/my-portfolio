# Portfolio Website (Next.js App Router)

Production-ready portfolio built with Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui.

## Stack

- Next.js (App Router, Server Components by default)
- TypeScript
- Tailwind CSS + shadcn/ui-style components
- MDX blog
- Zod validation + Route Handlers
- Framer Motion (reduced-motion aware)
- PWA manifest + service worker

## Install and Run

```bash
npm install
npm run dev
```

Open: [http://localhost:3000](http://localhost:3000)

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run start
```

## Content Editing Guide

All main content is data-driven under `src/content/`.

- `src/content/profile.ts`: name, tagline, socials, metrics, contact metadata.
- `src/content/skills.ts`: grouped skills matrix.
- `src/content/projects.ts`: project case studies and metadata.
- `src/content/experience.ts`: experience timeline, education, certifications.
- `src/content/testimonials.ts`: testimonial cards.
- `src/content/blog/*.mdx`: blog posts with frontmatter.

### Add a Project

1. Add an entry in `src/content/projects.ts` with a unique `slug`.
2. Add screenshots to `public/projects/`.
3. Include required fields: problem, solution, responsibilities, impact metrics, links, architecture.

### Add a Blog Post

1. Add a new file in `src/content/blog/your-post-slug.mdx`.
2. Include frontmatter:

```md
---
title: "Post title"
date: "2026-02-01"
tags:
  - backend
summary: "Short summary"
coverImage: "/projects/placeholder.svg"
---
```

3. Write content using Markdown/MDX syntax.

## Environment Variables

Copy `.env.example` to `.env.local` and fill values as needed:

```bash
CONTACT_EMAIL_TO=
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Contact Form Behavior

Route handler: `POST /api/contact`

- Validates input with Zod.
- Honeypot field (`honey`) blocks basic bots.
- In-memory rate limiter (5 requests / 10 min / IP).

Email delivery/fallback:

- If SMTP vars are present, sends via nodemailer.
- Without SMTP in development, writes to `src/content/contact-submissions.json`.
- Without SMTP in production, logs submission server-side.

Limitation: in-memory rate limiting resets on server restart and does not share state across multiple instances.

## SEO

Implemented:

- Global metadata with title templates, keywords, authors.
- OpenGraph + Twitter cards.
- Dynamic OG image endpoint: `src/app/api/og/route.tsx`.
- `sitemap.xml` via `src/app/sitemap.ts`.
- `robots.txt` via `src/app/robots.ts`.

## PWA

Implemented:

- Web app manifest via `src/app/manifest.ts`.
- Service worker at `public/sw.js`.
- Icons in `public/icons/`.

### Test PWA Locally

1. Run `npm run build && npm run start`.
2. Open in Chromium browser.
3. DevTools → Application tab:
   - Verify Manifest is valid.
   - Verify Service Worker is active.
4. Use browser install prompt (or “Install app”).

## Deployment (Vercel)

1. Push repository to Git provider.
2. Import project in Vercel.
3. Set environment variables in Vercel project settings.
4. Deploy with default Next.js build settings.

## Project Structure

```text
src/
  app/
  components/
  content/
  lib/
  styles/
public/
  resume.pdf
  icons/
```

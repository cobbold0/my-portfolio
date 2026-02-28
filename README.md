# Portfolio Website (Next.js + Sanity CMS)

Existing Next.js App Router portfolio with the same UI/routes, now wired to Sanity CMS as the default content source.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS + shadcn/ui-style components
- Sanity Studio (in-repo) + `next-sanity`
- MDX local fallback for blog content
- Zod contact validation + route handlers
- PWA manifest + service worker
- Vercel Web Analytics

## Install and Run

```bash
npm install
npm run dev
```

Open: [http://localhost:3001](http://localhost:3001)

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run start
npm run sanity:dev
npm run sanity:build
npm run seed:sanity
```

## Content Source Flag

Set `CONTENT_SOURCE` in `.env.local`:

- `sanity` (default): use Sanity as source of truth.
- `local`: use existing local files in `src/content/*`.

Behavior:

- Blog supports both sources.
- With `CONTENT_SOURCE=sanity`, the app still safely falls back to local content when Sanity data is empty/unavailable.

## Sanity Setup

1. Create a Sanity project (or use existing).
2. Copy `.env.example` to `.env.local`.
3. Fill Sanity env vars:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - `SANITY_STUDIO_PROJECT_ID` (same value as `NEXT_PUBLIC_SANITY_PROJECT_ID`)
   - `SANITY_STUDIO_DATASET` (same value as `NEXT_PUBLIC_SANITY_DATASET`)
   - `SANITY_STUDIO_API_VERSION` (same value as `NEXT_PUBLIC_SANITY_API_VERSION`)
   - `SANITY_API_READ_TOKEN` (optional for draft/private reads)
   - `SANITY_REVALIDATE_SECRET`
4. Start Studio:

```bash
npm run sanity:dev
```

Studio path is served at `/studio` in the Next app, and via Sanity CLI dev server.

## Sanity Schemas

Defined in `/sanity/schemaTypes`:

- `siteSettings` (singleton)
- `project`
- `post`
- `experience`
- `testimonial`

Desk structure is configured so `siteSettings` is a singleton and others are grouped lists.

## Revalidation Webhook

Route: `POST /api/revalidate?secret=YOUR_SECRET`

Supported tags:

- `settings`
- `projects`, `project:<slug>`
- `posts`, `post:<slug>`
- `experience`
- `testimonials`

### Sanity webhook configuration

In Sanity project settings, create a webhook:

- URL: `https://<your-domain>/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>`
- Trigger on create/update/delete for document types:
  - `siteSettings`
  - `project`
  - `post`
  - `experience`
  - `testimonial`
- HTTP method: `POST`
- Payload: include `_type` and `slug.current` when available.

## Seed Existing Local Content into Sanity

Run once (or rerun safely):

```bash
npm run seed:sanity
```

What it does:

- Upserts `siteSettings` singleton.
- Upserts projects by slug.
- Upserts posts by slug.
- Upserts experience entries.
- Upserts testimonials.

Idempotency:

- Uses deterministic `_id` values (`siteSettings`, `project.<slug>`, `post.<slug>`, etc.) and `createOrReplace`.

MDX conversion note:

- Local MDX body content is converted into plain Portable Text paragraphs during seeding.
- This is intentional and safe; richer MDX constructs should be refined manually in Studio after seed.

## Resume

- `public/resume.pdf` remains in place.
- In Sanity `siteSettings`, upload `resumeFile` (PDF) to update the downloadable resume anytime.
- Resume button/link now prefers Sanity `resumeFile` URL, then `siteSettings.resumeUrl`, and finally falls back to `/resume.pdf`.

## Vercel Analytics

`@vercel/analytics` is integrated in the app layout and only renders in production.

To enable data collection:

1. Deploy to Vercel.
2. Open project dashboard.
3. Enable Web Analytics for the project.

## Contact Form Behavior

Route handler: `POST /api/contact`

- Validates input with Zod.
- Honeypot field (`honey`) blocks basic bots.
- In-memory rate limiter (5 requests / 10 min / IP).

Email/fallback behavior:

- If SMTP vars are set, sends via nodemailer.
- Without SMTP in development, writes to `src/content/contact-submissions.json`.
- Without SMTP in production, logs submission server-side.

Limitation: in-memory rate limiting resets on restart and does not synchronize across multiple instances.

## Deploy Notes

### Next.js app (Vercel)

1. Push repo.
2. Import in Vercel.
3. Set env vars from `.env.example`.
4. Deploy.

### Sanity Studio deployment options

- Use `npm run sanity:build` and deploy static output.
- Or run Studio embedded via `/studio` in this Next app.

## Project Structure

```text
sanity/
  sanity.config.ts
  sanity.cli.ts
  schemaTypes/
src/
  app/
  components/
  content/
  lib/
  styles/
scripts/
  seed-sanity.ts
public/
  resume.pdf
  icons/
```

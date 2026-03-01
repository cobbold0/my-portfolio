# Portfolio Website (Next.js + Sanity CMS)

Existing Next.js App Router portfolio with the same UI/routes, now wired to Sanity CMS as the default content source.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS + shadcn/ui-style components
- Sanity Studio (in-repo) + `next-sanity`
- MDX local fallback for blog content
- Zod contact validation + route handlers
- PWA manifest + service worker
- Firebase Analytics

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
- Optional: `NEXT_PUBLIC_SOURCE_REPO_URL` to control the repository/fork links shown on the `/about` page.

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

## Firebase Analytics

Firebase Analytics is integrated in the app layout.

Set these env vars in `.env.local`:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`
- `NEXT_PUBLIC_FIREBASE_ANALYTICS_IN_DEV` (`true` to enable analytics during `npm run dev`)
- `NEXT_PUBLIC_FIREBASE_ANALYTICS_DEBUG` (`true` to log events in browser console)

Behavior:

- If required Firebase env vars are missing, analytics remains a safe no-op.
- By default analytics initializes in production; set `NEXT_PUBLIC_FIREBASE_ANALYTICS_IN_DEV=true` to test in dev.
- With `NEXT_PUBLIC_FIREBASE_ANALYTICS_DEBUG=true`, events are logged to browser console and sent with `debug_mode` for DebugView.
- Uses anonymous identity/session context:
  - persistent `anon_user_id` (localStorage)
  - tab session `session_id` (sessionStorage)
  - `visitor_type` (`new` or `returning`)
  - user properties include `first_seen_at`

Tracked events (prefixed as `app_*` in GA4):

- `app_analytics_boot`
- `app_page_view` (`pathname`, `nav_context`)
- `app_tool_open` (`tool`, `pathname`, `traffic_source`, `referrer_host`, `nav_context`)
- `app_tool_action` (`tool`, `action`, plus tool-specific fields like `count`)
- `app_page_engagement` (`pathname`, `duration_sec`, `max_scroll_pct`)
- `app_section_engagement` (home sections: `section`, `duration_sec`)
- `app_home_scroll_bottom`
- `app_navigation_click`
- `app_click_project`
- `app_project_view`
- `app_click_blog`
- `app_blog_view`
- `app_download_cv`
- `app_social_click`
- `app_submit_contact`
- `app_outbound_click`

Analytics caveats:

- Use GA4/Firebase **DebugView** or Realtime for immediate validation.
- Standard GA4 Events reports can take up to 24 hours.
- Ad blockers/tracking protection can block event delivery during testing.

## GitHub Profile Section

Homepage can show live GitHub profile data:

- Recent commit activity
- Contributions by year (filterable in UI)
- Repository count (public + private when token allows)

Setup:

1. Set your GitHub profile URL in `siteSettings.socials` (label `GitHub`).
2. Add `GITHUB_TOKEN` in `.env.local`.
3. Use a token with minimum read access (`Metadata` read-only is sufficient for public data; private counts/activity require access to your private repos).

Fallback behavior:

- Without token (or when token user does not match profile URL), the app shows public profile stats only.

## LinkedIn Blog Share (Per-Post Flag)

You can optionally show a manual LinkedIn share button per post.

Setup:

1. In each post document, set `shareOnLinkedIn = true` for posts you want to share.
2. Open the post page and click `Share on LinkedIn`.

Behavior:

- No LinkedIn API keys or webhook automation required.
- Button uses LinkedIn offsite share URL for the current post.

## LinkedIn Badge

Homepage hero can show the official LinkedIn profile badge.

Behavior:

- Reads the LinkedIn URL from `siteSettings.socials` (label `LinkedIn`).
- Parses the vanity from `/in/<vanity>` and normalizes profile URL.
- Badge is hidden when URL is missing/invalid.
- Badge theme follows app light/dark mode.

## About Page and Open Source

The site includes an `/about` page that documents:

- Architecture and implementation approach
- Technology stack used
- Open-source usage and fork flow

Repo action buttons on this page use:

- `NEXT_PUBLIC_SOURCE_REPO_URL` when set
- Fallback to your GitHub social URL in `siteSettings.socials`

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
    about/
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

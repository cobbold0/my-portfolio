# SEO Full Audit Report: augustine.cobbold.dev

**Target URL:** `https://augustine.cobbold.dev`  
**Platform:** Next.js (App Router) + Vercel + Sanity CMS  
**Audit Date:** 2026-11-02  
**Overall SEO Score:** **74 / 100** (Rating: **Good**, with high-impact quick wins available)

---

## 1. Executive Summary & Scorecard

| Category | Weight | Score | Rating | Primary Status |
|:---|:---:|:---:|:---:|:---|
| **Technical SEO** | 25% | 78 / 100 | Good | Clean Next.js server rendering, but `robots.txt` misses admin/API protection and AI bot policy. |
| **On-Page SEO** | 15% | 62 / 100 | Needs Improvement | 🔴 Homepage title and OpenGraph title are literally set to `"Home"`. |
| **Content Quality & E-E-A-T** | 20% | 85 / 100 | Good | Deep technical case studies and Android/fintech domain authority; author bio needs structured verification. |
| **Schema & Structured Data** | 15% | 72 / 100 | Good | Has valid `WebSite`, `Person`, and `Article` schemas, but lacks `ProfilePage` and `knowsAbout` signals. |
| **Performance (CWV)** | 10% | 80 / 100 | Good | Fonts and key assets preloaded; third-party LinkedIn badge script needs deferral. Target INP, not FID. |
| **Image Optimization** | 10% | 82 / 100 | Good | Next/Image and Sanity CDN image resizing active with modern formats. |
| **AI Search Readiness (GEO)** | 5% | 40 / 100 | Poor | `llms.txt` is missing (HTTP 404), and AI crawlers are not explicitly managed. |

---

## 2. Key Findings & Detailed Analysis

### Finding 1: Homepage Title and OpenGraph Title Are Generic (`"Home"`)
- **Severity:** 🔴 **Critical**
- **Confidence:** `Confirmed` (Live HTML inspection)
- **Evidence:**
  ```html
  <title>Home</title>
  <meta property="og:title" content="Home"/>
  <meta name="twitter:title" content="Home"/>
  ```
- **Impact:** Google SERPs and social shares show "Home" instead of your name and professional expertise. This hurts branded search ranking, click-through rates (CTR), and snippet clarity.
- **Root Cause:** In `src/app/page.tsx`, `metadata.title` is hardcoded to `"Home"`. Next.js layout title template is bypassed or overridden.
- **Fix:** Update `src/app/page.tsx` metadata title to `"Augustine Cobbold | Software Engineer & Mobile/Frontend Specialist"` and set descriptive OG/Twitter titles.

---

### Finding 2: AI Search Readiness & Missing `llms.txt` (HTTP 404)
- **Severity:** ⚠️ **Warning**
- **Confidence:** `Confirmed` (HTTP 404 on `https://augustine.cobbold.dev/llms.txt`)
- **Evidence:** `curl -s -I https://augustine.cobbold.dev/llms.txt` returned HTTP 404.
- **Impact:** Perplexity, ChatGPT Search, Claude, and Gemini search systems look for `/llms.txt` to discover site capabilities, key projects (DevMock, Dial Hash, Nexgt Mall), and technical specialties.
- **Fix:** Add a static `/public/llms.txt` or an App Router route (`src/app/llms.txt/route.ts`) documenting your engineering focus, key repositories, and article index.

---

### Finding 3: `robots.txt` Lacks Studio/API Route Protection and AI Crawler Policies
- **Severity:** ⚠️ **Warning**
- **Confidence:** `Confirmed` (Live `robots.txt` and `src/app/robots.ts`)
- **Evidence:**
  ```text
  User-Agent: *
  Allow: /
  Sitemap: https://augustine.cobbold.dev/sitemap.xml
  ```
- **Impact:** 
  1. Internal routes like `/studio` (Sanity Studio CMS) and `/api/` endpoints are left open to crawler indexing.
  2. Modern AI scrapers and search bots (`GPTBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`) receive no targeted policy.
- **Fix:** Update `src/app/robots.ts` to disallow `/studio/` and internal `/api/`, while explicitly allowing beneficial search bots.

---

### Finding 4: Schema Missing `ProfilePage` Type and Detailed E-E-A-T Attributes
- **Severity:** ⚠️ **Warning**
- **Confidence:** `Confirmed` (Live JSON-LD in `<head>`)
- **Evidence:** Currently only outputs generic `WebSite` and `Person`:
  ```json
  {"@context":"https://schema.org","@graph":[{"@type":"WebSite",...},{"@type":"Person",...}]}
  ```
- **Impact:** Google Search recommends `ProfilePage` schema for personal portfolio websites where the person is the `mainEntity`. Lacks `knowsAbout` (skills), `alumniOf`, and software developer entities.
- **Fix:** Enrich `src/app/layout.tsx` structured data with `@type: "ProfilePage"`, `knowsAbout: ["Android", "Kotlin", "React Native", "Next.js", "TypeScript", "Offline Sync Architecture"]`, and link to public developer profiles (Google Play Store, GitHub).

---

### Finding 5: Missing Recommended Security & Referrer Headers in Production
- **Severity:** ℹ️ **Info**
- **Confidence:** `Confirmed` (HTTP response header check)
- **Evidence:** HSTS is active (`strict-transport-security: max-age=63072000`), but `X-Content-Type-Options: nosniff`, `X-Frame-Options`, and `Referrer-Policy: strict-origin-when-cross-origin` are absent in HTTP headers.
- **Impact:** Security headers protect against MIME sniffing and clickjacking, and preserve referrer signals when users click through to external resources.
- **Fix:** Add HTTP security headers in `next.config.ts`.

---

### Finding 6: Article Content & Technical Authority Are Strong
- **Severity:** ✅ **Pass**
- **Confidence:** `Confirmed` (Sitemap & Blog inspection)
- **Evidence:** High-quality in-depth articles like:
  - `Designing Offline Sync for Mobile Field Apps`
  - `Mobile Money Scams Are Rising: Here’s How to Protect Yourself`
  - `Roadmap to Become an Android Developer in 2026 (Job Ready)`
- **Impact:** Strong domain authority for African fintech, mobile engineering, and offline-first mobile architecture. Good readability and comprehensive coverage.

---

## 3. Verified Artifact Inventory

- `FULL-AUDIT-REPORT.md` (This document)
- `ACTION-PLAN.md` (Prioritized code fixes and implementation steps)

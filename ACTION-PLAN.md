# SEO Action Plan: augustine.cobbold.dev

This action plan outlines prioritized fixes based on the SEO audit for `augustine.cobbold.dev`. Tasks are ordered by ROI and implementation simplicity.

---

## Phase 1: High-Impact Quick Wins (Immediate / Within 24-48 Hours)

### Task 1: Fix Homepage Title and Meta Tags
- **File:** `src/app/page.tsx`
- **Issue:** The title is currently hardcoded to `"Home"`.
- **Change:**
```typescript
// src/app/page.tsx
export const metadata: Metadata = {
  title: "Augustine Cobbold | Software Engineer & Mobile/Frontend Specialist",
  description:
    "Engineering portfolio of Augustine Cobbold. Specializing in Android, React Native, Next.js, and offline-first mobile architecture with case studies, writing, and developer tools.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Augustine Cobbold | Software Engineer & Mobile/Frontend Specialist",
    description:
      "Engineering portfolio of Augustine Cobbold. Case studies in mobile apps, offline sync, developer tools, and web engineering.",
    images: [absoluteUrl("/api/og?page=home")]
  },
  twitter: {
    title: "Augustine Cobbold | Software Engineer & Mobile/Frontend Specialist",
    description:
      "Engineering portfolio of Augustine Cobbold. Case studies in mobile apps, offline sync, developer tools, and web engineering.",
    images: [absoluteUrl("/api/og?page=home")]
  }
};
```

---

### Task 2: Create `public/llms.txt` for AI Engine Optimization (GEO / AEO)
- **File:** `public/llms.txt`
- **Purpose:** Enables Perplexity, ChatGPT Search, Claude, and Gemini to quickly index and quote your experience, developer tools, apps, and articles.
- **Content:**
```markdown
# Augustine Cobbold

> Software Engineer specializing in Mobile Development (Android/Kotlin, React Native), Modern Web (Next.js, TypeScript), and Backend Architecture.

## Key Information
- **Portfolio & Case Studies:** https://augustine.cobbold.dev
- **GitHub:** https://github.com/cobbold0
- **LinkedIn:** https://www.linkedin.com/in/augustinecobbold
- **Google Play Developer:** https://play.google.com/store/apps/developer?id=Cobbold

## Key Projects & Tools
- **DevMock:** Mobile network simulation and traffic control testing tool for Android developers.
- **Dial Hash (Shortcodes):** USSD quick-dialing and offline transaction utility app.
- **Circle Pay:** Digital rotational savings and cooperative finance platform.
- **Nexgt Mall:** Multi-vendor African commerce platform.
- **Web Developer Utilities:** UUID Generator, JSON Formatter, JWT Decoder, and JS Sandbox at https://augustine.cobbold.dev/tools

## Technical Writing
- Designing Offline Sync for Mobile Field Apps (Architecture, Queue-based sync, conflict resolution)
- Mobile Money Scams & Fraud Prevention in Emerging Markets
- Roadmap to Become an Android Developer in 2026 (Job Ready)
```

---

### Task 3: Hardening `src/app/robots.ts`
- **File:** `src/app/robots.ts`
- **Issue:** Protect CMS admin (`/studio`) and private API routes while welcoming search engine bots and AI indexers.
- **Change:**
```typescript
// src/app/robots.ts
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/studio/", "/api/"]
      },
      {
        userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Applebot-Extended"],
        allow: ["/", "/blog", "/projects", "/tools", "/about", "/llms.txt"],
        disallow: ["/studio", "/api/"]
      }
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`
  };
}
```

---

## Phase 2: Schema & E-E-A-T Enhancements (Week 1)

### Task 4: Add `ProfilePage` and `knowsAbout` to Global Structured Data
- **File:** `src/app/layout.tsx`
- **Change:** Enrich `structuredData` in `layout.tsx`:
```typescript
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${siteConfig.url}/#profilepage`,
      url: siteConfig.url,
      name: `${canonicalName} Portfolio`,
      isPartOf: {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: `${canonicalName} Portfolio`
      },
      mainEntity: {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: canonicalName,
        givenName,
        familyName,
        alternateName: [
          "Agustine Cobbold",
          "Augusine Cobbold",
          familyName ? `${familyName} ${givenName}` : undefined
        ].filter(Boolean),
        url: siteConfig.url,
        jobTitle: profile.roleLine || "Software Engineer",
        image: profileImage,
        sameAs: socialLinks,
        knowsAbout: [
          "Android Development",
          "Kotlin",
          "Jetpack Compose",
          "React Native",
          "Next.js",
          "TypeScript",
          "Mobile Offline Sync Architecture",
          "Fintech Systems"
        ]
      }
    }
  ]
};
```

---

## Phase 3: Security & Header Optimizations (Week 2)

### Task 5: Add Security & Cache Headers in `next.config.ts`
- **File:** `next.config.ts`
- **Add:**
```typescript
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }
        ]
      }
    ];
  }
};
```

---

## Tracking & Validation Checklist

- [ ] Deploy title and metadata updates.
- [ ] Verify `https://augustine.cobbold.dev/llms.txt` responds with HTTP 200.
- [ ] Test JSON-LD schema using [Google Rich Results Test](https://search.google.com/test/rich-results).
- [ ] Re-run `curl -s https://augustine.cobbold.dev/robots.txt` to confirm `/studio/` is disallowed.
- [ ] Monitor Google Search Console for impression gains on brand and technical keywords.

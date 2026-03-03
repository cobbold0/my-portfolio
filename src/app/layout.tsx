import type { Metadata } from "next";
import "@/styles/globals.css";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { getSiteProfile } from "@/lib/content";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { PageViewTracker } from "@/components/layout/page-view-tracker";
import { AnalyticsClickTracker } from "@/components/layout/analytics-click-tracker";
import { PwaRegister } from "@/components/layout/pwa-register";
import { FirebaseAnalytics } from "@/components/layout/firebase-analytics";
import { MagneticCursor } from "@/components/layout/magnetic-cursor";
import { displayFont, sansFont } from "@/lib/fonts";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getSiteProfile();
  const rawTitle = profile.seo?.title || `${profile.name} Portfolio`;
  const title = rawTitle.toLowerCase().includes(profile.name.toLowerCase()) ? rawTitle : `${rawTitle} | ${profile.name}`;
  const description = profile.seo?.description || siteConfig.description;
  const brandedKeywords = Array.from(
    new Set([
      ...siteConfig.keywords,
      profile.name,
      `${profile.name} portfolio`,
      profile.name.split(" ").reverse().join(" "),
      "Agustine Cobbold",
      "Augusine Cobbold"
    ])
  );

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: title,
      template: `%s | ${title}`
    },
    description,
    keywords: brandedKeywords,
    authors: [{ name: profile.name }],
    openGraph: {
      title,
      description,
      url: siteConfig.url,
      siteName: title,
      images: [
        {
          url: profile.seo?.ogImage || absoluteUrl("/api/og?page=home"),
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      type: "website"
    },
    robots: {
      index: true,
      follow: true
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [profile.seo?.ogImage || absoluteUrl("/api/og?page=home")]
    },
    manifest: "/icons/site.webmanifest",
    icons: {
      icon: [
        { url: "/icons/favicon.ico" },
        { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" }
      ],
      apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
      shortcut: ["/icons/favicon.ico"]
    }
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const profile = await getSiteProfile();
  const socialLinks = profile.socials.map((social) => social.href);
  const canonicalName = profile.name;
  const givenName = canonicalName.split(" ")[0] || canonicalName;
  const familyName = canonicalName.split(" ").slice(1).join(" ") || undefined;
  const profileImage = profile.profileImage
    ? profile.profileImage.startsWith("http")
      ? profile.profileImage
      : absoluteUrl(profile.profileImage)
    : undefined;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: `${canonicalName} Portfolio`,
        url: siteConfig.url,
        description: siteConfig.description
      },
      {
        "@type": "Person",
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
        sameAs: socialLinks
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="TN__nsPxDLPfDu7OgtPqpPogU5mWj_5sT28vbZRYmbU" />
        <meta name="yandex-verification" content="e31be8045dd48940" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body className={`${sansFont.variable} ${displayFont.variable} min-h-screen font-sans`}>
        <ThemeProvider>
          <MagneticCursor />
          <PwaRegister />
          <PageViewTracker />
          <AnalyticsClickTracker />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FirebaseAnalytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

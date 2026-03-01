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
  const title = profile.seo?.title || `${profile.name} Portfolio`;
  const description = profile.seo?.description || siteConfig.description;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: title,
      template: `%s | ${title}`
    },
    description,
    keywords: siteConfig.keywords,
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
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [profile.seo?.ogImage || absoluteUrl("/api/og?page=home")]
    },
    icons: {
      icon: ["/icons/icon.svg"],
      apple: ["/icons/apple-touch-icon.svg"]
    }
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="TN__nsPxDLPfDu7OgtPqpPogU5mWj_5sT28vbZRYmbU" />
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

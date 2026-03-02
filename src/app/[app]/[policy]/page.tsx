import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";
import { formatDateUtc } from "@/lib/date";
import { getAllAppPolicyParams, getAppPolicy } from "@/lib/policies";
import { TableOfContents } from "@/components/blog/toc";
import { PortableTextRenderer } from "@/components/blog/portable-text";

export async function generateStaticParams() {
  return getAllAppPolicyParams();
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ app: string; policy: string }>;
}): Promise<Metadata> {
  const { app, policy } = await params;
  const appPolicy = await getAppPolicy(app, policy);

  if (!appPolicy) {
    return {};
  }

  const title = appPolicy.title || `${appPolicy.appName} ${appPolicy.policyType}`;
  const description = appPolicy.summary || `Read the ${appPolicy.policyType} policy for ${appPolicy.appName}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${app}/${policy}`
    },
    openGraph: {
      title,
      description,
      images: [absoluteUrl("/api/og?page=home")]
    },
    twitter: {
      title,
      description,
      images: [absoluteUrl("/api/og?page=home")]
    }
  };
}

export default async function AppPolicyPage({
  params
}: {
  params: Promise<{ app: string; policy: string }>;
}) {
  const { app, policy } = await params;
  const appPolicy = await getAppPolicy(app, policy);

  if (!appPolicy) {
    notFound();
  }

  return (
    <div className="container py-12">
      <article className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="order-2 lg:order-1">
          <p className="text-sm uppercase tracking-wide text-muted-foreground">{appPolicy.appName}</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">{appPolicy.title}</h1>
          {appPolicy.summary ? <p className="mt-4 text-muted-foreground">{appPolicy.summary}</p> : null}
          {appPolicy.lastUpdated ? (
            <p className="mt-3 text-sm text-muted-foreground">Last updated: {formatDateUtc(appPolicy.lastUpdated)}</p>
          ) : null}

          <div className="prose prose-slate dark:prose-invert mt-8 max-w-none">
            <PortableTextRenderer value={appPolicy.body || []} />
          </div>
        </div>
        <div className="order-1 space-y-4 lg:order-2">
          <TableOfContents items={appPolicy.headings} />
        </div>
      </article>
    </div>
  );
}

import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";
import { getSkillsData } from "@/lib/content";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Skills",
  description: "All skills and capabilities across frontend, backend, mobile, and tools.",
  openGraph: {
    images: [absoluteUrl("/api/og?page=skills")]
  },
  twitter: {
    images: [absoluteUrl("/api/og?page=skills")]
  }
};

const highlightedLevelClassMap: Record<number, string> = {
  4: "border-primary/45 bg-primary/15 shadow-[0_0_0_1px_hsl(var(--primary)/0.35)]",
  5: "border-primary/60 bg-primary/25 shadow-[0_0_0_1px_hsl(var(--primary)/0.5)]"
};

export default async function SkillsPage() {
  const skills = await getSkillsData();
  const flatItems = skills.flatMap((group) =>
    group.items.map((item) => ({
      category: group.category,
      groupLevel: group.level,
      name: item.name,
      level: item.level
    }))
  );

  return (
    <div className="container py-12">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">Skills</h1>
        <p className="mt-2 text-sm text-muted-foreground">A complete list of all skill items across categories.</p>
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {flatItems.map((item) => (
          <Card
            key={`${item.category}-${item.name}`}
            className={`h-28 border ${item.level >= 4 ? highlightedLevelClassMap[item.level] : "border-border bg-card"}`}
          >
            <CardContent className="flex h-full flex-col justify-between p-5">
              <p className="text-base font-semibold leading-tight">{item.name}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{item.category}</span>
                <span>{item.groupLevel}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}

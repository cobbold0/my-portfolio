import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { absoluteUrl } from "@/lib/site";
import { getEducationAndCertifications, getExperienceData, getSiteProfile, getSkillsData } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Resume",
  description: "Experience timeline, skills matrix, education, and certifications.",
  openGraph: {
    images: [absoluteUrl("/api/og?page=resume")]
  },
  twitter: {
    images: [absoluteUrl("/api/og?page=resume")]
  }
};

export default async function ResumePage() {
  const profile = await getSiteProfile();
  const experience = await getExperienceData();
  const skills = await getSkillsData();
  const { education, certifications } = getEducationAndCertifications();

  return (
    <div className="container py-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold tracking-tight">Resume</h1>
        <Button asChild>
          <Link
            href={profile.resumeUrl || "/resume.pdf"}
            target="_blank"
            data-analytics-event="download_cv"
            data-analytics-source="resume_page"
            data-analytics-target={profile.resumeUrl || "/resume.pdf"}
            data-analytics-label="download_pdf"
          >
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Link>
        </Button>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Experience timeline</h2>
        <div className="mt-4 space-y-4">
          {experience.map((item) => (
            <Card key={`${item.company}-${item.role}`}>
              <CardHeader>
                <CardTitle className="text-lg">
                  {item.role} · {item.company}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {item.location} · {item.start} to {item.end}
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {item.achievements.map((ach) => (
                    <li key={ach}>• {ach}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Skills matrix</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {skills.map((group) => (
            <Card key={group.category}>
              <CardHeader>
                <CardTitle>
                  {group.category} - {group.level}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Badge key={item.name} variant="secondary">
                    {item.name}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {education.map((item) => (
              <p key={item.title} className="text-sm text-muted-foreground">
                {item.title} · {item.issuer} ({item.year})
              </p>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Certifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {certifications.map((item) => (
              <p key={item.title} className="text-sm text-muted-foreground">
                {item.title} · {item.issuer} ({item.year})
              </p>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

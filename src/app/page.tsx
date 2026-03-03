import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site";
import { getProjectsData, getSiteProfile, getSkillsData, getTestimonialsData } from "@/lib/content";
import { getAllPostsMeta } from "@/lib/blog";
import { getGitHubProfile, getGitHubUsernameFromUrl } from "@/lib/github";
import { getLinkedInProfileFromUrl } from "@/lib/linkedin";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BlogCard } from "@/components/blog/blog-card";
import { AnimatedSection } from "@/components/layout/animated-section";
import { StaggerGroup } from "@/components/layout/stagger-group";
import { GitHubProfileCard } from "@/components/home/github-profile-card";
import { HeroEditorial } from "@/components/home/hero-editorial";
import { FocusProjectGrid } from "@/components/home/focus-project-grid";
import { StatsSnap } from "@/components/home/stats-snap";
import { TestimonialsDialog } from "@/components/home/testimonials-dialog";
import { DrawBorder } from "@/components/ui/draw-border";

export const metadata: Metadata = {
  title: "Home",
  description: "Backend, frontend, and mobile engineering portfolio with case studies, writing, and developer tools.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    images: [absoluteUrl("/api/og?page=home")]
  },
  twitter: {
    images: [absoluteUrl("/api/og?page=home")]
  }
};

export default async function HomePage() {
  const profile = await getSiteProfile();
  const projects = await getProjectsData();
  const testimonials = await getTestimonialsData();
  const skills = await getSkillsData();
  const posts = (await getAllPostsMeta()).slice(0, 3);
  const githubUrl = profile.socials.find((social) => social.label.toLowerCase() === "github")?.href;
  const githubUsername = getGitHubUsernameFromUrl(githubUrl);
  const githubProfile = await getGitHubProfile(githubUsername);
  const linkedinUrl = profile.socials.find((social) => social.label.toLowerCase() === "linkedin")?.href;
  const linkedinProfile = getLinkedInProfileFromUrl(linkedinUrl);
  const spotlightSkills = skills
    .filter((item) => ["Mobile", "Frontend", "Backend"].includes(item.category))

  return (
    <div>
      <section className="hero-grid overflow-x-clip border-b" data-analytics-section="home_hero">
        <div className="container py-48">
          <AnimatedSection delay={0.03}>
            <HeroEditorial profile={profile} linkedinProfile={linkedinProfile} />
          </AnimatedSection>
        </div>
      </section>

      <section className="container py-48" data-analytics-section="home_highlights">
        <AnimatedSection delay={0.06}>
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold">Frontend Craft</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Clean interfaces, interaction detail, accessibility, and performance-first implementation.
            </p>
          </div>
          <StaggerGroup>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {spotlightSkills.map((group) => (
                <DrawBorder key={group.category}>
                  <Card className={`border-transparent ${group.category === "Mobile" ? "bg-primary/5" : ""}`}>
                    <CardHeader>
                      <CardTitle>{group.category}</CardTitle>
                      <CardDescription>{group.level}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                      {group.items.slice(0, 6).map((item) => (
                        <Badge
                          key={item.name}
                          variant="secondary"
                          className={group.category === "Frontend" ? "border-primary/20 bg-primary/10 text-foreground" : ""}
                        >
                          {item.name}
                        </Badge>
                      ))}
                    </CardContent>
                  </Card>
                </DrawBorder>
              ))}
            </div>
          </StaggerGroup>
        </AnimatedSection>
      </section>

      {profile.linkedinEndorsements?.length ? (
        <section className="container py-32" data-analytics-section="home_endorsements">
          <AnimatedSection delay={0.08}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">LinkedIn Endorsements</h2>
              {linkedinProfile ? (
                <Button asChild variant="link">
                  <a href={linkedinProfile.profileUrl} target="_blank" rel="noreferrer">
                    View profile
                  </a>
                </Button>
              ) : null}
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {profile.linkedinEndorsements.map((item) => (
                <DrawBorder key={item.skill}>
                  <Card className="border-transparent">
                    <CardHeader>
                      <CardTitle className="text-lg">{item.skill}</CardTitle>
                      <CardDescription>{item.endorsementCount} endorsements</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {item.topEndorsers?.length ? (
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Endorsed by</p>
                          <div className="flex flex-wrap gap-2">
                            {item.topEndorsers.slice(0, 4).map((endorser) => (
                              <Badge key={`${item.skill}-${endorser}`} variant="secondary" className="font-medium">
                                {endorser}
                              </Badge>
                            ))}
                            {item.topEndorsers.length > 4 ? <Badge variant="outline">+{item.topEndorsers.length - 4} more</Badge> : null}
                          </div>
                        </div>
                      ) : null}
                      {item.proofImage ? (
                        <a href={item.proofImage} target="_blank" rel="noreferrer">
                          <img
                            src={item.proofImage}
                            alt={`${item.skill} endorsement proof screenshot`}
                            className="h-36 w-full rounded-md border object-cover"
                            loading="lazy"
                          />
                        </a>
                      ) : null}
                      {item.proofUrl ? (
                        <a href={item.proofUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-primary hover:underline">
                          View proof
                        </a>
                      ) : null}
                    </CardContent>
                  </Card>
                </DrawBorder>
              ))}
            </div>
          </AnimatedSection>
        </section>
      ) : null}

      <section className="border-y bg-muted/30" data-analytics-section="home_metrics">
        <div className="container py-48">
          <AnimatedSection delay={0.1}>
            <h2 className="mb-8 text-2xl font-semibold">Performance Signals</h2>
            <StatsSnap metrics={profile.metrics} />
          </AnimatedSection>
        </div>
      </section>

      <section className="container py-48" data-analytics-section="home_featured_projects">
        <AnimatedSection delay={0.1}>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Selected Work</h2>
            <Button asChild variant="link">
              <Link href="/projects">See all</Link>
            </Button>
          </div>
          <FocusProjectGrid projects={projects} />
        </AnimatedSection>
      </section>

      <section className="container py-32" data-analytics-section="home_testimonials">
        <AnimatedSection delay={0.12}>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Testimonials</h2>
            <TestimonialsDialog testimonials={testimonials} />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {testimonials.map((item) => (
              <DrawBorder key={item.name}>
                <Card className="border-transparent">
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground">"{item.quote}"</p>
                    <div className="mt-4 flex items-center gap-3">
                      {item.avatar ? (
                        <img src={item.avatar} alt={`${item.name} photo`} className="h-10 w-10 rounded-full border object-cover" loading="lazy" />
                      ) : (
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border bg-muted text-xs font-semibold">
                          {item.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </span>
                      )}
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DrawBorder>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {githubProfile ? (
        <section className="container py-32" data-analytics-section="home_github">
          <AnimatedSection delay={0.14}>
            <h2 className="text-2xl font-semibold">GitHub</h2>
            <div className="mt-6">
              <GitHubProfileCard profile={githubProfile} />
            </div>
          </AnimatedSection>
        </section>
      ) : null}

      <section className="container py-32" data-analytics-section="home_latest_writing">
        <AnimatedSection delay={0.16}>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Latest Writing</h2>
            <Button asChild variant="link">
              <Link href="/blog">Visit blog</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} sourceSurface="home_latest_writing" />
            ))}
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}

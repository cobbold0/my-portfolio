import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { skills } from "@/content/skills";
import { getProjectsData, getSiteProfile, getTestimonialsData } from "@/lib/content";
import { getAllPostsMeta } from "@/lib/blog";
import { getGitHubProfile, getGitHubUsernameFromUrl } from "@/lib/github";
import { getLinkedInProfileFromUrl } from "@/lib/linkedin";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectCard } from "@/components/projects/project-card";
import { BlogCard } from "@/components/blog/blog-card";
import { AnimatedSection } from "@/components/layout/animated-section";
import { GitHubProfileCard } from "@/components/home/github-profile-card";
import { LinkedInProfileBadge } from "@/components/home/linkedin-profile-badge";
import { TestimonialsDialog } from "@/components/home/testimonials-dialog";

export default async function HomePage() {
  const profile = await getSiteProfile();
  const projects = await getProjectsData();
  const testimonials = await getTestimonialsData();
  const featured = projects.filter((project) => project.featured).slice(0, 3);
  const posts = (await getAllPostsMeta()).slice(0, 3);
  const githubUrl = profile.socials.find((social) => social.label.toLowerCase() === "github")?.href;
  const githubUsername = getGitHubUsernameFromUrl(githubUrl);
  const githubProfile = await getGitHubProfile(githubUsername);
  const linkedinUrl = profile.socials.find((social) => social.label.toLowerCase() === "linkedin")?.href;
  const linkedinProfile = getLinkedInProfileFromUrl(linkedinUrl);

  return (
    <div>
      <section className="hero-grid border-b" data-analytics-section="home_hero">
        <div className="container py-20">
          <AnimatedSection>
            <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
              <div>
                <Badge className="mb-4">Available for senior product engineering roles</Badge>
                <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">{profile.name}</h1>
                <p className="mt-3 text-lg text-primary">{profile.roleLine}</p>
                <p className="mt-4 max-w-2xl text-muted-foreground">{profile.tagline}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild>
                    <Link
                      href="/projects"
                      data-analytics-event="navigation_click"
                      data-analytics-source="home_hero"
                      data-analytics-target="/projects"
                      data-analytics-label="view_projects"
                      data-analytics-nav-context="home_hero:view_projects"
                    >
                      View projects <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link
                      href="/contact"
                      data-analytics-event="navigation_click"
                      data-analytics-source="home_hero"
                      data-analytics-target="/contact"
                      data-analytics-label="contact"
                      data-analytics-nav-context="home_hero:contact"
                    >
                      Contact
                    </Link>
                  </Button>
                  <Button asChild variant="secondary">
                    <Link
                      href={profile.resumeUrl || "/resume.pdf"}
                      data-analytics-event="download_cv"
                      data-analytics-source="home_hero"
                      data-analytics-target={profile.resumeUrl || "/resume.pdf"}
                      data-analytics-label="download_cv"
                    >
                      Download CV <Download className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              {linkedinProfile ? (
                <div className="lg:justify-self-end lg:self-center">
                  <LinkedInProfileBadge vanity={linkedinProfile.vanity} profileUrl={linkedinProfile.profileUrl} />
                </div>
              ) : null}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="container py-16" data-analytics-section="home_highlights">
        <AnimatedSection>
          <h2 className="text-2xl font-semibold">Highlights</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {skills
              .filter((item) => ["Backend", "Frontend", "Mobile"].includes(item.category))
              .map((group) => (
                <Card key={group.category}>
                  <CardHeader>
                    <CardTitle>{group.category}</CardTitle>
                    <CardDescription>Core capabilities</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {group.items.slice(0, 5).map((item) => (
                      <Badge key={item} variant="secondary">
                        {item}
                      </Badge>
                    ))}
                  </CardContent>
                </Card>
              ))}
          </div>
        </AnimatedSection>
      </section>

      {profile.linkedinEndorsements?.length ? (
        <section className="container py-16" data-analytics-section="home_endorsements">
          <AnimatedSection>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">LinkedIn Endorsements</h2>
              {linkedinProfile ? (
                <Button asChild variant="link">
                  <a
                    href={linkedinProfile.profileUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-analytics-event="social_click"
                    data-analytics-source="home_endorsements"
                    data-analytics-label="LinkedIn"
                    data-analytics-target={linkedinProfile.profileUrl}
                  >
                    View profile
                  </a>
                </Button>
              ) : null}
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {profile.linkedinEndorsements.map((item) => (
                <Card key={item.skill}>
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
                          {item.topEndorsers.length > 4 ? (
                            <Badge variant="outline">+{item.topEndorsers.length - 4} more</Badge>
                          ) : null}
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
              ))}
            </div>
          </AnimatedSection>
        </section>
      ) : null}

      <section className="border-y bg-muted/30" data-analytics-section="home_metrics">
        <div className="container grid gap-6 py-16 md:grid-cols-3">
          {profile.metrics.map((metric) => (
            <div key={metric.label}>
              <p className="text-3xl font-semibold">{metric.value}</p>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-16" data-analytics-section="home_featured_projects">
        <AnimatedSection>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Featured Projects</h2>
            <Button asChild variant="link">
              <Link
                href="/projects"
                data-analytics-event="navigation_click"
                data-analytics-source="home_featured_projects"
                data-analytics-target="/projects"
                data-analytics-label="see_all_projects"
                data-analytics-nav-context="home_featured_projects:see_all"
              >
                See all
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} sourceSurface="home_featured_projects" />
            ))}
          </div>
        </AnimatedSection>
      </section>

      <section className="container py-16" data-analytics-section="home_testimonials">
        <AnimatedSection>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Testimonials</h2>
            <TestimonialsDialog testimonials={testimonials} />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {testimonials.map((item) => (
              <Card key={item.name}>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">“{item.quote}”</p>
                  <p className="mt-3 text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {githubProfile ? (
        <section className="container py-16" data-analytics-section="home_github">
          <AnimatedSection>
            <h2 className="text-2xl font-semibold">GitHub</h2>
            <div className="mt-6">
              <GitHubProfileCard profile={githubProfile} />
            </div>
          </AnimatedSection>
        </section>
      ) : null}

      <section className="container py-16" data-analytics-section="home_latest_writing">
        <AnimatedSection>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Latest Writing</h2>
            <Button asChild variant="link">
              <Link
                href="/blog"
                data-analytics-event="navigation_click"
                data-analytics-source="home_latest_writing"
                data-analytics-target="/blog"
                data-analytics-label="visit_blog"
                data-analytics-nav-context="home_latest_writing:visit_blog"
              >
                Visit blog
              </Link>
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

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { skills } from "@/content/skills";
import { getProjectsData, getSiteProfile, getTestimonialsData } from "@/lib/content";
import { getAllPostsMeta } from "@/lib/blog";
import { getGitHubProfile, getGitHubUsernameFromUrl } from "@/lib/github";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectCard } from "@/components/projects/project-card";
import { BlogCard } from "@/components/blog/blog-card";
import { AnimatedSection } from "@/components/layout/animated-section";
import { GitHubProfileCard } from "@/components/home/github-profile-card";
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

  return (
    <div>
      <section className="hero-grid border-b">
        <div className="container py-20">
          <AnimatedSection>
            <Badge className="mb-4">Available for senior product engineering roles</Badge>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">{profile.name}</h1>
            <p className="mt-3 text-lg text-primary">{profile.roleLine}</p>
            <p className="mt-4 max-w-2xl text-muted-foreground">{profile.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/projects">
                  View projects <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">Contact</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href={profile.resumeUrl || "/resume.pdf"}>
                  Download CV <Download className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="container py-16">
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

      {githubProfile ? (
        <section className="container py-6">
          <AnimatedSection>
            <h2 className="text-2xl font-semibold">GitHub</h2>
            <div className="mt-6">
              <GitHubProfileCard profile={githubProfile} />
            </div>
          </AnimatedSection>
        </section>
      ) : null}

      <section className="border-y bg-muted/30">
        <div className="container grid gap-6 py-8 md:grid-cols-3">
          {profile.metrics.map((metric) => (
            <div key={metric.label}>
              <p className="text-3xl font-semibold">{metric.value}</p>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-16">
        <AnimatedSection>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Featured Projects</h2>
            <Button asChild variant="link">
              <Link href="/projects">See all</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </AnimatedSection>
      </section>

      <section className="container py-10">
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

      <section className="container py-16">
        <AnimatedSection>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Latest Writing</h2>
            <Button asChild variant="link">
              <Link href="/blog">Visit blog</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}

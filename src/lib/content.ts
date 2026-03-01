import { education, certifications } from "@/content/experience";
import { profile as localProfile } from "@/content/profile";
import { projects as localProjects } from "@/content/projects";
import { skills as localSkills } from "@/content/skills";
import { getContentSource, isSanityEnabled } from "@/lib/content-source";
import type { SiteSettingsData, TestimonialData } from "@/lib/sanity/types";
import {
  getExperienceFromSanity,
  getLocalDefaults,
  getProjectBySlugFromSanity,
  getProjectsFromSanity,
  getSkillsFromSanity,
  getSiteSettingsFromSanity,
  getTestimonialsFromSanity
} from "@/lib/sanity/data";

export async function getSiteProfile(): Promise<SiteSettingsData> {
  const source = getContentSource();
  if (source === "sanity" && isSanityEnabled()) {
    const settings = await getSiteSettingsFromSanity();
    if (settings) return settings;
  }

  const local = getLocalDefaults();
  return {
    name: local.profile.name,
    roleLine: local.profile.roleLine,
    tagline: local.profile.tagline,
    shortBio: local.profile.shortBio,
    location: local.profile.location,
    timezone: local.profile.timezone,
    email: local.profile.email,
    availableToMentor: local.profile.availableToMentor,
    socials: local.socials,
    metrics: local.metrics,
    linkedinEndorsements: local.linkedinEndorsements,
    resumeUrl: "/resume.pdf",
    seo: undefined
  };
}

export async function getProjectsData() {
  const source = getContentSource();
  if (source === "sanity" && isSanityEnabled()) {
    const projects = await getProjectsFromSanity();
    if (projects.length > 0) return projects;
  }
  return localProjects;
}

export async function getProjectDataBySlug(slug: string) {
  const source = getContentSource();
  if (source === "sanity" && isSanityEnabled()) {
    const project = await getProjectBySlugFromSanity(slug);
    if (project) return project;
  }

  return localProjects.find((item) => item.slug === slug) || null;
}

export async function getExperienceData() {
  const source = getContentSource();
  if (source === "sanity" && isSanityEnabled()) {
    const items = await getExperienceFromSanity();
    if (items.length > 0) return items;
  }
  return getLocalDefaults().experience;
}

export async function getTestimonialsData(): Promise<TestimonialData[]> {
  const source = getContentSource();
  if (source === "sanity" && isSanityEnabled()) {
    const items = await getTestimonialsFromSanity();
    if (items.length > 0) return items;
  }
  return getLocalDefaults().testimonials;
}

export async function getSkillsData() {
  const source = getContentSource();
  if (source === "sanity" && isSanityEnabled()) {
    const items = await getSkillsFromSanity();
    if (items.length > 0) return items;
  }
  return localSkills;
}

export function getEducationAndCertifications() {
  return {
    education,
    certifications
  };
}

export function getStaticProfileFallback() {
  return localProfile;
}

import { groq } from "next-sanity";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  name,
  roleLine,
  tagline,
  bio,
  location,
  timezone,
  email,
  phone,
  socials[]{label, href},
  primaryCtas,
  metrics[]{label, value},
  defaultSeo{title, description, ogImage},
  "resumeFileUrl": resumeFile.asset->url,
  resumeUrl
}`;

export const projectsQuery = groq`*[_type == "project"] | order(featured desc, publishedAt desc){
  title,
  "slug": slug.current,
  summary,
  categories,
  featured,
  publishedAt,
  techStack,
  responsibilities,
  problem,
  solution,
  impactMetrics,
  links,
  coverImage,
  galleryImages,
  architecture
}`;

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  summary,
  categories,
  featured,
  publishedAt,
  techStack,
  responsibilities,
  problem,
  solution,
  impactMetrics,
  links,
  coverImage,
  galleryImages,
  architecture
}`;

export const postsQuery = groq`*[_type == "post"] | order(publishedAt desc){
  title,
  "slug": slug.current,
  publishedAt,
  summary,
  tags,
  coverImage,
  body,
  readingTime
}`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  publishedAt,
  summary,
  tags,
  coverImage,
  body,
  readingTime
}`;

export const experienceQuery = groq`*[_type == "experience"] | order(startDate desc){
  company,
  role,
  location,
  startDate,
  endDate,
  highlights,
  techStack
}`;

export const testimonialsQuery = groq`*[_type == "testimonial"] | order(_createdAt desc){
  name,
  role,
  company,
  quote,
  avatar
}`;

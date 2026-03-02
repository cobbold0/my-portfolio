import { groq } from "next-sanity";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  name,
  roleLine,
  tagline,
  bio,
  profileImage,
  location,
  timezone,
  email,
  phone,
  availableToMentor,
  socials[]{label, href},
  primaryCtas,
  metrics[]{label, value},
  linkedinEndorsements[]{
    skill,
    endorsementCount,
    topEndorsers,
    "proofImage": proofImage.asset->url,
    proofUrl
  },
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
  readingTime,
  shareOnLinkedIn
}`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  publishedAt,
  summary,
  tags,
  coverImage,
  body,
  readingTime,
  shareOnLinkedIn
}`;

export const appPoliciesQuery = groq`*[_type == "appPolicy" && coalesce(isPublished, true) == true] | order(appName asc, policyType asc){
  title,
  appName,
  "appSlug": appSlug.current,
  policyType,
  summary,
  lastUpdated
}`;

export const appPolicyByAppAndTypeQuery = groq`*[_type == "appPolicy" && coalesce(isPublished, true) == true && appSlug.current == $appSlug && policyType == $policyType][0]{
  title,
  appName,
  "appSlug": appSlug.current,
  policyType,
  summary,
  lastUpdated,
  body
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

export const skillsQuery = groq`*[_type == "skill"] | order(category asc, order asc, level desc, name asc){
  name,
  category,
  level,
  categoryLevel,
  order
}`;

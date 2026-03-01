import { defineArrayMember, defineField, defineType } from "sanity";

function normalizeAssetId(value: string) {
  return value.startsWith("drafts.") ? value.slice("drafts.".length) : value;
}

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "roleLine", type: "string", initialValue: "Backend • Frontend • Mobile" }),
    defineField({ name: "tagline", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "bio", type: "text", rows: 4, validation: (Rule) => Rule.required() }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
      description: "Displayed on the home page hero."
    }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "timezone", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "phone", type: "string" }),
    defineField({
      name: "socials",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "href", type: "url", validation: (Rule) => Rule.required() })
          ]
        })
      ]
    }),
    defineField({
      name: "primaryCtas",
      type: "object",
      fields: [
        defineField({ name: "projectsUrl", type: "string" }),
        defineField({ name: "contactUrl", type: "string" }),
        defineField({ name: "resumeUrl", type: "string" })
      ]
    }),
    defineField({
      name: "metrics",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "value", type: "string", validation: (Rule) => Rule.required() })
          ]
        })
      ]
    }),
    defineField({
      name: "linkedinEndorsements",
      title: "LinkedIn Endorsements",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "skill", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "endorsementCount", type: "number", validation: (Rule) => Rule.required().min(0) }),
            defineField({
              name: "topEndorsers",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
              validation: (Rule) => Rule.required().min(1),
              description: "Add at least one endorser name."
            }),
            defineField({
              name: "proofImage",
              type: "image",
              options: { hotspot: true },
              description: "Optional screenshot or proof image."
            }),
            defineField({ name: "proofUrl", type: "url", description: "Optional link to external proof." })
          ]
        })
      ]
    }),
    defineField({
      name: "defaultSeo",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "description", type: "text", rows: 3 }),
        defineField({ name: "ogImage", type: "image", options: { hotspot: true } })
      ]
    }),
    defineField({
      name: "resumeFile",
      title: "Resume PDF",
      type: "file",
      options: {
        accept: "application/pdf"
      },
      description: "Upload your latest resume PDF. Use filename resume (or resume.pdf).",
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          const fileValue = value as { asset?: { _ref?: string } } | undefined;
          const assetRef = fileValue?.asset?._ref;
          if (!assetRef) return true;

          const client = context.getClient({ apiVersion: "2025-01-01" });
          const originalFilename = await client.fetch<string | null>(`*[_id == $id][0].originalFilename`, {
            id: normalizeAssetId(assetRef)
          });

          const normalized = originalFilename?.toLowerCase();
          return normalized === "resume" || normalized === "resume.pdf"
            ? true
            : "Resume file must be named resume or resume.pdf.";
        })
    }),
    defineField({ name: "resumeUrl", type: "string", initialValue: "/resume.pdf" })
  ]
});

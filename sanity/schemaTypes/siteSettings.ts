import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "roleLine", type: "string", initialValue: "Backend • Frontend • Mobile" }),
    defineField({ name: "tagline", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "bio", type: "text", rows: 4, validation: (Rule) => Rule.required() }),
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
      name: "defaultSeo",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "description", type: "text", rows: 3 }),
        defineField({ name: "ogImage", type: "image", options: { hotspot: true } })
      ]
    }),
    defineField({ name: "resumeUrl", type: "string", initialValue: "/resume.pdf" })
  ]
});

import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    defineField({ name: "summary", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
    defineField({
      name: "categories",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
          options: { list: ["backend", "frontend", "mobile"] }
        })
      ],
      validation: (Rule) => Rule.required().min(1)
    }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "publishedAt", type: "datetime" }),
    defineField({ name: "techStack", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "responsibilities", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "problem", type: "text", rows: 5, validation: (Rule) => Rule.required() }),
    defineField({ name: "solution", type: "text", rows: 5, validation: (Rule) => Rule.required() }),
    defineField({ name: "impactMetrics", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({
      name: "links",
      type: "object",
      fields: [
        defineField({ name: "github", type: "url" }),
        defineField({ name: "live", type: "url" }),
        defineField({ name: "playStore", type: "url" })
      ]
    }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "galleryImages", type: "array", of: [defineArrayMember({ type: "image", options: { hotspot: true } })] }),
    defineField({
      name: "architecture",
      type: "object",
      fields: [defineField({ name: "title", type: "string" }), defineField({ name: "mermaid", type: "text", rows: 6 })]
    })
  ]
});

import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    defineField({ name: "publishedAt", type: "datetime", validation: (Rule) => Rule.required() }),
    defineField({ name: "summary", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: "tags", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true } }),
    defineField({
      name: "body",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
          type: "object",
          name: "codeBlock",
          fields: [
            defineField({ name: "language", type: "string", initialValue: "ts" }),
            defineField({ name: "code", type: "text", rows: 10 })
          ]
        })
      ],
      validation: (Rule) => Rule.required()
    }),
    defineField({ name: "readingTime", type: "string", description: "Optional manual override, e.g. '4 min read'" })
  ]
});

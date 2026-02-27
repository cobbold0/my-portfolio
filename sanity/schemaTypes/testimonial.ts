import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "role", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "company", type: "string" }),
    defineField({ name: "quote", type: "text", rows: 4, validation: (Rule) => Rule.required() }),
    defineField({ name: "avatar", type: "image", options: { hotspot: true } })
  ]
});

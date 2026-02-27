import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "company", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "role", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "startDate", type: "date", validation: (Rule) => Rule.required() }),
    defineField({ name: "endDate", type: "date" }),
    defineField({ name: "highlights", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "techStack", type: "array", of: [defineArrayMember({ type: "string" })] })
  ]
});

import { defineField, defineType } from "sanity";

export default defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: ["frontend", "backend", "mobile", "tools"]
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "level",
      type: "number",
      description: "Strength level from 1 (basic) to 5 (expert).",
      validation: (Rule) => Rule.required().min(1).max(5)
    }),
    defineField({
      name: "categoryLevel",
      title: "Category Level",
      type: "string",
      description: "Shared level label for the category (used by grouped skills).",
      options: {
        list: ["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"]
      },
      initialValue: "INTERMEDIATE"
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Lower numbers appear first inside the category."
    })
  ],
  preview: {
    select: {
      title: "name",
      category: "category",
      level: "level",
      categoryLevel: "categoryLevel"
    },
    prepare(selection) {
      const category = typeof selection.category === "string" ? selection.category : "uncategorized";
      const level = typeof selection.level === "number" ? selection.level : "-";
      const categoryLevel = typeof selection.categoryLevel === "string" ? selection.categoryLevel : "INTERMEDIATE";
      return {
        title: selection.title,
        subtitle: `${category.toUpperCase()} - Level ${level}/5 - ${categoryLevel}`
      };
    }
  }
});

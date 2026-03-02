import { defineArrayMember, defineField, defineType } from "sanity";

const RESERVED_APP_SLUGS = new Set([
  "about",
  "api",
  "blog",
  "contact",
  "projects",
  "resume",
  "skills",
  "studio",
  "tools"
]);

export default defineType({
  name: "appPolicy",
  title: "App Policy",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "appName", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "appSlug",
      type: "slug",
      options: { source: "appName", maxLength: 96 },
      validation: (Rule) =>
        Rule.required().custom((value) => {
          const slug = value?.current?.toLowerCase();
          if (!slug) return "App slug is required.";
          if (RESERVED_APP_SLUGS.has(slug)) {
            return `The app slug "${slug}" is reserved by an existing site route.`;
          }
          return true;
        })
    }),
    defineField({
      name: "policyType",
      type: "string",
      initialValue: "privacy",
      options: {
        list: [{ title: "Privacy", value: "privacy" }],
        layout: "radio"
      },
      validation: (Rule) =>
        Rule.required().custom(async (value, context) => {
          const doc = context.document as { _id?: string; appSlug?: { current?: string } } | undefined;
          const appSlug = doc?.appSlug?.current;
          const documentId = doc?._id;
          if (!appSlug || !value || !documentId) return true;

          const baseId = documentId.replace(/^drafts\./, "");
          const params = {
            appSlug,
            policyType: value,
            draftId: `drafts.${baseId}`,
            publishedId: baseId
          };
          const query = `count(*[_type == "appPolicy" && appSlug.current == $appSlug && policyType == $policyType && !(_id in [$draftId, $publishedId])])`;
          const count = await context
            .getClient({ apiVersion: "2025-01-01" })
            .fetch<number>(query, params);

          if (count > 0) return "An app policy with this app slug and policy type already exists.";
          return true;
        })
    }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "lastUpdated", type: "date", initialValue: () => new Date().toISOString().slice(0, 10) }),
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
    defineField({
      name: "isPublished",
      type: "boolean",
      initialValue: true,
      description: "If disabled, this policy is hidden from the public site."
    })
  ],
  preview: {
    select: {
      title: "title",
      appName: "appName",
      policyType: "policyType",
      isPublished: "isPublished"
    },
    prepare({ title, appName, policyType, isPublished }) {
      const status = isPublished === false ? "Draft" : "Published";
      const subtitle = [appName, policyType, status].filter(Boolean).join(" • ");
      return { title, subtitle };
    }
  }
});

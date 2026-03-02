import { defineConfig } from "sanity";
import { deskTool, type StructureBuilder } from "sanity/desk";
import { schemaTypes } from "./schemaTypes";

const singletonTypes = new Set(["siteSettings"]);

const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.listItem().title("Projects").child(S.documentTypeList("project").title("Projects")),
      S.listItem().title("Blog Posts").child(S.documentTypeList("post").title("Blog Posts")),
      S.listItem().title("App Policies").child(S.documentTypeList("appPolicy").title("App Policies")),
      S.listItem().title("Experience").child(S.documentTypeList("experience").title("Experience")),
      S.listItem().title("Testimonials").child(S.documentTypeList("testimonial").title("Testimonials")),
      S.listItem().title("Skills").child(S.documentTypeList("skill").title("Skills"))
    ]);

export function createStudioConfig(input: { projectId: string; dataset: string; apiVersion: string }) {
  return defineConfig({
    name: "default",
    title: "Portfolio Studio",
    projectId: input.projectId,
    dataset: input.dataset,
    basePath: "/studio",
    schema: {
      types: schemaTypes,
      templates: (templates) => templates.filter((template) => !singletonTypes.has(template.schemaType))
    },
    plugins: [
      deskTool({
        structure
      })
    ],
    document: {
      actions: (prev, context) =>
        singletonTypes.has(context.schemaType)
          ? prev.filter(({ action }) => action !== "duplicate" && action !== "unpublish")
          : prev
    }
  });
}

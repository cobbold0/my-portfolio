import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "@/lib/sanity/client";

const builder = imageUrlBuilder({
  projectId,
  dataset
});

export function urlForImage(source: unknown) {
  if (!source || !projectId || !dataset) return null;
  return builder.image(source).auto("format").fit("max").url();
}

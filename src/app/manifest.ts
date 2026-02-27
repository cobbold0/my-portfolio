import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Alex Rivera Portfolio",
    short_name: "Portfolio",
    description: "Backend, Frontend, and Mobile engineering portfolio.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b1220",
    theme_color: "#1e355f",
    icons: [
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml"
      },
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml"
      },
      {
        src: "/icons/maskable-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable"
      }
    ]
  };
}

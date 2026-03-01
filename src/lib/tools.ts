export type ToolItem = {
  slug: "json-formatter" | "uuid-generator" | "js-sandbox" | "jwt-decoder";
  title: string;
  summary: string;
  tags: string[];
};

export const tools: ToolItem[] = [
  {
    slug: "json-formatter",
    title: "JSON Formatter",
    summary: "Format, minify, validate, and copy JSON instantly.",
    tags: ["formatter", "validator", "json"]
  },
  {
    slug: "uuid-generator",
    title: "UUID Generator",
    summary: "Generate UUID v4 values in bulk and copy quickly.",
    tags: ["generator", "uuid", "productivity"]
  },
  {
    slug: "js-sandbox",
    title: "JavaScript Sandbox",
    summary: "Run JavaScript in an isolated worker with console output.",
    tags: ["sandbox", "javascript", "playground"]
  },
  {
    slug: "jwt-decoder",
    title: "JWT Decoder",
    summary: "Decode JWT header and payload locally in your browser.",
    tags: ["jwt", "auth", "decoder"]
  }
];


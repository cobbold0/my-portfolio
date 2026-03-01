"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";

const sampleJson = `{"name":"Portfolio","stack":["Next.js","TypeScript","Sanity"],"openSource":true}`;

export function JsonFormatterTool() {
  const [input, setInput] = useState(sampleJson);
  const [error, setError] = useState<string>("");

  const parsed = useMemo(() => {
    try {
      if (!input.trim()) return null;
      return JSON.parse(input);
    } catch {
      return null;
    }
  }, [input]);

  const formatJson = () => {
    try {
      const value = JSON.parse(input);
      setInput(JSON.stringify(value, null, 2));
      setError("");
      trackEvent({ name: "tool_action", properties: { tool: "json-formatter", action: "format" } });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      trackEvent({ name: "tool_action", properties: { tool: "json-formatter", action: "format_error" } });
    }
  };

  const minifyJson = () => {
    try {
      const value = JSON.parse(input);
      setInput(JSON.stringify(value));
      setError("");
      trackEvent({ name: "tool_action", properties: { tool: "json-formatter", action: "minify" } });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      trackEvent({ name: "tool_action", properties: { tool: "json-formatter", action: "minify_error" } });
    }
  };

  const validateJson = () => {
    try {
      JSON.parse(input);
      setError("");
      trackEvent({ name: "tool_action", properties: { tool: "json-formatter", action: "validate_ok" } });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      trackEvent({ name: "tool_action", properties: { tool: "json-formatter", action: "validate_error" } });
    }
  };

  const copyOutput = async () => {
    await navigator.clipboard.writeText(input);
    trackEvent({ name: "tool_action", properties: { tool: "json-formatter", action: "copy" } });
  };

  return (
    <div className="space-y-4">
      <Textarea
        value={input}
        onChange={(event) => setInput(event.target.value)}
        className="min-h-[320px] rounded-none font-mono text-xs"
        spellCheck={false}
      />
      <div className="flex flex-wrap gap-2">
        <Button onClick={formatJson} className="rounded-none">
          Format
        </Button>
        <Button onClick={minifyJson} variant="secondary" className="rounded-none">
          Minify
        </Button>
        <Button onClick={validateJson} variant="outline" className="rounded-none">
          Validate
        </Button>
        <Button onClick={copyOutput} variant="outline" className="rounded-none">
          Copy
        </Button>
      </div>
      <p className={`text-sm ${error ? "text-red-500" : "text-muted-foreground"}`}>{error ? `Error: ${error}` : parsed ? "Valid JSON" : "Enter JSON to begin."}</p>
    </div>
  );
}

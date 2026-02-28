"use client";

import { useEffect, useRef, useState } from "react";

export function MermaidDiagram({ chart }: { chart: string }) {
  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2)}`);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaidModule = await import("mermaid");
        const mermaid = mermaidModule.default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "default"
        });

        const { svg: rendered } = await mermaid.render(idRef.current, chart);
        if (!cancelled) {
          setSvg(rendered);
          setError("");
        }
      } catch {
        if (!cancelled) {
          setError("Failed to render architecture diagram.");
          setSvg("");
        }
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [chart]);

  return (
    <div className="overflow-x-auto rounded-lg border bg-muted/40 p-4">
      {error ? (
        <p className="text-sm text-muted-foreground">{error}</p>
      ) : (
        <div className="min-w-[640px]" aria-label="Architecture diagram" dangerouslySetInnerHTML={{ __html: svg }} />
      )}
    </div>
  );
}

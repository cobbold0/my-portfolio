export function MermaidDiagram({ chart }: { chart: string }) {
  const lines = chart
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(1);

  return (
    <div className="overflow-x-auto rounded-lg border bg-muted/40 p-4">
      <svg viewBox="0 0 760 360" role="img" aria-label="Architecture diagram" className="h-auto min-w-[640px]">
        <rect x="10" y="10" width="740" height="340" rx="14" fill="hsl(var(--background))" stroke="hsl(var(--border))" />
        {lines.map((line, index) => (
          <text key={line + index} x="36" y={54 + index * 24} fontSize="13" fill="hsl(var(--foreground))" fontFamily="monospace">
            {line}
          </text>
        ))}
      </svg>
    </div>
  );
}

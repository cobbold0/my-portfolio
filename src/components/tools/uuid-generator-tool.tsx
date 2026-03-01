"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";

function fallbackUuidV4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const random = Math.random() * 16 | 0;
    const value = char === "x" ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}

function createUuid() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return fallbackUuidV4();
}

export function UuidGeneratorTool() {
  const [count, setCount] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [noDashes, setNoDashes] = useState(false);
  const [items, setItems] = useState<string[]>([]);

  const output = useMemo(() => items.join("\n"), [items]);

  const generate = () => {
    const safeCount = Number.isFinite(count) ? Math.max(1, Math.min(100, Math.trunc(count))) : 1;
    const next = Array.from({ length: safeCount }, () => {
      let value = createUuid();
      if (noDashes) value = value.replace(/-/g, "");
      if (uppercase) value = value.toUpperCase();
      return value;
    });
    setItems(next);
    trackEvent({
      name: "tool_action",
      properties: { tool: "uuid-generator", action: "generate", count: safeCount, uppercase, no_dashes: noDashes }
    });
  };

  const copyAll = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    trackEvent({ name: "tool_action", properties: { tool: "uuid-generator", action: "copy_all", count: items.length } });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="uuid-count">Count</Label>
          <Input
            id="uuid-count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(event) => setCount(Number(event.target.value))}
            className="rounded-none"
          />
        </div>
        <label className="mt-8 flex items-center gap-2 text-sm md:mt-0 md:self-end">
          <input type="checkbox" checked={uppercase} onChange={(event) => setUppercase(event.target.checked)} />
          Uppercase
        </label>
        <label className="mt-8 flex items-center gap-2 text-sm md:mt-0 md:self-end">
          <input type="checkbox" checked={noDashes} onChange={(event) => setNoDashes(event.target.checked)} />
          Remove dashes
        </label>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button onClick={generate} className="rounded-none">
          Generate
        </Button>
        <Button onClick={copyAll} variant="outline" className="rounded-none">
          Copy all
        </Button>
      </div>
      <Textarea value={output} readOnly className="min-h-[280px] rounded-none font-mono text-xs" />
    </div>
  );
}

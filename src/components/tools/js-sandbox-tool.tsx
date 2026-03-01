"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";

const sampleCode = `const numbers = [3, 7, 11];
const total = numbers.reduce((sum, n) => sum + n, 0);
console.log("Numbers:", numbers);
console.log("Total:", total);
total;`;

type SandboxResult = {
  logs: string[];
  value: string;
  error: string;
};

function createWorkerSource() {
  return `
    self.onmessage = async (event) => {
      const code = event.data?.code || "";
      const logs = [];
      const format = (value) => {
        try { return typeof value === "string" ? value : JSON.stringify(value); }
        catch { return String(value); }
      };
      const fakeConsole = {
        log: (...args) => logs.push(args.map(format).join(" ")),
        error: (...args) => logs.push("ERROR: " + args.map(format).join(" ")),
        warn: (...args) => logs.push("WARN: " + args.map(format).join(" "))
      };
      try {
        const fn = new Function("console", \`"use strict";\\n\${code}\`);
        const value = await fn(fakeConsole);
        self.postMessage({ ok: true, logs, value: format(value ?? "undefined") });
      } catch (error) {
        self.postMessage({ ok: false, logs, error: error?.message || "Execution error" });
      }
    };
  `;
}

export function JsSandboxTool() {
  const [code, setCode] = useState(sampleCode);
  const [result, setResult] = useState<SandboxResult>({ logs: [], value: "", error: "" });
  const [running, setRunning] = useState(false);

  const workerBlobUrl = useMemo(() => URL.createObjectURL(new Blob([createWorkerSource()], { type: "text/javascript" })), []);

  const runCode = () => {
    trackEvent({ name: "tool_action", properties: { tool: "js-sandbox", action: "run" } });
    setRunning(true);
    const worker = new Worker(workerBlobUrl);
    const timeout = window.setTimeout(() => {
      worker.terminate();
      setRunning(false);
      setResult({ logs: [], value: "", error: "Execution timed out." });
      trackEvent({ name: "tool_action", properties: { tool: "js-sandbox", action: "timeout" } });
    }, 1500);

    worker.onmessage = (event) => {
      clearTimeout(timeout);
      worker.terminate();
      setRunning(false);
      if (event.data?.ok) {
        setResult({ logs: event.data.logs || [], value: event.data.value || "undefined", error: "" });
        trackEvent({ name: "tool_action", properties: { tool: "js-sandbox", action: "run_ok" } });
      } else {
        setResult({ logs: event.data.logs || [], value: "", error: event.data?.error || "Execution error" });
        trackEvent({ name: "tool_action", properties: { tool: "js-sandbox", action: "run_error" } });
      }
    };

    worker.postMessage({ code });
  };

  const clearAll = () => {
    setCode("");
    setResult({ logs: [], value: "", error: "" });
    trackEvent({ name: "tool_action", properties: { tool: "js-sandbox", action: "clear" } });
  };

  return (
    <div className="space-y-4">
      <Textarea value={code} onChange={(event) => setCode(event.target.value)} className="min-h-[280px] rounded-none font-mono text-xs" spellCheck={false} />
      <div className="flex flex-wrap gap-2">
        <Button onClick={runCode} className="rounded-none" disabled={running}>
          {running ? "Running..." : "Run"}
        </Button>
        <Button onClick={clearAll} variant="outline" className="rounded-none">
          Clear
        </Button>
      </div>
      <div className="rounded-none border bg-card p-4">
        <p className="text-sm font-medium">Console</p>
        <pre className="mt-2 min-h-[90px] whitespace-pre-wrap text-xs text-muted-foreground">{result.logs.join("\n") || "No logs yet."}</pre>
        <p className="mt-3 text-sm font-medium">Result</p>
        <pre className={`mt-2 min-h-[30px] whitespace-pre-wrap text-xs ${result.error ? "text-red-500" : "text-muted-foreground"}`}>
          {result.error || result.value || "No output yet."}
        </pre>
      </div>
    </div>
  );
}

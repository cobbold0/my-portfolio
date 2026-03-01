"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function prettyTime(epochSeconds?: number) {
  if (!epochSeconds || !Number.isFinite(epochSeconds)) return "";
  return new Date(epochSeconds * 1000).toLocaleString();
}

export function JwtDecoderTool() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [decoded, setDecoded] = useState<{ header: Record<string, unknown>; payload: Record<string, unknown> } | null>(null);

  const decodeToken = () => {
    if (!token.trim()) {
      setDecoded(null);
      setError("Please paste a JWT token.");
      trackEvent({ name: "tool_action", properties: { tool: "jwt-decoder", action: "decode_empty" } });
      return;
    }
    try {
      const [headerPart, payloadPart] = token.trim().split(".");
      if (!headerPart || !payloadPart) throw new Error("JWT must contain at least header.payload");
      const header = JSON.parse(decodeBase64Url(headerPart));
      const payload = JSON.parse(decodeBase64Url(payloadPart));
      setDecoded({ header, payload });
      setError("");
      trackEvent({ name: "tool_action", properties: { tool: "jwt-decoder", action: "decode_ok" } });
    } catch (e) {
      setDecoded(null);
      setError(e instanceof Error ? e.message : "Failed to decode token");
      trackEvent({ name: "tool_action", properties: { tool: "jwt-decoder", action: "decode_error" } });
    }
  };

  const clear = () => {
    setToken("");
    setDecoded(null);
    setError("");
    trackEvent({ name: "tool_action", properties: { tool: "jwt-decoder", action: "clear" } });
  };

  return (
    <div className="space-y-4">
      <Textarea
        value={token}
        onChange={(event) => {
          setError("");
          setToken(event.target.value);
        }}
        className="min-h-[140px] rounded-none font-mono text-xs"
        placeholder="Paste JWT token here"
      />
      <div className="flex gap-2">
        <Button onClick={decodeToken} className="rounded-none">
          Decode
        </Button>
        <Button onClick={clear} variant="outline" className="rounded-none">
          Clear
        </Button>
      </div>
      {error ? <p className="text-sm text-red-500">Error: {error}</p> : null}
      {decoded ? (
        <div className="grid gap-4 md:grid-cols-2">
          <Textarea value={JSON.stringify(decoded.header, null, 2)} readOnly className="min-h-[220px] rounded-none font-mono text-xs" />
          <Textarea value={JSON.stringify(decoded.payload, null, 2)} readOnly className="min-h-[220px] rounded-none font-mono text-xs" />
          <p className="text-xs text-muted-foreground">exp: {prettyTime(decoded.payload.exp as number)}</p>
          <p className="text-xs text-muted-foreground">iat: {prettyTime(decoded.payload.iat as number)}</p>
        </div>
      ) : null}
    </div>
  );
}

"use client";

import { FormEvent, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [status, setStatus] = useState<string>("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setStatus("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const json = (await response.json()) as { message: string };

    if (!response.ok) {
      setStatus(json.message);
      setPending(false);
      return;
    }

    trackEvent({ name: "submit_contact" });
    event.currentTarget.reset();
    setStatus("Message sent successfully.");
    setPending(false);
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" name="subject" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" required />
      </div>

      <input type="text" name="honey" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <Button type="submit" disabled={pending}>
        {pending ? "Sending..." : "Send message"}
      </Button>

      {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
    </form>
  );
}

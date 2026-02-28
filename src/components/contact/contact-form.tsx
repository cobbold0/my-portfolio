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
    const form = event.currentTarget;
    setPending(true);
    setStatus("");

    try {
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      let message = "Invalid form submission.";
      try {
        const json = (await response.json()) as { message?: string };
        message = json.message || message;
      } catch {
        // Keep fallback message if response body is not valid JSON.
      }

      if (!response.ok) {
        setStatus(message);
        return;
      }

      trackEvent({ name: "submit_contact" });
      form.reset();
      setStatus("Message sent successfully.");
    } catch {
      setStatus("Unable to send message right now. Please try again.");
    } finally {
      setPending(false);
    }
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

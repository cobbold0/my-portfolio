import type { Metadata } from "next";
import Link from "next/link";
import { profile, socials } from "@/content/profile";
import { absoluteUrl } from "@/lib/site";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch for product engineering collaboration.",
  openGraph: {
    images: [absoluteUrl("/api/og?page=contact")]
  },
  twitter: {
    images: [absoluteUrl("/api/og?page=contact")]
  }
};

export default function ContactPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
      <p className="mt-2 text-muted-foreground">Send a message and I’ll get back within 1-2 business days.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Send a message</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Email: {profile.email}</p>
            <p>Location: {profile.location}</p>
            <p>Timezone: {profile.timezone}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              {socials.map((social) => (
                <Link key={social.label} href={social.href} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                  {social.label}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

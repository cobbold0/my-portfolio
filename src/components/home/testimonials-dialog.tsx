"use client";

import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type TestimonialDialogItem = {
  quote: string;
  name: string;
  role: string;
  avatar?: string;
};

export function TestimonialsDialog({ testimonials }: { testimonials: TestimonialDialogItem[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <MessageSquare className="mr-2 h-4 w-4" /> All testimonials
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Testimonials</DialogTitle>
          <DialogDescription>Feedback from cross-functional partners and leaders.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {testimonials.map((item) => (
            <article key={item.name} className="rounded-lg border p-3">
              <p className="text-sm text-muted-foreground">"{item.quote}"</p>
              <div className="mt-3 flex items-center gap-3">
                {item.avatar ? (
                  <img src={item.avatar} alt={`${item.name} photo`} className="h-9 w-9 rounded-full border object-cover" loading="lazy" />
                ) : (
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border bg-muted text-xs font-semibold">
                    {item.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>
                )}
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

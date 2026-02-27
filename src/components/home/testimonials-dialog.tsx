"use client";

import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function TestimonialsDialog({ testimonials }: { testimonials: { quote: string; name: string; role: string }[] }) {
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
              <p className="text-sm text-muted-foreground">“{item.quote}”</p>
              <p className="mt-2 text-sm font-medium">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.role}</p>
            </article>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

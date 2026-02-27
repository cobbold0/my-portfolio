"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export const Sheet = Dialog;
export const SheetTrigger = DialogTrigger;

export const SheetContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof DialogContent>>(
  ({ className, ...props }, ref) => <DialogContent ref={ref} className={`left-auto right-0 top-0 h-full max-w-sm translate-x-0 translate-y-0 rounded-none ${className || ""}`} {...props} />
);
SheetContent.displayName = "SheetContent";

import type { Transition, Variants } from "framer-motion";

export const easingOut: number[] = [0.16, 1, 0.3, 1];

export const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" }
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06
    }
  }
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" }
};

export function sectionTransition(delay = 0): Transition {
  return {
    duration: 0.7,
    delay,
    ease: easingOut
  };
}

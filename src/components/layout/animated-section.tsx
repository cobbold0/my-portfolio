"use client";

import { motion, useReducedMotion } from "framer-motion";
import { sectionTransition, sectionVariants } from "@/lib/motion";

export function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={sectionTransition(delay)}
    >
      {children}
    </motion.div>
  );
}

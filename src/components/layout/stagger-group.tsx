"use client";

import { motion, useReducedMotion } from "framer-motion";
import { sectionTransition, staggerContainerVariants, staggerItemVariants } from "@/lib/motion";

export function StaggerGroup({ children, delay = 0 }: { children: React.ReactNode[] | React.ReactNode; delay?: number }) {
  const reduceMotion = useReducedMotion();
  const items = Array.isArray(children) ? children : [children];

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={sectionTransition(delay)}
    >
      {items.map((child, index) => (
        <motion.div key={index} variants={staggerItemVariants} transition={sectionTransition(delay + index * 0.04)}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

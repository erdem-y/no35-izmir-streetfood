import { motion, useReducedMotion } from "motion/react";

/*
  Shared scroll-reveal primitive.

  Motivation (every animation on this page needs one): content entering as the
  user scrolls establishes reading order and gives the food photography a
  moment to land. It is a hierarchy cue, not decoration.

  Uses Motion's whileInView, so no scroll listener and no per-frame React
  state. Collapses to a plain static render under prefers-reduced-motion.
*/
export function Reveal({ children, delay = 0, y = 24, className = "" }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

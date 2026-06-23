'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
};

/**
 * Scroll-triggered reveal. Animates once when the element scrolls into view,
 * and collapses to a plain fade (no transform) when the user prefers reduced
 * motion, so the content never depends on animation to be readable.
 */
export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  );
}

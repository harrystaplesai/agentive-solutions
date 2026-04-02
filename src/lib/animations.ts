import type { Transition, Variants } from "framer-motion";

// Spring presets
export const springs = {
  gentle: { type: "spring", stiffness: 100, damping: 20 } as Transition,
  snappy: { type: "spring", stiffness: 300, damping: 30 } as Transition,
  bouncy: { type: "spring", stiffness: 400, damping: 15 } as Transition,
  slow: { type: "spring", stiffness: 50, damping: 20 } as Transition,
};

// Fade up (scroll reveal default)
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springs.gentle,
  },
};

// Fade in (no vertical movement)
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Stagger container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Stagger item
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springs.gentle,
  },
};

// Scale on hover (for cards)
export const hoverScale = {
  whileHover: { scale: 1.02, transition: springs.snappy },
  whileTap: { scale: 0.98, transition: springs.snappy },
};

// Slide in from left
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springs.gentle,
  },
};

// Slide in from right
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springs.gentle,
  },
};

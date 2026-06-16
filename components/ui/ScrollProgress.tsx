'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin champagne progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.3,
  });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-gold-sheen"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}

'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Luxury trailing cursor — a champagne ring that grows over interactive elements.
 * Hidden on touch devices (no fine pointer).
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement;
      setHovering(
        !!el.closest('a, button, [role="button"], input, textarea')
      );
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden lg:block"
      style={{ x: sx, y: sy }}
      aria-hidden="true"
    >
      <motion.span
        className="block -translate-x-1/2 -translate-y-1/2 rounded-full border border-champagne"
        animate={{
          width: hovering ? 48 : 18,
          height: hovering ? 48 : 18,
          backgroundColor: hovering
            ? 'rgba(15,160,145,0.12)'
            : 'rgba(15,160,145,0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
    </motion.div>
  );
}

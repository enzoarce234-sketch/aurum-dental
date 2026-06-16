'use client';

import { useEffect, useRef, useState } from 'react';

export interface MousePosition {
  /** Normalised -1..1 across the viewport (centre = 0). */
  x: number;
  y: number;
}

/**
 * Tracks the pointer normalised to the viewport centre.
 * Returns a ref (for render-loop reads, no re-render) and state (for React reads).
 */
export function useMousePosition() {
  const ref = useRef<MousePosition>({ x: 0, y: 0 });
  const [state, setState] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    let frame = 0;
    const handle = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      ref.current = { x, y };
      if (!frame) {
        frame = requestAnimationFrame(() => {
          setState({ x, y });
          frame = 0;
        });
      }
    };
    window.addEventListener('pointermove', handle, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handle);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { ref, state };
}

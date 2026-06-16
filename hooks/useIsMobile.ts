'use client';

import { useEffect, useState } from 'react';

/**
 * True on small / coarse-pointer devices. Used to scale down the WebGL workload
 * (no post-processing, lower DPR, fewer particles) where GPUs are weakest.
 */
export function useIsMobile(query = '(max-width: 820px), (pointer: coarse)'): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [query]);

  return isMobile;
}

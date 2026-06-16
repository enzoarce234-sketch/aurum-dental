'use client';

import { useEffect, useLayoutEffect } from 'react';

/**
 * useLayoutEffect that silently falls back to useEffect on the server,
 * avoiding the React SSR warning while keeping synchronous behaviour on the client.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

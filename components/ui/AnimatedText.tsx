'use client';

import { createElement, ElementType, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** Stagger reveal per-word, masked from below. */
  delay?: number;
}

/**
 * Word-by-word masked reveal driven by GSAP ScrollTrigger.
 * Each word sits in an overflow-hidden wrapper and rises into view.
 */
export default function AnimatedText({
  text,
  as = 'span',
  className,
  delay = 0,
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(' ');

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll('.word-inner');
      gsap.set(targets, { yPercent: 120 });
      gsap.to(targets, {
        yPercent: 0,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.06,
        delay,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      });
    }, el);

    return () => ctx.revert();
  }, [text, delay]);

  return createElement(
    as,
    { ref, className: cn('block', className) },
    words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: '0.05em' }}
        >
          <span className="word-inner inline-block will-change-transform">
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))
  );
}

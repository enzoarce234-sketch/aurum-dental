'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionLabel from '@/components/ui/SectionLabel';
import { TESTIMONIALS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const DURATION = 7000;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % TESTIMONIALS.length);
    setProgress(0);
  }, []);

  // Auto-advance with a progress bar.
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      setProgress(p);
      if (p >= 1) next();
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index, next]);

  const t = TESTIMONIALS[index];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-onyx py-32 md:py-44"
    >
      <div className="pointer-events-none absolute -right-40 top-20 font-serif text-[40rem] leading-none text-white/[0.015]">
        ”
      </div>

      <div className="container-luxe relative">
        <SectionLabel index="06" label="En Sus Palabras" />

        <div className="min-h-[40vh]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl"
            >
              <p className="font-serif text-3xl font-light leading-[1.25] text-ivory md:text-5xl lg:text-[3.4rem]">
                “{t.quote}”
              </p>
              <footer className="mt-10 flex items-center gap-4">
                <span className="h-px w-12 bg-champagne" />
                <div>
                  <p className="text-lg text-ivory">{t.author}</p>
                  <p className="text-xs uppercase tracking-wide2 text-champagne">{t.role}</p>
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Progress controls */}
        <div className="mt-16 flex gap-4">
          {TESTIMONIALS.map((item, i) => (
            <button
              key={item.id}
              onClick={() => {
                setIndex(i);
                setProgress(0);
              }}
              className="group flex-1 text-left"
              aria-label={`Ver testimonio de ${item.author}`}
            >
              <span className="relative block h-px w-full overflow-hidden bg-white/15">
                <span
                  className={cn(
                    'absolute left-0 top-0 h-full bg-champagne transition-[width]',
                    i < index ? 'w-full' : i > index ? 'w-0' : ''
                  )}
                  style={i === index ? { width: `${progress * 100}%` } : undefined}
                />
              </span>
              <span
                className={cn(
                  'mt-3 block text-xs uppercase tracking-wide2 transition-colors',
                  i === index ? 'text-ivory' : 'text-platinum-dim'
                )}
              >
                {item.author}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

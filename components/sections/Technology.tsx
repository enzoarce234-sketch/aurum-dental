'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionLabel from '@/components/ui/SectionLabel';
import AnimatedText from '@/components/ui/AnimatedText';
import { TECHNOLOGIES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Technology() {
  const [active, setActive] = useState(0);
  const tech = TECHNOLOGIES[active];

  return (
    <section id="technology" className="relative overflow-hidden bg-onyx py-32 md:py-44">
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-champagne/5 blur-[120px]" />

      <div className="container-luxe relative">
        <SectionLabel index="04" label="Instruments of Precision" />
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
          <AnimatedText
            as="h2"
            text="Technology, presented as it deserves."
            className="max-w-2xl font-serif text-4xl font-light text-ivory md:text-6xl"
          />
          <p className="max-w-xs text-sm font-light text-platinum-dim">
            Every diagnosis and restoration is powered by instruments engineered to the
            tolerances of aerospace — and treated like the products they are.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          {/* Selector */}
          <div className="flex flex-col gap-3">
            {TECHNOLOGIES.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActive(i)}
                className={cn(
                  'group rounded-xl border p-6 text-left transition-all duration-500 ease-luxe',
                  active === i
                    ? 'border-champagne/50 bg-champagne/[0.06]'
                    : 'border-white/10 hover:border-white/25'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wide2 text-champagne">
                    {t.category}
                  </span>
                  <span className="font-serif text-sm italic text-platinum-dim">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-2 font-serif text-2xl font-light text-ivory">{t.name}</h3>
                <AnimatePresence initial={false}>
                  {active === i && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden text-sm font-light text-platinum"
                    >
                      <span className="block pt-3">{t.description}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>

          {/* Product stage with interactive hotspots */}
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-graphite to-obsidian md:aspect-[4/3]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(231,211,168,0.12),transparent_60%)]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={tech.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Stylised "exploded" product form */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    initial={{ scale: 0.85, rotate: -8, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative h-48 w-48 md:h-60 md:w-60"
                  >
                    <div className="absolute inset-0 rotate-45 rounded-3xl border border-champagne/30 bg-gradient-to-br from-platinum/10 to-champagne/10 backdrop-blur-sm" />
                    <div className="absolute inset-6 rounded-2xl border border-white/10 bg-gradient-to-tr from-graphite to-onyx" />
                    <div className="absolute inset-0 flex items-center justify-center font-serif text-6xl font-light text-champagne/80">
                      {tech.name.charAt(0)}
                    </div>
                  </motion.div>
                </div>

                {/* Hotspots */}
                {tech.hotspots.map((h, i) => (
                  <Hotspot key={i} x={h.x} y={h.y} label={h.label} delay={0.4 + i * 0.2} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Hotspot({
  x,
  y,
  label,
  delay,
}: {
  x: number;
  y: number;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      className="group absolute"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <span className="relative flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-champagne/60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-champagne" />
      </span>
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/15 bg-obsidian/80 px-3 py-1 text-[11px] uppercase tracking-wide2 text-ivory opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
        {label}
      </span>
    </motion.div>
  );
}

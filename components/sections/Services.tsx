'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionLabel from '@/components/ui/SectionLabel';
import AnimatedText from '@/components/ui/AnimatedText';
import { SERVICES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Services() {
  const [active, setActive] = useState(0);
  const ActiveIcon = SERVICES[active].Icon;

  return (
    <section id="services" className="relative bg-onyx py-20 md:py-32 lg:py-44">
      <div className="container-luxe">
        <SectionLabel index="02" label="Las Disciplinas" />
        <AnimatedText
          as="h2"
          text="Un espectro de maestría"
          className="mb-16 font-serif text-4xl font-light text-ivory md:text-6xl lg:text-7xl"
        />

        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          {/* Interactive list */}
          <ul className="flex flex-col">
            {SERVICES.map((service, i) => {
              const isActive = active === i;
              const Icon = service.Icon;
              return (
                <li key={service.id}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group relative w-full border-t border-ink/10 py-7 text-left last:border-b"
                  >
                    {/* gold wash on active */}
                    <span
                      className={cn(
                        'absolute inset-0 origin-left bg-gradient-to-r from-champagne/10 to-transparent transition-transform duration-700 ease-luxe',
                        isActive ? 'scale-x-100' : 'scale-x-0'
                      )}
                    />
                    <div className="relative flex items-center gap-6">
                      <span className="font-serif text-sm italic text-champagne">
                        {service.index}
                      </span>
                      <Icon
                        className={cn(
                          'shrink-0 text-2xl transition-colors duration-500',
                          isActive ? 'text-champagne' : 'text-platinum-dim'
                        )}
                      />
                      <div className="flex-1">
                        <h3
                          className={cn(
                            'font-serif text-3xl font-light transition-all duration-500 md:text-4xl',
                            isActive
                              ? 'translate-x-2 text-ivory'
                              : 'text-platinum'
                          )}
                        >
                          {service.title}
                        </h3>
                      </div>
                      <span className="text-xs uppercase tracking-wide2 text-platinum-dim">
                        {service.subtitle}
                      </span>
                    </div>

                    {/* Inline description (mobile + active) */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="relative overflow-hidden pl-12 text-sm font-light text-platinum lg:hidden"
                        >
                          <span className="block pt-4">{service.description}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Sticky morphing preview (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-ink/10 bg-gradient-to-br from-graphite to-obsidian">
                <div className="absolute inset-0 bg-radial-fade" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={SERVICES[active].id}
                    initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 1.05, rotate: 4 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <ActiveIcon className="text-[12rem] text-champagne/90 drop-shadow-[0_0_40px_rgba(15,160,145,0.30)]" />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-x-0 bottom-0 p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`txt-${SERVICES[active].id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <p className="eyebrow mb-3">{SERVICES[active].subtitle}</p>
                      <p className="text-sm font-light leading-relaxed text-platinum">
                        {SERVICES[active].description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

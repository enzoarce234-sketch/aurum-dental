'use client';

import { motion } from 'framer-motion';
import SectionLabel from '@/components/ui/SectionLabel';
import AnimatedText from '@/components/ui/AnimatedText';
import Reveal from '@/components/ui/Reveal';
import { REASONS } from '@/lib/constants';

// Repurposed from a tech showcase into a trust-building "why choose us" section,
// grounded in what a Buenos Aires clinic actually offers.
export default function Technology() {
  return (
    <section id="why" className="relative overflow-hidden bg-onyx py-20 md:py-32 lg:py-44">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-champagne/5 blur-[120px]" />

      <div className="container-luxe relative">
        <SectionLabel index="04" label="Por qué elegirnos" />
        <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
          <AnimatedText
            as="h2"
            text="Una clínica en la que vas a confiar."
            className="max-w-2xl font-serif text-4xl font-light text-ivory md:text-6xl"
          />
          <p className="max-w-xs text-sm font-light text-platinum-dim">
            Cuidamos cada detalle de tu experiencia, desde que entrás hasta que volvés a
            sonreír con confianza.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason, i) => {
            const Icon = reason.Icon;
            return (
              <Reveal key={reason.id} delay={i * 0.06}>
                <div className="group h-full bg-obsidian p-8 transition-colors duration-500 hover:bg-onyx md:p-10">
                  <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-champagne/10 text-xl text-champagne transition-transform duration-500 group-hover:scale-110">
                    <Icon />
                  </span>
                  <h3 className="font-serif text-2xl font-light text-ivory">{reason.title}</h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-platinum">
                    {reason.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col items-center gap-5 text-center"
        >
          <p className="font-serif text-2xl font-light italic text-ivory md:text-3xl">
            “Tu primera consulta es el mejor lugar para empezar.”
          </p>
          <a href="#booking" className="btn-luxe">
            <span>Pedí tu turno</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

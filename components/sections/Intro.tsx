'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import AnimatedText from '@/components/ui/AnimatedText';
import SectionLabel from '@/components/ui/SectionLabel';
import Reveal from '@/components/ui/Reveal';
import { ACHIEVEMENTS } from '@/lib/constants';

export default function Intro() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Count-up the achievement figures on enter.
      gsap.utils.toArray<HTMLElement>('.stat-value').forEach((el) => {
        const text = el.dataset.value || '';
        const num = parseInt(text.replace(/\D/g, ''), 10);
        if (!num) return;
        const suffix = text.replace(/[0-9]/g, '');
        const obj = { val: 0 };
        gsap.to(obj, {
          val: num,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
          onUpdate: () => {
            el.textContent = Math.floor(obj.val) + suffix;
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="intro"
      className="relative bg-obsidian py-20 md:py-32 lg:py-44"
    >
      <div className="container-luxe">
        <SectionLabel index="01" label="Filosofía" />

        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-24">
          <div>
            <AnimatedText
              as="h2"
              text="No blanqueamos dientes. Componemos presencia."
              className="font-serif text-4xl font-light leading-[1.05] text-ivory md:text-6xl lg:text-7xl"
            />
            <Reveal delay={0.2} className="mt-10 max-w-xl">
              <p className="text-lg font-light leading-relaxed text-platinum">
                Cada sonrisa que creamos comienza como un estudio: de arquitectura, de luz,
                de la persona que la lleva. Tratamos la odontología como un oficio de
                orfebrería, uniendo la precisión quirúrgica con una mirada obsesiva por la
                estética. El resultado nunca se percibe como trabajo dental. Simplemente se
                ve como <em className="text-champagne not-italic">tú</em>, en tu mejor versión.
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col justify-end">
            <Reveal>
              <div className="hairline mb-10" />
            </Reveal>
            <div className="grid grid-cols-2 gap-x-8 gap-y-12">
              {ACHIEVEMENTS.map((a, i) => (
                <Reveal key={a.label} delay={i * 0.08}>
                  <p
                    className="stat-value font-serif text-5xl font-light text-gold-gradient md:text-6xl"
                    data-value={a.value}
                  >
                    {a.value}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-wide2 text-platinum-dim">
                    {a.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

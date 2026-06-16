'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import SectionLabel from '@/components/ui/SectionLabel';
import AnimatedText from '@/components/ui/AnimatedText';
import Reveal from '@/components/ui/Reveal';
import { TIMELINE } from '@/lib/constants';

export default function Doctor() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Draw the timeline progress line as the section scrolls through.
      gsap.fromTo(
        '.timeline-progress',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline',
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: true,
          },
        }
      );

      // Subtle parallax on the portrait.
      gsap.to('.portrait-inner', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.portrait',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="doctor" className="relative bg-obsidian py-20 md:py-32 lg:py-44">
      <div className="container-luxe">
        <SectionLabel index="03" label="La Mano Tras la Obra" />

        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Cinematic portrait (CSS-composed, no external asset) */}
          <div className="portrait relative">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-ink/10">
              <div className="portrait-inner absolute inset-[-12%] bg-gradient-to-b from-graphite via-onyx to-obsidian" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_25%,rgba(15,160,145,0.16),transparent_55%)]" />
              {/* Monogram */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-[12rem] font-light leading-none text-ink/[0.04]">
                  AV
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian to-transparent p-8">
                <p className="font-serif text-3xl font-light text-ivory">Dr. Adrián Valenti</p>
                <p className="mt-1 text-xs uppercase tracking-wide2 text-champagne">
                  Fundador · Director de Estética y Restauradora
                </p>
              </div>
            </div>
          </div>

          {/* Narrative + timeline */}
          <div>
            <AnimatedText
              as="h2"
              text="Dos décadas en busca de lo imperceptible."
              className="font-serif text-3xl font-light leading-[1.1] text-ivory md:text-5xl"
            />
            <Reveal delay={0.15} className="mt-8 max-w-xl">
              <p className="text-base font-light leading-relaxed text-platinum">
                Formado en el país y en el exterior, y elegido por pacientes que buscan
                resultados naturales y un trato honesto, el Dr. Valenti ha dedicado su
                carrera a una sola idea: que el mejor trabajo es el que se ve natural y
                dura en el tiempo.
              </p>
            </Reveal>

            <div className="timeline relative mt-14 pl-8">
              {/* Track */}
              <span className="absolute left-0 top-1 h-[calc(100%-1rem)] w-px bg-ink/10" />
              <span className="timeline-progress absolute left-0 top-1 h-[calc(100%-1rem)] w-px origin-top bg-gradient-to-b from-champagne to-champagne-deep" />

              <div className="flex flex-col gap-12">
                {TIMELINE.map((item, i) => (
                  <Reveal key={item.year} delay={i * 0.05} className="relative">
                    <span className="absolute -left-8 top-1.5 h-2.5 w-2.5 -translate-x-[3px] rounded-full border border-champagne bg-obsidian" />
                    <p className="font-serif text-2xl italic text-champagne">{item.year}</p>
                    <p className="mt-1 text-lg font-light text-ivory">{item.title}</p>
                    <p className="mt-1 max-w-md text-sm font-light text-platinum-dim">
                      {item.detail}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

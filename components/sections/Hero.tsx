'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { CLINIC } from '@/lib/constants';

// The Canvas is client-only and code-split so it never blocks first paint.
const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-obsidian" />,
});

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from('.hero-line-inner', {
        yPercent: 120,
        duration: 1.4,
        ease: 'power4.out',
        stagger: 0.12,
      })
        .from('.hero-fade', { opacity: 0, y: 24, duration: 1, ease: 'power3.out', stagger: 0.12 }, '-=0.8')
        .from('.hero-cue', { opacity: 0, duration: 1 }, '-=0.4');

      // Parallax the headline as the user scrolls out of the hero.
      gsap.to('.hero-content', {
        yPercent: -18,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative h-[100svh] w-full overflow-hidden"
      aria-label="Hero"
    >
      {/* WebGL stage */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Soft light beams (CSS, layered over canvas) */}
      <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
        <div className="absolute left-1/2 top-[-20%] h-[80%] w-[160px] -translate-x-1/2 rotate-12 bg-gradient-to-b from-champagne/15 to-transparent blur-3xl" />
        <div className="absolute right-[12%] top-[-10%] h-[70%] w-[110px] -rotate-12 bg-gradient-to-b from-champagne-light/20 to-transparent blur-3xl" />
      </div>

      {/* Airy edge fade for legibility on the bright stage */}
      <div
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(238,243,246,0.85)_100%)]"
        aria-hidden="true"
      />

      {/* Overlay content */}
      <div className="hero-content container-luxe relative z-20 flex h-full flex-col justify-center">
        <motion.p className="hero-fade eyebrow mb-6">
          {CLINIC.location} · Confianza y cercanía
        </motion.p>

        <h1 className="font-serif text-ivory">
          <span className="block overflow-hidden">
            <span className="hero-line-inner block text-[15vw] font-light leading-[0.85] md:text-[12vw] lg:text-[11rem]">
              El Arte de
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-line-inner block text-[15vw] font-light italic leading-[0.85] text-gold-gradient md:text-[12vw] lg:text-[11rem]">
              la Sonrisa
            </span>
          </span>
        </h1>

        <div className="hero-fade mt-10 flex max-w-xl flex-col gap-8 sm:flex-row sm:items-center">
          <p className="max-w-md text-balance text-sm font-light leading-relaxed text-platinum">
            Una clínica donde la tecnología de última generación se combina con un trato
            humano y cercano, para que cuidar tu sonrisa sea simple y sin estrés.
          </p>
          <a href="#booking" className="btn-luxe hero-fade shrink-0">
            <span>Solicitar Consulta</span>
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hero-cue absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="text-[10px] uppercase tracking-luxe text-platinum-dim">Desliza</span>
        <span className="relative h-12 w-px overflow-hidden bg-ink/15">
          <motion.span
            className="absolute left-0 top-0 h-4 w-px bg-champagne"
            animate={{ y: [0, 32, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </div>
    </section>
  );
}

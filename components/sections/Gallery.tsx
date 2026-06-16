'use client';

import { useRef, useState } from 'react';
import SectionLabel from '@/components/ui/SectionLabel';
import AnimatedText from '@/components/ui/AnimatedText';
import { CASES, CaseStudy } from '@/lib/constants';
import { clamp } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function Gallery() {
  const [active, setActive] = useState(0);
  const c = CASES[active];

  return (
    <section id="gallery" className="relative bg-obsidian py-20 md:py-32 lg:py-44">
      <div className="container-luxe">
        <SectionLabel index="05" label="Antes y Después" />
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <AnimatedText
            as="h2"
            text="Transformaciones, arrastra para revelar."
            className="font-serif text-4xl font-light text-ivory md:text-6xl"
          />
          <div className="flex gap-2">
            {CASES.map((cs, i) => (
              <button
                key={cs.id}
                onClick={() => setActive(i)}
                aria-label={`Ver ${cs.title}`}
                className={cn(
                  'h-10 w-10 rounded-full border text-xs transition-all duration-500',
                  active === i
                    ? 'border-champagne bg-champagne text-obsidian'
                    : 'border-ink/20 text-platinum hover:border-ink/50'
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        <CompareSlider key={c.id} data={c} />

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-6">
          <div>
            <p className="font-serif text-2xl font-light text-ivory">{c.title}</p>
            <p className="text-sm text-platinum-dim">{c.treatment}</p>
          </div>
          <p className="text-xs uppercase tracking-wide2 text-champagne">
            Completado en {c.duration}
          </p>
        </div>
      </div>
    </section>
  );
}

function CompareSlider({ data }: { data: CaseStudy }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const update = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
    setPos(pct);
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-2xl border border-ink/10 md:aspect-[21/9]"
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
    >
      {/* After (full) */}
      <div className={cn('absolute inset-0 bg-gradient-to-br', data.hueAfter)}>
        <Label text="Después" align="right" tone="dark" />
        <Smile tone="bright" />
      </div>

      {/* Before (clipped) */}
      <div
        className={cn('absolute inset-0 bg-gradient-to-br', data.hueBefore)}
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Label text="Antes" align="left" tone="light" />
        <Smile tone="dim" />
      </div>

      {/* Handle */}
      <div
        className="absolute top-0 z-10 h-full w-px bg-champagne"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-champagne bg-obsidian/80 backdrop-blur">
          <span className="text-champagne">⟷</span>
        </div>
      </div>
    </div>
  );
}

function Label({
  text,
  align,
  tone,
}: {
  text: string;
  align: 'left' | 'right';
  tone: 'light' | 'dark';
}) {
  return (
    <span
      className={cn(
        'absolute top-6 z-[5] text-[11px] uppercase tracking-luxe',
        align === 'left' ? 'left-6' : 'right-6',
        // Rendered over the case imagery: dark side needs light text and vice versa.
        tone === 'dark' ? 'text-black/55' : 'text-white/85'
      )}
    >
      {text}
    </span>
  );
}

/** A minimal abstract "smile" arc so the comparison reads without photo assets. */
function Smile({ tone }: { tone: 'bright' | 'dim' }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg width="46%" viewBox="0 0 200 90" fill="none" className="opacity-90">
        {Array.from({ length: 10 }).map((_, i) => (
          <rect
            key={i}
            x={10 + i * 18}
            y={tone === 'bright' ? 18 : 26}
            width={tone === 'bright' ? 15 : 13}
            height={tone === 'bright' ? 52 : 44}
            rx={5}
            fill={tone === 'bright' ? '#fffdf7' : '#9c958a'}
            opacity={tone === 'bright' ? 0.95 : 0.7}
          />
        ))}
      </svg>
    </div>
  );
}

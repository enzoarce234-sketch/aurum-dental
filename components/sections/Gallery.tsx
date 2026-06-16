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
        <Label text="Después" align="right" />
        <Mouth clean />
      </div>

      {/* Before (clipped) */}
      <div
        className={cn('absolute inset-0 bg-gradient-to-br', data.hueBefore)}
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Label text="Antes" align="left" />
        <Mouth clean={false} />
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

function Label({ text, align }: { text: string; align: 'left' | 'right' }) {
  return (
    <span
      className={cn(
        'absolute top-6 z-[5] rounded-full bg-obsidian/70 px-3 py-1 text-[11px] uppercase tracking-luxe text-ink backdrop-blur',
        align === 'left' ? 'left-6' : 'right-6'
      )}
    >
      {text}
    </span>
  );
}

// Deterministic crookedness/shade data for the "before" mouth (no hydration drift).
const BEFORE_ROT = [-5, 4, -3, 6, -2, 5, -4, 3, -6, 2];
const BEFORE_DY = [3, -2, 4, 1, 5, 0, 4, 2, 3, -1];
const BEFORE_FILL = [
  '#d8c690', '#cdb87f', '#d3bf86', '#c6b079', '#a8954f',
  '#cdb884', '#8f7f55', '#c9b57f', '#bda871', '#d2bd88',
];

/**
 * A stylised but recognisable mouth. `clean` → straight, white, healthy.
 * Otherwise → yellowed, stained, crooked teeth with a couple of bad ones.
 */
function Mouth({ clean }: { clean: boolean }) {
  const UP = 10;
  const LO = 8;
  const left = 44;
  const right = 276;
  const step = (right - left) / UP;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg width="72%" viewBox="0 0 320 200" className="drop-shadow-sm">
        {/* upper lip */}
        <path
          d="M28,72 Q160,28 292,72"
          fill="none"
          stroke={clean ? '#e98b86' : '#c47e77'}
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.45"
        />
        {/* dark mouth interior */}
        <path d="M42,80 Q160,54 278,80 Q258,152 160,160 Q62,152 42,80 Z" fill="#2b1f1f" />
        {/* upper gum */}
        <path
          d="M44,82 Q160,52 276,82 L276,64 Q160,38 44,64 Z"
          fill={clean ? '#f0a8a8' : '#cf938b'}
        />

        {/* upper teeth */}
        {Array.from({ length: UP }).map((_, i) => {
          const fc = Math.abs(i - (UP - 1) / 2);
          const w = 26 - fc * 1.3;
          const h = 52 - fc * 4;
          const cx = left + (i + 0.5) * step;
          const top = 78 + fc * fc * 0.7;
          const rot = clean ? 0 : BEFORE_ROT[i];
          const dy = clean ? 0 : BEFORE_DY[i];
          const fill = clean ? '#fcfffe' : BEFORE_FILL[i];
          return (
            <g key={`u${i}`} transform={`rotate(${rot} ${cx} ${top + h / 2})`}>
              <rect x={cx - w / 2} y={top + dy} width={w} height={h} rx={w * 0.4} fill={fill} />
              {clean ? (
                <rect
                  x={cx - w / 2 + 3}
                  y={top + 5}
                  width={w * 0.22}
                  height={h * 0.45}
                  rx={3}
                  fill="#ffffff"
                  opacity="0.55"
                />
              ) : (
                // plaque / stain near the gum line
                <rect
                  x={cx - w / 2}
                  y={top + dy}
                  width={w}
                  height={h * 0.34}
                  rx={w * 0.4}
                  fill="#7c6a3a"
                  opacity="0.22"
                />
              )}
            </g>
          );
        })}

        {/* lower teeth */}
        {Array.from({ length: LO }).map((_, i) => {
          const fc = Math.abs(i - (LO - 1) / 2);
          const w = 19 - fc * 1;
          const h = 24 - fc * 1.4;
          const cx = 72 + (i + 0.5) * ((248 - 72) / LO);
          const bottom = 150 - fc * fc * 0.5 - h;
          const fill = clean ? '#f4faf9' : '#c7b67f';
          return (
            <rect
              key={`l${i}`}
              x={cx - w / 2}
              y={bottom}
              width={w}
              height={h}
              rx={w * 0.4}
              fill={fill}
              opacity="0.92"
            />
          );
        })}

        {/* lower lip */}
        <path
          d="M52,150 Q160,184 268,150"
          fill="none"
          stroke={clean ? '#e98b86' : '#c47e77'}
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

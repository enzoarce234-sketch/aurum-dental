'use client';

import Reveal from './Reveal';

interface SectionLabelProps {
  index: string;
  label: string;
}

/** Editorial section eyebrow: "(01) — Philosophy" with a hairline. */
export default function SectionLabel({ index, label }: SectionLabelProps) {
  return (
    <Reveal className="mb-8 flex items-center gap-4">
      <span className="font-serif text-sm italic text-champagne">({index})</span>
      <span className="h-px w-10 bg-champagne/50" />
      <span className="eyebrow">{label}</span>
    </Reveal>
  );
}

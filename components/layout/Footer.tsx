'use client';

import { FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import { CLINIC, NAV_LINKS } from '@/lib/constants';
import AnimatedText from '@/components/ui/AnimatedText';
import Magnetic from '@/components/ui/Magnetic';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-onyx pt-28">
      <div className="container-luxe">
        <div className="grid gap-14 pb-20 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow mb-6">Begin a conversation</p>
            <AnimatedText
              as="h2"
              text="Your finest smile awaits."
              className="font-serif text-5xl font-light text-ivory md:text-7xl"
            />
            <Magnetic className="mt-10 inline-block">
              <a href="#booking" className="btn-luxe">
                <span>Book a Private Consultation</span>
              </a>
            </Magnetic>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div>
              <p className="mb-5 text-xs uppercase tracking-wide2 text-platinum-dim">
                Explore
              </p>
              <ul className="flex flex-col gap-3">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-platinum transition-colors hover:text-champagne"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-5 text-xs uppercase tracking-wide2 text-platinum-dim">
                Contact
              </p>
              <ul className="flex flex-col gap-3 text-sm text-platinum">
                <li>{CLINIC.location}</li>
                <li>
                  <a href={`tel:${CLINIC.phone}`} className="hover:text-champagne">
                    {CLINIC.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${CLINIC.email}`} className="hover:text-champagne">
                    {CLINIC.email}
                  </a>
                </li>
              </ul>
              <div className="mt-6 flex gap-3">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-platinum transition-colors hover:border-champagne hover:text-champagne"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-platinum transition-colors hover:border-champagne hover:text-champagne"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Oversized wordmark */}
        <div className="select-none border-t border-white/10 py-10">
          <p className="text-center font-serif text-[22vw] font-light leading-none tracking-tight text-white/[0.03]">
            {CLINIC.name}
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-xs text-platinum-dim sm:flex-row">
          <span>© {new Date().getFullYear()} {CLINIC.name}. All rights reserved.</span>
          <span className="text-center">
            3D model “Tooth” by{' '}
            <a
              href="https://poly.pizza/m/66NBoNdhb03"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-white/20 underline-offset-2 transition-colors hover:text-champagne"
            >
              sugamo
            </a>{' '}
            ·{' '}
            <a
              href="https://creativecommons.org/licenses/by/3.0/"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-white/20 underline-offset-2 transition-colors hover:text-champagne"
            >
              CC-BY 3.0
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { CLINIC, NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Magnetic from '@/components/ui/Magnetic';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-luxe',
          scrolled
            ? 'bg-obsidian/70 py-4 backdrop-blur-xl'
            : 'bg-transparent py-7'
        )}
      >
        <nav className="container-luxe flex items-center justify-between">
          <a
            href="#top"
            className="font-serif text-2xl font-medium tracking-[0.25em] text-ivory"
          >
            {CLINIC.name}
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative text-[12px] uppercase tracking-wide2 text-platinum transition-colors hover:text-ivory"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-champagne transition-all duration-500 ease-luxe group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
            <Magnetic className="hidden md:block">
              <a href="#booking" className="btn-luxe !px-6 !py-3">
                <span>Book Now</span>
              </a>
            </Magnetic>
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="text-2xl text-ivory lg:hidden"
            >
              <HiOutlineMenuAlt4 />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile / fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-obsidian"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="container-luxe flex items-center justify-between py-7">
              <span className="font-serif text-2xl tracking-[0.25em] text-ivory">
                {CLINIC.name}
              </span>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="text-3xl text-ivory"
              >
                <IoClose />
              </button>
            </div>
            <ul className="container-luxe flex flex-1 flex-col justify-center gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block font-serif text-5xl font-light text-ivory transition-colors hover:text-champagne md:text-7xl"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="container-luxe flex flex-col gap-1 py-10 text-sm text-platinum-dim">
              <span>{CLINIC.phone}</span>
              <span>{CLINIC.email}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

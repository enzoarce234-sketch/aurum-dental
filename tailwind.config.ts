import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Modern, bright clinic palette.
        // Token names are kept stable; values now describe a LIGHT theme so that
        // existing utilities (bg-obsidian, text-ivory, text-champagne…) map correctly.
        obsidian: '#ffffff', // primary surface (was the dark bg)
        onyx: '#eef3f6', // alternating light section
        graphite: '#e4ecf1', // cards / gradient stops
        ink: '#16242f', // dark navy — borders & watermark text on light
        ivory: '#16242f', // primary text (dark navy)
        champagne: '#0fa091', // accent (clinical turquoise)
        'champagne-light': '#3fc0b0',
        'champagne-deep': '#0c7d72',
        platinum: '#4f606e', // secondary text
        'platinum-dim': '#8a98a4', // muted text
      },
      fontFamily: {
        // Wired up via next/font CSS variables in app/layout.tsx
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.35em',
        wide2: '0.18em',
      },
      fontSize: {
        '10xl': ['9rem', { lineHeight: '0.95' }],
        '11xl': ['12rem', { lineHeight: '0.92' }],
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      backgroundImage: {
        // Turquoise sheen replaces the old champagne gold gradient.
        'gold-sheen':
          'linear-gradient(120deg, #0c7d72 0%, #3fc0b0 35%, #0fa091 60%, #0c7d72 100%)',
        'radial-fade':
          'radial-gradient(ellipse at center, rgba(15,160,145,0.12) 0%, rgba(255,255,255,0) 70%)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 6s linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;

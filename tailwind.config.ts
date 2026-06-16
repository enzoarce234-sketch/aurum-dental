import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Luxury palette
        obsidian: '#0a0a0b',
        onyx: '#121214',
        graphite: '#1c1c1f',
        ivory: '#f7f4ee',
        champagne: '#c9a86a',
        'champagne-light': '#e7d3a8',
        'champagne-deep': '#9c7d44',
        platinum: '#cfd2d6',
        'platinum-dim': '#8b8e93',
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
        'gold-sheen':
          'linear-gradient(120deg, #9c7d44 0%, #e7d3a8 35%, #c9a86a 60%, #9c7d44 100%)',
        'radial-fade':
          'radial-gradient(ellipse at center, rgba(201,168,106,0.12) 0%, rgba(10,10,11,0) 70%)',
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

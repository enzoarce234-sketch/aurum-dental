/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export — zero server dependencies, deploys to Netlify as a static site.
  output: 'export',
  reactStrictMode: true,
  // next/image optimization is server-side; disable it for static export.
  images: {
    unoptimized: true,
  },
  // Three.js ships ESM that benefits from being transpiled by Next.
  transpilePackages: ['three'],
  // Trailing slash keeps static hosts (Netlify) happy with clean routes.
  trailingSlash: true,
};

module.exports = nextConfig;

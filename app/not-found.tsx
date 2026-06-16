import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center bg-obsidian px-6 text-center">
      <p className="eyebrow mb-6">Error 404</p>
      <h1 className="font-serif text-6xl font-light text-ivory md:text-8xl">
        Un camino sin recorrer.
      </h1>
      <p className="mt-6 max-w-md text-platinum">
        La página que buscabas se ha desviado más allá de nuestra galería. Permítenos
        guiarte de regreso.
      </p>
      <Link href="/" className="btn-luxe mt-10">
        <span>Volver al Inicio</span>
      </Link>
    </main>
  );
}

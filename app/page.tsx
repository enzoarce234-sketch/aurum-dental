import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Intro from '@/components/sections/Intro';
import Services from '@/components/sections/Services';
import Doctor from '@/components/sections/Doctor';
import Technology from '@/components/sections/Technology';
import Gallery from '@/components/sections/Gallery';
import Testimonials from '@/components/sections/Testimonials';
import Booking from '@/components/sections/Booking';
import ScrollProgress from '@/components/ui/ScrollProgress';
import Cursor from '@/components/ui/Cursor';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Navbar />
      <main id="top" className="relative">
        <Hero />
        <Intro />
        <Services />
        <Doctor />
        <Technology />
        <Gallery />
        <Testimonials />
        <Booking />
      </main>
      <Footer />
    </>
  );
}

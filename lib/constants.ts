import { IconType } from 'react-icons';
import {
  PiSparkleDuotone,
  PiToothDuotone,
  PiSmileyDuotone,
  PiDiamondDuotone,
  PiScanDuotone,
  PiCrownSimpleDuotone,
} from 'react-icons/pi';

export const CLINIC = {
  name: 'AURUM',
  tagline: 'Cuidamos tu sonrisa',
  location: 'Caballito, Buenos Aires',
  phone: '+54 11 5555 0188',
  email: 'turnos@aurum.clinic',
  hours: 'Con turno previo',
} as const;

export const NAV_LINKS = [
  { label: 'Filosofía', href: '#intro' },
  { label: 'Servicios', href: '#services' },
  { label: 'El Doctor', href: '#doctor' },
  { label: 'Tecnología', href: '#technology' },
  { label: 'Resultados', href: '#gallery' },
  { label: 'Testimonios', href: '#testimonials' },
] as const;

export interface Service {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  Icon: IconType;
}

export const SERVICES: Service[] = [
  {
    id: 'smile-design',
    index: '01',
    title: 'Diseño de Sonrisa',
    subtitle: 'Arquitectura Digital',
    description:
      'Una sonrisa compuesta píxel a píxel. Diseñamos la armonía entre labios, encías y proporción mediante mapeo facial digital antes de iniciar cualquier procedimiento.',
    Icon: PiSmileyDuotone,
  },
  {
    id: 'implants',
    index: '02',
    title: 'Implantes Dentales',
    subtitle: 'Permanencia de Titanio',
    description:
      'Implantología guiada por ordenador que restaura la arquitectura del maxilar con precisión quirúrgica y estabilidad de por vida.',
    Icon: PiToothDuotone,
  },
  {
    id: 'orthodontics',
    index: '03',
    title: 'Ortodoncia',
    subtitle: 'Alineación Invisible',
    description:
      'Sistemas de alineación discretos y diseñados clínicamente para mover los dientes con intención: sin concesiones, sin que se noten.',
    Icon: PiScanDuotone,
  },
  {
    id: 'veneers',
    index: '04',
    title: 'Carillas de Porcelana',
    subtitle: 'Cerámica Artesanal',
    description:
      'Cerámica ultrafina, estratificada por maestros ceramistas para refractar la luz igual que el esmalte natural. Indistinguible. Eterna.',
    Icon: PiDiamondDuotone,
  },
  {
    id: 'digital',
    index: '05',
    title: 'Odontología Digital',
    subtitle: 'Precisión en el Día',
    description:
      'Escaneo intraoral, diagnóstico con IA y fresado propio entregan restauraciones de exactitud absoluta en una sola visita.',
    Icon: PiSparkleDuotone,
  },
  {
    id: 'aesthetic',
    index: '06',
    title: 'Odontología Estética',
    subtitle: 'El Refinamiento Final',
    description:
      'Blanqueamiento, contorneado y arte sobre el tejido blando: las pinceladas finales que elevan una sonrisa sana a una firma personal.',
    Icon: PiCrownSimpleDuotone,
  },
];

export interface Achievement {
  value: string;
  label: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  { value: '20', label: 'Años de experiencia' },
  { value: '15K+', label: 'Pacientes atendidos' },
  { value: '6', label: 'Especialidades' },
  { value: '9', label: 'Profesionales en el equipo' },
];

export interface TimelineItem {
  year: string;
  title: string;
  detail: string;
}

export const TIMELINE: TimelineItem[] = [
  {
    year: '2001',
    title: 'Doctorado en Ciencias Restauradoras',
    detail: 'Graduado summa cum laude con una tesis sobre restauración biomimética del esmalte.',
  },
  {
    year: '2008',
    title: 'Fellowship — Diseño Digital de Sonrisa',
    detail: 'Uno de los primeros profesionales en certificarse en flujos de trabajo digitales de arcada completa.',
  },
  {
    year: '2014',
    title: 'Fundación de AURUM',
    detail: 'Abre la clínica dedicada a la odontología estética de excelencia con un trato cercano.',
  },
  {
    year: '2023',
    title: 'Centro de referencia',
    detail: 'Reconocida en la ciudad por su tecnología, sus resultados naturales y la calidez de su atención.',
  },
];

export interface Technology {
  id: string;
  name: string;
  category: string;
  description: string;
  hotspots: { x: number; y: number; label: string }[];
}

export const TECHNOLOGIES: Technology[] = [
  {
    id: 'scanner',
    name: 'Primescan AC',
    category: 'Imagen Intraoral',
    description:
      'Captura 1.000.000 de puntos por segundo para crear un gemelo digital perfecto de tu boca, sin una sola cubeta de impresión.',
    hotspots: [
      { x: 28, y: 32, label: 'Matriz de captura óptica' },
      { x: 68, y: 58, label: 'Empuñadura de precisión' },
    ],
  },
  {
    id: 'cbct',
    name: 'CBCT Volumétrico',
    category: 'Diagnóstico 3D',
    description:
      'Tomografía de haz cónico de baja dosis que revela hueso, nervio y tejido en 3D volumétrico real para una planificación de grado quirúrgico.',
    hotspots: [
      { x: 50, y: 24, label: 'Anillo sensor giratorio' },
      { x: 40, y: 70, label: 'Posicionamiento estabilizado' },
    ],
  },
  {
    id: 'mill',
    name: 'CEREC MC XL',
    category: 'Fresado Propio',
    description:
      'El fresado con puntas de diamante esculpe un único bloque de cerámica médica hasta la restauración final en minutos, en el propio centro.',
    hotspots: [
      { x: 35, y: 40, label: 'Husillos gemelos de diamante' },
      { x: 64, y: 62, label: 'Cámara del bloque cerámico' },
    ],
  },
];

export interface CaseStudy {
  id: string;
  title: string;
  treatment: string;
  duration: string;
  hueBefore: string;
  hueAfter: string;
}

export const CASES: CaseStudy[] = [
  {
    id: 'case-1',
    title: 'El Ejecutivo',
    treatment: 'Carillas de porcelana · 10 unidades',
    duration: '3 semanas',
    hueBefore: 'from-[#3a3530] to-[#23211e]',
    hueAfter: 'from-[#e7d3a8] to-[#c9a86a]',
  },
  {
    id: 'case-2',
    title: 'La Artista',
    treatment: 'Diseño de sonrisa · blanqueamiento · contorneado',
    duration: '2 semanas',
    hueBefore: 'from-[#352f2a] to-[#1f1d1a]',
    hueAfter: 'from-[#f3ece0] to-[#d8c39a]',
  },
  {
    id: 'case-3',
    title: 'El Fundador',
    treatment: 'Implantes guiados · rehabilitación de arcada completa',
    duration: '6 meses',
    hueBefore: 'from-[#2f2b27] to-[#1b1916]',
    hueAfter: 'from-[#efe6d6] to-[#cdb486]',
  },
];

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Siempre me dio miedo el dentista y acá me sentí cómoda desde el primer día. Me explicaron cada paso y el resultado se ve totalmente natural.',
    author: 'Marina G.',
    role: 'Paciente · Caballito',
  },
  {
    id: 't2',
    quote:
      'Buscaba un lugar de confianza para toda la familia. La atención es cálida, puntual y muy profesional. Ya somos pacientes hace años.',
    author: 'Diego R.',
    role: 'Paciente · Villa Crespo',
  },
  {
    id: 't3',
    quote:
      'Me hice las carillas y quedaron impecables. Lo que más valoré fue lo claros que fueron con los tiempos y cada paso del tratamiento.',
    author: 'Lucía P.',
    role: 'Paciente · Almagro',
  },
];

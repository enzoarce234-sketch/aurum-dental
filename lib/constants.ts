import { IconType } from 'react-icons';
import {
  PiSparkleDuotone,
  PiToothDuotone,
  PiSmileyDuotone,
  PiDiamondDuotone,
  PiScanDuotone,
  PiCrownSimpleDuotone,
} from 'react-icons/pi';
import {
  FiHeart,
  FiSmile,
  FiAward,
  FiCreditCard,
  FiClock,
  FiShield,
} from 'react-icons/fi';

export const CLINIC = {
  name: 'AURUM',
  tagline: 'Cuidamos tu sonrisa',
  location: 'Caballito, Buenos Aires',
  phone: '+54 11 5555 0188',
  email: 'turnos@aurum.clinic',
  hours: 'Con turno previo',
} as const;

export const NAV_LINKS = [
  { label: 'Nosotros', href: '#intro' },
  { label: 'Tratamientos', href: '#services' },
  { label: 'El Doctor', href: '#doctor' },
  { label: 'Por qué elegirnos', href: '#why' },
  { label: 'Resultados', href: '#gallery' },
  { label: 'Opiniones', href: '#testimonials' },
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
    subtitle: 'Estética y armonía',
    description:
      'Estudiamos tu rostro y tus dientes para lograr una sonrisa natural y proporcionada, pensada especialmente para vos.',
    Icon: PiSmileyDuotone,
  },
  {
    id: 'implants',
    index: '02',
    title: 'Implantes Dentales',
    subtitle: 'Solución duradera',
    description:
      'Reemplazamos las piezas que faltan con implantes que devuelven la función y la estética, con un seguimiento cercano en cada etapa.',
    Icon: PiToothDuotone,
  },
  {
    id: 'orthodontics',
    index: '03',
    title: 'Ortodoncia',
    subtitle: 'Brackets y alineadores',
    description:
      'Alineamos tus dientes con brackets o alineadores transparentes, según lo que mejor se adapte a tu día a día.',
    Icon: PiScanDuotone,
  },
  {
    id: 'veneers',
    index: '04',
    title: 'Carillas y Estética',
    subtitle: 'Detalles que transforman',
    description:
      'Carillas, blanqueamiento y contorneado para mejorar el color, la forma y el brillo de tu sonrisa, siempre con un resultado natural.',
    Icon: PiDiamondDuotone,
  },
  {
    id: 'prevention',
    index: '05',
    title: 'Limpieza y Prevención',
    subtitle: 'La salud primero',
    description:
      'Limpiezas profesionales y controles periódicos para mantener tus dientes y encías sanos durante muchos años.',
    Icon: PiSparkleDuotone,
  },
  {
    id: 'general',
    index: '06',
    title: 'Odontología General',
    subtitle: 'Todo en un solo lugar',
    description:
      'Arreglos, tratamientos de conducto y urgencias: la atención de siempre, con calidez y sin vueltas.',
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
    title: 'Odontólogo — Universidad de Buenos Aires',
    detail: 'Se recibe con honores y comienza su formación en odontología estética y restauradora.',
  },
  {
    year: '2008',
    title: 'Especialización en Estética Dental',
    detail: 'Se perfecciona en diseño de sonrisa, carillas y rehabilitación estética.',
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

export interface Reason {
  id: string;
  title: string;
  description: string;
  Icon: IconType;
}

export const REASONS: Reason[] = [
  {
    id: 'human',
    title: 'Trato humano y cercano',
    description: 'Te escuchamos y te explicamos cada paso, sin apuro y en un lenguaje claro.',
    Icon: FiHeart,
  },
  {
    id: 'painless',
    title: 'Atención sin dolor',
    description: 'Tu comodidad es la prioridad: trabajamos para que cada visita sea tranquila.',
    Icon: FiSmile,
  },
  {
    id: 'team',
    title: 'Profesionales matriculados',
    description: 'Un equipo con años de experiencia y formación continua que cuida tu salud.',
    Icon: FiAward,
  },
  {
    id: 'coverage',
    title: 'Obras sociales y cuotas',
    description: 'Coordinamos tu cobertura y ofrecemos planes de pago accesibles.',
    Icon: FiCreditCard,
  },
  {
    id: 'urgency',
    title: 'Urgencias el mismo día',
    description: 'Si tenés dolor, te damos prioridad para atenderte lo antes posible.',
    Icon: FiClock,
  },
  {
    id: 'hygiene',
    title: 'Higiene y seguridad',
    description: 'Esterilización rigurosa y consultorios cuidados en cada turno.',
    Icon: FiShield,
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
    title: 'Carillas y blanqueamiento',
    treatment: 'Estética dental · arcada superior',
    duration: '3 semanas',
    hueBefore: 'from-[#d2ccc0] to-[#a59e92]',
    hueAfter: 'from-[#eaf8f4] to-[#c8ebe4]',
  },
  {
    id: 'case-2',
    title: 'Ortodoncia',
    treatment: 'Alineación con brackets',
    duration: '14 meses',
    hueBefore: 'from-[#cfc9bd] to-[#a39c90]',
    hueAfter: 'from-[#eef8f5] to-[#cdece6]',
  },
  {
    id: 'case-3',
    title: 'Implante y corona',
    treatment: 'Reemplazo de pieza · sector frontal',
    duration: '4 meses',
    hueBefore: 'from-[#d4cdc1] to-[#a8a094]',
    hueAfter: 'from-[#e9f7f3] to-[#c6eae2]',
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

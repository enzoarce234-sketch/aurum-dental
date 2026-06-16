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
  tagline: 'The Art of the Perfect Smile',
  location: 'Madison Avenue, New York',
  phone: '+1 (212) 555-0188',
  email: 'concierge@aurum.clinic',
  hours: 'By private appointment',
} as const;

export const NAV_LINKS = [
  { label: 'Philosophy', href: '#intro' },
  { label: 'Services', href: '#services' },
  { label: 'The Doctor', href: '#doctor' },
  { label: 'Technology', href: '#technology' },
  { label: 'Results', href: '#gallery' },
  { label: 'Voices', href: '#testimonials' },
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
    title: 'Smile Design',
    subtitle: 'Digital Architecture',
    description:
      'A smile composed pixel by pixel. We engineer harmony between lips, gums, and proportion using digital facial mapping before a single procedure begins.',
    Icon: PiSmileyDuotone,
  },
  {
    id: 'implants',
    index: '02',
    title: 'Dental Implants',
    subtitle: 'Titanium Permanence',
    description:
      'Guided, computer-navigated implantology that restores the architecture of the jaw with surgical precision and lifelong stability.',
    Icon: PiToothDuotone,
  },
  {
    id: 'orthodontics',
    index: '03',
    title: 'Orthodontics',
    subtitle: 'Invisible Alignment',
    description:
      'Discreet, clinically-engineered alignment systems crafted to move teeth with intention — never compromise, never visible.',
    Icon: PiScanDuotone,
  },
  {
    id: 'veneers',
    index: '04',
    title: 'Porcelain Veneers',
    subtitle: 'Hand-Layered Ceramic',
    description:
      'Ultra-thin ceramic, layered by master ceramists to refract light exactly as natural enamel does. Indistinguishable. Eternal.',
    Icon: PiDiamondDuotone,
  },
  {
    id: 'digital',
    index: '05',
    title: 'Digital Dentistry',
    subtitle: 'Same-Day Precision',
    description:
      'Intraoral scanning, AI diagnostics, and in-house milling deliver restorations of uncompromising accuracy in a single visit.',
    Icon: PiSparkleDuotone,
  },
  {
    id: 'aesthetic',
    index: '06',
    title: 'Aesthetic Dentistry',
    subtitle: 'The Final Refinement',
    description:
      'Whitening, contouring, and soft-tissue artistry — the finishing brushstrokes that elevate a healthy smile into a signature.',
    Icon: PiCrownSimpleDuotone,
  },
];

export interface Achievement {
  value: string;
  label: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  { value: '24', label: 'Years of practice' },
  { value: '11K+', label: 'Smiles redesigned' },
  { value: '38', label: 'International awards' },
  { value: '100%', label: 'Discretion guaranteed' },
];

export interface TimelineItem {
  year: string;
  title: string;
  detail: string;
}

export const TIMELINE: TimelineItem[] = [
  {
    year: '2001',
    title: 'Doctorate, Restorative Sciences',
    detail: 'Graduated summa cum laude with a thesis on biomimetic enamel restoration.',
  },
  {
    year: '2008',
    title: 'Fellowship — Digital Smile Design',
    detail: 'One of the first European practitioners certified in full-arch digital workflows.',
  },
  {
    year: '2014',
    title: 'AURUM Founded',
    detail: 'Opened the flagship private clinic dedicated to ultra-premium aesthetic dentistry.',
  },
  {
    year: '2023',
    title: 'Global Recognition',
    detail: 'Named among the world’s leading cosmetic dental authorities by the Aesthetic Council.',
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
    category: 'Intraoral Imaging',
    description:
      'Captures 1,000,000 data points per second to build a flawless digital twin of your mouth — without a single impression tray.',
    hotspots: [
      { x: 28, y: 32, label: 'Optical capture array' },
      { x: 68, y: 58, label: 'Precision-balanced grip' },
    ],
  },
  {
    id: 'cbct',
    name: 'CBCT Volumetric',
    category: '3D Diagnostics',
    description:
      'Low-dose cone-beam tomography reveals bone, nerve, and tissue in true volumetric 3D for surgical-grade planning.',
    hotspots: [
      { x: 50, y: 24, label: 'Rotating sensor ring' },
      { x: 40, y: 70, label: 'Stabilised positioning' },
    ],
  },
  {
    id: 'mill',
    name: 'CEREC MC XL',
    category: 'In-House Milling',
    description:
      'Diamond-tipped milling sculpts a single block of medical ceramic into a final restoration in minutes, on-site.',
    hotspots: [
      { x: 35, y: 40, label: 'Twin diamond spindles' },
      { x: 64, y: 62, label: 'Ceramic block chamber' },
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
    title: 'The Executive',
    treatment: 'Full porcelain veneers · 10 units',
    duration: '3 weeks',
    hueBefore: 'from-[#3a3530] to-[#23211e]',
    hueAfter: 'from-[#e7d3a8] to-[#c9a86a]',
  },
  {
    id: 'case-2',
    title: 'The Performer',
    treatment: 'Smile design · whitening · contouring',
    duration: '2 weeks',
    hueBefore: 'from-[#352f2a] to-[#1f1d1a]',
    hueAfter: 'from-[#f3ece0] to-[#d8c39a]',
  },
  {
    id: 'case-3',
    title: 'The Founder',
    treatment: 'Guided implants · full-arch rehabilitation',
    duration: '6 months',
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
      'I have been photographed for thirty years. For the first time, I am not editing my own smile. AURUM understood the difference between teeth and a presence.',
    author: 'A. Lindqvist',
    role: 'Film Director',
  },
  {
    id: 't2',
    quote:
      'Discretion, precision, and an obsession with detail I usually only find in my own work. This is not dentistry. It is craftsmanship.',
    author: 'M. Castellan',
    role: 'Architect',
  },
  {
    id: 't3',
    quote:
      'They rebuilt my confidence in a single afternoon. The technology felt like the future; the care felt like a private members’ club.',
    author: 'R. Okonkwo',
    role: 'Founder & CEO',
  },
];

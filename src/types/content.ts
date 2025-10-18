export interface NavigationItem {
  id: string;
  label: string;
  path: string;
}

export interface SiteScheduleItem {
  label: string;
  value: string;
}

export interface SiteData {
  url: string;
  defaultDescription: string;
  defaultImageId: string;
  language?: string;
  author?: string;
  brand: {
    name: string;
    legal_name: string;
    tagline: string;
    logoId: string;
  };
  contact: {
    phone: string;
    phone_e164: string;
    email: string;
    address: string;
    city: string;
    country: string;
    schedule: SiteScheduleItem[];
  };
  legal: {
    privacy: string;
    terms: string;
    nit: string;
  };
  social: Record<string, string>;
  whatsapp: {
    label: string;
    number: string;
    link: string;
  };
}

export interface Property {
  id: string;
  nombre: string;
  ubicacion: string;
  estatus: string;
  tipologias: string[];
  area_desde: string;
  precio_desde: string;
  amenidades: string[];
  slug: string;
  imageId: string;
  destacado?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export interface HeroCta {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}

export interface HeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  imageId: string;
  ctas?: HeroCta[];
  breadcrumbs?: NavigationItem[];
}

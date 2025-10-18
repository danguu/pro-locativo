export interface NavChild {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href?: string;
  children?: NavChild[];
  featured?: { label: string; href: string };
}

export const navItems: NavItem[] = [
  {
    label: "Inicio",
    href: "/"
  },
  {
    label: "Proyectos",
    href: "/proyectos",
    children: [
      {
        label: "Portafolio Kolbing",
        href: "/proyectos",
        description: "Explora nuestros proyectos de mantenimiento, remodelación e instalaciones eléctricas."
      },
      {
        label: "Casos destacados",
        href: "/proyectos?destacados=true",
        description: "Resultados medibles con supervisión técnica y planes integrales."
      },
      {
        label: "Agendar visita técnica",
        href: "/contacto",
        description: "Solicita una visita de diagnóstico para tu inmueble."
      }
    ],
    featured: { label: "Planes corporativos", href: "/contacto" }
  },
  {
    label: "Empresa",
    children: [
      {
        label: "Nosotros",
        href: "/nosotros",
        description: "Conoce nuestra historia, valores y equipo certificado."
      },
      {
        label: "Testimonios",
        href: "/testimonios",
        description: "Clientes que confían en Kolbing Like para sus proyectos."
      },
      {
        label: "Preguntas frecuentes",
        href: "/faq",
        description: "Respuestas claras sobre nuestros servicios y garantías."
      }
    ],
    featured: { label: "Línea de emergencias 24/7", href: "tel:+123456789" }
  },
  {
    label: "Contacto",
    href: "/contacto"
  }
];

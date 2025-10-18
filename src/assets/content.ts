export type NavLink = {
  label: string;
  href: string;
  description?: string;
  children?: Array<{ label: string; href: string; description?: string }>;
};

export type HeroSlide = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  image: string;
  imageAlt: string;
};

export type ServiceHighlight = {
  title: string;
  description: string;
  icon: "mantenimiento" | "remodelacion" | "electrico";
  href: string;
};

export type KPI = {
  label: string;
  value: number;
  suffix?: string;
  description: string;
};

export type Project = {
  id: string;
  name: string;
  slug: string;
  category: string;
  city: string;
  status: "Entregado" | "En ejecución" | "Planificado";
  headline: string;
  summary: string;
  services: string[];
  heroImage: string;
  heroImageAlt: string;
  gallery: Array<{ src: string; alt: string }>;
  techSheet: Array<{ title: string; items: string[] }>;
  highlights: Array<{ label: string; value: string }>;
  description: string;
  clientNote: string;
};

export type FAQCategory = {
  title: string;
  faqs: Array<{ question: string; answer: string }>;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
};

export const navLinks: NavLink[] = [
  {
    label: "Inicio",
    href: "/",
    description: "Visión general de Kolbing y nuestros servicios integrales.",
  },
  {
    label: "Proyectos",
    href: "/proyectos",
    description: "Portafolio de proyectos y servicios locativos.",
    children: [
      {
        label: "Mantenimiento integral",
        href: "/proyectos?categoria=Mantenimiento",
        description: "Planes preventivos y correctivos adaptados a cada inmueble.",
      },
      {
        label: "Remodelación",
        href: "/proyectos?categoria=Remodelación",
        description: "Transformaciones completas de espacios corporativos y residenciales.",
      },
      {
        label: "Instalaciones eléctricas",
        href: "/proyectos?categoria=Instalaciones%20Eléctricas",
        description: "Implementaciones certificadas con foco en seguridad y eficiencia.",
      },
    ],
  },
  {
    label: "Nosotros",
    href: "/nosotros",
    description: "Conoce nuestra historia, equipo y valores.",
    children: [
      {
        label: "Historia Kolbing",
        href: "/nosotros#historia",
        description: "Más de ocho años de crecimiento continuo.",
      },
      {
        label: "Equipo técnico",
        href: "/nosotros#equipo",
        description: "Especialistas certificados a cargo de cada proyecto.",
      },
    ],
  },
  {
    label: "Preguntas frecuentes",
    href: "/faq",
    description: "Resolvemos dudas sobre procesos, pagos y garantías.",
  },
  {
    label: "Testimonios",
    href: "/testimonios",
    description: "Clientes que avalan la experiencia Kolbing.",
  },
  {
    label: "Contacto",
    href: "/contacto",
    description: "Solicita una cotización o agenda una visita técnica.",
  },
];

export const heroSlides: HeroSlide[] = [
  {
    id: "servicios-integrales",
    title: "Servicios locativos y mantenimiento profesional",
    subtitle: "Más de 8 años brindando soluciones integrales para empresas y hogares",
    description:
      "Gestionamos proyectos preventivos y correctivos con equipos certificados, materiales de primera y seguimiento permanente.",
    ctaPrimary: { label: "Ver proyectos", href: "/proyectos" },
    ctaSecondary: { label: "Solicitar cotización", href: "/contacto" },
    image: "/img/hero-1.jpg",
    imageAlt: "Equipo de Kolbing coordinando mantenimiento en edificio corporativo",
  },
  {
    id: "remodelacion",
    title: "Remodelación con diseño funcional",
    subtitle: "Transformamos espacios con acabados de alto estándar",
    description:
      "Desde la planificación hasta la entrega final coordinamos cada disciplina para asegurar resultados que superan expectativas.",
    ctaPrimary: { label: "Explorar remodelaciones", href: "/proyectos?categoria=Remodelación" },
    ctaSecondary: { label: "Conocer nuestro proceso", href: "/nosotros#enfoque" },
    image: "/img/hero-2.jpg",
    imageAlt: "Render de remodelación interior ejecutada por Kolbing",
  },
  {
    id: "seguridad-electrica",
    title: "Instalaciones eléctricas certificadas",
    subtitle: "Cumplimiento normativo y seguridad para cada proyecto",
    description:
      "Implementamos tableros, iluminación eficiente y sistemas de respaldo con protocolos de seguridad verificados por nuestro equipo técnico.",
    ctaPrimary: { label: "Servicios eléctricos", href: "/proyectos?categoria=Instalaciones%20Eléctricas" },
    ctaSecondary: { label: "Agenda una visita", href: "/contacto" },
    image: "/img/hero-3.jpg",
    imageAlt: "Especialista eléctrico de Kolbing revisando tableros",
  },
];

export const serviceHighlights: ServiceHighlight[] = [
  {
    title: "Mantenimiento",
    description:
      "Servicios preventivos y correctivos para mantener tus instalaciones en perfecto estado.",
    icon: "mantenimiento",
    href: "/proyectos?categoria=Mantenimiento",
  },
  {
    title: "Remodelación",
    description:
      "Transformamos espacios con diseños modernos y funcionales que superan expectativas.",
    icon: "remodelacion",
    href: "/proyectos?categoria=Remodelación",
  },
  {
    title: "Instalaciones eléctricas",
    description:
      "Instalaciones certificadas y seguras que cumplen con todas las normativas vigentes.",
    icon: "electrico",
    href: "/proyectos?categoria=Instalaciones%20Eléctricas",
  },
];

export const kpis: KPI[] = [
  {
    label: "Proyectos completados",
    value: 500,
    suffix: "+",
    description: "Portafolio en sectores corporativo, comercial y residencial.",
  },
  {
    label: "Satisfacción del cliente",
    value: 98,
    suffix: "%",
    description: "Clientes que califican el servicio como sobresaliente.",
  },
  {
    label: "Años de experiencia",
    value: 8,
    suffix: "+",
    description: "Trayectoria consolidada con equipos multidisciplinarios.",
  },
];

export const clientLogos = ["Cliente 1", "Cliente 2", "Cliente 3", "Cliente 4", "Cliente 5", "Cliente 6"];

export const insights = [
  {
    id: "mantenimiento-preventivo",
    title: "5 consejos para el mantenimiento preventivo de tu hogar",
    excerpt: "Descubre cómo prevenir problemas costosos con un mantenimiento adecuado y programado.",
    tags: ["mantenimiento", "hogares"],
    date: "2024-03-15",
  },
  {
    id: "tendencias-remodelacion",
    title: "Tendencias en remodelación para 2024",
    excerpt: "Las últimas tendencias en diseño interior y remodelación que están marcando pauta este año.",
    tags: ["remodelación", "diseño"],
    date: "2024-03-10",
  },
  {
    id: "instalaciones-certificadas",
    title: "Importancia de las instalaciones eléctricas certificadas",
    excerpt: "Por qué es crucial contar con instalaciones eléctricas que cumplan con todas las normativas.",
    tags: ["eléctrico", "seguridad"],
    date: "2024-03-05",
  },
];

export const projects: Project[] = [
  {
    id: "proj-001",
    name: "Programa integral de mantenimiento Kolbing",
    slug: "programa-integral-mantenimiento-kolbing",
    category: "Mantenimiento",
    city: "Bogotá",
    status: "Entregado",
    headline: "Plan preventivo y correctivo para edificios corporativos",
    summary:
      "Mantenimiento programado, reparaciones de emergencia y reporte detallado del estado de instalaciones para garantizar continuidad operativa.",
    services: [
      "Mantenimiento preventivo programado",
      "Reparaciones de emergencia 24/7",
      "Inspecciones técnicas periódicas",
      "Limpieza especializada de sistemas",
    ],
    heroImage: "/img/projects/mantenimiento-1.jpg",
    heroImageAlt: "Equipo de mantenimiento Kolbing en edificio corporativo",
    gallery: [
      { src: "/img/projects/mantenimiento-1.jpg", alt: "Supervisor técnico revisando checklist" },
      { src: "/img/projects/mantenimiento-1b.jpg", alt: "Equipo realizando mantenimiento preventivo" },
      { src: "/img/projects/mantenimiento-1c.jpg", alt: "Detalle de reporte técnico" },
    ],
    techSheet: [
      {
        title: "Alcance",
        items: [
          "Edificios corporativos clase A",
          "Cobertura 24/7",
          "Reportes digitales mensuales",
        ],
      },
      {
        title: "Servicios incluidos",
        items: [
          "Revisión de sistemas eléctricos y mecánicos",
          "Limpieza de fachadas y zonas técnicas",
          "Gestión de proveedores especializados",
        ],
      },
    ],
    highlights: [
      { label: "Duración", value: "12 meses" },
      { label: "Equipo asignado", value: "8 técnicos certificados" },
      { label: "Satisfacción", value: "98%" },
    ],
    description:
      "Implementamos un programa integral que cubre mantenimiento preventivo y correctivo, inspecciones técnicas y acompañamiento constante a la administración del edificio. Utilizamos herramientas digitales para documentar cada intervención y asegurar trazabilidad total.",
    clientNote:
      "El equipo de Kolbing Like realizó el mantenimiento de nuestras oficinas de manera profesional y puntual. Totalmente recomendados.",
  },
  {
    id: "proj-002",
    name: "Remodelación integral de oficinas creativas",
    slug: "remodelacion-integral-oficinas-creativas",
    category: "Remodelación",
    city: "Medellín",
    status: "Entregado",
    headline: "Actualización completa de espacios colaborativos",
    summary:
      "Diseño y planificación de zonas de trabajo flexibles con iluminación natural, mobiliario ergonómico y acabados de alto estándar.",
    services: [
      "Diseño arquitectónico",
      "Remodelación integral de interiores",
      "Actualización de instalaciones eléctricas",
      "Pintura y acabados profesionales",
    ],
    heroImage: "/img/projects/remodelacion-1.jpg",
    heroImageAlt: "Área colaborativa remodelada por Kolbing",
    gallery: [
      { src: "/img/projects/remodelacion-1.jpg", alt: "Zona social remodelada" },
      { src: "/img/projects/remodelacion-1b.jpg", alt: "Sala de reuniones renovada" },
      { src: "/img/projects/remodelacion-1c.jpg", alt: "Detalles de acabados Kolbing" },
    ],
    techSheet: [
      {
        title: "Componentes",
        items: [
          "Demoliciones controladas",
          "Nuevos cerramientos livianos",
          "Sistema de iluminación LED",
        ],
      },
      {
        title: "Resultados",
        items: [
          "Incremento del 35% en capacidad de puestos",
          "Optimización acústica en salas",
          "Implementación de señalética corporativa",
        ],
      },
    ],
    highlights: [
      { label: "Área intervenida", value: "1.200 m²" },
      { label: "Tiempo de ejecución", value: "10 semanas" },
      { label: "Equipo interdisciplinario", value: "15 especialistas" },
    ],
    description:
      "Acompañamos al cliente desde la conceptualización del espacio hasta la entrega llave en mano. Coordinamos disciplinas técnicas, selección de materiales y control de calidad, asegurando la continuidad de operaciones durante la obra.",
    clientNote:
      "La remodelación de nuestro hogar superó nuestras expectativas. Atención al detalle excepcional y cumplimiento de los plazos establecidos.",
  },
  {
    id: "proj-003",
    name: "Modernización de tableros eléctricos",
    slug: "modernizacion-tableros-electricos",
    category: "Instalaciones Eléctricas",
    city: "Bogotá",
    status: "En ejecución",
    headline: "Actualización de tableros principales para complejo mixto",
    summary:
      "Instalación de tableros certificados, redistribución de cargas y puesta en marcha de sistemas de respaldo para garantizar continuidad.",
    services: [
      "Ingeniería de detalle",
      "Instalación de tableros certificados",
      "Pruebas de carga y termografía",
      "Capacitación al personal del cliente",
    ],
    heroImage: "/img/projects/electrico-1.jpg",
    heroImageAlt: "Técnico eléctrico de Kolbing trabajando en tablero",
    gallery: [
      { src: "/img/projects/electrico-1.jpg", alt: "Tablero principal modernizado" },
      { src: "/img/projects/electrico-1b.jpg", alt: "Equipo realizando pruebas eléctricas" },
      { src: "/img/projects/electrico-1c.jpg", alt: "Detalle de cableado organizado" },
    ],
    techSheet: [
      {
        title: "Normativa",
        items: [
          "RETIE vigente",
          "Certificación de instalación",
          "Protocolos de seguridad eléctrica",
        ],
      },
      {
        title: "Componentes",
        items: [
          "Tableros de distribución",
          "Sistema UPS",
          "Iluminación LED de emergencia",
        ],
      },
    ],
    highlights: [
      { label: "Potencia instalada", value: "250 kVA" },
      { label: "Cobertura", value: "4 torres" },
      { label: "Avance", value: "70%" },
    ],
    description:
      "Desarrollamos un plan de intervención por fases para evitar interrupciones. Cada tablero se fabrica a medida y se instala con pruebas certificadas, garantizando trazabilidad documental para auditorías.",
    clientNote:
      "Las instalaciones eléctricas fueron realizadas con los más altos estándares de calidad. Equipo técnico muy capacitado.",
  },
  {
    id: "proj-004",
    name: "Programa residencial de mantenimiento Kolbing",
    slug: "programa-residencial-mantenimiento-kolbing",
    category: "Mantenimiento",
    city: "Chía",
    status: "Planificado",
    headline: "Plan multianual para conjuntos residenciales",
    summary:
      "Modelo preventivo que cubre zonas comunes, sistemas hidráulicos y eléctricos con reportes trimestrales.",
    services: [
      "Visitas técnicas programadas",
      "Atención de emergencias prioritarias",
      "Mantenimiento de zonas verdes",
      "Optimización de iluminación en áreas comunes",
    ],
    heroImage: "/img/projects/mantenimiento-2.jpg",
    heroImageAlt: "Zona residencial con mantenimiento Kolbing",
    gallery: [
      { src: "/img/projects/mantenimiento-2.jpg", alt: "Equipo realizando mantenimiento en zonas verdes" },
      { src: "/img/projects/mantenimiento-2b.jpg", alt: "Inspección hidráulica en conjunto residencial" },
      { src: "/img/projects/mantenimiento-2c.jpg", alt: "Actualización de iluminación LED" },
    ],
    techSheet: [
      {
        title: "Cobertura",
        items: [
          "Áreas comunes y deportivas",
          "Cuartos técnicos",
          "Sistemas de iluminación y CCTV",
        ],
      },
      {
        title: "Beneficios",
        items: [
          "Reducción de incidentes en 40%",
          "Optimización del consumo energético",
          "Canal digital de reportes residentes",
        ],
      },
    ],
    highlights: [
      { label: "Unidades atendidas", value: "320" },
      { label: "Inicio", value: "Julio 2024" },
      { label: "Duración", value: "36 meses" },
    ],
    description:
      "El plan residencial Kolbing combina mantenimiento preventivo con acciones correctivas programadas. Establecemos indicadores de desempeño y tableros en línea para la administración, asegurando comunicación continua con la comunidad.",
    clientNote:
      "Resolvieron una emergencia eléctrica en tiempo récord. Su servicio 24/7 es invaluable.",
  },
  {
    id: "proj-005",
    name: "Centro comercial Plaza – renovación de zonas comunes",
    slug: "centro-comercial-plaza-renovacion-zonas-comunes",
    category: "Remodelación",
    city: "Bogotá",
    status: "Entregado",
    headline: "Actualización estética y funcional de áreas comerciales",
    summary:
      "Implementamos señalética, acabados resistentes y mejoras de iluminación para incrementar el flujo de visitantes.",
    services: [
      "Gerencia integral de obra",
      "Renovación de acabados de alto tráfico",
      "Integración de iluminación LED",
      "Coordinación con locatarios",
    ],
    heroImage: "/img/projects/remodelacion-2.jpg",
    heroImageAlt: "Zonas comunes renovadas por Kolbing",
    gallery: [
      { src: "/img/projects/remodelacion-2.jpg", alt: "Pasillo comercial modernizado" },
      { src: "/img/projects/remodelacion-2b.jpg", alt: "Detalle de señalética corporativa" },
      { src: "/img/projects/remodelacion-2c.jpg", alt: "Área de descanso con nuevos acabados" },
    ],
    techSheet: [
      {
        title: "Fases",
        items: [
          "Intervención nocturna",
          "Control de polvo y residuos",
          "Entrega por sectores",
        ],
      },
      {
        title: "Resultados",
        items: [
          "Incremento de tráfico en 22%",
          "Reducción de consumos energéticos",
          "Mejor calificación en encuestas de visitantes",
        ],
      },
    ],
    highlights: [
      { label: "Área renovada", value: "3.500 m²" },
      { label: "Tiempo de ejecución", value: "14 semanas" },
      { label: "Locales activos", value: "45" },
    ],
    description:
      "Coordinamos la obra sin afectar la operación comercial, gestionando permisos, horarios extendidos y comunicación constante con cada locatario. Se implementaron materiales de alta durabilidad y un esquema de iluminación eficiente.",
    clientNote:
      "Trabajamos con ellos desde hace 2 años en el mantenimiento de nuestros edificios. Su profesionalismo y compromiso son sobresalientes.",
  },
  {
    id: "proj-006",
    name: "Plan maestro de instalaciones eléctricas residenciales",
    slug: "plan-maestro-instalaciones-electricas-residenciales",
    category: "Instalaciones Eléctricas",
    city: "Cali",
    status: "Entregado",
    headline: "Optimización energética en complejo residencial",
    summary:
      "Reemplazo de luminarias tradicionales por LED, balanceo de cargas y certificación RETIE para garantizar seguridad.",
    services: [
      "Revisión de cargas y diseño eléctrico",
      "Instalación de luminarias LED",
      "Actualización de tableros secundarios",
      "Capacitación en uso eficiente de energía",
    ],
    heroImage: "/img/projects/electrico-2.jpg",
    heroImageAlt: "Iluminación LED instalada por Kolbing",
    gallery: [
      { src: "/img/projects/electrico-2.jpg", alt: "Iluminación LED en pasillos residenciales" },
      { src: "/img/projects/electrico-2b.jpg", alt: "Equipo instalando tableros" },
      { src: "/img/projects/electrico-2c.jpg", alt: "Certificación de instalaciones eléctricas" },
    ],
    techSheet: [
      {
        title: "Componentes",
        items: [
          "Eficiencia energética",
          "Sistemas de respaldo",
          "Monitoreo remoto",
        ],
      },
      {
        title: "Resultados",
        items: [
          "Ahorro energético del 28%",
          "Reducción de incidentes eléctricos",
          "Certificación RETIE vigente",
        ],
      },
    ],
    highlights: [
      { label: "Torres intervenidas", value: "6" },
      { label: "Unidades residenciales", value: "420" },
      { label: "Tiempo de ejecución", value: "8 semanas" },
    ],
    description:
      "Se ejecutó un plan maestro para actualizar la infraestructura eléctrica, garantizando seguridad y eficiencia. Incluimos capacitación a la administración y manuales detallados para el seguimiento.",
    clientNote:
      "Resolvieron una emergencia eléctrica en tiempo récord. Su servicio 24/7 es invaluable.",
  },
];

export const faqCategories: FAQCategory[] = [
  {
    title: "Servicios",
    faqs: [
      {
        question: "¿Qué tipos de servicios ofrecen?",
        answer:
          "Ofrecemos servicios integrales de mantenimiento preventivo y correctivo, remodelación de espacios comerciales y residenciales, e instalaciones eléctricas certificadas. Nuestro equipo está capacitado para manejar proyectos de cualquier escala.",
      },
      {
        question: "¿Trabajan con empresas y particulares?",
        answer:
          "Sí, atendemos tanto a empresas como a clientes particulares. Tenemos planes especiales para cada tipo de cliente, adaptados a sus necesidades específicas y presupuesto.",
      },
      {
        question: "¿Ofrecen servicio de emergencias?",
        answer:
          "Sí, contamos con servicio de emergencias 24/7 para situaciones urgentes como fallas eléctricas, fugas de agua o problemas estructurales que requieran atención inmediata.",
      },
      {
        question: "¿Realizan inspecciones previas gratuitas?",
        answer:
          "Sí, la primera visita técnica y evaluación del proyecto es completamente gratuita. Durante esta visita, nuestro equipo analiza las necesidades y prepara una cotización detallada sin compromiso.",
      },
      {
        question: "¿Cuánto tiempo toma completar un proyecto típico?",
        answer:
          "El tiempo depende del alcance del proyecto. Un mantenimiento simple puede tomar horas, mientras que una remodelación completa puede tomar semanas. Siempre establecemos cronogramas claros antes de comenzar.",
      },
    ],
  },
  {
    title: "Pagos y presupuesto",
    faqs: [
      {
        question: "¿Cómo funcionan las cotizaciones?",
        answer:
          "Después de la visita técnica inicial, preparamos una cotización detallada que incluye materiales, mano de obra, tiempos estimados y garantías. La cotización es válida por 30 días.",
      },
      {
        question: "¿Aceptan diferentes formas de pago?",
        answer:
          "Sí, aceptamos efectivo, transferencias bancarias, tarjetas de crédito y débito. Para proyectos grandes, ofrecemos planes de pago personalizados.",
      },
      {
        question: "¿Los precios incluyen materiales?",
        answer:
          "Sí, nuestras cotizaciones incluyen tanto la mano de obra como los materiales necesarios. Especificamos claramente cada componente del presupuesto para total transparencia.",
      },
      {
        question: "¿Ofrecen garantía en sus trabajos?",
        answer:
          "Todos nuestros servicios incluyen garantía. El periodo varía según el tipo de trabajo: 3 meses para el plan Básico, 6 meses para el Profesional, y 12 meses para el Empresarial.",
      },
      {
        question: "¿Hay cargos adicionales ocultos?",
        answer:
          "No. Somos completamente transparentes con nuestros precios. Cualquier ajuste necesario durante el proyecto se comunica y aprueba antes de proceder.",
      },
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "María González",
    role: "Gerente de Operaciones",
    company: "Empresa Tech Solutions",
    content:
      "Excelente servicio. El equipo de Kolbing Like realizó el mantenimiento de nuestras oficinas de manera profesional y puntual. Totalmente recomendados.",
  },
  {
    id: "test-2",
    name: "Carlos Ramírez",
    role: "Propietario",
    company: "Residencial Los Álamos",
    content:
      "La remodelación de nuestro hogar superó nuestras expectativas. Atención al detalle excepcional y cumplimiento de los plazos establecidos.",
  },
  {
    id: "test-3",
    name: "Ana Martínez",
    role: "Directora de Facilities",
    company: "Corporativo Central",
    content:
      "Trabajamos con ellos desde hace 2 años en el mantenimiento de nuestros edificios. Su profesionalismo y compromiso son sobresalientes.",
  },
  {
    id: "test-4",
    name: "Roberto Silva",
    role: "Administrador",
    company: "Centro Comercial Plaza",
    content:
      "Las instalaciones eléctricas fueron realizadas con los más altos estándares de calidad. Equipo técnico muy capacitado.",
  },
  {
    id: "test-5",
    name: "Laura Torres",
    role: "Propietaria",
    company: "Apartamento Familiar",
    content:
      "Resolvieron una emergencia eléctrica en tiempo récord. Su servicio 24/7 es invaluable. Gracias por la rapidez y profesionalismo.",
  },
];

export const teamHighlights = [
  {
    role: "Equipo técnico",
    description: "Profesionales certificados con más de 10 años de experiencia en el sector.",
  },
  {
    role: "Gestión de proyectos",
    description: "Coordinadores expertos que aseguran la ejecución exitosa de cada proyecto.",
  },
  {
    role: "Atención al cliente",
    description: "Equipo dedicado a brindar soporte y seguimiento personalizado.",
  },
];

export const timeline = [
  {
    year: "2015",
    title: "Fundación",
    description: "Iniciamos operaciones con un equipo de 5 profesionales.",
  },
  {
    year: "2018",
    title: "Expansión",
    description: "Ampliamos servicios a nivel nacional y aumentamos el equipo.",
  },
  {
    year: "2022",
    title: "Certificación",
    description: "Obtuvimos certificaciones internacionales de calidad.",
  },
];

export const missionHighlights = [
  "Profesionales certificados y capacitados continuamente",
  "Uso de materiales de primera calidad",
  "Cumplimiento riguroso de normativas de seguridad",
  "Garantía extendida en todos nuestros servicios",
];

export const valuePillars = ["Excelencia", "Confianza", "Trabajo en equipo", "Profesionalismo"];

export const contactChannels = {
  phone: "+1 (234) 567-89",
  email: "contacto@kolbing.com",
  address: "Calle 123 #45-67, Bogotá, Colombia",
  schedule: "Lunes a sábado: 8:00 a.m. – 6:00 p.m.",
};

export const footerLinks = {
  company: [
    { label: "Nosotros", href: "/nosotros" },
    { label: "Proyectos", href: "/proyectos" },
    { label: "Testimonios", href: "/testimonios" },
    { label: "Preguntas frecuentes", href: "/faq" },
  ],
  services: [
    { label: "Mantenimiento", href: "/proyectos?categoria=Mantenimiento" },
    { label: "Remodelación", href: "/proyectos?categoria=Remodelación" },
    { label: "Instalaciones eléctricas", href: "/proyectos?categoria=Instalaciones%20Eléctricas" },
    { label: "Planes empresariales", href: "/proyectos#planes" },
  ],
  legal: [
    { label: "Aviso de privacidad", href: "#" },
    { label: "Términos de servicio", href: "#" },
    { label: "Política de cookies", href: "#" },
  ],
};

export const newsletterCopy = {
  title: "Recibe novedades Kolbing",
  description: "Actualizaciones de proyectos, recomendaciones de mantenimiento y promociones trimestrales.",
};

export const mapEmbed = {
  title: "Ubicación Kolbing",
  description: "Inserta aquí el mapa de Google Maps o servicio de geolocalización preferido.",
};

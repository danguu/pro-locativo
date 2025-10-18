import type { NavigationItem } from "@/types/content";
import { Seo } from "@/components/Seo";
import { Hero } from "@/components/Hero";
import { FeatureCard } from "@/components/FeatureCard";
import { CTA } from "@/components/CTA";
import { ShieldCheck, ClipboardCheck, Wrench, PenTool, Lightbulb } from "lucide-react";

const breadcrumbs: NavigationItem[] = [
  { id: "home", label: "Inicio", path: "/" },
  { id: "servicios", label: "Servicios" },
];

const services = [
  {
    icon: <Wrench className="h-6 w-6" aria-hidden="true" />,
    title: "Mantenimiento locativo",
    description: "Planes preventivos y correctivos para conservar infraestructura, redes eléctricas y acabados."
  },
  {
    icon: <PenTool className="h-6 w-6" aria-hidden="true" />,
    title: "Diseño y adecuaciones",
    description: "Conceptualización, renders y ejecución de espacios comerciales, oficinas y vivienda."
  },
  {
    icon: <ClipboardCheck className="h-6 w-6" aria-hidden="true" />,
    title: "Gestión de obra",
    description: "Supervisión técnica, control de costos y cronograma con reportes semanales.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" aria-hidden="true" />,
    title: "Cumplimiento normativo",
    description: "Auditorías de seguridad, brigadas, permisos y documentación al día.",
  },
  {
    icon: <Lightbulb className="h-6 w-6" aria-hidden="true" />,
    title: "Consultoría energética",
    description: "Optimización de consumos, paneles solares y automatización de sistemas HVAC.",
  },
];

export const Servicios = () => (
  <>
    <Seo
      title="Servicios"
      description="Servicios de mantenimiento locativo, gestión de obra, adecuaciones y consultoría inmobiliaria."
    />
    <div className="space-y-20">
      <Hero
      eyebrow="Servicios"
      title="Diseñamos soluciones inmobiliarias de punta a punta"
      description="Integramos equipos técnicos, financieros y creativos para garantizar proyectos rentables, seguros y memorables."
      imageId="hero-servicios"
      breadcrumbs={breadcrumbs}
      ctas={[
        { label: "Descargar brochure", href: "https://example.com/brochure.pdf", variant: "secondary" },
      ]}
    />

    <section className="container-responsive page-section" aria-labelledby="services-grid">
      <div className="section-heading">
        <p className="section-heading__subtitle">Lo que hacemos</p>
        <h2 id="services-grid" className="section-heading__title">
          Un aliado experto para cada etapa
        </h2>
        <p className="section-heading__description">
          Estrategia, construcción, comercialización y operación en un solo equipo para acelerar el retorno de inversión.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <FeatureCard
            key={service.title}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </section>

    <CTA
      title="¿Necesitas un alcance específico?"
      description="Creamos propuestas a la medida en menos de 72 horas con cronograma, presupuesto y plan de riesgos."
      primary={{ label: "Solicitar propuesta", href: "/contacto" }}
      secondary={{ label: "Agendar llamada", href: "https://wa.me/123456789" }}
    />
  </div>
  </>
);

export default Servicios;

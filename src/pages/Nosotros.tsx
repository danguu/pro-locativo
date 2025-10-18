import type { NavigationItem } from "@/types/content";
import { Seo } from "@/components/Seo";
import { Hero } from "@/components/Hero";
import { FeatureCard } from "@/components/FeatureCard";
import { Gallery } from "@/components/Gallery";
import { CTA } from "@/components/CTA";
import { Users, Target, Award, ShieldCheck } from "lucide-react";

const breadcrumbs: NavigationItem[] = [
  { id: "home", label: "Inicio", path: "/" },
  { id: "nosotros", label: "Nosotros" },
];

const milestones = [
  {
    year: "2015",
    title: "Fundación de Pro Locativo",
    description: "Iniciamos operaciones como firma de mantenimiento locativo para edificios corporativos en Bogotá.",
  },
  {
    year: "2018",
    title: "Expansión nacional",
    description: "Abrimos oficinas en Medellín y Cali con un portafolio integral de remodelaciones y adecuaciones.",
  },
  {
    year: "2022",
    title: "Estandarización",
    description: "Implementamos metodología BIM y certificaciones ISO para reforzar la calidad de nuestros proyectos.",
  },
];

const values = [
  {
    icon: <Users className="h-6 w-6" aria-hidden="true" />,
    title: "Cercanía",
    description: "Equipos interdisciplinarios que acompañan cada proyecto desde la planeación hasta la postventa.",
  },
  {
    icon: <Target className="h-6 w-6" aria-hidden="true" />,
    title: "Precisión",
    description: "Seguimiento semanal, reportes de obra y métricas de cumplimiento.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" aria-hidden="true" />,
    title: "Confianza",
    description: "Pólizas de responsabilidad civil, cumplimiento normativo y protocolos de seguridad certificados.",
  },
  {
    icon: <Award className="h-6 w-6" aria-hidden="true" />,
    title: "Excelencia",
    description: "Capacitación constante y alianzas con proveedores líderes en innovación.",
  },
];

export const Nosotros = () => (
  <>
    <Seo
      title="Nosotros"
      description="Conoce la historia, cultura y equipo multidisciplinario de Pro Locativo."
    />
    <div className="space-y-20">
      <Hero
      eyebrow="Sobre nosotros"
      title="Un equipo experto en transformar espacios"
      description="Más de 8 años diseñando experiencias inmobiliarias con impacto social y económico."
      imageId="hero-nosotros"
      breadcrumbs={breadcrumbs}
      ctas={[{ label: "Conoce nuestros servicios", href: "/servicios" }]}
    />

    <section className="container-responsive page-section" aria-labelledby="history-heading">
      <div className="section-heading">
        <p className="section-heading__subtitle">Trayectoria</p>
        <h2 id="history-heading" className="section-heading__title">
          Momentos clave
        </h2>
        <p className="section-heading__description">
          Crecemos junto a nuestros clientes, incorporando tecnología y buenas prácticas cada año.
        </p>
      </div>
      <ol className="space-y-6 border-l border-border/60 pl-6">
        {milestones.map((milestone) => (
          <li key={milestone.year} className="relative">
            <span className="absolute -left-3 top-1 h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">{milestone.year}</p>
            <p className="mt-2 text-lg font-semibold text-foreground">{milestone.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{milestone.description}</p>
          </li>
        ))}
      </ol>
    </section>

    <section className="bg-ink-2 py-24" aria-labelledby="values-heading">
      <div className="container-responsive">
        <div className="section-heading">
          <p className="section-heading__subtitle">Cultura</p>
          <h2 id="values-heading" className="section-heading__title">
            Nuestros valores
          </h2>
          <p className="section-heading__description">
            Lo que nos motiva a entregar proyectos memorables y relaciones de largo plazo.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {values.map((value) => (
            <FeatureCard key={value.title} icon={value.icon} title={value.title} description={value.description} />
          ))}
        </div>
      </div>
    </section>

    <Gallery images={[{ id: "team-gallery", caption: "Equipo interdisciplinario de Pro Locativo" }]} />

    <CTA
      title="¿Quieres unirte al equipo?"
      description="Buscamos talento en gestión de proyectos, arquitectura, ingeniería y experiencia del cliente."
      primary={{ label: "Enviar hoja de vida", href: "mailto:info@kolbinglike.com" }}
      secondary={{ label: "Ver cultura", href: "/blog" }}
    />
  </div>
  </>
);

export default Nosotros;

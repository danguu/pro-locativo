import properties from "@/data/properties.json";
import faqs from "@/data/faqs.json";
import testimonials from "@/data/testimonials.json";
import type { Property, FAQItem, Testimonial as TestimonialType } from "@/types/content";
import { Seo } from "@/components/Seo";
import { Hero } from "@/components/Hero";
import { FeatureCard } from "@/components/FeatureCard";
import { PropertyCard } from "@/components/PropertyCard";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import { Testimonial } from "@/components/Testimonial";
import { Map } from "@/components/Map";
import { ContactForm } from "@/components/ContactForm";
import siteData from "@/data/site.json";
import { Building2, Handshake, LineChart, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const propertyList = properties as Property[];
const faqList = faqs as FAQItem[];
const testimonialList = testimonials as TestimonialType[];

const highlights = [
  {
    icon: <Building2 className="h-6 w-6" aria-hidden="true" />,
    title: "+500 proyectos",
    description: "Gestión integral de desarrollos residenciales y comerciales en las principales ciudades.",
  },
  {
    icon: <Handshake className="h-6 w-6" aria-hidden="true" />,
    title: "Acompañamiento 360°",
    description: "Desde la planeación financiera hasta la entrega y puesta en marcha del inmueble.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" aria-hidden="true" />,
    title: "Garantía certificada",
    description: "Protocolos de seguridad y calidad alineados con estándares internacionales.",
  },
];

const differentiators = [
  {
    icon: <Users className="h-6 w-6" aria-hidden="true" />,
    title: "Equipo senior",
    description: "Especialistas con más de 8 años de experiencia liderando proyectos inmobiliarios corporativos.",
    badge: "Experiencia",
  },
  {
    icon: <LineChart className="h-6 w-6" aria-hidden="true" />,
    title: "Gestión de ROI",
    description: "Modelamos escenarios financieros y medimos los indicadores clave durante todo el proyecto.",
    badge: "Datos",
  },
  {
    icon: <Sparkles className="h-6 w-6" aria-hidden="true" />,
    title: "Experiencia humana",
    description: "Creamos espacios memorables con foco en bienestar, sostenibilidad y comunidad.",
    badge: "Personas",
  },
];

const site = siteData;

const heroCtas = [
  { label: "Ver proyectos", href: "/proyectos" },
  { label: "Contáctanos", href: "/contacto", variant: "secondary" as const },
];

export const Home = () => {
  const featuredProperties = propertyList.filter((property) => property.destacado);

  return (
    <>
      <Seo
        title="Inicio"
        description="Consultora inmobiliaria especializada en proyectos locativos, mantenimiento y administración de propiedades."
      />
      <div className="space-y-20">
      <Hero
        eyebrow="Proyectos inmobiliarios"
        title="Impulsamos el valor de tus inmuebles corporativos y residenciales"
        description="Diseñamos, comercializamos y administramos proyectos locativos con una visión integral de negocio."
        imageId="hero-home"
        ctas={heroCtas}
      />

      <section className="container-responsive -mt-12 grid gap-6 md:grid-cols-3" aria-label="Indicadores destacados">
        {highlights.map((item) => (
          <div key={item.title} className="rounded-3xl border border-border/70 bg-card/70 p-8 shadow-[var(--shadow-md)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 text-primary">
              {item.icon}
            </div>
            <p className="mt-4 text-xl font-semibold text-foreground">{item.title}</p>
            <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </section>

      <section className="container-responsive page-section" aria-labelledby="services-heading">
        <div className="section-heading">
          <p className="section-heading__subtitle">Servicios</p>
          <h2 id="services-heading" className="section-heading__title">
            Soluciones integrales para cada etapa del proyecto
          </h2>
          <p className="section-heading__description">
            Coordinamos equipos técnicos, legales y comerciales para garantizar entregas a tiempo y con calidad.
          </p>
        </div>
        <div className="grid-responsive">
          {differentiators.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              badge={feature.badge}
            />
          ))}
        </div>
      </section>

      <section className="container-responsive page-section" aria-labelledby="featured-properties">
        <div className="section-heading">
          <p className="section-heading__subtitle">Portafolio</p>
          <h2 id="featured-properties" className="section-heading__title">
            Proyectos destacados
          </h2>
          <p className="section-heading__description">
            Descubre desarrollos residenciales y corporativos listos para inversión y comercialización.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/proyectos">Explorar todo el portafolio</Link>
          </Button>
        </div>
      </section>

      <section className="bg-ink-2 py-24" aria-labelledby="testimonials-heading">
        <div className="container-responsive">
          <div className="section-heading">
            <p className="section-heading__subtitle">Confianza</p>
            <h2 id="testimonials-heading" className="section-heading__title">
              Historias de éxito
            </h2>
            <p className="section-heading__description">
              La satisfacción de nuestros clientes respalda cada decisión estratégica.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonialList.slice(0, 3).map((testimonial) => (
              <Testimonial key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      <FAQ items={faqList.slice(0, 4)} />

      <CTA
        title="¿Listo para potenciar tu próximo proyecto?"
        description="Agenda una consultoría gratuita con nuestro equipo para analizar viabilidad, inversión y roadmap de ejecución."
        primary={{ label: "Agendar consultoría", href: "/contacto" }}
        secondary={{ label: "Ver servicios", href: "/servicios" }}
      />

      <section className="container-responsive page-section" id="contacto" aria-labelledby="contact-heading">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 id="contact-heading" className="text-3xl font-semibold text-balance md:text-4xl">
              Cuéntanos sobre tu proyecto
            </h2>
            <p className="mt-4 text-muted-foreground">
              Nuestro equipo responderá en menos de 24 horas hábiles. También puedes escribirnos a {" "}
              <a className="hover:text-primary focus-ring" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>{" "}
              o llamarnos al {" "}
              <a className="hover:text-primary focus-ring" href={`tel:${site.contact.phone_e164}`}>
                {site.contact.phone}
              </a>
              .
            </p>
            <div className="mt-6 rounded-3xl border border-border/70 bg-card/70 p-6 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Horario de atención</p>
              <ul className="mt-4 space-y-2">
                {site.contact.schedule.map((item) => (
                  <li key={item.label} className="flex items-center justify-between">
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-3xl border border-border/70 bg-card/70 p-8 shadow-[var(--shadow-md)]">
            <ContactForm />
          </div>
        </div>
      </section>

      <Map
        title="Oficina principal"
        address={`${site.contact.city}, ${site.contact.country}`}
        iframeSrc="https://www.openstreetmap.org/export/embed.html?bbox=-74.07%2C4.60%2C-74.05%2C4.62&layer=mapnik"
      />
    </div>
    </>
  );
};

export default Home;

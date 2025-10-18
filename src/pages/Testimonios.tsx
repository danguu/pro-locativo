import testimonials from "@/data/testimonials.json";
import type { NavigationItem, Testimonial as TestimonialType } from "@/types/content";
import { Seo } from "@/components/Seo";
import { Hero } from "@/components/Hero";
import { Testimonial } from "@/components/Testimonial";

const testimonialList = testimonials as TestimonialType[];

const breadcrumbs: NavigationItem[] = [
  { id: "home", label: "Inicio", path: "/" },
  { id: "testimonios", label: "Testimonios" },
];

export const Testimonios = () => (
  <>
    <Seo
      title="Testimonios"
      description="Opiniones y testimonios de clientes que han desarrollado sus proyectos con Pro Locativo."
    />
    <div className="space-y-20">
      <Hero
      eyebrow="Confianza"
      title="Relaciones de largo plazo con resultados medibles"
      description="Clientes corporativos y familias nos eligen por la trazabilidad, transparencia y calidad de cada entrega."
      imageId="hero-testimonios"
      breadcrumbs={breadcrumbs}
    />

    <section className="container-responsive page-section" aria-labelledby="testimonial-grid">
      <div className="section-heading">
        <p className="section-heading__subtitle">Opiniones</p>
        <h2 id="testimonial-grid" className="section-heading__title">
          Historias reales
        </h2>
        <p className="section-heading__description">
          Experiencias de mantenimiento, remodelaciones y proyectos inmobiliarios ejecutados por nuestro equipo.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {testimonialList.map((testimonial) => (
          <Testimonial key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </section>
  </div>
  </>
);

export default Testimonios;

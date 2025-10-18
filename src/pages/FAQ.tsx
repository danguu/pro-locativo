import faqs from "@/data/faqs.json";
import type { FAQItem, NavigationItem } from "@/types/content";
import { Seo } from "@/components/Seo";
import { Hero } from "@/components/Hero";
import { FAQ as FAQList } from "@/components/FAQ";

const faqList = faqs as FAQItem[];

const breadcrumbs: NavigationItem[] = [
  { id: "home", label: "Inicio", path: "/" },
  { id: "faq", label: "Preguntas frecuentes" },
];

export const FAQ = () => (
  <>
    <Seo
      title="Preguntas frecuentes"
      description="Respuestas sobre servicios locativos, procesos de compra, garantías y financiación."
    />
    <div className="space-y-20">
      <Hero
      eyebrow="FAQ"
      title="Resolvemos tus preguntas antes de empezar"
      description="Información clara sobre procesos, tiempos, garantías y formas de financiación."
      imageId="hero-faq"
      breadcrumbs={breadcrumbs}
      ctas={[{ label: "Contactar asesor", href: "/contacto" }]}
    />

    <FAQList items={faqList} />
  </div>
  </>
);

export default FAQ;

import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { faqCategories } from "@/assets/content";
import { Accordion } from "@/components/ui/accordion";
import { FAQItem } from "@/components/cards/FAQItem";
import { Button } from "@/components/ui/button";

export const FAQ = () => (
  <DefaultLayout>
    <section className="gradient-hero py-20">
      <div className="mx-auto max-w-6xl space-y-6 px-6">
        <Breadcrumbs items={[{ label: "Preguntas frecuentes" }]} />
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">Preguntas frecuentes</h1>
          <p className="text-lg text-muted-foreground">
            Encuentra respuestas sobre nuestros servicios, procesos, garantías y tiempos de respuesta.
          </p>
        </div>
      </div>
    </section>
    <section className="bg-background py-16">
      <div className="mx-auto max-w-4xl space-y-10 px-6">
        {faqCategories.map((category, index) => (
          <div key={category.title} className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">{category.title}</h2>
            <Accordion type="single" collapsible className="space-y-3">
              {category.faqs.map((faq, faqIndex) => (
                <FAQItem key={faq.question} question={faq.question} answer={faq.answer} value={`${index}-${faqIndex}`} />
              ))}
            </Accordion>
          </div>
        ))}
        <div className="glass-effect rounded-2xl border border-border/40 p-8 text-center">
          <h3 className="text-2xl font-semibold text-foreground">¿Necesitas más información?</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Estamos listos para ayudarte y resolver tus dudas sobre mantenimiento, remodelación e instalaciones eléctricas.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <a href="/contacto">Contactar ahora</a>
            </Button>
            <Button asChild variant="outline">
              <a href="tel:+123456789">Llamar: +1 (234) 567-89</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  </DefaultLayout>
);

export default FAQ;

import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { faqCategories, contactChannels } from "@/assets/content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { toTelLink } from "@/lib/format";

export const FAQ = () => {
  return (
    <DefaultLayout>
      <section className="bg-slate-900 pb-16 pt-32 text-white">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Preguntas frecuentes" }]} />
          <div className="mt-6 max-w-3xl space-y-4">
            <h1 className="text-4xl font-semibold">Preguntas frecuentes</h1>
            <p className="text-lg text-slate-200">
              Encuentra respuestas sobre servicios, procesos, presupuestos y garantías Kolbing.
            </p>
          </div>
        </div>
      </section>
      <section className="-mt-12 bg-transparent pb-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 md:grid-cols-2">
            {faqCategories.map((category, categoryIndex) => (
              <div key={category.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
                <h2 className="text-2xl font-semibold text-slate-900">{category.title}</h2>
                <Accordion type="single" collapsible className="mt-6 space-y-4">
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem
                      key={`${categoryIndex}-${faqIndex}`}
                      value={`${categoryIndex}-${faqIndex}`}
                      className="overflow-hidden rounded-2xl border border-slate-200"
                    >
                      <AccordionTrigger className="px-5 py-3 text-left text-sm font-semibold text-slate-900">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-5 pb-5 text-sm text-slate-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-3xl border border-dashed border-primary/40 bg-primary/5 p-10 text-center">
            <h2 className="text-2xl font-semibold text-slate-900">¿No encontraste tu respuesta?</h2>
            <p className="mt-3 text-sm text-slate-600">
              Escríbenos y agendaremos una llamada para resolver todas tus preguntas.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild>
                <a href="/contacto">Contactar ahora</a>
              </Button>
              <Button asChild variant="outline">
                <a href={`tel:${toTelLink(contactChannels.phone)}`}>Llamar: {contactChannels.phone}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default FAQ;

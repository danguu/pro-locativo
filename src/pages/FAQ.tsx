import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BackToTop } from "@/components/ui/BackToTop";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
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
    title: "Pagos y Presupuesto",
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

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BackToTop />

      {/* Hero Section */}
      <section className="pt-32 pb-16 gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Preguntas Frecuentes" }]} />
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Preguntas Frecuentes</h1>
            <p className="text-xl text-muted-foreground">
              Encuentra respuestas a las preguntas más comunes sobre nuestros servicios, procesos y
              garantías.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20 bg-ink-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="animate-fade-in"
                style={{ animationDelay: `${categoryIndex * 0.1}s` }}
              >
                <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-primary">
                  {category.title}
                </h2>

                <Accordion type="single" collapsible className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`${categoryIndex}-${faqIndex}`}
                      className="glass-effect rounded-lg px-6 border-none"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-4">
                        <span className="font-medium pr-4">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center glass-effect rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-4">¿No encontraste tu respuesta?</h2>
            <p className="text-muted-foreground mb-6">
              Estamos aquí para ayudarte. Contáctanos directamente y resolveremos todas tus dudas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contacto"
                className="inline-flex items-center justify-center h-11 px-8 rounded-lg bg-gradient-primary text-white font-medium hover:opacity-90 transition-opacity shadow-glow-azul"
              >
                Contactar ahora
              </a>
              <a
                href="tel:+123456789"
                className="inline-flex items-center justify-center h-11 px-8 rounded-lg border-2 border-primary/20 bg-transparent text-foreground font-medium hover:bg-primary/10 hover:border-primary transition-all"
              >
                Llamar: +1 (234) 567-89
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;

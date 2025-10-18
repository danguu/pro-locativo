import type { FAQItem } from "@/types/content";

export interface FAQProps {
  items: FAQItem[];
}

export const FAQ = ({ items }: FAQProps) => (
  <section className="container-responsive page-section" aria-labelledby="faq-heading">
    <div className="section-heading">
      <p className="section-heading__subtitle">FAQ</p>
      <h2 id="faq-heading" className="section-heading__title">
        Preguntas frecuentes
      </h2>
      <p className="section-heading__description">
        Resolvemos las dudas más comunes para que tomes decisiones informadas.
      </p>
    </div>

    <div className="space-y-4">
      {items.map((faq) => (
        <details
          key={faq.id}
          className="group rounded-3xl border border-border/70 bg-card/70 p-6 transition-shadow focus-within:shadow-[var(--shadow-md)]"
        >
          <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-lg font-semibold text-foreground focus-ring">
            {faq.question}
            <span className="text-sm text-primary transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>{faq.answer}</p>
          </div>
        </details>
      ))}
    </div>
  </section>
);

export default FAQ;

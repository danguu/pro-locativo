import type { NavigationItem } from "@/types/content";
import { Seo } from "@/components/Seo";
import { Hero } from "@/components/Hero";
import { ContactForm } from "@/components/ContactForm";
import { Map } from "@/components/Map";
import siteData from "@/data/site.json";
import { Phone, Mail, Clock } from "lucide-react";

const breadcrumbs: NavigationItem[] = [
  { id: "home", label: "Inicio", path: "/" },
  { id: "contacto", label: "Contacto" },
];

const site = siteData;

export const Contacto = () => (
  <>
    <Seo
      title="Contacto"
      description="Comunícate con Pro Locativo para solicitar asesoría, cotizaciones y visitas a inmuebles."
    />
    <div className="space-y-20">
      <Hero
      eyebrow="Contacto"
      title="Conversemos sobre tu próximo proyecto"
      description="Agenda una reunión virtual o presencial. Nuestro equipo responde en menos de 24 horas hábiles."
      imageId="hero-contacto"
      breadcrumbs={breadcrumbs}
      ctas={[{ label: site.whatsapp.label, href: site.whatsapp.link, variant: "secondary" }]}
    />

    <section className="container-responsive page-section" aria-labelledby="contact-information">
      <div className="grid gap-12 lg:grid-cols-[1fr,1.1fr]">
        <div className="space-y-6">
          <h2 id="contact-information" className="text-3xl font-semibold text-balance">
            Información de contacto
          </h2>
          <p className="text-muted-foreground">
            Escríbenos, llámanos o agenda una videollamada. Estamos listos para ayudarte con propuestas a medida.
          </p>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p className="flex items-start gap-3">
              <Phone className="mt-1 h-4 w-4 text-primary" aria-hidden="true" />
              <span>
                <strong className="text-foreground">Teléfono:</strong>{" "}
                <a className="hover:text-primary focus-ring" href={`tel:${site.contact.phone_e164}`}>
                  {site.contact.phone}
                </a>
              </span>
            </p>
            <p className="flex items-start gap-3">
              <Mail className="mt-1 h-4 w-4 text-primary" aria-hidden="true" />
              <span>
                <strong className="text-foreground">Correo:</strong>{" "}
                <a className="hover:text-primary focus-ring" href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </a>
              </span>
            </p>
            <p className="flex items-start gap-3">
              <Clock className="mt-1 h-4 w-4 text-primary" aria-hidden="true" />
              <span>
                <strong className="text-foreground">Horario:</strong>{" "}
                {site.contact.schedule.map((item) => `${item.label}: ${item.value}`).join(" · ")}
              </span>
            </p>
          </div>
          <div className="rounded-3xl border border-border/70 bg-card/70 p-6 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Dirección:</strong> {site.contact.address}
            </p>
            <p className="mt-2">{site.contact.city}, {site.contact.country}</p>
          </div>
        </div>
        <div className="rounded-3xl border border-border/70 bg-card/70 p-8 shadow-[var(--shadow-md)]">
          <ContactForm />
        </div>
      </div>
    </section>

    <Map
      title="Encuéntranos"
      address={`${site.contact.city}, ${site.contact.country}`}
      iframeSrc="https://www.openstreetmap.org/export/embed.html?bbox=-74.07%2C4.60%2C-74.05%2C4.62&layer=mapnik"
    />
  </div>
  </>
);

export default Contacto;

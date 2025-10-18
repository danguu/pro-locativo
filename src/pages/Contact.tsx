import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { contactDetails } from "@/assets/content";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageCircle } from "lucide-react";

export const Contact = () => (
  <DefaultLayout>
    <section className="gradient-hero py-20">
      <div className="mx-auto max-w-6xl space-y-6 px-6">
        <Breadcrumbs items={[{ label: "Contacto" }]} />
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-bold text-foreground md:text-5xl">Contacta a Kolbing Like</h1>
          <p className="text-lg text-muted-foreground">
            Agenda una visita técnica o solicita una cotización personalizada. Respondemos en menos de 24 horas.
          </p>
        </div>
      </div>
    </section>
    <section className="bg-background py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.2fr_1fr]">
        <ContactForm />
        <div className="space-y-6">
          <Card className="border-border/60">
            <CardContent className="space-y-4 p-6">
              <h2 className="text-xl font-semibold text-foreground">Datos de contacto</h2>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" /> {contactDetails.phone}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" /> {contactDetails.email}
                </p>
                <p className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-primary" /> WhatsApp 24/7
                </p>
                <p>{contactDetails.address}</p>
                <p>{contactDetails.schedule}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <a href={`tel:${contactDetails.phone}`}>Llamar ahora</a>
                </Button>
                <Button asChild variant="outline">
                  <a href={contactDetails.whatsapp} target="_blank" rel="noreferrer">
                    Abrir WhatsApp
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="border-dashed border-primary/40">
            <CardContent className="space-y-4 p-6">
              <h3 className="text-lg font-semibold text-foreground">Cobertura</h3>
              <p className="text-sm text-muted-foreground">
                Atendemos proyectos en Bogotá, Medellín, Cali, Barranquilla y otras ciudades principales. Coordinamos despliegues nacionales para clientes corporativos.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  </DefaultLayout>
);

export default Contact;

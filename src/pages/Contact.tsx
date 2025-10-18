import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { contactChannels } from "@/assets/content";
import { ContactForm } from "@/components/forms/ContactForm";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { toTelLink } from "@/lib/format";

const contactItems = [
  {
    icon: Phone,
    label: "Teléfono",
    value: contactChannels.phone,
    href: `tel:${toTelLink(contactChannels.phone)}`,
  },
  {
    icon: Mail,
    label: "Correo",
    value: contactChannels.email,
    href: `mailto:${contactChannels.email}`,
  },
  {
    icon: MapPin,
    label: "Dirección",
    value: contactChannels.address,
  },
  {
    icon: Clock,
    label: "Horario",
    value: contactChannels.schedule,
  },
];

export const Contact = () => {
  return (
    <DefaultLayout>
      <section className="bg-slate-900 pb-16 pt-32 text-white">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Contacto" }]} />
          <div className="mt-6 max-w-3xl space-y-4">
            <h1 className="text-4xl font-semibold">Hablemos de tu proyecto</h1>
            <p className="text-lg text-slate-200">
              Agenda una visita técnica o solicita una cotización personalizada. Respondemos en menos de 24 horas.
            </p>
          </div>
        </div>
      </section>
      <section className="-mt-12 bg-transparent pb-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[1fr,1.5fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">
              <h2 className="text-2xl font-semibold text-slate-900">Información de contacto</h2>
              <p className="mt-3 text-sm text-slate-600">
                Estamos listos para acompañarte en proyectos de mantenimiento, remodelación o instalaciones eléctricas.
              </p>
              <ul className="mt-6 space-y-4 text-sm text-slate-700">
                {contactItems.map((item) => (
                  <li key={item.label} className="flex gap-4">
                    <item.icon className="mt-1 h-5 w-5 text-primary" aria-hidden />
                    <div>
                      <div className="font-semibold text-slate-900">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-slate-600 hover:text-primary">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-slate-600">{item.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default Contact;

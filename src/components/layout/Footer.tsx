import { Link } from "react-router-dom";
import { contactChannels, footerLinks, newsletterCopy } from "@/assets/content";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toTelLink } from "@/lib/format";

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-200">
      <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xl font-semibold">
              K
            </div>
            <div>
              <div className="text-lg font-semibold">Kolbing Like</div>
              <p className="text-sm text-slate-400">Soluciones locativas y mantenimiento profesional.</p>
            </div>
          </div>
          <p className="text-sm text-slate-400">
            Más de ocho años acompañando a empresas y hogares con servicios preventivos, remodelación estratégica e instalaciones eléctricas certificadas.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Compañía</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            {footerLinks.company.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Servicios</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            {footerLinks.services.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Newsletter</h3>
          <p className="text-sm text-slate-400">{newsletterCopy.description}</p>
          <form
            className="space-y-3"
            onSubmit={(event) => {
              event.preventDefault();
              const form = event.currentTarget;
              form.reset();
            }}
          >
            <Input type="email" required placeholder="tu@correo.com" className="bg-slate-900 text-slate-100" />
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Send className="mr-2 h-4 w-4" aria-hidden /> Suscribirme
            </Button>
          </form>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="container mx-auto flex flex-col gap-4 px-4 py-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <span className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4" aria-hidden />
              <a href={`tel:${toTelLink(contactChannels.phone)}`} className="hover:text-white">
                {contactChannels.phone}
              </a>
            </span>
            <span className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4" aria-hidden />
              <a href={`mailto:${contactChannels.email}`} className="hover:text-white">
                {contactChannels.email}
              </a>
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" aria-hidden />
              {contactChannels.address}
            </span>
          </div>
          <div className="flex flex-wrap gap-4">
            {footerLinks.legal.map((item) => (
              <Link key={item.href} to={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-4 text-xs text-slate-500">
          © {new Date().getFullYear()} Kolbing Like. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

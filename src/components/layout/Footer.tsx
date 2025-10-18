import { Link } from "react-router-dom";
import { footerLinks, newsletterCopy, contactDetails, socialLinks } from "@/assets/content";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { FormEvent } from "react";

const iconMap = {
  Facebook,
  Instagram,
  Linkedin
};

export const Footer = () => {
  const handleNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <footer className="bg-ink-2 text-muted-foreground" aria-labelledby="footer-heading">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-semibold text-foreground" id="footer-heading">
              Kolbing Like
            </h2>
            <p className="text-sm">
              Servicios locativos, remodelación e instalaciones eléctricas con enfoque corporativo y atención personalizada.
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Teléfono:</strong> {contactDetails.phone}
              </p>
              <p>
                <strong>Correo:</strong> {contactDetails.email}
              </p>
              <p>
                <strong>Dirección:</strong> {contactDetails.address}
              </p>
              <p>
                <strong>Horario:</strong> {contactDetails.schedule}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.icon as keyof typeof iconMap];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-primary/10"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-2">
            <div>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Compañía
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="hover:text-foreground focus-visible:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                Soporte
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                {footerLinks.support.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="hover:text-foreground focus-visible:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Newsletter
            </h3>
            <p className="mt-4 text-sm">{newsletterCopy.description}</p>
            <form className="mt-4 space-y-3" onSubmit={handleNewsletter}>
              <Input
                type="email"
                required
                placeholder={newsletterCopy.placeholder}
                aria-label="Correo para newsletter"
              />
              <Button type="submit" className="w-full">
                Suscribirme
              </Button>
            </form>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col gap-3 text-xs text-muted-foreground/80 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Kolbing Like. Todos los derechos reservados.</p>
          <div className="flex flex-wrap gap-4">
            {footerLinks.legal.map((link) => (
              <Link key={link.href} to={link.href} className="hover:text-foreground focus-visible:text-foreground">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

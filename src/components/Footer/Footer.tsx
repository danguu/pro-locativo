import siteData from "@/data/site.json";
import type { SiteData } from "@/types/content";
import navigation from "@/data/navigation.json";
import type { NavigationItem } from "@/types/content";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { trackCta } from "@/utils/analytics";

const site = siteData as SiteData;
const navItems = navigation as NavigationItem[];

const primaryLinks = navItems.filter((item) => !["contacto", "blog"].includes(item.id));
const secondaryLinks = navItems.filter((item) => ["blog", "contacto"].includes(item.id));

export const Footer = () => {
  return (
    <footer className="mt-24 bg-ink-2 text-foreground" aria-labelledby="footer-heading">
      <div className="container-responsive py-16">
        <div className="grid gap-12 lg:grid-cols-4" id="footer-heading">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground">
                PL
              </div>
              <div>
                <p className="text-lg font-semibold">{site.brand.name}</p>
                <p className="text-sm text-muted-foreground">{site.brand.tagline}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {site.contact.address}
            </p>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>
                Teléfono: {" "}
                <a className="hover:text-primary focus-ring" href={`tel:${site.contact.phone_e164}`}>
                  {site.contact.phone}
                </a>
              </p>
              <p>
                Correo: {" "}
                <a className="hover:text-primary focus-ring" href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </a>
              </p>
            </div>
            <Button
              asChild
              size="sm"
              className="btn-primary"
              onClick={() => trackCta("Footer WhatsApp", site.whatsapp.link)}
            >
              <a href={site.whatsapp.link} target="_blank" rel="noreferrer">
                {site.whatsapp.label}
              </a>
            </Button>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Navegación</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {primaryLinks.map((item) => (
                <li key={item.id}>
                  <Link className="hover:text-primary focus-ring" to={item.path}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Recursos</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {secondaryLinks.map((item) => (
                <li key={item.id}>
                  <Link className="hover:text-primary focus-ring" to={item.path}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a className="hover:text-primary focus-ring" href={site.legal.privacy}>
                  Aviso de privacidad
                </a>
              </li>
              <li>
                <a className="hover:text-primary focus-ring" href={site.legal.terms}>
                  Términos y condiciones
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Horario</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {site.contact.schedule.map((item) => (
                <li key={item.label} className="flex justify-between gap-4">
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Síguenos</h4>
              <ul className="mt-3 flex flex-wrap gap-3 text-sm">
                {Object.entries(site.social).map(([network, url]) => (
                  <li key={network}>
                    <a className="hover:text-primary focus-ring capitalize" href={url} target="_blank" rel="noreferrer">
                      {network}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.brand.legal_name}. Todos los derechos reservados.</p>
          <p>NIT: {site.legal.nit}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

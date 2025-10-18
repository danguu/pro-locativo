import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import siteData from "@/data/site.json";
import type { SiteData } from "@/types/content";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Navbar } from "@/components/Navbar/Navbar";
import { trackCta } from "@/utils/analytics";

const site = siteData as SiteData;

export const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleWhatsApp = () => {
    trackCta("Header WhatsApp", site.whatsapp.link);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background,backdrop-filter] duration-300 ${
        isScrolled ? "glass-panel backdrop-blur-xl" : "bg-background/70"
      }`}
    >
      <a href="#contenido" className="sr-only sr-only-focusable">
        Saltar al contenido principal
      </a>
      <div className="container-responsive flex h-20 items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-3" aria-label="Inicio">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground shadow-glow-primary">
            PL
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold">{site.brand.name}</span>
            <span className="text-xs text-muted-foreground">{site.brand.tagline}</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          <Navbar />
          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              className="btn-primary"
              onClick={handleWhatsApp}
            >
              <a href={site.whatsapp.link} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link to="/contacto">Agendar cita</Link>
            </Button>
          </div>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/70 lg:hidden focus-ring"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label="Abrir menú"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`lg:hidden border-t border-border/60 transition-all duration-200 ${
          mobileOpen ? "max-h-[480px] opacity-100" : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        <div className="container-responsive py-6">
          <Navbar orientation="vertical" onNavigate={() => setMobileOpen(false)} />
          <div className="mt-6 flex flex-col gap-3">
            <Button asChild className="btn-primary" onClick={handleWhatsApp}>
              <a href={site.whatsapp.link} target="_blank" rel="noreferrer">
                {site.whatsapp.label}
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contacto">Agendar cita</Link>
            </Button>
            <div className="rounded-2xl border border-border/80 bg-card/60 p-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Contáctanos</p>
              <p className="mt-2">
                <a className="hover:text-primary focus-ring" href={`tel:${site.contact.phone_e164}`}>
                  {site.contact.phone}
                </a>
              </p>
              <p>
                <a className="hover:text-primary focus-ring" href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

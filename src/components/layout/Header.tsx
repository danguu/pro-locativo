import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { navLinks, contactChannels } from "@/assets/content";
import { toTelLink } from "@/lib/format";
import { DesktopNav } from "@/components/nav/DesktopNav";
import { MobileDrawer } from "@/components/nav/MobileDrawer";
import { Button } from "@/components/ui/button";
import { Phone, Menu, Mail } from "lucide-react";

export const Header = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Saltar al contenido
      </a>
      <div className="bg-slate-900 text-slate-100">
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-2 text-sm">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4" aria-hidden />
              <a href={`tel:${toTelLink(contactChannels.phone)}`} className="hover:underline">
                {contactChannels.phone}
              </a>
            </span>
            <span className="hidden md:inline-flex items-center gap-2">
              <Mail className="h-4 w-4" aria-hidden />
              <a href={`mailto:${contactChannels.email}`} className="hover:underline">
                {contactChannels.email}
              </a>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs text-slate-300">{contactChannels.schedule}</span>
            <Button asChild size="sm" variant="secondary" className="bg-emerald-500 text-white hover:bg-emerald-400">
              <Link to="/contacto">Agendar visita</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="container mx-auto flex items-center justify-between gap-6 px-4 py-4">
          <Link to="/" className="flex items-center gap-3" aria-label="Kolbing inicio">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold">
              K
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold text-slate-900">Kolbing Like</span>
              <span className="text-xs text-slate-500">Servicios locativos</span>
            </div>
          </Link>
          <div className="hidden lg:block">
            <DesktopNav currentPath={location.pathname} items={navLinks} />
          </div>
          <div className="flex items-center gap-3">
            <Button asChild className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/contacto">Contáctanos</Link>
            </Button>
            <button
              type="button"
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-100 lg:hidden",
                mobileOpen && "bg-slate-100",
              )}
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <MobileDrawer open={mobileOpen} onOpenChange={setMobileOpen} items={navLinks} />
    </header>
  );
};

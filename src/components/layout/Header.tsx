import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { topBarContent } from "@/assets/content";
import { DesktopNav } from "@/components/nav/DesktopNav";
import { MobileDrawer } from "@/components/nav/MobileDrawer";
import { cn } from "@/lib/utils";

export const Header = () => {
  const { pathname } = useLocation();
  const isDarkBackground = pathname === "/";

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="bg-primary text-primary-foreground text-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <a href={`tel:${topBarContent.phone}`} className="hover:underline focus-visible:underline">
              Tel: {topBarContent.phone}
            </a>
            <a href={`mailto:${topBarContent.email}`} className="hover:underline focus-visible:underline">
              {topBarContent.email}
            </a>
          </div>
          <Button asChild size="sm" variant="secondary" className="hidden sm:inline-flex">
            <Link to={topBarContent.cta.href}>{topBarContent.cta.label}</Link>
          </Button>
        </div>
      </div>
      <div className="border-b border-border/50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2" aria-label="Inicio Kolbing Like">
            <span
              className={cn(
                "rounded-lg px-3 py-1 text-lg font-semibold tracking-tight",
                isDarkBackground ? "gradient-secondary text-ink" : "bg-primary/10"
              )}
            >
              Kolbing Like
            </span>
            <span className="hidden text-sm font-medium text-muted-foreground sm:inline">
              Soluciones locativas y mantenimiento
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <DesktopNav />
            <Button asChild className="hidden lg:inline-flex">
              <Link to="/contacto">Contáctanos</Link>
            </Button>
            <MobileDrawer />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

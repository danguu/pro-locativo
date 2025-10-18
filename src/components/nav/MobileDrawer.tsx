import { useState } from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { navItems } from "@/lib/navigation";

export const MobileDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="lg:hidden inline-flex items-center justify-center rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-primary/10"
        aria-label="Abrir menú de navegación"
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:w-[420px] px-0">
        <div className="px-6 py-6 space-y-6 h-full overflow-y-auto">
          <div>
            <span className="text-xl font-semibold">Kolbing Like</span>
            <p className="text-sm text-muted-foreground mt-1">
              Servicios locativos, remodelación e instalaciones eléctricas.
            </p>
          </div>
          <nav aria-label="Menú móvil" className="space-y-4">
            <Accordion type="multiple" className="space-y-2">
              {navItems.map((item) => (
                <AccordionItem key={item.label} value={item.label} className="border border-border/40 rounded-lg">
                  {item.children ? (
                    <>
                      <AccordionTrigger className="px-4 text-base font-medium">
                        {item.label}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 space-y-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className="block text-sm rounded-md px-3 py-2 hover:bg-primary/10"
                            onClick={() => setOpen(false)}
                          >
                            <span className="font-medium block">{child.label}</span>
                            {child.description && (
                              <span className="text-muted-foreground text-xs">
                                {child.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </AccordionContent>
                    </>
                  ) : (
                    <Link
                      to={item.href ?? "#"}
                      className="block rounded-lg px-4 py-3 text-base font-medium hover:bg-primary/10"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          </nav>
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link to="/contacto" onClick={() => setOpen(false)}>
                Contáctanos
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/proyectos" onClick={() => setOpen(false)}>
                Ver proyectos
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileDrawer;

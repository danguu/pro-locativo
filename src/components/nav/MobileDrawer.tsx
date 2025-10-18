import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { NavLink } from "@/assets/content";
import { Button } from "@/components/ui/button";

interface MobileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: NavLink[];
}

export const MobileDrawer = ({ open, onOpenChange, items }: MobileDrawerProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex flex-col gap-6 bg-white">
        <SheetHeader>
          <SheetTitle className="text-left text-lg font-semibold text-slate-900">Navegación</SheetTitle>
        </SheetHeader>
        <nav className="flex-1 overflow-y-auto" aria-label="Menú principal móvil">
          <Accordion type="single" collapsible className="space-y-2">
            {items.map((item) => {
              if (!item.children) {
                return (
                  <div key={item.href}>
                    <Link
                      to={item.href}
                      className="block rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 hover:border-primary/40 hover:bg-primary/5"
                      onClick={() => onOpenChange(false)}
                    >
                      {item.label}
                    </Link>
                  </div>
                );
              }

              return (
                <AccordionItem key={item.href} value={item.href} className="overflow-hidden rounded-lg border border-slate-200">
                  <AccordionTrigger className="px-4 py-3 text-left text-sm font-medium text-slate-700">
                    {item.label}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-sm">
                    <div className="mb-3 text-xs text-slate-500">{item.description}</div>
                    <ul className="space-y-2">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            to={child.href}
                            className="block rounded-md border border-transparent px-3 py-2 text-sm text-slate-700 hover:border-primary/40 hover:bg-primary/5"
                            onClick={() => onOpenChange(false)}
                          >
                            <div className="font-medium">{child.label}</div>
                            {child.description && <p className="text-xs text-slate-500">{child.description}</p>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </nav>
        <div className="space-y-3">
          <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/contacto" onClick={() => onOpenChange(false)}>
              Contáctanos
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link to="/proyectos" onClick={() => onOpenChange(false)}>
              Ver proyectos
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

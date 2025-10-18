import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { navItems } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export const MegaMenu = () => (
  <>
    {navItems.map((item) => (
      <NavigationMenuItem key={item.label}>
        {item.children ? (
          <>
            <NavigationMenuTrigger className="text-base font-medium focus-visible:ring-2 focus-visible:ring-offset-2">
              {item.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="p-6 w-[420px] md:w-[520px]">
              <div className="grid gap-4">
                {item.children.map((child) => (
                  <NavigationMenuLink asChild key={child.label}>
                    <Link
                      to={child.href}
                      className="group rounded-lg border border-transparent px-4 py-3 hover:border-primary/40 hover:bg-primary/10 transition-all"
                    >
                      <div className="font-semibold text-sm md:text-base flex items-center justify-between">
                        {child.label}
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                      </div>
                      {child.description && (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {child.description}
                        </p>
                      )}
                    </Link>
                  </NavigationMenuLink>
                ))}
              </div>
              {item.featured && (
                <div className="mt-6">
                  <Button asChild className="w-full">
                    <Link to={item.featured.href}>{item.featured.label}</Link>
                  </Button>
                </div>
              )}
            </NavigationMenuContent>
          </>
        ) : (
          <NavigationMenuLink asChild>
            <Link
              to={item.href ?? "#"}
              className="text-base font-medium px-3 py-2 rounded-md hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              {item.label}
            </Link>
          </NavigationMenuLink>
        )}
      </NavigationMenuItem>
    ))}
  </>
);

export default MegaMenu;

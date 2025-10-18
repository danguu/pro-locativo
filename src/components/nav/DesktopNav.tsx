import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import type { NavLink } from "@/assets/content";
import { cn } from "@/lib/utils";

interface DesktopNavProps {
  items: NavLink[];
  currentPath: string;
}

export const DesktopNav = ({ items, currentPath }: DesktopNavProps) => {
  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        {items.map((item) => {
          const isActive = currentPath === item.href;

          if (!item.children) {
            return (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild active={isActive}>
                  <Link
                    to={item.href}
                    className={cn(
                      "rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900",
                      isActive && "bg-slate-100 text-slate-900",
                    )}
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          }

          return (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuTrigger className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                {item.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="w-[500px] p-6">
                <div className="grid gap-4">
                  <Link to={item.href} className="rounded-lg bg-slate-900 p-4 text-white transition hover:bg-slate-800">
                    <div className="text-sm font-semibold">{item.label}</div>
                    <p className="mt-1 text-sm opacity-80">{item.description}</p>
                  </Link>
                  <div className="grid gap-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="rounded-lg border border-slate-100 p-4 transition hover:border-primary/40 hover:bg-primary/5"
                      >
                        <div className="text-sm font-medium text-slate-900">{child.label}</div>
                        {child.description && <p className="mt-1 text-xs text-slate-500">{child.description}</p>}
                      </Link>
                    ))}
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

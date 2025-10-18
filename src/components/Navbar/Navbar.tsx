import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import navigation from "@/data/navigation.json";
import type { NavigationItem } from "@/types/content";

const navItems = navigation as NavigationItem[];

export interface NavbarProps {
  onNavigate?: () => void;
  orientation?: "horizontal" | "vertical";
}

export const Navbar = ({ onNavigate, orientation = "horizontal" }: NavbarProps) => {
  const items = useMemo(() => navItems.filter((item) => item.path !== "/404"), []);

  return (
    <nav aria-label="Navegación principal">
      <ul
        className={
          orientation === "horizontal"
            ? "flex items-center gap-1"
            : "flex flex-col items-start gap-2"
        }
      >
        {items.map((item) => (
          <li key={item.id}>
            <NavLink
              to={item.path}
              onClick={onNavigate}
              className={({ isActive }) =>
                [
                  "inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-ring",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-glow-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

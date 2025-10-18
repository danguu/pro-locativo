import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => (
  <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
    <ol className="flex flex-wrap items-center gap-2">
      <li>
        <Link to="/" className="hover:text-foreground focus-visible:text-foreground">
          Inicio
        </Link>
      </li>
      {items.map((item, index) => (
        <li key={`${item.label}-${index}`} className="flex items-center gap-2">
          <span aria-hidden="true">/</span>
          {item.href ? (
            <Link to={item.href} className="hover:text-foreground focus-visible:text-foreground">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumbs;

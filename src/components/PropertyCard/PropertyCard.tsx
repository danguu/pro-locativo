import { Link } from "react-router-dom";
import type { Property } from "@/types/content";
import { getImageAlt, getPlaceholderSrc } from "@/lib/images";
import { Button } from "@/components/ui/button";

export interface PropertyCardProps {
  property: Property;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const imageSrc = getPlaceholderSrc(property.imageId);
  const isPlaceholder = imageSrc.includes("/placeholders/");
  const alt = getImageAlt(property.imageId);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card/70 shadow-[var(--shadow-lg)]">
      <div className="relative h-56 overflow-hidden">
        <img
          src={imageSrc}
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
          data-placeholder={isPlaceholder ? "true" : undefined}
        />
        <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground">
          {property.estatus}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground">{property.nombre}</h3>
          <p className="text-sm text-muted-foreground">{property.ubicacion}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          {property.tipologias.map((tipologia) => (
            <span key={tipologia} className="pill bg-muted/40">
              {tipologia}
            </span>
          ))}
        </div>
        <dl className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <dt className="font-medium text-foreground">Área desde</dt>
            <dd>{property.area_desde}</dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Precio desde</dt>
            <dd>{property.precio_desde}</dd>
          </div>
        </dl>
        <ul className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          {property.amenidades.slice(0, 4).map((amenidad) => (
            <li key={amenidad} className="rounded-xl bg-muted/30 px-3 py-2">
              {amenidad}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between gap-3">
          <Button asChild size="sm" className="btn-primary">
            <Link to={`/proyectos/${property.slug}`}>Ver detalle</Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link to="/contacto">Agendar visita</Link>
          </Button>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;

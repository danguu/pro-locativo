import properties from "@/data/properties.json";
import siteData from "@/data/site.json";
import type { Property, NavigationItem, SiteData } from "@/types/content";
import { Seo } from "@/components/Seo";
import { Hero } from "@/components/Hero";
import { PropertyCard } from "@/components/PropertyCard";
import { createPropertyGraph } from "@/utils/schema";

const propertyList = properties as Property[];
const site = siteData as SiteData;
const structuredData = createPropertyGraph(propertyList, site, "inmuebles");

const breadcrumbs: NavigationItem[] = [
  { id: "home", label: "Inicio", path: "/" },
  { id: "inmuebles", label: "Inmuebles" },
];

export const Inmuebles = () => (
  <>
    <Seo
      title="Inmuebles"
      description="Inventario actualizado de inmuebles listos para renta o venta gestionados por Pro Locativo."
    />
    <div className="space-y-20">
      <Hero
        eyebrow="Inventario"
        title="Inmuebles listos para ocupar"
        description="Portafolio actualizado de propiedades listas para renta o venta con acompañamiento integral."
        imageId="hero-inmuebles"
        breadcrumbs={breadcrumbs}
        ctas={[{ label: "Filtrar por asesor", href: "/contacto", variant: "secondary" }]}
      />

      <section className="container-responsive page-section" aria-labelledby="inventory-list">
        <div className="section-heading">
          <p className="section-heading__subtitle">Disponibilidad</p>
          <h2 id="inventory-list" className="section-heading__title">
            Catálogo actualizado
          </h2>
          <p className="section-heading__description">
            Encuentra espacios corporativos, comerciales y residenciales con especificaciones claras y actualizadas.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {propertyList.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
    </div>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }}
    />
  </>
);

export default Inmuebles;

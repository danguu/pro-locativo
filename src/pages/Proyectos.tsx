import properties from "@/data/properties.json";
import siteData from "@/data/site.json";
import type { Property, NavigationItem, SiteData } from "@/types/content";
import { Seo } from "@/components/Seo";
import { Hero } from "@/components/Hero";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPropertyGraph } from "@/utils/schema";

const propertyList = properties as Property[];
const site = siteData as SiteData;
const structuredData = createPropertyGraph(propertyList, site, "proyectos");

const breadcrumbs: NavigationItem[] = [
  { id: "home", label: "Inicio", path: "/" },
  { id: "proyectos", label: "Proyectos" },
];

export const Proyectos = () => (
  <>
    <Seo
      title="Proyectos"
      description="Portafolio de proyectos inmobiliarios en preventa, construcción y entrega inmediata gestionados por Pro Locativo."
    />
    <div className="space-y-20">
      <Hero
        eyebrow="Portafolio"
        title="Proyectos que elevan el valor del entorno"
        description="Selecciona el inmueble ideal según tu estrategia: preventa, renta corporativa o inversión patrimonial."
        imageId="hero-proyectos"
        breadcrumbs={breadcrumbs}
        ctas={[{ label: "Asesoría personalizada", href: "/contacto" }]}
      />

      <section className="container-responsive page-section" aria-labelledby="project-list">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="project-list" className="text-3xl font-semibold text-balance">
              Portafolio disponible
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Filtra por tipología o zona para encontrar el proyecto que responde a tus objetivos de negocio.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/inmuebles">Ver inmuebles disponibles</Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-8 xl:grid-cols-3">
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

export default Proyectos;

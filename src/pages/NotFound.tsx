import { Seo } from "@/components/Seo";
import { Hero } from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const NotFound = () => (
  <>
    <Seo
      title="Error 404"
      description="La página que buscas no existe. Explora Pro Locativo para encontrar información relevante."
    />
    <div className="space-y-20">
      <Hero
      eyebrow="404"
      title="Página no encontrada"
      description="La ruta a la que intentas acceder no existe o ha sido movida."
      imageId="hero-home"
      ctas={[{ label: "Volver al inicio", href: "/" }]}
    />
    <section className="container-responsive pb-24 text-center">
      <p className="text-muted-foreground">
        Si necesitas ayuda para encontrar un contenido específico, contáctanos y te guiaremos.
      </p>
      <div className="mt-6 flex justify-center gap-4">
        <Button asChild>
          <Link to="/contacto">Hablar con un asesor</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/proyectos">Ver proyectos</Link>
        </Button>
      </div>
    </section>
  </div>
  </>
);

export default NotFound;

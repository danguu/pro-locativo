import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const NotFound = () => (
  <DefaultLayout>
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">404</p>
      <h1 className="text-4xl font-bold text-foreground md:text-5xl">Página no encontrada</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        La página que buscas no está disponible. Revisa la dirección o regresa al inicio para continuar explorando Kolbing Like.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link to="/">Volver al inicio</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/contacto">Contactar equipo</Link>
        </Button>
      </div>
    </section>
  </DefaultLayout>
);

export default NotFound;

import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <DefaultLayout>
      <section className="flex h-full flex-col items-center justify-center bg-slate-900 py-32 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Error 404</p>
          <h1 className="mt-4 text-4xl font-semibold">No encontramos la página solicitada</h1>
          <p className="mt-3 text-slate-200">
            Verifica la URL o regresa al inicio para seguir explorando servicios y proyectos Kolbing.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-white text-slate-900 hover:bg-white/90">
              <Link to="/">Ir al inicio</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/40 text-white hover:bg-white/10">
              <Link to="/contacto">Contactar al equipo</Link>
            </Button>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default NotFound;

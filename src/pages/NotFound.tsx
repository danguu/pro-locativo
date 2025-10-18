import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl animate-fade-in-up">
          <div className="mb-8">
            <div className="text-9xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              404
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Página no encontrada
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="hero">
              <Link to="/">
                <Home className="mr-2 h-5 w-5" />
                Volver al inicio
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/servicios">
                <Search className="mr-2 h-5 w-5" />
                Ver servicios
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;

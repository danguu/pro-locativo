import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Home from "@/pages/Home";
import Proyectos from "@/pages/Proyectos";
import Inmuebles from "@/pages/Inmuebles";
import Servicios from "@/pages/Servicios";
import Nosotros from "@/pages/Nosotros";
import Testimonios from "@/pages/Testimonios";
import FAQ from "@/pages/FAQ";
import Blog from "@/pages/Blog";
import Contacto from "@/pages/Contacto";
import NotFound from "@/pages/NotFound";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/ui/BackToTop";

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <BackToTop />
          <main id="contenido" className="pt-24">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/proyectos" element={<Proyectos />} />
              <Route path="/inmuebles" element={<Inmuebles />} />
              <Route path="/servicios" element={<Servicios />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/testimonios" element={<Testimonios />} />
              <Route path="/preguntas-frecuentes" element={<FAQ />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

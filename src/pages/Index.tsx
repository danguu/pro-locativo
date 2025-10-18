import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/ui/BackToTop";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Wrench, Home, Zap, TrendingUp, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-main.jpg";
import serviceMaintenanceImg from "@/assets/service-maintenance.jpg";
import serviceRenovationImg from "@/assets/service-renovation.jpg";
import serviceElectricalImg from "@/assets/service-electrical.jpg";
import buildingImg from "@/assets/building-management.jpg";

const services = [
  {
    icon: Wrench,
    title: "Mantenimiento",
    description: "Servicios preventivos y correctivos para mantener tus instalaciones en perfecto estado.",
    link: "/servicios",
  },
  {
    icon: Home,
    title: "Remodelación",
    description: "Transformamos espacios con diseños modernos y funcionales que superan expectativas.",
    link: "/servicios",
  },
  {
    icon: Zap,
    title: "Instalaciones Eléctricas",
    description: "Instalaciones certificadas y seguras que cumplen con todas las normativas vigentes.",
    link: "/servicios",
  },
];

const kpis = [
  { value: 500, label: "Proyectos Completados", suffix: "+" },
  { value: 98, label: "Satisfacción del Cliente", suffix: "%" },
  { value: 8, label: "Años de Experiencia", suffix: "+" },
];

const gallery = [
  { image: serviceMaintenanceImg, alt: "Proyecto de mantenimiento" },
  { image: serviceRenovationImg, alt: "Proyecto de remodelación" },
  { image: serviceElectricalImg, alt: "Instalación eléctrica" },
];

const Index = () => {
  const [counts, setCounts] = useState(kpis.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const kpisRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (kpisRef.current) {
      observer.observe(kpisRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    kpis.forEach((kpi, index) => {
      let currentStep = 0;
      const increment = kpi.value / steps;

      const timer = setInterval(() => {
        currentStep++;
        const newValue = Math.min(Math.floor(increment * currentStep), kpi.value);
        
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = newValue;
          return newCounts;
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BackToTop />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 gradient-hero opacity-95" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
              Servicios Locativos y Mantenimiento Profesional
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Más de 8 años brindando soluciones integrales para empresas y hogares con enfoque
              profesional y garantía de calidad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="hero">
                <Link to="/servicios">Ver servicios</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contacto">Solicitar cotización</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-12 bg-ink-2 border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground mb-8">
            Clientes que confían en nosotros
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-50">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-16 bg-gradient-hero rounded-lg flex items-center justify-center"
              >
                <span className="text-2xl font-bold text-muted-foreground">Cliente {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestras Soluciones</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Servicios integrales diseñados para cubrir todas tus necesidades de mantenimiento y
              remodelación
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="hover:shadow-glow-azul transition-all hover:-translate-y-1 animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="link" className="p-0">
                    <Link to={service.link}>Más información →</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Management Section */}
      <section className="py-20 bg-ink-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Gestión Integral</h2>
              <p className="text-muted-foreground mb-6">
                Nos encargamos de todo el proceso, desde la planificación hasta la ejecución final.
                Nuestro equipo garantiza resultados excepcionales en cada proyecto.
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  <span>Evaluación técnica sin costo inicial</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  <span>Presupuestos transparentes y detallados</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  <span>Cumplimiento de plazos establecidos</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  <span>Garantía extendida en todos los servicios</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  <span>Seguimiento post-servicio personalizado</span>
                </div>
              </div>
            </div>
            <div className="animate-scale-in">
              <img
                src={buildingImg}
                alt="Gestión integral de proyectos"
                className="rounded-lg shadow-lg w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* KPIs */}
      <section className="py-20 bg-background" ref={kpisRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {kpis.map((kpi, index) => (
              <Card
                key={index}
                className="text-center animate-counter"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-8 pb-6">
                  <div className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                    {counts[index]}
                    {kpi.suffix}
                  </div>
                  <p className="text-muted-foreground">{kpi.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-ink-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nuestros Proyectos</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ejemplos de trabajos realizados con los más altos estándares de calidad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gallery.map((item, index) => (
              <div
                key={index}
                className="aspect-square overflow-hidden rounded-lg group cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center glass-effect rounded-2xl p-8 md:p-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para comenzar?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Solicita una cotización sin compromiso y descubre cómo podemos transformar tus espacios
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="hero">
                <Link to="/contacto">Solicitar cotización</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/nosotros">Conocer más</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
              <div className="flex items-start space-x-3">
                <TrendingUp className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <div className="font-semibold mb-1">Resultados garantizados</div>
                  <p className="text-sm text-muted-foreground">
                    Calidad certificada en cada proyecto
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <div className="font-semibold mb-1">Equipo profesional</div>
                  <p className="text-sm text-muted-foreground">
                    Técnicos certificados y capacitados
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Calendar className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <div className="font-semibold mb-1">Atención 24/7</div>
                  <p className="text-sm text-muted-foreground">Emergencias en cualquier momento</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

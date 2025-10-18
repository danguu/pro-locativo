import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BackToTop } from "@/components/ui/BackToTop";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "María González",
    role: "Gerente de Operaciones",
    company: "Empresa Tech Solutions",
    content:
      "Excelente servicio. El equipo de Kolbing Like realizó el mantenimiento de nuestras oficinas de manera profesional y puntual. Totalmente recomendados.",
    rating: 5,
  },
  {
    id: 2,
    name: "Carlos Ramírez",
    role: "Propietario",
    company: "Residencial Los Álamos",
    content:
      "La remodelación de nuestro hogar superó nuestras expectativas. Atención al detalle excepcional y cumplimiento de los plazos establecidos.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ana Martínez",
    role: "Directora de Facilities",
    company: "Corporativo Central",
    content:
      "Trabajamos con ellos desde hace 2 años en el mantenimiento de nuestros edificios. Su profesionalismo y compromiso son sobresalientes.",
    rating: 5,
  },
  {
    id: 4,
    name: "Roberto Silva",
    role: "Administrador",
    company: "Centro Comercial Plaza",
    content:
      "Las instalaciones eléctricas fueron realizadas con los más altos estándares de calidad. Equipo técnico muy capacitado.",
    rating: 5,
  },
  {
    id: 5,
    name: "Laura Torres",
    role: "Propietaria",
    company: "Apartamento Familiar",
    content:
      "Resolvieron una emergencia eléctrica en tiempo récord. Su servicio 24/7 es invaluable. Gracias por la rapidez y profesionalismo.",
    rating: 5,
  },
];

const Testimonios = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BackToTop />

      {/* Hero Section */}
      <section className="pt-32 pb-16 gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Testimonios" }]} />
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Testimonios</h1>
            <p className="text-xl text-muted-foreground">
              Lo que nuestros clientes dicen sobre nosotros. Su confianza es nuestro mayor logro.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="py-20 bg-ink-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Main Testimonial */}
              <Card className="overflow-hidden animate-fade-in">
                <CardContent className="p-8 md:p-12">
                  <div className="mb-6">
                    <Quote className="w-12 h-12 text-primary/20" />
                  </div>

                  <blockquote className="text-lg md:text-xl mb-8 leading-relaxed">
                    "{testimonials[currentIndex].content}"
                  </blockquote>

                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xl font-bold">
                      {testimonials[currentIndex].name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-lg">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonials[currentIndex].role}
                      </div>
                      <div className="text-sm text-primary">
                        {testimonials[currentIndex].company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation Buttons */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 -ml-6 hidden md:block">
                <Button
                  onClick={goToPrevious}
                  size="icon"
                  variant="outline"
                  className="rounded-full"
                  aria-label="Testimonio anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 right-0 -mr-6 hidden md:block">
                <Button
                  onClick={goToNext}
                  size="icon"
                  variant="outline"
                  className="rounded-full"
                  aria-label="Siguiente testimonio"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="flex md:hidden justify-center space-x-4 mt-6">
              <Button
                onClick={goToPrevious}
                size="icon"
                variant="outline"
                aria-label="Testimonio anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                onClick={goToNext}
                size="icon"
                variant="outline"
                aria-label="Siguiente testimonio"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-8" role="tablist">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-primary w-8" : "bg-muted"
                  }`}
                  aria-label={`Ir al testimonio ${index + 1}`}
                  aria-selected={index === currentIndex}
                  role="tab"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Todos los Testimonios</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className="hover:shadow-lg transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-primary/20 mb-4" />
                  <p className="text-sm mb-4 line-clamp-4">{testimonial.content}</p>
                  <div className="pt-4 border-t border-border">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs text-primary">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Testimonios;

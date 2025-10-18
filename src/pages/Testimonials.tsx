import { useEffect, useState } from "react";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { testimonials } from "@/assets/content";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, [isPlaying]);

  const goTo = (nextIndex: number) => {
    setIsPlaying(false);
    setIndex((nextIndex + testimonials.length) % testimonials.length);
  };

  return (
    <DefaultLayout>
      <section className="bg-slate-900 pb-16 pt-32 text-white">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Testimonios" }]} />
          <div className="mt-6 max-w-3xl space-y-4">
            <h1 className="text-4xl font-semibold">Lo que dicen nuestros clientes</h1>
            <p className="text-lg text-slate-200">
              Experiencias reales de administradores, propietarios y gerentes de operaciones que confían en Kolbing.
            </p>
          </div>
        </div>
      </section>
      <section className="-mt-12 bg-transparent pb-20">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <TestimonialCard testimonial={testimonials[index]} isActive />
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Anterior testimonio"
                  onClick={() => goTo(index - 1)}
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Siguiente testimonio"
                  onClick={() => goTo(index + 1)}
                >
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </Button>
                <Button variant="ghost" onClick={() => setIsPlaying((prev) => !prev)}>
                  {isPlaying ? "Pausar" : "Reanudar"}
                </Button>
              </div>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, testimonialIndex) => (
                <button
                  key={testimonial.id}
                  type="button"
                  onClick={() => goTo(testimonialIndex)}
                  className={cn(
                    "text-left transition",
                    index === testimonialIndex ? "opacity-100" : "opacity-60 hover:opacity-100",
                  )}
                  aria-current={index === testimonialIndex}
                >
                  <TestimonialCard testimonial={testimonial} isActive={index === testimonialIndex} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default Testimonials;

import { useEffect, useState } from "react";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { testimonials } from "@/assets/content";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const current = testimonials[index];

  return (
    <DefaultLayout>
      <section className="gradient-hero py-20">
        <div className="mx-auto max-w-6xl space-y-6 px-6">
          <Breadcrumbs items={[{ label: "Testimonios" }]} />
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-bold text-foreground md:text-5xl">Testimonios Kolbing</h1>
            <p className="text-lg text-muted-foreground">
              Historias reales de clientes empresariales y residenciales que confían en Kolbing Like.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-background py-16">
        <div className="mx-auto max-w-4xl px-6">
          <Card className="border-border/60">
            <CardContent className="space-y-6 p-8 md:p-12">
              <Quote className="h-10 w-10 text-primary/40" aria-hidden="true" />
              <p className="text-xl leading-relaxed text-foreground">“{current.content}”</p>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-lg font-semibold text-primary">
                  {current.name.charAt(0)}
                </div>
                <div>
                  <p className="text-base font-semibold text-foreground">{current.name}</p>
                  <p className="text-sm text-muted-foreground">{current.role}</p>
                  <p className="text-sm text-primary">{current.company}</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={() => {
                      setIsPlaying(false);
                      setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
                    }}
                    aria-label="Testimonio anterior"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={() => {
                      setIsPlaying(false);
                      setIndex((prev) => (prev + 1) % testimonials.length);
                    }}
                    aria-label="Siguiente testimonio"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  {testimonials.map((testimonial, testimonialIndex) => (
                    <button
                      key={testimonial.id}
                      type="button"
                      className={`h-2 w-8 rounded-full ${testimonialIndex === index ? "bg-primary" : "bg-border"}`}
                      onClick={() => {
                        setIsPlaying(false);
                        setIndex(testimonialIndex);
                      }}
                      aria-label={`Ver testimonio de ${testimonial.name}`}
                      aria-pressed={testimonialIndex === index}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="bg-ink-2 py-16">
        <div className="mx-auto max-w-6xl space-y-8 px-6">
          <h2 className="text-2xl font-semibold text-foreground">Más experiencias Kolbing</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-border/40 bg-background/40">
                <CardContent className="space-y-4 p-6">
                  <p className="text-sm text-muted-foreground">“{testimonial.content}”</p>
                  <div className="space-y-1 text-xs">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-muted-foreground">{testimonial.role}</p>
                    <p className="text-primary">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default Testimonials;

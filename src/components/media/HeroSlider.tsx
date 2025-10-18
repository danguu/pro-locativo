import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Pause, Play, ArrowLeft, ArrowRight } from "lucide-react";
import type { HeroSlide } from "@/assets/content";
import { Button } from "@/components/ui/button";
import { useAutoplay } from "@/lib/hooks/useAutoplay";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface HeroSliderProps {
  slides: HeroSlide[];
}

export const HeroSlider = ({ slides }: HeroSliderProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const play = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  useAutoplay(play, 7000, isPlaying);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const indicators = useMemo(() => slides.map((_, index) => index), [slides]);

  return (
    <section className="relative" aria-label="Destacados Kolbing">
      <div
        className="relative"
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {slides.map((slide) => (
              <div className="relative min-w-0 flex-[0_0_100%]" key={slide.id}>
                <div className="relative h-[80vh] min-h-[520px] w-full">
                  <div className="absolute inset-0">
                    {slide.image ? (
                      <picture>
                        <source media="(min-width: 1024px)" srcSet={`${slide.image}?w=1920`} />
                        <source media="(min-width: 640px)" srcSet={`${slide.image}?w=1280`} />
                        <img
                          src={slide.image}
                          alt={slide.imageAlt}
                          loading="lazy"
                          className="h-full w-full object-cover"
                          sizes="(min-width: 1024px) 100vw, 100vw"
                        />
                      </picture>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-slate-800">
                        <span className="text-sm font-medium text-white">Visual de proyecto Kolbing</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-slate-950/70" />
                  <div className="relative z-10 flex h-full items-center">
                    <div className="container mx-auto px-4">
                      <div className="max-w-2xl space-y-6 text-white">
                        <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Kolbing Like</p>
                        <h1 className="text-4xl font-bold leading-tight md:text-6xl">{slide.title}</h1>
                        <p className="text-lg text-slate-100/90 md:text-xl">{slide.subtitle}</p>
                        <p className="text-base text-slate-200/80 md:text-lg">{slide.description}</p>
                        <div className="flex flex-col gap-3 sm:flex-row">
                          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                            <Link to={slide.ctaPrimary.href}>{slide.ctaPrimary.label}</Link>
                          </Button>
                          <Button asChild size="lg" variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                            <Link to={slide.ctaSecondary.href}>{slide.ctaSecondary.label}</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex items-center justify-between px-4">
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              emblaApi?.scrollPrev();
            }}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg transition hover:bg-white"
            aria-label="Slide anterior"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              emblaApi?.scrollNext();
            }}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg transition hover:bg-white"
            aria-label="Siguiente slide"
          >
            <ArrowRight className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => setIsPlaying((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg transition hover:bg-white"
            aria-label={isPlaying ? "Pausar carrusel" : "Reanudar carrusel"}
          >
            {isPlaying ? <Pause className="h-5 w-5" aria-hidden /> : <Play className="h-5 w-5" aria-hidden />}
          </button>
        </div>
        <div className="pointer-events-auto flex items-center gap-2" role="tablist" aria-label="Indicadores del carrusel">
          {indicators.map((index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={selectedIndex === index}
              aria-label={`Ir al slide ${index + 1}`}
              onClick={() => {
                setIsPlaying(false);
                emblaApi?.scrollTo(index);
              }}
              className={cn(
                "h-2 w-8 rounded-full bg-white/40 transition",
                selectedIndex === index && "w-10 bg-white",
              )}
            />
          ))}
        </div>
      </div>
      <div className="sr-only" aria-live="polite">
        Slide {selectedIndex + 1} de {slides.length}: {slides[selectedIndex]?.title}
      </div>
    </section>
  );
};

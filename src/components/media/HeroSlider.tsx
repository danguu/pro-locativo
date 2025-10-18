import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { heroSlides } from "@/assets/content";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const AUTOPLAY_INTERVAL = 6000;

export const HeroSlider = () => {
  const slides = useMemo(() => heroSlides, []);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isManualPaused, setIsManualPaused] = useState(false);

  const renderCta = (href: string, label: string) => {
    const isExternal = /^(https?:|tel:|mailto:)/.test(href);
    if (isExternal) {
      const isHttp = href.startsWith("http");
      return (
        <a href={href} target={isHttp ? "_blank" : undefined} rel={isHttp ? "noreferrer noopener" : undefined}>
          {label}
        </a>
      );
    }
    return <Link to={href}>{label}</Link>;
  };

  useEffect(() => {
    if (!isPlaying) {
      return;
    }
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_INTERVAL);
    return () => window.clearInterval(timer);
  }, [slides.length, isPlaying]);

  const goTo = (target: number) => {
    setIndex(target);
    setIsPlaying(!isManualPaused);
  };

  const goNext = () => {
    setIndex((prev) => (prev + 1) % slides.length);
    setIsPlaying(!isManualPaused);
  };

  const goPrev = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setIsPlaying(!isManualPaused);
  };

  const currentSlide = slides[index];

  return (
    <section
      className="relative flex min-h-[90vh] items-center overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Hero Kolbing"
      onMouseEnter={() => {
        if (isPlaying) {
          setIsPlaying(false);
        }
      }}
      onMouseLeave={() => {
        if (!isManualPaused) {
          setIsPlaying(true);
        }
      }}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
        <img
          src={currentSlide.image}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-24" id="hero-slider">
        <div
          className="space-y-4 text-left"
          role="group"
          aria-roledescription="slide"
          aria-label={currentSlide.title}
          aria-live="polite"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Kolbing Like</p>
          <h1 className="text-balance text-4xl font-bold md:text-6xl">{currentSlide.title}</h1>
          <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">{currentSlide.description}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Button asChild size="lg">
            {renderCta(currentSlide.ctaPrimary.href, currentSlide.ctaPrimary.label)}
          </Button>
          <Button asChild size="lg" variant="outline">
            {renderCta(currentSlide.ctaSecondary.href, currentSlide.ctaSecondary.label)}
          </Button>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3" role="group" aria-label="Controles del hero">
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="rounded-full"
            onClick={goPrev}
            aria-label="Slide anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="rounded-full"
            onClick={() => {
              setIsManualPaused((prev) => {
                const next = !prev;
                setIsPlaying(!next);
                return next;
              });
            }}
            aria-label={isPlaying ? "Pausar autoplay" : "Reanudar autoplay"}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="rounded-full"
            onClick={goNext}
            aria-label="Siguiente slide"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          <div className="ml-4 flex items-center gap-2" role="tablist" aria-label="Slides">
            {slides.map((slide, slideIndex) => (
              <button
                key={slide.id}
                role="tab"
                aria-selected={slideIndex === index}
                aria-controls="hero-slider"
                className={
                  `h-2 w-8 rounded-full transition-all ${
                    slideIndex === index ? "bg-primary" : "bg-border"
                  }`
                }
                onClick={() => goTo(slideIndex)}
              >
                <span className="sr-only">{slide.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;

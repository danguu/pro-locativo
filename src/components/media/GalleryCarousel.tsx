import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FallbackImage } from "@/components/ui/FallbackImage";

interface GalleryCarouselProps {
  items: Array<{ src: string; alt: string }>;
}

export const GalleryCarousel = ({ items }: GalleryCarouselProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollTo = (index: number) => {
    setSelectedIndex(index);
    emblaApi?.scrollTo(index);
  };

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {items.map((item, index) => (
            <div key={item.src ?? index} className="min-w-0 flex-[0_0_100%]">
              {item.src ? (
                <picture>
                  <source media="(min-width: 1024px)" srcSet={`${item.src}?w=1280`} />
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-[420px] w-full object-cover"
                    loading="lazy"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </picture>
              ) : (
                <FallbackImage label="Galería Kolbing" className="h-[420px]" />
              )}
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg transition hover:bg-white"
            aria-label="Imagen anterior"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg transition hover:bg-white"
            aria-label="Siguiente imagen"
          >
            <ArrowRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
        {items.map((item, index) => (
          <button
            type="button"
            key={`${item.src}-${index}`}
            onClick={() => scrollTo(index)}
            className={cn(
              "overflow-hidden rounded-xl border-2 transition",
              selectedIndex === index ? "border-primary" : "border-transparent opacity-70 hover:opacity-100",
            )}
            aria-label={`Mostrar imagen ${index + 1}`}
            aria-current={selectedIndex === index}
          >
            {item.src ? (
              <img src={item.src} alt="Miniatura" className="h-16 w-full object-cover" loading="lazy" />
            ) : (
              <FallbackImage label="Kolbing" className="h-16" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

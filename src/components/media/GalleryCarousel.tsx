import { useState } from "react";
import { cn } from "@/lib/utils";
import { FallbackImage } from "./FallbackImage";

interface GalleryCarouselProps {
  images: string[];
  title: string;
}

export const GalleryCarousel = ({ images, title }: GalleryCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = images[activeIndex];

  return (
    <section aria-label={`Galería del proyecto ${title}`} className="space-y-4">
      <div className="aspect-[16/9] overflow-hidden rounded-xl border border-border/50">
        <FallbackImage
          src={current}
          alt={`Imagen ${activeIndex + 1} del proyecto ${title}`}
          className="h-full w-full object-cover"
          fallbackLabel={title}
        />
      </div>
      <div className="flex gap-3 overflow-x-auto" role="list">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Ver imagen ${index + 1}`}
            aria-pressed={index === activeIndex}
            className={cn(
              "relative h-16 w-24 overflow-hidden rounded-lg border transition",
              index === activeIndex ? "border-primary" : "border-border/40"
            )}
          >
            <FallbackImage
              src={image}
              alt=""
              className="h-full w-full object-cover"
              fallbackLabel={`Imagen ${index + 1}`}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default GalleryCarousel;

import { getImageAlt, getPlaceholderSrc } from "@/lib/images";

export interface GalleryImage {
  id: string;
  caption?: string;
}

export interface GalleryProps {
  images: GalleryImage[];
}

export const Gallery = ({ images }: GalleryProps) => (
  <section className="container-responsive page-section" aria-label="Galería de imágenes">
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {images.map((image) => {
        const src = getPlaceholderSrc(image.id);
        const isPlaceholder = src.includes("/placeholders/");

        return (
          <figure key={image.id} className="overflow-hidden rounded-3xl border border-border/60 bg-card/70">
            <img
              src={src}
              alt={getImageAlt(image.id)}
              className="h-64 w-full object-cover"
              loading="lazy"
              data-placeholder={isPlaceholder ? "true" : undefined}
            />
            {image.caption && (
              <figcaption className="px-6 py-4 text-sm text-muted-foreground">{image.caption}</figcaption>
            )}
          </figure>
        );
      })}
    </div>
  </section>
);

export default Gallery;

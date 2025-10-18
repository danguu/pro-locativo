import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { HeroProps, HeroCta } from "@/types/content";
import { getImageAlt, getImageSources, getPlaceholderSrc } from "@/lib/images";
import { trackCta } from "@/utils/analytics";

const renderCta = (cta: HeroCta, index: number) => {
  const variant = cta.variant === "secondary" ? "outline" : "default";
  const className = cta.variant === "secondary" ? "btn-secondary" : "btn-primary";

  if (cta.href.startsWith("http")) {
    return (
      <Button
        key={`${cta.href}-${index}`}
        asChild
        size="lg"
        variant={variant}
        className={className}
        onClick={() => trackCta(`Hero CTA ${cta.label}`, cta.href)}
      >
        <a href={cta.href}>{cta.label}</a>
      </Button>
    );
  }

  return (
    <Button key={`${cta.href}-${index}`} asChild size="lg" variant={variant} className={className}>
      <Link to={cta.href}>{cta.label}</Link>
    </Button>
  );
};

export const Hero = ({ eyebrow, title, description, imageId, ctas = [], breadcrumbs = [] }: HeroProps) => {
  const srcSet = getImageSources(imageId).join(", ");
  const placeholder = getPlaceholderSrc(imageId);
  const isPlaceholder = placeholder.includes("/placeholders/");
  const alt = getImageAlt(imageId);

  return (
    <section className="relative overflow-hidden pt-32 pb-24" aria-labelledby="hero-heading">
      <div className="absolute inset-0 -z-10">
        <picture>
          {srcSet && <source srcSet={srcSet} sizes="(min-width: 1280px) 80vw, 100vw" />}
          <img
            src={placeholder}
            alt={alt}
            className="h-full w-full object-cover"
            loading="lazy"
            data-placeholder={isPlaceholder ? "true" : undefined}
          />
        </picture>
        <div className="absolute inset-0 gradient-overlay" aria-hidden="true" />
      </div>

      <div className="container-responsive">
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              {breadcrumbs.map((item, index) => (
                <li key={item.id} className="flex items-center gap-2">
                  {index > 0 && <span aria-hidden="true">/</span>}
                  {item.path ? (
                    <Link className="hover:text-primary focus-ring" to={item.path}>
                      {item.label}
                    </Link>
                  ) : (
                    <span aria-current="page">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && (
          <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            {eyebrow}
          </span>
        )}

        <div className="mt-6 max-w-3xl" id="hero-heading">
          <h1 className="text-balance text-4xl font-bold md:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">{description}</p>
        </div>

        {ctas.length > 0 && (
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            {ctas.map((cta, index) => renderCta(cta, index))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;

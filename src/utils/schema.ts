import type { Property, SiteData } from "@/types/content";
import { getAbsoluteImageUrl, getPlaceholderSrc } from "@/lib/images";

const sanitizePrice = (value: string) => {
  const raw = value.toLowerCase();
  const match = raw.match(/[0-9]+(?:[.,][0-9]+)?/);
  if (!match) return undefined;
  const numeric = parseFloat(match[0].replace(",", "."));
  if (Number.isNaN(numeric)) return undefined;

  let multiplier = 1;
  if (raw.includes("mil millones")) {
    multiplier = 1_000_000_000;
  } else if (raw.includes("millones")) {
    multiplier = 1_000_000;
  } else if (raw.includes("mil")) {
    multiplier = 1_000;
  }

  return Math.round(numeric * multiplier);
};

const normalizePath = (path: string) => `/${path.replace(/^\/+/, "")}`;

export const createPropertyGraph = (properties: Property[], site: SiteData, pageSlug: string) => {
  const baseUrl = site.url.replace(/\/$/, "");

  const graph = properties.map((property) => {
    const relativePath = normalizePath(`${pageSlug}/${property.slug}`);
    const propertyUrl = `${baseUrl}${relativePath}`;
    const placeholder = getPlaceholderSrc(property.imageId);
    const imageUrl = placeholder
      ? `${baseUrl}${placeholder.startsWith("/") ? placeholder : `/${placeholder}`}`
      : getAbsoluteImageUrl(property.imageId, site.url);
    const priceValue = sanitizePrice(property.precio_desde);

    const offer: Record<string, unknown> = {
      "@type": "Offer",
      priceCurrency: "COP",
      availability: "https://schema.org/InStock",
      url: propertyUrl,
      seller: {
        "@type": "RealEstateAgent",
        name: site.brand.name,
        url: site.url,
      },
    };

    if (typeof priceValue === "number") {
      offer.price = priceValue;
    } else {
      offer.description = property.precio_desde;
    }

    return {
      "@type": "Product",
      "@id": `${propertyUrl}#product`,
      name: property.nombre,
      description: property.amenidades.join(", ") || property.nombre,
      category: property.tipologias.join(", ") || "Inmueble",
      areaServed: `${site.contact.city}, ${site.contact.country}`,
      brand: {
        "@type": "Brand",
        name: site.brand.name,
      },
      image: imageUrl,
      offers: offer,
      productionDate: property.estatus,
      url: propertyUrl,
    };
  });

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
};

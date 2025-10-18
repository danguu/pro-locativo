import { useEffect, useMemo } from "react";
import siteData from "@/data/site.json";
import type { SiteData } from "@/types/content";
import { getAbsoluteImageUrl, getPlaceholderSrc } from "@/lib/images";

export interface SeoProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
}

const site = siteData as SiteData;

const setMetaTag = (name: string, content: string) => {
  if (!content) return;
  let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement("meta");
    element.name = name;
    document.head.appendChild(element);
  }
  element.content = content;
};

const setPropertyTag = (property: string, content: string) => {
  if (!content) return;
  let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }
  element.content = content;
};

const resolveAbsoluteUrl = (path?: string) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const normalizedBase = site.url.replace(/\/$/, "");
  return `${normalizedBase}${path.startsWith("/") ? path : `/${path}`}`;
};

const defaultShareImage = (() => {
  const placeholder = getPlaceholderSrc(site.defaultImageId);
  if (placeholder) {
    const resolved = resolveAbsoluteUrl(placeholder);
    if (resolved) {
      return resolved;
    }
  }
  return getAbsoluteImageUrl(site.defaultImageId, site.url);
})();

const setLinkTag = (rel: string, href: string) => {
  if (!href) return;
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
};

export const Seo = ({ title, description, url, image, type = "website" }: SeoProps) => {
  const metaDescription = description || site.defaultDescription;
  const canonicalUrl = useMemo(() => {
    if (url) return resolveAbsoluteUrl(url);
    if (typeof window !== "undefined") {
      try {
        return new URL(window.location.pathname + window.location.search, site.url).toString();
      } catch (error) {
        return site.url;
      }
    }
    return site.url;
  }, [url]);

  const shareImage = useMemo(() => {
    if (image) return resolveAbsoluteUrl(image);
    return defaultShareImage;
  }, [image]);

  useEffect(() => {
    const fullTitle = `${title} | ${site.brand.name}`;
    document.title = fullTitle;
    setMetaTag("description", metaDescription);
    setMetaTag("author", site.author ?? site.brand.name);
    setMetaTag("og:description", metaDescription);
    setMetaTag("twitter:description", metaDescription);

    setPropertyTag("og:title", fullTitle);
    setPropertyTag("og:type", type);
    setPropertyTag("og:url", canonicalUrl);
    setPropertyTag("og:image", shareImage);
    setPropertyTag("og:site_name", site.brand.name);
    setPropertyTag("og:locale", (site.language ?? "es_CO").replace("-", "_"));

    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", fullTitle);
    setMetaTag("twitter:image", shareImage);

    setLinkTag("canonical", canonicalUrl);
  }, [title, metaDescription, canonicalUrl, shareImage, type]);

  return null;
};

export default Seo;

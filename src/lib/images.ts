import imageMap from "@/images/images.map.json";

type ImageEntry = {
  id: string;
  filename: string;
  target_path: string;
  alt: string;
  variants?: { w: number; filename: string }[];
};

const entries = imageMap as ImageEntry[];

const stripPublicPrefix = (path: string) => path.replace(/^public\//, "").replace(/^\//, "");
const normalizeBaseUrl = (baseUrl: string) => baseUrl.replace(/\/$/, "");

export const getImageById = (id: string): ImageEntry | undefined =>
  entries.find((entry) => entry.id === id);

export const getPlaceholderSrc = (id: string) => {
  const entry = getImageById(id);
  if (!entry) return "";
  return `/assets/placeholders/${entry.filename}`;
};

export const getImageAlt = (id: string) => getImageById(id)?.alt ?? "";

export const getImageSources = (id: string) => {
  const entry = getImageById(id);
  if (!entry || !entry.variants) return [] as string[];
  return entry.variants
    .slice()
    .sort((a, b) => a.w - b.w)
    .map((variant) => `/assets/placeholders/${variant.filename} ${variant.w}w`);
};

export const getPublicImagePath = (id: string) => {
  const entry = getImageById(id);
  if (!entry) return "";
  return `/${stripPublicPrefix(entry.target_path)}`;
};

export const getAbsoluteImageUrl = (id: string, baseUrl: string, fallbackToPlaceholder = true) => {
  const normalizedBase = normalizeBaseUrl(baseUrl);
  const publicPath = getPublicImagePath(id);
  if (publicPath) {
    return `${normalizedBase}${publicPath}`;
  }

  if (!fallbackToPlaceholder) {
    return "";
  }

  const placeholder = getPlaceholderSrc(id);
  if (!placeholder) {
    return "";
  }

  return `${normalizedBase}${placeholder.startsWith("/") ? placeholder : `/${placeholder}`}`;
};

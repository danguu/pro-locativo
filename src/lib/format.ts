export const formatNumber = (value: number, suffix = "") => {
  return `${value.toLocaleString("es-CO")} ${suffix}`.trim();
};

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export const toTelLink = (value: string) => value.replace(/[^+\d]/g, "");

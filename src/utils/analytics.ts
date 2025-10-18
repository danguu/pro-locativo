/*
 * Punto de integración con herramientas de analítica.
 * Implementa dataLayer compatible con Google Tag Manager.
 */
interface AnalyticsEvent {
  event: string;
  category?: string;
  action?: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
}

const isBrowser = typeof window !== "undefined";

declare global {
  interface Window {
    dataLayer?: AnalyticsEvent[];
  }
}

export const pushEvent = (payload: AnalyticsEvent) => {
  if (!isBrowser) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
};

export const trackCta = (label: string, href: string) => {
  pushEvent({
    event: "cta_click",
    category: "cta",
    action: href,
    label,
  });
};

export {};

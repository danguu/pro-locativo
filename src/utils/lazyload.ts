/*
 * Utilidad para observar elementos e iniciar cargas diferidas.
 * Envuelve IntersectionObserver con opciones seguras por defecto y
 * devuelve una función para registrar nuevos nodos.
 */
export interface LazyLoadOptions extends IntersectionObserverInit {
  onEnter?: (entry: IntersectionObserverEntry) => void;
  onExit?: (entry: IntersectionObserverEntry) => void;
}

export const createLazyLoader = (options: LazyLoadOptions = {}) => {
  if (!("IntersectionObserver" in window)) {
    return {
      observe: (_element: Element) => options.onEnter?.({} as IntersectionObserverEntry),
      disconnect: () => undefined,
    };
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        options.onEnter?.(entry);
      } else {
        options.onExit?.(entry);
      }
    });
  }, options);

  return {
    observe: (element: Element) => observer.observe(element),
    disconnect: () => observer.disconnect(),
  };
};

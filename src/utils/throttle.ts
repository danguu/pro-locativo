/*
 * throttle: limita la ejecución de una función para mejorar rendimiento
 * en eventos de scroll y resize.
 */
export function throttle<T extends (...args: unknown[]) => void>(fn: T, delay = 200) {
  let lastTime = 0;
  let timer: number | undefined;

  return (...args: Parameters<T>) => {
    const now = Date.now();

    if (now - lastTime < delay) {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        lastTime = now;
        fn(...args);
      }, delay - (now - lastTime));
      return;
    }

    lastTime = now;
    fn(...args);
  };
}

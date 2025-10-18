/**
 * UI utilities for DOM selection, lazy loading, observers
 */
export const $ = (selector, scope = document) => scope.querySelector(selector);
export const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

export const loadComponent = async (selectorOrElement, url) => {
  const target = typeof selectorOrElement === 'string'
    ? $(selectorOrElement)
    : selectorOrElement;
  if (!target) return null;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch component: ${url}`);
    const html = await res.text();
    target.innerHTML = html;
    return target.firstElementChild || target;
  } catch (error) {
    console.error(error);
    target.innerHTML = '<p role="alert">No se pudo cargar el componente.</p>';
    return null;
  }
};

export const fetchJSON = async (path) => {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Error fetching ${path}`);
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const lazyLoadObserver = () => {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const { target } = entry;
        const src = target.getAttribute('data-src');
        if (src) {
          target.src = src;
        }
        const srcset = target.getAttribute('data-srcset');
        if (srcset) {
          target.srcset = srcset;
        }
        obs.unobserve(target);
      }
    });
  }, { rootMargin: '200px 0px' });

  return observer;
};

export const trapFocus = (container) => {
  const focusableSelectors = [
    'a[href]',
    'area[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    'audio[controls]',
    'video[controls]',
    '[contenteditable]',
    '[tabindex]:not([tabindex="-1"])'
  ];

  const focusable = $$(focusableSelectors.join(','), container);
  const [first, last] = [focusable[0], focusable[focusable.length - 1]];
  if (!first || !last) return () => {};

  const handleKeydown = (event) => {
    if (event.key !== 'Tab') return;
    if (event.shiftKey) {
      if (document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    } else if (document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  container.addEventListener('keydown', handleKeydown);
  return () => container.removeEventListener('keydown', handleKeydown);
};

export const formatPhone = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  const parts = [digits.slice(0, 3), digits.slice(3, 6), digits.slice(6, 10)].filter(Boolean);
  return parts.join(' ');
};

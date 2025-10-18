/* Utility helpers for DOM interactions, lazy loading and async content */
export async function loadComponent(selector, url) {
  const container = document.querySelector(selector);
  if (!container) return null;

  try {
    const response = await fetch(url, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`No se pudo cargar ${url}`);
    const html = await response.text();
    container.innerHTML = html;
    container.dispatchEvent(new CustomEvent('component:loaded', { detail: { url } }));
    return container;
  } catch (error) {
    console.error(error);
    container.innerHTML = `<p role="alert">No pudimos cargar este módulo. Actualiza la página.</p>`;
    return null;
  }
}

export async function loadJSON(url) {
  const response = await fetch(url, { cache: 'no-cache' });
  if (!response.ok) throw new Error(`No se pudo recuperar ${url}`);
  return response.json();
}

export function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

export function qsa(selector, scope = document) {
  return [...scope.querySelectorAll(selector)];
}

export function createEl(tag, props = {}, children = []) {
  const el = document.createElement(tag);
  Object.entries(props).forEach(([key, value]) => {
    if (key.startsWith('aria-') || key === 'role') {
      el.setAttribute(key, value);
    } else if (key === 'dataset') {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        el.dataset[dataKey] = dataValue;
      });
    } else if (key in el) {
      el[key] = value;
    } else {
      el.setAttribute(key, value);
    }
  });

  children.forEach((child) => {
    if (typeof child === 'string') {
      el.insertAdjacentHTML('beforeend', child);
    } else if (child) {
      el.appendChild(child);
    }
  });
  return el;
}

export function lazyLoadMedia() {
  const elements = qsa('[data-observe]');
  if (!elements.length) return;

  const hydrate = (target) => {
    if (target.dataset.src) {
      target.src = target.dataset.src;
    }
    if (target.dataset.srcset) {
      target.srcset = target.dataset.srcset;
    }
    target.removeAttribute('data-observe');
  };

  if (!('IntersectionObserver' in window)) {
    elements.forEach(hydrate);
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        hydrate(target);
        obs.unobserve(target);
      }
    });
  }, { rootMargin: '80px 0px' });

  elements.forEach((el) => observer.observe(el));
}

export function trapFocus(container) {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ];
  const focusable = qsa(focusableSelectors.join(','), container);
  if (!focusable.length) return;

  function handleKeydown(event) {
    if (event.key !== 'Tab') return;
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      last.focus();
      event.preventDefault();
    } else if (!event.shiftKey && document.activeElement === last) {
      first.focus();
      event.preventDefault();
    }
  }

  container.addEventListener('keydown', handleKeydown);
  container.addEventListener('component:destroy', () => {
    container.removeEventListener('keydown', handleKeydown);
  }, { once: true });
}

export function delegate(parent, type, selector, handler) {
  parent.addEventListener(type, (event) => {
    const target = event.target.closest(selector);
    if (target && parent.contains(target)) {
      handler(event, target);
    }
  });
}

export function animateCarousel(track, index) {
  const slideWidth = track.children[0]?.offsetWidth || 0;
  const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || 24);
  const offset = (slideWidth + gap) * index * -1;
  track.style.transform = `translateX(${offset}px)`;
}

export function setPrefersReducedMotion(listener) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  listener(mq);
  mq.addEventListener('change', listener);
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);
}

export function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-');
}

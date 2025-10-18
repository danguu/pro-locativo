import {
  loadComponent,
  loadJSON,
  qs,
  qsa,
  createEl,
  delegate,
  lazyLoadMedia,
  animateCarousel,
  formatCurrency,
  slugify,
  setPrefersReducedMotion
} from './ui.js';
import { initContactForm } from './forms.js';

document.documentElement.classList.remove('no-js');

const pageId = document.body.dataset.page || 'home';

(async function initApp() {
  await loadComponents();
  await setupNavigation();
  lazyLoadMedia();
  setupHeroScroll();
  setupTestimonials();
  setupFAQ();
  updateFooterYear();
  highlightBreadcrumb();

  switch (pageId) {
    case 'home':
      await renderListings({ limit: 3 });
      renderBenefits();
      renderMetrics();
      break;
    case 'projects':
      await renderListings({ enableFilters: true, enablePagination: true });
      break;
    case 'about':
      renderTimeline();
      break;
    case 'contact':
      initContactForm();
      break;
    case 'blog':
      renderBlogPosts();
      break;
    default:
      break;
  }
})();

async function loadComponents() {
  const placeholders = qsa('[data-component]');
  const loaders = placeholders.map((el) => {
    const src = el.dataset.componentSrc;
    const name = el.dataset.component;
    if (!src || !name) return Promise.resolve();
    return loadComponent(`[data-component="${name}"]`, src);
  });
  return Promise.all(loaders);
}

async function setupNavigation() {
  const navList = qs('[data-nav-list]');
  if (!navList) return;

  try {
    const navData = await loadJSON('/data/nav.json');
    navList.innerHTML = '';
    navData.items.forEach((item) => {
      const li = createEl('li', { className: 'primary-nav__item' });
      const link = createEl('a', {
        className: 'primary-nav__link',
        href: item.url,
        textContent: item.label,
        'aria-current': item.id === pageId ? 'page' : null
      });
      li.appendChild(link);
      navList.appendChild(li);
    });
    const contactLink = qs('[data-nav-cta]');
    if (contactLink && navData.cta) {
      contactLink.href = navData.cta.url;
      contactLink.textContent = navData.cta.label;
    }
  } catch (error) {
    console.error('Error cargando navegación', error);
    navList.innerHTML = '<li>Menú no disponible</li>';
  }

  const nav = qs('[data-primary-nav]');
  const toggle = qs('[data-nav-toggle]');
  const overlay = qs('[data-nav-overlay]');

  function toggleMenu(force) {
    const next = typeof force === 'boolean' ? force : nav.dataset.visible !== 'true';
    nav.dataset.visible = String(next);
    toggle.setAttribute('aria-expanded', String(next));
    if (overlay) overlay.hidden = !next;
    document.body.classList.toggle('no-scroll', next);
    if (!next) {
      toggle.focus();
    }
  }

  if (toggle && nav) {
    toggle.addEventListener('click', () => toggleMenu());
    overlay?.addEventListener('click', () => toggleMenu(false));
    delegate(nav, 'click', 'a', () => toggleMenu(false));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.dataset.visible === 'true') {
        toggleMenu(false);
      }
    });
  }
}

function setupHeroScroll() {
  const cta = qs('[data-scroll-target]');
  if (!cta) return;
  cta.addEventListener('click', (event) => {
    const anchor = event.currentTarget;
    if (anchor instanceof HTMLAnchorElement && anchor.hash) {
      event.preventDefault();
      const target = qs(anchor.hash);
      target?.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

async function renderListings({ limit = Infinity, enableFilters = false, enablePagination = false } = {}) {
  const grid = qs('[data-listings-grid]');
  if (!grid) return;

  const section = grid.closest('.section');
  if (section) {
    const title = qs('.section__title', section);
    const subtitle = qs('.section__subtitle', section);
    if (pageId === 'projects') {
      title.textContent = 'Portafolio de proyectos';
      subtitle.textContent = 'Explora desarrollos corporativos, mixtos y logísticos disponibles en las principales ciudades.';
    }
  }

  let listings = [];
  try {
    const data = await loadJSON('/data/listings.json');
    listings = data.items;
  } catch (error) {
    console.error('No se pudieron cargar los proyectos', error);
    grid.innerHTML = '<p>No pudimos cargar los proyectos ahora mismo.</p>';
    return;
  }

  let filteredData = [...listings];
  const stateFilter = qs('[data-filter-state]');
  const cityFilter = qs('[data-filter-city]');
  const searchInput = qs('[data-filter-search]');
  const pagination = qs('[data-pagination]');
  const filtersBar = qs('[data-listing-filters]');

  if (enableFilters && filtersBar) {
    filtersBar.hidden = false;
    const states = [...new Set(listings.map((item) => item.status))];
    const cities = [...new Set(listings.map((item) => item.city))];
    populateSelect(stateFilter, states, 'Estado');
    populateSelect(cityFilter, cities, 'Ciudad');
  }

  let currentPage = 1;
  const pageSize = enablePagination ? 6 : listings.length;

  function applyFilters() {
    filteredData = [...listings];

    if (enableFilters && stateFilter && stateFilter.value) {
      filteredData = filteredData.filter((item) => item.status === stateFilter.value);
    }
    if (enableFilters && cityFilter && cityFilter.value) {
      filteredData = filteredData.filter((item) => item.city === cityFilter.value);
    }
    if (enableFilters && searchInput && searchInput.value.trim()) {
      const query = searchInput.value.trim().toLowerCase();
      filteredData = filteredData.filter((item) =>
        item.title.toLowerCase().includes(query) ||
        item.city.toLowerCase().includes(query)
      );
    }

    currentPage = 1;
    render();
  }

  function render() {
    const items = filteredData.slice(0, limit);
    let paginated = items;
    const totalPages = enablePagination ? Math.ceil(items.length / pageSize) : 1;
    if (enablePagination) {
      if (currentPage > totalPages) currentPage = 1;
      const start = (currentPage - 1) * pageSize;
      paginated = items.slice(start, start + pageSize);
      buildPagination(totalPages);
    }

    grid.innerHTML = '';
    if (!paginated.length) {
      grid.innerHTML = '<p>No encontramos proyectos con esos filtros.</p>';
      return;
    }

    paginated.forEach((item) => {
      const card = createListingCard(item);
      grid.appendChild(card);
    });
    lazyLoadMedia();
  }

  function buildPagination(totalPages) {
    if (!pagination) return;
    pagination.hidden = totalPages <= 1;
    pagination.innerHTML = '';
    for (let page = 1; page <= totalPages; page += 1) {
      const button = createEl('button', {
        className: 'pagination__button',
        type: 'button',
        textContent: String(page),
        'aria-current': page === currentPage ? 'true' : 'false'
      });
      button.addEventListener('click', () => {
        currentPage = page;
        render();
      });
      pagination.appendChild(button);
    }
  }

  if (enableFilters) {
    stateFilter?.addEventListener('change', () => {
      currentPage = 1;
      applyFilters();
    });
    cityFilter?.addEventListener('change', () => {
      currentPage = 1;
      applyFilters();
    });
    searchInput?.addEventListener('input', () => {
      currentPage = 1;
      applyFilters();
    });
  }

  if (enablePagination && pagination) {
    pagination.hidden = false;
  }

  render();
}

function populateSelect(select, values, label) {
  if (!select) return;
  select.innerHTML = `<option value="">${label}</option>`;
  values.sort().forEach((value) => {
    select.insertAdjacentHTML('beforeend', `<option value="${value}">${value}</option>`);
  });
}

function createListingCard(item) {
  const article = createEl('article', { className: 'card listing-card' });
  const picture = createEl('picture', { className: 'card__media' });
  picture.innerHTML = `
    <source data-observe data-srcset="${item.image}@2x.jpg 2x" media="(min-width: 768px)">
    <img data-observe data-src="${item.image}.jpg" alt="Render del proyecto ${item.title}" loading="lazy">
  `;

  const content = createEl('div', { className: 'card__content' });
  const status = createEl('span', { className: `tag card__status--${slugify(item.status)}`, textContent: item.status });

  const title = createEl('h3', { className: 'card__title' });
  title.textContent = item.title;

  const meta = createEl('p', { className: 'card__meta' });
  meta.textContent = `${item.city} · ${item.type}`;

  const price = createEl('p', { className: 'card__meta', textContent: formatCurrency(item.price) });
  const actions = createEl('div', { className: 'card__actions' });
  const button = createEl('a', {
    className: 'button button--secondary',
    href: item.url,
    textContent: 'Ver más'
  });
  actions.appendChild(button);

  content.append(status, title, meta, price, actions);
  article.append(picture, content);
  return article;
}

function renderBenefits() {
  const container = qs('[data-benefits]');
  if (!container) return;
  const benefits = [
    {
      icon: '🏢',
      title: 'Portafolio diversificado',
      description: 'Proyectos corporativos y mixtos ubicados en polos de desarrollo urbano.'
    },
    {
      icon: '📈',
      title: 'Retornos sostenibles',
      description: 'Modelos financieros diseñados para maximizar la valorización y renta.'
    },
    {
      icon: '🛡️',
      title: 'Gestión integral de riesgo',
      description: 'Análisis legal, técnico y comercial que respalda cada inversión.'
    },
    {
      icon: '🤝',
      title: 'Acompañamiento experto',
      description: 'Equipo interdisciplinario que apoya a inversionistas y compradores.'
    }
  ];
  container.innerHTML = '';
  benefits.forEach((benefit) => {
    const article = createEl('article', { className: 'home-benefit' });
    article.innerHTML = `
      <span class="home-benefit__icon" aria-hidden="true">${benefit.icon}</span>
      <h3>${benefit.title}</h3>
      <p>${benefit.description}</p>
    `;
    container.appendChild(article);
  });
}

function renderMetrics() {
  const container = qs('[data-metrics]');
  if (!container) return;
  const metrics = [
    { value: '+15', label: 'Años impulsando desarrollos inmobiliarios' },
    { value: '2.4MM m²', label: 'Gestionados en proyectos corporativos y residenciales' },
    { value: '98%', label: 'Clientes que nos recomiendan' }
  ];
  container.innerHTML = '';
  metrics.forEach((metric) => {
    const item = createEl('div', { className: 'metric' });
    item.innerHTML = `
      <span class="metric__value">${metric.value}</span>
      <span class="metric__label">${metric.label}</span>
    `;
    container.appendChild(item);
  });
}

async function setupTestimonials() {
  const track = qs('[data-carousel-track]');
  if (!track) return;

  let testimonials = [];
  try {
    const data = await loadJSON('/data/testimonials.json');
    testimonials = data.items;
  } catch (error) {
    console.error('No se pudieron cargar los testimonios', error);
  }

  if (!testimonials.length) {
    track.innerHTML = '<p>No hay testimonios disponibles en este momento.</p>';
    return;
  }

  track.innerHTML = '';
  testimonials.forEach((testimonial) => {
    const slide = createEl('article', { className: 'testimonial', role: 'group', ariaLabel: testimonial.name });
    slide.innerHTML = `
      <div class="testimonial__header">
        <span class="testimonial__avatar" aria-hidden="true">${testimonial.initials}</span>
        <div>
          <strong>${testimonial.name}</strong>
          <p class="u-muted">${testimonial.role}</p>
        </div>
      </div>
      <p>“${testimonial.quote}”</p>
    `;
    track.appendChild(slide);
  });

  let index = 0;
  const prev = qs('[data-carousel-prev]');
  const next = qs('[data-carousel-next]');
  const totalSlides = testimonials.length;

  function update(direction = 0) {
    index = (index + direction + totalSlides) % totalSlides;
    animateCarousel(track, index);
  }

  prev?.addEventListener('click', () => update(-1));
  next?.addEventListener('click', () => update(1));

  let autoplayId;
  const stopAutoplay = () => {
    if (autoplayId) {
      clearInterval(autoplayId);
      autoplayId = null;
    }
  };
  const startAutoplay = () => {
    stopAutoplay();
    autoplayId = setInterval(() => update(1), 7000);
  };

  setPrefersReducedMotion((mq) => {
    if (mq.matches) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  track.addEventListener('mouseenter', stopAutoplay);
  track.addEventListener('mouseleave', () => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      startAutoplay();
    }
  });
}

async function setupFAQ() {
  const container = qs('[data-faq]');
  if (!container) return;
  let faqs = [];
  try {
    const data = await loadJSON('/data/faq.json');
    faqs = data.items;
  } catch (error) {
    console.error('No se pudieron cargar las preguntas frecuentes', error);
  }

  container.innerHTML = '';
  if (!faqs.length) {
    container.innerHTML = '<p>No hay preguntas frecuentes disponibles.</p>';
    return;
  }

  faqs.forEach((item, index) => {
    const accordionItem = createEl('div', { className: 'accordion__item' });
    const triggerId = `faq-${index}`;
    const expanded = index === 0;
    accordionItem.innerHTML = `
      <h3>
        <button class="accordion__trigger" aria-expanded="${expanded}" aria-controls="${triggerId}-panel" id="${triggerId}">
          <span>${item.question}</span>
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </h3>
      <div class="accordion__panel" id="${triggerId}-panel" role="region" aria-labelledby="${triggerId}" ${expanded ? '' : 'hidden'}>
        <p>${item.answer}</p>
      </div>
    `;
    container.appendChild(accordionItem);
  });

  delegate(container, 'click', '.accordion__trigger', (event, target) => {
    const expanded = target.getAttribute('aria-expanded') === 'true';
    qsa('.accordion__trigger', container).forEach((button) => {
      button.setAttribute('aria-expanded', 'false');
      const panel = qs(`#${button.getAttribute('aria-controls')}`);
      if (panel) panel.hidden = true;
    });
    target.setAttribute('aria-expanded', String(!expanded));
    const panel = qs(`#${target.getAttribute('aria-controls')}`);
    if (panel) {
      panel.hidden = expanded;
    }
  });
}

function renderTimeline() {
  const container = qs('[data-timeline]');
  if (!container) return;
  const milestones = [
    { year: '2008', description: 'Nace Pro Locativo como firma consultora enfocada en proyectos corporativos.' },
    { year: '2013', description: 'Expansión a desarrollos mixtos e inicio de operaciones en la región Andina.' },
    { year: '2018', description: 'Implementamos metodología de analítica de datos para gestión de portafolios.' },
    { year: '2023', description: 'Apertura de laboratorio de innovación inmobiliaria para clientes institucionales.' }
  ];
  container.innerHTML = '';
  milestones.forEach((item) => {
    const entry = createEl('div', { className: 'timeline__item' });
    entry.innerHTML = `
      <span class="timeline__year">${item.year}</span>
      <p>${item.description}</p>
    `;
    container.appendChild(entry);
  });
}

function renderBlogPosts() {
  const container = qs('[data-blog-list]');
  if (!container) return;
  const posts = [
    {
      title: 'Tendencias de inversión corporativa 2024',
      date: '8 de enero de 2024',
      readTime: '5 min de lectura',
      excerpt: 'Cómo la flexibilidad de los espacios y la sostenibilidad redefinen las inversiones corporativas.'
    },
    {
      title: 'Checklist ESG para desarrollos inmobiliarios',
      date: '12 de diciembre de 2023',
      readTime: '7 min de lectura',
      excerpt: 'Pasos accionables para evaluar impacto ambiental y social en nuevos proyectos urbanos.'
    },
    {
      title: 'La data como ventaja competitiva en real estate',
      date: '21 de noviembre de 2023',
      readTime: '6 min de lectura',
      excerpt: 'Modelos predictivos que optimizan ocupación y rentabilidad en portafolios corporativos.'
    }
  ];
  container.innerHTML = '';
  posts.forEach((post) => {
    const article = createEl('article', { className: 'blog-card' });
    article.innerHTML = `
      <h2>${post.title}</h2>
      <p class="blog-card__meta">${post.date} · ${post.readTime}</p>
      <p>${post.excerpt}</p>
      <a class="button button--secondary" href="#">Leer artículo</a>
    `;
    container.appendChild(article);
  });
}

function highlightBreadcrumb() {
  const breadcrumbItems = qsa('.breadcrumb__item');
  breadcrumbItems.forEach((item) => {
    if (item.dataset.page === pageId) {
      item.setAttribute('aria-current', 'page');
    }
  });
}

function updateFooterYear() {
  const yearHolder = qs('[data-current-year]');
  if (yearHolder) {
    yearHolder.textContent = new Date().getFullYear();
  }
}

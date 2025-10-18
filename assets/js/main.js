import { $, $$, loadComponent, fetchJSON, lazyLoadObserver, trapFocus } from './ui.js';
import { setupForms } from './forms.js';

const state = {
  listings: [],
  filters: {
    status: 'todos',
    city: 'todas',
  },
  currentPage: 1,
  itemsPerPage: 6,
};

const loadAllComponents = async () => {
  const placeholders = $$('[data-component]');
  await Promise.all(placeholders.map((placeholder) => {
    const { src } = placeholder.dataset;
    return loadComponent(placeholder, src);
  }));
};

const initNavigation = async () => {
  const navData = await fetchJSON('/data/nav.json');
  const navList = $('[data-nav-list]');
  const navMenu = $('[data-nav-menu]');
  const navToggle = $('[data-nav-toggle]');
  if (!navList || !navMenu || !navToggle) return;

  const currentPath = window.location.pathname.replace(/index.html$/, '');
  navList.innerHTML = navData.primary.map((item) => {
    const isActive = currentPath.endsWith(item.href.replace(/index.html$/, ''));
    return `<li><a class="site-nav__link" href="${item.href}" ${isActive ? 'aria-current="page"' : ''}>${item.label}</a></li>`;
  }).join('');

  let releaseFocus = null;

  const closeMenu = () => {
    navMenu.dataset.open = 'false';
    navMenu.hidden = true;
    navToggle.setAttribute('aria-expanded', 'false');
    releaseFocus?.();
    releaseFocus = null;
  };

  const openMenu = () => {
    navMenu.dataset.open = 'true';
    navMenu.hidden = false;
    navToggle.setAttribute('aria-expanded', 'true');
    releaseFocus = trapFocus(navMenu);
    const firstLink = $('a', navMenu);
    firstLink?.focus();
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.dataset.open === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navMenu.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });

  window.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      navToggle.focus();
    }
  });

  const syncMenuVisibility = (isMobile) => {
    if (isMobile) {
      closeMenu();
    } else {
      releaseFocus?.();
      releaseFocus = null;
      navMenu.hidden = false;
      navMenu.dataset.open = 'true';
      navToggle.setAttribute('aria-expanded', 'true');
    }
  };

  const media = window.matchMedia('(max-width: 768px)');
  syncMenuVisibility(media.matches);
  media.addEventListener('change', (event) => {
    syncMenuVisibility(event.matches);
  });

  const footerYear = $('[data-year]');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear().toString();
  }
};

const buildListingCard = (project) => {
  const statusClass = {
    vendido: 'badge-warning',
    disponible: 'badge-success',
    preventa: 'badge-warning',
  }[project.estado] ?? '';

  const statusLabel = project.estado.charAt(0).toUpperCase() + project.estado.slice(1);
  const srcBase = project.imagen;
  const srcset = `${srcBase}-640.jpg 640w, ${srcBase}-1280.jpg 1280w`;

  return `
    <article class="card" data-project-id="${project.id}" role="listitem">
      <div class="card__media">
        <span class="card__badge tag ${statusClass}">${statusLabel}</span>
        <img src="${srcBase}-640.jpg" srcset="${srcset}" sizes="(max-width: 600px) 100vw, 320px" alt="Render del proyecto ${project.nombre}" loading="lazy" />
      </div>
      <div class="card__body">
        <h3 class="card__title">${project.nombre}</h3>
        <div class="card__meta">
          <span aria-label="Ubicación">📍 ${project.ciudad}</span>
          <span aria-label="Tipología">🏠 ${project.tipologia}</span>
        </div>
        <p>${project.descripcion}</p>
        <div class="card__footer">
          <a class="btn btn--primary" href="#" data-track="project">Ver más</a>
        </div>
      </div>
    </article>
  `;
};

const populateFilters = (container, listings) => {
  if (!container) return;
  const cities = Array.from(new Set(listings.map((item) => item.ciudad)));
  const statuses = Array.from(new Set(listings.map((item) => item.estado)));

  container.innerHTML = `
    <label class="sr-only" for="filter-city">Filtrar por ciudad</label>
    <select id="filter-city" data-filter="city" aria-label="Filtrar por ciudad">
      <option value="todas" ${state.filters.city === 'todas' ? 'selected' : ''}>Todas las ciudades</option>
      ${cities.map((city) => `<option value="${city}" ${state.filters.city === city ? 'selected' : ''}>${city}</option>`).join('')}
    </select>
    <div class="flex" role="group" aria-label="Filtrar por estado">
      <button type="button" class="btn ${state.filters.status === 'todos' ? 'btn--primary' : ''}" data-filter="status" value="todos" aria-pressed="${state.filters.status === 'todos'}">Todos</button>
      ${statuses.map((status) => {
        const label = status.charAt(0).toUpperCase() + status.slice(1);
        const isActive = state.filters.status === status;
        return `<button type="button" class="btn ${isActive ? 'btn--primary' : ''}" data-filter="status" value="${status}" aria-pressed="${isActive}">${label}</button>`;
      }).join('')}
    </div>
  `;
};

const applyFilters = (listings) => {
  const { status, city } = state.filters;
  return listings.filter((item) => {
    const statusMatch = status === 'todos' || item.estado === status;
    const cityMatch = city === 'todas' || item.ciudad === city;
    return statusMatch && cityMatch;
  });
};

const renderListings = (container, paginationContainer, listings, options = {}) => {
  if (!container) return;
  const { limit } = options;
  let filtered = applyFilters(listings);

  if (typeof limit === 'number') {
    filtered = filtered.slice(0, limit);
  }

  if (paginationContainer) {
    const totalPages = Math.ceil(filtered.length / state.itemsPerPage) || 1;
    state.currentPage = Math.min(state.currentPage, totalPages);
    const start = (state.currentPage - 1) * state.itemsPerPage;
    const end = start + state.itemsPerPage;
    const paginated = filtered.slice(start, end);
    paginationContainer.innerHTML = Array.from({ length: totalPages }, (_, index) => {
      const page = index + 1;
      const isCurrent = page === state.currentPage;
      return `<button type="button" class="pagination__button" data-page="${page}" aria-current="${isCurrent}">${page}</button>`;
    }).join('');
    paginationContainer.hidden = totalPages <= 1;
    container.innerHTML = paginated.map(buildListingCard).join('');
  } else {
    container.innerHTML = filtered.map(buildListingCard).join('');
  }

  if (window.analytics && typeof window.analytics.track === 'function') {
    window.analytics.track('listings_rendered', { total: filtered.length });
  }
};

const setupListingsSections = (listings) => {
  const sections = $$('[data-listing-section]');
  sections.forEach((section) => {
    const parent = section.closest('[data-component]') ?? section.parentElement;
    const variant = parent?.dataset.variant ?? 'default';
    const limit = parent?.dataset.limit ? Number(parent.dataset.limit) : undefined;
    const filtersContainer = $('[data-listing-filters]', section);
    const grid = $('[data-listing-grid]', section);
    const pagination = $('[data-listing-pagination]', section);

    populateFilters(filtersContainer, listings);
    renderListings(grid, pagination, listings, { limit: variant === 'home' ? limit ?? 3 : undefined });

    filtersContainer?.addEventListener('change', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLSelectElement)) return;
      state.filters[target.dataset.filter] = target.value;
      state.currentPage = 1;
      renderListings(grid, pagination, listings, { limit: variant === 'home' ? limit ?? 3 : undefined });
    });

    filtersContainer?.addEventListener('click', (event) => {
      const button = event.target;
      if (!(button instanceof HTMLButtonElement)) return;
      if (button.dataset.filter !== 'status') return;
      state.filters.status = button.value;
      $$('button[data-filter="status"]', filtersContainer).forEach((btn) => {
        btn.setAttribute('aria-pressed', btn === button ? 'true' : 'false');
        btn.classList.toggle('btn--primary', btn === button);
      });
      state.currentPage = 1;
      renderListings(grid, pagination, listings, { limit: variant === 'home' ? limit ?? 3 : undefined });
    });

    pagination?.addEventListener('click', (event) => {
      const button = event.target;
      if (!(button instanceof HTMLButtonElement)) return;
      const page = Number(button.dataset.page);
      if (Number.isNaN(page)) return;
      state.currentPage = page;
      renderListings(grid, pagination, listings, { limit: undefined });
    });
  });
};

const renderTestimonials = (items) => {
  const track = $('[data-testimonial-track]');
  if (!track) return;
  track.innerHTML = items.map((item) => `
    <article class="testimonial-card" role="listitem">
      <p>“${item.mensaje}”</p>
      <div class="testimonial-card__meta">
        <div class="testimonial-card__avatar" aria-hidden="true">${item.iniciales}</div>
        <div>
          <strong>${item.nombre}</strong>
          <div class="text-muted">${item.rol}</div>
        </div>
      </div>
    </article>
  `).join('');
};

const renderFaq = (items) => {
  const container = $('[data-faq-list]');
  if (!container) return;
  container.innerHTML = items.map((item, index) => `
    <article class="accordion" data-accordion>
      <div class="accordion__item">
        <h3>
          <button class="accordion__button" type="button" aria-expanded="${index === 0 ? 'true' : 'false'}" aria-controls="faq-panel-${index}" id="faq-trigger-${index}">
            <span>${item.pregunta}</span>
            <span class="accordion__icon" aria-hidden="true">⌄</span>
          </button>
        </h3>
        <div class="accordion__panel" id="faq-panel-${index}" role="region" aria-labelledby="faq-trigger-${index}" ${index === 0 ? '' : 'hidden'}>
          <p>${item.respuesta}</p>
        </div>
      </div>
    </article>
  `).join('');

  container.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!(button instanceof HTMLButtonElement)) return;
    const expanded = button.getAttribute('aria-expanded') === 'true';
    const panel = $(`#${button.getAttribute('aria-controls')}`);
    button.setAttribute('aria-expanded', String(!expanded));
    if (panel) {
      panel.toggleAttribute('hidden', expanded);
    }
  });
};

const initCarousel = () => {
  const carousel = $('[data-carousel]');
  if (!carousel) return;
  const viewport = $('[data-carousel-viewport]', carousel);
  const prev = $('[data-carousel-prev]', carousel);
  const next = $('[data-carousel-next]', carousel);
  if (!viewport || !prev || !next) return;

  prev.addEventListener('click', () => {
    viewport.scrollBy({ left: -viewport.clientWidth, behavior: 'smooth' });
  });
  next.addEventListener('click', () => {
    viewport.scrollBy({ left: viewport.clientWidth, behavior: 'smooth' });
  });
};

const initTabs = () => {
  const groups = $$('[data-tabs]');
  groups.forEach((group) => {
    const triggers = $$('[role="tab"]', group);
    const panels = $$('[role="tabpanel"]', group);

    const activate = (trigger) => {
      triggers.forEach((tab) => {
        const isActive = tab === trigger;
        tab.setAttribute('aria-selected', String(isActive));
        tab.classList.toggle('btn--primary', isActive);
      });
      panels.forEach((panel) => {
        const isTarget = panel.id === trigger.getAttribute('aria-controls');
        panel.setAttribute('aria-hidden', String(!isTarget));
        panel.toggleAttribute('hidden', !isTarget);
      });
    };

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => activate(trigger));
      trigger.addEventListener('keydown', (event) => {
        const index = triggers.indexOf(trigger);
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          const nextIndex = (index + 1) % triggers.length;
          triggers[nextIndex].focus();
          activate(triggers[nextIndex]);
        }
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          const prevIndex = (index - 1 + triggers.length) % triggers.length;
          triggers[prevIndex].focus();
          activate(triggers[prevIndex]);
        }
      });
    });

    const initial = triggers.find((tab) => tab.getAttribute('aria-selected') === 'true') ?? triggers[0];
    if (initial) {
      activate(initial);
    }
  });
};

const initLazyMedia = () => {
  const observer = lazyLoadObserver();
  $$('img[data-src], source[data-srcset]').forEach((element) => observer.observe(element));
};

const initBreadcrumbs = () => {
  const breadcrumb = $('[data-breadcrumbs]');
  if (!breadcrumb) return;
  const pathSegments = window.location.pathname.split('/').filter(Boolean);
  const filtered = pathSegments.filter((segment) => segment !== 'pages');
  const crumbs = filtered.map((segment, index) => {
    const label = segment.replace('.html', '');
    const hrefSegments = pathSegments.slice(0, pathSegments.indexOf(segment) + 1);
    const href = `/${hrefSegments.join('/')}`;
    const text = label === 'index' ? 'Inicio' : label.charAt(0).toUpperCase() + label.slice(1);
    return `<li class="breadcrumbs__item"><a href="${href}">${text}</a></li>`;
  });
  breadcrumb.innerHTML = `<li class="breadcrumbs__item"><a href="/index.html">Inicio</a></li>${crumbs.join('')}`;
};

const initAnalyticsHooks = () => {
  document.body.addEventListener('click', (event) => {
    const target = event.target.closest('[data-track]');
    if (!target || !window.analytics) return;
    window.analytics.track('interaction', {
      action: target.dataset.track,
      href: target.getAttribute('href'),
      text: target.textContent?.trim(),
    });
  });
};

const init = async () => {
  await loadAllComponents();
  await initNavigation();
  initCarousel();
  initTabs();
  initBreadcrumbs();
  initAnalyticsHooks();

  state.listings = await fetchJSON('/data/listings.json');
  setupListingsSections(state.listings);

  const [testimonials, faq] = await Promise.all([
    fetchJSON('/data/testimonials.json'),
    fetchJSON('/data/faq.json'),
  ]);
  renderTestimonials(testimonials);
  renderFaq(faq);

  initLazyMedia();
  setupForms();
};

window.addEventListener('DOMContentLoaded', init);

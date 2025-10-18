# ProLocativo - Sitio estático corporativo

ProLocativo es un sitio 100% estático inspirado en firmas inmobiliarias corporativas. Utiliza únicamente HTML, CSS y JavaScript vanilla con datos en JSON.

## Estructura del proyecto
```
assets/
  css/
    base.css
    layout.css
    components.css
    pages.css
  js/
    main.js
    ui.js
    forms.js
  img/
    .gitkeep
components/
  header.html
  footer.html
  hero.html
  card-listing.html
  testimonial.html
  faq.html
pages/
  index.html
  proyectos.html
  nosotros.html
  contacto.html
  blog.html
data/
  nav.json
  listings.json
  faq.json
  testimonials.json
docs/
  ARCHITECTURE.md
  IMAGES_TODO.md
  TODO.md
404.html
manifest.webmanifest
robots.txt
sitemap.xml
README.md
```

## Requisitos
No se requieren dependencias ni compilación. Basta con un navegador moderno.

## Cómo ejecutar localmente
1. Clona el repositorio y entra en la carpeta del proyecto.
2. Inicia un servidor estático, por ejemplo:
   ```bash
   python -m http.server 5173
   ```
3. Abre `http://localhost:5173/index.html` en tu navegador.

> También puedes usar extensiones como “Live Server” o cualquier servidor ligero (serve, http-server, etc.).

## Gestión de contenidos
- **Componentes**: Los fragmentos HTML en `/components` se cargan dinámicamente usando `data-component`. Para modificar el header o footer actualiza los archivos correspondientes.
- **Datos**: Navegación, proyectos, FAQs y testimonios viven en `/data/*.json`. Ajusta o agrega entradas y el sitio se actualizará en la siguiente carga.
- **Páginas**: Los documentos en `/pages` contienen contenido específico y referencian los componentes comunes. Duplicar uno es la forma más sencilla de crear nuevas secciones.

## Estilos y diseño
- Paleta controlada mediante variables CSS definidas en `assets/css/base.css` (`--primary`, `--secondary`, `--ink`, etc.).
- Estructura y layout en `layout.css`; componentes reutilizables en `components.css`; ajustes por página en `pages.css`.
- Se emplea BEM ligero (ej. `.card__media`) y utilidades (`.container`, `.grid`, `.btn`).
- Fuentes Poppins y Merriweather se cargan desde Google Fonts con `display=swap`.

## JavaScript
- `ui.js` expone utilidades de DOM, lazy loading, formateo y carga de componentes.
- `main.js` gestiona navegación, breadcrumbs, filtros de proyectos, paginación, testimonios, FAQs y hooks de analítica.
- `forms.js` valida el formulario de contacto, aplica máscara de teléfono y expone `sendForm()` como stub que imprime en consola.

## Añadir imágenes
- Coloca los archivos optimizados en `assets/img/` siguiendo las rutas documentadas en `docs/IMAGES_TODO.md`.
- Utiliza formatos JPEG/WEBP ligeros y genera versiones 1x (640px) y 2x (1280px) según la tabla.
- Mantén los atributos `alt`, `srcset` y `loading="lazy"` como están en el código para garantizar accesibilidad y rendimiento.

## SEO y analítica
- El sitio incluye `robots.txt`, `sitemap.xml`, etiquetas Open Graph y Twitter Card.
- Los botones y CTAs despachan eventos `analytics.track` si existe `window.analytics`.
- El formulario dispara el evento `form:submitted` para integraciones posteriores.

## Extensión futura
Consulta `docs/ARCHITECTURE.md` para entender las decisiones de diseño y `docs/TODO.md` para el backlog recomendado. Cada nueva funcionalidad debe mantener el enfoque estático y accesible del proyecto.

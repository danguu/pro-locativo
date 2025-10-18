# Pro Locativo

Sitio corporativo para Pro Locativo basado en React + Vite con arquitectura de diseño atómico, datos centralizados y optimizaciones de accesibilidad, SEO y rendimiento pensadas para despliegue en GitHub Pages u otros hosts estáticos.

## Requisitos previos

- [Node.js](https://nodejs.org/) 18 LTS o superior.
- npm 9 o superior (incluido con Node).

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm install` | Instala las dependencias. |
| `npm run dev` | Inicia el servidor de desarrollo en modo Vite. |
| `npm run build` | Genera la versión optimizada lista para producción en `dist/`. |
| `npm run preview` | Sirve localmente el build generado para verificación final. |
| `npm run lint` | Ejecuta ESLint sobre todo el proyecto. |

> Consejo: antes de desplegar ejecuta `npm run lint && npm run build` para asegurar que no hay errores estáticos.

## Estructura del proyecto

```
public/
  assets/
    icons/           # Favicons y recursos PWA
    img/             # Imágenes finales (repositorio vacío con .gitkeep)
    placeholders/    # SVG temporales autogenerados
  manifest.webmanifest
  robots.txt
  sitemap.xml
src/
  components/        # Componentes atómicos y de composición
  data/              # Contenido estructurado en JSON
  images/            # Mapeo de imágenes (`images.map.json`)
  lib/               # Utilidades compartidas (p. ej. helpers para imágenes)
  pages/             # Páginas de aplicación (React Router)
  styles/            # Tokens, estilos base, layout, componentes y utilidades
  types/             # Tipado de datos de contenido
  utils/             # Funciones JS/TS reutilizables (lazyload, schema, etc.)
```

### Diseño atómico y estilos

- `src/styles/tokens.css`: define paleta, tipografías, espaciados, sombras y radios. Permite crear variaciones temáticas controladas.
- `src/styles/{base,layout,components,utilities}.css`: capas separadas con utilidades accesibles (focus rings, glassmorphism, gradientes) y patrones reutilizables.
- Componentes atómicos se encuentran dentro de `src/components/`. Cada subcarpeta agrupa JSX/TSX + estilos asociados (si aplica) y documentación en comentarios de bloque.

### Datos centralizados

Todos los textos y configuraciones editables viven en `src/data/`:

- `site.json`: identidad de marca, datos de contacto, enlaces legales y sociales. Contiene campos `TODO` que deben actualizarse con información real (dirección, NIT, etc.).
- `navigation.json`: controla la navegación global consumida por `Navbar` y `Footer`.
- `properties.json`, `testimonials.json`, `faqs.json`: datasets consumidos por páginas y componentes.

### Mapeo y reemplazo de imágenes

`src/images/images.map.json` describe cada recurso visual utilizado. Cada entrada define:

- `id`: identificador a usar en componentes (`imageId`).
- `filename` y `variants`: nombres esperados para los archivos reales.
- `target_path`: ubicación final dentro de `public/assets/img`.
- `alt`: texto alternativo obligatorio.

Los componentes obtienen rutas a través de `@/lib/images`. Actualmente apuntan a SVG de `public/assets/placeholders/` y añaden un patrón visual indicando que la imagen es temporal. Para sustituir por versiones finales:

1. Reemplaza cada placeholder por el archivo definitivo respetando el nombre indicado en `images.map.json` y guárdalo en `public/assets/img/`.
2. (Opcional) Añade variantes responsivas en los tamaños sugeridos.
3. Ejecuta `npm run build` para validar que no se rompen rutas.

### SEO y accesibilidad

- El componente `<Seo>` actualiza dinámicamente `<title>`, meta descripciones, Open Graph, Twitter Cards, canonical y `og:locale`. Usa la información de `site.json` y admite override de URL/imagen por página.
- `createPropertyGraph` en `src/utils/schema.ts` genera marcado Schema.org (`Product` + `Offer`) a partir de los datos de propiedades. Las páginas de Proyectos e Inmuebles inyectan el JSON-LD correspondiente.
- `index.html` incluye marcado `RealEstateAgent` y `WebSite`, además de enlaces a `manifest`, `robots` y `sitemap`.
- Elementos interactivos incluyen estados de foco visibles (`focus-ring`) y navegación por teclado (`summary` en FAQ, botones, enlaces).

### Añadir un nuevo inmueble o proyecto

1. Crea una nueva entrada en `src/data/properties.json` con el mismo esquema (`id`, `nombre`, `ubicacion`, `estatus`, `tipologias`, `area_desde`, `precio_desde`, `amenidades`, `slug`, `imageId`).
2. Añade la referencia de imagen en `src/images/images.map.json` si no existe. Genera un placeholder con el mismo nombre bajo `public/assets/placeholders/` o sube la imagen final a `public/assets/img/`.
3. Actualiza `slug` para que coincida con la URL que se mostrará en los botones “Ver detalle”.
4. Ejecuta `npm run lint` y revisa la consola del navegador para asegurar que no hay advertencias.

### Añadir una nueva página

1. Crea un archivo en `src/pages/` siguiendo el patrón de las páginas existentes (importa `<Seo>` y `<Hero>`).
2. Registra la ruta en `src/App.tsx` y, si debe aparecer en la navegación, agrega la entrada en `src/data/navigation.json`.
3. Extiende los datos en `site.json` o en un nuevo archivo dentro de `src/data/` si la página requiere contenido estructurado específico.
4. Incluye la página en `public/sitemap.xml` para SEO.

### Imágenes y placeholders

Los componentes que aún muestran placeholders añaden un patrón visual y `data-placeholder="true"`. Sustituye los archivos en `public/assets/img/` para que el estilo se remueva automáticamente (al actualizar `getPlaceholderSrc` o usando los mismos nombres). Documenta los cambios en `images.map.json` al subir variantes.

### Despliegue

1. Ejecuta `npm run build` para generar `dist/`.
2. Publica el contenido de `dist/` en GitHub Pages o el host estático de tu preferencia.
3. Asegúrate de copiar también `robots.txt`, `sitemap.xml`, `manifest.webmanifest` y el directorio `assets/`.

### Tareas pendientes y TODOs

- Reemplazar datos marcados con `TODO:` en `site.json` y en los textos de las páginas (dirección, NIT, enlaces legales, etc.).
- Sustituir las imágenes de `public/assets/placeholders/` por recursos finales optimizados (`.webp`/`.jpg`/`.svg`).
- Implementar páginas de detalle para cada inmueble/proyecto si se requiere navegación profunda.
- Ejecutar auditorías Lighthouse y Axe para certificar las metas ≥90 en Core Web Vitals.

## Contribución

- Sigue el estilo y convenciones existentes (componentes tipados con TypeScript, clases utilitarias desde `tokens` y `utilities`).
- Mantén los datos nuevos dentro de `src/data` y evita strings hardcodeados en componentes.
- Documenta cambios estructurales en `REFORMAS.md`.

¡Gracias por contribuir al ecosistema Pro Locativo!

# Kolbing Like – Sitio corporativo

Refactorización del sitio corporativo Kolbing Like utilizando Vite, React, TypeScript y TailwindCSS. El diseño replica patrones de portales inmobiliarios corporativos, manteniendo el copy original del proyecto.

## Tabla de contenido
- [Stack y dependencias](#stack-y-dependencias)
- [Ejecución](#ejecución)
- [Scripts disponibles](#scripts-disponibles)
- [Estructura de carpetas](#estructura-de-carpetas)
- [Datos y contenido](#datos-y-contenido)
- [Accesibilidad y UX](#accesibilidad-y-ux)
- [Assets e imágenes](#assets-e-imágenes)
- [CI y calidad](#ci-y-calidad)

## Stack y dependencias
- [Vite](https://vitejs.dev/) como bundler.
- [React 18](https://react.dev/) + [React Router 6](https://reactrouter.com/) para navegación multi página.
- [TypeScript](https://www.typescriptlang.org/) con tipado estricto.
- [TailwindCSS](https://tailwindcss.com/) y utilidades personalizadas en `src/styles/tailwind.css`.
- Componentes de interacción construidos sobre Radix UI (tabs, accordions, sheet, navigation-menu).
- Validación de formularios con [React Hook Form](https://react-hook-form.com/) y [Zod](https://zod.dev/).

## Ejecución
Instala dependencias (npm 10+):

```bash
npm install
```

Inicia el entorno de desarrollo:

```bash
npm run dev
```

Genera la build de producción:

```bash
npm run build
```

## Scripts disponibles
| Comando | Descripción |
| --- | --- |
| `npm run dev` | Arranca el servidor de desarrollo en `http://localhost:5173`. |
| `npm run build` | Compila la aplicación para producción. |
| `npm run build:dev` | Build de prueba con modo development. |
| `npm run preview` | Sirve la build generada localmente. |
| `npm run lint` | Ejecuta ESLint con `--max-warnings=0`. |
| `npm run typecheck` | Valida tipos con TypeScript sin emitir archivos. |
| `npm run format` | Ejecuta Prettier en modo `--check`. |

> **Nota:** Si tu entorno tiene restricciones para descargar paquetes (por ejemplo, `prettier`), instala manualmente las dependencias permitidas o configura un mirror interno.

## Estructura de carpetas
```
/public
  /img
    .gitkeep
/src
  /assets           # Datos estáticos y contenidos corporativos
  /components
    /cards          # Tarjetas reutilizables (proyectos, testimonios, FAQ)
    /forms          # Formularios con validación (ContactForm)
    /layout         # Header, Footer, Breadcrumbs, Scroll helpers
    /media          # HeroSlider, GalleryCarousel
    /nav            # DesktopNav, MobileDrawer
    /ui             # Átomos y utilidades (Buttons, Inputs, FiltersBar, etc.)
  /layouts          # DefaultLayout, LandingLayout
  /lib              # Utilidades, hooks y formatters
  /pages            # Páginas enroutadas (`Home`, `Projects`, etc.)
  /routes           # Configuración de rutas
  /styles           # Entrada Tailwind y utilidades globales
  app.tsx           # Enrutador basado en `useRoutes`
  main.tsx          # Bootstrap de React + React Router
```

## Datos y contenido
- `src/assets/content.ts` centraliza copy, proyectos, testimonios, FAQs, KPIs y navegación.
- Proyectos (`/proyectos/:slug`) incluyen galería, ficha técnica, tabla de indicadores y CTA persistente.
- Los filtros de proyectos sincronizan estado con la URL (`useQueryState`) y soportan búsqueda por texto, chips de categoría, selectores múltiples de ciudad/estado y paginación.

## Accesibilidad y UX
- Header sticky con barra superior de contacto, menú de escritorio (Radix NavigationMenu) y Drawer móvil accesible.
- Hero Slider con `aria-live`, indicadores, autoplay con pausa en hover y navegación por teclado.
- Componentes con estados de hover/focus visibles, `skip to content`, contraste AA y navegación con teclado asegurada.
- Formularios con mensajes de error descriptivos y validación en cliente.

## Assets e imágenes
- No se versionan imágenes finales: carga los archivos siguiendo el [IMAGE_MAP](./IMAGE_MAP.md).
- Todos los `img` usan `loading="lazy"`, `sizes/srcset` y `alt` descriptivos.
- Cuando no se proporcionan assets se muestra `FallbackImage` con fondo neutro y texto.

## CI y calidad
- ESLint configurado con reglas de hooks y React Refresh.
- Prettier configurado en `prettier.config.cjs` (usa `npm run format`).
- Workflow de CI sugerido: ejecutar `npm install`, `npm run build`, `npm run lint` y `npm run typecheck`.

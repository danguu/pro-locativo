# Kolbing Like – Sitio Corporativo

Refactorización completa del sitio Kolbing Like basada en patrones corporativos inspirados en Amarilo. Se mantienen todos los textos originales y se moderniza la experiencia de navegación con componentes accesibles y estructura modular.

## Tecnologías

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) con utilidades personalizadas
- [React Router](https://reactrouter.com/) para el ruteo declarativo
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) para validación del formulario de contacto

## Requisitos previos

- Node.js 18 o superior
- npm (viene con Node). Si prefieres `pnpm` o `yarn`, elimina `package-lock.json` y genera el archivo de bloqueo correspondiente.

## Scripts disponibles

```bash
npm install        # instala dependencias
npm run dev        # arranca Vite en modo desarrollo
npm run lint       # ejecuta ESLint con la configuración del proyecto
npm run typecheck  # ejecuta el chequeo de tipos sin emitir archivos
npm run build      # genera la build optimizada de producción
npm run preview    # sirve la build generada en modo preview
```

## Estructura de carpetas

```
/public
  /img              # carpeta reservada para los assets del cliente (ver IMAGE_MAP.md)
/src
  /assets           # datos estáticos (JSON, contenido de interfaz)
  /components
    /layout         # Header, Footer, Breadcrumbs, SkipToContent
    /nav            # Navegación de escritorio y móvil
    /cards          # Tarjetas reutilizables (ProjectCard, TestimonialCard, FAQItem)
    /media          # HeroSlider, GalleryCarousel, FallbackImage, VideoEmbed
    /forms          # ContactForm, FiltersBar
    /ui             # Componentes base (shadcn + utilidades)
  /layouts          # DefaultLayout, LandingLayout
  /lib              # Helpers, tipos y acceso a datos mock
  /pages            # Rutas: Home, Proyectos, Detalle, Nosotros, FAQ, Testimonios, Contacto, NotFound
  /routes           # Definición de rutas de React Router
  /styles           # Archivo principal de Tailwind
  app.tsx           # Providers globales y router
  main.tsx          # Punto de entrada de React
```

## Diseño y decisiones clave

- **Navegación corporativa**: Header sticky con barra superior de contacto, mega menú accesible y drawer móvil con acordeones. CTA persistente "Contáctanos" disponible en todas las vistas.
- **Home hero**: Slider a pantalla completa con autoplay, control mediante teclado y botones para pausar o navegar manualmente. El contenido se mantiene fiel al copy original.
- **Listado de proyectos**: Grid responsiva con tarjetas, filtros combinables (chips, select múltiple y búsqueda por texto) y carga incremental.
- **Detalle de proyecto**: Hero con datos clave, galería con miniaturas, ficha técnica en acordeones, tabla de datos y stub de mapa con enlace a Google Maps. CTA flotante para agendar llamada.
- **Secciones corporativas**: Páginas dedicadas para Nosotros, FAQ, Testimonios y Contacto. El formulario usa validación estricta con Zod y feedback de éxito/error.
- **Accesibilidad**: Skip link, componentes con `aria-*`, estados de foco visibles, contraste AA y elementos interactivos navegables con teclado.
- **Rendimiento y SEO**: Imágenes declaradas con `loading="lazy"` y placeholders en `/public/img`. Metadatos base actualizados en `index.html` (title, description, Open Graph). Tailwind se limita a las rutas utilizadas.
- **Dev Experience**: Configuración estricta de TypeScript, scripts de lint y typecheck, y workflow de GitHub Actions (`.github/workflows/ci.yml`) que valida lint, typecheck y build en cada PR.

## Gestión de imágenes

La carpeta `/public/img` permanece vacía en el repositorio para respetar la restricción de no incluir binarios. Consulta `IMAGE_MAP.md` para conocer la lista de imágenes esperadas, en qué componentes se usan y los tamaños recomendados. Coloca tus archivos finales respetando esa estructura antes de desplegar.

## Cómo aportar nuevos contenidos

1. Agrega la información necesaria en los archivos de datos (`src/assets/content.ts` o `src/assets/projects.json`).
2. Si se requieren nuevas páginas, define la ruta correspondiente en `src/routes/AppRoutes.tsx` y crea el componente en `src/pages`.
3. Sigue la convención de componentes atómicos en `src/components` para mantener la coherencia del diseño.

## Pruebas manuales sugeridas

- Navegar por todas las rutas (`/`, `/proyectos`, `/proyectos/:slug`, `/nosotros`, `/faq`, `/testimonios`, `/contacto`).
- Validar que los filtros de proyectos actualicen la URL y sean persistentes al refrescar.
- Probar el formulario de contacto con datos válidos/erróneos para verificar los mensajes de validación.
- Usar teclado (Tab, Shift+Tab, Enter, Space) para comprobar la navegabilidad y accesibilidad.

## Despliegue

1. Añade los assets definitivos a `/public/img` según `IMAGE_MAP.md`.
2. Ejecuta `npm run build` y `npm run preview` para validar la build productiva.
3. Publica el contenido estático generado en `dist/` en tu hosting preferido (Netlify, Vercel, GitHub Pages, etc.).

---

Para dudas o mejoras, abre un issue o crea un pull request siguiendo el flujo de CI incluido.

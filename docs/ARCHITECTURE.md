# Arquitectura del sitio

## Tecnologías
- HTML semántico con componentes reutilizables cargados dinámicamente.
- CSS modular dividido en capas: `base`, `layout`, `components`, `pages`.
- JavaScript vanilla con módulos ES para navegación, UI y formularios.
- Datos en archivos JSON para menú, proyectos, preguntas frecuentes y testimonios.

## Patrones clave
- **Componentes HTML**: se consumen mediante `data-component` y `fetch`. Permite actualizar secciones comunes sin duplicar código.
- **Estado global ligero**: `assets/js/main.js` mantiene filtros y paginación de proyectos para sincronizar diferentes vistas.
- **Utilidades compartidas**: `ui.js` centraliza selectores, lazy loading, trap-focus y formateo de teléfono.
- **Accesibilidad**: navegación con teclado, `aria-*`, foco controlado en menús y acordeón accesible.
- **Analítica hookeable**: todas las interacciones relevantes despachan eventos que una implementación externa puede escuchar.

## Flujo de carga
1. `DOMContentLoaded` ejecuta `init()` en `main.js`.
2. Se cargan componentes HTML declarados con `data-component`.
3. Se inicializa navegación, breadcrumbs, carrusel y hooks de analítica.
4. Se cargan datasets JSON para proyectos, testimonios y preguntas frecuentes.
5. Se renderizan tarjetas, acordeón y carrusel con los datos recibidos.
6. Se activan utilidades de lazy load y validación de formularios.

## Extensibilidad
- **Nuevos componentes**: crear el fragmento HTML en `/components` y referenciarlo con `data-component` en la página deseada.
- **Nuevas páginas**: duplicar una estructura base en `/pages`, actualizar metadatos y breadcrumbs; los componentes comunes se cargan automáticamente.
- **Más datasets**: agregar archivos JSON en `/data` y consumirlos desde `main.js` o módulos propios.
- **Estilos adicionales**: crear bloques BEM en `components.css` o variantes en `pages.css`. Mantener utilidades y variables en `base.css`.
- **Integraciones**: usar los eventos `window.analytics.track` y `form:submitted` para conectar herramientas de terceros.

## Buenas prácticas
- Mantener atributos `loading="lazy"` y `srcset` para imágenes.
- Usar `aria-current="page"` en navegación para estado activo.
- Añadir pruebas manuales de accesibilidad: tabulación, contraste y lectores de pantalla.
- Documentar cualquier nuevo dataset o componente en `README.md` o en un archivo en `docs/`.

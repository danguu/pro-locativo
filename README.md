# Pro Locativo

Sitio web corporativo estático inspirado en experiencias inmobiliarias premium. El proyecto utiliza HTML semántico, CSS modular y JavaScript vanilla para ofrecer una interfaz moderna, accesible y de alto rendimiento.

## Estructura del proyecto

```
assets/
  css/
    base.css        # Reset, variables, tipografía y utilidades globales
    layout.css      # Contenedores, grid, header, footer y layout responsive
    components.css  # Botones, tarjetas, acordeones, carrusel y formularios
    pages.css       # Ajustes específicos por página
  js/
    ui.js           # Utilidades DOM, lazy load, helpers
    main.js         # Carga de componentes, navegación, listados, carrusel
    forms.js        # Validación y envío (stub) del formulario de contacto
  img/
    .gitkeep        # Mantener carpeta disponible para recursos futuros
components/         # Fragmentos HTML reutilizables (header, hero, footer, etc.)
pages/              # Páginas principales (inicio, proyectos, nosotros, blog, contacto)
data/               # Contenido dinámico en JSON (menú, listados, FAQs, testimonios)
docs/               # Documentación técnica y pendientes
favicon.ico         # Marcador de favicon (reemplazar al publicar)
robots.txt          # Instrucciones para motores de búsqueda
sitemap.xml         # Sitemap básico
manifest.webmanifest# Configuración PWA mínima
404.html            # Página de error
```

## Ejecutar en local

No se requiere build. Cualquier servidor estático funciona.

```bash
# Opción con Python 3
python -m http.server 8000
# Visita http://localhost:8000
```

También puedes usar extensiones como **Live Server** o `npx serve`. Asegúrate de servir la carpeta raíz del repositorio para que las rutas absolutas funcionen.

## Añadir imágenes reales

1. Coloca los archivos en `assets/img/` siguiendo las rutas definidas en `docs/IMAGES_TODO.md`.
2. Incluye variantes 1x/2x optimizadas (JPEG/WEBP) y mantén un peso reducido.
3. Actualiza las descripciones `alt` si el contenido varía.
4. Si agregas nuevas imágenes, documenta la ruta y especificaciones en `docs/IMAGES_TODO.md`.

## Guía de estilos

- Paleta gestionada mediante variables CSS (`--primary`, `--secondary`, `--ink`, `--bg`, `--muted`, `--success`, `--warning`).
- Tipografía principal `Inter` con `Merriweather` para realces; `display=swap` garantiza carga progresiva.
- Componentes nombrados con convención BEM ligera (`.hero__title`, `.card__media`).
- Utilidades prefijadas con `u-` para espaciado, alineación y contenedores.
- Estados `:hover` y `:focus-visible` definidos para accesibilidad AA.

## Crear nuevas páginas o componentes

1. Duplica una página existente dentro de `/pages/`.
2. Cambia el atributo `data-page` del `<body>` y ajusta títulos, descripciones y breadcrumbs.
3. Si necesitas secciones repetibles, crea un fragmento en `/components/` y carga con `data-component` + `main.js`.
4. Agrega la ruta al menú en `data/nav.json` y al `sitemap.xml` si es pública.
5. Para contenido dinámico, crea un nuevo archivo JSON en `/data/` y consúmelo desde `main.js` utilizando los helpers de `ui.js`.

## Analítica y personalización

- `main.js` es el punto de entrada ideal para inyectar hooks de analítica o scripts externos usando `type="module"`.
- Utiliza la función `delegate()` para eventos y evita duplicar listeners.
- El stub `sendForm()` en `forms.js` registra los datos en consola; reemplázalo por una llamada fetch/axios según tu backend.

## Accesibilidad y pruebas

- Todos los menús, acordeones y formularios usan `aria-*` y soportan navegación con teclado.
- Verifica el contraste al introducir nuevos colores (objetivo WCAG AA).
- Recomendado ejecutar herramientas como [Lighthouse](https://developers.google.com/web/tools/lighthouse) o [Pa11y](https://pa11y.org/) tras cambios mayores.

## Contribuir

1. Crea una rama desde `main`.
2. Realiza modificaciones siguiendo la convención de carpetas y utilidades existentes.
3. Actualiza documentación (`README`, `docs/ARCHITECTURE.md`, `docs/IMAGES_TODO.md`) cuando aplique.
4. Ejecuta una revisión manual navegando en desktop y mobile antes de subir los cambios.

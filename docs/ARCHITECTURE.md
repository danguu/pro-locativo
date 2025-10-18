# Arquitectura de Pro Locativo

## Principios

- **100% estático:** Solo HTML, CSS y JavaScript modular sin dependencias de build.
- **Componentización ligera:** Los fragmentos en `/components/` se insertan en runtime para reutilizar estructura y mantener consistencia.
- **Datos desacoplados:** La información dinámica mínima (navegación, proyectos, FAQ, testimonios) vive en `/data/` y se consume con `fetch`.
- **Accesibilidad y SEO:** Navegación por teclado, aria-atributos, metadatos por página y contenido semántico.
- **Performance first:** Lazy load para imágenes, CSS modular, JavaScript en módulos diferidos, sin cargas bloqueantes.

## Estructura de carpetas

```
/assets/
  css/        # base, layout, componentes y estilos específicos
  js/         # ui.js (utilidades), main.js (comportamiento), forms.js (validaciones)
  img/        # repositorio para futuras imágenes (mantener .gitkeep)
/components/  # Fragmentos HTML reutilizables (header, footer, hero, etc.)
/pages/       # Páginas principales: index, proyectos, nosotros, blog y contacto
/data/        # JSON con contenido dinámico
/docs/        # Documentación técnica y pendientes
```

## Flujo de carga

1. El HTML referencia `data-component` con la ruta del fragmento.
2. `main.js` itera los placeholders y usa `loadComponent()` para insertar el HTML.
3. Posteriormente inicializa navegación, métricas, listados y otros módulos según `data-page` en `<body>`.
4. Los datos JSON se cargan on-demand, permitiendo mantener contenido editable sin tocar las plantillas.
5. `forms.js` añade validaciones accesibles y máscara de teléfono, con un stub `sendForm()` listo para conectar a APIs futuras.

## Extender el sitio

- **Nuevos componentes:** Crear el fragmento en `/components/` y referenciarlo con `data-component`. Si necesita datos externos, agregar un JSON en `/data/` y consumirlo desde `main.js`.
- **Nuevas páginas:** Copiar la estructura base de `/pages/`, actualizar `data-page`, metadatos y breadcrumbs. Agregar la ruta en `data/nav.json` y `sitemap.xml` si es pública.
- **Nuevos listados:** Reutilizar `renderListings()` pasando opciones (paginación, filtros) o crear un módulo específico siguiendo el patrón en `main.js`.
- **Analítica:** Inserta tu script en `main.js` dentro de una función dedicada (p.ej. `initAnalytics()`), respetando la carga diferida.

## Buenas prácticas

- Mantener los textos alternativos descriptivos y los roles aria actualizados.
- Actualizar `IMAGES_TODO.md` al añadir recursos gráficos.
- Usar utilidades de `ui.js` (delegación, creación de nodos) para evitar código duplicado.
- Documentar cambios significativos en `docs/TODO.md` o en el README.

# Guía del Proyecto - Sitio Web Corporativo

## 📁 Estructura de Archivos

```
proyecto/
├── public/                    # Archivos públicos estáticos
│   ├── robots.txt            # Configuración para motores de búsqueda
│   ├── sitemap.xml           # Mapa del sitio para SEO
│   └── favicon.ico           # Ícono del sitio
│
├── src/
│   ├── assets/               # 🖼️ IMÁGENES DEL SITIO (editar aquí)
│   │   ├── hero-main.jpg           # Imagen principal del inicio
│   │   ├── service-maintenance.jpg  # Servicio de mantenimiento
│   │   ├── service-renovation.jpg   # Servicio de remodelación
│   │   ├── service-electrical.jpg   # Servicio eléctrico
│   │   ├── team.jpg                 # Foto del equipo
│   │   └── building-management.jpg  # Gestión de edificios
│   │
│   ├── components/           # Componentes reutilizables
│   │   ├── layout/          # Componentes de diseño
│   │   │   ├── Header.tsx        # Menú de navegación superior
│   │   │   ├── Footer.tsx        # Pie de página
│   │   │   └── Breadcrumbs.tsx   # Migas de pan
│   │   └── ui/              # Componentes de interfaz
│   │       ├── button.tsx        # Botones
│   │       ├── card.tsx          # Tarjetas
│   │       ├── BackToTop.tsx     # Botón volver arriba
│   │       └── ... (otros componentes shadcn)
│   │
│   ├── pages/               # 📄 PÁGINAS DEL SITIO (editar contenido aquí)
│   │   ├── Index.tsx            # Página de inicio
│   │   ├── Servicios.tsx        # Página de servicios
│   │   ├── Nosotros.tsx         # Página sobre nosotros
│   │   ├── Blog.tsx             # Página de blog
│   │   ├── Contacto.tsx         # Página de contacto
│   │   ├── Testimonios.tsx      # Página de testimonios
│   │   ├── FAQ.tsx              # Preguntas frecuentes
│   │   └── NotFound.tsx         # Página 404
│   │
│   ├── index.css            # 🎨 Estilos globales y variables de diseño
│   ├── App.tsx              # Configuración de rutas
│   └── main.tsx             # Punto de entrada de la aplicación
│
├── tailwind.config.ts       # Configuración de Tailwind CSS
└── index.html               # HTML principal con metadatos SEO
```

---

## 🖼️ GUÍA DE IMÁGENES - Dónde Reemplazar Cada Imagen

### 1. Página de Inicio (Index.tsx)

#### **Imagen Hero Principal**
- **Archivo actual:** `src/assets/hero-main.jpg`
- **Ubicación en código:** `src/pages/Index.tsx` línea ~61
- **Uso:** Imagen de fondo de la sección hero principal
- **Dimensiones recomendadas:** 1920x1080px (ratio 16:9)
- **Cómo cambiar:**
  ```tsx
  import heroImg from "@/assets/hero-main.jpg"; // Cambia el nombre aquí
  ```

#### **Imagen de Gestión de Edificios**
- **Archivo actual:** `src/assets/building-management.jpg`
- **Ubicación en código:** `src/pages/Index.tsx` línea ~209
- **Uso:** Sección "Gestión Integral"
- **Dimensiones recomendadas:** 800x600px
- **Cómo cambiar:**
  ```tsx
  import buildingImg from "@/assets/building-management.jpg";
  ```

---

### 2. Página de Servicios (Servicios.tsx)

#### **Servicio de Mantenimiento**
- **Archivo actual:** `src/assets/service-maintenance.jpg`
- **Ubicación en código:** `src/pages/Servicios.tsx` línea ~7
- **Dimensiones recomendadas:** 600x400px
- **Cómo cambiar:**
  ```tsx
  import maintenanceImg from "@/assets/service-maintenance.jpg";
  ```

#### **Servicio de Remodelación**
- **Archivo actual:** `src/assets/service-renovation.jpg`
- **Ubicación en código:** `src/pages/Servicios.tsx` línea ~8
- **Dimensiones recomendadas:** 600x400px
- **Cómo cambiar:**
  ```tsx
  import renovationImg from "@/assets/service-renovation.jpg";
  ```

#### **Servicio Eléctrico**
- **Archivo actual:** `src/assets/service-electrical.jpg`
- **Ubicación en código:** `src/pages/Servicios.tsx` línea ~9
- **Dimensiones recomendadas:** 600x400px
- **Cómo cambiar:**
  ```tsx
  import electricalImg from "@/assets/service-electrical.jpg";
  ```

---

### 3. Página Nosotros (Nosotros.tsx)

#### **Imagen del Equipo**
- **Archivo actual:** `src/assets/team.jpg`
- **Ubicación en código:** `src/pages/Nosotros.tsx` línea ~7
- **Uso:** Foto del equipo de trabajo
- **Dimensiones recomendadas:** 1200x800px
- **Cómo cambiar:**
  ```tsx
  import teamImg from "@/assets/team.jpg";
  ```

#### **Imagen de Edificios**
- **Archivo actual:** `src/assets/building-management.jpg`
- **Ubicación en código:** `src/pages/Nosotros.tsx` línea ~8
- **Uso:** Sección "Nuestro Enfoque"
- **Dimensiones recomendadas:** 800x600px

---

## 📝 Cómo Reemplazar una Imagen

### Método 1: Reemplazar archivo directamente
1. Ve a la carpeta `src/assets/`
2. Borra la imagen antigua
3. Sube tu nueva imagen con **el mismo nombre**
4. El sitio se actualizará automáticamente

### Método 2: Usar un nuevo archivo
1. Sube tu nueva imagen a `src/assets/`
2. Abre el archivo de la página correspondiente (ver arriba)
3. Cambia el import:
   ```tsx
   // Antes:
   import heroImg from "@/assets/hero-main.jpg";
   
   // Después:
   import heroImg from "@/assets/mi-nueva-imagen.jpg";
   ```

---

## 🎨 Editar Contenido de Texto

### Página de Inicio
**Archivo:** `src/pages/Index.tsx`
- **Línea 61-69:** Título y subtítulo del hero
- **Línea 89-114:** Tarjetas de servicios
- **Línea 201-230:** Sección "Gestión Integral"
- **Línea 241-243:** Contadores (KPIs)

### Página de Servicios
**Archivo:** `src/pages/Servicios.tsx`
- **Línea 12-99:** Contenido de cada servicio
- **Línea 101-142:** Tabla de planes (Básico, Profesional, Empresarial)
- **Línea 144-206:** Tabs (Proceso, Materiales, Seguridad)

### Página Nosotros
**Archivo:** `src/pages/Nosotros.tsx`
- **Línea 17-33:** Timeline de historia
- **Línea 35-48:** Información del equipo
- **Línea 10-15:** Valores de la empresa

### Página de Contacto
**Archivo:** `src/pages/Contacto.tsx`
- **Línea 53-95:** Información de contacto
- **Línea 98-107:** Tarjetas de confianza

---

## 🎨 Cambiar Colores y Estilos

### Colores Principales
**Archivo:** `src/index.css` (líneas 9-50)
```css
--primary: 217 91% 60%;      /* Azul principal */
--secondary: 142 76% 36%;    /* Verde acento */
--ink: 222 47% 11%;          /* Fondo oscuro */
--accent: 217 91% 60%;       /* Color de acento */
```

### Tipografía
**Archivo:** `tailwind.config.ts` (líneas 20-24)
```ts
fontFamily: {
  sans: ["Poppins", "sans-serif"],
}
```

---

## 🔧 Configuración del Menú

**Archivo:** `src/components/layout/Header.tsx` (líneas 11-18)
```tsx
const navItems = [
  { name: "Inicio", path: "/" },
  { name: "Servicios", path: "/servicios" },
  { name: "Nosotros", path: "/nosotros" },
  // ... agregar más items aquí
];
```

---

## 📞 Información de Contacto

**Archivo:** `src/components/layout/Footer.tsx` (líneas 44-59)
```tsx
<p>Av. Principal 123, Ciudad</p>
<p>contacto@empresa.com</p>
<p>+1 234 567 890</p>
```

**También en:** `src/pages/Contacto.tsx` (líneas 60-75)

---

## 🚀 Comandos Útiles

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

---

## 💡 Consejos

1. **Optimiza las imágenes** antes de subirlas (usa TinyPNG o similar)
2. **Formatos recomendados:** JPG para fotos, PNG para logos/iconos
3. **Peso máximo recomendado:** 200KB por imagen
4. **Siempre usa nombres descriptivos** para las imágenes
5. **Después de cambiar imágenes**, verifica que se vean bien en móvil y desktop

---

## ❓ ¿Necesitas Ayuda?

- Problemas con imágenes: verifica que estén en `src/assets/`
- Problemas con colores: revisa `src/index.css` y `tailwind.config.ts`
- Problemas con contenido: busca el archivo de la página en `src/pages/`
- Problemas con el menú: edita `src/components/layout/Header.tsx`

---

**Última actualización:** Octubre 2025

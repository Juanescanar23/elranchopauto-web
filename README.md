<!-- Desarrollado por JECT -->
# El Rancho P Auto — Sitio Web

Sitio web bilingüe (inglés / español) de **El Rancho P Auto**, taller automotriz en Porter, Texas, con más de 35 años de experiencia en reparación honesta de vehículos.

🔗 **Demo:** https://elranchopauto.vercel.app

---

## Stack

Sitio **estático**, sin framework ni paso de build:

- **HTML5** semántico (5 páginas)
- **CSS3** escrito a mano con *custom properties* (design tokens) — sistema de color de marca rojo/negro
- **JavaScript vanilla** — sin librerías
- Tipografías **Roboto / Roboto Slab** (Google Fonts)

Desplegable en **Vercel, Hostinger** o cualquier hosting estático (solo subir el contenido de esta carpeta).

## Estructura

```
.
├── index.html          # Home
├── about.html          # Nosotros
├── services.html       # Servicios
├── appointment.html    # Cita
├── contact.html        # Contacto
├── css/styles.css      # Estilos + sistema de color de marca
├── js/main.js          # Menú móvil + manejo de formularios (demo)
├── js/i18n.js          # Selector de idioma EN/ES
├── assets/img/         # Logo, favicon e imágenes
└── vercel.json         # Configuración de hosting estático
```

## Características

- 📱 **Responsive** (móvil, tablet, escritorio)
- 🌐 **Bilingüe EN/ES** con selector en el header (persiste la preferencia)
- 🎨 **Paleta de marca** derivada del logo — rojo `#D81E26`, negro `#1A1718`
- 🔎 **SEO básico** — títulos, meta descripciones y textos alternativos
- ✅ Contraste **WCAG AA** verificado

## Desarrollo local

Abre `index.html` en el navegador, o sirve la carpeta:

```bash
npx serve .
```

## Pendientes / próximos pasos

- Conectar los formularios (cita y contacto) a correo o a un servicio como Formspree.
- Optimizar las imágenes PNG de servicios (~1 MB c/u) a WebP/JPG.

---

**Desarrollado por JECT** — *JectCode · Juan Esteban Cañar*
🌐 jectcode.dev

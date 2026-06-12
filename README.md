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
- **PHP** para envío real de formularios en Hostinger (`send-form.php`)
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
├── js/main.js          # Menú móvil + envío AJAX de formularios
├── js/i18n.js          # Selector de idioma EN/ES
├── assets/img/         # Logo, favicon e imágenes
├── send-form.php       # Endpoint de contacto/citas para Hostinger
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

## Formularios

Los formularios de cita y contacto envían solicitudes a `send-form.php` y notifican a `info@elranchopauto.com`.
Para que funcionen, el sitio debe desplegarse en Hostinger u otro hosting con PHP habilitado.
El envío usa SMTP autenticado cuando existe `/home/u270205007/domains/elranchopauto.com/form-mail-config.php`.
Usa `form-mail-config.example.php` como plantilla y nunca subas credenciales reales a Git.

## Pendientes / próximos pasos

- Verificar SPF/DKIM/DMARC del correo del dominio y revisar inbox/spam después de un envío real.
- Optimizar las imágenes PNG de servicios (~1 MB c/u) a WebP/JPG.

---

**Desarrollado por JECT** — *JectCode · Juan Esteban Cañar*
🌐 jectcode.dev

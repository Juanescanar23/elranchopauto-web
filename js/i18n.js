/* El Rancho P Auto — bilingual layer (EN ⇄ ES)
   Additive & non-destructive: the HTML stays English (default render = unchanged).
   Clicking the header toggle swaps visible text to Spanish and back, preserving
   the original markup. No layout or logic is altered. Choice is remembered. */
(function () {
  "use strict";

  // English (as written in the HTML, whitespace-normalized) → Spanish
  var ES = {
    // ---- Navigation ----
    "Home": "Inicio",
    "About": "Nosotros",
    "Services": "Servicios",
    "Appointment": "Cita",
    "Contact": "Contacto",
    "Book Now": "Reservar",

    // ---- Breadcrumbs ----
    "· About": "· Nosotros",
    "· Services": "· Servicios",
    "· Appointment": "· Cita",
    "· Contact": "· Contacto",

    // ---- Shared buttons / CTAs ----
    "Make an Appointment": "Agenda una Cita",
    "Our Services": "Nuestros Servicios",
    "More About Us": "Conoce Más",
    "Book Your Visit": "Reserva tu Visita",
    "Request Appointment": "Solicitar Cita",
    "Send Message": "Enviar Mensaje",
    "Call (281) 832-5630": "Llamar (281) 832-5630",

    // ---- Footer ----
    "Honest, professional auto repair backed by more than 35 years of experience. Cars, trucks, SUVs, vans, and work vehicles.": "Reparación automotriz honesta y profesional, respaldada por más de 35 años de experiencia. Autos, camionetas, SUVs, vans y vehículos de trabajo.",
    "Pages": "Páginas",
    "Visit Us": "Visítanos",
    "El Rancho P Auto. All rights reserved.": "El Rancho P Auto. Todos los derechos reservados.",
    "Originally developed by": "Sitio original desarrollado por",

    // ---- Home: hero ----
    "Bring your vehicle to El Rancho P Auto for honest diagnostics, professional repairs, and reliable service backed by more than three decades of experience.": "Lleva tu vehículo a El Rancho P Auto para diagnósticos honestos, reparaciones profesionales y un servicio confiable respaldado por más de tres décadas de experiencia.",

    // ---- Home: Why Choose Us ----
    "Why Choose Us": "Por Qué Elegirnos",
    "We are Qualified & Professional": "Somos Calificados y Profesionales",
    "At El Rancho P Auto, we know customers are looking for a repair shop they can trust. That is why our work is based on three key principles: experience, clarity, and respect for the customer.": "En El Rancho P Auto sabemos que los clientes buscan un taller en el que puedan confiar. Por eso nuestro trabajo se basa en tres principios clave: experiencia, claridad y respeto por el cliente.",
    "Proven experience": "Experiencia comprobada",
    "More than 35 years in the automotive industry.": "Más de 35 años en la industria automotriz.",
    "Clear diagnostics": "Diagnósticos claros",
    "We explain what is happening with your vehicle before starting the work.": "Te explicamos qué está pasando con tu vehículo antes de empezar el trabajo.",
    "Honest service": "Servicio honesto",
    "We recommend only what your vehicle truly needs.": "Recomendamos solo lo que tu vehículo realmente necesita.",
    "Personalized attention": "Atención personalizada",
    "Every customer and every vehicle receives the time they deserve.": "Cada cliente y cada vehículo recibe el tiempo que merece.",
    "Responsible work": "Trabajo responsable",
    "We focus on lasting solutions, not temporary fixes.": "Nos enfocamos en soluciones duraderas, no en arreglos temporales.",

    // ---- Home: Who We Are ----
    "Who We Are": "Quiénes Somos",
    "35+ Years of Honest Auto Repair": "35+ Años de Reparación Automotriz Honesta",
    "El Rancho P Auto is a trusted automotive repair shop with more than 35 years of experience serving drivers with honesty, responsibility, and professional workmanship. We work on all types of vehicles, including cars, trucks, SUVs, vans, and work vehicles.": "El Rancho P Auto es un taller automotriz de confianza con más de 35 años de experiencia atendiendo a conductores con honestidad, responsabilidad y trabajo profesional. Trabajamos con todo tipo de vehículos, incluyendo autos, camionetas, SUVs, vans y vehículos de trabajo.",
    "Our goal is simple: to provide clear diagnostics, reliable repairs, and personal attention so every customer feels confident about the service their vehicle receives.": "Nuestro objetivo es simple: ofrecer diagnósticos claros, reparaciones confiables y atención personalizada para que cada cliente se sienta seguro del servicio que recibe su vehículo.",

    // ---- Home: Reviews ----
    "Customer Reviews": "Reseñas de Clientes",
    "What Our Customers Say": "Lo Que Dicen Nuestros Clientes",
    "Excellent": "Excelente",
    "· based on Google reviews": "· según reseñas de Google",

    // ---- Home: CTA ----
    "Honest diagnostics, professional repairs, and reliable service backed by more than 35 years of experience.": "Diagnósticos honestos, reparaciones profesionales y servicio confiable respaldado por más de 35 años de experiencia.",

    // ---- About ----
    "About Us": "Sobre Nosotros",
    "Welcome To El Rancho P Auto": "Bienvenido a El Rancho P Auto",
    "At El Rancho P Auto, we combine experience, technical knowledge, and personalized attention to provide real solutions for your vehicle's needs. We understand that your vehicle is an important part of your daily life, which is why every repair is handled with responsibility, transparency, and dedication.": "En El Rancho P Auto combinamos experiencia, conocimiento técnico y atención personalizada para ofrecer soluciones reales a las necesidades de tu vehículo. Entendemos que tu vehículo es una parte importante de tu día a día, por eso cada reparación se maneja con responsabilidad, transparencia y dedicación.",
    "Our goal is for every customer to receive a clear explanation of the issue, honest repair options, and professional service performed with care.": "Nuestro objetivo es que cada cliente reciba una explicación clara del problema, opciones de reparación honestas y un servicio profesional realizado con cuidado.",
    "Our Promise": "Nuestra Promesa",
    "Why Drivers Trust Us": "Por Qué los Conductores Confían en Nosotros",
    "35+ Years of Experience": "35+ Años de Experiencia",
    "Decades of hands-on work across every kind of vehicle.": "Décadas de trabajo práctico en todo tipo de vehículos.",
    "Reliable Auto Repair": "Reparación Confiable",
    "Lasting solutions you can count on, not temporary fixes.": "Soluciones duraderas en las que puedes confiar, no arreglos temporales.",
    "Clear Diagnostics": "Diagnósticos Claros",
    "We explain the problem before any work begins.": "Te explicamos el problema antes de comenzar cualquier trabajo.",
    "Honest Pricing": "Precios Honestos",
    "Professional Service": "Servicio Profesional",
    "Careful, dedicated workmanship on every job.": "Trabajo cuidadoso y dedicado en cada servicio.",
    "All Types of Vehicles": "Todo Tipo de Vehículos",
    "Cars, trucks, SUVs, vans, and work vehicles.": "Autos, camionetas, SUVs, vans y vehículos de trabajo.",
    "Ready When You Are": "Listos Cuando Tú Quieras",
    "Honest diagnostics and reliable repairs from a team that treats your vehicle like its own.": "Diagnósticos honestos y reparaciones confiables de un equipo que trata tu vehículo como propio.",

    // ---- Services ----
    "What We Do": "Lo Que Hacemos",
    "Professional Service for Every Vehicle": "Servicio Profesional para Cada Vehículo",
    "Reliable work performed with experience, honesty, and attention to detail.": "Trabajo confiable realizado con experiencia, honestidad y atención al detalle.",
    "Mechanical Repair": "Reparación Mecánica",
    "Keep your vehicle running strong with reliable mechanical repair services. From engine issues and general diagnostics to suspension, brakes, tune-ups, and essential maintenance, our team works with experience, honesty, and attention to detail. We inspect your vehicle carefully, explain the problem clearly, and recommend the right repair to help you drive with confidence.": "Mantén tu vehículo funcionando al máximo con servicios confiables de reparación mecánica. Desde problemas de motor y diagnósticos generales hasta suspensión, frenos, afinaciones y mantenimiento esencial, nuestro equipo trabaja con experiencia, honestidad y atención al detalle. Inspeccionamos tu vehículo cuidadosamente, te explicamos el problema con claridad y recomendamos la reparación adecuada para que conduzcas con confianza.",
    "Body & Paint": "Latonería y Pintura",
    "Restore the look of your vehicle with professional body and paint services. Whether your car needs paint preparation, panel repair, bodywork, refinishing, or cosmetic restoration, we focus on clean results, careful preparation, and a finish that looks professional. Our goal is to bring your vehicle back to a clean, polished, and confident appearance.": "Restaura la apariencia de tu vehículo con servicios profesionales de latonería y pintura. Ya sea que tu auto necesite preparación de pintura, reparación de paneles, carrocería, repintado o restauración estética, nos enfocamos en resultados limpios, preparación cuidadosa y un acabado de aspecto profesional. Nuestro objetivo es devolverle a tu vehículo una apariencia limpia, pulida y renovada.",
    "State Inspection": "Inspección Vehicular",
    "El Rancho P Auto is ready to help with fast, reliable, and professional vehicle inspection service. We check your vehicle carefully and guide you through the process with clear attention to safety, compliance, and customer service. Our inspection service is designed to be simple, efficient, and trustworthy, so you can get back on the road with peace of mind.": "El Rancho P Auto está listo para ayudarte con un servicio de inspección vehicular rápido, confiable y profesional. Revisamos tu vehículo cuidadosamente y te guiamos en el proceso con clara atención a la seguridad, el cumplimiento y el servicio al cliente. Nuestro servicio de inspección está diseñado para ser simple, eficiente y confiable, para que vuelvas a la carretera con tranquilidad.",
    "Automotive Repair Services": "Servicios de Reparación Automotriz",
    "Everything Your Vehicle Needs": "Todo lo que tu Vehículo Necesita",
    "We provide maintenance, diagnostics, and repair services for different types of vehicles. Our services include:": "Ofrecemos servicios de mantenimiento, diagnóstico y reparación para diferentes tipos de vehículos. Nuestros servicios incluyen:",
    "General vehicle diagnostics": "Diagnóstico general del vehículo",
    "Preventive maintenance": "Mantenimiento preventivo",
    "Oil and filter changes": "Cambios de aceite y filtro",
    "Brake inspection and repair": "Inspección y reparación de frenos",
    "Suspension and steering": "Suspensión y dirección",
    "Cooling system service": "Servicio del sistema de enfriamiento",
    "Engine-related issues": "Problemas relacionados con el motor",
    "Basic electrical and lighting inspection": "Inspección básica de electricidad e iluminación",
    "Automotive air conditioning service": "Servicio de aire acondicionado automotriz",
    "Pre-trip and pre-purchase vehicle inspections": "Inspecciones pre-viaje y pre-compra",
    "General repairs based on evaluation": "Reparaciones generales según evaluación",
    "Car Maintenance Tips": "Consejos de Mantenimiento",
    "Tips You Should Know": "Consejos que Deberías Saber",
    "Simple habits — like timely tire service and routine engine checks — keep your vehicle safe and reliable.": "Hábitos simples —como el servicio oportuno de llantas y las revisiones de rutina del motor— mantienen tu vehículo seguro y confiable.",
    "Have Any Question?": "¿Tienes Alguna Pregunta?",
    "Do not hesitate to give us a call. We are an expert team and we are happy to talk to you.": "No dudes en llamarnos. Somos un equipo experto y estaremos felices de atenderte.",

    // ---- Appointment ----
    "Schedule Today": "Agenda Hoy",
    "Request Your Visit": "Solicita tu Visita",
    "Tell us about your vehicle and what you need. We'll confirm your appointment and give you an honest assessment backed by more than 35 years of experience.": "Cuéntanos sobre tu vehículo y lo que necesitas. Confirmaremos tu cita y te daremos una evaluación honesta respaldada por más de 35 años de experiencia.",
    "Visit us": "Visítanos",
    "Call us": "Llámanos",
    "Email us": "Escríbenos",
    "Full name *": "Nombre completo *",
    "Phone *": "Teléfono *",
    "Email": "Correo",
    "Vehicle (make / model / year)": "Vehículo (marca / modelo / año)",
    "Service needed": "Servicio requerido",
    "Select a service…": "Selecciona un servicio…",
    "General Diagnostics": "Diagnóstico General",
    "Preventive Maintenance": "Mantenimiento Preventivo",
    "Oil & Filter Change": "Cambio de Aceite y Filtro",
    "Brakes": "Frenos",
    "Suspension & Steering": "Suspensión y Dirección",
    "Air Conditioning": "Aire Acondicionado",
    "Other / Not sure": "Otro / No estoy seguro",
    "Preferred date": "Fecha preferida",
    "How can we help?": "¿Cómo podemos ayudarte?",
    "⚠️ Front-end demo form — connect it to email, a form service (e.g. Formspree), or a booking backend to receive submissions.": "⚠️ Formulario demo (solo front-end) — conéctalo a un correo, a un servicio como Formspree o a un backend de reservas para recibir las solicitudes.",

    // ---- Contact ----
    "Contact Us": "Contáctanos",
    "Get in Touch": "Ponte en Contacto",
    "We're Here to Help": "Estamos para Ayudarte",
    "Have a question about your vehicle or need a quote? Reach out and our team will be happy to talk to you.": "¿Tienes una pregunta sobre tu vehículo o necesitas una cotización? Escríbenos y nuestro equipo estará feliz de atenderte.",
    "Address": "Dirección",
    "Phone": "Teléfono",
    "Name *": "Nombre *",
    "Email *": "Correo *",
    "Message *": "Mensaje *",
    "⚠️ Front-end demo form — connect it to email or a form service to receive messages.": "⚠️ Formulario demo (solo front-end) — conéctalo a un correo o a un servicio de formularios para recibir los mensajes.",

    // ---- Placeholders ----
    "Your name": "Tu nombre",
    "you@email.com": "tu@correo.com",
    "e.g. Ford F-150 2018": "ej. Ford F-150 2018",
    "Briefly describe the issue or service you need…": "Describe brevemente el problema o servicio que necesitas…"
  };

  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1 };
  var cachedTextNodes = null;
  var originalText = (typeof WeakMap !== "undefined") ? new WeakMap() : null;

  function norm(s) { return s.replace(/\s+/g, " ").trim(); }

  function collectTextNodes() {
    if (cachedTextNodes) return cachedTextNodes;
    cachedTextNodes = [];
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var p = n.parentElement;
        if (!p || SKIP[p.nodeName]) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    while (walker.nextNode()) cachedTextNodes.push(walker.currentNode);
    return cachedTextNodes;
  }

  function apply(lang) {
    var toES = lang === "es";
    collectTextNodes().forEach(function (n) {
      var raw = n.nodeValue;
      var m = raw.match(/^(\s*)([\s\S]*?)(\s*)$/);
      var core = m[2].replace(/\s+/g, " ");
      if (toES) {
        if (ES[core] !== undefined) {
          if (originalText && !originalText.has(n)) originalText.set(n, raw);
          n.nodeValue = m[1] + ES[core] + m[3];
        }
      } else if (originalText && originalText.has(n)) {
        n.nodeValue = originalText.get(n);
      }
    });
    // placeholders
    var ph = document.querySelectorAll("[placeholder]");
    for (var i = 0; i < ph.length; i++) {
      var el = ph[i];
      if (toES) {
        var c = norm(el.getAttribute("placeholder") || "");
        if (ES[c] !== undefined) {
          if (el.getAttribute("data-en-ph") === null) el.setAttribute("data-en-ph", el.getAttribute("placeholder"));
          el.setAttribute("placeholder", ES[c]);
        }
      } else if (el.getAttribute("data-en-ph") !== null) {
        el.setAttribute("placeholder", el.getAttribute("data-en-ph"));
      }
    }
    document.documentElement.lang = toES ? "es" : "en";
    var code = document.querySelector(".lang-toggle__code");
    if (code) code.textContent = toES ? "ES" : "EN";
    try { localStorage.setItem("erp_lang", toES ? "es" : "en"); } catch (e) {}
  }

  function init() {
    var saved = "en";
    try { saved = localStorage.getItem("erp_lang") || "en"; } catch (e) {}
    apply(saved === "es" ? "es" : "en");
    var btn = document.getElementById("langToggle");
    if (btn) btn.addEventListener("click", function () {
      apply(document.documentElement.lang === "es" ? "en" : "es");
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

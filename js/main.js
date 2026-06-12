/* El Rancho P Auto — clean rebuild scripts */
(function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.querySelector('.nav__menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.toggle('is-open');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { menu.classList.remove('is-open'); });
    });
  }

  // Current year in footer
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  var today = new Date().toISOString().slice(0, 10);
  document.querySelectorAll('input[type="date"][data-min-today]').forEach(function (input) {
    input.setAttribute('min', today);
  });

  // Real form handling backed by send-form.php. Without fetch, forms still POST normally.
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      if (!window.fetch || !window.FormData) return;

      e.preventDefault();
      var note = form.querySelector('.form__status');
      var button = form.querySelector('[type="submit"]');
      var lang = document.documentElement.lang === 'es' ? 'es' : 'en';
      var copy = {
        en: {
          sending: 'Sending...',
          success: 'Thank you. Your request was sent successfully. Our team will contact you soon.',
          error: 'We could not send your request right now. Please call us at (281) 832-5630.'
        },
        es: {
          sending: 'Enviando...',
          success: 'Gracias. Tu solicitud fue enviada correctamente. Nuestro equipo se comunicará contigo pronto.',
          error: 'No pudimos enviar tu solicitud en este momento. Por favor llámanos al (281) 832-5630.'
        }
      }[lang];

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      function setStatus(message, state) {
        if (!note) return;
        note.textContent = message;
        note.classList.remove('is-success', 'is-error');
        if (state) note.classList.add(state);
        note.setAttribute('role', state === 'is-error' ? 'alert' : 'status');
        note.setAttribute('aria-live', state === 'is-error' ? 'assertive' : 'polite');
      }

      var data = new FormData(form);
      data.set('page_url', window.location.href);
      data.set('language', lang);

      if (button) button.disabled = true;
      setStatus(copy.sending, '');

      fetch(form.getAttribute('action') || 'send-form.php', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        return response.json().catch(function () {
          return {};
        }).then(function (payload) {
          if (!response.ok || !payload.ok) {
            throw new Error(payload.message || copy.error);
          }
          return payload;
        });
      }).then(function () {
        setStatus(copy.success, 'is-success');
        form.reset();
      }).catch(function (err) {
        setStatus(err.message || copy.error, 'is-error');
      }).finally(function () {
        if (button) button.disabled = false;
      });
    });
  });
})();

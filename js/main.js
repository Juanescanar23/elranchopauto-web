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

  // Front-end only form handling (no backend wired yet)
  document.querySelectorAll('form[data-demo]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.form__status');
      if (note) {
        note.textContent = (document.documentElement.lang === 'es')
          ? '¡Gracias! Este es un formulario demo de front-end — conéctalo a un correo, a un servicio de formularios o a tu backend de reservas para recibir los envíos.'
          : 'Thanks! This is a front-end demo form — connect it to email, a form service, or your booking backend to receive submissions.';
        note.style.color = '#1a9c54';
      }
      form.reset();
    });
  });
})();

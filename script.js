// ============ Menú hamburguesa ============
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const isOpen = !mobileMenu.hidden;
    mobileMenu.hidden = isOpen;
    menuBtn.setAttribute('aria-expanded', String(!isOpen));
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.hidden = true;
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// ============ Envío del formulario a Formspree (sin recargar la página) ============
const form = document.querySelector('.offer-form');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.btn-continue');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        submitBtn.textContent = '¡Oferta solicitada!';
        form.reset();
      } else {
        submitBtn.textContent = 'Hubo un error. Reintentar';
      }
    } catch (err) {
      submitBtn.textContent = 'Hubo un error. Reintentar';
    } finally {
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 3000);
    }
  });
}

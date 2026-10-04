document.getElementById('year').textContent = new Date().getFullYear();

const hero = document.querySelector('.hero');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('#main-nav');

if (menuToggle && mainNav) {
  const closeMenu = () => {
    document.body.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú');
  };

  menuToggle.addEventListener('click', () => {
    const willOpen = !document.body.classList.contains('menu-open');
    document.body.classList.toggle('menu-open', willOpen);
    menuToggle.setAttribute('aria-expanded', String(willOpen));
    menuToggle.setAttribute('aria-label', willOpen ? 'Cerrar menú' : 'Abrir menú');
  });

  mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

if (hero && !reduceMotion.matches && window.matchMedia('(pointer: fine)').matches) {
  let frame;
  hero.addEventListener('pointermove', (event) => {
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      hero.style.setProperty('--hero-x', `${x * 16}px`);
      hero.style.setProperty('--hero-y', `${y * 10}px`);
      hero.style.setProperty('--glow-x', `${((x + 0.5) * 100).toFixed(1)}%`);
      hero.style.setProperty('--glow-y', `${((y + 0.5) * 100).toFixed(1)}%`);
      hero.style.setProperty('--title-x', `${x * -7}px`);
      hero.style.setProperty('--title-y', `${y * -4}px`);
    });
  });
  hero.addEventListener('pointerleave', () => {
    hero.style.setProperty('--hero-x', '0px');
    hero.style.setProperty('--hero-y', '0px');
    hero.style.setProperty('--glow-x', '72%');
    hero.style.setProperty('--glow-y', '45%');
    hero.style.setProperty('--title-x', '0px');
    hero.style.setProperty('--title-y', '0px');
  });
}

document.querySelectorAll('.product-card').forEach((card) => {
  const whatsappLink = card.querySelector('a[href^="https://wa.me/50664510409"]');
  if (!whatsappLink) return;

  const model = card.querySelector('h4')?.textContent?.trim() || 'este modelo';
  card.classList.add('product-card-clickable');
  card.tabIndex = 0;
  card.setAttribute('role', 'link');
  card.setAttribute('aria-label', `Comprar ${model} por WhatsApp`);

  const openWhatsApp = () => window.open(whatsappLink.href, '_blank', 'noopener,noreferrer');
  card.addEventListener('click', (event) => {
    if (event.target.closest('a')) return;
    openWhatsApp();
  });
  card.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    openWhatsApp();
  });
});

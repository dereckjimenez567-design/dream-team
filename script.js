document.getElementById('year').textContent = new Date().getFullYear();

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

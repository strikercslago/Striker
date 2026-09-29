const PHONE = '5554999102656';
// Animate only when each clarity block enters the viewport; content stays visible without JS.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const clarityObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      clarityObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.clarity-section .intro-grid h2, .clarity-art, .clarity-section .story-panel, .clarity-section .story-steps li').forEach((block, index) => {
    block.classList.add('clarity-reveal');
    block.style.setProperty('--clarity-delay', `${index > 2 ? (index - 3) * 70 : 0}ms`);
    clarityObserver.observe(block);
  });
}
document.querySelectorAll('[data-contact]').forEach((link) => {
  const message = link.dataset.message || 'Olá! Quero melhorar minha presença digital.';
  link.href = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
  link.removeAttribute('aria-disabled');
});
document.querySelector('#year').textContent = new Date().getFullYear();

// Native disclosure elements preserve keyboard access and work without JavaScript.
const questions = document.querySelectorAll('.faq-list details');
questions.forEach((question) => {
  question.addEventListener('toggle', () => {
    if (question.open) questions.forEach((other) => { if (other !== question) other.open = false; });
  });
});

// Reveal connection elements individually so mobile cards animate as they appear.
const connection = document.querySelector('.connection-section');
if (connection && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('connection-revealed');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  connection.querySelectorAll('.split-heading, .channel-card, .connection-flow').forEach((block, index) => {
    block.style.setProperty('--connection-delay', window.matchMedia('(min-width: 1101px)').matches && index > 0 && index < 5 ? `${(index - 1) * 90}ms` : '0ms');
    observer.observe(block);
  });
}

// Reveal each services block once, including cards further down on mobile.
const services = document.querySelector('.services-section');
if (services && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('services-revealed');
      reveal.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  services.querySelectorAll('.center-heading, .service-card').forEach((block, index) => {
    block.classList.add('services-enter');
    block.addEventListener('animationend', () => block.classList.remove('services-enter', 'services-revealed'), { once: true });
    block.style.setProperty('--services-delay', `${index ? ((index - 1) % 2) * 80 : 0}ms`);
    reveal.observe(block);
  });
}

const PHONE = '5554999102656';
// Decorative comparison rows reveal once and do not behave like form controls.
const experienceSection = document.querySelector('.experience-section');
if (experienceSection && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const experienceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('experience-visible');
      experienceObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  experienceSection.querySelectorAll('.experience-header, .experience-card, .experience-row').forEach((block) => {
    block.classList.add('experience-enter');
    experienceObserver.observe(block);
  });
}
// Process elements enter once; HTML remains visible without JS or with reduced motion.
const processSection = document.querySelector('.process-section');
if (processSection && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const processObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('process-visible');
      processObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  processSection.querySelectorAll('.process-header, .process-card, .process-waves, .process-differential').forEach((block) => {
    block.classList.add('process-enter');
    processObserver.observe(block);
  });
}
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
// Fictional starter data. Replace these records with approved reviews before publication.
// Keep rendering independent of the data source so a future API/CMS can supply this array.
const testimonials = [
  { name: 'Rafael Mendes', company: 'Construtora Horizonte', rating: 5, category: 'Site para construtora', icon: 'building', avatar: 'avatar-1', quote: 'A Striker conseguiu traduzir nossa essência em um site moderno, objetivo e que realmente gera oportunidades.' },
  { name: 'Marina Costa', company: 'Clínica Viva', rating: 5, category: 'Site para clínica', icon: 'clinic', avatar: 'avatar-2', quote: 'Desde que lançamos nosso site com a Striker, nossa apresentação ficou muito mais profissional e clara.' },
  { name: 'Lucas Ferreira', company: 'Estúdio Lumos', rating: 5, category: 'Site institucional', icon: 'chat', avatar: 'avatar-3', quote: 'O site transformou a forma como apresentamos nosso trabalho. Hoje o cliente entende muito mais rápido o que fazemos.' },
  { name: 'Camila Roque', company: 'Loja Bloom', rating: 5, category: 'Loja virtual', icon: 'shop', avatar: 'avatar-4', quote: 'A experiência ficou simples, rápida e profissional. Nossa marca finalmente transmite a qualidade que entregamos.' },
  { name: 'Thiago Nunes', company: 'Agência Pulsar', rating: 5, category: 'Site para agência', icon: 'agency', avatar: 'avatar-5', quote: 'Atendimento excelente e uma estrutura digital muito melhor para apresentar nossos serviços.' }
];

(() => {
  const section = document.querySelector('.testimonials-section');
  if (!section || !testimonials.length) return;
  const carousel = section.querySelector('.testimonials-carousel');
  const track = section.querySelector('.testimonial-track');
  const pagination = section.querySelector('.testimonial-pagination');
  const playback = section.querySelector('.testimonial-playback');
  const announcement = section.querySelector('.testimonials-announcement');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const assetRoot = 'public/assets/striker/testimonials/';
  const total = testimonials.length;
  const wrap = (index) => ((index % total) + total) % total;
  let active = Math.min(2, total - 1);
  let cards = [];
  let busy = false;
  let pending = 0;
  let timer;
  let inView = !('IntersectionObserver' in window);
  let hovered = false;
  let focused = false;
  let touching = false;
  let paused = false;
  let pointer = null;

  function element(tag, className, text) {
    const node = document.createElement(tag);
    node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function art(name, className, size) {
    const img = element('img', className);
    img.src = `${assetRoot}${name}.webp`;
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    img.width = size;
    img.height = size;
    img.decoding = 'async';
    return img;
  }
  function makeCard(index, slot) {
    const data = testimonials[wrap(index)];
    const card = element('article', 'testimonial-card is-recycling');
    card.setAttribute('role', 'group');
    card.setAttribute('aria-roledescription', 'slide');
    card.setAttribute('aria-label', `Avaliação ${wrap(index) + 1} de ${total}`);
    const person = element('div', 'testimonial-person');
    const portrait = element('div', 'testimonial-portrait');
    portrait.append(art(data.avatar, 'testimonial-avatar', 92), art('verified', 'testimonial-verified', 28));
    const identity = element('div', 'testimonial-identity');
    const rating = element('div', 'testimonial-rating');
    rating.setAttribute('role', 'img');
    rating.setAttribute('aria-label', `${data.rating} de 5 estrelas`);
    for (let i = 0; i < data.rating; i++) rating.append(art('star', '', 23));
    identity.append(element('h3', '', data.name), element('p', 'testimonial-company', data.company), rating);
    person.append(portrait, identity);
    const category = element('span', 'testimonial-category');
    category.append(art(`category-${data.icon}`, '', 26), element('span', '', data.category));
    card.append(person, element('blockquote', '', `“${data.quote}”`), category);
    const record = { element: card, index: wrap(index), slot };
    position(record);
    track.append(card);
    return record;
  }
  function position(record) {
    const { element: card, slot } = record;
    const distance = Math.abs(slot);
    const offset = [0, 1, 1.72, 2.6, 3.4][Math.min(distance, 4)] * Math.sign(slot);
    card.dataset.slot = slot;
    card.dataset.index = record.index;
    card.style.setProperty('--offset', offset);
    card.style.setProperty('--mobile-offset', slot);
    card.style.setProperty('--scale', distance === 0 ? 1 : distance === 1 ? .88 : .76);
    card.style.setProperty('--mobile-scale', distance === 0 ? 1 : .94);
    card.style.setProperty('--rotation', `${slot * -2}deg`);
    card.style.setProperty('--opacity', distance === 0 ? 1 : distance === 1 ? .86 : distance === 2 ? .62 : 0);
    card.style.setProperty('--visibility', distance <= 2 ? 1 : 0);
    card.style.setProperty('--layer', distance === 0 ? 5 : distance === 1 ? 3 : 2);
    card.setAttribute('aria-hidden', String(slot !== 0));
    card.inert = slot !== 0;
  }
  function sync() {
    carousel.dataset.active = active;
    pagination.querySelectorAll('button').forEach((dot, index) => dot.setAttribute('aria-current', String(index === active)));
  }
  function schedule() {
    clearTimeout(timer);
    const reduced = motion.matches;
    playback.disabled = reduced;
    playback.textContent = reduced ? 'Movimento reduzido' : paused ? 'Retomar' : 'Pausar';
    playback.setAttribute('aria-label', reduced ? 'Troca automática desativada por movimento reduzido' : paused ? 'Retomar troca automática' : 'Pausar troca automática');
    if (!reduced && !paused && !hovered && !focused && !touching && inView && !document.hidden) {
      timer = setTimeout(() => { move(1, false); schedule(); }, 2000);
    }
  }
  function move(direction, manual = true) {
    if (busy) { if (manual) pending = Math.max(-total, Math.min(total, pending + direction)); return; }
    busy = true;
    active = wrap(active + direction);
    cards.forEach((record) => { record.slot -= direction; position(record); });
    sync();
    if (manual) announcement.textContent = `Avaliação ${active + 1} de ${total}: ${testimonials[active].name}.`;
    // Recycle only the invisible outer slot. Visible cards never reset their transforms.
    setTimeout(() => {
      const retired = cards.find((record) => Math.abs(record.slot) > 3);
      retired.element.remove();
      cards = cards.filter((record) => record !== retired);
      const slot = direction * 3;
      const next = makeCard(active + slot, slot);
      cards.push(next);
      requestAnimationFrame(() => requestAnimationFrame(() => next.element.classList.remove('is-recycling')));
      busy = false;
      if (pending) {
        const nextDirection = Math.sign(pending);
        pending -= nextDirection;
        move(nextDirection, true);
      }
    }, motion.matches ? 0 : 720);
  }
  for (let slot = -3; slot <= 3; slot++) cards.push(makeCard(active + slot, slot));
  requestAnimationFrame(() => requestAnimationFrame(() => cards.forEach(({ element: card }) => card.classList.remove('is-recycling'))));
  testimonials.forEach((data, index) => {
    const dot = element('button', 'testimonial-dot');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Ver avaliação ${index + 1}: ${data.name}`);
    dot.addEventListener('click', () => {
      let distance = wrap(index - active);
      if (distance > total / 2) distance -= total;
      pending = 0;
      if (distance) {
        if (busy) pending = distance;
        else { pending = distance - Math.sign(distance); move(Math.sign(distance)); }
      }
      schedule();
    });
    pagination.append(dot);
  });
  section.querySelector('.testimonial-arrow--left').addEventListener('click', () => { move(-1); schedule(); });
  section.querySelector('.testimonial-arrow--right').addEventListener('click', () => { move(1); schedule(); });
  section.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    move(event.key === 'ArrowLeft' ? -1 : 1);
    schedule();
  });
  carousel.addEventListener('pointerenter', (event) => { if (event.pointerType === 'mouse') { hovered = true; schedule(); } });
  carousel.addEventListener('pointerleave', (event) => { if (event.pointerType === 'mouse') { hovered = false; schedule(); } });
  section.addEventListener('focusin', () => { focused = true; schedule(); });
  section.addEventListener('focusout', () => { queueMicrotask(() => { focused = section.contains(document.activeElement); schedule(); }); });
  carousel.addEventListener('pointerdown', (event) => {
    if (event.target.closest('button') || !event.isPrimary || event.button !== 0) return;
    pointer = { id: event.pointerId, x: event.clientX, y: event.clientY };
    touching = true;
    carousel.setPointerCapture(event.pointerId);
    schedule();
  });
  function release(event) {
    if (!pointer || pointer.id !== event.pointerId) return;
    const dx = event.clientX - pointer.x;
    const dy = event.clientY - pointer.y;
    if (event.type === 'pointerup' && Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
    pointer = null;
    touching = false;
    if (carousel.hasPointerCapture(event.pointerId)) carousel.releasePointerCapture(event.pointerId);
    // A touch can focus the carousel; clear that incidental focus so autoplay resumes.
    if (event.pointerType === 'touch' && document.activeElement === carousel) carousel.blur();
    schedule();
  }
  carousel.addEventListener('pointerup', release);
  carousel.addEventListener('pointercancel', release);
  playback.addEventListener('click', () => { paused = !paused; schedule(); });
  motion.addEventListener('change', schedule);
  document.addEventListener('visibilitychange', schedule);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; schedule(); }, { threshold: .15 }).observe(carousel);
  }
  sync();
  schedule();
})();

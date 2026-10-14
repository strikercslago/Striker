const PHONE = '5554999102656';
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

// Fictional starter data. Replace these records with approved reviews before publication.
// Keep rendering independent of the data source so a future API/CMS can supply this array.
const testimonials = [
  { name: 'Rafael Mendes', company: 'Construtora Horizonte', rating: 5, category: 'Site para construtora', icon: 'building', quote: 'A Striker conseguiu traduzir nossa essência em um site moderno, objetivo e que realmente gera oportunidades.' },
  { name: 'Marina Costa', company: 'Clínica Viva', rating: 5, category: 'Site para clínica', icon: 'clinic', quote: 'Desde que lançamos nosso site com a Striker, nossa apresentação ficou muito mais profissional e clara.' },
  { name: 'Lucas Ferreira', company: 'Estúdio Lumos', rating: 5, category: 'Site institucional', icon: 'chat', quote: 'O site transformou a forma como apresentamos nosso trabalho. Hoje o cliente entende muito mais rápido o que fazemos.' },
  { name: 'Camila Roque', company: 'Loja Bloom', rating: 5, category: 'Loja virtual', icon: 'shop', quote: 'A experiência ficou simples, rápida e profissional. Nossa marca finalmente transmite a qualidade que entregamos.' },
  { name: 'Thiago Nunes', company: 'Agência Pulsar', rating: 5, category: 'Site para agência', icon: 'agency', quote: 'Atendimento excelente e uma estrutura digital muito melhor para apresentar nossos serviços.' }
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
    const identity = element('div', 'testimonial-identity');
    const rating = element('div', 'testimonial-rating');
    rating.setAttribute('role', 'img');
    rating.setAttribute('aria-label', `${data.rating} de 5 estrelas`);
    for (let i = 0; i < data.rating; i++) rating.append(art('star', '', 23));
    identity.append(element('h3', '', data.name), element('p', 'testimonial-company', data.company), rating);
    person.append(identity);
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

// Shared motion direction. Content is never hidden while waiting for JavaScript.
(() => {
  if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = window.matchMedia('(max-width: 760px)');
  const groups = [
    ['.hero-copy > *', 'rise'],
    ['.clarity-section .intro-grid > *, .story-heading, .story-steps li', 'rise'],
    ['.connection-section .split-heading, .channel-card, .connection-flow', 'rise'],
    ['.services-section .center-heading, .service-card, .service-summary', 'rise'],
    ['.transformation-copy > *, .decision-steps li, .conversation-message', 'rise'],
    ['.process-header, .process-card, .process-differential', 'rise'],
    ['.experience-header, .experience-card', 'rise'],
    ['.testimonials-header, .testimonials-carousel', 'rise'],
    ['.audit-copy > *, .audit-list li', 'rise'],
    ['.manifesto-copy > *', 'rise'],
    ['.faq-intro > *, .faq-list details', 'rise'],
    ['.final-heading-row, .final-copy > *, .final-aside > *', 'rise'],
    ['.final-footer-grid > *, .final-footer-bottom', 'rise'],
    ['.digital-journey, .final-showcase', 'depth']
  ];
  const targets = new Map();
  groups.forEach(([selector, kind]) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      targets.set(element, { kind, delay: (index % 3) * 65 });
    });
  });
  const played = new Set();
  const active = new Map();
  function cancel(element) {
    active.get(element)?.cancel();
    active.delete(element);
  }
  function enter(element) {
    if (reduced.matches || document.hidden || played.has(element)) return;
    played.add(element);
    // Keyboard focus must remain stable and immediately readable.
    if (element.contains(document.activeElement)) return;
    cancel(element);
    const { kind, delay } = targets.get(element);
    const distance = mobile.matches ? 10 : kind === 'depth' ? 24 : 18;
    const frames = [
      { opacity: .25, translate: `0 ${distance}px`, ...(kind === 'depth' ? { scale: .975 } : {}) },
      { opacity: 1, translate: '0 0', ...(kind === 'depth' ? { scale: 1 } : {}) }
    ];
    const animation = element.animate(frames, {
      duration: mobile.matches ? 460 : kind === 'depth' ? 850 : 640,
      delay: mobile.matches ? 0 : delay,
      easing: 'cubic-bezier(.22, 1, .36, 1)',
      fill: 'backwards'
    });
    active.set(element, animation);
    animation.onfinish = () => { if (active.get(element) === animation) active.delete(element); };
  }
  const entrance = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) enter(entry.target); });
  }, { threshold: .08, rootMargin: '0px 0px -24px 0px' });
  // Rearm only after leaving a generous buffer, avoiding repeated flashes at an edge.
  const departure = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) { played.delete(entry.target); cancel(entry.target); }
    });
  }, { threshold: 0, rootMargin: '160px 0px' });
  function configure() {
    entrance.disconnect();
    departure.disconnect();
    active.forEach(animation => animation.cancel());
    active.clear();
    played.clear();
    if (reduced.matches) return;
    targets.forEach((_, element) => { entrance.observe(element); departure.observe(element); });
  }
  reduced.addEventListener('change', configure);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { active.forEach(animation => animation.cancel()); active.clear(); }
  });
  document.addEventListener('focusin', event => {
    targets.forEach((_, element) => { if (element.contains(event.target)) cancel(element); });
  });
  document.querySelectorAll('.faq-list details').forEach(detail => {
    detail.addEventListener('toggle', () => {
      const answer = detail.querySelector('p');
      if (!answer) return;
      cancel(answer);
      if (!detail.open || reduced.matches) return;
      const animation = answer.animate([
        { opacity: .35, translate: '0 -4px' },
        { opacity: 1, translate: '0 0' }
      ], { duration: 240, easing: 'ease-out' });
      active.set(answer, animation);
      animation.onfinish = () => { if (active.get(answer) === animation) active.delete(answer); };
    });
  });
  configure();
})();

// Reveal after About, then keep the invitation visible until explicitly dismissed.
(() => {
  const about = document.querySelector('#sobre');
  const dock = document.querySelector('.analysis-dock');
  if (!about || !dock) return;
  let revealed = false;
  let dismissed = false;
  let frame = 0;
  function update() {
    frame = 0;
    if (!revealed && about.getBoundingClientRect().bottom <= 0) revealed = true;
    dock.hidden = dismissed || !revealed;
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(update); }
  dock.querySelector('button').addEventListener('click', () => {
    dismissed = true;
    dock.hidden = true;
    document.querySelector('.whatsapp-float').focus({ preventScroll: true });
  });
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('pageshow', schedule);
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(document.querySelector('main'));
  update();
})();

// Portfolio names match the supplied artwork; no public project URLs were supplied.
const projects = [
  { id:'nexa-criativa', name:'Nexa Criativa', category:'Agência digital', url:null },
  { id:'gestor-ia', name:'Gestor IA', category:'Inteligência artificial', url:null },
  { id:'dr-marcelo-boechat', name:'Dr. Marcelo Boechat', category:'Cirurgia bucomaxilofacial e implantodontia', url:null },
  { id:'zentore-odonto', name:'Zentore Odonto', category:'Odontologia integrada', url:null },
  { id:'dentiva', name:'Dentiva', category:'Clínica odontológica', url:null },
  { id:'qnar-studio', name:'Qnar Studio', category:'Arquitetura e interiores', url:null },
  { id:'advmarc', name:'ADVMARC', category:'Advocacia', url:null },
  { id:'ref-adv', name:'REF ADV', category:'Advocacia e consultoria', url:null }
].map(project => ({ ...project, image:`public/assets/striker/portfolio/${project.id}-800.webp` }));

(() => {
  const section = document.querySelector('.portfolio-section');
  if (!section) return;
  const viewport = section.querySelector('.portfolio-showcase');
  const track = section.querySelector('.portfolio-track');
  const dialog = section.querySelector('.portfolio-dialog');
  const announcement = section.querySelector('.portfolio-announcement');
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  let cards=[], active=2, paused=false, visible=false;
  let frame=0, previousTime=0, motionLeft=0, dragging=null, dragged=false, savedOverflow='', opener=null, resumeTimer=0;
  const wrap = index => (index + projects.length) % projects.length;
  const node = (tag, className, text) => {
    const el=document.createElement(tag); el.className=className;
    if(text!==undefined) el.textContent=text;
    return el;
  };
  function makeCard(project,index,copy) {
    const card=node('article','portfolio-card');
    card.dataset.index=index;
    card.dataset.copy=copy;
    const img=node('img','portfolio-cover');
    img.src=project.image;
    img.srcset=[480,800,1122].map(w=>`public/assets/striker/portfolio/${project.id}-${w}.webp ${w}w`).join(', ');
    img.sizes='(max-width:600px) 86vw, (max-width:900px) 70vw, (min-width:1800px) 520px, 430px';
    img.width=1122; img.height=1402; img.loading='lazy'; img.decoding='async'; img.draggable=false;
    img.alt=`Projeto ${project.name}: apresentação do site em desktop e celular`;
    const footer=node('div','portfolio-card-footer');
    const identity=node('div','');
    identity.append(node('h3','',project.name),node('p','',project.category));
    const open=node(project.url?'a':'button','portfolio-open');
    if(project.url) { open.href=project.url; open.target='_blank'; open.rel='noopener noreferrer'; }
    else { open.type='button'; open.addEventListener('click',()=>openProject(project,open)); }
    open.setAttribute('aria-label',`Ver projeto ${project.name}`);
    open.append(node('span','portfolio-open-label','Ver projeto'),node('span','portfolio-open-arrow','→'));
    open.lastChild.setAttribute('aria-hidden','true');
    footer.append(identity,open); card.append(img,footer);
    if(copy!==1) { card.setAttribute('aria-hidden','true'); open.tabIndex=-1; }
    return card;
  }
  function center(card) { return card.offsetLeft + card.offsetWidth/2 - viewport.clientWidth/2; }
  function render() {
    track.replaceChildren();
    const copies=[0,1,2];
    copies.forEach(copy=>projects.forEach((project,index)=>track.append(makeCard(project,index,copy))));
    cards=Array.from(track.children);
    viewport.scrollLeft=center(cards.find(card=>Number(card.dataset.copy)===1&&Number(card.dataset.index)===active));
    sync(); updateMotion();
  }
  function nearest() {
    return cards.reduce((best,card)=>Math.abs(center(card)-viewport.scrollLeft)<Math.abs(center(best)-viewport.scrollLeft)?card:best,cards[0]);
  }
  function sync() {
    const selected=nearest();
    active=Number(selected.dataset.index);
    cards.forEach(card=>{
      card.classList.toggle('is-active',card===selected);
      if(card.dataset.copy!=='1') {
        card.querySelector('.portfolio-open').tabIndex=card===selected?0:-1;
        card.setAttribute('aria-hidden',String(card!==selected));
      }
      if(visible&&Math.abs(center(card)-viewport.scrollLeft)<viewport.clientWidth) card.querySelector('img').loading='eager';
    });
  }
  function stop() { clearTimeout(resumeTimer); paused=true; updateMotion(); }
  function resumeLater() { clearTimeout(resumeTimer); resumeTimer=setTimeout(()=>{paused=false;updateMotion();},2000); }
  function normalize() {
    const first=cards.find(card=>card.dataset.copy==='1');
    const next=cards.find(card=>card.dataset.copy==='2');
    const span=center(next)-center(first);
    let shift=0;
    if(viewport.scrollLeft>=center(next)) shift=-span;
    else if(viewport.scrollLeft<center(first)) shift=span;
    if(shift) {viewport.scrollLeft+=shift;motionLeft+=shift;if(dragging)dragging.left+=shift;}
  }
  function navigate(direction) {
    stop();
    active=wrap(Number(nearest().dataset.index)+direction);
    const target=cards.find(card=>Number(card.dataset.copy)===1&&Number(card.dataset.index)===active);
    viewport.scrollTo({left:center(target),behavior:reduced.matches?'instant':'smooth'});
    announcement.textContent=`${active+1} de ${projects.length}: ${projects[active].name}`;
    resumeLater();
  }
  function tick(now) {
    if(previousTime) {
      motionLeft+=Math.min(now-previousTime,64)*.012;
      viewport.scrollLeft=motionLeft;
      normalize();
    }
    previousTime=now;
    frame=requestAnimationFrame(tick);
  }
  function updateMotion() {
    cancelAnimationFrame(frame); frame=0; previousTime=0; motionLeft=viewport.scrollLeft;
    if(!reduced.matches&&!paused&&!dragging&&visible&&!document.hidden&&!dialog.open) frame=requestAnimationFrame(tick);
  }
  function openProject(project,button) {
    stop(); opener=button;
    dialog.querySelector('h3').textContent=project.name;
    dialog.querySelector('.portfolio-dialog-category').textContent=project.category;
    const img=dialog.querySelector('.portfolio-detail');
    img.src=`public/assets/striker/portfolio/${project.id}-1122.webp`;
    img.alt=`Projeto completo ${project.name}, versões desktop e celular`;
    savedOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    dialog.showModal();
    dialog.querySelector('.portfolio-dialog-body').scrollTop=0;
  }
  section.querySelector('.portfolio-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{ if(event.target===dialog) { const r=dialog.getBoundingClientRect(); if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close(); } });
  dialog.addEventListener('close',()=>{ document.body.style.overflow=savedOverflow; opener?.focus({preventScroll:true}); resumeLater(); });
  viewport.addEventListener('scroll',()=>{normalize();sync();},{passive:true});
  viewport.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();navigate(event.key==='ArrowRight'?1:-1);}});
  viewport.addEventListener('wheel',()=>{stop();resumeLater();},{passive:true});
  viewport.addEventListener('pointerdown',event=>{
    stop(); dragged=false;
    if(event.button===0)dragging={x:event.clientX,y:event.clientY,left:viewport.scrollLeft,id:event.pointerId};
  });
  viewport.addEventListener('pointermove',event=>{
    if(!dragging)return;
    const delta=event.clientX-dragging.x;
    if(!dragged&&Math.abs(event.clientY-dragging.y)>Math.abs(delta)&&Math.abs(event.clientY-dragging.y)>6){release();return;}
    if(Math.abs(delta)>6) { dragged=true;viewport.setPointerCapture(event.pointerId);viewport.classList.add('is-dragging'); }
    if(dragged){viewport.scrollLeft=dragging.left-delta;normalize();}
  });
  const release=()=>{if(!dragging)return;dragging=null;viewport.classList.remove('is-dragging');resumeLater();};
  viewport.addEventListener('pointerup',release); viewport.addEventListener('pointercancel',release); viewport.addEventListener('lostpointercapture',release);
  viewport.addEventListener('click',event=>{if(dragged){event.preventDefault();event.stopPropagation();dragged=false;}},true);
  document.addEventListener('visibilitychange',updateMotion);
  reduced.addEventListener('change',updateMotion);
  new ResizeObserver(()=>{ if(!dragging){viewport.scrollLeft=center(cards.find(card=>card.dataset.copy==='1'&&Number(card.dataset.index)===active));updateMotion();} }).observe(viewport);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();updateMotion();},{threshold:.1}).observe(viewport);
  render();
})();

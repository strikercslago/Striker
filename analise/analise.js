// Add only approved, real material. Empty arrays keep social proof out of production.
// Review: { quote, name, company, sourceUrl?, photo? }. Logo: { src, name }.
// Use local images under /assets/striker/analise/. Never use client credentials here.
const ANALISE_CONTENT = {
  teamImage: '',
  teamImageAlt: '',
  reviews: [],
  logos: []
};

const assetPreview = new URLSearchParams(location.search).get('preview') === 'assets';
if (assetPreview) {
  document.querySelectorAll('[data-preview-only]').forEach(el => { el.hidden = false; });
}

// Treat configurable content as text and allow only same-origin or HTTPS assets/links.
function safeUrl(value) {
  if (!value) return null;
  try {
    const url = new URL(value, location.origin);
    return url.protocol === 'https:' || (url.origin === location.origin && value.startsWith('/')) ? url.href : null;
  } catch { return null; }
}
function element(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}
const portrait = document.querySelector('[data-asset-slot="team"]');
const teamImage = safeUrl(ANALISE_CONTENT.teamImage);
if (teamImage && ANALISE_CONTENT.teamImageAlt) {
  const img = element('img');
  img.src = teamImage;
  img.alt = ANALISE_CONTENT.teamImageAlt;
  img.loading = 'lazy';
  img.addEventListener('load', () => {
    portrait.querySelector('.portrait-art').hidden = true;
    portrait.querySelector('.asset-label').hidden = true;
  });
  img.addEventListener('error', () => img.remove());
  portrait.prepend(img);
}

const proof = document.querySelector('#avaliacoes');
const reviewGrid = document.querySelector('#reviews-grid');
const reviews = ANALISE_CONTENT.reviews.filter(r => r.quote && r.name && r.company);
reviews.forEach(review => {
  const card = element('article', 'review-card');
  card.append(element('p', 'review-tag', 'Experiência com a Striker'));
  card.append(element('blockquote', '', review.quote));
  const person = element('div', 'review-person');
  const photoUrl = safeUrl(review.photo);
  if (photoUrl) {
    const img = element('img'); img.src = photoUrl; img.alt = ''; img.loading = 'lazy';
    img.addEventListener('error', () => img.remove()); person.append(img);
  }
  const identity = element('div');
  identity.append(element('strong', '', review.name), element('small', '', review.company));
  person.append(identity); card.append(person);
  const sourceUrl = safeUrl(review.sourceUrl);
  if (sourceUrl) {
    const source = element('a', 'review-source', 'Ver relato original ↗');
    source.href = sourceUrl; source.rel = 'noopener noreferrer'; card.append(source);
  }
  reviewGrid.append(card);
});
if (assetPreview && !reviews.length) {
  for (let i = 1; i <= 2; i++) {
    const card = element('article', 'review-card');
    card.append(element('p', 'review-tag', `Espaço reservado / relato ${String(i).padStart(2, '0')}`));
    card.append(element('p', 'placeholder-copy', 'Aqui entra a experiência real de um cliente da Striker.'));
    const lines = element('div', 'review-lines'); lines.setAttribute('aria-hidden', 'true');
    lines.append(element('span'), element('span')); card.append(lines);
    const person = element('div', 'review-person');
    const avatar = element('span', 'review-avatar'); avatar.setAttribute('aria-hidden', 'true');
    const identity = element('div');
    identity.append(element('strong', '', 'Nome do cliente'), element('small', '', 'Empresa · relato a inserir'));
    person.append(avatar, identity); card.append(person); reviewGrid.append(card);
  }
}
const logoRow = document.querySelector('#client-logos');
const logos = ANALISE_CONTENT.logos.filter(logo => logo.name && safeUrl(logo.src));
logos.forEach(logo => {
  const img = element('img'); img.src = safeUrl(logo.src); img.alt = logo.name; img.loading = 'lazy';
  img.addEventListener('error', () => img.remove()); logoRow.append(img);
});
if (assetPreview && !logos.length) {
  for (let i = 1; i <= 4; i++) logoRow.append(element('span', 'logo-slot', `Logo de cliente ${String(i).padStart(2, '0')}`));
}
logoRow.hidden = !logos.length && !assetPreview;
proof.hidden = !reviews.length && !logos.length && !assetPreview;
reviewGrid.hidden = !reviews.length && !assetPreview;
if (!reviews.length && logos.length && !assetPreview) {
  document.querySelector('#reviews-title').textContent = 'Empresas que escolheram a Striker.';
}

// Progressive enhancement: all four channels are readable if JavaScript is disabled.
const tablist = document.querySelector('.service-tabs');
const tabs = [...tablist.querySelectorAll('button')];
const panels = [...document.querySelectorAll('[data-panel]')];
function selectTab(index, focus = false) {
  tabs.forEach((tab, i) => {
    tab.setAttribute('aria-selected', String(i === index));
    tab.tabIndex = i === index ? 0 : -1;
    panels[i].hidden = i !== index;
  });
  if (focus) tabs[index].focus();
}
tablist.setAttribute('role', 'tablist');
tabs.forEach((tab, index) => {
  tab.setAttribute('role', 'tab');
  tab.setAttribute('aria-controls', panels[index].id);
  panels[index].setAttribute('role', 'tabpanel');
  panels[index].setAttribute('aria-labelledby', tab.id);
  panels[index].tabIndex = 0;
  tab.addEventListener('click', () => selectTab(index));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectTab(next, true); }
  });
});
selectTab(0);
tablist.hidden = false;

// Outbound intent only, never a confirmed lead. No cookies or external SDK.
document.querySelectorAll('[data-cta]').forEach(link => {
  link.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('striker:analise-whatsapp', {
      detail: { placement: link.dataset.cta, page: '/analise' }
    }));
  });
});

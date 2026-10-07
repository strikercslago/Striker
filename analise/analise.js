// Optional analytics hook; navigation works without JavaScript or a collector.
// A WhatsApp click is an outbound intent, never a confirmed lead.
document.querySelectorAll('[data-cta]').forEach((link) => {
  link.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('striker:analise-whatsapp', {
      detail: { placement: link.dataset.cta, page: '/analise' }
    }));
  });
});

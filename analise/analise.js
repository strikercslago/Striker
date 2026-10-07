// Single source for every CTA: the final link contains the existing site's number
// and the approved message. Other anchors remain a usable #contato fallback without JS.
const whatsappDestination = document.querySelector('#whatsapp-destination');
const whatsappUrl = whatsappDestination.href;

document.querySelectorAll('[data-event="analise_whatsapp_click"]').forEach(link => {
  link.href = whatsappUrl;
  link.addEventListener('click', () => {
    // Outbound click, not a confirmed lead. No new analytics SDK or cookie.
    window.dispatchEvent(new CustomEvent('analise_whatsapp_click', {
      detail: { placement: link.dataset.placement, page: '/analise' }
    }));
  });
});

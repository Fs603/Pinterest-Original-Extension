function addOriginalButtons() {
  const pinSelectors = [
    'div[data-test-id="pin"]',
    'div[data-test-id="closeup-image-container"]',
    'div[data-test-id="pinImageContainer"]'
  ];

  pinSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(pin => {

      if (pin.querySelector('.pio-orig-btn')) return;

      const img = pin.querySelector('img');
      if (!img) return;

      const btn = document.createElement('div');
      btn.className = 'pio-orig-btn';
      btn.textContent = 'Original';

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();

        const srcset = img.srcset;
        let url = img.src;

        if (srcset) {
          const parts = srcset.split(',').map(s => s.trim());
          const last = parts[parts.length - 1];
          url = last.split(' ')[0];
        }

        chrome.runtime.sendMessage({
          action: "openImage",
          url: url
        });
      });

      pin.style.position = 'relative';
      pin.appendChild(btn);
    });
  });
}

const observer = new MutationObserver(() => {
  addOriginalButtons();
});

observer.observe(document.body, { childList: true, subtree: true });

addOriginalButtons();
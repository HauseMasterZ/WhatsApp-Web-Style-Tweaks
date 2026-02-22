function applyStyles() {
  [
    'header[tabindex="0"][data-tab="2"]',
    '#app div._aigw._as6h.false',
    '#app div[class~="x12xzxwr"][class~="x9f619"]',
    '#app div[class~="x10l6tqk"][class~="x13vifvy"]',
    '#app div[class~="x1n2onr6"][class~="x1vjfegm"][class~="x1cqoux5"][class~="x14yy4lh"]'
  ].forEach((sel, i) => {
    document.querySelectorAll(sel).forEach(el => {
      if (i === 0) {
        el.style.setProperty('display', 'none');
      } else if (i === 1 || i === 2) {
        el.style.setProperty('border', 'none');
        el.style.setProperty('max-width', '330px');
      } else if (i === 3) {
        el.style.setProperty('margin-left', '-60px');
      } else if (i === 4) {
        el.style.setProperty('margin-right', '-115px');
      }
    });
  });
}

// ✅ Wait for WhatsApp to fully load by polling for #app
function waitForWhatsApp() {
  return new Promise(resolve => {
    const interval = setInterval(() => {
      // WhatsApp is ready when #app has children and the side panel exists
      const ready = document.querySelector('#app div[data-tab="2"], #app ._aigw');
      if (ready) {
        clearInterval(interval);
        resolve();
      }
    }, 500); // check every 500ms
  });
}

(async () => {
  await waitForWhatsApp();
  applyStyles();

  let debounceTimer;
  const observer = new MutationObserver(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(applyStyles, 30);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style']
  });
})();

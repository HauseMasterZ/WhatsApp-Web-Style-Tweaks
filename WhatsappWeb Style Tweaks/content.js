function applyStyles() {
  [
    'header[tabindex="0"][data-tab="2"]',
    '#app div._aigw._as6h.false',
    '#app div[class~="x12xzxwr"][class~="x9f619"]',
    '#app div[class~="x10l6tqk"][class~="x13vifvy"]',
    '#app div[class~="x1n2onr6"][class~="x1vjfegm"][class~="x1cqoux5"][class~="x14yy4lh"]',
    '#app div[class~="x10l6tqk"][class~="x13vifvy"][class~="x1ey2m1c"][class~="xhtitgo"]'
  ].forEach((sel, i) => {
    document.querySelectorAll(sel).forEach(el => {
      if (i === 0 || i === 5) {
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

function waitForWhatsApp() {
  return new Promise(resolve => {
    const interval = setInterval(() => {
      const ready = document.querySelector('#app div[data-tab="2"], #app ._aigw');
      if (ready) {
        clearInterval(interval);
        resolve();
      }
    }, 500);
  });
}

(async () => {
  await waitForWhatsApp();
  applyStyles();

  let debounceTimer;

  // ✅ Fast observer on #main — fires immediately on chat switch
  const mainObserver = new MutationObserver(() => {
    applyStyles(); // no debounce — #main changes are rare and meaningful
  });

  const main = document.getElementById('main');
  if (main) {
    mainObserver.observe(main, { childList: true, subtree: true });
  }

  // ✅ Slower debounced observer on body — catches style resets
  const bodyObserver = new MutationObserver(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(applyStyles, 10); // reduced from 30ms → 10ms
  });

  bodyObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style']
  });
})();

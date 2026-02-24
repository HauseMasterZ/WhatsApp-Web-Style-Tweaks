function injectCSS() {
  if (document.getElementById('wa-custom-styles')) return;
  const style = document.createElement('style');
  style.id = 'wa-custom-styles';
  style.textContent = `
    header[tabindex="0"][data-tab="2"] {
      display: none !important;
    }
    #app div._aigw._as6h.false,
    #app div[class~="x12xzxwr"][class~="x9f619"] {
      border: none !important;
      max-width: 330px !important;
    }
    #app div[class~="x10l6tqk"][class~="x13vifvy"] {
      margin-left: -60px !important;
    }
    #app div[class~="x1n2onr6"][class~="x1vjfegm"][class~="x1cqoux5"][class~="x14yy4lh"] {
      margin-right: -115px !important;
    }
    #app div[class~="x10l6tqk"][class~="x13vifvy"][class~="x1ey2m1c"][class~="xhtitgo"] {
      display: none !important;
    }
    div[contenteditable="true"][data-tab="10"]::before {
      content: '' !important;
      display: none !important;
    }
  `;
  document.head.appendChild(style);
}

function waitForWhatsApp() {
  return new Promise(resolve => {
    const interval = setInterval(() => {
      const ready = document.querySelector('#app div[data-tab="2"], #app ._aigw');
      if (ready) { clearInterval(interval); resolve(); }
    }, 500);
  });
}

(async () => {
  await waitForWhatsApp();
  injectCSS(); // that's it — no observers needed at all
})();

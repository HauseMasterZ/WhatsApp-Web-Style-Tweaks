const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  const fileUrl = 'file:///' + path.resolve('stillbroken_WhatsApp.html').replace(/\\/g, '/');
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'stillbroken.png' });
  await browser.close();
  console.log('Screenshot saved to stillbroken.png');
})();

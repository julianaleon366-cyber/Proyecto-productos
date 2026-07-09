const { chromium, devices } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ ...devices['iPhone 13'] });
  const rotas = [];
  page.on('response', r => { if (r.url().includes('/imagenes') && r.status() >= 400) rotas.push(decodeURIComponent(r.url())); });
  await page.goto('http://localhost:3000/producto/nyx-face-glue-primer', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const imgSrc = async () => {
    const s = await page.locator('main img').first().getAttribute('src');
    return decodeURIComponent(s).match(/nyx-glue-\d\.\w+/)?.[0] ?? s.slice(-25);
  };
  console.log('título:', await page.locator('h1').innerText());
  // NO debe haber círculos de tono
  console.log('círculos de tono:', await page.locator('button[aria-pressed]').count(), '(esperado 1 = solo favorito)');
  console.log('inicial:', await imgSrc());
  // flechas de galería
  const sig = page.locator('button[aria-label="Foto siguiente"]');
  console.log('¿hay flechas?', await sig.count() > 0 ? 'sí ✓' : 'no');
  await sig.click(); await page.waitForTimeout(400);
  console.log('tras siguiente:', await imgSrc());
  await sig.click(); await page.waitForTimeout(400);
  console.log('tras siguiente (vuelve):', await imgSrc());
  await page.waitForTimeout(400);
  console.log('rotas:', rotas.length);
  await page.screenshot({ path: 'nyx.png', fullPage: true });
  await browser.close();
})();

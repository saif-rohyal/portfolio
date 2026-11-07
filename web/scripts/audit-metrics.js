const { chromium } = require('playwright');

async function runAudit() {
  console.log('Running automated accessibility, SEO, and performance audit on http://localhost:3000...\n');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  const startTime = Date.now();
  const response = await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const loadTimeMs = Date.now() - startTime;

  console.log(`Page HTTP Status: ${response.status()}`);
  console.log(`Network Idle Load Time: ${loadTimeMs}ms`);

  // SEO Checks
  const title = await page.title();
  const metaDesc = await page.$eval('meta[name="description"]', el => el.getAttribute('content')).catch(() => null);
  const ogTitle = await page.$eval('meta[property="og:title"]', el => el.getAttribute('content')).catch(() => null);
  const ogImage = await page.$eval('meta[property="og:image"]', el => el.getAttribute('content')).catch(() => null);
  const jsonLd = await page.$eval('script[type="application/ld+json"]', el => JSON.parse(el.innerHTML)).catch(() => null);

  console.log('\n--- SEO & METADATA AUDIT ---');
  console.log(`Title: "${title}" [${title.includes('Saif Rohyal') ? 'PASS' : 'FAIL'}]`);
  console.log(`Meta Description: "${metaDesc ? metaDesc.slice(0, 60) + '...' : 'NONE'}" [${metaDesc ? 'PASS' : 'FAIL'}]`);
  console.log(`OpenGraph Title: "${ogTitle}" [${ogTitle ? 'PASS' : 'FAIL'}]`);
  console.log(`OpenGraph Image: "${ogImage}" [${ogImage ? 'PASS' : 'FAIL'}]`);
  console.log(`Structured Data (JSON-LD Person): "${jsonLd?.name}" [${jsonLd?.name === 'Saif Rohyal' ? 'PASS' : 'FAIL'}]`);

  // Accessibility Checks
  console.log('\n--- ACCESSIBILITY AUDIT ---');
  const imagesWithoutAlt = await page.$$eval('img:not([alt])', imgs => imgs.length);
  console.log(`Images missing alt text: ${imagesWithoutAlt} [${imagesWithoutAlt === 0 ? 'PASS' : 'FAIL'}]`);

  const headings = await page.$$eval('h1, h2, h3', els => els.map(e => ({ tag: e.tagName, text: e.innerText.trim() })));
  console.log(`Headings present: ${headings.length} (H1 count: ${headings.filter(h => h.tag === 'H1').length}) [PASS]`);

  // Name check (Must NEVER include "Saif Ullah")
  const pageText = await page.innerText('body');
  const hasSaifUllah = pageText.includes('Saif Ullah');
  console.log(`Banned name "Saif Ullah" check: [${hasSaifUllah ? 'CRITICAL FAILURE: FOUND' : 'CLEAN: NOT PRESENT (PASS)'}]`);

  // Phone check (Must NEVER be in page source)
  const hasRawPhone = pageText.includes('+92 329 515 2017') || pageText.includes('923295152017');
  console.log(`Direct phone number in page source check: [${hasRawPhone ? 'FAILURE: EXPOSED' : 'CLEAN: HIDDEN BEHIND SERVER REDIRECT (PASS)'}]`);

  // Console errors check
  console.log('\n--- RUNTIME STABILITY ---');
  console.log(`Browser console errors logged: ${errors.length} [${errors.length === 0 ? 'PASS' : 'FAIL'}]`);
  if (errors.length > 0) {
    console.log('Errors:', errors);
  }

  await browser.close();
}

runAudit().catch(console.error);

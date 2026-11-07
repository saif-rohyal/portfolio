const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const screenshotsDir = path.resolve(__dirname, '../../screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

const breakpoints = [
  { name: '320px_mobile_small', width: 320, height: 740 },
  { name: '375px_mobile_standard', width: 375, height: 812 },
  { name: '768px_tablet', width: 768, height: 1024 },
  { name: '1024px_laptop', width: 1024, height: 800 },
  { name: '1440px_desktop_wide', width: 1440, height: 900 },
];

async function capture() {
  console.log('Launching Chromium for responsive testing...');
  const browser = await chromium.launch({ headless: true });

  for (const theme of ['light', 'dark']) {
    console.log(`\n=== TESTING THEME: ${theme.toUpperCase()} ===`);

    for (const bp of breakpoints) {
      console.log(`Capturing viewport: ${bp.name} (${bp.width}x${bp.height}) in ${theme}...`);
      const context = await browser.newContext({
        viewport: { width: bp.width, height: bp.height },
        colorScheme: theme,
        deviceScaleFactor: 1,
      });

      const page = await context.newPage();
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

      // Apply theme class to <html> explicitly to guarantee exact theme rendering
      await page.evaluate((t) => {
        const html = document.documentElement;
        if (t === 'dark') {
          html.classList.add('dark');
        } else {
          html.classList.remove('dark');
        }
      }, theme);

      await page.waitForTimeout(600); // Wait for transition & font load

      // Full-page screenshot
      const fullPageFile = path.join(screenshotsDir, `${bp.name}_${theme}.png`);
      await page.screenshot({ path: fullPageFile, fullPage: true });

      // Hero / above-the-fold screenshot
      const foldFile = path.join(screenshotsDir, `${bp.name}_${theme}_fold.png`);
      await page.screenshot({ path: foldFile, fullPage: false });

      await context.close();
    }

    // 1x Portrait Photo Close-up
    console.log(`Capturing Photo 1x close-up in ${theme}...`);
    const ctx1x = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      deviceScaleFactor: 1,
      colorScheme: theme,
    });
    const page1x = await ctx1x.newPage();
    await page1x.goto('http://localhost:3000#about', { waitUntil: 'networkidle' });
    await page1x.evaluate((t) => {
      if (t === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    }, theme);
    await page1x.waitForTimeout(600);

    // Scroll to portrait in About
    const portraitElement = await page1x.$('#about img');
    if (portraitElement) {
      await portraitElement.scrollIntoViewIfNeeded();
      await page1x.waitForTimeout(300);
      await portraitElement.screenshot({
        path: path.join(screenshotsDir, `photo_closeup_1x_${theme}.png`)
      });
    }
    await ctx1x.close();

    // 2x Retina Portrait Photo Close-up
    console.log(`Capturing Photo 2x Retina close-up in ${theme}...`);
    const ctx2x = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      deviceScaleFactor: 2, // 2x Device Pixel Ratio
      colorScheme: theme,
    });
    const page2x = await ctx2x.newPage();
    await page2x.goto('http://localhost:3000#about', { waitUntil: 'networkidle' });
    await page2x.evaluate((t) => {
      if (t === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    }, theme);
    await page2x.waitForTimeout(600);

    const portraitElement2x = await page2x.$('#about img');
    if (portraitElement2x) {
      await portraitElement2x.scrollIntoViewIfNeeded();
      await page2x.waitForTimeout(300);
      await portraitElement2x.screenshot({
        path: path.join(screenshotsDir, `photo_closeup_2x_retina_${theme}.png`)
      });
    }
    await ctx2x.close();

    // Robot Assistant Chat Drawer Screenshot
    console.log(`Capturing Robot Assistant open in ${theme}...`);
    const ctxRobot = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      colorScheme: theme,
    });
    const pageRobot = await ctxRobot.newPage();
    await pageRobot.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await pageRobot.evaluate((t) => {
      if (t === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    }, theme);
    await pageRobot.waitForTimeout(400);

    // Click the floating robot button
    const robotButton = await pageRobot.$('button[aria-label="Open AI Assistant"]');
    if (robotButton) {
      await robotButton.click();
      await pageRobot.waitForTimeout(600);
      await pageRobot.screenshot({
        path: path.join(screenshotsDir, `robot_assistant_open_${theme}.png`),
        fullPage: false
      });
    }
    await ctxRobot.close();
  }

  await browser.close();
  console.log(`\nAll screenshots successfully captured to: ${screenshotsDir}`);
}

capture().catch((err) => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});

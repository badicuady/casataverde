import { chromium } from '@playwright/test';
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
  args: ['--no-sandbox'],
});
for (const [name, path, width, height] of [
  ['desktop-home', '/', 1440, 1000],
  ['mobile-home', '/', 390, 844],
  ['tablet-home', '/en/', 820, 1180],
  ['desktop-category', '/solutii/pompe-de-caldura/', 1440, 1000],
  ['desktop-professional', '/en/for-professionals/', 1440, 1000],
  ['desktop-configurator', '/en/configure/', 1440, 1000],
]) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.goto(`http://localhost:4321${path}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `explore/validation/${name}-viewport.png` });
  for (let y = 0; y < (await page.evaluate(() => document.body.scrollHeight)); y += 700) {
    await page.evaluate((y) => scrollTo(0, y), y);
    await page.waitForTimeout(70);
  }
  await page.waitForTimeout(150);
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({ path: `explore/validation/${name}.png`, fullPage: true });
  if (name === 'desktop-home') {
    await page.locator('#ecosistem').scrollIntoViewIfNeeded();
    await page.screenshot({ path: 'explore/validation/desktop-ecosystem.png' });
  }
  console.log(
    JSON.stringify({
      name,
      images: await page
        .locator('img')
        .evaluateAll((imgs) =>
          imgs.map((i) => ({ src: i.currentSrc, loaded: i.complete && i.naturalWidth > 0 })),
        ),
    }),
  );
  await page.close();
}
await browser.close();

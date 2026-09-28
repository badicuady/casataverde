import { chromium } from '@playwright/test';
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox'],
});
for (const [name, path, width, height] of [
  ['desktop-home', '/', 1440, 1000],
  ['mobile-home', '/', 390, 844],
  ['tablet-home', '/en/', 820, 1180],
  ['desktop-category', '/solutii/pompe-de-caldura/', 1440, 1000],
  ['mobile-contact', '/contact/?audience=professional&systems=solar,roof', 390, 844],
]) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(`http://localhost:4321${path}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `explore/validation/${name}.png`, fullPage: true });
  console.log(
    JSON.stringify({
      name,
      title: await page.title(),
      errors,
      overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
    }),
  );
  await page.close();
}
await browser.close();

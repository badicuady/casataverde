import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const output = 'explore/validation/motion';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
  args: ['--no-sandbox'],
});
const results = [];
for (const [name, path, width, height] of [
  ['desktop', '/', 1440, 1000],
  ['mobile', '/en/', 390, 844],
  ['tablet', '/en/for-professionals/', 820, 1180],
  ['category', '/solutii/pompe-de-caldura/', 1440, 1000],
  ['narrow', '/en/solutions/metal-roofing/', 320, 900],
  ['wide', '/en/', 2560, 1440],
]) {
  const context = await browser.newContext({ viewport: { width, height } });
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => 8 });
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(`http://localhost:4321${path}`);
  await page.waitForTimeout(2600);
  await page.screenshot({ path: `${output}/${name}-initial.png` });
  const photo = page.locator('[data-parallax]').first();
  const start = await photo.evaluate((el) => getComputedStyle(el).getPropertyValue('--parallax-y'));
  await page.evaluate(() => scrollBy(0, 380));
  await page.waitForTimeout(150);
  await page.screenshot({ path: `${output}/${name}-scroll.png` });
  const end = await photo.evaluate((el) => getComputedStyle(el).getPropertyValue('--parallax-y'));
  if (name === 'desktop') {
    await page.locator('.house-drawing').evaluate((el) => el.scrollIntoView({ block: 'center' }));
    await page.waitForTimeout(100);
    await page.screenshot({ path: `${output}/house-entering.png` });
    await page.waitForTimeout(2300);
    await page.screenshot({ path: `${output}/house-settled.png` });
    await page.locator('.family-features').evaluate((el) => el.scrollIntoView({ block: 'start' }));
    await page.waitForTimeout(100);
    await page.screenshot({ path: `${output}/families-entering.png` });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `${output}/families-settled.png` });
    await page.locator('.audience-section').evaluate((el) => el.scrollIntoView({ block: 'start' }));
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `${output}/audiences.png` });
  }
  results.push({
    name,
    width,
    height,
    start,
    end,
    errors,
    overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
  });
  await context.close();
}
await writeFile(`${output}/visual-checks.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results));
await browser.close();

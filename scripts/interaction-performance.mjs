import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
  args: ['--no-sandbox'],
});
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});
const client = await page.context().newCDPSession(page);
await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });
await page.addInitScript(() => {
  window.__timings = [];
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries())
      if (entry.interactionId)
        window.__timings.push({ name: entry.name, duration: entry.duration });
  }).observe({ type: 'event', buffered: true, durationThreshold: 16 });
});
await page.goto('http://localhost:4321/');
for (const id of ['heat', 'roof', 'rain', 'smart', 'ceiling', 'solar']) {
  await page.locator(`[data-system="${id}"] summary`).click();
  await page.waitForTimeout(100);
}
const home = await page.evaluate(() => ({
  timings: window.__timings,
  lowMotion: document.querySelector('[data-ecosystem]').classList.contains('low-motion'),
  scripts: performance
    .getEntriesByType('resource')
    .filter((r) => r.initiatorType === 'script')
    .map((r) => ({ name: r.name, bytes: r.encodedBodySize })),
  images: performance
    .getEntriesByType('resource')
    .filter((r) => /\.avif/.test(r.name))
    .map((r) => ({ name: r.name, bytes: r.encodedBodySize })),
}));
await page.goto('http://localhost:4321/configureaza/');
for (const id of ['professional', 'new', 'solar', 'heat', 'roof', 'rain', 'smart', 'ceiling']) {
  await page.locator(`input[value="${id}"]`).check();
  await page.waitForTimeout(100);
}
const form = await page.evaluate(() => ({
  timings: window.__timings,
  scripts: performance
    .getEntriesByType('resource')
    .filter((r) => r.initiatorType === 'script')
    .map((r) => ({ name: r.name, bytes: r.encodedBodySize })),
}));
await writeFile(
  'explore/validation/interaction-performance.json',
  JSON.stringify({ cpuSlowdown: 4, viewport: '390x844', home, form }, null, 2),
);
console.log(
  JSON.stringify({
    homeMax: Math.max(0, ...home.timings.map((x) => x.duration)),
    formMax: Math.max(0, ...form.timings.map((x) => x.duration)),
    lowMotion: home.lowMotion,
    homeScripts: home.scripts,
    formScripts: form.scripts,
  }),
);
await browser.close();

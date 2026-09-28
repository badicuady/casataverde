import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
  args: ['--no-sandbox'],
});
const results = [];
for (const [name, width, height] of [
  ['desktop', 1440, 1000],
  ['mobile', 390, 844],
]) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => 8 });
    window.motionMetrics = { shifts: [], tasks: [] };
    new PerformanceObserver((list) => {
      window.motionMetrics.shifts.push(
        ...list
          .getEntries()
          .filter((entry) => !entry.hadRecentInput)
          .map((entry) => entry.value),
      );
    }).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver((list) => {
      window.motionMetrics.tasks.push(
        ...list.getEntries().map((entry) => ({ start: entry.startTime, duration: entry.duration })),
      );
    }).observe({ type: 'longtask', buffered: true });
  });
  const session = await page.context().newCDPSession(page);
  await session.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await page.goto('http://localhost:4321/');
  await page.waitForTimeout(2600);
  const result = await page.evaluate(async () => {
    const frames = [];
    const start = performance.now();
    let previous = start;
    const distance = document.documentElement.scrollHeight - innerHeight;
    await new Promise((resolve) => {
      function tick(now) {
        frames.push(now - previous);
        previous = now;
        const progress = Math.min((now - start) / 6500, 1);
        scrollTo(0, distance * progress);
        if (progress < 1) requestAnimationFrame(tick);
        else resolve();
      }
      requestAnimationFrame(tick);
    });
    const sorted = frames.slice(1).sort((a, b) => a - b);
    return {
      frameCount: sorted.length,
      frameIntervalP95: sorted[Math.floor(sorted.length * 0.95)],
      frameIntervalMax: Math.max(...sorted),
      framesOver34ms: sorted.filter((value) => value > 34).length,
      longTasksDuringScroll: window.motionMetrics.tasks.filter((entry) => entry.start >= start),
      observedLayoutShiftSum: window.motionMetrics.shifts.reduce((sum, value) => sum + value, 0),
    };
  });
  await page.waitForTimeout(2500);
  result.remainingAnimationsAtRest = await page.evaluate(
    () => document.getAnimations().filter((a) => a.playState === 'running').length,
  );
  results.push({ name, width, height, CPUThrottle: 4, ...result });
  await page.close();
}
await browser.close();
await writeFile(
  'explore/validation/motion/scroll-performance.json',
  JSON.stringify(results, null, 2),
);
console.log(JSON.stringify(results));

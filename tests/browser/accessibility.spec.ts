import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync, writeFileSync } from 'node:fs';
const paths = [
  ...readFileSync('dist/client/sitemap.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g),
].map((m) => new URL(m[1]).pathname);
for (const width of [390, 1440])
  test(`WCAG automated scan on every page at ${width}px`, async ({ page }) => {
    test.setTimeout(120000);
    await page.setViewportSize({ width, height: 1000 });
    const failures = [];
    for (const path of paths) {
      await page.goto(path);
      const report = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();
      if (report.violations.length)
        failures.push({
          path,
          violations: report.violations.map((v) => ({
            id: v.id,
            impact: v.impact,
            nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
          })),
        });
    }
    writeFileSync(
      `explore/validation/accessibility-${width}.json`,
      JSON.stringify({ pages: paths.length, width, failures }, null, 2),
    );
    expect(failures.length, 'See saved accessibility report for node details').toBe(0);
  });
test('keyboard skips header, expands systems and completes a configuration', async ({ page }) => {
  await page.goto('/en/');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await page.keyboard.press('Enter');
  expect(new URL(page.url()).hash).toBe('#main');
  const summary = page.locator('[data-system="heat"] summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-system="heat"] .system-copy')).toBeVisible();
  expect(await summary.evaluate((el) => getComputedStyle(el).outlineStyle)).toBe('solid');
  await page.goto('/en/configure/');
  await page.locator('input[value="residential"]').focus();
  await page.keyboard.press('Space');
  await expect(page.locator('input[value="residential"]')).toBeChecked();
  await page.keyboard.press('Tab');
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');
  await expect(page.locator('input[value="solar"]')).toBeChecked();
  await page.locator('button[type="submit"]').focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/en\/contact\//);
});
test('reduced motion and constrained devices keep all selection meaning without transforms', async ({
  browser,
}) => {
  for (const mode of ['reduced', 'constrained']) {
    const context = await browser.newContext({
      reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference',
    });
    if (mode === 'constrained')
      await context.addInitScript(() =>
        Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => 2 }),
      );
    const page = await context.newPage();
    await page.goto('http://localhost:4321/');
    await page.locator('[data-system="roof"] summary').click();
    await expect(page.locator('[data-system="roof"] .system-copy')).toBeVisible();
    await expect(page.locator('[data-marker="roof"]')).toHaveClass('selected');
    expect(
      await page.locator('[data-layer="roof"]').evaluate((el) => getComputedStyle(el).transform),
    ).toBe('none');
    await context.close();
  }
});
test('200 percent equivalent zoom reflows and the form labels remain associated', async ({
  page,
}) => {
  await page.setViewportSize({ width: 640, height: 500 });
  await page.goto('/en/contact/?audience=professional');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  for (const name of ['name', 'email', 'locality', 'phone', 'company', 'role', 'description'])
    expect(
      await page.locator(`#${name}`).evaluate((el: HTMLInputElement) => el.labels?.length),
    ).toBeGreaterThan(0);
});

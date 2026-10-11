import { test, expect } from '@playwright/test';

test('survey builds once, pauses locally and globally, suspends offscreen and replays', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  const section = page.locator('#from-plan-to-home');
  const canvas = section.locator('canvas');
  const frame = () => canvas.evaluate((element: HTMLCanvasElement) => element.toDataURL());
  await expect(page.locator('app-project-context:has(#process) + app-home-build')).toHaveCount(1);
  await section.scrollIntoViewIfNeeded();
  await section.getByRole('button', { name: 'Reia animația' }).click();
  const start = await frame();
  await expect.poll(frame).not.toBe(start);
  await section.getByRole('button', { name: 'Oprește construcția' }).click();
  const paused = await frame();
  await page.waitForTimeout(180);
  expect(await frame()).toBe(paused);
  await section.getByRole('button', { name: 'Continuă construcția' }).click();
  await expect.poll(frame).not.toBe(paused);

  await page.locator('.motion-button').click();
  await expect(section.locator('.build-replay')).toBeDisabled();
  const globalPause = await frame();
  await page.waitForTimeout(180);
  expect(await frame()).toBe(globalPause);
  await page.locator('.motion-button').click();
  await expect.poll(frame).not.toBe(globalPause);

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(150);
  const offscreen = await frame();
  await page.waitForTimeout(200);
  expect(await frame()).toBe(offscreen);
  await section.scrollIntoViewIfNeeded();
  await expect(section.locator('.build-pause')).toHaveCount(0, { timeout: 12000 });
  await expect(section.locator('[aria-current="step"]')).toContainText('Acasă');
  const completed = await frame();
  await page.waitForTimeout(180);
  expect(await frame()).toBe(completed);
  await section.getByRole('button', { name: 'Reia animația' }).click();
  await expect(section.locator('[aria-current="step"]')).toContainText('Releveu');
  await expect.poll(frame).not.toBe(completed);
  expect(errors).toEqual([]);
});

test('reduced motion shows the finished home, language and responsive layout remain usable', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const section = page.locator('#from-plan-to-home');
  await section.scrollIntoViewIfNeeded();
  await expect(section.locator('[aria-current="step"]')).toContainText('Acasă');
  await expect(section.getByRole('button')).toHaveCount(0);
  await page.waitForLoadState('networkidle');
  const frame = () =>
    section.locator('canvas').evaluate((element: HTMLCanvasElement) => element.toDataURL());
  const still = await frame();
  await page.waitForTimeout(180);
  expect(await frame()).toBe(still);
  await page.getByRole('button', { name: 'English', exact: true }).click();
  await expect(section.locator('h2')).toHaveText('From measured planto your home.');
  await expect(section.locator('[aria-current="step"]')).toContainText('Home');
  await expect(section.locator('canvas')).toHaveAttribute(
    'aria-label',
    /dimensioned as-built plan/,
  );
  for (const width of [320, 390, 768, 1024, 1536]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    const bounds = await section.locator('canvas').boundingBox();
    expect(bounds!.width).toBeGreaterThan(250);
    expect(bounds!.height).toBeGreaterThan(150);
  }
});

test('an unavailable 2D context retains an accessible finished home', async ({ page }) => {
  await page.addInitScript(() => {
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (...args: Parameters<typeof getContext>) {
      if (args[0] === '2d') return null;
      return getContext.apply(this, args);
    } as typeof getContext;
  });
  await page.goto('/');
  const section = page.locator('#from-plan-to-home');
  await section.scrollIntoViewIfNeeded();
  const fallback = section.locator('.build-fallback');
  await expect(fallback).toBeVisible();
  await expect
    .poll(() => fallback.evaluate((image: HTMLImageElement) => image.naturalWidth))
    .toBeGreaterThan(0);
  await expect(section.locator('[aria-current="step"]')).toContainText('Acasă');
  await expect(section.getByRole('button')).toHaveCount(0);
});

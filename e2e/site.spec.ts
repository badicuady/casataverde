import { test, expect } from '@playwright/test';

test('seven galleries, all slides, keyboard navigation and independent selection', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  await expect(page).toHaveTitle(/Casa Ta Verde/);
  await expect(page.locator('h1')).toHaveText('Casă la cheie.Un plan clar.');
  await page.locator('.hero-controls a').click();
  const tabs = page.getByRole('tab');
  await expect(tabs).toHaveCount(7);
  for (let i = 0; i < 7; i++) {
    await tabs.nth(i).click();
    await expect(tabs.nth(i)).toHaveAttribute('aria-selected', 'true');
    const labels = await page
      .locator('.thumbnail')
      .evaluateAll((els) => els.map((e) => e.getAttribute('aria-label')));
    for (let slide = 0; slide < 3; slide++) {
      await page.locator('.thumbnail').nth(slide).click();
      await expect(page.locator('.counter')).toHaveText(`0${slide + 1} / 03`);
      await expect(page.locator('.main-image')).toHaveAttribute(
        'aria-label',
        `Imagine conceptuală: ${labels[slide]}`,
      );
    }
    await page.getByRole('button', { name: 'Imaginea următoare', exact: true }).click();
    await expect(page.locator('.counter')).toHaveText('01 / 03');
    await page.getByRole('button', { name: 'Imaginea anterioară', exact: true }).click();
    await expect(page.locator('.counter')).toHaveText('03 / 03');
  }
  await tabs.nth(0).click();
  await expect(page.locator('.counter')).toHaveText('03 / 03');
  await tabs.nth(0).focus();
  await page.keyboard.press('ArrowRight');
  await expect(tabs.nth(1)).toBeFocused();
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('End');
  await expect(tabs.nth(6)).toBeFocused();
  await expect(page.locator('.gallery-copy')).toContainText('Bimicat Construct');
  await page.keyboard.press('ArrowRight');
  await expect(tabs.nth(0)).toBeFocused();
  await page.keyboard.press('ArrowLeft');
  await expect(tabs.nth(6)).toBeFocused();
  await page.keyboard.press('Home');
  await expect(tabs.nth(0)).toBeFocused();
  expect(errors).toEqual([]);
});

test('language persists, translates content and encodes the correct WhatsApp enquiry', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'English', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('h1')).toHaveText('Turnkey homes.A clear plan.');
  await expect(page.getByRole('tab').first()).toContainText('Roofing systems');
  const link = page.getByRole('link', { name: 'Let’s talk on WhatsApp' });
  const href = await link.getAttribute('href');
  const url = new URL(href!);
  expect(url.hostname).toBe('wa.me');
  expect(url.pathname).toBe('/40723200709');
  expect(url.searchParams.get('text')).toBe(
    'Hello! I would like to learn more about Casa Ta Verde solutions.',
  );
  await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.getByRole('button', { name: 'Română', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ro');
  await expect(page.locator('.whatsapp')).toContainText('Scrie-ne pe WhatsApp');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    /Consultanță pentru case la cheie în Brașov/,
  );
});

test('canvas animates, pause freezes it, reduced motion disables animation and parallax', async ({
  page,
}) => {
  await page.goto('/');
  await page.locator('app-energy-scene canvas').waitFor();
  const frame = () =>
    page.locator('app-energy-scene canvas').evaluate((e: HTMLCanvasElement) => e.toDataURL());
  const first = await frame();
  await page.waitForTimeout(160);
  expect(await frame()).not.toBe(first);
  await page.getByRole('button', { name: 'Oprește animația' }).click();
  const paused = await frame();
  await page.waitForTimeout(160);
  expect(await frame()).toBe(paused);
  await page.getByRole('button', { name: 'Pornește animația' }).click();
  await page.evaluate(() => window.scrollTo({ top: 100, behavior: 'instant' }));
  await expect
    .poll(() => page.locator('.scene-layer').evaluate((e) => getComputedStyle(e).transform))
    .not.toBe('none');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.scene-layer')).toHaveCSS('transform', 'none');
  const still = await frame();
  await page.waitForTimeout(160);
  expect(await frame()).toBe(still);
});

test('responsive layout, mobile menu, assets and no horizontal overflow', async ({
  page,
  isMobile,
}) => {
  const failures: string[] = [];
  page.on('response', (r) => {
    if (r.status() >= 400) failures.push(r.url());
  });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  if (isMobile) {
    await page.getByRole('button', { name: 'Deschide meniul' }).click();
    await expect(page.locator('#mobile-nav')).toBeVisible();
    await page.locator('#mobile-nav').getByRole('link', { name: 'Contact', exact: true }).click();
    await expect(page.locator('#mobile-nav')).toHaveCount(0);
    await expect(page).toHaveURL(/#contact$/);
  }
  for (const width of [320, 390, 768, 1024, 1536]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
  for (let i = 0; i < 7; i++) {
    await page.getByRole('tab').nth(i).click();
  }
  await page.waitForLoadState('networkidle');
  expect(failures).toEqual([]);
  await expect(page.locator('main')).toBeVisible();
  await expect(page.locator('h1')).toBeVisible();
});

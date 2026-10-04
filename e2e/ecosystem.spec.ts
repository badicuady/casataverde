import { test, expect } from '@playwright/test';

test('directory combines category and diacritic-insensitive search, resets and translates', async ({
  page,
}) => {
  await page.goto('/');
  const directory = page.locator('#ecosystem');
  await directory.scrollIntoViewIfNeeded();
  const cards = directory.locator('.partner-item');
  await expect(cards).toHaveCount(6);
  await directory.getByRole('button', { name: 'Energie', exact: true }).click();
  await expect(cards).toHaveCount(2);
  await expect(cards.nth(0)).toHaveAttribute('data-partner', 'solarhev');
  await expect(cards.nth(1)).toHaveAttribute('data-partner', 'huawei');
  const search = directory.getByRole('searchbox');
  await search.fill('HUAWEI');
  await expect(cards).toHaveCount(1);
  await directory.getByRole('button', { name: 'Șterge căutarea' }).click();
  await expect(search).toBeFocused();
  await directory.getByRole('button', { name: 'Toate', exact: true }).click();
  await search.fill('caldura');
  await expect(cards).toHaveCount(1);
  await expect(cards).toHaveAttribute('data-partner', 'ferroli');
  await search.fill('no-such-brand');
  await expect(cards).toHaveCount(0);
  await expect(directory.locator('.empty-state')).toBeVisible();
  await directory.getByRole('button', { name: 'Resetează filtrele' }).click();
  await expect(cards).toHaveCount(6);
  await expect(search).toHaveValue('');
  await page.getByRole('button', { name: 'English', exact: true }).click();
  await expect(directory.locator('h2')).toHaveText('One ecosystem.More possibilities.');
  await expect(page.locator('#story-ceiling h2')).toHaveText('Look up.See things differently.');
  await expect(page.locator('#story-storage')).toContainText('Residential storage');
  await directory.getByRole('button', { name: 'Energy', exact: true }).click();
  await expect(cards).toHaveCount(2);
  await search.fill('storage');
  await expect(cards).toHaveCount(1);
  await expect(cards).toHaveAttribute('data-partner', 'huawei');
});

test('all story images load and links, responsive grids and rapid filter transitions remain usable', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  for (const id of ['roof', 'climate', 'ceiling', 'storage', 'smart', 'solar']) {
    await page.locator('#story-' + id).scrollIntoViewIfNeeded();
    await expect(page.locator('#story-' + id + ' h2')).toBeVisible();
    await expect
      .poll(() =>
        page
          .locator('#story-' + id + ' img')
          .evaluateAll((images) =>
            images.every(
              (image) =>
                (image as HTMLImageElement).complete &&
                (image as HTMLImageElement).naturalWidth > 0,
            ),
          ),
      )
      .toBe(true);
  }
  const directory = page.locator('#ecosystem');
  await directory.scrollIntoViewIfNeeded();
  for (const width of [320, 390, 768, 1024, 1536]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
  const positions = await directory
    .locator('.partner-item')
    .evaluateAll((items) => items.map((item) => Math.round(item.getBoundingClientRect().top)));
  expect(new Set(positions).size).toBe(2);
  for (const category of ['Energie', 'Interior', 'Smart Home', 'Climatizare', 'Toate']) {
    await directory.getByRole('button', { name: category, exact: true }).click({ force: true });
  }
  await expect(directory.locator('.partner-item')).toHaveCount(6);
  await expect
    .poll(() =>
      directory
        .locator('.partner-item')
        .evaluateAll((items) => items.every((item) => getComputedStyle(item).opacity === '1')),
    )
    .toBe(true);
  await expect(directory.locator('[data-partner="huawei"] a')).toHaveAttribute(
    'href',
    (await page.locator('.whatsapp').getAttribute('href'))!,
  );
  await expect(directory.locator('[data-partner="tero"] a')).toHaveAttribute(
    'href',
    '#story-ceiling',
  );
  await expect(directory.locator('[data-partner="huawei"] a')).toHaveAttribute(
    'rel',
    'noopener noreferrer',
  );
  expect(errors).toEqual([]);
});

test('scroll motion, WebGL pause/offscreen suspension and teardown release resources', async ({
  page,
}) => {
  await page.goto('/');
  const image = page.locator('#story-roof .story-main img');
  await image.scrollIntoViewIfNeeded();
  await page.waitForTimeout(350);
  const transform = await image.evaluate((el) => getComputedStyle(el).transform);
  await page.evaluate(() => window.scrollBy({ top: 250, behavior: 'instant' }));
  await expect
    .poll(() => image.evaluate((el) => getComputedStyle(el).transform))
    .not.toBe(transform);
  const field = page.locator('app-energy-field');
  await field.scrollIntoViewIfNeeded();
  await expect(field.locator('.field-viewport')).toHaveClass(/loaded/);
  const phase = () =>
    page.evaluate(
      () => (window as any).ng.getComponent(document.querySelector('app-energy-field')).phase,
    );
  const first = await phase();
  await expect.poll(phase).toBeGreaterThan(first);
  await page.getByRole('button', { name: 'Oprește animația' }).click();
  const paused = await phase();
  await page.waitForTimeout(180);
  expect(await phase()).toBe(paused);
  await page.getByRole('button', { name: 'Pornește animația' }).click();
  await expect.poll(phase).toBeGreaterThan(paused);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect
    .poll(() =>
      page.evaluate(
        () => (window as any).ng.getComponent(document.querySelector('app-energy-field')).frame,
      ),
    )
    .toBe(0);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await expect
    .poll(() =>
      page.evaluate(
        () => (window as any).ng.getComponent(document.querySelector('app-energy-field')).frame,
      ),
    )
    .toBe(0);
  const teardown = await page.evaluate(() => {
    const ng = (window as any).ng;
    const field = ng.getComponent(document.querySelector('app-energy-field'));
    let geometries = 0,
      materials = 0,
      renderer = 0;
    const expectedGeometries = field.geometries.length,
      expectedMaterials = field.materials.length;
    field.geometries.forEach((g: any) => g.addEventListener('dispose', () => geometries++));
    field.materials.forEach((m: any) => m.addEventListener('dispose', () => materials++));
    const originalDispose = field.renderer.dispose.bind(field.renderer);
    field.renderer.dispose = () => {
      renderer++;
      originalDispose();
    };
    const stories = ng.getComponent(document.querySelector('app-category-stories'));
    const trigger = stories.motion.context
      .getTweens()
      .find((t: any) => t.scrollTrigger)?.scrollTrigger;
    const ScrollTrigger = trigger.constructor;
    const before = ScrollTrigger.getAll().length;
    for (const selector of [
      'app-energy-field',
      'app-category-stories',
      'app-partner-directory',
      'app-partner-marquee',
    ])
      ng.getComponent(document.querySelector(selector)).ngOnDestroy();
    // Idempotence protects teardown racing with late async work.
    field.ngOnDestroy();
    ng.getComponent(document.querySelector('app-root')).ngOnDestroy();
    return {
      geometries,
      materials,
      renderer,
      expectedGeometries,
      expectedMaterials,
      before,
      after: ScrollTrigger.getAll().length,
      frame: field.frame,
      hasRenderer: !!field.renderer,
    };
  });
  expect(teardown.before).toBeGreaterThan(0);
  expect(teardown.geometries).toBe(teardown.expectedGeometries);
  expect(teardown.materials).toBe(teardown.expectedMaterials);
  expect(teardown.renderer).toBe(1);
  expect(teardown.after).toBe(0);
  expect(teardown.frame).toBe(0);
  expect(teardown.hasRenderer).toBe(false);
});

test('WebGL failure leaves an accessible static composition', async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type: string, ...args: any[]) {
      if (type === 'webgl2' || type === 'webgl') return null;
      return (original as any).call(this, type, ...args);
    } as any;
  });
  await page.goto('/');
  await page.locator('app-energy-field').scrollIntoViewIfNeeded();
  await expect(page.locator('#energy-heading')).toBeVisible();
  await expect(page.locator('.field-fallback')).toHaveCSS('opacity', '0.7');
  await expect(page.locator('.field-viewport')).not.toHaveClass(/loaded/);
  await expect(page.locator('app-energy-field a')).toHaveAttribute('href', '#ecosystem');
});

test('marquee pauses for focus and reduced motion, and narrow English copy fits', async ({
  page,
}) => {
  await page.goto('/');
  await page.locator('app-partner-marquee').scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  const track = page.locator('.marquee-track');
  const moving = await track.evaluate((el) => getComputedStyle(el).transform);
  await expect.poll(() => track.evaluate((el) => getComputedStyle(el).transform)).not.toBe(moving);
  await page.locator('.marquee-lane').first().locator('a').first().focus();
  const held = await track.evaluate((el) => getComputedStyle(el).transform);
  await page.waitForTimeout(120);
  expect(await track.evaluate((el) => getComputedStyle(el).transform)).toBe(held);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(track).toHaveCSS('transform', 'none');
  await page.locator('.marquee-heading a').focus();
  await page.mouse.move(100, 100);
  await expect(track).toHaveCSS('transform', 'none');
  await page.getByRole('button', { name: 'English', exact: true }).click();
  await page.setViewportSize({ width: 320, height: 900 });
  for (const selector of ['#story-roof', '#story-ceiling', 'app-energy-field', '#ecosystem']) {
    await page.locator(selector).scrollIntoViewIfNeeded();
    // Decorative canvas can bleed beyond its clipped host; readable content and the page must fit.
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    const heading = page.locator(selector + ' h2');
    expect(await heading.evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
  }
});

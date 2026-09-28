import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => 8 });
  });
});

test('a pointer click still navigates while its hero entrance is unfinished', async ({ page }) => {
  await page.goto('/en/solutions/stretch-ceilings/');
  await page.locator('.hero-description').evaluate((element) => {
    for (const animation of element.getAnimations()) {
      animation.pause();
      animation.currentTime = 250;
    }
  });
  await page.getByRole('link', { name: 'Request a tailored quote' }).first().click();
  await expect(page).toHaveURL(/\/en\/contact\/\?systems=ceiling/);
  await expect(page.locator('input[value="ceiling"]')).toBeChecked();
});

test('photography moves within covered frames across localized marketing templates', async ({
  page,
}) => {
  for (const path of [
    '/',
    '/en/',
    '/despre/',
    '/en/about/',
    '/pentru-casa/',
    '/en/for-professionals/',
    '/solutii/panouri-fotovoltaice/',
    '/en/solutions/heat-pumps/',
  ]) {
    await page.goto(path);
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'full');
    await page.waitForTimeout(1300);
    const photo = page.locator('[data-parallax]').first();
    const initial = await photo.evaluate((el) =>
      parseFloat(getComputedStyle(el).getPropertyValue('--parallax-y')),
    );
    await page.evaluate(() => scrollBy(0, 300));
    await expect
      .poll(() =>
        photo.evaluate((el) => parseFloat(getComputedStyle(el).getPropertyValue('--parallax-y'))),
      )
      .toBeGreaterThan(initial + 45);
    const covered = await photo.evaluate((el) => {
      const frame = el.getBoundingClientRect();
      const image = el.querySelector('img')!.getBoundingClientRect();
      return (
        image.top <= frame.top &&
        image.bottom >= frame.bottom &&
        image.left <= frame.left &&
        image.right >= frame.right
      );
    });
    expect(covered, path).toBe(true);
  }
});

test('section entrances and house assembly run once and settle before selection', async ({
  page,
}) => {
  await page.goto('/en/');
  await page.waitForTimeout(1300);
  await page.locator('.house-drawing').evaluate((el) => el.scrollIntoView({ block: 'center' }));
  await expect
    .poll(() =>
      page.locator('.house-drawing').evaluate((el) => el.getAnimations({ subtree: true }).length),
    )
    .toBeGreaterThan(0);
  await page.locator('[data-system="roof"] summary').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-marker="roof"]')).toHaveClass('selected');
  await expect
    .poll(() =>
      page.locator('.house-drawing').evaluate((el) => el.getAnimations({ subtree: true }).length),
    )
    .toBe(0);
  await page.locator('.process').evaluate((el) => el.scrollIntoView({ block: 'start' }));
  await expect
    .poll(() =>
      page.locator('.process-steps').evaluate((el) => el.getAnimations({ subtree: true }).length),
    )
    .toBeGreaterThan(0);
  await expect
    .poll(() =>
      page.locator('.process-steps').evaluate((el) => el.getAnimations({ subtree: true }).length),
    )
    .toBe(0);
  await page.evaluate(() => scrollTo(0, 0));
  await page.locator('.process').evaluate((el) => el.scrollIntoView({ block: 'start' }));
  expect(
    await page
      .locator('.process-steps')
      .evaluate((el) => el.getAnimations({ subtree: true }).length),
  ).toBe(0);
});

test('changing reduced motion immediately stops entrances and scroll effects', async ({ page }) => {
  await page.goto('/');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  await page.evaluate(() => scrollTo(0, 350));
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
  expect(
    await page.locator('.hero-figure img').evaluate((el) => getComputedStyle(el).transform),
  ).toBe('none');
  await page.locator('[data-system="heat"] summary').click();
  await expect(page.locator('[data-marker="heat"]')).toHaveClass('selected');
  expect(
    await page.locator('[data-layer="heat"]').evaluate((el) => getComputedStyle(el).transform),
  ).toBe('none');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'full');
  await page.evaluate(() => scrollTo(0, 300));
  await expect
    .poll(() => page.locator('.hero-figure img').evaluate((el) => getComputedStyle(el).transform))
    .not.toBe('none');
});

test('mobile parallax is bounded after resize and form controls stay stationary', async ({
  page,
}) => {
  await page.goto('/');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(1300);
  for (const photo of await page.locator('[data-parallax]').all()) {
    await photo.evaluate((el) => el.scrollIntoView({ block: 'center' }));
    await page.waitForTimeout(850);
    const result = await photo.evaluate((el) => {
      const frame = el.getBoundingClientRect();
      const image = el.querySelector('img')!.getBoundingClientRect();
      return {
        offset: parseFloat(getComputedStyle(el).getPropertyValue('--parallax-y')),
        covered: image.top <= frame.top && image.bottom >= frame.bottom,
      };
    });
    expect(Math.abs(result.offset)).toBeLessThanOrEqual(64);
    expect(result.covered).toBe(true);
  }
  for (const path of ['/en/contact/', '/configureaza/']) {
    await page.goto(path);
    await page.locator('.project-form').scrollIntoViewIfNeeded();
    expect(
      await page
        .locator('.project-form')
        .evaluate(
          (el) =>
            el
              .getAnimations({ subtree: true })
              .filter((animation) =>
                (animation.effect as KeyframeEffect)
                  .getKeyframes()
                  .some((frame) =>
                    ['transform', 'translate', 'scale'].some((property) => property in frame),
                  ),
              ).length,
        ),
    ).toBe(0);
    await page.locator('input[value="professional"]').check();
    await expect(page.locator('input[value="professional"]')).toBeChecked();
  }
});

test('save-data removes motion and low-core devices remove parallax', async ({ browser }) => {
  for (const mode of ['off', 'lite']) {
    const context = await browser.newContext();
    await context.addInitScript((mode) => {
      Object.defineProperty(navigator, 'hardwareConcurrency', {
        get: () => (mode === 'lite' ? 2 : 8),
      });
      if (mode === 'off')
        Object.defineProperty(navigator, 'connection', {
          value: { saveData: true, addEventListener() {} },
        });
    }, mode);
    const page = await context.newPage();
    await page.goto('http://localhost:4321/');
    await expect(page.locator('html')).toHaveAttribute('data-motion', mode);
    await page.evaluate(() => scrollTo(0, 350));
    expect(
      await page.locator('.hero-figure img').evaluate((el) => getComputedStyle(el).transform),
    ).toBe('none');
    await context.close();
  }
});

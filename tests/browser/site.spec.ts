import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
const paths = [
  ...readFileSync('dist/client/sitemap.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g),
].map((m) => new URL(m[1]).pathname);
for (const width of [320, 390, 768, 1024, 1440, 1920, 2560]) {
  test(`all 26 localized pages fit ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    for (const path of paths) {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('h1')).toHaveCount(1);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1),
        path,
      ).toBe(true);
      await expect(page.locator('html')).toHaveAttribute(
        'lang',
        path.startsWith('/en/') ? 'en' : 'ro',
      );
      expect(await page.locator('head link[rel="alternate"][hreflang]').count()).toBe(3);
      if (width > 850) {
        await expect(page.locator('.desktop-nav')).toBeVisible();
      } else {
        await expect(page.locator('.mobile-paths')).toBeVisible();
      }
      for (const selector of ['.button', '.mobile-paths a']) {
        const rects = await page
          .locator(selector)
          .evaluateAll((els) =>
            els
              .filter((el) => el.getClientRects().length)
              .map((el) => el.getBoundingClientRect().height),
          );
        expect(
          rects.every((h) => h >= 44),
          `${path} targets`,
        ).toBe(true);
      }
    }
    expect(errors).toEqual([]);
  });
}
test('all internal links, images and localized equivalents resolve', async ({ page, request }) => {
  const destinations = new Set<string>();
  for (const path of paths) {
    await page.goto(path);
    const links = await page
      .locator('a[href]')
      .evaluateAll((els) => els.map((el) => (el as HTMLAnchorElement).getAttribute('href')!));
    links.filter((h) => h.startsWith('/')).forEach((h) => destinations.add(h.split(/[?#]/)[0]));
    const alternate = await page.locator('[data-language]').getAttribute('href');
    await page.locator('[data-language]').click();
    expect(new URL(page.url()).pathname).toBe(new URL(alternate!, page.url()).pathname);
  }
  for (const dest of destinations) expect((await request.get(dest)).status(), dest).toBe(200);
  await page.goto('/');
  for (const img of await page.locator('img').all()) {
    await img.scrollIntoViewIfNeeded();
    await expect
      .poll(() => img.evaluate((e: HTMLImageElement) => e.complete && e.naturalWidth > 0))
      .toBe(true);
  }
  expect((await request.get('/this-page-is-missing/')).status()).toBe(404);
});
test('professional configuration survives contact, locale changes, editing and browser back', async ({
  page,
}) => {
  await page.goto('/configureaza/');
  await page.locator('input[value="professional"]').check();
  await page.locator('input[value="renovation"]').check();
  await page.locator('input[value="solar"]').check();
  await page.locator('input[value="heat"]').check();
  await page.locator('select[name="stage"]').selectOption('design');
  await page.getByRole('button', { name: 'Continuă spre cererea de ofertă' }).click();
  await expect(page).toHaveURL(/\/contact\/.*systems=solar%2Cheat/);
  await expect(page.locator('#company')).toBeVisible();
  await expect(page.locator('input[value="solar"]')).toBeChecked();
  await page.locator('[data-language]').click();
  await expect(page).toHaveURL(/\/en\/contact\//);
  await expect(page.locator('input[value="professional"]')).toBeChecked();
  await expect(page.locator('select[name="stage"]')).toHaveValue('design');
  await page.locator('#edit-selection').click();
  await page.locator('input[value="rain"]').check();
  await page.getByRole('button', { name: 'Continue to your quote request' }).click();
  await expect(page.locator('input[value="rain"]')).toBeChecked();
  await page.goBack();
  await expect(page.locator('input[value="rain"]')).toBeChecked();
});
test('category inquiry preselects only the relevant category and unknown URLs are filtered', async ({
  page,
}) => {
  await page.goto('/en/solutions/stretch-ceilings/');
  await page.getByRole('link', { name: 'Request a tailored quote' }).first().click();
  await expect(page.locator('input[value="ceiling"]')).toBeChecked();
  await expect(page.locator('input[name="systems"]:checked')).toHaveCount(1);
  await page.goto('/en/configure/?audience=admin&systems=solar,rogue&email=private@example.test');
  await expect(page.locator('input[value="unsure"]')).toBeChecked();
  await expect(page.locator('input[value="solar"]')).toBeChecked();
  await page.locator('[data-language]').click();
  expect(page.url()).not.toContain('email');
  expect(page.url()).not.toContain('rogue');
});
test('unavailable delivery is explicit, brief downloads locally and personal data never enters URL', async ({
  page,
}) => {
  await page.goto('/contact/?systems=solar');
  await expect(page.locator('#delivery-notice')).toContainText(
    'Trimiterea online nu este disponibilă',
  );
  await expect(page.locator('#send-inquiry')).toBeDisabled();
  await page.locator('#name').fill('Test Person');
  await page.locator('#email').fill('test@example.test');
  await page.locator('#locality').fill('Brașov');
  await page.locator('#description').fill('Test brief');
  expect(page.url()).not.toContain('Test');
  expect(page.url()).not.toContain('example');
  const download = page.waitForEvent('download');
  await page.locator('#download-brief').click();
  const file = await download;
  const content = readFileSync((await file.path())!, 'utf8');
  expect(content).toContain('NETRIMIS');
  expect(content).toContain('Panouri fotovoltaice');
  expect(content).toContain('Test Person');
  await expect(page.locator('#form-feedback')).toContainText('Nu a fost trimis');
  expect(
    await page.evaluate(() => ({
      local: localStorage.length,
      session: sessionStorage.length,
      cookie: document.cookie,
    })),
  ).toEqual({ local: 0, session: 0, cookie: '' });
});
for (const lang of ['ro', 'en'])
  test(`${lang} validation, pending, error recovery and acknowledged success`, async ({ page }) => {
    let result = 'error';
    let posts = 0;
    await page.route('**/api/inquiries', async (intercepted) => {
      if (intercepted.request().method() === 'GET')
        return intercepted.fulfill({ json: { available: true } });
      posts++;
      await new Promise((resolve) => setTimeout(resolve, 200));
      return intercepted.fulfill({
        status: result === 'success' ? 200 : 502,
        json: result === 'success' ? { accepted: true, id: 'TEST-ACK' } : { accepted: false },
      });
    });
    await page.goto(lang === 'ro' ? '/contact/' : '/en/contact/');
    await expect(page.locator('#send-inquiry')).toBeEnabled();
    await page.locator('#send-inquiry').click();
    await expect(page.locator('#name')).toBeFocused();
    expect(posts).toBe(0);
    await page.locator('#name').fill('Test Person');
    await page.locator('#email').fill('bad-email');
    await page.locator('#locality').fill('Brașov');
    await page.locator('#send-inquiry').click();
    await expect(page.locator('#email')).toBeFocused();
    expect(posts).toBe(0);
    await page.locator('#email').fill('test@example.test');
    await page.locator('#send-inquiry').click();
    await expect(page.locator('#send-inquiry')).toBeDisabled();
    await expect(page.locator('#name')).toBeDisabled();
    await expect(page.locator('#download-brief')).toBeDisabled();
    await expect(page.locator('#form-feedback')).toContainText(
      lang === 'ro' ? 'Nu am primit confirmarea' : 'We did not receive',
    );
    await expect(page.locator('#name')).toHaveValue('Test Person');
    await expect(page.locator('#name')).toBeEnabled();
    result = 'success';
    await page.locator('#send-inquiry').click();
    await expect(page.locator('#form-feedback')).toContainText('TEST-ACK');
    expect(posts).toBe(2);
    await page.locator('#name').fill('Updated Person');
    await expect(page.locator('#form-feedback')).toBeEmpty();
  });
test('network failure is recoverable; HTTP 200 without acceptance is not success', async ({
  page,
}) => {
  let network = true;
  await page.route('**/api/inquiries', (r) =>
    r.request().method() === 'GET'
      ? r.fulfill({ json: { available: true } })
      : network
        ? r.abort()
        : r.fulfill({ json: { accepted: false } }),
  );
  await page.goto('/en/contact/');
  await page.locator('#name').fill('Test Person');
  await page.locator('#email').fill('test@example.test');
  await page.locator('#locality').fill('Test');
  await expect(page.locator('#send-inquiry')).toBeEnabled();
  await page.locator('#send-inquiry').click();
  await expect(page.locator('#form-feedback')).toContainText('We did not receive');
  network = false;
  await page.locator('#send-inquiry').click();
  await expect(page.locator('#form-feedback')).toContainText('We did not receive');
  await expect(page.locator('#email')).toHaveValue('test@example.test');
});
test('mobile native menu is keyboard operable and Escape returns focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.locator('.mobile-menu summary').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.mobile-menu nav')).toBeVisible();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Escape');
  await expect(page.locator('.mobile-menu nav')).toBeHidden();
  await expect(page.locator('.mobile-menu summary')).toBeFocused();
});
test('without JavaScript, marketing content, category links and native configurator remain usable', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://localhost:4321/');
  await page.locator('[data-system="heat"] summary').click();
  await expect(page.locator('[data-system="heat"] .system-copy')).toBeVisible();
  await page.goto('http://localhost:4321/configureaza/');
  await page.locator('input[value="roof"]').check();
  await page.getByRole('button', { name: 'Continuă spre cererea de ofertă' }).click();
  expect(page.url()).toContain('systems=roof');
  await expect(page.locator('.no-js-info')).toContainText('JavaScript');
  await context.close();
});

test('live unconfigured API returns unavailable without accepting an inquiry', async ({
  request,
}) => {
  const status = await request.get('/api/inquiries');
  expect(await status.json()).toEqual({ available: false });
  expect(status.headers()['cache-control']).toBe('no-store');
  for (const path of ['/api/inquiries', '/api/inquiries/']) {
    const response = await request.post(path, { data: {}, maxRedirects: 0 });
    expect(response.status()).toBe(503);
    expect((await response.json()).accepted).toBe(false);
  }
});

test('clipboard export and denied clipboard recovery are explicit', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/en/contact/?systems=smart');
  await expect(page.locator('#copy-brief')).toBeEnabled();
  await page.locator('#copy-brief').click();
  await expect(page.locator('#form-feedback')).toContainText('Brief copied. It has not been sent.');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    'Smart home automation',
  );
  await page.evaluate(() =>
    Object.defineProperty(navigator.clipboard, 'writeText', {
      value: async () => {
        throw new Error('denied');
      },
    }),
  );
  await page.locator('#copy-brief').click();
  await expect(page.locator('#form-feedback')).toContainText('Download your brief instead.');
  await expect(page.locator('#download-brief')).toBeEnabled();
});

test('contact export works without secure-context randomUUID', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(crypto, 'randomUUID', { value: undefined }));
  await page.goto('/en/contact/');
  await expect(page.locator('#download-brief')).toBeEnabled();
  await expect(page.locator('#delivery-notice')).toContainText('Online delivery is not available');
});

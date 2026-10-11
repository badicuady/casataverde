import { test, expect } from '@playwright/test';

test('service enquiry validates details and prepares both contact channels without claiming delivery', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.locator('#story-roof .story-cta').click();
  await expect(page).toHaveURL(/#enquiry$/);
  await expect(page.getByLabel('Cu ce te putem ajuta?')).toHaveValue('roof');
  await page.getByRole('button', { name: 'Pregătește solicitarea' }).click();
  await expect(page.locator('.prepared-request')).toHaveCount(0);
  await page.getByLabel('Nume', { exact: true }).fill('Test solicitare');
  await page.getByLabel('Telefon', { exact: true }).fill('invalid');
  await page.getByLabel('Localitate', { exact: true }).fill('Brașov');
  await page.getByRole('button', { name: 'Pregătește solicitarea' }).click();
  await expect(page.locator('.prepared-request')).toHaveCount(0);
  await page.getByLabel('Telefon', { exact: true }).fill('+40 700 000 000');
  await page.getByLabel('Despre proiect (opțional)').fill('Renovare acoperiș & izolație.');
  await page.getByRole('button', { name: 'Pregătește solicitarea' }).click();
  await expect(page.locator('.prepared-request [role="status"]')).toContainText(
    'Alege cum o trimiți',
  );
  const whatsapp = new URL(
    (await page.getByRole('link', { name: 'Continuă pe WhatsApp' }).getAttribute('href'))!,
  );
  expect(whatsapp.hostname).toBe('wa.me');
  expect(whatsapp.pathname).toBe('/40723200709');
  const message = whatsapp.searchParams.get('text')!;
  for (const detail of [
    'Test solicitare',
    '+40 700 000 000',
    'Acoperișuri',
    'Brașov',
    'Renovare acoperiș & izolație.',
  ])
    expect(message).toContain(detail);
  const email = new URL(
    (await page.getByRole('link', { name: 'Continuă prin e-mail' }).getAttribute('href'))!,
  );
  expect(email.protocol).toBe('mailto:');
  expect(email.pathname).toBe('casataverde.ro@gmail.com');
  expect(email.searchParams.get('body')).toBe(message);
  await page.getByLabel('Localitate', { exact: true }).fill('Tărlungeni');
  await expect(page.locator('.prepared-request')).toHaveCount(0);
  await page.getByLabel('Cu ce te putem ajuta?').selectOption('climate');
  await page.locator('#story-roof .story-cta').click();
  await expect(page.getByLabel('Cu ce te putem ajuta?')).toHaveValue('roof');
});

test('services, project attribution and working contact links remain available without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://localhost:4200');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Consultanță');
  await expect(page.locator('main')).toContainText('peste 200 de case');
  await expect(page.locator('main')).toContainText('colaborator activ și exclusiv');
  await expect(page.getByRole('link', { name: /WhatsApp/ })).toHaveAttribute(
    'href',
    'https://wa.me/40723200709',
  );
  await expect(page.getByRole('link', { name: /e-mail/ })).toHaveAttribute(
    'href',
    'mailto:casataverde.ro@gmail.com',
  );
  await context.close();
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { handleInquiry, deliveryAvailable, validateInquiry } from '../src/lib/inquiries.ts';
import { readSelection, selectionParams } from '../src/lib/selections.ts';
const config = {
  url: 'https://delivery.example.test/inquiries',
  token: 'test-token',
  origin: 'https://site.example.test',
  privacyReady: true,
};
const good = {
  name: 'Test Person',
  email: 'test@example.test',
  locality: 'Brașov',
  phone: '',
  company: '',
  role: '',
  description: 'Test only',
  audience: 'residential',
  project: 'new',
  stage: 'planning',
  systems: ['solar', 'heat'],
  lang: 'ro',
};
const request = (body = good, overrides = {}) =>
  new Request('https://site.example.test/api/inquiries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: config.origin,
      'Idempotency-Key': 'test-request-12345678',
      ...overrides,
    },
    body: JSON.stringify(body),
  });
test('configuration stays unavailable until complete, HTTPS and privacy ready', () => {
  assert.equal(deliveryAvailable(config), true);
  for (const change of [
    { url: '' },
    { url: 'http://delivery.example.test' },
    { token: '' },
    { origin: 'invalid' },
    { privacyReady: false },
  ])
    assert.equal(deliveryAvailable({ ...config, ...change }), false);
});
test('nonpersonal selection allowlist strips unknown and personal parameters', () => {
  const s = readSelection(
    new URLSearchParams(
      'audience=professional&project=renovation&stage=design&systems=solar,heat,bad&systems=solar&email=private@example.test',
    ),
  );
  assert.deepEqual(s.systems, ['solar', 'heat']);
  const params = selectionParams(s);
  assert.equal(params.has('email'), false);
  assert.deepEqual(readSelection(params), s);
});
test('allows uncertainty and a single category; strips hidden professional values', () => {
  assert.equal(
    validateInquiry({ ...good, systems: [], audience: 'unsure', project: 'exploring', stage: '' })
      .valid,
    true,
  );
  assert.equal(validateInquiry({ ...good, systems: ['rain'] }).valid, true);
  assert.equal(validateInquiry({ ...good, company: 'hidden' }).data.company, '');
});
test('rejects malformed and oversized fields, bad selections and honeypot', () => {
  for (const change of [
    { name: ' ' },
    { email: 'invalid' },
    { locality: '' },
    { phone: 'letters' },
    { phone: '() .--' },
    { systems: ['injected'] },
    { description: 'x'.repeat(3001) },
    { lang: 'fr' },
    { website: 'spam' },
    { name: 42 },
    { stage: 'tomorrow' },
  ])
    assert.equal(validateInquiry({ ...good, ...change }).valid, false);
});
test('unavailable never invokes delivery', async () => {
  let called = false;
  const res = await handleInquiry(request(), { ...config, token: '' }, async () => {
    called = true;
  });
  assert.equal(res.status, 503);
  assert.equal(called, false);
  assert.equal((await res.json()).accepted, false);
});
test('requires same origin and JSON before delivery', async () => {
  assert.equal(
    (await handleInquiry(request(good, { Origin: 'https://evil.example' }), config)).status,
    403,
  );
  assert.equal(
    (await handleInquiry(request(good, { 'Content-Type': 'text/plain' }), config)).status,
    415,
  );
});
test('server rejects invalid inputs and bounded request bodies', async () => {
  assert.equal((await handleInquiry(request({ ...good, email: 'bad' }), config)).status, 422);
  assert.equal(
    (await handleInquiry(request({ ...good, description: 'a'.repeat(17000) }), config)).status,
    400,
  );
});
test('delivery must explicitly acknowledge durable acceptance', async () => {
  for (const ack of [
    {},
    { accepted: false },
    { accepted: true },
    { accepted: true, id: '<bad>' },
  ]) {
    const res = await handleInquiry(request(), config, async () => Response.json(ack));
    assert.equal(res.status, 502);
    assert.equal((await res.json()).accepted, false);
  }
});
test('passes only validated data and preserves idempotency key', async () => {
  let sent;
  const res = await handleInquiry(
    request({ ...good, rogue: 'omit-me' }),
    config,
    async (url, init) => {
      assert.equal(url, config.url);
      assert.equal(init.redirect, 'error');
      assert.equal(init.headers['Idempotency-Key'], 'test-request-12345678');
      sent = JSON.parse(init.body);
      return Response.json({ accepted: true, id: 'INQ-test-1' });
    },
  );
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { accepted: true, id: 'INQ-test-1' });
  assert.equal(sent.rogue, undefined);
  assert.equal(sent.email, good.email);
  assert.equal(res.headers.get('cache-control'), 'no-store');
});
test('network and receiver failure never return success', async () => {
  for (const receiver of [
    async () => {
      throw Error('network');
    },
    async () => new Response('', { status: 500 }),
  ]) {
    const res = await handleInquiry(request(), config, receiver);
    assert.equal(res.status, 502);
    assert.equal((await res.json()).accepted, false);
  }
});

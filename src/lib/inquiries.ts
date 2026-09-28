import { audiences, projectTypes, stages, systemIds } from './selections.ts';
export interface DeliveryConfig {
  url: string;
  token: string;
  origin: string;
  privacyReady: boolean;
}
export function deliveryAvailable(config: DeliveryConfig): boolean {
  try {
    return (
      new URL(config.url).protocol === 'https:' &&
      !!config.token &&
      /^https?:\/\//.test(config.origin) &&
      new URL(config.origin).origin === config.origin &&
      config.privacyReady
    );
  } catch {
    return false;
  }
}
export function validateInquiry(body: unknown) {
  if (!body || typeof body !== 'object' || Array.isArray(body))
    return { valid: false as const, fields: ['name', 'email', 'locality'] };
  const input = body as Record<string, unknown>;
  const fields: string[] = [];
  const string = (key: string, max: number, required = false) => {
    if (
      (input[key] !== undefined && typeof input[key] !== 'string') ||
      (required && !(typeof input[key] === 'string' && input[key].trim()))
    )
      fields.push(key);
    const value = typeof input[key] === 'string' ? input[key].trim() : '';
    if (value.length > max || /[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(value)) fields.push(key);
    return value;
  };
  const name = string('name', 100, true),
    email = string('email', 254, true),
    locality = string('locality', 120, true);
  const phone = string('phone', 32),
    company = string('company', 160),
    role = string('role', 120),
    description = string('description', 3000);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fields.push('email');
  if (
    phone &&
    (!/^[+\d() .-]{6,32}$/.test(phone) ||
      phone.replace(/\D/g, '').length < 6 ||
      phone.replace(/\D/g, '').length > 15)
  )
    fields.push('phone');
  if (input.website) fields.push('website');
  for (const [key, allowed] of [
    ['audience', audiences],
    ['project', projectTypes],
    ['stage', stages],
    ['lang', ['ro', 'en']],
  ] as const)
    if (!allowed.includes(input[key] as never)) fields.push(key);
  if (
    !Array.isArray(input.systems) ||
    input.systems.length > 6 ||
    input.systems.some((x) => !systemIds.includes(x))
  )
    fields.push('systems');
  if (fields.length) return { valid: false as const, fields: [...new Set(fields)] };
  return {
    valid: true as const,
    data: {
      name,
      email,
      locality,
      phone,
      company: input.audience === 'professional' ? company : '',
      role: input.audience === 'professional' ? role : '',
      description,
      audience: input.audience as string,
      project: input.project as string,
      stage: input.stage as string,
      systems: [...new Set(input.systems as string[])],
      lang: input.lang as string,
    },
  };
}
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
// Limited before parsing, including chunked bodies with no Content-Length.
async function boundedBody(request: Request) {
  if (Number(request.headers.get('content-length') || 0) > 16384) throw new Error('size');
  const reader = request.body?.getReader();
  if (!reader) throw new Error('body');
  const decoder = new TextDecoder();
  let value = '',
    length = 0;
  try {
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      length += part.value.byteLength;
      if (length > 16384) {
        await reader.cancel();
        throw new Error('size');
      }
      value += decoder.decode(part.value, { stream: true });
    }
    return JSON.parse(value + decoder.decode());
  } finally {
    reader.releaseLock();
  }
}
export async function handleInquiry(
  request: Request,
  config: DeliveryConfig,
  deliver: typeof fetch = fetch,
) {
  if (request.method === 'GET') return json({ available: deliveryAvailable(config) });
  if (request.method !== 'POST') return json({ error: 'method' }, 405);
  if (!deliveryAvailable(config)) return json({ accepted: false, error: 'unavailable' }, 503);
  if (request.headers.get('origin') !== config.origin)
    return json({ accepted: false, error: 'origin' }, 403);
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json'))
    return json({ accepted: false, error: 'content-type' }, 415);
  const id = request.headers.get('idempotency-key') || '';
  if (!/^[a-zA-Z0-9-]{16,80}$/.test(id)) return json({ accepted: false, error: 'request-id' }, 400);
  let input: unknown;
  try {
    input = await boundedBody(request);
  } catch {
    return json({ accepted: false, error: 'invalid-body' }, 400);
  }
  const result = validateInquiry(input);
  if (!result.valid)
    return json({ accepted: false, error: 'validation', fields: result.fields }, 422);
  try {
    const response = await deliver(config.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.token}`,
        'Idempotency-Key': id,
      },
      body: JSON.stringify({ requestId: id, ...result.data }),
      signal: AbortSignal.timeout(8000),
      redirect: 'error',
    });
    if (!response.ok) return json({ accepted: false, error: 'delivery' }, 502);
    const ack = await response.json();
    if (ack.accepted !== true || typeof ack.id !== 'string' || !/^[\w.-]{1,100}$/.test(ack.id))
      return json({ accepted: false, error: 'unacknowledged' }, 502);
    return json({ accepted: true, id: ack.id }, 200);
  } catch {
    return json({ accepted: false, error: 'delivery' }, 502);
  }
}

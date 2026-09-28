import type { APIRoute } from 'astro';
import { handleInquiry } from '../../lib/inquiries';
export const prerender = false;
const handler: APIRoute = ({ request }) =>
  handleInquiry(request, {
    url: process.env.INQUIRY_WEBHOOK_URL || '',
    token: process.env.INQUIRY_WEBHOOK_TOKEN || '',
    origin: process.env.INQUIRY_ALLOWED_ORIGIN || '',
    privacyReady: process.env.INQUIRY_PRIVACY_READY === 'true',
  });
export const GET = handler;
export const POST = handler;

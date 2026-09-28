import { site } from '../data/site';
export function GET() {
  return new Response(
    site.draft
      ? 'User-agent: *\nDisallow: /\n'
      : `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${new URL('/sitemap.xml', site.origin)}\n`,
    { headers: { 'Content-Type': 'text/plain' } },
  );
}

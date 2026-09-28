import { site, routes, locales } from '../data/site';
import { categories, categoryPath } from '../data/categories';
const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
export function GET() {
  const pairs = [
    ...Object.values(routes),
    ...categories.map((c) => ({ ro: categoryPath(c, 'ro'), en: categoryPath(c, 'en') })),
  ];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${pairs.flatMap((p) => locales.map((lang) => `<url><loc>${escape(new URL(p[lang], site.origin).href)}</loc>${locales.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${escape(new URL(p[l], site.origin).href)}"/>`).join('')}</url>`)).join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
}

import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'http://localhost:4321',
  // Keep local production previews and browser tests on the standalone Node server.
  adapter: process.env.VERCEL === '1' ? vercel() : node({ mode: 'standalone' }),
  // Marketing links/canonicals use trailing slashes; API POSTs must never be redirected.
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
  vite: { server: { allowedHosts: true } },
});

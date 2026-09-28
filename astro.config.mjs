import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'http://localhost:4321',
  adapter: node({ mode: 'standalone' }),
  // Marketing links/canonicals use trailing slashes; API POSTs must never be redirected.
  trailingSlash: 'ignore',
  devToolbar: { enabled: false },
  vite: { server: { allowedHosts: true } },
});

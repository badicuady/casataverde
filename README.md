# Casa Ta Verde

A bilingual architectural showroom for a Romanian sustainable-property reseller. Astro prerenders 26 Romanian/English pages; one Node endpoint handles inquiry delivery. No CMS, admin module, accounts, database, analytics or client UI framework.

## Run locally

Requires Node 24.x (tested on 24.19) and npm >=9. The Node major is pinned in `package.json` for local and Vercel builds.

```sh
npm ci
npm run dev
```

Open http://localhost:4321. Astro 7 runs the development server in the background; use `npm exec -- astro dev status`, `npm exec -- astro dev logs`, or `npm exec -- astro dev stop` to manage it. The default build is a non-indexable local draft. WhatsApp links directly to +40723200709; telephone links remain optional through `PUBLIC_PHONE`. No sales recipient is configured. Visitors can configure, copy and download project briefs; the site explicitly says they have not been sent.

```sh
npm run check          # Astro + TypeScript diagnostics
npm run format:check   # source formatting check
npm run format         # format application, scripts and tests
npm test               # validation, selection and delivery-contract tests
npm run build          # prerender pages and compile the Node endpoint
npm run build:vercel   # create Vercel deployment output locally; does not deploy
HOST=0.0.0.0 PORT=4321 npm start
npm run test:browser   # uses the built production server; build first
npm run images        # regenerate responsive images and copy licensed fonts
```

Browser tests use `/usr/bin/google-chrome`. Set `CHROME_PATH` for another Chrome/Chromium installation. Browser artifacts go into `explore/validation`, `test-results` and `playwright-report`. `npm run preview` is also available for an Astro preview. There is no separate lint command; `check` is the static verification command.

## Edit content

- `src/data/site.ts`: locales, routes, navigation, origin, draft flag, WhatsApp link and optional phone.
- `src/data/categories.ts`: all six bilingual categories, families, benefits, selection questions, related systems and slugs.
- `src/data/forms.ts`: all form labels and feedback in both languages.
- `src/components/Home.astro`, `AudiencePage.astro`, `AboutPage.astro`: editorial narrative.
- `src/components/PrivacyPage.astro`: clearly marked draft, must be replaced with approved business-specific information before inquiry delivery is enabled.
- `src/styles/global.css`: centralized visual tokens, typography and layout.
- `src/styles/motion.css`: parallax distances, responsive travel, hover/focus feedback and reduced-motion overrides.
- `src/scripts/motion.ts`: shared entrances, house assembly and scroll parallax. The selector groups define which editorial sections enter; text stays opaque and form controls remain stationary.
- `src/components/House.astro`: original conceptual house drawing. Native HTML details provide full explanations; no scroll library is required.

Update both languages together. Route mappings handle equivalent-page language switching. Category IDs are stable, nontranslated identifiers used in URLs, form data and related links. Do not turn concept imagery into project evidence or add unverified affiliations/guarantees.

## Images and licenses

Responsive AVIF and WebP assets are in `public/images`; original source PNGs are in `assets/source`. Build output includes only public derivatives. Hero loading is prioritized; lower imagery is lazy. `npm run images` regenerates 640, 960 and 1440 widths through Sharp. Source dimensions prevent layout shifts.

The built-in imagegen tool produced two explicitly labeled architectural concepts. Full prompts, source paths and provenance are in [assets/PROVENANCE.md](assets/PROVENANCE.md). The original SVG illustrations and geometric draft identity are native code. Self-hosted Manrope includes Latin Extended/Romanian glyphs; the SIL Open Font License is in `public/fonts/OFL.txt`.

## Inquiry delivery

Copy `.env.example` to `.env` for local Astro development/build settings. For the production Node process, export runtime variables or use `node --env-file=.env dist/server/entry.mjs`; `npm start` does not itself load `.env`.

Build-time settings:

- `PUBLIC_SITE_URL`: canonical site origin. Default `http://localhost:4321`.
- `PUBLIC_DRAFT`: defaults true; only the exact value `false` allows indexing. Rebuild after changing it.
- `PUBLIC_PHONE`: optional verified E.164 number. Blank or invalid values render no telephone link. Rebuild after changing it.

Runtime settings (never public-prefixed):

- `INQUIRY_WEBHOOK_URL`: trusted HTTPS receiver endpoint.
- `INQUIRY_WEBHOOK_TOKEN`: bearer token sent to that receiver.
- `INQUIRY_ALLOWED_ORIGIN`: exact visitor origin, no trailing slash; enforced on POST.
- `INQUIRY_PRIVACY_READY=true`: set only after publishing approved controller/recipient/retention information. Defaults false.

`GET /api/inquiries` returns `{ "available": false }` unless all four runtime settings are valid. Contact checks this before enabling submission. No integration is simulated in the application.

`POST /api/inquiries` accepts JSON plus an `Idempotency-Key` header. Required fields: `name`, `email`, `locality`, `lang` (`ro`/`en`), `audience` (`residential`/`professional`/`unsure`), `project` (`new`/`renovation`/`exploring`), `stage` (`planning`/`design`/`building`/empty) and `systems` (array of `solar`, `heat`, `roof`, `rain`, `smart`, `ceiling`, possibly empty). Optional: `phone`, `company`, `role`, `description`. Unknown properties are stripped; professional fields are omitted for other audiences. Honeypot must be empty. Maximum request body is 16 KiB, including chunked bodies.

The delivery adapter forwards only validated data with `requestId`, bearer authorization and the same idempotency key. The receiver must durably accept the inquiry, deduplicate this key and return a successful HTTP status with:

```json
{ "accepted": true, "id": "YOUR-REFERENCE" }
```

`id` must contain 1–100 letters, digits, underscores, periods or hyphens. A bare 200, missing acknowledgment, timeout, redirect or receiver error is a failure. UI success means receiver acceptance for delivery, not a sales response or confirmed order. Request IDs stay stable across retries of unchanged content; the receiver must implement deduplication to handle an acknowledgment lost in transit.

Both `/api/inquiries` and `/api/inquiries/` accept POST directly, without a redirect that could change its method. Marketing links and canonical URLs consistently use trailing slashes.

Responses: 200 acknowledged, 400 malformed/oversized request, 403 wrong origin, 415 wrong content type, 422 validation, 503 unavailable, 502 delivery error. Responses are `no-store`; inquiry contents are not logged. Fields and local export actions lock during delivery, then recover their previous state; editing clears any old acknowledgment. Errors preserve form values. The receiver and final hosting platform own retention and operational abuse protection; configure request/rate limits before public launch. There is no production recipient in this repository.

Nonpersonal selection parameters are allowlisted and preserved through configuration, language switching and browser back. Personal data stays in form memory/request bodies, never app-managed browser storage or URL parameters. Copy/download is a deliberate local export. JavaScript is required for automatic selection restoration and contact actions; static marketing pages and native category disclosures remain usable without it.

## Deploy to Vercel

The project includes `@astrojs/vercel` and `vercel.json`. Vercel runs `npm run build:vercel`, which selects the Vercel adapter and writes `.vercel/output`. The 26 marketing pages remain prerendered; `/api/inquiries` runs as a Node.js Vercel Function. Local `npm run build` still uses the standalone Node adapter, so `npm start` and the existing browser tests keep working. No database, session storage or extra image service is required.

`package.json` overrides the adapter's `@vercel/routing-utils` dependency on `path-to-regexp` to patched 6.3.0 for [GHSA-9wv6-86v2-598j](https://github.com/pillarjs/path-to-regexp/security/advisories/GHSA-9wv6-86v2-598j). Recheck this override when updating the adapter; remove it once the upstream dependency uses a patched version.

1. Run `npm ci`, `npm run check`, `npm test`, `npm run build` and `npm run build:vercel` locally. The Vercel build command uses POSIX shell environment syntax, supported by Vercel, Linux, macOS and WSL.
2. Commit the project and lockfile, push to your Git provider, then import the repository into Vercel. Use the repository root and Astro framework preset; keep the output directory at its detected default. `vercel.json` supplies the build command and `package.json` pins Node 24.x.
3. Add the environment variables below before deploying. Use your assigned Vercel project address or your actual custom domain, never localhost, for the hosted `PUBLIC_SITE_URL`.
4. Deploy and verify `/`, `/en/`, both audience paths, contact pages, images and the WhatsApp button. With delivery unconfigured, `GET /api/inquiries` should return `{"available":false}` and the form should explain that online submission is unavailable.
5. Add a custom domain under Settings > Domains and apply the DNS records Vercel provides. Update `PUBLIC_SITE_URL` and, if delivery is enabled, `INQUIRY_ALLOWED_ORIGIN` to the preferred HTTPS origin. Redeploy after changing environment variables.

| Variable | Initial review deployment | Ready for production |
| --- | --- | --- |
| `PUBLIC_SITE_URL` | Actual HTTPS Vercel project origin | Preferred HTTPS custom-domain origin |
| `PUBLIC_DRAFT` | `true` | `false` after launch content is approved; keep Preview `true` |
| `PUBLIC_PHONE` | Optional verified telephone number | Same; WhatsApp already has its own configured link |
| `INQUIRY_WEBHOOK_URL` | Leave unset | Trusted HTTPS receiver endpoint |
| `INQUIRY_WEBHOOK_TOKEN` | Leave unset | Receiver token; mark as sensitive in Vercel |
| `INQUIRY_ALLOWED_ORIGIN` | Leave unset | Exact website origin, without a trailing slash |
| `INQUIRY_PRIVACY_READY` | `false` | `true` only after the approved privacy notice is published |

The inquiry receiver must implement the acknowledgment contract described above; deployment alone does not enable form delivery. Set delivery credentials for Production when that receiver is ready. Leave them unset in Preview unless a separate test receiver and matching origin are deliberately configured. `PUBLIC_DRAFT=true` controls search indexing and draft copy; it does not make a deployment private.

Vercel project linkage and build artifacts under `.vercel/` are ignored by Git. No account, domain or recipient is embedded in the deployment configuration, and no deployment is performed by the build command.

References: [Astro Vercel adapter](https://docs.astro.build/en/guides/integrations-guide/vercel/), [Vercel environment variables](https://vercel.com/docs/environment-variables/managing-environment-variables), [Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions), [custom domains](https://vercel.com/docs/domains/working-with-domains/add-a-domain). Vercel Hobby is limited to personal, noncommercial use; select a commercial plan for the business website ([plan rules](https://vercel.com/docs/plans/hobby)).

## Launch boundary

No public deployment is included. Resolve legal identity, verified contacts, domain, service coverage, supply/installation responsibilities, approved claims, privacy terms, recipient and hosting before publishing. Replace the draft privacy page, configure the receiver and test it with consented test data. Rebuild with the real site origin and approved indexing flag. Canonical URLs, RO/EN hreflang, sitemap and robots are generated from the origin. Structured data is limited to the website name and languages; it invents no local-business identity.

Keep annual editorial review separate from ongoing dependency/security maintenance. The Node app may be deployed behind a TLS reverse proxy or a suitable Node hosting service. Serve hashed assets with long-lived caching, revalidate pages on release, and do not cache API responses. No service worker or opaque cache lifecycle is introduced.

## Design and validation

The supplied plan and questionnaire are preserved. Implementation decisions, researched sources and sequential skill reviews are recorded in [explore/design/website-casa-ta-verde.md](explore/design/website-casa-ta-verde.md). Visual and motion specifications sit alongside it. The validation report is [explore/validation/report.md](explore/validation/report.md).

The subsequent design-only animation enhancement is recorded in [explore/design/motion-enhancement-review.md](explore/design/motion-enhancement-review.md). It adds framed image parallax, staged editorial entrances, one-time house assembly and interaction polish across both languages. Native scrolling is preserved. Mobile uses shorter travel; reduced-motion/save-data/low-core devices receive a static presentation. Content is visible without JavaScript, and keyboard focus settles active entrances immediately.

With the built site running on port 4321, `node scripts/inspect-motion.mjs` captures entering/settled responsive views, and `node scripts/motion-performance.mjs` measures synthetic scrolling under 4× CPU slowdown. Results are in `explore/validation/motion/`. `tests/browser/motion.spec.ts` checks image coverage, scroll movement, interrupted animation, live preference changes and stationary form controls.

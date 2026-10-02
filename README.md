# Casa Ta Verde

A single-page Angular presentation site for a green technology reseller. Romanian is primary, English is available from the header. Dark architectural imagery, scroll-driven stories, a partner directory and an interactive energy field.

## Run

Development uses Node.js 24.19 and Angular 22.2 (standalone components, zoneless default). [Angular version compatibility](https://angular.dev/reference/versions).

```sh
npm ci
npm start
```

Open http://localhost:4200.

```sh
npm run build
npx playwright install chromium
npm test
```

Build output: `dist/casa-ta-verde/browser`. Deploy its contents to a static host. No backend or API keys are needed.

## Experience

- Architectural hero with a 2D canvas energy ribbon and parallax.
- Six galleries with three conceptual views each, thumbnails, previous/next and keyboard navigation.
- Six descriptive category stories: roofing, climate/hot water, stretch ceilings, Huawei storage, smart home/electrical installations, photovoltaics.
- Source images from Ferroli, BILKA, Case Smart, SolarHev and Huawei, plus clearly labeled ceiling/smart-home concepts.
- Seamless six-brand marquee; pause on focus, hover, offscreen and hidden tabs.
- Ecosystem directory with combined category/search signals, diacritic-insensitive search, empty/reset states, external source links and GSAP FLIP layout transitions.
- A lazy-loaded Three.js particle torus with scroll-controlled rotation, a custom point shader and a static fallback if WebGL is unavailable.
- Complete Romanian/English content, persisted language, document metadata and mobile navigation.
- WhatsApp enquiries to **+40 723 200 709**, with a translated prefilled message.
- Persistent pause control, dynamic reduced-motion support, keyboard focus and a skip link.
- Component-scoped vanilla CSS, no Tailwind. Local images and self-hosted fonts; external connections occur only when a visitor opens a source/contact link.

## Animation lifecycle

GSAP setup occurs in `ngAfterViewInit` inside `NgZone.runOutsideAngular()`. Reactive layout work uses `afterRenderEffect`, also outside the zone. `MotionScope` reverts each component's GSAP context and owned ScrollTriggers when disabled or destroyed. Page destruction additionally calls `ScrollTrigger.killAll()`.

`EnergyField` uses signal `viewChild` queries, imports Three.js near the viewport, guards asynchronous initialization after destruction, caps DPR at 1.75, and renders 2,400 mobile / 5,600 desktop particles. RAF stops offscreen, on pause, in a hidden tab and for reduced motion. `ngOnDestroy` cancels RAF, disconnects observers/listeners, disposes geometry/material/renderer, clears the scene and releases the WebGL context. No Angular state is written per frame.

The directory owns its imperative CSS custom-property animation; Angular signals own filter/search state. GSAP controls only presentation, so controls and copy remain usable with animation disabled.

## Content and source files

- `src/app/data/content.ts`: original gallery/hero/contact copy.
- `src/app/data/ecosystem.ts`: typed bilingual story and partner records; edit links/images/filter keywords here.
- `src/app/components/category-stories.*`: category layouts and scroll sequences.
- `src/app/components/partner-marquee.ts`: marquee and pause lifecycle.
- `src/app/components/partner-directory.*`: search/filter matrix and FLIP transitions.
- `src/app/components/energy-field.ts`: WebGL rendering and resource ownership.
- `src/app/components/motion-scope.ts`: shared GSAP context/reduced-motion lifecycle.
- `src/app/app.ts`: page composition, language and WhatsApp destination.
- `docs/image-sources.md`: image provenance and source-page notes.
- `docs/design/v2/`: section concepts, design specification and fidelity review.
- `e2e/`: desktop/mobile interaction, responsive, motion and teardown checks.

The original galleries remain placeholder sheets, each with three horizontal rows. The Huawei gallery is explicitly unbranded concept imagery; the newer Huawei story uses actual manufacturer renders. The supplied Tero domain did not resolve, and the user approved concept imagery. Its directory card links to the local ceiling story.

`logo.jpeg` remains the untouched supplied SMART VERDE logo. The site uses the requested Casa Ta Verde name. The directory does not assert authorized reseller status or guaranteed cross-brand compatibility.

## Verification and documentation

Playwright covers all 18 gallery states, language/WhatsApp, category/search combinations, rapid filtering, empty/reset, source links, image loading, 320–1536px layouts, parallax, pause, reduced motion, marquee focus, WebGL fallback and explicit teardown hooks (geometry/material disposal, cancelled RAF and zero remaining ScrollTriggers). Teardown checks use Angular's development debug API; they do not add production test hooks. Tests do not send messages or verify WhatsApp account registration.

The Browser plugin was unavailable, so browser verification uses regular Playwright. Serena pattern navigation was used; symbolic language-server initialization was unavailable. Context7 resolver calls returned `USER_NOT_LOGGED_IN` / connector not connected; official documentation was used instead:

- [Angular signals](https://angular.dev/guide/signals), [lifecycle](https://angular.dev/guide/components/lifecycle), [view queries](https://angular.dev/guide/components/queries), [NgZone](https://angular.dev/api/core/NgZone), [style bindings](https://angular.dev/guide/templates/binding).
- [GSAP context](https://gsap.com/docs/v3/GSAP/gsap.context()/), [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [FLIP](https://gsap.com/docs/v3/Plugins/Flip/).
- Three.js [renderer](https://threejs.org/docs/pages/WebGLRenderer.html), [geometry](https://threejs.org/docs/pages/BufferGeometry.html), [materials](https://threejs.org/docs/pages/Material.html).

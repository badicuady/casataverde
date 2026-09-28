# Casa Ta Verde — final validation

Validated 2026-09-28 against the production build served at http://localhost:4321.

**Ready for local review, with documented launch dependencies. No public deployment performed.**

## Delivered

26 prerendered Romanian/English pages: home, both audience paths, six categories, about, configurator, contact and draft privacy. Also includes a 404, sitemap, robots and a server-side inquiry endpoint. Original interactive house drawing, labeled AI architectural concepts, responsive AVIF/WebP imagery and licensed local Manrope fonts.

Project selections survive language switching and browser back. Contact offers a truthful unavailable state, local copy/download, validation, pending, retryable errors and acknowledged delivery. No verified phone was supplied, so no fictitious telephone action is shown. No personal inquiry data enters application-managed browser persistence or URL parameters.

## Final checks

| Check | Result |
| --- | --- |
| Production build | Passed |
| Development startup / homepage / shutdown | Passed on temporary port 4322 |
| Astro/TypeScript | 0 errors, 0 warnings, 0 hints |
| Prettier source check | Passed |
| Server/selection contract tests | 10 passed |
| Playwright browser tests | 24 passed |
| Responsive route matrix | 26 pages × 7 widths = 182 passing combinations |
| Axe WCAG-tagged scans | 26 pages × 2 widths = 52 scans, zero violations |
| Internal links, equivalent language routes, images, 404 | Passed |
| Canonical, hreflang and default draft noindex | All 26 pages verified |
| Robots draft behavior | Disallow all |
| Keyboard, visible focus, reduced motion, simulated two-core device | Passed |
| No-JavaScript marketing/disclosures/native configurator | Passed; contact enhancement limitation disclosed |
| Live unconfigured API | GET available=false; POST 503, no redirects, both URL forms |

Viewport widths: 320, 390, 768, 1024, 1440, 1920 and 2560 CSS pixels. Rendered review included 390×844 mobile, 820×1180 tablet, 1440×1000 desktop and 2560×1440 wide screen; narrow English also reviewed at 320×900.

Browser flows include category-prefilled inquiries, conditional professional fields, configuration editing/back, unknown-query filtering, both-language validation/pending/retry/success fixtures, network failure, false-200 rejection, copy/download and denied-clipboard recovery, no browser persistence, and export when randomUUID is unavailable. Fixtures use synthetic test data and do not send messages to a real recipient.

## Final mobile performance measurements

Lighthouse 13.5 / Chrome 154, simulated mobile, 4× CPU slowdown, 150ms RTT, ~1.6 Mbps. Single final run per route against a local server. These are **lab measurements**, not field Core Web Vitals or measured field INP.

| Page | Performance | LCP | CLS | Total blocking time | Transferred |
| --- | ---: | ---: | ---: | ---: | ---: |
| Romanian home | 99 | 2.10s | 0 | 0ms | 179,810 B |
| English home | 99 | 1.95s | 0 | 0ms | 163,615 B |
| Romanian contact | 99 | 1.65s | 0 | 0ms | 101,579 B |

Initial homepage script budget: about 1.3KB external modules plus 590B inline diagram code. Forms add a separate ~21KB module. Images and fonts account for most of the useful payload. No third-party requests, continuous animation, client UI framework, scroll listener or service worker.

Event Timing samples with 4× CPU slowdown: maximum recorded interaction duration 24ms for system selection and configurator controls. Coarse-pointer motion was disabled. This small synthetic sample cannot establish real-user INP or performance on physical Raspberry Pi hardware.

## Issues corrected

- Low contrast in small system/process numbers and summary labels: unified on a darker text token; repeat automated audits clean.
- Uneven long headline wrapping and undersized concept captions: balanced wrapping and larger attribution.
- Long mobile brief: compact two-column summary; static and enhanced summary structure now matches, with contact lab CLS reduced from 0.014 to 0.
- Editing during a pending inquiry could diverge from the submitted payload: fields/export actions lock during delivery and restore correctly; edits clear stale acknowledgment.
- Punctuation-only phone input: client/server now require 6–15 digits.
- Secure-context-only randomUUID could break HTTP LAN exports: use getRandomValues for request identifiers.
- Global trailing-slash normalization changed API POST to GET: allow both request URL forms without redirects, while marketing links and canonicals keep trailing slashes. Direct live-endpoint regression test added.
- Dense source files: consistent Prettier/Astro formatting and repeatable check command.

## Evidence

- `final-checks.log`: final static/unit/browser run.
- `browser-results.json`: all 24 final browser results.
- `accessibility-390.json`, `accessibility-1440.json`: final zero-violation scans.
- `performance-summary.json`, `lighthouse-*.json`: final performance results.
- `interaction-performance.json`: synthetic interaction samples.
- `desktop-home-viewport.png`, `mobile-home-viewport.png`, `tablet-home-viewport.png`: homepage composition.
- `desktop-ecosystem.png`: custom section drawing and controls.
- `refined-category.png`, `refined-contact.png`, `narrow-en.png`, `wide-en.png`: refinement/edge-viewport inspection.

## Remaining scope boundaries

Before launch: verified legal identity and contacts, real domain, service/delivery coverage, supply/installation responsibilities, approved claims, final privacy notice/retention/recipient and an operational delivery destination. The current draft stays noindex and live delivery disabled.

An actual receiver has not been connected or sent an inquiry; its durable acceptance and idempotency contract are tested with isolated fixtures. A configured deployment needs TLS, appropriate request/rate limits, operational retention rules and a real delivery smoke test with authorized test data.

No manual screen-reader audit, physical mobile/TV/Raspberry Pi test, Safari/Firefox run, field INP sample, legal review or public hosting validation was performed. Zero automated accessibility findings are not a WCAG conformance certification. No savings calculations, case studies, warranties or business affiliations were invented.

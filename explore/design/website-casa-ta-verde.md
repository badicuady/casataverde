# Casa Ta Verde — implementation record

## 1. Discovery snapshot
- Slug: `casa-ta-verde`. Greenfield local website; no existing implementation or assets. Node 24.19.0, npm 11.17.0 and Google Chrome available. No Git repository; no existing build/lint/test scripts. Referenced LEAN-CTX.md not found in project or parent locations.
- Authority: original client questionnaire (preserved), AGENTS.md, and supplied `website-casa-ta-verde-plan.md`. The plan's decisions are carried forward; its historical Plan Mode restriction no longer applies.
- Objective: support orders and qualified sales conversations for a Romanian integration reseller. Homeowners and construction professionals have distinct journeys. Main actions: tailored/project inquiry; secondary: explore related systems and configure a brief.
- Content: six categories in four families, bilingual home/audiences/categories/about/configurator/contact/draft privacy. No news, case studies or testimonials without evidence.
- Stack decision already established: Astro + TypeScript + native CSS/JS; prerender pages, Node inquiry endpoint. No admin, accounts, CMS, service worker, checkout or animation framework.
- Constraints: fast mobile and low-powered devices, native scrolling, reduced motion, Romanian diacritics, accessible keyboard/form operation, non-indexable local draft.
- Assets: none provided. Create explicitly labeled architectural concept imagery, original SVG section drawing; self-host licensed Manrope.
- Assumptions: editorial content may be drafted from questionnaire; compatibility requires review. No ROI model or confirmed installation service.
- Open launch inputs: legal identity, contacts, origin, business coverage/responsibilities, approved claims, privacy details and inquiry destination. These do not prevent local draft completion.
- Success: distinct paths and all categories discoverable; brief survives language/back navigation; no false delivery success; responsive rendered pages and measured checks.
- Upstream check: no information architecture, flows or wireframes found. Supplied website plan is the existing design source.
- Escalation trigger: branching configurator/inquiry; no gated content or content collections.

## 3. Information architecture
- Routes: Romanian `/`, `/pentru-casa/`, `/pentru-profesionisti/`, `/solutii/{six-localized-slugs}/`, `/despre/`, `/configureaza/`, `/contact/`, `/confidentialitate/`. English equivalents below `/en/` with English slugs.
- Home order: offering + two audience links; architectural concept panorama; four-family index; interactive property section with six numbered systems; editorial product-family rows; audience split; three-step inquiry process; FAQs; project CTA.
- Category hierarchy: breadcrumb, benefit headline, explanatory visual, selection considerations, useful adjacent categories, FAQ and prefilled inquiry CTA.
- Audience hierarchy: audience-specific problem/benefit, relevant project decisions, inquiry process, category discovery, prefilled CTA. About explains reseller approach without invented credentials.
- Desktop header exposes residential/professional paths, system index, about, language and quote. Mobile retains both audience paths in a short visible second row; remaining navigation uses native disclosure. Footer includes all six categories and draft privacy.
- Trust is provided by clear scope, technical questions and honest process; no synthetic social proof. Concept and compatibility limitations appear where the visual is used.
- Branching task: category/audience/home → configurator (audience, project type, optional stage, zero-to-six categories) → review summary/contact. Uncertainty is valid. Direct category inquiries preselect that category. Nonpersonal selections use a strict allowlist in URLs and survive locale changes/back. Personal values exist only in form memory/request body.
- Inquiry states: upfront unavailable banner when no delivery configuration; client validation; pending; acknowledged acceptance; retryable error preserving values. Copy/download brief remain available; saved brief explicitly has not been sent. No file upload or account promise.
- Mobile: single column, image crop prioritizes building, diagram remains legible with larger external controls, stacked fields and touch targets. No hover-dependent content.
- Removed speculative proof/case-study section: absent source material cannot support it.

## 6. Preimplementation critique — GO for local draft
- Strength: coherent house-section narrative ties all six categories to a useful action. Native controls keep the implementation small and maintainable.
- Weakness: no verified proof or contact identity; aspirational presentation could overstate business readiness. Required: visible concept captions and explicit unavailable delivery, no fabricated proof; remain noindex.
- Product/UX risk: dual audiences plus six systems can overwhelm. Keep one primary quote CTA, two explicit audience links and concise family grouping; no nested mega menu.
- Genericity: architectural panorama alone is common; original annotated section and numbered editorial product rows provide a specific visual grammar.
- Static/mobile: explanatory content survives scripts/motion disabled; external controls avoid tiny diagram hotspots. Single-column flow preserves hierarchy.
- Remove-20%: remove speculative statistics, partner logos, dashboard simulation, entrance effects and decorative flourishes. Retain house diagram because it explains the business.
- Six-month: central content/routes, reusable page templates and ordinary web controls; document endpoint contract and content edits. No CMS or framework hydration.
- Optional future improvement: replace concepts with approved project photography and real proof.
- No-go for public launch until legal/contact/privacy/delivery and domain inputs are resolved; no public deployment requested.

## 7. Implementation
- Astro 7.3.5 + Node adapter 11.1.6; 26 localized marketing pages, a 404 page, sitemap/robots and the inquiry endpoint. Native HTML controls, no client UI framework. Content and route maps centralized; category and audience pages share templates.
- Original interactive SVG section, generated concept imagery, responsive AVIF/WebP, locally hosted Manrope with license. Labels disclose concepts. No business identity, phone number or partner affiliation invented.
- Inquiry receiver requires configured HTTPS destination, bearer token, approved origin and finalized privacy flag. Server validates an allowlisted payload and 16 KiB body cap; redirects rejected. Receiver must return accepted=true and a reference; all failures remain failures. Idempotency key forwarded. No inquiry logging or browser persistence.
- No-JavaScript marketing/navigation and configurator GET flow remain accessible; inquiry export/submission requires JS and states this explicitly.
- Commands established: `npm run dev`, `npm run check`, `npm run build`, `npm start`, `npm test`, `npm run test:browser`, `npm run images`. No separate lint command; Astro/TypeScript diagnostics provide the current static check.

## Research ledger
Reviewed 2026-09-28. Original copy; no competitor text or assets reused and no brand affiliation implied.
- https://docs.astro.build/en/guides/on-demand-rendering/ — static pages with one on-demand endpoint.
- https://docs.astro.build/en/guides/integrations-guide/node/ — standalone runtime and static asset serving.
- https://www.bilka.ro/ and https://www.bilka.ro/sistem-pluvial/ — roofing and rainwater category vocabulary; drainage as a coordinated roof component.
- https://www.bilka.ro/accesorii-tigla-metalica/ — roofing accessories are part of the complete assembly.
- https://www.ferroli.com/it — current heating/cooling product context; no performance figures reused.
- https://www.energy.gov/energysaver/heat-pump-systems and https://bsesc.energy.gov/training-modules/hvac-cold-climate-heat-pump-sizing — heat demand and appropriate sizing, no US savings or rebate claims applied to Romania.
- Requested case-smart.ro, tavanetero.ro and solarhev.ro did not return usable pages through research tool; no claims/assets taken from them.
- Smart controls/ceilings copy frames project questions and verification requirements, not unverified equipment capabilities.

## 8. Render and inspect
Inspected actual Chrome screenshots at 1440×1000, 820×1180 and 390×844: RO/EN homes, heat-pump category, professional audience, configurator and contact. Screenshots retained in `explore/validation/`.
- Main headline and architectural panorama lead the viewport; audience paths remain visible on mobile. No overflow or browser exceptions in these renders.
- Scrolled every screenshot page to load deferred imagery; all images decoded successfully. Initial full-page capture omitted offscreen lazy assets, corrected capture process rather than making them eager.
- House drawing and numbered controls align; selected system shows both marker state and explanatory text. Typography/diacritics render from local font.
- Three weakest areas: long category headlines wrap unevenly (apply balanced wrapping during refinement); small concept captions need a modest readability increase; mobile contact summary takes substantial vertical space (compact its layout).
- No structural defects blocking responsive review. The restrained control illustration is intentional; it does not imply a working integration.

## 9. Responsive and journey review
- All 26 localized pages checked at widths 320, 390, 768, 1024, 1440, 1920 and 2560 (182 viewport/page combinations). No horizontal overflow, missing h1, locale mismatch or browser exceptions. Primary buttons and mobile audience links meet 44px height.
- Tested localized equivalent-page navigation, internal destinations, deferred image loading, 404, category preselection, professional conditional fields, configuration edits/back, language preservation and unknown-query filtering.
- Unavailable delivery, local download, client validation, pending, failed requests, retry and acknowledged success exercised. Success/error fixtures intercept only test requests; no real message sent.
- Both initial failing assertions were test assumptions: changing anchor.search yields an absolute href; Playwright's text engine skips the noscript parent. Normalize URLs and inspect the visible noscript child. No product navigation defect found.
- Mobile native menu works with keyboard and Escape. No-JS details and native GET configuration work; no-JS contact limitation is explicit.
- Cosmetic findings retained for refinement: small captions and compact mobile summary. No reading/navigation/action blocker at 320px.

## 10. Performance review
Production build, Chrome 154, Lighthouse 13.5 simulated mobile, 4× CPU slowdown, ~1.6 Mbps/150ms RTT; local server, not field data.
- Romanian home: score 99, LCP 2.10s, CLS 0, TBT 0ms, transferred 179,628 bytes.
- English home: score 99, LCP 1.95s, CLS 0, TBT 0ms, transferred 163,433 bytes.
- Romanian contact: score 99, LCP 1.65s, CLS 0.014, TBT 0ms, transferred 100,948 bytes.
- Event Timing under 4× CPU slowdown: sampled home system selections and configurator controls max 24ms; this is a synthetic interaction sample, not field INP.
- Homepage external JS 1.3KB plus a small inline diagram module. Forms load a separate ~20.6KB module; no client hydration or animation library. No third-party requests. CSS ~24KB uncompressed. Hero 640px AVIF ~40KB on DPR1 mobile; 1440px AVIF ~152KB.
- Images/fonts dominate useful payload; no expensive decorative feature to remove. Native scrolling, no rAF loop, scroll listener, canvas, WebGL, filters or automatic animation. Coarse-pointer/constrained mode removes layer movement.
- Deferred: real host/CDN and field monitoring after launch; no Raspberry Pi hardware or field INP available. Raw reports retained under `explore/validation/`.

## 11. Accessibility review
- Axe WCAG 2 A/AA, 2.1 AA and 2.2 AA scans covered every localized page at mobile and desktop sizes. Initial findings were insufficient contrast in small numbering and summary labels; replaced five light colors with the shared darker muted text token.
- Keyboard checks pass: skip navigation, visible focus, native details, configuration selection/submission and mobile menu Escape. Main content is explicitly focusable as a skip target.
- Reduced-motion and simulated two-core-device checks preserve selected marker/text and remove layer transforms. Reflow at 640 CSS pixels (1280px viewport at 200% equivalent) and form label associations pass.
- Both post-fix automated scans report zero violations across 52 page/viewport combinations. No color-only state or animation-gated content.
- Limits: automated checks and keyboard inspection are not a full WCAG audit. No manual NVDA/VoiceOver or physical assistive-device testing performed.

## 12. Adversarial review
- Critical launch dependency: actual business/legal/contact/delivery inputs remain unknown. Local noindex draft is complete enough to review; it is not a published sales service.
- High-impact engineering finding: while a request is pending, editable form values could diverge from the payload receiving acknowledgment. Freeze inputs and local exports during pending; restore previous disabled states afterward. Clear stale acknowledgment on subsequent edits.
- Medium UX finding: mobile summary repeats long question labels and can delay reaching the fields. Convert its four entries into a compact two-column summary; keep chosen systems full width and preserve edit access.
- Medium maintainability finding: source templates and CSS are overly dense. Apply consistent repository formatting and provide a check command, preserving component boundaries rather than adding abstractions.
- Cosmetic: balance category headlines, enlarge concept captions, and modestly improve the roof label readability.
- Product/design: the weakest part is the lack of real proof, which cannot be solved with invented testimonials. Concept captions and scope language remain. A generic feature-card layout was avoided, but the simple smart-control illustration is less distinctive than the section drawing; retain its modest scale rather than adding an expensive dashboard.
- Motion: repeated layer movement has no additional meaning; selection only, no loops/scroll reveal. Disabling it preserves the whole story.
- Performance: full-resolution imagery is the largest useful cost; responsive assets keep it controlled. No background video or image sequence to optimize away.
- Skeptical-user lens: unavailable submission can frustrate a ready buyer. Display it before entry, provide local export and never invent contact details. This is a concrete launch dependency, not a reason to fabricate functionality.
- Remove-20% test: decorative statistics, brand logos, testimonial carousel, independent dashboard, scrolling effects and duplicate CTA bands already removed; keep FAQ/process because they resolve uncertainty. No additional decorative layer is justified.
- Six-month test: all category/form copy and routes centralized; ordinary Astro templates and a documented receiver contract. Formatter and verified README address the remaining source readability weakness.
- Weakest initial lens was motion (it found no new issue). Re-run: moving roof can visually suggest disconnection, so movement stays only 7px, no scale/rotation, and static explanatory caption remains. No cinematic animation warranted.
- Recommended change order: pending-state correctness → source clarity → readable captions/headlines → compact mobile summary; then affected checks and final validation.

## 13. Refinement log
- Pending payload could diverge from visible form: freeze fields/export buttons during request, restore their prior disabled states afterward, and clear stale feedback when data changes. RO/EN error/retry/acknowledgment tests now assert the lock and restoration.
- Phone validation admitted punctuation-only strings: require 6–15 digits in addition to permitted formatting, on both client and server. Added regression input.
- HTTP LAN previews may lack randomUUID: generate idempotency identifiers with secure getRandomValues, which also works in that preview context. Export initialization tested without randomUUID.
- Dense source: added Prettier + Astro formatting, formatted application/scripts/tests and added `format` / `format:check`. Questionnaire, plan and AGENTS sources untouched.
- Uneven category heading wraps: balanced text wrapping. Re-rendered desktop category; the two lines now have comparable lengths.
- Small concept attribution: raised mobile and image-overlay captions to 10px. Checked narrow 320px English crop/caption and desktop screenshot.
- Repeated mobile summary labels: compact two-column grid, with selected systems full width. Rendered 390px contact. Static summary now has the same four fields as the enhanced version, reducing layout shift.
- No added libraries in the browser, scrolling effects, content claims or new conversion requirements. No further material design defects remain in the local scope.

## 14. Final validation
**READY WITH KNOWN TRADE-OFFS for the requested local preview. Not approved for public launch.**

- Product/design: all six categories, four families, distinct audience paths, relevant actions, conceptual imagery and original section drawing present. Static composition reviewed at mobile/tablet/desktop/wide sizes.
- Motion: short user-driven selection response; constrained/reduced-motion modes tested. Scroll parallax intentionally omitted because selection communicates the relationship at lower cost. Native scrolling preserved.
- Responsive: all 26 localized pages pass at 320/390/768/1024/1440/1920/2560px. 182 page/viewport checks, no overflow. Both languages, category preselection, back navigation and equivalent-page switching pass.
- Performance: responsive AVIF/WebP, deferred offscreen imagery, prioritized hero, self-hosted fonts, tiny homepage JS and separate form module. Final lab results are in `explore/validation/report.md`; no field INP/real-host claims.
- Accessibility: keyboard journey, focus, skip link, semantic labels/headings, image alternatives, contrast, reduced motion and reflow checked. Axe reports zero WCAG-tagged violations on 52 page/viewport scans. Screen-reader/physical-device/full conformance audits remain unperformed.
- Engineering: build and Astro/TypeScript checks pass without diagnostics; formatting passes; 10 unit/contract tests and 24 browser tests pass. Original brief and supplied plan preserved. README includes real commands, edits, delivery contract and launch inputs.
- Final integration test found that global trailing-slash enforcement redirected API POST into GET. Changed normalization to `ignore`; generated marketing links/canonicals still use slashes. Regression test verifies 503 unavailable responses directly, with redirects disabled, for both API URL forms. Client never treats availability JSON as success.
- SEO: all 26 canonicals and locale alternatives verified, default noindex verified, robots disallows draft crawling, sitemap valid for configured origin. Website-only structured data uses no invented business identity.
- Adversarial tests: remove-20%, six-month readability, without-animation and genericity reviews completed. Source formatting, pending-state correctness, label contrast and summary/headline refinements address material findings.

Known trade-offs are intentional: no verified business/contact/recipient facts, no real project proof, no live inquiry destination, no savings model, no physical Raspberry Pi/Safari/Firefox or screen-reader audit. Configure these affected launch inputs before publication. They do not prevent local review or saving a project brief.

Strongest aspect: a coherent architectural narrative with six real category paths and an honest conversion boundary.
Weakest aspect: no supplied real-world evidence or verified business contact, so the draft cannot yet serve live sales.
Most questionable decision: reusing the house concept for exterior categories; accepted for this asset-limited first draft and clearly labeled.
Another iteration should prioritize verified project imagery and business details over additional animation.

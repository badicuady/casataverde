# Motion enhancement — September 2026

## 1. Discovery

Design-only enhancement requested after review of the completed bilingual site. The existing implementation has hover and selected-house-layer transitions, but deliberately omitted scroll parallax and section entrances. This made the architectural presentation feel static.

Use the existing questionnaire, plan, design records, Astro stack, responsive concept photography and original SVG. Preserve the 26 localized pages, homeowner/professional paths and inquiry behavior. No new content, integrations or dependencies are needed. Success means visibly intentional motion while scrolling, stable controls, native scrolling and a complete static experience. No separate upstream IA/flow/wireframe artifacts were found. The existing configurator branch model remains unchanged. No missing business input affects this design work. LEAN-CTX.md remains absent from the project and checked parent locations.

## 2. Design thesis

Extend “the inhabited section” into a moving architectural study: photography travels gently behind its frame, editorial sections arrive in a short sequence, and the house's systems settle into place. Motion follows the same calm, precise rhythm as the numbered drawings. Avoid continuous decorative movement or delayed access to content.

The weakest point is making motion so restrained that visitors still perceive the site as static. Give large photographs a clearly visible but bounded travel and section entrances enough displacement to read during ordinary scrolling.

## 3. Information architecture

Reuse the current hierarchy and routes. Home: introduce → photographic depth → assemble the connected house → stagger the four families → two audience paths → process → action. Inner marketing pages use the same image depth and editorial entrances. Contact/configurator/privacy receive heading entrances and shared interaction polish; active forms and legal text stay stationary. Navigation and every CTA remain available throughout motion.

## 4. Visual system

Preserve the warm stone/forest palette, Manrope, open editorial composition and concept labels. Add one shared easing curve, short interaction timings and slower photographic/section timings. Keep captions anchored to the frame. House assembly separates technical layers without inventing performance or compatibility claims. Hover and keyboard-focus responses share the same treatment. No new imagery, layout sections or ornament are required.

## 5. Motion specification

Updated `website-motion-casa-ta-verde.md` with timing, distances, stagger, three parallax zones and device/fallback policies. Shared tokens and one native controller will govern all localized templates.

## 6. Preimplementation critique — go

Strength: the house assembly and framed architecture reinforce the established identity. Weakness: repeating entrances on every paragraph would become monotonous; animate section groups and rows selectively. Risk: a transformed photograph can expose blank frame edges; provide overscan and verify the extremes. Risk: interaction during house assembly can fight the selected layer; cancel assembly on interaction. Preserve an opaque hero and immediate controls. Remove-20%: omit proposed decorative scroll indicators and moving CTA backgrounds. Mobile uses smaller travel; static rendering remains complete. One shared controller and stylesheet keep future maintenance local. No hierarchy or feasibility blocker remains.

## 7. Implementation

Added a shared native motion controller and stylesheet, attached through Layout and the existing Photo component. No dependencies or server/form changes. Entrances are activated by IntersectionObserver without hidden initial HTML. Parallax uses overscanned images, cached measurements and scroll-triggered frames; keyboard focus and house interaction settle active entrances.

## 8. Render and inspect

Inspected actual desktop/mobile homepage screenshots and generated tablet, category, professional and configurator views. Architectural crops and concept labels remain legible; no structural defect found. Weakest areas to validate next: long English headlines during entrance, mobile overscan at the scroll extremes, and interrupted house assembly. Added targeted browser checks for those motion boundaries. A still screenshot alone cannot validate the effect; temporal scroll captures follow.

## 9. Responsive review

All 26 localized pages pass overflow/target-size checks at 320, 390, 768, 1024, 1440, 1920 and 2560px (182 combinations). Inspected temporal captures at 320, 390, 820, 1440 and 2560px. For a 380px scroll, image travel measured 32.34px desktop, 15.74px mobile, 11.40px tablet, 34.25px category, 15.20px narrow and 25px ultrawide. All six views had zero JavaScript errors and no horizontal overflow. Image-edge coverage passes across eight localized marketing routes. Compact layouts use shorter travel; native navigation remains visible. Evidence: `explore/validation/motion/visual-checks.json` and paired screenshots.

## 10. Performance review

4× CPU-throttled full-page scroll checks at 1440×1000 and 390×844: 391 sampled intervals each, p95 16.7ms, maximum 16.8ms, zero intervals above 34ms, zero long tasks during scrolling, zero observed layout-shift sum, and zero running animations at rest. These are synthetic Chrome measurements, not field INP or physical-device claims. Current homepage JavaScript is about 5.7KB external before compression including shared selections (the motion/layout chunk is 4.8KB); no new library or third-party request. Mobile Lighthouse remains 99 on both homepages, LCP 2.10s RO / 1.95s EN, CLS 0 and TBT 0ms. The moving photograph is the largest composited surface; it adds visible architectural depth and its promotion is removed offscreen. Evidence: `explore/validation/motion/scroll-performance.json` and current Lighthouse reports.

## 11. Accessibility review

Keyboard configuration, skip link, focus, reduced-motion changes, low-core selection and reflow passed. Initial motion-enabled Axe scans caught reduced contrast during text fades; fixed by keeping text fully opaque, including disclosures. Reduced-motion/save-data modes cancel active motion, and unsupported animation APIs fall back to static content. Both final scans are clean: 52 page/viewport scans, zero violations. No no-JS hidden-content state exists.

## 12. Adversarial review

The weakest choice was conventional text fading: it softened reading and failed contrast during movement. Removed it rather than delaying the audit. Product/UX: audience paths and actions remain immediate, and forms stay stationary. Motion: retain three main ideas (photo depth, group entrances, house assembly); no continuous flourishes. Engineering: duplicated house device policy could fail to restore after a live preference change; centralized it. Read parallax travel from CSS rather than maintaining a second numeric copy. Performance: no active loop when idle, and constrained devices bypass observers entirely. Skeptical user: concept labels remain anchored and the drawing still explicitly states it is conceptual. The initially weakest lens was maintenance; re-running it found the duplicated device policy and parallax ranges. Remove-20%: removed fading text, retained CSS animation states and duplicate hover underlines. No critical issue remains after these fixes.

## 13. Refinement log

- Mid-animation text contrast fell: removed text opacity animation; movement remains visible and reading stays immediate.
- Finished process-line effects retained animation objects: base style now holds the final line, with no retained animation fill.
- Existing and new text-link rules doubled the hover underline: keep one growing rule.
- House preference logic was duplicated and only initialized once: one shared live policy now controls it.
- Image travel could diverge from overscan after maintenance: controller now reads the CSS distance during layout measurement.
- Missing platform animation APIs could interrupt the shared module: gracefully select static rendering.
- Reduced/save-data/low-core modes now bypass the observers and scroll listeners, avoiding unnecessary work.

These refinements address contrast, interaction reliability and maintainability without changing content or conversion behavior. Repeat affected checks and capture the final moving/settled views.

## 14. Final validation

Ready for local design review. All 29 browser tests and 10 existing contract tests pass; build, typecheck and formatting pass. All 182 route/viewport checks pass, as do both 26-page accessibility scans (52 scans, zero violations). Targeted checks cover moving image coverage, one-time entrances, interrupted house assembly, live motion preference changes, mobile resize, stationary forms, save-data and low-core fallbacks. Both languages, navigation, no-JS content and core inquiry flows remain usable. Final temporal screenshots were regenerated after contrast refinements and visually reviewed.

The strongest aspect is the relationship between framed photographic depth and the assembled architectural section. The weakest aspect is the small set of concept photographs; motion cannot add real project evidence. The most questionable choice is applying a shared entrance cadence across many pages, moderated by static forms/legal copy and one-time entries. Another design iteration should use approved project photography when available rather than add more motion. No unresolved issue blocks this requested design enhancement. Physical-device/Safari/Firefox/full screen-reader audits remain outside this local validation; existing launch dependencies remain unchanged.

Current evidence is in `explore/validation/motion/`, the 29-test browser JSON, accessibility reports and the refreshed performance reports. See README for repeatable capture/performance commands and the shared motion editing points.

Final post-refinement performance run: RO home / EN home / RO contact all score 99; LCP 2.10s / 1.95s / 1.65s, CLS 0 and TBT 0ms. Repeat desktop/mobile throttled scroll samples remained at p95 16.7ms, with no long tasks, layout shifts or running animations at rest.

## Stronger motion — follow-up refinement

User requested more visible paths and longer animations. Increased wide-photo parallax from ±64px to ±160px and detail images from ±36px to ±96px; mobile now uses ±64px/±48px. Desktop section travel increased from 28px to 72px (mobile 16px to 44px), with 1400ms duration and wider stagger. Hero text travels 48px desktop/32px mobile over 1700ms, with a 1.14→1 photograph zoom over 2400ms. House assembly uses longer 45–84px vertical/diagonal paths over 1600ms, and selected layers lift 18px over 520ms. Slower easing makes more of the movement visible instead of settling almost immediately. Process rules, arrows, buttons and disclosures share the stronger cadence.

Existing layouts, content, forms and reduced-motion/device policies are preserved. Updated the motion checks to require at least 45px of desktop image travel over a 300px scroll, and to wait for animation completion rather than assume the old durations. Rebuilt the site and refreshed temporal captures; verification results follow.

The longer motion revealed two concrete edge cases during review: the family-index labels could cross their stationary border, and pointer focus could cancel an unfinished hero entrance between pointerdown and pointerup, losing the click. The index now moves as one unit; headings/footer use travel bounded by their surrounding gaps. Only keyboard-visible focus settles entrances immediately, so pointer clicks retain their target. The category CTA check passed three repeated runs, and a regression check now freezes an entrance midway before clicking its CTA. Final responsive captures and browser checks are refreshed after these fixes.

Stronger-motion validation: production build, typecheck and formatting pass; all 30 browser tests pass, including 182 route/viewport combinations and 52 clean accessibility scans. Final paired screenshots show about 81px of desktop image travel over 380px of scrolling (previously 32px), and 42px mobile (previously 16px). No image-frame gaps, clipping, horizontal overflow or console errors were found in the six final capture views.

Final stronger-motion scroll check at 4× CPU slowdown: desktop and mobile p95 frame interval 16.7ms, maximum 16.8ms, zero long tasks during scrolling, zero observed layout shifts and zero running animations at rest. Ready for review at the existing local preview.

# Fidelity and implementation review

Reviewed the eight v2 generated concepts against rendered Chromium screenshots at 1536px and 390px, plus English at 320px. Browser captures: `/tmp/casa-ta-verde-qa/v2-*.png`. Original hero/gallery/contact references remain in the parent design folder.

| Area | Result and intentional differences |
| --- | --- |
| Roof | Large architectural crop, floating secondary image, outlined chapter number and contrasting headline. Actual BILKA photography replaces the generated autumn house; the inset is another roof view, accurately described. |
| Climate | Alternating copy/photo, angled image crop, cyan heading and product inset. Uses Ferroli's own lifestyle photograph and heat-pump cutouts. Descriptive feature rows replace reference pseudo-controls. |
| Ceiling | Full-bleed sculptural ceiling, dark reading area, large headline and three finish descriptions. Concept explicitly labeled; user approved concept imagery after the supplied domain failed to resolve. |
| Storage | Large manufacturer battery render, inverter inset, purple accent and three energy-system descriptions. Source cutouts replace the fabricated branded installation in the reference. |
| Smart home | Dark touch-control/interior concept with a separate actual Case Smart product inset. The conceptual scene is labeled; source link remains available. This replaced an overly large white product block found in the first visual pass. |
| Solar | Wide sunset panel image, real module inset, split copy layout and capture/convert/connect descriptions. Uses SolarHev imagery; omits invented additional brands. |
| Marquee | Six user-specified brands, fine dividers, monochrome marks and masked edges. Source logo contrast corrected after visual inspection. Plain names used when verified logo assets were unavailable. One marquee in the page, no repeated brand strips. |
| Energy interlude | Large lime headline, real animated particle torus, cyan/purple/lime palette and orbital lines. Uses a restrained procedural scene with no background landscape to keep readability and GPU cost controlled. Brighter particles and a tilted orbit correct the first pass's dim field. |
| Directory | Dark glass cards with photography, subtle neon borders, color-changing filter state, search and result count. Three desktop columns and one mobile column. Original four-column rendering was corrected. Search/filter transitions and an explicit empty/reset state are implemented. |
| Mobile/localization | Stories stack with a preserved image hierarchy. The energy canvas follows text in normal document flow to accommodate English wrapping. Decorative canvas bleed is clipped while all headings fit at 320px. |

## Verification

- Production build passes without bundle/style budget warnings; initial JS/CSS approximately 375 kB raw / 112 kB estimated transfer. Three.js is a separate lazy chunk, approximately 155 kB transferred.
- 18 Playwright checks pass across desktop and mobile projects. Includes galleries, language persistence, WhatsApp, directory search/filter/empty states, rapid filtering, links/assets, responsive layout, scroll transforms, marquee focus, reduced motion, WebGL fallback, offscreen suspension and resource disposal.
- Explicit destruction-hook tests observe geometry/material `dispose` events, one renderer disposal, a cancelled RAF and zero remaining ScrollTriggers.
- No application console errors in the visual pass. Screenshot capture can generate headless GPU ReadPixels diagnostics. Angular's oversized roof-detail image warning was corrected by serving an appropriately sized asset.
- Hover/focus glows stay subtle; motion has a persistent pause button and follows dynamic reduced-motion settings. No scroll hijacking, artificial loading gate or inaccessible content hidden behind interaction.

## Limits and documentation

Context7 was requested and attempted but the connector was not connected. Official Angular/GSAP/Three.js documentation informed the implementation; links and architecture notes are in README.md. Browser plugin was unavailable, so standard Playwright was used. Automated checks use Chromium; physical-device GPU/frame-rate profiling has not been performed.

The references are design guides, not evidence of a formal client approval. No fabricated business metrics, authorized partner credentials, inventory or savings claims were added. Image provenance is in `docs/image-sources.md`.

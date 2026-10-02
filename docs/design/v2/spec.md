# Casa Ta Verde — expanded experience

User request supersedes the v1 no-grid direction: add six rich category stories, scanned source images, marquee, interactive futuristic directory, GSAP scroll motion and Three.js.

## References and extraction

Eight generated section references in this folder: roof, climate, ceiling, storage, smart, solar, directory, energy. They extend the existing hero, gallery and contact. Keep the large Manrope typography, architectural crops, dark-green negative space, alternating compositions and thin dividers. Add cyan #75e7f0 and purple #ac93fa to lime #c6f47a. Desktop story headings 56–72px; mobile 36–44px; body 17–19px. Same 64px/24px gutters. Directory grid uses three 300px+ columns, thin luminous borders, subtle glass fill and photographic details; filters/search above, result count and clear empty state.

## Page inventory

Hero → six-brand marquee → existing six-category gallery → roof/climate/ceiling/storage/smart/solar stories → Three.js energy interlude → ecosystem directory → about → WhatsApp contact. Each story has original bilingual copy, three descriptive feature rows, two/three images where available, source caption/link and enquiry CTA. Ceiling is an immersive full-bleed scene, solar a wide landscape; others alternate image and copy. One fixed, discreet pause control remains reachable through the entire page.

## Motion and interactions

GSAP ScrollTrigger reveals text/feature rows and scrubs image parallax, line progress and image scale. Marquee scrolls seamlessly, speeds gently on scroll and pauses on pointer/focus/visibility/offscreen. Directory uses Angular writable signals for filter/search, computed results, after-render FLIP transitions and item staggers. Clear/reset and diacritic-insensitive search; real external source links. WebGL point-cloud torus rotates and tilts with scroll; lazy import, offscreen suspension and DPR cap. No scroll hijacking or long pinned sequences. All motion honors reduced motion and the global pause toggle; reading never depends on animation.

## Architecture and cleanup

Standalone Angular components, component-scoped vanilla CSS. NgZone.runOutsideAngular at animation setup and reactive updates. Each GSAP context owns/reverts its animations and ScrollTriggers; page teardown also kills remaining ScrollTriggers. Three renderer/material/geometry disposed, RAF cancelled, observers and event listeners removed. Async import guarded against destruction. Signals never updated by per-frame loops.

## Deliberate reference deviations

Generated references invented extra brand rosters and product logos: omit them. Use only the user's six sources, with real downloaded marks or plain typography. Source photography replaces generated brand-specific products. No invented installations, guaranteed savings, authorized-dealer badges or unsupported product specifications. The same marquee appears only once. Reference pseudo-controls become actual links or plain feature descriptions. Ceiling concept is explicitly labeled; the supplied Tero domain did not resolve during research. No faux interactive buttons.

## Documentation lookup

Context7 resolver attempted for Angular, GSAP, Three.js; all returned USER_NOT_LOGGED_IN / connector not connected. Official docs used as fallback: angular.dev/guide/signals, angular.dev/guide/components/lifecycle, angular.dev/guide/components/queries, angular.dev/api/core/NgZone, angular.dev/guide/templates/binding; gsap.com/docs/v3/GSAP/gsap.context()/ and gsap.com/docs/v3/Plugins/ScrollTrigger/; threejs.org/docs/#WebGLRenderer and threejs.org/docs/pages/BufferGeometry.html and threejs.org/docs/pages/Material.html.

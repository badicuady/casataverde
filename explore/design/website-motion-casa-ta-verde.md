# Casa Ta Verde — motion system

Updated for the requested design-only motion enhancement. Supersedes the original selection-only motion decision; the original client brief and supplied implementation plan remain preserved.

## Motion language

Architectural layers settle into place as the visitor moves from a home to its systems. Native scrolling remains in control. No pinned scroll scenes, loading intro, looping animation, pointer tracking or new animation dependency.

- Easing: `cubic-bezier(.16,.65,.24,1)` for entrances; ease-out for direct interactions.
- Micro-interactions: 180–420ms, arrows 8px, button lift 4px, growing link rules. Focus is immediate and uses the same interactive response.
- Hero: text groups settle 48px (32px mobile) over 1700ms; description follows by 160ms. Text is fully opaque throughout to preserve immediate reading and LCP. Photograph settles from scale 1.14 to 1 over 2400ms inside its clipped frame.
- Section entrances: up to 72px (44px mobile) / 1400ms; section-heading travel is 48px/32px and footer travel 32px to fit surrounding gaps with text kept fully opaque; 160ms stagger, capped at 480ms. Single run on entry; all HTML is visible without scripting. Keyboard focus cancels entrance motion immediately.
- House: one-time 1600ms assembly of six system groups, along 45–84px vertical/diagonal paths, at 110ms intervals. Selected-system highlights and 18px/520ms displacement remain independent; interaction cancels any unfinished assembly.
- Form controls and legal body copy do not enter on scroll. Headings settle; active controls never move with scrolling.

## Parallax map

| Source | Moving layer | Purpose | Relationship | Mobile |
| --- | --- | --- | --- | --- |
| Home hero image frame | Oversized photograph | Establish the sense of looking into architecture through a fixed frame | Image travels from −160px to +160px over the frame's viewport passage | ±64px |
| Category/audience/about image frame | Oversized photograph | Carry architectural depth into the product/audience story | Same bounded relationship | ±64px |
| Home family photographs | Oversized photograph | Connect close study of energy/interior to the hero | ±96px across viewport passage | ±48px |

Captions and surrounding text remain anchored. Technical drawings use one-time assembly, not perpetual drift. Only near-visible images receive transform updates. Scroll work is requestAnimationFrame-coalesced; cached geometry is refreshed on layout/viewport resize and native details changes, not read every scroll frame. The loop stops when scrolling stops. Overscan prevents blank edges without changing document layout.

## Accessibility and device policy

- Reduced motion or save-data: static layout, no entrance, parallax or hover displacement; restore immediately if the preference changes.
- Four or fewer hardware threads: static section content; no parallax, scaling or house displacement.
- Mobile/coarse pointer: shorter entry distance and smaller photograph travel. No hover required.
- JavaScript unavailable/fails: content remains fully visible. No global hidden-content class or animation-dependent navigation.
- Back/forward, anchor links and resizing retain native behavior. No smooth-scroll interception.

## Performance constraints

Animate transforms and opacity. Bound promoted surfaces to active imagery. No blur, animated shadows, continuous rAF loop, layout animation or animation library. Measure scrolling under 4× CPU throttling, representative mobile loading and layout stability; do not equate these checks with field performance.

## Stronger motion refinement

User requested more visible movement and longer animations. Photography now travels about 2.5× farther, section travel is about 2.6× longer and primary durations are roughly doubled. A more gradual easing keeps motion perceptible for more of its duration. House diagonal paths stay inside the original SVG bounds. Text remains opaque; focus settles entrances immediately, and reduced-motion/device policies are unchanged.

The four-family index moves as one unit so its labels and dividing rules stay together during the longer entrance.

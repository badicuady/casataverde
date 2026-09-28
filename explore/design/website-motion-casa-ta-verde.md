# Casa Ta Verde — motion system

## 5. Motion decisions
- Purpose: connect a chosen system with its location in the architectural section. Native page navigation and scrolling; no scroll listeners, intro, automatic looping, carousel or hidden entrance content.
- Micro response: button icon translate 3px, 160ms ease-out; focus has immediate outline.
- Component response: selected SVG group separates by at most 8px, 260ms cubic-bezier(.2,.7,.3,1); opacity/transform only. Selected marker and HTML description change immediately.
- No entrance/exit delays or stagger; contents are visible at first paint.
- Parallax map: no scroll parallax in this first implementation. The single section's roof/system layer moves against the fixed house only on user selection, communicating where the system sits. No pointer tracking.
- Mobile/coarse pointer: selection highlights only; no layer displacement. Reduced motion, save-data or <=4 hardware threads similarly remove displacement and transitions.
- Diagram works as static explanatory SVG with all six linked HTML descriptions without JavaScript.
- Performance risk: SVG group compositing; bound drawing size, short transforms, no filters/shadows, inspect with CPU throttling. Never claim compatibility from animation.

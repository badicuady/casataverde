# Step 14 — Final Validation

## Objective

Determine whether the website is genuinely ready to present or ship.

## Inputs

- Final implementation
- All review artifacts

## Validation

### Product

- [ ] Objective is clear
- [ ] Primary action is clear
- [ ] Content hierarchy is appropriate

### Design

- [ ] Design thesis is visible in the final result
- [ ] Visual identity is distinctive
- [ ] Typography is coherent
- [ ] Composition works without animation
- [ ] Generic AI patterns have been challenged

### Motion

- [ ] Motion has purpose
- [ ] Motion language is coherent
- [ ] Parallax is justified
- [ ] Reduced-motion behavior exists
- [ ] Motion does not interfere with reading

### Responsive

- [ ] Mobile works intentionally
- [ ] Tablet works
- [ ] Desktop works
- [ ] Large viewports work
- [ ] No important content depends on one viewport

### Performance

- [ ] Images are optimized appropriately
- [ ] Lazy loading is appropriate
- [ ] Critical content is prioritized
- [ ] JavaScript is justified
- [ ] Animation is performant
- [ ] SSR/SSG strategy is appropriate
- [ ] Core Web Vitals have been considered

### Accessibility

- [ ] Semantic HTML
- [ ] Keyboard navigation
- [ ] Focus states
- [ ] Accessible controls
- [ ] Heading hierarchy
- [ ] Alt text
- [ ] Contrast
- [ ] Reduced motion

### Engineering

- [ ] Components have meaningful responsibilities
- [ ] Abstractions are justified
- [ ] Dependencies are justified
- [ ] Animation code is maintainable
- [ ] Responsive behavior is understandable

### Adversarial

- [ ] Remove-20% test completed
- [ ] Six-month test completed
- [ ] Without-animation test completed
- [ ] Genericity test completed
- [ ] Weakest area identified and addressed

## Stop Conditions

Do not reach a Final Decision while any checklist item above is unchecked without a documented reason. An unchecked item with no reason is an open issue, not an accepted trade-off.

## Final Decision

Choose one:

### READY

No material unresolved issues.

### READY WITH KNOWN TRADE-OFFS

Remaining issues are understood, documented, and consciously accepted.

### NOT READY

Material issues remain.

Do not declare a site ready merely because all technical checks pass.

## Final Self-Critique

Write:

> The strongest aspect is...

> The weakest aspect is...

> The most questionable decision is...

> If I had another iteration, I would change...

If the weakest aspect or questionable decision is material, do not declare READY.

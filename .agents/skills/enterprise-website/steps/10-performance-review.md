# Step 10 — Performance Review

## Objective

Ensure visual ambition does not create unacceptable performance costs.

## Inputs

- Running implementation
- Build configuration
- Media assets
- Motion implementation

## Actions

Review:

- LCP
- CLS
- INP
- image sizes
- image formats
- loading priority
- lazy loading
- font loading
- JavaScript payload
- code splitting
- hydration/client-side rendering
- animation cost
- layout recalculation
- third-party dependencies

## Motion Review

Pay particular attention to:

- scroll listeners
- layout reads/writes
- large animated DOM trees
- expensive filters
- background effects
- canvas/WebGL where applicable
- unnecessary continuous animation

Prefer transforms and opacity when appropriate.

## Critical Questions

- What is the most expensive visual feature?
- Does it provide enough user value?
- What happens on a slower device?
- Is client-side JavaScript actually required?

## Output

A **Performance Review** containing:

- Findings
- Risks
- Measurements when available
- High-impact fixes
- Deferred optimizations

## Stop Conditions

Do not ship known severe performance regressions caused by decorative effects.

## Self-Review

Remove the most expensive visual effect temporarily.

Ask:

> Is the experience materially worse without it?

If not, remove it.

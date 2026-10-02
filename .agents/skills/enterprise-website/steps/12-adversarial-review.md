# Step 12 — Adversarial Review

## Objective

Assume the implementation is flawed and actively try to find why.

## Inputs

All previous review results plus the rendered implementation.

## Review Lenses

### Senior Product Designer

What weakens hierarchy, narrative, or differentiation?

### UX Designer

What creates friction or confusion?

### Motion Designer

What animation feels unnecessary, inconsistent, or excessive?

### Principal Frontend Engineer

What is unnecessarily complex or fragile?

### Performance Engineer

What could become expensive at scale?

### Accessibility Reviewer

What assumptions exclude users?

### Skeptical User

What feels confusing, slow, distracting, or untrustworthy?

## Mandatory Questions

1. What is the weakest part?
2. What decision was made because it was conventional rather than correct?
3. What looks impressive but adds little value?
4. Where is the hierarchy weakest?
5. Where is the UX unnecessarily complicated?
6. What is the biggest performance risk?
7. What happens on mobile?
8. What happens with reduced motion?
9. What would a world-class designer change?
10. What would a principal engineer change?
11. What makes this feel AI-generated?
12. What should be removed?

## Output

An **Adversarial Review** containing:

- Critical defects
- High-impact improvements
- Medium improvements
- Cosmetic issues
- Recommended changes
- Explicit rationale

Do not use numeric scores.

## Stop Conditions

If critical defects exist, proceed to refinement rather than final validation.

## Self-Review

Of the seven lenses, name the one whose criticism was weakest or most generic. Re-run that lens specifically before finalizing the review — a lens that found nothing usually means it wasn't applied hard enough, not that the implementation is flawless there.

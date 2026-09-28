---
name: enterprise-website
description: "Use this skill when you need to design, develop, or significantly improve a beautiful enterprise-grade website, landing page, corporate site, SaaS marketing site, or other polished web experience. Activates when someone asks to build a website, redesign a website, make a website more premium, add sophisticated animation or parallax, or turn a design into production-quality frontend code. Covers product/UX structure, visual direction, responsive composition, motion design, implementation, performance, accessibility fundamentals, and adversarial visual/technical review. Does NOT assume a specific frontend framework. Figma is optional. The skill prioritizes distinctive, intentional design over generic AI-generated website patterns."
---

# Enterprise Website Design & Development

Create beautiful, distinctive, production-quality websites by combining product thinking, visual design, interaction design, motion design, frontend engineering, performance engineering, and adversarial review.

The objective is not merely to produce a website that works. The objective is to produce a website that feels like it was created by an experienced design and engineering team.

## Step Execution Rule

**ONE STEP AT A TIME**: Read step → Execute step → Complete step → Next step

❌ Reading ahead  
❌ Executing multiple steps simultaneously  
❌ Skipping step files  
❌ Implementing before required design decisions are established  
❌ Declaring completion before validation

Each step must produce a concrete artifact or decision that becomes input to the next step.

If a step exposes a critical unresolved issue, stop and resolve it before continuing.

## When to Use

Use this skill when you need to:

- Create a new website
- Redesign an existing website
- Create a premium marketing or corporate website
- Build a landing page
- Build a SaaS/product marketing experience
- Improve an existing website's visual quality
- Introduce sophisticated animation or parallax
- Translate a visual concept into production frontend code
- Improve responsive behavior
- Review the visual quality of an existing implementation
- Refactor a website toward production quality
- Create a distinctive design direction rather than a generic template

## Pre-Check

Determine whether the project is a new website, redesign, existing implementation improvement, Figma/design implementation, specific page/section, or animation enhancement.

If an existing implementation exists, inspect it before proposing replacements. Preserve useful existing decisions and identify technical and visual debt.

If important information is missing, ask only when it materially affects the current decision. Otherwise make a reasonable assumption and record it.

## Upstream Artifact Check

Before Step 1, check whether upstream design artifacts already exist for this project's slug:

- `explore/design/information-architecture-[slug].md`
- `explore/domain/flows-[slug].md`
- `explore/design/wireframes-[slug].md`

If any are found, consume and adapt them instead of re-deriving that work from scratch in Step 3 — treat the corresponding part of Step 3 as pre-satisfied, review it for gaps rather than authoring it new. If none are found, proceed with Steps 1–3 as the lightweight, self-contained default. Do not require these artifacts to exist; only use them when they do, to avoid producing a second, contradicting source of truth.

## Inputs to Request (if missing)

1. Website objective
2. Target audience
3. Primary user action
4. Content or content requirements
5. Technical environment

Useful inputs:

6. Brand guidelines
7. Existing website
8. Figma designs
9. Existing assets
10. Existing component library
11. Analytics/performance data
12. Accessibility requirements
13. SEO requirements
14. Deployment/runtime constraints

Establish a project slug for artifacts.

## Process Steps

| Step | File | Purpose |
|------|------|---------|
| 1 | [01-discovery.md](./steps/01-discovery.md) | Understand objective, audience, content, constraints, and existing environment |
| 2 | [02-design-thesis.md](./steps/02-design-thesis.md) | Establish the visual concept and distinctive design direction |
| 3 | [03-information-architecture.md](./steps/03-information-architecture.md) | Define page structure, hierarchy, content flow, and user journey |
| 4 | [04-visual-system.md](./steps/04-visual-system.md) | Define typography, color, spacing, composition, imagery, and visual language |
| 5 | [05-motion-system.md](./steps/05-motion-system.md) | Define animation, transition, scroll, and parallax strategy |
| 6 | [06-preimplementation-critique.md](./steps/06-preimplementation-critique.md) | Challenge the proposed design before implementation |
| 7 | [07-implementation.md](./steps/07-implementation.md) | Implement the website using maintainable production-quality architecture |
| 8 | [08-render-and-inspect.md](./steps/08-render-and-inspect.md) | Render and visually inspect the actual implementation |
| 9 | [09-responsive-review.md](./steps/09-responsive-review.md) | Validate behavior across viewport sizes and interaction modes |
| 10 | [10-performance-review.md](./steps/10-performance-review.md) | Review loading, Core Web Vitals, images, JavaScript, and animation performance |
| 11 | [11-accessibility-review.md](./steps/11-accessibility-review.md) | Validate accessibility fundamentals and reduced-motion behavior |
| 12 | [12-adversarial-review.md](./steps/12-adversarial-review.md) | Attack the implementation from design, UX, engineering, and user perspectives |
| 13 | [13-refinement.md](./steps/13-refinement.md) | Fix the highest-impact problems discovered during review |
| 14 | [14-final-validation.md](./steps/14-final-validation.md) | Run final acceptance checks and confirm completion |

## Output Format

Use project-appropriate artifacts rather than unnecessary documentation. Typical design documentation:

`explore/design/website-[slug].md`

Design direction:

`explore/design/website-design-[slug].md`

Motion specification:

`explore/design/website-motion-[slug].md`

Implementation lives in the existing project root.

## Integration with Workflows

**Consumes**:
- Product requirements
- Brand guidelines
- Existing websites/code
- Content
- User journeys or user flows, if already defined upstream (see Upstream Artifact Check) — otherwise Step 3 derives a lightweight one itself
- Existing Figma designs
- Existing design systems
- Technical constraints

**Produces**:
- Website design direction
- Information hierarchy
- Visual system
- Motion system
- Responsive behavior
- Component architecture
- Production implementation
- Performance strategy
- Accessibility fundamentals
- Technical SEO
- Validation findings

## Best Practices

**Do**:
- Start with user/business objectives
- Establish a design thesis
- Create hierarchy before decoration
- Design mobile intentionally
- Use animation as communication
- Use parallax purposefully
- Render and inspect actual output
- Challenge generic AI patterns
- Optimize loading and media
- Consider Core Web Vitals
- Respect reduced motion
- Keep component boundaries meaningful
- Record important assumptions
- Review adversarially
- Remove unnecessary complexity

**Don't**:
- ❌ Start coding before understanding the experience
- ❌ Animate because animation is available
- ❌ Add parallax to every section
- ❌ Use glassmorphism by default
- ❌ Use gradients by default
- ❌ Create generic three-card sections everywhere
- ❌ Make every element rounded
- ❌ Hide weak composition behind animation
- ❌ Treat mobile as a smaller desktop
- ❌ Add libraries without justification
- ❌ Over-abstract components
- ❌ Declare success because the page renders
- ❌ Trust the first visual implementation

## Completeness Checklist

- [ ] Objective, audience, and primary action are clear
- [ ] Design thesis exists
- [ ] Information hierarchy is clear
- [ ] Visual identity is distinctive
- [ ] Static composition works without animation
- [ ] Motion has a purpose and coherent language
- [ ] Mobile/tablet/desktop behavior is intentional
- [ ] Images and loading strategy are appropriate
- [ ] Core Web Vitals have been considered
- [ ] Accessibility fundamentals are implemented
- [ ] Technical SEO fundamentals are implemented
- [ ] Components are maintainable
- [ ] Rendered output has been inspected
- [ ] Generic AI patterns have been challenged
- [ ] Remove-20% test completed
- [ ] Six-month maintainability test completed
- [ ] Adversarial review completed
- [ ] Major issues found during review are fixed

## Gotchas

- ⚡ AI template gravity: default hero + cards + CTA patterns appear unless actively challenged.
- ⚡ Animation as compensation: motion cannot repair weak hierarchy.
- ⚡ Parallax everywhere: use it only where depth/storytelling benefits.
- ⚡ Dribbblification: optimize for real use, not screenshots.
- ⚡ Rounded-everything syndrome: shape language should be intentional.
- ⚡ Gradient addiction: gradients are not a substitute for identity.
- ⚡ Oversized typography: scale must serve hierarchy.
- ⚡ Motion inconsistency: define one motion language.
- ⚡ Mobile afterthought: responsive composition must be designed early.
- ⚡ Performance theater: optimize real experience, not metrics in isolation.
- ⚡ Premature abstraction: abstract meaningful concepts, not every visual fragment.
- ⚡ Visual correctness illusion: code correctness does not imply visual correctness.
- ⚡ Decoration creep: run the Remove-20% Test.
- ⚡ AI confidence bias: the first successful render is the beginning of review.
- ⚡ Generic premium aesthetic: dark backgrounds + huge type + gradients + glow + glass + parallax can still be interchangeable.
- ⚡ Enterprise ≠ boring: reliability and maintainability do not require conservative visual design.
- ⚡ Beautiful ≠ complex: sophisticated results may require simple code.
- ⚡ User instruction literalism: preserve intent while challenging harmful implementation choices.
- ⚡ Checklist completion bias: passing checkboxes does not prove excellence.

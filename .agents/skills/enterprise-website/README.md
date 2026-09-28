# enterprise-website

A workflow-oriented skill for creating beautiful, distinctive, enterprise-grade websites.

## Structure

- `SKILL.md` — orchestration, principles, integration, and completeness rules
- `steps/01-discovery.md` through `steps/14-final-validation.md` — executable one-step-at-a-time workflow

The skill deliberately separates design concept, information architecture, visual system, motion, implementation, rendered inspection, performance, accessibility, adversarial review, refinement, and final validation.

## Intended behavior

The agent must execute one step at a time. Each step has:
- objective
- inputs
- actions
- critical questions
- output
- stop conditions
- self-review

The workflow is intentionally adversarial: the first successful render is treated as the beginning of review rather than the end.

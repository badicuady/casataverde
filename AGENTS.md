# Casa Ta Verde — Agent Instructions

## Scope and source of truth

These instructions apply throughout this repository. Read
`Enterprise_Website_Client_Questionnaire_EN.txt` for the full client brief.
Preserve that source document; do not rewrite client answers to match implementation choices.

Explicit client requirements below are binding. Sections labeled **Recommended defaults**
are proposed decisions for unanswered “Recommend” fields, not confirmed client facts.
Later explicit user instructions take precedence. Resolve routine implementation choices
autonomously; ask only when missing information materially affects scope or correctness.

The supplied global instructions reference `LEAN-CTX.md`, which was not present when
this file was created. If it becomes available, read it alongside this file.

## Business objective and positioning

- Brand: **Casa Ta Verde** (“Your Green House”). Market: **Romania**.
- Build an evergreen, premium website that increases orders, qualified inquiries,
  and calls to the sales team.
- Position the business as a value-added reseller and integration partner for a
  complete smart, sustainable property ecosystem. Explain how products work together
  and reduce supplier coordination, procurement friction, and compatibility concerns.
- Give meaningful coverage to all six product categories, grouped into four families:
  1. Renewable energy and climate: solar panels and heat pumps.
  2. Building envelope and protection: metal roof tiles and rainwater systems.
  3. Smart home automation.
  4. Interior finishes: stretch ceilings.
- Support cross-category discovery without forcing unrelated upsells.
- Business success measures: average order value, multi-category purchases, qualified
  B2B inquiries, lead-to-opportunity conversion, repeat trade orders, and customer
  lifetime value. Do not invent numeric targets or claim website analytics alone
  establishes sales outcomes.

## Priority order

1. Conversion: useful next steps toward orders and sales conversations.
2. Clear, low-friction user experience.
3. Distinct B2B and B2C journeys.
4. A coherent integrated-property story.
5. Interactive demonstrations of value.
6. Premium technical minimalism.
7. Credible single-partner expertise.
8. Architectural lifestyle imagery.

Performance wins whenever visual sophistication or animation conflicts with speed.
Challenge design choices that impair usability. Visual spectacle must serve understanding
and conversion.

## Audiences and conversion paths

- **B2C:** premium homeowners, renovators, and eco-conscious property owners. Address
  comfort, operating costs, aesthetics, compatibility concerns, and vendor fatigue.
  Lead toward a tailored consultation or property integration quote.
- **B2B:** builders, contractors, architects, developers, and installers. Address
  sourcing efficiency, specifications, project coordination, and volume quotations.
  Lead toward a project quote or trade inquiry.
- Within 5–10 seconds, visitors should understand the offering, the integrated
  approach, and which path fits them. Keep both audience paths visible in desktop
  navigation; do not hide primary desktop navigation behind a hamburger menu.
- Every marketing page needs a clear, relevant next action. Prefer specific labels
  such as “Solicită o ofertă personalizată” and “Solicită o ofertă pentru proiect”.
  Keep verified phone contact easy to reach, including a mobile call action.
- Qualify by project fit and needs. Do not use insulting or exclusionary copy about
  budget buyers, DIY visitors, or other non-target audiences.
- Trade accounts, blueprint uploads, instant pricing, and free consultations are
  proposed mechanisms, not established operational capabilities. Confirm availability
  before promising them. An order objective does not automatically require checkout.

## Language and content

- Romanian is the primary public language; provide English equivalents. Use correct
  Romanian diacritics and natural translations, including navigation, forms, errors,
  metadata, and accessibility labels. Do not build separate country experiences.
- Write concise, benefit-led copy that connects each product to the wider property
  system. Explain technical terms for homeowners while retaining useful B2B detail.
- Keep content evergreen: describe capabilities and performance tiers rather than
  rapidly changing model numbers, stock levels, fixed prices, or temporary offers.
- Do not add a news/blog feed, seasonal banners, countdowns, or stale dated promotions.
  Group genuine case studies by project type rather than recency.
- Internet research can inform copy; retain sources for factual claims and asset
  licenses. Never copy competitor text or assume their images are reusable.
- Do not fabricate testimonials, completed projects, certifications, partners,
  staff identities, statistics, contact details, warranties, or business policies.
- Treat “zero compatibility issues,” guaranteed savings, energy independence,
  installation-risk elimination, and instant wholesale prices as claims needing
  evidence and defined scope. Do not publish the brief's absolute guarantees verbatim
  without substantiation. Do not imply the reseller installs or manufactures products
  unless confirmed.
- Concept imagery and dashboard demonstrations must not masquerade as completed
  client projects or functioning product integrations.

## Visual direction and motion

- Aim for a calm architectural showroom combining nature and precise engineering.
  Use intentional whitespace, clear hierarchy, restrained color, and strong imagery.
- References: Apple's ecosystem presentation, Tesla Energy's architectural imagery,
  and Nest/Google Home's approachable automation. Derive principles; do not clone.
- Use one primary, licensed, high-quality type family with Romanian glyph support
  and reliable fallbacks. Avoid unstyled browser-default typography.
- Favor modern architecture, integrated technical cross-sections, and legible smart
  home UI demonstrations. Avoid leaf-house clip art, generic clipboard portraits,
  cluttered hardware catalogs, and repetitive boxes with heavy visible borders.
- Use purposeful parallax, exploded component views, and subtle micro-interactions
  to explain relationships. A visual connection is not technical proof of compatibility.
- Preserve native scrolling. No scroll-jacking, automatic hero carousels, bouncing
  text, spinning decorations, blocking intro screens, intrusive promotional popups,
  or chatbots pretending to be humans.
- Reduce or remove motion on constrained devices and for reduced-motion preferences.
  Content and actions must remain understandable with animation disabled.
- Client-supplied research references: https://www.bilka.ro,
  https://www.ferroli.com, https://case-smart.ro, https://www.tavanetero.ro,
  and https://solarhev.ro. Verify their current content when using them for research;
  these links do not establish affiliations or permission to reuse assets.

## Technical constraints

- No existing platform or framework is mandated. Inspect the repository before
  choosing a stack; once established, follow its conventions.
- **Do not create an admin module.** The client maintains the site, with editorial
  updates intended at most annually. Favor a small, understandable maintenance surface.
  That editorial goal does not remove security or dependency maintenance needs.
- Mobile first, with usable layouts on desktop, large/TV screens, and low-powered
  devices such as Raspberry Pi systems. Do not require powerful GPUs or hover input
  for essential content or controls.
- Optimize architectural images into responsive formats such as WebP/AVIF; provide
  dimensions to avoid layout shifts. Prioritize the hero image and defer offscreen assets.
- Keep initial JavaScript small. Load costly calculators or visualizations when needed;
  do not preload entire animation libraries or image sequences by default.
- Prefer transform and opacity animation; avoid layout work on every scroll event.
  Measure performance rather than assuming a GPU transform guarantees smoothness.
- Treat the brief's Base64 and cache-first service-worker suggestions as techniques
  to evaluate, not unconditional mandates. Inline only suitably small assets when
  beneficial; never embed large photography as Base64.
- If using a service worker, define cache versioning, invalidation, update behavior,
  and offline handling. Never cache submitted personal data or report an offline
  inquiry as delivered. Do not promise zero latency or universal sub-500ms loads.

## Recommended defaults — structure and implementation

- Begin with a lightweight static or prerendered marketing site, with structured
  content in repository files and only the server-side functionality conversions need.
- Proposed sitemap: home; residential solutions; professional/B2B solutions;
  discoverable landing pages covering all six categories; about; contact/quote;
  and applicable privacy/terms pages. Add project pages only with real evidence.
- Proposed homepage story: clear offering and audience paths; connected property
  overview; all product families; audience-specific benefits; verified proof and
  process; common questions; relevant quote and phone actions.
- Centralize design tokens and bilingual content. Document editing and deployment
  steps for the client; do not introduce a CMS or account portal by assumption.
- Keep forms short and relevant to the selected audience. Provide labels, validation,
  loading, success, and recoverable error states. Show success only after confirmed
  submission; never fake a backend integration.
- Build a needs configurator if a credible savings model is unavailable. An estimator
  needs sourced assumptions, units, ranges, and clear limitations; do not invent ROI.
- Use semantic HTML, keyboard access, visible focus, sufficient contrast, accessible
  form errors, meaningful image alternatives, and reduced-motion support. Aim for
  WCAG 2.2 AA; validate rather than claim compliance without an audit.
- Proposed performance targets: LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 at the 75th
  percentile where field data exists. Use realistic mobile lab checks before launch;
  do not represent a lab score as measured field performance.
- Support organic search with indexable content, localized titles/descriptions,
  semantic headings, canonical URLs, Romanian/English hreflang, sitemap, robots
  configuration, and structured data limited to verified business facts.
- Collect only necessary inquiry data. Keep secrets server-side and validate inputs
  server-side. Select analytics, consent behavior, retention, and integrations based
  on actual business needs and applicable requirements; do not assume a CRM exists.

## Working and verification

- For substantial website design or implementation, read the local
  `.agents/skills/enterprise-website/SKILL.md` and follow its applicable workflow.
- Keep changes scoped to the requested task. Do not scaffold an application merely
  to edit documentation or turn all proposed features into launch requirements.
- Before implementation, identify available scripts and document actual build,
  development, lint, and test commands once a stack exists. Do not invent commands.
- For UI work, verify both languages, audience paths, navigation and CTAs, form
  outcomes, responsive layouts, keyboard operation, reduced motion, and image loading.
  Run available checks appropriate to the change; report untested areas honestly.
- Verify estimator logic with meaningful tests if implemented. Review visuals at
  representative mobile and desktop sizes, with constrained-device checks for motion.
- Preserve user changes. Report what changed, what was checked, and any concrete
  unresolved dependency without overstating completion.

## Open inputs — resolve when relevant

The questionnaire does not establish the legal business identity, domain, phone/email,
address, delivery/service coverage, installation responsibilities, actual partner brands,
compatibility evidence, warranty terms, approved logo/palette, licensed imagery, real
case studies, sales recipient, estimator data, hosting, or analytics/integration choices.
Use clearly marked placeholders in drafts; resolve affected inputs before publishing.
Do not block unrelated work on these unknowns or silently turn them into facts.

# Casa Ta Verde — first local website

### Summary

Build `casa-ta-verde` as a bilingual architectural showroom that guides homeowners and professionals toward qualified inquiries.

Inspection found no existing implementation, assets, or design artifacts. Node.js, npm, and Chrome are available. Planning has reached the skill’s implementation step; no files have been changed or rendered pages tested because this session remains in Plan Mode.

### Design and content

- Adopt **“the inhabited section”**: architectural imagery introduces the property; an annotated house cutaway explains its systems.
- Use warm off-white backgrounds, graphite typography, forest-green actions, generous whitespace, and open editorial layouts. Use self-hosted Manrope with Romanian glyphs and its license.
- Create clearly labeled architectural concept imagery. Build the property visualization as lightweight SVG with accessible HTML explanations for all six categories.
- Selecting a system highlights its location, explains its benefit and relevant relationships, and links to its category page. Explain that compatibility requires project-specific review.
- Keep static content complete. Add only short selection transitions and restrained layer movement; disable movement for reduced-motion and constrained-device modes.
- Record discovery, architecture, assumptions, and validation in `explore/design/website-casa-ta-verde.md`; visual decisions in `website-design-casa-ta-verde.md`; motion rules in `website-motion-casa-ta-verde.md`.

### Implementation

- Use Astro, TypeScript, CSS custom properties, and small native browser scripts. Prerender marketing pages and use the Node adapter for the inquiry endpoint. Astro supports combining prerendered pages with on-demand endpoints. [Astro documentation](https://docs.astro.build/en/guides/on-demand-rendering/)
- Centralize bilingual copy, category identifiers, localized routes, business configuration, and design tokens. Avoid a client framework, CMS, admin module, database, and animation library.
- Provide Romanian at `/` and English at `/en/`, with translated routes for residential, professional, six category pages, about, contact, configurator, and a clearly marked draft privacy page.
- Homepage sequence: offering and audience paths; architecture and connected-property visualization; four product families covering all six categories; audience benefits and inquiry process; FAQs; quote action.
- Category pages explain benefits, selection considerations, relevant adjacent systems, FAQs, and a category-prefilled quote action. Residential and professional pages use distinct language and qualification needs.
- Keep both audience links visible in desktop navigation and immediately discoverable on mobile. Language switching opens the equivalent page and preserves nonpersonal configurator selections.
- Use responsive AVIF/WebP imagery, explicit dimensions, prioritized hero loading, deferred offscreen images, and semantic HTML. Generate localized metadata, canonical URLs, hreflang, sitemap, and robots configuration from a configurable site origin. Draft mode remains non-indexable.

### Configurator and inquiry boundary

- Implement a short configurator with audience, new construction/renovation/exploration, optional project stage, and six category selections. Allow uncertainty and single-category inquiries; show no financial estimates.
- Carry selections into contact using validated, nonpersonal URL parameters. Preserve them across language changes and back navigation.
- Contact collects name, email, locality, optional phone and project description, plus optional company/role for professionals. Keep personal information out of URLs and browser persistence.
- Add `POST /api/inquiries` with server validation and a documented delivery adapter. Missing configuration returns an explicit unavailable response; configured delivery must acknowledge acceptance before the UI shows success.
- Show delivery availability before form entry. In the unconfigured local version, allow visitors to copy or download their brief, clearly stating it has not been sent.
- Implement validation, pending, acknowledged success, unavailable, and recoverable error states. Preserve values on failure; keep credentials server-side and avoid logging inquiry contents.
- Render phone actions only when a verified number is configured.

### Validation and handoff

- Continue the enterprise-website workflow sequentially: implement Step 7, then read and execute Steps 8–14 individually.
- Inspect actual pages at mobile, tablet, desktop, and wide-screen sizes. Review every page type in both languages, including long translations and image crops.
- Test navigation, language mapping, category preselection, configurator editing, browser back, unavailable delivery, validation, network failure, and acknowledged success using isolated test fixtures.
- Check keyboard operation, focus visibility, mobile menus, form announcements, contrast, reduced motion, and essential content without JavaScript.
- Run type/build checks, browser flow tests, automated accessibility checks, and throttled mobile performance measurements. Target LCP ≤2.5 seconds and CLS ≤0.1 in lab checks; report interaction measurements without claiming field INP.
- Perform the skill’s adversarial, remove-20%, and maintainability reviews; fix significant findings and repeat affected checks.
- Deliver a README with verified installation, development, build, production-run, and test commands; content-editing guidance; delivery configuration; asset provenance; and measured validation results.

Launch inputs remain legal identity, verified contact details, domain, service coverage and responsibilities, approved business claims, privacy handling, and the sales delivery destination. These do not block the local draft. No public deployment is included.

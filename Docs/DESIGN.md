# Design System — SG Properties

## 1. Brand direction
**Positioning:** Invest Beyond Borders. A refined property and investment advisory experience for national and international clients.

The website should feel architectural, editorial, calm, and premium—not like a crowded property classifieds portal.

## 2. Typography
- Primary typeface: **Nunito** (use the variable font if available).
- Use clear weight hierarchy: 400 body, 500 labels, 600 navigation and subheads, 700–800 display emphasis.
- Keep body copy comfortably readable; avoid excessively thin text over imagery.
- Load fonts locally or through a privacy-conscious font delivery strategy; use `next/font`.

## 3. Visual direction
- Suggested palette: deep midnight navy, warm ivory, muted stone, and restrained champagne/gold accents.
- Use generous whitespace, large editorial headings, architectural photography, subtle borders, and soft depth.
- Avoid excessive rounded cards, heavy gradients, dense dashboards, and generic stock-property layouts.
- Use high-quality, licensed imagery only. Do not imply a photograph depicts the exact unit if it is a render or reference image.

## 4. Doorway landing screen
- Full viewport architectural double-door composition.
- Left panel clearly labelled **REITs**; right panel **Real Estate**.
- Each panel has its own atmospheric image/texture and a short descriptor.
- Hover/focus subtly illuminates the selected door and reveals a clear action.
- On click, animate the doors opening/sliding to reveal the selected destination.
- Mobile: stack or use two large vertical panels; keep labels and tap targets obvious.
- Provide skip-animation behaviour, keyboard focus, and `prefers-reduced-motion` support.
- Keep the experience lightweight; do not block access behind a loading animation.

## 5. Public pages
### REIT / investment cards
Lead with project photography, location, investment entry amount, and a small set of key facts. Put full risk and return context on the detail page, not in tiny card footnotes.

### Country selector
Use a visual world/country discovery layout with clear country names and available-property counts. Do not show a country as active if it has no published inventory; it may appear as “Coming soon” only if approved.

### Property cards
Use consistent image ratios, project name, city/country, type, bedrooms, area, and approved pricing. Make the whole card navigable while preserving accessible link semantics.

### Detail pages
Use an immersive gallery, concise facts panel, clear enquiry CTA, structured sections, map/location context where available, and related properties.

## 6. Admin UI
Prioritise speed and clarity over marketing aesthetics:
- Left navigation, compact top bar, clear page title.
- Tables with search, filters, status, pagination, and bulk actions where safe.
- Forms grouped into Overview, Location, Pricing, Unit Details, Media, SEO, and Publication.
- Preview and save-draft actions separated from publish.
- Confirm destructive actions.

## 7. Motion
- Use restrained transitions (roughly 150–350ms for UI feedback).
- Door transition may be more expressive but should remain short.
- Avoid scroll-jacking, excessive parallax, and animations that impair reading.
- Respect reduced-motion settings.

## 8. Responsive breakpoints
Use Tailwind defaults unless design testing suggests otherwise. Test at approximately 360px, 390px, 768px, 1024px, 1440px, and ultrawide desktop widths.

## 9. Accessibility
Target WCAG 2.2 AA. Ensure colour contrast, focus visibility, semantic headings, descriptive image alt text, labelled controls, accessible validation, keyboard support, and non-motion alternatives.

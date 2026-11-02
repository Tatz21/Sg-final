# Project Rules — SG Properties

## Product rules
1. The top-level visitor choice is always **REITs** or **Real Estate**.
2. Real Estate discovery is country-first.
3. Only published content is visible publicly.
4. Every property and investment has its own stable detail page.
5. Every enquiry must retain its source listing and campaign context.
6. Admin must be able to add countries, cities, projects, and offerings without code changes.

## Content rules
1. Never invent property facts, prices, addresses, developers, availability, amenities, or handover dates.
2. Preserve the supplied area units exactly; show sqm or sq ft clearly.
3. Preserve original currency; any conversion must show rate source and timestamp.
4. Mark missing details as pending internally, not as fabricated public copy.
5. Distinguish renderings, illustrative images, and actual photographs.
6. All financial and tax statements require evidence and approval.
7. Never describe projected appreciation or returns as guaranteed.
8. Do not use the term “REIT” as a legal classification until confirmed.

## Engineering rules
1. Use TypeScript strict mode.
2. Keep database and secret access on the server.
3. Validate every mutation server-side.
4. Apply RBAC on every admin route/action.
5. Use reusable components and domain services.
6. Keep migrations and seed scripts version-controlled.
7. Do not hard-delete records referenced by leads.
8. Add tests for business-critical logic.
9. Use accessible HTML and reduced-motion support.
10. Optimise images and avoid unnecessary client-side JavaScript.

## Design rules
1. Use Nunito consistently.
2. Maintain a premium, architectural, editorial visual language.
3. Keep the doorway experience memorable but quick and accessible.
4. Avoid clutter, generic listing-portal styling, and excessive card boxes.
5. Prioritise mobile usability and clear enquiry actions.

## Release rules
- No unverified investment claims in production.
- No admin account with a default shared password.
- No release without tested backups, forms, permissions, redirects, and mobile layouts.

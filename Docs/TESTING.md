# Testing Strategy — SG Properties

## 1. Test layers
- **Unit:** validation schemas, formatting, slug generation, permission policies, financial display formatting.
- **Integration:** Prisma repositories, lead creation, publication rules, audit logging, email retry behaviour.
- **End-to-end:** doorway navigation, country browsing, property detail, enquiry submission, admin CRUD and lead handling.
- **Accessibility:** keyboard navigation, focus order, contrast, form labels, reduced motion, screen-reader semantics.
- **Performance:** Core Web Vitals, image delivery, listing pagination, server response times.
- **Security:** auth boundaries, RBAC, rate limits, upload validation, injection/XSS checks.

## 2. Critical scenarios
### Doorway
- Both choices navigate correctly.
- Keyboard users can select either panel.
- Reduced-motion mode skips or simplifies animation.
- Mobile layout remains usable.

### Public listings
- Only published records appear.
- Country filter returns correct country inventory.
- Empty states render correctly.
- Invalid slugs return 404.
- Price and area display with correct units and currency.

### Enquiries
- Valid property enquiry creates one lead linked to the correct property.
- Valid investment enquiry links to the correct offering.
- Both references together are rejected.
- Invalid email, missing consent, and malformed phone are handled.
- Spam and repeated submissions are rate-limited.
- Email failure does not discard a saved lead.

### Admin
- Unauthenticated users cannot access admin.
- Each role has only permitted actions.
- Draft content is not publicly accessible.
- Publish action triggers route revalidation and audit entry.
- Media uploads reject invalid MIME types and oversized files.
- Lead notes remain private.
- Archived content is removed from public listings.

### Investment content
- Unapproved financial claims cannot be published.
- Risk disclosure is visible on published detail pages.
- Return and appreciation are never rendered as guarantees.
- Currency and amount are displayed correctly.

## 3. Release gates
- All critical end-to-end tests pass.
- No high/critical security findings remain.
- No critical accessibility blockers.
- Mobile and desktop visual QA completed.
- Production content approved.
- Backup and restore procedure verified.
- Enquiry notification and lead persistence tested in production-like environment.

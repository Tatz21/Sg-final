# Architecture — SG Properties

## 1. Architecture approach
Use a modular Next.js application with server-rendered public pages and a protected admin workspace. Keep business logic in server-side service modules so it can later be extracted into a dedicated API if traffic, integrations, or team structure require it.

## 2. High-level components
1. **Public web app:** home doorway, REIT pages, country pages, property details, contact pages.
2. **Admin app area:** authenticated dashboard and CMS.
3. **Domain services:** property, investment, taxonomy, media, lead, user, SEO, and settings services.
4. **Persistence:** PostgreSQL accessed through Prisma.
5. **Media storage:** S3-compatible object storage or managed equivalent; store metadata and object keys in PostgreSQL.
6. **Notifications:** transactional email provider for lead alerts and visitor acknowledgements.
7. **Observability:** error tracking, structured logs, uptime and performance monitoring.

## 3. Suggested project structure
```text
src/
  app/
    (public)/
      page.tsx
      reits/
        page.tsx
        [slug]/page.tsx
      real-estate/
        page.tsx
        [country]/page.tsx
        [country]/[slug]/page.tsx
      about/page.tsx
      contact/page.tsx
      privacy/page.tsx
      terms/page.tsx
    admin/
      layout.tsx
      page.tsx
      properties/
      investments/
      countries/
      developers/
      media/
      leads/
      users/
      settings/
    api/
      enquiries/route.ts
      uploads/route.ts
      health/route.ts
  components/
    doorway/
    property/
    investment/
    forms/
    admin/
    ui/
  lib/
    auth/
    db/
    validation/
    email/
    storage/
    seo/
    rate-limit/
  server/
    services/
    repositories/
    policies/
  prisma/
    schema.prisma
    migrations/
  types/
  styles/
  tests/
```

## 4. Request flow
### Public page
Browser → Next.js route → server component → domain service → Prisma → PostgreSQL → rendered HTML.

### Enquiry
Browser form → server route/action → Zod validation → rate limit + spam checks → lead service → database transaction → email notification → success response.

### Admin content update
Admin browser → authenticated route/action → role permission check → validation → domain service → database → audit log → cache revalidation.

### Media upload
Admin requests signed upload → server verifies role, size and MIME type → object storage upload → server verifies object metadata → media record saved → image processing/CDN delivery.

## 5. Rendering and caching
- Server-render and statically optimise public country, property, and investment pages where practical.
- Revalidate affected routes after publication or content updates.
- Do not cache authenticated admin pages or lead data in shared caches.
- Use draft mode or preview tokens for unpublished content.
- Keep search/filter query parameters canonical and avoid indexing thin filter combinations.

## 6. Scalability
- Index country, city, status, slug, price, and property type fields.
- Paginate listing queries.
- Use CDN-backed image delivery and responsive image variants.
- Add Redis or managed cache only when measured need exists.
- Consider a separate search engine only when PostgreSQL search is insufficient.
- Keep service boundaries explicit to support later API extraction.

## 7. Reliability
- Database migrations are version-controlled.
- Enquiry persistence must succeed independently of email delivery; retry notification asynchronously.
- Use idempotency keys or duplicate protection for form submissions.
- Maintain automated backups and test restores.
- Health endpoint reports application readiness without exposing secrets or internal details.

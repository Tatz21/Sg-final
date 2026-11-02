# Deployment & Operations — SG Properties

## 1. Environments
- **Local:** developer machine with local or containerised PostgreSQL.
- **Preview/Staging:** production-like environment with test data and non-production email recipients.
- **Production:** live SG Properties domain, production database, storage, email, monitoring.

## 2. Environment variables
Example names (values must be supplied securely):
```env
NODE_ENV=
DATABASE_URL=
AUTH_SECRET=
AUTH_URL=
STORAGE_ENDPOINT=
STORAGE_BUCKET=
STORAGE_ACCESS_KEY_ID=
STORAGE_SECRET_ACCESS_KEY=
STORAGE_PUBLIC_BASE_URL=
EMAIL_API_KEY=
LEADS_NOTIFICATION_EMAIL=
NEXT_PUBLIC_SITE_URL=
```
Do not commit real values. Validate required variables at startup and fail safely.

## 3. Build and release sequence
1. Run lint, type checks, unit and integration tests.
2. Build the Next.js application.
3. Apply Prisma migrations using a controlled deployment step.
4. Deploy the application.
5. Verify health endpoint.
6. Run smoke tests for doorway, REIT, country, property, enquiry, and admin.
7. Confirm email notifications and media delivery.
8. Monitor logs, errors, and performance.

## 4. Database operations
- Use managed PostgreSQL with automated backups and point-in-time recovery where available.
- Apply migrations before application code that depends on them.
- Never use destructive schema resets in production.
- Test restore procedures periodically.
- Restrict production database access.

## 5. Storage and media
- Use a dedicated bucket and CDN.
- Configure allowed origins and signed uploads.
- Back up private documents and define retention.
- Optimise public images into responsive variants.

## 6. Domain and SEO
- Configure apex and `www` behaviour consistently.
- Enforce HTTPS.
- Set canonical production URL.
- Verify sitemap, robots, redirects, and 404 behaviour.
- Connect Search Console after domain ownership verification.

## 7. Monitoring
Track application errors, failed enquiries, email delivery failures, database health, uptime, slow routes, and unusual admin activity. Do not include secrets or full lead details in logs.

## 8. Rollback
Keep the previous deploy available. For schema changes, use backward-compatible migrations where possible. Document rollback steps and avoid rolling back database changes without a tested recovery plan.

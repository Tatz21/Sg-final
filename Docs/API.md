# API Specification — SG Properties

The initial implementation may use Next.js Route Handlers and Server Actions. All write operations must be server-side, authenticated where required, validated, and permission-checked.

## Conventions
- JSON responses for route handlers.
- ISO 8601 timestamps in UTC.
- Money represented as decimal strings with currency code.
- Pagination: `page`, `pageSize`; enforce a maximum page size.
- Return consistent errors: `{ "error": { "code": "...", "message": "...", "fieldErrors": {} } }`.
- Never expose internal notes, private contact details, audit payloads, or unpublished records publicly.

## Public endpoints
### `GET /api/properties`
Query: `country`, `city`, `type`, `bedrooms`, `minPrice`, `maxPrice`, `currency`, `sort`, `page`, `pageSize`.

Returns published properties only, with a compact card projection.

### `GET /api/properties/:slug`
Returns published property details, public unit configurations, gallery, developer, and related listings.

### `GET /api/investments`
Returns published investment offerings only.

### `GET /api/investments/:slug`
Returns a published investment detail and its approved disclosures.

### `GET /api/countries`
Returns countries with published property counts and public country metadata.

### `POST /api/enquiries`
Example:
```json
{
  "name": "Sample Visitor",
  "email": "visitor@example.com",
  "phone": "+911234567890",
  "countryOfResidence": "IN",
  "preferredContactMethod": "WHATSAPP",
  "message": "Please share more details.",
  "propertySlug": "example-property",
  "consent": true,
  "consentVersion": "2026-01"
}
```
A request may reference either `propertySlug` or `investmentSlug`, not both. Apply validation, rate limits, spam controls, and consent capture. Return a generic success response that does not reveal whether an email address already exists.

## Admin endpoints / actions
- `POST /api/admin/properties`
- `PATCH /api/admin/properties/:id`
- `POST /api/admin/properties/:id/publish`
- `POST /api/admin/properties/:id/archive`
- Equivalent CRUD/publish actions for investments, countries, cities, developers, and media.
- `GET /api/admin/leads` with filters and pagination.
- `PATCH /api/admin/leads/:id` for status and assignment.
- `POST /api/admin/leads/:id/notes`
- `GET /api/admin/audit-logs` for permitted roles.
- `POST /api/admin/uploads/sign` to create a constrained signed upload URL.

## Security requirements
- Admin endpoints require a valid session and explicit role permission.
- Validate IDs, slugs, enums, URLs, numeric ranges, file types, and file sizes.
- Use CSRF protection where applicable, secure cookies, rate limiting, and server-side ownership checks.
- Log sensitive admin changes.
- Never trust role, price, status, or user ID values sent by the client.

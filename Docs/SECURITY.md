# Security & Privacy — SG Properties

## 1. Authentication
- Admin-only authentication; no public admin registration.
- Enforce MFA for Super Admin and Admin where supported.
- Use secure, HTTP-only, same-site cookies.
- Use strong session expiry and revocation.
- Disable accounts promptly when staff leave.

## 2. Authorisation
- Enforce role-based permissions on the server for every admin action.
- Suggested roles: SUPER_ADMIN, ADMIN, EDITOR, SALES.
- Sales can access assigned or permitted leads, not global settings.
- Editors can manage content but cannot manage users or security settings.
- Never rely on hidden UI controls as access control.

## 3. Input and application security
- Validate all input server-side with schemas.
- Escape output and avoid unsafe HTML rendering.
- Use parameterised ORM queries.
- Apply CSRF protection as appropriate.
- Rate-limit login, enquiry, and upload endpoints.
- Use anti-spam measures such as honeypot and challenge escalation.
- Set security headers and a restrictive Content Security Policy.
- Keep dependencies patched and scan for vulnerabilities.

## 4. Data protection
- Collect only data needed to respond to enquiries.
- Publish a clear privacy policy and consent wording.
- Restrict lead access by role.
- Encrypt traffic in transit and use managed encryption at rest.
- Define retention and deletion procedures for leads.
- Do not store payment card, passport, or sensitive financial information in enquiry forms.
- Avoid logging full phone numbers, email addresses, messages, or credentials.

## 5. Media uploads
- Allowlist MIME types and extensions.
- Enforce size and dimension limits.
- Use signed uploads and private buckets where documents are confidential.
- Scan files where supported.
- Generate safe filenames; do not trust user-supplied paths.
- Keep investment/legal documents private unless specifically approved for public access.

## 6. Financial and legal content controls
- Treat returns, tax, appreciation, yield, and investment minimums as regulated/high-risk marketing claims.
- Require evidence, jurisdictional review, and written approval before publication.
- Do not promise or guarantee returns.
- Display risk disclosures near claims and enquiry CTAs.
- Confirm whether an offering legally qualifies as a REIT or another investment structure in each relevant jurisdiction.
- The website is not a substitute for legal, tax, or investment advice.

## 7. Operations
- Store secrets in the hosting provider's secret manager.
- Maintain encrypted backups and test restoration.
- Keep audit logs for publication, permissions, financial claim edits, and lead exports.
- Have an incident response and access revocation process.

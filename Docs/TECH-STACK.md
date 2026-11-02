# Technology Stack — SG Properties

## Core
| Layer | Choice | Purpose |
|---|---|---|
| Framework | Next.js App Router | Public website, admin workspace, server rendering |
| Language | TypeScript | Type safety |
| UI | React | Component system |
| Styling | Tailwind CSS | Responsive design system |
| Components | shadcn/ui + Radix primitives | Accessible admin and form components |
| Typography | Nunito via `next/font` | Brand typography |
| Database | PostgreSQL | Listings, leads, users, settings |
| ORM | Prisma | Schema, migrations, queries |
| Validation | Zod | Server and form validation |
| Authentication | Auth.js or managed identity | Admin-only authentication |
| Media | S3-compatible object storage | Property images and documents |
| Email | Resend or equivalent | Lead notifications |
| Testing | Vitest + Playwright | Unit, integration, end-to-end |
| Hosting | Vercel or equivalent Node-compatible host | Next.js deployment |

## Implementation guidance
- Prefer React Server Components for read-heavy public pages.
- Use client components only for interactions requiring browser state.
- Keep database access server-only.
- Use server actions or route handlers for mutations; choose one convention consistently.
- Validate every mutation on the server even when client validation exists.
- Use signed uploads rather than proxying large media files through the application server.
- Use environment-specific secrets; never commit `.env` files.
- Pin dependencies and use a lockfile.

## Optional later additions
- Redis/managed cache for measured caching needs.
- Background job queue for email retries, image processing, and exports.
- Search service for advanced multi-facet discovery at larger scale.
- CRM integration after the lead workflow is stable.
- Analytics provider with consent controls.

## Avoid
- Storing image binaries directly in PostgreSQL.
- Exposing database credentials or privileged storage keys to the browser.
- Using client-side-only protection for admin routes.
- Building a microservice architecture before the product requires it.

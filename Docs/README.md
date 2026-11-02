# SG Properties — Project Documentation

A premium, international real-estate and investment discovery platform for SG Properties.

**Core experience:** a cinematic split-door entry screen lets visitors choose **REITs** or **Real Estate**. REIT visitors explore investment opportunities. Real-estate visitors select a country, browse properties, inspect details, and submit enquiries. A secure admin workspace manages all content, inventory, investment offerings, media, and leads.

## Product goals
- Present SG Properties as a trusted national and international property partner.
- Make the REIT and Real Estate journeys distinct, intuitive, and visually memorable.
- Support property discovery across India and international markets.
- Let authorised staff manage listings and enquiries without developer intervention.
- Build a scalable, SEO-friendly platform on Next.js.

## Current content seed

### REIT / investment offering
- **Name:** Azure by Lapis
- **Location:** RAK Central, Ras Al Khaimah, UAE
- **Starting amount:** ₹225,000 (as supplied by client; confirm whether this is an investment minimum, booking amount, or indicative price)
- **Unit:** 1 BHK waterfront
- **Area:** 800 sq ft
- **Stated annual return:** 8% from day one
- **Stated capital-gains tax:** 0%
- **Stated projected appreciation:** 2.5–3x
- **Handover:** Q4 2028

All financial, tax, legal, return, appreciation, availability, and handover statements must be treated as client-supplied claims until independently verified and approved for publication. Do not present projected returns or appreciation as guaranteed. Do not describe an offering as a regulated REIT unless its legal structure and jurisdictional status are confirmed.

### International real-estate inventory
- **LePont by RLC Residences** — Bridgetowne East, Pasig City, Philippines.
- **The Mantawi Residences** — Ouano and F. Zuellig Avenue, Mandaue City, Cebu, Philippines.
  - 1-bedroom: 46 sqm
  - 2-bedroom: 92–115 sqm
  - 3-bedroom: 138 sqm
  - Penthouse: 207 sqm
- **Boracay Island** — condominium opportunity; project name, developer, unit mix, pricing, and exact location to be supplied.
- Additional India and international inventory will be added through the admin.

## Recommended stack
- Next.js App Router + TypeScript
- Tailwind CSS + shadcn/ui
- PostgreSQL + Prisma ORM
- Auth.js or a managed identity provider for admin authentication
- Object storage for property images and documents
- Zod validation
- Resend or equivalent transactional email provider
- Vitest + Playwright

## Documentation map
| File | Purpose |
|---|---|
| `PRD.md` | Product scope, personas, requirements, acceptance criteria |
| `ARCHITECTURE.md` | System architecture and application boundaries |
| `DESIGN.md` | Brand, visual system, interaction and responsive guidance |
| `TECH-STACK.md` | Technology choices and rationale |
| `DATABASE.md` | Data model and relationships |
| `API.md` | API routes, payloads and conventions |
| `FEATURES.md` | Functional feature inventory |
| `USER-FLOWS.md` | Visitor and admin journeys |
| `SEO.md` | Technical and content SEO |
| `SECURITY.md` | Security, privacy and operational controls |
| `RULES.md` | Product, content and engineering rules |
| `PHASES.md` | Delivery roadmap |
| `TESTING.md` | Test strategy and scenarios |
| `DEPLOYMENT.md` | Environments, deployment and operations |
| `CHANGELOG.md` | Project change history |

## Getting started
1. Review and approve the client-supplied property and investment facts.
2. Configure environment variables and PostgreSQL.
3. Install dependencies and generate the Prisma client.
4. Run database migrations and seed only approved demo content.
5. Create the first admin account through a secure bootstrap process.
6. Run the application locally and complete the acceptance checklist.

Implementation commands and exact scripts should be finalised when the repository is scaffolded.

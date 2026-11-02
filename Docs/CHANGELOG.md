# Changelog — SG Properties

All notable project changes are recorded here.

## [0.3.0] — 2026-11-03
### Changed & Enhanced (UI/UX Pro Architectural Redesign)
- Elevated global typography with editorial pairing of `Cormorant Garamond` display serifs and clean, modern `Nunito` sans-serif.
- Completely redesigned the Signature Doorway Entrance (`CinematicDoorway`) with a central brass dividing medallion, micro-interaction hover glows, soundless easing curves, and live metric preview pills.
- Redesigned Navigation bar with frosted glassmorphism (`backdrop-blur-xl`), top sovereign market ticker, segmented dual-journey pill selector, and private consultation callouts.
- Built interactive `InvestmentCalculator` component allowing prospective investors to simulate 8% annual returns, monthly cashflows, and 2.5–3x capital appreciation horizons on REIT offerings with live regulatory disclosures.
- Built `InteractiveGallery` component with smooth thumbnail switching, captions, and architectural photography viewer.
- Built `UnitMatrixTabs` component enabling interactive floorplan and configuration inspection for multi-unit luxury towers (e.g. 1BR, 2BR, 3BR, and Sky Penthouse layouts for Mantawi Residences and LePont).
- Overhauled Inbound Lead Enquiry form with confidential consultation aesthetics, response channel selector pills (WhatsApp, Email, Direct Call), 256-bit encryption reassurance, and instant field validations.
- Overhauled Admin CMS Workspace with obsidian-and-gold command center aesthetics, refined KPI spark tiles, and an enhanced Lead Desk.
- All 14 Vitest unit tests passing and 33 routes verified with HTTP 200 responses.

## [0.2.0] — 2026-11-03
### Added
- Completed Next.js 14 App Router + TypeScript foundation with Tailwind CSS and Nunito typography.
- Implemented signature cinematic double-doorway entry experience (`/`) split between REITs and Real Estate with smooth motion, keyboard focus, and reduced-motion fallback.
- Implemented REITs discovery catalog (`/reits`) and investment offering detail template (`/reits/[slug]`) featuring Azure by Lapis with explicit unverified/client-supplied claims badges and regulatory disclaimers.
- Implemented country-first real estate discovery (`/real-estate`) and country property catalog (`/real-estate/[country]`) with filters for City, Property Type, and Bedrooms.
- Implemented property detail page (`/real-estate/[country]/[slug]`) with high-resolution photo galleries and exact unit configuration tables for LePont Residences, The Mantawi Residences, and Boracay Island (pending verification).
- Built public supporting and compliance pages (`/about`, `/contact`, `/disclosures`, `/privacy`, `/terms`).
- Implemented dynamic `sitemap.xml` and `robots.txt` conforming to technical SEO rules.
- Implemented lead enquiry capture API (`POST /api/enquiries`) with mutual exclusivity validation, anti-spam honeypot, rate limiting, and audit logging.
- Built comprehensive Admin CMS workspace (`/admin`, `/admin/login`, `/admin/properties`, `/admin/investments`, `/admin/leads`, `/admin/countries`, `/admin/audit-logs`, `/admin/settings`) with JWT session authentication, RBAC, confidential advisor notes, and CSV lead export.
- Added Vitest unit test suite covering enquiry validation, currency/area formatting, and role permission policies (all 14 tests passing).
- Resolved missing photos issue: downloaded all high-resolution architectural photography assets into `public/images/` (doorway panels, sovereign country heroes, Azure by Lapis, LePont, Mantawi Residences, Boracay, Dubai Marina, Worli Sea Face) and configured `unoptimized: true` in `next.config.mjs` for guaranteed offline and local static image serving.
- Verified production build and live server responses across all 33 routes.

## [0.1.0] — 2026-11-03
### Added
- Initial project documentation for SG Properties.
- REIT / Real Estate split-door landing concept.
- Next.js-based architecture and admin CMS requirements.
- Country-first international property discovery.
- Initial Azure by Lapis investment content seed.
- Initial Philippines property content seed for LePont and The Mantawi Residences.
- Database, API, SEO, security, testing, deployment, and delivery roadmap.

### Notes
- Azure by Lapis financial and tax claims are client-supplied and require verification and approved publication wording.
- Boracay condominium project details are pending.
- Confirm whether ₹225,000 is the investment minimum, booking amount, or indicative starting amount.

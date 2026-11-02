# Product Requirements Document — SG Properties

**Product:** SG Properties Website & Admin CMS  
**Platform:** Responsive web application  
**Primary framework:** Next.js App Router  
**Status:** Initial product definition

## 1. Product vision
Create a distinctive, premium digital destination where national and international clients can discover property opportunities and investment offerings from SG Properties. The experience should feel more like entering a curated property and investment portfolio than browsing a conventional real-estate listing portal.

## 2. Objectives
1. Clearly separate the two main business journeys: REITs / investment opportunities and Real Estate.
2. Make international discovery simple through country-first navigation.
3. Convert qualified visitors into enquiries with clear calls to action.
4. Give SG Properties staff a secure admin panel to manage properties, investment products, countries, media, and leads.
5. Establish a scalable content structure that supports new countries, cities, developers, and offerings.

## 3. Audiences
- **Domestic investor or buyer:** wants to understand opportunities, pricing, and how to speak with SG Properties.
- **International investor or buyer:** wants to compare locations and enquire about overseas inventory.
- **Property seeker:** knows the country or destination but may not know the project.
- **Returning lead:** wants to revisit a property or continue a conversation.
- **Admin/editor:** needs to publish and update content without code changes.
- **Sales team:** needs to review, assign, and follow up on enquiries.

## 4. Information architecture
### Public
- Entry / home experience
- REITs / Investment Opportunities
  - Investment listing
  - Investment detail
- Real Estate
  - Country selection
  - Country landing / property results
  - City or region filter
  - Property detail
- About SG Properties
- Contact / enquiry
- Privacy policy
- Terms and applicable risk disclosures
- 404 and error pages

### Admin
- Dashboard
- Properties
- Investment offerings
- Countries and cities
- Developers
- Property types and amenities
- Media library
- Enquiries / leads
- Users and roles
- SEO metadata
- Site settings
- Audit log

## 5. Signature entry experience
The first visit presents a full-screen architectural doorway divided into two interactive panels:
- Left door: **REITs**
- Right door: **Real Estate**

The doors should open or slide apart on selection, revealing the chosen journey. The experience must remain accessible, keyboard-operable, reduced-motion-aware, and usable on mobile. Do not force a long animation before the visitor can proceed. Include a persistent route back to the main choice.

## 6. Functional requirements

### 6.1 REITs / Investment
- Display active investment offerings.
- Show title, location, category, starting amount, unit details, area, handover, media, documents, and enquiry CTA.
- Support structured financial fields with explicit labels: target/stated return, frequency, start condition, projected appreciation, tax statement, and risk notes.
- Admin can draft, review, publish, archive, and update offerings.
- Display a visible disclaimer wherever return, appreciation, tax, or performance claims appear.
- Allow visitor enquiry against a specific offering.
- Support future offerings without redesigning the page.

**Initial seed:** Azure by Lapis, RAK Central, UAE. Details are listed in `README.md`; publication is blocked until the facts and permitted wording are approved.

### 6.2 Real Estate discovery
- Present country choices as visual destinations.
- Selecting a country opens its property collection.
- Filter by city, property type, bedrooms, price range, area, and availability where data exists.
- Sort by featured, newest, price, or relevant ranking.
- Property cards show image, project, location, property type, starting price (if approved), and key facts.
- Property detail page includes gallery, overview, location, unit configurations, amenities, developer, availability status, and enquiry form.
- Support India and international markets, including UAE, Philippines, Indonesia, and Australia; admins can add more countries.
- Provide graceful empty states when a country has no active listings.

### 6.3 Enquiries and lead management
- Enquiry form fields: name, email, phone with country code, country of residence (optional), preferred contact method, message, and consent.
- Capture source page, property/offering ID, campaign parameters, timestamp, and consent version.
- Validate on server; protect forms from spam and abuse.
- Show confirmation to the visitor and notify the configured sales inbox.
- Admin can view, search, filter, assign, update status, add internal notes, and export leads subject to role permissions.
- Suggested statuses: New, Contacted, Qualified, Site Visit / Meeting, Negotiation, Won, Lost, Spam.

### 6.4 Admin CMS
- Secure sign-in; no public admin registration.
- Role-based permissions: Super Admin, Admin, Editor, Sales.
- CRUD for properties, investment offerings, countries, cities, developers, amenities, and media.
- Draft / published / archived states.
- Preview content before publication.
- Slug generation with manual override and collision checking.
- SEO title, description, canonical, social image, and indexing controls.
- Audit trail for sensitive changes and publication actions.

### 6.5 Content and settings
- Manage contact details, social links, footer, navigation, disclaimers, and enquiry recipients.
- Manage featured content and home page sections.
- Support currency display per listing, with optional INR conversion only when a reliable exchange-rate source is configured. Always retain original currency and show conversion timestamp/source.

## 7. Non-functional requirements
- Responsive from small mobile to large desktop.
- Strong accessibility: semantic HTML, keyboard navigation, visible focus, contrast, alt text, form labels, reduced motion.
- Fast page loads; optimise images and fonts.
- Server-render public SEO pages.
- Secure admin and server-side validation.
- Backups, error monitoring, structured logs, and analytics consent controls.
- Design for growth in listings, countries, media, and admin users.

## 8. Out of scope for initial release
- Online property purchase or investment subscription checkout.
- Custody of investor funds, payment collection, or financial account management.
- Automated return calculation or guarantee.
- User accounts / buyer dashboards.
- Live map search unless separately scoped.
- Automated legal, tax, or investment advice.

## 9. Success metrics
- REIT vs Real Estate selection rate.
- Country selection-to-property-detail rate.
- Property detail-to-enquiry conversion.
- Investment detail-to-enquiry conversion.
- Qualified leads by country, project, and campaign.
- Admin time to publish or update a listing.
- Core Web Vitals and accessibility defect rate.

## 10. Acceptance criteria
- A visitor can select either doorway and reach the correct section on desktop and mobile.
- A visitor can choose a country and browse its published properties.
- Every published property and investment has a unique, indexable detail URL.
- An enquiry is stored once, associated with the correct listing, and visible to permitted admins.
- Admin can create, edit, preview, publish, archive, and restore content according to permissions.
- Unpublished content is not publicly accessible or indexed.
- Financial claims display approved disclaimers and are not worded as guaranteed outcomes.
- Forms, navigation, filters, and animations work with keyboard and reduced-motion settings.

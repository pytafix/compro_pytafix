# PYTAFIX.WEB.ID — FULL SEO AUDIT REPORT

**Domain**: https://www.pytafix.web.id
**Business Type**: Local Service Business — Electronics Repair (Malang, Indonesia)
**Stack**: Next.js 16 (App Router), Prisma + Neon PostgreSQL, Tailwind CSS v4, Framer Motion, Vercel deployment
**Audit Date**: 2026-07-12
**Auditor**: Claude Code (Full codebase analysis)

---

## EXECUTIVE SUMMARY

### SEO Health Score: 58 / 100

| Category | Score |
|---|---|
| Technical SEO | 55 |
| Content Quality | 65 |
| On-Page SEO | 62 |
| Schema / Structured Data | 58 |
| Performance (CWV) | 50 |
| Backend / API / Security | 42 |
| Images & Media | 52 |
| AI Search Readiness (GEO) | 48 |
| **Overall** | **58** |

---

### Top 5 Critical Issues

1. **[SECURITY] GCP service account JSON committed to repository** — credentials exposed publicly
2. **[SECURITY] ADMIN_PASSWORD='admin' + weak JWT_SECRET in committed .env** — trivially brute-forced
3. **[ON-PAGE] OG image /logo.png used universally — wrong dimensions** — all social shares render poorly
4. **[CONTENT] Article pages use dangerouslySetInnerHTML without sanitization** — XSS vulnerability
5. **[PERFORMANCE] Brand marquee uses raw `<img>` from external CDN** — bypasses Next.js optimization, CLS risk

### Top 5 Quick Wins

1. Create 1200×630 OG banner and update all OG image URLs
2. Revoke GCP credentials, move all secrets to Vercel Environment Variables
3. Replace ADMIN_PASSWORD and JWT_SECRET with strong random values
4. Sanitize article content with DOMPurify before rendering
5. Add Organization + WebSite + SearchAction schema

---

## CATEGORY BREAKDOWN

### 1. Technical SEO — Score: 55

#### What's Working
- robots.txt correctly blocks /admin/ and /api/ from crawlers
- sitemap.xml generates dynamically (static + dynamic URLs from Prisma)
- Canonical tags present on all public pages via alternates
- Security headers (X-Frame-Options, HSTS, Referrer-Policy) configured
- Clean URL structure, no query strings in public URLs
- Next.js 16 App Router with ISR (revalidate tags)

#### Findings

**[HIGH] Sitemap uses stale fallback date 2024-06-01**
- `src/app/sitemap.ts` line 7: all static pages report same outdated lastModified
- Impact: Google deprioritizes "stale" pages in crawl budget
- Fix: `const fallbackDate = new Date()`

**[HIGH] Sparepart detail URL uses numeric ID — not SEO-friendly**
- `src/app/(public)/sparepart/[id]/page.tsx` + `src/app/sitemap.ts`
- URLs like `/sparepart/123` expose DB internals, zero keyword value
- Fix: Add `slug String @unique` to Sparepart model → `/sparepart/[slug]`

**[HIGH] Location permutation sitemap — doorway page risk**
- `src/app/sitemap.ts` lines 59-65: each service × 15 locations = N×15 URLs
- All identical content with just location name swapped — classic doorway page penalty
- Fix: Remove location permutation generation. Keep only base `/layanan/[slug]`

**[MEDIUM] Google Maps uses generic 'Malang' query**
- `src/app/(public)/kontak/page.tsx` line 109: `q=Malang` — not pinned to actual address
- Fix: `q=-7.983908,112.621391` (from LocalBusiness geo schema)

**[MEDIUM] No GSC verification meta tag**
- No Google Search Console HTML verification
- No Vercel Analytics or performance monitoring
- Fix: Add GSC verification tag in layout.tsx metadata

**[LOW] No Content-Language HTTP header**
- Only `lang="id"` in HTML root
- Fix: Add `Content-Language: id-ID` to Vercel headers config

---

### 2. On-Page SEO — Score: 62

#### What's Working
- All pages have unique title tags with consistent Pytafix branding
- All pages have meta descriptions, canonical alternates
- All pages have OpenGraph (locale: id_ID) + Twitter Card metadata
- Strong internal linking via Footer, TopNavBar, CTAs
- All pages have proper lang="id" declaration

#### Findings

**[CRITICAL] OG image /logo.png wrong dimensions everywhere**
- `src/app/layout.tsx` line 27 + every page metadata
- Logo PNG (square) used as OpenGraph. Facebook wants 1200×630, Twitter 1200×627
- All social shares render cropped, low-quality, or get rejected by Twitter
- Fix: Create `/public/images/og-banner.png` (1200×630px). Update all OG image arrays

**[MEDIUM] Geographic modifier lost on inner pages**
- `/faq`: "Pertanyaan yang Sering Diajukan (FAQ) | Pytafix" — no "Malang"
- Other inner pages inconsistently include location signal
- Fix: Add "Malang" or "Jawa Timur" to all meta descriptions

**[MEDIUM] Homepage missing Organization + WebSite + BreadcrumbList schema**
- Only LocalBusiness injected. Missing: Organization, WebSite/SearchBox, BreadcrumbList, FAQPage
- Fix: Add all three schemas to HomeClient.tsx

**[MEDIUM] Booking + Status pages have no schema**
- High-value transactional pages with no structured data
- Fix: WebApplication schema on booking. Hidden Thing schema on status page

**[LOW] Material Symbols loaded via raw link tag**
- `src/app/layout.tsx` lines 55-58 — not using next/font, no preconnect
- Fix: Add `preconnect` for fonts.googleapis.com, or replace with lucide-react

---

### 3. Content Quality — Score: 65

#### What's Working
- Service pages have good-length descriptions from CMS
- About page has company story, values, area coverage — good E-E-A-T signals
- tentang-kami mentions CV. Pyta Cipta Karya — establishes business legitimacy
- Contact page has full NAP (Name, Address, Phone) — critical for local SEO
- FAQ answers are adequate quality

#### Findings

**[CRITICAL] dangerouslySetInnerHTML on article pages — XSS risk**
- `src/app/(public)/artikel/[slug]/page.tsx` line 91: raw HTML from DB, no sanitization
- Malicious article content executes in user's browser
- Fix: `npm install isomorphic-dompurify` + `DOMPurify.sanitize(article.content)`

**[HIGH] Testimonials hardcoded in client component, not from database**
- `src/app/(public)/HomeClient.tsx` lines 605-647: 4 testimonials hardcoded in JSX
- Prisma has Testimonial model — data exists but unused on homepage
- Fix: Fetch `prisma.testimonial.findMany({ where: { isFeatured: true } })` in server page. Pass to HomeClient

**[MEDIUM] Homepage stats (5,000+ devices, 99% satisfied) unverified**
- `HomeClient.tsx` lines 497-519: hardcoded stats with no source
- Google E-E-A-T guidelines penalize unsubstantiated quantitative claims
- Fix: Make dynamic or remove numbers. Add AggregateRating if real

**[MEDIUM] Service page content plain text — no semantic HTML**
- `src/app/(public)/layanan/[slug]/page.tsx` lines 159-169: `whitespace-pre-wrap` renders all text as one block
- No heading hierarchy, no lists, poor readability
- Fix: Use remark/rehype if CMS supports Markdown. Preprocess plain text for bullet patterns

**[LOW] Portfolio page no schema, no OG metadata on listing**
- `src/app/(public)/portofolio/page.tsx` — no JSON-LD, no OpenGraph
- Fix: Add CreativeWork or ItemList schema. Add metadata export

---

### 4. Schema / Structured Data — Score: 58

#### What's Working
- LocalBusiness JSON-LD on homepage (geo, hours, contact, social)
- Service schema on layanan/[slug] pages
- Article schema on artikel/[slug] pages
- FAQPage schema on /faq
- All injected as `<script type="application/ld+json">` — correct approach

#### Findings

**[HIGH] No Organization schema — LocalBusiness orphaned**
- HomeClient.tsx LocalBusiness stands alone with no parent entity
- No link to CV. Pyta Cipta Karya, no link between pytafix and sister sites
- Fix: Add Organization schema as parent entity

**[HIGH] WebSite + SearchAction missing — no search rich result**
- No WebSite schema anywhere — Google's Sitelinks search box won't fire
- Fix: Add WebSite with SearchAction pointing to internal search

**[MEDIUM] No Product/Offer schema for sparepart pages**
- Price, stock, category displayed but no JSON-LD
- No Shopping tab / Product rich results eligibility
- Fix: Add Product schema with offers array

**[MEDIUM] BreadcrumbList missing from all detail pages**
- sparepart/[id] has visual breadcrumbs but no JSON-LD
- Fix: Add BreadcrumbList on detail pages (sparepart, layanan, artikel, promo)

**[MEDIUM] Service schema missing priceSpecification**
- layanan/[slug] Service schema lacks hasOfferCatalog, priceRange
- Fix: Add `priceRange: "$$"` and hasOfferCatalog

**[MEDIUM] FAQPage schema only on /faq — homepage FAQ section undeclared**
- 4 FAQ items on homepage visible to users but invisible to crawlers
- Fix: Add FAQPage JSON-LD in HomeClient.tsx

**[LOW] Author schema lacks depth on article pages**
- Only `name` field — no jobTitle, no sameAs social links
- Fix: Add `"jobTitle": "Tim Teknisi Pytafix"` and social sameAs

---

### 5. Performance (CWV) — Score: 50

#### What's Working
- Next/Image used for hero, Unsplash, sparepart thumbnails with sizes attributes
- Hero image has `priority` prop — correct LCP optimization
- ISR revalidate on homepage (60s) and dynamic pages (3600s)
- No render-blocking CSS (Tailwind is utility-first)
- Framer Motion animations trigger on viewport intersection

#### Findings

**[HIGH] Brand marquee uses raw `<img>` from external CDN**
- `src/app/(public)/HomeClient.tsx` line 136: 20 brand icons via `<img src="cdn.simpleicons.org">`
- Bypasses Next.js image optimization pipeline entirely
- No lazy loading, no format conversion, CLS risk from missing dimensions
- Fix: Download SVGs to `/public/brand-icons/`. Use Next/Image with `unoptimized` for SVG

**[HIGH] No Core Web Vitals measurement**
- Zero LCP/CLS/INP data. No @vercel/web-vitals, no Lighthouse CI
- Performance state unknown
- Fix: Install `@vercel/web-vitals`. Set up Lighthouse CI. Target: LCP < 2.5s, INP < 200ms, CLS < 0.1

**[MEDIUM] Material Symbols icon font blocks rendering**
- `src/app/layout.tsx` lines 55-58 — no preconnect, render-blocking
- Fix: Add `rel="preconnect"`. Or replace with lucide-react (already installed, tree-shakeable)

**[MEDIUM] No bundle analysis setup**
- Can't verify framer-motion tree-shaking or client bundle bloat
- Fix: Add `@next/bundle-analyzer`. Run weekly to monitor

**[LOW] SparepartClient + BookingClient data fetching unknown**
- Not reviewed — if client-side fetch-on-mount, bypasses ISR and hammers Neon DB
- Fix: Verify both use server-props data, not client-side fetches

---

### 6. Backend / API / Security — Score: 42

#### What's Working
- Admin routes protected by middleware with JWT verification
- JWT uses httpOnly, secure, sameSite=strict cookies
- jose library for JWT — standard HS256
- Prisma singleton pattern prevents connection pool exhaustion
- Neon PostgreSQL uses SSL mode

#### Findings

**[CRITICAL] google-service-account.json committed to repository**
- `pytafix-web/google-service-account.json` — GCP credentials exposed publicly
- IMMEDIATE: (1) Revoke key in GCP Console (2) Remove file (3) Add to .gitignore (4) Use Vercel Env Vars (5) Scrub from git history with BFG

**[CRITICAL] ADMIN_PASSWORD='admin' + weak JWT_SECRET in committed .env**
- `.env` lines 5-6: predictable credentials
- IMMEDIATE: (1) `openssl rand -base64 24` for ADMIN_PASSWORD (2) `openssl rand -base64 32` for JWT_SECRET (3) Move to Vercel Env Vars

**[HIGH] No rate limiting on public API endpoints**
- `/api/booking`, `/api/warranty`, `/api/status` — floodable
- No CAPTCHA on forms
- Fix: @upstash/ratelimit or Vercel Edge rate limiting. Add honeypot + hCaptcha to booking

**[HIGH] Status API exposes full PII without authentication**
- `src/app/api/status/route.ts`: GET returns name, address, whatsapp, problem without auth
- Tracking IDs are guessable — full booking record enumeration possible
- Fix: Return only `{ status, updatedAt }` publicly. Rate limit per IP. Full record needs session

**[HIGH] Database credentials in committed .env**
- `.env` lines 3-4: Neon PostgreSQL connection strings visible
- Fix: Rotate Neon credentials. Use Vercel Environment Variables only

**[HIGH] .gitignore incomplete**
- Evidence: google-service-account.json + .env both committed
- Fix: Audit .gitignore. Block all `*.json` in root except package.json. Block all `.env*`

**[MEDIUM] No CORS configuration**
- API routes don't set explicit allowed origins
- Fix: next.config.ts CORS headers restricting to pytafix.web.id

**[MEDIUM] Booking API validates only presence, not format**
- No Zod validation, no phone regex, no length limits
- Fix: Apply `serviceRequestSchema` from `lib/validations.ts` in API route

**[MEDIUM] Logout has no CSRF protection**
- POST /api/auth/logout callable from any origin
- Fix: Add SameSite=Strict (already has) + ensure Referer validation

---

### 7. Images & Media — Score: 52

#### What's Working
- Next/Image used for most images with fill + sizes attributes
- Hero has priority prop
- alt text present on all images
- Unsplash images have format/quality params

#### Findings

**[HIGH] Brand icon images use raw `<img>` tags — no optimization**
- `src/app/(public)/HomeClient.tsx` line 136: external CDN images bypass Next.js pipeline
- Fix: Download SVGs locally → `/public/brand-icons/`. Use Next/Image with remotePatterns for CDN

**[MEDIUM] OG image /logo.png not optimized for web**
- Logo PNG likely large, uncompressed
- Fix: Export 1200×630 WebP OG banner, < 1MB

**[MEDIUM] Sparepart images — unknown aspect ratio containers**
- SparepartClient.tsx (not reviewed) — potential CLS from missing dimensions
- Fix: Ensure all sparepart image containers have `aspect-ratio` CSS

---

### 8. AI Search Readiness (GEO) — Score: 48

#### What's Working
- LocalBusiness schema provides entity signals for AI crawlers
- Clear NAP consistency across pages
- FAQPage schema for Q&A retrieval
- About page mentions CV. Pyta Cipta Karya

#### Findings

**[HIGH] No llms.txt or AI-accessible content endpoint**
- Google AI Overviews, ChatGPT, Perplexity cannot easily parse site content
- Fix: Create `src/app/llms.txt/route.ts` returning plain-text site summary. Add `Allow: /llms.txt` in robots.txt

**[MEDIUM] Business hours inconsistently stated**
- kontak/page.tsx, HomeClient LocalBusiness, tentang-kami — three different sources
- Fix: Single source of truth. Update LocalBusiness openingHoursSpecification

**[MEDIUM] HowTo schema missing for service process**
- "How it Works" section (4 steps) has no HowTo structured data
- Fix: Add HowTo JSON-LD with 4 HowToStep items

**[LOW] Article author lacks authority depth**
- Only name field — no jobTitle, no sameAs social links
- Fix: Add jobTitle + social sameAs to Person schema

---

## FRONTEND-BACKEND INTEGRATION MAP

```
Next.js 16 App Router (SSR/ISR)
│
├── Root Layout (layout.tsx)
│   ├── metadata: title, OG, Twitter, canonical ✅
│   ├── lang="id" ✅
│   ├── Material Symbols font link ⚠️ raw tag
│   └── Toaster (sonner) ✅
│
├── Public Layout (layout.tsx in (public)/)
│   ├── TopNavBar.tsx (client, usePathname) ✅
│   ├── Footer.tsx (server) ✅
│   ├── GlobalCTA.tsx (client, usePathname) ✅
│   └── FloatingWA.tsx (client, usePathname) ✅
│
├── Static Public Pages (SSR via Prisma)
│   ├── /page.tsx → HomeClient (client) → revalidate:60 ✅
│   ├── /layanan → service grid ✅
│   ├── /layanan/[slug] → service detail + Service schema ✅
│   ├── /tentang-kami → company info ✅
│   ├── /kontak → contact + Google Maps ⚠️ generic query
│   ├── /faq → FAQPage schema ✅
│   ├── /portofolio → revalidate:3600 ✅
│   ├── /testimoni → from DB ✅
│   ├── /syarat-ketentuan → from DB Setting ✅
│   └── /kebijakan-privasi → from DB Setting ✅
│
├── Dynamic Public Pages
│   ├── /artikel/page.tsx → revalidate:3600 ✅
│   ├── /artikel/[slug] → Article schema ⚠️ dangerouslySetInnerHTML XSS
│   ├── /promo/page.tsx ✅
│   ├── /promo/[slug] ✅
│   ├── /sparepart/page.tsx → SparepartClient ⚠️ unknown data fetch
│   ├── /sparepart/[id] → ⚠️ integer ID, needs slug
│   ├── /booking-servis → BookingClient ⚠️ unknown data fetch
│   ├── /cek-status-servis → CekStatusClient ⚠️ unknown data fetch
│   └── /klaim-garansi → KlaimGaransiPage ✅
│
├── Public API Routes
│   ├── POST /api/booking → ⚠️ no Zod validation, no rate limit
│   ├── GET /api/status → ⚠️ PII leak, no auth, no rate limit
│   ├── POST /api/warranty → ⚠️ no rate limit
│   ├── POST /api/auth/login → ⚠️ weak fallback JWT secret
│   └── POST /api/auth/logout → ⚠️ no CSRF protection
│
├── Admin Routes (JWT protected)
│   ├── /admin/login → ⚠️ hardcoded ADMIN_PASSWORD='admin'
│   └── /admin/(authenticated)/* → 8 admin pages (dashboard, services,
│       promos, articles, portfolios, spareparts, faqs, testimonials,
│       requests, warranty, settings)
│
├── Database (Prisma + Neon PostgreSQL)
│   ├── ServiceContent ✅ (isActive, slug, title, description, content)
│   ├── Sparepart ⚠️ (integer @id, needs slug)
│   ├── Promo ✅ (isActive, isFeatured, slug)
│   ├── Article ✅ (slug, author)
│   ├── Portfolio ✅
│   ├── Faq ✅ (isActive)
│   ├── Testimonial ⚠️ (not used on homepage)
│   ├── ServiceRequest ✅
│   ├── WarrantyClaim ✅
│   └── Setting ✅
│
├── Sitemap (sitemap.ts) ⚠️ stale fallbackDate ⚠️ location permutations
├── Robots (robots.ts) ✅
├── next.config.ts ✅ security headers ✅ image remotePatterns ✅
└── middleware.ts ✅ JWT auth on admin routes ✅
```

---

## URL INVENTORY

| URL | Type | Has Metadata | Has Schema | ISR Revalidate |
|---|---|---|---|---|
| `/` | Homepage | ✅ | ✅ LocalBusiness | 60s ✅ |
| `/layanan` | Listing | ✅ | ❌ | SSR |
| `/layanan/[slug]` | Detail | ✅ | ✅ Service | SSR |
| `/layanan/[slug]-[location]` | Detail | ✅ | ✅ Service | SSR ⚠️ dup |
| `/booking-servis` | Form | ✅ | ❌ | — |
| `/cek-status-servis` | Form | ✅ | ❌ | — |
| `/promo` | Listing | ✅ | ❌ | SSR |
| `/promo/[slug]` | Detail | ✅ | ❌ | SSR |
| `/portofolio` | Listing | ✅ | ❌ | 3600s |
| `/artikel` | Listing | ✅ | ❌ | 3600s |
| `/artikel/[slug]` | Detail | ✅ | ✅ Article ⚠️ XSS | 3600s |
| `/sparepart` | Listing | ✅ | ❌ | SSR |
| `/sparepart/[id]` | Detail | ✅ | ❌ ⚠️ int ID | SSR |
| `/faq` | Listing | ✅ | ✅ FAQPage | SSR |
| `/tentang-kami` | Static | ✅ | ❌ | — |
| `/kontak` | Static | ✅ | ❌ | — |
| `/testimoni` | Listing | ✅ | ❌ | SSR |
| `/syarat-ketentuan` | Static | ✅ | ❌ | SSR |
| `/kebijakan-privasi` | Static | ✅ | ❌ | SSR |
| `/klaim-garansi` | Form | ✅ | ❌ | — |

---

## SCORING RATIONALE

- **Technical SEO (55)**: Good foundation — robots, sitemap, headers, canonical. Deducted for sitemap date, location permutations, sparepart URL, no GSC
- **Content Quality (65)**: CMS-driven content is decent. Deducted for XSS vector, hardcoded testimonials, unverified stats
- **On-Page SEO (62)**: Titles and meta consistent. Deducted for OG image, missing homepage schema, booking/status schema
- **Schema (58)**: LocalBusiness + Article + FAQ good. Deducted for missing Organization, SearchAction, Product, BreadcrumbList
- **Performance (50)**: Hero image optimized. Deducted for brand marquee, no CWV measurement, unknown client data fetching
- **Backend/Security (42)**: Auth is well-structured. Deducted heavily for committed credentials, weak passwords, no rate limiting, PII leak
- **Images (52)**: Next/Image mostly used. Deducted for raw img tags on brand icons, OG image quality
- **GEO (48)**: LocalBusiness + FAQ good for AI. Deducted for no llms.txt, inconsistent hours, no HowTo

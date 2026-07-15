# ACTION PLAN — PYTAFIX.WEB.ID SEO AUDIT

## HOW TO USE THIS PLAN
Priority order: Security first (always), then SEO quick wins, then content/schema, then monitoring.

---

## PHASE 1: CRITICAL SECURITY FIXES — Do Today

### S1.1: GCP Service Account — REMEDIATE NOW
```
1. Go to Google Cloud Console → IAM → Service Accounts → find the key
2. Delete the key immediately
3. rm pytafix-web/google-service-account.json
4. Add "google-service-account.json" to .gitignore
5. Git: git filter-branch --force --index-filter "git rm --cached --ignore-unmatch google-service-account.json" --prune-empty --tag-name-filter cat -- --all
   OR use BFG Repo-Cleaner: java -jar bfg.jar --delete-files google-service-account.json
6. In Vercel dashboard: Environment Variables → add GOOGLE_APPLICATION_CREDENTIALS pointing to env var
```

### S1.2: Auth Credentials — CHANGE NOW
```bash
# Generate strong ADMIN_PASSWORD
openssl rand -base64 24
# Result: e.g. "Kx9mP2vN3qR8sT5wZ7yB..."

# Generate strong JWT_SECRET
openssl rand -base64 32
# Result: e.g. "a1B2c3D4e5F6g7H8i9J0k..."

# In Vercel Environment Variables:
ADMIN_PASSWORD = (new strong value from above)
JWT_SECRET = (new strong value from above)

# Update .env to:
ADMIN_PASSWORD=CHANGE_ME_USE_STRONG_PASSWORD
JWT_SECRET=CHANGE_ME_USE_STRONG_SECRET
```

### S1.3: Database Credentials Rotation
```
1. Go to Neon.tech dashboard → your database project
2. Security tab → Rotate connection strings
3. Update Vercel Environment Variables with new POSTGRES_PRISMA_URL
4. Delete old connection string references
5. Remove from .env file entirely
```

### S1.4: Rate Limiting on Public APIs
```bash
npm install @upstash/ratelimit @upstash/redis
```
Create `src/lib/rate-limit.ts`:
```ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 m"), // 10 req/min per IP
});

export default ratelimit;
```
Apply to booking, status, warranty API routes.

### S1.5: Fix Status API PII Leak
In `src/app/api/status/route.ts`:
```ts
// Return only public-safe fields
return NextResponse.json({
  status: serviceRequest.status,
  updatedAt: serviceRequest.updatedAt,
  technicianNotes: serviceRequest.technicianNotes, // only if not sensitive
}, { status: 200 });
```
Add rate limiting (S1.4).

---

## PHASE 2: SEO QUICK WINS — Week 1-2

### S2.1: OG Banner Image (30 min)
1. Create `/public/images/og-banner.png` at **1200×630px**
2. Include: Pytafix logo, tagline "Servis Laptop, HP & Komputer di Malang", brand colors
3. Export as WebP: `/public/images/og-banner.webp` (target < 300KB)
4. Update in `src/app/layout.tsx`:
```ts
images: [{ url: "/images/og-banner.webp", width: 1200, height: 630, alt: "Pytafix - Servis Elektronik Malang" }]
```
5. Update all page metadata files with same image

### S2.2: Fix Sitemap Fallback Date (5 min)
```ts
// src/app/sitemap.ts line 7
const fallbackDate = new Date(); // Current date, not 2024-06-01
```

### S2.3: Remove Location Permutation URLs (5 min)
Delete lines 58-65 in `src/app/sitemap.ts` (the location permutation loop).

### S2.4: Brand Marquee — Next/Image (1 hour)
1. Download SVG icons for brands to `/public/brand-icons/` (apple.svg, samsung.svg, etc.)
2. Update `HomeClient.tsx`:
```tsx
import AppleIcon from "@/public/brand-icons/apple.svg";
// ... import all needed

const brands = ["apple", "samsung", "asus", ...];

// In JSX:
<Image
  src={brandIcons[brand]}
  alt={brand}
  width={80}
  height={40}
  className="max-h-10 max-w-full object-contain"
/>
```

### S2.5: Add Organization + WebSite Schema (30 min)
Add to `HomeClient.tsx` alongside existing LocalBusiness:
```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{
  __html: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CV. Pyta Cipta Karya",
    "url": "https://pytagotech.com",
    "sameAs": [
      "https://www.pytafix.web.id",
      "https://www.pytabelajar.web.id",
      "https://www.instagram.com/pytafix",
      "https://www.facebook.com/pytafix"
    ]
  })
}} />

<script type="application/ld+json" dangerouslySetInnerHTML={{
  __html: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Pytafix",
    "url": "https://www.pytafix.web.id",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.pytafix.web.id/layanan?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  })
}} />
```

### S2.6: Sanitize Article Content (20 min)
```bash
npm install isomorphic-dompurify
```
```tsx
// artikel/[slug]/page.tsx
import DOMPurify from 'isomorphic-dompurify';

// In the render:
<div dangerouslySetInnerHTML={{
  __html: DOMPurify.sanitize(article.content)
}} />
```

### S2.7: Dynamic Homepage Testimonials (1 hour)
In `src/app/page.tsx`:
```tsx
const testimonials = await prisma.testimonial.findMany({
  where: { isFeatured: true },
  take: 10,
});
return <HomeClient promos={promos} spareparts={spareparts} testimonials={testimonials} />;
```
Update `HomeClient.tsx` to accept and render testimonials prop.

---

## PHASE 3: CONTENT & SCHEMA — Weeks 3-4

### S3.1: Sparepart Slug Migration
1. Add migration: `npx prisma migrate dev --name add_sparepart_slug`
2. In schema.prisma Sparepart model:
```prisma
slug String @unique
```
3. Create seed script to generate slugs from existing names
4. Update route: `src/app/(public)/sparepart/[slug]/page.tsx`
5. Update sitemap.ts
6. Add 301 redirects for old /sparepart/[id] URLs in next.config.ts

### S3.2: FAQPage Schema on Homepage
Add FAQPage JSON-LD in HomeClient.tsx for the 4 inline FAQ items.

### S3.3: HowTo Schema on Homepage
Add HowTo JSON-LD for the "How it Works" 4-step section.

### S3.4: Product Schema for Spareparts
Add Product + Offer JSON-LD in `src/app/(public)/sparepart/[id]/page.tsx`.

### S3.5: BreadcrumbList Schema
Add to detail pages: layanan/[slug], sparepart/[id], artikel/[slug], promo/[slug].

### S3.6: Fix Google Maps Embed
```tsx
<iframe
  src="https://maps.google.com/maps?q=-7.983908,112.621391&z=17&ie=UTF8&output=embed"
  ...
/>
```

### S3.7: Standardize Business Hours
Ensure kontak page + LocalBusiness openingHoursSpecification are identical.

---

## PHASE 4: PERFORMANCE & MONITORING — Month 2

### S4.1: Install Vercel Analytics
```bash
npm install @vercel/analytics
```
```tsx
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
// In body:
<Analytics />
```

### S4.2: Add Bundle Analyzer
```bash
npm install @next/bundle-analyzer
```
```js
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
```

### S4.3: Create llms.txt for AI Crawlers
Create `src/app/llms.txt/route.ts` returning plain-text site summary.

### S4.4: Replace Material Symbols with Lucide (optional)
Replace `<span className="material-symbols-outlined">icon</span>` with `<Icon />` from lucide-react.

### S4.5: GSC Verification
Add GSC HTML verification tag in `src/app/layout.tsx` metadata.

---

## EFFORT VS IMPACT MATRIX

| Fix | Effort | Impact | Priority |
|---|---|---|---|
| Revoke GCP keys + rotate secrets | 1h | CRITICAL | P1 |
| Strong ADMIN_PASSWORD + JWT_SECRET | 10min | CRITICAL | P1 |
| Rate limit APIs | 2h | HIGH | P1 |
| OG Banner Image | 1h | HIGH | P1 |
| Article XSS sanitization | 30min | HIGH | P1 |
| Fix sitemap fallbackDate | 5min | HIGH | P2 |
| Remove location permutations | 5min | HIGH | P2 |
| Brand marquee Next/Image | 1h | HIGH | P2 |
| Organization + WebSite schema | 1h | HIGH | P2 |
| Dynamic testimonials | 1h | MEDIUM | P2 |
| Sparepart slug migration | 4h | MEDIUM | P3 |
| Product schema sparepart | 2h | MEDIUM | P3 |
| FAQPage homepage | 1h | MEDIUM | P3 |
| Google Maps fix | 10min | LOW | P3 |
| Bundle analyzer | 1h | LOW | P4 |
| Vercel Analytics | 30min | LOW | P4 |
| llms.txt | 2h | MEDIUM | P3 |

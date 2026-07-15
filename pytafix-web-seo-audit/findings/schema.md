# Schema / Structured Data Findings

## HIGH

### 1. Organization schema missing — LocalBusiness not linked to parent entity
- **File**: `src/app/(public)/HomeClient.tsx`
- **Issue**: LocalBusiness stands alone. No parent Organization, no link to CV. Pyta Cipta Karya, no nested branches
- **Fix**: Add Organization schema:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CV. Pyta Cipta Karya",
  "url": "https://pytagotech.com",
  "sameAs": ["https://www.pytafix.web.id", "https://www.pytabelajar.web.id"]
}
```
Nest LocalBusiness under sameAs or create parent Organization with branch LocalBusiness

### 2. WebSite + SearchAction missing — no internal site search rich result
- **File**: `src/app/(public)/HomeClient.tsx`
- **Issue**: No WebSite schema for Google Sitelinks search box
- **Fix**: Add WebSite schema in root layout or homepage:
```json
{
  "@type": "WebSite",
  "name": "Pytafix",
  "url": "https://www.pytafix.web.id",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.pytafix.web.id/layanan?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

## MEDIUM

### 3. No Product/Offer schema for sparepart pages
- **File**: `src/app/(public)/sparepart/[id]/page.tsx`
- **Issue**: Price, stock, category displayed but no JSON-LD. No Shopping tab / Product rich results
- **Fix**: Add Product schema:
```json
{
  "@type": "Product",
  "name": "...",
  "description": "...",
  "image": "...",
  "offers": {
    "@type": "Offer",
    "price": "...",
    "priceCurrency": "IDR",
    "availability": "https://schema.org/InStock"
  }
}
```

### 4. BreadcrumbList schema missing from all pages
- **Issue**: sparepart/[id] has visual breadcrumbs but no JSON-LD BreadcrumbList
- **Fix**: Add BreadcrumbList on sparepart/[id], layanan/[slug], artikel/[slug], promo/[slug]

### 5. Service schema on layanan/[slug] missing priceSpecification
- **File**: `src/app/(public)/layanan/[slug]/page.tsx`
- **Issue**: Service schema lacks hasOfferCatalog, availableChannel, priceRange
- **Fix**: Add `priceRange: "$$"` and `hasOfferCatalog` to Service schema

### 6. sameAs missing Google Business Profile link
- **File**: `src/app/(public)/HomeClient.tsx`
- **Issue**: Social links present but no Google Business Profile URL if one exists
- **Fix**: Create/claim Google Business Profile for Pytafix. Add URL to sameAs array

### 7. FAQPage schema only on /faq — homepage FAQ section has no schema
- **File**: `src/app/(public)/HomeClient.tsx`
- **Issue**: 4 FAQ items visible on homepage but no FAQPage JSON-LD
- **Fix**: Add FAQPage schema in HomeClient mirroring the 4 FAQItem components

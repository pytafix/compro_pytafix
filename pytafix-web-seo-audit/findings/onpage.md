# On-Page SEO Findings

## CRITICAL

### 1. OG image /logo.png used universally — wrong dimensions
- **File**: `src/app/layout.tsx` line 27 + all page metadata files
- **Issue**: Logo PNG (square favicon-style) used as OpenGraph image. Facebook recommends 1200×630px, Twitter 1200×627px. Current renders cropped/poor quality
- **Fix**: Create dedicated 1200×630 OG banner. Store at `/public/images/og-banner.png`. Update all `images` arrays in OpenGraph metadata

## HIGH

*(none)*

## MEDIUM

### 2. Homepage title loses geographic modifier on inner pages
- **File**: Multiple page files
- **Issue**: `/faq` title "Pertanyaan yang Sering Diajukan (FAQ) | Pytafix" — no "Malang" signal. `/layanan` has it, `/tentang-kami` has it, but many don't
- **Fix**: Add "Malang" or "Jawa Timur" to meta descriptions on all inner pages

### 3. Homepage missing Organization + WebSite + BreadcrumbList schema
- **File**: `src/app/(public)/HomeClient.tsx`
- **Issue**: Only LocalBusiness JSON-LD injected. Missing: Organization (parent entity), WebSite with SearchAction, BreadcrumbList, FAQPage for homepage FAQ section
- **Fix**: Add Organization schema. Add WebSite schema with SearchBox. Add FAQPage schema. Add BreadcrumbList

### 4. No Schema on /booking-servis and /cek-status-servis
- **Issue**: High-value transactional pages with no structured data
- **Fix**: Add WebApplication schema on booking. Add Thing/Service schema on status page

### 5. Material Symbols font loaded via raw link tag
- **File**: `src/app/layout.tsx` lines 55-58
- **Issue**: Not using next/font, no preconnect, no swap
- **Fix**: Use next/font for Manrope covers this. Add preconnect for fonts.googleapis.com. Consider replacing with lucide-react icons (already installed)

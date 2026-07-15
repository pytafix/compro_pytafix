# Technical SEO Findings

## CRITICAL

### No Critical items in Technical SEO

## HIGH

### 1. Sitemap uses stale fallback date 2024-06-01
- **File**: `src/app/sitemap.ts` line 7
- **Issue**: `const fallbackDate = new Date('2024-06-01')` — all static pages report outdated lastModified to Google
- **Fix**: Use `new Date()` as fallbackDate for static pages
- **Impact**: Google may deprioritize "stale" pages in crawl budget

### 2. Sparepart detail URL uses numeric ID (/sparepart/123)
- **File**: `src/app/(public)/sparepart/[id]/page.tsx` lines 41-43
- **File**: `src/app/sitemap.ts` lines 82-87
- **Issue**: Prisma Sparepart `@id` is auto-increment integer. URLs expose DB internals, provide zero keyword value
- **Fix**: Add `slug String @unique` to Sparepart model. Route → `/sparepart/[slug]`. Update sitemap

### 3. Location permutation sitemap — near-duplicate content risk
- **File**: `src/app/sitemap.ts` lines 59-65
- **Issue**: Each service × 15 locations = N×15 URLs. All identical content with just location name swapped. Google may penalize as doorway pages
- **Fix**: Remove location permutation generation. Keep only base `/layanan/[slug]` URLs

## MEDIUM

### 4. Google Maps embed uses generic 'Malang' query
- **File**: `src/app/(public)/kontak/page.tsx` line 109
- **Issue**: `q=Malang` does not pin to actual address
- **Fix**: Use `q=-7.983908,112.621391` (from LocalBusiness geo in homepage schema)

### 5. No Vercel Analytics or GSC integration
- **Issue**: Zero performance monitoring
- **Fix**: Install `@vercel/analytics`. Add GSC HTML verification tag in layout metadata

### 6. No Content-Language HTTP header
- **Issue**: Only `lang="id"` in HTML, no server-side Content-Language header
- **Fix**: Add to Vercel headers config: `Content-Language: id-ID`

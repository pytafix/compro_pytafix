# Performance Findings

## HIGH

### 1. Brand marquee uses raw <img> from external CDN — no Next.js optimization
- **File**: `src/app/(public)/HomeClient.tsx` line 136
- **Issue**: `<img src="https://cdn.simpleicons.org/${brand}">` for 20 brand logos. Bypasses Next.js image pipeline. No lazy loading. No format conversion. No width/height = CLS risk
- **Fix**: Download SVGs to `/public/brand-icons/`. Use Next/Image. Configure `cdn.simpleicons.org` as remotePattern in next.config.ts with `formats: ['webp', 'svg']`

### 2. No Core Web Vitals measurement
- **Issue**: No @vercel/web-vitals, no CrUX pipeline, no Lighthouse CI
- **Fix**: Install `@vercel/web-vitals`. Add Lighthouse CI to Vercel deployment. Target: LCP < 2.5s, INP < 200ms, CLS < 0.1

## MEDIUM

### 3. Material Symbols icon font blocks rendering
- **File**: `src/app/layout.tsx` lines 55-58
- **Issue**: Icon font loaded via raw link tag — no preconnect, no font-display control, render-blocking
- **Fix**: Add `rel="preconnect"` for fonts.googleapis.com. Or replace with lucide-react icons (already installed, tree-shakeable)

### 4. No bundle analysis setup
- **Issue**: Can't verify framer-motion tree-shaking, sonner bundle size, or client bundle bloat
- **Fix**: Add `@next/bundle-analyzer`. Run `ANALYZE=true npm run build` weekly to monitor

### 5. Booking and Sparepart client components — unknown data fetching pattern
- **Files**: `src/components/SparepartClient.tsx`, `src/app/(public)/booking-servis/BookingClient.tsx`
- **Issue**: Not reviewed. If these do client-side fetch-on-mount, they bypass ISR and hit Neon on every user page load — performance disaster
- **Fix**: Verify both use server-fetched data passed as props, not client-side fetches

## LOW

### 6. Hero image uses Unsplash URL with no cache headers from source
- **File**: `src/app/(public)/HomeClient.tsx` line 107-114
- **Issue**: `priority` prop is correct. But Unsplash CDN should be configured as a remotePattern with caching headers
- **Fix**: Already has `remotePatterns` for unsplash — verify Vercel edge cache headers are set for these images

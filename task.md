# Pytafix Backend# SEO Implementation Tasks

- [x] 1. Global & Static Metadata Optimization
  - [x] `src/app/layout.tsx`: Add canonical, twitter, rich OpenGraph, and expanded LocalBusiness Schema.
  - [x] Add `metadata` to `/promo`, `/portofolio`, `/artikel`, `/syarat-ketentuan`, `/kebijakan-privasi`, `/kontak`.
- [x] 2. Sitemap Configuration (`src/app/sitemap.ts`)
  - [x] Add missing static pages.
  - [x] Add dynamic routes for `Promo` and `Article`.
- [x] 3. Robots Configuration (`src/app/robots.ts`)
  - [x] Disallow `/admin/` and `/api/`.
- [x] 4. Structured Data on Dynamic Pages
  - [x] `/layanan/[slug]/page.tsx`: Add `Service` Schema.
  - [x] `/artikel/[slug]/page.tsx`: Add `Article` Schema.
  - [x] `/promo/[slug]/page.tsx`: Ensure metadata is complete.
- [/] 5. Verification
  - [ ] Run `npm run build`
  - [ ] Create walkthrough.scade

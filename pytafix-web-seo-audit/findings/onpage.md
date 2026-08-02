# On-Page SEO Findings

Audit state: 28 July 2026. Findings describe the current local source/build.

## Resolved locally

- A dedicated 1200×630 OG banner is used instead of the square logo; favicon and Apple touch icon are separate square assets.
- Canonical URLs, page titles, descriptions, Open Graph data, and Indonesian language metadata are centralized and no longer carry the old unsupported claims.
- Root Organization/ProfessionalService entities, WebSite/FAQ graphs, Article/Service/Product/Offer graphs, and detail breadcrumbs are present where the page type supports them.
- Empty archives and invalid/expired dynamic records receive `noindex`; the sitemap contains only reviewed candidates.
- Utility pages, admin routes, and API responses carry noindex boundaries without entering the public sitemap.

## Remaining architecture decisions

1. **Commerce IDs** — `/jual-beli/[id]` and `/sparepart/[id]` still expose database IDs. A slug migration needs a data/redirect plan and must not be introduced implicitly.
2. **Location facts** — public contact copy uses a customer-facing address label and visit guidance; verified local-business address data remains withheld until the pin/NAP conflict is resolved.
3. **Dynamic inventory freshness** — product/sparepart pages show `dateModified` and a price/stock confirmation note; production data still needs operational review.
4. **Post-deploy validation** — fetch representative pages, inspect rendered JSON-LD, validate OG images, and verify canonical/sitemap behavior in the deployed environment.

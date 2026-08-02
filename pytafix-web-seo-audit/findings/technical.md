# Technical SEO Findings

Audit state: 28 July 2026. Findings below reflect the current local source and build, not the deployed production site.

## Resolved locally

- Sitemap no longer emits the old hard-coded 2024 fallback date. Dynamic records use their `updatedAt` value, and database failure serves a reviewed static URL fallback.
- Location/service permutations are filtered from public service routes and the sitemap unless the slug is explicitly reviewed. This removes the previous doorway-page expansion risk.
- Public location data now publishes the owner-confirmed address and coordinates from the direct Pytafix Google Maps place URL; the short-link/preview conflict is resolved by the owner-provided place evidence.
- The root `ProfessionalService` schema emits `hasMap`, `PostalAddress`, `GeoCoordinates`, and service-area facts; public contact copy uses a customer-facing address label and visit guidance without exposing internal map-review language.
- AI-search access is explicit in `robots.txt`; `/admin/` and `/api/` remain disallowed while `/llms.txt` is allowed.
- FAQ answers are server-rendered in semantic `<details>` elements, and reviewed service pages render sanitized semantic content rather than raw stored markup.
- Missing dynamic commerce/article/service records return `noindex` metadata instead of creating indexable error URLs.

## Remaining before release

1. **Full post-deploy crawl and runtime verification** — the pushed commit is live and homepage/robots smoke checks pass. Complete the full sitemap crawl, API header checks, and environment-backed form/status tests before declaring production fully verified.
2. **Google Maps business-profile completeness** — the exact pin/address is now owner-confirmed and published; independently verify GBP categories, hours, ownership, and external NAP consistency before expanding local SEO.
3. **Field performance evidence** — run PageSpeed/CrUX after deployment; local build checks cannot establish real-user CWV.
4. **Indexing evidence** — verify sitemap processing and representative URLs in Search Console; a 200 response is not proof of indexing.
5. **URL architecture** — commerce detail routes still use database IDs. A slug migration would improve keyword context but requires a redirect/data migration plan and is not safe to do implicitly.
6. **Content depth and original evidence** — reviewed service and article pages remain short and need first-hand repair evidence, named reviewer credentials, and unique media before aggressive SEO expansion.

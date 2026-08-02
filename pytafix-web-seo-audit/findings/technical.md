# Technical SEO Findings

Audit state: 2 August 2026. Findings below combine the current source/build with the latest deployed production and GSC checks.

## Resolved locally

- Sitemap no longer emits the old hard-coded 2024 fallback date. Dynamic records use their `updatedAt` value, and database failure serves a reviewed static URL fallback.
- Location/service permutations are filtered from public service routes and the sitemap unless the slug is explicitly reviewed. This removes the previous doorway-page expansion risk.
- Public location data now publishes the owner-confirmed address and coordinates from the direct Pytafix Google Maps place URL; the short-link/preview conflict is resolved by the owner-provided place evidence.
- The root `ProfessionalService` schema emits `hasMap`, `PostalAddress`, `GeoCoordinates`, and service-area facts; public contact copy uses a customer-facing address label and visit guidance without exposing internal map-review language.
- AI-search access is explicit in `robots.txt`; `/admin/` and `/api/` remain disallowed while `/llms.txt` is allowed.
- FAQ answers are server-rendered in semantic `<details>` elements, and reviewed service pages render sanitized semantic content rather than raw stored markup.
- Missing dynamic commerce/article/service records return `noindex` metadata instead of creating indexable error URLs.

## Remaining before release

1. **Ongoing post-deploy verification** — the pushed commit is live; the 18-URL crawl, schema/copy checks, API headers, and environment-backed form/status probes pass. Continue monitoring after data/content changes.
2. **Google Maps business-profile completeness** — the owner confirms Pytafix ownership, exact pin/address, hours, and service options; keep categories and external NAP consistency synchronized before expanding local SEO.
3. **Field performance evidence** — CrUX currently has no eligible origin data; the bundled PageSpeed helper also failed on an `audit_details` parsing bug. Use direct PSI or wait for sufficient traffic; local build checks cannot establish real-user CWV.
4. **Indexing evidence** — the sitemap has completed processing with 0 errors/0 warnings and 18 submitted URLs; homepage, Kontak, and archives are indexed, while two canonical service details are discovered but not yet indexed. The old Batu URL remains a stale indexed redirect record. A 200 response is not proof of indexing.
5. **URL architecture** — commerce detail routes still use database IDs. A slug migration would improve keyword context but requires a redirect/data migration plan and is not safe to do implicitly.
6. **Content depth and original evidence** — reviewed service and article pages remain short and need first-hand repair evidence, named reviewer credentials, and unique media before aggressive SEO expansion.

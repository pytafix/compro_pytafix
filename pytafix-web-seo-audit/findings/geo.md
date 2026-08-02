# AI Search Readiness (GEO) Findings

Audit state: 28 July 2026. Current source is locally repaired; production and Google indexing remain unverified.

## Resolved locally

- `llms.txt` exposes reviewed services, FAQs, article excerpts, official references, contact channels, update dates when available, and a static fallback when the database is unavailable.
- `robots.txt` explicitly allows the site and `/llms.txt` to major answer/search crawlers while disallowing `/admin` and `/api`.
- FAQ answers and reviewed service passages are present in server-rendered HTML, making them available without client hydration.
- Unsupported city variants and unreviewed service/article records are kept out of public index candidates.
- Root Organization/ProfessionalService entities and page-level references are serialized safely and consistently.

## Remaining evidence gaps

1. **Google Maps conflict** — the provided short link text names a Malang listing, while the current preview exposes a conflicting Sidoarjo-area center. The link remains available for navigation, but the exact pin/NAP, categories, hours, and ownership require owner verification. Address and coordinates are withheld from verified business schema until then.
2. **Local proof** — there is no current verified GBP ownership export, review evidence, local citations, or post-deploy Maps/GBP consistency check.
3. **Citation depth** — `llms.txt` intentionally caps long passages; raise citation readiness with deeper, reviewer-attributed, first-hand content rather than fabricated claims.
4. **External truth** — GSC, CrUX, AI Overview/Perplexity visibility, and production crawl results must be rechecked after an authorized deployment.

## Release check

Confirm the listing pin and NAP first. Until then, keep public wording limited to the supplied address, service area, and customer-safe visit guidance; publish only facts that match the verified profile and rerun production/GSC checks.

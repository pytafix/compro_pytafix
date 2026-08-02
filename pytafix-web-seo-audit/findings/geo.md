# AI Search Readiness (GEO) Findings

Audit state: 28 July 2026. Current source is locally repaired; production and Google indexing remain unverified.

## Resolved locally

- `llms.txt` exposes reviewed services, FAQs, article excerpts, official references, contact channels, update dates when available, and a static fallback when the database is unavailable.
- `robots.txt` explicitly allows the site and `/llms.txt` to major answer/search crawlers while disallowing `/admin` and `/api`.
- FAQ answers and reviewed service passages are present in server-rendered HTML, making them available without client hydration.
- Unsupported city variants and unreviewed service/article records are kept out of public index candidates.
- Root Organization/ProfessionalService entities and page-level references are serialized safely and consistently.

## Remaining evidence gaps

1. **Google Maps evidence** — the owner supplied a direct Pytafix place URL and screenshots showing the Polehan, Blimbing, Kota Malang address, pin, hours, ownership, and service options. The exact address and coordinates are now published in verified business schema.
2. **Local proof** — ownership, address, hours, and service options are owner-confirmed; independent review evidence, external local citations, and a formal GBP export remain optional strengthening signals.
3. **Citation depth** — `llms.txt` intentionally caps long passages; raise citation readiness with deeper, reviewer-attributed, first-hand content rather than fabricated claims.
4. **External truth** — GSC, CrUX, AI Overview/Perplexity visibility, and production crawl results must be rechecked after an authorized deployment.

## Release check

The pin, address, hours, service options, and ownership are now owner-confirmed. Keep the public facts synchronized with the profile and build external citations before expanding the local cluster.

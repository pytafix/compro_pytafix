# AI Search Readiness (GEO) Findings

Audit state: 2 August 2026. Source, production crawl, robots/llms surfaces, and Google Search Console were rechecked.

## Resolved locally and in production

- `llms.txt` exposes reviewed services, FAQs, article excerpts, official references, contact channels, update dates when available, and a static fallback when the database is unavailable.
- `robots.txt` explicitly allows the site and `/llms.txt` to major answer/search crawlers while disallowing `/admin` and `/api`.
- FAQ answers and reviewed service passages are present in server-rendered HTML, making them available without client hydration.
- Unsupported city variants and unreviewed service/article records are kept out of public index candidates.
- Root Organization/ProfessionalService entities and page-level references are serialized safely and consistently.
- Public copy scans found no customer-facing brief, audit, preview, internal alignment, or workflow-publication language in the 18 sitemap pages, `llms.txt`, or `robots.txt`.

## Remaining evidence gaps

1. **Google Maps evidence** - the owner supplied a direct Pytafix place URL and screenshots showing the Polehan, Blimbing, Kota Malang address, pin, hours, ownership, and service options. The exact address and coordinates are now published in verified business schema.
2. **Local proof** - ownership, address, hours, and service options are owner-confirmed; independent review evidence, external local citations, and a formal GBP export remain optional strengthening signals.
3. **Citation depth** - `llms.txt` intentionally caps long passages; raise citation readiness with deeper, reviewer-attributed, first-hand content rather than fabricated claims.
4. **Indexing evidence** - production crawl passes 18 sitemap URLs; GSC sitemap processing has 0 errors/0 warnings, while two canonical service pages remain discovered but not indexed. CrUX and direct AI Overview/Perplexity citation visibility remain unavailable.

## Release check

The pin, address, hours, service options, and ownership are now owner-confirmed. Keep the public facts synchronized with the profile and build external citations before expanding the local cluster.

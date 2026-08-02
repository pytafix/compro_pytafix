# Schema / Structured Data Findings

Audit state: 28 July 2026. Current local source/build is the reference; production still needs a post-deploy fetch and validator pass.

## Resolved locally

- Root `Organization` and `ProfessionalService` entities use stable `@id` references; the professional service links to the legal organization and service area.
- `PostalAddress` and `GeoCoordinates` now use the owner-confirmed Maps place evidence; `hasMap` points to the direct Pytafix place URL.
- Homepage WebSite and FAQ graphs, article author/publisher references, service graphs, Product/Offer graphs, promo Offer graphs, and detail BreadcrumbList graphs are emitted for the relevant page types.
- JSON-LD passes through a shared serializer that escapes `<` and prevents script breakout.
- Fake brands, ratings, logo dimensions, and unsupported business claims were removed; the opening-hours schema now matches the owner-provided Google Maps schedule, including Sunday hours.

## Remaining evidence gaps

1. **Business entity proof** — pin, NAP, hours, service options, and GBP ownership are owner-confirmed; keep legal-entity references, categories, and external citation consistency synchronized.
2. **Author authority** — generic editorial attribution is not the same as a named expert. Add verifiable reviewer/author details only when the owner can substantiate them.
3. **Ratings and reviews** — do not add AggregateRating or Review schema until the underlying consented, representative dataset is real and maintained.
4. **Production validation** — rerun Schema Markup Validator/Rich Results checks on deployed HTML; local build validity is not Google eligibility or indexing.

## Deliberate omissions

HowTo, price ranges, and broad service guarantees are not emitted where the source has no stable, verified values. Adding plausible-looking schema would create a trust and policy risk.

# Pytafix Full-System, SEO, AEO/GEO, and Content Audit

Audit date: 28 July 2026
Repository baseline: `3c37fb1`
Production audited: `https://www.pytafix.web.id`
Local implementation: committed as `1565654` and deployed to the linked Vercel production project

## Executive summary

### Location evidence update — 2 August 2026

The owner supplied a direct Google Maps place URL and screenshot for Pytafix at Jl. Werkudoro No.2, RT.2/RW.2, Polehan, Kec. Blimbing, Kota Malang, Jawa Timur 65121. The confirmed place coordinates are `-7.9854846, 112.6422118`; the source now publishes the matching address, `GeoCoordinates`, direct place URL, and coordinate-based map embed.

The deployed baseline scored **57/100 for technical SEO** and contained material trust, privacy, and index-quality risks. The repaired build scores **84/100 overall readiness** and is now deployed to the linked Vercel production project. The gap to a production-ready 100 is not cosmetic: it requires confirmation of the remaining business facts, production environment/runtime verification for the distributed limiter and media store, removal/deactivation of legacy geo rows in the database, and a complete post-deploy crawl.

The most serious baseline issues were:

1. Forty near-identical location/service records with average normalized similarity of 0.969 and an inferred route system capable of resolving hundreds of unapproved variants.
2. Placeholder street address and coordinates published as business truth.
3. Fabricated or unsupported review counts, success rates, certifications, experience, warranty durations, turnaround times, and “original” component claims.
4. Admin Route Handlers protected only by Proxy, with incomplete JWT verification.
5. Public status lookup exposing internal technician data using a low-entropy tracking ID.
6. Warranty claims lacking ownership, completion-status, and duplicate-claim checks.
7. Runtime uploads written to an ephemeral Vercel filesystem.
8. Draft articles and inactive products directly accessible.
9. Broken booking confirmation/WhatsApp handoff and raw Markdown displayed to users.
10. Thin, empty, or duplicate pages being submitted as index candidates.

The remediation removes or mitigates each of these issues. Production delivery is now confirmed for the pushed commit, while operational and business verification remains explicit below.

## Evidence boundaries

| Layer | Evidence | Current truth |
|---|---|---|
| Source | Full repository and 56 application routes inspected | Local fixes present |
| Local validation | ESLint, 43 tests, Prisma validation, TypeScript, Next production build | Pass |
| Local rendering | Playwright at 375, 768, and 1440 px; representative public/admin routes | No horizontal overflow |
| Local crawl | 18 sitemap URLs fetched from the built server | All returned HTTP 200 with no redirect chain |
| Local Lighthouse | Mobile/desktop comparison and accessibility rerun | SEO 100; accessibility 99 after fixes |
| Production crawl | 65 sitemap URLs | All 200 with title, description, canonical, H1, and valid JSON-LD syntax |
| Production quality | Pre-deploy baseline: 40 geo clones, fake NAP/claims, raw Markdown, empty collections | Post-deploy smoke shows the new title, robots policy, schema, and reviewed copy; full crawl still pending |
| Google Search Console | Historical 25 Apr–23 Jul 2026 baseline plus post-deploy API checks | Sitemap submitted with 0 errors/0 warnings; processing pending; homepage inspection PASS |
| Deployment | GitHub commit `1565654`; Vercel deployment `dpl_CgAgUveoiPWCvwN5PPu5aQJfHFaS` | `READY` on `pytafix-web`; `www.pytafix.web.id` serves the new build |

## Local scorecard

| Category | Score | Assessment |
|---|---:|---|
| Crawlability and indexability | 88 | Curated sitemap; drafts/inactive/expired records filtered; utilities noindex |
| Technical SEO | 86 | Canonicals, metadata, admin noindex, one-hop legacy redirects, stable sitemap dates |
| Structured data | 91 | Valid types, safe serializer, honest organization/service facts, article references |
| Content and E-E-A-T | 82 | Unsupported claims removed and five articles replaced by reviewed editorial overrides; raw evidence depth is still limited (content-evidence subscore 62, E-E-A-T evidence subscore 48) |
| AEO/GEO readiness | 82 | Useful `llms.txt`, SSR FAQ/passages, and sources; the Maps text/pin conflict and broader local proof still require owner verification (citation-readiness subscore 65) |
| Security and privacy | 84 | Handler-level auth, strict JWT, safer public DTOs, distributed limiter, and temporary Blob cleanup; production credentials/MFA pending |
| UX, accessibility, responsive | 92 | No overflow; booking repaired; Lighthouse accessibility 99 |
| Performance | 78 | Homepage payload/height reduced; local lab variance remains |
| Overall readiness | **84** | Suitable for preview after required environment/database work |

## Remediation completed locally

### Backend and security

- Added handler-level authorization to every `/api/admin/**` route.
- JWT verification now pins HS256, issuer, audience, role, and minimum secret length.
- Added same-origin checks for authenticated mutations.
- Bounded and cleaned the local limiter map and stopped trusting arbitrary `x-forwarded-for`.
- Added Upstash Redis sliding-window rate limiting for login, booking, contact, status, and warranty across serverless instances.
- Production now fails closed with `503` when distributed limiter credentials are absent or time out; local fallback requires development mode or an explicit emergency flag.
- Increased new tracking IDs from about 30 bits to about 130 bits of suffix entropy.
- Status lookup now requires the booking WhatsApp number and returns only approved public fields.
- Warranty submission verifies WhatsApp ownership, completed status, and absence of an active claim.
- Warranty creation now uses a serializable transaction with bounded retries to prevent concurrent duplicate active claims.
- Warranty status changes follow a forward-only transition matrix, and claim history can no longer be hard-deleted.
- Added a paginated, searchable admin contact inbox with unread/read state and direct WhatsApp/email handoff.
- Added bounded pagination, status filtering, and search to service-ticket and warranty admin APIs and interfaces; the dashboard now requests only the latest 20 tickets.
- Normalized WhatsApp numbers before storing new contact submissions and connected the form success copy to the API response.
- Corrected the admin mutation-origin check to use browser origin, proxy/host, protocol, and Fetch Metadata consistently; same-origin admin mutations work while missing/cross-site origins remain denied.
- Admin upload now uses Vercel Blob with MIME, extension, magic-byte, and 5 MB checks.
- Added authenticated cleanup for abandoned/replaced admin uploads. Deletion is restricted to HTTPS Vercel Blob URLs under the managed `admin/media/` prefix.
- Disabled the framework disclosure header and added COOP, CORP, and a stricter Permissions Policy; the built server emitted the expected headers.
- Marketplace replacement is atomic within the owner update.
- Marketplace links require HTTPS and a hostname matching the selected marketplace.
- Processed service history and used spareparts can no longer be destructively deleted.
- Added a server-side service-status transition matrix.
- Restricted setting keys and sizes and made settings writes transactional.
- Removed unused Vercel CLI and Google API development dependencies.
- Upgraded Next.js and `eslint-config-next` to 16.2.12.
- Production dependency audit now reports zero known vulnerabilities.
- Replaced the destructive database seed with idempotent slug-based upserts. It no longer clears operational tables or embeds the superseded unsupported marketing copy.
- Added a public service-copy guardrail so legacy database descriptions cannot expose unsupported credentials, “official warranty,” or “original” claims before a database seed/update is run.
- Public FAQ rendering now uses the reviewed fallback set, holds unreviewed database answers out of public pages, and renders answers in server HTML for AEO/GEO.
- Public services and articles use reviewed-slug allowlists so legacy active records cannot become indexable without editorial review.
- Public service detail copy now has reviewed semantic sections and sanitized Markdown rendering; article details include reviewed-author/update context and related service/FAQ/contact links.
- Public booking, contact, warranty, status, login, and logout handlers now require trusted request controls where applicable, reject oversized or malformed JSON with 4xx responses, and keep all success/error responses no-store.
- The proxy adds an early request-size ceiling for admin JSON (512 KB) and media uploads (6 MB envelope; the file itself remains capped at 5 MB), with oversized requests rejected before the handler runs.
- Proxy and `next.config.ts` apply `X-Robots-Tag: noindex` and `Cache-Control: no-store` to every `/api/**` response, including unauthorized admin responses.
- Sitemap failures fall back to the reviewed static URL set; local status/login failures now also expose inline accessible alerts.
- Vercel Analytics and Speed Insights now load only on Vercel, eliminating local/preview script 404 and MIME errors on self-hosted builds.

### Frontend, responsive UX, and accessibility

- Reduced homepage service output from 44 records to four curated base services.
- Service preview cards are real links.
- Moved the public navigation offset out of the root layout so admin/login no longer overflows.
- Repaired booking device-brand loss, camel/snake-case mismatch, confirmation tracking ID, WhatsApp message, Jakarta date, privacy notice, and operating-hour copy.
- Added WhatsApp verification to status lookup and states for waiting/cancelled service.
- Replaced the fake contact map and placeholder coordinates with the owner-confirmed Pytafix Google Maps place URL, address, and coordinates at Jl. Werkudoro No.2, RT.2/RW.2, Polehan, Blimbing, Kota Malang.
- Added a linked address, accessible embedded map, and route action while retaining Malang Raya as the service area.
- Removed internal map-review wording from all public contact surfaces, including the footer, Kontak page, Tentang page, and `llms.txt`; visitors now see a clear address label and a concise WhatsApp visit-confirmation instruction.
- Added accessible labels to product/sparepart search and sort controls.
- Improved mobile menu semantics, Escape handling, desktop dropdown state, social-list semantics, heading order, and inline-link affordance.
- Verified no horizontal overflow at mobile, tablet, or desktop widths.
- Removed opacity-zero initial states from promo and portfolio motion components so critical copy remains visible before hydration.
- Replaced the non-square wordmark favicon with a preserved square brand mark and added a dedicated 180 px Apple touch icon.

### SEO, AEO/GEO, schema, and information architecture

- Removed geo variants from homepage, service archive, sitemap, and `llms.txt`.
- Legacy inferred geo variants redirect directly to the canonical base service.
- Removed utility/status/claim and empty collection pages from sitemap.
- Empty promo, portfolio, testimonial, product, and sparepart collections are noindex until populated.
- Draft/future articles, expired promos, inactive products, and geo variants cannot become index candidates.
- Article and service archives now switch to `noindex` when no reviewed records are available; expired promo detail URLs also return `noindex` metadata.
- Removed duplicate brand suffixes in page titles.
- Added an admin metadata boundary and `X-Robots-Tag`.
- Replaced invalid promotion schema with `Offer`.
- Removed false product brands, fake ratings, fake NAP/geo, fake logo dimensions, and Sunday pseudo-hours.
- Added `hasMap`, owner-confirmed `PostalAddress`, `GeoCoordinates`, and service-area data to the local-business schema.
- Promoted the reviewed Organization and ProfessionalService entities to the root layout so article, service, product, and commerce schemas resolve their `#organization`/`#localbusiness` references on every public route without duplicating the homepage graph.
- Replaced duplicate inline publisher/author and contact-service payloads with stable entity references to the root graph.
- Escaped `<` in every updated JSON-LD payload to prevent script breakout.
- Rebuilt `llms.txt` with canonical URLs, reviewed service/article content, FAQ answers, references, update dates when available, an honest service-area description, and a reviewed static article fallback when the database is unavailable.
- Reduced the local sitemap from 65 baseline URLs to 18 reviewed candidates.

### Copywriting, E-E-A-T, and content connections

- Removed placeholder testimonials and unverified counts, success rates, certifications, warranty durations, turnaround claims, free pickup, and “original” guarantees.
- Centralized service principles, FAQ answers, legal entity, contact facts, and operating hours.
- Rewrote About, Contact, Services, Booking, warranty, marketplace, portfolio, and legal fallback copy.
- Added honest empty states instead of fabricated proof.
- Converted stored Markdown to sanitized semantic HTML.
- Replaced all five live article presentations with safer titles, excerpts, and reviewed editorial content.
- Added official Microsoft, Apple, and Intel references, an editorial disclaimer, update metadata, and links to relevant service/booking journeys.

## Verification results

| Check | Result |
|---|---|
| `npm run lint` | Pass |
| `npm run test:run` | 43/43 pass |
| `prisma validate` | Pass with `prisma.config.ts` |
| `npm run build` | Pass, Next.js 16.2.12, 56 routes |
| `npm audit --omit=dev` | 0 vulnerabilities |
| Full `npm audit` | 9 high advisories in ESLint-only development dependency chain |
| Unauthorized `/api/admin/articles` | 401 |
| Unauthorized `/api/admin/contacts` and contact mutation | 401 |
| Authenticated admin contact inbox | Loads successfully; search/filter/empty state present; no mobile overflow |
| Ticket/warranty pagination | Bounded API envelopes; search/filter/pagination rendered without mobile overflow |
| Admin mutation origin | Legitimate local same-origin PATCH/DELETE accepted by origin guard |
| Warranty history deletion | 405 with `Allow: GET, PATCH` |
| Distributed limiter without production credentials | Login and public status fail closed with 503 |
| Icon metadata | 512 px square favicon and 180 px Apple icon emitted correctly |
| Runtime security headers | CSP, COOP, CORP, HSTS, Referrer Policy, and restrictive Permissions Policy emitted; no `X-Powered-By` |
| Public service copy | Legacy service claims absent from homepage and detail HTML after rendering against the existing local database |
| Browser console | 0 errors after Vercel telemetry gating on local production server |
| Status request without WhatsApp | 400 |
| Nested geo variant | Direct 308 to canonical base service |
| Local sitemap | 18 reviewed URLs; no utilities/empty collections/geo clones |
| Local article | Semantic H2s, no literal Markdown, valid Article JSON-LD, official reference |
| Local contact location | Direct Google Maps place URL and coordinate-based iframe loaded; customer-facing address/visit guidance rendered; business-schema address/coordinates match owner-provided evidence; no overflow at 375 or 1440 px |
| Local commerce freshness | Product and sparepart detail pages expose `dateModified` in Product JSON-LD and a visible last-updated/price-stock confirmation note |
| Lighthouse local | Mobile performance 89, desktop 72, best practices 96, SEO 100 |
| Lighthouse accessibility rerun | 99 |

Lighthouse performance is lab evidence and showed cold/warm variance. It is not CrUX or production field truth.

## Remaining blockers and limitations

1. **Rotate historical exposed credentials.** The current GitHub token was used only through in-memory environment authentication and was not committed; revoke/rotate any token that was previously exposed and refresh the local secret afterward.
2. **Configure `BLOB_READ_WRITE_TOKEN`** in preview/production before testing admin upload.
3. **Complete Google Business Profile verification.** The exact pin and address are now owner-confirmed; independently verify profile ownership, categories, hours, and external NAP consistency before expanding local SEO.
4. **Deactivate/delete the 40 legacy geo rows** in the production database after exporting a backup; keep their direct redirects.
5. **Configure and verify `JWT_SECRET` and Upstash Redis in preview/production.** The current Vercel environment inventory contains database credentials and `ADMIN_PASSWORD`, but no `JWT_SECRET`, `UPSTASH_REDIS_REST_URL`, or `UPSTASH_REDIS_REST_TOKEN`; the live `GET /api/status` probe correctly fails closed with HTTP 503 until the distributed limiter is configured.
6. **Adopt individual admin accounts, slow password hashing, MFA, and audit logs.** The current shared password is hardened but remains a single identity.
7. **Decide retention periods and public/internal note fields** before a schema migration.
8. **Add external contact notifications and retention rules.** The new admin inbox closes the operational read/reply gap, but email/Slack alerts and an approved retention period remain external decisions.
9. **Run a post-deploy fetch of generated favicon/Apple icons and remote image hosts.** Source assets and local metadata are correct; this remains a runtime verification item.
10. **Resolve ESLint-chain development advisories** when compatible releases are available; forced upgrades currently break the Next lint stack.
11. **Complete the full post-deploy crawl, API/runtime smoke, GSC sitemap processing, and CrUX/field checks.** The linked production deployment is ready, all 18 sitemap URLs pass the lightweight HTTP/title/canonical crawl, the sitemap is submitted with 0 errors/0 warnings, and the homepage inspection passes; deeper API/runtime, Google processing, and field checks remain pending.
13. **Configure GitHub branch protection and required checks.** The public `main` branch currently has no visible protection or required CI checks; enforce review/CI gates before broader team changes.
12. **Expand the evidence-led content set before growth.** Reviewed service bodies are about 110–118 words and reviewed articles about 167–197 words; add named human review, first-hand repair evidence, consented original media, and topic-specific depth before pursuing broader keyword or city-page expansion.

## Conclusion

The repository has moved from a high-risk marketing prototype toward an evidence-led service site. The local code now has a much stronger trust model, index boundary, privacy boundary, content contract, and conversion flow. Production has been updated for the pushed release commits; do not declare the audit fully verified until the remaining operational, business, and post-deploy evidence items above are complete.

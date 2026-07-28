# Pytafix Action Plan

Updated: 28 July 2026

## P0 — Required before preview/production

| Owner | Action | Acceptance evidence |
|---|---|---|
| Repository owner | Revoke and replace the exposed GitHub token | Old token disabled; remote remains credential-free |
| Platform owner | Set `JWT_SECRET` (32+ chars), strong `ADMIN_PASSWORD`, `BLOB_READ_WRITE_TOKEN`, and Upstash Redis REST credentials | Preview login/upload/form/status smoke tests pass |
| Business owner | Confirm legal entity, WhatsApp, email, service area, operating hours, and ownership/completeness of the provided Google Maps listing | One signed source-of-truth sheet and verified Google Business Profile access |
| Database owner | Back up production; deactivate/delete 40 legacy geo service rows | Only four approved base services active |
| Platform/security | Verify the implemented Upstash limiter across preview instances; keep local fallback disabled | Cross-instance 429 test, fail-closed test, and Upstash dashboard evidence |
| QA | Deploy a preview, test public and admin critical paths, then crawl preview | No P0/P1 regression |

The seed is now non-destructive and idempotent, but still verify the target database and take a production backup before any manual data operation.

## P1 — Before production release

1. Test booking end to end with a non-production database:
   - create request;
   - preserve brand/model;
   - display/copy tracking ID;
   - status lookup requires matching WhatsApp;
   - waiting, cancelled, and completed states render correctly.
2. Test warranty rules:
   - wrong WhatsApp rejected;
   - incomplete service rejected;
   - one active claim allowed;
   - public response contains no customer/service object.
3. Test every admin method without a cookie and with an invalid role.
4. Test Blob upload, public rendering, rollback on failed record creation, and the implemented abandoned-upload cleanup against the preview Blob store.
5. Test the contact inbox with approved preview data: unread/read state, search, pagination, WhatsApp/email links, and expired-session behavior.
6. Test ticket and warranty searches, status filters, pagination boundaries, and a dataset larger than 50 records.
7. Review any newly created admin service/article copy before publishing; the public allowlist holds arbitrary future records out of indexable pages.
8. Review five editorial articles with a named human reviewer; record author/reviewer credentials and review date.
9. Verify privacy/terms with Indonesian counsel before relying on the fallback text.
10. Replace the shared admin password with individual accounts, MFA, and mutation audit history.
11. Add an operational contact-message inbox or durable notification channel.

## P2 — Search and content growth

1. Submit only the curated sitemap after production validation.
2. Request Google indexing through URL Inspection for the homepage, service archive, four base services, article archive, and five reviewed articles.
3. Monitor GSC weekly:
   - indexed pages;
   - impressions/clicks;
   - query/page mismatches;
   - duplicate/canonical exclusions.
4. Keep city/service expansion frozen until each page has verified availability, local proof, distinct pricing/SLA information, real work evidence, and human-reviewed copy.
5. Add first-party proof gradually:
   - consented portfolio cases;
   - verified testimonials;
   - clear component identity;
   - documented warranty terms;
   - named editorial reviewers.
6. Build internal links from each article to one relevant base service, booking, FAQ, and related article.
7. Expand service/article bodies with first-hand, consented case evidence and topic-specific media before attempting broader keyword or city-page growth; current reviewed copy is intentionally concise and evidence-limited.

## P2 — UX, accessibility, and performance

1. Add integration and Playwright tests for booking, status, warranty, auth, upload, navigation, and empty-state indexing.
2. Adopt an accessible dialog primitive for all admin modals: label, focus trap, Escape, focus return, and inert background.
3. Add cursor pagination and explicit DTO selects to admin request/warranty tables.
4. Generate square 32, 180, and 512 px icon assets.
5. Run two cold and two warm Lighthouse passes on preview and production; compare bundles and LCP resources.
6. Collect CrUX/field data before setting Core Web Vitals targets.

## Release gate

A production release is approved only when:

- P0 environment and database work is complete;
- preview build/lint/tests pass;
- public forms and admin auth are tested;
- preview crawl contains no geo clones, drafts, inactive items, empty index pages, or utility URLs;
- legal/business facts are verified;
- a rollback path is documented.

After deployment, rerun:

1. production crawl;
2. header and schema validation;
3. mobile/tablet/desktop screenshots;
4. Lighthouse;
5. sitemap fetch;
6. GSC sitemap and URL Inspection checks.
